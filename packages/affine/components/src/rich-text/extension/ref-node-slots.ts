import type { ExtensionType } from '@algogrind/block-std';

import { createIdentifier } from '@algogrind/global/di';
import { Slot } from '@algogrind/global/utils';

import type { RefNodeSlots } from '../inline/index.js';

export const RefNodeSlotsProvider =
  createIdentifier<RefNodeSlots>('AffineRefNodeSlots');

export function RefNodeSlotsExtension(
  slots: RefNodeSlots = {
    docLinkClicked: new Slot(),
  }
): ExtensionType {
  return {
    setup: di => {
      di.addImpl(RefNodeSlotsProvider, () => slots);
    },
  };
}
