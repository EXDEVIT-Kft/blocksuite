import type {
  BlockComponent,
  DndEventState,
  EditorHost,
  ExtensionType,
} from '@algogrind/block-std';
import type { Point } from '@algogrind/global/utils';

import { createIdentifier } from '@algogrind/global/di';

export type DropType = 'before' | 'after' | 'in';
export type OnDragStartProps = {
  state: DndEventState;
  startDragging: (
    blocks: BlockComponent[],
    state: DndEventState,
    dragPreview?: HTMLElement,
    dragPreviewOffset?: Point
  ) => void;
  anchorBlockId: string | null;
  editorHost: EditorHost;
};

export type OnDragEndProps = {
  state: DndEventState;
  draggingElements: BlockComponent[];
  dropBlockId: string;
  dropType: DropType | null;
  dragPreview: HTMLElement;
  noteScale: number;
  editorHost: EditorHost;
};

export type OnDragMoveProps = {
  state: DndEventState;
  draggingElements?: BlockComponent[];
};

export type DragHandleOption = {
  flavour: string | RegExp;
  edgeless?: boolean;
  onDragStart?: (props: OnDragStartProps) => boolean;
  onDragMove?: (props: OnDragMoveProps) => boolean;
  onDragEnd?: (props: OnDragEndProps) => boolean;
};

export const DragHandleConfigIdentifier = createIdentifier<DragHandleOption>(
  'AffineDragHandleIdentifier'
);

export function DragHandleConfigExtension(
  option: DragHandleOption
): ExtensionType {
  return {
    setup: di => {
      const key =
        typeof option.flavour === 'string'
          ? option.flavour
          : option.flavour.source;
      di.addImpl(DragHandleConfigIdentifier(key), () => option);
    },
  };
}
