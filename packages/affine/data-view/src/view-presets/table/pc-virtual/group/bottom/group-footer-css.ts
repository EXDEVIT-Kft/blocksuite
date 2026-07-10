import { css } from '@emotion/css';

export const groupFooter = css({
  display: 'block',
});
export const addRowWrapper = css({
  display: 'flex',
  width: '100%',
  height: '28px',
  position: 'relative',
  zIndex: 0,
  cursor: 'pointer',
  transition: 'opacity 0.2s ease-in-out',
  padding: '4px 8px',
  borderBottom: '1px solid var(--algogrind-border-color)',
});

export const addRowButton = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  position: 'sticky',
  left: '8px',
});

export const addRowText = css({
  userSelect: 'none',
  fontSize: '12px',
  lineHeight: '20px',
  color: 'var(--algogrind-text-secondary)',
});
