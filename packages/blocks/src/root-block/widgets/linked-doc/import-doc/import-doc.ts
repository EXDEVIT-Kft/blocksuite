import type { DocCollection } from '@algogrind/store';

import {
  CloseIcon,
  ExportToHTMLIcon,
  ExportToMarkdownIcon,
  NewIcon,
  NotionIcon,
} from '@algogrind/affine-components/icons';
import { WithDisposable } from '@algogrind/global/utils';
import { html, LitElement, type PropertyValues } from 'lit';
import { query, state } from 'lit/decorators.js';

import { HtmlTransformer } from '../../../../_common/transformers/html.js';
import { MarkdownTransformer } from '../../../../_common/transformers/markdown.js';
import { NotionHtmlTransformer } from '../../../../_common/transformers/notion-html.js';
import { openFileOrFiles } from '../../../../_common/utils/index.js';
import { styles } from './styles.js';

export type OnSuccessHandler = (
  pageIds: string[],
  options: { isWorkspaceFile: boolean; importedCount: number }
) => void;

export type OnFailHandler = (message: string) => void;

const SHOW_LOADING_SIZE = 1024 * 200;

export class ImportDoc extends WithDisposable(LitElement) {
  static override styles = styles;

  constructor(
    private collection: DocCollection,
    private onSuccess?: OnSuccessHandler,
    private onFail?: OnFailHandler,
    private abortController = new AbortController()
  ) {
    super();

    this._loading = false;

    this.x = 0;
    this.y = 0;
    this._startX = 0;
    this._startY = 0;

    this._onMouseMove = this._onMouseMove.bind(this);
  }

  private async _importHtml() {
    const files = await openFileOrFiles({ acceptType: 'Html', multiple: true });
    if (!files) return;
    const pageIds: string[] = [];
    for (const file of files) {
      const text = await file.text();
      const needLoading = file.size > SHOW_LOADING_SIZE;
      const fileName = file.name.split('.').slice(0, -1).join('.');
      if (needLoading) {
        this.hidden = false;
        this._loading = true;
      } else {
        this.abortController.abort();
      }
      const pageId = await HtmlTransformer.importHTMLToDoc({
        collection: this.collection,
        html: text,
        fileName,
      });
      needLoading && this.abortController.abort();
      if (pageId) {
        pageIds.push(pageId);
      }
    }
    this._onImportSuccess(pageIds);
  }

  private async _importMarkDown() {
    const files = await openFileOrFiles({
      acceptType: 'Markdown',
      multiple: true,
    });
    if (!files) return;
    const pageIds: string[] = [];
    for (const file of files) {
      const text = await file.text();
      const fileName = file.name.split('.').slice(0, -1).join('.');
      const needLoading = file.size > SHOW_LOADING_SIZE;
      if (needLoading) {
        this.hidden = false;
        this._loading = true;
      } else {
        this.abortController.abort();
      }
      const pageId = await MarkdownTransformer.importMarkdownToDoc({
        collection: this.collection,
        markdown: text,
        fileName,
      });
      needLoading && this.abortController.abort();
      if (pageId) {
        pageIds.push(pageId);
      }
    }
    this._onImportSuccess(pageIds);
  }

  private async _importNotion() {
    const file = await openFileOrFiles({ acceptType: 'Zip' });
    if (!file) return;
    const needLoading = file.size > SHOW_LOADING_SIZE;
    if (needLoading) {
      this.hidden = false;
      this._loading = true;
    } else {
      this.abortController.abort();
    }
    const { entryId, pageIds, isWorkspaceFile, hasMarkdown } =
      await NotionHtmlTransformer.importNotionZip({
        collection: this.collection,
        imported: file,
      });
    needLoading && this.abortController.abort();
    if (hasMarkdown) {
      this._onFail(
        'Notion-ből exportált markdown fájlok importálása már nincsen támogatva, kérjük exportáld a Notion dokumentumokat HTML-ként.'
      );
      return;
    }
    this._onImportSuccess([entryId], {
      isWorkspaceFile,
      importedCount: pageIds.length,
    });
  }

  private _onCloseClick(event: MouseEvent) {
    event.stopPropagation();
    this.abortController.abort();
  }

  private _onFail(message: string) {
    this.onFail?.(message);
  }

  private _onImportSuccess(
    pageIds: string[],
    options: { isWorkspaceFile?: boolean; importedCount?: number } = {}
  ) {
    const {
      isWorkspaceFile = false,
      importedCount: pagesImportedCount = pageIds.length,
    } = options;
    this.onSuccess?.(pageIds, {
      isWorkspaceFile,
      importedCount: pagesImportedCount,
    });
  }

  private _onMouseDown(event: MouseEvent) {
    this._startX = event.clientX - this.x;
    this._startY = event.clientY - this.y;
    window.addEventListener('mousemove', this._onMouseMove);
  }

  private _onMouseMove(event: MouseEvent) {
    this.x = event.clientX - this._startX;
    this.y = event.clientY - this._startY;
  }

  private _onMouseUp() {
    window.removeEventListener('mousemove', this._onMouseMove);
  }

  private _openLearnImportLink(event: MouseEvent) {
    event.stopPropagation();
    window.open(
      'https://affine.pro/blog/import-your-data-from-notion-into-affine',
      '_blank'
    );
  }

  override render() {
    if (this._loading) {
      return html`
        <div class="overlay-mask"></div>
        <div class="container">
          <header
            class="loading-header"
            @mousedown="${this._onMouseDown}"
            @mouseup="${this._onMouseUp}"
          >
            <div>Importálás</div>
            <loader-element .width=${'50px'}></loader-element>
          </header>
          <div>
            A fájlok importálása a mérettől és komplexitástól függően időt vehet
            igénybe.
          </div>
        </div>
      `;
    }
    return html`
      <div
        class="overlay-mask"
        @click="${() => this.abortController.abort()}"
      ></div>
      <div class="container">
        <header @mousedown="${this._onMouseDown}" @mouseup="${this._onMouseUp}">
          <icon-button height="28px" @click="${this._onCloseClick}">
            ${CloseIcon}
          </icon-button>
          <div>Importálás</div>
        </header>
        <div>
          Hamarosan még több dokumentumot tudsz szinkronizálni az AlgoGrind
          rendszerével.
        </div>
        <div class="button-container">
          <icon-button
            class="button-item"
            text="Markdown"
            @click="${this._importMarkDown}"
          >
            ${ExportToMarkdownIcon}
          </icon-button>
          <icon-button
            class="button-item"
            text="HTML"
            @click="${this._importHtml}"
          >
            ${ExportToHTMLIcon}
          </icon-button>
        </div>
        <div class="button-container">
          <icon-button
            class="button-item"
            text="Notion"
            @click="${this._importNotion}"
          >
            ${NotionIcon}
            <div
              slot="suffix"
              class="button-suffix"
              @click="${this._openLearnImportLink}"
            ></div>
          </icon-button>
          <icon-button class="button-item" text="Hamarosan..." disabled>
            ${NewIcon}
          </icon-button>
        </div>
        <!-- <div class="footer">
        <div>Migrate from other versions of AFFiNE?</div>
      </div> -->
      </div>
    `;
  }

  override updated(changedProps: PropertyValues) {
    if (changedProps.has('x') || changedProps.has('y')) {
      this.containerEl.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
  }

  @state()
  accessor _loading = false;

  @state()
  accessor _startX = 0;

  @state()
  accessor _startY = 0;

  @query('.container')
  accessor containerEl!: HTMLElement;

  @state()
  accessor x = 0;

  @state()
  accessor y = 0;
}
