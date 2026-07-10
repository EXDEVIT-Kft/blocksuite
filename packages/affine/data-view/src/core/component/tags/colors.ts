export type SelectOptionColor = {
  oldColor: string;
  color: string;
  name: string;
};
export const selectOptionColors: SelectOptionColor[] = [
  {
    oldColor: 'var(--affine-tag-red)',
    color: 'var(--algogrind-text-highlight-red)',
    name: 'Piros',
  },
  {
    oldColor: 'var(--affine-tag-orange)',
    color: 'var(--algogrind-text-highlight-orange)',
    name: 'Narancs',
  },
  {
    oldColor: 'var(--affine-tag-yellow)',
    color: 'var(--algogrind-text-highlight-yellow)',
    name: 'Sárga',
  },
  {
    oldColor: 'var(--affine-tag-green)',
    color: 'var(--algogrind-text-highlight-green)',
    name: 'Zöld',
  },
  {
    oldColor: 'var(--affine-tag-teal)',
    color: 'var(--algogrind-text-highlight-teal)',
    name: 'Türkizkék',
  },
  {
    oldColor: 'var(--affine-tag-blue)',
    color: 'var(--algogrind-text-highlight-blue)',
    name: 'Kék',
  },
  {
    oldColor: 'var(--affine-tag-purple)',
    color: 'var(--algogrind-text-highlight-purple)',
    name: 'Lila',
  },
  {
    oldColor: 'var(--affine-tag-pink)',
    color: 'var(--algogrind-text-highlight-pink)',
    name: 'Pink',
  },
  {
    oldColor: 'var(--affine-tag-gray)',
    color: 'var(--algogrind-text-highlight-grey)',
    name: 'Szürke',
  },
  {
    oldColor: 'var(--affine-tag-white)',
    color: 'var(--algogrind-note-background-white)',
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
