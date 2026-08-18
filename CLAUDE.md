# CLAUDE.md — MarCRM project context

This file is read automatically by Claude when it works in this repo. It exists because the
project's operating knowledge used to live in one person's Cowork project memory, which does
not transfer between accounts. Everything Claude needs to not break this repo is written down
here instead.

If you learn something new and non-obvious about this project, add it to this file.

---

## What this is

MarCRM is a lead-generation CRM for a 6-line agency, plus 2 freelance pipelines.
Next.js 14 (App Router) + Prisma + Neon PostgreSQL, deployed on Vercel.

Leads are found by Claude-run scrapes (not by cron-running code), written to `reports/` as
JSON + Markdown, committed to git, deployed by Vercel, then imported into the database by a
local script.

The scrape is a single Cowork scheduled task, 7:00 AM weekdays, covering all 8 pipelines. Its
prompt and search rulebook are versioned in `docs/scrape-tasks/` — start with the README there.

**Pipelines** (`src/lib/constants.js`, `Company.pipeline`):

| id | Label |
|---|---|
| `pr-marketing` | PR & Marketing — FS + Tech B2B clients |
| `fund-formation` | Fund Formation Law — emerging managers, Funds I–III |
| `legal-consulting` | Legal Consulting — funds ecosystem + business law |
| `coaching-ops` | Coaching & Ops — fractional ops + revenue coaching |
| `media` | Media / Podcast — pay-to-play video podcast |
| `ai-consulting` | AI & Tech Consulting |
| `legal-freelance` | Contract / fractional / interim corporate & fund counsel roles |
| `pr-freelance` | Outsourced PR/comms execution + advisory contracts |

**Scoring:** Fit 0–50 + Intent 0–50 = Combined 0–100. Grades: A ≥ 80, B 60–79, C < 60.
Rubrics per pipeline live in `src/lib/constants.js`.

---

## Architecture

```
Browser (React, src/components/AgencyCRM.jsx)
    ↕ fetch()
Next.js API routes (src/app/api/*/route.js)
    ↕ Prisma Client (src/lib/db.js)
Neon PostgreSQL
```

API routes: `companies`, `contacts`, `engagements`, `milestones`, `todos`, `enrich`,
`scrape`, `daily-scrape`, `reports`, `dbinfo`.

Prisma models: `Company`, `Contact`, `Engagement`, `Todo`, `Milestone`, `ScrapeResult`,
`EnrichmentLog`.

The **Reports tab** does not read the database. `src/app/api/reports/route.js` reads
`reports/*.json` off the filesystem at request time, which on Vercel means whatever was in
the last git push. So a report shows up on the site as soon as it is committed and deployed —
no database import required. The **dashboard and pipeline board** do read the database, so
leads only appear there after the sync script runs.

The scanning logic lives in `src/lib/reports.js` (`loadReports(dir)`), deliberately kept free
of Next imports so it can be run and tested with plain `node`. The route is a thin wrapper.

> **Fixed 2026-08-18.** The route used to filter on `f.startsWith("daily-scrape-")`, which hid
> every freelance report — 128 files, about two-thirds of everything ever produced. It also
> derived the date by string-replacement, which produced an invalid date for the one
> `daily-scrape-2026-04-27-targeted.json` file. `loadReports` now matches any
> `<prefix>-YYYY-MM-DD[-variant].json`, returns a `type` and `typeLabel` per report, and
> catches parse errors per file so one malformed report can't 500 the whole tab.
>
> Because several reports can now share a date, **the UI keys reports on `filename`, not
> `date`.** 17 of 19 weeks had a date collision before this change. Don't reintroduce a
> date-based key.

---

## Hard rules — break these and the build breaks

**1. `package.json` has `"type": "module"`. Any CommonJS file must be `.cjs`.**
That is why the repo has `postcss.config.cjs`, `tailwind.config.cjs`, `next.config.cjs`, and
why every script in `scripts/` is `.cjs`. Vercel builds failed when these were `.js`, because
Node treated `module.exports` as an error in ESM scope. ESM scripts use `.mjs`
(`prisma/seed.mjs`, `scripts/run-daily-scrape.mjs`).

**2. The database layer is Prisma, not `pg`.**
Any new DB script must use `@prisma/client`. Six of the historical
`scripts/import-YYYY-MM-DD.cjs` files (the 2026-06-17 through 2026-06-25 batch) `require('pg')`,
which is not a dependency of this project — they fail immediately with
`Cannot find module 'pg'`. Others reference columns that do not exist on the model. Do not use
any of them as a template. Prisma auto-loads `.env`, so `DATABASE_URL` is picked up with no
extra config.

**3. `Company` has no `grade`/`signals`/`sourceUrl`/`scrapeDate` columns.**
Fold grade and signals into `notes`; fold source name + URL into `source`. `contacts` is a
relation — create with a nested write: `contacts: { create: [...] }`.

**4. Reports must be written as `.json`, not `.md` only.**
The Reports tab reads `.json`. A companion `.md` is written for humans and is ignored by the
app. Shape:

```json
{ "scrapeDate": "YYYY-MM-DD", "totalLeads": 0, "note": "…", "leads": [ … ] }
```

Filename: `reports/daily-scrape-YYYY-MM-DD.json` — one file per run, all 8 pipelines. The
filename must end in `-YYYY-MM-DD.json`; the date is parsed from there, and a file without it
is skipped by the Reports tab. The prefix itself is now free-form (it becomes the report's
type label). The historical `pr-freelance-scrape-*` / `legal-freelance-scrape-*` files date
from when three separate tasks ran, and now display correctly alongside the daily reports.

`sync-all-leads.cjs` tolerates both a `leads` and a `newLeads` key, plus common field-name
variants, but new reports should use `leads`.

**5. Scrapes must deduplicate against every prior report.**
Before writing a lead, check its company name against all names already in `reports/*.json`
(~850 as of August 2026). The daily report's `note` field records the dedup baseline count.

---

## Getting leads into the database

`scripts/sync-all-leads.cjs` is the current, idempotent path. It scans every `reports/*.json`,
dedups by company name keeping the highest combined score, and inserts only companies that are
missing.

```bash
npm run sync:scan   # parse reports, no DB connection at all
npm run sync:dry    # connect, report what would be inserted, write nothing
npm run sync        # insert missing companies
```

It supersedes the per-day `scripts/import-*.cjs` files. Helper scripts, both local-only:
`scripts/check-unimported.cjs` (diffs report lead names against the `Company` table) and
`scripts/db-check.cjs`.

`npx prisma db push` is only needed after editing `prisma/schema.prisma`.

---

## Environment limits Claude will hit

**The Cowork cloud sandbox cannot reach Neon.** Outbound Postgres to
`ep-*.us-east-1.aws.neon.tech:5432` is blocked. Anything that writes to the database must run
on the local machine. Do not schedule a database write as a cloud task — it will fail every
time. Write the report files and tell the user to run `npm run sync` locally.

**Git commits from the sandbox are unreliable.** The mounted `.git/` rejects some writes.
The failure mode is a stale `.git/index.lock` or `.git/refs/heads/main.lock` that the sandbox
cannot delete (`rm` → "Operation not permitted"), after which every commit silently fails and
report files pile up untracked for days.

At the **start** of any scrape run, do this read-only check first:

```bash
git status --porcelain | wc -l
```

If prior days' `reports/` or `scripts/` files are already untracked, the locks are stale.
Say so immediately and surface the fix rather than retrying the commit:

```bash
cd ~/Desktop/MarCRM
rm -f .git/*.lock .git/refs/heads/*.lock
git add reports/ scripts/ && git commit -m "Scrape <date>" && git push
```

Scrape **output files always save correctly** — only the commit step is affected.

**Do not spend more than one or two attempts fighting a git lock.** Write the files, flag it,
move on.

---

## Local file deletion

Claude cannot delete files on the local machine through the Cowork bridge (`rm` is not
permitted). To retire a file, `mv` it into a `_to_delete/` folder inside the repo and tell the
user to delete that folder themselves.

---

## Repo hygiene

`.gitignore` now covers `.DS_Store`, `*.log` and `.vercel/`. `.env` is correctly ignored;
`.env.example` documents the required keys.

Remaining cleanup needs git-index writes, which the sandbox cannot do — it is scripted in
`scripts/cleanup-local.sh`, run locally:

```bash
bash scripts/cleanup-local.sh            # dry run, shows the plan
bash scripts/cleanup-local.sh --apply    # do it and commit
```

It clears stale git locks, untracks `.DS_Store` / `sync.log`, archives the **205** superseded
`scripts/import-YYYY-MM-DD.cjs` files into `scripts/archive/`, and moves the stale root
`AgencyCRM.jsx` (the live component is `src/components/AgencyCRM.jsx`) into `archive/`.
