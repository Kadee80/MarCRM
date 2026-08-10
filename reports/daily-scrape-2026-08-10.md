# MarCRM Daily Scrape — 2026-08-10 (Monday)

**Scrape time:** ~07:55 ET
**Total new leads:** 3 (all Grade A, all scoring 80+)
**Signal refreshes:** 3 hot existing leads

New-lead discovery this run leaned on FinTech Global's week-in-review (15 deals, week ending 2026-08-07) with per-company verification. All three new leads are fresh **funding-event** triggers routed to `pr-marketing` per Mark's rule (business events → pr-marketing, never job-board hiring). Two evergreen bench candidates surfaced (a legal funds bench and a PR comms bench) but were dropped as duplicates already in the pipeline. Freelance job-board discovery otherwise returned only aggregators; thin/unverifiable postings were suppressed rather than padded.

---

## Top Hottest Leads

| Company | Pipeline | Fit | Intent | Combined | Trigger |
|---|---|---:|---:|---:|---|
| Ambrook | pr-marketing | 48 | 35 | **83 (A)** | $30M Series B (Lachy Groom) — 8k+ customers, real-economy fintech |
| Faye | pr-marketing | 46 | 35 | **81 (A)** | $50M Series C (Madrona) — insurtech, doubling total funding to ~$100M |
| Naïve | pr-marketing | 45 | 35 | **80 (A)** | $28.5M Series A (Nexus) — "infra for autonomous companies," 30k devs |

---

## New Leads by Pipeline

### pr-marketing (3)

**Ambrook — $30M Series B (A, 83).** AI-native accounting/payments/cash-management for independent "real economy" businesses (agriculture, trucking, construction, property). Led by Lachy Groom; Thomson Reuters Ventures, Thrive Capital, Field Ventures, Cameron Ventures; angels from Notion, Gusto, Vercel. Customers grew ~2,500 → 8,000+ across all 50 states; total raised now $59M. Distinctive, media-friendly "QuickBooks-killer for farms" story with a strong investor/angel earned-media hook. Pitch a retainer around category thought leadership plus vertical-expansion announcements. Website ambrook.com best-effort.

**Faye — $50M Series C (A, 81).** AI travel insurance with near-instant automated claims. Led by Madrona; BRM plus existing Portage, F2, Viola, Lumir. Doubles total funding to ~$100M since 2022. Capital targets geographic expansion and airline/cruise/OTA distribution deals — a steady cadence of partnership press moments ahead. Core buyer is consumer (B2B sub-score trimmed to 8) but distribution partnerships are retainer-friendly. Pitch launch/partnership comms + exec thought leadership on AI claims. HQ: Henrico County (Richmond), VA.

**Naïve — $28.5M Series A (A, 80).** Unified API (formation, payments, comms, compute) letting AI agents incorporate and run real businesses. Led by Nexus Venture Partners; YC, Zetta, Liquid 2, and heavyweight angels (Gokul Rajaram, Tim Zheng/Apollo, JD Sherman/ex-HubSpot, Robert Chatwani/Docusign). 30k+ developer customers, ARR up ~10x in six months. TechCrunch coverage already landed. Off-core-FS (AI infra) so industry sub-score reduced to 8; routed to pr-marketing because the trigger is a funding event, not a job posting. Plausible ai-consulting cross-sell later. Palo Alto; website naive.dev best-effort.

---

## Signal Refresh — Hot Existing Leads

**Provable Markets (pr-marketing) — window OPEN, intent ↑.** Confirmed Series B led by Charles Schwab with DTCC joining (announced 2026-07-29). Round funds growth of commercial, product and engineering headcount; team was ~18 as of early 2026, so this is a scaling moment. Schwab + DTCC is a rare, credibility-sensitive, PR-rich event. Intent nudges up (~36 → ~38) on confirmed hiring/growth signal; combined ~86. **Recommended action: outreach now — raise is ~10 days old and the narrative window is wide open.**

**Balance Theory (pr-marketing / cyber) — fresh, post-conference momentum.** $19M Series A led by SYN Ventures (2026-07-31); DataTribe and TEDCO participated. Dan Burns (Accuvant founder, ex-Optiv CEO) joined as executive chairman — a marquee, quotable spokesperson. Platform manages $1B+ in cyber spend. Company was at **Black Hat USA Aug 4–6** — immediate earned-media window off conference visibility. **Recommended action: reach out this week while post-Black Hat momentum is live; lead with the Dan Burns exec-narrative angle.**

**PsychPlus (coaching-ops / media) — window CLOSING.** Acquired Koa Health on 2026-06-24 to form the largest tech-enabled mental-health company (~629 employees). The acquisition press moment is now ~7 weeks old and cooling. Company scale (629 emp) is at the upper edge of the nimble-agency sweet spot. **Flag: acquisition-news window largely closed — deprioritize unless a fresh trigger (funding, launch, exec hire) surfaces.**

*Radar:* no fresh signal found this pass — continue monitoring.

---

## Trends Spotted

- **AI-native narrative is the dominant funding hook.** Ambrook, Faye and Naïve all raised on "autonomous / AI-native" positioning — earned-media angles that reward category-defining thought leadership, Mark's strength.
- **Insurtech + fintech distribution deals** (Faye) create recurring partnership press moments — good retainer fuel beyond the launch spike.
- **Freelance job boards stay dry; benches are saturated.** Job boards produced only aggregators again, and the two sector-matched benches this run (Ropes & Gray funds, Chameleon comms) were already captured — the freelance pipeline is well-covered, so effort is better spent on the fresh funding leads.

## Most Productive Sources

1. **FinTech Global weekly funding roundup** — highest-signal source for pr-marketing business-event leads (Ambrook, Faye).
2. **TechCrunch / FinSMEs / Dealroom** — verification + Naïve.
3. **BusinessWire / Skift / Morning Ag Clips** — per-company confirmation and investor detail.

## Skipped / Dropped Leads (with reasons)

- **Ropes & Gray funds bench (legal-freelance) & Chameleon Collective comms bench (pr-freelance):** both evergreen, sector-matched benches — but **already captured** in prior reports (Chameleon 2026-07-31 Grade A; Ropes & Gray early June). Dropped as duplicates, not re-added.
- **Atlas Road Advisors — Contract Attorney (remote, 4+ yrs):** practice area unspecified; can't confirm fund/corporate fit or freshness. Suppressed.
- **Broadway & Elmer, LLC — remote attorneys (1–6 yrs):** junior band + mixed practice (incl. employment); thin, unverified. Suppressed.
- **Moss (Series C unicorn), Decade (Brazil), Moment (pan-African), Yellow Card (Africa), 10x Banking (UK), OLIGO Security (likely Israel):** non-US or outside ICP geography/stage. Suppressed.
- **Obsidian Security ($85M Series D), Horizon3 ($250M Series E):** later-stage/large; security-not-fintech core; below pr-marketing sweet spot for a fresh retainer pitch.
- **Generic PR/fractional aggregator pages (FlexJobs, ZipRecruiter, Upwork, Working Nomads):** platform listings, not named buyers. Suppressed.

## Next Steps for Katie

1. Run the import locally: `node scripts/import-2026-08-10.cjs` (needs `DATABASE_URL` — Neon isn't reachable from the sandbox).
2. **Priority outreach this week:** Provable Markets (window open) and Balance Theory (post-Black Hat momentum).
3. Move fast on the three fresh raises (Ambrook, Faye, Naïve) while the funding news is hot.
4. Verify the three best-effort websites (ambrook.com, withfaye.com, naive.dev) before outbound.
