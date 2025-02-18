import {
  EmbedGithubBlockSchema,
  type EmbedGithubModel,
  EmbedGithubStyles,
} from '@algogrind/affine-model';
import { EmbedOptionProvider } from '@algogrind/affine-shared/services';
import { BlockService } from '@algogrind/block-std';

import { LinkPreviewer } from '../common/link-previewer.js';
import { githubUrlRegex } from './embed-github-model.js';
import { queryEmbedGithubApiData, queryEmbedGithubData } from './utils.js';

export class EmbedGithubBlockService extends BlockService {
  static override readonly flavour = EmbedGithubBlockSchema.model.flavour;

  private static readonly linkPreviewer = new LinkPreviewer();

  static setLinkPreviewEndpoint =
    EmbedGithubBlockService.linkPreviewer.setEndpoint;

  queryApiData = (embedGithubModel: EmbedGithubModel, signal?: AbortSignal) => {
    return queryEmbedGithubApiData(embedGithubModel, signal);
  };

  queryUrlData = (embedGithubModel: EmbedGithubModel, signal?: AbortSignal) => {
    return queryEmbedGithubData(
      embedGithubModel,
      EmbedGithubBlockService.linkPreviewer,
      signal
    );
  };

  override mounted() {
    super.mounted();

    this.std.get(EmbedOptionProvider).registerEmbedBlockOptions({
      flavour: this.flavour,
      urlRegex: githubUrlRegex,
      styles: EmbedGithubStyles,
      viewType: 'card',
    });
  }
}
