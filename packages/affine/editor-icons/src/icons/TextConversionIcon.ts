import { html } from 'lit';
const TextConversionIcon = ({
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
      d="M10 18H6M8 3L8 18M2 5V4C2 3.44772 2.44772 3 3 3H13C13.5523 3 14 3.44772 14 4V5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M19.5 21H16.5M18 13L18 21M14 14.5V14C14 13.4477 14.4477 13 15 13H21C21.5523 13 22 13.4477 22 14V14.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
`;
export default TextConversionIcon;
