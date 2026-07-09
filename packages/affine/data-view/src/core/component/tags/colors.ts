import { cssVarV2 } from '@toeverything/theme/v2';

export type SelectOptionColor = {
  oldColor: string;
  color: string;
  name: string;
};
export const selectOptionColors: SelectOptionColor[] = [
  {
    oldColor: 'var(--affine-tag-red)',
    color: cssVarV2('chip/label/red'),
    name: 'Piros',
  },
  {
    oldColor: 'var(--affine-tag-pink)',
    color: cssVarV2('chip/label/magenta'),
    name: 'Magenta',
  },
  {
    oldColor: 'var(--affine-tag-orange)',
    color: cssVarV2('chip/label/orange'),
    name: 'Narancs',
  },
  {
    oldColor: 'var(--affine-tag-yellow)',
    color: cssVarV2('chip/label/yellow'),
    name: 'Sárga',
  },
  {
    oldColor: 'var(--affine-tag-green)',
    color: cssVarV2('chip/label/green'),
    name: 'Zöld',
  },
  {
    oldColor: 'var(--affine-tag-teal)',
    color: cssVarV2('chip/label/teal'),
    name: 'Türkizkék',
  },
  {
    oldColor: 'var(--affine-tag-blue)',
    color: cssVarV2('chip/label/blue'),
    name: 'Kék',
  },
  {
    oldColor: 'var(--affine-tag-purple)',
    color: cssVarV2('chip/label/purple'),
    name: 'Lila',
  },
  {
    oldColor: 'var(--affine-tag-gray)',
    color: cssVarV2('chip/label/grey'),
    name: 'Szürke',
  },
  {
    oldColor: 'var(--affine-tag-white)',
    color: cssVarV2('chip/label/white'),
    name: 'Fehér',
  },
];

const oldColorMap = Object.fromEntries(
  selectOptionColors.map(tag => [tag.oldColor, tag.color])
);

export const getColorByColor = (color: string) => {
  if (color.startsWith('--affine-tag')) {
    return oldColorMap[color] ?? color;
  }
  return color;
};

/** select tag color poll */
const selectTagColorPoll = selectOptionColors.map(color => color.color);

function tagColorHelper() {
  let colors = [...selectTagColorPoll];
  return (): string => {
    if (colors.length === 0) {
      colors = [...selectTagColorPoll];
    }
    const index = Math.floor(Math.random() * colors.length);
    const color = colors.splice(index, 1)[0];
    if (!color) return '';
    return color;
  };
}

export const getTagColor = tagColorHelper();
