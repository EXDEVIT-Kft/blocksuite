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
    color: `var(--affine-text-highlight-${color})`,
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
    color: `var(--affine-text-highlight-foreground-${color})`,
    hotkey: null,
  })),
];
