import { html } from 'lit';
const Heading1Icon = ({
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
      d="M17 19H18.5M20 19H18.5M18.5 19V11H18L17 12"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M4 12H13M4 19V5M13 19V5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
`;
export default Heading1Icon;
