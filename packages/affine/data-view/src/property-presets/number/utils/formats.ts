import type { NumberFormat } from './formatter.js';

export type NumberCellFormat = {
  type: NumberFormat;
  label: string;
  symbol: string; // New property for symbol
};

export const numberFormats: NumberCellFormat[] = [
  { type: 'number', label: 'Szám', symbol: '#' },
  { type: 'numberWithCommas', label: 'Szám vesszőkkel', symbol: '#' },
  { type: 'percent', label: 'Százalék', symbol: '%' },
  { type: 'currencyHUF', label: 'Forint', symbol: 'Ft' },
  { type: 'currencyUSD', label: 'US Dollár', symbol: '$' },
  { type: 'currencyEUR', label: 'Euró', symbol: '€' },
  { type: 'currencyGBP', label: 'Angol Font', symbol: '£' },
  { type: 'currencyCNY', label: 'Kínai Yuan', symbol: '¥' },
  { type: 'currencyINR', label: 'Indiai Rupee', symbol: '₹' },
];
