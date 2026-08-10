/**
 * Import script: PR Freelance Scrape 2026-06-25
 * Run: node scripts/import-pr-freelance-2026-06-25.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "Capital One",
    website: "https://www.gofractional.com/job/workday-head-of-brand-marketing-and-pr-12-month-contract",
    pipeline: "pr-freelance",
    industry: "Financial Services — banking, credit cards, lending (NYSE: COF)",
    location: "McLean, VA — Remote",
    fundingStage: "Large-cap public company",
    fitScore: 45,
    intentScore: 30,
    vertical: "pr",
    subvertical: "executive-comms",
    engagementModel: "interim",
    buyerType: "operating-company",
    compensationText: "$150-$225/hr, 30-40 hrs/week, 12 months (external repost)",
    remoteFlag: "remote",
    employmentTypeRaw: "12-month interim contract (Marketing Consultant)",
    urgencyScore: 35,
    source: "Web Search + Go Fractional",
    sourceUrl: "https://www.gofractional.com/job/workday-head-of-brand-marketing-and-pr-12-month-contract",
    notes: "Strongest fit this run on sector + workstream (financial services + brand/PR + executive comms, remote, interim, high rate). CAVEAT: listing reads 'Posted 3 months ago' and is an external repost — verify still open before investing pitch time. URL slug says 'workday' but company shown/described is Capital One. Pitch: senior interim brand+PR operator who can plug into a regulated financial brand fast and own media + executive narrative through the gap.",
    contacts: []
  },
  {
    name: "E3n",
    website: "https://www.gofractional.com/job/jazzhr-e3n-fractional-marketing-communications-manager-career-page",
    pipeline: "pr-freelance",
    industry: "Membership / association organization (mission-driven)",
    location: "Remote (US)",
    fundingStage: "Membership organization",
    fitScore: 30,
    intentScore: 27,
    vertical: "pr",
    subvertical: "content-strategy",
    engagementModel: "fractional",
    buyerType: "operating-company",
    compensationText: "$135-$200/hr, 10-30 hrs/week, 6 months with potential extensions",
    remoteFlag: "remote",
    employmentTypeRaw: "6-month contract — Senior Manager/Supervisor",
    urgencyScore: 30,
    source: "Web Search + Go Fractional",
    sourceUrl: "https://www.gofractional.com/job/jazzhr-e3n-fractional-marketing-communications-manager-career-page",
    notes: "BORDERLINE (combined 57). Genuine fresh-ish remote contract with a senior comms title and solid rate, which is why it clears 55. CAVEAT: actual scope is marketing-ops execution (email build HTML/CSS/Marketing Cloud/Pardot/HubSpot, Canva/Figma graphics, social calendars, list segmentation) with NO media-relations/earned-media remit. Weaker fit for Mark's senior strategic-PR profile. Pursue only for integrated-comms / content-strategy retainer work; lead with comms strategy + content, not media relations.",
    contacts: []
  }
];

async function main() {
  console.log(`Starting PR Freelance import — 2026-06-25 (${leads.length} leads)`);
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
