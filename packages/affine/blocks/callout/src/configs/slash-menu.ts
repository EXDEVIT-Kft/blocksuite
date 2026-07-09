import { focusBlockEnd } from '@blocksuite/affine-shared/commands';
import { isInsideBlockByFlavour } from '@blocksuite/affine-shared/utils';
import { type SlashMenuConfig } from '@blocksuite/affine-widget-slash-menu';
import { FontIcon } from '@blocksuite/icons/lit';

import { calloutTooltip } from './tooltips';

export const calloutSlashMenuConfig: SlashMenuConfig = {
  items: [
    {
      name: 'Kiemelés',
      description: 'Emeld ki a fontos gondolataidat.',
      icon: FontIcon(),
      tooltip: {
        figure: calloutTooltip,
        caption: 'Kiemelés',
      },
      searchAlias: ['callout', 'kiemelés'],
      group: '0_Alapvető@9',
      when: ({ model }) => {
        return !isInsideBlockByFlavour(
          model.store,
          model,
          'affine:edgeless-text'
        );
      },
      action: ({ model, std }) => {
        const { store } = model;
        const parent = store.getParent(model);
        if (!parent) return;

        const index = parent.children.indexOf(model);
        if (index === -1) return;
        const calloutId = store.addBlock(
          'affine:callout',
          {},
          parent,
          index + 1
        );
        if (!calloutId) return;
        const paragraphId = store.addBlock('affine:paragraph', {}, calloutId);
        if (!paragraphId) return;
        std.host.updateComplete
          .then(() => {
            const paragraph = std.view.getBlock(paragraphId);
            if (!paragraph) return;
            std.command.exec(focusBlockEnd, {
              focusBlock: paragraph,
            });
          })
          .catch(console.error);
      },
    },
  ],
};
