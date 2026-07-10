import {
  type ViewExtensionContext,
  ViewExtensionProvider,
} from '@blocksuite/affine-ext-loader';

import { effects } from './effects';

export class LinkViewExtension extends ViewExtensionProvider {
  override name = 'affine-link-gfx';

  override effect() {
    super.effect();
    effects();
  }

  override setup(context: ViewExtensionContext) {
    super.setup(context);
    // [ALGOGRIND] Link quick tool removed from the edgeless toolbar
    // (fork commit 6356f587e)
    // if (this.isEdgeless(context.scope)) {
    //   context.register(linkQuickTool);
    // }
  }
}
