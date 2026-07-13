// [ALGOGRIND] Sets every workspace package to the same version before
// publishing. Runs ephemerally in the publish workflow — nothing is
// committed back to the branch.
//
// Usage: node scripts/bump-version.mjs [version]
//
// Without an explicit version it queries the npm registry for the latest
// published @algogrind/affine version and bumps its patch number, so a
// plain workflow dispatch always publishes one patch above whatever is
// live on npm. Requires NPM_TOKEN (or YARN_NPM_AUTH_TOKEN) in the env for
// the registry query, since the packages are restricted.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { walkPackages } from './publish-utils.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const REFERENCE_PACKAGE = '@algogrind/affine';

async function resolveVersion() {
  const explicit = process.argv[2]?.trim();
  if (explicit) return explicit;

  const token = process.env.NPM_TOKEN || process.env.YARN_NPM_AUTH_TOKEN;
  if (!token) {
    throw new Error(
      'no version given and NPM_TOKEN is missing — cannot query the registry'
    );
  }

  const res = await fetch(
    `https://registry.npmjs.org/${REFERENCE_PACKAGE.replace('/', '%2f')}`,
    { headers: { authorization: `Bearer ${token}` } }
  );
  if (!res.ok) {
    throw new Error(`npm registry query failed: HTTP ${res.status}`);
  }
  const data = await res.json();
  const latest = data['dist-tags']?.latest;
  if (!latest) {
    throw new Error(`no latest dist-tag found for ${REFERENCE_PACKAGE}`);
  }

  const match = latest.match(/^(\d+)\.(\d+)\.(\d+)$/);
  if (!match) {
    throw new Error(
      `cannot auto-bump from non-standard version "${latest}" — pass a version explicitly`
    );
  }
  const next = `${match[1]}.${match[2]}.${Number(match[3]) + 1}`;
  console.log(`latest published ${REFERENCE_PACKAGE} is ${latest} -> ${next}`);
  return next;
}

const version = await resolveVersion();
if (!/^\d+\.\d+\.\d+(-[\w.]+)?$/.test(version)) {
  throw new Error(`invalid version: "${version}"`);
}

let count = 0;
for (const file of walkPackages(ROOT)) {
  if (!file.replace(/\\/g, '/').endsWith('/package.json')) continue;

  const pkg = JSON.parse(readFileSync(file, 'utf8'));
  if (!pkg.version || !pkg.name) continue;

  pkg.version = version;
  writeFileSync(file, JSON.stringify(pkg, null, 2) + '\n');
  count++;
}

console.log(`bumped ${count} packages to ${version}`);
