# MarCRM Daily Scrape — Evening Pass

**Date:** Wednesday, April 22, 2026
**Scrape time:** 19:05 EDT (scheduled automated run)
**Status:** DB write deferred — Neon DB unreachable from sandbox (DNS blocked; same constraint as every prior evening). Signals below are ready to merge into `fitDetails`/`intentDetails` when run locally.

---

## Execution Notes

- **Attempted:** `POST /api/daily-scrape` via `node scripts/run-daily-scrape.mjs`
- **Result:** `PrismaClientInitializationError` — can't reach `ep-silent-moon-a42be4c4.us-east-1.aws.neon.tech:5432` from the sandbox. `getent hosts` and `nslookup` both return `network unreachable` on 172.16.10.1#53.
- **Fallback:** Ran web-search-based signal refresh on the 10 highest-priority companies in the Targeted / Contacted stages — the 7 leads added this morning (Monk, Zenskar, Coral, Logicc, Seapoint, RIIG, Trimontium) plus 3 hottest carryovers (InsightFinder, ScreenPoint Medical, Wealth.com).

---

## Summary

| Metric | Count |
|---|---|
| Companies checked | 10 |
| New hiring signals | 4 |
| New growth indicators | 7 |
| New news / launches | 9 |
| Outdated websites flagged | 1 (InsightFinder) |
| Conferences added to watchlist | 0 (no new Northeast hits since Apr 21) |
| DB updates written | 0 (import deferred) |

---

## Top 5 Companies with Strongest Growth Signals (Evening)

### 1. InsightFinder — `ai-consulting` — **HOTTEST EVENING FINDING (carryover confirmed)**

**What's new tonight:** CEO Helen Gu's TechCrunch quote stands up on re-check — $15M Series B explicitly funds "first dedicated sales and marketing hires." <30-person team. Revenue up 3x YoY. Company wasn't raising; Yu Galaxy-led round happened because a seven-figure Fortune 50 deal triggered inbound investor interest inside three months. Customer roster holds (UBS, NBCUniversal, Lenovo, Dell, Google Cloud, Comcast). Website remains visibly pre-AI-agent-era.

**Why it still matters most:** A company hiring its first sales person AND first marketing person is the canonical AI-consulting moment — they need positioning, collateral, an enterprise playbook, a first-AE hire profile, AND a website refresh. Single-engagement bundle.

**Action:** Ping Helen Gu this week. The narrative is still fresh — The AI Insider and Tech Funding News both re-covered it through 4/21.

**Score delta:** Fit +2 → 45, Intent +2 → 46

### 2. Seapoint — `pr-marketing`

**What's new tonight:** Launch-day stack is denser than morning captured. €7.5M seed closed 4/21 alongside public self-service launch to **all** UK + Ireland founders for the first time. €10M total raised in ~15 months. 80+ customers, 100K+ transactions processed, 40K invoices processed day one. Founder: Sean Mullaney, ex-Stripe European CIO; >50% of team are Stripe alumni. 40+ angels including Claire Hughes Johnson (ex-COO Stripe), Laurence Krieger (ex-UK CEO Tide, ex-COO Revolut), Des Traynor (Intercom co-founder), Luke Mackey (CEO Kota).

**Why it matters:** This is a generational PR moment — the angel roster alone will earn press coverage across UK / IE / US fintech trades. The 'financial home for European founders' narrative is pitch-ready, and the product-launch story (10-minute setup, day-one traction metrics) is separately quotable.

**Action:** Move Targeted → Contacted this week. Warm-intro path via Michael McFadgen at 13books Capital.

**Score delta:** Fit +1 → 42, Intent +1 → 41

### 3. Wealth.com — `pr-marketing` (carryover from morning, confirmed)

**What's new tonight:** The big numbers hold up on independent verification — 664% YoY AI-workflow growth; in 2025 Ester Intelligence processed 100K+ estate documents and did 1,000+ deterministic calcs per estate distribution; 3 largest US broker/dealer approvals unlocking 50K+ advisor distribution. $65M Series B (Titanium / Pruven / K Fund / Dynasty new; Schwab / GV / Citi / Anthos / 53 Stations / Alumni follow-on).

**Why it matters:** Already at Fit/Intent cap. What's new is just how stacked the narrative is beyond the headline funding number. 664% + 50K advisors deserves its own pitch deck angle, separate from funding.

**Action:** Wed 4/22 outreach to Rafael Loureiro with a deck that LEADS with 664% / 50K, not the $65M. Move Targeted → Contacted.

**Score delta:** Fit +0 → 46 (capped), Intent +0 → 46 (capped)

### 4. Monk — `ai-consulting`

**What's new tonight:** 5 open roles confirmed on Fast AI Jobs + live careers page. $25M Series A from Footwork + Acrew (4/21) brings total to $29M. Proof points: 40% DSO reduction, 25+ hrs/mo saved per AR team, 24% higher collections response. New capital explicitly for R&D + category-defining AR product.

**Why it matters:** Pair with Zenskar as a single cohort outreach ("AI-consulting retainer for post-Series A order-to-cash rollouts"). Early comms/PR runway still wide open — no dedicated comms hire language yet.

**Action:** Build an order-to-cash AI cohort pitch deck this week (Monk + Zenskar + reference to Coral for the enterprise-autonomy parallel).

**Score delta:** Fit +0 → 42, Intent +1 → 42

### 5. ScreenPoint Medical — `pr-marketing`

**What's new tonight:** No new announcement since 4/17 triple-stack — but coverage is still contained to medical / femtech trade press and investor blogs. Cross-pollination opportunity into general-interest and business press is still open. 30+ country deployment, 12M+ mammograms processed.

**Why it matters:** The narrative is still live and under-pitched. RSNA Chicago (Nov 2026) is the natural speaking target — Lancet + Nature Medicine publications make speaking slot allocation near-automatic.

**Action:** Pitch a clinical PR engagement — 60-day sprint to move the Lancet + Nature Medicine stories into Bloomberg / Forbes / WSJ Health.

**Score delta:** Fit +2 → 39, Intent +2 → 39

---

## Outdated Website — Design Refresh Opportunity

| Company | Freshness | Opportunity |
|---|---|---|
| **InsightFinder** (ai-consulting) | 5/10 (~24 months; pre-AI-agent-era enterprise-monitoring design) | Bundle website refresh alongside GTM consulting + first-AE hire profiling. One engagement, three problems solved. |

Everyone else checked is running a modern post-raise site (Monk, Zenskar, Coral, Seapoint all have fresh 2025-era design language).

---

## Recent Launches & Funding (confirmed tonight, last 7 days)

| Date | Company | Event |
|---|---|---|
| 2026-04-21 | **Monk** | $25M Series A (Footwork + Acrew co-lead, BTV follow-on) |
| 2026-04-21 | **Seapoint** | €7.5M seed + public UK/Ireland GA launch |
| 2026-04-21 | **RIIG Technology (HOOTL)** | $6M+ Series A + Dubai JV + Canadian subsidiary |
| 2026-04-20 | **Zenskar** | $15M Series A + Agents Marketplace launch + Slack agent + MCP |
| 2026-04-20 | **Coral** | $12.5M Series A (Lightspeed + Z47) — 8x revenue growth in 7 months |
| 2026-04-20 | **Logicc** | €2.5M seed (Hamburg) — €1M+ ARR in 6 months |
| 2026-04-17 | **ScreenPoint Medical** | $16M + Lancet MASAI + Nature Medicine (triple-stack) |
| 2026-04-16 | **Wealth.com** | $65M Series B + Ester Intelligence AI launch |
| 2026-04-16 | **Nas.com** | $27M Series A (Khosla + 500 Global + celebrity angels) |
| 2026-04-16 | **Joyful Health** | $17M Series A (CRV lead; $22M total with seed follow-on) |
| 2026-04-16 | **InsightFinder** | $15M Series B (Yu Galaxy) — first sales/marketing hires |

---

## Evening Trend Reads

- **Order-to-cash AI "cohort" is now a real thing, not a coincidence.** Monk (4/21) + Zenskar (4/20) + Coral's adjacent billing/revenue-cycle work (4/20) — this is a 72-hour cluster. There's pitch leverage in going to the market with a dedicated "AI AR/AP consulting practice" narrative rather than one-off outreach.
- **Healthcare AI cohort still tightening.** Joyful Health (4/16) → Coral (4/20) → RIIG/HOOTL (4/21) — three healthcare-AI raises in six days. All three hit different sub-segments (revenue cycle, specialty admin, claims verification). Good material for a "healthcare AI week" trades pitch.
- **InsightFinder remains the single best late-April engagement.** No other company in the list has all four of: first comms/PR hire, outdated site, enterprise-tier customers, and a non-dilutive funding story. Every other lead is missing at least one.
- **Seapoint's angel roster is unusually rich.** Claire Hughes Johnson + Des Traynor in one round is press-worthy independent of the product. That's the lead angle, not the €7.5M.

---

## Conference Watchlist (no new hits tonight)

No new Northeast-relevant conference announcements surfaced between 4/21 evening and 4/22 evening. Active watchlist carries forward from last evening's report (Aqualis → SuperReturn Secondaries; ScreenPoint → RSNA; Wealth.com → Schwab Impact; InsightFinder → KubeCon / O11yCon; Joyful Health → HIMSS / HLTH; Nas.com → SXSW 2027 / VidCon).

---

## How to Write These Back

Deltas in `daily-scrape-2026-04-22-evening.json` are import-ready. From `/Users/Katie/Desktop/MarCRM` where Neon is reachable:

```
# Option A — re-run the full scraper (will regenerate deltas live)
node scripts/run-daily-scrape.mjs

# Option B — pick up tonight's signalsByCompany and upsert scores/details
cp scripts/import-2026-04-22.cjs scripts/import-2026-04-22-evening.cjs
# edit to pull signalsByCompany from the -evening.json and update
# fitScore / intentScore / fitDetails / intentDetails / lastActivity
node scripts/import-2026-04-22-evening.cjs
```

Either path will update the 10 companies checked above.

---

## Sources

- [Monk — PRNewswire](https://www.prnewswire.com/news-releases/monk-raises-25m-series-a-to-automate-accounts-receivable-with-ai-302748872.html)
- [Monk — Axios Pro (Fintech Deals)](https://www.axios.com/pro/fintech-deals/2026/04/21/monk-25-million-startups-ai-accounts-receivable)
- [Monk — Fast AI Jobs careers](https://www.fastaijobs.com/companies/monk)
- [InsightFinder — TechCrunch](https://techcrunch.com/2026/04/16/insightfinder-raises-15m-to-help-companies-figure-out-where-ai-agents-go-wrong/)
- [InsightFinder — Tech Funding News](https://techfundingnews.com/insightfinder-funding-ai-reliability-platform-enterprise/)
- [Seapoint — TNW](https://thenextweb.com/news/seapoint-raises-e7-5m-and-opens-to-all-uk-and-irish-founders)
- [Seapoint — FinTech Global](https://fintech.global/2026/04/21/seapoint-raises-e7-5m-seed-to-build-founder-finance-hub/)
- [Seapoint — 13books Capital announcement](https://13bookscapital.com/seapoint-raises-e7-5m-seed-round/)
- [Zenskar — FinTech Global](https://fintech.global/2026/04/20/zenskar-raises-15m-series-a-for-agentic-b2b-finance/)
- [Zenskar — BusinessWire](https://www.businesswire.com/news/home/20260416872552/en/Zenskar-Raises-$15-Million-Series-A-to-Expand-Agentic-Capabilities-for-B2B-Revenue-Automation)
- [Wealth.com — press release](https://www.wealth.com/resources/press/wealth-com-raises-65-million-series-b-to-power-ai-future-of-wealth-management/)
- [Wealth.com — TechStartups](https://techstartups.com/2026/04/16/wealth-com-raises-65m-to-bring-ai-powered-estate-and-tax-planning-to-50000-financial-advisors/)
- [ScreenPoint Medical — Insight Partners](https://www.insightpartners.com/ideas/screenpoint-medical-secures-16m-to-lead-the-next-phase-of-ai-in-breast-cancer-care/)
- [Coral — TNW](https://thenextweb.com/news/coral-healthcare-ai-12-5m-series-a)
- [Coral — Z47](https://z47.com/en-us/news/z47-lightspeed-invest-12-5m-coral-healthcare-automation)
- [Trimontium Capital — With Intelligence 2026 emerging managers](https://www.withintelligence.com/insights/private-credit-emerging-managers-to-watch-in-2026/)
- [Joyful Health — Axios Pro (Health Tech Deals)](https://www.axios.com/pro/health-tech-deals/2026/04/16/joyful-raises-17m-ai-provider-claims-revenue-cycle-management)
- [Nas.com — PRNewswire](http://www.prnewswire.com/news-releases/nascom-raises-27m-series-a-led-by-khosla-ventures-as-ai-unleashes-the-biggest-wave-of-new-business-creation-in-history-302745035.html)
- [Shiprock Capital — Hedgeweek](https://www.hedgeweek.com/shiprock-plans-new-hedge-fund-launch-as-it-hires-ex-deutsche-bank-debt-trader/)
