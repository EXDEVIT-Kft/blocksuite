import type { ReferenceParams } from '@algogrind/affine-model';
import type { ExtensionType } from '@algogrind/block-std';

import { createIdentifier } from '@algogrind/global/di';

export interface GenerateDocUrlService {
  generateDocUrl: (docId: string, params?: ReferenceParams) => string | void;
}

export const GenerateDocUrlProvider = createIdentifier<GenerateDocUrlService>(
  'GenerateDocUrlService'
);

export function GenerateDocUrlExtension(
  generateDocUrlProvider: GenerateDocUrlService
): ExtensionType {
  return {
    setup: di => {
      di.addImpl(GenerateDocUrlProvider, generateDocUrlProvider);
    },
  };
}
