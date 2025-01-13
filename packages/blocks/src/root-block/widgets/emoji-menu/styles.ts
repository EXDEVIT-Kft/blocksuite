import { css } from 'lit';

import { scrollbarStyle } from '../../../_common/components/utils.js';

export const emojiMenuStyles = css`
  .overlay-mask {
    pointer-events: auto;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: var(--affine-z-index-popover);
  }

  .emoji-menu {
    position: fixed;
    left: 0;
    top: 0;
    box-sizing: border-box;
    padding: 8px 8px;
    width: 260px;
    overflow-y: auto;
    border-radius: 8px;
    font-family: var(--algogrind-text-paragraph-family);
    background: var(--algogrind-overlay-panel-background-color);
    box-shadow: var(--algogrind-ring), var(--algogrind-shadow-medium);
    z-index: var(--affine-z-index-popover);
    user-select: none;
  }

  ${scrollbarStyle('.emoji-menu')}

  .emoji-category-buttons {
    display: flex;
    justify-content: start;
    overflow-x: auto;
    margin-bottom: 8px;
    gap: 4px;
  }

  .emoji-category-button {
    cursor: pointer;
    background: var(--algogrind-button-background-color);
    border: 1px solid var(--algogrind-button-border-color);
    border-radius: 4px;
    padding: 2px 6px;
    font-size: 18px;
  }

  .emoji-category-button.active {
    background: var(--algogrind-primary-background-color);
    color: var(--algogrind-primary-color-contrast);
    border-color: var(--algogrind-primary-background-color);
  }

  .emoji-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .emoji-item {
    cursor: pointer;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    border-radius: 6px;
  }
  .emoji-item:hover {
    background: var(--algogrind-hover-color);
  }

  .emoji-item-selected {
    background: var(--algogrind-hover-color);
  }

  .emoji-filter-notice {
    font-size: var(--algogrind-text-caption-size);
    margin-bottom: 4px;
  }
`;
