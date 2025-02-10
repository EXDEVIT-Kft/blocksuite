import type { BlockStdScope } from '@algogrind/block-std';
import type { BlockModel, Doc } from '@algogrind/store';

import { focusTextModel } from '@algogrind/affine-components/rich-text';

export function insertNewlineAfterCurrent(
  model: BlockModel,
  doc: Doc,
  std: BlockStdScope
) {
  const parentModel = doc.getParent(model);
  if (!parentModel) {
    return;
  }
  const index = parentModel.children.indexOf(model) + 1;
  const paragraphId = doc.addBlock(
    'affine:paragraph',
    {},
    parentModel.id,
    index
  );

  focusTextModel(std, paragraphId);
}
