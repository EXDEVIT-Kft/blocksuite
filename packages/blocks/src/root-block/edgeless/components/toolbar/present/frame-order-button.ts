import type { FrameBlockModel } from '@algogrind/affine-model';

import { FrameOrderAdjustmentIcon } from '@algogrind/affine-components/icons';
import { createButtonPopper } from '@algogrind/affine-shared/utils';
import { WithDisposable } from '@algogrind/global/utils';
import { css, html, LitElement } from 'lit';
import { property, query } from 'lit/decorators.js';

import type { EdgelessRootBlockComponent } from '../../../edgeless-root-block.js';
import type { EdgelessFrameOrderMenu } from './frame-order-menu.js';

export class EdgelessFrameOrderButton extends WithDisposable(LitElement) {
  static override styles = css`
    edgeless-frame-order-menu {
      display: none;
    }

    edgeless-frame-order-menu[data-show] {
      display: initial;
    }
  `;

  private _edgelessFrameOrderPopper: ReturnType<
    typeof createButtonPopper
  > | null = null;

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._edgelessFrameOrderPopper?.dispose();
  }

  override firstUpdated() {
    this._edgelessFrameOrderPopper = createButtonPopper(
      this._edgelessFrameOrderButton,
      this._edgelessFrameOrderMenu,
      ({ display }) => this.setPopperShow(display === 'show'),
      {
        mainAxis: 22,
      }
    );
  }

  protected override render() {
    const { readonly } = this.edgeless.doc;
    return html`
      <style>
        .edgeless-frame-order-button svg {
          color: ${readonly ? 'var(--affine-text-disable-color)' : 'inherit'};
        }
      </style>
      <edgeless-tool-icon-button
        class="edgeless-frame-order-button"
        .tooltip=${this.popperShow ? '' : 'Frame Order'}
        @click=${() => {
          if (readonly) return;
          this._edgelessFrameOrderPopper?.toggle();
        }}
        .iconContainerPadding=${0}
      >
        ${FrameOrderAdjustmentIcon}
      </edgeless-tool-icon-button>
      <edgeless-frame-order-menu .edgeless=${this.edgeless}>
      </edgeless-frame-order-menu>
    `;
  }

  @query('.edgeless-frame-order-button')
  private accessor _edgelessFrameOrderButton!: HTMLElement;

  @query('edgeless-frame-order-menu')
  private accessor _edgelessFrameOrderMenu!: EdgelessFrameOrderMenu;

  @property({ attribute: false })
  accessor edgeless!: EdgelessRootBlockComponent;

  @property({ attribute: false })
  accessor frames!: FrameBlockModel[];

  @property({ attribute: false })
  accessor popperShow = false;

  @property({ attribute: false })
  accessor setPopperShow: (show: boolean) => void = () => {};
}
