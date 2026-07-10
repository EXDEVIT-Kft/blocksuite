import { textKeymap } from '@blocksuite/affine-inline-preset';
import { AccordionBlockModel, AccordionBlockSchema } from '@blocksuite/affine-model';
import {
  focusTextModel,
  getInlineEditorByModel,
} from '@blocksuite/affine-rich-text';
import { matchModels } from '@blocksuite/affine-shared/utils';
import { KeymapExtension, TextSelection } from '@blocksuite/std';

import { addAccordionChildCommand } from './commands/add-accordion-child.js';
import { splitAccordionTitleCommand } from './commands/split-accordion-title.js';

export const AccordionKeymapExtension = KeymapExtension(
  std => {
    return {
      Backspace: ctx => {
        const text = std.selection.find(TextSelection);
        if (!text) return;
        const isCollapsed = text.isCollapsed();
        const isStart = isCollapsed && text.from.index === 0;
        if (!isStart) return;

        const { store } = std;
        const model = store.getBlock(text.from.blockId)?.model;
        if (!model || !matchModels(model, [AccordionBlockModel])) return;

        const event = ctx.get('keyboardState').raw;
        event.preventDefault();

        // When deleting at line start of an accordion title,
        // firstly switch it to normal text, then dissolve the block.
        if (model.props.type !== 'text') {
          // Try to switch to normal text
          store.captureSync();
          store.updateBlock(model, { type: 'text' });
          return true;
        }

        // Dissolve the accordion into a plain paragraph, moving its
        // children up next to it.
        const parent = store.getParent(model);
        if (!parent) return true;
        const index = parent.children.indexOf(model);
        if (index === -1) return true;

        store.captureSync();
        const id = store.addBlock(
          'affine:paragraph',
          { text: model.props.title.clone() },
          parent,
          index
        );
        store.deleteBlock(model, { bringChildrenTo: parent });
        focusTextModel(std, id, 0);

        return true;
      },
      Enter: ctx => {
        const { store } = std;
        const text = std.selection.find(TextSelection);
        if (!text) return;
        const model = store.getBlock(text.from.blockId)?.model;
        if (!model || !matchModels(model, [AccordionBlockModel])) return;
        const inlineEditor = getInlineEditorByModel(std, model);
        const range = inlineEditor?.getInlineRange();
        if (!range || !inlineEditor) return;

        const raw = ctx.get('keyboardState').raw;
        const isEnd = model.props.title.length === range.index;

        raw.preventDefault();

        if (isEnd) {
          std.command.chain().pipe(addAccordionChildCommand, {}).run();
          return true;
        }

        std.command.chain().pipe(splitAccordionTitleCommand, {}).run();
        return true;
      },
    };
  },
  {
    flavour: AccordionBlockSchema.model.flavour,
  }
);

export const AccordionTextKeymapExtension = KeymapExtension(textKeymap, {
  flavour: AccordionBlockSchema.model.flavour,
});
