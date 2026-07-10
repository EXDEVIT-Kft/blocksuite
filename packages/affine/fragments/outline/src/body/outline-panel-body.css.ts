import { style } from '@vanilla-extract/css';

export const outlinePanelBody = style({
  position: 'relative',
  alignItems: 'start',
  boxSizing: 'border-box',
  width: '100%',
  height: '100%',
  padding: '0 8px',
  flexGrow: 1,
  overflowY: 'scroll',

  selectors: {
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '2px',
    },
    '&:hover::-webkit-scrollbar-thumb': {
      backgroundColor: 'var(--algogrind-scroll-thumb-hover-color)',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
    },
  },
});

export const cardList = style({
  position: 'relative',
});

export const edgelessCardListTitle = style({
  width: '100%',
  fontSize: '14px',
  lineHeight: '24px',
  fontWeight: 500,
  color: 'var(--algogrind-text-secondary)',
  paddingLeft: '8px',
  height: '40px',
  boxSizing: 'border-box',
  padding: '6px 8px',
  marginTop: '8px',
});

export const insertIndicator = style({
  height: '2px',
  borderRadius: '1px',
  backgroundColor: 'var(--algogrind-primary-color)',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  contain: 'layout size',
  width: '100%',
});

export const emptyPanel = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

export const emptyPanelPlaceholder = style({
  marginTop: '240px',
  alignSelf: 'center',
  color: 'var(--algogrind-text-placeholder-color)',
  textAlign: 'center',
  fontSize: 'var(--algogrind-text-paragraph-size)',
  fontFamily: 'var(--algogrind-text-paragraph-family)',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '24px',
});
