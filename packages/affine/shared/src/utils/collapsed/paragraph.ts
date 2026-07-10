import {
  DividerBlockModel,
  ParagraphBlockModel,
} from '@blocksuite/affine-model';
import type { BlockModel } from '@blocksuite/store';

import { matchModels } from '../model/checker.js';

export function calculateCollapsedSiblings(
  model: ParagraphBlockModel
): BlockModel[] {
  const parent = model.parent;
  if (!parent) return [];
  const children = parent.children;
  const index = children.indexOf(model);
  if (index === -1) return [];

  // [ALGOGRIND] dividers stop the collapse of the nearest heading.
  // Just to include the divider in the collapsed siblings
  let nextDividerFound = false;
  // Used to keep collapsing siblings if a smaller heading is found before a divider
  // -> the divider should only stop the nearest heading's collapse
  /**
   * h1
   * text
   * h2
   * text
   * divider
   * text
   * h1
   */
  // -> in this example the divider should only stop the collapse of the h2 heading
  // the h1 heading should be collapsed until the next h1 heading
  let foundSmallerHeading = false;

  const collapsedEdgeIndex = children.findIndex((child, i) => {
    if (
      i > index &&
      matchModels(child, [DividerBlockModel]) &&
      !foundSmallerHeading
    ) {
      nextDividerFound = true;
      return false;
    }

    // Ran AFTER the divider have been found -> to include the divider in the collapsed siblings
    if (nextDividerFound) {
      nextDividerFound = false;
      return true;
    }

    if (
      i > index &&
      matchModels(child, [ParagraphBlockModel]) &&
      child.props.type.startsWith('h')
    ) {
      const modelLevel = parseInt(model.props.type.slice(1));
      const childLevel = parseInt(child.props.type.slice(1));

      if (childLevel > modelLevel) {
        foundSmallerHeading = true;
      }

      return childLevel <= modelLevel;
    }
    return false;
  });

  let collapsedSiblings: BlockModel[];
  if (collapsedEdgeIndex === -1) {
    collapsedSiblings = children.slice(index + 1);
  } else {
    collapsedSiblings = children.slice(index + 1, collapsedEdgeIndex);
  }

  return collapsedSiblings;
}

export function getNearestHeadingBefore(
  model: BlockModel
): ParagraphBlockModel | null {
  const parent = model.parent;
  if (!parent) return null;
  const index = parent.children.indexOf(model);
  if (index === -1) return null;

  for (let i = index - 1; i >= 0; i--) {
    const sibling = parent.children[i];
    if (
      matchModels(sibling, [ParagraphBlockModel]) &&
      sibling.props.type.startsWith('h')
    ) {
      return sibling;
    }
  }

  return null;
}
