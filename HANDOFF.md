# MarCRM — Handoff to Mark

**Model: full transfer.** Mark ends up owning everything; Katie ends up with no required
access and no standing obligation.

Vercel is the visible piece and the easy one. Everything below is the part that is *not* on
Vercel — the accounts, keys, scheduled tasks, and the two manual steps that only ever run on
somebody's laptop. Most of the risk in this handoff is in items 3, 5, and 8.

---

## The short version

Nine things have to move, in this order:

1. **Unpushed work** — 28 files are sitting uncommitted right now behind a stale git lock
2. **GitHub repo** — `github.com/Kadee80/MarCRM`, personal account
3. **Neon Postgres** — the actual CRM data, ~850 companies plus all contacts and notes
4. **Vercel project** — including the env vars, and a re-link after the GitHub transfer
5. **The Cowork scheduled tasks** — these live only in Katie's desktop app and cannot be
   exported programmatically. Katie's three are merged into one for Mark (§8c)
6. **Three API keys** — Brave Search, Hunter.io, and whatever RocketReach arrangement exists
7. **Project memory** — nine Cowork memory files that do not transfer between accounts
   *(already handled — ported into `CLAUDE.md`)*
8. **The local machine steps** — `npm run sync` and `git push` are done by a human on a Mac
9. **Two open decisions** that should be made before, not after, the switch

---

## 0. Before anything else: back up and unblock

There are **28 uncommitted files** in the repo, including the Aug 13, Aug 14, and Aug 18
reports for all three scrape types, and edits to `scripts/db-check.cjs`. The last commit is
`72715d8 Legal Freelance scrape 2026-08-11`. A stale `.git/index.lock` is blocking the
commit — this has happened before and it fails silently.

Run these locally, on Katie's Mac, first:

```bash
cd ~/Desktop/MarCRM
rm -f .git/*.lock .git/refs/heads/*.lock
git add -A
git commit -m "Catch up reports through 2026-08-18"
git push
```

Then take a database snapshot before any ownership changes:

```bash
pg_dump "$DATABASE_URL" -Fc -f ~/Desktop/marcrm-backup-$(date +%F).dump
```

Keep that dump somewhere neither transfer can touch. If a Neon migration goes wrong, this
file is the whole CRM.

---

## 1. GitHub — `github.com/Kadee80/MarCRM`

The repo is under Katie's personal GitHub account, so it cannot be handed over by adding a
collaborator; it has to be transferred.

- Mark creates a GitHub account (or an org) if he doesn't have one
- Repo → **Settings → General → Danger Zone → Transfer ownership** → Mark's account
- Mark accepts the transfer by email

**Consequences to plan for:**

- The repo URL changes. Katie's local clone keeps pointing at the old path (GitHub redirects,
  but don't rely on it). Mark clones fresh:
  `git clone https://github.com/<mark>/MarCRM.git`
- **The Vercel git integration breaks on transfer** and has to be reconnected. Do the GitHub
  transfer and the Vercel reconnect in the same sitting, not a week apart.
- Katie should be removed as a collaborator after Mark confirms he can push.

---

## 2. Neon Postgres — the actual data

Project host: `ep-silent-moon-a42be4c4.us-east-1.aws.neon.tech`, database `neondb`.
This holds every company, contact, engagement, note, todo and milestone — including the
pipeline timeline that Mark specifically asked for. Losing this is the only truly
unrecoverable outcome in the handoff, which is why the `pg_dump` above comes first.

Two ways to move it:

**Option A — transfer the Neon project (cleaner).** Neon supports transferring a project
between organizations. Mark creates a Neon account and org; Katie transfers the project into
it, then removes herself. The connection string stays the same, so nothing in Vercel or in
anyone's `.env` needs editing. Fewest moving parts.

**Option B — Mark creates a fresh Neon project and you restore into it.**

```bash
# on Mark's side, after creating an empty Neon database
pg_restore -d "<mark's DATABASE_URL>" --no-owner --no-acl marcrm-backup-<date>.dump
```

Then update `DATABASE_URL` in Vercel and in Mark's local `.env`. Use this option if
transferring the project turns out to need a paid plan, or if you want a clean break from
Katie's Neon billing.

Either way: **rotate the database password afterward.** The current connection string has
been in Katie's `.env`, in sandbox environments, and in months of session history.

---

## 3. Vercel

You said this one's understood, so just the two things people get wrong:

- The project's **environment variables do not travel with the GitHub transfer.** Mark has to
  re-add `DATABASE_URL`, `BRAVE_SEARCH_API_KEY` and `HUNTER_API_KEY` in his own Vercel
  project settings. See `.env.example`.
- If there is a **custom domain** on the deployment, the domain has to be moved or re-pointed
  separately, and DNS lives wherever the domain was registered — not in Vercel. Worth
  checking before the switch rather than discovering it when the site 404s.

---

## 4. The three scheduled scrapes — the piece most likely to be dropped

The daily lead flow is not code. It is **Cowork scheduled tasks running in Katie's desktop
app** — stored locally, absent from the account-level task list, with **no export or transfer
path**. Mark has to recreate them by hand in his own Cowork, pointed at his own clone.

Katie ran three separate tasks:

| Task | Schedule | Output |
|---|---|---|
| `daily-lead-scrape` | 9:00 AM daily | `reports/daily-scrape-<date>.json` + `.md` |
| `legal-freelance-scrape` | 7:00 AM weekdays | `reports/legal-freelance-scrape-<date>.json` + `.md` |
| `pr-freelance-scrape` | weekly, 7-day window | `reports/pr-freelance-scrape-<date>.json` + `.md` |

**These have been merged into one task for the handoff.** Mark creates a single
`marcrm-scrape` — 7:00 AM weekdays, all 8 pipelines, one report per day — from
`docs/scrape-tasks/marcrm-scrape.md`. The deep freelance search rules live alongside it in
`freelance-rules.md`, which the prompt references, so the ICP can be edited without re-pasting
a scheduled task. See §8c for why the merge was worth doing.

Reconstructed prompt text is in **`docs/scrape-tasks/`**, including the three original prompts
kept as archive. Those files were rebuilt from project memory and from the structure of the
actual report output, so treat them as a strong draft, not a byte-perfect copy:

> **Katie — before the switch, open each of your three scheduled tasks in Cowork, copy the real
> prompt text, and diff it against the matching archive file in `docs/scrape-tasks/`.** Fold
> anything missing into `marcrm-scrape.md` or `freelance-rules.md`. Fixing this now takes ten
> minutes. Discovering the drift after your tasks are deleted means reverse-engineering them
> from report output.

Once they live in the repo, they are versioned and Mark can edit them like anything else.

Mark's Cowork setup, on his Mac:

1. Clone the repo, `npm install`, create `.env` from `.env.example`
2. Add the MarCRM folder as a Cowork workspace folder
3. Create **one** scheduled task from `docs/scrape-tasks/marcrm-scrape.md`, set to 7:00 AM weekdays
4. Confirm GitHub push access from his machine (`git push` on a trivial commit)

---

## 5. API keys and third-party accounts

Every one of these is registered under Katie's email. Quotas are **per account**, so sharing a
key means sharing a monthly allowance — Mark should get his own for each.

| Key | Service | Notes |
|---|---|---|
| `BRAVE_SEARCH_API_KEY` | Brave Search API | **Required.** Free tier, 2,000 queries/month, no card. Reddit and social scraping stop working without it. |
| `HUNTER_API_KEY` | Hunter.io | Contact enrichment. Free tier is 50 searches/month; the `EnrichmentLog` table tracks usage against that limit. |
| `ROCKETREACH_API_KEY` | RocketReach | Currently commented out in `.env`. The PR person reportedly already pays for RocketReach — confirm whose account and whether Mark inherits it. |
| `PROXYCURL` / `CRUNCHBASE` / `CLEARBIT` | — | Present as commented-out placeholders, never enabled. Safe to delete from `.env.example` if nobody plans to use them. |

**After the switch, revoke or delete Katie's keys.** Don't just stop using them — they have
been in `.env`, in cloud sandboxes, and in session transcripts.

---

## 6. Cowork project memory

Nine memory files in Katie's Cowork account carried the operating knowledge for this project:
the ESM/`.cjs` rule, Prisma-not-`pg`, report file formats, the git-lock failure mode, the
sandbox's inability to reach Neon, and Mark's own routing rule.

**Memory does not transfer between Cowork accounts.** Without it, Mark's Claude would
rediscover every one of those constraints by breaking the build.

This is already handled: it has been ported into **`CLAUDE.md`** at the repo root, which
Claude reads automatically in any session working in this folder. It travels with the repo and
Mark can edit it. Nothing further is needed here — just don't delete it.

---

## 7. The two manual steps that live on a laptop

This is the part that quietly breaks after a handoff, because it isn't automated anywhere.

The Cowork cloud sandbox **cannot reach Neon**. So after every scrape:

```bash
cd ~/MarCRM
git add reports/ scripts/ && git commit -m "Scrape <date>" && git push   # → Reports tab
npm run sync                                                            # → dashboard + pipeline board
```

`git push` makes the report visible on the site. `npm run sync` is what puts the leads in the
database, which is what the pipeline board reads. Skip the sync and Mark sees reports but an
unchanged board — and will reasonably conclude the scrape is broken.

Prerequisites on Mark's Mac: Node 18+, git, `npm install` run once, `.env` populated.

Also check whether Katie has a **local cron or launchd job** doing any of this automatically —
`crontab -l` and `ls ~/Library/LaunchAgents`. If one exists, it dies with her machine and
needs recreating on his. If none exists, consider setting one up for `npm run sync` so it
doesn't depend on Mark remembering.

See `RUNBOOK.md` for the full day-to-day version.

---

## 8. Two decisions to make before the switch, not after

**The two freelance pipelines are ambiguous about who they serve.**
`src/lib/constants.js` describes `legal-freelance` and `pr-freelance` as roles "for Katie", and
the legal reports are written in those terms — "why it matters for Katie", "below Katie's
level". But the August PR-freelance report is written for Mark, and the ICP that drives both
came from Mark. Under a full transfer, decide explicitly:

- Do both freelance pipelines go to Mark and get re-pointed at his profile and rate card?
- Does `legal-freelance` stay with Katie, meaning it should be removed from the handed-off
  CRM (and its ~450 scored leads exported first)?
- Or do they get retired entirely?

The pipeline descriptions in `constants.js` and the scrape prompts in `docs/scrape-tasks/`
both need editing to match whatever is decided. Leaving it ambiguous means Mark's scrapes keep
scoring leads against the wrong person.

**The historical lead data was scored against the old ICP.**
You mentioned Mark may bring entirely new ICP prompts. If the rubrics change, ~850 existing
companies carry scores that are no longer comparable to new ones. Options: keep as-is and
accept mixed vintages, stamp the old records with a scoring-version note, or re-score the
A/B-graded subset. Cheapest reasonable answer is to add a note on existing records and only
re-score what's still in an active pipeline stage.

---

## 8b. One bug worth fixing before Mark inherits it

`src/app/api/reports/route.js` filters reports with `f.startsWith("daily-scrape-")`. It has
always done this. The consequence: the Reports tab shows **only** the daily scrape.

As of today there are 76 `daily-scrape-*.json` files and **128** freelance report files —
`pr-freelance-scrape-*.json` and `legal-freelance-scrape-*.json` — that are committed,
deployed, and invisible in the UI. Two of the three scheduled scrapes have never had their
reports appear on the site.

The leads themselves are not lost. `sync-all-leads.cjs` reads every `reports/*.json`, so those
companies do reach the database and the pipeline board. It's the Reports tab alone that hides
them.

**The merge in §8c sidesteps this going forward** — the single task writes everything into
`daily-scrape-*.json`, so freelance leads appear in the Reports tab for the first time with no
code change. The 128 historical files stay hidden until someone widens the filter, which is
still worth doing as a one-line change plus a report-type label in the UI.

---

## 8c. The three scrapes are now one task

Katie ran three scheduled tasks. Mark gets one: **`marcrm-scrape`, 7:00 AM weekdays, all 8
pipelines, one report per day** — `docs/scrape-tasks/marcrm-scrape.md`.

| | Before | After |
|---|---|---|
| Tasks to maintain | 3 | 1 |
| Runs per weekday | up to 3 | 1 |
| Report files per day | up to 3 | 1 |
| Dedup baseline | per-task, cross-referenced | one shared list |
| Visible in Reports tab | daily only (128 files hidden) | everything |
| ICP edits | 3 places, drifted | 1 prompt + 1 rules file |

The deep search rules — 4-bucket taxonomy, 19 legal title variants, boolean clusters, sources,
gating rules, freelance scoring — moved into `docs/scrape-tasks/freelance-rules.md`, which the
prompt references. That keeps the task prompt short enough to actually read, and lets Mark
retune the ICP without re-pasting a scheduled task.

**The merge also fixes a real consistency bug.** Running the pipelines separately meant a
company could get two verdicts in one morning. On 2026-08-18 the daily scrape reported Visier,
Norven and Keyloop as legal-freelance leads while the dedicated legal scrape dropped all three
for being UK/Canada-only — same companies, same day, opposite calls, two reports. One pass over
one dedup list, applying the gates once, removes that class of error. (Straight duplicate
company names were rarer — 5 days out of 63 where both ran — because the scrapes did
cross-check each other's reports. The inconsistent *treatment* was the bigger problem.)

**What to watch:** freelance work loses its dedicated session, so there is more ground to cover
in one run. If freelance yield drops noticeably over the first fortnight, split the boolean
clusters across weekdays rather than reverting to three tasks — the note at the bottom of
`marcrm-scrape.md` explains how.

---

## 9. Suggested sequence

| # | Step | Who |
|---|---|---|
| 1 | Clear git locks, commit and push the 28 outstanding files | Katie |
| 2 | `pg_dump` backup of Neon, stored off both accounts | Katie |
| 3 | Verify the reconstructed prompts in `docs/scrape-tasks/` against the real tasks | Katie |
| 4 | Mark creates: GitHub account, Vercel account, Neon account, Brave key, Hunter key | Mark |
| 5 | Transfer GitHub repo → accept → Mark clones fresh | Both |
| 6 | Reconnect Vercel to the transferred repo, re-add env vars | Mark |
| 7 | Transfer or restore the Neon project; rotate the DB password | Both |
| 8 | Mark sets up Cowork: workspace folder, the one `marcrm-scrape` task, local `npm install` + `.env` | Mark |
| 9 | Parallel run for one week — Mark's tasks live, Katie's still on, compare output | Both |
| 10 | Katie disables her scheduled tasks, revokes her API keys, removes her repo/Vercel/Neon access | Katie |

Step 9 is worth the week. It is the only cheap way to find out that a scrape silently produces
nothing on a machine that isn't Katie's.

---

## What Katie still has to do by hand

Nothing in this repo can do these — they are account actions in someone else's UI:

- GitHub repo transfer and accepting it
- Vercel project ownership / reconnect and env vars
- Neon project transfer or restore, and password rotation
- Copying the three scheduled-task prompts out of the Cowork desktop app, and diffing them
  against the archived reconstructions before anything is deleted
- Revoking Brave, Hunter, and RocketReach keys
- Deleting her three Cowork scheduled tasks once Mark's single task is confirmed working
