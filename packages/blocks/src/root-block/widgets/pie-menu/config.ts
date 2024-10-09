import {
  ConnectorCWithArrowIcon,
  ConnectorIcon,
  ConnectorLWithArrowIcon,
  ConnectorXWithArrowIcon,
  DiamondIcon,
  EdgelessEraserLightIcon,
  EdgelessGeneralShapeIcon,
  EdgelessPenLightIcon,
  EllipseIcon,
  FrameIcon,
  FrameNavigatorIcon,
  GeneralStyleIcon,
  NoteIcon,
  ScribbledDiamondIcon,
  ScribbledEllipseIcon,
  ScribbledSquareIcon,
  ScribbledStyleIcon,
  ScribbledTriangleIcon,
  SelectIcon,
  SquareIcon,
  ToolsIcon,
  TriangleIcon,
  ViewBarIcon,
} from '@algogrind/affine-components/icons';
import {
  ConnectorMode,
  LINE_COLORS,
  SHAPE_FILL_COLORS,
  SHAPE_STROKE_COLORS,
  ShapeStyle,
  ShapeType,
} from '@algogrind/affine-model';
import {
  EditPropsStore,
  type LastProps,
} from '@algogrind/affine-shared/services';
import { isControlledKeyboardEvent } from '@algogrind/affine-shared/utils';
import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import type { PieMenuContext } from './base.js';

import {
  DEFAULT_NOTE_CHILD_FLAVOUR,
  DEFAULT_NOTE_CHILD_TYPE,
  DEFAULT_NOTE_TIP,
} from '../../edgeless/utils/consts.js';
import { PieMenuBuilder } from './pie-builder.js';
import {
  getActiveConnectorStrokeColor,
  getActiveShapeColor,
  setEdgelessToolAction,
  updateShapeOverlay,
} from './utils.js';

//----------------------------------------------------------
// EDGELESS TOOLS PIE MENU SCHEMA
//----------------------------------------------------------

export const AFFINE_PIE_MENU_ID_EDGELESS_TOOLS = 'affine:pie:edgeless:tools';

const pie = new PieMenuBuilder({
  id: AFFINE_PIE_MENU_ID_EDGELESS_TOOLS,
  label: 'Eszközök',
  icon: ToolsIcon,
  trigger: ({ keyEvent: ev, rootComponent }) => {
    if (isControlledKeyboardEvent(ev)) return false;
    const isEditing = rootComponent.service.selection.editing;

    return ev.key === 'q' && !isEditing;
  },
});

pie.expandableCommand({
  label: 'Toll',
  icon: EdgelessPenLightIcon,
  action: setEdgelessToolAction({ type: 'brush' }),
  submenus: pie => {
    pie.colorPicker({
      label: 'Toll Színe',
      active: getActiveConnectorStrokeColor,
      onChange: (color: string, { rootComponent }: PieMenuContext) => {
        rootComponent.std.get(EditPropsStore).recordLastProps('brush', {
          color: color as LastProps['brush']['color'],
        });
      },
      colors: LINE_COLORS.map(color => ({ color })),
    });
  },
});

pie.command({
  label: 'Radír',
  icon: EdgelessEraserLightIcon,
  action: setEdgelessToolAction({
    type: 'eraser',
  }),
});

pie.command({
  label: 'Keret',
  icon: FrameIcon,
  action: setEdgelessToolAction({
    type: 'frame',
  }),
});

pie.command({
  label: 'Kiválaszt',
  icon: SelectIcon,
  action: setEdgelessToolAction({
    type: 'default',
  }),
});

pie.command({
  label: 'Jegyzet',
  icon: NoteIcon,
  action: setEdgelessToolAction({
    type: 'affine:note',
    childFlavour: DEFAULT_NOTE_CHILD_FLAVOUR,
    childType: DEFAULT_NOTE_CHILD_TYPE,
    tip: DEFAULT_NOTE_TIP,
  }),
});

pie.command({
  label: 'Nagyítás Visszaállítása',
  icon: ViewBarIcon,
  action: ({ rootComponent }) => {
    rootComponent.service.zoomToFit();
  },
});

pie.command({
  label: 'Prezentálás',
  icon: ({ rootComponent }) => {
    const { type } = rootComponent.edgelessTool;
    if (type === 'frameNavigator') {
      return html`
        <span
          style="${styleMap({
            color: '#eb4335',
            fontWeight: 'bold',
          })}"
          >Stop</span
        >
      `;
    }

    return FrameNavigatorIcon;
  },
  action: ({ rootComponent }) => {
    const { type } = rootComponent.edgelessTool;
    if (type === 'frameNavigator') {
      rootComponent.tools.setEdgelessTool({ type: 'default' });

      if (document.fullscreenElement) {
        document.exitFullscreen().catch(console.error);
      }

      return;
    }

    rootComponent.tools.setEdgelessTool({
      type: 'frameNavigator',
      mode: 'fit',
    });
  },
});
// Connector submenu
pie.beginSubmenu({
  label: 'Összekötés',
  icon: ({ rootComponent }) => {
    const tool = rootComponent.edgelessTool;

    if (tool.type === 'connector') {
      switch (tool.mode) {
        case ConnectorMode.Orthogonal:
          return ConnectorLWithArrowIcon;
        case ConnectorMode.Curve:
          return ConnectorCWithArrowIcon;
        case ConnectorMode.Straight:
          return ConnectorXWithArrowIcon;
      }
    }
    return ConnectorIcon;
  },
});

pie.command({
  label: 'Íves',
  icon: ConnectorCWithArrowIcon,
  action: setEdgelessToolAction({
    type: 'connector',
    mode: ConnectorMode.Curve,
  }),
});

pie.command({
  label: 'Szögletes',
  icon: ConnectorXWithArrowIcon,
  action: setEdgelessToolAction({
    type: 'connector',
    mode: ConnectorMode.Orthogonal,
  }),
});

pie.command({
  label: 'Egyenes',
  icon: ConnectorLWithArrowIcon,
  action: setEdgelessToolAction({
    type: 'connector',
    mode: ConnectorMode.Straight,
  }),
});

pie.colorPicker({
  label: 'Vonal Színe',
  active: getActiveConnectorStrokeColor,
  onChange: (color: string, { rootComponent }: PieMenuContext) => {
    rootComponent.std.get(EditPropsStore).recordLastProps('connector', {
      stroke: color as LastProps['connector']['stroke'],
    });
  },
  colors: LINE_COLORS.map(color => ({ color })),
});

pie.endSubmenu();

// Shapes Submenu
pie.beginSubmenu({
  label: 'Alakzatok',
  icon: EdgelessGeneralShapeIcon,
});

const shapes = [
  {
    type: ShapeType.Rect,
    label: 'Négyzet',
    icon: (style: ShapeStyle) =>
      style === ShapeStyle.General ? SquareIcon : ScribbledSquareIcon,
  },
  {
    type: ShapeType.Ellipse,
    label: 'Ellipszis',
    icon: (style: ShapeStyle) =>
      style === ShapeStyle.General ? EllipseIcon : ScribbledEllipseIcon,
  },
  {
    type: ShapeType.Triangle,
    label: 'Háromszög',
    icon: (style: ShapeStyle) =>
      style === ShapeStyle.General ? TriangleIcon : ScribbledTriangleIcon,
  },
  {
    type: ShapeType.Diamond,
    label: 'Gyémánt',
    icon: (style: ShapeStyle) =>
      style === ShapeStyle.General ? DiamondIcon : ScribbledDiamondIcon,
  },
];

shapes.forEach(shape => {
  pie.command({
    label: shape.label,
    icon: ({ rootComponent }) => {
      const attributes =
        rootComponent.std.get(EditPropsStore).lastProps$.value[
          `shape:${shape.type}`
        ];
      return shape.icon(attributes.shapeStyle);
    },

    action: ({ rootComponent }) => {
      rootComponent.service.tool.setEdgelessTool({
        type: 'shape',
        shapeName: shape.type,
      });
      updateShapeOverlay(rootComponent);
    },
  });
});

pie.command({
  label: 'Stílus Állítása',
  icon: ({ rootComponent }) => {
    const { shapeStyle } =
      rootComponent.std.get(EditPropsStore).lastProps$.value[
        'shape:roundedRect'
      ];
    return shapeStyle === ShapeStyle.General
      ? ScribbledStyleIcon
      : GeneralStyleIcon;
  },

  action: ({ rootComponent }) => {
    const { shapeStyle } =
      rootComponent.std.get(EditPropsStore).lastProps$.value[
        'shape:roundedRect'
      ];
    const toggleType =
      shapeStyle === ShapeStyle.General
        ? ShapeStyle.Scribbled
        : ShapeStyle.General;

    rootComponent.std.get(EditPropsStore).recordLastProps('shape:roundedRect', {
      shapeStyle: toggleType,
    });

    updateShapeOverlay(rootComponent);
  },
});

pie.colorPicker({
  label: 'Kitöltés',
  active: getActiveShapeColor('fill'),
  onChange: (color: string, { rootComponent }: PieMenuContext) => {
    rootComponent.std.get(EditPropsStore).recordLastProps('shape:roundedRect', {
      fillColor: color as LastProps['shape:roundedRect']['fillColor'],
    });
    updateShapeOverlay(rootComponent);
  },
  colors: SHAPE_FILL_COLORS.map(color => ({ color })),
});

pie.colorPicker({
  label: 'Vonal',
  hollow: true,
  active: getActiveShapeColor('stroke'),
  onChange: (color: string, { rootComponent }: PieMenuContext) => {
    rootComponent.std.get(EditPropsStore).recordLastProps('shape:roundedRect', {
      strokeColor: color as LastProps['shape:roundedRect']['strokeColor'],
    });
    updateShapeOverlay(rootComponent);
  },
  colors: SHAPE_STROKE_COLORS.map(color => ({ color, name: 'Szín' })),
});

pie.endSubmenu();

export const edgelessToolsPieSchema = pie.build();
