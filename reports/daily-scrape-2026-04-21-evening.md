# MarCRM Daily Scrape — Evening Pass

**Date:** Tuesday, April 21, 2026
**Scrape time:** 21:30 EDT (scheduled automated run)
**Status:** DB write deferred — Neon DB unreachable from sandbox (same constraint as every prior evening). Signals below are ready to be merged into `fitDetails`/`intentDetails` when run locally.
**Supersedes:** earlier stub at 10:22 EDT that just documented the failure.

---

## Execution Notes

- **Attempted:** `POST http://localhost:3000/api/daily-scrape`
- **Result:** endpoint not reachable (server can't bind Neon); Prisma direct connection to `ep-silent-moon-a42be4c4.us-east-1.aws.neon.tech` also fails from sandbox (DNS blocked).
- **Fallback:** Ran web-search-based signal refresh on the 10 highest-priority companies in Targeted stage — the 7 leads added this morning (4/21) plus 3 hottest carryovers (Wealth.com, Aqualis Partners, InsightFinder).

---

## Summary

| Metric | Count |
|---|---|
| Companies checked | 10 |
| New hiring signals | 5 |
| New growth indicators | 6 |
| New news/launches | 6 |
| Outdated websites flagged | 1 (InsightFinder) |
| Conferences added to watchlist | 6 |
| DB updates written | 0 (import deferred) |

---

## Top 5 Companies with Strongest Growth Signals (Evening)

### 1. InsightFinder — `ai-consulting` — **HOTTEST EVENING FINDING**
**New signal:** CEO Helen Gu told TechCrunch the $15M Series B (4/16) will fund the company's "first dedicated sales and marketing hires." Fewer than 30 total employees, 3x revenue growth YoY, tier-1 customers (UBS, NBCUniversal, Lenovo, Dell, Google Cloud, Comcast). Website is also visibly dated — pre-AI-agent era enterprise-monitoring design.
**Why it matters:** A company hiring its first sales + first marketing person is the canonical AI-consulting moment. They need positioning, collateral, enterprise playbook, first-AE hire profile, website refresh — all of it. Bundle GTM consulting + design refresh as a package.
**Action:** Ping Helen Gu directly this week. Story is still fresh (The AI Insider re-covered it today, 4/21).
**Score delta:** Fit +2 → 45, Intent +2 → 46

### 2. ScreenPoint Medical — `pr-marketing`
**New signal:** Triple announcement on 4/17 — $16M funding ($14M from Insight Partners + Siemens Healthineers, $2M non-dilutive grants) + Lancet paper (MASAI RCT: "consistently favourable outcomes vs. standard double reading") + Nature Medicine paper (Transpara safely reduces screening workload up to 63.6%). All inside 48 hours.
**Why it matters:** A single funding announcement is a PR moment; a same-week RCT in The Lancet is a PR moment; a Nature Medicine paper is a PR moment. Three in 48h is a dense narrative most PR teams would kill for, and is still mostly trapped inside medical trade press.
**Action:** Pitch a clinical PR engagement to cross-pollinate the stories across general-interest / trade / medical press. RSNA Chicago (Nov) is the natural speaking target — likely speaking slots given the publications.
**Score delta:** Fit +2 → 39, Intent +2 → 39

### 3. Wealth.com — `pr-marketing` (carryover from morning)
**New signal confirmed:** $65M Series B (4/16) + Ester Intelligence AI launch are both bigger than the morning scrape captured. Ester now synthesizes estate docs + tax returns + balance sheets + planning logic as a unified system of specialized agents. 664% YoY AI-workflow growth. Approval from 3 largest US broker/dealers = 50,000+ advisor reach unlocked.
**Why it matters:** Already at Fit/Intent cap (46/46). What's new tonight is the quantified growth (664%) and the distribution win (50K advisors). Those numbers deserve their own dedicated pitch angle beyond the funding headline.
**Action:** Reach out tomorrow (Wed 4/22) with a pitch deck that leads with the 664% / 50K numbers, not the funding. Target Rafael Loureiro. Move Targeted → Contacted this week.
**Score delta:** Fit +0 → 46 (capped), Intent +0 → 46 (capped)

### 4. Wonderful — `ai-consulting`
**New signal:** Careers page live at wonderful.ai/careers. Explicit 300 → 900 headcount ramp across 30+ countries. $150M Series B at $2B valuation (3/12), only 13 months post-founding. Insight Partners-led = enterprise-software-sales DNA.
**Why it matters:** Hypergrowth narrative (13mo to $2B) is the kind of earned-media moment a PR shop wins awards for. Change-management + US GTM comms is where Katie can land.
**Action:** Pitch Arpit Mehta on US market-entry comms + change-management support across the 30+ country rollout.
**Score delta:** Fit +0 → 44, Intent +0 → 45

### 5. Shiprock Capital Management — `fund-formation`
**New signal:** Confirmed hiring velocity — Alex Williamson (ex-Deutsche Bank EM debt head, hired Dec 2025) is the new-fund lead; joined by Mauro Roco (senior sovereign strategist), Eric Ho (senior investment counsel), Gav Sangha (COO, March 2026), and Nicolai Vickman (CRO, December 2025). Five senior hires in 12 months.
**Why it matters:** Senior-hire cadence confirms the new debt fund is imminent, not theoretical. Fund-formation legal work: LPA, offering docs, side letters, regulatory filings, GP ops build-out.
**Action:** Warm intro to legal ops POC via the hedge-fund conference circuit.
**Score delta:** Fit +1 → 39, Intent +2 → 40

---

## Outdated Website — Design Refresh Opportunity

| Company | Freshness | Opportunity |
|---|---|---|
| **InsightFinder** (ai-consulting) | 5/10 (pre-AI-agent era, ~18mo+) | First sales + first marketing hire is the exact moment to bundle a website refresh alongside GTM consulting. |

Everyone else checked is running a modern post-raise site.

---

## Recent Launches & Funding (last 45 days)

| Date | Company | Event |
|---|---|---|
| 2026-04-17 | **ScreenPoint Medical** | $16M funding + Lancet RCT + Nature Medicine paper (triple announcement) |
| 2026-04-16 | **Nas.com** | $27M Series A from Khosla + 500 Global + celebrity angel syndicate |
| 2026-04-16 | **Wealth.com** | $65M Series B + Ester Intelligence AI launch (dual same-day announcement) |
| 2026-04-16 | **Joyful Health** | $17M Series A led by CRV |
| 2026-04-16 | **Solidroad** | $25M Series A from Hedosophia; 9 open GTM/Product roles live |
| 2026-04-16 | **InsightFinder** | $15M Series B from Yu Galaxy — first sales/marketing hires |
| 2026-04-15 | **Parasail** | $32M Series A co-led by Touring Capital + Kindred |
| 2026-03-12 | **Wonderful** | $150M Series B at $2B valuation from Insight Partners |

---

## Conference Watchlist (Northeast / relevant)

| Company | Event | Status |
|---|---|---|
| Aqualis Partners | SuperReturn Secondaries NA / Europe | **Speaker confirmed** (Cari Lodge) |
| ScreenPoint Medical | RSNA 2026 (Chicago, Nov) / SBI Breast Imaging | Likely speaking (Lancet + Nature pubs) |
| Wealth.com | Schwab Impact / Future Proof / Wealthies | Watch — Schwab is investor |
| Nas.com | SXSW 2027 / VidCon / Collision | Watch — 70M-follower public-speaker founder |
| InsightFinder | KubeCon / O11yCon | Watch |
| Joyful Health | HIMSS 2026 / HLTH | Watch |

---

## How to Write These Back

The deltas in `daily-scrape-2026-04-21-evening.json` are import-ready. From `/Users/Katie/Desktop/MarCRM` where Neon is reachable:

```
# Option A — run the full scraper
node scripts/run-daily-scrape.mjs

# Option B — duplicate the import pattern for evening deltas
cp scripts/import-2026-04-21.cjs scripts/import-2026-04-21-evening.cjs
# edit to pull signalsByCompany from the -evening.json and upsert score/details
node scripts/import-2026-04-21-evening.cjs
```

Either path will pick up the `signalsByCompany` block and update `fitScore`,
`intentScore`, `fitDetails`, `intentDetails`, and `lastActivity` for the 10
companies checked.
