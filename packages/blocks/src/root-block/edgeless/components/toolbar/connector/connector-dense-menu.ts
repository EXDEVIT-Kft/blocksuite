import {
  ConnectorCWithArrowIcon,
  ConnectorIcon,
  ConnectorLWithArrowIcon,
  ConnectorXWithArrowIcon,
} from '@algogrind/affine-components/icons';
import { ConnectorMode } from '@algogrind/affine-model';
import { EditPropsStore } from '@algogrind/affine-shared/services';

import type { DenseMenuBuilder } from '../common/type.js';

export const buildConnectorDenseMenu: DenseMenuBuilder = edgeless => {
  const prevMode =
    edgeless.std.get(EditPropsStore).lastProps$.value.connector.mode;

  const isSelected = edgeless.tools.edgelessTool.type === 'connector';

  const createSelect =
    (mode: ConnectorMode, record = true) =>
    () => {
      edgeless.tools.setEdgelessTool({ type: 'connector', mode });
      record &&
        edgeless.std.get(EditPropsStore).recordLastProps('connector', { mode });
    };

  return {
    type: 'sub-menu',
    name: 'Összekötés',
    icon: ConnectorIcon,
    select: createSelect(prevMode, false),
    isSelected,
    options: {
      items: [
        {
          type: 'action',
          name: 'Íves',
          icon: ConnectorCWithArrowIcon,
          select: createSelect(ConnectorMode.Curve),
          isSelected: isSelected && prevMode === ConnectorMode.Curve,
        },
        {
          type: 'action',
          name: 'Szögletes',
          icon: ConnectorXWithArrowIcon,
          select: createSelect(ConnectorMode.Orthogonal),
          isSelected: isSelected && prevMode === ConnectorMode.Orthogonal,
        },
        {
          type: 'action',
          name: 'Egyenes',
          icon: ConnectorLWithArrowIcon,
          select: createSelect(ConnectorMode.Straight),
          isSelected: isSelected && prevMode === ConnectorMode.Straight,
        },
      ],
    },
  };
};
