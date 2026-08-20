# MarCRM — first-run setup (Mark)

Everything below runs in **Terminal on your Mac**, not in Claude. The app talks to a Neon
database that only your machine can reach, so this part can't be done for you from the cloud.

Open Terminal (⌘-Space → "Terminal") and work through these in order.

---

## 1. Check you have Node 18 or newer

```bash
node -v
```

If that prints `v18.x` or higher, you're fine. If it says "command not found" or a lower
number, install the LTS build from https://nodejs.org, then close and reopen Terminal.

---

## 2. Create your `.env` and paste in the database URL

```bash
cd ~/Desktop/MarCRM
cp .env.example .env
open -e .env
```

TextEdit opens the file. Find this line:

```
DATABASE_URL=postgresql://USER:PASSWORD@ep-xxxx.us-east-1.aws.neon.tech/neondb?sslmode=require
```

Replace the whole thing after `DATABASE_URL=` with Katie's real connection string. Keep the
`?sslmode=require` on the end — Neon rejects the connection without it. Save (⌘-S) and close.

Leave `BRAVE_SEARCH_API_KEY` blank for now. It's only used by the daily scrape, not by the app.

`.env` is gitignored, so it never gets committed.

---

## 3. Install and run

```bash
cd ~/Desktop/MarCRM
npm install
npm run dev
```

`npm install` takes a couple of minutes the first time and runs `prisma generate` on its own.
When `npm run dev` says *ready*, open **http://localhost:3000**.

Leave that Terminal window running — closing it stops the app. `Ctrl-C` stops it deliberately.

---

## 4. Confirm it's actually reading the real data

In the browser you should see:

- **Dashboard / pipeline board** — roughly 850 companies across 8 pipelines
- **Reports tab** — a list of daily scrape reports going back months

If the board is empty but the Reports tab works, the app is fine and the database connection
isn't. Open a **second** Terminal window (leave the first one running) and check:

```bash
cd ~/Desktop/MarCRM
node scripts/db-check.cjs     # connectivity + row counts
npm run sync:scan             # parses the report files, no database needed
```

`sync:scan` working while `db-check` fails means the `DATABASE_URL` is wrong or the Neon
project is paused.

---

## 5. Confirm you can push to GitHub

The repo still points at `github.com/Kadee80/MarCRM` and you're on it as a collaborator, which
is fine — nothing needs to change. Just prove the push works before you rely on it:

```bash
cd ~/Desktop/MarCRM
git pull
git commit --allow-empty -m "Mark setup check" && git push
```

If GitHub asks for a password, it wants a personal access token, not your account password —
github.com → Settings → Developer settings → Tokens (classic) → generate one with `repo` scope
and paste that when prompted. macOS will remember it after the first time.

---

## 6. The daily loop, once a scrape is running

A scrape writes report files. Two commands turn those into a visible result, and both run on
your Mac:

```bash
cd ~/Desktop/MarCRM
git add reports/ && git commit -m "Scrape $(date +%F)" && git push   # → Reports tab on the site
npm run sync                                                        # → dashboard + pipeline board
```

Push alone leaves the pipeline board unchanged. That's the single most common "the scrape is
broken" false alarm. `npm run sync` is safe to run twice — it inserts nothing the second time.

The scheduled scrape itself isn't set up yet on your side; it's a Cowork scheduled task built
from `docs/scrape-tasks/marcrm-scrape.md`. Worth doing after the app is confirmed working.

---

## What's still on Katie's accounts

You're borrowing these rather than owning them. None of it blocks setup, but it's the list to
work through next:

| Thing | State | Why it matters |
|---|---|---|
| Neon database | Katie's project, her connection string | If she deletes the project or rotates the password, your CRM goes dark |
| Brave Search key | Hers, 2,000 queries/month | Shared quota — your scrapes eat her allowance and vice versa |
| Hunter.io key | Hers, 50 lookups/month | Same |
| Vercel deployment | Her project | The public site redeploys from her account |
| The 7 AM scheduled scrape | Only in her Cowork desktop app, can't be exported | Dies with her machine unless recreated in yours |

`HANDOFF.md` in the repo has the full nine-item version with the exact steps for each.

---

## If something breaks

`RUNBOOK.md` has the troubleshooting list. The three you're most likely to hit:

- **`module is not defined` / ESM error** — a CommonJS file got named `.js`. This project has
  `"type": "module"`, so config and script files using `module.exports` must be `.cjs`.
- **`Cannot find module 'pg'`** — you ran one of the retired `scripts/archive/import-*.cjs`
  files. Use `npm run sync` instead.
- **`git commit` does nothing and reports pile up untracked** — a stale git lock. Fix:
  `rm -f .git/*.lock .git/refs/heads/*.lock`, then `git add -A && git commit -m "Catch up" && git push`.
