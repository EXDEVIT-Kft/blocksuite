import type { ReferenceParams } from '@algogrind/affine-model';
import type { ExtensionType } from '@algogrind/block-std';

import { createIdentifier } from '@algogrind/global/di';

export interface ParseDocUrlService {
  parseDocUrl: (
    url: string
  ) => ({ docId: string } & ReferenceParams) | undefined;
}

export const ParseDocUrlProvider =
  createIdentifier<ParseDocUrlService>('ParseDocUrlService');

export function ParseDocUrlExtension(
  parseDocUrlService: ParseDocUrlService
): ExtensionType {
  return {
    setup: di => {
      di.addImpl(ParseDocUrlProvider, parseDocUrlService);
    },
  };
}
