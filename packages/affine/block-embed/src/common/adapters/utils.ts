import type { ReferenceParams } from '@algogrind/affine-model';

import { TextUtils } from '@algogrind/affine-shared/adapters';

export function generateDocUrl(
  docBaseUrl: string,
  pageId: string,
  params: ReferenceParams
) {
  const search = TextUtils.toURLSearchParams(params);
  const query = search?.size ? `?${search.toString()}` : '';
  const url = docBaseUrl ? `${docBaseUrl}/${pageId}${query}` : '';
  return url;
}
