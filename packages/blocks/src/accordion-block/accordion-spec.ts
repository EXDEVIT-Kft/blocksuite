import {
  BlockViewExtension,
  type ExtensionType,
  FlavourExtension,
} from '@algogrind/block-std';
import { literal } from 'lit/static-html.js';

export const AccordionBlockSpec: ExtensionType[] = [
  FlavourExtension('algogrind:accordion'),
  BlockViewExtension('algogrind:accordion', literal`algogrind-accordion`),
];
