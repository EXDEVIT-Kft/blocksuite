import { ImageIcon } from '@blocksuite/affine-editor-icons';
import { getSelectedModelsCommand } from '@blocksuite/affine-shared/commands';
import { type SlashMenuConfig } from '@blocksuite/affine-widget-slash-menu';

import { insertImagesCommand } from '../commands';
import { PhotoTooltip } from './tooltips';

export const imageSlashMenuConfig: SlashMenuConfig = {
  items: [
    {
      name: 'Kép',
      description: 'Szúrj be egy képet.',
      icon: ImageIcon({
        width: '20',
        height: '20',
      }),
      tooltip: {
        figure: PhotoTooltip,
        caption: 'Kép beszúrása',
      },
      searchAlias: ['image', 'picture', 'gif', 'grafika'],
      group: '4_Tartalom & Média@1',
      when: ({ model }) =>
        model.store.schema.flavourSchemaMap.has('affine:image'),
      action: ({ std }) => {
        const [success, ctx] = std.command
          .chain()
          .pipe(getSelectedModelsCommand)
          .pipe(insertImagesCommand, { removeEmptyLine: true })
          .run();

        if (success) ctx.insertedImageIds.catch(console.error);
      },
    },
  ],
};
