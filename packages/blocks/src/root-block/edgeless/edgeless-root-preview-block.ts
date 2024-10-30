import type {
  SurfaceBlockComponent,
  SurfaceBlockModel,
} from '@algogrind/affine-block-surface';
import type { RootBlockModel } from '@algogrind/affine-model';
import type { GfxBlockComponent, SurfaceSelection } from '@algogrind/block-std';

import {
  FontLoaderService,
  ThemeProvider,
} from '@algogrind/affine-shared/services';
import { BlockComponent } from '@algogrind/block-std';
import {
  GfxBlockElementModel,
  type GfxViewportElement,
} from '@algogrind/block-std/gfx';
import { assertExists } from '@algogrind/global/utils';
import { css, html } from 'lit';
import { query, state } from 'lit/decorators.js';

import type { EdgelessRootBlockWidgetName } from '../types.js';
import type { EdgelessRootService } from './edgeless-root-service.js';

import { requestThrottledConnectedFrame } from '../../_common/utils/index.js';
import { getBackgroundGrid, isCanvasElement } from './utils/query.js';

export class EdgelessRootPreviewBlockComponent extends BlockComponent<
  RootBlockModel,
  EdgelessRootService,
  EdgelessRootBlockWidgetName
> {
  static override styles = css`
    affine-edgeless-root-preview {
      pointer-events: none;
      -webkit-user-select: none;
      user-select: none;
      display: block;
      height: 100%;
    }

    affine-edgeless-root-preview .widgets-container {
      position: absolute;
      left: 0;
      top: 0;
      contain: size layout;
      z-index: 1;
      height: 100%;
    }

    affine-edgeless-root-preview .edgeless-background {
      height: 100%;
      background-color: var(--affine-background-primary-color);
      background-image: radial-gradient(
        var(--affine-edgeless-grid-color) 1px,
        var(--affine-background-primary-color) 1px
      );
    }

    @media print {
      .selected {
        background-color: transparent !important;
      }
    }
  `;

  @query('.edgeless-background')
  accessor background!: HTMLDivElement;

  private _refreshLayerViewport = requestThrottledConnectedFrame(() => {
    const { zoom, translateX, translateY } = this.service.viewport;
    const { gap } = getBackgroundGrid(zoom, true);

    this.background.style.setProperty(
      'background-position',
      `${translateX}px ${translateY}px`
    );
    this.background.style.setProperty('background-size', `${gap}px ${gap}px`);
  }, this);

  private _resizeObserver: ResizeObserver | null = null;

  private _viewportElement: HTMLElement | null = null;

  get dispatcher() {
    return this.service?.uiEventDispatcher;
  }

  get surfaceBlockModel() {
    return this.model.children.find(
      child => child.flavour === 'affine:surface'
    ) as SurfaceBlockModel;
  }

  get viewportElement(): HTMLElement {
    if (this._viewportElement) return this._viewportElement;
    this._viewportElement = this.host.closest(
      this.editorViewportSelector
    ) as HTMLElement | null;
    assertExists(this._viewportElement);
    return this._viewportElement;
  }

  private _initFontLoader() {
    this.std
      .get(FontLoaderService)
      .ready.then(() => {
        this.surface.refresh();
      })
      .catch(console.error);
  }

  private _initLayerUpdateEffect() {
    const updateLayers = requestThrottledConnectedFrame(() => {
      const blocks = Array.from(
        this.gfxViewportElm.children as HTMLCollectionOf<GfxBlockComponent>
      );

      blocks.forEach((block: GfxBlockComponent) => {
        block.updateZIndex?.();
      });
    });

    this._disposables.add(
      this.service.layer.slots.layerUpdated.on(() => updateLayers())
    );
  }

  private _initPixelRatioChangeEffect() {
    let media: MediaQueryList;

    const onPixelRatioChange = () => {
      if (media) {
        this.service.viewport.onResize();
        media.removeEventListener('change', onPixelRatioChange);
      }

      media = matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
      media.addEventListener('change', onPixelRatioChange);
    };

    onPixelRatioChange();

    this._disposables.add(() => {
      media?.removeEventListener('change', onPixelRatioChange);
    });
  }

  private _initResizeEffect() {
    if (!this._viewportElement) {
      return;
    }

    const resizeObserver = new ResizeObserver((_: ResizeObserverEntry[]) => {
      // FIXME: find a better way to get rid of empty check
      if (!this.service || !this.service.selection || !this.service.viewport) {
        console.error('Service not ready');
        return;
      }
      this.service.selection.set(this.service.selection.surfaceSelections);
      this.service.viewport.onResize();
    });

    resizeObserver.observe(this.viewportElement);
    this._resizeObserver?.disconnect();
    this._resizeObserver = resizeObserver;
  }

  private _initSlotEffects() {
    this.disposables.add(
      this.std.get(ThemeProvider).theme$.subscribe(() => this.surface.refresh())
    );
  }

  override connectedCallback() {
    super.connectedCallback();

    this.handleEvent('selectionChange', () => {
      const surface = this.host.selection.value.find(
        (sel): sel is SurfaceSelection => sel.is('surface')
      );
      if (!surface) return;

      const el = this.service.getElementById(surface.elements[0]);
      if (isCanvasElement(el)) {
        return true;
      }

      return;
    });
  }

  override disconnectedCallback() {
    super.disconnectedCallback();

    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
  }

  override firstUpdated() {
    this._initSlotEffects();
    this._initResizeEffect();
    this._initPixelRatioChangeEffect();
    this._initFontLoader();
    this._initLayerUpdateEffect();

    this._disposables.add(
      this.service.viewport.viewportUpdated.on(() => {
        this._refreshLayerViewport();
      })
    );

    this._refreshLayerViewport();
  }

  override renderBlock() {
    return html`
      <div class="edgeless-background edgeless-container">
        <gfx-viewport
          .viewport=${this.service.viewport}
          .getModelsInViewport=${() => {
            const blocks = this.service.gfx.grid.search(
              this.service.viewport.viewportBounds,
              undefined,
              {
                useSet: true,
                filter: model => model instanceof GfxBlockElementModel,
              }
            );
            return blocks;
          }}
          .host=${this.host}
        >
          ${this.renderChildren(this.model)}${this.renderChildren(
            this.surfaceBlockModel
          )}
        </gfx-viewport>
      </div>
    `;
  }

  override willUpdate(_changedProperties: Map<PropertyKey, unknown>): void {
    if (_changedProperties.has('editorViewportSelector')) {
      this._initResizeEffect();
    }
  }

  @state()
  accessor editorViewportSelector = '.affine-edgeless-viewport';

  @query('gfx-viewport')
  accessor gfxViewportElm!: GfxViewportElement;

  @query('affine-surface')
  accessor surface!: SurfaceBlockComponent;
}

declare global {
  interface HTMLElementTagNameMap {
    'affine-edgeless-root-preview': EdgelessRootPreviewBlockComponent;
  }
}
