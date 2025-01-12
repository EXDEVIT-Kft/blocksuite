import { html } from 'lit';
const CodeInlineIcon = ({
  width = '1em',
  height = '1em',
  strokeWidth = '1.5',
  style = '',
}: {
  width?: string;
  height?: string;
  strokeWidth?: string;
  style?: string;
} = {}) => html`
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width=${width}
    height=${height}
    fill="none"
    stroke="currentColor"
    stroke-width=${strokeWidth}
    style=${'user-select:none;flex-shrink:0;' + style}
  >
    <path
      d="M18 8L21 11.5L18 15"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path d="M6 8L3 11.5L6 15" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M9.5 20L14.5 4" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
`;
export default CodeInlineIcon;
