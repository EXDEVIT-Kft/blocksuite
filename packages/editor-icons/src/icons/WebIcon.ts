import { html } from 'lit';
const WebIcon = ({
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
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <ellipse
      cx="12"
      cy="12"
      rx="4"
      ry="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path d="M2 12H22" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
`;
export default WebIcon;
