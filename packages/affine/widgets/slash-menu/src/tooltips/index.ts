import type { SlashMenuTooltip } from '../types';
import { CopyTooltip } from './copy';
import { DeleteTooltip } from './delete';
import { MoveDownTooltip } from './move-down';
import { MoveUpTooltip } from './move-up';
import { NowTooltip } from './now';
import { TodayTooltip } from './today';
import { TomorrowTooltip } from './tomorrow';
import { YesterdayTooltip } from './yesterday';

export const slashMenuToolTips: Record<string, SlashMenuTooltip> = {
  Today: {
    figure: TodayTooltip,
    caption: 'Mai dátum',
  },

  Tomorrow: {
    figure: TomorrowTooltip,
    caption: 'Holnapi dátum',
  },

  Yesterday: {
    figure: YesterdayTooltip,
    caption: 'Tegnapi dátum',
  },

  Now: {
    figure: NowTooltip,
    caption: 'Jelenlegi idő',
  },

  'Move Up': {
    figure: MoveUpTooltip,
    caption: 'Felfele Mozgatás',
  },

  'Move Down': {
    figure: MoveDownTooltip,
    caption: 'Lefele Mozgatás',
  },

  Copy: {
    figure: CopyTooltip,
    caption: 'Másolás / Duplikálás',
  },

  Delete: {
    figure: DeleteTooltip,
    caption: 'Törlés',
  },
};
