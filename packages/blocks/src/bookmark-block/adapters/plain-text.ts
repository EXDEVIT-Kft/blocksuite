import { createEmbedBlockPlainTextAdapterMatcher } from '@algogrind/affine-block-embed';
import { BookmarkBlockSchema } from '@algogrind/affine-model';
import { BlockPlainTextAdapterExtension } from '@algogrind/affine-shared/adapters';

export const bookmarkBlockPlainTextAdapterMatcher =
  createEmbedBlockPlainTextAdapterMatcher(BookmarkBlockSchema.model.flavour);

export const BookmarkBlockPlainTextAdapterExtension =
  BlockPlainTextAdapterExtension(bookmarkBlockPlainTextAdapterMatcher);
