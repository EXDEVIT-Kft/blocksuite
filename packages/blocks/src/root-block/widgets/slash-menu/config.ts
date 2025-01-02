import type {
  FrameBlockModel,
  ParagraphBlockModel,
} from '@algogrind/affine-model';
import type { DeltaInsert } from '@algogrind/inline';
import type { BlockModel } from '@algogrind/store';
import type { TemplateResult } from 'lit';

import {
  FigmaIcon,
  GithubIcon,
  LoomIcon,
  YoutubeIcon,
} from '@algogrind/affine-block-embed';
import {
  ArrowDownBigIcon,
  ArrowUpBigIcon,
  //ArrowUpSmallIcon,
  CopyIcon,
  //DatabaseKanbanViewIcon20,
  //DatabaseTableViewIcon20,
  DeleteIcon,
  FileIcon,
  FrameIcon,
  HeadingIcon,
  ImageIcon20,
  //LinkedDocIcon,
  LinkIcon,
  //NewDocIcon,
  NowIcon,
  TodayIcon,
  TomorrowIcon,
  YesterdayIcon,
} from '@algogrind/affine-components/icons';
import {
  //getInlineEditorByModel,
  insertContent,
  //REFERENCE_NODE,
  textFormatConfigs,
} from '@algogrind/affine-components/rich-text';
import { toast } from '@algogrind/affine-components/toast';
import {
  //createDefaultDoc,
  openFileOrFiles,
} from '@algogrind/affine-shared/utils';
import { Slice, Text } from '@algogrind/store';
//import { viewPresets } from '@algogrind/data-view/view-presets';
//import { assertType } from '@algogrind/global/utils';
import { DualLinkIcon, GroupingIcon, TeXIcon } from '@blocksuite/icons/lit';

//import type { DataViewBlockComponent } from '../../../data-view-block/index.js';
import type { RootBlockComponent } from '../../types.js';
//import type { AffineLinkedDocWidget } from '../linked-doc/index.js';

import { toggleEmbedCardCreateModal } from '../../../_common/components/embed-card/modal/embed-card-create-modal.js';
import { textConversionConfigs } from '../../../_common/configs/text-conversion.js';
import { addSiblingAttachmentBlocks } from '../../../attachment-block/utils.js';
import { getSurfaceBlock } from '../../../surface-ref-block/utils.js';
//import { onModelTextUpdated } from '../../utils/callback.js';
import { formatDate, formatTime } from '../../utils/misc.js';
import { type SlashMenuTooltip, slashMenuToolTips } from './tooltips/index.js';
import {
  createConversionItem,
  createTextFormatItem,
  insideEdgelessText,
  tryRemoveEmptyLine,
} from './utils.js';

export type SlashMenuConfig = {
  triggerKeys: string[];
  ignoreBlockTypes: BlockSuite.Flavour[];
  items: SlashMenuItem[];
  maxHeight: number;
  tooltipTimeout: number;
};

export type SlashMenuStaticConfig = Omit<SlashMenuConfig, 'items'> & {
  items: SlashMenuStaticItem[];
};

export type SlashMenuItem = SlashMenuStaticItem | SlashMenuItemGenerator;

export type SlashMenuStaticItem =
  | SlashMenuGroupDivider
  | SlashMenuActionItem
  | SlashSubMenu;

export type SlashMenuGroupDivider = {
  groupName: string;
  showWhen?: (ctx: SlashMenuContext) => boolean;
};

export type SlashMenuActionItem = {
  name: string;
  description?: string;
  icon?: TemplateResult;
  tooltip?: SlashMenuTooltip;
  alias?: string[];
  showWhen?: (ctx: SlashMenuContext) => boolean;
  action: (ctx: SlashMenuContext) => void | Promise<void>;

  customTemplate?: TemplateResult<1>;
};

export type SlashSubMenu = {
  name: string;
  description?: string;
  icon?: TemplateResult;
  alias?: string[];
  showWhen?: (ctx: SlashMenuContext) => boolean;
  subMenu: SlashMenuStaticItem[];
};

export type SlashMenuItemGenerator = (
  ctx: SlashMenuContext
) => (SlashMenuGroupDivider | SlashMenuActionItem | SlashSubMenu)[];

export type SlashMenuContext = {
  rootComponent: RootBlockComponent;
  model: BlockModel;
};

export const defaultSlashMenuConfig: SlashMenuConfig = {
  triggerKeys: ['/'],
  ignoreBlockTypes: ['affine:code'],
  maxHeight: 344,
  tooltipTimeout: 800,
  items: [
    // ---------------------------------------------------------
    { groupName: 'Alapvető' },
    ...textConversionConfigs
      .filter(i => i.type && ['h1', 'h2', 'h3', 'text'].includes(i.type))
      .map(createConversionItem),
    {
      name: 'Egyéb Címsorok',
      icon: HeadingIcon,
      subMenu: [
        { groupName: 'Címsorok' },
        ...textConversionConfigs
          .filter(i => i.type && ['h4', 'h5', 'h6'].includes(i.type))
          .map<SlashMenuActionItem>(createConversionItem),
      ],
    },
    ...textConversionConfigs
      .filter(i => i.flavour === 'affine:code')
      .map<SlashMenuActionItem>(createConversionItem),

    ...textConversionConfigs
      .filter(i => i.type && ['divider', 'quote'].includes(i.type))
      .map<SlashMenuActionItem>(config => ({
        ...createConversionItem(config),
        showWhen: ({ model }) =>
          model.doc.schema.flavourSchemaMap.has(config.flavour) &&
          !insideEdgelessText(model),
      })),

    {
      name: 'Sorközi Egyenlet',
      description: 'Szúrj be egy új sorközi egyenletet.',
      icon: TeXIcon({
        width: '20',
        height: '20',
      }),
      tooltip: slashMenuToolTips['Sorközi Egyenlet'],
      alias: ['matematika', 'számolás', 'latex'],
      action: ({ rootComponent }) => {
        rootComponent.std.command
          .chain()
          .getTextSelection()
          .insertInlineLatex()
          .run();
      },
    },

    /*
    { groupName: 'Elrendezés' },
    {
      name: 'Összecsukható Címsor 1',
      description: 'Összecsukható tartalmú Címsor 1.',
      alias: [
        'accordion',
        'accordion heading',
        'legördülő',
        'legördülő címsor 1',
      ],
      icon: ArrowUpSmallIcon,
      tooltip: slashMenuToolTips['Összecsukható Címsor'],
      showWhen: ({ model }) =>
        model.doc.schema.flavourSchemaMap.has('algogrind:accordion'),
      action: ({ rootComponent, model }) => {
        const parentModel = rootComponent.doc.getParent(model);
        if (!parentModel) {
          return;
        }

        rootComponent.host.std.command
          .chain()
          .updateBlockType({
            flavour: 'algogrind:accordion',
            props: { type: 'h1', text: new Text('') },
          })
          .inline((ctx, next) => {
            const newModels = ctx.updatedBlocks;
            if (!newModels) return false;

            if (newModels.length !== 1) {
              console.error(
                "Failed to reset selection! New model length isn't 1"
              );
              return false;
            }
            const codeModel = newModels[0];
            onModelTextUpdated(rootComponent.host, codeModel, richText => {
              const inlineEditor = richText.inlineEditor;
              if (!inlineEditor) return;
              inlineEditor.focusEnd();
            }).catch(console.error);

            return next();
          })
          .run();

        tryRemoveEmptyLine(model);
      },
    },
    {
      name: 'Összecsukható Címsor 2',
      description: 'Összecsukható tartalmú Címsor 2.',
      alias: [
        'accordion',
        'accordion heading',
        'legördülő',
        'legördülő címsor 2',
      ],
      icon: ArrowUpSmallIcon,
      tooltip: slashMenuToolTips['Összecsukható Címsor'],
      showWhen: ({ model }) =>
        model.doc.schema.flavourSchemaMap.has('algogrind:accordion'),
      action: ({ rootComponent, model }) => {
        const parentModel = rootComponent.doc.getParent(model);
        if (!parentModel) {
          return;
        }

        rootComponent.host.std.command
          .chain()
          .updateBlockType({
            flavour: 'algogrind:accordion',
            props: { type: 'h2', text: new Text('') },
          })
          .inline((ctx, next) => {
            const newModels = ctx.updatedBlocks;
            if (!newModels) return false;

            if (newModels.length !== 1) {
              console.error(
                "Failed to reset selection! New model length isn't 1"
              );
              return false;
            }
            const codeModel = newModels[0];
            onModelTextUpdated(rootComponent.host, codeModel, richText => {
              const inlineEditor = richText.inlineEditor;
              if (!inlineEditor) return;
              inlineEditor.focusEnd();
            }).catch(console.error);

            return next();
          })
          .run();

        tryRemoveEmptyLine(model);
      },
    },
    {
      name: 'Összecsukható Címsor 3',
      description: 'Összecsukható tartalmú Címsor 3.',
      alias: [
        'accordion',
        'accordion heading',
        'legördülő',
        'legördülő címsor 3',
      ],
      icon: ArrowUpSmallIcon,
      tooltip: slashMenuToolTips['Összecsukható Címsor'],
      showWhen: ({ model }) =>
        model.doc.schema.flavourSchemaMap.has('algogrind:accordion'),
      action: ({ rootComponent, model }) => {
        const parentModel = rootComponent.doc.getParent(model);
        if (!parentModel) {
          return;
        }

        rootComponent.host.std.command
          .chain()
          .updateBlockType({
            flavour: 'algogrind:accordion',
            props: { type: 'h3', text: new Text('') },
          })
          .inline((ctx, next) => {
            const newModels = ctx.updatedBlocks;
            if (!newModels) return false;

            if (newModels.length !== 1) {
              console.error(
                "Failed to reset selection! New model length isn't 1"
              );
              return false;
            }
            const codeModel = newModels[0];
            onModelTextUpdated(rootComponent.host, codeModel, richText => {
              const inlineEditor = richText.inlineEditor;
              if (!inlineEditor) return;
              inlineEditor.focusEnd();
            }).catch(console.error);

            return next();
          })
          .run();

        tryRemoveEmptyLine(model);
      },
    },
    {
      name: 'További Címsorok',
      icon: ArrowUpSmallIcon,
      subMenu: [
        { groupName: 'Összecsukható Címsorok' },
        {
          name: 'Összecsukható Címsor 4',
          description: 'Összecsukható tartalmú Címsor 4.',
          alias: [
            'accordion',
            'accordion heading',
            'legördülő',
            'legördülő címsor 4',
          ],
          icon: ArrowUpSmallIcon,
          tooltip: slashMenuToolTips['Összecsukható Címsor'],
          showWhen: ({ model }) =>
            model.doc.schema.flavourSchemaMap.has('algogrind:accordion'),
          action: ({ rootComponent, model }) => {
            const parentModel = rootComponent.doc.getParent(model);
            if (!parentModel) {
              return;
            }

            rootComponent.host.std.command
              .chain()
              .updateBlockType({
                flavour: 'algogrind:accordion',
                props: { type: 'h4', text: new Text('') },
              })
              .inline((ctx, next) => {
                const newModels = ctx.updatedBlocks;
                if (!newModels) return false;

                if (newModels.length !== 1) {
                  console.error(
                    "Failed to reset selection! New model length isn't 1"
                  );
                  return false;
                }
                const codeModel = newModels[0];
                onModelTextUpdated(rootComponent.host, codeModel, richText => {
                  const inlineEditor = richText.inlineEditor;
                  if (!inlineEditor) return;
                  inlineEditor.focusEnd();
                }).catch(console.error);

                return next();
              })
              .run();

            tryRemoveEmptyLine(model);
          },
        },
        {
          name: 'Összecsukható Címsor 5',
          description: 'Összecsukható tartalmú Címsor 5.',
          alias: [
            'accordion',
            'accordion heading',
            'legördülő',
            'legördülő címsor 5',
          ],
          icon: ArrowUpSmallIcon,
          tooltip: slashMenuToolTips['Összecsukható Címsor'],
          showWhen: ({ model }) =>
            model.doc.schema.flavourSchemaMap.has('algogrind:accordion'),
          action: ({ rootComponent, model }) => {
            const parentModel = rootComponent.doc.getParent(model);
            if (!parentModel) {
              return;
            }

            rootComponent.host.std.command
              .chain()
              .updateBlockType({
                flavour: 'algogrind:accordion',
                props: { type: 'h5', text: new Text('') },
              })
              .inline((ctx, next) => {
                const newModels = ctx.updatedBlocks;
                if (!newModels) return false;

                if (newModels.length !== 1) {
                  console.error(
                    "Failed to reset selection! New model length isn't 1"
                  );
                  return false;
                }
                const codeModel = newModels[0];
                onModelTextUpdated(rootComponent.host, codeModel, richText => {
                  const inlineEditor = richText.inlineEditor;
                  if (!inlineEditor) return;
                  inlineEditor.focusEnd();
                }).catch(console.error);

                return next();
              })
              .run();

            tryRemoveEmptyLine(model);
          },
        },
        {
          name: 'Összecsukható Címsor 6',
          description: 'Összecsukható tartalmú Címsor 6.',
          alias: [
            'accordion',
            'accordion heading',
            'legördülő',
            'legördülő címsor 6',
          ],
          icon: ArrowUpSmallIcon,
          tooltip: slashMenuToolTips['Összecsukható Címsor'],
          showWhen: ({ model }) =>
            model.doc.schema.flavourSchemaMap.has('algogrind:accordion'),
          action: ({ rootComponent, model }) => {
            const parentModel = rootComponent.doc.getParent(model);
            if (!parentModel) {
              return;
            }

            rootComponent.host.std.command
              .chain()
              .updateBlockType({
                flavour: 'algogrind:accordion',
                props: { type: 'h6', text: new Text('') },
              })
              .inline((ctx, next) => {
                const newModels = ctx.updatedBlocks;
                if (!newModels) return false;

                if (newModels.length !== 1) {
                  console.error(
                    "Failed to reset selection! New model length isn't 1"
                  );
                  return false;
                }
                const codeModel = newModels[0];
                onModelTextUpdated(rootComponent.host, codeModel, richText => {
                  const inlineEditor = richText.inlineEditor;
                  if (!inlineEditor) return;
                  inlineEditor.focusEnd();
                }).catch(console.error);

                return next();
              })
              .run();

            tryRemoveEmptyLine(model);
          },
        },
      ],
    },
    {
      name: 'Összecsukható Szöveg',
      description: 'Összecsukható Szöveg elem.',
      alias: ['accordion', 'accordion text', 'legördülő', 'legördülő szöveg'],
      icon: ArrowUpSmallIcon,
      tooltip: slashMenuToolTips['Összecsukható Szöveg'],
      showWhen: ({ model }) =>
        model.doc.schema.flavourSchemaMap.has('algogrind:accordion'),
      action: ({ rootComponent, model }) => {
        const parentModel = rootComponent.doc.getParent(model);
        if (!parentModel) {
          return;
        }

        rootComponent.host.std.command
          .chain()
          .updateBlockType({
            flavour: 'algogrind:accordion',
            props: { type: 'text', text: new Text('') },
          })
          .inline((ctx, next) => {
            const newModels = ctx.updatedBlocks;
            if (!newModels) return false;

            if (newModels.length !== 1) {
              console.error(
                "Failed to reset selection! New model length isn't 1"
              );
              return false;
            }
            const codeModel = newModels[0];
            onModelTextUpdated(rootComponent.host, codeModel, richText => {
              const inlineEditor = richText.inlineEditor;
              if (!inlineEditor) return;
              inlineEditor.focusEnd();
            }).catch(console.error);

            return next();
          })
          .run();

        tryRemoveEmptyLine(model);
      },
    },
    */

    // ---------------------------------------------------------
    { groupName: 'Felsorolások' },
    ...textConversionConfigs
      .filter(i => i.flavour === 'affine:list')
      .map(createConversionItem),

    // ---------------------------------------------------------
    { groupName: 'Stílusok' },
    ...textFormatConfigs
      .filter(i => !['Kód', 'Link'].includes(i.name))
      .map<SlashMenuActionItem>(createTextFormatItem),

    // ---------------------------------------------------------
    /*{
      groupName: 'Oldalak',
      showWhen: ({ model }) =>
        model.doc.schema.flavourSchemaMap.has('affine:embed-linked-doc'),
    },
    {
      name: 'Új Dokumentum',
      description: 'Hozz létre egy új dokumentumot.',
      icon: NewDocIcon,
      tooltip: slashMenuToolTips['Új Dokumentum'],
      alias: ['new doc', 'oldal'],
      showWhen: ({ model }) =>
        model.doc.schema.flavourSchemaMap.has('affine:embed-linked-doc'),
      action: ({ rootComponent, model }) => {
        const newDoc = createDefaultDoc(rootComponent.doc.collection);
        insertContent(rootComponent.host, model, REFERENCE_NODE, {
          reference: {
            type: 'LinkedPage',
            pageId: newDoc.id,
          },
        });
      },
    },
    {
      name: 'Hivatkozás',
      description: 'Meglévő dokumentumra hivatkozás.',
      icon: LinkedDocIcon,
      tooltip: slashMenuToolTips['Hivatkozás'],
      alias: ['link doc'],
      showWhen: ({ rootComponent, model }) => {
        const { std } = rootComponent;
        const linkedDocWidget = std.view.getWidget(
          'affine-linked-doc-widget',
          rootComponent.model.id
        );
        if (!linkedDocWidget) return false;

        return model.doc.schema.flavourSchemaMap.has('affine:embed-linked-doc');
      },
      action: ({ model, rootComponent }) => {
        const { std } = rootComponent;

        const linkedDocWidget = std.view.getWidget(
          'affine-linked-doc-widget',
          rootComponent.model.id
        );
        if (!linkedDocWidget) return;
        assertType<AffineLinkedDocWidget>(linkedDocWidget);

        const triggerKey = linkedDocWidget.config.triggerKeys[0];

        insertContent(rootComponent.host, model, triggerKey);

        const inlineEditor = getInlineEditorByModel(rootComponent.host, model);
        // Wait for range to be updated
        inlineEditor?.slots.inlineRangeSync.once(() => {
          linkedDocWidget.show();
        });
      },
    },*/

    // ---------------------------------------------------------
    { groupName: 'Tartalom & Média' },
    {
      name: 'Kép',
      description: 'Szúrj be egy képet.',
      icon: ImageIcon20,
      tooltip: slashMenuToolTips['Kép'],
      alias: ['image', 'picture', 'gif', 'grafika'],
      showWhen: ({ model }) =>
        model.doc.schema.flavourSchemaMap.has('affine:image'),
      action: async ({ rootComponent }) => {
        const [success, ctx] = rootComponent.std.command
          .chain()
          .getSelectedModels()
          .insertImages({ removeEmptyLine: true })
          .run();

        if (success) await ctx.insertedImageIds;
      },
    },
    {
      name: 'Weboldal',
      description: 'Hivatkozz egy külső weboldalra elegánsan.',
      icon: LinkIcon,
      tooltip: slashMenuToolTips['Weboldal'],
      alias: ['hivatkozás', 'link', 'bookmark', 'website'],
      showWhen: ({ model }) =>
        model.doc.schema.flavourSchemaMap.has('affine:bookmark'),
      action: async ({ rootComponent, model }) => {
        const parentModel = rootComponent.doc.getParent(model);
        if (!parentModel) {
          return;
        }
        const index = parentModel.children.indexOf(model) + 1;
        await toggleEmbedCardCreateModal(
          rootComponent.host,
          'Weboldal hivatkozása',
          'A hozzáadott weboldal kártya nézetben lesz megjelenítve.',
          { mode: 'page', parentModel, index }
        );
        tryRemoveEmptyLine(model);
      },
    },
    {
      name: 'Fájl',
      description: 'Mellékelj egy tetszőleges fájlt.',
      icon: FileIcon,
      tooltip: slashMenuToolTips['Fájl'],
      alias: ['file', 'attachment', 'melléklet', 'forrás'],
      showWhen: ({ model }) =>
        model.doc.schema.flavourSchemaMap.has('affine:attachment'),
      action: async ({ rootComponent, model }) => {
        const file = await openFileOrFiles();
        if (!file) return;

        const attachmentService =
          rootComponent.std.getService('affine:attachment');
        if (!attachmentService) return;
        const maxFileSize = attachmentService.maxFileSize;

        await addSiblingAttachmentBlocks(
          rootComponent.host,
          [file],
          maxFileSize,
          model
        );
        tryRemoveEmptyLine(model);
      },
    },
    {
      name: 'YouTube',
      description: 'Ágyazz be egy YouTube videót.',
      icon: YoutubeIcon,
      tooltip: slashMenuToolTips['YouTube'],
      alias: ['videó', 'video', 'embed', 'beágyaz'],
      showWhen: ({ model }) =>
        model.doc.schema.flavourSchemaMap.has('affine:embed-youtube'),
      action: async ({ rootComponent, model }) => {
        const parentModel = rootComponent.doc.getParent(model);
        if (!parentModel) {
          return;
        }
        const index = parentModel.children.indexOf(model) + 1;
        await toggleEmbedCardCreateModal(
          rootComponent.host,
          'YouTube',
          'A hozzáadott YouTube videó link beágyazott nézetben fog megjelenni.',
          { mode: 'page', parentModel, index }
        );
        tryRemoveEmptyLine(model);
      },
    },
    {
      name: 'GitHub',
      description: 'Hivatkozz egy GitHub forrásra.',
      icon: GithubIcon,
      tooltip: slashMenuToolTips['Github'],
      alias: ['embed', 'beágyaz'],
      showWhen: ({ model }) =>
        model.doc.schema.flavourSchemaMap.has('affine:embed-github'),
      action: async ({ rootComponent, model }) => {
        const parentModel = rootComponent.doc.getParent(model);
        if (!parentModel) {
          return;
        }
        const index = parentModel.children.indexOf(model) + 1;
        await toggleEmbedCardCreateModal(
          rootComponent.host,
          'GitHub',
          'A hozzáadott GitHub issue vagy Pull Request hivatkozás kártyanézetben lesz megjelenítve.',
          { mode: 'page', parentModel, index }
        );
        tryRemoveEmptyLine(model);
      },
    },
    // TODO: X Twitter

    {
      name: 'Figma',
      description: 'Ágyazz be egy Figma dokumentumot.',
      icon: FigmaIcon,
      tooltip: slashMenuToolTips['Figma'],
      alias: ['embed', 'beágyaz'],
      showWhen: ({ model }) =>
        model.doc.schema.flavourSchemaMap.has('affine:embed-figma'),
      action: async ({ rootComponent, model }) => {
        const parentModel = rootComponent.doc.getParent(model);
        if (!parentModel) {
          return;
        }
        const index = parentModel.children.indexOf(model) + 1;
        await toggleEmbedCardCreateModal(
          rootComponent.host,
          'Figma',
          'A hozzáadott Figma hivatkozás beágyazott nézetben fog megjelenni.',
          { mode: 'page', parentModel, index }
        );
        tryRemoveEmptyLine(model);
      },
    },

    {
      name: 'Loom Videó',
      icon: LoomIcon,
      description: 'Ágyazz be egy Loom videót.',
      alias: ['embed', 'beágyaz'],
      showWhen: ({ model }) =>
        model.doc.schema.flavourSchemaMap.has('affine:embed-loom'),
      action: async ({ rootComponent, model }) => {
        const parentModel = rootComponent.doc.getParent(model);
        if (!parentModel) {
          return;
        }
        const index = parentModel.children.indexOf(model) + 1;
        await toggleEmbedCardCreateModal(
          rootComponent.host,
          'Loom Videó',
          'A hozzáadott Loom videó hivatkozás beágyazott nézetben fog megjelenni.',
          { mode: 'page', parentModel, index }
        );
        tryRemoveEmptyLine(model);
      },
    },

    {
      name: 'Egyenlet',
      description: 'Hozz létre egy új egyenlet blokkot.',
      icon: TeXIcon({
        width: '20',
        height: '20',
      }),
      tooltip: slashMenuToolTips['Egyenlet'],
      alias: ['equation', 'matematika', 'latex'],
      action: ({ rootComponent }) => {
        rootComponent.std.command
          .chain()
          .getSelectedModels()
          .insertLatexBlock({
            place: 'after',
            removeEmptyLine: true,
          })
          .run();
      },
    },

    // TODO(@L-Sun): Linear

    // ---------------------------------------------------------
    ({ model, rootComponent }) => {
      const { doc } = rootComponent;

      const surfaceModel = getSurfaceBlock(doc);
      if (!surfaceModel) return [];

      const parent = doc.getParent(model);
      if (!parent) return [];

      const frameModels = doc
        .getBlocksByFlavour('affine:frame')
        .map(block => block.model as FrameBlockModel);

      const frameItems = frameModels.map<SlashMenuActionItem>(frameModel => ({
        name: 'Keret: ' + frameModel.title,
        icon: FrameIcon,
        action: ({ rootComponent }) => {
          rootComponent.std.command
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

      const groupElements = surfaceModel.getElementsByType('group');
      const groupItems = groupElements.map(group => ({
        name: 'Csoport: ' + group.title.toString(),
        icon: GroupingIcon(),
        action: () => {
          rootComponent.std.command
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
      if (items.length !== 0) {
        return [
          {
            groupName: 'Dokumentum Csoport & Keret',
          },
          ...items,
        ];
      } else {
        return [];
      }
    },

    // ---------------------------------------------------------
    { groupName: 'Dátumok' },
    () => {
      const now = new Date();
      const tomorrow = new Date();
      const yesterday = new Date();

      yesterday.setDate(yesterday.getDate() - 1);
      tomorrow.setDate(tomorrow.getDate() + 1);

      return [
        {
          name: 'Ma',
          icon: TodayIcon,
          alias: ['today'],
          description: formatDate(now),
          action: ({ rootComponent, model }) => {
            insertContent(rootComponent.host, model, formatDate(now));
          },
        },
        {
          name: 'Holnap',
          icon: TomorrowIcon,
          alias: ['tomorrow'],
          description: formatDate(tomorrow),
          action: ({ rootComponent, model }) => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            insertContent(rootComponent.host, model, formatDate(tomorrow));
          },
        },
        {
          name: 'Tegnap',
          icon: YesterdayIcon,
          alias: ['yesterday'],
          description: formatDate(yesterday),
          action: ({ rootComponent, model }) => {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            insertContent(rootComponent.host, model, formatDate(yesterday));
          },
        },
        {
          name: 'Most',
          icon: NowIcon,
          alias: ['now'],
          description: formatTime(now),
          action: ({ rootComponent, model }) => {
            insertContent(rootComponent.host, model, formatTime(now));
          },
        },
      ];
    },

    // ---------------------------------------------------------
    /*
    { groupName: 'Adatbázis' },
    {
      name: 'Táblázat Nézet',
      description: 'Jelenítsd meg az elemeket táblázatban.',
      alias: ['database'],
      icon: DatabaseTableViewIcon20,
      tooltip: slashMenuToolTips['Táblázat Nézet'],
      showWhen: ({ model }) =>
        model.doc.schema.flavourSchemaMap.has('affine:database') &&
        !insideEdgelessText(model),
      action: ({ rootComponent }) => {
        rootComponent.std.command
          .chain()
          .getSelectedModels()
          .insertDatabaseBlock({
            viewType: viewPresets.tableViewMeta.type,
            place: 'after',
            removeEmptyLine: true,
          })
          .inline(({ insertedDatabaseBlockId }) => {
            if (insertedDatabaseBlockId) {
              const telemetry =
                rootComponent.std.getOptional(TelemetryProvider);
              telemetry?.track('AddDatabase', {
                blockId: insertedDatabaseBlockId,
              });
            }
          })
          .run();
      },
    },
    {
      name: 'Todo Nézet',
      alias: ['todo view'],
      icon: DatabaseTableViewIcon20,
      tooltip: slashMenuToolTips['Todo Nézet'],
      showWhen: ({ model }) =>
        model.doc.schema.flavourSchemaMap.has('affine:database') &&
        !insideEdgelessText(model) &&
        !!model.doc.awarenessStore.getFlag('enable_block_query'),

      action: ({ model, rootComponent }) => {
        const parent = rootComponent.doc.getParent(model);
        if (!parent) return;
        const index = parent.children.indexOf(model);
        const id = rootComponent.doc.addBlock(
          'affine:data-view',
          {},
          rootComponent.doc.getParent(model),
          index + 1
        );
        const dataViewModel = rootComponent.doc.getBlock(id)!;
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        Promise.resolve().then(() => {
          const dataView = rootComponent.std.view.getBlock(
            dataViewModel.id
          ) as DataViewBlockComponent | null;
          dataView?.dataSource.viewManager.viewAdd('table');
        });
        tryRemoveEmptyLine(model);
      },
    },
    {
      name: 'Kanban Nézet',
      description: 'Vizualizáld az elvégzendő feladatokat.',
      alias: ['database'],
      icon: DatabaseKanbanViewIcon20,
      tooltip: slashMenuToolTips['Kanban Nézet'],
      showWhen: ({ model }) =>
        model.doc.schema.flavourSchemaMap.has('affine:database') &&
        !insideEdgelessText(model),
      action: ({ rootComponent }) => {
        rootComponent.std.command
          .chain()
          .getSelectedModels()
          .insertDatabaseBlock({
            viewType: viewPresets.kanbanViewMeta.type,
            place: 'after',
            removeEmptyLine: true,
          })
          .inline(({ insertedDatabaseBlockId }) => {
            if (insertedDatabaseBlockId) {
              const telemetry =
                rootComponent.std.getOptional(TelemetryProvider);
              telemetry?.track('AddDatabase', {
                blockId: insertedDatabaseBlockId,
              });
            }
          })
          .run();
      },
    },*/

    // ---------------------------------------------------------
    { groupName: 'Műveletek' },
    {
      name: 'Felfele Mozgatás',
      description: 'Jelenlegi sor feljebb mozgatása.',
      icon: ArrowUpBigIcon,
      tooltip: slashMenuToolTips['Felfele Mozgatás'],
      alias: ['move up', 'operation'],
      action: ({ rootComponent, model }) => {
        const doc = rootComponent.doc;
        const previousSiblingModel = doc.getPrev(model);
        if (!previousSiblingModel) return;

        const parentModel = doc.getParent(previousSiblingModel);
        if (!parentModel) return;

        doc.moveBlocks([model], parentModel, previousSiblingModel, true);
      },
    },
    {
      name: 'Lefele Mozgatás',
      description: 'Jelenlegi sor lejjebb mozgatása.',
      icon: ArrowDownBigIcon,
      tooltip: slashMenuToolTips['Lefele Mozgatás'],
      alias: ['move down', 'operation'],
      action: ({ rootComponent, model }) => {
        const doc = rootComponent.doc;
        const nextSiblingModel = doc.getNext(model);
        if (!nextSiblingModel) return;

        const parentModel = doc.getParent(nextSiblingModel);
        if (!parentModel) return;

        doc.moveBlocks([model], parentModel, nextSiblingModel, false);
      },
    },
    {
      name: 'Másolás',
      description: 'Jelenlegi sor vágólapra másolása.',
      icon: CopyIcon,
      tooltip: slashMenuToolTips['Másolás'],
      alias: ['copy', 'operation'],
      action: ({ rootComponent, model }) => {
        const slice = Slice.fromModels(rootComponent.std.doc, [model]);

        rootComponent.std.clipboard
          .copy(slice)
          .then(() => {
            toast(rootComponent.host, 'Tartalom a vágólapra másolva');
          })
          .catch(e => {
            console.error(e);
          });
      },
    },
    {
      name: 'Duplikálás',
      description: 'Jelenlegi sor duplikálása.',
      icon: DualLinkIcon({ width: '20', height: '20' }),
      tooltip: slashMenuToolTips['Duplikálás'],
      alias: ['duplicate', 'operation'],
      action: ({ rootComponent, model }) => {
        if (!model.text || !(model.text instanceof Text)) {
          console.error("Can't duplicate a block without text");
          return;
        }
        const parent = rootComponent.doc.getParent(model);
        if (!parent) {
          console.error(
            'Failed to duplicate block! Parent not found: ' +
              model.id +
              '|' +
              model.flavour
          );
          return;
        }
        const index = parent.children.indexOf(model);

        // TODO add clone model util
        rootComponent.doc.addBlock(
          model.flavour as never,
          {
            type: (model as ParagraphBlockModel).type,
            text: new rootComponent.doc.Text(
              model.text.toDelta() as DeltaInsert[]
            ),
            // @ts-expect-error
            checked: model.checked,
          },
          rootComponent.doc.getParent(model),
          index
        );
      },
    },
    {
      name: 'Törlés',
      description: 'Jelenlegi sor törlése.',
      icon: DeleteIcon,
      tooltip: slashMenuToolTips['Törlés'],
      alias: ['remove', 'operation'],
      action: ({ rootComponent, model }) => {
        rootComponent.doc.deleteBlock(model);
      },
    },
  ],
};
