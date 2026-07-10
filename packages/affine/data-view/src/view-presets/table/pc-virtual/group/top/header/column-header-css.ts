import { css } from '@emotion/css';

import { DEFAULT_COLUMN_TITLE_HEIGHT } from '../../../../consts';

export const columnHeaderContainer = css({
  display: 'block',
  backgroundColor: 'var(--algogrind-background-color)',
  position: 'relative',
  zIndex: 2,
});

export const columnHeader = css({
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  borderBottom: '1px solid var(--algogrind-border-color)',
  borderTop: '1px solid var(--algogrind-border-color)',
  boxSizing: 'border-box',
  userSelect: 'none',
  backgroundColor: 'var(--algogrind-background-color)',
});

export const column = css({
  cursor: 'pointer',
});

export const cell = css({
  userSelect: 'none',
});

export const headerAddColumnButton = css({
  height: `${DEFAULT_COLUMN_TITLE_HEIGHT}px`,
  backgroundColor: 'var(--algogrind-background-color)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  cursor: 'pointer',
  fontSize: '18px',
  color: 'var(--algogrind-text-paragraph-1-color)',
});
