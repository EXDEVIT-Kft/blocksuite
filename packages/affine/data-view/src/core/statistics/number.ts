import type { StatisticsConfig } from './types.js';

import { t } from '../logical/index.js';
import { createStatisticConfig } from './create.js';

export const numberStatsFunctions: StatisticsConfig[] = [
  createStatisticConfig({
    group: 'További opciók',
    menuName: 'Összegzés',
    type: 'sum',
    displayName: 'Összegzés',
    dataType: t.number.instance(),
    impl: data => {
      const numbers = withoutNull(data);
      if (numbers.length === 0) {
        return 'Üres';
      }
      return parseFloat(
        numbers.reduce((a, b) => a + b, 0).toFixed(2)
      ).toString();
    },
  }),
  createStatisticConfig({
    group: 'További opciók',
    menuName: 'Átlag',
    displayName: 'Átlag',
    type: 'average',
    dataType: t.number.instance(),
    impl: data => {
      const numbers = withoutNull(data);
      if (numbers.length === 0) {
        return 'Üres';
      }
      return (numbers.reduce((a, b) => a + b, 0) / numbers.length).toString();
    },
  }),
  createStatisticConfig({
    group: 'További opciók',
    menuName: 'Medián',
    displayName: 'Medián',
    type: 'median',
    dataType: t.number.instance(),
    impl: data => {
      const arr = withoutNull(data).sort((a, b) => a - b);
      let result = 0;
      if (arr.length % 2 === 1) {
        result = arr[(arr.length - 1) / 2];
      } else {
        const index = arr.length / 2;
        result = (arr[index] + arr[index - 1]) / 2;
      }
      return result?.toString() ?? 'Üres';
    },
  }),
  createStatisticConfig({
    group: 'További opciók',
    menuName: 'Min',
    displayName: 'Min',
    type: 'min',
    dataType: t.number.instance(),
    impl: data => {
      let min: number | null = null;
      for (const num of data) {
        if (num != null) {
          if (min == null) {
            min = num;
          } else {
            min = Math.min(min, num);
          }
        }
      }
      return min?.toString() ?? 'Üres';
    },
  }),
  createStatisticConfig({
    group: 'További opciók',
    menuName: 'Max',
    displayName: 'Max',
    type: 'max',
    dataType: t.number.instance(),
    impl: data => {
      let max: number | null = null;
      for (const num of data) {
        if (num != null) {
          if (max == null) {
            max = num;
          } else {
            max = Math.max(max, num);
          }
        }
      }
      return max?.toString() ?? 'Üres';
    },
  }),
  createStatisticConfig({
    group: 'További opciók',
    menuName: 'Terjedelem',
    displayName: 'Terjedelem',
    type: 'range',
    dataType: t.number.instance(),
    impl: data => {
      let min: number | null = null;
      let max: number | null = null;
      for (const num of data) {
        if (num != null) {
          if (max == null) {
            max = num;
          } else {
            max = Math.max(max, num);
          }
          if (min == null) {
            min = num;
          } else {
            min = Math.min(min, num);
          }
        }
      }
      if (min == null || max == null) {
        return 'Üres';
      }
      return (max - min).toString();
    },
  }),
];
const withoutNull = (arr: readonly (number | null | undefined)[]): number[] =>
  arr.filter(v => v != null);
