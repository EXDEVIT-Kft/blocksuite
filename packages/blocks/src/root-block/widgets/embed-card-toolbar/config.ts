import type { MenuItemGroup } from '@algogrind/affine-components/toolbar';

import {
  CopyIcon,
  DeleteIcon,
  DuplicateIcon,
  PlusIcon,
  RefreshIcon,
} from '@algogrind/affine-components/icons';
import { toast } from '@algogrind/affine-components/toast';
import { getBlockProps } from '@algogrind/affine-shared/utils';
import { Slice } from '@algogrind/store';

import type { EmbedCardToolbarContext } from './context.js';

import { insertNewlineAfterCurrent } from '../../../utils/insert-newline-after-current.js';
import {
  isAttachmentBlock,
  isBookmarkBlock,
  isEmbeddedLinkBlock,
  isImageBlock,
} from '../../edgeless/utils/query.js';

export const BUILT_IN_GROUPS: MenuItemGroup<EmbedCardToolbarContext>[] = [
  {
    type: 'clipboard',
    items: [
      {
        type: 'copy',
        label: 'Másolás',
        icon: CopyIcon,
        disabled: ({ doc }) => doc.readonly,
        action: async ({ host, doc, std, blockComponent, close }) => {
          const slice = Slice.fromModels(doc, [blockComponent.model]);
          await std.clipboard.copySlice(slice);
          toast(host, 'Copied link to clipboard');
          close();
        },
      },
      {
        type: 'duplicate',
        label: 'Duplikálás',
        icon: DuplicateIcon,
        disabled: ({ doc }) => doc.readonly,
        action: ({ doc, blockComponent, close }) => {
          const model = blockComponent.model;
          const blockProps = getBlockProps(model);
          const { width, height, xywh, rotate, zIndex, ...duplicateProps } =
            blockProps;

          const parent = doc.getParent(model);
          const index = parent?.children.indexOf(model);
          doc.addBlock(
            model.flavour as BlockSuite.Flavour,
            duplicateProps,
            parent,
            index
          );
          close();
        },
      },
      {
        type: 'reload',
        label: 'Újratöltés',
        icon: RefreshIcon,
        disabled: ({ doc }) => doc.readonly,
        action: ({ blockComponent, close }) => {
          blockComponent?.refreshData();
          close();
        },
        when: ({ blockComponent }) => {
          const model = blockComponent.model;

          return (
            !!model &&
            (isImageBlock(model) ||
              isBookmarkBlock(model) ||
              isAttachmentBlock(model) ||
              isEmbeddedLinkBlock(model))
          );
        },
      },
      {
        type: 'newline',
        label: 'Új sor utána',
        icon: PlusIcon,
        when: ({ doc }) => !doc.readonly,
        action: ({ blockComponent, doc, std }) => {
          insertNewlineAfterCurrent(blockComponent.model, doc, std);
        },
      },
    ],
  },
  {
    type: 'delete',
    items: [
      {
        type: 'delete',
        label: 'Törlés',
        icon: DeleteIcon,
        disabled: ({ doc }) => doc.readonly,
        action: ({ doc, blockComponent, close }) => {
          doc.deleteBlock(blockComponent.model);
          close();
        },
      },
    ],
  },
];
