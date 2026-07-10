import { style } from '@vanilla-extract/css';

export const outlinePanel = style({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'var(--algogrind-background-color)',
  boxSizing: 'border-box',
  width: '100%',
  height: '100%',
  fontFamily: 'var(--algogrind-text-paragraph-family)',
  paddingTop: '8px',
  position: 'relative',
});
