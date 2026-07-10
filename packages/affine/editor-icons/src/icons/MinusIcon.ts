import { html } from 'lit';
const MinusIcon = ({
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
      xmlns="http://www.w3.org/2000/svg"
      d="M20 12L4 12"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
`;
export default MinusIcon;
