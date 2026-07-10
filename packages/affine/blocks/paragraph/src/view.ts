import {
  type ViewExtensionContext,
  ViewExtensionProvider,
} from '@blocksuite/affine-ext-loader';
import { ParagraphBlockModel } from '@blocksuite/affine-model';
import { BlockViewExtension, FlavourExtension } from '@blocksuite/std';
import { literal } from 'lit/static-html.js';
import { z } from 'zod';

import { effects } from './effects';
import { ParagraphMarkdownExtension } from './markdown.js';
import { ParagraphBlockConfigExtension } from './paragraph-block-config.js';
import {
  ParagraphKeymapExtension,
  ParagraphTextKeymapExtension,
} from './paragraph-keymap.js';

const placeholders = {
  text: "Írj be egy '/' jelet az utasításokért...",
  h1: 'Címsor 1',
  h2: 'Címsor 2',
  h3: 'Címsor 3',
  h4: 'Címsor 4',
  h5: 'Címsor 5',
  h6: 'Címsor 6',
  quote: '',
};

const optionsSchema = z.object({
  getPlaceholder: z.optional(
    z.function().args(z.instanceof(ParagraphBlockModel)).returns(z.string())
  ),
});

export class ParagraphViewExtension extends ViewExtensionProvider<
  z.infer<typeof optionsSchema>
> {
  override name = 'affine-paragraph-block';

  override schema = optionsSchema;

  override effect(): void {
    super.effect();
    effects();
  }

  override setup(
    context: ViewExtensionContext,
    options?: z.infer<typeof optionsSchema>
  ) {
    super.setup(context, options);
    const getPlaceholder =
      options?.getPlaceholder ?? (model => placeholders[model.props.type]);

    context.register([
      FlavourExtension('affine:paragraph'),
      BlockViewExtension('affine:paragraph', literal`affine-paragraph`),
      ParagraphTextKeymapExtension,
      ParagraphKeymapExtension,
      ParagraphBlockConfigExtension({
        getPlaceholder,
      }),
      ParagraphMarkdownExtension,
    ]);
  }
}
