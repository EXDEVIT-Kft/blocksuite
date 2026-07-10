import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const SKIP_DIRS = new Set(['node_modules', 'dist', '.turbo', '.git']);

/** Recursively list every file under <root>/packages, skipping build output. */
export function walkPackages(root) {
  const out = [];
  const walk = dir => {
    for (const entry of readdirSync(dir)) {
      if (SKIP_DIRS.has(entry)) continue;
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) walk(full);
      else out.push(full);
    }
  };
  walk(join(root, 'packages'));
  return out;
}
