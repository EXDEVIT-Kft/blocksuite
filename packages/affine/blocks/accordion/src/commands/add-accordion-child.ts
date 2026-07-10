import { focusTextModel } from '@blocksuite/affine-rich-text';
import { type Command, TextSelection } from '@blocksuite/std';

/**
 * Add a paragraph as the first child of the accordion,
 * or focus the existing empty first child.
 */
export const addAccordionChildCommand: Command<
  {
    blockId?: string;
  },
  {
    paragraphConvertedId: string;
  }
> = (ctx, next) => {
  const { std } = ctx;
  const { store, selection } = std;
  store.captureSync();

  let blockId = ctx.blockId;
  if (!blockId) {
    const text = selection.find(TextSelection);
    blockId = text?.blockId;
  }
  if (!blockId) return;

  const model = store.getBlock(blockId)?.model;
  if (!model) return;

  const firstChild = model.firstChild();
  let id: string;
  if (
    !firstChild ||
    (firstChild.text?.length !== undefined && firstChild.text?.length > 0)
  ) {
    id = store.addBlock('affine:paragraph', {}, model, 0);
  } else {
    // If the first child of the accordion is an empty paragraph,
    // then do not add a new child, just focus this model
    id = firstChild.id;
  }

  focusTextModel(std, id);
  return next({ paragraphConvertedId: id });
};
