/**
 * MarCRM — DB Check (READ-ONLY)
 * --------------------------------------------------------------
 * Prints a quick health snapshot of whatever database DATABASE_URL
 * points at: which host, how many companies/contacts, the newest
 * lastActivity, a per-pipeline breakdown, and the most recent rows.
 *
 * It ONLY reads (count / groupBy / findMany). It never writes, updates,
 * or deletes anything — safe to run against production.
 *
 * Usage:
 *   node scripts/db-check.cjs                      # uses .env DATABASE_URL
 *   DATABASE_URL="postgresql://..." node scripts/db-check.cjs   # inspect a specific DB
 *
 * Tip: run it once against your local .env URL and once against the old
 * Vercel URL to compare the two databases side by side.
 */

const { PrismaClient } = require('@prisma/client');

const DB_URL = process.env.DATABASE_URL || '';
const HOST = (DB_URL.match(/@([^/:?]+)/) || [])[1] || '(unknown — DATABASE_URL not set)';
const DB_NAME = (DB_URL.match(/\/([^/?]+)(\?|$)/) || [])[1] || '(unknown)';

const prisma = new PrismaClient();

async function main() {
  console.log('\n─────────────────────────────────────────────');
  console.log(`  DB check (read-only)`);
  console.log(`  host: ${HOST}`);
  console.log(`  database: ${DB_NAME}`);
  console.log('─────────────────────────────────────────────\n');

  const [companyCount, contactCount] = await Promise.all([
    prisma.company.count(),
    prisma.contact.count().catch(() => null), // contact table may not exist in some branches
  ]);

  console.log(`Companies: ${companyCount}`);
  console.log(`Contacts:  ${contactCount === null ? 'n/a' : contactCount}`);

  if (companyCount === 0) {
    console.log('\n⚠️  This database has 0 companies — it is empty (or the wrong branch).');
    return;
  }

  // Starred count (best-effort — field may not exist on every schema)
  try {
    const starred = await prisma.company.count({ where: { starred: true } });
    console.log(`Starred:   ${starred}`);
  } catch { /* no starred column */ }

  // Per-pipeline breakdown
  try {
    const byPipeline = await prisma.company.groupBy({
      by: ['pipeline'],
      _count: { _all: true },
    });
    console.log('\nBy pipeline:');
    byPipeline
      .sort((a, b) => b._count._all - a._count._all)
      .forEach((p) => console.log(`  ${String(p._count._all).padStart(4)}  ${p.pipeline || '(none)'}`));
  } catch (e) {
    console.log(`\n(By-pipeline breakdown unavailable: ${e.message})`);
  }

  // Newest rows by lastActivity (stored as an ISO-ish string, so lexical sort works)
  try {
    const recent = await prisma.company.findMany({
      orderBy: { lastActivity: 'desc' },
      take: 8,
      select: { name: true, pipeline: true, lastActivity: true },
    });
    console.log('\nMost recent lastActivity:');
    recent.forEach((c) =>
      console.log(`  ${(c.lastActivity || '—').padEnd(12)}  ${(c.pipeline || '').padEnd(16)}  ${c.name}`)
    );
    console.log(`\n→ Newest lastActivity on this DB: ${recent[0]?.lastActivity || '—'}`);
  } catch (e) {
    console.log(`\n(Recent-rows list unavailable: ${e.message})`);
  }

  // Probe: reproduce the EXACT /api/companies query to surface any 500 cause.
  console.log('\n─ /api/companies query probe ─');
  try {
    const rows = await prisma.company.findMany({
      include: { contacts: true },
      orderBy: { updatedAt: 'desc' },
      take: 3,
    });
    // Mimic the route's JSON.parse step on the string fields.
    rows.map((c) => ({
      ...c,
      techStack: JSON.parse(c.techStack || '[]'),
      fitDetails: JSON.parse(c.fitDetails || '{}'),
      intentDetails: JSON.parse(c.intentDetails || '{}'),
    }));
    console.log('  Top-3 sample OK.');
  } catch (e) {
    console.log('  ❌ Sample query FAILED:\n     ' + String(e.message).split('\n').join('\n     '));
  }

  // Full scan: find every row whose JSON string fields won't parse — these are
  // what make the (unguarded) /api/companies route 500 across the whole set.
  console.log('\n─ Malformed-JSON scan (all rows) ─');
  try {
    const all = await prisma.company.findMany({
      select: { id: true, name: true, techStack: true, fitDetails: true, intentDetails: true },
    });
    const bad = [];
    for (const c of all) {
      for (const field of ['techStack', 'fitDetails', 'intentDetails']) {
        const v = c[field];
        if (v === null || v === undefined || v === '') continue; // route falls back safely
        try { JSON.parse(v); } catch { bad.push({ id: c.id, name: c.name, field, value: String(v).slice(0, 60) }); }
      }
    }
    if (bad.length === 0) {
      console.log('  No malformed JSON found — all rows parse cleanly.');
    } else {
      console.log(`  Found ${bad.length} malformed field(s) across ${new Set(bad.map((b) => b.id)).size} row(s):`);
      bad.slice(0, 25).forEach((b) => console.log(`   • #${b.id} [${b.field}] ${b.name}\n       value: ${b.value}`));
      if (bad.length > 25) console.log(`   …and ${bad.length - 25} more.`);
      console.log('\n  → The route now uses safeParse(), so these no longer 500 the endpoint.');
    }
  } catch (e) {
    console.log('  (Scan unavailable: ' + e.message + ')');
  }

  console.log('');
}

main()
  .catch((e) => {
    console.error('\nDB check failed:', e.message);
    console.error(`(Could not read ${HOST}. Check the DATABASE_URL and that the branch exists.)\n`);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
