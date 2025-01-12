import { unsafeCSS } from 'lit';

export const FONT_BASE = unsafeCSS(`
  font-family: var(--algogrind-text-paragraph-family);
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-style: normal;
`);

export const FONT_SM = unsafeCSS(`
  ${FONT_BASE};
  font-size: var(--algogrind-text-small-size);
  font-weight: 500;
  line-height: 22px;
`);

export const FONT_XS = unsafeCSS(`
  ${FONT_BASE};
  font-size: var(--algogrind-text-caption-size);
  font-weight: 500;
  line-height: 20px;
`);
