# Legal Freelance Scrape — 2026-07-21

**Scrape time:** Tuesday, July 21, 2026
**Pipeline:** `legal-freelance`
**Search window:** 7 days (2026-07-14 → 2026-07-21)
**Total new leads:** 2
**Grade distribution:** A ×1 · B ×1

---

## Read this first

Two new leads. That is a thin result, and the thinness is the finding rather than a gap in coverage.

All ten boolean clusters ran across LinkedIn (via indexed search), Indeed, CareerBuilder, ZipRecruiter, Go Fractional, Fractional Jobs, GoInhouse, Built In, ACC Jobline, and Robert Half. Search surfaced roughly a dozen apparently strong matches. Verifying each one removed ten of them:

**Three of the best-looking leads are closed postings.** Kindness for Capital (Fractional GC, venture capital), The Mom Project (Transactional Attorney, 1099, $175–200/hr, venture and PE financings), and LWD Advisors (Fractional Senior Legal Counsel, $200–300/hr) all ranked highly in search and all display "This Role is Closed" or "Job closed" on the live page. The Mom Project posting had an end date of April 2025; the LWD listing was added in February 2024. Search snippets give no indication these are dead.

**Three were already in the CRM, with identical source URLs.** GeneFab (captured 2026-06-08 and again 2026-06-16 — the June 8 entry has the exact same GoInhouse URL), Robert Half's Remote Part-Time Corporate & Securities Attorney (captured 2026-05-27 and 2026-07-07 — the July 7 entry has the identical Los Angeles URL), and LearnTastic (captured 2026-06-18). All three initially passed scoring this run and were caught only on a full-history dedup pass. Worth noting: the search snippet claimed the LearnTastic role was "posted July 18, 2026," but it has been in the CRM since June — **snippet-reported posting dates are not trustworthy**, which also undermines the recency component of the intent score whenever it rests on a snippet alone.

**Four more failed on other grounds.** Hayden Industrial LLC is the same posting as ACC Jobline #54004, already captured. Tower Legal Solutions and Epiq Counsel are previously captured companies. Allocate's Fund Formation Attorney — the best pure fund role found anywhere — is a full-time salaried W-2 position at $190–220K and fails the engagement-model test.

---

## Hottest leads

| Company | Fit | Intent | Combined | Grade | Key signal | Engagement | Subvertical |
|---|---|---|---|---|---|---|---|
| **Water Quality Association** | 30 | 50 | **80** | A | Posted 7/20, explicitly 24 hrs/wk, comp stated and credible | fractional | GC |
| **Bowery Legal (Interplay VC)** | 50 | 25 | **75** | B | Best practice-area match of the run — but posted as full-time salaried ⚠️ | contract | fund |

---

## Leads

### 1. Water Quality Association — Fractional General Counsel · Grade A (80)

**Background.** A not-for-profit trade association serving the residential, commercial, and industrial water treatment industry. It represents manufacturers, suppliers, and dealers, and operates a product certification and testing program. Hiring its own fractional GC at 24 hrs/week, hybrid out of Chicago, at $14.6K–$18.8K/month — roughly $150–$190/hr equivalent.

**Why it matters.** Textbook ICP shape: enough legal complexity to require judgment — member governance, certification program contracts and licensing, vendor and event paper, board and committee support, entity maintenance — and nowhere near enough volume to justify a full-time GC. It is also the only lead this run where engagement model, recency, and compensation all check out at once.

**Caveats.**

- No fund angle at all; the fit score of 30 is entirely corporate governance, seniority, and comp.
- **Hybrid Chicago is the real constraint.** If the on-site requirement is genuinely 2–3 days a week, it is a non-starter absent travel. Resolve this before anything else.
- 24 hrs/week is an anchor-client-sized commitment, not a side engagement — a portfolio decision rather than an easy add.
- Trade associations carry antitrust sensitivity around member conduct and standard-setting. If that is outside Katie's experience, say so and propose specialist counsel rather than absorbing it.
- The source URL is the Fractional Jobs board index, not a stable per-job permalink — the listing came through search and the direct job URL could not be isolated. Locate it on the board before applying.

**Pitch angle.** Governance-plus-contracts as a single package — board and committee support, certification program agreements, vendor and event contracts, entity housekeeping — with the fractional structure framed as GC-level judgment at roughly half the loaded cost of a full-time hire.

**Action.** Verify the on-site requirement, then apply.

**Source:** [Fractional Jobs — posted 2026-07-20](https://www.fractionaljobs.io/)

---

### 2. Bowery Legal (Interplay Venture Capital) — Investment Funds Attorney · Grade B (75)

> ⚠️ **Posted as a full-time salaried role at $200–250K.** It does not satisfy the ICP's engagement-model test. It is here as a relationship target, not an apply-now posting.

**Background.** A boutique corporate, transactional, and investment funds firm affiliated with Interplay Venture Capital. Attorneys trained at Latham, Gunderson Dettmer, Skadden, Mayer Brown, Greenberg Traurig, and Baker McKenzie. The firm's stated founding premise is that there is "a better (and more humane) way to practice law."

**Why it matters.** Highest fit score of the run — 50 out of 50. The scope reads almost as a description of the fund work in Katie's ICP: formation and structuring of VC, PE, real estate, and hedge funds, SPVs, co-invest vehicles, parallel funds, management companies and GPs; LPAs, PPMs, subscription documents, side letters, MFN matrices; Form D and Blue Sky filings; ongoing fund operations including capital calls, distributions, transfers, and secondaries.

Two details suggest an opening for a flexible pitch. The role has been **reposted**, meaning it has been hard to fill at that comp for that skillset. And the scope explicitly includes **training other Bowery attorneys on funds work and building playbooks and templates** — a knowledge-transfer mandate, which is precisely the kind of work that delivers well on a fractional or project basis.

There is also a strategic argument. Public job boards have not produced a qualifying freelance fund-formation posting in four consecutive runs. A standing relationship with a funds boutique that has continuous launch volume is plausibly worth more than any single posting this pipeline is likely to surface.

**Pitch angle.** Do not apply to the posting as written. Approach the funds partner directly with a scoped alternative: overflow capacity on live fund formations during launch crunches, plus a defined engagement to build the LPA/PPM/side-letter/MFN template set and train the associates. Frame it as standing up the funds capability now instead of waiting for the right full-time hire, with conversion available if volume justifies it. If they only want a full-time body, this becomes a network contact rather than a client.

**Action.** Identify the funds partner on LinkedIn; send a direct scoped-overflow note. Skip the Ashby application.

**Source:** [Built In NYC — reposted ~2026-07-11](https://www.builtinnyc.com/job/investment-funds-attorney/8041926)

---

## Near-misses worth knowing about

**Sigma7 — Fractional Corporate Legal Counsel.** Remote, $150–200/hr, 10–30 hrs/week, on Go Fractional. Genuinely strong fit and still showing as open, but posted ~20 days ago, outside the 7-day window. Excluded on the window rule rather than on merit — worth reaching back to if Katie wants it.

**OneRail — Fractional Commercial Counsel.** Remote, $145–185/hr, 10–15 hrs/week. Posted ~18 days ago. Same situation.

**Allocate — Fund Formation Attorney.** The best pure fund-formation role found anywhere in the search — fund formation, filings, regulatory compliance, governance. Excluded because it is full-time salaried W-2 at $190–220K.

**Excluded as closed (verified by fetching):** Kindness for Capital, The Mom Project, LWD Advisors.
**Excluded as already in CRM:** GeneFab, Robert Half (Remote Part-Time Corporate & Securities), LearnTastic, Hayden Industrial (= ACC Jobline #54004), Tower Legal Solutions, Epiq Counsel, Fractionus.
**Excluded on geography:** unybrands (UK, on-site), Basic-Fit (Netherlands), Deliveroo (Paris), Trainline (Edinburgh), Valeo Foods (London), Footasylum (Manchester).

---

## Market trends

**The fund-formation freelance market produced no qualifying posting again this week — the fourth consecutive run.** Every fund-specific role found (Allocate, Bowery Legal, the Glassdoor and Indeed fund formation listings) was structured as full-time salaried employment. The freelance and fractional fund work that exists appears to move through ALSP benches and personal networks rather than public postings. This is now a consistent pattern, not a slow week.

**Fractional legal hiring is concentrated in generalist GC coverage, not specialist fund work.** The fractional postings that did appear — Water Quality Association, LearnTastic, Hayden Industrial, PsychPlus, Battlement Systems — are all operating companies wanting broad GC coverage at 5–24 hours a week. The buyer is a company without a legal department, not a fund without fund counsel.

**Search-result decay is a serious data-quality problem for this pipeline.** Three high-ranking results this run were closed postings, one dated February 2024. Snippets carry no liveness signal and, as the LearnTastic case shows, their reported posting dates can be wrong outright. Fetching each page is not optional, and it consumed most of this run's effort.

**Duplicate leakage is a second data-quality problem.** Three leads passed scoring before a full-history dedup caught them, two with byte-identical source URLs to earlier captures. Checking only the most recent reports is insufficient — these postings persist on job boards for months and resurface in search continuously.

**The interim legal market is currently skewed to the UK and EU.** Of twelve legal roles on Go Fractional's legal board, seven were UK or EU-based interim positions at 30–40 hrs/week — a different product from the US fractional retainer model, and mostly on-site or hybrid.

**Rates are holding.** Where stated, US fractional counsel rates clustered at $145–$300/hour, consistent with prior runs.

---

## Recommended next steps

1. **Water Quality Association — resolve the on-site question, then apply.** Highest-scoring lead and the only one with no structural caveat. The Chicago hybrid requirement determines whether it is viable at all.
2. **Bowery Legal — direct outreach to the funds partner.** Do not use the application. The reposting plus the explicit template-building and training mandate is the opening; pitch scoped overflow and knowledge transfer.
3. **Raise the channel question with Mark.** Four consecutive runs have produced zero qualifying freelance fund-formation postings while consuming full scrape cycles. The highest-fit segment of Katie's ICP does not appear to transact on public job boards. Direct outreach to emerging managers, fund administrators, and boutique fund-formation firms — pitching overflow capacity rather than answering postings — is likely a better use of the same hours. This is a pipeline-strategy decision, not a scraping-tactics one.
4. **Consider two scrape adjustments.** (a) Run dedup against the full report history rather than recent files only — three leads leaked through this run on that basis alone. (b) Stop crediting recency from search snippets; award the 10-point recency bonus only when a posting date is confirmed on the live page.

---

*Scrape run 2026-07-21. All leads pipeline `legal-freelance`. Both leads scored 55+ on the 100-point model. Import script: `scripts/import-legal-freelance-2026-07-21.cjs`.*
