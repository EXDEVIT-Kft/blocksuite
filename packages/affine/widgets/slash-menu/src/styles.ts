import { scrollbarStyle } from '@blocksuite/affine-shared/styles';
import { css } from 'lit';

export const styles = css`
  .overlay-mask {
    pointer-events: auto;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: var(--affine-z-index-popover);
  }

  .slash-menu {
    position: fixed;
    left: 0;
    top: 0;
    box-sizing: border-box;
    padding: 8px 4px 8px 8px;
    width: 280px;
    overflow-y: auto;
    font-family: var(--algogrind-text-paragraph-family);

    background: var(--algogrind-overlay-panel-background-color);
    box-shadow: var(--algogrind-ring), var(--algogrind-shadow-medium);
    border-radius: 8px;
    z-index: var(--affine-z-index-popover);
    user-select: none;
    /* transition: max-height 0.2s ease-in-out; */
  }

  .slash-menu > *:first-child {
    padding-top: 0 !important;
  }

  ${scrollbarStyle('.slash-menu')}

  .slash-menu-group-name {
    box-sizing: border-box;
    padding: 8px 8px 0;

    font-family: var(--algogrind-text-caption-family);
    font-size: var(--algogrind-text-caption-size);
    font-weight: 600;
    line-height: var(--algogrind-line-height);
    text-align: left;
    color: var(--algogrind-text-caption-color);
  }

  .slash-menu-item {
    padding: 2px 8px 2px 8px;
    justify-content: flex-start;
    gap: 10px;
  }

  .slash-menu-item-icon {
    box-sizing: border-box;
    width: 28px;
    height: 28px;
    padding: 4px;
    border-radius: 4px;
    color: var(--algogrind-text-paragraph-color);
    background: var(--algogrind-overlay-panel-background-color);
    box-shadow: var(--algogrind-ring);

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .slash-menu-item-icon svg {
    display: block;
    width: 100%;
    height: 100%;
  }

  .slash-menu-item.ask-ai {
    color: var(--algogrind-primary-color);
  }
  .slash-menu-item.github .github-icon {
    color: var(--affine-black);
  }
`;

export const slashItemToolTipStyle = css`
  .affine-tooltip {
    display: flex;
    padding: 4px 4px 2px 4px;
    flex-direction: column;
    align-items: flex-start;
    gap: 3px;
  }

  .tooltip-figure svg {
    display: block;
  }

  .tooltip-caption {
    padding-left: 4px;
    padding-bottom: 2px;
    color: var(--algogrind-text-caption-color);
    font-family: var(--algogrind-text-caption-family);
    font-size: var(--algogrind-text-caption-size);
    font-weight: 500;
  }
`;
