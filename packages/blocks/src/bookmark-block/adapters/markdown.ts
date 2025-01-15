import { createEmbedBlockMarkdownAdapterMatcher } from '@algogrind/affine-block-embed';
import { BookmarkBlockSchema } from '@algogrind/affine-model';
import { BlockMarkdownAdapterExtension } from '@algogrind/affine-shared/adapters';

export const bookmarkBlockMarkdownAdapterMatcher =
  createEmbedBlockMarkdownAdapterMatcher(BookmarkBlockSchema.model.flavour);

export const BookmarkBlockMarkdownAdapterExtension =
  BlockMarkdownAdapterExtension(bookmarkBlockMarkdownAdapterMatcher);
