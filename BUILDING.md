# Building and Testing BlockSuite

## Using Playground

To run BlockSuite from source, please ensure you have installed [Node.js](https://nodejs.org/en/download) and [yarn](https://yarnpkg.com/).

```sh
yarn install
yarn dev
```

Be sure to use the correct version of yarn specified in package.json.

Then there would be multiple entries to choose from:

- The [localhost:5173/starter/?init](http://localhost:5173/starter/?init) entry is recommended for local debugging.
- The [localhost:5173/starter/](http://localhost:5173/starter/) entry lists all of the starter presets.
- The [localhost:5173](http://localhost:5173) entry is a comprehensive example with local-first (IndexedDB-based) data persistence and real-time collaboration support.

All these entries are published to [try-blocksuite.vercel.app](https://try-blocksuite.vercel.app).

And this would build the BlockSuite packages:

```sh
yarn build
```

## [ALGOGRIND] Build és publish

A csomagokat `@algogrind/*` néven, privát (restricted) npm csomagként publikáljuk.

### Ajánlott: GitHub Action

Az **Algogrind Publish** workflow (`.github/workflows/algogrind-publish.yml`) kézzel indítható (Actions fül → workflow_dispatch), és mindent elvégez a CI-ban: átnevezés → verzió-bump → install → build → exports átírás → npm publish. Semmit nem commitol vissza a branchre.

Verziókezelés: a workflow a verziókat futáskor, csak a CI-munkakönyvtárban állítja be (`scripts/bump-version.mjs`).

- A `version` inputot **üresen hagyva** lekérdezi az npm-ről a legutóbb publikált `@algogrind/affine` verziót, és annak patch-számát emeli (pl. `0.27.0` → `0.27.1`).
- Minor/major kiadáshoz add meg explicit a verziót az inputban (pl. `0.28.0`).

Előfeltétel:

- `NPM_TOKEN` repository secret: npm automation token publish joggal az `@algogrind` orgra.

### Kézi folyamat (lokálisan)

A folyamat KÉTFÁZISÚ: a build még a `./src`-re mutató exports-okkal fut (különben a tsc a saját outputját olvasná inputként), az exports-ok csak a build UTÁN állnak át `./dist`-re.

1. Publish branch létrehozása (eldobható, soha nem merge-öljük vissza):

```sh
git checkout algogrind
git checkout -b algogrind-publish
```

2. Átnevezés (minden `@blocksuite/*` → `@algogrind/*` a package.json-ökben és a forrásfájlokban, kivéve a külső `@blocksuite/icons` csomagot):

```sh
yarn prepare-publish
```

3. Verziók beállítása — explicit verzióval, vagy argumentum nélkül + `NPM_TOKEN` env-vel az automatikus patch-bumphoz:

```sh
node scripts/bump-version.mjs 0.27.1
```

4. Build-melléktermékek törlése, újratelepítés (PowerShell):

```powershell
Get-ChildItem -Path . -Include dist -Recurse -Directory | ForEach-Object { Remove-Item $_.FullName -Recurse -Force }
Get-ChildItem -Path . -Include *.tsbuildinfo -Recurse -File | ForEach-Object { Remove-Item $_.FullName -Force }
yarn install --mode update-lockfile
yarn install
```

5. Minden fájl commitolása, majd build:

```sh
git add -A && git commit -m "chore: prepare algogrind publish"
yarn build:packages
```

6. Exports átírása dist-re + `publishConfig.access: restricted` (ez után már NE buildelj újra!):

```sh
node scripts/finalize-publish.mjs
```

7. npm hitelesítés az `algogrind` scope-ra (Yarn 4 a saját auth-ját használja, nem az `npm login`-ét!). Vagy interaktívan:

```sh
yarn npm login --scope algogrind
```

   vagy tokennel a `~/.yarnrc.yml`-ben:

```yaml
npmScopes:
  algogrind:
    npmAuthToken: npm_xxx
```

8. Publikálás (a `--no-private` kihagyja a playground/docs csomagokat, a `--tolerate-republish` a már fent lévő verziókat):

```sh
yarn publish:algogrind
```

## Testing

### Test Locally

Adding test cases is strongly encouraged when you contribute new features and bug fixes. We use [Playwright](https://playwright.dev/) for E2E test, and [vitest](https://vitest.dev/) for unit test.

To test locally, please make sure browser binaries are already installed via `npx playwright install`. Then there are multi commands to choose from:

```sh
# run tests in headless mode in another terminal window
yarn test

# or run tests in headed mode for debugging
yarn test -- --debug
```

In headed mode, `await page.pause()` can be used in test cases to suspend the test runner. Note that the usage of the [Playwright VSCode extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) is also highly recommended.

To test browser compatibility, the `BROWSER` environment variable can be used:

```sh
# supports `firefox|webkit|chromium`
BROWSER=firefox yarn test

# passing playwright params with the -- syntax
BROWSER=webkit yarn test -- --debug
```

To investigate flaky tests, we can mark a test case as `test.only`, then perform `npx playwright test --repeat-each=10` to reproduce the problem by repeated execution. It's also very helpful to run `yarn test -- --debug` with `await page.pause()` added before certain asserters.

### Test Collaboration

To test the real-time collaboration feature of BlockSuite locally, please follow these two simple steps:

1. Open [localhost:5173/starter/?init&room=hello](http://localhost:5173/starter/?init&room=hello) in the first browser tab.
2. Open [localhost:5173/starter/?room=hello](http://localhost:5173/starter/?room=hello) in a second tab.

See the [documentation](https://blocksuite.io/guide/data-synchronization.html#document-streaming) about what's happening under the hood.
