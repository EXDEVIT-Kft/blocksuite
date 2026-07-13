import type { StyleInfo } from 'lit/directives/style-map.js';

import type { AffineTextAttributes } from '../types';

export function affineTextStyles(
  props: AffineTextAttributes,
  override?: Readonly<StyleInfo>
): StyleInfo {
  let textDecorations = '';
  if (props.underline) {
    textDecorations += 'underline';
  }
  if (props.strike) {
    textDecorations += ' line-through';
  }

  let inlineCodeStyle = {};
  if (props.code) {
    inlineCodeStyle = {
      'font-family': 'var(--algogrind-text-code-family)',
      background: 'var(--algogrind-code-background-color)',
      'border-radius': '4px',
      color: 'var(--algogrind-text-code-color)',
      'font-variant-ligatures': 'none',
      'vertical-align': 'bottom',
      'line-height': 'inherit',
    };
  }

  // [ALGOGRIND] superscript/subscript inline formatting
  let scriptStyle = {};
  if (props.superscript || props.subscript) {
    scriptStyle = {
      'vertical-align': props.superscript ? 'super' : 'sub',
      'font-size': '0.75em',
      'line-height': 'normal',
    };
  }

  return {
    'font-weight': props.bold ? 'bolder' : 'inherit',
    'font-style': props.italic ? 'italic' : 'normal',
    'background-color': props.background ? props.background : undefined,
    color: props.color ? props.color : undefined,
    'text-decoration': textDecorations.length > 0 ? textDecorations : 'none',
    ...inlineCodeStyle,
    ...scriptStyle,
    ...override,
  };
}
