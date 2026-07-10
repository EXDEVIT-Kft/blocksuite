import { style } from '@vanilla-extract/css';

export const host = style({});

export const container = style({
  display: 'flex',
  width: '100%',
  height: '40px',
  alignItems: 'center',
  justifyContent: 'space-between',
  boxSizing: 'border-box',
  padding: '8px 16px',
});

export const noteSettingContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const label = style({
  width: '119px',
  height: '22px',
  fontWeight: 500,
  lineHeight: '22px',
  color: 'var(--algogrind-text-heading-6-color)',
  fontFamily: 'var(--algogrind-text-heading-6-family)',
  fontSize: 'var(--algogrind-text-heading-6-size)',
});

export const notePreviewSettingContainer = style({
  display: 'none',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'var(--algogrind-overlay-panel-background-color)',
  boxShadow: 'var(--algogrind-shadow-small)',
  borderRadius: '8px',
  selectors: {
    '&[data-show]': {
      display: 'flex',
    },
  },
});
