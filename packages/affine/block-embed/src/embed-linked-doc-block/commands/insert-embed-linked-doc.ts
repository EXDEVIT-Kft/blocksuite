import type { EmbedCardStyle, ReferenceParams } from '@algogrind/affine-model';
import type { Command } from '@algogrind/block-std';

import { insertEmbedCard } from '../../common/insert-embed-card.js';

export const insertEmbedLinkedDocCommand: Command<
  never,
  'insertedLinkType',
  {
    docId: string;
    params?: ReferenceParams;
  }
> = (ctx, next) => {
  const { docId, params, std } = ctx;
  const flavour = 'affine:embed-linked-doc';
  const targetStyle: EmbedCardStyle = 'vertical';
  const props: Record<string, unknown> = { pageId: docId };
  if (params) props.params = params;
  insertEmbedCard(std, { flavour, targetStyle, props });
  next();
};
