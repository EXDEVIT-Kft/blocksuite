import { AccordionBlockSchema } from '@algogrind/affine-model';
import { BlockService } from '@algogrind/block-std';

export class AccordionBlockService extends BlockService {
  static override readonly flavour = AccordionBlockSchema.model.flavour;
}
