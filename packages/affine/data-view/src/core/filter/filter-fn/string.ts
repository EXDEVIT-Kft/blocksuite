import { t } from '../../logical/type-presets.js';
import { createFilter } from './create.js';

export const stringFilter = [
  createFilter({
    name: 'contains',
    self: t.string.instance(),
    args: [t.string.instance()] as const,
    label: 'Tartalmazza',
    shortString: v => (v ? `: ${v.value}` : undefined),
    impl: (self = '', value) => {
      return self.toLowerCase().includes(value.toLowerCase());
    },
    defaultValue: args => args[0],
  }),
  createFilter({
    name: 'doesNoContains',
    self: t.string.instance(),
    args: [t.string.instance()] as const,
    label: 'Nem tartalmazza',
    shortString: v => (v ? `: nem ${v.value}` : undefined),
    impl: (self = '', value) => {
      return !self.toLowerCase().includes(value.toLowerCase());
    },
  }),
  createFilter({
    name: 'startsWith',
    self: t.string.instance(),
    args: [t.string.instance()] as const,
    label: 'Kezdődik',
    shortString: v => (v ? `: így kezdődik ${v.value}` : undefined),
    impl: (self = '', value) => {
      return self.toLowerCase().startsWith(value.toLowerCase());
    },
    defaultValue: args => args[0],
  }),
  createFilter({
    name: 'endsWith',
    self: t.string.instance(),
    args: [t.string.instance()] as const,
    label: 'Végződik',
    shortString: v => (v ? `: így végződik ${v.value}` : undefined),
    impl: (self = '', value) => {
      return self.toLowerCase().endsWith(value.toLowerCase());
    },
    defaultValue: args => args[0],
  }),
  createFilter({
    name: 'is',
    self: t.string.instance(),
    args: [t.string.instance()] as const,
    label: 'Egyenlő',
    shortString: v => (v ? `: ${v.value}` : undefined),
    impl: (self = '', value) => {
      return self.toLowerCase() == value.toLowerCase();
    },
    defaultValue: args => args[0],
  }),
  createFilter({
    name: 'isNot',
    self: t.string.instance(),
    args: [t.string.instance()] as const,
    label: 'Nem egyenlő',
    shortString: v => (v ? `: nem egyenlő ${v.value}` : undefined),
    impl: (self = '', value) => {
      return self.toLowerCase() != value.toLowerCase();
    },
  }),
];
