# MarCRM Daily Scrape — Evening Pass
**Date:** Friday, April 17, 2026
**Scrape time:** 21:30 EDT (scheduled automated run)
**Status:** ⚠️ DB write deferred — Next.js dev server not running in sandbox, Neon DB unreachable. Signals captured below; run `npm run dev` + POST `/api/daily-scrape` locally (or use a custom import script) to write them back.

---

## Execution Notes

- **Attempted:** `POST http://localhost:3000/api/daily-scrape`
- **Result:** endpoint not reachable (server down); Prisma connection to `ep-silent-moon-a42be4c4.us-east-1.aws.neon.tech` also fails from sandbox.
- **Fallback:** Ran web-search-based signal refresh on the 10 hottest companies in Targeted/Contacted stages — the 8 leads added this morning plus 2 carryovers from the 4/15 evening pass (Vestwell, Rain). Signal deltas below are ready to be merged into `fitDetails`/`intentDetails`.

---

## Summary

| Metric | Count |
|---|---|
| Companies checked | 10 |
| New hiring signals | 3 |
| New growth indicators | 5 |
| New news/launches/partnerships | 4 |
| Outdated websites flagged | 1 |
| Northeast conferences queued (watch list) | 6 |
| DB updates written | 0 (import deferred) |

---

## Top 5 Companies with Strongest Growth Signals (Evening)

### 1. Orbital — `legal-consulting`
**New signal:** Explicit plan to double US headcount + open additional US hubs post-$60M Series B (Jan 2026). Brighton Park Capital portfolio page confirms 200k real estate transactions supported in 2025.
**Action:** Katie-shaped US expansion moment — pitch brand/PR and event support this week.
**Score delta:** Fit +2 → 42, Intent +2 → 39

### 2. depthfirst — `ai-consulting`
**New signal:** Field Marketing role posted on depthfirst.com/careers (5-12 yrs B2B field marketing, end-to-end event execution). Confirms real brand/event budget behind the $80M Series B at $580M valuation.
**Action:** Pitch fractional field-marketing leadership or event-PR partnership directly to the hiring manager.
**Score delta:** Fit +3 → 44, Intent +2 → 43

### 3. Vestwell — `pr-marketing` (carryover from 4/15 evening)
**New signal:** 81 open roles on LinkedIn (13 public on Glassdoor), including a live **Specialist, Service Communications & Enablement** role ($70-80K base). Post-$385M Series E headcount ramp.
**Action:** Introduce fractional senior comms leadership to complement the specialist hire — they clearly need more than a specialist.
**Score delta:** Fit +2 → 37, Intent +1 → 29

### 4. Summize — `pr-marketing`
**New signal:** Three C-suite hires in Q1 — Alexandria Lutz as first General Counsel (ex-Nordstrom, Mar 24), Christopher Picarde as CRO, Mark Oshry as SVP Customer Success. Follows the $50M growth round.
**Action:** Executive-thought-leadership + new-hire PR packaging pitch. Clear "next phase of global growth" language from the company.
**Score delta:** Fit +2 → 42, Intent +2 → 37

### 5. Wealth.com — `pr-marketing`
**New signal:** Product launch confirmed alongside yesterday's $65M Series B — **Ester Intelligence** AI platform. Dual announcement = bigger comms moment than the funding alone.
**Action:** Still the hottest carry from this morning. Reach out tomorrow (Saturday) or Monday AM before the news cycle fades. Target Rafael Loureiro (CEO).
**Score delta:** Fit +0 → 46, Intent +2 → 46

---

## Outdated Website — Design Refresh Opportunity

| Company | Freshness | Opportunity |
|---|---|---|
| **Eyre Street Capital** (fund-formation) | 5/10 (template-y, ~18 mo old) | Doubling fund size from ~$421M to ~$800M is the natural moment for a brand refresh. Bundle design refresh + fund formation comms support. |

Everyone else checked is running a modern (Next.js / Tailwind / clean 2025-era) site — no refresh plays.

---

## Recent Launches & Funding (last 30 days)

| Date | Company | Event |
|---|---|---|
| 2026-04-16 | **Wealth.com** | $65M Series B + Ester Intelligence AI launch (same-day dual announcement) |
| 2026-04 (week of 4/14) | **Rain** | Episode Six partnership for APAC stablecoin card programs + Visa Membership APAC expansion + FTA membership |
| 2026-03-31 | **depthfirst** | $80M Series B at $580M valuation |
| 2026-03-26 | **Tazapay** | $36M Series B extension led by Circle Ventures (CMT Digital, Coinbase Ventures join) |
| 2026-03-24 | **Summize** | First GC hire (Alexandria Lutz, ex-Nordstrom) |

---

## Northeast Conference Watch (May–June 2026)

| Date | Event | Who in our pipeline should be there |
|---|---|---|
| May 21 | Women in FinTech NYC | pr-marketing leads |
| Jun 8–10 | ETHConf (Javits Center, NYC) | Rain, Tazapay, blockchain-leaning fintech |
| Jun 12–14 | ETHGlobal NYC (Metropolitan Pavilion) | Rain, crypto/stablecoin clients |
| Jun 15 | Future Branches Boston (Sheraton) | Vestwell, wealth/branch-tech |
| Jun 17 | FinTech Connect North America (Worcester, MA) | Tazapay, Rain, Wealth.com |
| Jun (TBC) | SuperReturn North America (Boston) | **Dolomite, Eyre Street, Ferghana, Fedaia, Air Street** — all 5 fund formation leads |

SuperReturn NA is the biggest evening find — five of today's fund-formation leads would all plausibly be there. Worth a batch pre-conference outreach sequence.

---

## Import Instructions

The JSON companion file at `reports/daily-scrape-2026-04-17-evening.json` contains per-company `fitDetails` / `intentDetails` deltas. To apply:

1. Start dev server locally: `cd /Users/Katie/Desktop/MarCRM && npm run dev`
2. From a second shell: `curl -X POST http://localhost:3000/api/daily-scrape` (will run the full live scraper with actual Indeed/CareerBuilder HTTP calls)

Or, to apply just the signals captured in this report, a lightweight import script following the pattern of `scripts/import-2026-04-17.cjs` would work.

---

## Notes / Caveats

- Indeed and CareerBuilder are blocked from the sandbox's web-search tool, so hiring signal scores here are based on LinkedIn/Glassdoor/company careers pages (generally richer anyway).
- No new "Targeted"/"Contacted" companies were added this evening — intentionally narrowed to signal refresh rather than lead generation to match the scheduled task's scope.
- Reddit is still blocked; not expected to matter for this pass.
