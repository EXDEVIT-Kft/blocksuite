import {
  type ViewExtensionContext,
  ViewExtensionProvider,
} from '@blocksuite/affine-ext-loader';

import { effects } from './effects';
import { EmojiMenuExtension } from './extensions';

export class EmojiMenuViewExtension extends ViewExtensionProvider {
  override name = 'algogrind-emoji-menu-widget';

  override effect() {
    super.effect();
    effects();
  }

  override setup(context: ViewExtensionContext) {
    super.setup(context);
    if (this.isMobile(context.scope)) return;
    context.register(EmojiMenuExtension);
  }
}
