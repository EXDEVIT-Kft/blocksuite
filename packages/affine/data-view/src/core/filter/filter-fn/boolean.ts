import { t } from '../../logical/type-presets.js';
import { createFilter } from './create.js';

export const booleanFilter = [
  createFilter({
    name: 'isChecked',
    self: t.boolean.instance(),
    args: [],
    label: 'Elvégzett',
    shortString: () => ': elvégzett',
    impl: value => {
      return !!value;
    },
    defaultValue: () => true,
  }),
  createFilter({
    name: 'isUnchecked',
    self: t.boolean.instance(),
    args: [],
    label: 'Nem elvégzett',
    shortString: () => ': nem elvégzett',
    impl: value => {
      return !value;
    },
    defaultValue: () => false,
  }),
];
