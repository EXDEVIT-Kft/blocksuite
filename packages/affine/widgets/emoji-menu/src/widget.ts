import { getInlineEditorByModel } from '@blocksuite/affine-rich-text';
import type { AffineInlineEditor } from '@blocksuite/affine-shared/types';
import { getCurrentNativeRange } from '@blocksuite/affine-shared/utils';
import { DisposableGroup } from '@blocksuite/global/disposable';
import {
  TextSelection,
  type UIEventStateContext,
  WidgetComponent,
} from '@blocksuite/std';
import { InlineEditor } from '@blocksuite/std/inline';
import debounce from 'lodash-es/debounce';

import {
  defaultEmojiMenuConfig,
  type EmojiMenuConfig,
  type EmojiMenuContext,
} from './config.js';
import { EmojiMenu } from './emoji-menu-popover.js';

let globalAbortController = new AbortController();

function closeEmojiMenu() {
  globalAbortController.abort();
}

const showEmojiMenu = debounce(
  ({
    context,
    container = document.body,
    abortController = new AbortController(),
    config,
    searchText = '',
  }: {
    context: EmojiMenuContext;
    container?: HTMLElement;
    abortController?: AbortController;
    config: EmojiMenuConfig;
    searchText: string;
  }) => {
    const curRange = getCurrentNativeRange();
    if (!curRange) return;

    globalAbortController = abortController;
    const disposables = new DisposableGroup();
    abortController.signal.addEventListener('abort', () =>
      disposables.dispose()
    );

    const inlineEditor = getInlineEditorByModel(context.std, context.model);
    if (!inlineEditor) return;
    const emojiMenu = new EmojiMenu(inlineEditor, abortController);
    disposables.add(() => emojiMenu.remove());
    emojiMenu.context = context;
    emojiMenu.config = config;
    emojiMenu._searchText = searchText;

    // Mount
    container.append(emojiMenu);
    return emojiMenu;
  },
  100
);

export class AlgogrindEmojiMenuWidget extends WidgetComponent {
  static DEFAULT_CONFIG = defaultEmojiMenuConfig;

  private readonly _getInlineEditor = (
    evt: KeyboardEvent | CompositionEvent | InputEvent
  ) => {
    if (evt.target instanceof HTMLElement) {
      const editor = (
        evt.target.closest('.inline-editor') as {
          inlineEditor?: AffineInlineEditor;
        }
      )?.inlineEditor;
      if (editor instanceof InlineEditor) {
        return editor;
      }
    }

    const textSelection = this.host.selection.find(TextSelection);
    if (!textSelection) return;

    const model = this.host.store.getBlock(textSelection.blockId)?.model;
    if (!model) return;

    return getInlineEditorByModel(this.std, model);
  };

  private readonly _handleInput = (
    inlineEditor: InlineEditor,
    isCompositionEnd: boolean
  ) => {
    const inlineRangeApplyCallback = (callback: () => void) => {
      // the inline ranged updated in compositionEnd event before this event callback
      if (isCompositionEnd) {
        callback();
      } else {
        const subscription = inlineEditor.slots.inlineRangeSync.subscribe(
          () => {
            subscription.unsubscribe();
            callback();
          }
        );
      }
    };

    if (this.block?.model.flavour !== 'affine:page') {
      console.error('AlgogrindEmojiMenuWidget should be used in RootBlock');
      return;
    }

    inlineRangeApplyCallback(() => {
      const textSelection = this.host.selection.find(TextSelection);
      if (!textSelection) return;

      const block = this.host.view.getBlock(textSelection.blockId);
      if (!block) return;
      const model = block.model;

      if (this.config.ignoreBlockTypes.includes(model.flavour)) return;

      const inlineRange = inlineEditor.getInlineRange();
      if (!inlineRange) return;

      const textPoint = inlineEditor.getTextPoint(inlineRange.index);
      if (!textPoint) return;

      const [leafStart, offsetStart] = textPoint;

      const text = leafStart.textContent
        ? leafStart.textContent.slice(0, offsetStart)
        : '';

      const match = text.match(/:(?![/\s])(\S+)/u);

      if (match) {
        closeEmojiMenu();
        showEmojiMenu({
          context: {
            model,
            std: this.std,
          },
          config: this.config,
          searchText: match[1],
        });
      }
    });
  };

  private readonly _onCompositionEnd = (ctx: UIEventStateContext) => {
    const event = ctx.get('defaultState').event as CompositionEvent;

    const inlineEditor = this._getInlineEditor(event);
    if (!inlineEditor) return;

    this._handleInput(inlineEditor, true);
  };

  private readonly _onBeforeInput = (ctx: UIEventStateContext) => {
    const event = ctx.get('defaultState').event;
    if (!(event instanceof InputEvent)) return;

    // Skip non-character inputs and IME composition (handled by _onCompositionEnd)
    if (event.data === null || event.isComposing) return;

    const inlineEditor = this._getInlineEditor(event);
    if (!inlineEditor) return;

    // Wait for the input to be processed, then handle it
    // Pass true because after waitForUpdate(), the range is already synced
    inlineEditor
      .waitForUpdate()
      .then(() => {
        this._handleInput(inlineEditor, true);
      })
      .catch(console.error);
  };

  config: EmojiMenuConfig = AlgogrindEmojiMenuWidget.DEFAULT_CONFIG;

  override connectedCallback() {
    super.connectedCallback();

    this.handleEvent('beforeInput', this._onBeforeInput);
    this.handleEvent('compositionEnd', this._onCompositionEnd);
  }
}
