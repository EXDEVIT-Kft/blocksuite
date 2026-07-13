import { unsafeCSSVar, unsafeCSSVarV2 } from '@blocksuite/affine-shared/theme';
import { css } from 'lit';

export const latexBlockStyles = css`
  .latex-block-container {
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
    padding: 10px 24px;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    border-radius: 4px;
    overflow-x: auto;
    user-select: none;
  }

  .latex-block-container:hover {
    background: ${unsafeCSSVar('hoverColor')};
  }

  .latex-block-error-placeholder {
    color: ${unsafeCSSVarV2('text/highlight/fg/red')};
    /* [ALGOGRIND] */
    font-family: var(--algogrind-text-paragraph-family);
    font-size: 12px;
    font-weight: 500;
    line-height: normal;
    user-select: none;
  }

  .latex-block-empty-placeholder {
    color: ${unsafeCSSVarV2('text/secondary')};
    /* [ALGOGRIND] */
    font-family: var(--algogrind-text-paragraph-family);
    font-size: 12px;
    font-weight: 500;
    line-height: normal;
    user-select: none;
  }
`;
