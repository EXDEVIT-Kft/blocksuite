import { css } from 'lit';

export const accordionBlockStyles = css`
  algogrind-accordion {
    position: relative;
  }

  .algogrind-accordion-block-container {
    overflow-x: hidden;
  }

  .algogrind-accordion-block-head > svg {
    cursor: pointer;
    transition: transform 0.15s ease-in-out;
    flex-shrink: 0;
  }

  .h1-accordion.algogrind-accordion-block-head {
    font-size: var(--affine-font-h-1);
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: calc(1em + 8px);

    padding-top: 18px;
    padding-bottom: 10px;
  }

  .h1-accordion.algogrind-accordion-block-head code {
    font-size: calc(var(--affine-font-base) + 10px);
    padding: 0px 4px;
  }

  .h2-accordion.algogrind-accordion-block-head {
    font-size: var(--affine-font-h-2);
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: calc(1em + 10px);

    padding-top: 14px;
    padding-bottom: 10px;
  }

  .h2-accordion.algogrind-accordion-block-head code {
    font-size: calc(var(--affine-font-base) + 8px);
    padding: 0px 4px;
  }

  .h3-accordion.algogrind-accordion-block-head {
    font-size: var(--affine-font-h-3);
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: calc(1em + 8px);

    padding-top: 12px;
    padding-bottom: 10px;
  }

  .h3-accordion.algogrind-accordion-block-head code {
    font-size: calc(var(--affine-font-base) + 6px);
    padding: 0px 4px;
  }

  .h4-accordion.algogrind-accordion-block-head {
    font-size: var(--affine-font-h-4);
    font-weight: 600;
    letter-spacing: -0.015em;
    line-height: calc(1em + 8px);

    padding-top: 12px;
    padding-bottom: 10px;
  }

  .h4-accordion.algogrind-accordion-block-head code {
    font-size: calc(var(--affine-font-base) + 4px);
    padding: 0px 4px;
  }

  .h5-accordion.algogrind-accordion-block-head {
    font-size: var(--affine-font-h-5);
    font-weight: 600;
    letter-spacing: -0.015em;
    line-height: calc(1em + 8px);

    padding-top: 12px;
    padding-bottom: 10px;
  }

  .h5-accordion.algogrind-accordion-block-head code {
    font-size: calc(var(--affine-font-base) + 2px);
    padding: 0px 4px;
  }

  .h6-accordion.algogrind-accordion-block-head {
    font-size: var(--affine-font-h-6);
    font-weight: 600;
    letter-spacing: -0.015em;
    line-height: calc(1em + 8px);

    padding-top: 12px;
    padding-bottom: 10px;
  }

  .h6-accordion.algogrind-accordion-block-head code {
    font-size: var(--affine-font-base);
    padding: 0px 4px 2px;
  }

  .algogrind-accordion-block-head {
    display: flex;
    gap: 0.75rem;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid red;
  }

  .algogrind-accordion-block-body {
    display: grid;
    grid-template-rows: 0fr;
    border-bottom: 1px solid green;
    transition: grid-template-rows 0.15s ease-in-out;
  }

  .algogrind-accordion-block-body > div {
    overflow-y: hidden;
  }

  .algogrind-accordion-block-container.open > .algogrind-accordion-block-body {
    grid-template-rows: 1fr;
  }

  .algogrind-accordion-block-container.open
    > .algogrind-accordion-block-head
    > svg {
    transform: rotate(180deg);
  }

  .accordion-placeholder {
    position: absolute;
    display: none;
    left: 0;
    top: 0;
    pointer-events: none;
    color: var(--affine-black-30);
    fill: var(--affine-black-30);
  }

  .h1-accordion .accordion-placeholder {
    top: 18px;
  }

  .h2-accordion .accordion-placeholder {
    top: 14px;
  }

  .h3-accordion .accordion-placeholder {
    top: 12px;
  }

  .h4-accordion .accordion-placeholder {
    top: 12px;
  }

  .h5-accordion .accordion-placeholder {
    top: 12px;
  }

  .h6-accordion .accordion-placeholder {
    top: 12px;
  }

  @media print {
    .accordion-placeholder {
      display: none !important;
    }
  }
  .accordion-placeholder.visible {
    display: block;
  }
  @media print {
    .accordion-placeholder.visible {
      display: none;
    }
  }
`;
