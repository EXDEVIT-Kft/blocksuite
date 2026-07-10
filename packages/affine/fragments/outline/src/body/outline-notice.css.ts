import { style } from '@vanilla-extract/css';

export const outlineNotice = style({
  position: 'absolute',
  left: 0,
  bottom: '8px',
  padding: '10px 18px',
  display: 'flex',
  width: '100%',
  boxSizing: 'border-box',
  gap: '14px',
  fontStyle: 'normal',
  fontSize: '12px',
  flexDirection: 'column',
  borderRadius: '8px',
  backgroundColor: 'var(--algogrind-overlay-panel-background-color)',
});

export const outlineNoticeHeader = style({
  display: 'flex',
  width: '100%',
  height: '20px',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const outlineNoticeLabel = style({
  fontWeight: 600,
  lineHeight: '20px',
  color: 'var(--algogrind-text-secondary)',
});

export const outlineNoticeCloseButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '20px',
  height: '20px',
  cursor: 'pointer',
  color: 'var(--algogrind-text-paragraph-color)',
});

export const outlineNoticeBody = style({
  display: 'flex',
  width: '100%',
  gap: '2px',
  flexDirection: 'column',
});

const outlineNoticeItem = style({
  display: 'flex',
  height: '20px',
  alignItems: 'center',
  lineHeight: '20px',
  color: 'var(--algogrind-text-paragraph-color)',
});

export const notice = style([
  outlineNoticeItem,
  {
    fontWeight: 400,
  },
]);

export const button = style([
  outlineNoticeItem,
  {
    display: 'flex',
    gap: '2px',
    fontWeight: 500,
    textDecoration: 'underline',
    cursor: 'pointer',
  },
]);

export const buttonSpan = style({
  display: 'flex',
  alignItems: 'center',
  lineHeight: '20px',
});

export const buttonSvg = style({
  scale: 0.8,
});
