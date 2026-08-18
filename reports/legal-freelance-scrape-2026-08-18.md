# Legal Freelance Scrape — 2026-08-18

**Pipeline:** `legal-freelance`
**Scrape window:** 7 days (Aug 11 – Aug 18, 2026)
**Scrape run:** Tuesday, August 18, 2026
**New leads captured:** 3 (+1 flagged watch item on an existing CRM company)
**Dedup baseline:** 453 company names from prior `legal-freelance-*`, `pr-freelance-*` and `daily-scrape-*` reports

---

## Summary

A thin cycle for US-remote fund and corporate freelance counsel, and worth being direct about why rather than padding the list.

All ten boolean clusters were run across Go Fractional, Fractional Jobs, Built In, Legal.io, ACC Jobline, GoInhouse, and the ZipRecruiter / Indeed / CareerBuilder aggregators, plus Google-indexed LinkedIn results. LinkedIn was not bot-scraped. Two structural problems shaped the yield:

1. **The aggregators returned index pages, not reqs.** Nearly every ZipRecruiter, Indeed and Glassdoor result for the fund-formation and fractional-counsel clusters resolved to a salary-benchmark or category page with no dated posting behind it.
2. **The fractional boards were active but geographically unusable.** Go Fractional and Fractional Jobs both posted fresh legal roles inside the window — they just weren't workable from New York. Three were scored and dropped on geography alone, not fit:

| Dropped | Posted | Why dropped |
|---|---|---|
| Keyloop — Interim Head of Legal | Aug 13 | Reading, UK — hybrid on-site, $115–245/hr |
| Norven — Fractional GC / Head of Legal | Aug 17 | Remote **UK only**, 8–16 hrs/wk |
| Visier — Fractional Corporate Counsel | Aug 17 | Remote **Canada only**, 10–20 hrs/wk |

The cycle is carried by one genuinely strong find: **Scissero**, an AI-native ALSP built specifically for private equity, capital markets and fund documentation, scaling its US bench and announcing a Mayer Brown partnership on Aug 11 — inside the window.

---

## Hottest leads

| Company | Fit | Intent | Combined | Grade | Key signal | Engagement | Subvertical |
|---|---|---|---|---|---|---|---|
| **Scissero** | 40 | 50 | **90** | **A** | ALSP for PE/capital markets scaling US delivery bench; live 12-mo secondment to a global alternative asset manager; Mayer Brown tie-up Aug 11 | contract | fund |
| Applied Intuition | 20 | 50 | 70 | B | Live interim counsel req, $150–275/hr, posted Aug 17 | interim | contracts |
| Emergence Software | 30 | 35 | 65 | B | Holdco standing up legal across portfolio cos., reposted within 24h | fractional | corporate |

---

## Lead detail

### 1. Scissero — Grade A (90)

**What they are.** An AI-enhanced legal services company and operating platform purpose-built for financial institutions, specifically private equity and capital markets. Founded 2018, 152 people across the US, EMEA and APAC, with New York and London offices. They pair lawyers with a proprietary AI platform to scale the drafting, negotiation and management of *transactional and fund-related documents* for global investment firms, asset managers and corporates. They run a Legal Managed Services team that places lawyers into client secondments.

**Why it matters for Katie.** This is the only new company this cycle that hits the fund/PE core of the ICP rather than orbiting it. Their preferred-experience line is literally "private equity, asset management, hedge fund, or other alternative asset manager clients." And on Aug 11 they announced a strategic partnership with Mayer Brown for an integrated structured-products issuance solution — a capacity-expansion signal that will require senior US-side transactional bandwidth.

**Two live doors:**

- **Principal Legal Lead** — U.S. Remote, 9am–6pm US hours. Expert/Leader level. Owns legal delivery *and* the client relationship for a portfolio of global investment firms and asset managers across live PE, M&A and financing transactions. Supervises Junior/Senior Legal Specialists, runs QBRs, acts as senior escalation point. Reposted Aug 17, flagged "Be an Early Applicant." → https://scissero.teamtailor.com/jobs/8033276-principal-legal-lead
- **Legal Specialist (New York — On Site Client Secondment)** — a planned **~12-month secondment into a leading global alternative asset manager**, following an onboarding period inside Scissero's Managed Services team. → https://scissero.teamtailor.com/jobs/8126249-legal-specialist-new-york-on-site-client-secondment

**Pitch angle.** Not the Specialist tier — that's 1–3 years' PQE doing NDA-playbook review, well below Katie's level. The Principal req is the target: it wants senior judgement plus client-facing account ownership on PE/M&A/financing paper. Position her as senior overflow and secondment counsel who can carry the *fund documentation* their current bench visibly cannot — LPAs, side letters, subscription documents, GP/management company agreements. Scissero sells managed services and secondments, which is precisely the commercial shape Katie sells; the FT framing on the req is a packaging detail, not a constraint.

**Action:** apply directly on Teamtailor this week while the early-applicant flag is live.

**Source:** https://builtin.com/job/principal-legal-lead/10313789

---

### 2. Applied Intuition — Grade B (70)

**What they are.** A late-stage venture-backed autonomy and vehicle-software company serving automotive, defense and industrial customers, sourcing an interim counsel engagement through Go Fractional rather than adding headcount.

**The req.** Interim Employment Counsel — Sunnyvale, CA, hybrid, $150–275/hr, 30–40 hrs/week, posted Aug 17.

**Honest read.** The fit half of the score is weak (20/50). The practice area is employment, not Katie's corporate/funds core, and Sunnyvale hybrid is a poor geographic match from New York. It clears the threshold entirely on intent: real, live, well-paid, posted within 72 hours, direct apply path.

**Pitch angle.** Not the posted role. The useful signal is behavioural — Applied Intuition buys senior legal capacity on an *interim* basis through a fractional marketplace rather than converting it to headcount. That makes them a warm target for a commercial-contracts or corporate-governance interim scope later. Log it, check whether the same hiring manager owns broader legal bench decisions, and don't let it outrank Scissero or the Tower Legal req below.

**Source:** https://www.gofractional.com/job/welcometothejungle-applied-intuition-employment-counsel-welcome-to-the-jungle-login

---

### 3. Emergence Software — Grade B (65)

**What they are.** A holding company across professional services, software and financial services, standing up a day-to-day legal function spanning its portfolio companies: contract intake and triage, template management, outside-counsel coordination, routine commercial contract negotiation, entity governance, and post-acquisition legal integration.

**The req.** Director of Legal — Remote (United States), $275,000–$375,000, reposted within the last 24 hours.

**Honest read.** Posted as a permanent FTE, which zeroes the engagement-model component of the intent score. `engagementModel` is recorded as `fractional` because that's the shape Katie would pitch; `employmentTypeRaw` preserves the FT framing.

**Pitch angle.** This is the textbook fractional-GC profile from the ICP — a holdco with portfolio companies, no existing legal bench, and a workload that is lumpy rather than continuous. A repost signals the FT search isn't closing fast. Approach: a short note to the hiring principal offering to stand up the same function on a fractional basis in 60–90 days at a fraction of the $275–375K load, with an option to convert. Watch for a second repost in September — that's when the fractional pitch lands hardest.

**Source:** https://builtin.com/job/director-legal/10303448

---

## Watch item — repeat company, new live req

**Tower Legal Solutions — Contract Staff Attorney, Private Funds (Remote, NY-barred)**

Not counted in the lead total and excluded from the import script, because Tower Legal Solutions is already in the CRM from a prior cycle and the importer dedupes by company name. But this is the **single closest match to Katie's actual practice found anywhere this cycle**, so it should not be lost to a dedup rule:

- Temporary staff attorney supporting a top law firm's corporate **private funds** practice group
- Drafting and negotiating **fund side letter agreements**, **feeder fund formation documents**, and fund operations paper
- **Remote**, NY bar admission required
- **$80–120/hr** depending on experience

On the scoring model this would grade A (fit 50 / intent 40 / combined 90) — fund focus, corporate practice, counsel-level, credible published rate, remote, hourly contract engagement. The only deduction is recency: the req appears to have been live since roughly June and may be a rolling bench posting rather than a fresh need.

**Action:** confirm it's still open before investing time. If Katie is not already on Tower's bench for private funds specifically, this is the fastest path to billable fund-formation work in the pipeline right now.

**Source:** https://www.linkedin.com/jobs/view/contract-staff-attorney-for-top-law-firm-private-funds-experiece-remote-ny-barred-at-tower-legal-solutions-4421973498

---

## Market trends

**1. The fractional legal market is internationalising faster than it is deepening in the US.** Three of the five fresh fractional/interim legal reqs this week were UK or Canada only. Go Fractional's legal board carried 17 roles; the majority were London, Reading, Alberta, Sydney or Singapore. US-remote fractional *counsel* supply is not growing at the rate the category's marketing implies.

**2. Rates are holding at the top end.** Where published: $150–275/hr (Applied Intuition, interim), $320–440/hr (Frive, fractional GC), $300–400/hr (AltaML), $200–300/hr (Ascenda Loyalty), $80–120/hr (Tower Legal, staffing-model contract). The spread between a direct fractional engagement and a staffing-agency contract placement remains roughly 2–3x. Worth remembering when Katie is deciding where to spend enrollment effort — the agency benches convert faster but price materially lower.

**3. ALSPs are the growth channel, not the job boards.** The one genuinely high-fit find this cycle came from an ALSP scaling its bench, not from a company posting a freelance req. Scissero, Ontra (captured Aug 14), Priori, Paragon, Epiq Counsel, Tower — the recurring pattern is that fund and PE freelance work reaches individual lawyers *through* an intermediary rather than directly. Direct-to-company fund-formation freelance reqs remain rare on the open web.

**4. Law-firm/legal-tech partnerships are creating new capacity demand.** The Scissero–Mayer Brown structured-products tie-up (Aug 11) is the second such arrangement this quarter. These partnerships generate senior transactional overflow before they generate headcount — a reliable leading indicator worth tracking as a standing search cluster.

**5. The "fractional GC" label is being used for permanent hires.** Several reqs surfaced this cycle used fractional/interim language in marketing copy while posting permanent FTE roles (Emergence Software is the clean example). Continuing to track `employmentTypeRaw` separately from `engagementModel` is earning its keep — without it, roughly a third of this cycle's finds would have been miscategorised.

---

## Recommended next steps

1. **Apply to Scissero's Principal Legal Lead this week** while the early-applicant window is open. Lead with fund documentation depth (LPAs, side letters, subscription docs), not NDA volume.
2. **Verify the Tower Legal private-funds req is live**, and if so get on that bench — fastest available path to billable fund work, even at agency rates.
3. **Send the Emergence Software fractional-GC note.** Low cost, and the repost suggests the FT search is stalling.
4. **Add a standing search cluster for ALSP / law-firm partnership announcements** ("ALSP partnership", "legal managed services", "secondment" + fund/PE terms). This cycle's best lead came from a partnership announcement, not a job board.
5. **Reconsider the geographic filter for the fractional boards.** Three usable-on-fit roles were dropped on geography this week. If Katie would consider UK-hours remote work, the effective supply roughly doubles — worth a decision so future cycles score consistently.
6. **Deprioritise the aggregator clusters (ZipRecruiter / Indeed / CareerBuilder).** Four cycles running, they have produced index pages rather than dated reqs. The yield is coming from Go Fractional, Fractional Jobs, Built In and ALSP career sites.

---

## Files

- Report JSON: `reports/legal-freelance-scrape-2026-08-18.json`
- Import script: `scripts/import-legal-freelance-2026-08-18.cjs`

Run the import locally (Neon is not reachable from the scrape sandbox):

```bash
node scripts/import-legal-freelance-2026-08-18.cjs
```
