import { panelBaseStyle } from '@blocksuite/affine-shared/styles';
import { stopPropagation } from '@blocksuite/affine-shared/utils';
import { WithDisposable } from '@blocksuite/global/lit';
import { css, html, LitElement } from 'lit';

export class EditorToolbar extends WithDisposable(LitElement) {
  static override styles = css`
    ${panelBaseStyle(':host')}
    :host {
      height: 36px;
      box-sizing: content-box;
      /* [ALGOGRIND] The button row lives in the inner .toolbar-scroll wrapper
         below; the host is just the (capped-width) box. */
      display: block;
    }

    :host([data-without-bg]) {
      border-color: transparent;
      background: transparent;
      box-shadow: none;
    }

    /* [ALGOGRIND] Inner scroll container so the button row scrolls
       horizontally on narrow viewports instead of overflowing off-screen.
       It is position: static, so the absolutely-positioned dropdown menus
       (whose containing block is the positioned :host, an ancestor of this
       wrapper) are NOT clipped by its overflow — only the button row is. */
    .toolbar-scroll {
      display: flex;
      align-items: center;
      /* Inherit the flex row's gap and alignment from :host so placement
         variants that set them on the host (e.g. the edgeless \`inner\`
         toolbar: gap 4px + justify-content flex-end) keep working now that
         the flex container moved off :host onto this wrapper. */
      gap: inherit;
      justify-content: inherit;
      height: 100%;
      max-width: 100%;
      overflow-x: auto;
      /* [ALGOGRIND] This inner wrapper is the sole horizontal scroller (the
         mobile host no longer carries overflow, so dropdowns are not clipped).
         Allow horizontal touch panning so the button row can be swiped on a
         phone; only affects touch, so it is a no-op with a mouse. */
      touch-action: pan-x;
      /* Hide the scrollbar; the row is dragged/swiped instead, and on wide
         screens it never overflows so there is nothing to scroll. */
      scrollbar-width: none;
    }
    .toolbar-scroll::-webkit-scrollbar {
      display: none;
    }

    ::slotted(*) {
      display: flex;
      height: 100%;
      justify-content: center;
      align-items: center;
      gap: 8px;
      /* Keep buttons at their natural size so the row scrolls rather than
         compressing the buttons when space is tight. */
      flex-shrink: 0;
      color: var(--algogrind-text-paragraph-color);
      fill: currentColor;
    }
  `;

  override connectedCallback() {
    super.connectedCallback();

    this._disposables.addFromEvent(this, 'pointerdown', (e: PointerEvent) => {
      e.stopPropagation();
      e.preventDefault();
    });
    // Let the button row be scrolled with a plain vertical mouse wheel when it
    // overflows (a horizontal scroll container is otherwise unreachable with a
    // mouse — the wheel scrolls vertically and the scrollbar is hidden). Touch
    // devices swipe it directly.
    this._disposables.addFromEvent(
      this,
      'wheel',
      (e: WheelEvent) => {
        stopPropagation(e);
        const scroll = this.shadowRoot?.querySelector<HTMLElement>(
          '.toolbar-scroll'
        );
        if (!scroll || scroll.scrollWidth <= scroll.clientWidth) return;
        const delta =
          Math.abs(e.deltaX) >= Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        if (delta === 0) return;
        scroll.scrollLeft += delta;
        e.preventDefault();
      },
      { passive: false }
    );
  }

  override render() {
    return html`<div class="toolbar-scroll"><slot></slot></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'editor-toolbar': EditorToolbar;
  }
}
