import type { BlockCommands } from '@algogrind/block-std';

import { getImageSelectionsCommand } from '@algogrind/affine-shared/commands';

export const commands: BlockCommands = {
  getImageSelections: getImageSelectionsCommand,
};
