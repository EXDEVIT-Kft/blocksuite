import { css, unsafeCSS } from 'lit';

import { fontSMStyle } from './font';

export const panelBaseColorsStyle = (container: string) => css`
  ${unsafeCSS(container)} {
    color: var(--algogrind-text-paragraph-color);
    background: var(--algogrind-overlay-panel-background-color);
  }
`;

export const panelBaseStyle = (container: string) => css`
  ${unsafeCSS(container)} {
    display: flex;
    align-items: center;
    gap: 8px;
    width: max-content;
    padding: 0 6px 0 8px;
    border-radius: 8px;
    box-shadow: var(--algogrind-ring), var(--algogrind-shadow-medium);
  }
  ${panelBaseColorsStyle(container)}
  ${fontSMStyle(container)}
`;
