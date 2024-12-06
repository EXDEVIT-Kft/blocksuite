import { RootBlockSchema } from '@algogrind/affine-model';
import { Slot } from '@algogrind/store';

import type { Viewport } from '../../_common/utils/index.js';

import { RootService } from '../root-service.js';

export class PageRootService extends RootService {
  static override readonly flavour = RootBlockSchema.model.flavour;

  slots = {
    viewportUpdated: new Slot<Viewport>(),
  };
}
