/**
 * Import script: PR Freelance Scrape 2026-06-26
 * Run: node scripts/import-pr-freelance-2026-06-26.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "Hot Iron Health",
    website: "https://www.hotironhealth.com",
    pipeline: "pr-freelance",
    industry: "Healthcare/pharma/biotech strategy collective (via CrowdPharm agency network)",
    location: "Remote (USA)",
    fundingStage: "Specialist consulting collective / agency network",
    fitScore: 35,
    intentScore: 30,
    vertical: "pr",
    subvertical: "investor-pr",
    engagementModel: "freelance",
    buyerType: "agency",
    compensationText: "\"Competitive rates\", project/scope-based; work not guaranteed",
    remoteFlag: "remote",
    employmentTypeRaw: "Freelance",
    urgencyScore: 45,
    source: "Built In + Greenhouse (CrowdPharm)",
    sourceUrl: "https://job-boards.greenhouse.io/crowdpharm/jobs/7294991002",
    notes: "Strong workstream fit: investor relations + financial communications (IR narrative, investor/analyst updates, capital-raise support). Sector is healthcare/biotech rather than core finance/PE, but the work is investor-facing financial comms. Collective/agency overflow model — getting on the bench pays off across multiple client scopes. CAVEAT: work not guaranteed (project-by-project); evergreen posting — confirm demand. Legit domains only: @hotironhealth.com, @crowdpharm.com, @pharmyard.com. Pitch: senior IR/financial-comms operator owning investor narrative + analyst/media updates for healthcare issuers on a project retainer.",
    contacts: []
  },
  {
    name: "The James Collective",
    website: "https://www.thejamescollective.com",
    pipeline: "pr-freelance",
    industry: "Boutique PR agency — food, beverage & travel/hospitality clients",
    location: "New York, NY — Remote (NYC-based preferred)",
    fundingStage: "Boutique agency (privately held)",
    fitScore: 35,
    intentScore: 30,
    vertical: "pr",
    subvertical: "media-relations",
    engagementModel: "freelance",
    buyerType: "agency",
    compensationText: "Not stated (part-time, 10-20 hrs/month)",
    remoteFlag: "remote",
    employmentTypeRaw: "Freelance",
    urgencyScore: 40,
    source: "The PR Net Jobs",
    sourceUrl: "https://www.theprnet.com/jobs/1745",
    notes: "Clean true-freelance agency-overflow role with direct-email apply (alison@thejamescollective.com) — low friction. CAVEAT: sector is consumer food/bev/travel and requires strong food/bev/hospitality contacts — outside Mark's finance/legal/B2B sweet spot. Pursue only if Mark wants consumer/lifestyle media work. Pitch: senior media-relations operator who plugs into an agency roster fast on a flexible hourly basis.",
    contacts: [
      { name: "Alison", title: "Hiring contact (The James Collective)", email: "alison@thejamescollective.com", linkedin: "" }
    ]
  }
];

async function main() {
  console.log(`Starting PR Freelance import — 2026-06-26 (${leads.length} leads)`);
  let inserted = 0;
  let skipped = 0;

  for (const lead of leads) {
    const { contacts, sourceUrl, ...companyData } = lead;

    // Dedup by company name
    const existing = await prisma.company.findFirst({
      where: { name: companyData.name }
    });

    if (existing) {
      console.log(`  SKIP (exists): ${companyData.name}`);
      skipped++;
      continue;
    }

    // Insert company
    const company = await prisma.company.create({
      data: {
        ...companyData,
        fitDetails: JSON.stringify({
          pr_remit: true,
          sourceUrl: sourceUrl
        }),
        intentDetails: JSON.stringify({
          engagement_model: companyData.engagementModel,
          remote_flex: companyData.remoteFlag,
          apply_path: sourceUrl
        }),
        lastActivity: new Date().toISOString().split('T')[0]
      }
    });

    // Insert contacts
    for (const contact of (contacts || [])) {
      await prisma.contact.create({
        data: {
          name: contact.name,
          title: contact.title || '',
          email: contact.email || '',
          linkedin: contact.linkedin || '',
          companyId: company.id
        }
      });
    }

    // Insert ScrapeResult
    await prisma.scrapeResult.create({
      data: {
        url: sourceUrl,
        source: companyData.source,
        pipeline: 'pr-freelance',
        resultData: JSON.stringify({ ...companyData, sourceUrl }),
        matchedSignals: JSON.stringify([
          companyData.engagementModel,
          companyData.subvertical,
          companyData.buyerType,
          companyData.remoteFlag
        ].filter(Boolean)),
        imported: true
      }
    });

    console.log(`  INSERTED: ${companyData.name} (fit: ${companyData.fitScore}, intent: ${companyData.intentScore})`);
    inserted++;
  }

  console.log(`\nDone. Inserted: ${inserted}, Skipped: ${skipped}`);
}

main()
  .catch((e) => {
    console.error('Import error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
