import type { EmbedCardStyle } from '@algogrind/affine-model';
import type { Container } from '@algogrind/global/di';

import { Extension } from '@algogrind/block-std';
import { createIdentifier } from '@algogrind/global/di';

export type EmbedOptions = {
  flavour: string;
  urlRegex: RegExp;
  styles: EmbedCardStyle[];
  viewType: 'card' | 'embed';
};

export interface EmbedOptionProvider {
  getEmbedBlockOptions(url: string): EmbedOptions | null;
  registerEmbedBlockOptions(options: EmbedOptions): void;
}

export const EmbedOptionProvider = createIdentifier<EmbedOptionProvider>(
  'AffineEmbedOptionProvider'
);

export class EmbedOptionService
  extends Extension
  implements EmbedOptionProvider
{
  private _embedBlockRegistry = new Set<EmbedOptions>();

  getEmbedBlockOptions = (url: string): EmbedOptions | null => {
    const entries = this._embedBlockRegistry.entries();
    for (const [options] of entries) {
      const regex = options.urlRegex;
      if (regex.test(url)) return options;
    }
    return null;
  };

  registerEmbedBlockOptions = (options: EmbedOptions): void => {
    this._embedBlockRegistry.add(options);
  };

  static override setup(di: Container) {
    di.addImpl(EmbedOptionProvider, EmbedOptionService);
  }
}
