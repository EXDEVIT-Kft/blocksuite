import {
  GeneralStyleIcon,
  ScribbledStyleIcon,
} from '@algogrind/affine-components/icons';
import { ShapeStyle } from '@algogrind/affine-model';
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

const SHAPE_STYLE_LIST = [
  {
    value: ShapeStyle.General,
    name: 'Letisztult',
    icon: GeneralStyleIcon,
  },
  {
    value: ShapeStyle.Scribbled,
    name: 'Rajzolt',
    icon: ScribbledStyleIcon,
  },
];

export class EdgelessShapeStylePanel extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
  `;

  private _onSelect(value: ShapeStyle) {
    this.value = value;
    if (this.onSelect) {
      this.onSelect(value);
    }
  }

  override render() {
    return repeat(
      SHAPE_STYLE_LIST,
      item => item.value,
      ({ value, icon, name }) =>
        html`<edgeless-tool-icon-button
          .tipPosition=${'top'}
          .activeMode=${'background'}
          aria-label=${name}
          .tooltip=${name}
          .active=${this.value === value}
          @click=${() => this._onSelect(value)}
        >
          ${icon}
        </edgeless-tool-icon-button>`
    );
  }

  @property({ attribute: false })
  accessor onSelect: undefined | ((value: ShapeStyle) => void) = undefined;

  @property({ attribute: false })
  accessor value!: ShapeStyle;
}

declare global {
  interface HTMLElementTagNameMap {
    'edgeless-shape-style-panel': EdgelessShapeStylePanel;
  }
}
