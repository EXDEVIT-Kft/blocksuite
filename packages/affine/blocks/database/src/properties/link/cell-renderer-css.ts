import { cssVarV2 } from '@blocksuite/affine-shared/theme';
import { css } from '@emotion/css';

export const linkCellStyle = css({
  width: '100%',
  height: '100%',
  userSelect: 'none',
  position: 'relative',
});

export const linkContainerStyle = css({
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  outline: 'none',
  overflow: 'hidden',
  fontSize: 'var(--data-view-cell-text-size)',
  lineHeight: 'var(--data-view-cell-text-line-height)',
  wordBreak: 'break-all',
});

export const linkIconContainerStyle = css({
  position: 'absolute',
  right: '8px',
  top: '8px',
  display: 'flex',
  alignItems: 'center',
  visibility: 'hidden',
  backgroundColor: cssVarV2.layer.background.primary,
  boxShadow: 'var(--affine-button-shadow)',
  borderRadius: '4px',
  overflow: 'hidden',
  zIndex: 1,
});

export const linkIconStyle = css({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  color: 'var(--algogrind-text-paragraph-1-color)',
  fontSize: '14px',
  padding: '2px',
  ':hover': {
    backgroundColor: 'var(--algogrind-hover-color)',
  },
});

export const showLinkIconStyle = css({
  [`.${linkCellStyle}:hover &`]: {
    visibility: 'visible',
  },
});

export const linkedDocStyle = css({
  textDecoration: 'underline',
  textDecorationColor: 'var(--algogrind-border-color)',
  transition: 'text-decoration-color 0.2s ease-out',
  cursor: 'pointer',
  ':hover': {
    textDecorationColor: 'var(--algogrind-text-paragraph-color)',
  },
});

export const linkEditingStyle = css({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  padding: '0',
  border: 'none',
  fontFamily: 'var(--algogrind-text-paragraph-family)',
  color: 'var(--algogrind-text-paragraph-color)',
  fontWeight: 400,
  backgroundColor: 'transparent',
  fontSize: 'var(--data-view-cell-text-size)',
  lineHeight: 'var(--data-view-cell-text-line-height)',
  wordBreak: 'break-all',
  ':focus': {
    outline: 'none',
  },
});

export const inlineLinkNodeStyle = css({
  wordBreak: 'break-all',
  color: 'var(--algogrind-link-color)',
  fill: 'var(--algogrind-link-color)',
  cursor: 'pointer',
  fontWeight: '500',
  fontStyle: 'normal',
  textDecoration: 'none',
});

export const normalTextStyle = css({
  wordBreak: 'break-all',
});
