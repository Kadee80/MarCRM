# MarCRM Daily Scrape — Friday, July 10, 2026

**Scrape time:** ~07:20 EDT
**New leads (40+):** 5
**Pipelines touched:** pr-marketing (4), pr-freelance (1)
**Deduplicated against:** 52 existing leads across the last week of daily / pr-freelance / legal-freelance reports.

> **Cycle note:** The strongest fresh triggers this Friday were funding rounds from the July 6–7 VC roundups. The already-scraped names from those roundups (Norm AI, Jump, Agave, EquiLibre, CarbonSix) were skipped as duplicates. Freelance-pipeline searches this cycle returned mostly evergreen agency/service pages and job-board aggregators rather than new dated postings — the deep freelance sweep continues in the dedicated pr-freelance / legal-freelance scrapes.

---

## Top 5 hottest new leads

| Company | Pipeline | Fit | Intent | Combined | Grade | Trigger |
|---|---|---|---|---|---|---|
| Arca | pr-marketing | 41 | 39 | **80** | A | Exited stealth w/ $64M (seed+A), Jul 8 |
| Taktile | pr-marketing | 47 | 29 | **76** | B | $110M Series C (Goldman-led) |
| Avaans Media (Fractional VP PR) | pr-freelance | 45 | 27 | **72** | B | Agency-overflow / fractional PR opening *(verify)* |
| LinqAlpha | pr-marketing | 40 | 28 | **68** | B | $22M Series A, agentic AI market intel |
| Bespoke Labs | pr-marketing | 39 | 28 | **67** | B | $40M Series A (Wing VC), AI infra |

---

## New leads by pipeline

### pr-marketing (4)

- **Arca — Grade A (80).** AI-native, advisor-led wealth management platform that exited stealth on July 8 announcing $64M across seed and Series A. Fresh stealth exit in the FS vertical is the highest-intent pr-marketing profile available this cycle; a newly-public company is more likely to need external PR than an entrenched incumbent. Pitch a launch/narrative sprint + earned-media push around the reveal.
- **Taktile — Grade B (76).** NY-based agentic AI decision platform for banks/insurers; closed a $110M Series C led by Goldman Sachs Alternatives. Outstanding fit (FS/insurtech, clear B2B motion, hard ROI metrics — $90M insurer savings, 95% underwriting automation), but a Goldman-led Series C likely already retains an agency, so intent is moderate. Angle: regulated-AI thought-leadership retainer.
- **LinqAlpha — Grade B (68).** $22M Series A for agentic AI in market intelligence. Lean, FS-adjacent B2B at a stage that usually lacks in-house comms. Pitch: post-Series A 90-day comms build.
- **Bespoke Labs — Grade B (67).** $40M Series A (Wing VC) for AI training/evaluation environments. Buzzy AI-infra category = earned-media window; weaker FS tie than the fintech leads. *(Evaluated for ai-consulting but rerouted — they sell AI, they don't buy AI adoption services.)*

### pr-freelance (1)

- **Avaans Media — Fractional B2B/Tech VP, PR — Grade B (72), LOW CONFIDENCE.** An agency listing a fractional VP-level PR role in B2B/tech — an agency-overflow / white-label opening that fits Mark's contract-execution lane. Surfaced from an agency page rather than a dated job board, so recency and whether the role is actively open are **unconfirmed** (posted-within-72h and urgency scored at/near 0 pending verification). Confirm the posting is live before outreach.

---

## Signal refresh — hot existing leads

- **Norm AI (pr-marketing, was 79 on 07-08) → est. ~85, Grade A. SIGNAL WINDOW OPEN.** Norm AI closed a **$120M Series C led by Khosla Ventures at a $1.2B valuation** (announced July 7). This is a major earned-media moment on top of the existing lead. Δ intent ≈ +6. Caveat: as a legal-AI company they may run comms in-house — but a fresh unicorn round is a strong narrative trigger worth a same-week touch. **Recommended action: reach out this week referencing the raise.**
- **Agave (pr-marketing, 68).** $15M Series A (Accel) confirmed in the July 7 roundup — same event already captured on 07-08. No new signal; stable.
- **Jump (pr-marketing, 64).** $80M Series B (Insight) — already captured 07-08. Stable.
- **EquiLibre Technologies (pr-marketing, 70).** Series A >$500M valuation — already captured. Stable.
- **Ontra (86), Latitude – Investment Funds Attorney (90), Ropes & Gray Funds (82), Nexscient (78).** No new public signal detected this cycle; these live in the freelance pipelines and are refreshed by the dedicated freelance scrapes. Continue to monitor Latitude/Ontra for application-window closure.

---

## Trends spotted

- **Vertical AI in regulated finance keeps drawing big rounds** (Taktile, Norm AI, Jump, LinqAlpha) — a steady pipeline of well-funded FS/insurtech companies that are exactly the agency's pr-marketing ICP. The recurring caveat is that Series B/C names usually already have agencies; the freshest, highest-intent PR need sits with seed/Series A and stealth-exit companies (Arca, LinqAlpha, Bespoke).
- **Stealth exits are the cleanest pr-marketing trigger** — Arca's reveal beat larger, later-stage rounds on intent because the launch moment creates immediate narrative need.

## Most productive sources

- **Tech Startups VC roundups (July 6 & 7)** — highest yield for funding-triggered pr-marketing leads.
- Freelance job-board searches (Indeed / ZipRecruiter / CareerBuilder) were low-yield today (evergreen aggregator pages, no fresh dated postings).

## Skipped leads & reasons

- **Norm AI, Jump, Agave, EquiLibre, CarbonSix** — already in CRM (scraped 07-08); the July 7 roundup restated the same rounds. Norm AI's *new* Series C handled under signal refresh.
- **Monogram** ($40M seed, consumer AI UI) — off-ICP: consumer-facing, weak B2B/FS fit (est. combined ~60). Skipped.
- **Even Realities, Proxima Fusion, Quaise Energy, Cyllene Therapeutics, Tripo AI, Zeroth, Yingzhi XBOT, Arkenstone Defense** — off-ICP (China consumer hardware, fusion/geothermal energy, biotech, robotics, defense/govtech). Not FS/tech B2B PR targets.

## Next steps for Katie

1. **Norm AI — act this week.** Reference the $120M Series C / unicorn valuation in outreach while the news is fresh. Bump the CRM record to Grade A.
2. **Arca — prioritize.** Identify the founder/comms decision-maker and pitch a stealth-exit launch/earned-media sprint.
3. **Verify Avaans Media** posting is live and dated before treating it as an active pr-freelance opportunity; if confirmed, it's a clean white-label fit for Mark.
4. Run the import script locally (below), then review Taktile / LinqAlpha / Bespoke for whether comms is already agency-covered before committing outreach time.

---

### Import

Run locally from the project root (the sandbox can't reach Neon):

```
node scripts/import-2026-07-10.cjs --dry-run   # preview
node scripts/import-2026-07-10.cjs             # insert missing leads
```

The script reads straight from `reports/daily-scrape-2026-07-10.json`, dedupes by company name (case-insensitive), and is safe to re-run. `npm run sync` also covers these rows idempotently.
