import type { BlockStdScope } from '@blocksuite/block-std';
import type { BlockModel, Doc } from '@blocksuite/store';

import { focusTextModel } from '@blocksuite/affine-components/rich-text';

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
