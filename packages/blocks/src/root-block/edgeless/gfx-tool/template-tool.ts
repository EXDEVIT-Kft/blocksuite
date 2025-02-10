import { BaseTool } from '@algogrind/block-std/gfx';

export class TemplateTool extends BaseTool {
  static override toolName: string = 'template';
}

declare module '@algogrind/block-std/gfx' {
  interface GfxToolsMap {
    template: TemplateTool;
  }
}
