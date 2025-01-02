import {
  type ParagraphBlockModel,
  ParagraphBlockSchema,
} from '@blocksuite/affine-model';
import { BlockService } from '@blocksuite/block-std';

export class ParagraphBlockService extends BlockService {
  static override readonly flavour = ParagraphBlockSchema.model.flavour;

  placeholderGenerator: (model: ParagraphBlockModel) => string = model => {
    if (model.type === 'text') {
      return "Írj be egy '/' jelet az utasításokért...";
    }

    const placeholders = {
      h1: 'Címsor 1',
      h2: 'Címsor 2',
      h3: 'Címsor 3',
      h4: 'Címsor 4',
      h5: 'Címsor 5',
      h6: 'Címsor 6',
      quote: '',
    };
    return placeholders[model.type];
  };
}
