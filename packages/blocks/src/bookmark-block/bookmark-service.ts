import { LinkPreviewer } from '@algogrind/affine-block-embed';
import { BookmarkBlockSchema } from '@algogrind/affine-model';
import {
  EMBED_CARD_HEIGHT,
  EMBED_CARD_WIDTH,
} from '@algogrind/affine-shared/consts';
import { DragHandleConfigExtension } from '@algogrind/affine-shared/services';
import {
  captureEventTarget,
  convertDragPreviewDocToEdgeless,
  convertDragPreviewEdgelessToDoc,
  matchFlavours,
} from '@algogrind/affine-shared/utils';
import { BlockService } from '@algogrind/block-std';

import type { BookmarkBlockComponent } from './bookmark-block.js';

import { BookmarkEdgelessBlockComponent } from './bookmark-edgeless-block.js';

export class BookmarkBlockService extends BlockService {
  static override readonly flavour = BookmarkBlockSchema.model.flavour;

  private static readonly linkPreviewer = new LinkPreviewer();

  static setLinkPreviewEndpoint =
    BookmarkBlockService.linkPreviewer.setEndpoint;

  queryUrlData = (url: string, signal?: AbortSignal) => {
    return BookmarkBlockService.linkPreviewer.query(url, signal);
  };
}

export const BookmarkDragHandleOption = DragHandleConfigExtension({
  flavour: BookmarkBlockSchema.model.flavour,
  edgeless: true,
  onDragEnd: props => {
    const { state, draggingElements } = props;
    if (
      draggingElements.length !== 1 ||
      !matchFlavours(draggingElements[0].model, [
        BookmarkBlockSchema.model.flavour,
      ])
    )
      return false;

    const blockComponent = draggingElements[0] as
      | BookmarkBlockComponent
      | BookmarkEdgelessBlockComponent;
    const isInSurface =
      blockComponent instanceof BookmarkEdgelessBlockComponent;
    const target = captureEventTarget(state.raw.target);
    const isTargetEdgelessContainer =
      target?.classList.contains('edgeless-container');

    if (isInSurface) {
      const style = blockComponent.model.style;
      const targetStyle =
        style === 'vertical' || style === 'cube' ? 'horizontal' : style;
      return convertDragPreviewEdgelessToDoc({
        blockComponent,
        style: targetStyle,
        ...props,
      });
    } else if (isTargetEdgelessContainer) {
      const style = blockComponent.model.style;

      return convertDragPreviewDocToEdgeless({
        blockComponent,
        cssSelector: 'bookmark-card',
        width: EMBED_CARD_WIDTH[style],
        height: EMBED_CARD_HEIGHT[style],
        ...props,
      });
    }

    return false;
  },
});
