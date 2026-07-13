import { html } from 'lit';
const SubscriptIcon = ({
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
    <path d="m4 5 8 8" stroke-linecap="round" stroke-linejoin="round" />
    <path d="m12 5-8 8" stroke-linecap="round" stroke-linejoin="round" />
    <path
      d="M20 19h-4c0-1.5.44-2 1.5-2.5S20 15.33 20 14c0-.47-.17-.93-.48-1.29a2.11 2.11 0 0 0-2.62-.44c-.42.24-.74.62-.9 1.06"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
`;
export default SubscriptIcon;
