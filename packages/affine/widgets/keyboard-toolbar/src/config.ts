import { addSiblingAttachmentBlocks } from '@blocksuite/affine-block-attachment';
import { insertDatabaseBlockCommand } from '@blocksuite/affine-block-database';
import { insertEmptyEmbedIframeCommand } from '@blocksuite/affine-block-embed';
import { insertImagesCommand } from '@blocksuite/affine-block-image';
import { insertLatexBlockCommand } from '@blocksuite/affine-block-latex';
import {
  canDedentListCommand,
  canIndentListCommand,
  dedentListCommand,
  indentListCommand,
} from '@blocksuite/affine-block-list';
import { updateBlockType } from '@blocksuite/affine-block-note';
import {
  canDedentParagraphCommand,
  canIndentParagraphCommand,
  dedentParagraphCommand,
  indentParagraphCommand,
} from '@blocksuite/affine-block-paragraph';
import { DefaultTool, getSurfaceBlock } from '@blocksuite/affine-block-surface';
import { insertSurfaceRefBlockCommand } from '@blocksuite/affine-block-surface-ref';
import { insertTableBlockCommand } from '@blocksuite/affine-block-table';
import { toggleEmbedCardCreateModal } from '@blocksuite/affine-components/embed-card-modal';
import {
  BulletedListIcon,
  CodeBlockIcon,
  DividerIcon,
  NumberedListIcon,
  QuoteIcon,
  TextIcon,
} from '@blocksuite/affine-components/icons';
import { toast } from '@blocksuite/affine-components/toast';
import { insertInlineLatex } from '@blocksuite/affine-inline-latex';
import { toggleLink } from '@blocksuite/affine-inline-link';
import {
  formatBlockCommand,
  formatNativeCommand,
  formatTextCommand,
  getTextAttributes,
  toggleBold,
  toggleCode,
  toggleItalic,
  toggleStrike,
  toggleUnderline,
} from '@blocksuite/affine-inline-preset';
import type { FrameBlockModel } from '@blocksuite/affine-model';
import { insertContent } from '@blocksuite/affine-rich-text';
import {
  copySelectedModelsCommand,
  deleteSelectedModelsCommand,
  draftSelectedModelsCommand,
  duplicateSelectedModelsCommand,
  focusBlockEnd,
  getBlockSelectionsCommand,
  getSelectedModelsCommand,
  getTextSelectionCommand,
} from '@blocksuite/affine-shared/commands';
import { REFERENCE_NODE } from '@blocksuite/affine-shared/consts';
import { TelemetryProvider } from '@blocksuite/affine-shared/services';
import type { AffineTextStyleAttributes } from '@blocksuite/affine-shared/types';
import {
  createDefaultDoc,
  isInsideBlockByFlavour,
  openSingleFileWith,
  type Signal,
} from '@blocksuite/affine-shared/utils';
import type { AffineLinkedDocWidget } from '@blocksuite/affine-widget-linked-doc';
import { viewPresets } from '@blocksuite/data-view/view-presets';
import { assertType } from '@blocksuite/global/utils';
import {
  AttachmentIcon,
  BoldIcon,
  CheckBoxCheckLinearIcon,
  CloseIcon,
  CodeIcon,
  CollapseTabIcon,
  CopyIcon,
  DatabaseKanbanViewIcon,
  DatabaseTableViewIcon,
  DeleteIcon,
  DuplicateIcon,
  EmbedIcon,
  FontIcon,
  FrameIcon,
  GithubIcon,
  GroupIcon,
  ImageIcon,
  ItalicIcon,
  LinkedPageIcon,
  LinkIcon,
  LoomLogoIcon,
  NewPageIcon,
  NowIcon,
  PlusIcon,
  RedoIcon,
  RightTabIcon,
  StrikeThroughIcon,
  TableIcon,
  TeXIcon,
  TodayIcon,
  TomorrowIcon,
  UnderLineIcon,
  UndoIcon,
  YesterdayIcon,
  YoutubeDuotoneIcon,
} from '@blocksuite/icons/lit';
import {
  type BlockComponent,
  type BlockStdScope,
  ConfigExtensionFactory,
} from '@blocksuite/std';
import { GfxControllerIdentifier } from '@blocksuite/std/gfx';
import { computed } from '@preact/signals-core';
import { cssVarV2 } from '@toeverything/theme/v2';
import type { TemplateResult } from 'lit';

import {
  FigmaDuotoneIcon,
  HeadingIcon,
  HighLightDuotoneIcon,
  TextBackgroundDuotoneIcon,
  TextColorIcon,
} from './icons.js';
import { formatDate, formatTime } from './utils.js';

export type KeyboardToolbarConfig = {
  items: KeyboardToolbarItem[];
};

export type KeyboardToolbarItem =
  | KeyboardToolbarActionItem
  | KeyboardSubToolbarConfig
  | KeyboardToolPanelConfig;

export type KeyboardIconType =
  | TemplateResult
  | ((ctx: KeyboardToolbarContext) => TemplateResult);

export type KeyboardToolbarActionItem = {
  name: string;
  icon: KeyboardIconType;
  background?: string | ((ctx: KeyboardToolbarContext) => string | undefined);
  /**
   * @default true
   * @description Whether to show the item in the toolbar.
   */
  showWhen?: (ctx: KeyboardToolbarContext) => boolean;
  /**
   * @default false
   * @description Whether to set the item as disabled status.
   */
  disableWhen?: (ctx: KeyboardToolbarContext) => boolean;
  /**
   * @description The action to be executed when the item is clicked.
   */
  action?: (ctx: KeyboardToolbarContext) => void | Promise<void>;
};

export type KeyboardSubToolbarConfig = {
  icon: KeyboardIconType;
  items: KeyboardToolbarItem[];
  /**
   * It will enter this sub-toolbar when the condition is met.
   */
  autoShow?: (ctx: KeyboardToolbarContext) => Signal<boolean>;
};

export type KeyboardToolbarContext = {
  std: BlockStdScope;
  rootComponent: BlockComponent;
  /**
   * Close current tool panel and show virtual keyboard
   */
  closeToolPanel: () => void;
};

export type KeyboardToolPanelConfig = {
  icon: KeyboardIconType;
  activeIcon?: KeyboardIconType;
  activeBackground?: string;
  groups: (KeyboardToolPanelGroup | DynamicKeyboardToolPanelGroup)[];
};

export type KeyboardToolPanelGroup = {
  name: string;
  items: KeyboardToolbarActionItem[];
};

export type DynamicKeyboardToolPanelGroup = (
  ctx: KeyboardToolbarContext
) => KeyboardToolPanelGroup | null;

const textToolActionItems: KeyboardToolbarActionItem[] = [
  {
    name: 'Szöveg',
    icon: TextIcon,
    showWhen: ({ std }) =>
      std.store.schema.flavourSchemaMap.has('affine:paragraph'),
    action: ({ std }) => {
      std.command.exec(updateBlockType, {
        flavour: 'affine:paragraph',
        props: { type: 'text' },
      });
    },
  },
  ...([1, 2, 3, 4, 5, 6] as const).map(i => ({
    name: `Címsor ${i}`,
    icon: HeadingIcon(i),
    showWhen: ({ std }: KeyboardToolbarContext) =>
      std.store.schema.flavourSchemaMap.has('affine:paragraph'),
    action: ({ std }: KeyboardToolbarContext) => {
      std.command.exec(updateBlockType, {
        flavour: 'affine:paragraph',
        props: { type: `h${i}` },
      });
    },
  })),
  {
    name: 'Kód Blokk',
    showWhen: ({ std }) => std.store.schema.flavourSchemaMap.has('affine:code'),
    icon: CodeBlockIcon,
    action: ({ std }) => {
      std.command.exec(updateBlockType, {
        flavour: 'affine:code',
      });
    },
  },
  {
    name: 'Egyenlet',
    showWhen: ({ std }) =>
      std.store.schema.flavourSchemaMap.has('affine:latex'),
    icon: TeXIcon(),
    action: ({ std }) => {
      std.command.exec(updateBlockType, {
        flavour: 'affine:latex',
      });
    },
  },
  {
    name: 'Idézet',
    showWhen: ({ std }) =>
      std.store.schema.flavourSchemaMap.has('affine:paragraph'),
    icon: QuoteIcon,
    action: ({ std }) => {
      std.command.exec(updateBlockType, {
        flavour: 'affine:paragraph',
        props: { type: 'quote' },
      });
    },
  },
  {
    name: 'Elválasztó',
    icon: DividerIcon,
    showWhen: ({ std }) =>
      std.store.schema.flavourSchemaMap.has('affine:divider'),
    action: ({ std }) => {
      std.command.exec(updateBlockType, {
        flavour: 'affine:divider',
        props: { type: 'divider' },
      });
    },
  },
  {
    name: 'Sorközi Egyenlet',
    icon: TeXIcon(),
    showWhen: ({ std }) =>
      std.store.schema.flavourSchemaMap.has('affine:paragraph'),
    action: ({ std }) => {
      std.command
        .chain()
        .pipe(getTextSelectionCommand)
        .pipe(insertInlineLatex)
        .run();
    },
  },
  {
    name: 'Táblázat',
    icon: TableIcon(),
    showWhen: ({ std, rootComponent: { model } }) =>
      std.store.schema.flavourSchemaMap.has('affine:table') &&
      !isInsideBlockByFlavour(std.store, model, 'affine:edgeless-text'),
    action: ({ std }) => {
      std.command
        .chain()
        .pipe(getSelectedModelsCommand)
        .pipe(insertTableBlockCommand, {
          place: 'after',
          removeEmptyLine: true,
        })
        .pipe(({ insertedTableBlockId }) => {
          if (insertedTableBlockId) {
            const telemetry = std.getOptional(TelemetryProvider);
            telemetry?.track('BlockCreated', {
              blockType: 'affine:table',
            });
          }
        })
        .run();
    },
  },
  {
    name: 'Kiemelés',
    icon: FontIcon(),
    showWhen: ({ rootComponent: { model } }) => {
      return !isInsideBlockByFlavour(
        model.store,
        model,
        'affine:edgeless-text'
      );
    },
    action: ({ rootComponent: { model }, std }) => {
      const { store } = model;
      const parent = store.getParent(model);
      if (!parent) return;

      const index = parent.children.indexOf(model);
      if (index === -1) return;
      const calloutId = store.addBlock('affine:callout', {}, parent, index + 1);
      if (!calloutId) return;
      const paragraphId = store.addBlock('affine:paragraph', {}, calloutId);
      if (!paragraphId) return;
      std.host.updateComplete
        .then(() => {
          const paragraph = std.view.getBlock(paragraphId);
          if (!paragraph) return;
          std.command.exec(focusBlockEnd, {
            focusBlock: paragraph,
          });
        })
        .catch(console.error);
    },
  },
];

const listToolActionItems: KeyboardToolbarActionItem[] = [
  {
    name: 'Felsorolás',
    icon: BulletedListIcon,
    showWhen: ({ std }) => std.store.schema.flavourSchemaMap.has('affine:list'),
    action: ({ std }) => {
      std.command.exec(updateBlockType, {
        flavour: 'affine:list',
        props: {
          type: 'bulleted',
        },
      });
    },
  },
  {
    name: 'Számozott Felsorolás',
    icon: NumberedListIcon,
    showWhen: ({ std }) => std.store.schema.flavourSchemaMap.has('affine:list'),
    action: ({ std }) => {
      std.command.exec(updateBlockType, {
        flavour: 'affine:list',
        props: {
          type: 'numbered',
        },
      });
    },
  },
  {
    name: 'To-do Lista',
    icon: CheckBoxCheckLinearIcon(),
    showWhen: ({ std }) => std.store.schema.flavourSchemaMap.has('affine:list'),
    action: ({ std }) => {
      std.command.exec(updateBlockType, {
        flavour: 'affine:list',
        props: {
          type: 'todo',
        },
      });
    },
  },
];

const pageToolGroup: KeyboardToolPanelGroup = {
  name: 'Oldal',
  items: [
    {
      name: 'Új oldal',
      icon: NewPageIcon(),
      showWhen: ({ std }) =>
        std.store.schema.flavourSchemaMap.has('affine:embed-linked-doc'),
      action: ({ std }) => {
        std.command
          .chain()
          .pipe(getSelectedModelsCommand)
          .pipe(({ selectedModels }) => {
            const newDoc = createDefaultDoc(std.store.workspace);
            if (!selectedModels?.length) return;
            insertContent(std, selectedModels[0], REFERENCE_NODE, {
              reference: {
                type: 'LinkedPage',
                pageId: newDoc.id,
              },
            });
          })
          .run();
      },
    },
    {
      name: 'Új hivatkozott oldal',
      icon: LinkedPageIcon(),
      showWhen: ({ std, rootComponent }) => {
        const linkedDocWidget = std.view.getWidget(
          'affine-linked-doc-widget',
          rootComponent.model.id
        );
        if (!linkedDocWidget) return false;

        return std.store.schema.flavourSchemaMap.has('affine:embed-linked-doc');
      },
      action: ({ rootComponent, closeToolPanel }) => {
        const { std } = rootComponent;

        const linkedDocWidget = std.view.getWidget(
          'affine-linked-doc-widget',
          rootComponent.model.id
        );
        if (!linkedDocWidget) return;
        assertType<AffineLinkedDocWidget>(linkedDocWidget);
        linkedDocWidget.show({
          mode: 'mobile',
          addTriggerKey: true,
        });
        closeToolPanel();
      },
    },
  ],
};

const contentMediaToolGroup: KeyboardToolPanelGroup = {
  name: 'Tartalom & Média',
  items: [
    {
      name: 'Kép',
      icon: ImageIcon(),
      showWhen: ({ std }) =>
        std.store.schema.flavourSchemaMap.has('affine:image'),
      action: ({ std }) => {
        std.command
          .chain()
          .pipe(getSelectedModelsCommand)
          .pipe(insertImagesCommand, { removeEmptyLine: true })
          .run();
      },
    },
    {
      name: 'Weboldal',
      icon: LinkIcon(),
      showWhen: ({ std }) =>
        std.store.schema.flavourSchemaMap.has('affine:bookmark'),
      action: async ({ std }) => {
        const [_, { selectedModels }] = std.command.exec(
          getSelectedModelsCommand
        );
        const model = selectedModels?.[0];
        if (!model) return;

        const parentModel = std.store.getParent(model);
        if (!parentModel) return;

        const index = parentModel.children.indexOf(model) + 1;
        await toggleEmbedCardCreateModal(
          std.host,
          'Links',
          'A hozzáadott link kártya nézetben került megjelenítésre.',
          { mode: 'page', parentModel, index },
          ({ mode }) => {
            if (mode === 'edgeless') {
              const gfx = std.get(GfxControllerIdentifier);
              gfx.tool.setTool(DefaultTool);
            }
          }
        );
        if (model.text?.length === 0) {
          std.store.deleteBlock(model);
        }
      },
    },
    {
      name: 'Fájl',
      icon: AttachmentIcon(),
      showWhen: () => false,
      action: async ({ std }) => {
        const [_, { selectedModels }] = std.command.exec(
          getSelectedModelsCommand
        );
        const model = selectedModels?.[0];
        if (!model) return;

        const file = await openSingleFileWith();
        if (!file) return;

        await addSiblingAttachmentBlocks(std, [file], model);
        if (model.text?.length === 0) {
          std.store.deleteBlock(model);
        }
      },
    },
    {
      name: 'Egyenlet',
      icon: TeXIcon(),
      showWhen: ({ std }) =>
        std.store.schema.flavourSchemaMap.has('affine:latex'),
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

const embedToolGroup: KeyboardToolPanelGroup = {
  name: 'Beágyazások',
  items: [
    {
      name: 'Beágyazás',
      icon: EmbedIcon({ style: `color: black` }),
      showWhen: ({ std }) => {
        return std.store.schema.flavourSchemaMap.has('affine:embed-iframe');
      },
      action: async ({ std }) => {
        std.command
          .chain()
          .pipe(getSelectedModelsCommand)
          .pipe(insertEmptyEmbedIframeCommand, {
            place: 'after',
            removeEmptyLine: true,
            linkInputPopupOptions: {
              showCloseButton: true,
              variant: 'mobile',
              telemetrySegment: 'keyboard toolbar',
            },
          })
          .run();
      },
    },
    {
      name: 'Youtube',
      icon: YoutubeDuotoneIcon({
        style: `color: white`,
      }),
      showWhen: ({ std }) =>
        std.store.schema.flavourSchemaMap.has('affine:embed-youtube'),
      action: async ({ std }) => {
        const [_, { selectedModels }] = std.command.exec(
          getSelectedModelsCommand
        );
        const model = selectedModels?.[0];
        if (!model) return;

        const parentModel = std.store.getParent(model);
        if (!parentModel) return;

        const index = parentModel.children.indexOf(model) + 1;
        await toggleEmbedCardCreateModal(
          std.host,
          'YouTube',
          'A hozzáadott YouTube videó kártya nézetben került megjelenítésre.',
          { mode: 'page', parentModel, index },
          ({ mode }) => {
            if (mode === 'edgeless') {
              const gfx = std.get(GfxControllerIdentifier);
              gfx.tool.setTool(DefaultTool);
            }
          }
        );
        if (model.text?.length === 0) {
          std.store.deleteBlock(model);
        }
      },
    },
    {
      name: 'Github',
      icon: GithubIcon({ style: `color: black` }),
      showWhen: ({ std }) =>
        std.store.schema.flavourSchemaMap.has('affine:embed-github'),
      action: async ({ std }) => {
        const [_, { selectedModels }] = std.command.exec(
          getSelectedModelsCommand
        );
        const model = selectedModels?.[0];
        if (!model) return;

        const parentModel = std.store.getParent(model);
        if (!parentModel) return;

        const index = parentModel.children.indexOf(model) + 1;
        await toggleEmbedCardCreateModal(
          std.host,
          'GitHub',
          'A hozzáadott GitHub beágyazott elem kártya nézetben került megjelenítésre.',
          { mode: 'page', parentModel, index },
          ({ mode }) => {
            if (mode === 'edgeless') {
              const gfx = std.get(GfxControllerIdentifier);
              gfx.tool.setTool(DefaultTool);
            }
          }
        );
        if (model.text?.length === 0) {
          std.store.deleteBlock(model);
        }
      },
    },
    {
      name: 'Figma',
      icon: FigmaDuotoneIcon,
      showWhen: ({ std }) =>
        std.store.schema.flavourSchemaMap.has('affine:embed-figma'),
      action: async ({ std }) => {
        const [_, { selectedModels }] = std.command.exec(
          getSelectedModelsCommand
        );
        const model = selectedModels?.[0];
        if (!model) return;

        const parentModel = std.store.getParent(model);
        if (!parentModel) {
          return;
        }
        const index = parentModel.children.indexOf(model) + 1;
        await toggleEmbedCardCreateModal(
          std.host,
          'Figma',
          'A beágyazott Figma dokumentum kártya nézetben került megjelenítésre.',
          { mode: 'page', parentModel, index },
          ({ mode }) => {
            if (mode === 'edgeless') {
              const gfx = std.get(GfxControllerIdentifier);
              gfx.tool.setTool(DefaultTool);
            }
          }
        );
        if (model.text?.length === 0) {
          std.store.deleteBlock(model);
        }
      },
    },
    {
      name: 'Loom',
      icon: LoomLogoIcon({ style: `color: #625DF5` }),
      showWhen: ({ std }) =>
        std.store.schema.flavourSchemaMap.has('affine:embed-loom'),
      action: async ({ std }) => {
        const [_, { selectedModels }] = std.command.exec(
          getSelectedModelsCommand
        );
        const model = selectedModels?.[0];
        if (!model) return;

        const parentModel = std.store.getParent(model);
        if (!parentModel) return;

        const index = parentModel.children.indexOf(model) + 1;
        await toggleEmbedCardCreateModal(
          std.host,
          'Loom',
          'A beágyazott Loom videó kártya nézetben került megjelenítésre..',
          { mode: 'page', parentModel, index },
          ({ mode }) => {
            if (mode === 'edgeless') {
              const gfx = std.get(GfxControllerIdentifier);
              gfx.tool.setTool(DefaultTool);
            }
          }
        );
        if (model.text?.length === 0) {
          std.store.deleteBlock(model);
        }
      },
    },
    {
      name: 'Egyenlet',
      icon: TeXIcon(),
      showWhen: ({ std }) =>
        std.store.schema.flavourSchemaMap.has('affine:latex'),
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

const documentGroupFrameToolGroup: DynamicKeyboardToolPanelGroup = ({
  std,
}) => {
  const { store } = std;

  const frameModels = store
    .getBlocksByFlavour('affine:frame')
    .map(block => block.model) as FrameBlockModel[];

  const frameItems = frameModels.map<KeyboardToolbarActionItem>(frameModel => ({
    name: 'Keret: ' + frameModel.props.title.toString(),
    icon: FrameIcon(),
    action: ({ std }) => {
      std.command
        .chain()
        .pipe(getSelectedModelsCommand)
        .pipe(insertSurfaceRefBlockCommand, {
          reference: frameModel.id,
          place: 'after',
          removeEmptyLine: true,
        })
        .run();
    },
  }));

  const surfaceModel = getSurfaceBlock(store);

  const groupElements = surfaceModel
    ? surfaceModel.getElementsByType('group')
    : [];

  const groupItems = groupElements.map<KeyboardToolbarActionItem>(group => ({
    name: 'Csoport: ' + group.title.toString(),
    icon: GroupIcon(),
    action: ({ std }) => {
      std.command
        .chain()
        .pipe(getSelectedModelsCommand)
        .pipe(insertSurfaceRefBlockCommand, {
          reference: group.id,
          place: 'after',
          removeEmptyLine: true,
        })
        .run();
    },
  }));

  const items = [...frameItems, ...groupItems];

  if (items.length === 0) return null;

  return {
    name: 'Dokumentum Csoport & Keret',
    items,
  };
};

const dateToolGroup: KeyboardToolPanelGroup = {
  name: 'Dátum',
  items: [
    {
      name: 'Ma',
      icon: TodayIcon(),
      action: ({ std }) => {
        const [_, { selectedModels }] = std.command.exec(
          getSelectedModelsCommand
        );
        const model = selectedModels?.[0];
        if (!model) return;

        insertContent(std, model, formatDate(new Date()));
      },
    },
    {
      name: 'Holnap',
      icon: TomorrowIcon(),
      action: ({ std }) => {
        const [_, { selectedModels }] = std.command.exec(
          getSelectedModelsCommand
        );
        const model = selectedModels?.[0];
        if (!model) return;

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        insertContent(std, model, formatDate(tomorrow));
      },
    },
    {
      name: 'Tegnap',
      icon: YesterdayIcon(),
      action: ({ std }) => {
        const [_, { selectedModels }] = std.command.exec(
          getSelectedModelsCommand
        );
        const model = selectedModels?.[0];
        if (!model) return;

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        insertContent(std, model, formatDate(yesterday));
      },
    },
    {
      name: 'Most',
      icon: NowIcon(),
      action: ({ std }) => {
        const [_, { selectedModels }] = std.command.exec(
          getSelectedModelsCommand
        );
        const model = selectedModels?.[0];
        if (!model) return;

        insertContent(std, model, formatTime(new Date()));
      },
    },
  ],
};

const databaseToolGroup: KeyboardToolPanelGroup = {
  name: 'Adatbázis',
  items: [
    {
      name: 'Táblázat',
      icon: DatabaseTableViewIcon(),
      showWhen: ({ std }) =>
        std.store.schema.flavourSchemaMap.has('affine:database'),
      action: ({ std }) => {
        std.command
          .chain()
          .pipe(getSelectedModelsCommand)
          .pipe(insertDatabaseBlockCommand, {
            viewType: viewPresets.tableViewMeta.type,
            place: 'after',
            removeEmptyLine: true,
          })
          .run();
      },
    },
    {
      name: 'Kanban',
      icon: DatabaseKanbanViewIcon(),
      showWhen: ({ std }) =>
        std.store.schema.flavourSchemaMap.has('affine:database'),
      action: ({ std }) => {
        std.command
          .chain()
          .pipe(getSelectedModelsCommand)
          .pipe(insertDatabaseBlockCommand, {
            viewType: viewPresets.kanbanViewMeta.type,
            place: 'after',
            removeEmptyLine: true,
          })
          .run();
      },
    },
  ],
};

const moreToolPanel: KeyboardToolPanelConfig = {
  icon: PlusIcon(),
  activeIcon: CloseIcon({
    style: `color: ${cssVarV2('icon/activated')}`,
  }),
  activeBackground: cssVarV2('edgeless/selection/selectionMarqueeBackground'),
  groups: [
    { name: 'Alapvető', items: textToolActionItems },
    { name: 'Felsorolás', items: listToolActionItems },
    pageToolGroup,
    contentMediaToolGroup,
    embedToolGroup,
    documentGroupFrameToolGroup,
    dateToolGroup,
    databaseToolGroup,
  ],
};

const textToolPanel: KeyboardToolPanelConfig = {
  icon: TextIcon,
  groups: [
    {
      name: 'Átváltás',
      items: textToolActionItems,
    },
  ],
};

const textStyleToolItems: KeyboardToolbarItem[] = [
  {
    name: 'Félkövér',
    icon: BoldIcon(),
    background: ({ std }) => {
      const [_, { textAttributes }] = std.command.exec(getTextAttributes);
      return textAttributes?.bold ? '#00000012' : '';
    },
    action: ({ std }) => {
      std.command.exec(toggleBold);
    },
  },
  {
    name: 'Dőlt',
    icon: ItalicIcon(),
    background: ({ std }) => {
      const [_, { textAttributes }] = std.command.exec(getTextAttributes);
      return textAttributes?.italic ? '#00000012' : '';
    },
    action: ({ std }) => {
      std.command.exec(toggleItalic);
    },
  },
  {
    name: 'Aláhúzott',
    icon: UnderLineIcon(),
    background: ({ std }) => {
      const [_, { textAttributes }] = std.command.exec(getTextAttributes);
      return textAttributes?.underline ? '#00000012' : '';
    },
    action: ({ std }) => {
      std.command.exec(toggleUnderline);
    },
  },
  {
    name: 'Áthúzott',
    icon: StrikeThroughIcon(),
    background: ({ std }) => {
      const [_, { textAttributes }] = std.command.exec(getTextAttributes);
      return textAttributes?.strike ? '#00000012' : '';
    },
    action: ({ std }) => {
      std.command.exec(toggleStrike);
    },
  },
  {
    name: 'Kód',
    icon: CodeIcon(),
    background: ({ std }) => {
      const [_, { textAttributes }] = std.command.exec(getTextAttributes);
      return textAttributes?.code ? '#00000012' : '';
    },
    action: ({ std }) => {
      std.command.exec(toggleCode);
    },
  },
  {
    name: 'Link',
    icon: LinkIcon(),
    background: ({ std }) => {
      const [_, { textAttributes }] = std.command.exec(getTextAttributes);
      return textAttributes?.link ? '#00000012' : '';
    },
    action: ({ std }) => {
      std.command.exec(toggleLink);
    },
  },
];

// [ALGOGRIND] Csak megjelenő nevek — a kulcsok CSS-változó azonosítók, nem változhatnak.
const highlightColorNames: Record<string, string> = {
  red: 'Piros',
  orange: 'Narancs',
  yellow: 'Sárga',
  green: 'Zöld',
  teal: 'Türkizkék',
  blue: 'Kék',
  purple: 'Lila',
  grey: 'Szürke',
};

const highlightToolPanel: KeyboardToolPanelConfig = {
  icon: ({ std }) => {
    const [_, { textAttributes }] = std.command.exec(getTextAttributes);
    if (textAttributes?.color) {
      return HighLightDuotoneIcon(textAttributes.color);
    } else {
      return HighLightDuotoneIcon(cssVarV2('icon/primary'));
    }
  },
  groups: [
    {
      name: 'Szín',
      items: [
        {
          name: 'Alapértelmezett',
          icon: TextColorIcon(cssVarV2('text/highlight/fg/orange')),
        },
        ...(
          [
            'red',
            'orange',
            'yellow',
            'green',
            'teal',
            'blue',
            'purple',
            'grey',
          ] as const
        ).map<KeyboardToolbarActionItem>(color => ({
          name: highlightColorNames[color] ?? color,
          icon: TextColorIcon(cssVarV2(`text/highlight/fg/${color}`)),
          action: ({ std }) => {
            const payload = {
              styles: {
                color: cssVarV2(`text/highlight/fg/${color}`),
              } satisfies AffineTextStyleAttributes,
            };
            std.command
              .chain()
              .try(chain => [
                chain
                  .pipe(getTextSelectionCommand)
                  .pipe(formatTextCommand, payload),
                chain
                  .pipe(getBlockSelectionsCommand)
                  .pipe(formatBlockCommand, payload),
                chain.pipe(formatNativeCommand, payload),
              ])
              .run();
          },
        })),
      ],
    },
    {
      name: 'Háttérszín',
      items: [
        {
          name: 'Alapértelmezett',
          icon: TextBackgroundDuotoneIcon(cssVarV2('text/highlight/bg/orange')),
        },
        ...(
          [
            'red',
            'orange',
            'yellow',
            'green',
            'teal',
            'blue',
            'purple',
            'grey',
          ] as const
        ).map<KeyboardToolbarActionItem>(color => ({
          name: highlightColorNames[color] ?? color,
          icon: TextBackgroundDuotoneIcon(
            cssVarV2(`text/highlight/bg/${color}`)
          ),
          action: ({ std }) => {
            const payload = {
              styles: {
                background: cssVarV2(`text/highlight/bg/${color}`),
              } satisfies AffineTextStyleAttributes,
            };
            std.command
              .chain()
              .try(chain => [
                chain
                  .pipe(getTextSelectionCommand)
                  .pipe(formatTextCommand, payload),
                chain
                  .pipe(getBlockSelectionsCommand)
                  .pipe(formatBlockCommand, payload),
                chain.pipe(formatNativeCommand, payload),
              ])
              .run();
          },
        })),
      ],
    },
  ],
};

const textSubToolbarConfig: KeyboardSubToolbarConfig = {
  icon: FontIcon(),
  items: [
    textToolPanel,
    ...textStyleToolItems,
    {
      name: 'Sorközi Egyenlet',
      icon: TeXIcon(),
      action: ({ std }) => {
        std.command
          .chain()
          .pipe(getTextSelectionCommand)
          .pipe(insertInlineLatex)
          .run();
      },
    },
    highlightToolPanel,
  ],
  autoShow: ({ std }) => {
    return computed(() => {
      const [_, { currentTextSelection: selection }] = std.command.exec(
        getTextSelectionCommand
      );
      return selection ? !selection.isCollapsed() : false;
    });
  },
};

export const defaultKeyboardToolbarConfig: KeyboardToolbarConfig = {
  items: [
    moreToolPanel,
    // TODO(@L-Sun): add ai function in AFFiNE side
    // { icon: AiIcon(iconStyle) },
    textSubToolbarConfig,
    {
      name: 'Kép',
      icon: ImageIcon(),
      showWhen: ({ std }) =>
        std.store.schema.flavourSchemaMap.has('affine:image'),
      action: ({ std }) => {
        std.command
          .chain()
          .pipe(getSelectedModelsCommand)
          .pipe(insertImagesCommand, { removeEmptyLine: true })
          .run();
      },
    },
    {
      name: 'Fájl',
      icon: AttachmentIcon(),
      showWhen: () => false,
      action: async ({ std }) => {
        const [_, { selectedModels }] = std.command.exec(
          getSelectedModelsCommand
        );
        const model = selectedModels?.[0];
        if (!model) return;

        const file = await openSingleFileWith();
        if (!file) return;

        await addSiblingAttachmentBlocks(std, [file], model);
        if (model.text?.length === 0) {
          std.store.deleteBlock(model);
        }
      },
    },
    {
      name: 'Vissza',
      icon: UndoIcon(),
      disableWhen: ({ std }) => !std.store.canUndo,
      action: ({ std }) => {
        std.store.undo();
      },
    },
    {
      name: 'Újra',
      icon: RedoIcon(),
      disableWhen: ({ std }) => !std.store.canRedo,
      action: ({ std }) => {
        std.store.redo();
      },
    },
    {
      name: 'Behúzás',
      icon: RightTabIcon(),
      disableWhen: ({ std }) => {
        const [success] = std.command
          .chain()
          .tryAll(chain => [
            chain.pipe(canIndentParagraphCommand),
            chain.pipe(canIndentListCommand),
          ])
          .run();
        return !success;
      },
      action: ({ std }) => {
        std.command
          .chain()
          .tryAll(chain => [
            chain.pipe(canIndentParagraphCommand).pipe(indentParagraphCommand),
            chain.pipe(canIndentListCommand).pipe(indentListCommand),
          ])
          .run();
      },
    },
    ...listToolActionItems,
    ...textToolActionItems.filter(({ name }) => name === 'Elválasztó'),
    {
      name: 'Visszahúzás',
      icon: CollapseTabIcon(),
      disableWhen: ({ std }) => {
        const [success] = std.command
          .chain()
          .tryAll(chain => [
            chain.pipe(canDedentParagraphCommand),
            chain.pipe(canDedentListCommand),
          ])
          .run();
        return !success;
      },
      action: ({ std }) => {
        std.command
          .chain()
          .tryAll(chain => [
            chain.pipe(canDedentParagraphCommand).pipe(dedentParagraphCommand),
            chain.pipe(canDedentListCommand).pipe(dedentListCommand),
          ])
          .run();
      },
    },
    {
      name: 'Másolás',
      icon: CopyIcon(),
      action: ({ std }) => {
        std.command
          .chain()
          .pipe(getSelectedModelsCommand)
          .with({
            onCopy: () => {
              toast(std.host, 'Vágólapra másolva');
            },
          })
          .pipe(draftSelectedModelsCommand)
          .pipe(copySelectedModelsCommand)
          .run();
      },
    },
    {
      name: 'Duplikálás',
      icon: DuplicateIcon(),
      action: ({ std }) => {
        std.command
          .chain()
          .pipe(getSelectedModelsCommand)
          .pipe(duplicateSelectedModelsCommand)
          .run();
      },
    },
    {
      name: 'Törlés',
      icon: DeleteIcon(),
      action: ({ std }) => {
        std.command
          .chain()
          .pipe(getSelectedModelsCommand)
          .pipe(deleteSelectedModelsCommand)
          .run();
      },
    },
  ],
};

export const KeyboardToolbarConfigExtension = ConfigExtensionFactory<
  Partial<KeyboardToolbarConfig>
>('affine:keyboard-toolbar');
