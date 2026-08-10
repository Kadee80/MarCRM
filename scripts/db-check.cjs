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
    console.log('  OK — orderBy updatedAt + include contacts + JSON.parse all succeed.');
    console.log('  (So the 500 is NOT the query — likely a stale deployment/cache on the domain.)');
  } catch (e) {
    console.log('  ❌ FAILED — this is what is 500-ing /api/companies:\n');
    console.log('     ' + String(e.message).split('\n').join('\n     '));
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
