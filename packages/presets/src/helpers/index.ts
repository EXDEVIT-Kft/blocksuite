import { AffineSchemas } from '@algogrind/blocks/schemas';
import { DocCollection, Schema } from '@algogrind/store';

export function createEmptyDoc() {
  const schema = new Schema().register(AffineSchemas);
  const collection = new DocCollection({ schema });
  collection.meta.initialize();
  const doc = collection.createDoc();

  return {
    doc,
    init() {
      doc.load();
      const rootId = doc.addBlock('affine:page', {});
      doc.addBlock('affine:surface', {}, rootId);
      const noteId = doc.addBlock('affine:note', {}, rootId);
      doc.addBlock('affine:paragraph', {}, noteId);
      return doc;
    },
  };
}
