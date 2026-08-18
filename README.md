# MarCRM

A lead-generation CRM for a six-line agency, plus two freelance pipelines.
Next.js 14 (App Router) · Prisma · Neon PostgreSQL · deployed on Vercel.

Leads are found by a scheduled Claude scrape rather than by server-side cron: the scrape writes
report files into `reports/`, those get committed and deployed, and a local script loads them
into the database.

## Quick start

```bash
npm install                 # runs prisma generate
cp .env.example .env        # fill in DATABASE_URL and BRAVE_SEARCH_API_KEY
npm run dev                 # http://localhost:3000
```

Node 18+ required. `npx prisma db push` only after editing `prisma/schema.prisma`.

## The daily loop

| Step | Command | Result |
|---|---|---|
| Scrape runs (7 AM weekdays, Cowork task) | — | writes `reports/daily-scrape-<date>.json` + `.md` |
| Publish | `git add reports/ && git commit && git push` | report appears in the **Reports tab** |
| Load | `npm run sync` | leads appear on the **dashboard and pipeline board** |

Both steps are needed. `git push` alone leaves the pipeline board unchanged, which is the most
common false alarm.

## Documentation

| File | What's in it |
|---|---|
| `CLAUDE.md` | Architecture, the rules that break the build if ignored, environment limits. Read this first. |
| `RUNBOOK.md` | Day-to-day operation and troubleshooting. |
| `HANDOFF.md` | Ownership transfer checklist — accounts, keys, scheduled tasks. |
| `docs/scrape-tasks/` | The scrape task prompt and its search rulebook. |
| `SETUP.md` | Original build/deploy guide. |

## Pipelines

`pr-marketing` · `fund-formation` · `legal-consulting` · `coaching-ops` · `media` ·
`ai-consulting` · `legal-freelance` · `pr-freelance`

Scoring is Fit 0–50 + Intent 0–50 = 100, with per-pipeline rubrics in `src/lib/constants.js`.
Grades: A ≥ 80, B 60–79, C < 60.

## Layout

```
src/app/api/*/route.js    API routes (companies, contacts, engagements, reports, enrich, …)
src/components/           AgencyCRM.jsx — the full UI
src/lib/                  constants (pipelines + rubrics), db, scoring, scrapers, reports
prisma/schema.prisma      Company, Contact, Engagement, Todo, Milestone, ScrapeResult, EnrichmentLog
reports/                  scrape output, one .json + .md per run
scripts/                  sync-all-leads.cjs and helpers
docs/scrape-tasks/        scrape prompt + search rules
```
