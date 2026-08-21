#!/usr/bin/env bash
# MarCRM — publish the latest scrape.
#
# One command that does both halves of the daily loop:
#   1. commit + push reports/  -> makes them appear in the Reports tab on the site
#   2. npm run sync            -> loads the leads into the database (dashboard + pipeline board)
#
# Run it after the morning scrape:  npm run publish
#
# Safe to run twice. The sync step is idempotent, and a no-op commit is skipped.

set -u

cd "$(dirname "$0")/.." || exit 1
REPO="$(pwd)"
echo "MarCRM publish — $REPO"
echo

# --- 0. Stale git locks -------------------------------------------------------
# This repo has a recurring failure mode: a leftover .git lock makes every commit
# fail silently and reports pile up untracked for days. Clear it before starting.
if ls .git/*.lock .git/refs/heads/*.lock >/dev/null 2>&1; then
  echo "Clearing stale git locks..."
  rm -f .git/*.lock .git/refs/heads/*.lock
fi

# --- 1. Publish the report files ---------------------------------------------
echo "1/2  Publishing reports to GitHub"

git add reports/ scripts/ || { echo "  git add failed — stopping."; exit 1; }

if git diff --cached --quiet; then
  echo "  Nothing new to commit."
else
  git commit -m "MarCRM scrape $(date +%F)" || { echo "  Commit failed — stopping."; exit 1; }
  echo "  Committed."
fi

# Katie pushes front-end changes from her own machine, so pull hers before pushing yours.
# --autostash keeps any uncommitted local edits out of the way and puts them back after.
echo "  Pulling Katie's latest changes..."
if ! git pull --rebase --autostash; then
  echo
  echo "  The pull hit a conflict, so nothing was pushed."
  echo "  This usually means the same file was changed on both machines."
  echo "  Run 'git rebase --abort' to undo it, then ask Katie before retrying."
  exit 1
fi

if ! git push; then
  echo
  echo "  Push failed. Common causes:"
  echo "    - not authenticated to GitHub (use a personal access token, not a password)"
  echo "    - someone else pushed first: run 'git pull --rebase' then try again"
  echo "  The sync step below is skipped so you can fix this first."
  exit 1
fi
echo "  Pushed. Vercel will redeploy; the Reports tab picks it up from the last push."
echo

# --- 2. Load the leads into the database --------------------------------------
echo "2/2  Syncing leads into the database"

if [ ! -f .env ]; then
  echo "  No .env found — DATABASE_URL is required for the sync. Stopping."
  exit 1
fi

if ! npm run sync; then
  echo
  echo "  Sync failed. Check the database connection with: node scripts/db-check.cjs"
  exit 1
fi

echo
echo "Done. Reports tab and pipeline board are both up to date."
