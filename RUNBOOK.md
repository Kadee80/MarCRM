# MarCRM Runbook

Day-to-day operation. Assumes the repo is cloned to `~/MarCRM` and `.env` is populated.

---

## One-time setup on a new machine

```bash
git clone https://github.com/<owner>/MarCRM.git
cd MarCRM
npm install                 # runs prisma generate automatically
cp .env.example .env        # then fill in the real values
npx prisma generate
npm run dev                 # http://localhost:3000
```

Requires Node 18+ and git. `npx prisma db push` is only needed after editing
`prisma/schema.prisma`.

In Cowork: add the `MarCRM` folder as a workspace folder, then create the one scheduled task
from `docs/scrape-tasks/marcrm-scrape.md`, set to 7:00 AM on weekdays. To change what the
scrape looks for, edit `docs/scrape-tasks/freelance-rules.md` — the task prompt reads it at
run time, so there's nothing to re-paste.

---

## After a scrape runs

A scrape writes files but cannot finish the job by itself — the cloud sandbox can't reach the
database, and sometimes can't commit. Two commands, both on your own machine:

```bash
cd ~/MarCRM

# 1. Publish the report to the site
git add reports/ scripts/
git commit -m "Scrape $(date +%F)"
git push

# 2. Load the leads into the database
npm run sync
```

**What each one does:**

| Command | Makes leads appear in |
|---|---|
| `git push` | The **Reports tab** (Vercel redeploys, the API reads `reports/*.json` off disk) |
| `npm run sync` | The **dashboard and pipeline board** (reads the database) |

If you only push, the report is on the site but the board doesn't change. That is the single
most common "the scrape is broken" false alarm.

`npm run sync` is idempotent — running it twice inserts nothing the second time. Safe to run
whenever you're unsure.

---

## Checking things

```bash
npm run sync:scan     # parse all reports, no database connection, just counts
npm run sync:dry      # connect and report what would be inserted, write nothing
node scripts/check-unimported.cjs   # which report leads are missing from the database
node scripts/db-check.cjs           # database connectivity + row counts
git status --porcelain | wc -l      # anything uncommitted?
```

---

## Troubleshooting

**Reports tab doesn't show reports from before August 2026's freelance scrapes.**
Known gap, not your setup. `src/app/api/reports/route.js` filters on
`f.startsWith("daily-scrape-")`, so the 128 historical `pr-freelance-scrape-*.json` and
`legal-freelance-scrape-*.json` files are invisible in the UI even though they're committed and
deployed. Those leads did reach the database, so they're on the pipeline board. Current scrapes
are unaffected — the merged task writes everything into `daily-scrape-*.json`.

**A report doesn't appear at all, and the filename doesn't start with `daily-scrape-`.**
Same filter. Report filenames must keep that prefix or the Reports tab ignores them.

**Reports tab is missing today's scrape.**
The `.json` wasn't committed and pushed, or the file was written as `.md` only. The Reports API
reads `.json` exclusively. Check `git status`, check the file exists in `reports/`.

**Pipeline board is missing leads that appear in the Reports tab.**
`npm run sync` hasn't run since the scrape. Run it.

**`git commit` does nothing, or reports from several days ago are still untracked.**
Stale git lock. This recurs.

```bash
cd ~/MarCRM
rm -f .git/*.lock .git/refs/heads/*.lock
git add -A && git commit -m "Catch up" && git push
```

Then `git status --porcelain | wc -l` to confirm it's clear. Claude cannot clear these locks
from the cloud sandbox — it has to be done locally.

**`Cannot find module 'pg'` from a script in `scripts/`.**
You ran one of the old `import-YYYY-MM-DD.cjs` files. Those are dead — they use `pg` and
reference columns that don't exist. Use `npm run sync` instead.

**Vercel build fails with `module is not defined` or an ESM error.**
A CommonJS file got named `.js`. `package.json` has `"type": "module"`; config and script files
using `module.exports` must be `.cjs`.

**Enrichment returns nothing.**
Hunter.io free tier is 50 searches/month. Check the `EnrichmentLog` table for this month's
count before assuming the integration is broken.

**Scrape returns few or no leads.**
Usually real, not a bug — check the report's `.md`, which explains the yield. If every source
returned nothing, check that `BRAVE_SEARCH_API_KEY` is set and under quota (2,000/month).

---

## Monthly

- Check Brave Search usage against the 2,000/month free quota
- Check Hunter.io usage against 50/month
- Skim `reports/` for days with no file at all — a silently failed scheduled task
