import type { Constructor } from '@blocksuite/global/utils';
import type { GfxCompatibleProps } from '@blocksuite/std/gfx';
import { GfxCompatible } from '@blocksuite/std/gfx';
import {
  type BaseBlockTransformer,
  type BlockModel,
  defineBlockSchema,
  type InternalPrimitives,
  type Store,
} from '@blocksuite/store';

import type { BlockMeta } from './types';

export type EmbedProps<Props = object> = Props &
  GfxCompatibleProps &
  BlockMeta & {
    comments?: Record<string, boolean>;
  };

export function defineEmbedModel<
  Props extends object,
  T extends Constructor<BlockModel<Props>> = Constructor<BlockModel<Props>>,
>(BlockModelSuperClass: T) {
  return GfxCompatible<EmbedProps<Props>>(
    BlockModelSuperClass as Constructor<BlockModel<EmbedProps<Props>>>
  );
}

export type EmbedBlockModel<Props = object> = BlockModel<EmbedProps<Props>>;

export function createEmbedBlockSchema<
  Props extends object,
  Model extends EmbedBlockModel<Props>,
  Transformer extends BaseBlockTransformer<EmbedProps<Props>> =
    BaseBlockTransformer<EmbedProps<Props>>,
>({
  name,
  version,
  toModel,
  props,
  transformer,
}: {
  name: string;
  version: number;
  toModel: () => Model;
  props?: (internalPrimitives: InternalPrimitives) => Props;
  transformer?: () => Transformer;
}) {
  return defineBlockSchema({
    flavour: `affine:embed-${name}`,
    props: internalPrimitives => {
      const userProps = props?.(internalPrimitives);

      return {
        index: 'a0',
        xywh: '[0,0,0,0]',
        lockedBySelf: false,
        rotate: 0,
        comments: undefined,
        'meta:createdAt': undefined,
        'meta:updatedAt': undefined,
        'meta:createdBy': undefined,
        'meta:updatedBy': undefined,
        ...userProps,
      } as unknown as EmbedProps<Props>;
    },
    metadata: {
      version,
      role: 'content',
    },
    toModel,
    transformer,
  });
}

// [ALGOGRIND] true while another block (image or attachment) still
// references the same blob — e.g. right after an image <-> attachment
// conversion or a duplicate, where the new block shares the sourceId.
// Used to guard the blob-cleanup listeners against deleting a blob that
// is still in use.
export function isBlobStillReferenced(
  store: Store,
  sourceId: string,
  excludeBlockId: string
): boolean {
  return ['affine:image', 'affine:attachment'].some(flavour =>
    store.getModelsByFlavour(flavour).some(model => {
      if (model.id === excludeBlockId) return false;
      const props = model.props as { sourceId?: string };
      return props.sourceId === sourceId;
    })
  );
}
