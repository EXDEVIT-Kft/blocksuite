import { mergeWithPrev } from '@blocksuite/affine-block-paragraph';
import {
  getInlineEditorByModel,
  markdownInput,
  textKeymap,
} from '@blocksuite/affine-components/rich-text';
import { AccordionBlockSchema } from '@blocksuite/affine-model';
import { matchFlavours } from '@blocksuite/affine-shared/utils';
import { KeymapExtension } from '@blocksuite/block-std';

export const AccordionKeymapExtension = KeymapExtension(
  std => {
    return {
      Backspace: ctx => {
        const text = std.selection.find('text');
        if (!text) return;
        const isCollapsed = text.isCollapsed();
        const isStart = isCollapsed && text.from.index === 0;
        if (!isStart) return;

        const { doc } = std;
        const model = doc.getBlock(text.from.blockId)?.model;
        if (!model || !matchFlavours(model, ['algogrind:accordion'])) return;

        // const { model, doc } = this;
        const event = ctx.get('keyboardState').raw;
        event.preventDefault();

        // When deleting at line start of a paragraph block,
        // firstly switch it to normal text, then delete this empty block.
        if (model.type !== 'text') {
          // Try to switch to normal text
          doc.captureSync();
          doc.updateBlock(model, { type: 'text' });
          return true;
        }

        mergeWithPrev(std.host, model);

        return true;
      },
      Enter: ctx => {
        const { doc } = std;
        const text = std.selection.find('text');
        if (!text) return;
        const model = doc.getBlock(text.from.blockId)?.model;
        if (!model || !matchFlavours(model, ['algogrind:accordion'])) return;
        const inlineEditor = getInlineEditorByModel(
          std.host,
          text.from.blockId
        );
        const range = inlineEditor?.getInlineRange();
        if (!range || !inlineEditor) return;

        const raw = ctx.get('keyboardState').raw;
        const isEnd = model.title.length === range.index;

        raw.preventDefault();

        if (markdownInput(std, model.id)) {
          return true;
        }

        if (isEnd) {
          std.command.exec('addAccordionChild');
          return true;
        }

        std.command.exec('splitAccordionTitle');
        return true;
      },
    };
  },
  {
    flavour: AccordionBlockSchema.model.flavour,
  }
);

export const ParagraphTextKeymapExtension = KeymapExtension(textKeymap, {
  flavour: AccordionBlockSchema.model.flavour,
});
