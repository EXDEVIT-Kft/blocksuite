import {
  BlockViewExtension,
  type ExtensionType,
  FlavourExtension,
} from '@algogrind/block-std';
import { literal } from 'lit/static-html.js';

import {
  AttachmentBlockService,
  AttachmentDragHandleOption,
} from './attachment-service.js';

export const AttachmentBlockSpec: ExtensionType[] = [
  FlavourExtension('affine:attachment'),
  AttachmentBlockService,
  BlockViewExtension('affine:attachment', model => {
    return model.parent?.flavour === 'affine:surface'
      ? literal`affine-edgeless-attachment`
      : literal`affine-attachment`;
  }),
  AttachmentDragHandleOption,
];
