import { menu } from '@algogrind/affine-components/context-menu';
import { FrameIcon } from '@algogrind/affine-components/icons';

import type { DenseMenuBuilder } from '../common/type.js';

import { FrameConfig } from './config.js';

export const buildFrameDenseMenu: DenseMenuBuilder = edgeless =>
  menu.subMenu({
    name: 'Keret',
    prefix: FrameIcon,
    select: () => edgeless.gfx.tool.setTool({ type: 'frame' }),
    isSelected: edgeless.gfx.tool.currentToolName$.peek() === 'frame',
    options: {
      items: [
        menu.action({
          name: 'Egyedi',
          select: () => edgeless.gfx.tool.setTool({ type: 'frame' }),
        }),
        ...FrameConfig.map(config =>
          menu.action({
            name: `Dia ${config.name}`,
            select: () => {
              edgeless.gfx.tool.setTool('default');
              edgeless.service.frame.createFrameOnViewportCenter(config.wh);
            },
          })
        ),
      ],
    },
  });
