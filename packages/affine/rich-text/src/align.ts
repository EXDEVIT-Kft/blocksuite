import { TextAlign } from '@blocksuite/affine-model';
import {
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
} from '@blocksuite/icons/lit';
import type { TemplateResult } from 'lit';

export interface TextAlignConfig {
  textAlign: TextAlign;
  name: string;
  hotkey: string[] | null;
  icon: TemplateResult<1>;
}

export const textAlignConfigs: TextAlignConfig[] = [
  {
    textAlign: TextAlign.Left,
    name: 'Balra igazítás',
    hotkey: [`Mod-Shift-L`],
    icon: TextAlignLeftIcon(),
  },
  {
    textAlign: TextAlign.Center,
    name: 'Középre igazítás',
    hotkey: [`Mod-Shift-E`],
    icon: TextAlignCenterIcon(),
  },
  {
    textAlign: TextAlign.Right,
    name: 'Jobbra igazítás',
    hotkey: [`Mod-Shift-R`],
    icon: TextAlignRightIcon(),
  },
];
