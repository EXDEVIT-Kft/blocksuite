/**
 * [ALGOGRIND] Publish preparation — phase 1: rename.
 *
 * Run this on a throwaway publish branch BEFORE `yarn install` / build.
 * It renames the whole workspace to the @algogrind scope:
 *
 * 1. Every package.json under packages/:
 *    - name:         @blocksuite/x -> @algogrind/x
 *    - dependencies: @blocksuite/* -> @algogrind/* (except @blocksuite/icons,
 *                    which is an external npm package and must stay)
 * 2. Root package.json scripts (workspace references).
 * 3. Source files (.ts/.tsx/.css/.js/.mjs) under packages/: every
 *    @blocksuite/ import specifier is renamed (except @blocksuite/icons).
 *
 * The `exports` fields keep pointing at ./src/*.ts so the TypeScript build
 * still works. AFTER `yarn build:packages` run scripts/finalize-publish.mjs,
 * which flips the exports to ./dist and adds publishConfig — only then publish.
 *
 * Usage: node scripts/prepare-publish.mjs   (see BUILDING.md for the full flow)
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { walkPackages } from './publish-utils.mjs';

const ROOT = process.cwd();
const RENAME_RE = /@blocksuite\/(?!icons)/g;

const files = walkPackages(ROOT);

// --- 1. package.json names + deps ------------------------------------------
let pkgCount = 0;
for (const file of files.filter(f => f.endsWith('package.json'))) {
  const pkg = JSON.parse(readFileSync(file, 'utf-8'));
  if (!pkg.name?.startsWith('@blocksuite/')) continue;

  pkg.name = pkg.name.replace(RENAME_RE, '@algogrind/');
  for (const section of [
    'dependencies',
    'devDependencies',
    'peerDependencies',
  ]) {
    if (!pkg[section]) continue;
    const renamed = {};
    for (const [dep, version] of Object.entries(pkg[section])) {
      renamed[dep.replace(RENAME_RE, '@algogrind/')] = version;
    }
    pkg[section] = renamed;
  }

  writeFileSync(file, JSON.stringify(pkg, null, 2) + '\n');
  pkgCount++;
}
console.log(`✅ ${pkgCount} package.json atirva`);

// --- 2. root package.json scripts ------------------------------------------
const rootPkgPath = join(ROOT, 'package.json');
const rootPkg = JSON.parse(readFileSync(rootPkgPath, 'utf-8'));
for (const [key, value] of Object.entries(rootPkg.scripts ?? {})) {
  rootPkg.scripts[key] = value.replace(RENAME_RE, '@algogrind/');
}
writeFileSync(rootPkgPath, JSON.stringify(rootPkg, null, 2) + '\n');
console.log('✅ root package.json scripts atirva');

// --- 3. source import rename ------------------------------------------------
let srcCount = 0;
for (const file of files) {
  if (!/\.(ts|tsx|css|mjs|js)$/.test(file)) continue;
  const content = readFileSync(file, 'utf-8');
  if (!RENAME_RE.test(content)) {
    RENAME_RE.lastIndex = 0;
    continue;
  }
  RENAME_RE.lastIndex = 0;
  writeFileSync(file, content.replace(RENAME_RE, '@algogrind/'));
  srcCount++;
}
console.log(`✅ ${srcCount} forrasfajl atirva`);

console.log(`
Kovetkezo lepesek:
  1. yarn install --mode update-lockfile && yarn install
  2. yarn build:packages
  3. node scripts/finalize-publish.mjs
  4. yarn publish:algogrind
`);
