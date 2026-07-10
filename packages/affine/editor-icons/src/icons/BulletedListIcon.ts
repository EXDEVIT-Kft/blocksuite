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
    <path d="M11.5 5.5L21 5.5" stroke-linecap="round" />
    <path d="M11.5 12L21 12" stroke-linecap="round" />
    <path d="M11.5 18.5L21 18.5" stroke-linecap="round" />
    <path
      d="M8 18.5L3 18.5M4 21L7 16M7 21L4 16"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8 5.5L3 5.5M4 8L7 3M7 8L4 3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
`;
export default NumberedListIcon;
