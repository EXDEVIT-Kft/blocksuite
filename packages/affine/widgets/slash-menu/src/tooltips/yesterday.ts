import { html } from 'lit';

// [ALGOGRIND] show the actual date instead of a hardcoded sample
const formatDate = (dayOffset: number) => {
  const date = new Date();
  date.setDate(date.getDate() + dayOffset);
  return date.toLocaleDateString('hu-HU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    weekday: 'long',
  });
};

// prettier-ignore
export const YesterdayTooltip = html`<svg width="170" height="68" viewBox="0 0 170 68" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="170" height="68" rx="2" fill="white"/>
<mask id="mask0_16460_1138" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="170" height="68">
<rect width="170" height="68" rx="2" fill="white"/>
</mask>
<g mask="url(#mask0_16460_1138)">
<text fill="#8E8D91" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="10" letter-spacing="0px"><tspan x="8" y="16.6364">Tegnapi dátum beszúrása.</tspan></text>
<text fill="#121212" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="10" letter-spacing="0px"><tspan x="8" y="34.6364">${formatDate(-1)}</tspan></text>
</g>
</svg>
`;
