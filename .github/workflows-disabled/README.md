# [ALGOGRIND] Kikapcsolt upstream workflow-k

Ezek a workflow-k az eredeti BlockSuite repóból származnak. A GitHub csak a
`.github/workflows/` mappát olvassa, ezért itt teljesen inaktívak — nem
jelennek meg az Actions fülön és nem indíthatók.

Referenciának tartjuk meg őket:

- `sync-blocksuite.yml` — hogyan szinkronizálta az upstream a csomagokat az
  AFFiNE monorepóból (a jövőbeli upstream-frissítés receptje)
- `release.yml` / `canary-release.yml` — az upstream npm publish folyamata

Újraélesztéshez elég visszamozgatni a fájlt a `.github/workflows/` mappába.
