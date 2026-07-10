import { html } from 'lit';
const StrikeThroughIcon = ({
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
    <path d="M4 12H20" stroke-linecap="round" stroke-linejoin="round" />
    <path
      d="M18 6.5C17.4794 4.41242 14.9345 3 12 3C8.68629 3 6 5.01472 6 7.5C6 8.35161 6.18155 8.96075 6.5 9.5M6 17.5C6.50862 19.5987 9.055 21 12 21C15.3137 21 18 18.9853 18 16.5C18 13.0382 15 12 12 12"
      stroke-linecap="round"
    />
  </svg>
`;
export default StrikeThroughIcon;
