# Task: `marcrm-scrape` — the single merged scrape

**Schedule:** 7:00 AM, weekdays
**Replaces:** `daily-lead-scrape`, `legal-freelance-scrape`, `pr-freelance-scrape`
**Outputs:** `reports/daily-scrape-YYYY-MM-DD.json` + `reports/daily-scrape-YYYY-MM-DD.md`

One task, one run, one report covering all 8 pipelines.

**Why the output is still named `daily-scrape-*`:** `src/app/api/reports/route.js` filters on
`f.startsWith("daily-scrape-")`. Keeping the filename means every freelance lead now appears in
the Reports tab for the first time, with no code change. Do not rename these files without
fixing that route first.

**Where the detail lives:** the deep freelance search rules — the 4-bucket taxonomy, the 19
legal title variants, the boolean clusters, the source list and the gating rules — are in
`docs/scrape-tasks/freelance-rules.md`. The prompt below points at that file. Edit the rules
there; leave the prompt alone.

---

## Prompt

```
Run the MarCRM lead scrape for today.

The MarCRM folder is connected as a workspace folder. Work in it. Read CLAUDE.md at the repo
root first — it has the file-format rules and the known environment limits.

## 0. Pre-flight

Run `git status --porcelain` (read-only, works fine from the sandbox). If report or script
files from PRIOR days are already untracked, the repo's git locks are stale and commits have
been failing silently. Say so at the TOP of your summary and surface the fix command. Do not
spend retries fighting it.

Read every file in `reports/*.json` and build a set of all company names already captured
(~850 as of Aug 2026). This is the dedup baseline for the whole run — one shared list across
all pipelines, so a lead found twice in different sources is reported once. Record the count;
it goes in the report's `note` field.

## 1. Coverage — all 8 pipelines in one pass

  pr-marketing      — PR & Marketing, financial services + tech B2B
  fund-formation    — Fund formation law, emerging managers (Funds I–III)
  legal-consulting  — Legal consulting, funds ecosystem + business law
  coaching-ops      — Fractional ops + revenue growth coaching
  media             — Pay-to-play video podcast & interview media
  ai-consulting     — AI strategy, pilots, production, governance
  legal-freelance   — Contract / fractional / interim corporate & fund counsel roles
  pr-freelance      — Outsourced PR/comms execution + advisory contracts

Lookback window: 7 days. It stays at 7 even though this runs daily — job boards index slowly,
and the shared dedup list means re-seeing a lead costs nothing while missing one costs a lead.

### 1a. Agency pipelines (the first six)

Scan for companies showing a buying trigger in the window:
- Funding announcements: TechCrunch, FinSMEs, Tech Funding News, FinTech Global, Axios Pro Rata
- SEC filings: new Form D filings from emerging fund managers
- Job boards for hiring signals: Indeed, CareerBuilder, Built In, ZipRecruiter
- Reddit and social discussion via the Brave Search API (BRAVE_SEARCH_API_KEY in .env)
- Company websites directly for tech stack, team and contact signals

### 1b. Freelance pipelines (the last two)

Follow `docs/scrape-tasks/freelance-rules.md` in full. Read it before starting this section —
do not work from memory of it. It defines the 4-bucket qualification taxonomy, the legal and
PR title variants, the boolean clusters to run, the sources, the gating rules and the
freelance scoring breakdown.

Two rules from that file that get dropped most often, repeated here because they matter:
- Do NOT filter on the word "consulting." A posting qualifies on terms from at least two
  buckets plus a practice-area term.
- Aggregator index pages and salary-benchmark pages are not leads. Do not score them.

Do not bot-scrape LinkedIn anywhere in this run. Google-indexed results only.

## 2. Routing rule (Mark's rule — apply it strictly)

- A job posting hiring for PR/comms work → route to `pr-freelance`, NOT `pr-marketing`
- A business event (funding round, launch, rebrand, expansion, acquisition) → route to
  `pr-marketing`

The distinction is who the buyer is. A company hiring a PR contractor is a freelance
opportunity. A company that just raised is a client opportunity.

## 3. Consistency check — this is the point of merging

Because all 8 pipelines are now scored in one pass against one dedup list, a company must get
ONE verdict. Before writing the report, check that you have not both reported a lead and
dropped a near-identical one for a reason that would apply to both.

The specific failure this replaces: on 2026-08-18 the old daily scrape reported Visier, Norven
and Keyloop as legal-freelance leads on the same morning the old legal scrape dropped all
three for being UK/Canada-only. Same companies, same day, opposite verdicts, two reports.
Apply the geography and practice-area gates from freelance-rules.md once, to everything.

## 4. Score every lead

Fit 0–50 + Intent 0–50 = Combined 0–100, using the rubric for that pipeline in
`src/lib/constants.js`. For the two freelance pipelines use the breakdown in
freelance-rules.md §6. Break out sub-scores; do not just give a total.

Grades: A ≥ 80, B 60–79, C < 60.
Report agency-pipeline leads scoring 40+. Report freelance leads scoring 55+.

Be honest about weak leads. If a lead scores high on intent purely because it was posted
yesterday, say so. If a strong-looking lead has a gating problem — wrong geography, wrong
practice area, an employment contract rather than a 1099 engagement — put that in a caveat
line rather than burying it. A short honest report beats a padded one. If the cycle is thin,
say it is thin and explain why.

## 5. Refresh signals on hot leads

For companies already in the reports with grade A or B, check for anything new in the last
week (funding, hiring, leadership change, press) and note score changes.

## 6. Write the outputs

Write BOTH files. The .json is what the CRM Reports tab reads — a .md alone is invisible to
the app.

`reports/daily-scrape-YYYY-MM-DD.json`
  {
    "scrapeDate": "YYYY-MM-DD",
    "totalLeads": <count>,
    "note": "<what was scanned, dedup baseline count, routing notes, sources that returned
              nothing, known gaps>",
    "leads": [
      {
        "name", "website", "pipeline", "industry", "location", "fundingStage",
        "fitScore", "intentScore", "fitDetails": {...}, "intentDetails": {...},
        "grade", "signals": [...], "source", "sourceUrl", "notes",
        "contacts": [{ "name", "title", "email", "linkedin" }]
      }
    ]
  }

  Freelance leads additionally carry: vertical, subvertical, engagementModel, buyerType,
  compensationText, remoteFlag, employmentTypeRaw, urgencyScore.

`reports/daily-scrape-YYYY-MM-DD.md`
  - Header: date, counts, pipelines covered, dedup baseline count
  - "Top 5 Hottest Leads" table across all pipelines
  - All new leads grouped by pipeline, each with a paragraph of context, a caveat line where
    one is warranted, and a source link
  - A dropped-leads table for anything scored then rejected on a gate, with the reason
  - A short note on any source that returned only index pages or nothing at all

## 7. Commit

  git add reports/
  git commit -m "MarCRM scrape YYYY-MM-DD — N new leads"

Do not push. If the commit fails on a lock, say so and stop — do not retry more than twice.

## 8. Summarize

Report back: counts by pipeline, the top 5, anything that failed or returned nothing, and a
reminder to run `npm run sync` locally to load these into the database.
```

---

## Notes on the merge

**What changed from three tasks to one:**

| | Before | After |
|---|---|---|
| Tasks to maintain | 3 | 1 |
| Runs per weekday | up to 3 | 1 |
| Report files per day | up to 3 | 1 |
| Dedup baseline | per-task, cross-referenced | one shared list |
| Visible in Reports tab | daily only (128 files hidden) | everything |
| ICP edits | 3 places, drifted | 1 prompt + 1 rules file |

**What to watch after the switch:** freelance lookback drops from a dedicated 7-day sweep to a
7-day window inside a broader run, so the model has more ground to cover in one session. If
freelance yield falls noticeably over the first two weeks, the fix is to split the boolean
clusters across weekdays (legal clusters 1–5 Monday/Wednesday, 6–10 Tuesday/Thursday, PR on
Friday) rather than reverting to three tasks.

**The old prompts** are still in this folder — `daily-lead-scrape.md`,
`legal-freelance-scrape.md`, `pr-freelance-scrape.md`. Keep them until the merged task has run
clean for a week, and until the reconstructions have been diffed against the originals in the
Cowork app. After that they are archive.
