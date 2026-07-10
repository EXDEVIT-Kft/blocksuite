import { style } from '@vanilla-extract/css';

export const outlineCard = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',

  selectors: {
    '&[data-status="dragging"]': {
      pointerEvents: 'none',
      opacity: 0.5,
    },
    '&[data-sortable="true"]': {
      padding: '2px 0px',
    },
  },
});

export const cardPreview = style({
  position: 'relative',
  width: '100%',
  borderRadius: '4px',
  cursor: 'default',
  userSelect: 'none',
  selectors: {
    [`${outlineCard}[data-sortable="true"] &:hover`]: {
      background: 'var(--algogrind-hover-color)',
    },
    [`${outlineCard}[data-status="selected"] &`]: {
      background: 'var(--algogrind-hover-color)',
    },
    [`${outlineCard}[data-status="dragging"] &`]: {
      background: 'var(--algogrind-hover-color)',
      opacity: 0.9,
    },
  },
});

export const cardHeader = style({
  padding: '0 8px',
  width: '100%',
  minHeight: '28px',
  display: 'none',
  alignItems: 'center',
  gap: '8px',
  boxSizing: 'border-box',

  ':hover': {
    cursor: 'grab',
  },
  selectors: {
    [`${outlineCard}[data-sortable="true"] &`]: {
      display: 'flex',
    },
    [`${outlineCard}[data-visibility="edgeless"] &:hover`]: {
      cursor: 'default',
    },
  },
});

const invisibleCard = style({
  selectors: {
    [`${outlineCard}[data-visibility="edgeless"] &`]: {
      color: 'var(--algogrind-text-disabled-color)',
      pointerEvents: 'none',
    },
  },
});

export const headerIcon = style([
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  invisibleCard,
]);

export const headerNumber = style([
  {
    textAlign: 'center',
    fontSize: 'var(--algogrind-text-paragraph-size)',
    fontFamily: 'var(--algogrind-text-paragraph-family)',
    color: 'var(--algogrind-primary-color)',
    fontWeight: 500,
    lineHeight: '20px',
  },
  invisibleCard,
]);

export const divider = style({
  height: '1px',
  flex: 1,
  borderTop: '1px dashed var(--algogrind-border-color)',
  transform: 'translateY(50%)',
});

export const displayModeButtonGroup = style({
  display: 'none',
  position: 'absolute',
  right: '8px',
  top: '-6px',
  marginBlock: '8px',
  paddingLeft: '4px',
  borderRadius: '4px',
  alignItems: 'center',
  gap: '4px',
  fontWeight: 500,
  lineHeight: '20px',
  fontSize: 'var(--algogrind-text-small-size)',
  fontFamily: 'var(--algogrind-text-small-family)',
  color: 'var(--algogrind-text-small-color)',
  backgroundColor: 'var(--algogrind-overlay-panel-background-color)',

  selectors: {
    [`${cardPreview}:hover &`]: {
      display: 'flex',
    },
  },
});

export const displayModeButton = style({
  display: 'flex',
  borderRadius: '4px',
  backgroundColor: 'var(--algogrind-hover-color)',
  alignItems: 'center',
});

export const currentModeLabel = style({
  display: 'flex',
  padding: '2px 0px 2px 4px',
  alignItems: 'center',
});

export const cardContent = style([
  {
    fontSize: 'var(--algogrind-text-small-size)',
    color: 'var(--algogrind-text-small-color)',
    fontFamily: 'var(--algogrind-text-small-family)',
    userSelect: 'none',

    ':hover': {
      cursor: 'pointer',
    },
  },
  invisibleCard,
]);

export const modeChangePanel = style({
  position: 'absolute',
  display: 'none',
  background: 'var(--algogrind-overlay-panel-background-color)',
  borderRadius: '8px',
  boxShadow: 'var(--algogrind-ring), var(--algogrind-shadow-medium)',
  boxSizing: 'border-box',
  padding: '8px',
  fontSize: 'var(--algogrind-text-small-size)',
  color: 'var(--algogrind-text-small-color)',
  fontFamily: 'var(--algogrind-text-small-family)',
  lineHeight: '22px',
  fontWeight: 500,

  selectors: {
    '&[data-show]': {
      display: 'flex',
    },
  },
});
