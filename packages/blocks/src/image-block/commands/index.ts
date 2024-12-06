import type { BlockCommands } from '@algogrind/block-std';

import { getImageSelectionsCommand } from '@algogrind/affine-shared/commands';

import { insertImagesCommand } from './insert-images.js';

export const commands: BlockCommands = {
  getImageSelections: getImageSelectionsCommand,
  insertImages: insertImagesCommand,
};
