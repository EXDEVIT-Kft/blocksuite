import { AccordionBlockModel } from '@blocksuite/affine-model';
import {
  focusTextModel,
  getInlineEditorByModel,
} from '@blocksuite/affine-rich-text';
import { matchModels } from '@blocksuite/affine-shared/utils';
import { type Command, TextSelection } from '@blocksuite/std';

/**
 * Split the accordion title at the cursor position and move the
 * right side into a new paragraph as the accordion's first child.
 */
export const splitAccordionTitleCommand: Command<
  {
    blockId?: string;
  },
  {
    paragraphConvertedId: string;
  }
> = (ctx, next) => {
  const { std } = ctx;
  const { store, selection } = std;
  let blockId = ctx.blockId;
  if (!blockId) {
    const text = selection.find(TextSelection);
    blockId = text?.blockId;
  }
  if (!blockId) return;

  const model = store.getBlock(blockId)?.model;
  if (!model || !matchModels(model, [AccordionBlockModel])) return;

  const inlineEditor = getInlineEditorByModel(std, model);
  const range = inlineEditor?.getInlineRange();
  if (!range) return;

  const splitIndex = range.index;
  const splitLength = range.length;
  // On press enter, it may convert symbols from yjs ContentString
  // to yjs ContentFormat. Once it happens, the converted symbol will
  // be deleted and not counted as model.text.yText.length.
  // Example: "`a`[enter]" -> yText[<ContentFormat: Code>, "a", <ContentFormat: Code>]
  // In this case, we should not split the block.
  if (model.props.title.yText.length < splitIndex + splitLength) return;

  store.captureSync();
  const right = model.props.title.split(splitIndex, splitLength);
  const id = store.addBlock(
    'affine:paragraph',
    {
      text: right,
      type: model.props.type,
    },
    model,
    0
  );
  focusTextModel(std, id);
  return next({ paragraphConvertedId: id });
};
