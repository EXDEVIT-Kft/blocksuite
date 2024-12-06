import {
  EmbedFigmaBlockSchema,
  EmbedFigmaStyles,
} from '@algogrind/affine-model';
import { EmbedOptionProvider } from '@algogrind/affine-shared/services';
import { BlockService } from '@algogrind/block-std';

import { figmaUrlRegex } from './embed-figma-model.js';

export class EmbedFigmaBlockService extends BlockService {
  static override readonly flavour = EmbedFigmaBlockSchema.model.flavour;

  override mounted() {
    super.mounted();

    this.std.get(EmbedOptionProvider).registerEmbedBlockOptions({
      flavour: this.flavour,
      urlRegex: figmaUrlRegex,
      styles: EmbedFigmaStyles,
      viewType: 'embed',
    });
  }
}
