import { html } from 'lit';
const ItalicIcon = ({
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
    <path d="M11 4H18" stroke-linecap="round" />
    <path d="M9 20L15 4" stroke-linecap="round" />
    <path d="M6 20H13" stroke-linecap="round" />
  </svg>
`;
export default ItalicIcon;
