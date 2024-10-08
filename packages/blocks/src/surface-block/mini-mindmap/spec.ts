import type { BlockSchema } from '@algogrind/store';
import type { z } from 'zod';

import { SurfaceBlockSchema } from '@algogrind/affine-block-surface';
import { RootBlockSchema } from '@algogrind/affine-model';
import {
  BlockViewExtension,
  type ExtensionType,
  FlavourExtension,
} from '@algogrind/block-std';
import { literal } from 'lit/static-html.js';

import { MindmapService } from './minmap-service.js';
import { MindmapSurfaceBlockService } from './surface-service.js';

export const MiniMindmapSpecs: ExtensionType[] = [
  FlavourExtension('affine:page'),
  MindmapService,
  BlockViewExtension('affine:page', literal`mini-mindmap-root-block`),

  FlavourExtension('affine:surface'),
  MindmapSurfaceBlockService,
  BlockViewExtension('affine:surface', literal`mini-mindmap-surface-block`),
];

export const MiniMindmapSchema: z.infer<typeof BlockSchema>[] = [
  RootBlockSchema,
  SurfaceBlockSchema,
];
