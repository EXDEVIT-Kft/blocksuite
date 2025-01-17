import { createEmbedBlockHtmlAdapterMatcher } from '@algogrind/affine-block-embed';
import { BookmarkBlockSchema } from '@algogrind/affine-model';
import { BlockHtmlAdapterExtension } from '@algogrind/affine-shared/adapters';

export const bookmarkBlockHtmlAdapterMatcher =
  createEmbedBlockHtmlAdapterMatcher(BookmarkBlockSchema.model.flavour);

export const BookmarkBlockHtmlAdapterExtension = BlockHtmlAdapterExtension(
  bookmarkBlockHtmlAdapterMatcher
);
