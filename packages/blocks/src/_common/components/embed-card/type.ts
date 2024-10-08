import type {
  BookmarkBlockModel,
  EmbedFigmaModel,
  EmbedGithubModel,
  EmbedLinkedDocModel,
  EmbedLoomModel,
  EmbedSyncedDocModel,
  EmbedYoutubeModel,
} from '@algogrind/affine-model';
import type { BlockComponent } from '@algogrind/block-std';

import {
  EmbedFigmaBlockComponent,
  EmbedGithubBlockComponent,
  EmbedLinkedDocBlockComponent,
  EmbedLoomBlockComponent,
  EmbedSyncedDocBlockComponent,
  EmbedYoutubeBlockComponent,
} from '@algogrind/affine-block-embed';

import { BookmarkBlockComponent } from '../../../bookmark-block/bookmark-block.js';

export type EmbedToolbarBlockComponent =
  | BookmarkBlockComponent
  | EmbedGithubBlockComponent
  | EmbedYoutubeBlockComponent
  | EmbedFigmaBlockComponent
  | EmbedLinkedDocBlockComponent
  | EmbedSyncedDocBlockComponent
  | EmbedLoomBlockComponent;

export type EmbedToolbarModel =
  | BookmarkBlockModel
  | EmbedGithubModel
  | EmbedYoutubeModel
  | EmbedFigmaModel
  | EmbedLinkedDocModel
  | EmbedSyncedDocModel
  | EmbedLoomModel;

export function isEmbedCardBlockComponent(
  block: BlockComponent
): block is EmbedToolbarBlockComponent {
  return (
    block instanceof BookmarkBlockComponent ||
    block instanceof EmbedGithubBlockComponent ||
    block instanceof EmbedYoutubeBlockComponent ||
    block instanceof EmbedFigmaBlockComponent ||
    block instanceof EmbedLinkedDocBlockComponent ||
    block instanceof EmbedSyncedDocBlockComponent ||
    block instanceof EmbedLoomBlockComponent
  );
}
