import { css } from 'lit';

import { scrollbarStyle } from '../../../_common/components/utils.js';

export const styles = css`
  .emoji-menu {
    position: fixed;
    left: 0;
    top: 0;
    box-sizing: border-box;
    width: 320px;
    background: var(--algogrind-overlay-panel-background-color);
    box-shadow: var(--algogrind-ring), var(--algogrind-shadow-medium);
    border-radius: 8px;
    z-index: var(--affine-z-index-popover);
    user-select: none;
    display: flex;
    flex-direction: column;
    overflow: visible;
  }

  .emoji-menu-content {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 12px;
    max-height: calc(350px - 40px);
  }

  ${scrollbarStyle('.emoji-menu-content')}

  .emoji-category {
    margin-bottom: 16px;
  }

  .category-name {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    margin-bottom: 8px;
    font-family: var(--algogrind-text-caption-family);
    font-size: var(--algogrind-text-caption-size);
    font-weight: 600;
    color: var(--algogrind-text-caption-color);
    border-radius: 4px;
  }

  .emoji-grid {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 4px;
    padding: 0 4px;
    min-width: 0; /* Prevent grid from causing horizontal scroll */
  }

  .emoji-item {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 4px;
    font-size: 20px;
    position: relative;
    transition: all 0.2s ease;
  }

  .emoji-item:hover,
  .emoji-item.selected {
    background: var(--affine-hover-color);
    transform: scale(1.05);
  }

  .category-nav {
    display: flex;
    justify-content: space-around;
    padding: 8px;
    border-top: 1px solid var(--algogrind-divider-color);
    background: var(--algogrind-background-color);
    border-radius: 0 0 8px 8px;
  }

  .nav-item {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 4px;
    font-size: 16px;
  }

  .nav-item:hover,
  .nav-item.active {
    background: var(--algogrind-hover-background-color);
  }

  .search-container {
    padding: 8px;
    border-bottom: 1px solid var(--affine-border-color);
  }

  .search-input {
    width: 100%;
    padding: 8px;
    border: 1px solid var(--affine-border-color);
    border-radius: 4px;
    background: var(--affine-background-primary-color);
    color: var(--affine-text-primary-color);
    font-size: 14px;
  }

  .search-input:focus {
    outline: none;
    border-color: var(--affine-primary-color);
  }

  .overlay-mask {
    pointer-events: auto;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: var(--affine-z-index-popover);
  }
`;
