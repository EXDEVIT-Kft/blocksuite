import { html } from 'lit';
const Heading6Icon = ({
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
      d="M16 17C16 18.1046 16.8954 19 18 19C19.1046 19 20 18.1046 20 17C20 15.8954 19.1046 15 18 15C16.8954 15 16 15.8954 16 17ZM16 17V13C16 11.8954 16.8954 11 18 11C19.1046 11 20 11.8954 20 13"
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
export default Heading6Icon;
