import type { ReferenceInfo } from '@algogrind/affine-model';

import cloneDeep from 'lodash.clonedeep';

/**
 * Clones reference info.
 */
export function cloneReferenceInfo({
  pageId,
  params,
  title,
  description,
}: ReferenceInfo) {
  const info: ReferenceInfo = { pageId };
  if (params) info.params = cloneDeep(params);
  if (title) info.title = title;
  if (description) info.description = description;
  return info;
}

/**
 * Returns true if it is a link to block or element.
 */
export function isLinkToNode({ params }: ReferenceInfo) {
  if (!params) return false;
  if (!params.mode) return false;
  const { blockIds, elementIds, databaseId, databaseRowId } = params;
  if (blockIds && blockIds.length > 0) return true;
  if (elementIds && elementIds.length > 0) return true;
  if (databaseId || databaseRowId) return true;
  return false;
}
