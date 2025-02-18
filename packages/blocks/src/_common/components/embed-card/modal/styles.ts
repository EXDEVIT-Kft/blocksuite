import { PANEL_BASE } from '@algogrind/affine-shared/styles';
import { css } from 'lit';

export const embedCardModalStyles = css`
  .embed-card-modal-mask {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    z-index: 1;
  }

  .embed-card-modal-wrapper {
    ${PANEL_BASE};
    width: min(50ch, calc(100% - 2rem));
    flex-direction: column;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    z-index: 2;
    height: max-content;
    padding: 16px;
    gap: 12px;
    border-radius: 8px;
    font-size: var(--algogrind-text-paragraph-size);
    color: var(--algogrind-text-paragraph-color);
    font-family: var(--algogrind-text-paragraph-family);
    line-height: var(--algogrind-line-height);
  }

  .embed-card-modal-row {
    display: flex;
    flex-direction: column;
    align-self: stretch;
  }

  .embed-card-modal-row label {
    padding: 0px 2px;
    color: var(--algogrind-text-paragraph-color);
    font-weight: 600;
  }
  .embed-card-modal-input {
    display: flex;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 4px;
    border: 1px solid var(--algogrind-border-color);
    background: var(--algogrind-overlay-panel-background-color);
    color: var(--algogrind-text-placeholder-color);
    font-size: var(--algogrind-text-small-size);
    font-family: var(--algogrind-text-small-family);
    font-weight: 500;
  }

  .embed-card-modal-input:not(:placeholder-shown) {
    color: var(--algogrind-text-small-color);
  }

  input.embed-card-modal-input {
    padding-top: 4px;
    padding-bottom: 4px;
  }
  textarea.embed-card-modal-input {
    padding-top: 6px;
    padding-bottom: 6px;
    min-width: 100%;
    max-width: 100%;
  }
  .embed-card-modal-input:focus {
    border-color: var(--algogrind-primary-color);
    box-shadow: var(--algogrind-shadow-active);
    outline: none;
  }
  .embed-card-modal-input::placeholder {
    color: var(--algogrind-text-placeholder-color);
  }

  .embed-card-modal-row:has(.embed-card-modal-button) {
    flex-direction: row;
    gap: 4px;
    justify-content: flex-end;
  }
  .embed-card-modal-row:has(.embed-card-modal-button.reset) {
    justify-content: space-between;
  }

  .embed-card-modal-button {
    padding: 6px 18px;
    border-radius: 4px;
    box-sizing: border-box;
    font-family: var(--algogrind-text-small-family);
    font-weight: 500;
  }
  .embed-card-modal-button.save {
    background: var(--algogrind-primary-color);
    color: var(--algogrind-primary-background-text-color);
    border: 1px solid transparent;
  }
  .embed-card-modal-button[disabled] {
    pointer-events: none;
    cursor: not-allowed;
    color: var(--algogrind-text-disabled-color);
    background: transparent;
    border: 1px solid var(--algogrind-border-color);
  }
  .embed-card-modal-button.reset {
    padding: 4px 0;
    border: none;
    background: transparent;
    text-decoration: underline;
    color: var(--algogrind-text-paragraph-color);
    user-select: none;
  }

  .embed-card-modal-title {
    font-size: var(--algogrind-text-heading-5-size);
    font-family: var(--algogrind-text-heading-5-family);
    color: var(--algogrind-text-heading-5-color);
    line-height: var(--algogrind-line-height);
    user-select: none;
  }
  .embed-card-modal-description {
    font-weight: 500;
    line-height: var(--algogrind-line-height);
    user-select: none;
  }
`;
