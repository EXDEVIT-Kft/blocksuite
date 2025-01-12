import { unsafeCSS } from 'lit';

import { FONT_SM } from './font.js';

export const PANEL_BASE_COLORS = unsafeCSS(`
  color: var(--algogrind-text-paragraph-color);
  background: var(--algogrind-overlay-panel-background-color);
`);

export const PANEL_BASE = unsafeCSS(`
  display: flex;
  align-items: center;
  gap: 8px;
  width: min(50ch, calc(100% - 2rem));
  padding: 0 6px 0 8px;
  border-radius: 8px;
  box-shadow: var(--algogrind-ring), var(--algogrind-shadow-medium);

  ${PANEL_BASE_COLORS};
  ${FONT_SM};
`);
