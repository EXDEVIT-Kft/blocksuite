import { css } from '@emotion/css';

export const leftBar = css({
  display: 'flex',
  height: '34px',
});

export const dragHandlerWrapper = css({
  backgroundColor: 'var(--algogrind-background-color)',
  marginBottom: '1px',
  display: 'flex',
});

export const dragHandler = css({
  width: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'grab',
  backgroundColor: 'var(--algogrind-background-color)',
  opacity: 0,
});

export const checkboxWrapper = css({
  backgroundColor: 'var(--algogrind-background-color)',
  marginBottom: '1px',
  display: 'flex',
});

export const rowSelectedBg = css({
  backgroundColor: 'var(--algogrind-primary-color-04)',
});

export const dragHandlerIndicator = css({
  width: '4px',
  borderRadius: '2px',
  height: '12px',
  backgroundColor: 'var(--algogrind-text-placeholder-color)',
});

export const show = css({
  opacity: '1 !important',
});
export const rowSelectCheckbox = css({
  display: 'flex',
  alignItems: 'center',
  opacity: 0,
  cursor: 'pointer',
  fontSize: '20px',
  color: 'var(--algogrind-text-paragraph-1-color)',
});
