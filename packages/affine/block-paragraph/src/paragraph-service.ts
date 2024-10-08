import {
  type ParagraphBlockModel,
  ParagraphBlockSchema,
} from '@algogrind/affine-model';
import { BlockService } from '@algogrind/block-std';

export class ParagraphBlockService extends BlockService {
  static override readonly flavour = ParagraphBlockSchema.model.flavour;

  placeholderGenerator: (model: ParagraphBlockModel) => string = model => {
    if (model.type === 'text') {
      return "Írj be '/' jelet az utasításokért...";
    }

    const placeholders = {
      h1: 'Heading 1',
      h2: 'Heading 2',
      h3: 'Heading 3',
      h4: 'Heading 4',
      h5: 'Heading 5',
      h6: 'Heading 6',
      quote: '',
    };
    return placeholders[model.type];
  };
}
