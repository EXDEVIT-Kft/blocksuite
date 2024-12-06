import type { ImageBlockModel } from '@blocksuite/affine-model';

import { CaptionedBlockComponent } from '@blocksuite/affine-components/caption';
import { Peekable } from '@blocksuite/affine-components/peek';
import { html } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { when } from 'lit/directives/when.js';

import type { ImageBlockFallbackCard } from './components/image-block-fallback.js';
import type { ImageBlockPageComponent } from './components/page-image-block.js';
import type { ImageBlockService } from './image-service.js';

import {
  copyImageBlob,
  // [ALGOGRIND]
  // deleteBlobForImage => used for image deletion
  deleteBlobForImage,
  downloadImageBlob,
  fetchImageBlob,
  turnImageIntoCardView,
} from './utils.js';

@Peekable()
export class ImageBlockComponent extends CaptionedBlockComponent<
  ImageBlockModel,
  ImageBlockService
> {
  // [ALGOGRIND]
  // Image lazy loading helper
  private hasFetchedBlob = false;

  // [ALGOGRIND]
  // Image lazy loading IntersectionObserver
  private intersectionObserver?: IntersectionObserver;

  convertToCardView = () => {
    turnImageIntoCardView(this).catch(console.error);
  };

  copy = () => {
    copyImageBlob(this).catch(console.error);
  };

  download = () => {
    downloadImageBlob(this).catch(console.error);
  };

  refreshData = () => {
    this.retryCount = 0;
    fetchImageBlob(this).catch(console.error);
  };

  get resizableImg() {
    return this.pageImage?.resizeImg;
  }

  private _handleClick(event: MouseEvent) {
    // the peek view need handle shift + click
    if (event.defaultPrevented) return;

    event.stopPropagation();
    const selectionManager = this.host.selection;
    const blockSelection = selectionManager.create('block', {
      blockId: this.blockId,
    });
    selectionManager.setGroup('note', [blockSelection]);
  }

  override connectedCallback() {
    super.connectedCallback();

    // [ALGOGRIND]
    // Commented original next line to allow IntersectionObserver to lazy-load images
    // this.refreshData();
    this.contentEditable = 'false';
    this._disposables.add(
      this.model.propsUpdated.on(({ key }) => {
        if (key === 'sourceId') {
          this.refreshData();
        }
      })
    );

    // [ALGOGRIND]
    // Detect image deletion, and call the helper to notify the blobSource engine.
    this._disposables.add(
      this.model.deleted.on(() => {
        deleteBlobForImage(this.host, this.model.sourceId$.value).catch(
          console.log
        );
      })
    );
  }

  override disconnectedCallback() {
    if (this.blobUrl) {
      URL.revokeObjectURL(this.blobUrl);
    }

    // [ALGOGRIND]
    // Image lazy loading: disconnect the IntersectionObserver
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }

    super.disconnectedCallback();
  }

  override firstUpdated() {
    // lazy bindings
    this.disposables.addFromEvent(this, 'click', this._handleClick);

    // [ALGOGRIND]
    // Set up the IntersectionObserver once the component is updated and `imageContainer` is rendered.
    if (this.imageContainer) {
      this.intersectionObserver = new IntersectionObserver(
        entries => {
          for (const entry of entries) {
            if (entry.isIntersecting && !this.hasFetchedBlob) {
              // The image is in about to be in view AND was not loaded previously
              // => fetch blob now
              this.refreshData();
              this.hasFetchedBlob = true;
            }
          }
        },
        { rootMargin: '300px' }
      );

      // [ALGOGRIND]
      // Observing the image container
      this.intersectionObserver.observe(this.imageContainer);
    }
  }

  override renderBlock() {
    const containerStyleMap = styleMap({
      position: 'relative',
      width: '100%',
    });

    return html`
      <div class="affine-image-container" style=${containerStyleMap}>
        ${when(
          this.loading || this.error,
          () =>
            html`<affine-image-fallback-card
              .error=${this.error}
              .loading=${this.loading}
              .mode=${'page'}
            ></affine-image-fallback-card>`,
          () => html`<affine-page-image .block=${this}></affine-page-image>`
        )}
      </div>

      ${Object.values(this.widgets)}
    `;
  }

  override updated() {
    this.fallbackCard?.requestUpdate();
  }

  @property({ attribute: false })
  accessor blob: Blob | undefined = undefined;

  @property({ attribute: false })
  accessor blobUrl: string | undefined = undefined;

  override accessor blockContainerStyles = { margin: '18px 0' };

  @property({ attribute: false })
  accessor downloading = false;

  @property({ attribute: false })
  accessor error = false;

  @query('affine-image-fallback-card')
  accessor fallbackCard: ImageBlockFallbackCard | null = null;

  // [ALGOGRIND]
  // This query is necessary to properly implement image lazy loading with IntersectionObservers
  @query('.affine-image-container')
  accessor imageContainer: HTMLElement | null = null;

  @state()
  accessor lastSourceId!: string;

  @property({ attribute: false })
  accessor loading = false;

  @query('affine-page-image')
  private accessor pageImage: ImageBlockPageComponent | null = null;

  @property({ attribute: false })
  accessor retryCount = 0;

  override accessor useCaptionEditor = true;

  override accessor useZeroWidth = true;
}

declare global {
  interface HTMLElementTagNameMap {
    'affine-image': ImageBlockComponent;
  }
}
