/**
 * MarCRM Import Script — 2026-07-07 (Prisma)
 * --------------------------------------------------------------
 * Daily scrape: 6 new leads
 *   pr-marketing (6): Straiker, MDOTM, Taxwire, KredosAi, Nomerra, Dawnguard
 *
 * Uses Prisma Client (the same DB layer the app uses) — NOT `pg`.
 * The Company model has no grade/signals/sourceUrl/scrapeDate columns,
 * so those are folded into `notes` (grade + combined prefix, signals
 * appended) and `source` (source + url). Contacts are created via
 * Prisma's nested relation write.
 *
 * Deduplicates by company name (case-insensitive); skips existing.
 * Safe to re-run — never duplicates, never touches existing rows.
 *
 * Run from project root:
 *   node scripts/import-2026-07-07.cjs            # insert missing leads
 *   node scripts/import-2026-07-07.cjs --dry-run  # print plan, write nothing
 *
 * Requires (except --dry-run): DATABASE_URL in environment (Neon).
 * Prisma auto-loads .env, so DATABASE_URL is picked up automatically.
 *
 * NOTE: This reads the leads straight from the report JSON so the two
 * never drift. `npm run sync` (sync-all-leads.cjs) covers the same rows
 * idempotently across all reports — either path works.
 */

const fs = require('fs');
const path = require('path');

const DRY_RUN = process.argv.includes('--dry-run');
const REPORT = path.join(__dirname, '..', 'reports', 'daily-scrape-2026-07-07.json');

function gradeFor(c) {
  if (c >= 80) return 'A';
  if (c >= 60) return 'B';
  if (c >= 40) return 'C';
  return 'D';
}

function asJsonString(v, fallback) {
  if (v === undefined || v === null) return JSON.stringify(fallback);
  if (typeof v === 'string') return v;
  return JSON.stringify(v);
}

function buildNotes(raw, grade, combined) {
  const base = String(raw.notes || '').trim();
  const prefix = `[${grade} · ${combined}]`;
  const signals = Array.isArray(raw.signals) ? raw.signals : [];
  let out = base ? `${prefix} ${base}` : prefix;
  if (signals.length) {
    out += `\n\nSignals:\n` + signals.map((s) => `• ${s}`).join('\n');
  }
  return out;
}

function normalizeContacts(raw) {
  const list = Array.isArray(raw.contacts) ? raw.contacts : [];
  return list
    .filter((c) => c && typeof c === 'object' && String(c.name || '').trim())
    .map((c) => ({
      name: String(c.name).trim(),
      title: String(c.title || ''),
      email: String(c.email || ''),
      linkedin: String(c.linkedin || ''),
    }));
}

function toCompanyData(raw) {
  const fit = Number(raw.fitScore) || 0;
  const intent = Number(raw.intentScore) || 0;
  const combined = fit + intent;
  const grade = String(raw.grade || gradeFor(combined));
  const source = String(raw.source || '');
  const sourceUrl = String(raw.sourceUrl || '');

  return {
    data: {
      name: String(raw.name).trim(),
      website: String(raw.website || ''),
      pipeline: String(raw.pipeline || ''),
      industry: String(raw.industry || ''),
      location: String(raw.location || ''),
      fundingStage: String(raw.fundingStage || ''),
      fitScore: fit,
      intentScore: intent,
      fitDetails: asJsonString(raw.fitDetails, {}),
      intentDetails: asJsonString(raw.intentDetails, {}),
      vertical: String(raw.vertical || ''),
      subvertical: String(raw.subvertical || ''),
      engagementModel: String(raw.engagementModel || ''),
      buyerType: String(raw.buyerType || ''),
      compensationText: String(raw.compensationText || ''),
      remoteFlag: String(raw.remoteFlag || ''),
      employmentTypeRaw: String(raw.employmentTypeRaw || ''),
      urgencyScore: Number(raw.urgencyScore) || 0,
      source: sourceUrl ? (source ? `${source} (${sourceUrl})` : sourceUrl) : source || 'Daily scrape',
      lastActivity: '2026-07-07',
      notes: buildNotes(raw, grade, combined),
    },
    contacts: normalizeContacts(raw),
    _grade: grade,
    _combined: combined,
  };
}

async function main() {
  const report = JSON.parse(fs.readFileSync(REPORT, 'utf8'));
  const leads = (report.leads || report.newLeads || []).map(toCompanyData);

  console.log(`Loaded ${leads.length} new leads from ${path.basename(REPORT)}.`);

  if (DRY_RUN) {
    console.log('\n--dry-run (no DB write). Would insert if missing:\n');
    for (const l of leads) {
      console.log(`  ${l._grade}  ${String(l._combined).padStart(3)}  ${l.data.pipeline.padEnd(16)}  ${l.data.name}`);
    }
    return;
  }

  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();

  let imported = 0;
  let skipped = 0;
  try {
    const existingRows = await prisma.company.findMany({ select: { name: true } });
    const existing = new Set(existingRows.map((r) => r.name.toLowerCase()));

    for (const l of leads) {
      if (existing.has(l.data.name.toLowerCase())) {
        console.log(`  = skip (exists): ${l.data.name}`);
        skipped++;
        continue;
      }
      await prisma.company.create({
        data: {
          ...l.data,
          ...(l.contacts.length ? { contacts: { create: l.contacts } } : {}),
        },
      });
      console.log(`  + added [${l._grade} ${l._combined}] ${l.data.pipeline}: ${l.data.name}`);
      imported++;
    }

    console.log(`\nDone. Imported ${imported}, skipped ${skipped} (already present).`);
  } catch (err) {
    console.error('Import failed:', err.message);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

main();
