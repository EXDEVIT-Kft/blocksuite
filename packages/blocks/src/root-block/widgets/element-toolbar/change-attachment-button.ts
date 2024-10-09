import {
  CaptionIcon,
  DownloadIcon,
  PaletteIcon,
} from '@algogrind/affine-components/icons';
import { assertExists, Bound, WithDisposable } from '@algogrind/global/utils';
import { html, LitElement, nothing, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import type { EmbedCardStyle } from '../../../_common/types.js';
import type {
  AttachmentBlockComponent,
  AttachmentBlockModel,
  EdgelessRootBlockComponent,
} from '../../../index.js';

import {
  EMBED_CARD_HEIGHT,
  EMBED_CARD_WIDTH,
} from '../../../_common/consts.js';
import { getEmbedCardIcons } from '../../../_common/utils/url.js';
import { downloadAttachmentBlob } from '../../../attachment-block/utils.js';

export class EdgelessChangeAttachmentButton extends WithDisposable(LitElement) {
  private _download = () => {
    if (!this._block) return;
    downloadAttachmentBlob(this._block);
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
    const blockSelection =
      this.edgeless.service.selection.surfaceSelections.filter(sel =>
        sel.elements.includes(this.model.id)
      );
    if (blockSelection.length !== 1) {
      return;
    }

    const block = this.std.view.getBlock(
      blockSelection[0].blockId
    ) as AttachmentBlockComponent | null;
    assertExists(block);

    return block;
  }

  private get _doc() {
    return this.model.doc;
  }

  private get _getCardStyleOptions(): {
    style: EmbedCardStyle;
    Icon: TemplateResult<1>;
    tooltip: string;
  }[] {
    const { EmbedCardListIcon, EmbedCardCubeIcon } = getEmbedCardIcons();
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

  override render() {
    return html`
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

      <editor-toolbar-separator></editor-toolbar-separator>

      <editor-icon-button
        aria-label="Letöltés"
        .tooltip=${'Letöltés'}
        ?disabled=${this._doc.readonly}
        @click=${this._download}
      >
        ${DownloadIcon}
      </editor-icon-button>

      <editor-toolbar-separator></editor-toolbar-separator>

      <editor-icon-button
        aria-label="Felirat hozzáadása"
        .tooltip=${'Felirat hozzáadása'}
        class="change-attachment-button caption"
        ?disabled=${this._doc.readonly}
        @click=${this._showCaption}
      >
        ${CaptionIcon}
      </editor-icon-button>
    `;
  }

  @property({ attribute: false })
  accessor edgeless!: EdgelessRootBlockComponent;

  @property({ attribute: false })
  accessor model!: AttachmentBlockModel;
}

declare global {
  interface HTMLElementTagNameMap {
    'edgeless-change-attachment-button': EdgelessChangeAttachmentButton;
  }
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
