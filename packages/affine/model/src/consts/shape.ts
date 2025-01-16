import { z } from 'zod';

import { LINE_COLORS, LineColor } from './line.js';

export const DEFAULT_ROUGHNESS = 1.4;

// TODO: need to check the default central area ratio
export const DEFAULT_CENTRAL_AREA_RATIO = 0.3;

export enum ShapeTextFontSize {
  LARGE = 28,
  MEDIUM = 20,
  SMALL = 12,
  XLARGE = 36,
}

export enum ShapeType {
  Diamond = 'diamond',
  Ellipse = 'ellipse',
  Rect = 'rect',
  Triangle = 'triangle',
}

export type ShapeName = ShapeType | 'roundedRect';

export function getShapeName(type: ShapeType, radius: number): ShapeName {
  if (type === ShapeType.Rect && radius > 0) {
    return 'roundedRect';
  }
  return type;
}

export function getShapeType(name: ShapeName): ShapeType {
  if (name === 'roundedRect') {
    return ShapeType.Rect;
  }
  return name;
}

export function getShapeRadius(name: ShapeName): number {
  if (name === 'roundedRect') {
    return 0.1;
  }
  return 0;
}

export enum ShapeStyle {
  General = 'General', // -> 'Letisztult'
  Scribbled = 'Scribbled', // -> 'Rajzolt'
}

export enum ShapeFillColor {
  Black = '--algogrind-palette-shape-black',
  Blue = '--algogrind-palette-shape-blue',
  Green = '--algogrind-palette-shape-green',
  Grey = '--algogrind-palette-shape-grey',
  Lime = ' --algogrind-palette-shape-lime',
  Magenta = '--algogrind-palette-shape-pink',
  Orange = '--algogrind-palette-shape-orange',
  Purple = '--algogrind-palette-shape-purple',
  Red = '--algogrind-palette-shape-red',
  Teal = '--algogrind-palette-shape-teal',
  White = '--algogrind-palette-shape-white',
  Yellow = '--algogrind-palette-shape-yellow',
}

export const SHAPE_FILL_COLORS = [
  ShapeFillColor.Red,
  ShapeFillColor.Orange,
  ShapeFillColor.Yellow,
  ShapeFillColor.Lime,
  ShapeFillColor.Green,
  ShapeFillColor.Teal,
  ShapeFillColor.Blue,
  ShapeFillColor.Purple,
  ShapeFillColor.Magenta,
  ShapeFillColor.Grey,
  ShapeFillColor.Black,
  ShapeFillColor.White,
] as const;

export const DEFAULT_SHAPE_FILL_COLOR = ShapeFillColor.Yellow;

export const FillColorsSchema = z.nativeEnum(ShapeFillColor);

export const SHAPE_STROKE_COLORS = LINE_COLORS;

export const DEFAULT_SHAPE_STROKE_COLOR = LineColor.Yellow;

export const DEFAULT_SHAPE_TEXT_COLOR = LineColor.Black;

export const StrokeColorsSchema = z.nativeEnum(LineColor);
