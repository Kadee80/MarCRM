# Pushing starred leads to the Command Center

One-time setup, then the daily loop is one extra command.

## The daily loop, once this is set up

```
morning:   (the scrape runs on its own)
           cd ~/Desktop/MarCRM && npm run publish     # reports → GitHub, leads → Neon
during the day:
           open the web app, star the leads worth pursuing
whenever:  npm run push:starred                       # starred leads → Command Center sheets
```

Starring already works — `starred` is a real column in Neon and the star button in the app
writes to it. Nothing about the app needs to change.

Routing is automatic and matches the scrape's rule:

| Pipeline | Goes to |
|---|---|
| `legal-freelance`, `pr-freelance` | Application Tracker (Master) |
| the six agency pipelines | BD Pipeline (Master) |

Running it twice is safe. Rows are deduplicated by company name against what is already in
each sheet, so a second run adds nothing. Leads stay starred after a push — the star is a
shortlist marker, not a queue. Unstar one in the app if you want it to stop being considered.

---

## One-time setup (about five minutes)

### 1. Make up a shared secret

Any long random string. This is what stops a stranger who guesses the URL from writing to
your sheets. For example:

```bash
openssl rand -hex 24
```

Copy the output.

### 2. Create the Apps Script

1. Open **Business Development Pipeline (Master)** in Google Sheets.
2. **Extensions → Apps Script**. A new tab opens with an empty `Code.gs`.
3. Delete whatever is in it, and paste the entire contents of
   `scripts/apps-script/Code.gs` from this repo.
4. On line 22, replace `REPLACE_ME_WITH_A_LONG_RANDOM_STRING` with the secret from step 1.
5. Save (the disk icon).

> The two `SHEET_IDS` values are already filled in and correct. If either sheet is ever
> recreated, update them — the ID is the long string in the sheet's URL between `/d/` and
> `/edit`.

### 3. Authorize it

In the Apps Script editor, pick `testConnection` from the function dropdown and press **Run**.
Google will ask you to authorize — approve it. (It will warn that the script is unverified;
that is expected for your own script. Choose *Advanced → Go to project*.)

You should see both sheet names in the execution log. If you do, the script can reach them.

### 4. Deploy it as a web app

1. **Deploy → New deployment**.
2. Click the gear next to "Select type" and choose **Web app**.
3. Set:
   - *Execute as*: **Me**
   - *Who has access*: **Anyone**
4. **Deploy**, then copy the **Web app URL**. It ends in `/exec`.

> "Anyone" sounds alarming but is required for a script to call it without an OAuth dance.
> The URL is unguessable and the shared secret is checked on every request. Do not paste the
> URL anywhere public.

### 5. Put both values in `.env`

Add these two lines to `~/Desktop/MarCRM/.env`:

```
SHEETS_WEBAPP_URL=https://script.google.com/macros/s/AKfy...../exec
SHEETS_WEBAPP_TOKEN=the-secret-from-step-1
```

`.env` is gitignored, so these stay on your machine.

### 6. Add the npm shortcut

In `package.json`, inside `"scripts"`, add:

```json
"push:starred": "node scripts/push-starred.cjs",
```

(You can skip this and run `node scripts/push-starred.cjs` directly if you prefer.)

### 7. Try it

```bash
npm run push:starred -- --dry    # shows exactly what would be sent, sends nothing
npm run push:starred             # actually sends
```

---

## The Role/Title migration

The Application Tracker has a **Role/Title** column, and until this migration is applied it
will be blank for every freelance lead — `Company` had no field to hold a job title.

Three pieces, all included in this change:

1. `prisma/schema.prisma` — new `roleTitle` field on `Company` (additive, defaults to `""`).
2. `scripts/sync-all-leads.cjs` — maps `roleTitle` from the report JSON into the database.
3. `docs/scrape-tasks/*` — the scrape now emits `roleTitle` on every freelance lead.

To apply, on your Mac:

```bash
cd ~/Desktop/MarCRM
npx prisma db push
```

**This changes the shared Neon database, so tell Katie before running it.** It is additive
with a default, so it cannot break her code or existing rows — but she should know.

Leads scraped *before* this lands will have a blank `roleTitle` forever; only new scrapes fill
it. `push-starred.cjs` warns by name when it pushes a lead with no role rather than writing a
silent blank.

---

## Troubleshooting

**"the web app did not return JSON"** — the deployment's *Who has access* is not set to
"Anyone", or you copied the editor URL instead of the `/exec` deployment URL. Redeploy and
recopy.

**"bad token"** — the string in `.env` and the one on line 22 of `Code.gs` do not match.

**Rows appear below the legend** — shouldn't happen; the script finds the `LEGEND` row and
writes above it. If a sheet's legend block was renamed, restore the word `LEGEND` in column A.

**Nothing is pushed but leads are starred** — check they are not archived; the query is
`starred: true, archived: false`.

**Changed the Apps Script?** Deploy → Manage deployments → edit → Version: New version.
Editing the code alone does not update the live `/exec` endpoint.
