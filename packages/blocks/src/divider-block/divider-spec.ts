import { BlockViewExtension, type ExtensionType } from '@algogrind/block-std';
import { literal } from 'lit/static-html.js';

export const DividerBlockSpec: ExtensionType[] = [
  BlockViewExtension('affine:divider', literal`affine-divider`),
];
