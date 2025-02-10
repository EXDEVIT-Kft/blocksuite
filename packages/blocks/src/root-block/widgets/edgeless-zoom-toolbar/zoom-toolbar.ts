import {
  MinusIcon,
  PlusIcon,
  ViewBarIcon,
} from '@algogrind/affine-components/icons';
import { stopPropagation } from '@algogrind/affine-shared/utils';
import { WithDisposable } from '@algogrind/global/utils';
import { effect } from '@preact/signals-core';
import { css, html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';

import type { EdgelessRootBlockComponent } from '../../edgeless/edgeless-root-block.js';

import { ZOOM_STEP } from '../../edgeless/utils/zoom.js';

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

  get edgelessService() {
    return this.edgeless.service;
  }

  get edgelessTool() {
    return this.edgeless.gfx.tool.currentToolOption$.peek();
  }

  get locked() {
    return this.edgelessService.locked;
  }

  get viewport() {
    return this.edgelessService.viewport;
  }

  get zoom() {
    if (!this.viewport) {
      console.error('Something went wrong, viewport is not available');
      return 1;
    }
    return this.viewport.zoom;
  }

  constructor(edgeless: EdgelessRootBlockComponent) {
    super();
    this.edgeless = edgeless;
  }

  private _isVerticalBar() {
    return this.layout === 'vertical';
  }

  override connectedCallback() {
    super.connectedCallback();

    this.disposables.add(
      effect(() => {
        this.edgeless.gfx.tool.currentToolName$.value;
        this.requestUpdate();
      })
    );
  }

  override firstUpdated() {
    const { disposables } = this;
    disposables.add(
      this.edgeless.service.viewport.viewportUpdated.on(() =>
        this.requestUpdate()
      )
    );
    disposables.add(
      this.edgeless.slots.readonlyUpdated.on(() => {
        this.requestUpdate();
      })
    );
  }

  override render() {
    if (this.edgeless.doc.readonly) {
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
          @click=${() => this.edgelessService.zoomToFit()}
          .iconContainerPadding=${4}
          .disabled=${locked}
        >
          ${ViewBarIcon}
        </edgeless-tool-icon-button>
        <edgeless-tool-icon-button
          .tooltip=${'Kicsinyítés'}
          .tipPosition=${this._isVerticalBar() ? 'right' : 'top'}
          .arrow=${!this._isVerticalBar()}
          @click=${() => this.edgelessService.setZoomByStep(-ZOOM_STEP)}
          .iconContainerPadding=${4}
          .disabled=${locked}
        >
          ${MinusIcon}
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
          @click=${() => this.edgelessService.setZoomByStep(ZOOM_STEP)}
          .iconContainerPadding=${4}
          .disabled=${locked}
        >
          ${PlusIcon}
        </edgeless-tool-icon-button>
      </div>
    `;
  }

  @property({ attribute: false })
  accessor edgeless: EdgelessRootBlockComponent;

  @property({ attribute: false })
  accessor layout: 'horizontal' | 'vertical' = 'horizontal';
}

declare global {
  interface HTMLElementTagNameMap {
    'edgeless-zoom-toolbar': EdgelessZoomToolbar;
  }
}
