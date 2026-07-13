import type { EmbedIframeBlockModel } from '@blocksuite/affine-model';
import {
  EmbedIframeService,
  EmbedOptionProvider,
  NotificationProvider,
} from '@blocksuite/affine-shared/services';
import { isValidUrl, stopPropagation } from '@blocksuite/affine-shared/utils';
import { WithDisposable } from '@blocksuite/global/lit';
import { noop } from '@blocksuite/global/utils';
import {
  BlockSelection,
  type BlockStdScope,
  SurfaceSelection,
} from '@blocksuite/std';
import { LitElement } from 'lit';
import { property, query, state } from 'lit/decorators.js';

export class EmbedIframeLinkInputBase extends WithDisposable(LitElement) {
  // this method is used to track the event when the user inputs the link
  // it should be overridden by the subclass
  protected track(status: 'success' | 'failure') {
    noop(status);
  }

  protected isInputEmpty() {
    return this._linkInputValue.trim() === '';
  }

  protected tryToAddBookmark(url: string) {
    if (!isValidUrl(url)) {
      this.notificationService?.notify({
        title: 'Érvénytelen URL',
        message: 'Adj meg egy érvényes URL-t',
        accent: 'error',
        onClose: function (): void {},
      });
      return;
    }

    this.replaceBlockWith('affine:bookmark', url);
  }

  // Replaces the temporary embed-iframe block with the given flavour.
  protected replaceBlockWith(flavour: string, url: string) {
    const { model } = this;
    const { parent } = model;
    const index = parent?.children.indexOf(model);

    const props: Record<string, unknown> = { url };
    // [ALGOGRIND] keep the position when the temp block lives on the surface
    if (this.inSurface && model.xywh) {
      props.xywh = model.xywh;
    }

    this.store.transact(() => {
      const blockId = this.store.addBlock(flavour, props, parent, index);
      this.store.deleteBlock(model);
      if (this.inSurface) {
        this.std.selection.setGroup('gfx', [
          this.std.selection.create(
            SurfaceSelection,
            blockId,
            [blockId],
            false
          ),
        ]);
      } else {
        this.std.selection.setGroup('note', [
          this.std.selection.create(BlockSelection, { blockId }),
        ]);
      }
    });

    this.abortController?.abort();
  }

  protected async onConfirm() {
    if (this.isInputEmpty()) {
      return;
    }

    try {
      const embedIframeService = this.std.get(EmbedIframeService);
      if (!embedIframeService) {
        console.error('iframe EmbedIframeService not found');
        this.track('failure');
        return;
      }

      const url = this._linkInputValue;

      // [ALGOGRIND] prefer the dedicated embed blocks (YouTube, Loom,
      // GitHub, Figma…): the generic iframe would load the raw page URL,
      // which these sites refuse to serve inside an iframe
      // (X-Frame-Options) — the dedicated blocks use the proper embed URL
      if (isValidUrl(url)) {
        const embedOptions = this.std
          .get(EmbedOptionProvider)
          .getEmbedBlockOptions(url);
        if (embedOptions?.viewType === 'embed') {
          this.replaceBlockWith(embedOptions.flavour, url);
          this.track('success');
          return;
        }
      }

      const canEmbed = embedIframeService.canEmbed(url);

      if (!canEmbed) {
        console.log('iframe can not be embedded, add as a bookmark', url);
        this.tryToAddBookmark(url);
        return;
      }

      this.store.updateBlock(this.model, {
        url: this._linkInputValue,
        iframeUrl: '',
        title: '',
        description: '',
      });
      this.track('success');
    } catch (error) {
      this.track('failure');
      this.notificationService?.notify({
        title: 'Hiba a beágyazás létrehozásakor',
        message:
          error instanceof Error ? error.message : 'Kérlek, próbáld újra',
        accent: 'error',
        onClose: function (): void {},
      });
    } finally {
      this.abortController?.abort();
    }
  }

  protected handleInput = (e: InputEvent) => {
    const target = e.target as HTMLInputElement;
    this._linkInputValue = target.value;
  };

  protected handleKeyDown = async (e: KeyboardEvent) => {
    e.stopPropagation();
    if (e.key === 'Enter' && !e.isComposing) {
      await this.onConfirm();
    }
  };

  override connectedCallback() {
    super.connectedCallback();
    this.updateComplete
      .then(() => {
        requestAnimationFrame(() => {
          this.input.focus();
        });
      })
      .catch(console.error);
    this.disposables.addFromEvent(this, 'cut', stopPropagation);
    this.disposables.addFromEvent(this, 'copy', stopPropagation);
    this.disposables.addFromEvent(this, 'paste', stopPropagation);
    this.disposables.addFromEvent(this, 'pointerdown', stopPropagation);
  }

  get store() {
    return this.model.store;
  }

  get notificationService() {
    return this.std.getOptional(NotificationProvider);
  }

  @state()
  protected accessor _linkInputValue = '';

  @query('input')
  accessor input!: HTMLInputElement;

  @property({ attribute: false })
  accessor model!: EmbedIframeBlockModel;

  @property({ attribute: false })
  accessor std!: BlockStdScope;

  @property({ attribute: false })
  accessor abortController: AbortController | undefined = undefined;

  @property({ attribute: false })
  accessor inSurface = false;
}
