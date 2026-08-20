# MarCRM — your daily workflow

**Mark.** Two minutes each weekday morning. One command.

---

## Who does what

| | You | Katie |
|---|---|---|
| The 7 AM scrape | runs against your machine | not running scrapes any more |
| Pushing reports + syncing the database | **you** | — |
| Front-end and code changes | — | on her machine |

You own the lead flow. She owns the code. The only place those two touch is the shared GitHub
repo, and the command below handles that for you.

---

## What happens without you

Every weekday at **7:00 AM** a scheduled task called `marcrm-scrape` wakes up, searches for new
leads across all 8 pipelines, scores them, and writes two files into `~/Desktop/MarCRM/reports/`:

- `daily-scrape-YYYY-MM-DD.json` — the file the CRM reads
- `daily-scrape-YYYY-MM-DD.md` — the readable version, for you

You'll get a notification when it finishes, with the lead counts and the top 5.

**One condition:** your Claude desktop app has to be open and online at 7 AM. The report gets
written onto your Mac, so if the laptop is shut the task can't reach it. If that happens the
summary will say so and include the results, so nothing is lost — but the file won't be on disk.

---

## What you do

Open **Terminal** (press ⌘-Space, type `Terminal`, hit Return) and run:

```bash
cd ~/Desktop/MarCRM && npm run publish
```

That's the whole job. It takes about a minute.

You can copy-paste that line. `cd` moves into the project folder; `npm run publish` does the
work.

### What the command actually does

Three things, in order, and it tells you as it goes:

1. **Pulls Katie's latest changes.** She's pushing front-end updates from her machine, so this
   picks those up before you push. Without it your push would eventually get rejected.
2. **Commits and pushes the new report files.** This is what makes the report appear in the
   **Reports tab** on the site. Vercel redeploys automatically.
3. **Runs the database sync.** This is what puts the leads into Neon, which is what the
   **dashboard and pipeline board** read.

Steps 2 and 3 are separate for a reason, and it's the single most common false alarm on this
project: **pushing alone does not change the pipeline board.** If you ever see a report on the
site but the board looks the same as yesterday, the sync didn't run.

Running it twice is harmless. If there's nothing new, it says so and stops.

---

## How to tell it worked

The last line will say:

```
Done. Reports tab and pipeline board are both up to date.
```

Then open the site and check that today's date shows in the **Reports tab** and that the
**pipeline board** has more leads than yesterday.

If you'd rather look at it locally instead of on the live site:

```bash
cd ~/Desktop/MarCRM
npm run dev
```

Then open **http://localhost:3000**. Leave that Terminal window open while you use it —
`Ctrl-C` stops it. This runs against the same live database, so it's not a sandbox; edits you
make are real.

---

## When something looks wrong

**"It says nothing new to commit."**
The scrape didn't write a file. Usually your laptop was closed at 7 AM. Check
`~/Desktop/MarCRM/reports/` for today's date. Nothing there means no scrape ran.

**"The push failed."**
If it mentions authentication, GitHub wants a personal access token rather than your password —
github.com → Settings → Developer settings → Tokens (classic) → generate one with `repo` scope,
and paste that when Terminal asks for a password. Your Mac remembers it afterwards.

**"The pull hit a conflict."**
You and Katie changed the same file. The command stops before pushing anything, so nothing is
broken. Run `git rebase --abort` to put things back, then message her.

**"The sync failed."**
The database connection is the likely problem. Check it with:

```bash
cd ~/Desktop/MarCRM && node scripts/db-check.cjs
```

**Reports from several days ago are still sitting there unpushed.**
This project has a recurring quirk where a leftover lock file makes commits fail silently.
`npm run publish` clears it automatically now, so just run the command — it should catch up all
the pending days at once.

**Anything else.** `RUNBOOK.md` in the project folder has the longer troubleshooting list.

---

## One-time cleanup, whenever you get to it

There are a few changes sitting uncommitted on your machine from setup — the freelance pipelines
being re-pointed to you, the new publish script, and the setup guides. Push them once and it's
done:

```bash
cd ~/Desktop/MarCRM
git add -A && git commit -m "Setup: publish script, freelance pipelines to Mark" && git push
```

Worth telling Katie you've done it, since it touches `src/lib/constants.js` and that's her side
of the house.

---

## Once a month

- Skim `reports/` for weekdays with no file at all — that's a scrape that silently didn't run
- Brave Search is capped at 2,000 queries/month, Hunter.io at 50 lookups — both shared with
  Katie's account, so they run down faster than you'd expect
- **Early November:** the scrape will start running at 6:00 AM instead of 7:00 when the clocks
  change. Ask me to shift it and it's a one-line fix.

---

## The thing most worth doing this week

Nobody has taken a backup of the database yet, and you and Katie are now both connected to the
same one. It's one command and it's the only thing here that can't be undone:

```bash
cd ~/Desktop/MarCRM
pg_dump "$(grep '^DATABASE_URL=' .env | cut -d= -f2-)" -Fc -f ~/Desktop/marcrm-backup-$(date +%F).dump
```

If `pg_dump` isn't installed, `brew install libpq` gets it. Keep the file somewhere that isn't
the project folder.
