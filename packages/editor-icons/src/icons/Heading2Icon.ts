import { html } from 'lit';
const Heading2Icon = ({
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
      d="M20 19H16C16 18.4046 16.1523 17.8477 16.5858 17.4142L19.3787 14.6213C19.8177 14.1823 20 13.6088 20 13C20 11.8954 19.1046 11 18 11C16.8954 11 16 11.8954 16 13"
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
export default Heading2Icon;
