import {
  BlockViewExtension,
  CommandExtension,
  type ExtensionType,
  FlavourExtension,
} from '@blocksuite/block-std';
import { literal } from 'lit/static-html.js';

import { AccordionKeymapExtension } from './accordion-keymap.js';
import { AccordionBlockService } from './accordion-service.js';
import { commands } from './commands/index.js';

export const AccordionBlockSpec: ExtensionType[] = [
  FlavourExtension('algogrind:accordion'),
  AccordionBlockService,
  BlockViewExtension('algogrind:accordion', literal`algogrind-accordion`),
  AccordionKeymapExtension,
  CommandExtension(commands),
];
