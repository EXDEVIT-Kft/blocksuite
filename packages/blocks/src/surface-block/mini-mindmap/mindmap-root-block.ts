import type { RootBlockModel } from '@algogrind/affine-model';

import { BlockComponent } from '@algogrind/block-std';
import { html } from 'lit';

export class MindmapRootBlock extends BlockComponent<RootBlockModel> {
  override render() {
    return html`
      <style>
        .affine-mini-mindmap-root {
          display: block;
          width: 100%;
          height: 100%;

          background-size: 20px 20px;
          background-color: var(--algogrind-background-color);
          background-image: radial-gradient(
            var(--algogrind-grid-color) 1px,
            var(--algogrind-background-color) 1px
          );
        }
      </style>
      <div class="affine-mini-mindmap-root">
        ${this.host.renderChildren(this.model)}
      </div>
    `;
  }
}
