import type { StatisticsConfig } from './types.js';

import { t } from '../logical/index.js';
import { createStatisticConfig } from './create.js';

export const anyTypeStatsFunctions: StatisticsConfig[] = [
  createStatisticConfig({
    group: 'Megszámolás',
    menuName: 'Mind Megszámolása',
    displayName: 'Mind',
    type: 'count-all',
    dataType: t.unknown.instance(),
    impl: data => {
      return data.length.toString();
    },
  }),
  createStatisticConfig({
    group: 'Megszámolás',
    menuName: 'Értékek Megszámolása',
    displayName: 'Értékek',
    type: 'count-values',
    dataType: t.unknown.instance(),
    impl: (data, { meta, dataSource }) => {
      const values = data
        .flatMap(v => {
          if (meta.config.values) {
            return meta.config.values({ value: v, dataSource });
          }
          return v;
        })
        .filter(v => v != null);
      return values.length.toString();
    },
  }),
  createStatisticConfig({
    group: 'Megszámolás',
    menuName: 'Egyedi Értékek Megszámolása',
    displayName: 'Egyedi Értékek',
    type: 'count-unique-values',
    dataType: t.unknown.instance(),
    impl: (data, { meta, dataSource }) => {
      const values = data
        .flatMap(v => {
          if (meta.config.values) {
            return meta.config.values({ value: v, dataSource });
          }
          return v;
        })
        .filter(v => v != null);
      return new Set(values).size.toString();
    },
  }),
  createStatisticConfig({
    group: 'Megszámolás',
    menuName: 'Üres Értékek Megszámolása',
    displayName: 'Üres',
    type: 'count-empty',
    dataType: t.unknown.instance(),
    impl: (data, { meta, dataSource }) => {
      const emptyList = data.filter(value =>
        meta.config.isEmpty({ value, dataSource })
      );
      return emptyList.length.toString();
    },
  }),
  createStatisticConfig({
    group: 'Megszámolás',
    menuName: 'Nem Üres Értékek Megszámolása',
    displayName: 'Nem Üres',
    type: 'count-not-empty',
    dataType: t.unknown.instance(),
    impl: (data, { meta, dataSource }) => {
      const notEmptyList = data.filter(
        value => !meta.config.isEmpty({ value, dataSource })
      );
      return notEmptyList.length.toString();
    },
  }),
  createStatisticConfig({
    group: 'Százalék',
    menuName: 'Százalék Üres',
    displayName: '% Üres',
    type: 'percent-empty',
    dataType: t.unknown.instance(),
    impl: (data, { meta, dataSource }) => {
      if (data.length === 0) return '';
      const emptyList = data.filter(value =>
        meta.config.isEmpty({ value, dataSource })
      );
      return ((emptyList.length / data.length) * 100).toFixed(2) + '%';
    },
  }),
  createStatisticConfig({
    group: 'Százalék',
    menuName: 'Százalék Nem Üres',
    displayName: '% Nem Üres',
    type: 'percent-not-empty',
    dataType: t.unknown.instance(),
    impl: (data, { meta, dataSource }) => {
      if (data.length === 0) return '';
      const notEmptyList = data.filter(
        value => !meta.config.isEmpty({ value, dataSource })
      );
      return ((notEmptyList.length / data.length) * 100).toFixed(2) + '%';
    },
  }),
];
