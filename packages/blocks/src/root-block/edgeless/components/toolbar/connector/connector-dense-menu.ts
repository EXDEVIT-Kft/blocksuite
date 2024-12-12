import { menu } from '@blocksuite/affine-components/context-menu';
import {
  ConnectorCWithArrowIcon,
  ConnectorIcon,
  ConnectorLWithArrowIcon,
  ConnectorXWithArrowIcon,
} from '@blocksuite/affine-components/icons';
import { ConnectorMode } from '@blocksuite/affine-model';
import { EditPropsStore } from '@blocksuite/affine-shared/services';

import type { DenseMenuBuilder } from '../common/type.js';

export const buildConnectorDenseMenu: DenseMenuBuilder = edgeless => {
  const prevMode =
    edgeless.std.get(EditPropsStore).lastProps$.value.connector.mode;

  const isSelected = edgeless.gfx.tool.currentToolName$.peek() === 'connector';

  const createSelect =
    (mode: ConnectorMode, record = true) =>
    () => {
      edgeless.gfx.tool.setTool('connector', {
        mode,
      });
      record &&
        edgeless.std.get(EditPropsStore).recordLastProps('connector', { mode });
    };

  return menu.subMenu({
    name: 'Összekötés',
    prefix: ConnectorIcon,
    select: createSelect(prevMode, false),
    isSelected,
    options: {
      items: [
        menu.action({
          name: 'Íves',
          prefix: ConnectorCWithArrowIcon,
          select: createSelect(ConnectorMode.Curve),
          isSelected: isSelected && prevMode === ConnectorMode.Curve,
        }),
        menu.action({
          name: 'Szögletes',
          prefix: ConnectorXWithArrowIcon,
          select: createSelect(ConnectorMode.Orthogonal),
          isSelected: isSelected && prevMode === ConnectorMode.Orthogonal,
        }),
        menu.action({
          name: 'Egyenes',
          prefix: ConnectorLWithArrowIcon,
          select: createSelect(ConnectorMode.Straight),
          isSelected: isSelected && prevMode === ConnectorMode.Straight,
        }),
      ],
    },
  });
};
