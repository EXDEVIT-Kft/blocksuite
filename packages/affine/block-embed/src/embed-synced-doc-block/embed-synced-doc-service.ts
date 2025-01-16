import { EmbedSyncedDocBlockSchema } from '@algogrind/affine-model';
import { BlockService } from '@algogrind/block-std';

export class EmbedSyncedDocBlockService extends BlockService {
  static override readonly flavour = EmbedSyncedDocBlockSchema.model.flavour;
}
