import type { AccordionBlockModel } from '@algogrind/affine-model';

import { SmallArrowDownIcon } from '@algogrind/affine-components/icons';
import { focusTextModel } from '@algogrind/affine-components/rich-text';
import { stopPropagation } from '@algogrind/affine-shared/utils';
import { BlockComponent } from '@algogrind/block-std';
import { Text } from '@algogrind/store';
import { html, type TemplateResult } from 'lit';
import { query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import type { AccordionBlockService } from './accordion-service.js';

import { tryRemoveEmptyLine } from '../root-block/widgets/slash-menu/utils.js';
import { accordionBlockStyles } from './styles.js';

export class AccordionBlockComponent extends BlockComponent<
  AccordionBlockModel,
  AccordionBlockService
> {
  static override styles = accordionBlockStyles;

  private baseParagraphId: string | null = null;

  private _addBaseParagraphBlock() {
    this.baseParagraphId = this.doc.addBlock(
      'affine:paragraph',
      {
        text: new Text(''),
      },
      this.model.id
    );
  }

  private _onInputChange(e: InputEvent) {
    const target = e.target as HTMLInputElement;
    this.accordionTitle = target.value;
    this.doc.updateBlock(this.model, {
      title: this.accordionTitle,
    });
  }

  protected _onHeadClick(event: MouseEvent) {
    event.stopPropagation();
    if (!this.model.firstChild()) {
      this._addBaseParagraphBlock();
    }

    this._isOpen = !this._isOpen;
  }

  protected _onTitleKeydown(event: KeyboardEvent) {
    if (event.key === 'Backspace') {
      const doc = this.doc;
      const target = event.target as HTMLInputElement;
      const start = target.selectionStart;

      if (
        start === null ||
        start > 0 ||
        (this.accordionTitle && this.accordionTitle.length > 0)
      ) {
        return;
      }

      event.preventDefault();

      const model = this.model;
      const parent = doc.getParent(model);
      if (!parent) {
        return;
      }

      const value = target.value;
      const title = value.slice(0, start);
      doc.updateBlock(model, { title });

      doc.deleteBlock(model, {
        deleteChildren: false,
        bringChildrenTo: parent,
      });

      const firstChild = this.model.firstChild();

      if (firstChild) {
        focusTextModel(this.std, firstChild.id);
      }
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (!this._isOpen) {
        this._isOpen = true;
      }

      const doc = this.doc;
      const target = event.target as HTMLInputElement;
      const start = target.selectionStart;
      if (start === null) {
        return;
      }

      const model = this.model;
      const parent = doc.getParent(model);
      if (!parent) {
        return;
      }

      const value = target.value;
      const firstChild = this.model.firstChild();

      if (
        firstChild?.flavour === 'affine:paragraph' &&
        start === value.length
      ) {
        focusTextModel(this.std, firstChild.id);
        return;
      }

      const title = value.slice(0, start);
      doc.updateBlock(model, { title });
      this.accordionTitle = title;

      const nextBlockText = value.slice(start);
      const id = doc.addBlock(
        'affine:paragraph',
        { text: new Text(nextBlockText) },
        this.model,
        0
      );

      focusTextModel(this.std, id);
    }
  }

  override connectedCallback() {
    super.connectedCallback();

    this.accordionTitle = this.model.title;

    const selectionManager = this.host.selection;

    const disposable = this.std.doc.slots.blockUpdated.on(props => {
      if (
        props.type === 'delete' &&
        props.flavour === 'affine:paragraph' &&
        !this.model.firstChild()
      ) {
        this._addBaseParagraphBlock();

        // TODO[algogrind]:
        // ez nagyon csúnya megoldás, de hirtelen nem volt jobb ötletem
        // probléma: nincs egy blokk se ami olyan elven viselkedik, hogy a gyerek blokkjának "keydown" eseményét kellene felüldefiniálnia
        // itt valószínűleg nem is ez lenne a helyes megoldás, mert a blokk életciklusa amennyire most látom nem teljesen erre van kitalálva
        // lényeg: késleltetni akarjuk pont annyira a selection viselkedését hogy a következő életciklus utasítás megtörténjen
        // (ez nem más mint az accordion előtt blokk fókuszálása), majd onnan elvesszük rögtön a selectiont és kijelöljük azaccordiont
        setTimeout(() => {
          selectionManager.setGroup('note', [
            selectionManager.create('block', { blockId: this.blockId }),
          ]);
        });
      }

      // when an embedded / special content block gets added, try removing the empty paragraph in the accordion
      if (
        props.type === 'add' &&
        props.flavour !== 'affine:paragraph' &&
        this.baseParagraphId
      ) {
        const paragraphBlock = this.doc.getBlock(this.baseParagraphId);

        if (paragraphBlock) {
          tryRemoveEmptyLine(paragraphBlock.model);
        }
      }

      if (props.id === this.model.id && props.type === 'delete') {
        this.std.view.deleteBlock(this);
        disposable.dispose();
      }
    });

    this._disposables.add(disposable);
  }

  override renderBlock(): TemplateResult<1> {
    return html`
      <div
        class=${classMap({
          'algogrind-accordion-block-container': true,
          open: this._isOpen,
        })}
      >
        <div
          class="algogrind-accordion-block-head"
          @click="${this._onHeadClick}"
          contenteditable="false"
        >
          <div>${this.model.title}</div>

          ${SmallArrowDownIcon}
        </div>
        <div class="algogrind-accordion-block-body">
          <div>${this.renderChildren(this.model)}</div>
        </div>
        <affine-block-selection .block=${this}></affine-block-selection>
      </div>
      <textarea
        .disabled=${this.doc.readonly}
        placeholder="Cím megadása..."
        class="accordion-title"
        .value=${this.accordionTitle ?? ''}
        @input=${this._onInputChange}
        @pointerdown=${stopPropagation}
        @click=${stopPropagation}
        @dblclick=${stopPropagation}
        @cut=${stopPropagation}
        @copy=${stopPropagation}
        @paste=${stopPropagation}
        @keydown=${this._onTitleKeydown}
        @keyup=${stopPropagation}
      ></textarea>
    `;
  }

  @state()
  private accessor _isOpen = false;

  @state()
  accessor accordionTitle: string | null | undefined = undefined;

  @query('.accordion-title')
  accessor input!: HTMLInputElement;
}
