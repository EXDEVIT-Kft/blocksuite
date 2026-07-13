import type { AffineTextStyleAttributes } from '@blocksuite/affine-shared/types';
import { PropTypes, requiredProperties } from '@blocksuite/std';
import { css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { html } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat.js';

import { EditorChevronDown } from '../toolbar';

const colors = [
  'default',
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'purple',
  'pink',
  'grey',
] as const;

// [ALGOGRIND] Csak megjelenő nevek — a `colors` kulcsok CSS-változó azonosítók
// (--algogrind-text-highlight-*), azok NEM változhatnak.
const colorNames: Record<(typeof colors)[number], string> = {
  default: 'Alapértelmezett',
  red: 'Piros',
  orange: 'Narancs',
  yellow: 'Sárga',
  green: 'Zöld',
  teal: 'Türkizkék',
  blue: 'Kék',
  purple: 'Lila',
  pink: 'Pink',
  grey: 'Szürke',
};

export type HighlightType = Pick<
  AffineTextStyleAttributes,
  'color' | 'background'
>;

// TODO(@fundon): these recent settings should be added to the dropdown menu
// tests/blocksutie/e2e/format-bar.spec.ts#253
//
// let latestHighlightColor: string | null = null;
// let latestHighlightType: HighlightType = 'background';

@requiredProperties({
  updateHighlight: PropTypes.instanceOf(Function),
})
export class HighlightDropdownMenu extends LitElement {
  /* [ALGOGRIND] caption styling for the highlight panel headings */
  static override styles = css`
    .highlight-heading {
      display: flex;
      padding: 8px 8px 0;
      font-family: var(--algogrind-text-caption-family);
      font-size: var(--algogrind-text-caption-size);
      font-weight: 600;
      line-height: var(--algogrind-line-height);
      text-align: left;
      color: var(--algogrind-text-caption-color);
    }
  `;

  @property({ attribute: false })
  accessor updateHighlight!: (styles: HighlightType) => void;

  private readonly _update = (style: HighlightType) => {
    // latestHighlightColor = value;
    // latestHighlightType = type;

    this.updateHighlight(style);
  };

  override render() {
    const prefix = '--algogrind-text-highlight';

    return html`
      <editor-menu-button
        .contentPadding="${'8px'}"
        .button=${html`
          <editor-icon-button aria-label="highlight" .tooltip="${'Kiemelés'}">
            <!-- [ALGOGRIND] no --color override: the icon inherits the
              toolbar's icon color (currentColor), matching the other icons -->
            <affine-highlight-duotone-icon></affine-highlight-duotone-icon>
            ${EditorChevronDown}
          </editor-icon-button>
        `}
      >
        <div data-size="large" data-orientation="vertical">
          <div class="highlight-heading">Szín</div>
          ${repeat(colors, color => {
            const isDefault = color === 'default';
            const value = isDefault
              ? null
              : `var(${prefix}-foreground-${color})`;
            return html`
              <editor-menu-action
                data-testid="foreground-${color}"
                @click=${() => this._update({ color: value })}
              >
                <affine-text-duotone-icon
                  style=${styleMap({
                    '--color': value ?? 'var(--affine-text-primary-color)',
                  })}
                ></affine-text-duotone-icon>
                <span class="label capitalize"
                  >${isDefault
                    ? 'Alapértelmezett szín'
                    : colorNames[color]}</span
                >
              </editor-menu-action>
            `;
          })}

          <div class="highlight-heading">Háttérszín</div>
          ${repeat(colors, color => {
            const isDefault = color === 'default';
            const value = isDefault ? null : `var(${prefix}-${color})`;
            return html`
              <editor-menu-action
                data-testid="background-${color}"
                @click=${() => this._update({ background: value })}
              >
                <affine-text-duotone-icon
                  style=${styleMap({
                    '--color': 'var(--affine-text-primary-color)',
                    '--background': value ?? 'transparent',
                  })}
                ></affine-text-duotone-icon>

                <span class="label capitalize"
                  >${isDefault
                    ? 'Alapértelmezett háttér'
                    : colorNames[color]}</span
                >
              </editor-menu-action>
            `;
          })}
        </div>
      </editor-menu-button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'affine-highlight-dropdown-menu': HighlightDropdownMenu;
  }
}
