import { css } from '@emotion/css';
import { cssVarV2 } from '@toeverything/theme/v2';

export const tagSelectContainerStyle = css({
  position: 'absolute',
  zIndex: 2,
  color: 'var(--algogrind-text-paragraph-color)',
  borderRadius: '8px',
  backgroundColor: 'var(--algogrind-overlay-panel-background-color)',
  boxShadow: 'var(--algogrind-ring), var(--algogrind-shadow-medium)',
  fontFamily: 'var(--algogrind-text-paragraph-family)',
  maxWidth: '400px',
  padding: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  '@media print': {
    display: 'none',
  },
});

export const tagSelectInputContainerStyle = css({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '6px',
  padding: '4px',
});

export const tagSelectInputStyle = css({
  flex: '1 1 0',
  border: 'none',
  fontFamily: 'var(--algogrind-text-paragraph-family)',
  color: 'var(--algogrind-text-paragraph-color)',
  backgroundColor: 'transparent',
  lineHeight: '22px',
  fontSize: '14px',
  outline: 'none',
  '::placeholder': {
    color: 'var(--algogrind-text-placeholder-color)',
  },
});

export const selectOptionsTipsStyle = css({
  padding: '4px',
  color: 'var(--algogrind-text-placeholder-color)',
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '22px',
  userSelect: 'none',
});

export const selectOptionsContainerStyle = css({
  maxHeight: '400px',
  overflowY: 'auto',
  userSelect: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

export const selectOptionStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '4px 4px 4px 0',
  borderRadius: '4px',
  cursor: 'pointer',
});

export const selectedStyle = css({
  background: 'var(--algogrind-hover-color)',
});

export const tagContainerStyle = css({
  display: 'flex',
  alignItems: 'center',
  padding: '0 8px',
  gap: '4px',
  borderRadius: '4px',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  userSelect: 'none',
});

export const tagTextStyle = css({
  fontSize: '14px',
  lineHeight: '22px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  fontWeight: 500,
});

export const tagDeleteIconStyle = css({
  display: 'flex',
  alignItems: 'center',
  color: 'var(--algogrind-text-small-color)',
});

export const selectOptionContentStyle = css({
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden',
});

export const selectOptionIconStyle = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '20px',
  borderRadius: '4px',
  cursor: 'pointer',
  visibility: 'hidden',
  color: 'var(--algogrind-text-paragraph-1-color)',
  marginLeft: '4px',
  ':hover': {
    background: 'var(--algogrind-hover-color)',
  },
  [`.${selectedStyle} &`]: {
    visibility: 'visible',
  },
});

export const selectOptionDragHandlerStyle = css({
  width: '4px',
  height: '12px',
  borderRadius: '1px',
  backgroundColor: cssVarV2('button/grabber/default'),
  marginRight: '4px',
  cursor: '-webkit-grab',
  flexShrink: 0,
});

export const selectOptionNewIconStyle = css({
  fontSize: '14px',
  lineHeight: '22px',
  color: 'var(--algogrind-primary-color)',
  marginRight: '8px',
  marginLeft: '4px',
});
