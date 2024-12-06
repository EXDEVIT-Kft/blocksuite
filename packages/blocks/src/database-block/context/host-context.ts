import type { EditorHost } from '@algogrind/block-std';

import { createContextKey } from '@algogrind/data-view';

export const HostContextKey = createContextKey<EditorHost | undefined>(
  'editor-host',
  undefined
);
