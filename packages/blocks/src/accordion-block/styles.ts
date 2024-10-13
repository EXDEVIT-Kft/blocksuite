import { css } from 'lit';

export const accordionBlockStyles = css`
  :host {
    position: relative;
  }

  .algogrind-accordion-block-head > svg {
    cursor: pointer;
    transition: transform 0.15s ease-in-out;
    flex-shrink: 0;
  }

  .algogrind-accordion-block-head {
    display: flex;
    gap: 0.75rem;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1.375rem;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    transition: border 0.15s ease-in-out;
    background-color: lightgray;
  }

  .algogrind-accordion-block-head > div,
  .accordion-title {
    font-size: 1rem;
    font-weight: bold;
    font-family: inherit;
    height: auto;
    white-space-collapse: preserve;
    line-height: normal;
  }

  .algogrind-accordion-block-head > div {
    width: calc(100% - 24px);
  }

  .accordion-title {
    display: inline-table;
    position: absolute;
    top: 0.75rem;
    left: 1.375rem;
    bottom: 0.75rem;
    right: 2.875rem;
    resize: none;
    outline: none;
    padding: 0;
    border: 0;
    border-top: 1px solid transparent;
    background: transparent;
    height: 1.5rem;
  }
  .accordion-title::placeholder {
    color: var(--affine-placeholder-color);
  }

  .algogrind-accordion-block-body {
    display: grid;
    grid-template-rows: 0fr;
    padding: 0.25rem 1.375rem;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    border: 1px solid transparent;
    transition:
      grid-template-rows 0.15s ease-in-out,
      border 0.15s ease-in-out;
  }

  .algogrind-accordion-block-body > div {
    overflow-y: hidden;
  }

  .algogrind-accordion-block-container.open .algogrind-accordion-block-body {
    grid-template-rows: 1fr;
    border-left: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
    border-right: 1px solid lightgray;
  }

  .algogrind-accordion-block-container.open
    .algogrind-accordion-block-head
    > svg {
    transform: rotate(180deg);
  }

  .algogrind-accordion-block-container.open .algogrind-accordion-block-head {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;
