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
// [ALGOGRIND] use the custom fork icon for the equation block (fork parity)
import { EquationBlockIcon } from '@blocksuite/affine-editor-icons';
import type { TemplateResult } from 'lit';

/**
 * Text primitive entries used in slash menu and format bar,
 * which are also used for registering hotkeys for converting block flavours.
 */
export interface TextConversionConfig {
  flavour: string;
  type?: string;
  name: string;
  description?: string;
  hotkey: string[] | null;
  icon: TemplateResult<1>;
  searchAlias?: string[];
}

export const textConversionConfigs: TextConversionConfig[] = [
  {
    flavour: 'affine:paragraph',
    type: 'text',
    name: 'Szöveg',
    description: 'Kezdj el sima szöveget gépelni.',
    searchAlias: ['text', 'paragraph'],
    hotkey: [`Mod-Alt-0`, `Mod-Shift-0`],
    icon: TextIcon,
  },
  {
    flavour: 'affine:paragraph',
    type: 'h1',
    name: 'Címsor 1',
    description: 'Legnagyobb betűméretű címsor.',
    searchAlias: ['h1', 'heading 1'],
    hotkey: [`Mod-Alt-1`, `Mod-Shift-1`],
    icon: Heading1Icon,
  },
  {
    flavour: 'affine:paragraph',
    type: 'h2',
    name: 'Címsor 2',
    description: '2. legnagyobb betűméretű címsor.',
    searchAlias: ['h2', 'heading 2'],
    hotkey: [`Mod-Alt-2`, `Mod-Shift-2`],
    icon: Heading2Icon,
  },
  {
    flavour: 'affine:paragraph',
    type: 'h3',
    name: 'Címsor 3',
    description: '3. legnagyobb betűméretű címsor.',
    searchAlias: ['h3', 'heading 3'],
    hotkey: [`Mod-Alt-3`, `Mod-Shift-3`],
    icon: Heading3Icon,
  },
  {
    flavour: 'affine:paragraph',
    type: 'h4',
    name: 'Címsor 4',
    description: '4. legnagyobb betűméretű címsor.',
    searchAlias: ['h4', 'heading 4'],
    hotkey: [`Mod-Alt-4`, `Mod-Shift-4`],
    icon: Heading4Icon,
  },
  {
    flavour: 'affine:paragraph',
    type: 'h5',
    name: 'Címsor 5',
    description: '5. legnagyobb betűméretű címsor.',
    searchAlias: ['h5', 'heading 5'],
    hotkey: [`Mod-Alt-5`, `Mod-Shift-5`],
    icon: Heading5Icon,
  },
  {
    flavour: 'affine:paragraph',
    type: 'h6',
    name: 'Címsor 6',
    description: '6. legnagyobb betűméretű címsor.',
    searchAlias: ['h6', 'heading 6'],
    hotkey: [`Mod-Alt-6`, `Mod-Shift-6`],
    icon: Heading6Icon,
  },
  {
    flavour: 'affine:list',
    type: 'bulleted',
    name: 'Felsorolás',
    description: 'Hozz létre egy szimpla listát.',
    searchAlias: ['lista', 'bulleted list'],
    hotkey: [`Mod-Alt-8`, `Mod-Shift-8`],
    icon: BulletedListIcon,
  },
  {
    flavour: 'affine:list',
    type: 'numbered',
    name: 'Számozott Felsorolás',
    description: 'Hozz létre egy számozott listát.',
    searchAlias: ['lista', 'numbered list'],
    hotkey: [`Mod-Alt-9`, `Mod-Shift-9`],
    icon: NumberedListIcon,
  },
  {
    flavour: 'affine:list',
    type: 'todo',
    name: 'To-do Lista',
    description: 'Új teendő feladat létrehozása.',
    searchAlias: ['todo list', 'teendő', 'checkbox'],
    hotkey: null,
    icon: CheckBoxIcon,
  },
  {
    flavour: 'affine:code',
    type: undefined,
    name: 'Kód Blokk',
    description: 'Kódrészlet beszúrása formázással.',
    searchAlias: ['code', 'programming'],
    hotkey: [`Mod-Alt-c`],
    icon: CodeBlockIcon,
  },
  {
    flavour: 'affine:latex',
    type: undefined,
    name: 'Egyenlet',
    description: 'Hozz létre egy új egyenlet blokkot.',
    hotkey: null,
    icon: EquationBlockIcon({ width: '20', height: '20' }),
    searchAlias: [
      'mathBlock',
      'equationBlock',
      'latexBlock',
      'equation',
      'matematika',
      'latex',
    ],
  },
  {
    flavour: 'affine:paragraph',
    type: 'quote',
    name: 'Idézet',
    description: 'Szöveg kiemelése idézettel.',
    searchAlias: ['quote'],
    hotkey: null,
    icon: QuoteIcon,
  },
  {
    flavour: 'affine:divider',
    type: 'divider',
    name: 'Elválasztó',
    description: 'Válaszd el tartalmaid vizuálisan.',
    searchAlias: ['divider', 'vonal', 'vízszintes'],
    hotkey: [`Mod-Alt-d`, `Mod-Shift-d`],
    icon: DividerIcon,
  },
];
