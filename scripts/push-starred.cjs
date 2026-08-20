#!/usr/bin/env node
/**
 * push-starred.cjs — send starred leads from Neon to the Command Center trackers.
 *
 *   npm run push:starred            # push starred, non-archived leads
 *   npm run push:starred -- --dry   # show what would be sent, send nothing
 *
 * Flow:
 *   Mark stars a lead in the web app  →  starred=true in Neon  →  this script  →  Google Sheets
 *
 * Routing follows the same rule as the scrape (see CLAUDE.md "Downstream: the Command Center"):
 *   legal-freelance / pr-freelance  →  Application Tracker (Master)   [job applications]
 *   the six agency pipelines        →  BD Pipeline (Master)           [client opportunities]
 *
 * Idempotent: the Apps Script dedupes by company name against what is already in each sheet,
 * so running this twice adds nothing the second time. Leads stay starred after a push — the
 * star is a shortlist marker, not a queue. Unstar in the app if you want one to stop appearing.
 *
 * Hard rules honoured: .cjs because package.json is "type": "module"; @prisma/client, not pg.
 */

const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const DRY = process.argv.includes('--dry') || process.argv.includes('--dry-run');

const FREELANCE = new Set(['legal-freelance', 'pr-freelance']);
const RESUME_CATEGORY = {
  'legal-freelance': 'Legal / Commercial Counsel',
  'pr-freelance': 'PR Marketing & Media',
};

// ─── .env (plain parse — no dotenv dependency) ─────────────────────────────────
function loadEnv() {
  const file = path.join(__dirname, '..', '.env');
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (!m) continue;
    const key = m[1];
    let val = m[2].trim().replace(/^["']|["']$/g, '');
    if (!(key in process.env)) process.env[key] = val;
  }
}

// ─── helpers ───────────────────────────────────────────────────────────────────
const today = () => new Date().toISOString().slice(0, 10);

function gradeOf(fit, intent) {
  const c = (fit || 0) + (intent || 0);
  return c >= 80 ? 'A' : c >= 60 ? 'B' : 'C';
}

// sync-all-leads.cjs stores source as "Publication (https://url)" — split it back apart.
function splitSource(source) {
  const s = String(source || '');
  const m = s.match(/^(.*?)\s*\((https?:\/\/[^)]+)\)\s*$/);
  if (m) return { name: m[1].trim(), url: m[2].trim() };
  if (/^https?:\/\//.test(s)) return { name: '', url: s };
  return { name: s, url: '' };
}

function primaryContact(c) {
  const ct = (c.contacts || []).find((x) => !x.archived) || (c.contacts || [])[0];
  return {
    name: ct ? ct.name || '' : '',
    email: ct ? ct.email || '' : '',
    title: ct ? ct.title || '' : '',
  };
}

// ─── row builders (column order must match the sheets exactly) ─────────────────
function applicationRow(c) {
  const { url } = splitSource(c.source);
  const ct = primaryContact(c);
  return [
    '',                                        // Date Applied — blank until he applies
    c.name,
    c.roleTitle || '',                         // Role / Title (see migration note below)
    RESUME_CATEGORY[c.pipeline] || '',
    'Scraper/CRM',
    url,
    '',                                        // Job Description (archived)
    '',                                        // Resume Sent
    '',                                        // Cover Letter Sent
    '',                                        // Applied Via
    ct.name,
    ct.email,
    'Identified',
    today(),
    'Go/no-go decision',
    '',
    [
      `Grade ${gradeOf(c.fitScore, c.intentScore)} / ${(c.fitScore || 0) + (c.intentScore || 0)}`,
      `(Fit ${c.fitScore || 0} + Intent ${c.intentScore || 0})`,
      c.compensationText ? `Comp: ${c.compensationText}.` : '',
      c.remoteFlag ? `Remote: ${c.remoteFlag}.` : '',
      c.employmentTypeRaw ? `Type: ${c.employmentTypeRaw}.` : '',
      c.notes || '',
    ].filter(Boolean).join(' '),
  ];
}

function bdRow(c) {
  const { name: sigSource, url } = splitSource(c.source);
  const ct = primaryContact(c);
  return [
    today(),
    c.name,
    c.pipeline,
    c.industry || '',
    c.location || '',
    '',                                        // Trigger / Signal — lives in notes on the DB side
    c.fundingStage || '',
    c.fitScore || 0,
    c.intentScore || 0,
    (c.fitScore || 0) + (c.intentScore || 0),
    gradeOf(c.fitScore, c.intentScore),
    'Scraper/CRM',
    sigSource,
    url,
    c.website || '',
    ct.name,
    ct.title,
    ct.email,
    'Identified',
    '',
    'Research + identify contact',
    '',
    '',                                        // Caveat
    c.notes || '',
  ];
}

// ─── push ──────────────────────────────────────────────────────────────────────
async function post(target, rows, url, token) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, target, rows }),
    redirect: 'follow',
  });
  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(
      `${target}: the web app did not return JSON. This usually means the deployment is not ` +
      `set to "Anyone" access, or the URL is the editor link rather than the /exec link.\n` +
      `First 200 chars: ${text.slice(0, 200)}`
    );
  }
  if (!data.ok) throw new Error(`${target}: ${data.error}`);
  return data;
}

async function main() {
  loadEnv();
  const url = process.env.SHEETS_WEBAPP_URL;
  const token = process.env.SHEETS_WEBAPP_TOKEN;

  if (!DRY && (!url || !token)) {
    console.error(
      'Missing SHEETS_WEBAPP_URL or SHEETS_WEBAPP_TOKEN in .env.\n' +
      'See scripts/PUSH-STARRED-SETUP.md — it is a one-time, five-click setup.\n' +
      'Run with --dry to preview without them.'
    );
    process.exit(1);
  }

  const starred = await prisma.company.findMany({
    where: { starred: true, archived: false },
    include: { contacts: true },
    orderBy: [{ pipeline: 'asc' }, { name: 'asc' }],
  });

  if (!starred.length) {
    console.log('No starred leads. Star some in the app, then run this again.');
    return;
  }

  const freelance = starred.filter((c) => FREELANCE.has(c.pipeline));
  const agency = starred.filter((c) => !FREELANCE.has(c.pipeline));

  console.log(`Starred: ${starred.length}  (freelance ${freelance.length}, agency ${agency.length})`);

  // Role/Title only exists once the schema migration has been applied. Warn loudly rather
  // than silently writing blank cells into the tracker's most important column.
  const missingRole = freelance.filter((c) => !c.roleTitle);
  if (missingRole.length) {
    console.warn(
      `\n  ${missingRole.length} freelance lead(s) have no roleTitle, so Role/Title will be blank:\n` +
      missingRole.map((c) => `    - ${c.name}`).join('\n') +
      `\n  Fix: apply the roleTitle migration (npx prisma db push) and re-run the scrape.\n`
    );
  }

  if (DRY) {
    console.log('\n--- dry run, nothing sent ---');
    if (freelance.length) {
      console.log('\nApplication Tracker:');
      freelance.forEach((c) => console.log('  ' + JSON.stringify(applicationRow(c))));
    }
    if (agency.length) {
      console.log('\nBD Pipeline:');
      agency.forEach((c) => console.log('  ' + JSON.stringify(bdRow(c))));
    }
    return;
  }

  let total = 0;
  if (freelance.length) {
    const r = await post('application', freelance.map(applicationRow), url, token);
    console.log(`\nApplication Tracker — added ${r.added}, already present ${r.skipped}`);
    r.addedNames.forEach((n) => console.log(`   + ${n}`));
    total += r.added;
  }
  if (agency.length) {
    const r = await post('bd', agency.map(bdRow), url, token);
    console.log(`\nBD Pipeline — added ${r.added}, already present ${r.skipped}`);
    r.addedNames.forEach((n) => console.log(`   + ${n}`));
    total += r.added;
  }

  console.log(`\nDone. ${total} new row(s) in the Command Center.`);
}

main()
  .catch((err) => {
    console.error('\nPush failed:', err.message);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
