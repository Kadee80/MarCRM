# MarCRM Daily Scrape — 2026-07-28 (Tue)

**Scrape time:** ~19:48 CDT
**Window covered:** Fri 2026-07-24 → Tue 2026-07-28 (includes weekend gap; last daily was 7/24)
**Total new leads:** 5 (1 A · 3 B · 1 C) — deduplicated against ALL daily / pr-freelance / legal-freelance reports 7/10–7/24
**Dedup note:** LinqAlpha and Bespoke Labs surfaced again this cycle but were already captured on **7/10** — dropped from new leads. LinqAlpha's higher re-score is folded into Signal Refresh below.
**Note:** Neon DB not reachable from sandbox → import script generated for local run: `node scripts/import-2026-07-28.cjs`

---

## Top 5 hottest leads

| Company | Pipeline | Fit | Intent | Combined | Trigger |
|---|---|---|---|---|---|
| Enigma | pr-marketing | 39 | 42 | **81 (A)** | Emerged from stealth 7/27 w/ $71M seed (Index, Ribbit) |
| Silent Ventures (Fund II) | fund-formation | 40 | 36 | **76 (B)** | New Form D — Fund II raise, aerospace/defense VC |
| Prime Intellect | pr-marketing | 41 | 34 | **75 (B)** | $130M Series A at $1B valuation (7/8) |
| Fractional GC (1099, unnamed) | legal-freelance | 25 | 45 | **70 (B)** | Fresh remote fractional-GC posting (7/25) |
| Proterra Credit Partners LP | fund-formation | 30 | 20 | **50 (C)** | New Form D — private credit fund |

---

## New leads by pipeline

### pr-marketing (2)
- **Enigma** — 81 (A). Physical-AI/robotics; emerged from stealth 7/27 with $71M seed (Index Ventures + Ribbit Capital; angels from OpenAI/Anthropic/DeepMind/xAI/Cognition/Wiz). Launched robots.online. Freshest lead — peak launch window. Caveat: elite backers may mean a big retained firm; realistic angle is fractional/overflow or US-market narrative. Move fast.
- **Prime Intellect** — 75 (B). $130M Series A at $1B (7/8), enterprise AI-agent infra. Unicorn budget, softening window. Pitch thought-leadership/analyst relations; qualify whether comms is already staffed.

### fund-formation (2)
- **Silent Ventures (Fund II)** — 76 (B). Emerging VC (aerospace/defense/nat-sec) raising Fund II per new Form D. Caveat: Form D implies counsel already engaged for this close; pitch fund-maintenance / LP-docs / next-vehicle support rather than initial formation.
- **Proterra Credit Partners LP** — 50 (C). Private-credit fund via **established** Proterra Investment Partners; almost certainly has counsel. Low priority — pursue only on a warm referral.

### legal-freelance (1)
- **Fractional General Counsel (founding-caliber, 1099, unnamed startup via Indeed/ZipRecruiter)** — 70 (B). Textbook fractional/remote/1099 engagement (high intent), but **comp is equity + success fee with no base or retainer** — below the paid-judgment bar Mark targets, and no fund/practice specialization (low fit). FLAG: qualify economics hard before investing time; confirm employer and whether a cash retainer is negotiable.

*(No new pr-freelance, legal-consulting, coaching-ops, media, or ai-consulting leads cleared the 40-point bar this cycle.)*

---

## Signal refresh — existing hot leads

| Lead | Prev | Now | Δ | What changed |
|---|---|---|---|---|
| **Neo** (pr-marketing) | 93 | 93 | 0 | Confirmed aggressive GTM build — hiring 20+ by year-end, field-facing + detection-engineering focus. No dedicated comms hire noted → strong external-PR opening. **Data fix: website is neo.ai, not neo.security.** Window still open (launched 7/20). |
| **CuspAI** (pr-marketing) | 76 | **80 (A)** | +4 | Launched the **AI Materials Foundry** coalition (industrial + tech partners) alongside the $450M raise — fresh, earned-media-ready trigger beyond the funding. Bump to A. |
| **Augustus** (pr-marketing) | 80 | 82 | +2 | De-novo-bank build-out continuing; backer roster (founders of Nubank/Ramp/Circle/Deel) reinforces narrative surface. Steady, in-window. |
| **LinqAlpha** (pr-marketing) | 68 (7/10) | **82** | +14 | Not a new lead — already in CRM from 7/10. Re-scored up on deeper proof assets found this cycle (70+ FIs, >$5T AUM buy-side). Note: score jump is from better research, not a fresh external trigger; raise (7/2) is ~4 wks old so the acute window is softening. |

**Recommended actions:** (1) Prioritize **Neo** outreach now — GTM scaling without a named comms lead is the cleanest opening; use corrected domain neo.ai. (2) Re-approach **CuspAI** on the AI Materials Foundry coalition angle, not just the raise. (3) **LinqAlpha** deserves a fresh look given the re-score — pitch "AI on the buy side" thought leadership. (4) Keep **Augustus** warm.

---

## Trends spotted
- **Physical/enterprise AI dominates the funding surface** (Enigma robotics, Prime Intellect agent infra, Neo AI-security, CuspAI materials) — strongest earned-media appetite is in "AI applied to X," not generic model plays.
- **FS-adjacent AI is the sweet spot** for pr-marketing: LinqAlpha (re-scored) and Augustus both sit squarely in the FS+Tech ICP with credible proof assets.
- **Fractional/1099 legal supply is rising but quality is uneven** — this week's fractional-GC posting offered equity-only comp, a reminder to filter on economics, not just engagement label.

## Most productive sources
Crunchbase weekly rounds + Tech Startups 7/27 roundup (pr-marketing), TechCrunch (Enigma, Prime Intellect), Dakota Form D tracker (fund-formation), Indeed/ZipRecruiter (legal-freelance).

## Skipped leads (with reasons)
- **Antares** ($470M Series C, 7/27) — nuclear-energy/defense; outside FS/Tech ICP.
- **Neko Health** ($700M Series C, 7/15) — healthtech diagnostics; outside ICP and likely large retained firm.
- **eToro** (rebrand 7/7) & **Anthropic** ($65B Series H) — far too large for the 10–500-employee boutique ICP.
- **Dolomite Capital** (private credit, ~$1.1B launch) — too large / established; not an emerging-manager fit.
- **Flex** — already in CRM (7/20). **LinqAlpha** & **Bespoke Labs** — already in CRM (7/10); LinqAlpha moved to signal refresh, Bespoke dropped (still weak, no new signal).
- **Fractional Communications Director / earned-media pilot (Indeed)** — likely the same evergreen posting captured 7/21 (pr-freelance); skipped to avoid duplication.

## Next steps for Katie
1. **Run the import locally:** `node scripts/import-2026-07-28.cjs` (needs `DATABASE_URL`).
2. **Update Neo's website field** to `neo.ai` in the CRM (was recorded as neo.security).
3. **Outreach priority order:** Neo → Enigma → LinqAlpha (re-score) → CuspAI (coalition angle) → Augustus.
4. **Enrich** Enigma / Prime Intellect with named comms decision-makers before pitching.
5. **Legal-freelance:** only chase the fractional-GC lead if the equity-only comp turns out to be negotiable.
