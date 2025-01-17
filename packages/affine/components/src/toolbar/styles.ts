import {
  type AffineCssVariables,
  combinedDarkCssVariables,
  combinedLightCssVariables,
} from '@toeverything/theme';
import { unsafeCSS } from 'lit';

const toolbarColorKeys: Array<keyof AffineCssVariables> = [
  //'--algogrind-overlay-panel-background-color',
  '--affine-v2-layer-background-overlayPanel' as never,
  '--affine-background-error-color',
  //'--algogrind-background-color',
  '--affine-background-tertiary-color',
  //'--algogrind-text-paragraph-color',
  '--affine-icon-secondary',
  //'--algogrind-border-color',
  '--algogrind-border-color',
  //'--algogrind-text-paragraph-color',
  //'--algogrind-hover-color',
  //'--algogrind-hover-color-filled',
];

export const lightToolbarStyles = toolbarColorKeys.map(
  key => `${key}: ${unsafeCSS(combinedLightCssVariables[key])};`
);

export const darkToolbarStyles = toolbarColorKeys.map(
  key => `${key}: ${unsafeCSS(combinedDarkCssVariables[key])};`
);
