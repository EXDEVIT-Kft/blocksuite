import type { UIEventStateContext } from '@blocksuite/block-std';
import type { BlockModel } from '@blocksuite/store';

import { getInlineEditorByModel } from '@blocksuite/affine-components/rich-text';
import {
  getCurrentNativeRange,
  matchFlavours,
} from '@blocksuite/affine-shared/utils';
import { WidgetComponent } from '@blocksuite/block-std';
import { DisposableGroup } from '@blocksuite/global/utils';
import { InlineEditor } from '@blocksuite/inline';

import type { RootBlockComponent } from '../../types.js';

import { getPopperPosition } from '../../utils/position.js';
import { defaultEmojiMenuConfig, type EmojiMenuConfig } from './config.js';
import { EmojiMenu } from './emoji-menu-popover.js';

let activeMenu: EmojiMenu | null = null;

interface ShowEmojiMenuOptions {
  context: {
    model: BlockModel;
    rootComponent: RootBlockComponent;
  };
  container?: HTMLElement;
  abortController?: AbortController;
  config: EmojiMenuConfig;
  triggerKey: string;
}

const showEmojiMenu = ({
  context,
  container = document.body,
  abortController = new AbortController(),
  config,
  triggerKey,
}: ShowEmojiMenuOptions) => {
  const curRange = getCurrentNativeRange();
  if (!curRange) return;

  if (activeMenu) {
    return activeMenu;
  }

  const disposables = new DisposableGroup();
  abortController.signal.addEventListener('abort', () => {
    disposables.dispose();
    activeMenu = null;
  });

  const inlineEditor = getInlineEditorByModel(
    context.rootComponent.host,
    context.model
  );
  if (!inlineEditor) return;

  const emojiMenu = new EmojiMenu(inlineEditor, abortController);
  activeMenu = emojiMenu;

  disposables.add(() => {
    emojiMenu.remove();
    activeMenu = null;
  });

  emojiMenu.context = context;
  emojiMenu.config = config;
  emojiMenu.triggerKey = triggerKey;

  const updatePosition = () => {
    const emojiMenuElement = emojiMenu.emojiMenuElement;
    if (!emojiMenuElement) return;
    const position = getPopperPosition(emojiMenuElement, curRange);
    emojiMenu.updatePosition(position);
  };

  disposables.addFromEvent(window, 'resize', updatePosition);
  container.append(emojiMenu);
  setTimeout(updatePosition);

  return emojiMenu;
};

export const AFFINE_EMOJI_MENU_WIDGET = 'affine-emoji-menu-widget';

export class AffineEmojiMenuWidget extends WidgetComponent {
  static DEFAULT_CONFIG = defaultEmojiMenuConfig;

  private _getInlineEditor = (evt: KeyboardEvent | CompositionEvent) => {
    if (evt.target instanceof HTMLElement) {
      const editor = (
        evt.target.closest('.inline-editor') as {
          inlineEditor?: InlineEditor;
        }
      )?.inlineEditor;
      if (editor instanceof InlineEditor) return editor;
    }

    const textSelection = this.host.selection.find('text');
    if (!textSelection) return;

    const model = this.host.doc.getBlock(textSelection.blockId)?.model;
    if (!model) return;

    return getInlineEditorByModel(this.host, model);
  };

  private _handleInput = (inlineEditor: InlineEditor) => {
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
    const match = text.match(/:(?!\s)([\p{L}0-9_+-]*)$/iu);

    if (match) {
      showEmojiMenu({
        context: {
          model,
          rootComponent: this.block as RootBlockComponent,
        },
        config: this.config,
        triggerKey: ':',
      });
    }
  };

  private _onCompositionEnd = (ctx: UIEventStateContext) => {
    const event = ctx.get('defaultState').event as CompositionEvent;

    if (
      !this.config.triggerKeys.some(triggerKey =>
        triggerKey.includes(event.data)
      )
    )
      return;

    const inlineEditor = this._getInlineEditor(event);
    if (!inlineEditor) return;

    this._handleInput(inlineEditor);
  };

  private _onKeyDown = (ctx: UIEventStateContext) => {
    const eventState = ctx.get('keyboardState');
    const event = eventState.raw;

    const key = event.key;

    if (key === 'Process' || event.isComposing) return;

    const inlineEditor = this._getInlineEditor(event);
    if (!inlineEditor) return;

    this._handleInput(inlineEditor);
  };

  config: EmojiMenuConfig = AffineEmojiMenuWidget.DEFAULT_CONFIG;

  override connectedCallback() {
    super.connectedCallback();
    if (this.config.triggerKeys.some(key => key.length === 0)) {
      throw new Error('Trigger key of emoji menu should not be empty string');
    }
    this.handleEvent('keyDown', this._onKeyDown);
    this.handleEvent('compositionEnd', this._onCompositionEnd);
  }
}
declare global {
  interface HTMLElementTagNameMap {
    [AFFINE_EMOJI_MENU_WIDGET]: AffineEmojiMenuWidget;
  }
}
