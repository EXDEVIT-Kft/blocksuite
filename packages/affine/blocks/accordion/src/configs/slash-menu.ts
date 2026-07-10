import type { AccordionType } from '@blocksuite/affine-model';
import { focusTextModel } from '@blocksuite/affine-rich-text';
import { isInsideBlockByFlavour } from '@blocksuite/affine-shared/utils';
import type {
  SlashMenuActionItem,
  SlashMenuConfig,
  SlashMenuContext,
} from '@blocksuite/affine-widget-slash-menu';
import { ArrowUpSmallIcon } from '@blocksuite/icons/lit';
import { Text } from '@blocksuite/store';

import { AccordionTooltip } from './tooltips';

const createAccordionItem = (level: 1 | 2 | 3): SlashMenuActionItem => ({
  name: `Összecsukható Címsor ${level}`,
  description: `Összecsukható tartalmú Címsor ${level}.`,
  icon: ArrowUpSmallIcon(),
  tooltip: {
    figure: AccordionTooltip,
    caption: 'Összecsukható Címsor',
  },
  searchAlias: [
    'accordion',
    'accordion heading',
    'legördülő',
    `legördülő címsor ${level}`,
  ],
  group: `0_Alapvető@${12 + level}`,
  when: ({ model }: SlashMenuContext) => {
    return (
      model.store.schema.flavourSchemaMap.has('algogrind:accordion') &&
      !isInsideBlockByFlavour(model.store, model, 'affine:edgeless-text')
    );
  },
  action: ({ model, std }: SlashMenuContext) => {
    const { store } = model;
    const parent = store.getParent(model);
    if (!parent) return;

    const index = parent.children.indexOf(model);
    if (index === -1) return;

    store.captureSync();
    const accordionId = store.addBlock(
      'algogrind:accordion',
      {
        type: `h${level}` as AccordionType,
        title: new Text(),
      },
      parent,
      index + 1
    );
    if (!accordionId) return;

    // Remove the original block if it is an empty paragraph,
    // mirroring the old fork's updateBlockType behaviour.
    if (
      model.flavour === 'affine:paragraph' &&
      (model.text?.length ?? 0) === 0
    ) {
      store.deleteBlock(model);
    }

    std.host.updateComplete
      .then(() => {
        focusTextModel(std, accordionId);
      })
      .catch(console.error);
  },
});

export const accordionSlashMenuConfig: SlashMenuConfig = {
  items: [createAccordionItem(1), createAccordionItem(2), createAccordionItem(3)],
};
