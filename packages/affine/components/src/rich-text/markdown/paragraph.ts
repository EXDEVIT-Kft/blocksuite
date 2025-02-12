import type { ParagraphType } from '@algogrind/affine-model';
import type { BlockStdScope } from '@algogrind/block-std';
import type { BlockModel } from '@algogrind/store';

import { matchFlavours } from '@algogrind/affine-shared/utils';

import { focusTextModel } from '../dom.js';
import { beforeConvert } from './utils.js';

export function toParagraph(
  std: BlockStdScope,
  model: BlockModel,
  type: ParagraphType,
  prefix: string
) {
  const { doc } = std;
  if (!matchFlavours(model, ['affine:paragraph'])) {
    const parent = doc.getParent(model);
    if (!parent) return;

    const index = parent.children.indexOf(model);

    beforeConvert(std, model, prefix.length);

    const blockProps = {
      type: type,
      text: model.text?.clone(),
      children: model.children,
    };
    doc.deleteBlock(model, { deleteChildren: false });
    const id = doc.addBlock('affine:paragraph', blockProps, parent, index);

    focusTextModel(std, id);
    return id;
  }

  if (matchFlavours(model, ['affine:paragraph']) && model.type !== type) {
    beforeConvert(std, model, prefix.length);

    doc.updateBlock(model, { type });

    focusTextModel(std, model.id);
  }

  // If the model is already a paragraph with the same type, do nothing
  return model.id;
}
