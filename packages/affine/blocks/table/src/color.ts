import { cssVarV2 } from '@blocksuite/affine-shared/theme';
type Color = {
  name: string;
  color: string;
};
export const colorList: Color[] = [
  {
    name: 'Kék',
    color: cssVarV2.table.headerBackground.blue,
  },
  {
    name: 'Zöld',
    color: cssVarV2.table.headerBackground.green,
  },
  {
    name: 'Szürke',
    color: cssVarV2.table.headerBackground.grey,
  },
  {
    name: 'Narancs',
    color: cssVarV2.table.headerBackground.orange,
  },
  {
    name: 'Lila',
    color: cssVarV2.table.headerBackground.purple,
  },
  {
    name: 'Piros',
    color: cssVarV2.table.headerBackground.red,
  },
  {
    name: 'Türkizkék',
    color: cssVarV2.table.headerBackground.teal,
  },
  {
    name: 'Sárga',
    color: cssVarV2.table.headerBackground.yellow,
  },
];

const colorMap = Object.fromEntries(colorList.map(item => [item.color, item]));

export const getColorByColor = (color: string): Color | undefined => {
  return colorMap[color] ?? undefined;
};
