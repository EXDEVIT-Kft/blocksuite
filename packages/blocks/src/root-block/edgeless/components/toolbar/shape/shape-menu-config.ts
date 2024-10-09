import type { TemplateResult } from 'lit';

import {
  DiamondIcon,
  EllipseIcon,
  RoundedRectangleIcon,
  ScribbledDiamondIcon,
  ScribbledEllipseIcon,
  ScribbledRoundedRectangleIcon,
  ScribbledSquareIcon,
  ScribbledTriangleIcon,
  SquareIcon,
  TriangleIcon,
} from '@algogrind/affine-components/icons';
import { ShapeType } from '@algogrind/affine-model';

import type { ShapeTool } from '../../../tools/shape-tool.js';

type Config = {
  name: ShapeTool['shapeName'];
  generalIcon: TemplateResult<1>;
  scribbledIcon: TemplateResult<1>;
  tooltip: string;
  disabled: boolean;
};

export const ShapeComponentConfig: Config[] = [
  {
    name: ShapeType.Rect,
    generalIcon: SquareIcon,
    scribbledIcon: ScribbledSquareIcon,
    tooltip: 'Négyzet',
    disabled: false,
  },
  {
    name: ShapeType.Ellipse,
    generalIcon: EllipseIcon,
    scribbledIcon: ScribbledEllipseIcon,
    tooltip: 'Ellipszis',
    disabled: false,
  },
  {
    name: ShapeType.Diamond,
    generalIcon: DiamondIcon,
    scribbledIcon: ScribbledDiamondIcon,
    tooltip: 'Gyémánt',
    disabled: false,
  },
  {
    name: ShapeType.Triangle,
    generalIcon: TriangleIcon,
    scribbledIcon: ScribbledTriangleIcon,
    tooltip: 'Háromszög',
    disabled: false,
  },
  {
    name: 'roundedRect',
    generalIcon: RoundedRectangleIcon,
    scribbledIcon: ScribbledRoundedRectangleIcon,
    tooltip: 'Lekerekített Négyzet',
    disabled: false,
  },
];

export const ShapeComponentConfigMap = ShapeComponentConfig.reduce(
  (acc, config) => {
    acc[config.name] = config;
    return acc;
  },
  {} as Record<Config['name'], Config>
);

export const SHAPE_COLOR_PREFIX = '--affine-palette-shape-';
export const LINE_COLOR_PREFIX = '--affine-palette-line-';
