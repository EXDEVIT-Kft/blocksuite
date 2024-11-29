import type { BlockCommands } from '@algogrind/block-std';

import {
  getSelectedPeekableBlocksCommand,
  peekSelectedBlockCommand,
} from '@algogrind/affine-components/peek';
import { textCommands } from '@algogrind/affine-components/rich-text';
import {
  clearAndSelectFirstModelCommand,
  copySelectedModelsCommand,
  deleteSelectedModelsCommand,
  draftSelectedModelsCommand,
  duplicateSelectedModelsCommand,
  getSelectedModelsCommand,
  retainFirstModelCommand,
} from '@algogrind/affine-shared/commands';

export const commands: BlockCommands = {
  // models
  clearAndSelectFirstModel: clearAndSelectFirstModelCommand,
  copySelectedModels: copySelectedModelsCommand,
  deleteSelectedModels: deleteSelectedModelsCommand,
  draftSelectedModels: draftSelectedModelsCommand,
  duplicateSelectedModels: duplicateSelectedModelsCommand,
  getSelectedModels: getSelectedModelsCommand,
  retainFirstModel: retainFirstModelCommand,
  // text
  ...textCommands,
  // peekable
  peekSelectedBlock: peekSelectedBlockCommand,
  getSelectedPeekableBlocks: getSelectedPeekableBlocksCommand,
};
