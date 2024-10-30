import type { ViewMeta } from '@algogrind/data-view';

import { viewConverts, viewPresets } from '@algogrind/data-view/view-presets';

export const databaseBlockViews: ViewMeta[] = [
  viewPresets.tableViewMeta,
  viewPresets.kanbanViewMeta,
];

export const databaseBlockViewMap = Object.fromEntries(
  databaseBlockViews.map(view => [view.type, view])
);
export const databaseBlockViewConverts = [...viewConverts];
