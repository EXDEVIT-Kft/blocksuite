import type { RootBlockModel } from '@algogrind/affine-model';
import type { BlockModel } from '@algogrind/store';

import { BLOCK_ID_ATTR, type BlockComponent } from '@algogrind/block-std';

const ATTR_SELECTOR = `[${BLOCK_ID_ATTR}]`;

export function getModelByElement<Model extends BlockModel>(
  element: Element
): Model | null {
  const closestBlock = element.closest<BlockComponent>(ATTR_SELECTOR);
  if (!closestBlock) {
    return null;
  }
  return closestBlock.model as Model;
}

export function getRootByElement(
  element: Element
): BlockComponent<RootBlockModel> | null {
  const pageRoot = getPageRootByElement(element);
  if (pageRoot) return pageRoot;

  const edgelessRoot = getEdgelessRootByElement(element);
  if (edgelessRoot) return edgelessRoot;

  return null;
}

export function getPageRootByElement(
  element: Element
): BlockComponent<RootBlockModel> | null {
  return element.closest('affine-page-root');
}

export function getEdgelessRootByElement(
  element: Element
): BlockComponent<RootBlockModel> | null {
  return element.closest('affine-edgeless-root');
}
