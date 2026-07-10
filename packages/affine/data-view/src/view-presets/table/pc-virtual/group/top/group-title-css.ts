import { css } from '@emotion/css';

export const groupHeaderCount = css({
  flexShrink: 0,
  width: '20px',
  height: '20px',
  borderRadius: '4px',
  backgroundColor: 'var(--algogrind-background-secondary-color)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--algogrind-text-secondary)',
  fontSize: 'var(--data-view-cell-text-size)',
});

export const groupHeaderOps = css({
  display: 'flex',
  alignItems: 'center',
  opacity: 0,
  '&:has(.active)': {
    opacity: 1,
  },
});

export const show = css({
  opacity: 1,
});

export const groupHeaderOp = css({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  padding: '4px',
  borderRadius: '4px',
  transition: 'all 150ms cubic-bezier(0.42, 0, 1, 1)',
  color: 'var(--algogrind-text-paragraph-1-color)',
  '&:hover, &.active': {
    backgroundColor: 'var(--algogrind-hover-color)',
  },
});

export const groupHeaderIcon = css({
  display: 'flex',
  alignItems: 'center',
  marginRight: '-4px',
  color: 'var(--algogrind-text-paragraph-1-color)',
  fontSize: '16px',
});

export const groupHeaderTitle = css({
  color: 'var(--algogrind-text-paragraph-color)',
  fontSize: 'var(--data-view-cell-text-size)',
  marginLeft: '4px',
});

export const groupTitleRow = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  overflow: 'hidden',
  height: '22px',
});
