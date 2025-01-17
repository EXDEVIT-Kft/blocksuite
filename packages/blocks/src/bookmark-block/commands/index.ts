import type { BlockCommands } from '@algogrind/block-std';

import { insertBookmarkCommand } from './insert-bookmark.js';

export const commands: BlockCommands = {
  insertBookmark: insertBookmarkCommand,
};
