# Freelance search rules

Referenced by the `marcrm-scrape` task prompt. Edit this file to change how freelance roles
are found and qualified — no need to touch the scheduled task itself.

Source: Mark's ICP document, 2026-05-06.

---

## 1. The 4-bucket qualification taxonomy

Job boards label freelance work inconsistently. **Do not filter on the word "consulting."**
The single biggest cause of missed roles is searching only for consultants.

| Bucket | Terms |
|---|---|
| **A — Explicit freelance** | freelance, contract, contractor, 1099, project-based, hourly |
| **B — Fractional / interim** | fractional, interim, temporary, part-time, secondment, fixed-term, maternity cover |
| **C — Consultant labels** | consultant, advisor, strategist, outside counsel |
| **D — Embedded labels** | overflow, surge, bench, on-demand, white-label, outsourced, managed services, agency partner |

**Qualification rule:** a posting qualifies if it carries terms from **at least two buckets**
plus a practice-area term (a legal practice area, or a comms discipline).

---

## 2. Legal freelance

**ICP.** Contract, fractional and interim fund & corporate counsel.

**Best-fit employers:** PE and VC funds, especially emerging managers · fund portfolio
companies · law firms needing overflow capacity · ALSPs (alternative legal service providers) ·
late-stage private companies standing up or scaling a legal function.

**Workstreams:** fund formation · LP/GP documents · corporate governance · commercial
contracts · M&A · fractional GC.

**19 title variants** — search all of them, not just "lawyer":

Fractional General Counsel · Fractional GC · Interim General Counsel · Interim Head of Legal ·
Interim Legal Director · Contract Corporate Counsel · Fund Counsel · Fund Formation Counsel ·
Investment Funds Counsel · Corporate Counsel (contract) · Commercial Counsel (contract) ·
Legal Consultant · Outside General Counsel · Part-time General Counsel · Contract Attorney
(corporate/funds) · Secondment Counsel · Legal Specialist · Principal Legal Lead · Head of
Legal (fixed-term)

**Ten boolean clusters** — run each against every source in §4:

1. `("fractional" OR "interim") AND ("general counsel" OR "head of legal")`
2. `("contract" OR "freelance") AND ("corporate counsel" OR "commercial counsel")`
3. `"fund formation" AND ("counsel" OR "attorney" OR "consultant")`
4. `("LPA" OR "limited partnership agreement" OR "side letter" OR "subscription documents") AND counsel`
5. `("emerging manager" OR "Fund I" OR "first-time fund") AND (counsel OR legal)`
6. `("private equity" OR "venture capital" OR "hedge fund") AND ("interim" OR "secondment") AND counsel`
7. `("ALSP" OR "managed legal services" OR "legal overflow") AND (attorney OR counsel)`
8. `("part-time" OR "10-20 hrs" OR "hourly") AND ("general counsel" OR "corporate counsel")`
9. `("outside general counsel" OR "outsourced legal") AND (startup OR portfolio)`
10. `("M&A" OR "corporate governance") AND ("contract attorney" OR "consultant counsel")`

---

## 3. PR freelance

**ICP.** Outsourced PR/comms execution plus strategic advisory contracts.

**Best-fit employers:** pre-IPO companies · PE/VC-backed companies · investor relations firms ·
boutique PR agencies building a freelance bench · fintech and B2B SaaS operating companies.

**Workstreams:** media relations · executive communications · thought leadership · product and
funding launches · crisis and reputation work · agency overflow.

**Title variants:**

Freelance PR Consultant · Contract Communications Manager · Interim Head of Comms · Fractional
CMO / CCO · PR Advisor (contract) · External Communications Consultant · Media Relations
Consultant · Crisis Communications Freelancer · Thought Leadership Writer (contract) ·
Executive Communications Consultant · Digital Strategy Consultant · Agency Freelance Bench

**Boolean clusters:**

1. `("freelance" OR "contract") AND ("public relations" OR "communications")`
2. `("fractional" OR "interim") AND ("head of communications" OR "CCO" OR "CMO")`
3. `("crisis communications" OR "reputation management") AND (freelance OR consultant)`
4. `("executive communications" OR "thought leadership") AND (contract OR consultant)`
5. `("agency" OR "boutique") AND ("freelance bench" OR "white-label" OR "overflow") AND PR`
6. `("investor relations" OR "pre-IPO" OR "IPO communications") AND (consultant OR contract)`
7. `("B2B SaaS" OR "fintech") AND ("communications consultant" OR "PR consultant")`

Boutique agencies openly building a freelance bench are worth a dedicated pass. Those are
recurring roster relationships rather than single engagements, and should be pitched that way.

---

## 4. Sources

**Fractional / freelance boards:** Go Fractional · Fractional Jobs · Legal.io · ACC Jobline ·
GoInhouse · Remote Rocketship · We Work Remotely

**General boards:** Built In · Indeed · ZipRecruiter · CareerBuilder

**Other:** Recruiterflow-hosted agency boards · agency careers pages directly · Reddit and
social discussion via the Brave Search API (`BRAVE_SEARCH_API_KEY`)

**LinkedIn: Google-indexed results only. Do not bot-scrape it.**

⚠️ **Aggregators lie.** ZipRecruiter, Indeed and Glassdoor frequently return salary-benchmark
or category index pages with no dated posting behind them. Those are not leads — do not score
them. When a cluster returns only index pages, say so in the report. That is useful signal
about source quality, not a gap to paper over.

---

## 5. Gating problems — state them, don't bury them

Score the role, then put the blocker on its own line.

**Geography.** A UK-only or Canada-only remote role is not workable from New York. Score it,
then drop it *with the reason stated*. Keep a dropped-leads table — a pattern of good-but-foreign
roles is itself information, and silently omitting them makes a thin cycle look like a broken
scrape.

**Practice-area drift.** An employment-law or IP req is off-ICP even at a great rate. If the
practice-area sub-score is 0, say so explicitly rather than letting a high intent score carry
it to the top of the table.

**Employment type.** A 12-month fixed-term employment contract is not a 1099 retainer. Note it
— the commercial model needs reframing in any pitch.

**Duplicate reqs.** The same role posted under a parent brand and a product brand may carry
different requirements (language, location). Note which is authoritative before applying twice.

**Missing metadata.** A missing posting date, rate, or remote status is the usual reason a
strong-fit lead scores low on intent. Say that, so it doesn't read as a weak lead.

---

## 6. Scoring

Fit 0–50 + Intent 0–50 = Combined 0–100. Grades: A ≥ 80, B 60–79, C < 60.

**Legal freelance — Fit:** practice-area match · employer type · seniority/level · stated
compensation · engagement shape (retainer vs. fixed-term employment).
**Legal freelance — Intent:** posting freshness · engagement-model clarity · remote
eligibility · ease of apply · urgency signals (reposted, "early applicant" flags).

**PR freelance — Fit:** sector match (financial services, fintech, B2B SaaS) · buyer type ·
seniority of the remit · whether the work is strategic *and* executional (the sweet spot) or
purely junior execution.
**PR freelance — Intent:** freshness · disclosed budget or rate · remote eligibility · ease of
apply · defined start window.

**Extra schema fields to capture on every freelance lead:** `roleTitle`,
`suggestedResumeCategory`, `vertical`, `subvertical`, `engagementModel`, `buyerType`,
`compensationText`, `remoteFlag`, `employmentTypeRaw`, `urgencyScore`.

`roleTitle` is **required** — the posting's job title, verbatim where possible. It feeds the
Role/Title column of the Command Center application tracker, and nothing else in the schema
carries it (`Company` is company-level). A lead without a `roleTitle` cannot be tracked, so
treat a missing one the same as a missing company name.

`suggestedResumeCategory` must be one of: `Legal / Commercial Counsel` · `Legal Tech & AI` ·
`Executive (CEO/COO)` · `Management Consulting` · `PR Marketing & Media`. Default by pipeline
(`legal-freelance` → Legal / Commercial Counsel, `pr-freelance` → PR Marketing & Media) and
override when the posting justifies it.

**Rank honestly.** A fresh posting with a disclosed budget and an easy apply path can outscore
a much better fit purely on intent. When that happens, note it under the table and say which
lead is actually the better match on fit and which to approach first. The ranking should not
quietly mislead.
