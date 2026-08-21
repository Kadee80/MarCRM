/**
 * MarCRM — Sync All Leads (idempotent backfill, Prisma)
 * --------------------------------------------------------------
 * Scans every reports/*.json file, normalizes each lead across the
 * different report shapes (daily-scrape uses `newLeads`; the older
 * pr-/legal-freelance reports use `leads`; field names vary), dedups
 * by company name, and inserts ONLY the leads not already in the DB.
 *
 * Uses Prisma Client (the same DB layer the app uses) — no `pg` needed.
 *
 * Safe to run any time, as many times as you like — it never
 * duplicates and never touches existing rows.
 *
 * Usage (from project root):
 *   node scripts/sync-all-leads.cjs            # sync: insert missing leads
 *   node scripts/sync-all-leads.cjs --dry-run  # compare to DB, print plan, insert nothing
 *   node scripts/sync-all-leads.cjs --scan     # parse reports only, no DB needed
 *
 * Or via npm:  npm run sync  /  npm run sync:dry  /  npm run sync:scan
 *
 * Requires (except for --scan): DATABASE_URL in environment (Neon connection string).
 *
 * Schema note: the Company model has no grade/signals/sourceUrl/scrapeDate
 * columns, so those are folded into `notes` (grade + combined score prefix,
 * signals appended) and `source` (source + url) so no scraped context is lost.
 * Contacts are created via Prisma's nested relation write.
 */

const fs = require('fs');
const path = require('path');

const REPORTS_DIR = path.join(__dirname, '..', 'reports');

const DRY_RUN = process.argv.includes('--dry-run');
const SCAN_ONLY = process.argv.includes('--scan');

// ---- helpers ---------------------------------------------------

function firstDefined(...vals) {
  for (const v of vals) {
    if (v !== undefined && v !== null && v !== '') return v;
  }
  return '';
}

function asJsonString(val, fallback) {
  if (val === undefined || val === null) return JSON.stringify(fallback);
  if (typeof val === 'string') return val; // already serialized
  return JSON.stringify(val);
}

function num(val) {
  const n = Number(val);
  return Number.isFinite(n) ? n : 0;
}

function gradeFor(combined) {
  if (combined >= 80) return 'A';
  if (combined >= 60) return 'B';
  if (combined >= 40) return 'C';
  return 'D';
}

function dateFromFilename(f) {
  const m = f.match(/(\d{4}-\d{2}-\d{2})/);
  return m ? m[1] : '';
}

function normalizeContacts(raw) {
  const list = Array.isArray(raw.contacts) ? raw.contacts : [];
  const out = [];
  for (const c of list) {
    if (!c || typeof c !== 'object') continue;
    const name = String(firstDefined(c.name)).trim();
    if (!name) continue; // Contact.name is required
    out.push({
      name,
      title: String(firstDefined(c.title)),
      email: String(firstDefined(c.email)),
      linkedin: String(firstDefined(c.linkedin)),
    });
  }
  return out;
}

// Build the notes field, folding in grade, combined score and signals
// (which have no dedicated columns in the Company model).
function buildNotes(raw, grade, combined) {
  const base = String(firstDefined(raw.notes)).trim();
  const prefix = `[${grade} · ${combined}]`;
  const signals = Array.isArray(raw.signals) ? raw.signals : [];
  let out = base ? `${prefix} ${base}` : prefix;
  if (signals.length) {
    out += `\n\nSignals:\n` + signals.map((s) => `• ${s}`).join('\n');
  }
  return out;
}

// Normalize one raw lead object (any report shape) into Prisma Company data.
function normalize(raw, sourceFile) {
  const name = String(firstDefined(raw.name, raw.company)).trim();
  if (!name) return null;

  const fit = num(firstDefined(raw.fitScore, raw.fit_score));
  const intent = num(firstDefined(raw.intentScore, raw.intent_score));
  const combined = num(firstDefined(raw.combinedScore, raw.totalScore)) || fit + intent;
  const grade = String(firstDefined(raw.grade, gradeFor(combined)));

  const source = String(firstDefined(raw.source));
  const sourceUrl = String(firstDefined(raw.sourceUrl, raw.source_url));

  const data = {
    name,
    website: String(firstDefined(raw.website, raw.domain)),
    pipeline: String(firstDefined(raw.pipeline)),
    industry: String(firstDefined(raw.industry, raw.subindustry)),
    location: String(firstDefined(raw.location)),
    fundingStage: String(firstDefined(raw.fundingStage, raw.stage, raw.fundingRound)),
    fitScore: fit,
    intentScore: intent,
    fitDetails: asJsonString(firstDefined(raw.fitDetails, raw.fit_details), {}),
    intentDetails: asJsonString(firstDefined(raw.intentDetails, raw.intent_details), {}),
    roleTitle: String(firstDefined(raw.roleTitle, raw.role_title, raw.role)),
    vertical: String(firstDefined(raw.vertical)),
    subvertical: String(firstDefined(raw.subvertical)),
    engagementModel: String(firstDefined(raw.engagementModel, raw.engagement_model)),
    buyerType: String(firstDefined(raw.buyerType, raw.buyer_type)),
    compensationText: String(firstDefined(raw.compensationText, raw.compensation_text)),
    remoteFlag: String(firstDefined(raw.remoteFlag, raw.remote_flag)),
    employmentTypeRaw: String(firstDefined(raw.employmentTypeRaw, raw.employment_type_raw)),
    urgencyScore: num(firstDefined(raw.urgencyScore, raw.urgency_score)),
    source: sourceUrl ? (source ? `${source} (${sourceUrl})` : sourceUrl) : source || 'Daily scrape',
    lastActivity: String(firstDefined(raw.scrapeDate, raw.scrape_date, dateFromFilename(sourceFile))),
    notes: buildNotes(raw, grade, combined),
  };

  const contacts = normalizeContacts(raw);

  return { data, contacts, _combined: combined, _grade: grade, _name: name, _sourceFile: sourceFile, _pipeline: data.pipeline };
}

// Read every report and return a de-duplicated Map<lowerName, lead>.
// When the same company appears in multiple reports, keep the one with
// the highest combined score (i.e. the best-characterized version).
function collectLeads() {
  const files = fs
    .readdirSync(REPORTS_DIR)
    .filter((f) => f.endsWith('.json'))
    .sort();

  const byName = new Map();
  let rawCount = 0;
  let fileCount = 0;

  for (const file of files) {
    let data;
    try {
      data = JSON.parse(fs.readFileSync(path.join(REPORTS_DIR, file), 'utf8'));
    } catch (e) {
      console.warn(`WARN: could not parse ${file} — ${e.message}`);
      continue;
    }
    fileCount++;
    const arr = Array.isArray(data.newLeads)
      ? data.newLeads
      : Array.isArray(data.leads)
      ? data.leads
      : [];

    for (const raw of arr) {
      if (!raw || typeof raw !== 'object') continue;
      const lead = normalize(raw, file);
      if (!lead) continue;
      rawCount++;
      const key = lead._name.toLowerCase();
      const existing = byName.get(key);
      if (!existing || lead._combined > existing._combined) {
        byName.set(key, lead);
      }
    }
  }

  return { byName, rawCount, fileCount };
}

// ---- main ------------------------------------------------------

async function main() {
  const { byName, rawCount, fileCount } = collectLeads();
  const unique = [...byName.values()].sort(
    (a, b) => b._combined - a._combined || a._name.localeCompare(b._name)
  );

  console.log(
    `Scanned ${fileCount} report file(s): ${rawCount} lead rows → ${unique.length} unique companies.`
  );

  if (SCAN_ONLY) {
    console.log('\n--scan mode (no DB). Unique companies found:\n');
    for (const l of unique) {
      console.log(
        `  ${String(l._combined).padStart(3)}  ${l._grade}  ${l._pipeline.padEnd(16)}  ${l._name}`
      );
    }
    return;
  }

  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();

  let imported = 0;
  let skipped = 0;
  try {
    // Pull all existing names once.
    const existingRows = await prisma.company.findMany({ select: { name: true } });
    const existing = new Set(existingRows.map((r) => r.name.toLowerCase()));

    const missing = unique.filter((l) => !existing.has(l._name.toLowerCase()));
    console.log(
      `DB has ${existing.size} companies. ${missing.length} missing, ${unique.length - missing.length} already present.`
    );

    if (DRY_RUN) {
      console.log('\n--dry-run: the following would be inserted (nothing written):\n');
      for (const l of missing) {
        console.log(`  + ${l._grade}  ${l._pipeline.padEnd(16)}  ${l._name}  (from ${l._sourceFile})`);
      }
      console.log(`\nTotal to insert: ${missing.length}`);
      return;
    }

    if (missing.length === 0) {
      console.log('Nothing to import — DB already in sync.');
      return;
    }

    for (const lead of missing) {
      // Re-check in case a name collision appeared mid-run.
      const dup = await prisma.company.findFirst({
        where: { name: { equals: lead._name, mode: 'insensitive' } },
        select: { id: true },
      });
      if (dup) {
        console.log(`SKIP (exists): ${lead._name}`);
        skipped++;
        continue;
      }
      const createData = { ...lead.data };
      if (lead.contacts.length) {
        createData.contacts = { create: lead.contacts };
      }
      await prisma.company.create({ data: createData });
      console.log(
        `IMPORTED: ${lead._name} → ${lead._pipeline} (${lead._grade}, ${lead._combined}) [${lead._sourceFile}]`
      );
      imported++;
    }
    console.log(`\nDone. Imported: ${imported}, Skipped: ${skipped}.`);
  } catch (err) {
    console.error('Sync failed:', err.message);
    throw err;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
