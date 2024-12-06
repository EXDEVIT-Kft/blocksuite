import type { AffineTextAttributes } from '@algogrind/affine-shared/types';
import type { DocMeta } from '@algogrind/store';
import type { TemplateResult } from 'lit';

export const DOC_BLOCK_CHILD_PADDING = 24;

export const DEFAULT_DOC_NAME = 'Új dokumentum';

export type BackLink = {
  pageId: string;
  blockId: string;
  type: NonNullable<AffineTextAttributes['reference']>['type'];
};

export type BacklinkData = BackLink &
  DocMeta & {
    jump: () => void;
    icon: TemplateResult;
  };
