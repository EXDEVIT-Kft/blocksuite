import type { ExtensionType } from '@blocksuite/block-std';

import { EmbedExtensions } from '@blocksuite/affine-block-embed';
import { ListBlockSpec } from '@blocksuite/affine-block-list';
import { ParagraphBlockSpec } from '@blocksuite/affine-block-paragraph';
import { RichTextExtensions } from '@blocksuite/affine-components/rich-text';
import { EditPropsStore } from '@blocksuite/affine-shared/services';

import {
  AdapterFactoryExtensions,
  BlockAdapterMatcherExtensions,
} from '../_common/adapters/extension.js';
import { AccordionBlockSpec } from '../accordion-block/accordion-spec.js';
import { AttachmentBlockSpec } from '../attachment-block/attachment-spec.js';
import { BookmarkBlockSpec } from '../bookmark-block/bookmark-spec.js';
import { CodeBlockSpec } from '../code-block/code-block-spec.js';
import { DataViewBlockSpec } from '../data-view-block/data-view-spec.js';
import { DatabaseBlockSpec } from '../database-block/database-spec.js';
import { DividerBlockSpec } from '../divider-block/divider-spec.js';
import { ImageBlockSpec } from '../image-block/image-spec.js';
import {
  EdgelessNoteBlockSpec,
  NoteBlockSpec,
} from '../note-block/note-spec.js';

export const CommonFirstPartyBlockSpecs: ExtensionType[] = [
  // === blocksuite / affine
  RichTextExtensions,
  EditPropsStore,
  ListBlockSpec,
  NoteBlockSpec,
  DatabaseBlockSpec,
  DataViewBlockSpec,
  DividerBlockSpec,
  CodeBlockSpec,
  ImageBlockSpec,
  ParagraphBlockSpec,
  BookmarkBlockSpec,
  AttachmentBlockSpec,
  EmbedExtensions,
  BlockAdapterMatcherExtensions,
  AdapterFactoryExtensions,
  // === algogrind
  AccordionBlockSpec,
].flat();

export const EdgelessFirstPartyBlockSpecs: ExtensionType[] = [
  // blocksuite / affine
  RichTextExtensions,
  EditPropsStore,
  ListBlockSpec,
  EdgelessNoteBlockSpec,
  DatabaseBlockSpec,
  DataViewBlockSpec,
  DividerBlockSpec,
  CodeBlockSpec,
  ImageBlockSpec,
  ParagraphBlockSpec,
  BookmarkBlockSpec,
  AttachmentBlockSpec,
  EmbedExtensions,
  BlockAdapterMatcherExtensions,
  AdapterFactoryExtensions,
  // === algogrind
  AccordionBlockSpec,
].flat();
