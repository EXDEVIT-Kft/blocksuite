/**
 * [ALGOGRIND] Publish preparation — phase 2: exports -> dist.
 *
 * Run this AFTER `yarn build:packages` (and after prepare-publish.mjs).
 * The monorepo builds against the source files, so the exports fields must
 * point at ./src/*.ts during the build; the published packages however must
 * expose the compiled output. This script rewrites every publishable
 * package.json:
 *
 *   - exports:  ./src/X.ts -> { types: ./dist/X.d.ts, import: ./dist/X.js }
 *   - main/module/types set to the dist entry point
 *   - publishConfig: { access: "restricted" }
 *
 * After this, run `yarn publish:algogrind`. Do NOT build again after this
 * script — the dist-pointing exports would break the TypeScript build.
 */
import { readFileSync, writeFileSync } from 'node:fs';

import { walkPackages } from './publish-utils.mjs';

let count = 0;
for (const file of walkPackages(process.cwd())) {
  if (!file.endsWith('package.json')) continue;
  const pkg = JSON.parse(readFileSync(file, 'utf-8'));
  if (!pkg.name?.startsWith('@algogrind/')) continue;
  if (pkg.private === true || !pkg.exports) continue;

  const distExports = {};
  for (const [key, value] of Object.entries(pkg.exports)) {
    if (typeof value === 'string' && value.endsWith('.ts')) {
      const base = value.replace(/^\.\/src\//, './dist/').replace(/\.ts$/, '');
      distExports[key] = {
        types: `${base}.d.ts`,
        import: `${base}.js`,
      };
    } else {
      distExports[key] = value;
    }
  }
  pkg.exports = distExports;

  if (pkg.exports['.']) {
    pkg.main = pkg.exports['.'].import;
    pkg.module = pkg.exports['.'].import;
    pkg.types = pkg.exports['.'].types;
  }

  pkg.publishConfig = { access: 'restricted' };

  writeFileSync(file, JSON.stringify(pkg, null, 2) + '\n');
  count++;
}
console.log(`✅ ${count} csomag exports atirva dist-re — jöhet a yarn publish:algogrind`);
