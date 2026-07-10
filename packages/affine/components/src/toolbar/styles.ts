import {
  type AffineCssVariables,
  combinedDarkCssVariables,
  combinedLightCssVariables,
} from '@toeverything/theme';
import { unsafeCSS } from 'lit';

const toolbarColorKeys: Array<keyof AffineCssVariables> = [
  //'--algogrind-overlay-panel-background-color',
  '--affine-v2-layer-background-overlayPanel' as never,
  '--affine-v2-layer-insideBorder-blackBorder' as never,
  '--affine-v2-icon-primary' as never,
  '--affine-background-error-color',
  //'--algogrind-background-color',
  '--affine-background-tertiary-color',
  //'--algogrind-text-paragraph-color',
  '--affine-icon-secondary',
  '--affine-divider-color',
  // '--algogrind-border-color',
  //'--algogrind-text-paragraph-color',
  //'--algogrind-hover-color',
  //'--algogrind-hover-color-filled',
];

export const lightToolbarStyles = (selector: string) => `
  ${selector}[data-app-theme='light'] {
    ${toolbarColorKeys
      .map(key => `${key}: ${unsafeCSS(combinedLightCssVariables[key])};`)
      .join('\n')}
  }
`;

export const darkToolbarStyles = (selector: string) => `
  ${selector}[data-app-theme='dark'] {
    ${toolbarColorKeys
      .map(key => `${key}: ${unsafeCSS(combinedDarkCssVariables[key])};`)
      .join('\n')}
  }
`;
