import { cssVarV2 } from '@toeverything/theme/v2';
import { globalStyle, style } from '@vanilla-extract/css';

export const outlineBlockPreview = style({
  fontFamily: 'var(--algogrind-text-heading-6-family)',
  width: '100%',
  boxSizing: 'border-box',
  borderRadius: '4px',
  padding: '6px 8px',
  whiteSpace: 'nowrap',
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  gap: '8px',

  ':hover': {
    cursor: 'pointer',
    background: 'var(--algogrind-hover-color)',
  },

  selectors: {
    '.active > &': {
      color: 'var(--algogrind-link-color)',
      background: 'var(--algogrind-hover-color)',
    },
    '&:not(:has(span))': {
      display: 'none',
    },
  },
});

export const icon = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '22px',
  height: '22px',
  boxSizing: 'border-box',
  padding: '4px',
  background: 'var(--algogrind-background-secondary-color)',
  borderRadius: '4px',
  color: 'var(--algogrind-text-paragraph-color)',
});

export const iconDisabled = style({
  color: cssVarV2('icon/disable'),
});

export const text = style({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  flex: 1,
  fontSize: 'var(--algogrind-text-small-size)',
  lineHeight: '22px',
  height: '22px',
});

export const textGeneral = style({
  fontWeight: 400,
  paddingLeft: '28px',
});

export const subtypeStyles = {
  title: style({
    fontWeight: 600,
    paddingLeft: '0',
  }),
  h1: style({
    fontWeight: 500,
    paddingLeft: '0',
  }),
  h2: style({
    fontWeight: 500,
    paddingLeft: '4px',
  }),
  h3: style({
    fontWeight: 500,
    paddingLeft: '12px',
  }),
  h4: style({
    fontWeight: 500,
    paddingLeft: '16px',
  }),
  h5: style({
    fontWeight: 500,
    paddingLeft: '20px',
  }),
  h6: style({
    fontWeight: 500,
    paddingLeft: '24px',
  }),
};

export const textSpan = style({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const linkedDocText = style({
  fontSize: 'inherit',
  boxShadow: 'var(--algogrind-ring)',
  whiteSpace: 'break-spaces',
  marginRight: '2px',
});

export const linkedDocPreviewUnavailable = style({
  color: 'var(--algogrind-text-disabled-color)',
});

export const linkedDocPreviewAvailable = style({});
globalStyle(`${linkedDocPreviewAvailable} > svg`, {
  marginBottom: '0.1em',
});

export const linkedDocTextUnavailable = style({
  color: 'var(--algogrind-text-disabled-color)',
  textDecoration: 'line-through',
});
