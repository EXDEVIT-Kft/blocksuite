import { SurfaceRefBlockSchema } from '@algogrind/affine-model';
import { BlockService } from '@algogrind/block-std';

export class SurfaceRefBlockService extends BlockService {
  static override readonly flavour = SurfaceRefBlockSchema.model.flavour;
}
