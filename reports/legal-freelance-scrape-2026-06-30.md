# Legal Freelance Pipeline Scrape — 2026-06-30

**Scrape time:** 2026-06-30 (automated run)
**Pipeline:** `legal-freelance`
**Total new leads:** 4 (all Grade B, combined 60)
**Window:** past 7 days · **Method:** Google/Bing-indexed web search (no direct LinkedIn scraping)

> **Dedup:** Checked against every June legal-freelance report (6/01–6/29), the pr-freelance reports, and daily-scrape outputs. All 4 are new postings. Latitude Legal appeared 6/29 for a *commercial-contracts* req (jobs/5073); this run captures a **distinct** Latitude *securities & corporate-governance* req (jobs/5077), tracked separately by its own URL and scope.
>
> **Scoring note:** Recency (<72h) was scored conservatively — board/ALSP listings got 0 on the 72h bucket unless freshness was confirmable, so combined scores are deliberately cautious. This run is corporate/commercial/securities-weighted; the fund-heavy buyers (Allocate, Ropes & Gray) were captured 6/29.

## Hottest leads

| # | Company / Role | Fit | Intent | Combined | Engagement | Subvertical | Key signal |
|---|----------------|-----|--------|----------|------------|-------------|------------|
| 1 | **LWD Advisors** — Fractional Corporate Legal Counsel | 20 | 40 | **60 (B)** | fractional | corporate | Virtual in-house legal dept staffing fractional corporate counsel for a book of **venture-backed startups** |
| 2 | **Latitude Legal** — Corporate Attorney, Securities & Corp Governance | 20 | 40 | **60 (B)** | contract | securities | **Securities + governance** contract engagement (ALSP, NewLaw-ranked) |
| 3 | **TheyDo** — Fractional Head of Legal (~3 days/wk) | 20 | 40 | **60 (B)** | fractional | GC | Defined **3-day/week** fractional GC at a venture-backed SaaS scale-up |
| 4 | **TodayTix Group** — Fractional General Counsel | 20 | 40 | **60 (B)** | fractional | GC | Fractional GC at an **established** events-tech operating company |

## Leads in detail

### 1. LWD Advisors — Fractional Corporate Legal Counsel (Remote) — *combined 60, B*

**Background.** LWD Advisors runs as a virtual "in-house" legal department for a portfolio of venture-backed startups, partnering with founders on solutions-oriented corporate support. This req brings on an experienced corporate attorney in a fractional capacity.

**Why it matters for Katie.** This is the strongest-fit lead of the run. LWD itself contracts fractional corporate attorneys and points them at a recurring book of venture-backed clients — exactly the part-time/interim model Katie targets, with deal flow (financings, governance, commercial paper) baked in rather than one-off.

**Pitch angle.** Position as a plug-in fractional corporate counsel for their startup portfolio — venture financings, cap-table/SAFE work, governance, and commercial contracts. Confirm whether the bench is 1099/independent-operator vs. W-2.

**Source:** https://www.fractionaljobs.io/jobs/senior-legal-counsel-at-lwd-advisors

---

### 2. Latitude Legal — Corporate Attorney, Securities & Corporate Governance (Remote Contract Engagement) — *combined 60, B*

**Background.** Latitude is a Chambers NewLaw-ranked ALSP (~20 U.S. offices) placing former in-house and Big Law attorneys into flexible contract engagements. This req is a securities + corporate-governance engagement for a client company.

**Why it matters for Katie.** Distinct from the 6/29 Latitude commercial-contracts posting — this one is securities/governance, the higher-fit slice for Katie's securities and funds-adjacent expertise. One Latitude relationship can unlock multiple placements over time, and a securities req is the better foot-in-the-door.

**Pitch angle.** Apply to the securities/governance engagement and use it to get onto Latitude's bench for fund/securities/corporate placements. Track contract type carefully: ALSP placements often run as temp/contract W-2 — confirm 1099/independent terms.

**Source:** https://latitudelegal.com/jobs/5077

---

### 3. TheyDo — Fractional Head of Legal (Remote, ~3 days/week) — *combined 60, B*

**Background.** TheyDo is a B2B SaaS company (journey-management software for enterprise product/CX teams). The role is a fractional Head of Legal at roughly 3 days/week — commercial contracts, corporate governance, privacy, and GC function for a venture-backed scale-up.

**Why it matters for Katie.** A clean fractional GC engagement with a defined cadence — the part-time model Katie wants, at a fast-scaling SaaS org with real enterprise contract volume.

**Pitch angle.** Lead with enterprise commercial-contracts throughput (SaaS/vendor/customer paper) plus a governance build-out for a scaling product company. Operating-company buyer, no fund work.

**Source:** https://www.gofractional.com/job/ashbyhq-fractional-head-of-legal-3-days-per-week-theydo-jobs

---

### 4. TodayTix Group — Fractional General Counsel (Remote) — *combined 60, B*

**Background.** TodayTix Group is a live-events / theatre ticketing technology company (consumer marketplace + B2B ticketing tech). This is a fractional GC engagement covering commercial contracts, governance, and compliance for an established operating company.

**Why it matters for Katie.** A more mature buyer than a seed startup — likely steadier commercial-contracts and vendor/partner-paper volume, and a recognizable brand for the CRM. Fractional GC fits the part-time ICP.

**Pitch angle.** Fractional GC covering commercial contracts + governance + compliance for a high-transaction-volume marketplace. Confirm remote vs. NYC-hybrid expectation before pitching.

**Source:** https://www.builtinnyc.com/job/fractional-general-counsel/4832569

## Market trends (this run)

- **Fractional GC remains the dominant on-ICP format.** Three of four leads are explicit fractional/part-time GC or counsel engagements; the fourth is an ALSP contract engagement. Demand for sub-full-time senior counsel continues to be the structural tailwind for Katie's positioning.
- **Buyers split between operating companies and ALSPs/virtual legal depts.** LWD (virtual legal dept) and Latitude (ALSP) are *bench plays* — one relationship, recurring placements. TheyDo and TodayTix are *direct operating-company* engagements. Both routes are worth running in parallel.
- **Fund-specific reqs were thin this week.** No explicit fund-formation posting cleared the dedup filter (the fund-heavy buyers landed 6/29). This run skews corporate/commercial/securities — still core ICP, but worth re-weighting fund clusters next run.
- **Comp opacity persists.** None of the four postings stated compensation, capping fit scores at 20 (lost the +10 comp-credible point across the board). Consistent with the broader pattern in recent runs.

## Recommended next steps

1. **Prioritize LWD Advisors and Latitude (securities req)** — both are bench/relationship plays that compound into recurring work. Request intros this week.
2. **Run the two operating-company fractional GCs (TheyDo, TodayTix) as direct applications** — defined cadence (TheyDo) and brand value (TodayTix).
3. **Confirm engagement structure on the ALSP leads** (1099/independent vs. temp W-2) before investing pitch time — `employmentTypeRaw` vs. `engagementModel` tracked separately in the data.
4. **Re-weight fund-formation clusters next run** to rebalance after a corporate-heavy week.
5. **Import:** run `node scripts/import-legal-freelance-2026-06-30.cjs` locally (Neon isn't reachable from the sandbox).
