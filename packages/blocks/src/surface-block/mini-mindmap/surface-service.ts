import { SurfaceBlockSchema } from '@algogrind/affine-block-surface';
import { BlockService } from '@algogrind/block-std';

export class MindmapSurfaceBlockService extends BlockService {
  static override readonly flavour = SurfaceBlockSchema.model.flavour;
}
