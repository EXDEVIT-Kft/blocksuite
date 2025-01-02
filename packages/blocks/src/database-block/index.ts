import type { DatabaseBlockModel } from '@algogrind/affine-model';

export * from './adapters/markdown.js';
export type { DatabaseOptionsConfig } from './config.js';
export * from './data-source.js';
export * from './database-block.js';
export * from './database-service.js';
export { databaseBlockColumns } from './properties/index.js';
declare global {
  namespace BlockSuite {
    interface BlockModels {
      'affine:database': DatabaseBlockModel;
    }
  }
}
