import { css } from 'lit';

export const listPrefix = css`
  .affine-list-block__prefix {
    display: flex;
    color: currentColor;
    font-size: var(--affine-font-sm);
    user-select: none;
    position: relative;
    top: -1px;
    left: -2px;
  }

  .affine-list-block__numbered {
    min-width: 22px;
    height: 24px;
    margin-left: 2px;
  }

  .affine-list-block__todo-prefix {
    display: flex;
    align-items: center;
    cursor: pointer;
    width: 24px;
    height: 24px;
    color: var(--algogrind-text-paragraph-color);
  }

  .affine-list-block__todo-prefix.readonly {
    cursor: default;
  }

  .affine-list-block__todo-prefix > svg {
    width: 24px;
    height: 24px;
  }
`;

export const listBlockStyles = css`
  affine-list {
    display: block;
    font-size: var(--algogrind-text-paragraph-size);
  }

  .affine-list-block-container {
    box-sizing: border-box;
    border-radius: 4px;
    position: relative;
  }
  .affine-list-block-container .affine-list-block-container {
    margin-top: 0;
  }
  .affine-list-rich-text-wrapper {
    position: relative;
    display: flex;
  }
  .affine-list-rich-text-wrapper rich-text {
    flex: 1;
  }

  .affine-list--checked {
    color: var(--algogrind-text-disabled-color);
  }

  .affine-list--checked span[data-v-text='true'] {
    text-decoration: line-through;
  }

  ${listPrefix}
`;
