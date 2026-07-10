import { EdgelessLegacySlotIdentifier } from '@blocksuite/affine-block-surface';
import { stopPropagation } from '@blocksuite/affine-shared/utils';
import { WithDisposable } from '@blocksuite/global/lit';
import { MinusIcon, PlusIcon, ViewBarIcon } from '@blocksuite/icons/lit';
import type { BlockStdScope } from '@blocksuite/std';
import {
  GfxControllerIdentifier,
  ZOOM_MAX,
  ZOOM_MIN,
  ZOOM_STEP,
} from '@blocksuite/std/gfx';
import { effect } from '@preact/signals-core';
import { css, html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import clamp from 'lodash-es/clamp';

export class EdgelessZoomToolbar extends WithDisposable(LitElement) {
  static override styles = css`
    :host {
      display: flex;
    }

    .edgeless-zoom-toolbar-container {
      display: flex;
      align-items: center;
      background: transparent;
      border-radius: 8px;
      fill: currentcolor;
      padding: 4px;
    }

    .edgeless-zoom-toolbar-container.horizantal {
      flex-direction: row;
    }

    .edgeless-zoom-toolbar-container.vertical {
      flex-direction: column;
      width: 32px;
      background-color: var(--algogrind-overlay-panel-background-color);
      box-shadow: var(--algogrind-shadow-small);
      border: 1px solid var(--algogrind-border-color);
      border-radius: 8px;
    }

    .edgeless-zoom-toolbar-container[level='second'] {
      position: absolute;
      bottom: 8px;
      transform: translateY(-100%);
    }

    .edgeless-zoom-toolbar-container[hidden] {
      display: none;
    }

    .zoom-percent {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 32px;
      border: none;
      box-sizing: border-box;
      padding: 4px;
      color: var(--algogrind-text-paragraph-color);
      font-family: var(--algogrind-text-paragraph-family);
      font-size: var(--algogrind-text-caption-size);
      background-color: transparent;
      border-radius: 4px;
      cursor: pointer;
      white-space: nowrap;
      font-weight: 600;
      text-align: center;
    }

    .zoom-percent:hover {
      color: var(--algogrind-primary-color);
      background-color: var(--algogrind-hover-color);
    }

    .zoom-percent[disabled] {
      pointer-events: none;
      cursor: not-allowed;
      color: var(--algogrind-text-disabled-color);
    }
  `;

  get slots() {
    return this.std.get(EdgelessLegacySlotIdentifier);
  }

  get gfx() {
    return this.std.get(GfxControllerIdentifier);
  }

  get edgelessTool() {
    return this.gfx.tool.currentToolOption$.peek();
  }

  get locked() {
    return this.viewport.locked;
  }

  get viewport() {
    return this.gfx.viewport;
  }

  setZoomByStep = (step: number) => {
    this.viewport.smoothZoom(clamp(this.zoom + step, ZOOM_MIN, ZOOM_MAX));
  };

  get zoom() {
    if (!this.viewport) {
      console.error('Something went wrong, viewport is not available');
      return 1;
    }
    return this.viewport.zoom;
  }

  private _isVerticalBar() {
    return this.layout === 'vertical';
  }

  override connectedCallback() {
    super.connectedCallback();

    this.disposables.add(
      effect(() => {
        void this.gfx.tool.currentToolName$.value;
        this.requestUpdate();
      })
    );
  }

  override firstUpdated() {
    const { disposables } = this;
    disposables.add(
      this.viewport.viewportUpdated.subscribe(() => this.requestUpdate())
    );
    disposables.add(
      this.slots.readonlyUpdated.subscribe(() => {
        this.requestUpdate();
      })
    );
  }

  override render() {
    // [ALGOGRIND]
    // Keep the zoom toolbar available in readonly mode;
    // only hide it in presentation (frameNavigator) mode.
    if (this.gfx.tool.currentToolName$.value === 'frameNavigator') {
      return nothing;
    }

    const formattedZoom = `${Math.round(this.zoom * 100)}%`;
    const classes = `edgeless-zoom-toolbar-container ${this.layout}`;
    const locked = this.locked;

    return html`
      <div
        class=${classes}
        @dblclick=${stopPropagation}
        @mousedown=${stopPropagation}
        @mouseup=${stopPropagation}
        @pointerdown=${stopPropagation}
      >
        <edgeless-tool-icon-button
          .tooltip=${'Tartalom Középre'}
          .tipPosition=${this._isVerticalBar() ? 'right' : 'top-end'}
          .arrow=${!this._isVerticalBar()}
          @click=${() => this.gfx.fitToScreen()}
          .iconContainerPadding=${4}
          .iconSize=${'24px'}
          .disabled=${locked}
        >
          ${ViewBarIcon()}
        </edgeless-tool-icon-button>
        <edgeless-tool-icon-button
          .tooltip=${'Kicsinyítés'}
          .tipPosition=${this._isVerticalBar() ? 'right' : 'top'}
          .arrow=${!this._isVerticalBar()}
          @click=${() => this.setZoomByStep(-ZOOM_STEP)}
          .iconContainerPadding=${4}
          .iconSize=${'24px'}
          .disabled=${locked}
        >
          ${MinusIcon()}
        </edgeless-tool-icon-button>
        <button
          class="zoom-percent"
          @click=${() => this.viewport.smoothZoom(1)}
          .disabled=${locked}
        >
          ${formattedZoom}
        </button>
        <edgeless-tool-icon-button
          .tooltip=${'Nagyítás'}
          .tipPosition=${this._isVerticalBar() ? 'right' : 'top'}
          .arrow=${!this._isVerticalBar()}
          @click=${() => this.setZoomByStep(ZOOM_STEP)}
          .iconContainerPadding=${4}
          .iconSize=${'24px'}
          .disabled=${locked}
        >
          ${PlusIcon()}
        </edgeless-tool-icon-button>
      </div>
    `;
  }

  @property({ attribute: false })
  accessor layout: 'horizontal' | 'vertical' = 'horizontal';

  @property({ attribute: false })
  accessor std!: BlockStdScope;
}
