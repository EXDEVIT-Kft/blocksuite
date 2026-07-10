import {
  type ViewExtensionContext,
  ViewExtensionProvider,
} from '@blocksuite/affine-ext-loader';
import { BlockViewExtension, FlavourExtension } from '@blocksuite/std';
import { literal } from 'lit/static-html.js';

import {
  AccordionKeymapExtension,
  AccordionTextKeymapExtension,
} from './accordion-keymap';
import { effects } from './effects';

export class AccordionViewExtension extends ViewExtensionProvider {
  override name = 'algogrind-accordion-block';

  override effect() {
    super.effect();
    effects();
  }

  override setup(context: ViewExtensionContext) {
    super.setup(context);
    // [ALGOGRIND]
    // The slash menu entries are intentionally NOT registered: creating new
    // accordions was retired in favour of the native collapsible headings
    // (fork commit bad27b856). The block itself stays registered so legacy
    // documents containing algogrind:accordion blocks keep rendering.
    // To re-enable creation, register SlashMenuConfigExtension with
    // accordionSlashMenuConfig from './configs/slash-menu'.
    context.register([
      FlavourExtension('algogrind:accordion'),
      BlockViewExtension('algogrind:accordion', literal`algogrind-accordion`),
      AccordionKeymapExtension,
      AccordionTextKeymapExtension,
    ]);
  }
}
