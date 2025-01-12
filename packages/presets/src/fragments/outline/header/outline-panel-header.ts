import { createButtonPopper } from '@blocksuite/blocks';
import { WithDisposable } from '@blocksuite/global/utils';
import { css, html, LitElement } from 'lit';
import { property, query, state } from 'lit/decorators.js';

import { SortingIcon } from '../../_common/icons.js';

const styles = css`
  :host {
    display: flex;
    width: 100%;
    height: 40px;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 8px 16px;
  }

  .outline-panel-header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-right: 6px;
  }

  .note-setting-container {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .outline-panel-header-label {
    width: 119px;
    height: 22px;
    font-weight: 500;
    line-height: 22px;
    color: var(--algogrind-text-heading-6-color);
    font-family: var(--algogrind-text-heading-6-family);
    font-size: var(--algogrind-text-heading-6-size);
  }

  .note-sorting-button {
    justify-self: end;
  }

  .note-setting-button svg,
  .note-sorting-button svg {
    color: var(--algogrind-text-paragraph-color);
  }

  .note-setting-button:hover svg,
  .note-setting-button.active svg,
  .note-sorting-button:hover svg {
    color: var(--algogrind-text-paragraph-color);
  }

  .note-sorting-button.active svg {
    color: var(--algogrind-primary-color);
  }

  .note-preview-setting-container {
    display: none;
    justify-content: center;
    align-items: center;
    background: var(--algogrind-overlay-panel-background-color);
    box-shadow: var(--algogrind-shadow-small);
    border-radius: 8px;
  }

  .note-preview-setting-container[data-show] {
    display: flex;
  }
`;

export const AFFINE_OUTLINE_PANEL_HEADER = 'affine-outline-panel-header';

export class OutlinePanelHeader extends WithDisposable(LitElement) {
  static override styles = styles;

  private _notePreviewSettingMenuPopper: ReturnType<
    typeof createButtonPopper
  > | null = null;

  override firstUpdated() {
    const _disposables = this._disposables;

    this._notePreviewSettingMenuPopper = createButtonPopper(
      this._noteSettingButton,
      this._notePreviewSettingMenu,
      ({ display }) => {
        this._settingPopperShow = display === 'show';
      },
      {
        mainAxis: 14,
        crossAxis: -30,
      }
    );
    _disposables.add(this._notePreviewSettingMenuPopper);
  }

  override render() {
    return html`<div class="outline-panel-header-container">
        <div class="note-setting-container">
          <span class="outline-panel-header-label">Tartalomjegyzék</span>
          <!--
          <edgeless-tool-icon-button
            class="note-setting-button {this._settingPopperShow
            ? 'active'
            : ''}"
            .tooltip={this._settingPopperShow ? '' : 'Beállítások'}
            .tipPosition={'bottom'}
            .active={this._settingPopperShow}
            .activeMode={'background'}
            @click={() => this._notePreviewSettingMenuPopper?.toggle()}
          >
            {SettingsIcon}
          </edgeless-tool-icon-button>
          -->
        </div>
        <edgeless-tool-icon-button
          class="note-sorting-button ${this.enableNotesSorting ? 'active' : ''}"
          .tooltip=${'Láthatóság és rendezés'}
          .tipPosition=${'left'}
          .iconContainerPadding=${0}
          .active=${this.enableNotesSorting}
          .activeMode=${'color'}
          @click=${() => this.toggleNotesSorting()}
        >
          ${SortingIcon}
        </edgeless-tool-icon-button>
      </div>
      <div class="note-preview-setting-container">
        <affine-outline-note-preview-setting-menu
          .showPreviewIcon=${this.showPreviewIcon}
          .toggleShowPreviewIcon=${this.toggleShowPreviewIcon}
        ></affine-outline-note-preview-setting-menu>
      </div>`;
  }

  @query('.note-preview-setting-container')
  private accessor _notePreviewSettingMenu!: HTMLDivElement;

  @query('.note-setting-button')
  private accessor _noteSettingButton!: HTMLDivElement;

  @state()
  private accessor _settingPopperShow = false;

  @property({ attribute: false })
  accessor enableNotesSorting!: boolean;

  @property({ attribute: false })
  accessor showPreviewIcon!: boolean;

  @property({ attribute: false })
  accessor toggleNotesSorting!: () => void;

  @property({ attribute: false })
  accessor toggleShowPreviewIcon!: (on: boolean) => void;
}

declare global {
  interface HTMLElementTagNameMap {
    [AFFINE_OUTLINE_PANEL_HEADER]: OutlinePanelHeader;
  }
}
