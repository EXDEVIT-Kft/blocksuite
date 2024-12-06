import {
  EmbedYoutubeBlockSchema,
  type EmbedYoutubeModel,
  EmbedYoutubeStyles,
} from '@algogrind/affine-model';
import { EmbedOptionProvider } from '@algogrind/affine-shared/services';
import { BlockService } from '@algogrind/block-std';

import { LinkPreviewer } from '../common/link-previewer.js';
import { youtubeUrlRegex } from './embed-youtube-model.js';
import { queryEmbedYoutubeData } from './utils.js';

export class EmbedYoutubeBlockService extends BlockService {
  static override readonly flavour = EmbedYoutubeBlockSchema.model.flavour;

  private static readonly linkPreviewer = new LinkPreviewer();

  static setLinkPreviewEndpoint =
    EmbedYoutubeBlockService.linkPreviewer.setEndpoint;

  queryUrlData = (
    embedYoutubeModel: EmbedYoutubeModel,
    signal?: AbortSignal
  ) => {
    return queryEmbedYoutubeData(
      embedYoutubeModel,
      EmbedYoutubeBlockService.linkPreviewer,
      signal
    );
  };

  override mounted() {
    super.mounted();

    this.std.get(EmbedOptionProvider).registerEmbedBlockOptions({
      flavour: this.flavour,
      urlRegex: youtubeUrlRegex,
      styles: EmbedYoutubeStyles,
      viewType: 'embed',
    });
  }
}
