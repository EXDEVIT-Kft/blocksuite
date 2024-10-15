import {
  type AccordionBlockModel,
  AccordionBlockSchema,
} from '@algogrind/affine-model';
import { BlockService } from '@algogrind/block-std';

export class AccordionBlockService extends BlockService {
  static override readonly flavour = AccordionBlockSchema.model.flavour;

  placeholderGenerator: (model: AccordionBlockModel) => string = model => {
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
    };

    return placeholders[model.type];
  };
}
