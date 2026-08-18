/**
 * Import script: PR Freelance Scrape 2026-07-03
 * Run: node scripts/import-pr-freelance-2026-07-03.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres
 * Deduplicates by company name (skips existing companies).
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "JIH PR — Freelance PR Consultant",
    website: "https://www.jihpr.com",
    pipeline: "pr-freelance",
    industry: "Boutique PR agency (design, culture, fashion, tech, lifestyle)",
    location: "Remote (US-based required)",
    fundingStage: "Boutique agency — freelance brief via The PR Net job board",
    fitScore: 35,
    intentScore: 30,
    vertical: "pr",
    subvertical: "media-relations",
    engagementModel: "freelance",
    buyerType: "agency",
    compensationText: "Compensation based on experience (not published)",
    remoteFlag: "remote",
    employmentTypeRaw: "Freelance, part-time, project-based",
    urgencyScore: 35,
    source: "The PR Net (web search)",
    sourceUrl: "https://theprnet.com/jobs/9049",
    notes: "SENIORITY CAVEAT: brief written for early-career/recent grads, so not a direct senior-operator fit. Qualifies as a legitimate boutique-agency freelance PR brief (agency-overflow buyer type). Pitch angle: senior white-label/overflow media relations support on retainer rather than the posted junior role. Sector is design/fashion/culture/lifestyle, not finance — B/C-grade relationship lead. ACTION: light-touch outreach to press@jihpr.com; deprioritize behind finance/B2B briefs.",
    contacts: [
      { name: null, title: "PR team", email: "press@jihpr.com", linkedin: null }
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
        scrapeDate: new Date("2026-07-03")
      }
    });

    console.log(`CREATED: ${lead.name}`);
    created++;
  }
  console.log(`\nDone. Created ${created}, skipped ${skipped}.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
