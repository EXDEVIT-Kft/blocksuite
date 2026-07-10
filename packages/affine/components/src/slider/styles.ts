import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    touch-action: none;
  }

  :host([disabled]) {
    opacity: 0.5;
    pointer-events: none;
  }

  .slider-container {
    --drag-handle-center-x: calc(
      (var(--item-size) - var(--drag-handle-size)) / 2 +
        (var(--cursor) / (var(--count) - 1)) *
        calc(var(--width) - var(--item-size))
    );

    width: var(--width);
    height: 24px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: relative;
    cursor: default;
  }

  .point-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--item-size);
    height: var(--item-size);
    z-index: 2;
  }

  .point-circle {
    width: var(--item-icon-size);
    height: var(--item-icon-size);
    background-color: var(--algogrind-border-color);
    border-radius: 50%;
  }

  .point-button[data-selected] .point-circle {
    background-color: var(--algogrind-text-paragraph-color);
  }

  .drag-handle {
    position: absolute;
    width: var(--drag-handle-size);
    height: var(--drag-handle-size);
    border-radius: 50%;
    background-color: var(--algogrind-text-paragraph-color);
    z-index: 3;
    left: var(--drag-handle-center-x);
  }

  .bottom-line,
  .slider-selected-overlay {
    position: absolute;
    height: 1px;
    left: calc(var(--item-size) / 2);
  }

  .bottom-line {
    width: calc(100% - var(--item-size));
    background-color: var(--algogrind-border-color);
  }

  .slider-selected-overlay {
    background-color: var(--algogrind-text-paragraph-color);
    z-index: 1;
    width: var(--drag-handle-center-x);
  }
`;
