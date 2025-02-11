import { PropTypes, requiredProperties } from '@blocksuite/block-std';
import {
  NoteDisplayMode,
  type ParagraphBlockModel,
  scrollbarStyle,
} from '@blocksuite/blocks';
import { SignalWatcher, WithDisposable } from '@blocksuite/global/utils';
import { signal } from '@preact/signals-core';
import { css, html, LitElement, nothing } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';

import type { AffineEditorContainer } from '../../editors/editor-container.js';

import { TocIcon } from '../_common/icons.js';
import { getHeadingBlocksFromDoc } from './utils/query.js';
import {
  observeActiveHeadingDuringScroll,
  scrollToBlockWithHighlight,
} from './utils/scroll.js';

export const AFFINE_OUTLINE_VIEWER = 'affine-outline-viewer';

@requiredProperties({
  editor: PropTypes.object,
})
export class OutlineViewer extends SignalWatcher(WithDisposable(LitElement)) {
  static override styles = css`
    :host {
      display: flex;
    }
    .outline-viewer-root {
      --duration: 120ms;
      --timing: cubic-bezier(0.42, 0, 0.58, 1);

      max-height: calc(100dvh - 20vh);
      box-sizing: border-box;
      display: flex;

      position: absolute;
      top: 10vh;
      left: -1.675rem;
    }

    .outline-viewer-indicators-container {
      position: relative;
      height: min-content;
      max-height: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      overflow-y: hidden;
    }

    .outline-viewer-indicator-wrapper {
      flex: 1 1 16px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .outline-viewer-indicator {
      width: 20px;
      height: 2px;
      border-radius: 1px;
      overflow: hidden;
      background: var(--affine-black-10, rgba(0, 0, 0, 0.1));
    }

    .outline-viewer-indicator[data-level='h1'] {
      width: 20px;
    }

    .outline-viewer-indicator[data-level='h2'] {
      width: 16px;
    }

    .outline-viewer-indicator[data-level='h3'] {
      width: 12px;
    }

    .outline-viewer-indicator[data-level='h4'] {
      width: 10px;
    }

    .outline-viewer-indicator[data-level='h5'] {
      width: 8px;
    }

    .outline-viewer-indicator[data-level='h6'] {
      width: 6px;
    }

    .outline-viewer-indicator.active {
      background: var(--algogrind-text-paragraph-color);
    }

    .outline-viewer-panel {
      position: relative;
      display: flex;
      width: 0px;
      left: -200px;
      max-height: calc(100dvh - 20vh);
      box-sizing: border-box;
      flex-direction: column;
      align-items: flex-start;

      border-radius: 8px;
      border-width: 0px;
      border-style: solid;
      border-color: var(--algogrind-border-color);
      background: var(--algogrind-overlay-panel-background-color);
      box-shadow: 0px 6px 16px 0px rgba(0, 0, 0, 0.14);

      overflow-y: auto;

      opacity: 0;
      transform: translateX(0px);
      transition:
        width 0s var(--duration),
        padding 0s var(--duration),
        border-width 0s var(--duration),
        transform var(--duration) var(--timing),
        opacity var(--duration) var(--timing);
    }

    ${scrollbarStyle('.outline-viewer-panel')}

    .outline-viewer-header {
      display: flex;
      padding: 6px;
      align-items: center;
      gap: 4px;
      align-self: stretch;

      span {
        flex: 1;
        overflow: hidden;
        color: var(--affine-text-secondary-color);
        text-overflow: ellipsis;

        font-family: var(--algogrind-text-paragraph-family);
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: 20px;
      }
    }

    .outline-viewer-item {
      display: flex;
      align-items: center;
      align-self: stretch;
    }

    .outline-viewer-root:hover {
      .outline-viewer-indicators-container {
        visibility: hidden;
      }

      .outline-viewer-panel {
        width: 200px;
        border-width: 1px;
        padding: 8px 4px 8px 8px;
        opacity: 1;
        transform: translateX(-10px);
        transition:
          transform var(--duration) var(--timing),
          opacity var(--duration) var(--timing);
      }
    }

    @media (min-width: 768px) {
      .outline-viewer-root {
        left: -2.25rem;
      }
    }
  `;

  private _activeHeadingId$ = signal<string | null>(null);

  private _highlightMaskDisposable = () => {};

  private _lockActiveHeadingId = false;

  private _scrollPanel = () => {
    if (!this._activeItem) return;

    const panel = this._activeItem.closest('.outline-viewer-panel');
    if (!panel) return;

    // Calculate scroll position to center the active item
    const panelRect = panel.getBoundingClientRect();
    const itemRect = this._activeItem.getBoundingClientRect();

    const scrollTop =
      panel.scrollTop +
      (itemRect.top - panelRect.top) -
      panelRect.height / 2 +
      itemRect.height / 2;

    panel.scrollTo({
      top: scrollTop,
      behavior: 'instant',
    });
  };

  private async _scrollToBlock(blockId: string) {
    this._lockActiveHeadingId = true;
    this._activeHeadingId$.value = blockId;
    this._highlightMaskDisposable = await scrollToBlockWithHighlight(
      this.editor,
      blockId
    );
    this._lockActiveHeadingId = false;
  }

  private _toggleOutlinePanel() {
    if (this.toggleOutlinePanel) {
      this._showViewer = false;
      this.toggleOutlinePanel();
    }
  }

  override connectedCallback() {
    super.connectedCallback();

    this.disposables.add(
      observeActiveHeadingDuringScroll(
        () => this.editor,
        newHeadingId => {
          if (this._lockActiveHeadingId) return;
          this._activeHeadingId$.value = newHeadingId;
        }
      )
    );
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._highlightMaskDisposable();
  }

  override render() {
    if (this.editor.doc.root === null || this.editor.mode === 'edgeless')
      return nothing;

    const headingBlocks = getHeadingBlocksFromDoc(
      this.editor.doc,
      [NoteDisplayMode.DocAndEdgeless, NoteDisplayMode.DocOnly],
      true
    );

    if (headingBlocks.length === 0) return nothing;

    const items = [
      ...(this.editor.doc.meta?.title !== '' ? [this.editor.doc.root] : []),
      ...headingBlocks,
    ];

    const toggleOutlinePanelButton =
      this.toggleOutlinePanel !== null
        ? html`<edgeless-tool-icon-button
            .tooltip=${'Kinagyítás'}
            .tipPosition=${'top-end'}
            .activeMode=${'background'}
            @click=${this._toggleOutlinePanel}
            data-testid="toggle-outline-panel-button"
          >
            ${TocIcon}
          </edgeless-tool-icon-button>`
        : nothing;

    return html`
      <div class="outline-viewer-root" @mouseenter=${this._scrollPanel}>
        <div class="outline-viewer-indicators-container">
          ${repeat(
            items,
            block => block.id,
            block =>
              html`<div class="outline-viewer-indicator-wrapper">
                <div
                  class=${classMap({
                    'outline-viewer-indicator': true,
                    active: this._activeHeadingId$.value === block.id,
                  })}
                  data-level=${block.flavour === 'affine:paragraph' &&
                  (block as ParagraphBlockModel).type.startsWith('h')
                    ? (block as ParagraphBlockModel).type
                    : 'h1'}
                ></div>
              </div>`
          )}
        </div>
        <div class="outline-viewer-panel">
          <div class="outline-viewer-item outline-viewer-header">
            <span>Tartalomjegyzék</span>
            ${toggleOutlinePanelButton}
          </div>
          ${repeat(
            items,
            block => block.id,
            block => {
              return html`<div
                class=${classMap({
                  'outline-viewer-item': true,
                  active: this._activeHeadingId$.value === block.id,
                })}
              >
                <affine-outline-block-preview
                  class=${classMap({
                    active: this._activeHeadingId$.value === block.id,
                  })}
                  .block=${block}
                  @click=${() => {
                    this._scrollToBlock(block.id).catch(console.error);
                  }}
                >
                </affine-outline-block-preview>
              </div>`;
            }
          )}
        </div>
      </div>
    `;
  }

  @query('.outline-viewer-item.active')
  private accessor _activeItem: HTMLElement | null = null;

  @state()
  private accessor _showViewer: boolean = false;

  @property({ attribute: false })
  accessor editor!: AffineEditorContainer;

  @property({ attribute: false })
  accessor toggleOutlinePanel: (() => void) | null = null;
}

declare global {
  interface HTMLElementTagNameMap {
    [AFFINE_OUTLINE_VIEWER]: OutlineViewer;
  }
}
