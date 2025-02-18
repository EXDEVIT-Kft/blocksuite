import type { FrameBlockModel } from '@algogrind/affine-model';
import type { AffineTextAttributes } from '@algogrind/affine-shared/types';
import type { BlockStdScope } from '@algogrind/block-std';
import type { TemplateResult } from 'lit';

import {
  //getInlineEditorByModel,
  insertContent,
  //REFERENCE_NODE,
} from '@algogrind/affine-components/rich-text';
import { toast } from '@algogrind/affine-components/toast';
import {
  //createDefaultDoc,
  openFileOrFiles,
} from '@algogrind/affine-shared/utils';
//import { viewPresets } from '@algogrind/data-view/view-presets';
//import { assertType } from '@algogrind/global/utils';
import {
  BulletedListIcon,
  CodeBlockIcon,
  DividerIcon,
  NumberedListIcon,
  QuoteIcon,
  TextIcon,
} from '@algogrind/affine-components/icons';
import {
  AttachmentIcon,
  BoldIcon,
  CheckBoxCheckLinearIcon,
  CloseIcon,
  CodeIcon,
  CollapseTabIcon,
  CopyIcon,
  //DatabaseKanbanViewIcon,
  //DatabaseTableViewIcon,
  DeleteIcon,
  DuplicateIcon,
  FontIcon,
  FrameIcon,
  GithubIcon,
  GroupIcon,
  ImageIcon,
  ItalicIcon,
  //LinkedPageIcon,
  LinkIcon,
  LoomLogoIcon,
  //NewPageIcon,
  NowIcon,
  PlusIcon,
  RedoIcon,
  RightTabIcon,
  StrikeThroughIcon,
  TeXIcon,
  TodayIcon,
  TomorrowIcon,
  UnderLineIcon,
  UndoIcon,
  YesterdayIcon,
  YoutubeDuotoneIcon,
} from '@blocksuite/icons/lit';
import { cssVarV2 } from '@toeverything/theme/v2';

import type { PageRootBlockComponent } from '../../page/page-root-block.js';
//import type { AffineLinkedDocWidget } from '../linked-doc/index.js';

import { toggleEmbedCardCreateModal } from '../../../_common/components/embed-card/modal/embed-card-create-modal.js';
import { addSiblingAttachmentBlocks } from '../../../attachment-block/utils.js';
import { getSurfaceBlock } from '../../../surface-ref-block/utils.js';
import { formatDate, formatTime } from '../../utils/misc.js';
import {
  FigmaDuotoneIcon,
  HeadingIcon,
  HighLightDuotoneIcon,
  TextBackgroundDuotoneIcon,
  TextColorIcon,
} from './icons.js';

export type KeyboardToolbarConfig = {
  items: KeyboardToolbarItem[];
  /**
   * @description Whether to use the screen height as the keyboard height when the virtual keyboard API is not supported.
   * It is useful when the app is running in a webview and the keyboard is not overlaid on the content.
   * @default false
   */
  useScreenHeight?: boolean;
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
};

export type KeyboardToolbarContext = {
  std: BlockStdScope;
  rootComponent: PageRootBlockComponent;
  /**
   * Close tool bar, and blur the focus if blur is true, default is false
   */
  closeToolbar: (blur?: boolean) => void;
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
      std.doc.schema.flavourSchemaMap.has('affine:paragraph'),
    action: ({ std }) => {
      std.command.exec('updateBlockType', {
        flavour: 'affine:paragraph',
        props: { type: 'text' },
      });
    },
  },
  ...([1, 2, 3, 4, 5, 6] as const).map(i => ({
    name: `Címsor ${i}`,
    icon: HeadingIcon(i),
    showWhen: ({ std }: KeyboardToolbarContext) =>
      std.doc.schema.flavourSchemaMap.has('affine:paragraph'),
    action: ({ std }: KeyboardToolbarContext) => {
      std.command.exec('updateBlockType', {
        flavour: 'affine:paragraph',
        props: { type: `h${i}` },
      });
    },
  })),
  {
    name: 'Kód Blokk',
    showWhen: ({ std }) => std.doc.schema.flavourSchemaMap.has('affine:code'),
    icon: CodeBlockIcon,
    action: ({ std }) => {
      std.command.exec('updateBlockType', {
        flavour: 'affine:code',
      });
    },
  },
  {
    name: 'Idézet',
    showWhen: ({ std }) =>
      std.doc.schema.flavourSchemaMap.has('affine:paragraph'),
    icon: QuoteIcon,
    action: ({ std }) => {
      std.command.exec('updateBlockType', {
        flavour: 'affine:paragraph',
        props: { type: 'quote' },
      });
    },
  },
  {
    name: 'Elválasztó',
    icon: DividerIcon,
    showWhen: ({ std }) =>
      std.doc.schema.flavourSchemaMap.has('affine:divider'),
    action: ({ std }) => {
      std.command.exec('updateBlockType', {
        flavour: 'affine:divider',
        props: { type: 'divider' },
      });
    },
  },
  {
    name: 'Sorközi Egyenlet',
    icon: TeXIcon(),
    showWhen: ({ std }) =>
      std.doc.schema.flavourSchemaMap.has('affine:paragraph'),
    action: ({ std }) => {
      std.command.chain().getTextSelection().insertInlineLatex().run();
    },
  },
];

const listToolActionItems: KeyboardToolbarActionItem[] = [
  {
    name: 'Felsorolás',
    icon: BulletedListIcon,
    showWhen: ({ std }) => std.doc.schema.flavourSchemaMap.has('affine:list'),
    action: ({ std }) => {
      std.command.exec('updateBlockType', {
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
    showWhen: ({ std }) => std.doc.schema.flavourSchemaMap.has('affine:list'),
    action: ({ std }) => {
      std.command.exec('updateBlockType', {
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
    showWhen: ({ std }) => std.doc.schema.flavourSchemaMap.has('affine:list'),
    action: ({ std }) => {
      std.command.exec('updateBlockType', {
        flavour: 'affine:list',
        props: {
          type: 'todo',
        },
      });
    },
  },
];

//const pageToolGroup: KeyboardToolPanelGroup = {
//  name: 'Oldal',
//  items: [
//    {
//      name: 'Új oldal',
//      icon: NewPageIcon(),
//      showWhen: ({ std }) =>
//        std.doc.schema.flavourSchemaMap.has('affine:embed-linked-doc'),
//      action: ({ std }) => {
//        std.command
//          .chain()
//          .getSelectedModels()
//          .inline(({ selectedModels }) => {
//            const newDoc = createDefaultDoc(std.doc.collection);
//            if (!selectedModels?.length) return;
//            insertContent(std.host, selectedModels[0], REFERENCE_NODE, {
//              reference: {
//                type: 'LinkedPage',
//                pageId: newDoc.id,
//              },
//            });
//          })
//          .run();
//      },
//    },
//    {
//      name: 'Új hivatkozott oldal',
//      icon: LinkedPageIcon(),
//      showWhen: ({ std, rootComponent }) => {
//        const linkedDocWidget = std.view.getWidget(
//          'affine-linked-doc-widget',
//          rootComponent.model.id
//        );
//        if (!linkedDocWidget) return false;
//
//        return std.doc.schema.flavourSchemaMap.has('affine:embed-linked-doc');
//      },
//      action: ({ rootComponent, closeToolPanel }) => {
//        const { std } = rootComponent;
//
//        const linkedDocWidget = std.view.getWidget(
//          'affine-linked-doc-widget',
//          rootComponent.model.id
//        );
//        if (!linkedDocWidget) return;
//        assertType<AffineLinkedDocWidget>(linkedDocWidget);
//
//        const triggerKey = linkedDocWidget.config.triggerKeys[0];
//
//        std.command
//          .chain()
//          .getSelectedModels()
//          .inline(ctx => {
//            const { selectedModels } = ctx;
//            if (!selectedModels?.length) return;
//
//            const currentModel = selectedModels[0];
//            insertContent(std.host, currentModel, triggerKey);
//
//            const inlineEditor = getInlineEditorByModel(std.host, currentModel);
//            // Wait for range to be updated
//            inlineEditor?.slots.inlineRangeSync.once(() => {
//              linkedDocWidget.show('mobile');
//              closeToolPanel();
//            });
//          })
//          .run();
//      },
//    },
//  ],
//};

const contentMediaToolGroup: KeyboardToolPanelGroup = {
  name: 'Tartalom & Média',
  items: [
    {
      name: 'Kép',
      icon: ImageIcon(),
      showWhen: ({ std }) =>
        std.doc.schema.flavourSchemaMap.has('affine:image'),
      action: ({ std }) => {
        std.command
          .chain()
          .getSelectedModels()
          .insertImages({ removeEmptyLine: true })
          .run();
      },
    },
    {
      name: 'Weboldal',
      icon: LinkIcon(),
      showWhen: ({ std }) =>
        std.doc.schema.flavourSchemaMap.has('affine:bookmark'),
      action: async ({ std }) => {
        const { selectedModels } = std.command.exec('getSelectedModels');
        const model = selectedModels?.[0];
        if (!model) return;

        const parentModel = std.doc.getParent(model);
        if (!parentModel) return;

        const index = parentModel.children.indexOf(model) + 1;
        await toggleEmbedCardCreateModal(
          std.host,
          'Links',
          'A hozzáadott link kártya nézetben került megjelenítésre.',
          { mode: 'page', parentModel, index }
        );
        if (model.text?.length === 0) {
          std.doc.deleteBlock(model);
        }
      },
    },
    {
      name: 'Fájl',
      icon: AttachmentIcon(),
      showWhen: ({ std }) =>
        std.doc.schema.flavourSchemaMap.has('affine:attachment'),
      action: async ({ std }) => {
        const { selectedModels } = std.command.exec('getSelectedModels');
        const model = selectedModels?.[0];
        if (!model) return;

        const file = await openFileOrFiles();
        if (!file) return;

        const attachmentService = std.getService('affine:attachment');
        if (!attachmentService) return;
        const maxFileSize = attachmentService.maxFileSize;

        await addSiblingAttachmentBlocks(std.host, [file], maxFileSize, model);
        if (model.text?.length === 0) {
          std.doc.deleteBlock(model);
        }
      },
    },
    {
      name: 'Youtube',
      icon: YoutubeDuotoneIcon({
        style: `color: white`,
      }),
      showWhen: ({ std }) =>
        std.doc.schema.flavourSchemaMap.has('affine:embed-youtube'),
      action: async ({ std }) => {
        const { selectedModels } = std.command.exec('getSelectedModels');
        const model = selectedModels?.[0];
        if (!model) return;

        const parentModel = std.doc.getParent(model);
        if (!parentModel) return;

        const index = parentModel.children.indexOf(model) + 1;
        await toggleEmbedCardCreateModal(
          std.host,
          'YouTube',
          'A hozzáadott YouTube videó kártya nézetben került megjelenítésre.',
          { mode: 'page', parentModel, index }
        );
        if (model.text?.length === 0) {
          std.doc.deleteBlock(model);
        }
      },
    },
    {
      name: 'Github',
      icon: GithubIcon({ style: `color: black` }),
      showWhen: ({ std }) =>
        std.doc.schema.flavourSchemaMap.has('affine:embed-github'),
      action: async ({ std }) => {
        const { selectedModels } = std.command.exec('getSelectedModels');
        const model = selectedModels?.[0];
        if (!model) return;

        const parentModel = std.doc.getParent(model);
        if (!parentModel) return;

        const index = parentModel.children.indexOf(model) + 1;
        await toggleEmbedCardCreateModal(
          std.host,
          'GitHub',
          'A hozzáadott GitHub beágyazott elem kártya nézetben került megjelenítésre.',
          { mode: 'page', parentModel, index }
        );
        if (model.text?.length === 0) {
          std.doc.deleteBlock(model);
        }
      },
    },
    {
      name: 'Figma',
      icon: FigmaDuotoneIcon,
      showWhen: ({ std }) =>
        std.doc.schema.flavourSchemaMap.has('affine:embed-figma'),
      action: async ({ std }) => {
        const { selectedModels } = std.command.exec('getSelectedModels');
        const model = selectedModels?.[0];
        if (!model) return;

        const parentModel = std.doc.getParent(model);
        if (!parentModel) {
          return;
        }
        const index = parentModel.children.indexOf(model) + 1;
        await toggleEmbedCardCreateModal(
          std.host,
          'Figma',
          'A beágyazott Figma dokumentum kártya nézetben került megjelenítésre.',
          { mode: 'page', parentModel, index }
        );
        if (model.text?.length === 0) {
          std.doc.deleteBlock(model);
        }
      },
    },
    {
      name: 'Loom',
      icon: LoomLogoIcon({ style: `color: #625DF5` }),
      showWhen: ({ std }) =>
        std.doc.schema.flavourSchemaMap.has('affine:embed-loom'),
      action: async ({ std }) => {
        const { selectedModels } = std.command.exec('getSelectedModels');
        const model = selectedModels?.[0];
        if (!model) return;

        const parentModel = std.doc.getParent(model);
        if (!parentModel) return;

        const index = parentModel.children.indexOf(model) + 1;
        await toggleEmbedCardCreateModal(
          std.host,
          'Loom',
          'A beágyazott Loom videó kártya nézetben került megjelenítésre..',
          { mode: 'page', parentModel, index }
        );
        if (model.text?.length === 0) {
          std.doc.deleteBlock(model);
        }
      },
    },
    {
      name: 'Egyenlet',
      icon: TeXIcon(),
      showWhen: ({ std }) =>
        std.doc.schema.flavourSchemaMap.has('affine:latex'),
      action: ({ std }) => {
        std.command
          .chain()
          .getSelectedModels()
          .insertLatexBlock({
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
  const { doc } = std;

  const frameModels = doc
    .getBlocksByFlavour('affine:frame')
    .map(block => block.model) as FrameBlockModel[];

  const frameItems = frameModels.map<KeyboardToolbarActionItem>(frameModel => ({
    name: 'Keret: ' + frameModel.title.toString(),
    icon: FrameIcon(),
    action: ({ std }) => {
      std.command
        .chain()
        .getSelectedModels()
        .insertSurfaceRefBlock({
          reference: frameModel.id,
          place: 'after',
          removeEmptyLine: true,
        })
        .run();
    },
  }));

  const surfaceModel = getSurfaceBlock(doc);

  const groupElements = surfaceModel
    ? surfaceModel.getElementsByType('group')
    : [];

  const groupItems = groupElements.map<KeyboardToolbarActionItem>(group => ({
    name: 'Csoport: ' + group.title.toString(),
    icon: GroupIcon(),
    action: ({ std }) => {
      std.command
        .chain()
        .getSelectedModels()
        .insertSurfaceRefBlock({
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
        const { selectedModels } = std.command.exec('getSelectedModels');
        const model = selectedModels?.[0];
        if (!model) return;

        insertContent(std.host, model, formatDate(new Date()));
      },
    },
    {
      name: 'Holnap',
      icon: TomorrowIcon(),
      action: ({ std }) => {
        const { selectedModels } = std.command.exec('getSelectedModels');
        const model = selectedModels?.[0];
        if (!model) return;

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        insertContent(std.host, model, formatDate(tomorrow));
      },
    },
    {
      name: 'Tegnap',
      icon: YesterdayIcon(),
      action: ({ std }) => {
        const { selectedModels } = std.command.exec('getSelectedModels');
        const model = selectedModels?.[0];
        if (!model) return;

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        insertContent(std.host, model, formatDate(yesterday));
      },
    },
    {
      name: 'Most',
      icon: NowIcon(),
      action: ({ std }) => {
        const { selectedModels } = std.command.exec('getSelectedModels');
        const model = selectedModels?.[0];
        if (!model) return;

        insertContent(std.host, model, formatTime(new Date()));
      },
    },
  ],
};

//const databaseToolGroup: KeyboardToolPanelGroup = {
//  name: 'Adatbázis',
//  items: [
//    {
//      name: 'Táblázat',
//      icon: DatabaseTableViewIcon(),
//      showWhen: ({ std }) =>
//        std.doc.schema.flavourSchemaMap.has('affine:database'),
//      action: ({ std }) => {
//        std.command
//          .chain()
//          .getSelectedModels()
//          .insertDatabaseBlock({
//            viewType: viewPresets.tableViewMeta.type,
//            place: 'after',
//            removeEmptyLine: true,
//          })
//          .run();
//      },
//    },
//    {
//      name: 'Kanban',
//      icon: DatabaseKanbanViewIcon(),
//      showWhen: ({ std }) =>
//        std.doc.schema.flavourSchemaMap.has('affine:database'),
//      action: ({ std }) => {
//        std.command
//          .chain()
//          .getSelectedModels()
//          .insertDatabaseBlock({
//            viewType: viewPresets.kanbanViewMeta.type,
//            place: 'after',
//            removeEmptyLine: true,
//          })
//          .run();
//      },
//    },
//  ],
//};

const moreToolPanel: KeyboardToolPanelConfig = {
  icon: PlusIcon(),
  activeIcon: CloseIcon({
    style: `color: ${cssVarV2('icon/activated')}`,
  }),
  activeBackground: cssVarV2('edgeless/selection/selectionMarqueeBackground'),
  groups: [
    { name: 'Alapvető', items: textToolActionItems },
    { name: 'Felsorolás', items: listToolActionItems },
    //pageToolGroup,
    contentMediaToolGroup,
    documentGroupFrameToolGroup,
    dateToolGroup,
    // databaseToolGroup,
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
      const { textStyle } = std.command.exec('getTextStyle');
      return textStyle?.bold ? '#00000012' : '';
    },
    action: ({ std }) => {
      std.command.exec('toggleBold');
    },
  },
  {
    name: 'Dőlt',
    icon: ItalicIcon(),
    background: ({ std }) => {
      const { textStyle } = std.command.exec('getTextStyle');
      return textStyle?.italic ? '#00000012' : '';
    },
    action: ({ std }) => {
      std.command.exec('toggleItalic');
    },
  },
  {
    name: 'Aláhúzott',
    icon: UnderLineIcon(),
    background: ({ std }) => {
      const { textStyle } = std.command.exec('getTextStyle');
      return textStyle?.underline ? '#00000012' : '';
    },
    action: ({ std }) => {
      std.command.exec('toggleUnderline');
    },
  },
  {
    name: 'Áthúzott',
    icon: StrikeThroughIcon(),
    background: ({ std }) => {
      const { textStyle } = std.command.exec('getTextStyle');
      return textStyle?.strike ? '#00000012' : '';
    },
    action: ({ std }) => {
      std.command.exec('toggleStrike');
    },
  },
  {
    name: 'Kód',
    icon: CodeIcon(),
    background: ({ std }) => {
      const { textStyle } = std.command.exec('getTextStyle');
      return textStyle?.code ? '#00000012' : '';
    },
    action: ({ std }) => {
      std.command.exec('toggleCode');
    },
  },
  {
    name: 'Link',
    icon: LinkIcon(),
    background: ({ std }) => {
      const { textStyle } = std.command.exec('getTextStyle');
      return textStyle?.link ? '#00000012' : '';
    },
    action: ({ std }) => {
      std.command.exec('toggleLink');
    },
  },
];

const highlightToolPanel: KeyboardToolPanelConfig = {
  icon: ({ std }) => {
    const { textStyle } = std.command.exec('getTextStyle');
    if (textStyle?.color) {
      return HighLightDuotoneIcon(textStyle.color);
    } else {
      return HighLightDuotoneIcon('var(--algogrind-text-paragraph-color)');
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
          name: color.charAt(0).toUpperCase() + color.slice(1),
          icon: TextColorIcon(cssVarV2(`text/highlight/fg/${color}`)),
          action: ({ std }) => {
            const payload = {
              styles: {
                color: cssVarV2(`text/highlight/fg/${color}`),
              } satisfies AffineTextAttributes,
            };
            std.command
              .chain()
              .try(chain => [
                chain.getTextSelection().formatText(payload),
                chain.getBlockSelections().formatBlock(payload),
                chain.formatNative(payload),
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
          name: color.charAt(0).toUpperCase() + color.slice(1),
          icon: TextBackgroundDuotoneIcon(
            cssVarV2(`text/highlight/bg/${color}`)
          ),
          action: ({ std }) => {
            const payload = {
              styles: {
                background: cssVarV2(`text/highlight/bg/${color}`),
              } satisfies AffineTextAttributes,
            };
            std.command
              .chain()
              .try(chain => [
                chain.getTextSelection().formatText(payload),
                chain.getBlockSelections().formatBlock(payload),
                chain.formatNative(payload),
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
        std.command.chain().getTextSelection().insertInlineLatex().run();
      },
    },
    highlightToolPanel,
  ],
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
        std.doc.schema.flavourSchemaMap.has('affine:image'),
      action: ({ std }) => {
        std.command
          .chain()
          .getSelectedModels()
          .insertImages({ removeEmptyLine: true })
          .run();
      },
    },
    {
      name: 'Fájl',
      icon: AttachmentIcon(),
      showWhen: ({ std }) =>
        std.doc.schema.flavourSchemaMap.has('affine:attachment'),
      action: async ({ std }) => {
        const { selectedModels } = std.command.exec('getSelectedModels');
        const model = selectedModels?.[0];
        if (!model) return;

        const file = await openFileOrFiles();
        if (!file) return;

        const attachmentService = std.getService('affine:attachment');
        if (!attachmentService) return;
        const maxFileSize = attachmentService.maxFileSize;

        await addSiblingAttachmentBlocks(std.host, [file], maxFileSize, model);
        if (model.text?.length === 0) {
          std.doc.deleteBlock(model);
        }
      },
    },
    {
      name: 'Vissza',
      icon: UndoIcon(),
      disableWhen: ({ std }) => !std.doc.canUndo,
      action: ({ std }) => {
        std.doc.undo();
      },
    },
    {
      name: 'Újra',
      icon: RedoIcon(),
      disableWhen: ({ std }) => !std.doc.canRedo,
      action: ({ std }) => {
        std.doc.redo();
      },
    },
    {
      name: 'Behúzás',
      icon: RightTabIcon(),
      disableWhen: ({ std }) => {
        const [success] = std.command
          .chain()
          .tryAll(chain => [chain.canIndentParagraph(), chain.canIndentList()])
          .run();
        return !success;
      },
      action: ({ std }) => {
        std.command
          .chain()
          .tryAll(chain => [
            chain.canIndentParagraph().indentParagraph(),
            chain.canIndentList().indentList(),
          ])
          .run();
      },
    },
    ...listToolActionItems,
    ...textToolActionItems.filter(({ name }) => name === 'Divider'),
    {
      name: 'Visszahúzás',
      icon: CollapseTabIcon(),
      disableWhen: ({ std }) => {
        const [success] = std.command
          .chain()
          .tryAll(chain => [chain.canDedentParagraph(), chain.canDedentList()])
          .run();
        return !success;
      },
      action: ({ std }) => {
        std.command
          .chain()
          .tryAll(chain => [
            chain.canDedentParagraph().dedentParagraph(),
            chain.canDedentList().dedentList(),
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
          .getSelectedModels()
          .with({
            onCopy: () => {
              toast(std.host, 'Vágólapra másolva');
            },
          })
          .draftSelectedModels()
          .copySelectedModels()
          .run();
      },
    },
    {
      name: 'Duplikálás',
      icon: DuplicateIcon(),
      action: ({ std }) => {
        std.command
          .chain()
          .getSelectedModels()
          .draftSelectedModels()
          .duplicateSelectedModels()
          .run();
      },
    },
    {
      name: 'Törlés',
      icon: DeleteIcon(),
      action: ({ std }) => {
        std.command.chain().getSelectedModels().deleteSelectedModels().run();
      },
    },
  ],
  useScreenHeight: false,
};
