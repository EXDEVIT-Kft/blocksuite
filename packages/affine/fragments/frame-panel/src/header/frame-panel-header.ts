import {
  type NavigatorMode,
  PresentTool,
} from '@blocksuite/affine-block-frame';
import { EdgelessLegacySlotIdentifier } from '@blocksuite/affine-block-surface';
import {
  DocModeProvider,
  EditPropsStore,
} from '@blocksuite/affine-shared/services';
import { createButtonPopper } from '@blocksuite/affine-shared/utils';
import { DisposableGroup } from '@blocksuite/global/disposable';
import { WithDisposable } from '@blocksuite/global/lit';
import { PresentationIcon, SettingsIcon } from '@blocksuite/icons/lit';
import type { EditorHost } from '@blocksuite/std';
import { GfxControllerIdentifier } from '@blocksuite/std/gfx';
import { css, html, LitElement, type PropertyValues } from 'lit';
import { property, query, state } from 'lit/decorators.js';

const styles = css`
  :host {
    display: flex;
    width: 100%;
    justify-content: start;
  }

  .frame-panel-header {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 8px;
  }

  .all-frames-setting {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100px;
    height: 24px;
    margin: 8px 4px;
  }

  .all-frames-setting-button svg {
    color: var(--affine-icon-secondary);
  }

  .all-frames-setting-button:hover svg,
  .all-frames-setting-button.active svg {
    color: var(--algogrind-text-paragraph-color);
  }

  .all-frames-setting-label {
    width: 68px;
    height: 22px;
    font-weight: 500;
    line-height: 22px;
    color: var(--algogrind-text-heading-6-color);
    font-family: var(--algogrind-text-heading-6-family);
    font-size: var(--algogrind-text-heading-6-size);
  }

  .frames-setting-container {
    display: none;
    justify-content: center;
    align-items: center;
    background: var(--algogrind-overlay-panel-background-color);
    box-shadow: var(--algogrind-shadow-medium);
    border-radius: 8px;
  }

  .frames-setting-container[data-show] {
    display: flex;
  }

  .presentation-button {
    display: flex;
    align-items: center;
    gap: 4px;
    box-sizing: border-box;
    justify-content: center;
    padding: 2px 8px;
    border-radius: 4px;
    margin-bottom: 8px;
    border: 1px solid var(--algogrind-border-color);
    background: var(--algogrind-overlay-panel-background-color);
    transition: 0.1s ease-in background-color;
    font-family: var(--algogrind-text-small-family);
    font-size: var(--algogrind-text-small-size);
    color: var(--algogrind-text-small-color);
  }

  .presentation-button:hover {
    background: var(--algogrind-hover-color);
    cursor: pointer;
  }

  .presentation-button svg {
    margin-right: 4px;
  }

  .presentation-button-label {
    font-size: var(--algogrind-text-small-size);
    font-weight: 500;
    line-height: 20px;
  }
`;

export const AFFINE_FRAME_PANEL_HEADER = 'affine-frame-panel-header';

export class FramePanelHeader extends WithDisposable(LitElement) {
  static override styles = styles;

  private readonly _clearEdgelessDisposables = () => {
    this._edgelessDisposables?.dispose();
    this._edgelessDisposables = null;
  };

  private _edgelessDisposables: DisposableGroup | null = null;

  private get _gfx() {
    return this.editorHost.std.get(GfxControllerIdentifier);
  }

  private readonly _enterPresentationMode = () => {
    const docModeProvider = this.editorHost.std.get(DocModeProvider);
    if (docModeProvider.getEditorMode() !== 'edgeless') {
      this.editorHost.std.get(DocModeProvider).setEditorMode('edgeless');
    }

    setTimeout(() => {
      this._gfx.tool.setTool(PresentTool, {
        mode: this._navigatorMode,
      });
    }, 100);
  };

  private _framesSettingMenuPopper: ReturnType<
    typeof createButtonPopper
  > | null = null;

  private _navigatorMode: NavigatorMode = 'fit';

  private readonly _setEdgelessDisposables = () => {
    const slots = this.editorHost.std.get(EdgelessLegacySlotIdentifier);

    this._clearEdgelessDisposables();
    this._edgelessDisposables = new DisposableGroup();
    this._edgelessDisposables.add(
      slots.navigatorSettingUpdated.subscribe(({ fillScreen }) => {
        this._navigatorMode = fillScreen ? 'fill' : 'fit';
      })
    );
  };

  private _tryLoadNavigatorStateLocalRecord() {
    this._navigatorMode = this.editorHost.std
      .get(EditPropsStore)
      .getStorage('presentFillScreen')
      ? 'fill'
      : 'fit';
  }

  override connectedCallback() {
    super.connectedCallback();
    this._tryLoadNavigatorStateLocalRecord();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    if (this._edgelessDisposables) {
      this._clearEdgelessDisposables();
    }
  }

  override firstUpdated() {
    const disposables = this.disposables;

    this._framesSettingMenuPopper = createButtonPopper({
      reference: this._frameSettingButton,
      popperElement: this._frameSettingMenu,
      stateUpdated: ({ display }) => {
        this._settingPopperShow = display === 'show';
      },
      mainAxis: 14,
      crossAxis: -100,
    });
    disposables.add(this._framesSettingMenuPopper);
  }

  override render() {
    return html`<div class="frame-panel-header">
      <div class="all-frames-setting">
        <span class="all-frames-setting-label">Keretek</span>
        <edgeless-tool-icon-button
          class="all-frames-setting-button ${this._settingPopperShow
            ? 'active'
            : ''}"
          .tooltip=${this._settingPopperShow ? '' : 'Prezentáció beállításai'}
          .tipPosition=${'top'}
          .active=${this._settingPopperShow}
          .activeMode=${'background'}
          @click=${() => this._framesSettingMenuPopper?.toggle()}
        >
          ${SettingsIcon({ width: '20px', height: '20px' })}
        </edgeless-tool-icon-button>
      </div>
      <div class="frames-setting-container">
        <affine-frames-setting-menu
          .editorHost=${this.editorHost}
        ></affine-frames-setting-menu>
      </div>
      <div class="presentation-button" @click=${this._enterPresentationMode}>
        ${PresentationIcon({ width: '16px', height: '16px' })}<span
          class="presentation-button-label"
          >Prezentálás</span
        >
      </div>
    </div>`;
  }

  override updated(_changedProperties: PropertyValues) {
    if (_changedProperties.has('editorHost')) {
      const docModeProvider = this.editorHost.std.get(DocModeProvider);
      if (docModeProvider.getEditorMode() === 'edgeless') {
        this._setEdgelessDisposables();
      } else {
        this._clearEdgelessDisposables();
      }
    }
  }

  @query('.all-frames-setting-button')
  private accessor _frameSettingButton!: HTMLDivElement;

  @query('.frames-setting-container')
  private accessor _frameSettingMenu!: HTMLDivElement;

  @state()
  private accessor _settingPopperShow = false;

  @property({ attribute: false })
  accessor editorHost!: EditorHost;
}

declare global {
  interface HTMLElementTagNameMap {
    [AFFINE_FRAME_PANEL_HEADER]: FramePanelHeader;
  }
}
