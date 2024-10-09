import type { Menu } from '@algogrind/affine-components/context-menu';

import { FrameIcon } from '@algogrind/affine-components/icons';

import type { DenseMenuBuilder } from '../common/type.js';

import { FrameConfig } from './config.js';

export const buildFrameDenseMenu: DenseMenuBuilder = edgeless => ({
  type: 'sub-menu',
  name: 'Keret',
  icon: FrameIcon,
  select: () => edgeless.tools.setEdgelessTool({ type: 'frame' }),
  isSelected: edgeless.tools.edgelessTool.type === 'frame',
  options: {
    items: [
      {
        type: 'action',
        name: 'Egyedi',
        select: () => edgeless.tools.setEdgelessTool({ type: 'frame' }),
      },
      ...FrameConfig.map(
        config =>
          ({
            type: 'action',
            name: `Dia ${config.name}`,
            select: () => {
              edgeless.tools.setEdgelessTool({ type: 'default' });
              edgeless.service.frame.createFrameOnViewportCenter(config.wh);
            },
          }) satisfies Menu
      ),
    ],
  },
});
