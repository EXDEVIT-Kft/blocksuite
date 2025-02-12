import type { PropertyMetaConfig } from '@algogrind/data-view';

import { propertyPresets } from '@algogrind/data-view/property-presets';

import { richTextColumnConfig } from '../../database-block/properties/rich-text/cell-renderer.js';

export const queryBlockColumns = [
  propertyPresets.datePropertyConfig,
  propertyPresets.numberPropertyConfig,
  propertyPresets.progressPropertyConfig,
  propertyPresets.selectPropertyConfig,
  propertyPresets.multiSelectPropertyConfig,
  propertyPresets.checkboxPropertyConfig,
];
export const queryBlockHiddenColumns = [richTextColumnConfig];
const queryBlockAllColumns = [...queryBlockColumns, ...queryBlockHiddenColumns];
export const queryBlockAllColumnMap = Object.fromEntries(
  queryBlockAllColumns.map(v => [v.type, v as PropertyMetaConfig])
);
