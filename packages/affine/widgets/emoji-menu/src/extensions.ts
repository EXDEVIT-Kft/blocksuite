import type { Container } from '@blocksuite/global/di';
import { WidgetViewExtension } from '@blocksuite/std';
import { Extension } from '@blocksuite/store';
import { literal, unsafeStatic } from 'lit/static-html.js';

import { ALGOGRIND_EMOJI_MENU_WIDGET } from './consts';

export class EmojiMenuExtension extends Extension {
  static override setup(di: Container) {
    WidgetViewExtension(
      'affine:page',
      ALGOGRIND_EMOJI_MENU_WIDGET,
      literal`${unsafeStatic(ALGOGRIND_EMOJI_MENU_WIDGET)}`
    ).setup(di);
  }
}
