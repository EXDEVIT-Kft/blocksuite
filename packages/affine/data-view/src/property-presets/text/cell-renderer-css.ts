import { css } from '@emotion/css';

export const textStyle = css({
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  width: '100%',
  padding: '0',
  border: 'none',
  fontFamily: 'var(--algogrind-text-paragraph-family)',
  fontSize: 'var(--algogrind-text-paragraph-size)',
  lineHeight: 'var(--algogrind-line-height)',
  color: 'var(--algogrind-text-paragraph-color)',
  fontWeight: '400',
  backgroundColor: 'transparent',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const textInputStyle = css({
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  width: '100%',
  padding: '0',
  border: 'none',
  fontFamily: 'var(--algogrind-text-paragraph-family)',
  fontSize: 'var(--algogrind-text-paragraph-size)',
  lineHeight: 'var(--algogrind-line-height)',
  color: 'var(--algogrind-text-paragraph-color)',
  fontWeight: '400',
  backgroundColor: 'transparent',
  cursor: 'text',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  ':focus': {
    outline: 'none',
  },
});
