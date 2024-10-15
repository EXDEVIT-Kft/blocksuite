import type { AccordionBlockModel } from '@algogrind/affine-model';
import type { InlineRangeProvider } from '@algogrind/inline';

import { SmallArrowDownIcon } from '@algogrind/affine-components/icons';
import {
  DefaultInlineManagerExtension,
  focusTextModel,
  type RichText,
} from '@algogrind/affine-components/rich-text';
import { NOTE_SELECTOR } from '@algogrind/affine-shared/consts';
import { DocModeProvider } from '@algogrind/affine-shared/services';
import { BlockComponent, getInlineRangeProvider } from '@algogrind/block-std';
import { effect, signal } from '@preact/signals-core';
import { html, nothing, type TemplateResult } from 'lit';
import { query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import type { AccordionBlockService } from './accordion-service.js';

import { accordionBlockStyles } from './styles.js';

export class AccordionBlockComponent extends BlockComponent<
  AccordionBlockModel,
  AccordionBlockService
> {
  static override styles = accordionBlockStyles;

  private _composing = signal(false);

  private _displayPlaceholder = signal(false);

  private _inlineRangeProvider: InlineRangeProvider | null = null;

  get attributeRenderer() {
    return this.inlineManager.getRenderer();
  }

  get attributesSchema() {
    return this.inlineManager.getSchema();
  }

  get inlineEditor() {
    return this._richTextElement?.inlineEditor;
  }

  get inlineManager() {
    return this.std.get(DefaultInlineManagerExtension.identifier);
  }

  override get topContenteditableElement() {
    if (this.std.get(DocModeProvider).getEditorMode() === 'edgeless') {
      return this.closest<BlockComponent>(NOTE_SELECTOR);
    }
    return this.rootComponent;
  }

  private _childAt(index: number) {
    if (this.model.children.length >= Math.abs(index)) {
      return this.model.children.at(index);
    }

    return null;
  }

  protected _onRichTextClick(evt: MouseEvent) {
    if (!this.doc.readonly) {
      evt.stopPropagation();
    }
  }

  protected _toggleAccordion(event: MouseEvent) {
    event.stopPropagation();

    this._isOpen = !this._isOpen;
  }

  override connectedCallback() {
    super.connectedCallback();

    // Handle different title events:

    this.handleEvent(
      'compositionStart',
      () => {
        this._composing.value = true;
      },
      { flavour: true }
    );
    this.handleEvent(
      'compositionEnd',
      () => {
        this._composing.value = false;
      },
      { flavour: true }
    );

    this._inlineRangeProvider = getInlineRangeProvider(this);
    this.disposables.add(
      effect(() => {
        const composing = this._composing.value;
        if (composing || this.doc.readonly) {
          this._displayPlaceholder.value = false;
          return;
        }
        const textSelection = this.host.selection.find('text');
        const isCollapsed = textSelection?.isCollapsed() ?? false;
        if (!this.selected || !isCollapsed) {
          this._displayPlaceholder.value = false;
          return;
        }

        this.updateComplete
          .then(() => {
            if ((this.inlineEditor?.yTextLength ?? 0) > 0) {
              this._displayPlaceholder.value = false;
              return;
            }
            this._displayPlaceholder.value = true;
            return;
          })
          .catch(console.error);
      })
    );

    // Handle changing accordion behaviour based on child list

    this.model.childMap.subscribe(map => {
      // In readonly mode, let the user control when the accordion is opened / closed
      if (this.doc.readonly) {
        return;
      }

      // Always guarantee that there is a child paragraph block in the body
      if (map.size === 0) {
        this.doc.addBlock('affine:paragraph', {}, this.model, 0);
        return;
      }

      // Make sure every time the child list updates, open the accordion
      if (!this._isOpen) {
        this._isOpen = true;
      }

      // Handle "stepping out" of the accordion body similarily to the quote behaviour:
      // last 2 childs empty & cursor is in last child -> move the newly created block outside of the accordion
      const lastChild = this._childAt(-1);

      if (
        map.size > 2 &&
        lastChild &&
        lastChild.text?.length === 0 &&
        this._childAt(-2)?.text?.length === 0
      ) {
        const text = this.host.selection.find('text');

        /**
         * Do nothing if the selection:
         * - is not a text selection
         * - or spans multiple blocks
         * - or the selection is not in the accordion's last child
         */
        if (
          !text ||
          (text.to && text.from.blockId !== text.to.blockId) ||
          lastChild.id !== text.from.blockId
        ) {
          return;
        }

        const parent = this.model.parent;

        if (!parent) {
          return;
        }

        this.doc.moveBlocks([lastChild], parent, this.model, false);

        // At this pont the lifecycle did not get to a pont to move the lastChild
        // delay the focus to let the block move happen. Kinda hacky.
        setTimeout(() => {
          focusTextModel(this.std, lastChild.id);
        });
      }
    });
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
          class=${classMap({
            'algogrind-accordion-block-head': true,
            [`${this.model.type}-accordion`]: true,
          })}
          @click=${this._toggleAccordion}
        >
          <rich-text
            .yText=${this.model.title.yText}
            .inlineEventSource=${this.topContenteditableElement ?? nothing}
            .undoManager=${this.doc.history}
            .attributeRenderer=${this.attributeRenderer}
            .readonly=${this.doc.readonly}
            .inlineRangeProvider=${this._inlineRangeProvider}
            @click=${this._onRichTextClick}
          ></rich-text>

          <div
            contenteditable="false"
            class=${classMap({
              'accordion-placeholder': true,
              visible: this._displayPlaceholder.value,
            })}
          >
            ${this.service.placeholderGenerator(this.model)}
          </div>

          ${SmallArrowDownIcon}
        </div>
        <div class="algogrind-accordion-block-body">
          <div>${this.renderChildren(this.model)}</div>
        </div>
        <affine-block-selection .block=${this}></affine-block-selection>
      </div>
    `;
  }

  @state()
  private accessor _isOpen = false;

  @query('rich-text')
  private accessor _richTextElement: RichText | null = null;

  @state()
  accessor accordionTitle: string | null | undefined = undefined;

  @query('.accordion-title')
  accessor input!: HTMLInputElement;
}
