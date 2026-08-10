# MarCRM Daily Scrape — 2026-06-12 (Friday)

**Scrape time:** 11:03 UTC
**Total new leads:** 5 (1 A-grade after signal refresh, 3 B, 2 C)
**Window:** New discovery June 10–12; signal refresh on hot leads from 06-08 → 06-11 reports.

> Note: Fresh, good-fit *new* leads were thin today. The big June 11 funding events were mostly mega-rounds (Prometheus $12B, NEURA Robotics $1.4B, Standard Bots $200M) — companies too large or too in-house-comms-heavy for a boutique agency pitch. The standout development is a **signal refresh**: Standard Bots, already in the CRM, raised a $200M Series C and jumped from D to A.

---

## Top 5 Hottest Leads

| Company | Pipeline | Fit | Intent | Combined | Trigger |
|---|---|---:|---:|---:|---|
| Standard Bots *(refresh)* | pr-marketing | 40 | 40 | **80 (A)** | $200M Series C (Jun 11) — up from D |
| Forage | pr-marketing | 44 | 33 | **77 (B)** | $40M Series B + consumer app launch |
| THEKER | pr-marketing | 36 | 30 | **66 (B)** | €73M Series A (largest EU robotics A) |
| PagerDuty — Interim Dir. Comms | pr-freelance | 35 | 30 | **65 (B)** | Interim comms during CEO transition *(verify)* |
| Digital Asset | pr-marketing | 32 | 26 | **58 (C)** | $355M late-stage round |

---

## New Leads by Pipeline

### pr-marketing

**Forage — 77 (B).** SF fintech, SNAP/EBT payments infrastructure. Closed a $40M Series B (Jun 3-4, Mouro Capital / Nyca / PayPal Ventures / Intuit Ventures) and launched a consumer EBT-rewards app (100k+ downloads), targeting 1M low-income families by year-end. Mission-driven, earned-media-friendly narrative. *Caveat:* already running its own PR Newswire distribution — confirm whether they have incumbent comms before pitching retainer vs. project.

**THEKER — 66 (B).** Barcelona AI-native industrial robotics. €73M/$85M Series A (Jun 11, CRV + Samsung + LVMH) — billed as Europe's largest robotics Series A, with marquee first-time backers driving heavy press. *Caveat:* EU-based, so lower practical fit for a US agency unless the angle is US-market entry / US tech-press positioning.

**Digital Asset — 58 (C).** NYC blockchain / capital-markets infrastructure (Canton Network). $355M late-stage round (Jun 11), 70+ investors. Established since 2014 — almost certainly has mature in-house comms and an incumbent agency. Logged for completeness; not a priority.

### pr-freelance

**PagerDuty — Interim Director of Communications — 65 (B). ⚠️ VERIFY.** A 6-month interim-comms contract surfaced via the Go Fractional job board. Plausible context: PagerDuty announced a CEO transition (John DiLullo in, Jennifer Tejada to Executive Chair) effective May 11 — a textbook interim-comms-during-leadership-change scenario. The live posting could **not** be independently confirmed (direct search returned only SEC filings), so validate before any outreach.

### legal-freelance

**Stealth Startup — Fractional Legal Counsel — 58 (C).** Active fractional/remote counsel posting on the Fractional Jobs board. Corporate/commercial GC scope (not fund-specific, which caps fit), but a clean engagement-model match (fractional + remote). Stealth = limited detail on practice area and comp. Worth a direct application.

*No new qualifying leads today in fund-formation, legal-consulting, coaching-ops, media, or ai-consulting. Note: AI vendors raising rounds (Unframe, Wonderful) route to pr-marketing, not ai-consulting — and both were >3 weeks old, outside the window.*

---

## Signal Refresh — Hot Existing Leads

**Standard Bots — D → A (combined 59 → 80, +21). 🔥 Window open now.**
Added to the CRM 06-10 as a low-priority D. On June 11 it announced a **$200M Series C**. Fresh capital + scaling phase = prime agency-pitch window. **Action: prioritize outreach this week while the raise is still news** — pitch a launch/awareness sprint tied to the Series C.

**Capsa AI — 82, no change.** $18M Series A (Jun 10) already captured when added 06-11. Proceed with planned outreach.

**Vinyl Equity — 81, no change.** $20M Series A (Jun 9-10) already captured. Monitor.

**SyntheticFi — 78, no change.** $13M raise + $2B AUM milestone (Jun 10) already captured. Monitor.

*No closing windows flagged beyond Standard Bots (act now) — the other top leads were all added within the last 1-2 days and remain fresh.*

---

## Trends Spotted

- **Mega-round week, thin agency fit.** June 11 was dominated by $200M+ rounds in AI/robotics/industrial. Great for headlines, weak for boutique-agency targeting — the sweet spot ($5-25k/mo, growth-stage) is in the smaller fintech raises (Forage, Vinyl, SyntheticFi, Capsa).
- **Fintech infrastructure keeps clustering.** Forage, Vinyl Equity, SyntheticFi, Capsa AI — capital-markets / payments / wealth-tech infrastructure is the most reliable pr-marketing vein right now.
- **Leadership-transition interim comms** is a recurring pr-freelance signal (PagerDuty CEO change) — worth a dedicated search thread.

## Most Productive Sources

- fintech.global / FinSMEs / PR Newswire — best for clean, agency-fit fintech raises.
- Tech Startups daily VC roundup — good coverage of the June 11 mega-rounds (used mainly to *de*-prioritize).
- Go Fractional / Fractional Jobs — surfaced both freelance leads.

## Skipped Leads (with reasons)

- **Prometheus ($12B, Jun 11)**, **NEURA Robotics ($1.4B, Jun 11)** — mega-cap, in-house comms, no agency fit.
- **Unframe ($50M Series B AI)**, **Wonderful ($150M)** — outside the 24-48h window (May 19 / March) and already past the fresh-trigger moment.
- **Forage scored conservatively** on intent (existing PR Newswire activity suggests incumbent comms).

## Next Steps for Katie

1. **Standard Bots — act this week.** Highest-leverage item: a known lead just became an A on a $200M raise. Get Mark a pitch angle while it's news.
2. **Forage** — quick check on whether they have incumbent PR; if not, strong fintech target.
3. **Verify the PagerDuty interim-comms posting** before logging it as actionable — confirm it's live and the contact path.
4. Run the import script below locally to load the 5 new leads into Neon (signal-refresh deltas are in the JSON for reference; Standard Bots already exists and will be skipped by the dedup — update its score manually or via the pipeline UI).
