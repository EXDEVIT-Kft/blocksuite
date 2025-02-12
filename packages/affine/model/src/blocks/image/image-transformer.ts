import type { FromSnapshotPayload, SnapshotNode } from '@algogrind/store';

import { BaseBlockTransformer } from '@algogrind/store';

import type { ImageBlockProps } from './image-model.js';

export class ImageBlockTransformer extends BaseBlockTransformer<ImageBlockProps> {
  override async fromSnapshot(
    payload: FromSnapshotPayload
  ): Promise<SnapshotNode<ImageBlockProps>> {
    const snapshotRet = await super.fromSnapshot(payload);
    const sourceId = snapshotRet.props.sourceId;
    if (!payload.assets.isEmpty() && sourceId && !sourceId.startsWith('/'))
      await payload.assets.writeToBlob(sourceId);

    return snapshotRet;
  }
}
