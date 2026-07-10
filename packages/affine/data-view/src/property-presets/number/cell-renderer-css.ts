import { css } from '@emotion/css';

export const numberStyle = css({
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  width: '100%',
  padding: '0',
  border: 'none',
  fontFamily: 'var(--algogrind-text-paragraph-family)',
  fontSize: 'var(--data-view-cell-text-size)',
  lineHeight: 'var(--data-view-cell-text-line-height)',
  color: 'var(--algogrind-text-paragraph-color)',
  fontWeight: '500',
  backgroundColor: 'transparent',
  wordBreak: 'break-all',
});

export const numberInputStyle = css({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  padding: '0',
  border: 'none',
  fontFamily: 'var(--algogrind-text-paragraph-family)',
  fontSize: 'var(--data-view-cell-text-size)',
  lineHeight: 'var(--data-view-cell-text-line-height)',
  color: 'var(--algogrind-text-paragraph-color)',
  fontWeight: '500',
  backgroundColor: 'transparent',
  textAlign: 'right',
  ':focus': {
    outline: 'none',
  },
});
