import { IS_MOBILE } from '@algogrind/global/env';
import { MoreHorizontalIcon, PlusIcon } from '@blocksuite/icons/lit';
import { nothing } from 'lit';
import { html } from 'lit/static-html.js';

import type { GroupData } from './trait.js';
import type { GroupRenderProps } from './types.js';

import { renderUniLit } from '../utils/uni-component/uni-component.js';

function GroupHeaderCount(group: GroupData) {
  const cards = group.rows;
  if (!cards.length) {
    return;
  }
  return html` <div class="group-header-count">${cards.length}</div>`;
}
const GroupTitleMobile = (
  groupData: GroupData,
  ops: {
    readonly: boolean;
    clickAdd: (evt: MouseEvent) => void;
    clickOps: (evt: MouseEvent) => void;
  }
) => {
  const data = groupData.manager.config$.value;
  if (!data) return nothing;

  const icon =
    groupData.value == null
      ? ''
      : html` <uni-lit
          class="group-header-icon"
          .uni="${groupData.manager.property$.value?.icon}"
        ></uni-lit>`;
  const props: GroupRenderProps = {
    value: groupData.value,
    data: groupData.property.data$.value,
    updateData: groupData.manager.updateData,
    updateValue: value => groupData.manager.updateValue(groupData.rows, value),
    readonly: ops.readonly,
  };

  return html`
    <style>
      .group-header-count {
        flex-shrink: 0;
        width: 20px;
        height: 20px;
        border-radius: 4px;
        background-color: var(--algogrind-background-secondary-color);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--algogrind-text-secondary);
        font-size: var(--data-view-cell-text-size);
      }

      .group-header-name {
        flex: 1;
        overflow: hidden;
      }

      .group-header-ops {
        display: flex;
        align-items: center;
      }

      .group-header-op {
        display: flex;
        align-items: center;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        font-size: 16px;
        color: var(--algogrind-text-paragraph-1-color);
      }

      .group-header-icon {
        display: flex;
        align-items: center;
        margin-right: -4px;
        font-size: 16px;
        color: var(--algogrind-text-paragraph-1-color);
      }
    </style>
    <div
      style="display:flex;align-items:center;gap: 8px;overflow: hidden;height: 22px;"
    >
      ${icon} ${renderUniLit(data.view, props)} ${GroupHeaderCount(groupData)}
    </div>
    ${ops.readonly
      ? nothing
      : html` <div class="group-header-ops">
          <div @click="${ops.clickAdd}" class="group-header-op add-card">
            ${PlusIcon()}
          </div>
          <div @click="${ops.clickOps}" class="group-header-op">
            ${MoreHorizontalIcon()}
          </div>
        </div>`}
  `;
};

export const GroupTitle = (
  groupData: GroupData,
  ops: {
    readonly: boolean;
    clickAdd: (evt: MouseEvent) => void;
    clickOps: (evt: MouseEvent) => void;
  }
) => {
  if (IS_MOBILE) {
    return GroupTitleMobile(groupData, ops);
  }
  const data = groupData.manager.config$.value;
  if (!data) return nothing;

  const icon =
    groupData.value == null
      ? ''
      : html` <uni-lit
          class="group-header-icon"
          .uni="${groupData.manager.property$.value?.icon}"
        ></uni-lit>`;
  const props: GroupRenderProps = {
    value: groupData.value,
    data: groupData.property.data$.value,
    updateData: groupData.manager.updateData,
    updateValue: value => groupData.manager.updateValue(groupData.rows, value),
    readonly: ops.readonly,
  };

  return html`
    <style>
      .group-header-count {
        flex-shrink: 0;
        width: 20px;
        height: 20px;
        border-radius: 4px;
        background-color: var(--algogrind-background-secondary-color);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--algogrind-text-secondary);
        font-size: var(--data-view-cell-text-size);
      }

      .group-header-name {
        flex: 1;
        overflow: hidden;
      }

      .group-header-ops {
        display: flex;
        align-items: center;
      }

      .group-header-op {
        display: flex;
        align-items: center;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        visibility: hidden;
        opacity: 0;
        transition: all 150ms cubic-bezier(0.42, 0, 1, 1);
      }

      .group-header-icon {
        display: flex;
        align-items: center;
        margin-right: -4px;
      }

      .group-header-icon svg {
        width: 16px;
        height: 16px;
        color: var(--algogrind-text-paragraph-color);
        fill: var(--algogrind-text-paragraph-color);
      }

      .group-header-op:hover {
        background-color: var(--algogrind-hover-color);
      }

      .group-header-op svg {
        width: 16px;
        height: 16px;
        fill: var(--algogrind-text-paragraph-color);
        color: var(--algogrind-text-paragraph-color);
      }
    </style>
    <div
      style="display:flex;align-items:center;gap: 8px;overflow: hidden;height: 22px;"
    >
      ${icon} ${renderUniLit(data.view, props)} ${GroupHeaderCount(groupData)}
    </div>
    ${ops.readonly
      ? nothing
      : html` <div class="group-header-ops">
          <div @click="${ops.clickAdd}" class="group-header-op add-card">
            ${PlusIcon()}
          </div>
          <div @click="${ops.clickOps}" class="group-header-op">
            ${MoreHorizontalIcon()}
          </div>
        </div>`}
  `;
};
