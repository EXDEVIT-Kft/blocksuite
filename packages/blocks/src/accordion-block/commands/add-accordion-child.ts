import type { Command } from '@algogrind/block-std';

import { focusTextModel } from '@algogrind/affine-components/rich-text';

/**
 * Add a paragraph next to the current block.
 */
export const addAccordionChildCommand: Command<
  never,
  'paragraphConvertedId',
  {
    blockId?: string;
  }
> = (ctx, next) => {
  const { std } = ctx;
  const { doc, selection } = std;
  doc.captureSync();

  let blockId = ctx.blockId;
  if (!blockId) {
    const text = selection.find('text');
    blockId = text?.blockId;
  }
  if (!blockId) return;

  const model = doc.getBlock(blockId)?.model;
  if (!model) return;

  const firstChild = model.firstChild();
  let id: string;
  if (
    !firstChild ||
    (firstChild.text?.length !== undefined && firstChild.text?.length > 0)
  ) {
    id = doc.addBlock('affine:paragraph', {}, model, 0);
  } else {
    // If the first child of the accordion is an empty paragraph,
    // then do not add a new child, just focus this model
    id = firstChild.id;
  }

  focusTextModel(std, id);
  return next({ paragraphConvertedId: id });
};
