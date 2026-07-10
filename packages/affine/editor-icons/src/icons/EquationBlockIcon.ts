import { html } from 'lit';
const EquationBlockIcon = ({
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
      d="M5.5 3V8M8 5.5L3 5.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8 16L6 18M6 18L4 20M6 18L8 20M6 18L4 16"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path d="M20 6L16 6" stroke-linecap="round" stroke-linejoin="round" />
    <path
      d="M20 18.5L16 18.5M20 15.5L16 15.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path d="M22 12L2 12" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M12 22L12 2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
`;
export default EquationBlockIcon;
