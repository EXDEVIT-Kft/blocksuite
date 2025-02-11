import { css } from 'lit';

export const paragraphBlockStyles = css`
  affine-paragraph {
    box-sizing: border-box;
    display: block;
    font-size: var(--algogrind-text-paragraph-size);
    font-family: var(--algogrind-text-paragraph-family);
  }

  .affine-paragraph-block-container {
    position: relative;
    border-radius: 4px;
  }
  .affine-paragraph-rich-text-wrapper {
    position: relative;
  }

  .readonly .h1 .inline-editor.readonly,
  .readonly .h2 .inline-editor.readonly,
  .readonly .h3 .inline-editor.readonly,
  .readonly .h4 .inline-editor.readonly,
  .readonly .h5 .inline-editor.readonly,
  .readonly .h6 .inline-editor.readonly {
    cursor: pointer !important;
  }

  .readonly .h1 .toggle-icon,
  .readonly .h2 .toggle-icon,
  .readonly .h3 .toggle-icon,
  .readonly .h4 .toggle-icon,
  .readonly .h5 .toggle-icon,
  .readonly .h6 .toggle-icon {
    opacity: 1 !important;
  }

  affine-paragraph code {
    font-size: var(--algogrind-text-code-size);
    padding: 2px 6px;
  }

  .h1 {
    font-size: var(--algogrind-text-heading-1-size);
    font-family: var(--algogrind-text-heading-1-family);
    color: var(--algogrind-text-heading-1-color);
    font-weight: 700;
    line-height: 1.25;
    margin-top: 2.25rem;
    margin-bottom: 1rem;
  }

  .h1 code {
    font-size: calc(var(--algogrind-text-heading-1-size) - 4px);
    font-family: var(--algogrind-text-heading-1-family);
    padding: 2px 6px;
  }

  .h1 .toggle-icon {
    margin-top: 1.05rem;
  }

  .h2 {
    font-size: var(--algogrind-text-heading-2-size);
    font-family: var(--algogrind-text-heading-2-family);
    color: var(--algogrind-text-heading-2-color);
    font-weight: 600;
    line-height: 1.25;
    margin-top: 2.25rem;
    margin-bottom: 1rem;
  }

  .h2 code {
    font-size: calc(var(--algogrind-text-heading-2-size) - 4px);
    font-family: var(--algogrind-text-heading-2-family);
    padding: 2px 6px;
  }

  .h2 .toggle-icon {
    margin-top: 0.8rem;
  }

  .h3 {
    font-size: var(--algogrind-text-heading-3-size);
    font-family: var(--algogrind-text-heading-3-family);
    color: var(--algogrind-text-heading-3-color);
    font-weight: 600;
    line-height: 1.25;
    margin-top: 2.25rem;
    margin-bottom: 1rem;
  }

  .h3 code {
    font-size: calc(var(--algogrind-text-heading-3-size) - 4px);
    font-family: var(--algogrind-text-heading-3-family);
    padding: 2px 6px;
  }

  .h3 .toggle-icon {
    margin-top: 0.6rem;
  }

  .h4 {
    font-size: var(--algogrind-text-heading-4-size);
    font-family: var(--algogrind-text-heading-4-family);
    color: var(--algogrind-text-heading-4-color);
    font-weight: 600;
    line-height: 1.25;
    margin-top: 2.25rem;
    margin-bottom: 1rem;
  }
  .h4 code {
    font-size: calc(var(--algogrind-text-heading-4-size) - 2px);
    font-family: var(--algogrind-text-heading-4-family);
    padding: 2px 6px;
  }

  .h4 .toggle-icon {
    margin-top: 0.4rem;
  }

  .h5 {
    font-size: var(--algogrind-text-heading-5-size);
    font-family: var(--algogrind-text-heading-5-family);
    color: var(--algogrind-text-heading-5-color);
    font-weight: 600;
    line-height: 1.25;
    margin-top: 2.25rem;
    margin-bottom: 1rem;
  }
  .h5 code {
    font-size: calc(var(--algogrind-text-heading-5-size) - 2px);
    font-family: var(--algogrind-text-heading-5-family);
    padding: 2px 6px;
  }

  .h5 .toggle-icon {
    margin-top: 0.2rem;
  }

  .h6 {
    font-size: var(--algogrind-text-heading-6-size);
    font-family: var(--algogrind-text-heading-6-family);
    color: var(--algogrind-text-heading-6-color);
    font-weight: 600;
    line-height: 1.25;
    margin-top: 2.25rem;
    margin-bottom: 1rem;
  }

  .h6 code {
    font-size: calc(var(--algogrind-text-heading-6-size) - 2px);
    font-family: var(--algogrind-text-heading-6-family);
    padding: 2px 6px;
  }

  .h6 .toggle-icon {
    margin-top: 0.1rem;
  }

  .quote {
    line-height: 26px;
    padding-left: 17px;
    font-size: var(--algogrind-text-quote-size);
    font-family: var(--algogrind-text-quote-family);
    color: var(--algogrind-text-quote-color);
    margin-top: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    position: relative;
  }
  .quote::after {
    content: '';
    width: 4px;
    height: calc(100% - 20px);
    margin-top: 10px;
    margin-bottom: 10px;
    position: absolute;
    left: 0;
    top: 0;
    background: var(--algogrind-quote-line-color);
    border-radius: 18px;
  }

  .affine-paragraph-placeholder {
    position: absolute;
    display: none;
    left: 0;
    top: 0;
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
    inset: -2px -4px;
    border-radius: 8px;
    background-color: var(--algogrind-text-heading-collapsed-background-color);
    z-index: -1;
  }

  .h1.heading-collapsed,
  .h2.heading-collapsed,
  .h3.heading-collapsed,
  .h4.heading-collapsed,
  .h5.heading-collapsed,
  .h6.heading-collapsed {
    padding-left: 0.15em;
    padding-block: 0.15em;
  }

  .h1.heading-collapsed {
    font-size: calc(var(--algogrind-text-heading-1-size) - 0.5em);
  }

  .h1.heading-collapsed .toggle-icon {
    margin-top: 0.8rem;
  }

  .h2.heading-collapsed {
    font-size: calc(var(--algogrind-text-heading-2-size) - 0.5em);
  }

  .h2.heading-collapsed .toggle-icon {
    margin-top: 0.5rem;
  }

  .h3.heading-collapsed {
    font-size: calc(var(--algogrind-text-heading-3-size) - 0.375em);
  }

  .h3.heading-collapsed .toggle-icon {
    margin-top: 0.4rem;
  }

  .h4.heading-collapsed {
    font-size: calc(var(--algogrind-text-heading-4-size) - 0.25em);
  }

  .h4.heading-collapsed .toggle-icon {
    margin-top: 0.25rem;
  }

  .h5.heading-collapsed {
    font-size: calc(var(--algogrind-text-heading-5-size) - 0.125em);
  }

  .h5.heading-collapsed .toggle-icon {
    margin-top: 0.1rem;
  }

  .h6.heading-collapsed {
    font-size: calc(var(--algogrind-text-heading-6-size) - 0.1em);
  }

  .h6.heading-collapsed .toggle-icon {
    margin-top: 0;
  }

  @media screen and (max-width: 768px) {
    .h1 {
      font-size: calc(var(--algogrind-text-heading-1-size) * 0.705);
    }
    .h1 code {
      font-size: calc(var(--algogrind-text-heading-1-size) * 0.705 - 4px);
    }
    .h1.heading-collapsed {
      font-size: calc((var(--algogrind-text-heading-1-size) * 0.705) - 0.5em);
    }

    .h1 .toggle-icon {
      margin-top: 0.7rem;
    }
    .h1.heading-collapsed .toggle-icon {
      margin-top: 0.3rem;
    }

    .h2 {
      font-size: calc(var(--algogrind-text-heading-2-size) * 0.725);
    }
    .h2 code {
      font-size: calc(var(--algogrind-text-heading-2-size) * 0.725 - 4px);
    }
    .h2.heading-collapsed {
      font-size: calc((var(--algogrind-text-heading-2-size) * 0.725) - 0.5em);
    }

    .h2 .toggle-icon {
      margin-top: 0.5rem;
    }
    .h2.heading-collapsed .toggle-icon {
      margin-top: 0.15rem;
    }

    .h3 {
      font-size: calc(var(--algogrind-text-heading-3-size) * 0.725);
    }
    .h3 code {
      font-size: calc(var(--algogrind-text-heading-3-size) * 0.725 - 4px);
    }
    .h3.heading-collapsed {
      font-size: calc((var(--algogrind-text-heading-3-size) * 0.725) - 0.375em);
    }

    .h3 .toggle-icon {
      margin-top: 0.3rem;
    }
    .h3.heading-collapsed .toggle-icon {
      margin-top: 0.05rem;
    }

    .h4 {
      font-size: calc(var(--algogrind-text-heading-4-size) * 0.825);
    }
    .h4 code {
      font-size: calc(var(--algogrind-text-heading-4-size) * 0.825 - 2px);
    }
    .h4.heading-collapsed {
      font-size: calc((var(--algogrind-text-heading-4-size) * 0.825) - 0.25em);
    }

    .h4 .toggle-icon {
      margin-top: 0.25rem;
    }
    .h4.heading-collapsed .toggle-icon {
      margin-top: 0.05rem;
    }

    .h5 {
      font-size: calc(var(--algogrind-text-heading-5-size) * 0.94);
    }
    .h5 code {
      font-size: calc(var(--algogrind-text-heading-5-size) * 0.94 - 2px);
    }
    .h5.heading-collapsed {
      font-size: calc((var(--algogrind-text-heading-5-size) * 0.94) - 0.125em);
    }

    .h5 .toggle-icon {
      margin-top: 0.25rem;
    }
    .h5.heading-collapsed .toggle-icon {
      margin-top: 0.05rem;
    }

    .h6 {
      font-size: calc(var(--algogrind-text-heading-6-size) * 1);
    }
    .h6 code {
      font-size: calc(var(--algogrind-text-heading-6-size) * 1 - 2px);
    }
    .h6.heading-collapsed {
      font-size: calc((var(--algogrind-text-heading-6-size) * 1) - 0.1em);
    }

    .h6 .toggle-icon {
      margin-top: 0.25rem;
    }
    .h6.heading-collapsed .toggle-icon {
      margin-top: 0.05rem;
    }
  }
`;
