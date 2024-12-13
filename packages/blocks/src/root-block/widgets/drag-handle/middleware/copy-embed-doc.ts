import type { JobMiddleware } from '@algogrind/store';

export const copyEmbedDoc: JobMiddleware = ({ slots, collection }) => {
  slots.beforeImport.on(payload => {
    if (
      payload.type === 'block' &&
      ['affine:embed-linked-doc', 'affine:embed-synced-doc'].includes(
        payload.snapshot.flavour
      )
    ) {
      payload.snapshot.id = collection.idGenerator();
    }
  });
};
