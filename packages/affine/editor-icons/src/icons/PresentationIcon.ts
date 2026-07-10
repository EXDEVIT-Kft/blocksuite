import { html } from 'lit';
const PresentationIcon = ({
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
      d="M21.5 14V5C21.5 3.34315 20.1569 2 18.5 2H5.5C3.84315 2 2.5 3.34315 2.5 5V14C2.5 15.6569 3.84315 17 5.5 17L18.5 17C20.1569 17 21.5 15.6569 21.5 14Z"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path d="M12 17L12 22" stroke-linecap="round" stroke-linejoin="round" />
    <path
      d="M7 22L12.0001 19L17 22"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
`;
export default PresentationIcon;
