import { EditorChevronDown } from '@blocksuite/affine-components/toolbar';
import { NoteDisplayMode } from '@blocksuite/affine-model';
import { ShadowlessElement } from '@blocksuite/std';
import { html } from 'lit';
import { property } from 'lit/decorators.js';

const DisplayModeMap = {
  [NoteDisplayMode.DocAndEdgeless]: 'Mindenhol',
  [NoteDisplayMode.EdgelessOnly]: 'Rajztáblán',
  [NoteDisplayMode.DocOnly]: 'Szövegként',
} as const satisfies Record<NoteDisplayMode, string>;

export class EdgelessNoteDisplayModeDropdownMenu extends ShadowlessElement {
  get mode() {
    return DisplayModeMap[this.displayMode];
  }

  select(detail: NoteDisplayMode) {
    this.dispatchEvent(new CustomEvent('select', { detail }));
  }

  override render() {
    const { displayMode, mode } = this;

    return html`
      <span class="display-mode-button-label">Megjelenítés</span>
      <editor-menu-button
        .contentPadding=${'8px'}
        .button=${html`
          <editor-icon-button
            aria-label="Megjelenítés módja"
            .tooltip="${'Megjelenítés módja'}"
            .justify="${'space-between'}"
            .labelHeight="${'20px'}"
          >
            <span class="label">${mode}</span>
            ${EditorChevronDown}
          </editor-icon-button>
        `}
      >
        <note-display-mode-panel
          .displayMode=${displayMode}
          .onSelect=${(newMode: NoteDisplayMode) => this.select(newMode)}
        >
        </note-display-mode-panel>
      </editor-menu-button>
    `;
  }

  @property({ attribute: false })
  accessor displayMode!: NoteDisplayMode;
}

declare global {
  interface HTMLElementTagNameMap {
    'edgeless-note-display-mode-dropdown-menu': EdgelessNoteDisplayModeDropdownMenu;
  }
}
