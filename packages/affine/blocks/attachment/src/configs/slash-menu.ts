import { openSingleFileWith } from '@blocksuite/affine-shared/utils';
import { type SlashMenuConfig } from '@blocksuite/affine-widget-slash-menu';
import { ExportToPdfIcon, FileIcon } from '@blocksuite/icons/lit';

import { addSiblingAttachmentBlocks } from '../utils';
import { AttachmentTooltip, PDFTooltip } from './tooltips';

export const attachmentSlashMenuConfig: SlashMenuConfig = {
  items: [
    {
      name: 'Fájl',
      description: 'Mellékelj egy tetszőleges fájlt.',
      icon: FileIcon(),
      tooltip: {
        figure: AttachmentTooltip,
        caption: 'Fájl beszúrása',
      },
      searchAlias: ['file', 'attachment', 'melléklet', 'forrás'],
      group: '4_Tartalom & Média@3',
      when: ({ model }) =>
        model.store.schema.flavourSchemaMap.has('affine:attachment'),
      action: ({ std, model }) => {
        (async () => {
          const file = await openSingleFileWith();
          if (!file) return;

          await addSiblingAttachmentBlocks(std, [file], model);
          if (model.text?.length === 0) {
            std.store.deleteBlock(model);
          }
        })().catch(console.error);
      },
    },
    {
      name: 'PDF',
      description: 'Tölts fel egy PDF fájlt a dokumentumba.',
      icon: ExportToPdfIcon(),
      tooltip: {
        figure: PDFTooltip,
        caption: 'PDF',
      },
      searchAlias: ['pdf', 'fájl'],
      group: '4_Tartalom & Média@4',
      when: ({ model }) =>
        model.store.schema.flavourSchemaMap.has('affine:attachment'),
      action: ({ std, model }) => {
        (async () => {
          const file = await openSingleFileWith();
          if (!file) return;

          await addSiblingAttachmentBlocks(std, [file], model);
          if (model.text?.length === 0) {
            std.store.deleteBlock(model);
          }
        })().catch(console.error);
      },
    },
  ],
};
