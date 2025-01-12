import { css } from 'lit';

import { scrollbarStyle } from '../../../_common/components/utils.js';

const paragraphButtonStyle = css`
  .paragraph-button-icon > svg:nth-child(2) {
    transition-duration: 0.3s;
  }
  .paragraph-button-icon:is(:hover, :focus-visible, :active)
    > svg:nth-child(2) {
    transform: rotate(180deg);
  }

  .highlight-icon > svg:nth-child(2) {
    transition-duration: 0.3s;
  }
  .highlight-icon:is(:hover, :focus-visible, :active) > svg:nth-child(2) {
    transform: rotate(180deg);
  }

  .highlight-panel {
    max-height: 380px;
  }

  .highligh-panel-heading {
    display: flex;
    padding: 8px 8px 0;
    font-family: var(--algogrind-text-caption-family);
    font-size: var(--algogrind-text-caption-size);
    font-weight: 600;
    line-height: var(--algogrind-line-height);
    text-align: left;
    color: var(--algogrind-text-caption-color);
  }

  editor-menu-content {
    display: none;
    position: absolute;
    padding: 0;
    z-index: var(--affine-z-index-popover);
    --packed-height: 6px;
  }

  editor-menu-content > div[data-orientation='vertical'] {
    padding: 8px;
    overflow-y: auto;
  }

  ${scrollbarStyle('editor-menu-content > div[data-orientation="vertical"]')}
`;

export const formatBarStyle = css`
  .affine-format-bar-widget {
    position: absolute;
    display: none;
    z-index: var(--affine-z-index-popover);
    user-select: none;
  }

  ${paragraphButtonStyle}
`;
