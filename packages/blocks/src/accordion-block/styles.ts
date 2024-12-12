import { css } from 'lit';

export const accordionBlockStyles = css`
  algogrind-accordion {
    position: relative;
  }

  .algogrind-accordion-block-container {
    overflow-x: hidden;
  }

  .h1-accordion.algogrind-accordion-block-container {
    margin-top: 18px;
  }

  .h2-accordion.algogrind-accordion-block-container {
    margin-top: 14px;
  }

  .h3-accordion.algogrind-accordion-block-container {
    margin-top: 12px;
  }

  .h4-accordion.algogrind-accordion-block-container {
    margin-top: 12px;
  }

  .h5-accordion.algogrind-accordion-block-container {
    margin-top: 12px;
  }

  .h6-accordion.algogrind-accordion-block-container {
    margin-top: 12px;
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

    padding-bottom: 10px;
  }

  .h6-accordion.algogrind-accordion-block-head code {
    font-size: var(--affine-font-base);
    padding: 0px 4px 2px;
  }

  .algogrind-accordion-block-head {
    position: relative;
    display: flex;
    gap: 0.75rem;
    align-items: center;
    justify-content: space-between;
  }

   {
    display: grid;
    grid-template-rows: 0fr;
    border-bottom: 1px dashed var(--affine-divider-color);
    transition: grid-template-rows 0.15s ease-in-out;
  }

      .algogrind-accordion-block-body::after,
  .algogrind-accordion-block-head::after {
    content: '';
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-image: repeating-linear-gradient(
      to right,
      var(--affine-divider-color) 0,
      var(--affine-divider-color) 5px,
      transparent 5px,
      transparent 10px
    );
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
