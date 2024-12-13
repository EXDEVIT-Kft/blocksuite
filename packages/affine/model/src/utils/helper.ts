import type { GfxCompatibleProps } from '@algogrind/block-std/gfx';
import type { Constructor } from '@algogrind/global/utils';

import { GfxCompatible } from '@algogrind/block-std/gfx';
import {
  type BaseBlockTransformer,
  type BlockModel,
  defineBlockSchema,
  type InternalPrimitives,
} from '@algogrind/store';

export function defineEmbedModel<
  Props extends object,
  T extends Constructor<BlockModel<Props>> = Constructor<BlockModel<Props>>,
>(BlockModelSuperClass: T) {
  return GfxCompatible<Props & GfxCompatibleProps>(
    BlockModelSuperClass as Constructor<BlockModel<Props & GfxCompatibleProps>>
  );
}

export type EmbedProps<Props = object> = Props & GfxCompatibleProps;

export type EmbedBlockModel<Props = object> = BlockModel<EmbedProps<Props>>;

export function createEmbedBlockSchema<
  Props extends object,
  Model extends EmbedBlockModel<Props>,
  Transformer extends BaseBlockTransformer<
    EmbedProps<Props>
  > = BaseBlockTransformer<EmbedProps<Props>>,
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
