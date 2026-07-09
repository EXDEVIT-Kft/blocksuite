import { SignalWatcher, WithDisposable } from '@blocksuite/global/lit';
import { ShadowlessElement } from '@blocksuite/std';
import { css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

import type { Group } from '../../../core/group-by/trait.js';
import { LEFT_TOOL_BAR_WIDTH, STATS_BAR_HEIGHT } from '../consts.js';
import type { TableViewUILogic } from '../pc/table-view-ui-logic.js';

const styles = css`
  affine-database-column-stats {
    margin-left: ${LEFT_TOOL_BAR_WIDTH}px;
    height: ${STATS_BAR_HEIGHT}px;
    display: flex;
  }

  /* [ALGOGRIND] readonly design: no left toolbar offset, no interactive
     affordances, uncalculated cells hidden */
  affine-database-column-stats.readonly {
    margin-left: 0;
  }

  affine-database-column-stats.readonly .stats-cell {
    cursor: default;
  }

  affine-database-column-stats.readonly .stats-cell:hover {
    background-color: transparent;
  }

  affine-database-column-stats.readonly .stats-cell[calculated='false'] {
    display: none;
  }
`;

export class DataBaseColumnStats extends SignalWatcher(
  WithDisposable(ShadowlessElement)
) {
  static override styles = styles;

  protected override render() {
    const cols = this.view.properties$.value;
    // [ALGOGRIND] expose readonly state for the readonly design rules above
    this.classList.toggle('readonly', this.view.readonly$.value);
    return html`
      ${repeat(
        cols,
        col => col.id,
        col => {
          return html`<affine-database-column-stats-cell
            .column=${col}
            .group=${this.group}
          ></affine-database-column-stats-cell>`;
        }
      )}
    `;
  }

  @property({ attribute: false })
  accessor group: Group | undefined = undefined;

  @property({ attribute: false })
  accessor tableViewLogic!: TableViewUILogic;

  get view() {
    return this.tableViewLogic.view;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'affine-database-column-stats': DataBaseColumnStats;
  }
}
