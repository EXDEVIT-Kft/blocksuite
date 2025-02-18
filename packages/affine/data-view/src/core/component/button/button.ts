import { unsafeCSSVarV2 } from '@blocksuite/affine-shared/theme';
import { ShadowlessElement } from '@blocksuite/block-std';
import { SignalWatcher, WithDisposable } from '@blocksuite/global/utils';
import { css, html, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

export class Button extends SignalWatcher(WithDisposable(ShadowlessElement)) {
  static override styles = css`
    data-view-component-button {
      border-radius: 4px;
      border: 1px solid var(--algogrind-border-color);
      display: flex;
      padding: 4px 8px;
      align-items: center;
      gap: 4px;
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      color: var(--algogrind-text-paragraph-color);
      cursor: pointer;
      transition:
        color 0.2s,
        background-color 0.2s,
        border-color 0.2s;
      white-space: nowrap;
    }

    data-view-component-button.border:hover,
    data-view-component-button.border.active {
      color: var(--algogrind-text-heading-1-color);
      border-color: var(--algogrind-primary-color);
    }

    data-view-component-button.background:hover,
    data-view-component-button.background.active {
      background-color: ${unsafeCSSVarV2('layer/background/hoverOverlay')};
    }

    .button-icon {
      font-size: 16px;
      display: flex;
      align-items: center;
      transition: color 0.2s;
      color: var(--algogrind-text-paragraph-1-color);
    }

    data-view-component-button.border:hover .button-icon,
    data-view-component-button.border.active .button-icon {
      color: var(--algogrind-primary-color);
    }
  `;

  override connectedCallback() {
    super.connectedCallback();
    this.classList.add(this.hoverType);
    if (this.onClick) {
      this.disposables.addFromEvent(this, 'click', this.onClick);
    }
  }

  override render() {
    return html`
      <div class="button-icon">${this.icon}</div>
      ${this.text}
      <div class="button-icon">${this.postfix}</div>
    `;
  }

  @property()
  accessor hoverType: 'background' | 'border' = 'background';

  @property({ attribute: false })
  accessor icon: TemplateResult | undefined;

  @property({ attribute: false })
  accessor onClick: ((event: MouseEvent) => void) | undefined;

  @property({ attribute: false })
  accessor postfix: TemplateResult | string | undefined;

  @property({ attribute: false })
  accessor text: TemplateResult | string | undefined;
}

declare global {
  interface HTMLElementTagNameMap {
    'data-view-component-button': Button;
  }
}
