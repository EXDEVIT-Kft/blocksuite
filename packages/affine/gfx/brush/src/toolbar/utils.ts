import { type Color, ColorScheme } from '@blocksuite/affine-model';
import type { ThemeService } from '@blocksuite/affine-shared/services';

/**
 * [ALGOGRIND] The stroke palettes persist CSS variable identifiers
 * (e.g. `--algogrind-palette-line-blue`) instead of concrete color values.
 * `adjustColorAlpha` can only parse concrete colors — a CSS variable name
 * would silently degrade to black — so resolve the identifier to concrete
 * per-theme colors first. The result is stored in the upstream
 * `{ light, dark }` format (hex8 after alpha adjustment), while the palette
 * identifiers themselves stay untouched for old documents.
 */
export function resolvePenColor(color: Color, theme: ThemeService): Color {
  if (typeof color !== 'string' || !color.startsWith('--')) {
    return color;
  }
  return {
    [ColorScheme.Light]: theme
      .getColorValue(color, undefined, true, ColorScheme.Light)
      .trim(),
    [ColorScheme.Dark]: theme
      .getColorValue(color, undefined, true, ColorScheme.Dark)
      .trim(),
  };
}
