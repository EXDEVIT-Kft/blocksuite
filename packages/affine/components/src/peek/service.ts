import type { ExtensionType } from '@algogrind/block-std';

import { createIdentifier } from '@algogrind/global/di';

import type { PeekViewService } from './type.js';

export const PeekViewProvider = createIdentifier<PeekViewService>(
  'AffinePeekViewProvider'
);

export function PeekViewExtension(service: PeekViewService): ExtensionType {
  return {
    setup: di => {
      di.addImpl(PeekViewProvider, () => service);
    },
  };
}
