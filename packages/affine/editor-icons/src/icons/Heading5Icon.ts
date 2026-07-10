import { html } from 'lit';
const Heading5Icon = ({
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
      d="M3 12H12M3 19V5M12 19V5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M19.5 11H16V14H17.5C18.8807 14 20 15.1319 20 16.5126C20 17.8795 18.8668 19 17.5 19C16.5 19 16 18.5 16 18.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
`;
export default Heading5Icon;
