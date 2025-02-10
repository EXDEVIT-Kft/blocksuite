import type { BlockModel } from '@algogrind/store';

export type DocRemoteSelectionConfig = {
  blockSelectionBackgroundTransparent: (block: BlockModel) => boolean;
};
