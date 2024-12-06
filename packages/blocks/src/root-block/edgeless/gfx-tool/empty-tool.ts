import { BaseTool } from '@algogrind/block-std/gfx';

/**
 * Empty tool that does nothing.
 */
export class EmptyTool extends BaseTool {
  static override toolName: string = 'empty';
}

declare module '@algogrind/block-std/gfx' {
  interface GfxToolsMap {
    empty: EmptyTool;
  }
}
