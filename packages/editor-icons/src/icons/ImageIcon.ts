import { html } from 'lit';
const ImageIcon = ({
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
      d="M20 3H4C2.89543 3 2 3.89543 2 5V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V5C22 3.89543 21.1046 3 20 3Z"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <circle
      cx="8.5"
      cy="8.5"
      r="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M22 17L16 11H15L10 16L7.5 13.5H6.5L2 18"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
`;
export default ImageIcon;
