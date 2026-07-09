import { DefaultTool } from '@blocksuite/affine-block-surface';
import { toggleEmbedCardCreateModal } from '@blocksuite/affine-components/embed-card-modal';
import type { SlashMenuConfig } from '@blocksuite/affine-widget-slash-menu';
import { GithubDuotoneIcon } from '@blocksuite/icons/lit';
import { GfxControllerIdentifier } from '@blocksuite/std/gfx';

import { GithubRepoTooltip } from './tooltips';

export const embedGithubSlashMenuConfig: SlashMenuConfig = {
  items: [
    {
      name: 'GitHub',
      description: 'Hivatkozz egy GitHub forrásra.',
      icon: GithubDuotoneIcon(),
      tooltip: {
        figure: GithubRepoTooltip,
        caption: 'GitHub Repo',
      },
      searchAlias: ['embed', 'beágyaz'],
      group: '4_Tartalom & Média@7',
      when: ({ model }) =>
        model.store.schema.flavourSchemaMap.has('affine:embed-github'),
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
            'GitHub',
            'A hozzáadott GitHub issue vagy Pull Request hivatkozás kártyanézetben lesz megjelenítve.',
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
