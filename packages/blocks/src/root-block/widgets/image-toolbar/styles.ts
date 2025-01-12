import { css } from 'lit';

export const styles = css`
  :host {
    position: absolute;
    top: 0;
    right: 0;
    z-index: var(--affine-z-index-popover);
  }

  .affine-image-toolbar-container {
    height: 24px;
    gap: 4px;
    padding: 4px;
    margin: 0;
  }

  .image-toolbar-button {
    color: var(--algogrind-text-paragraph-color);
    background-color: var(--algogrind-background-color);
    box-shadow: var(--algogrind-shadow-xsmall);
    border-radius: 4px;
  }
`;
