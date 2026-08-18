#!/usr/bin/env bash
#
# MarCRM local cleanup — run this on your own Mac, from the repo root.
#
#   bash scripts/cleanup-local.sh            # show what it would do, change nothing
#   bash scripts/cleanup-local.sh --apply    # actually do it
#
# Everything in here needs git-index write access, which the Cowork sandbox does not have
# (stale .git/*.lock files can't be removed from there, and `git add` fails silently).
# That's why this is a script you run rather than something already done for you.
#
# It does NOT push. Review `git log` and `git status`, then push yourself.

set -euo pipefail

APPLY=false
[[ "${1:-}" == "--apply" ]] && APPLY=true

cd "$(dirname "$0")/.."
REPO="$(pwd)"

say()  { printf '\n\033[1m%s\033[0m\n' "$*"; }
step() { printf '  %s\n' "$*"; }
run()  { if $APPLY; then eval "$@"; else printf '  would run: %s\n' "$*"; fi }

if ! $APPLY; then
  printf '\n\033[33mDRY RUN\033[0m — nothing will change. Re-run with --apply to commit.\n'
fi
say "Repo: $REPO"

# ── 1. Clear stale git locks ─────────────────────────────────────────────────
# These accumulate because scrape runs try to commit from the sandbox and can't clean up
# after themselves. One stale lock silently breaks every commit until it's removed.
say "1. Stale git locks"
# Only the locks that actually block commits, and only when no git process is running —
# a blanket delete of every .git/**/*.lock can yank a lock out from under a live gc or
# fetch. Anything else that looks like a lock is reported, not removed.
if pgrep -x git >/dev/null 2>&1; then
  step "a git process is running — skipping. Let it finish, then re-run."
else
  FOUND=false
  for lock in .git/index.lock .git/HEAD.lock .git/config.lock .git/refs/heads/*.lock; do
    [[ -e "$lock" ]] || continue
    FOUND=true
    step "found: $lock  ($(stat -f '%Sm' "$lock" 2>/dev/null || stat -c '%y' "$lock" 2>/dev/null))"
    run "rm -f '$lock'"
  done
  $FOUND || step "none of the blocking locks present — good"

  OTHER=$(find .git -maxdepth 3 -name '*.lock' 2>/dev/null \
    | grep -vE '\.git/(index|HEAD|config)\.lock|\.git/refs/heads/' || true)
  if [[ -n "$OTHER" ]]; then
    echo "$OTHER" | sed 's/^/  other lock (left alone): /'
    step "these are usually git's own housekeeping — only remove by hand if commits still fail"
  fi
fi

# ── 2. Stop tracking OS and log noise ────────────────────────────────────────
# .gitignore now covers these, but files already in the index stay tracked until removed.
# --cached means the local file stays; only git stops following it.
say "2. Untrack .DS_Store and sync.log"
for f in .DS_Store sync.log; do
  if git ls-files --error-unmatch "$f" >/dev/null 2>&1; then
    step "tracked: $f"
    run "git rm --cached --quiet '$f'"
  else
    step "not tracked: $f"
  fi
done
# Any .DS_Store in subdirectories too.
NESTED=$(git ls-files '*/.DS_Store' || true)
if [[ -n "$NESTED" ]]; then
  echo "$NESTED" | sed 's/^/  tracked: /'
  run "git ls-files '*/.DS_Store' -z | xargs -0 git rm --cached --quiet"
fi

# ── 3. Archive the superseded per-day import scripts ─────────────────────────
# scripts/import-YYYY-MM-DD.cjs was the old one-file-per-scrape import path. It's been
# replaced by the idempotent scripts/sync-all-leads.cjs (`npm run sync`). Six of them
# require('pg'), which isn't even a dependency — they fail on sight. They're kept rather
# than deleted because they document what was imported when.
say "3. Archive superseded import scripts"
COUNT=$(ls scripts/import-*.cjs 2>/dev/null | wc -l | tr -d ' ')
if [[ "$COUNT" == "0" ]]; then
  step "already archived"
else
  step "$COUNT files -> scripts/archive/"
  run "mkdir -p scripts/archive"
  run "git mv scripts/import-*.cjs scripts/archive/ 2>/dev/null || mv scripts/import-*.cjs scripts/archive/"
fi

# ── 4. Archive the stale root component copy ─────────────────────────────────
# The live component is src/components/AgencyCRM.jsx. The copy at the repo root is a much
# older snapshot that nothing imports, and it's confusing to have both.
say "4. Archive the stale root AgencyCRM.jsx"
if [[ -f AgencyCRM.jsx ]]; then
  step "AgencyCRM.jsx -> archive/AgencyCRM.original.jsx"
  run "mkdir -p archive"
  run "git mv AgencyCRM.jsx archive/AgencyCRM.original.jsx 2>/dev/null || mv AgencyCRM.jsx archive/AgencyCRM.original.jsx"
else
  step "already archived"
fi

# ── 5. Stray files in reports/ ───────────────────────────────────────────────
# reports/ should hold only .json and .md. Anything else is dropped by the Reports API
# but clutters the folder.
say "5. Stray files in reports/"
STRAY=$(find reports -maxdepth 1 -type f ! -name '*.json' ! -name '*.md' 2>/dev/null || true)
if [[ -z "$STRAY" ]]; then
  step "none"
else
  echo "$STRAY" | sed 's/^/  stray: /'
  step "left in place on purpose — check them, then remove by hand"
fi

# ── 6. Commit ────────────────────────────────────────────────────────────────
say "6. Commit"
if $APPLY; then
  git add -A
  if git diff --cached --quiet; then
    step "nothing to commit"
  else
    git commit -q -m "Repo cleanup: untrack OS noise, archive superseded import scripts"
    step "committed — review with 'git log -1 --stat', then 'git push'"
  fi
else
  step "would run: git add -A && git commit"
fi

say "Done."
if ! $APPLY; then
  printf 'Re-run with --apply when the plan above looks right.\n\n'
fi
