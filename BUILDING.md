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

## Build és publish:

1. Új branch létrehozása:

```
git checkout algogrind
git checkout -b algogrind-publish
```

-> A buildhez minden blocksuite org előfordulást algogrind-al kell helyettesíteni
-> VSCode replace, regex módban:
_mit_: @blocksuite\/(?!icons)
_mire_: @algogrind/
_excluded files_: node*modules, dist, *.spec.ts, \_.js

-> `package.json` fájlokban a verziók ellenőrzése (hiszen a blocksuite ezt tőlünk függetlenül módosítja) -> nem lehet hátrébb, mint a mi package verziónk
-> `yarn.lock` törlése majd `yarn install`
-> minden fájl commitolása
-> `yarn build`
-> ha szükséges akkor a build hibák javítása egy külön commitban

2. Publikálás

```sh
lerna publish --no-private --message "chore: bump version numbers"
```

-> verziószámok elfogadása
-> végén "yes"

3. Cleanup

-> Ezen a ponton a package-k fel vannak töltve
-> mivel itt a publish egy egyirányú művelet, ezért utána a branch merge nélkül eldobható (így nem kell interactive rebase-el szívni mint a sync esetében).

## Az upstream sync-től a privát package publish-ig

1. Sync az upstream-mel:

```
git checkout master
git fetch upstream
git merge upstream/master
```

-> ezen a ponton a saját master branch-ünkön a legfrissebb módosításoknak, merge conflict nélkül jelen kell lennie.

2. Branch a merge-hez:

-> egy új branchen próbáljuk közös nevezőre hozni a mi fejlesztéseinket a blocksuite fejlesztéseivel

```
git checkout master
git checkout -b algogrind-sync
```

3. Cherry pick:

-> az algogrind branch-en történik az aktív fejlesztés.
-> Innen egyesével cherry-pickeljük a commitokat át az új algogrind-sync branch-re
(Én itt -> Cherry pick módja: cherry pick without committing (--no-commit)-ot használtam hogy jobban át tudjam rendezni mit milyen sorrenben akarok commitolni)
-> idő közben lehet el kell majd dobni a `yarn.lock` fájlt és egy `yarn install`-al megoldani a fennálló merge conflictokat

4. Build

-> A buildhez minden blocksuite org előfordulást algogrind-al kell helyettesíteni
-> VSCode replace, regex módban:
_mit_: @blocksuite\/(?!icons)
_mire_: @algogrind/
_excluded files_: node*modules, dist, *.spec.ts, \_.js

-> `package.json` fájlokban a verziók ellenőrzése (hiszen a blocksuite ezt tőlünk függetlenül módosítja) -> nem lehet hátrébb, mint a mi package verziónk
-> `yarn.lock` törlése majd `yarn install`
-> minden fájl commitolása
-> `yarn build`
-> ha szükséges akkor a build hibák javítása egy külön commitban

5. Publikálás

```sh
lerna publish --no-private --message "chore: bump version numbers"
```

-> verziószámok elfogadása
-> végén "yes"

6. Cleanup

-> Ezen a ponton a package-k fel vannak töltve, de muszáj feltakarítani a publishhoz kötődő, de fejlesztéshez nem használható commitokat:

-> ki kell keresni azt a commit hash-t, ami az utolsó "értelmes" módosítás volt -> commit hash másolása
-> `git rebase -i [hash]`
-> "o" billentyű lenyomása az edit módhoz
-> azok elé a commitok elé "drop" szót írjunk, amik nem kellenek, el akarjuk dobni
-> tartsuk meg az olyan commitokat, amik esetleg build hibákat javítottak (pl.: hiányzó import, stb...)
-> "Esc" -> ":wq" -> "Enter"
-> `git push origin algogrind-sync --force` -> Figyelem! Ez felülírja a history-t!

7. Fejlesztés folytatása

-> vissza mergeljük a sync-re létrehozott branchet a fejlesztésre használt branchbe:

```
git checkout algogrind
git merge algogrind-sync
```

-> ha minden rendben az algogrind-sync branch törölhető

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
