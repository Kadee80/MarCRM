# MarCRM Daily Scrape — Evening Run Report

**Run time:** 2026-04-21 10:22 EDT (evening scheduled task)
**Status:** FAILED — could not complete due to sandbox network restriction
**Companies updated:** 0
**New signals detected:** 0

## What happened

The scheduled task attempted to run the daily scraper two ways:

1. **Via the Next.js dev server** (`npm run dev` then `POST /api/daily-scrape`).
   The server started and bound port 3000, but requests hung past a 30s
   timeout and the "Ready" line never appeared in the log — consistent with
   Next.js stalling on outbound network calls (telemetry and/or Prisma
   connection warm-up).

2. **Via a standalone Node script** (`scripts/run-daily-scrape.mjs`) that
   replicates the route logic exactly: pulls all companies in
   Targeted/Contacted/Engaged/Qualified, runs the four scrapers
   (`scrapeJobBoards`, `analyzeWebsiteFreshness`, `findRecentNews`,
   `findConferenceAttendance`), merges details, recalculates
   `fitScore`/`intentScore`, and writes back with Prisma.

The script reached Prisma, but the very first query failed with:

```
PrismaClientInitializationError: Can't reach database server at
`ep-silent-moon-a42be4c4.us-east-1.aws.neon.tech:5432`
```

DNS itself is blocked from this sandbox:

```
;; UDP setup with 172.16.10.1#53 ... failed: network unreachable
```

So no DB reads or writes occurred. `fitScore`, `intentScore`, `fitDetails`,
`intentDetails`, and `lastActivity` on all Targeted/Contacted/Engaged/Qualified
companies are **unchanged** from the prior run.

## Root cause

The scheduled task is executing in a sandboxed environment without outbound
network access. The Neon Postgres instance is the source of truth and lives
at `ep-silent-moon-a42be4c4.us-east-1.aws.neon.tech`, which is unreachable
from here. Any scraper run that needs to read or write the DB has to execute
where that network egress is allowed — e.g. on the user's machine at
`/Users/Katie/Desktop/MarCRM`, or in a server cron with Neon whitelisted.

## Findings (top growth signals, outdated sites, recent news)

None. No companies were processed, so there is nothing to report this cycle.

## Suggested next step

Run the scraper locally where Neon is reachable. Either:

```
cd /Users/Katie/Desktop/MarCRM
npm run dev     # in one terminal
curl -X POST http://localhost:3000/api/daily-scrape
```

or run the standalone script that was added by this task:

```
cd /Users/Katie/Desktop/MarCRM
node scripts/run-daily-scrape.mjs
```

The standalone script is a drop-in for the API route and writes a JSON
summary to stdout including the top-growth ranking and outdated-website
list, which were the deliverables this run couldn't produce.
