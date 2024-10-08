import type {
  BrushElementModel,
  ConnectorElementModel,
  DocMode,
  GroupElementModel,
} from '@algogrind/affine-model';
import type { Slot } from '@algogrind/global/utils';
import type { Doc } from '@algogrind/store';

/** Common context interface definition for block models. */

type EditorSlots = {
  docUpdated: Slot<{ newDocId: string }>;
};

export type AbstractEditor = {
  doc: Doc;
  mode: DocMode;
  readonly slots: EditorSlots;
} & HTMLElement;

export type Connectable = Exclude<
  BlockSuite.EdgelessModel,
  ConnectorElementModel | BrushElementModel | GroupElementModel
>;

export type { EmbedCardStyle } from '@algogrind/affine-model';
export * from '@algogrind/affine-shared/types';
