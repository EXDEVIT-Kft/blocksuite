import { DefaultTool } from '@blocksuite/affine-block-surface';
import { toggleEmbedCardCreateModal } from '@blocksuite/affine-components/embed-card-modal';
import type { SlashMenuConfig } from '@blocksuite/affine-widget-slash-menu';
import { LoomLogoDuotoneIcon } from '@blocksuite/icons/lit';
import { GfxControllerIdentifier } from '@blocksuite/std/gfx';

import { LoomTooltip } from './tooltips';

export const embedLoomSlashMenuConfig: SlashMenuConfig = {
  items: [
    {
      name: 'Loom Videó',
      icon: LoomLogoDuotoneIcon(),
      description: 'Ágyazz be egy Loom videót.',
      tooltip: {
        figure: LoomTooltip,
        caption: 'Loom Videó',
      },
      searchAlias: ['embed', 'beágyaz', 'loom'],
      group: '4_Tartalom & Média@9',
      when: ({ model }) =>
        model.store.schema.flavourSchemaMap.has('affine:embed-loom'),
      action: ({ std, model }) => {
        (async () => {
          const { host } = std;
          const parentModel = host.store.getParent(model);
          if (!parentModel) {
            return;
          }
          const index = parentModel.children.indexOf(model) + 1;
          await toggleEmbedCardCreateModal(
            host,
            'Loom Videó',
            'A hozzáadott Loom videó hivatkozás beágyazott nézetben fog megjelenni.',
            { mode: 'page', parentModel, index },
            ({ mode }) => {
              if (mode === 'edgeless') {
                const gfx = std.get(GfxControllerIdentifier);
                gfx.tool.setTool(DefaultTool);
              }
            }
          );
          if (model.text?.length === 0) std.store.deleteBlock(model);
        })().catch(console.error);
      },
    },
  ],
};
