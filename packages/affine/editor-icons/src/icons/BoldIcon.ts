import { html } from 'lit';
const BoldIcon = ({
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
      d="M5 12H12.5C14.9853 12 17 9.98528 17 7.5C17 5.01472 14.9853 3 12.5 3H5V12ZM5 12H13.5C15.9853 12 18 14.0147 18 16.5C18 18.9853 15.9853 21 13.5 21H5V12Z"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
`;
export default BoldIcon;
