import { z } from 'zod';

import { createEnumMap } from '../utils/enum.js';

export enum LineWidth {
  Eight = 8,
  // Thin
  Four = 4,
  Six = 6,
  // Thick
  Ten = 10,
  Twelve = 12,
  Two = 2,
}

export enum LineColor {
  Black = '--algogrind-palette-line-black',
  Blue = '--algogrind-palette-line-blue',
  Green = '--algogrind-palette-line-green',
  Grey = '--algogrind-palette-line-grey',
  Lime = '--algogrind-palette-line-lime',
  Magenta = '--algogrind-palette-line-pink',
  Orange = '--algogrind-palette-line-orange',
  Purple = '--algogrind-palette-line-purple',
  Red = '--algogrind-palette-line-red',
  Teal = '--algogrind-palette-line-teal',
  White = '--algogrind-palette-line-white',
  Yellow = '--algogrind-palette-line-yellow',
}

export const LineColorMap = createEnumMap(LineColor);

export const LINE_COLORS = [
  LineColor.Red,
  LineColor.Orange,
  LineColor.Yellow,
  LineColor.Lime,
  LineColor.Green,
  LineColor.Teal,
  LineColor.Blue,
  LineColor.Purple,
  LineColor.Magenta,
  LineColor.Grey,
  LineColor.Black,
  LineColor.White,
] as const;

export const LineColorsSchema = z.nativeEnum(LineColor);
