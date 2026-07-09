import { insertInlineLatex } from '@blocksuite/affine-inline-latex';
import {
  getSelectedModelsCommand,
  getTextSelectionCommand,
} from '@blocksuite/affine-shared/commands';
import { type SlashMenuConfig } from '@blocksuite/affine-widget-slash-menu';
import { TeXIcon } from '@blocksuite/icons/lit';

import { insertLatexBlockCommand } from '../commands';
import { LatexTooltip } from './tooltips';

export const latexSlashMenuConfig: SlashMenuConfig = {
  items: [
    {
      name: 'Sorközi Egyenlet',
      group: '0_Alapvető@8',
      description: 'Szúrj be egy új sorközi egyenletet.',
      icon: TeXIcon(),
      tooltip: {
        figure: LatexTooltip(
          'Energia. Tömeg. Fény. Egyetlen egyenletben,',
          'E=mc^2',
          false
        ),
        caption: 'Sorközi Egyenlet',
      },
      searchAlias: [
        'inlineMath, inlineEquation',
        'inlineLatex',
        'matematika',
        'számolás',
        'latex',
      ],
      action: ({ std }) => {
        std.command
          .chain()
          .pipe(getTextSelectionCommand)
          .pipe(insertInlineLatex)
          .run();
      },
    },
    {
      name: 'Egyenlet',
      description: 'Hozz létre egy új egyenlet blokkot.',
      icon: TeXIcon(),
      tooltip: {
        figure: LatexTooltip(
          'Hozz létre egy egyenletet LaTeX segítségével.',
          String.raw`\frac{a}{b} \pm \frac{c}{d} = \frac{ad \pm bc}{bd}`,
          true
        ),
        caption: 'Egyenlet',
      },
      searchAlias: [
        'mathBlock, equationBlock',
        'latexBlock',
        'equation',
        'matematika',
        'latex',
      ],
      group: '4_Tartalom & Média@10',
      action: ({ std }) => {
        std.command
          .chain()
          .pipe(getSelectedModelsCommand)
          .pipe(insertLatexBlockCommand, {
            place: 'after',
            removeEmptyLine: true,
          })
          .run();
      },
    },
  ],
};
