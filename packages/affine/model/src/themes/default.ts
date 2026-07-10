import type { Palette, Theme } from './types';
import { buildPalettes, getColorByKey, pureBlack, pureWhite } from './utils';

const Transparent = 'transparent';
const White = getColorByKey('edgeless/palette/white');
const Black = getColorByKey('edgeless/palette/black');

// [ALGOGRIND]
// The palettes below are wired to the `--algogrind-*` CSS variables provided
// by the host application (see also `algogrindEdgelessLightColors` /
// `algogrindEdgelessDarkColors` in `@blocksuite/affine-shared/theme`, which
// the theme-service uses to resolve these variables on canvas).

// Pastel palette used for shape fills.
const Light = {
  Red: '--algogrind-palette-shape-red',
  Orange: '--algogrind-palette-shape-orange',
  Yellow: '--algogrind-palette-shape-yellow',
  Lime: '--algogrind-palette-shape-lime',
  Green: '--algogrind-palette-shape-green',
  Teal: '--algogrind-palette-shape-teal',
  Blue: '--algogrind-palette-shape-blue',
  Purple: '--algogrind-palette-shape-purple',
  Magenta: '--algogrind-palette-shape-pink',
  Grey: '--algogrind-palette-shape-grey',
} as const;

// Saturated palette used for lines, strokes and text.
const Medium = {
  Red: '--algogrind-palette-line-red',
  Orange: '--algogrind-palette-line-orange',
  Yellow: '--algogrind-palette-line-yellow',
  Lime: '--algogrind-palette-line-lime',
  Green: '--algogrind-palette-line-green',
  Teal: '--algogrind-palette-line-teal',
  Blue: '--algogrind-palette-line-blue',
  Purple: '--algogrind-palette-line-purple',
  Magenta: '--algogrind-palette-line-pink',
  Grey: '--algogrind-palette-line-grey',
} as const;

const LineBlack = '--algogrind-palette-line-black';
const LineWhite = '--algogrind-palette-line-white';
const ShapeBlack = '--algogrind-palette-shape-black';
const ShapeWhite = '--algogrind-palette-shape-white';

const NoteBackgroundColorMap = {
  Red: '--algogrind-note-background-red',
  Orange: '--algogrind-note-background-orange',
  Yellow: '--algogrind-note-background-yellow',
  Green: '--algogrind-note-background-green',
  Teal: '--algogrind-note-background-teal',
  Blue: '--algogrind-note-background-blue',
  Purple: '--algogrind-note-background-purple',
  Magenta: '--algogrind-note-background-pink',
  Grey: '--algogrind-note-background-grey',
  Black: '--algogrind-note-background-black',
  White: '--algogrind-note-background-white',
} as const;

const Palettes: Palette[] = [
  // Light (pastel)
  ...buildPalettes(Light, 'Light'),

  { key: 'Transparent', value: Transparent },

  // Medium (saturated)
  ...buildPalettes(Medium, 'Medium'),

  { key: 'White', value: LineWhite },
  { key: 'Black', value: LineBlack },
] as const;

const NoteBackgroundColorPalettes: Palette[] = [
  ...buildPalettes(NoteBackgroundColorMap),
] as const;

const StrokeColorShortMap = {
  ...Medium,
  Black: LineBlack,
  White: LineWhite,
} as const;

const StrokeColorShortPalettes: Palette[] = [
  ...buildPalettes(StrokeColorShortMap),
] as const;

const FillColorShortMap = {
  ...Light,
  Black: ShapeBlack,
  White: ShapeWhite,
  Transparent,
} as const;

const FillColorShortPalettes: Palette[] = [
  ...buildPalettes(FillColorShortMap),
] as const;

const ShapeTextColorShortMap = {
  ...Medium,
  Black: pureBlack,
  White: pureWhite,
} as const;

const ShapeTextColorShortPalettes: Palette[] = [
  ...buildPalettes({ ...ShapeTextColorShortMap }),
] as const;

const ShapeTextColorPalettes: Palette[] = [
  // Light (pastel)
  ...buildPalettes(Light, 'Light'),

  { key: 'Transparent', value: Transparent },

  // Medium (saturated)
  ...buildPalettes(Medium, 'Medium'),

  { key: 'White', value: pureWhite },
  { key: 'Black', value: pureBlack },
] as const;

export const DefaultTheme: Theme = {
  pureBlack,
  pureWhite,
  black: Black,
  white: White,
  transparent: Transparent,
  textColor: Medium.Blue,
  shapeTextColor: LineBlack,
  shapeStrokeColor: Medium.Yellow,
  shapeFillColor: Light.Yellow,
  connectorColor: Medium.Grey,
  noteBackgrounColor: NoteBackgroundColorMap.White,
  // 30% transparent `Medium.Blue`
  hightlighterColor: '#84cfff4d',
  Palettes,
  ShapeTextColorPalettes,
  NoteBackgroundColorMap,
  NoteBackgroundColorPalettes,
  StrokeColorShortMap,
  StrokeColorShortPalettes,
  FillColorShortMap,
  FillColorShortPalettes,
  ShapeTextColorShortMap,
  ShapeTextColorShortPalettes,
} as const;
