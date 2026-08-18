# Task: `pr-freelance-scrape`

**Schedule:** weekly, 7-day lookback window
**Outputs:** `reports/pr-freelance-scrape-YYYY-MM-DD.json` + `.md`
**Last updated:** 2026-05-06, from Mark's ICP document

> ⚠️ **Reconstructed prompt.** Rebuilt from project memory and report output, not copied from
> the original task. Verify against the original in the Cowork app before relying on it.

---

## Prompt

```
Run the PR freelance scrape for today, covering a 7-day lookback window.

The MarCRM folder is connected as a workspace folder. Work in it.

## 0. Pre-flight

Run `git status --porcelain`. If prior days' report files are untracked, flag stale git locks
and surface the fix rather than fighting the commit.

Build the dedup baseline from all company names in `reports/pr-freelance-*.json`,
`reports/legal-freelance-*.json` and `reports/daily-scrape-*.json`.

## 1. What we're looking for

Outsourced PR and comms execution, plus strategic advisory contracts.

Best-fit employers:
- Pre-IPO companies
- PE/VC-backed companies
- Investor relations firms
- Boutique PR agencies needing overflow or a freelance bench
- Fintech and B2B SaaS operating companies

Key workstreams: media relations, executive communications, thought leadership, product and
funding launches, crisis and reputation work, agency overflow.

## 2. The 4-bucket qualification taxonomy

Job boards label freelance PR work inconsistently. Do not filter on "consulting" alone.

  A. Explicit freelance   — freelance, contract, contractor, 1099, project-based, hourly
  B. Fractional/interim   — fractional, interim, temporary, part-time, maternity cover,
                            fixed-term
  C. Consultant labels    — consultant, advisor, strategist
  D. Embedded labels      — overflow, bench, on-demand, white-label, outsourced, agency
                            partner

A posting qualifies if it carries terms from at least TWO buckets plus a comms practice-area
term (PR, communications, media relations, publicity, thought leadership, crisis).

## 3. Title variants to search

Freelance PR Consultant, Contract Communications Manager, Interim Head of Comms, Fractional
CMO/CCO, PR Advisor (contract), External Communications Consultant, Media Relations
Consultant, Crisis Communications Freelancer, Thought Leadership Writer (contract), Executive
Communications Consultant, Digital Strategy Consultant, Agency Freelance Bench.

## 4. Sources

Remote Rocketship, Built In, Indeed, ZipRecruiter, We Work Remotely, Recruiterflow-hosted
agency boards, agency careers pages directly, plus Reddit and social discussion via the Brave
Search API. Google-indexed LinkedIn results only — do not bot-scrape LinkedIn.

Also worth a pass: boutique PR agencies openly building a freelance bench. Those are
recurring-revenue roster relationships rather than single engagements, and should be pitched
that way.

## 5. Scoring — 100 points

Fit 0–50: sector match (financial services, fintech, B2B SaaS), buyer type, seniority of the
remit, whether the work is strategic + executional (the sweet spot) or purely junior
execution.
Intent 0–50: freshness, disclosed budget or rate, remote eligibility, ease of apply, defined
start window.

Capture: vertical, subvertical, engagementModel, buyerType, compensationText, remoteFlag,
employmentTypeRaw, urgencyScore.

Grades: A ≥ 80, B 60–79, C < 60. Report leads scoring 55+.

## 6. Rank on combined score, but flag intent artifacts

A fresh posting with a disclosed budget and an easy apply path can outscore a much better
fit purely on intent. When that happens, say so in a note under the table and state which
lead is actually the better match on fit and which to approach first. The ranking should not
quietly mislead.

Other caveats worth stating plainly:
- A fixed-term employment contract is not a 1099 retainer — the commercial model differs
- Duplicate reqs posted under a parent brand and a product brand may have different
  requirements (language, location) — note which is authoritative
- A missing posting date, rate, or remote status is the usual reason a strong-fit lead
  scores low on intent — say that rather than letting it look like a weak lead

## 7. Write the outputs

`reports/pr-freelance-scrape-YYYY-MM-DD.json`
  { "scrapeDate", "totalLeads", "note", "leads": [...] }
  Same lead schema as the daily scrape, with pipeline set to "pr-freelance".

`reports/pr-freelance-scrape-YYYY-MM-DD.md`
  Header with window, counts and grade split; a hottest-leads table; a note on any ranking
  artifact; then per-lead detail with background, why it matters, pitch angle, caveats, and
  source links.

## 8. Commit and summarize

  git add reports/ && git commit -m "PR Freelance scrape YYYY-MM-DD — N new leads"

Then summarize, and remind that `npm run sync` must run locally to load the database.
```
