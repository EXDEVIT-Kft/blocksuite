import type { AttachmentBlockModel } from '@algogrind/affine-model';
import type { TemplateResult } from 'lit';

import {
  CaptionIcon,
  DownloadIcon,
  PaletteIcon,
} from '@algogrind/affine-components/icons';
import { renderToolbarSeparator } from '@algogrind/affine-components/toolbar';
import { ThemeProvider } from '@algogrind/affine-shared/services';
import { Bound, WithDisposable } from '@algogrind/global/utils';
import { html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { join } from 'lit/directives/join.js';

import type { EmbedCardStyle } from '../../../_common/types.js';
import type { AttachmentBlockComponent } from '../../../attachment-block/index.js';
import type { EdgelessRootBlockComponent } from '../../edgeless/edgeless-root-block.js';

import {
  EMBED_CARD_HEIGHT,
  EMBED_CARD_WIDTH,
} from '../../../_common/consts.js';
import { getEmbedCardIcons } from '../../../_common/utils/url.js';
import { attachmentViewToggleMenu } from '../../../attachment-block/index.js';

export class EdgelessChangeAttachmentButton extends WithDisposable(LitElement) {
  private _download = () => {
    this._block?.download();
  };

  private _setCardStyle = (style: EmbedCardStyle) => {
    const bounds = Bound.deserialize(this.model.xywh);
    bounds.w = EMBED_CARD_WIDTH[style];
    bounds.h = EMBED_CARD_HEIGHT[style];
    const xywh = bounds.serialize();
    this.model.doc.updateBlock(this.model, { style, xywh });
  };

  private _showCaption = () => {
    this._block?.captionEditor?.show();
  };

  private get _block() {
    const block = this.std.view.getBlock(this.model.id);
    if (!block) return null;
    return block as AttachmentBlockComponent;
  }

  private get _doc() {
    return this.model.doc;
  }

  private get _getCardStyleOptions(): {
    style: EmbedCardStyle;
    Icon: TemplateResult<1>;
    tooltip: string;
  }[] {
    const theme = this.std.get(ThemeProvider).theme;
    const { EmbedCardListIcon, EmbedCardCubeIcon } = getEmbedCardIcons(theme);
    return [
      {
        style: 'horizontalThin',
        Icon: EmbedCardListIcon,
        tooltip: 'Vízszintes elrendezés',
      },
      {
        style: 'cubeThick',
        Icon: EmbedCardCubeIcon,
        tooltip: 'Függőleges elrendezés',
      },
    ];
  }

  get std() {
    return this.edgeless.std;
  }

  get viewToggleMenu() {
    const block = this._block;
    const model = this.model;
    if (!block || !model) return nothing;

    return attachmentViewToggleMenu({
      block,
      callback: () => this.requestUpdate(),
    });
  }

  override render() {
    return join(
      [
        this.model.style === 'pdf'
          ? null
          : html`
              <editor-menu-button
                .contentPadding=${'8px'}
                .button=${html`
                  <editor-icon-button
                    aria-label="Kártya stílusa"
                    .tooltip=${'Kártya stílusa'}
                  >
                    ${PaletteIcon}
                  </editor-icon-button>
                `}
              >
                <card-style-panel
                  .value=${this.model.style}
                  .options=${this._getCardStyleOptions}
                  .onSelect=${this._setCardStyle}
                >
                </card-style-panel>
              </editor-menu-button>
            `,
        this.viewToggleMenu,
        html`
          <editor-icon-button
            aria-label="Letöltés"
            .tooltip=${'Letöltés'}
            ?disabled=${this._doc.readonly}
            @click=${this._download}
          >
            ${DownloadIcon}
          </editor-icon-button>
        `,
        html`
          <editor-icon-button
            aria-label="Felirat hozzáadása"
            .tooltip=${'Felirat hozzáadása'}
            class="change-attachment-button caption"
            ?disabled=${this._doc.readonly}
            @click=${this._showCaption}
          >
            ${CaptionIcon}
          </editor-icon-button>
        `,
      ].filter(button => button !== nothing && button),
      renderToolbarSeparator
    );
  }

  @property({ attribute: false })
  accessor edgeless!: EdgelessRootBlockComponent;

  @property({ attribute: false })
  accessor model!: AttachmentBlockModel;
}

export function renderAttachmentButton(
  edgeless: EdgelessRootBlockComponent,
  attachments?: AttachmentBlockModel[]
) {
  if (attachments?.length !== 1) return nothing;

  return html`
    <edgeless-change-attachment-button
      .model=${attachments[0]}
      .edgeless=${edgeless}
    ></edgeless-change-attachment-button>
  `;
}
