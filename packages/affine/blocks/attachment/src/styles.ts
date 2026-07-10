import { unsafeCSSVarV2 } from '@blocksuite/affine-shared/theme';
import { css } from 'lit';

export const styles = css`
  .affine-attachment-container {
    border-radius: 8px;
    box-sizing: border-box;
    user-select: none;
    overflow: hidden;
    border: 1px solid var(--algogrind-border-color);
    background: var(--algogrind-background-color);

    &.focused {
      border-color: ${unsafeCSSVarV2('layer/insideBorder/primaryBorder')};
    }
  }

  .affine-attachment-container-readonly {
    cursor: pointer;
  }

  .affine-attachment-container.comment-highlighted {
    outline: 2px solid ${unsafeCSSVarV2('block/comment/highlightUnderline')};
  }

  .affine-attachment-card {
    display: flex;
    gap: 12px;
    padding: 12px;
  }

  .affine-attachment-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    flex: 1 0 0;
    min-width: 0;
  }

  .truncate {
    align-self: stretch;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .affine-attachment-content-title {
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    align-self: stretch;
  }

  .affine-attachment-content-title-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--algogrind-text-heading-6-color);
    font-size: 16px;
  }

  .affine-attachment-content-title-text {
    color: var(--algogrind-text-heading-6-color);
    font-family: var(--algogrind-text-paragraph-family);
    font-size: var(--algogrind-text-paragraph-size);
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
  }

  .affine-attachment-content-description {
    display: flex;
    align-items: center;
    align-self: stretch;
    gap: 8px;
  }

  .affine-attachment-content-info {
    color: var(--algogrind-text-caption-color);
    font-family: var(--algogrind-text-caption-family);
    font-size: var(--algogrind-text-caption-size);
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
  }

  .affine-attachment-content-button {
    display: flex;
    height: 20px;
    align-items: center;
    align-self: stretch;
    gap: 4px;
    white-space: nowrap;
    padding: 0 4px;
    color: ${unsafeCSSVarV2('button/primary')};
    font-family: var(--affine-font-family);
    font-size: var(--affine-font-xs);
    font-style: normal;
    font-weight: 500;
    text-transform: capitalize;
    line-height: 20px;

    svg {
      font-size: 16px;
    }
  }

  .affine-attachment-banner {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .affine-attachment-card.loading {
    .affine-attachment-content-title-text {
      color: var(--algogrind-text-placeholder-color);
    }
  }

  .affine-attachment-card.error {
    .affine-attachment-content-title-icon {
      color: ${unsafeCSSVarV2('status/error')};
    }
  }

  .affine-attachment-card.loading,
  .affine-attachment-card.error {
    background: var(--algogrind-background-secondary-color);
  }

  .affine-attachment-card.cubeThick {
    flex-direction: column-reverse;

    .affine-attachment-content {
      width: 100%;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
    }

    .affine-attachment-banner {
      justify-content: space-between;
    }
  }

  .affine-attachment-embed-container {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .affine-attachment-embed-status {
    position: absolute;
    left: 14px;
    bottom: 64px;
  }

  .affine-attachment-embed-event-mask {
    position: absolute;
    inset: 0;
  }

  /* [ALGOGRIND] once the block is selected, let the user interact with the
     embedded content (scroll PDFs, play media) */
  .affine-attachment-embed-container.selected .affine-attachment-embed-event-mask {
    display: none;
  }
`;
