/*import type { AffineInlineEditor } from '@blocksuite/affine-components/rich-text';

// import { createLitPortal } from '@blocksuite/affine-components/portal';
import {
  isFuzzyMatch,
  substringMatchScore,
} from '@blocksuite/affine-shared/utils';
import { WithDisposable } from '@blocksuite/global/utils';
import { html, LitElement, nothing, type PropertyValues } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import type {
  EmojiMenuActionItem,
  EmojiMenuCategory,
  EmojiMenuContext,
  // EmojiMenuItem,
  EmojiMenuStaticConfig,
} from './config.js';

import { emojiMenuStyles } from './styles.js';
import {
  cleanTailForEmoji,
  createKeydownObserverForEmoji,
  emojiItemClassName,
  getEmojiQuery,
  // getFirstFocusableEmoji,
} from './utils.js';

export class EmojiMenu extends WithDisposable(LitElement) {
  static override styles = emojiMenuStyles;

  private _filteredItems: EmojiMenuActionItem[] = [];

  @state()
  private _position: { x: string; y: string; height: number } | null = null;

  private _queryState: 'off' | 'on' | 'no_result' = 'off';

  private _startRange = this.inlineEditor.getInlineRange();

  private _updateFilteredItems = () => {
    const query = this._query;
    if (query === null) {
      this.abortController.abort();
      return;
    }
    if (query.length < 2) {
      this._filteredItems = [];
      this._queryState = 'off';
      return;
    }

    const searchStr = query.toLowerCase();
    const allEmojis = this.config.items
      .flatMap((cat: EmojiMenuCategory) => cat.emojis)
      .filter((e: EmojiMenuActionItem) =>
        e.shortcodes?.some((s: string) => isFuzzyMatch(s, searchStr))
      );

    const scored = allEmojis
      .map(e => {
        const bestScore = e.shortcodes.reduce((acc, s) => {
          const score = substringMatchScore(s, searchStr);
          return score > acc ? score : acc;
        }, 0);
        return { e, score: bestScore };
      })
      .sort((a, b) => b.score - a.score)
      .map(x => x.e);

    this._filteredItems = scored;
    this._queryState = this._filteredItems.length > 0 ? 'on' : 'no_result';
  };

  @property({ attribute: false })
  config!: EmojiMenuStaticConfig;

  @property({ attribute: false })
  context!: EmojiMenuContext;

  @query('inner-emoji-menu')
  emojiMenuElement!: HTMLElement;

  updatePosition = (position: { x: string; y: string; height: number }) => {
    this._position = position;
  };

  private get _query() {
    return getEmojiQuery(this.inlineEditor, this._startRange);
  }

  constructor(
    private inlineEditor: AffineInlineEditor,
    private abortController = new AbortController()
  ) {
    super();
  }

  override connectedCallback() {
    super.connectedCallback();

    this._disposables.addFromEvent(this, 'mousedown', e => e.preventDefault());

    if (!this.inlineEditor || !this.inlineEditor.eventSource) return;

    createKeydownObserverForEmoji({
      target: this.inlineEditor.eventSource,
      signal: this.abortController.signal,
      interceptor: (event, next) => {
        const { key, code, isComposing } = event;
        if (key === 'Process' && !isComposing && code === 'Slash') {
          return;
        }
        if (this._queryState === 'no_result' && key !== 'Backspace') {
          this.abortController.abort();
          return;
        }
        next();
      },
      onInput: isComposition => {
        if (isComposition) {
          this._updateFilteredItems();
        } else {
          this.inlineEditor.slots.renderComplete.once(
            this._updateFilteredItems
          );
        }
      },
      onPaste: () => {
        setTimeout(() => {
          this._updateFilteredItems();
        }, 50);
      },
      onDelete: () => {
        const curRange = this.inlineEditor.getInlineRange();
        if (!this._startRange || !curRange) {
          return;
        }
        if (curRange.index < this._startRange.index) {
          this.abortController.abort();
        }
        this.inlineEditor.slots.renderComplete.once(this._updateFilteredItems);
      },
      onAbort: () => this.abortController.abort(),
    });
  }

  override render() {
    const overlay =
      this._queryState !== 'no_result'
        ? html`<div
            class="overlay-mask"
            @click="${() => this.abortController.abort()}"
          ></div>`
        : nothing;

    const styleObject = this._position
      ? {
          transform: `translate(${this._position.x}, ${this._position.y})`,
          maxHeight: `${Math.min(
            this._position.height,
            this.config.maxHeight
          )}px`,
        }
      : { visibility: 'hidden' };

    const panel = html`<inner-emoji-menu
      .menuStyle=${styleObject}
      .allCategories=${this.config.items}
      .filteredItems=${this._filteredItems}
      .abortController=${this.abortController}
      .context=${this.context}
    ></inner-emoji-menu>`;

    return html`${overlay}${panel}`;
  }
}

export class InnerEmojiMenu extends WithDisposable(LitElement) {
  static override styles = emojiMenuStyles;

  private _activeCategoryIndex = 0;

  private _activeEmojiIndex = -1;

  private _allEmojisForActiveCategory: EmojiMenuActionItem[] = [];

  private _handleKeydown = (event: KeyboardEvent) => {
    const { key, ctrlKey, metaKey, altKey, shiftKey } = event;
    const notControlShift = !(ctrlKey || metaKey || altKey || shiftKey);

    if (key === 'Escape' && notControlShift) {
      this.abortController.abort();
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (key === 'Enter' && notControlShift && this._activeEmojiIndex >= 0) {
      const item = this._allEmojisForActiveCategory[this._activeEmojiIndex];
      if (item) {
        cleanTailForEmoji(
          this.context.rootComponent.host,
          this.context.model,
          item.shortcodes[0]
        );
        this.context.rootComponent.std.command
          .chain()
          .getSelectedModels()
          .insertTextBlock({ content: item.char, place: 'replace' })
          .run();
        this.abortController.abort();
      }
      event.preventDefault();
      event.stopPropagation();
    }

    if (key === 'ArrowDown' && notControlShift) {
      if (
        this._activeEmojiIndex <
        this._allEmojisForActiveCategory.length - 1
      ) {
        this._activeEmojiIndex++;
        this._scrollIntoView();
      }
      event.preventDefault();
      event.stopPropagation();
    }

    if (key === 'ArrowUp' && notControlShift) {
      if (this._activeEmojiIndex > 0) {
        this._activeEmojiIndex--;
        this._scrollIntoView();
      }
      event.preventDefault();
      event.stopPropagation();
    }

    if (
      key === 'ArrowRight' &&
      notControlShift &&
      this.filteredItems.length === 0
    ) {
      if (this._activeCategoryIndex < this.allCategories.length - 1) {
        this._activeCategoryIndex++;
        this._activeEmojiIndex = 0;
        this._allEmojisForActiveCategory =
          this.allCategories[this._activeCategoryIndex]?.emojis ?? [];
        this._scrollIntoView();
      }
      event.preventDefault();
      event.stopPropagation();
    }

    if (
      key === 'ArrowLeft' &&
      notControlShift &&
      this.filteredItems.length === 0
    ) {
      if (this._activeCategoryIndex > 0) {
        this._activeCategoryIndex--;
        this._activeEmojiIndex = 0;
        this._allEmojisForActiveCategory =
          this.allCategories[this._activeCategoryIndex]?.emojis ?? [];
        this._scrollIntoView();
      }
      event.preventDefault();
      event.stopPropagation();
    }
  };

  private _subMenuAbortController: AbortController | null = null;

  @property({ attribute: false })
  abortController!: AbortController;

  @property({ attribute: false })
  allCategories: EmojiMenuCategory[] = [];

  @property({ attribute: false })
  context!: EmojiMenuContext;

  @property({ attribute: false })
  filteredItems: EmojiMenuActionItem[] = [];

  @property({ attribute: false })
  menuStyle: Record<string, string> | null = null;

  private _renderCategoryButtons() {
    return html`
      <div class="emoji-category-buttons">
        ${this.allCategories.map((cat, i) => {
          const active = i === this._activeCategoryIndex ? 'active' : '';
          return html`
            <button
              class="emoji-category-button ${active}"
              @click=${() => {
                this._activeCategoryIndex = i;
                this._activeEmojiIndex = 0;
                this._allEmojisForActiveCategory = cat.emojis;
                this.filteredItems = [];
                this.requestUpdate();
              }}
            >
              ${cat.icon}
            </button>
          `;
        })}
      </div>
    `;
  }

  private _renderEmojis() {
    if (this._allEmojisForActiveCategory.length === 0) return nothing;
    return html`
      <div class="emoji-grid">
        ${this._allEmojisForActiveCategory.map((item, i) => {
          const selected = i === this._activeEmojiIndex;
          return html`
            <div
              class="emoji-item ${emojiItemClassName(item)} ${selected
                ? 'emoji-item-selected'
                : ''}"
              @mousemove=${() => {
                this._activeEmojiIndex = i;
              }}
              @click=${() => {
                cleanTailForEmoji(
                  this.context.rootComponent.host,
                  this.context.model,
                  item.shortcodes[0]
                );
                this.context.rootComponent.std.command
                  .chain()
                  .getSelectedModels()
                  .({ content: item.char, place: 'replace' })
                  .run();
                this.abortController.abort();
              }}
            >
              ${item.char}
            </div>
          `;
        })}
      </div>
    `;
  }

  private _renderFiltered() {
    return html`
      <div class="emoji-grid">
        ${this.filteredItems.map((item, i) => {
          const selected = i === this._activeEmojiIndex;
          return html`
            <div
              class="emoji-item ${emojiItemClassName(item)} ${selected
                ? 'emoji-item-selected'
                : ''}"
              @mousemove=${() => {
                this._activeEmojiIndex = i;
              }}
              @click=${() => {
                cleanTailForEmoji(
                  this.context.rootComponent.host,
                  this.context.model,
                  item.shortcodes[0]
                );
                this.context.rootComponent.std.command
                  .chain()
                  .getSelectedModels()
                  .insertTextBlock({ content: item.char, place: 'replace' })
                  .run();
                this.abortController.abort();
              }}
            >
              ${item.char}
            </div>
          `;
        })}
      </div>
    `;
  }

  private _scrollIntoView() {
    const activeItem = this.renderRoot.querySelector(
      `.${emojiItemClassName(
        this._allEmojisForActiveCategory[this._activeEmojiIndex]
      )}`
    );
    if (!activeItem) return;
    (activeItem as HTMLElement).scrollIntoView({ block: 'nearest' });
    this.requestUpdate();
  }

  override connectedCallback() {
    super.connectedCallback();

    this.abortController?.signal?.addEventListener('abort', () => {
      this._subMenuAbortController?.abort();
    });

    const inlineEditor = this.context.rootComponent.std.view.getWidget(
      'affine-emoji-menu-widget',
      this.context.rootComponent.model.id
    );
    if (!inlineEditor) {
      // fallback
    }

    window.addEventListener('keydown', this._handleKeydown, {
      capture: true,
      signal: this.abortController.signal,
    });
  }

  override disconnectedCallback() {
    this.abortController.abort();
  }

  override firstUpdated() {
    if (this.filteredItems.length === 0) {
      this._allEmojisForActiveCategory =
        this.allCategories[this._activeCategoryIndex]?.emojis ?? [];
      if (this._allEmojisForActiveCategory.length > 0) {
        this._activeEmojiIndex = 0;
      }
    } else {
      this._allEmojisForActiveCategory = this.filteredItems;
      this._activeEmojiIndex = 0;
    }
    this.requestUpdate();
  }

  override render() {
    const style = styleMap(this.menuStyle ?? { position: 'relative' });

    return html`
      <div class="emoji-menu" style=${style}>
        ${this.filteredItems.length === 0
          ? html` ${this._renderCategoryButtons()} ${this._renderEmojis()} `
          : html`
              <div class="emoji-filter-notice">Filter Results</div>
              ${this._renderFiltered()}
            `}
      </div>
    `;
  }

  override updated(changedProperties: PropertyValues<this>) {
    if (
      changedProperties.has('filteredItems') ||
      changedProperties.has('allCategories')
    ) {
      if (this.filteredItems.length === 0) {
        this._allEmojisForActiveCategory =
          this.allCategories[this._activeCategoryIndex]?.emojis ?? [];
      } else {
        this._allEmojisForActiveCategory = this.filteredItems;
      }
      if (this._allEmojisForActiveCategory.length > 0) {
        this._activeEmojiIndex = 0;
      } else {
        this._activeEmojiIndex = -1;
      }
      this._subMenuAbortController?.abort();
      this.requestUpdate();
    }
  }
}
*/

console.log('.');
