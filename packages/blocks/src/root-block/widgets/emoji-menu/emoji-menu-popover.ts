import type { AffineInlineEditor } from '@blocksuite/affine-components/rich-text';

import { WithDisposable } from '@blocksuite/global/utils';
import { html, LitElement, nothing } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import type { EmojiCategory, EmojiItem, EmojiMenuContext } from './config.js';

import {
  cleanSpecifiedTail,
  createKeydownObserver,
} from '../../../_common/components/utils.js';

import '@blocksuite/affine-components/toolbar';

import { styles } from './styles.js';

export class EmojiMenu extends WithDisposable(LitElement) {
  static override styles = styles;

  private _currentCategory = 0;

  private _handleEmojiSelect = (emoji: EmojiItem) => {
    try {
      cleanSpecifiedTail(this.host, this.context.model, ':' + this._searchText);
      this.inlineEditor
        .waitForUpdate()
        .then(() => {
          emoji.action(this.context)?.catch(console.error);
          this.abortController.abort();
        })
        .catch(console.error);
    } catch (error) {
      console.error('Error handling emoji select:', error);
    }
  };

  private _selectedIndex = 0;

  private _startRange = this.inlineEditor.getInlineRange();

  private _updateFilteredItems = () => {
    const range = this.inlineEditor.getInlineRange();
    if (!range || !this._startRange) {
      this.abortController.abort();
      return;
    }

    const textPoint = this.inlineEditor.getTextPoint(range.index);
    if (!textPoint) {
      this.abortController.abort();
      return;
    }

    const [leafStart, offsetStart] = textPoint;
    const text = leafStart.textContent
      ? leafStart.textContent.slice(0, offsetStart)
      : '';

    const match = text.match(/:(?![/\s])(\S+)/u);
    console.log(match);
    if (!match) {
      this.abortController.abort();
      return;
    }

    const query = match[1].toLowerCase();
    this._searchText = query;

    this.requestUpdate();
  };

  updatePosition = (position: { x: string; y: string; height: number }) => {
    this._position = position;
    this.requestUpdate();
  };

  get host() {
    return this.context.rootComponent.host;
  }

  constructor(
    private inlineEditor: AffineInlineEditor,
    private abortController = new AbortController()
  ) {
    super();
  }

  private _filterEmojis(emojis: EmojiItem[], searchText: string): EmojiItem[] {
    const query = searchText.toLowerCase();
    if (!query) return emojis;

    return emojis.filter(
      emoji =>
        emoji.name.toLowerCase().includes(query) ||
        emoji.tags.some(tag => tag.toLowerCase().includes(query)) ||
        emoji.textCodes?.some(code => code.toLowerCase().includes(query))
    );
  }

  private _getAllFilteredEmojis(): EmojiCategory[] {
    return this.config.categories
      .map(category => ({
        ...category,
        emojis: this._filterEmojis(category.emojis, this._searchText),
      }))
      .filter(category => category.emojis.length > 0);
  }

  private _handleKeyNavigation(key: string) {
    const filteredCategories = this._getAllFilteredEmojis();

    const allEmojis = filteredCategories.flatMap(category => category.emojis);

    const GRID_COLUMNS = 8;

    // Get current category info
    let currentCategoryIndex = 0;
    let currentIndexInCategory = 0;
    let accumulatedEmojis = 0;
    const categoryStartIndices: number[] = [0];

    // Calculate category start indices
    for (let i = 0; i < filteredCategories.length; i++) {
      accumulatedEmojis += filteredCategories[i].emojis.length;
      categoryStartIndices.push(accumulatedEmojis);
    }

    // Reset accumulated emojis for current category calculation
    accumulatedEmojis = 0;

    // Find current category and index within it
    for (let i = 0; i < filteredCategories.length; i++) {
      if (
        this._selectedIndex >= categoryStartIndices[i] &&
        this._selectedIndex < categoryStartIndices[i + 1]
      ) {
        currentCategoryIndex = i;
        currentIndexInCategory = this._selectedIndex - categoryStartIndices[i];
        break;
      }
    }

    const currentCategory = filteredCategories[currentCategoryIndex];

    // Calculate current position in grid
    const currentRow = Math.floor(currentIndexInCategory / GRID_COLUMNS);
    const currentCol = currentIndexInCategory % GRID_COLUMNS;
    const currentCategoryRows = Math.ceil(
      currentCategory.emojis.length / GRID_COLUMNS
    );

    switch (key) {
      case 'ArrowUp': {
        if (currentRow > 0) {
          // Stay in same category, move up one row
          this._selectedIndex -= GRID_COLUMNS;
        } else if (currentCategoryIndex > 0) {
          // Move to previous category's last row at same column
          const prevCategoryEmojis =
            filteredCategories[currentCategoryIndex - 1].emojis;
          const prevCategoryRows = Math.ceil(
            prevCategoryEmojis.length / GRID_COLUMNS
          );
          const lastRowColumns =
            prevCategoryEmojis.length % GRID_COLUMNS || GRID_COLUMNS;

          // Calculate target column (limited by last row width)
          const targetCol = Math.min(currentCol, lastRowColumns - 1);
          const targetIndex = (prevCategoryRows - 1) * GRID_COLUMNS + targetCol;

          // Update selected index
          this._selectedIndex =
            categoryStartIndices[currentCategoryIndex - 1] + targetIndex;
          this._currentCategory = currentCategoryIndex - 1;
        }
        break;
      }
      case 'ArrowDown': {
        if (currentRow < currentCategoryRows - 1) {
          // Stay in same category, move down one row
          const targetIndex = Math.min(
            this._selectedIndex + GRID_COLUMNS,
            categoryStartIndices[currentCategoryIndex + 1] - 1
          );
          this._selectedIndex = targetIndex;
        } else if (currentCategoryIndex < filteredCategories.length - 1) {
          // Move to next category's first row at same column
          const nextCategoryEmojis =
            filteredCategories[currentCategoryIndex + 1].emojis;

          // Calculate target column (limited by first row width)
          const targetCol = Math.min(currentCol, nextCategoryEmojis.length - 1);
          this._selectedIndex =
            categoryStartIndices[currentCategoryIndex + 1] + targetCol;
          this._currentCategory = currentCategoryIndex + 1;
        }
        break;
      }
      case 'ArrowLeft': {
        if (currentCol > 0 || this._selectedIndex > 0) {
          this._selectedIndex = Math.max(0, this._selectedIndex - 1);
        }
        break;
      }
      case 'ArrowRight': {
        if (this._selectedIndex < allEmojis.length - 1) {
          this._selectedIndex = this._selectedIndex + 1;
        }
        break;
      }
      case 'Enter': {
        const selectedEmoji = allEmojis[this._selectedIndex];
        if (selectedEmoji) {
          void this._handleEmojiSelect(selectedEmoji);
        }
        break;
      }
    }

    this._scrollToSelectedEmoji();
    this.requestUpdate();
  }

  private _renderCategory(category: EmojiCategory, _index: number) {
    const filteredEmojis = category.emojis;

    if (filteredEmojis.length === 0) return nothing;

    const startIndex = this._getAllFilteredEmojis()
      .flatMap(category => category.emojis)
      .findIndex(emoji => emoji === filteredEmojis[0]);

    return html`
      <div class="emoji-category">
        <div class="category-name">${category.name}</div>
        <div class="emoji-grid">
          ${filteredEmojis.map(
            (emoji, i) => html`
              <div
                class="emoji-item ${startIndex + i === this._selectedIndex
                  ? 'selected'
                  : ''}"
                @click=${() => this._handleEmojiSelect(emoji)}
                @mouseenter=${() => (this._selectedIndex = startIndex + i)}
              >
                ${emoji.emoji}
                <affine-tooltip .offset=${4}>${emoji.name}</affine-tooltip>
              </div>
            `
          )}
        </div>
      </div>
    `;
  }

  private _scrollToCategory(index: number) {
    const container = this.shadowRoot?.querySelector('.emoji-menu-content');
    const categories = container?.querySelectorAll('.emoji-category');
    if (!container || !categories) return;

    const category = categories[index];
    if (!category) return;

    const scrollOffset = 12;
    const targetPosition = (category as HTMLElement).offsetTop - scrollOffset;

    container.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });
    this._currentCategory = index;
    this.requestUpdate();
  }

  private _scrollToSelectedEmoji() {
    const container = this.shadowRoot?.querySelector('.emoji-menu-content');
    const selectedEmoji = this.shadowRoot?.querySelector(
      '.emoji-item.selected'
    );

    if (container && selectedEmoji) {
      const containerRect = container.getBoundingClientRect();
      const emojiRect = selectedEmoji.getBoundingClientRect();

      if (emojiRect.top < containerRect.top) {
        container.scrollTop -= containerRect.top - emojiRect.top + 8;
      } else if (emojiRect.bottom > containerRect.bottom) {
        container.scrollTop += emojiRect.bottom - containerRect.bottom + 8;
      }
    }
  }

  override connectedCallback() {
    super.connectedCallback();

    this._disposables.addFromEvent(this, 'mousedown', e => {
      e.preventDefault();
    });

    const inlineEditor = this.inlineEditor;
    if (!inlineEditor?.eventSource) return;

    createKeydownObserver({
      target: inlineEditor.eventSource,
      signal: this.abortController.signal,
      interceptor: (event, next) => {
        const { key } = event;

        if (
          key === 'ArrowUp' ||
          key === 'ArrowDown' ||
          key === 'ArrowLeft' ||
          key === 'ArrowRight' ||
          key === 'Enter'
        ) {
          event.preventDefault();
          this._handleKeyNavigation(key);
          return;
        }

        if (key === 'Escape') {
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
      onDelete: () => {
        const curRange = this.inlineEditor.getInlineRange();
        if (!this._startRange || !curRange) return;

        if (curRange.index < this._startRange.index) {
          this.abortController.abort();
          return;
        }
        this.inlineEditor.slots.renderComplete.once(this._updateFilteredItems);
      },
      onAbort: () => this.abortController.abort(),
    });
  }

  override render() {
    const filteredCategories = this._getAllFilteredEmojis();

    const menuStyles = this._position
      ? {
          transform: `translate(${this._position.x}, ${this._position.y})`,
          maxHeight: `${Math.min(this._position.height, 350)}px`,
        }
      : {
          visibility: 'hidden',
        };

    return html`
      <div class="overlay-mask" @click=${() => this.abortController.abort()}>
        <div
          class="emoji-menu"
          style=${styleMap(menuStyles)}
          @click=${(e: MouseEvent) => e.stopPropagation()}
        >
          ${filteredCategories.length > 0
            ? html`
                <div class="emoji-menu-content">
                  ${filteredCategories.map((category, i) =>
                    this._renderCategory(category, i)
                  )}
                </div>
                <div class="category-nav">
                  ${filteredCategories.map(
                    (category, i) => html`
                      <div
                        class="nav-item ${this._currentCategory === i
                          ? 'active'
                          : ''}"
                        @click=${() => this._scrollToCategory(i)}
                      >
                        ${category.icon}
                        <affine-tooltip .offset=${4}
                          >${category.name}</affine-tooltip
                        >
                      </div>
                    `
                  )}
                </div>
              `
            : html`<div class="emoji-menu-content no-results">
                Nincs találat
              </div>`}
        </div>
      </div>
    `;
  }

  @state()
  private accessor _position: {
    x: string;
    y: string;
    height: number;
  } | null = null;

  @state()
  accessor _searchText = '';

  @property({ attribute: false })
  accessor config!: {
    categories: EmojiCategory[];
    maxHeight: number;
  };

  @property({ attribute: false })
  accessor context!: EmojiMenuContext;

  @query('.emoji-menu')
  accessor emojiMenuElement!: HTMLElement;
}
