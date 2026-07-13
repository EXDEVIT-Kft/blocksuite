// [ALGOGRIND] use the custom fork paint icon for the highlight button (fork parity)
import { PaintIcon } from '@blocksuite/affine-editor-icons';
import { css, LitElement } from 'lit';

export class HighlightDuotoneIcon extends LitElement {
  static override styles = css`
    svg {
      display: flex;
      font-size: 20px;
      /* [ALGOGRIND] the fork icon is stroke-based and follows currentColor */
      color: var(--color, currentColor);
    }
  `;
  override render() {
    return PaintIcon();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'affine-highlight-duotone-icon': HighlightDuotoneIcon;
  }
}
