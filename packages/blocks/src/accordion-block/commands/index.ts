import type { BlockCommands } from '@blocksuite/block-std';

import { addAccordionChildCommand } from './add-accordion-child.js';
import { splitAccordionTitleCommand } from './split-accordion-title.js';

export const commands: BlockCommands = {
  addAccordionChild: addAccordionChildCommand,
  splitAccordionTitle: splitAccordionTitleCommand,
};
