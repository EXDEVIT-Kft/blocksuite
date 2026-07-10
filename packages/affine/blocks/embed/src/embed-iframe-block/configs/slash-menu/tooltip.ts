import { html } from 'lit';

export const EmbedIframeTooltip = html`
  <svg
    width="170"
    height="106"
    viewBox="0 0 170 106"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <rect width="170" height="106" rx="2" fill="white" />
    <mask
      id="mask0_888_46686"
      style="mask-type:alpha"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="170"
      height="106"
    >
      <rect width="170" height="106" rx="2" fill="white" />
    </mask>
    <g mask="url(#mask0_888_46686)">
      <text fill="#7A7A7A" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="10" letter-spacing="0px"><tspan x="8" y="19">Tartalom beágyazása linkkel.</tspan></text>
      <rect
        x="8.5"
        y="28.5"
        width="169"
        height="121"
        rx="3.5"
        fill="white"
        stroke="#E6E6E6"
      />
      <text fill="#141414" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="8" letter-spacing="0px"><tspan x="16" y="44.5">https://google.com/maps</tspan></text>
      <g clip-path="url(#algMapClip)">
        <rect x="16.25" y="53.25" width="153.5" height="52.5" fill="#E9E5DC" />
        <rect x="16.25" y="53.25" width="44" height="30" fill="#C3ECB2" />
        <path d="M130 106 L170 78 L170 106 Z" fill="#AAD3DF" />
        <line x1="16" y1="88" x2="170" y2="70" stroke="#FDE293" stroke-width="6" />
        <line x1="16" y1="88" x2="170" y2="70" stroke="#F9CE58" stroke-width="1" stroke-dasharray="4 4" />
        <line x1="60" y1="53" x2="78" y2="106" stroke="white" stroke-width="4" />
        <line x1="110" y1="53" x2="120" y2="106" stroke="white" stroke-width="3" />
        <line x1="16" y1="62" x2="170" y2="58" stroke="white" stroke-width="2.5" />
        <path d="M93 68 C88.6 68 85 71.6 85 76 C85 82 93 90 93 90 C93 90 101 82 101 76 C101 71.6 97.4 68 93 68 Z" fill="#EA4335" />
        <circle cx="93" cy="76" r="3" fill="white" />
      </g>
      <rect x="16.25" y="53.25" width="153.5" height="52.25" rx="1.75" fill="none" stroke="#E6E6E6" stroke-width="0.5" />
    </g>
    <defs>
      <clipPath id="algMapClip">
        <rect x="16.25" y="53.25" width="153.5" height="52.5" rx="1.75" />
      </clipPath>
    </defs>
  </svg>
`;
