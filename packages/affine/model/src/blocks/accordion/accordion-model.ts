import {
  defineBlockSchema,
  type SchemaToModel,
  type Text,
} from '@blocksuite/store';

export type AccordionType = 'text' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type AccordionBlockProps = {
  type: AccordionType;
  title: Text;
};

export const AccordionBlockSchema = defineBlockSchema({
  flavour: 'algogrind:accordion',
  props: (internal): AccordionBlockProps => ({
    title: internal.Text(),
    type: 'h1',
  }),
  metadata: {
    version: 1,
    role: 'content',
    parent: [
      'affine:note',
      'affine:database',
      'affine:paragraph',
      'affine:list',
      'affine:edgeless-text',
      'algogrind:accordion',
    ],
  },
});

export type AccordionBlockModel = SchemaToModel<typeof AccordionBlockSchema>;

declare global {
  namespace BlockSuite {
    interface BlockModels {
      'algogrind:accordion': AccordionBlockModel;
    }
  }
}
