import { html } from 'lit';
const SuperscriptIcon = ({
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
    <path d="m4 19 8-8" stroke-linecap="round" stroke-linejoin="round" />
    <path d="m12 19-8-8" stroke-linecap="round" stroke-linejoin="round" />
    <path
      d="M20 12h-4c0-1.5.442-2 1.5-2.5S20 8.334 20 7.002c0-.472-.17-.93-.484-1.29a2.105 2.105 0 0 0-2.617-.436c-.42.239-.738.614-.899 1.06"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
`;
export default SuperscriptIcon;
