import { PANEL_BASE } from '@blocksuite/affine-shared/styles';
import { css } from 'lit';

import { scrollbarStyle } from '../utils.js';

export const filterableListStyles = css`
  :host {
    ${PANEL_BASE};

    flex-direction: column;
    padding: 0;

    max-height: 100%;
    pointer-events: auto;
    overflow: hidden;
    z-index: var(--affine-z-index-popover);
  }

  .affine-filterable-list {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    width: 230px;
    padding: 8px;
    box-sizing: border-box;
    overflow: hidden;
  }

  .affine-filterable-list.flipped {
    flex-direction: column-reverse;
  }

  .items-container {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
    overflow-y: scroll;
    padding-block: 5px;
    padding-left: 2px;
    padding-right: 4px;
  }

  editor-toolbar-separator {
    margin: 8px 0;
  }

  .input-wrapper {
    display: flex;
    align-items: center;
    border-radius: 4px;
    padding: 4px 10px;
    gap: 4px;
    border-width: 1px;
    border-style: solid;
    border-color: var(--algogrind-border-color);
  }

  .input-wrapper:focus-within {
    border-color: var(--algogrind-primary-color);
    box-shadow: var(--algogrind-shadow-active);
  }

  ${scrollbarStyle('.items-container')}

  .filterable-item {
    display: flex;
    justify-content: space-between;
    gap: 4px;
    padding-block: 4px;
    padding-inline: 8px;
    height: unset;
  }

  .filterable-item > div[slot='suffix'] {
    display: flex;
    align-items: center;
  }

  .filterable-item svg {
    width: 20px;
    height: 20px;
  }

  .filterable-item.focused {
    color: var(--algogrind-primary-color);
    background: var(--algogrind-hover-color-filled);
  }

  #filter-input {
    flex: 1;
    align-items: center;
    height: 20px;
    width: 140px;
    border-radius: 8px;
    padding-top: 2px;
    border: transparent;
    background: transparent;
    color: inherit;
  }

  #filter-input:focus {
    outline: none;
  }

  #filter-input::placeholder {
    color: var(--algogrind-text-placeholder-color);
    font-size: var(--algogrind-text-small-size);
    font-family: var(--algogrind-text-small-family);
    font-weight: 500;
  }
`;
