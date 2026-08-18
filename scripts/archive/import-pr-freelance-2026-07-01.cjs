/**
 * Import script: PR Freelance Scrape 2026-07-01
 * Run: node scripts/import-pr-freelance-2026-07-01.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "Hello Human",
    website: "https://hellohuman.co",
    pipeline: "pr-freelance",
    industry: "International PR collective for independent creative businesses (design, art, architecture, creative studios)",
    location: "Remote",
    fundingStage: "Boutique PR collective (20+ international consultants)",
    fitScore: 35,
    intentScore: 30,
    vertical: "pr",
    subvertical: "media-relations",
    engagementModel: "freelance",
    buyerType: "agency",
    compensationText: "Not published (flat-fee / subscription PR model; consultants engaged as freelancers)",
    remoteFlag: "remote",
    employmentTypeRaw: "Freelance (contractor)",
    urgencyScore: 30,
    source: "The PR Net (web search)",
    sourceUrl: "https://theprnet.com/jobs/3034",
    notes: "STRONGEST NEW LEAD this week. Remote freelance PR consultant seat in an international PR collective that continuously recruits senior consultants and plugs them into client work — genuine white-label/overflow structure. Requires strong active media relationships and proven top-tier press hits. Sector is creative/design, not finance. Reports directly to founder. ACTION: apply via The PR Net posting; position Mark as senior strategic + executional PR operator with an established media network; ask if they take B2B/corporate-comms clients.",
    contacts: []
  },
  {
    name: "The Work Crowd — Freelance Healthcare Communications Specialist (HCP Events & Medical Devices PR)",
    website: "https://theworkcrowd.com/jobs/healthcare-comms-specialist-hcp-events-freelance",
    pipeline: "pr-freelance",
    industry: "Healthcare / medical devices communications (HCP events + product PR) — brief placed via The Work Crowd freelance network",
    location: "United Kingdom (freelance/remote-flex)",
    fundingStage: "Agency/client brief via vetted freelance marketplace",
    fitScore: 35,
    intentScore: 25,
    vertical: "pr",
    subvertical: "comms",
    engagementModel: "freelance",
    buyerType: "agency",
    compensationText: "£495 – £1,030 per day",
    remoteFlag: "hybrid",
    employmentTypeRaw: "Freelance (day rate)",
    urgencyScore: 30,
    source: "The Work Crowd (web search)",
    sourceUrl: "https://theworkcrowd.com/jobs/healthcare-comms-specialist-hcp-events-freelance",
    notes: "Specific dated day-rate PR brief (distinct from the Work Crowd fintech network captured 6/30). Strong day rate and clear PR remit. CAVEATS: UK-based, healthcare/medical-devices sector (outside finance core), posted 2026-05-20 so may be filled — verify still live before outreach. Pitch: senior freelance comms operator who can run product-launch and HCP-facing media relations end to end.",
    contacts: []
  },
  {
    name: "ICA Fund",
    website: "https://www.ica.fund",
    pipeline: "pr-freelance",
    industry: "Impact investment fund / CDFI backing small businesses and founders (SF/Bay Area)",
    location: "Hybrid (SF / Bay Area)",
    fundingStage: "Established impact fund / nonprofit CDFI",
    fitScore: 30,
    intentScore: 25,
    vertical: "pr",
    subvertical: "comms",
    engagementModel: "fractional",
    buyerType: "fund",
    compensationText: "Not published",
    remoteFlag: "hybrid",
    employmentTypeRaw: "Fractional (20–25 hrs/week)",
    urgencyScore: 25,
    source: "Fractional Jobs (fractionaljobs.io)",
    sourceUrl: "https://www.fractionaljobs.io/jobs/chief-development-and-communications-officer-at-ica-fund",
    notes: "Fractional comms-leadership seat at an impact fund (buyerType: fund). Clears 55 at the margin. CAVEATS: development(fundraising)-led rather than pure PR/media; hybrid SF/Bay-Area only (Mark is remote); posting ~3 weeks old (2026-06-07) so likely progressing. Lowest priority. If pursued, position Mark on the communications half of the mandate: executive comms, narrative, media positioning.",
    contacts: []
  }
];

async function main() {
  console.log(`Starting PR Freelance import — 2026-07-01 (${leads.length} leads)`);
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
