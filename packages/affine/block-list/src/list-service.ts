import type { BlockComponent } from '@algogrind/block-std';

import { ListBlockSchema } from '@algogrind/affine-model';
import { DragHandleConfigExtension } from '@algogrind/affine-shared/services';
import { matchFlavours } from '@algogrind/affine-shared/utils';
import { BlockService } from '@algogrind/block-std';

import { correctNumberedListsOrderToPrev } from './commands/utils.js';
import { listPrefix, toggleStyles } from './styles.js';
import { getListIcon } from './utils/get-list-icon.js';

export class ListBlockService extends BlockService {
  static override readonly flavour = ListBlockSchema.model.flavour;

  readonly styles = {
    icon: getListIcon,
    prefix: listPrefix,
    toggle: toggleStyles,
  };
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
