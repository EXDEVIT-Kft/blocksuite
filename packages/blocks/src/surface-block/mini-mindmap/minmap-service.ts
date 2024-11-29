import { RootBlockSchema } from '@algogrind/affine-model';
import { BlockService } from '@algogrind/block-std';
import { Slot } from '@algogrind/store';

export class MindmapService extends BlockService {
  static override readonly flavour = RootBlockSchema.model.flavour;

  requestCenter = new Slot();

  center() {
    this.requestCenter.emit();
  }

  override mounted(): void {}
}
