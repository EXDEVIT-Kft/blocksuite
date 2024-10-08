import type { EditorHost } from '@algogrind/block-std';
import type { TemplateResult } from 'lit';

import {
  BoldIcon,
  CodeIcon,
  ItalicIcon,
  LinkIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from '../../icons/index.js';

export interface TextFormatConfig {
  id: string;
  name: string;
  icon: TemplateResult<1>;
  hotkey?: string;
  activeWhen: (host: EditorHost) => boolean;
  action: (host: EditorHost) => void;
}

export const textFormatConfigs: TextFormatConfig[] = [
  {
    id: 'bold',
    name: 'Félkövér',
    icon: BoldIcon,
    hotkey: 'Mod-b',
    activeWhen: host => {
      const [result] = host.std.command
        .chain()
        .isTextStyleActive({ key: 'bold' })
        .run();
      return result;
    },
    action: host => {
      host.std.command.chain().toggleBold().run();
    },
  },
  {
    id: 'italic',
    name: 'Dőlt',
    icon: ItalicIcon,
    hotkey: 'Mod-i',
    activeWhen: host => {
      const [result] = host.std.command
        .chain()
        .isTextStyleActive({ key: 'italic' })
        .run();
      return result;
    },
    action: host => {
      host.std.command.chain().toggleItalic().run();
    },
  },
  {
    id: 'underline',
    name: 'Aláhúzott',
    icon: UnderlineIcon,
    hotkey: 'Mod-u',
    activeWhen: host => {
      const [result] = host.std.command
        .chain()
        .isTextStyleActive({ key: 'underline' })
        .run();
      return result;
    },
    action: host => {
      host.std.command.chain().toggleUnderline().run();
    },
  },
  {
    id: 'strike',
    name: 'Áthúzott',
    icon: StrikethroughIcon,
    hotkey: 'Mod-shift-s',
    activeWhen: host => {
      const [result] = host.std.command
        .chain()
        .isTextStyleActive({ key: 'strike' })
        .run();
      return result;
    },
    action: host => {
      host.std.command.chain().toggleStrike().run();
    },
  },
  {
    id: 'code',
    name: 'Kód',
    icon: CodeIcon,
    hotkey: 'Mod-e',
    activeWhen: host => {
      const [result] = host.std.command
        .chain()
        .isTextStyleActive({ key: 'code' })
        .run();
      return result;
    },
    action: host => {
      host.std.command.chain().toggleCode().run();
    },
  },
  {
    id: 'link',
    name: 'Link',
    icon: LinkIcon,
    hotkey: 'Mod-k',
    activeWhen: host => {
      const [result] = host.std.command
        .chain()
        .isTextStyleActive({ key: 'link' })
        .run();
      return result;
    },
    action: host => {
      host.std.command.chain().toggleLink().run();
    },
  },
];
