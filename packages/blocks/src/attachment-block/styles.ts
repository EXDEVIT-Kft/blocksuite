import { css } from 'lit';

import { EMBED_CARD_HEIGHT, EMBED_CARD_WIDTH } from '../_common/consts.js';

export const styles = css`
  .affine-attachment-card {
    margin: 0 auto;
    box-sizing: border-box;
    display: flex;
    gap: 12px;

    width: 100%;
    height: ${EMBED_CARD_HEIGHT.horizontalThin}px;

    padding: 12px;
    border-radius: 8px;
    border: 1px solid var(--algogrind-border-color);

    opacity: var(--add, 1);
    background: var(--algogrind-background-color);
    user-select: none;
  }

  .affine-attachment-container-readonly {
    cursor: pointer;
  }

  .affine-attachment-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    flex: 1 0 0;

    border-radius: var(--1, 0px);
    opacity: var(--add, 1);
  }

  .affine-attachment-content-title {
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;

    align-self: stretch;
    padding: var(--1, 0px);
    border-radius: var(--1, 0px);
    opacity: var(--add, 1);
  }

  .affine-attachment-content-title-icon {
    display: flex;
    width: 16px;
    height: 16px;
    align-items: center;
    justify-content: center;
  }

  .affine-attachment-content-title-icon svg {
    width: 16px;
    height: 16px;
    fill: var(--algogrind-text-heading-6-color);
  }

  .affine-attachment-content-title-text {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;

    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--algogrind-text-heading-6-color);

    font-family: var(--algogrind-text-paragraph-family);
    font-size: var(--algogrind-text-paragraph-size);
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
  }

  .affine-attachment-content-info {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    flex: 1 0 0;

    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--algogrind-text-caption-color);

    font-family: var(--algogrind-text-caption-family);
    font-size: var(--algogrind-text-caption-size);
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
  }

  .affine-attachment-banner {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .affine-attachment-banner svg {
    width: 40px;
    height: 40px;
  }

  .affine-attachment-card.loading {
    background: var(--algogrind-background-secondary-color);

    .affine-attachment-content-title-text {
      color: var(--algogrind-text-placeholder-color);
    }
  }

  .affine-attachment-card.error,
  .affine-attachment-card.unsynced {
    background: var(--algogrind-background-secondary-color);
  }

  .affine-attachment-card.cubeThick {
    width: ${EMBED_CARD_WIDTH.cubeThick}px;
    height: ${EMBED_CARD_HEIGHT.cubeThick}px;

    flex-direction: column-reverse;

    .affine-attachment-content {
      width: 100%;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
    }

    .affine-attachment-banner {
      justify-content: flex-start;
    }
  }

  .affine-attachment-embed-container {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .affine-attachment-iframe-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .affine-attachment-iframe-overlay.hide {
    display: none;
  }
`;
