import { z } from 'zod';

import { createEnumMap } from '../utils/enum.js';

export const NOTE_MIN_WIDTH = 450 + 24 * 2;
export const NOTE_MIN_HEIGHT = 92;

export const DEFAULT_NOTE_WIDTH = NOTE_MIN_WIDTH;
export const DEFAULT_NOTE_HEIGHT = NOTE_MIN_HEIGHT;

export enum NoteBackgroundColor {
  Black = '--algogrind-note-background-black',
  Blue = '--algogrind-note-background-blue',
  Green = '--algogrind-note-background-green',
  Grey = '--algogrind-note-background-grey',
  Magenta = '--algogrind-note-background-pink',
  Orange = '--algogrind-note-background-orange',
  Purple = '--algogrind-note-background-purple',
  Red = '--algogrind-note-background-red',
  Teal = '--algogrind-note-background-teal',
  White = '--algogrind-note-background-white',
  Yellow = '--algogrind-note-background-yellow',
}

export const NoteBackgroundColorMap = createEnumMap(NoteBackgroundColor);

export const NOTE_BACKGROUND_COLORS = [
  NoteBackgroundColor.Red,
  NoteBackgroundColor.Orange,
  NoteBackgroundColor.Yellow,
  NoteBackgroundColor.Green,
  NoteBackgroundColor.Teal,
  NoteBackgroundColor.Blue,
  NoteBackgroundColor.Purple,
  NoteBackgroundColor.Magenta,
  NoteBackgroundColor.Grey,
  NoteBackgroundColor.Black,
  NoteBackgroundColor.White,
] as const;

export const DEFAULT_NOTE_BACKGROUND_COLOR = NoteBackgroundColor.White;

export const NoteBackgroundColorsSchema = z.nativeEnum(NoteBackgroundColor);

export enum NoteShadow {
  Box = '--affine-note-shadow-box',
  Film = '--affine-note-shadow-film',
  Float = '--affine-note-shadow-float',
  None = '',
  Paper = '--affine-note-shadow-paper',
  Sticker = '--affine-note-shadow-sticker',
}

export const NoteShadowMap = createEnumMap(NoteShadow);

export const NOTE_SHADOWS = [
  NoteShadow.None,
  NoteShadow.Box,
  NoteShadow.Sticker,
  NoteShadow.Paper,
  NoteShadow.Float,
  NoteShadow.Film,
] as const;

export const DEFAULT_NOTE_SHADOW = NoteShadow.Box;

export const NoteShadowsSchema = z.nativeEnum(NoteShadow);

export enum NoteDisplayMode {
  DocAndEdgeless = 'both',
  DocOnly = 'doc',
  EdgelessOnly = 'edgeless',
}

export enum StrokeStyle {
  Dash = 'dash',
  None = 'none',
  Solid = 'solid',
}

export const DEFAULT_NOTE_BORDER_STYLE = StrokeStyle.None;

export const StrokeStyleMap = createEnumMap(StrokeStyle);

export enum NoteCorners {
  Huge = 32,
  Large = 24,
  Medium = 16,
  None = 0,
  Small = 8,
}

export const NoteCornersMap = createEnumMap(NoteCorners);

export const NOTE_CORNERS = [
  NoteCorners.None,
  NoteCorners.Small,
  NoteCorners.Medium,
  NoteCorners.Large,
  NoteCorners.Huge,
] as const;

export const DEFAULT_NOTE_CORNER = NoteCorners.Small;

export const NoteCornersSchema = z.nativeEnum(NoteCorners);

export const DEFAULT_NOTE_BORDER_SIZE = 4;
