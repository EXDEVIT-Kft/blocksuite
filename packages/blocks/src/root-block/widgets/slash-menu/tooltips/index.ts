import type { TemplateResult } from 'lit';

import { AccordionTooltip } from './accordion.js';
import { AccordionTextTooltip } from './accordion-text.js';
import { AttachmentTooltip } from './attachment.js';
import { BoldTextTooltip } from './bold-text.js';
import { BulletedListTooltip } from './bulleted-list.js';
import { CodeBlockTooltip } from './code-block.js';
import { CopyTooltip } from './copy.js';
import { DeleteTooltip } from './delete.js';
import { DividerTooltip } from './divider.js';
import { EdgelessTooltip } from './edgeless.js';
import { EquationTooltip } from './equation.js';
import { FigmaTooltip } from './figma.js';
import { GithubRepoTooltip } from './github-repo.js';
import { Heading1Tooltip } from './heading-1.js';
import { Heading2Tooltip } from './heading-2.js';
import { Heading3Tooltip } from './heading-3.js';
import { Heading4Tooltip } from './heading-4.js';
import { Heading5Tooltip } from './heading-5.js';
import { Heading6Tooltip } from './heading-6.js';
import { ItalicTooltip } from './italic.js';
import { KanbanViewTooltip } from './kanban-view.js';
import { LineEquationTooltip } from './line-equation.js';
import { LinearTooltip } from './linear.js';
import { LinkTooltip } from './link.js';
import { LinkDocTooltip } from './link-doc.js';
import { MoveDownTooltip } from './move-down.js';
import { MoveUpTooltip } from './move-up.js';
import { NewDocTooltip } from './new-doc.js';
import { NowTooltip } from './now.js';
import { NumberedListTooltip } from './numbered-list.js';
import { PhotoTooltip } from './photo.js';
import { QuoteTooltip } from './quote.js';
import { StrikethroughTooltip } from './strikethrough.js';
import { TableViewTooltip } from './table-view.js';
import { TextTooltip } from './text.js';
import { ToDoListTooltip } from './to-do-list.js';
import { TodayTooltip } from './today.js';
import { TomorrowTooltip } from './tomorrow.js';
import { TweetTooltip } from './tweet.js';
import { UnderlineTooltip } from './underline.js';
import { YesterdayTooltip } from './yesterday.js';
import { YoutubeVideoTooltip } from './youtube-video.js';

export type SlashMenuTooltip = {
  figure: TemplateResult;
  caption: string;
};

export const slashMenuToolTips: Record<string, SlashMenuTooltip> = {
  Szöveg: {
    figure: TextTooltip,
    caption: 'Egyszerű szöveg',
  },

  'Címsor 1': {
    figure: Heading1Tooltip,
    caption: 'Címsor #1',
  },

  'Címsor 2': {
    figure: Heading2Tooltip,
    caption: 'Címsor #2',
  },

  'Címsor 3': {
    figure: Heading3Tooltip,
    caption: 'Címsor #3',
  },

  'Címsor 4': {
    figure: Heading4Tooltip,
    caption: 'Címsor #4',
  },

  'Címsor 5': {
    figure: Heading5Tooltip,
    caption: 'Címsor #5',
  },

  'Címsor 6': {
    figure: Heading6Tooltip,
    caption: 'Címsor #6',
  },

  'Kód Blokk': {
    figure: CodeBlockTooltip,
    caption: 'Formázott Kód Blokk',
  },

  Idézet: {
    figure: QuoteTooltip,
    caption: 'Idézet',
  },

  Elválasztó: {
    figure: DividerTooltip,
    caption: 'Elválasztó',
  },

  Felsorolás: {
    figure: BulletedListTooltip,
    caption: 'Felsorolás',
  },

  'Számozott Felsorolás': {
    figure: NumberedListTooltip,
    caption: 'Számozott Felsorolás',
  },

  'To-do Lista': {
    figure: ToDoListTooltip,
    caption: 'To-do Lista',
  },

  Félkövér: {
    figure: BoldTextTooltip,
    caption: 'Félkövér Szöveg',
  },

  Dőlt: {
    figure: ItalicTooltip,
    caption: 'Dőlt Szöveg',
  },

  Aláhúzott: {
    figure: UnderlineTooltip,
    caption: 'Aláhúzott Szöveg',
  },

  Áthúzott: {
    figure: StrikethroughTooltip,
    caption: 'Áthúzott Szöveg',
  },

  'Új Dokumentum': {
    figure: NewDocTooltip,
    caption: 'Új Dokumentum',
  },

  Hivatkozás: {
    figure: LinkDocTooltip,
    caption: 'Hivatkozás Dokumentumra',
  },

  Kép: {
    figure: PhotoTooltip,
    caption: 'Kép beszúrása',
  },

  Weboldal: {
    figure: LinkTooltip,
    caption: 'Weboldal hivatkozása',
  },

  Fájl: {
    figure: AttachmentTooltip,
    caption: 'Fájl beszúrása',
  },

  Github: {
    figure: GithubRepoTooltip,
    caption: 'GitHub Repo',
  },

  YouTube: {
    figure: YoutubeVideoTooltip,
    caption: 'YouTube Videó',
  },

  'X (Twitter)': {
    figure: TweetTooltip,
    caption: 'Tweet',
  },

  Figma: {
    figure: FigmaTooltip,
    caption: 'Figma',
  },

  Linear: {
    figure: LinearTooltip,
    caption: 'Linear',
  },

  Ma: {
    figure: TodayTooltip,
    caption: 'Mai dátum',
  },

  Holnap: {
    figure: TomorrowTooltip,
    caption: 'Holnapi dátum',
  },

  Tegnap: {
    figure: YesterdayTooltip,
    caption: 'Tegnapi dátum',
  },

  Most: {
    figure: NowTooltip,
    caption: 'Jelenlegi idő',
  },

  'Táblázat Nézet': {
    figure: TableViewTooltip,
    caption: 'Táblázat Nézet',
  },

  'Kanban Nézet': {
    figure: KanbanViewTooltip,
    caption: 'Kanban Nézet',
  },

  'Felfele Mozgatás': {
    figure: MoveUpTooltip,
    caption: 'Felfele Mozgatás',
  },

  'Lefele Mozgatás': {
    figure: MoveDownTooltip,
    caption: 'Lefele Mozgatás',
  },

  Másolás: {
    figure: CopyTooltip,
    caption: 'Másolás',
  },

  Duplikálás: {
    figure: CopyTooltip,
    caption: 'Duplikálás',
  },

  Törlés: {
    figure: DeleteTooltip,
    caption: 'Törlés',
  },

  'Csoport & Keret': {
    figure: EdgelessTooltip,
    caption: 'Vászon eszközök',
  },

  Egyenlet: {
    figure: EquationTooltip,
    caption: 'Egyenlet',
  },
  'Sorközi Egyenlet': {
    figure: LineEquationTooltip,
    caption: 'Sorközi Egyenlet',
  },

  'Összecsukható Címsor': {
    figure: AccordionTooltip,
    caption: 'Összecsukható Címsor',
  },

  'Összecsukható Szöveg': {
    figure: AccordionTextTooltip,
    caption: 'Összecsukható Szöveg',
  },
};
