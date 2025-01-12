import { html } from 'lit';
const TextIcon = ({
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
    <path d="M14.5 21H9.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M12 3L12 21" stroke-linecap="round" stroke-linejoin="round" />
    <path
      d="M5 5.5V4C5 3.44772 5.44772 3 6 3H18C18.5523 3 19 3.44772 19 4V5.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
`;
export default TextIcon;
