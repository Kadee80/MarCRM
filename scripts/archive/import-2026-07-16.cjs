/**
 * Import script: Daily Scrape 2026-07-16
 * Run:      node scripts/import-2026-07-16.cjs
 * Preview:  node scripts/import-2026-07-16.cjs --dry-run
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const DRY_RUN = process.argv.includes('--dry-run');
const SCRAPE_DATE = new Date('2026-07-16');

const leads = [
  {
    name: "Databento",
    website: "https://databento.com/",
    pipeline: "pr-marketing",
    industry: "Market data infrastructure — real-time & historical futures/options/equities (and now crypto) via a unified API for institutional trading firms, banks and funds",
    location: "Salt Lake City, UT, US",
    fundingStage: "Series B ($97M, led by NEA; DRW, Redpoint, Tribe Capital participating; oversubscribed to ~$300M demand; announced Jul 9, 2026)",
    fitScore: 44,
    intentScore: 35,
    vertical: "",
    subvertical: "",
    engagementModel: "",
    buyerType: "",
    compensationText: "",
    remoteFlag: "",
    employmentTypeRaw: "",
    urgencyScore: 0,
    source: "AI/venture funding roundup + SiliconANGLE / PR Newswire / Databento blog",
    sourceUrl: "https://siliconangle.com/2026/07/09/market-data-platform-startup-databento-closes-97m-round-drawing-300m-investor-demand/",
    notes: "Grade B (79). Best net-new lead this cycle. Core FS/market-infrastructure ICP fit, clear B2B buyer (trading firms, banks, funds), credible proof (used by leading trading firms; ~$300M demand). The 'take on Bloomberg' + crypto-data-expansion + data-center-scale story is a ready-made earned-media/thought-leadership program. NO senior comms leader yet (building marketing in-house at junior/mid level) — pitch overflow/thought-leadership/positioning, not a first-hire play. CAVEAT: raise announced Jul 9 (~1 week old). ACTION: find the marketing decision-maker (Associate Director of Marketing owns PR/partnerships); pitch a Bloomberg-challenger thought-leadership + tier-1 FS/fintech press sprint tied to the Series B and crypto-data launch while the window is live.",
    contacts: [
      { name: "", title: "Associate Director of Marketing (owns GTM incl. PR/partnerships — likely comms decision-maker)", email: "", linkedin: "" }
    ]
  }
];

async function main() {
  let created = 0, skipped = 0;
  for (const lead of leads) {
    const existing = await prisma.company.findFirst({ where: { name: lead.name } });
    if (existing) {
      console.log(`SKIP (exists): ${lead.name}`);
      skipped++;
      continue;
    }

    if (DRY_RUN) {
      console.log(`WOULD CREATE: ${lead.name} [${lead.pipeline}] fit=${lead.fitScore} intent=${lead.intentScore}`);
      created++;
      continue;
    }

    const company = await prisma.company.create({
      data: {
        name: lead.name,
        website: lead.website,
        pipeline: lead.pipeline,
        industry: lead.industry,
        location: lead.location,
        fundingStage: lead.fundingStage,
        fitScore: lead.fitScore,
        intentScore: lead.intentScore,
        vertical: lead.vertical,
        subvertical: lead.subvertical,
        engagementModel: lead.engagementModel,
        buyerType: lead.buyerType,
        compensationText: lead.compensationText,
        remoteFlag: lead.remoteFlag,
        employmentTypeRaw: lead.employmentTypeRaw,
        urgencyScore: lead.urgencyScore,
        notes: lead.notes
      }
    });

    for (const c of lead.contacts) {
      await prisma.contact.create({
        data: {
          companyId: company.id,
          name: c.name || null,
          title: c.title || null,
          email: c.email || null,
          linkedin: c.linkedin || null
        }
      });
    }

    await prisma.scrapeResult.create({
      data: {
        companyId: company.id,
        pipeline: lead.pipeline,
        source: lead.source,
        sourceUrl: lead.sourceUrl,
        fitScore: lead.fitScore,
        intentScore: lead.intentScore,
        scrapeDate: SCRAPE_DATE
      }
    });

    console.log(`CREATED: ${lead.name}`);
    created++;
  }
  console.log(`\nDone${DRY_RUN ? ' (dry run)' : ''}. ${DRY_RUN ? 'Would create' : 'Created'} ${created}, skipped ${skipped}.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
