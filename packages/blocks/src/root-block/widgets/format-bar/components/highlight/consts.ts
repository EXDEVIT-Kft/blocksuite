interface HighlightConfig {
  name: string;
  color: string | null;
  hotkey: string | null;
}

const colors = [
  { name: 'Piros', color: 'red' },
  { name: 'Narancs', color: 'orange' },
  { name: 'Sárga', color: 'yellow' },
  { name: 'Zöld', color: 'green' },
  { name: 'Türkizkék', color: 'teal' },
  { name: 'Kék', color: 'blue' },
  { name: 'Lila', color: 'purple' },
  { name: 'Pink', color: 'pink' },
  { name: 'Szürke', color: 'grey' },
];

export const backgroundConfig: HighlightConfig[] = [
  {
    name: 'Alapértelmezett Háttér',
    color: null,
    hotkey: null,
  },
  ...colors.map(({ name, color }) => ({
    name: `${name} Háttér`,
    color: `var(--algogrind-text-highlight-${color})`,
    hotkey: null,
  })),
];

export const foregroundConfig: HighlightConfig[] = [
  {
    name: 'Alapértelmezett Szín',
    color: null,
    hotkey: null,
  },
  ...colors.map(({ name, color }) => ({
    name,
    color: `var(--algogrind-text-highlight-foreground-${color})`,
    hotkey: null,
  })),
];
