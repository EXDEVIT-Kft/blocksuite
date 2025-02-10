import type { ReferenceInfo } from '@algogrind/affine-model';
import type { EditorHost, ExtensionType } from '@algogrind/block-std';

import { createIdentifier } from '@algogrind/global/di';

export interface EmbedLinkedDocBlockConfig {
  handleClick?: (
    e: MouseEvent,
    host: EditorHost,
    referenceInfo: ReferenceInfo
  ) => void;
  handleDoubleClick?: (
    e: MouseEvent,
    host: EditorHost,
    referenceInfo: ReferenceInfo
  ) => void;
}

export const EmbedLinkedDocBlockConfigIdentifier =
  createIdentifier<EmbedLinkedDocBlockConfig>('EmbedLinkedDocBlockConfig');

export function EmbedLinkedDocBlockConfigExtension(
  config: EmbedLinkedDocBlockConfig
): ExtensionType {
  return {
    setup: di => {
      di.addImpl(EmbedLinkedDocBlockConfigIdentifier, () => config);
    },
  };
}
