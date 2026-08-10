# MarCRM Daily Scrape — 2026-08-05 (Wed)

**Scrape time:** ~07:05 EDT
**Total new leads (40+):** 6
**Pipelines hit:** pr-marketing (2), legal-freelance (2), pr-freelance (1), fund-formation (1)

New named leads were light today. Job boards surfaced few *fresh* (last-48h) freelance postings that clear the ICP filters, so this run leans on two solid funding-triggered agency leads plus the best standing freelance postings not already in the CRM. Quality over quantity.

---

## Top 5 hottest leads

| Company | Pipeline | Fit | Intent | Combined | Grade | Trigger |
|---|---|---|---|---|---|---|
| Balance Theory | pr-marketing | 43 | 41 | **84** | A | $19M Series A (Aug 1) + explicit GTM build |
| PsychPlus | legal-freelance | 30 | 40 | **70** | B | Fractional GC, $150-200/hr, remote |
| Radar | pr-marketing | 33 | 36 | **69** | B | $170M Series B at ~$1B valuation |
| Zy Media Group | pr-freelance | 30 | 30 | **60** | B/C | Contract Sr. Comms/PR advisor |
| Curiosity (Fund II) | fund-formation | 38 | 22 | **60** | C | €17M Fund II first close (EU) |

---

## New leads by pipeline

### pr-marketing
- **Balance Theory (A, 84)** — AI-native cybersecurity spend-management platform; $19M Series A led by SYN Ventures (DataTribe, TEDCO) closed ~Aug 1. Uses funds to accelerate GTM and market intelligence; manages $1B+ security spend, 300%+ customer ROI. Founders Greg Baker (CEO) and Dan Burns (Exec Chairman, ex-Optiv/Accuvant). Fresh raise + GTM = open narrative window. **Confirm domain + comms decision-maker.**
- **Radar (B, 69)** — Applied-AI company; $170M Series B at ~$1B valuation (Gideon Strategic Partners, Nimble Partners). Strong trigger but likely beyond boutique-agency ICP (in-house/large agency) → fit scored down on size/budget. Opportunistic only; aggregator-sourced, confirm details.

### legal-freelance
- **PsychPlus (B, 70)** — Mental-health/healthtech network hiring a **fractional GC**, 10-20 hrs/wk, **$150-200/hr, remote USA**. Not fund-focused so fit capped, but excellent engagement/remote/comp intent. Posted ~Jul 13 (not within 72h). Direct fractional-GC pitch on corporate/commercial/governance scope.
- **AltaML (C, 55)** — Applied-AI services firm hiring a **fractional Director of Legal**, 16-24 hrs/wk, hybrid Calgary. Corporate/commercial scope on-thesis; Canadian jurisdiction + hybrid lean and unstated comp lower fit. Deprioritize vs PsychPlus.

### pr-freelance
- **Zy Media Group (B/C, 60)** — Media/marketing firm hiring a **Senior Communications & PR Strategy Advisor** (contract, $60/hr+, remote, Baltimore). Clean PR/comms + contract engagement; sector isn't FS so sector-fit = 0. Best angle: white-label / overflow execution for the agency.

### fund-formation
- **Curiosity — Fund II (C, 60, watchlist)** — Amsterdam emerging manager; €17M first close on Fund II (target €30-40M), vertical applied AI, pre-seed/seed. EU jurisdiction and a completed first close mean counsel is likely already retained — window closing. Track for a US/US-LP vehicle or Fund III; low priority now.

---

## Signal refresh — existing hot leads

- **Bunkerhill Health** (pr-marketing, already in CRM as of 8/04; combined 70) — **Confirmed / reinforced.** $55M total via Series B **led by Khosla Ventures** (Sequoia, Felicis, Optum Ventures, Y Combinator), announced Jul 16; funds expand the Carebricks agentic-AI platform. Named partners now public: Cleveland Clinic, UT Medical Branch, Intermountain Health. **Score holds at 70 (Δ0).** ~3 weeks post-raise, the post-Series B narrative window is still open — **recommend outreach this week** before it cools. [Source](https://www.beckershospitalreview.com/healthcare-information-technology/innovation/bunkerhill-health-closes-55m-series-b-funding-for-agentic-ai-platform/)
- **aVenture** (legal-freelance; prior combined 65) — **Cooling.** No new funding or job-posting signal since 8/04; the VC-fund-attorney contract role appears filled or stale. **Δ0 but flag window closing** — drop from active watch unless a new req appears. [Source](https://aventure.vc/)
- **Tower Legal Solutions** (legal-freelance; prior 75) — **Steady.** ALSP/staffing bench, evergreen relationship rather than a dated trigger; keep as a standing channel, no delta.
- **Go Fractional** (appears in both pr-freelance 75 and legal-freelance 60) — **Steady.** Marketplace/bench; evergreen, no delta.

---

## Trends spotted

- **AI-native funding keeps driving the agency pipeline.** Both fresh pr-marketing leads (Balance Theory, Radar) are AI companies; the strongest triggers this week were Series A/B raises with explicit GTM/marketing spend intent.
- **Freelance boards were thin on fresh legal/PR fits.** Most last-48h fractional postings were finance/marketing-ops roles outside the legal/PR ICPs. The cleanest freelance fits (PsychPlus, AltaML, Zy Media) are 1-3 weeks old — still open, but not urgent.
- **Jurisdiction is the recurring fund-formation friction.** Emerging-manager launches surfacing this week are EU-based (Curiosity, Z_One) — off Mark's likely US thesis, and typically past the counsel-selection point once a first close is public.

## Most productive sources
- **BusinessWire / Pulse 2.0 / SecurityWeek** — best signal for funding-triggered agency leads (Balance Theory).
- **Fractional Jobs (fractionaljobs.io)** — richest board for named fractional legal roles (PsychPlus, AltaML).
- **Idealist** — surfaced the one clean contract PR/comms advisory role (Zy Media).

## Skipped leads (with reasons)
- **Cloud7Works — Senior Contracts Manager (remote USA)** — "Contracts Manager" reads as an ops/non-JD role; off Mark's attorney positioning. Suppressed.
- **Frive — Fractional GC (UK)** — already in CRM (legal-freelance 8/03). Dedup.
- **Go Fractional / Tower Legal / aVenture / Bunkerhill** — already in CRM; handled in signal-refresh, not re-imported.
- **Z_One (Zest/Eureka, €55M AI fund, Italy)** — EU jurisdiction, fund already launched; off-thesis for US fund-formation. Watch only.
- Numerous fractionaljobs.io CFO/CMO/CTO postings — outside all 8 ICPs.

## Next steps for Katie
1. **Run the import** — `node scripts/import-2026-08-05.cjs` (locally; Neon isn't reachable from the scrape sandbox). Dedups by company name.
2. **Prioritize Balance Theory (A/84)** for Mark — post-Series A narrative + earned-media sprint; find the marketing/comms DM and confirm the domain first.
3. **Act on Bunkerhill this week** — the post-Series B window is still open; it's already in the CRM, so update its notes/score rather than re-importing.
4. **Send PsychPlus a direct fractional-GC pitch** (strongest new freelance lead; clean remote + stated comp).
5. Confirm the blank websites/contacts flagged in the JSON before any outreach — left blank deliberately rather than guessed.
