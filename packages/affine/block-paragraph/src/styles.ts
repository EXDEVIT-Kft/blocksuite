import { css } from 'lit';

export const paragraphBlockStyles = css`
  affine-paragraph {
    box-sizing: border-box;
    display: block;
    font-size: var(--algogrind-text-paragraph-size);
  }

  .affine-paragraph-block-container {
    position: relative;
    border-radius: 4px;
  }
  .affine-paragraph-rich-text-wrapper {
    position: relative;
  }

  affine-paragraph code {
    font-size: calc(var(--affine-font-base) - 3px);
    padding: 0px 4px 2px;
  }

  .h1 {
    font-size: var(--algogrind-text-heading-1-size);
    font-family: var(--algogrind-text-heading-1-family);
    color: var(----algogrind-text-heading-1-color);
    font-weight: 700;
    line-height: calc(1em + 8px);
    margin-top: 2.25rem;
    margin-bottom: 1rem;
  }

  .h1 code {
    font-size: calc(var(--affine-font-base) + 10px);
    padding: 0px 4px;
  }

  .h2 {
    font-size: var(--algogrind-text-heading-2-size);
    font-family: var(--algogrind-text-heading-2-family);
    color: var(----algogrind-text-heading-2-color);
    font-weight: 600;
    line-height: calc(1em + 10px);
    margin-top: 2.25rem;
    margin-bottom: 1rem;
  }

  .h2 code {
    font-size: calc(var(--affine-font-base) + 8px);
    padding: 0px 4px;
  }

  .h3 {
    font-size: var(--algogrind-text-heading-3-size);
    font-family: var(--algogrind-text-heading-3-family);
    color: var(----algogrind-text-heading-3-color);
    font-weight: 600;
    line-height: calc(1em + 8px);
    margin-top: 2.25rem;
    margin-bottom: 1rem;
  }

  .h3 code {
    font-size: calc(var(--affine-font-base) + 6px);
    padding: 0px 4px;
  }

  .h4 {
    font-size: var(--algogrind-text-heading-4-size);
    font-family: var(--algogrind-text-heading-4-family);
    color: var(----algogrind-text-heading-4-color);
    font-weight: 600;
    line-height: calc(1em + 8px);
    margin-top: 2.25rem;
    margin-bottom: 1rem;
  }
  .h4 code {
    font-size: calc(var(--affine-font-base) + 4px);
    padding: 0px 4px;
  }

  .h5 {
    font-size: var(--algogrind-text-heading-5-size);
    font-family: var(--algogrind-text-heading-5-family);
    color: var(----algogrind-text-heading-5-color);
    font-weight: 600;
    line-height: calc(1em + 8px);
    margin-top: 2.25rem;
    margin-bottom: 1rem;
  }
  .h5 code {
    font-size: calc(var(--affine-font-base) + 2px);
    padding: 0px 4px;
  }

  .h6 {
    font-size: var(--algogrind-text-heading-6-size);
    font-family: var(--algogrind-text-heading-6-family);
    color: var(----algogrind-text-heading-6-color);
    font-weight: 600;
    line-height: calc(1em + 8px);
    margin-top: 2.25rem;
    margin-bottom: 1rem;
  }

  .h6 code {
    font-size: var(--affine-font-base);
    padding: 0px 4px 2px;
  }

  .quote {
    line-height: 26px;
    padding-left: 17px;
    margin-top: var(--affine-paragraph-space);
    padding-top: 10px;
    padding-bottom: 10px;
    position: relative;
  }
  .quote::after {
    content: '';
    width: 2px;
    height: calc(100% - 20px);
    margin-top: 10px;
    margin-bottom: 10px;
    position: absolute;
    left: 0;
    top: 0;
    background: var(--affine-quote-color);
    border-radius: 18px;
  }

  .affine-paragraph-placeholder {
    position: absolute;
    display: none;
    left: 0;
    bottom: 0;
    pointer-events: none;
    color: var(--algogrind-text-placeholder-color);
    fill: var(--algogrind-text-placeholder-color);
  }
  @media print {
    .affine-paragraph-placeholder {
      display: none !important;
    }
  }
  .affine-paragraph-placeholder.visible {
    display: block;
  }
  @media print {
    .affine-paragraph-placeholder.visible {
      display: none;
    }
  }
  /* [ALGOGRIND] added special collapsed heading styles */
  .heading-collapsed::after {
    content: '';
    position: absolute;
    height: 2px;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: repeating-linear-gradient(
      to right,
      var(--algogrind-divider-color) 0,
      var(--algogrind-divider-color) 5px,
      transparent 5px,
      transparent 10px
    );
  }
`;
