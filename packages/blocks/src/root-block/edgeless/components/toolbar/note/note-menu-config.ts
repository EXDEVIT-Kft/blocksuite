import type { TemplateResult } from 'lit';

import {
  BulletedListIcon,
  CheckBoxIcon,
  CodeBlockIcon,
  DividerIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
  NumberedListIcon,
  QuoteIcon,
  TextIcon,
} from '@blocksuite/affine-components/icons';

import type { NoteChildrenFlavour } from '../../../../../_common/utils/index.js';

export const BUTTON_GROUP_LENGTH = 10;

export type NoteMenuItem = {
  icon: TemplateResult<1>;
  tooltip: string;
  childFlavour: NoteChildrenFlavour;
  childType: string | null;
};

const LIST_ITEMS = [
  {
    flavour: 'affine:list',
    type: 'bulleted',
    name: 'Felsorolás',
    description: 'Hozz létre egy szimpla listát.',
    icon: BulletedListIcon,
    tooltip: 'Húzz/Kattints egy szimpla Felsorolás beszúrásához',
  },
  {
    flavour: 'affine:list',
    type: 'numbered',
    name: 'Számozott Felsorolás',
    description: 'Hozz létre egy számozott listát.',
    icon: NumberedListIcon,
    tooltip: 'Húzz/Kattints egy Számozott Felsorolás beszúrásához',
  },
  {
    flavour: 'affine:list',
    type: 'todo',
    name: 'To-do Lista',
    description: 'Új teendő feladat létrehozása.',
    icon: CheckBoxIcon,
    tooltip: 'Húzz/Kattints egy To-do Lista beszúrásához',
  },
];

const TEXT_ITEMS = [
  {
    flavour: 'affine:paragraph',
    type: 'text',
    name: 'Szöveg',
    description: 'Kezdj el sima szöveget gépelni.',
    icon: TextIcon,
    tooltip: 'Húzz/Kattints egy Szöveges blokk beszúrásához',
  },
  {
    flavour: 'affine:paragraph',
    type: 'h1',
    name: 'Címsor 1',
    description: 'Legnagyobb betűméretű címsor.',
    icon: Heading1Icon,
    tooltip: 'Húzz/Kattints egy Címsor 1 blokk beszúrásához',
  },
  {
    flavour: 'affine:paragraph',
    type: 'h2',
    name: 'Címsor 2',
    description: '2. legnagyobb betűméretű címsor.',
    icon: Heading2Icon,
    tooltip: 'Húzz/Kattints egy Címsor 2 blokk beszúrásához',
  },
  {
    flavour: 'affine:paragraph',
    type: 'h3',
    name: 'Címsor 3',
    description: '3. legnagyobb betűméretű címsor.',
    icon: Heading3Icon,
    tooltip: 'Húzz/Kattints egy Címsor 3 blokk beszúrásához',
  },
  {
    flavour: 'affine:paragraph',
    type: 'h4',
    name: 'Címsor 4',
    description: '4. legnagyobb betűméretű címsor.',
    icon: Heading4Icon,
    tooltip: 'Húzz/Kattints egy Címsor 4 blokk beszúrásához',
  },
  {
    flavour: 'affine:paragraph',
    type: 'h5',
    name: 'Címsor 5',
    description: '5. legnagyobb betűméretű címsor.',
    icon: Heading5Icon,
    tooltip: 'Húzz/Kattints egy Címsor 5 blokk beszúrásához',
  },
  {
    flavour: 'affine:paragraph',
    type: 'h6',
    name: 'Címsor 6',
    description: '6. legnagyobb betűméretű címsor.',
    icon: Heading6Icon,
    tooltip: 'Húzz/Kattints egy Címsor 6 blokk beszúrásához',
  },
  {
    flavour: 'affine:code',
    type: 'code',
    name: 'Kód Blokk',
    description: 'Kódrészlet beszúrása formázással.',
    icon: CodeBlockIcon,
    tooltip: 'Húzz/Kattints egy Kód Blokk beszúrásához',
  },
  {
    flavour: 'affine:paragraph',
    type: 'quote',
    name: 'Idézet',
    description: 'Szöveg kiemelése idézettel.',
    icon: QuoteIcon,
    tooltip: 'Húzz/Kattints egy Idézet blokk beszúrásához',
  },
  {
    flavour: 'affine:divider',
    type: null,
    name: 'Elválasztó',
    description: 'Válaszd el tartalmaid vizuálisan.',
    icon: DividerIcon,
    tooltip: 'Húzz/Kattints egy Elválasztó blokk beszúrásához',
  },
];

// TODO: add image, bookmark, database blocks
export const NOTE_MENU_ITEMS = TEXT_ITEMS.concat(LIST_ITEMS)
  .filter(item => item.name !== 'Elválasztó')
  .map(item => {
    return {
      icon: item.icon,
      tooltip:
        item.type !== 'text'
          ? item.tooltip
              .replace('Húzz/Kattints egy ', '')
              .replace(' blokk beszúrásához', '')
              .replace(' beszúrásához', '')
              .replace('szimpla', '')
          : 'Szöveg',
      childFlavour: item.flavour as NoteChildrenFlavour,
      childType: item.type,
    } as NoteMenuItem;
  });
