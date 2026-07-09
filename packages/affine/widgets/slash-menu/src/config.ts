import { toast } from '@blocksuite/affine-components/toast';
import type {
  ListBlockModel,
  ParagraphBlockModel,
} from '@blocksuite/affine-model';
import { insertContent } from '@blocksuite/affine-rich-text';
import {
  ArrowDownBigIcon,
  ArrowUpBigIcon,
  CopyIcon,
  DeleteIcon,
  DualLinkIcon,
  NowIcon,
  TodayIcon,
  TomorrowIcon,
  YesterdayIcon,
} from '@blocksuite/icons/lit';
import { type DeltaInsert, Slice, Text } from '@blocksuite/store';

import { slashMenuToolTips } from './tooltips';
import type { SlashMenuConfig } from './types';
import { formatDate, formatTime } from './utils';

export const defaultSlashMenuConfig: SlashMenuConfig = {
  items: () => {
    const now = new Date();
    const tomorrow = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return [
      {
        name: 'Ma',
        icon: TodayIcon(),
        tooltip: slashMenuToolTips['Today'],
        searchAlias: ['today'],
        description: formatDate(now),
        group: '6_Dátumok@0',
        action: ({ std, model }) => {
          insertContent(std, model, formatDate(now));
        },
      },
      {
        name: 'Holnap',
        icon: TomorrowIcon(),
        tooltip: slashMenuToolTips['Tomorrow'],
        searchAlias: ['tomorrow'],
        description: formatDate(tomorrow),
        group: '6_Dátumok@1',
        action: ({ std, model }) => {
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          insertContent(std, model, formatDate(tomorrow));
        },
      },
      {
        name: 'Tegnap',
        icon: YesterdayIcon(),
        tooltip: slashMenuToolTips['Yesterday'],
        searchAlias: ['yesterday'],
        description: formatDate(yesterday),
        group: '6_Dátumok@2',
        action: ({ std, model }) => {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          insertContent(std, model, formatDate(yesterday));
        },
      },
      {
        name: 'Most',
        icon: NowIcon(),
        tooltip: slashMenuToolTips['Now'],
        searchAlias: ['now'],
        description: formatTime(now),
        group: '6_Dátumok@3',
        action: ({ std, model }) => {
          insertContent(std, model, formatTime(now));
        },
      },
      {
        name: 'Felfele Mozgatás',
        description: 'Jelenlegi sor feljebb mozgatása.',
        icon: ArrowUpBigIcon(),
        tooltip: slashMenuToolTips['Move Up'],
        searchAlias: ['művelet', 'fel', 'move up', 'operation'],
        group: '8_Műveletek@0',
        action: ({ std, model }) => {
          const { host } = std;
          const previousSiblingModel = host.store.getPrev(model);
          if (!previousSiblingModel) return;

          const parentModel = host.store.getParent(previousSiblingModel);
          if (!parentModel) return;

          host.store.moveBlocks(
            [model],
            parentModel,
            previousSiblingModel,
            true
          );
        },
      },
      {
        name: 'Lefele Mozgatás',
        description: 'Jelenlegi sor lejjebb mozgatása.',
        icon: ArrowDownBigIcon(),
        tooltip: slashMenuToolTips['Move Down'],
        searchAlias: ['művelet', 'le', 'move down', 'operation'],
        group: '8_Műveletek@1',
        action: ({ std, model }) => {
          const { host } = std;
          const nextSiblingModel = host.store.getNext(model);
          if (!nextSiblingModel) return;

          const parentModel = host.store.getParent(nextSiblingModel);
          if (!parentModel) return;

          host.store.moveBlocks([model], parentModel, nextSiblingModel, false);
        },
      },
      {
        name: 'Másolás',
        description: 'Jelenlegi sor vágólapra másolása.',
        icon: CopyIcon(),
        tooltip: slashMenuToolTips['Copy'],
        searchAlias: ['művelet', 'copy', 'operation'],
        group: '8_Műveletek@2',
        action: ({ std, model }) => {
          const slice = Slice.fromModels(std.store, [model]);

          std.clipboard
            .copy(slice)
            .then(() => {
              toast(std.host, 'Tartalom a vágólapra másolva');
            })
            .catch(e => {
              console.error(e);
            });
        },
      },
      {
        name: 'Duplikálás',
        description: 'Jelenlegi sor duplikálása.',
        icon: DualLinkIcon(),
        tooltip: slashMenuToolTips['Copy'],
        searchAlias: ['művelet', 'duplicate', 'operation'],
        group: '8_Műveletek@3',
        action: ({ std, model }) => {
          if (!model.text || !(model.text instanceof Text)) {
            console.error("Can't duplicate a block without text");
            return;
          }
          const { host } = std;
          const parent = host.store.getParent(model);
          if (!parent) {
            console.error(
              'Failed to duplicate block! Parent not found: ' +
                model.id +
                '|' +
                model.flavour
            );
            return;
          }
          const index = parent.children.indexOf(model);

          // FIXME: this clone is not correct
          host.store.addBlock(
            model.flavour,
            {
              type: (model as ParagraphBlockModel).props.type,
              text: new Text(
                (
                  model as ParagraphBlockModel
                ).props.text.toDelta() as DeltaInsert[]
              ),
              checked: (model as ListBlockModel).props.checked,
            },
            host.store.getParent(model),
            index
          );
        },
      },
      {
        name: 'Törlés',
        description: 'Jelenlegi sor törlése.',
        searchAlias: ['művelet', 'remove', 'operation'],
        icon: DeleteIcon(),
        tooltip: slashMenuToolTips['Delete'],
        group: '8_Műveletek@4',
        action: ({ std, model }) => {
          std.host.store.deleteBlock(model);
        },
      },
    ];
  },
};
