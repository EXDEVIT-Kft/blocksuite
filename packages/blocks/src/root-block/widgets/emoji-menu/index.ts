import type { UIEventStateContext } from '@blocksuite/block-std';

import {
  type AffineInlineEditor,
  getInlineEditorByModel,
} from '@blocksuite/affine-components/rich-text';
import {
  getCurrentNativeRange,
  matchFlavours,
} from '@blocksuite/affine-shared/utils';
import { WidgetComponent } from '@blocksuite/block-std';
import {
  assertExists,
  assertType,
  debounce,
  DisposableGroup,
  throttle,
} from '@blocksuite/global/utils';
import { InlineEditor } from '@blocksuite/inline';

import type { RootBlockComponent } from '../../types.js';

import { getPopperPosition } from '../../utils/position.js';
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
  }: {
    context: EmojiMenuContext;
    container?: HTMLElement;
    abortController?: AbortController;
    config: EmojiMenuConfig;
  }) => {
    const curRange = getCurrentNativeRange();
    if (!curRange) return;

    globalAbortController = abortController;
    const disposables = new DisposableGroup();
    abortController.signal.addEventListener('abort', () =>
      disposables.dispose()
    );

    const inlineEditor = getInlineEditorByModel(
      context.rootComponent.host,
      context.model
    );
    if (!inlineEditor) return;
    const emojiMenu = new EmojiMenu(inlineEditor, abortController);
    disposables.add(() => emojiMenu.remove());
    emojiMenu.context = context;
    emojiMenu.config = config;

    // Handle position
    const updatePosition = throttle(() => {
      const emojiMenuElement = emojiMenu.emojiMenuElement;
      assertExists(
        emojiMenuElement,
        'You should render the emoji menu node even if no position'
      );
      const position = getPopperPosition(emojiMenuElement, curRange);
      emojiMenu.updatePosition(position);
    }, 10);

    disposables.addFromEvent(window, 'resize', updatePosition);

    // FIXME(Flrande): It is not a best practice,
    // but merely a temporary measure for reusing previous components.
    // Mount
    container.append(emojiMenu);
    // Wait for the Node to be mounted
    setTimeout(updatePosition);
    return emojiMenu;
  },
  100
);

export const ALGOGRIND_EMOJI_MENU_WIDGET = 'algogrind-emoji-menu-widget';

export class AlgogrindEmojiMenuWidget extends WidgetComponent {
  static DEFAULT_CONFIG = defaultEmojiMenuConfig;

  private _getInlineEditor = (evt: KeyboardEvent | CompositionEvent) => {
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

    const textSelection = this.host.selection.find('text');
    if (!textSelection) return;

    const model = this.host.doc.getBlock(textSelection.blockId)?.model;
    if (!model) return;

    return getInlineEditorByModel(this.host, model);
  };

  private _handleInput = (
    inlineEditor: InlineEditor,
    isCompositionEnd: boolean
  ) => {
    const inlineRangeApplyCallback = (callback: () => void) => {
      // the inline ranged updated in compositionEnd event before this event callback
      if (isCompositionEnd) callback();
      else inlineEditor.slots.inlineRangeSync.once(callback);
    };

    const rootComponent = this.block;
    if (rootComponent.model.flavour !== 'affine:page') {
      return;
    }
    assertType<RootBlockComponent>(rootComponent);

    inlineRangeApplyCallback(() => {
      const textSelection = this.host.selection.find('text');
      if (!textSelection) return;

      const model = this.host.doc.getBlock(textSelection.blockId)?.model;
      if (!model) return;

      if (matchFlavours(model, this.config.ignoreBlockTypes)) return;

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
            rootComponent,
          },
          config: this.config,
        });
      }
    });
  };

  private _onCompositionEnd = (ctx: UIEventStateContext) => {
    const event = ctx.get('defaultState').event as CompositionEvent;

    const inlineEditor = this._getInlineEditor(event);
    if (!inlineEditor) return;

    this._handleInput(inlineEditor, true);
  };

  private _onKeyDown = (ctx: UIEventStateContext) => {
    const eventState = ctx.get('keyboardState');
    const event = eventState.raw;

    const key = event.key;

    // check event is not composing
    if (
      key === undefined || // in mac os, the key may be undefined
      key === 'Process' ||
      event.isComposing
    )
      return;

    const inlineEditor = this._getInlineEditor(event);
    if (!inlineEditor) return;

    this._handleInput(inlineEditor, false);
  };

  config = AlgogrindEmojiMenuWidget.DEFAULT_CONFIG;

  override connectedCallback() {
    super.connectedCallback();

    this.handleEvent('keyDown', this._onKeyDown);
    this.handleEvent('compositionEnd', this._onCompositionEnd);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [ALGOGRIND_EMOJI_MENU_WIDGET]: AlgogrindEmojiMenuWidget;
  }
}
