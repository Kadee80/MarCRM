#!/usr/bin/env node
/**
 * import-all-reports.cjs — bulk import every lead from every scrape report
 * that isn't already in Neon, in chronological order.
 *
 * Usage (from MarCRM root):
 *   node scripts/import-all-reports.cjs              # import everything missing
 *   node scripts/import-all-reports.cjs --dry-run    # preview only, nothing written
 *
 * Handles all report schema variants:
 *   - leads[] vs newLeads[]
 *   - name vs company as the lead name field
 *   - fitScore/intentScore vs nested scoring.fit/intent (June 17 format)
 *   - daily-scrape, pr-freelance-scrape, legal-freelance-scrape files
 *
 * Deduplication: skips any lead whose name already exists (case-insensitive).
 * Safe to re-run.
 *
 * Requires: DATABASE_URL in env (or .env file in project root).
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// Load .env if present (Prisma reads it automatically, but we load it here too
// so DATABASE_URL is available for any early checks).
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const REPORTS_DIR = path.join(__dirname, '..', 'reports');
const DRY_RUN     = process.argv.includes('--dry-run');

// ─── Schema normalizer ────────────────────────────────────────────────────────
// Returns a Prisma-compatible Company create object, or null if no usable name.

function normalizeLead(lead, scrapeDate) {
  const name = (lead.name || lead.company || '').trim();
  if (!name) return null;

  // Scores — flat fields or nested scoring object (June 17 format)
  const fitScore    = lead.fitScore    ?? lead.scoring?.fit    ?? 0;
  const intentScore = lead.intentScore ?? lead.scoring?.intent ?? 0;

  // fitDetails / intentDetails — stored as JSON strings in DB
  const fitDetails    = JSON.stringify(
    lead.fitDetails    || lead.scoring?.fitBreakdown    || {}
  );
  const intentDetails = JSON.stringify(
    lead.intentDetails || lead.scoring?.intentBreakdown || {}
  );

  // Funding stage — flat field or composed from fundingRound + fundingAmount
  const fundingStage = lead.fundingStage
    || [lead.fundingRound, lead.fundingAmount].filter(Boolean).join(' ')
    || '';

  // Notes — append sourceUrl, signals, grade, scrapeDate so nothing is lost
  const grade      = lead.grade ?? lead.scoring?.grade ?? gradeFromScore(fitScore + intentScore);
  const sourceUrl  = lead.sourceUrl || '';
  const signals    = Array.isArray(lead.signals) ? lead.signals : [];
  const baseNotes  = lead.notes || lead.pitchAngle || '';
  const notesParts = [baseNotes];
  if (grade)      notesParts.push(`Grade: ${grade}`);
  if (scrapeDate) notesParts.push(`Scraped: ${scrapeDate}`);
  if (sourceUrl)  notesParts.push(`Source URL: ${sourceUrl}`);
  if (signals.length) notesParts.push(`Signals:\n${signals.map(s => `• ${s}`).join('\n')}`);
  const notes = notesParts.filter(Boolean).join('\n\n');

  // Contacts — parsed from JSON array in report
  const rawContacts = Array.isArray(lead.contacts) ? lead.contacts : [];
  const contacts = rawContacts
    .filter(c => c && (c.name || c.title))
    .map(c => ({
      name:  c.name  || 'Unknown',
      title: c.title || '',
      email: c.email || '',
      linkedin: c.linkedin || '',
    }));

  return {
    name,
    website:          lead.website || lead.domain || '',
    pipeline:         lead.pipeline || '',
    industry:         lead.industry || lead.subindustry || '',
    location:         lead.location || '',
    fundingStage,
    fitScore,
    intentScore,
    fitDetails,
    intentDetails,
    source:           lead.source || 'Scrape',
    notes,
    // Freelance fields
    vertical:         lead.vertical          || '',
    subvertical:      lead.subvertical       || '',
    engagementModel:  lead.engagementModel   || '',
    buyerType:        lead.buyerType         || '',
    compensationText: lead.compensationText  || '',
    remoteFlag:       lead.remoteFlag        || '',
    employmentTypeRaw:lead.employmentTypeRaw || '',
    urgencyScore:     lead.urgencyScore      || 0,
    // Nested contacts
    contacts: contacts.length > 0
      ? { create: contacts }
      : undefined,
  };
}

function gradeFromScore(total) {
  if (total >= 80) return 'A';
  if (total >= 60) return 'B';
  if (total >= 40) return 'C';
  return 'D';
}

// ─── Report loader ────────────────────────────────────────────────────────────

function extractLeads(filePath) {
  let json;
  try {
    json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    console.warn(`  ⚠ Could not parse ${path.basename(filePath)}: ${e.message}`);
    return [];
  }

  const scrapeDate = json.scrapeDate || '';
  const rawLeads   = json.newLeads || json.leads || [];
  if (!Array.isArray(rawLeads) || rawLeads.length === 0) return [];

  const results = [];
  for (const lead of rawLeads) {
    if (!lead || typeof lead !== 'object') continue;
    const row = normalizeLead(lead, scrapeDate);
    if (row) results.push(row);
  }
  return results;
}

function typeRank(f) {
  if (f.startsWith('daily-scrape'))          return 0;
  if (f.startsWith('pr-freelance-scrape'))   return 1;
  if (f.startsWith('legal-freelance-scrape')) return 2;
  return 3;
}

function sortedReportFiles() {
  return fs.readdirSync(REPORTS_DIR)
    .filter(f =>
      f.endsWith('.json') && (
        f.startsWith('daily-scrape') ||
        f.startsWith('pr-freelance-scrape') ||
        f.startsWith('legal-freelance-scrape')
      )
    )
    .sort((a, b) => {
      const da = (a.match(/(\d{4}-\d{2}-\d{2})/) || [])[1] || '';
      const db = (b.match(/(\d{4}-\d{2}-\d{2})/) || [])[1] || '';
      if (da !== db) return da < db ? -1 : 1;
      return typeRank(a) - typeRank(b);
    });
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const files = sortedReportFiles();
  console.log(`Found ${files.length} report files in reports/\n`);

  // Collect all leads across all reports.
  const allLeads = [];
  for (const file of files) {
    const leads = extractLeads(path.join(REPORTS_DIR, file));
    for (const row of leads) allLeads.push({ row, file });
  }
  console.log(`Total leads across all reports: ${allLeads.length}\n`);

  if (DRY_RUN) {
    const byFile = {};
    for (const { row, file } of allLeads) {
      (byFile[file] = byFile[file] || []).push(row.name);
    }
    console.log('DRY RUN — leads that would be attempted:\n');
    for (const file of files) {
      if (!byFile[file]?.length) continue;
      console.log(`  ${file}`);
      byFile[file].forEach(n => console.log(`    • ${n}`));
    }
    console.log('\n(Nothing written — remove --dry-run to import.)');
    return;
  }

  // Load all existing company names once (case-insensitive comparison via lowercasing).
  const existing = await prisma.company.findMany({ select: { name: true } });
  const dbNames  = new Set(existing.map(c => c.name.toLowerCase()));
  console.log(`DB currently has ${dbNames.size} companies.\n`);

  let inserted = 0;
  let skipped  = 0;
  let errored  = 0;

  for (const { row, file } of allLeads) {
    if (dbNames.has(row.name.toLowerCase())) {
      skipped++;
      continue;
    }

    try {
      await prisma.company.create({ data: row });
      dbNames.add(row.name.toLowerCase()); // prevent dupes within the same run
      const total = row.fitScore + row.intentScore;
      console.log(`  INSERTED  ${row.name.padEnd(45)} [${row.pipeline}] (${total})  ← ${file}`);
      inserted++;
    } catch (err) {
      console.error(`  ERROR     ${row.name}: ${err.message}`);
      errored++;
    }
  }

  await prisma.$disconnect();

  console.log(`
═══════════════════════════════════════
  import-all-reports complete
  Inserted:  ${inserted}
  Skipped:   ${skipped}  (already in DB)
  Errors:    ${errored}
═══════════════════════════════════════`);
}

main().catch(async err => {
  console.error('Fatal:', err.message);
  await prisma.$disconnect();
  process.exit(1);
});
