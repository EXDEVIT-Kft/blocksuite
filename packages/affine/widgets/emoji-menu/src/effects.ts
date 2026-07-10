import { ALGOGRIND_EMOJI_MENU_WIDGET } from './consts';
import { EmojiMenu } from './emoji-menu-popover';
import { AlgogrindEmojiMenuWidget } from './widget';

export function effects() {
  customElements.define(ALGOGRIND_EMOJI_MENU_WIDGET, AlgogrindEmojiMenuWidget);
  customElements.define('algogrind-emoji-menu', EmojiMenu);
}

declare global {
  interface HTMLElementTagNameMap {
    [ALGOGRIND_EMOJI_MENU_WIDGET]: AlgogrindEmojiMenuWidget;
    'algogrind-emoji-menu': EmojiMenu;
  }
}
