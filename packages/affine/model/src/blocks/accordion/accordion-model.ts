import { defineBlockSchema, type SchemaToModel } from '@algogrind/store';

export type AccordionBlockProps = {
  title: string;
};

export const AccordionBlockSchema = defineBlockSchema({
  flavour: 'algogrind:accordion',
  props: (): AccordionBlockProps => ({
    title: '',
  }),
  metadata: {
    version: 1,
    role: 'hub',
    parent: [
      'affine:note',
      'affine:database',
      'affine:paragraph',
      'affine:list',
      'affine:edgeless-text',
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
