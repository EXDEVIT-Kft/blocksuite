import type { ExtensionType } from '@algogrind/block-std';

import { EmbedExtensions } from '@algogrind/affine-block-embed';
import { ListBlockSpec } from '@algogrind/affine-block-list';
import { ParagraphBlockSpec } from '@algogrind/affine-block-paragraph';
import { RichTextExtensions } from '@algogrind/affine-components/rich-text';
import { EditPropsStore } from '@algogrind/affine-shared/services';

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
].flat();

export const EdgelessFirstPartyBlockSpecs: ExtensionType[] = [
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
].flat();
