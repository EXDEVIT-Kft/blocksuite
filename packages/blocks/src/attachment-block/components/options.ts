import type { AttachmentBlockModel } from '@algogrind/affine-model';

import {
  CaptionIcon,
  DownloadIcon,
  EditIcon,
  MoreVerticalIcon,
  SmallArrowDownIcon,
} from '@algogrind/affine-components/icons';
import { createLitPortal } from '@algogrind/affine-components/portal';
import {
  cloneGroups,
  renderGroups,
  renderToolbarSeparator,
} from '@algogrind/affine-components/toolbar';
import { flip, offset } from '@floating-ui/dom';
import { html, nothing } from 'lit';
import { join } from 'lit/directives/join.js';
import { repeat } from 'lit/directives/repeat.js';

import type { AttachmentBlockComponent } from '../attachment-block.js';

import { getMoreMenuConfig } from '../../root-block/configs/toolbar.js';
import { allowEmbed, convertToEmbed } from '../embed.js';
import { BUILT_IN_GROUPS } from './config.js';
import { AttachmentToolbarMoreMenuContext } from './context.js';
import { RenameModal } from './rename-model.js';
import { styles } from './styles.js';

export function AttachmentOptionsTemplate({
  anchor,
  model,
  abortController,
}: {
  anchor: AttachmentBlockComponent;
  model: AttachmentBlockModel;
  abortController: AbortController;
}) {
  const disableEmbed = !allowEmbed(model, anchor.service.maxFileSize);
  const readonly = model.doc.readonly;
  const viewType = model.embed ? 'embed' : 'card';

  const viewActions = [
    {
      type: 'card',
      label: 'Kártya nézet',
      disabled: readonly || !model.embed,
      action: () => {
        model.doc.updateBlock(model, { embed: false });
        abortController.abort();
      },
    },
    {
      type: 'embed',
      label: 'Beágyazott nézet',
      disabled: readonly || disableEmbed,
      action: () => {
        convertToEmbed(model, anchor.service.maxFileSize);
        abortController.abort();
      },
    },
  ];

  const context = new AttachmentToolbarMoreMenuContext(anchor, abortController);
  const groups = getMoreMenuConfig(anchor.std).configure(
    cloneGroups(BUILT_IN_GROUPS)
  );
  const moreMenuActions = renderGroups(groups, context);

  const buttons = [
    // preview
    // html`
    //   <editor-icon-button aria-label="Preview" .tooltip=${'Preview'}>
    //     ${ViewIcon}
    //   </editor-icon-button>
    // `,

    readonly
      ? nothing
      : html`
          <editor-icon-button
            aria-label="Átnevezés"
            .tooltip=${'Átnevezés'}
            @click=${() => {
              abortController.abort();
              const renameAbortController = new AbortController();
              createLitPortal({
                template: RenameModal({
                  editorHost: anchor.host,
                  model,
                  abortController: renameAbortController,
                }),
                computePosition: {
                  referenceElement: anchor,
                  placement: 'top-start',
                  middleware: [flip(), offset(4)],
                  // It has a overlay mask, so we don't need to update the position.
                  // autoUpdate: true,
                },
                abortController: renameAbortController,
              });
            }}
          >
            ${EditIcon}
          </editor-icon-button>
        `,

    html`
      <editor-menu-button
        .contentPadding=${'8px'}
        .button=${html`
          <editor-icon-button
            aria-label="Nézet váltása"
            .justify=${'space-between'}
            .labelHeight=${'20px'}
            .iconContainerWidth=${'110px'}
          >
            <div class="label">
              <span style="text-transform: capitalize"
                >${viewType === 'embed' ? 'Beágyazott' : 'Kártya'}</span
              >
              nézet
            </div>
            ${SmallArrowDownIcon}
          </editor-icon-button>
        `}
      >
        <div data-size="small" data-orientation="vertical">
          ${repeat(
            viewActions,
            button => button.type,
            ({ type, label, action }) => html`
              <editor-menu-action
                data-testid=${`link-to-${type}`}
                ?data-selected=${type === viewType}
                @click=${action}
              >
                ${label}
              </editor-menu-action>
            `
          )}
        </div>
      </editor-menu-button>
    `,

    readonly
      ? nothing
      : html`
          <editor-icon-button
            aria-label="Letöltés"
            .tooltip=${'Letöltés'}
            @click=${() => anchor.download()}
          >
            ${DownloadIcon}
          </editor-icon-button>
        `,

    readonly
      ? nothing
      : html`
          <editor-icon-button
            aria-label="Felirat"
            .tooltip=${'Felirat'}
            @click=${() => anchor.captionEditor?.show()}
          >
            ${CaptionIcon}
          </editor-icon-button>
        `,

    html`
      <editor-menu-button
        .contentPadding=${'8px'}
        .button=${html`
          <editor-icon-button aria-label="Továbbiak" .tooltip=${'Továbbiak'}>
            ${MoreVerticalIcon}
          </editor-icon-button>
        `}
      >
        <div data-size="large" data-orientation="vertical">
          ${moreMenuActions}
        </div>
      </editor-menu-button>
    `,
  ];

  return html`
    <style>
      ${styles}
    </style>
    <editor-toolbar class="affine-attachment-toolbar">
      ${join(
        buttons.filter(button => button !== nothing),
        renderToolbarSeparator
      )}
    </editor-toolbar>
  `;
}
