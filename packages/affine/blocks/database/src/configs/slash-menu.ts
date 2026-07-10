import { getSelectedModelsCommand } from '@blocksuite/affine-shared/commands';
import {
  FeatureFlagService,
  TelemetryProvider,
} from '@blocksuite/affine-shared/services';
import { isInsideBlockByFlavour } from '@blocksuite/affine-shared/utils';
import { type SlashMenuConfig } from '@blocksuite/affine-widget-slash-menu';
import { viewPresets } from '@blocksuite/data-view/view-presets';
import {
  DatabaseKanbanViewIcon,
  DatabaseTableViewIcon,
  TodayIcon,
} from '@blocksuite/icons/lit';

import { insertDatabaseBlockCommand } from '../commands';
import { KanbanViewTooltip, TableViewTooltip } from './tooltips';

export const databaseSlashMenuConfig: SlashMenuConfig = {
  disableWhen: ({ model }) => model.flavour === 'affine:database',
  items: [
    {
      name: 'Táblázat Nézet',
      description: 'Jelenítsd meg az elemeket táblázatban.',
      searchAlias: ['database', 'table', 'táblázat', 'adatbázis'],
      icon: DatabaseTableViewIcon(),
      tooltip: {
        figure: TableViewTooltip,
        caption: 'Táblázat Nézet',
      },
      group: '7_Adatbázis@0',
      // [ALGOGRIND] database creation gated behind feature flag (fork commit 714bff02a)
      when: ({ std, model }) =>
        !!std.get(FeatureFlagService).getFlag('algogrind_enable_database') &&
        !isInsideBlockByFlavour(model.store, model, 'affine:edgeless-text'),
      action: ({ std }) => {
        std.command
          .chain()
          .pipe(getSelectedModelsCommand)
          .pipe(insertDatabaseBlockCommand, {
            viewType: viewPresets.tableViewMeta.type,
            place: 'after',
            removeEmptyLine: true,
          })
          .pipe(({ insertedDatabaseBlockId }) => {
            if (insertedDatabaseBlockId) {
              const telemetry = std.getOptional(TelemetryProvider);
              telemetry?.track('BlockCreated', {
                blockType: 'affine:database',
              });
            }
          })
          .run();
      },
    },

    {
      name: 'Naptár Nézet',
      description: 'Jelenítsd meg az elemeket dátum szerint naptárban.',
      searchAlias: ['database', 'calendar', 'naptár', 'adatbázis'],
      icon: TodayIcon(),
      group: '7_Adatbázis@1',
      // [ALGOGRIND] database creation gated behind feature flag (fork commit 714bff02a)
      when: ({ std, model }) =>
        !!std.get(FeatureFlagService).getFlag('algogrind_enable_database') &&
        !isInsideBlockByFlavour(model.store, model, 'affine:edgeless-text'),
      action: ({ std }) => {
        std.command
          .chain()
          .pipe(getSelectedModelsCommand)
          .pipe(insertDatabaseBlockCommand, {
            viewType: viewPresets.calendarViewMeta.type,
            place: 'after',
            removeEmptyLine: true,
          })
          .pipe(({ insertedDatabaseBlockId }) => {
            if (insertedDatabaseBlockId) {
              const telemetry = std.getOptional(TelemetryProvider);
              telemetry?.track('BlockCreated', {
                blockType: 'affine:database',
              });
            }
          })
          .run();
      },
    },

    {
      name: 'Kanban Nézet',
      description: 'Vizualizáld az elvégzendő feladatokat.',
      searchAlias: ['database', 'kanban', 'adatbázis', 'task', 'feladatok'],
      icon: DatabaseKanbanViewIcon(),
      tooltip: {
        figure: KanbanViewTooltip,
        caption: 'Kanban Nézet',
      },
      group: '7_Adatbázis@2',
      // [ALGOGRIND] database creation gated behind feature flag (fork commit 714bff02a)
      when: ({ std, model }) =>
        !!std.get(FeatureFlagService).getFlag('algogrind_enable_database') &&
        !isInsideBlockByFlavour(model.store, model, 'affine:edgeless-text'),
      action: ({ std }) => {
        std.command
          .chain()
          .pipe(getSelectedModelsCommand)
          .pipe(insertDatabaseBlockCommand, {
            viewType: viewPresets.kanbanViewMeta.type,
            place: 'after',
            removeEmptyLine: true,
          })
          .pipe(({ insertedDatabaseBlockId }) => {
            if (insertedDatabaseBlockId) {
              const telemetry = std.getOptional(TelemetryProvider);
              telemetry?.track('BlockCreated', {
                blockType: 'affine:database',
              });
            }
          })
          .run();
      },
    },
  ],
};
