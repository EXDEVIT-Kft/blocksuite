import { html } from 'lit';
const ViewBarIcon = ({
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
    <path d="M3 4V20" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M21 4V20" stroke-linecap="round" stroke-linejoin="round" />
    <path
      d="M15 9L18 12L15 15M9 9L6 12L9 15M6.5 12H17.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
`;
export default ViewBarIcon;
