import type { BlockStdScope } from '@algogrind/block-std';
import type { JobMiddleware } from '@algogrind/store';

export const newIdCrossDoc =
  (std: BlockStdScope): JobMiddleware =>
  ({ slots, collection }) => {
    let samePage = false;
    slots.beforeImport.on(payload => {
      if (payload.type === 'slice') {
        samePage = payload.snapshot.pageId === std.doc.id;
      }
      if (payload.type === 'block' && !samePage) {
        payload.snapshot.id = collection.idGenerator();
      }
    });
  };
