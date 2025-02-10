import type { DocCollection } from '@algogrind/store';

export interface InitFn {
  (collection: DocCollection, docId: string): Promise<void> | void;
  id: string;
  displayName: string;
  description: string;
}
