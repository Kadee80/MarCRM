# MarCRM Daily Scrape — Evening Pass

**Date:** Thursday, April 23, 2026
**Scrape time:** 19:05 EDT (scheduled automated run)
**Status:** ❌ **DB write failed — Neon unreachable from sandbox.** No company records were updated. Re-run locally to apply signals.

---

## Execution Notes

- **Attempted:** `POST /api/daily-scrape` (Next.js dev server not running on the sandbox), then fell back to `node scripts/run-daily-scrape.mjs`.
- **Result:** `PrismaClientInitializationError` — can't reach `ep-silent-moon-a42be4c4.us-east-1.aws.neon.tech:5432`. `getent hosts` confirms DNS is unreachable (same 172.16.10.1#53 block observed on every prior evening run — 4/17, 4/21, 4/22).
- **DB writes completed:** 0.
- **Companies processed:** 0.

This is an infrastructure constraint of the scheduled-task sandbox, not a code or data issue. The four scrapers (`jobBoardScraper`, `websiteFreshness`, `newsFinder`, `conferenceFinder`) are otherwise healthy — last verified run was 4/22 evening on the same script path.

---

## Summary

| Metric | Count |
|---|---|
| Companies checked | 0 |
| New hiring signals | 0 |
| New growth indicators | 0 |
| New news / launches | 0 |
| Outdated websites flagged | 0 |
| Conferences added to watchlist | 0 |
| **DB updates written** | **0 (deferred)** |

---

## Top Growth Signals

None surfaced this run — the scraper never reached `prisma.company.findMany()`. The last successful signal refresh was 4/22 evening, and those findings (InsightFinder, Seapoint, Wealth.com, Monk, ScreenPoint Medical, plus the Zenskar/Coral/Logicc/RIIG/Trimontium cohort) remain the current working set until the next successful run.

See `daily-scrape-2026-04-22-evening.md` for the active growth-signal board.

---

## Outdated Websites

None flagged this run. Last flagged: **InsightFinder** (4/22 evening — ~24mo age, pre-AI-agent-era design; design refresh bundled with first-AE/GTM engagement is still the recommended play).

---

## Recent Launches & Funding

None detected this run. The 7-day window from 4/22 evening still applies — no new events since the Monk (4/21) / Seapoint (4/21) / RIIG (4/21) / Zenskar (4/20) / Coral (4/20) / Logicc (4/20) cluster.

---

## How to Apply Tonight's Scrape

Re-run the standalone scraper from Katie's local machine where Neon is reachable:

```
cd /Users/Katie/Desktop/MarCRM
node scripts/run-daily-scrape.mjs
```

That will execute the full evening pass against every company in `Targeted`, `Contacted`, `Engaged`, and `Qualified` stages, write updated `fitScore` / `intentScore` / `fitDetails` / `intentDetails` / `lastActivity`, and emit a fresh JSON alongside this report.

If local node + Prisma generate latency on the full set, a narrower option is to run just the script's logic against the priority 10 (same 10 from 4/22 evening) — edit the `activeStages` filter or add a `name IN [...]` clause.

---

## Conference Watchlist (unchanged)

No new Northeast-relevant conference announcements surfaced today. The active watchlist carries forward from 4/22 evening: Aqualis → SuperReturn Secondaries; ScreenPoint → RSNA Chicago; Wealth.com → Schwab Impact; InsightFinder → KubeCon / O11yCon; Joyful Health → HIMSS / HLTH; Nas.com → SXSW 2027 / VidCon.

---

## Next Scheduled Run

- **Morning pass:** 2026-04-24 ~07:00 EDT (`marcrm-morning-scrape`) — will attempt the same endpoint; expect the same sandbox constraint.
- **Evening pass:** 2026-04-24 ~19:00 EDT (`marcrm-evening-scrape`).

The durable fix is to either (a) run the scheduler from Katie's Mac directly rather than the Cowork sandbox, or (b) allowlist `*.neon.tech` in the sandbox egress policy so the Prisma client can reach the DB.
