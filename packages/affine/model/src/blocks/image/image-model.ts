import type {
  GfxCommonBlockProps,
  GfxElementGeometry,
} from '@blocksuite/std/gfx';
import { GfxCompatible } from '@blocksuite/std/gfx';
import {
  BlockModel,
  BlockSchemaExtension,
  defineBlockSchema,
} from '@blocksuite/store';

import type { TextAlign } from '../../consts';
import { isBlobStillReferenced } from '../../utils/helper.js';
import type { BlockMeta } from '../../utils/types.js';
import { ImageBlockTransformer } from './image-transformer.js';

export type ImageBlockProps = {
  caption?: string;
  sourceId?: string;
  width?: number;
  height?: number;
  rotate: number;
  size?: number;
  comments?: Record<string, boolean>;
  textAlign?: TextAlign;
} & Omit<GfxCommonBlockProps, 'scale'> &
  BlockMeta;

const defaultImageProps: ImageBlockProps = {
  caption: '',
  sourceId: '',
  width: 0,
  height: 0,
  index: 'a0',
  xywh: '[0,0,0,0]',
  lockedBySelf: false,
  rotate: 0,
  size: -1,
  comments: undefined,
  textAlign: undefined,
  'meta:createdAt': undefined,
  'meta:createdBy': undefined,
  'meta:updatedAt': undefined,
  'meta:updatedBy': undefined,
};

export const ImageBlockSchema = defineBlockSchema({
  flavour: 'affine:image',
  props: () => defaultImageProps,
  metadata: {
    version: 1,
    role: 'content',
  },
  transformer: transformerConfigs =>
    new ImageBlockTransformer(transformerConfigs),
  toModel: () => new ImageBlockModel(),
});

export const ImageBlockSchemaExtension = BlockSchemaExtension(ImageBlockSchema);

export class ImageBlockModel
  extends GfxCompatible<ImageBlockProps>(BlockModel)
  implements GfxElementGeometry
{
  // [ALGOGRIND]
  // Delete the stored blob when the image block gets deleted from the
  // document, so removed images do not pile up in the blob storage.
  constructor() {
    super();

    this.deleted.subscribe(() => {
      const sourceId = this.props.sourceId$.value;
      if (!sourceId) {
        return;
      }

      // [ALGOGRIND] the blob may still be in use: converting to a card view
      // (attachment) or duplicating creates another block with the same
      // sourceId — deleting the blob then would break the new block
      if (isBlobStillReferenced(this.store, sourceId, this.id)) {
        return;
      }

      this.store.blobSync.delete(sourceId).catch(console.error);
    });
  }
}
