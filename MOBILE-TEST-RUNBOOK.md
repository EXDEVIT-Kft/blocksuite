# Telefonos teszt — runbook (előtte / utána)

Rövid, másolható parancssor a telefonos LAN-teszthez. Minden tűzfal-parancs
**rendszergazda PowerShell**-t igényel (Start → PowerShell → jobb klikk → „Futtatás
rendszergazdaként"). Háttér: `TELEFON-TESZT-TERV.md`.

Telefon URL: **`http://192.168.100.6:5173/`** (telefon + gép ugyanazon a routeren).

---

## ▶️ TESZTELÉS ELŐTT

**1. Állítsd be a bejövő engedélyező szabályt (Vite Dev 5173)** — **rendszergazda**
PowerShell. Újra-futtatható (előbb törli a régit, ha volt, majd létrehozza):
```powershell
Remove-NetFirewallRule -DisplayName "Vite Dev 5173 (LAN)" -ErrorAction SilentlyContinue
New-NetFirewallRule -DisplayName "Vite Dev 5173 (LAN)" -Direction Inbound -LocalPort 5173 -Protocol TCP -Action Allow -Profile Private -RemoteAddress LocalSubnet
```

**2. Engedélyezd a node bejövő forgalmát** (kikapcsolja a node-tiltó szabályokat, amik
felülírják az engedélyezőt) — **rendszergazda**:
```powershell
Get-NetFirewallApplicationFilter | Where-Object { $_.Program -like '*node*' } | ForEach-Object { $r = $_ | Get-NetFirewallRule; if ($r.Direction -eq 'Inbound' -and $r.Action -eq 'Block') { $r } } | Set-NetFirewallRule -Enabled False
```

**3. Indítsd a dev szervert** (ha még nem fut) — sima terminál a projektben:
```powershell
yarn dev
```

**4. Telefon:** nyisd meg a `http://192.168.100.6:5173/`-at. (Kód mentésekor a HMR frissít;
ha nem, frissíts kézzel a telefonon.)

---

## ⏹️ TESZTELÉS UTÁN (mindent vissza)

**1. Állítsd vissza a node-tiltó szabályokat** (újra bekapcsolja őket) — **rendszergazda**:
```powershell
Get-NetFirewallApplicationFilter | Where-Object { $_.Program -like '*node*' } | ForEach-Object { $r = $_ | Get-NetFirewallRule; if ($r.Direction -eq 'Inbound' -and $r.Action -eq 'Block') { $r } } | Set-NetFirewallRule -Enabled True
```

**2. Állítsd le a dev szervert:** a `yarn dev` terminálban **Ctrl+C**.

(A „Vite Dev 5173 (LAN)" engedélyező szabály maradhat — ártalmatlan, mert a visszakapcsolt
node-tiltás úgyis felülírja. A teljes törléséhez lásd lentebb.)

---

## 🧹 TELJES visszaállítás (ha teljesen végeztél a mobil teszteléssel)

Eredeti állapot (node-tiltók vissza BE + az engedélyező szabály törlése) — **rendszergazda**:
```powershell
Get-NetFirewallApplicationFilter | Where-Object { $_.Program -like '*node*' } | ForEach-Object { $r = $_ | Get-NetFirewallRule; if ($r.Direction -eq 'Inbound' -and $r.Action -eq 'Block') { $r } } | Set-NetFirewallRule -Enabled True
Remove-NetFirewallRule -DisplayName "Vite Dev 5173 (LAN)"
```

---

## Gyors ellenőrzések / hibakeresés

**Node-tiltók állapota** (True = tilt, False = kikapcsolva):
```powershell
Get-NetFirewallApplicationFilter | Where-Object { $_.Program -like '*node*' } | ForEach-Object { $r = $_ | Get-NetFirewallRule; if ($r.Direction -eq 'Inbound' -and $r.Action -eq 'Block') { [PSCustomObject]@{ Name=$r.DisplayName; Enabled=$r.Enabled; Profile=$r.Profile } } } | Format-Table -AutoSize
```

**Engedélyező szabály megvan-e:**
```powershell
Get-NetFirewallRule -DisplayName "Vite Dev 5173 (LAN)" | Format-List DisplayName, Enabled, Profile, Action, Direction
```

**Ha hirtelen megint nem tölt be a telefon:** először a node-tiltókat nézd (fenti parancs) —
Node.js frissítés vagy egy „Windows biztonsági figyelmeztetés" újra létrehozhatja/bekapcsolhatja
őket. Ilyenkor futtasd újra a „TESZTELÉS ELŐTT / 2." parancsot.

---

## Alternatíva: teszt telefon és tűzfal NÉLKÜL (a gépen)
A mobil viselkedés nagy része a gépen is nézhető, firewall-piszkálás nélkül:
1. `http://localhost:5173/` Chrome-ban.
2. **F12** → **Ctrl+Shift+M** (device toolbar) → válassz telefont (pl. Pixel 7).
3. **F5** (frissítés) → mobil User-Agent → `IS_MOBILE` igaz → mobil toolbar viselkedés.

Ezzel az 1. (kép-toolbar) és 3. (slash almenü) hiba tesztelhető; a 2. (billentyűzet-takarás)
csak valódi telefonon.
