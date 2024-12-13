// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./effects.ts" />
import { deserializeXYWH, Point } from '@algogrind/global/utils';

import { matchFlavours } from './_common/utils/index.js';
import { splitElements } from './root-block/edgeless/utils/clipboard-utils.js';
import { isCanvasElement } from './root-block/edgeless/utils/query.js';

export * from './_common/adapters/index.js';

export * from './_common/components/ai-item/index.js';
export { scrollbarStyle } from './_common/components/index.js';
export { type NavigatorMode } from './_common/edgeless/frame/consts.js';
export {
  ExportManager,
  ExportManagerExtension,
} from './_common/export-manager/export-manager.js';
export * from './_common/test-utils/test-utils.js';
export * from './_common/transformers/index.js';
export { type AbstractEditor } from './_common/types.js';
export * from './_specs/index.js';
export * from './attachment-block/index.js';
export * from './bookmark-block/index.js';
export * from './code-block/index.js';
export * from './data-view-block/index.js';
export * from './database-block/index.js';
export * from './divider-block/index.js';
export * from './edgeless-text-block/index.js';
export * from './frame-block/index.js';
export * from './image-block/index.js';
export * from './latex-block/index.js';
export * from './note-block/index.js';
export { EdgelessTemplatePanel } from './root-block/edgeless/components/toolbar/template/template-panel.js';
export type {
  Template,
  TemplateCategory,
  TemplateManager,
} from './root-block/edgeless/components/toolbar/template/template-type.js';
export {
  EdgelessFrameManager,
  FrameOverlay,
} from './root-block/edgeless/frame-manager.js';
export { CopilotTool } from './root-block/edgeless/gfx-tool/copilot-tool.js';

export * from './root-block/edgeless/gfx-tool/index.js';
export { EditPropsMiddlewareBuilder } from './root-block/edgeless/middlewares/base.js';
export * from './root-block/edgeless/utils/common.js';
export { EdgelessSnapManager } from './root-block/edgeless/utils/snap-manager.js';
export * from './root-block/index.js';
export * from './schemas.js';
export {
  markdownToMindmap,
  MindmapSurfaceBlock,
  MiniMindmapPreview,
} from './surface-block/mini-mindmap/index.js';
export * from './surface-ref-block/index.js';
export * from '@algogrind/affine-block-embed';
export * from '@algogrind/affine-block-list';
export * from '@algogrind/affine-block-paragraph';
export * from '@algogrind/affine-block-surface';
export { type MenuOptions } from '@algogrind/affine-components/context-menu';
export { HoverController, whenHover } from '@algogrind/affine-components/hover';
export {
  ArrowDownSmallIcon,
  CloseIcon,
  DocIcon,
  DualLinkIcon16,
  LinkedDocIcon,
  PlusIcon,
  TagsIcon,
} from '@algogrind/affine-components/icons';
export * from '@algogrind/affine-components/icons';
export * from '@algogrind/affine-components/peek';
export {
  createLitPortal,
  createSimplePortal,
} from '@algogrind/affine-components/portal';
export * from '@algogrind/affine-components/rich-text';
export { toast } from '@algogrind/affine-components/toast';
export {
  type AdvancedMenuItem,
  type FatMenuItems,
  groupsToActions,
  type MenuItem,
  type MenuItemGroup,
  renderActions,
  renderGroups,
  renderToolbarSeparator,
  Tooltip,
} from '@algogrind/affine-components/toolbar';
export * from '@algogrind/affine-model';
export * from '@algogrind/affine-shared/services';

export {
  ColorVariables,
  FontFamilyVariables,
  SizeVariables,
  StyleVariables,
} from '@algogrind/affine-shared/theme';
export {
  createButtonPopper,
  createDefaultDoc,
  findNoteBlockModel,
  isInsideEdgelessEditor,
  isInsidePageEditor,
  matchFlavours,
  on,
  once,
  openFileOrFiles,
  printToPdf,
} from '@algogrind/affine-shared/utils';

export const BlocksUtils = {
  splitElements,
  matchFlavours,
  deserializeXYWH,
  isCanvasElement,
  Point,
};

const env: Record<string, unknown> =
  typeof globalThis !== 'undefined'
    ? globalThis
    : typeof window !== 'undefined'
      ? window
      : // @ts-ignore
        typeof global !== 'undefined'
        ? // @ts-ignore
          global
        : {};
const importIdentifier = '__ $BLOCKSUITE_BLOCKS$ __';

if (env[importIdentifier] === true) {
  // https://github.com/yjs/yjs/issues/438
  console.error(
    '@algogrind/blocks was already imported. This breaks constructor checks and will lead to issues!'
  );
}

env[importIdentifier] = true;
