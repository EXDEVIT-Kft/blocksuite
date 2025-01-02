import type { BlockComponent } from '@algogrind/block-std';

import { ListBlockSchema } from '@algogrind/affine-model';
import { DragHandleConfigExtension } from '@algogrind/affine-shared/services';
import { matchFlavours } from '@algogrind/affine-shared/utils';
import { BlockService } from '@algogrind/block-std';

import { correctNumberedListsOrderToPrev } from './commands/utils.js';

export class ListBlockService extends BlockService {
  static override readonly flavour = ListBlockSchema.model.flavour;
}

export const ListDragHandleOption = DragHandleConfigExtension({
  flavour: ListBlockSchema.model.flavour,
  onDragEnd: ({ draggingElements, editorHost }) => {
    draggingElements.forEach((el: BlockComponent) => {
      const model = el.model;
      const doc = el.doc;
      if (matchFlavours(model, ['affine:list']) && model.type === 'numbered') {
        const next = el.doc.getNext(model);
        editorHost.updateComplete
          .then(() => {
            correctNumberedListsOrderToPrev(doc, model);
            if (next) {
              correctNumberedListsOrderToPrev(doc, next);
            }
          })
          .catch(console.error);
      }
    });
    return false;
  },
});
