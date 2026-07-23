# Algogrind fork — migrációs leltár

*Készült: 2026-07-09. Fedésvizsgálat az élő AFFiNE canary (`a868f54`, blocksuite csomagok v0.27.0) ellen.*

## Kiinduló helyzet

- **Fork:** EXDEVIT-Kft/blocksuite, `algogrind` branch = BlockSuite master @ `db6e9d278` (2024-12-31, ~0.19.x) + **156 saját commit** (2024-10-30 → 2025-02-18).
- **Saját diff:** 577 fájl, +16 440 / −4 588 sor.
- **Upstream ma:** az élő fejlesztés a `toeverything/affine` monorepo `blocksuite/` mappájában folyik. A `toeverything/blocksuite` repo `main` branche ennek packages-layoutú tükre volt, utolsó sync: 2025-07-07 (v0.22.4 — ez az utolsó npm-re publikált verzió is).
- **Következtetés:** git-szintű merge/rebase reménytelen (squash-elt sync commitok + teljes átstrukturálás) → **feature-portolás** kell.
- **Új alap:** `master-affine` branch = tükör `main` + mai canary sync (`49336674d`) + legacy docs workspace eltávolítás (`23d7be4e3`) + lockfile frissítés (`41acfa70b`).

---

## 1. Feature-csoportok (a 156 commit tematikusan)

Az első commit (`0375666a7` "apply cherry-picked algogrind changes") mega-commit, a korábbi v0.17-es fork összes változásával — több feature gyökere itt van.

### 1.1 Magyar fordítások (~15 commit) — PORTOLANDÓ
Inline, hardcode-olt magyarítás (nincs i18n réteg — **az élő upstreamben SINCS**, tehát patch marad).
- Slash menü + tooltipek: `fd7296d5e`, `dfbc6b537`
- Outline (vázlat) panel/viewer: `d824e9df0`, `68e8347b7`
- Frame panel: `09c367463`, `93e6d6848`, `d3cea1f36`
- Mobil toolbar: `55e84a760`
- Data-view (tábla/kanban/database) tömeges: `091719345`, `b9b21577c`, `7aadb2190`, `9074b165b`, `3894f73a9`
- Edgeless search/template: `9f140037a`; lasso: `c078d50c3`
- Link/reference popup, date picker, embed-card modal: `3894f73a9`, `091719345`

### 1.2 Readonly mód (~17 commit) — ZÖME PORTOLANDÓ
| Fix | Commit | Upstream (élő) |
|---|---|---|
| Pan tool readonly + viselkedés | `9126c52cb`, `e5251a768`, `724e42402` | ❌ nincs |
| Zoom toolbar readonly-ban elérhető | `6e7909f2a`, `fc5107bb6` | ❌ upstream épp ELREJTI |
| Edgeless tool shortcutok tiltása | `28443b15c` | ❌ nincs |
| Drag tiltás edgelessen (tool-controller) | `f0ee288b4` | ❌ nincs |
| Readonly drag (file-drop, drag-handle, pointer) | `c44ae6f56` | ❌ nincs |
| Frame reorder tiltás | `40fd41d21` | ❌ nincs |
| Tábla oszlop reorder mutáció-guard + stats bar | `42ab52f60`, `40e435ea9` | ❌ (UI részben rejtve, mutáció nem védett) |
| Paragraph keymap guardok | `c9c9ae407`, `3a59181d0` | ❌ nincs |
| Kanban reorder guard | `0df52d1d7` | ✅ MEGVAN |
| Attachment options readonly-ban | `0bbe237c7` | ✅ MEGVAN (toolbar-service kapuzza) |
| Heading/collapsed toggle readonly-ban | `352c62882`, `6f8598a7f` | ✅ MEGVAN (`_readonlyCollapsed`) |
| DocOnly: note ne legyen szelektálható | `1ceabbc50` | ellenőrizendő portoláskor |
| Beszúrt frame megtekinthető readonly-ban | `9c4039ec0` | ellenőrizendő portoláskor |
| YouTube readonly styling | `f981e40ef` | ellenőrizendő portoláskor |

### 1.3 Algogrind téma / design (~30 commit) — PORTOLANDÓ
- "huge design update" (`efa12dd67`): ~250 fájl, szinte minden komponens CSS-e
- Saját edgeless színsémák: `827d468d1` + `packages/affine/shared/src/theme/algogrind-edgeless-colors.ts`
- Árnyékok: `0602d08ed`; border színek: `3274ee325`; kanban/database téma: `9b7deb669`
- Sok apró styling fix (embed, bookmark, tooltip, divider, code block, tábla, outline)

### 1.4 Emoji menü widget (~19 commit) — PORTOLANDÓ (teljesen saját)
- `packages/blocks/src/root-block/widgets/emoji-menu/*`, `AlgogrindEmojiMenuWidget` (`0026b72cd`)
- Page + edgeless spec-be regisztrálva; keresés, billentyűzet-navigáció, kategóriák, responsivitás
- Upstream nincs ilyen; ÚJDONSÁG: `affine/shared/src/services/icon-picker-service` — lehet rá építeni

### 1.5 Accordion block — PORTOLANDÓ (saját blokk, AKTÍV)
- `packages/blocks/src/accordion-block/*` + `affine/model` accordion-model
- Flavour: `algogrind:accordion`, slash menüben "Összecsukható Címsor" H1/H2/H3
- Upstream nincs megfelelője (toggle list deprecated, callout nem ekvivalens)

### 1.6 Kép + fájl (blob) kezelés (~7 commit) — RÉSZBEN PORTOLANDÓ
**A lényeg: blokk törlésekor a blob is törlődjön a tárolóból — ez upstream MA SINCS meg!**
| Módosítás | Commit | Upstream (élő) |
|---|---|---|
| `BlobEngine.delete` tényleges implementáció (source-okon végigmegy) | `f2d7b7637` | ❌ ma is "unsupported yet" stub |
| Kép törlésekor blob törlés (`deleteBlobForImage`, model.deleted listener) | `c60003311`, `6cf890060` | ❌ senki nem hívja a `blobSync.delete`-et |
| Attachment törlésekor blob törlés (attachment-model `deleted.once`) | `2bff8c1f9` | ❌ nincs |
| Kép lazy loading (IntersectionObserver) | `542afbb98`, `76f30247b`, `73a9c941e` | ✅ natív `loading="lazy"` van — a saját megoldás elhagyható |
| Loading kép stílusok | `8bf8df173` | portoláskor eldől |

### 1.7 Menü-karcsúsítás (~5 commit) — PORTOLANDÓ
- Linked docs + import docs eltávolítása: `6356f587e`
- Database ki a slash menüből/quick actionből/format barból: `714bff02a`
- Saját ikonok a slash menübe: `1ac4481f5`

### 1.8 Outline / frame panel / doc-title (~19 commit) — PORTOLANDÓ
- Outline viewer: styling/pozíció fixek, heading-szint alapú indikátor szélesség (`0b4721b5d`), mobil fixek
- Frame panel: kártya méretek, fejléc; doc-title: padding, responsivitás, event listener fix (`534307acb`)

### 1.9 Egyéb szerkesztő-fixek (~25 commit) — EGYENKÉNT ELLENŐRIZENDŐ
- Block selection delete konfliktus: `d8c32fb9e`
- Collapsed heading + divider collapse logika: `2662d5ec7`, `e8b33c3c1`, `ff63b557f`
- Code block sorszám + portal pozíció: `25a1baac1`, `fcccd4d74`
- Template menü: `d961f1ef2`, `b1dc74f77`; surface ref design: `16abcc150`
- Note edgeless toggle: `2ac53e8d0`; mobil menü z-index: `e4fe503d0`, `46fee6296`
- BlockSuite flagek: `851d99c9f`

### 1.10 Editor API — PORTOLANDÓ
- Signals expose az editor-containeren: `a6cc3fe05` (upstream a container már csak az integration-test csomagban él!)

### 1.11 Publish / build infra (~18 commit) — ADAPTÁLANDÓ
- `@algogrind/*` átnevezés: `scripts/tools/before-publish.ts` (`159ef6ec7`, `6ebdcc61e`)
- publishConfig restricted: `7efd3f035`; GH workflow-k ki: `f2db7da7d`; husky/commitlint ki: `a58e2f74e`
- `editor-icons` saját csomag (upstream helyette külső `@blocksuite/icons`-t használ!)

---

## 2. Upstream strukturális változások (0.19 → élő)

- `packages/blocks` és `packages/presets` **MEGSZŰNT** → `affine/blocks/*`, `affine/widgets/*`, `affine/gfx/*`, `affine/fragments/*`
- format-bar → egységes `widgets/toolbar` rendszer
- `@blocksuite/block-std` → `@blocksuite/std`; az `inline` csomag beolvadt az std-be
- `editor-icons` → külső `@blocksuite/icons` npm csomag
- `doc-meta-tags` és `comment` fragment megszűnt (comment → `affine/inlines/comment`)
- Az élő fa (AFFiNE monorepo `blocksuite/`) mappaszinten AZONOS a tükör-layouttal, csak `packages/` helyett `blocksuite/` a gyökér
- Csomagok önállóan verziózottak (0.27.0) → a saját `@algogrind/*` publikálás működőképes marad

### Régi → új útvonal-térkép (fő helyek)
| Régi | Új |
|---|---|
| `blocks/src/root-block/widgets/slash-menu/` | `affine/widgets/slash-menu/src/` |
| `blocks/src/root-block/widgets/format-bar/` | `affine/widgets/toolbar/src/` |
| `blocks/src/root-block/widgets/keyboard-toolbar/` | `affine/widgets/keyboard-toolbar/src/` |
| `blocks/src/root-block/edgeless/components/toolbar/` | `affine/widgets/edgeless-toolbar/src/` (+ elem-toolbarok a saját gfx/block csomagjukban) |
| `blocks/src/root-block/edgeless/gfx-tool/pan-tool.ts` | `affine/gfx/pointer/src/tools/pan-tool.ts` |
| `blocks/src/image-block/` | `affine/blocks/image/src/` |
| `blocks/src/attachment-block/` | `affine/blocks/attachment/src/` |
| `blocks/src/database-block/` | `affine/blocks/database/src/` |
| `blocks/src/code-block/`, `divider-block/`, `bookmark-block/` | `affine/blocks/code|divider|bookmark/src/` |
| `blocks/src/surface-ref-block/`, frame-block | `affine/blocks/surface-ref/src/`, `affine/blocks/frame/src/` |
| `affine/block-paragraph/`, `block-list/` | `affine/blocks/paragraph/src/`, `affine/blocks/list/src/` |
| `affine/block-embed/` | `affine/blocks/embed/src/` (synced/linked-doc → `affine/blocks/embed-doc/`) |
| `affine/components/` inline node-ok | `affine/inlines/link|reference|latex/` |
| `presets/src/fragments/outline|frame-panel|doc-title` | `affine/fragments/outline|frame-panel|doc-title/` |
| `presets/src/editors/` | `integration-test/src/editors/` (csak `TestAffineEditorContainer`) |
| `framework/block-std` | `framework/std` (az inline engine is itt: `std/src/inline/`) |
| gyökér `tests/` (Playwright) | tükörben nincs; AFFiNE monorepóban `tests/blocksuite/` |

---

## 3. Stratégia és következő lépések

1. ✅ **Új alap:** `master-affine` branch (tükör main + mai canary sync + lockfile). Jövőbeli sync ugyanígy: `packages/` csere az AFFiNE `blocksuite/` mappájából + `yarn install --no-frozen-lockfile` + `yarn dedupe`.
2. **Portolási sorrend:** ELŐBB A FEATURE-ÖK: readonly guardok → fordítások → emoji menü + accordion → blob-törlés lánc → apró fixek egyenkénti ellenőrzéssel → UTÁNA a téma/design átírása → **legvégül, közvetlenül a publish előtt**: a `@algogrind/*` átnevezős publish-infra (`before-publish.ts`).
3. **Figyelem:** a 0.19 → 0.27 ugrás API-törésekkel jár — a blocksuite-ot fogyasztó algogrind alkalmazást is adaptálni kell (`@algogrind/blocks` és `@algogrind/presets` csomagok megszűnnek, helyettük sok kis csomag vagy az aggregált `@algogrind/affine`).

## 4. Upstream fedés — gyorsösszefoglaló

**Már megvan upstreamben (kiesik a portból):**
- Kanban drag readonly-guard
- Attachment options readonly-ban (toolbar-service)
- Collapsed heading readonly-toggle
- Kép lazy loading (natív `loading="lazy"`)

**Nincs meg upstreamben (portolandó):**
- Minden fordítás (i18n infra sincs)
- Readonly guardok zöme (pan, zoom, frame reorder, shortcutok, drag-guardok, keymap, tábla-mutációk)
- **Blob-törlés lánc (BlobEngine.delete implementáció + image/attachment deleted-listenerek)**
- Emoji menü, accordion block, teljes téma-réteg, menü-testreszabások, editor-container signalok
