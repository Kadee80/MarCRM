# Task: `daily-lead-scrape`

**Schedule:** 9:00 AM daily
**Outputs:** `reports/daily-scrape-YYYY-MM-DD.json` + `reports/daily-scrape-YYYY-MM-DD.md`

> ⚠️ **Reconstructed prompt.** Rebuilt from project memory and report output, not copied from
> the original task. Verify against the original in the Cowork app before relying on it.
> See `README.md` in this folder.

---

## Prompt

```
Run the daily MarCRM lead scrape for today's date.

The MarCRM folder is connected as a workspace folder. Work in it.

## 0. Pre-flight

Run `git status --porcelain` (read-only, works fine). If report or script files from PRIOR
days are already untracked, the repo's git locks are stale and commits have been silently
failing. Say so at the top of your summary and surface the fix command — do not spend
retries fighting it.

Read every file in `reports/*.json` and build a set of all company names already captured.
This is the dedup baseline. Record the count — it goes in the report's `note` field.

## 1. Find new leads

Scan for companies showing a buying trigger in the last 7 days across all 8 pipelines:

  pr-marketing      — PR & Marketing, financial services + tech B2B
  fund-formation    — Fund formation law, emerging managers (Funds I–III)
  legal-consulting  — Legal consulting, funds ecosystem + business law
  coaching-ops      — Fractional ops + revenue growth coaching
  media             — Pay-to-play video podcast & interview media
  ai-consulting     — AI strategy, pilots, production, governance
  legal-freelance   — Contract / fractional / interim corporate & fund counsel roles
  pr-freelance      — Outsourced PR/comms execution + advisory contracts

Sources to work through:
- Funding announcements: TechCrunch, FinSMEs, Tech Funding News, FinTech Global, Axios Pro Rata
- SEC filings: new Form D filings from emerging fund managers
- Job boards for hiring signals: Indeed, CareerBuilder, Built In, ZipRecruiter
- Fractional/freelance boards: Go Fractional, Fractional Jobs, Legal.io, ACC Jobline,
  GoInhouse, Remote Rocketship
- Reddit and social discussion via the Brave Search API (BRAVE_SEARCH_API_KEY in .env)
- Company websites directly for tech stack, team, and contact signals

Do not bot-scrape LinkedIn. Use Google-indexed LinkedIn results only.

## 2. Routing rule (Mark's rule — apply it strictly)

- A job posting hiring for PR/comms work → route to `pr-freelance`, NOT `pr-marketing`
- A business event (funding round, launch, rebrand, expansion, acquisition) → route to
  `pr-marketing`

The distinction is who the buyer is. A company hiring a PR contractor is a freelance
opportunity. A company that just raised is a client opportunity.

## 3. Score every lead

Fit 0–50 + Intent 0–50 = Combined 0–100, using the rubric for that pipeline in
`src/lib/constants.js`. Break out sub-scores; do not just give a total.

Grades: A ≥ 80, B 60–79, C < 60. Only report leads scoring 40+.

Be honest about weak leads. If a lead scores high on intent purely because it was posted
yesterday, say so. If a strong-looking lead has a gating problem — wrong geography, wrong
practice area, an employment contract rather than a 1099 engagement — put that in a caveat
line rather than burying it. A short honest report beats a padded one.

## 4. Also refresh signals on hot leads

For companies already in the reports with grade A or B, check for anything new in the last
week (funding, hiring, leadership change, press) and note score changes.

## 5. Write the outputs

Write BOTH:

`reports/daily-scrape-YYYY-MM-DD.json`
  {
    "scrapeDate": "YYYY-MM-DD",
    "totalLeads": <count>,
    "note": "<what was scanned, dedup baseline count, routing notes, known gaps>",
    "leads": [
      {
        "name", "website", "pipeline", "industry", "location", "fundingStage",
        "fitScore", "intentScore", "fitDetails": {...}, "intentDetails": {...},
        "grade", "signals": [...], "source", "sourceUrl", "notes",
        "contacts": [{ "name", "title", "email", "linkedin" }]
      }
    ]
  }

`reports/daily-scrape-YYYY-MM-DD.md`
  Human-readable: header with counts and dedup baseline, a "Top 5 Hottest Leads" table,
  then all new leads grouped by pipeline with a paragraph of context, a caveat line where
  one is warranted, and a source link each.

The .json is what the CRM Reports tab reads. It must be .json — a .md alone is invisible
to the app.

## 6. Commit

  git add reports/ scripts/
  git commit -m "Daily scrape YYYY-MM-DD — N new leads"

Do not push. If the commit fails on a lock, say so and stop — do not retry more than twice.

## 7. Summarize

Report back: how many leads by pipeline, the top 5, anything that failed or returned
nothing, and a reminder to run `npm run sync` locally to get these into the database.
```
