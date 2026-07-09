import { DefaultTool } from '@blocksuite/affine-block-surface';
import { toggleEmbedCardCreateModal } from '@blocksuite/affine-components/embed-card-modal';
import { BookmarkBlockSchema } from '@blocksuite/affine-model';
import {
  type SlashMenuConfig,
  SlashMenuConfigIdentifier,
} from '@blocksuite/affine-widget-slash-menu';
import { LinkIcon } from '@blocksuite/icons/lit';
import { GfxControllerIdentifier } from '@blocksuite/std/gfx';
import type { ExtensionType } from '@blocksuite/store';

import { LinkTooltip } from './tooltips';

const bookmarkSlashMenuConfig: SlashMenuConfig = {
  items: [
    {
      name: 'Weboldal',
      description: 'Hivatkozz egy külső weboldalra elegánsan.',
      icon: LinkIcon(),
      tooltip: {
        figure: LinkTooltip,
        caption: 'Weboldal hivatkozása',
      },
      searchAlias: ['hivatkozás', 'link', 'bookmark', 'website'],
      group: '4_Tartalom & Média@2',
      when: ({ model }) =>
        model.store.schema.flavourSchemaMap.has('affine:bookmark'),
      action: ({ std, model }) => {
        const { host } = std;
        const parentModel = host.store.getParent(model);
        if (!parentModel) {
          return;
        }
        const index = parentModel.children.indexOf(model) + 1;
        toggleEmbedCardCreateModal(
          host,
          'Weboldal hivatkozása',
          'A hozzáadott weboldal kártya nézetben lesz megjelenítve.',
          { mode: 'page', parentModel, index },
          ({ mode }) => {
            if (mode === 'edgeless') {
              const gfx = std.get(GfxControllerIdentifier);
              gfx.tool.setTool(DefaultTool);
            }
          }
        )
          .then(() => {
            if (model.text?.length === 0) {
              model.store.deleteBlock(model);
            }
          })
          .catch(console.error);
      },
    },
  ],
};

export const BookmarkSlashMenuConfigIdentifier = SlashMenuConfigIdentifier(
  BookmarkBlockSchema.model.flavour
);

export const BookmarkSlashMenuConfigExtension: ExtensionType = {
  setup: di => {
    di.addImpl(BookmarkSlashMenuConfigIdentifier, bookmarkSlashMenuConfig);
  },
};
