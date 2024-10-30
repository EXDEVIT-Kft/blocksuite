import type { DocMode, EmbedCardStyle } from '@algogrind/affine-model';
import type { BlockStdScope } from '@algogrind/block-std';
import type { BlockModel, Doc } from '@algogrind/store';

import {
  EMBED_CARD_HEIGHT,
  EMBED_CARD_WIDTH,
} from '@algogrind/affine-shared/consts';
import { DocModeProvider } from '@algogrind/affine-shared/services';
import { getLastNoteBlock } from '@algogrind/affine-shared/utils';
import { Bound, Vec } from '@algogrind/global/utils';

import type { EdgelessRootBlockComponent } from '../../root-block/edgeless/index.js';

import { getRootByEditorHost } from '../utils/query.js';

function getParentModelBySelection(
  doc: Doc,
  mode: DocMode,
  selected?: BlockModel | null
): {
  index?: number;
  model?: BlockModel | null;
} {
  const currentMode = mode;
  const root = doc.root;
  if (!root)
    return {
      index: undefined,
      model: null,
    };

  if (currentMode === 'edgeless') {
    const surface =
      root.children.find(child => child.flavour === 'affine:surface') ?? null;
    return { index: undefined, model: surface };
  }

  if (currentMode === 'page') {
    let selectedBlock = selected;
    let index: undefined | number = undefined;

    if (!selectedBlock) {
      // if no block is selected, append to the last note block
      selectedBlock = getLastNoteBlock(doc);
    }

    while (selectedBlock && selectedBlock.flavour !== 'affine:note') {
      // selectedBlock = this.doc.getParent(selectedBlock.id);
      const parent = doc.getParent(selectedBlock.id);
      index = parent?.children.indexOf(selectedBlock);
      selectedBlock = parent;
    }

    return { index, model: selectedBlock };
  }

  return {
    index: undefined,
    model: null,
  };
}

interface EmbedCardProperties {
  flavour: string;
  targetStyle: EmbedCardStyle;
  props: Record<string, unknown>;
}

export function insertEmbedCard(
  std: BlockStdScope,
  properties: EmbedCardProperties
) {
  const { doc, host } = std;
  const mode = std.get(DocModeProvider).getEditorMode() ?? 'page';
  const rootService = std.getService('affine:page');
  const selectedBlock = rootService?.selectedBlocks[0]?.model;

  const { model, index } = getParentModelBySelection(doc, mode, selectedBlock);
  const { flavour, targetStyle, props } = properties;

  if (mode === 'page') {
    host.doc.addBlock(flavour as never, props, model, index);
    return;
  }
  if (mode === 'edgeless') {
    const edgelessRoot = getRootByEditorHost(
      host
    ) as EdgelessRootBlockComponent | null;
    if (!edgelessRoot) return;

    edgelessRoot.service.viewport.smoothZoom(1);
    const surface = edgelessRoot.surface;
    const center = Vec.toVec(surface.renderer.viewport.center);
    const cardId = edgelessRoot.service.addBlock(
      flavour,
      {
        ...props,
        xywh: Bound.fromCenter(
          center,
          EMBED_CARD_WIDTH[targetStyle],
          EMBED_CARD_HEIGHT[targetStyle]
        ).serialize(),
        style: targetStyle,
      },
      surface.model
    );

    edgelessRoot.service.selection.set({
      elements: [cardId],
      editing: false,
    });

    edgelessRoot.gfx.tool.setTool('default');
    return;
  }
}
