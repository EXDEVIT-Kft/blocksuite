import type { ExtensionType } from '@algogrind/block-std';

import { EdgelessSurfaceBlockSpec } from '@algogrind/affine-block-surface';
import { FontLoaderService } from '@algogrind/affine-shared/services';

import { EdgelessTextBlockSpec } from '../../edgeless-text-block/edgeless-text-spec.js';
import { FrameBlockSpec } from '../../frame-block/frame-spec.js';
import { LatexBlockSpec } from '../../latex-block/latex-spec.js';
import { EdgelessRootBlockSpec } from '../../root-block/edgeless/edgeless-root-spec.js';
import { EdgelessSurfaceRefBlockSpec } from '../../surface-ref-block/surface-ref-spec.js';
import { EdgelessFirstPartyBlockSpecs } from '../common.js';

export const EdgelessEditorBlockSpecs: ExtensionType[] = [
  EdgelessRootBlockSpec,
  ...EdgelessFirstPartyBlockSpecs,
  EdgelessSurfaceBlockSpec,
  EdgelessSurfaceRefBlockSpec,
  FrameBlockSpec,
  EdgelessTextBlockSpec,
  LatexBlockSpec,
  FontLoaderService,
].flat();
