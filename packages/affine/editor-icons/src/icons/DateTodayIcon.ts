import { html } from 'lit';
const DateTodayIcon = ({
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
    <path d="M18 2V5M6 2V5" stroke-linecap="round" stroke-linejoin="round" />
    <path
      d="M19.5 3.5H4.5C3.39543 3.5 2.5 4.39543 2.5 5.5V20C2.5 21.1046 3.39543 22 4.5 22H19.5C20.6046 22 21.5 21.1046 21.5 20V5.5C21.5 4.39543 20.6046 3.5 19.5 3.5Z"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path d="M2.5 8.5H21.5" stroke-linecap="round" stroke-linejoin="round" />
    <path
      d="M11.9955 13H12.0045M11.9955 17H12.0045M15.991 13H16M8 13H8.00897M8 17H8.00897"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
`;
export default DateTodayIcon;
