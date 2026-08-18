# Task: `legal-freelance-scrape`

**Schedule:** 7:00 AM weekdays
**Outputs:** `reports/legal-freelance-scrape-YYYY-MM-DD.json` + `.md`
**Created:** 2026-05-06, from Mark's ICP document

> ⚠️ **Reconstructed prompt.** Rebuilt from project memory and report output, not copied from
> the original task. Verify against the original in the Cowork app before relying on it.
>
> ⚠️ **Whose pipeline is this?** `src/lib/constants.js` describes `legal-freelance` as roles
> "for Katie", and the reports are written in those terms. Under the handoff to Mark this has
> to be resolved — see the open decisions section of `HANDOFF.md`. Whoever the candidate is,
> their name, level, licensure and location constraints need to be correct in this prompt.

---

## Prompt

```
Run the legal freelance scrape for today, covering a 7-day lookback window.

The MarCRM folder is connected as a workspace folder. Work in it.

## 0. Pre-flight

Run `git status --porcelain`. If prior days' report files are untracked, flag stale git locks
and surface the fix rather than fighting the commit.

Build the dedup baseline from all company names in `reports/legal-freelance-*.json`,
`reports/pr-freelance-*.json` and `reports/daily-scrape-*.json`.

## 1. What we're looking for

Contract, fractional, and interim fund & corporate counsel work.

Best-fit employers:
- PE and VC funds, especially emerging managers
- Fund portfolio companies
- Law firms needing overflow capacity
- ALSPs (alternative legal service providers)
- Late-stage private companies standing up or scaling a legal function

Key workstreams: fund formation, LP/GP documents, corporate governance, commercial
contracts, M&A, fractional GC.

## 2. Search the full title taxonomy, not just "lawyer"

Run all 19 title variants, including: Fractional General Counsel, Fractional GC, Interim
General Counsel, Interim Head of Legal, Contract Corporate Counsel, Fund Counsel, Fund
Formation Counsel, Investment Funds Counsel, Corporate Counsel (contract), Commercial
Counsel (contract), Legal Consultant, Outside General Counsel, Part-time General Counsel,
Contract Attorney (corporate/funds), Secondment Counsel, Legal Specialist, Principal Legal
Lead, Head of Legal (fixed-term), Interim Legal Director.

## 3. The 4-bucket qualification taxonomy

Job boards label freelance work inconsistently. Do not filter on the word "consulting."

  A. Explicit freelance   — freelance, contract, contractor, 1099, project-based, hourly
  B. Fractional/interim   — fractional, interim, temporary, part-time, secondment, fixed-term
  C. Consultant labels    — consultant, advisor, outside counsel
  D. Embedded labels      — overflow, surge, bench, on-demand, managed services

A posting qualifies if it carries terms from at least TWO buckets plus a practice-area term.

## 4. Sources — run all ten boolean clusters against each

Go Fractional, Fractional Jobs, Built In, Legal.io, ACC Jobline, GoInhouse, ZipRecruiter,
Indeed, CareerBuilder, plus Google-indexed LinkedIn results (do not bot-scrape LinkedIn).

Aggregators frequently return salary-benchmark or category index pages with no dated
posting behind them. Do not score those as leads. Say in the report when a cluster returned
only index pages — that is useful signal about source quality, not a gap to paper over.

## 5. Scoring — 100 points

Fit 0–50: practice-area match, employer type, seniority/level, stated compensation,
engagement shape (retainer vs. fixed-term employment).
Intent 0–50: freshness of posting, engagement model clarity, remote eligibility, ease of
apply, urgency signals (reposted, "early applicant" flags).

Also capture the schema fields the CRM expects: vertical, subvertical, engagementModel,
buyerType, compensationText, remoteFlag, employmentTypeRaw, urgencyScore.

Grades: A ≥ 80, B 60–79, C < 60. Report leads scoring 55+.

## 6. Be direct about gating problems

Score the role, then state the blocker plainly in its own line. The recurring ones:

- Geography. A UK-only or Canada-only remote role is not workable from New York. Score it,
  then drop it with the reason stated — a dropped-leads table is more useful than silently
  omitting them, because a pattern of good-but-foreign roles is itself information.
- Practice area drift. An employment-law or IP req is off-ICP even at a great rate. If the
  practice-area sub-score is 0, say so explicitly rather than letting a high intent score
  carry it to the top of the table.
- Employment type. A 12-month fixed-term employment contract is not a 1099 retainer. Note it
  — the commercial model needs reframing in any pitch.

If the cycle is thin, say it is thin and explain why. Do not pad.

## 7. Write the outputs

`reports/legal-freelance-scrape-YYYY-MM-DD.json`
  { "scrapeDate", "totalLeads", "note", "leads": [...] }
  Same lead schema as the daily scrape, with pipeline set to "legal-freelance".

`reports/legal-freelance-scrape-YYYY-MM-DD.md`
  Header with window, counts and dedup baseline; a short honest summary of the cycle; a
  dropped-leads table with reasons; a hottest-leads table; then per-lead detail with
  what they are, why it matters, the pitch angle, caveats, and source links.

## 8. Commit and summarize

  git add reports/ && git commit -m "Legal Freelance scrape YYYY-MM-DD — N new leads"

Then summarize, and remind that `npm run sync` must run locally to load the database.
```
