# Scrape task prompts

MarCRM's lead flow is not code on a server. It is a Cowork scheduled task that runs a Claude
session, does the research, and writes report files into this repo.

That task is stored locally by the Cowork desktop app on whoever's machine set it up. It is not
in this repo, it does not appear in the account-level task list, and there is no export path.
When the project changes hands it has to be recreated by hand in the new owner's Cowork. These
files are the prompt text, kept in version control so that never happens blind.

---

## Current setup — one task

| File | Purpose |
|---|---|
| **`marcrm-scrape.md`** | **The live task prompt.** One run, 7:00 AM weekdays, all 8 pipelines, one report. |
| `freelance-rules.md` | The search rulebook the prompt references — taxonomy, title variants, boolean clusters, sources, gating rules, freelance scoring. |

Edit `freelance-rules.md` to change *what gets found*. Edit `marcrm-scrape.md` only to change
*how the run is structured*. Keeping them separate means the task prompt stays short enough to
read, and the ICP detail can grow without anyone having to re-paste a scheduled task.

## Superseded — kept as archive

`daily-lead-scrape.md` · `legal-freelance-scrape.md` · `pr-freelance-scrape.md`

These were three separate tasks (9 AM daily, 7 AM weekdays, and weekly) that `marcrm-scrape`
replaces. Keep them until the merged task has run clean for a week. Then they're history.

---

## ⚠️ All of these are reconstructions

They were rebuilt in August 2026 from project memory and from the structure of the actual
report output, because the original task prompts could not be read from outside the desktop
app. They are close, and they run — but they are not guaranteed byte-identical to what was
producing reports before.

**Verify once, against the originals, before the original tasks are deleted.** Open each
scheduled task in the Cowork app, copy the real prompt, and diff it against the three archived
files here — then fold anything missing into `marcrm-scrape.md` or `freelance-rules.md`. After
that, these files are the source of truth.

---

## To create the task

In Cowork, create a scheduled task, paste the prompt section of `marcrm-scrape.md` as the task
prompt, and set it to 7:00 AM on weekdays. The task needs the MarCRM folder connected as a
workspace folder, and the machine's `.env` must have `BRAVE_SEARCH_API_KEY` set.

## Rules that apply to any scrape here

- The report goes in `reports/` as **both** `.json` (read by the Reports tab) and `.md` (for humans)
- The filename must start with `daily-scrape-` — `src/app/api/reports/route.js` filters on that
  prefix, and anything else is invisible in the UI
- Deduplicate every lead against all company names already present in `reports/*.json`
- Never write a CommonJS file as `.js` — this repo is ESM, use `.cjs`
- Database writes cannot run from the cloud sandbox. The report is the deliverable;
  `npm run sync` is run locally afterward
- Check `git status --porcelain` at the start; if prior days' files are untracked, the git locks
  are stale — say so rather than retrying the commit
