import type { SurfaceBlockModel } from '@blocksuite/affine-block-surface';
import type { Doc } from '@blocksuite/store';

import { Overlay } from '@blocksuite/affine-block-surface';
import {
  getTopElements,
  type GfxController,
  GfxExtension,
  GfxExtensionIdentifier,
  type GfxModel,
  isGfxContainerElm,
  renderableInEdgeless,
} from '@blocksuite/block-std/gfx';
import { BlockSuiteError, ErrorCode } from '@blocksuite/global/exceptions';
import {
  Bound,
  deserializeXYWH,
  DisposableGroup,
  type IVec,
} from '@blocksuite/global/utils';
import { DocCollection, Text } from '@blocksuite/store';

import type { FrameBlockModel, NoteBlockModel } from '../../index.js';

import { GfxBlockModel } from './block-model.js';
import { areSetsEqual } from './utils/misc.js';
import { isFrameBlock } from './utils/query.js';

const MIN_FRAME_WIDTH = 800;
const MIN_FRAME_HEIGHT = 640;
const FRAME_PADDING = 40;

export class FrameOverlay extends Overlay {
  static override overlayName: string = 'frame';

  private _disposable = new DisposableGroup();

  private _frame: FrameBlockModel | null = null;

  private _innerElements = new Set<GfxModel>();

  private get _frameManager() {
    return this.gfx.std.get(
      GfxExtensionIdentifier('frame-manager')
    ) as EdgelessFrameManager;
  }

  constructor(gfx: GfxController) {
    super(gfx);
  }

  private _reset() {
    this._disposable.dispose();
    this._disposable = new DisposableGroup();

    this._frame = null;
    this._innerElements.clear();
  }

  override clear() {
    if (this._frame === null && this._innerElements.size === 0) return;
    this._reset();
    this._renderer?.refresh();
  }

  highlight(
    frame: FrameBlockModel,
    highlightElementsInBound = false,
    highlightOutline = true
  ) {
    if (!highlightElementsInBound && !highlightOutline) return;

    let needRefresh = false;

    if (highlightOutline && this._frame !== frame) {
      needRefresh = true;
    }

    let innerElements = new Set<GfxModel>();
    if (highlightElementsInBound) {
      innerElements = new Set(
        getTopElements(
          this._frameManager.getElementsInFrameBound(frame)
        ).concat(
          this._frameManager.getChildElementsInFrame(frame).filter(child => {
            return frame.intersectsBound(child.elementBound);
          })
        )
      );
      if (!areSetsEqual(this._innerElements, innerElements)) {
        needRefresh = true;
      }
    }

    if (!needRefresh) return;

    this._reset();
    if (highlightOutline) this._frame = frame;
    if (highlightElementsInBound) this._innerElements = innerElements;

    this._disposable.add(
      frame.deleted.once(() => {
        this.clear();
      })
    );
    this._renderer?.refresh();
  }

  override render(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.strokeStyle = '#1E96EB';
    ctx.lineWidth = 2 / this.gfx.viewport.zoom;
    const radius = 2 / this.gfx.viewport.zoom;

    if (this._frame) {
      const { x, y, w, h } = this._frame.elementBound;
      ctx.roundRect(x, y, w, h, radius);
      ctx.stroke();
    }

    this._innerElements.forEach(element => {
      const [x, y, w, h] = deserializeXYWH(element.xywh);
      ctx.translate(x + w / 2, y + h / 2);
      ctx.rotate(element.rotate);
      ctx.roundRect(-w / 2, -h / 2, w, h, radius);
      ctx.translate(-x - w / 2, -y - h / 2);
      ctx.stroke();
    });
  }
}

export class EdgelessFrameManager extends GfxExtension {
  static override key = 'frame-manager';

  private _disposable = new DisposableGroup();

  /**
   * Get all sorted frames
   */
  get frames() {
    return this.gfx.layer.blocks.filter(
      block => block.flavour === 'affine:frame'
    ) as FrameBlockModel[];
  }

  constructor(gfx: GfxController) {
    super(gfx);
    this._watchElementAdded();
  }

  private _addChildrenToLegacyFrame(frame: FrameBlockModel) {
    if (frame.childElementIds !== undefined) return;
    const elements = this.getElementsInFrameBound(frame);
    const childElements = elements.filter(
      element => this.getParentFrame(element) === null && element !== frame
    );

    frame.addChildren(childElements);
  }

  private _addFrameBlock(bound: Bound) {
    const surfaceModel = this.gfx.surface as SurfaceBlockModel;
    const id = this.gfx.doc.addBlock(
      'affine:frame',
      {
        title: new Text(
          new DocCollection.Y.Text(`Keret ${this.frames.length + 1}`)
        ),
        xywh: bound.serialize(),
      },
      surfaceModel
    );
    const frameModel = this.gfx.getElementById(id);

    if (!frameModel || !isFrameBlock(frameModel)) {
      throw new BlockSuiteError(
        ErrorCode.GfxBlockElementError,
        'Frame model is not found'
      );
    }

    return frameModel;
  }

  private _watchElementAdded() {
    if (!this.gfx.surface) {
      return;
    }

    const { surface: surfaceModel, doc } = this.gfx;

    this._disposable.add(
      surfaceModel.elementAdded.on(({ id, local }) => {
        const element = surfaceModel.getElementById(id);
        if (element && local) {
          const frame = this.getFrameFromPoint(element.elementBound.center);

          // if the container created with a frame, skip it.
          if (isGfxContainerElm(element) && frame && element.hasChild(frame)) {
            return;
          }

          frame && this.addElementsToFrame(frame, [element]);
        }
      })
    );

    this._disposable.add(
      doc.slots.blockUpdated.on(payload => {
        if (
          payload.type === 'add' &&
          payload.model instanceof GfxBlockModel &&
          renderableInEdgeless(doc, surfaceModel, payload.model)
        ) {
          const frame = this.getFrameFromPoint(
            payload.model.elementBound.center,
            isFrameBlock(payload.model) ? [payload.model] : []
          );
          if (!frame) return;

          if (
            isFrameBlock(payload.model) &&
            payload.model.containsBound(frame.elementBound)
          ) {
            return;
          }
          this.addElementsToFrame(frame, [payload.model]);
        }
      })
    );
  }

  /**
   * Reset parent of elements to the frame
   */
  addElementsToFrame(frame: FrameBlockModel, elements: GfxModel[]) {
    if (frame.childElementIds === undefined) {
      this._addChildrenToLegacyFrame(frame);
    }

    elements = elements.filter(
      el => el !== frame && !frame.childElements.includes(el)
    );

    if (elements.length === 0) return;

    frame.addChildren(elements);
  }

  createFrameOnBound(bound: Bound) {
    const frameModel = this._addFrameBlock(bound);

    this.addElementsToFrame(
      frameModel,
      getTopElements(this.getElementsInFrameBound(frameModel))
    );

    this.gfx.doc.captureSync();

    this.gfx.selection.set({
      elements: [frameModel.id],
      editing: false,
    });

    return frameModel;
  }

  createFrameOnElements(elements: GfxModel[]) {
    let bound = this.gfx.selection.selectedBound;
    bound = bound.expand(FRAME_PADDING);
    if (bound.w < MIN_FRAME_WIDTH) {
      const offset = (MIN_FRAME_WIDTH - bound.w) / 2;
      bound = bound.expand(offset, 0);
    }
    if (bound.h < MIN_FRAME_HEIGHT) {
      const offset = (MIN_FRAME_HEIGHT - bound.h) / 2;
      bound = bound.expand(0, offset);
    }

    const frameModel = this._addFrameBlock(bound);

    this.addElementsToFrame(frameModel, getTopElements(elements));

    this.gfx.doc.captureSync();

    this.gfx.selection.set({
      elements: [frameModel.id],
      editing: false,
    });

    return frameModel;
  }

  createFrameOnSelected() {
    return this.createFrameOnElements(this.gfx.selection.selectedElements);
  }

  createFrameOnViewportCenter(wh: [number, number]) {
    const center = this.gfx.viewport.center;
    const bound = new Bound(
      center.x - wh[0] / 2,
      center.y - wh[1] / 2,
      wh[0],
      wh[1]
    );

    this.createFrameOnBound(bound);
  }

  /**
   * Get all elements in the frame, there are three cases:
   * 1. The frame doesn't have `childElements`, return all elements in the frame bound but not owned by another frame.
   * 2. Return all child elements of the frame if `childElements` exists.
   */
  getChildElementsInFrame(frame: FrameBlockModel): GfxModel[] {
    if (frame.childElementIds === undefined) {
      return this.getElementsInFrameBound(frame).filter(
        element => this.getParentFrame(element) !== null
      );
    }

    const childElements = frame.childIds
      .map(id => this.gfx.getElementById(id))
      .filter(element => element !== null);

    return childElements as BlockSuite.EdgelessModel[];
  }

  /**
   * Get all elements in the frame bound,
   * whatever the element already has another parent frame or not.
   */
  getElementsInFrameBound(frame: FrameBlockModel, fullyContained = true) {
    const bound = Bound.deserialize(frame.xywh);
    const elements: GfxModel[] = this.gfx.grid
      .search(bound, fullyContained)
      .filter(element => element !== frame);

    return elements;
  }

  /**
   * Get most top frame from the point.
   */
  getFrameFromPoint([x, y]: IVec, ignoreFrames: FrameBlockModel[] = []) {
    for (let i = this.frames.length - 1; i >= 0; i--) {
      const frame = this.frames[i];
      if (frame.includesPoint(x, y, {}) && !ignoreFrames.includes(frame)) {
        return frame;
      }
    }
    return null;
  }

  getParentFrame(element: GfxModel) {
    const container = element.container;
    return container && isFrameBlock(container) ? container : null;
  }

  removeAllChildrenFromFrame(frame: FrameBlockModel) {
    this.gfx.doc.transact(() => {
      frame.childElementIds = {};
    });
  }

  removeFromParentFrame(element: GfxModel) {
    const parentFrame = this.getParentFrame(element);
    // eslint-disable-next-line unicorn/prefer-dom-node-remove
    parentFrame?.removeChild(element);
  }

  override unmounted(): void {
    this._disposable.dispose();
  }
}

export function getNotesInFrameBound(
  doc: Doc,
  frame: FrameBlockModel,
  fullyContained: boolean = true
) {
  const bound = Bound.deserialize(frame.xywh);

  return (doc.getBlockByFlavour('affine:note') as NoteBlockModel[]).filter(
    ele => {
      const xywh = Bound.deserialize(ele.xywh);

      return fullyContained
        ? bound.contains(xywh)
        : bound.isPointInBound([xywh.x, xywh.y]);
    }
  ) as NoteBlockModel[];
}

export function getBlocksInFrameBound(
  doc: Doc,
  model: FrameBlockModel,
  fullyContained: boolean = true
) {
  const bound = Bound.deserialize(model.xywh);
  const surface = model.surface;
  if (!surface) return [];

  return (
    getNotesInFrameBound(
      doc,
      model,
      fullyContained
    ) as BlockSuite.EdgelessBlockModelType[]
  ).concat(
    surface.children.filter(ele => {
      if (ele.id === model.id) return;
      if (ele instanceof GfxBlockModel) {
        const blockBound = Bound.deserialize(ele.xywh);
        return fullyContained
          ? bound.contains(blockBound)
          : bound.containsPoint([blockBound.x, blockBound.y]);
      }

      return false;
    }) as BlockSuite.EdgelessBlockModelType[]
  );
}
