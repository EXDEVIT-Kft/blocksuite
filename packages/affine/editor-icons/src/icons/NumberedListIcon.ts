import { html } from 'lit';
const NumberedListIcon = ({
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
      d="M3 15H6V18H3.00034V21H6"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M3 3H4.5V9M4.5 9H3M4.5 9H6"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path d="M11 6L21 6" stroke-linecap="round" />
    <path d="M11 12L21 12" stroke-linecap="round" />
    <path d="M11 18L21 18" stroke-linecap="round" />
  </svg>
`;
export default NumberedListIcon;
