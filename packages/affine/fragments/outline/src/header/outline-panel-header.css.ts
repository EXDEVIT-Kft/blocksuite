import { globalStyle, style } from '@vanilla-extract/css';

export const host = style({});

export const container = style({
  display: 'flex',
  width: '100%',
  height: '40px',
  alignItems: 'center',
  justifyContent: 'space-between',
  boxSizing: 'border-box',
  padding: '8px 16px',
});

export const noteSettingContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  // [ALGOGRIND] Let the label + settings icon group shrink inside the
  // space-between header row instead of overflowing onto the icons.
  flex: '1 1 auto',
  minWidth: 0,
});

export const label = style({
  // [ALGOGRIND] No fixed width: the Hungarian label ("Tartalomjegyzék") is
  // wider than the 119px sized for the English text, which pushed the text
  // under the settings icon. Shrink with ellipsis instead.
  flex: '0 1 auto',
  minWidth: 0,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  height: '22px',
  fontWeight: 500,
  lineHeight: '22px',
  color: 'var(--algogrind-text-heading-6-color)',
  fontFamily: 'var(--algogrind-text-heading-6-family)',
  fontSize: 'var(--algogrind-text-heading-6-size)',
});

// [ALGOGRIND] Keep the settings / sorting icons at full size while the label
// shrinks with ellipsis.
globalStyle(
  `${noteSettingContainer} > edgeless-tool-icon-button, ${container} > edgeless-tool-icon-button`,
  {
    flexShrink: 0,
  }
);

export const notePreviewSettingContainer = style({
  display: 'none',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'var(--algogrind-overlay-panel-background-color)',
  boxShadow: 'var(--algogrind-shadow-small)',
  borderRadius: '8px',
  selectors: {
    '&[data-show]': {
      display: 'flex',
    },
  },
});
