import type { MarkdownAST } from '@algogrind/affine-shared/adapters';

import type { ElementModelMatcher } from '../../type.js';

export type ElementModelToMarkdownAdapterMatcher =
  ElementModelMatcher<MarkdownAST>;
