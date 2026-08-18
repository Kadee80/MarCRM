/**
 * Import script: PR Freelance Scrape 2026-06-23
 * Run: node scripts/import-pr-freelance-2026-06-23.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "Mission North",
    website: "https://www.missionnorth.com",
    pipeline: "pr-freelance",
    industry: "Integrated PR & Communications Agency (B2B Tech)",
    location: "Remote (US) — SF, New York, Portland hubs",
    fundingStage: "Independent Agency (formerly Bateman Group)",
    fitScore: 45,
    intentScore: 40,
    vertical: "pr",
    subvertical: "agency-overflow",
    engagementModel: "freelance",
    buyerType: "agency",
    compensationText: "Not stated — hourly/project negotiated per engagement",
    remoteFlag: "remote",
    employmentTypeRaw: "Freelance (independent contractor)",
    urgencyScore: 70,
    source: "Built In NYC",
    sourceUrl: "https://www.builtinnyc.com/job/freelance-opportunities/7211354",
    notes: "Mission North (formerly Bateman Group) maintains an active freelance bench for PR, comms, digital marketing, and content creation. Reposted June 17, 2026 (6 days ago). Apply via Greenhouse: https://www.missionnorth.com/job-posting-detail?gh_jid=8182703002. B2B tech PR overflow play — thought leadership, exec comms, earned media. Mark should lead cover note with senior B2B earned media and executive positioning work.",
    contacts: []
  },
  {
    name: "Consumer Marketing Company (via Go Fractional)",
    website: "https://www.gofractional.com/job/fractional-pr-growth-marketer-cmqbe3b4",
    pipeline: "pr-freelance",
    industry: "D2C Consumer Gift Products / Specialty Retail",
    location: "Remote — Washington state (US)",
    fundingStage: "Bootstrapped / Founder-led",
    fitScore: 35,
    intentScore: 50,
    vertical: "pr",
    subvertical: "media-relations",
    engagementModel: "fractional",
    buyerType: "startup",
    compensationText: "$50–$95/hr, 15–30 hrs/week",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional (independent contractor)",
    urgencyScore: 85,
    source: "Go Fractional",
    sourceUrl: "https://www.gofractional.com/job/fractional-pr-growth-marketer-cmqbe3b4",
    notes: "CAVEAT: Weak sector fit — consumer D2C gift products (Pinterest, holiday gift guides), NOT B2B/finance. High intent score due to 2-day-old post, $50-95/hr, seasonal urgency, fractional model. Income diversification play only. Do NOT pitch financial PR credentials here. Apply at: https://www.gofractional.com/job/fractional-pr-growth-marketer-cmqbe3b4",
    contacts: []
  },
  {
    name: "Crackle PR",
    website: "https://www.cracklepr.com",
    pipeline: "pr-freelance",
    industry: "B2B Tech PR Agency (VC-backed brands, fintech, SaaS, enterprise)",
    location: "Remote-first — Boston, NYC, SF, Austin, Portsmouth (NH)",
    fundingStage: "Independent Agency (Parry Headrick, founder)",
    fitScore: 50,
    intentScore: 30,
    vertical: "pr",
    subvertical: "comms",
    engagementModel: "consultant",
    buyerType: "agency",
    compensationText: "Not stated — senior B2B tech PR market rate ($150–$250/hr estimated)",
    remoteFlag: "remote",
    employmentTypeRaw: "Freelance / Consultant (1099)",
    urgencyScore: 55,
    source: "Crackle PR Careers / Web Search",
    sourceUrl: "https://www.cracklepr.com/careers",
    notes: "HIGHEST PRIORITY OUTREACH THIS RUN. All-senior B2B tech PR agency, always hiring senior freelance operators. Fintech case study: Creditsafe (1,940+ media mentions, MarketWatch/TheStreet/Fintech Times) — direct ICP overlap. Email Parry Headrick: parry@cracklepr.com. Short founder-led hiring process. Pitch: senior PR strategist, B2B/fintech earned media, executive comms, no ramp needed.",
    contacts: [
      {
        name: "Parry Headrick",
        title: "Founder & Chief Evangelist",
        email: "parry@cracklepr.com",
        linkedin: "https://www.linkedin.com/company/crackle-pr"
      }
    ]
  },
  {
    name: "Scion Creative Staffing",
    website: "https://scionstaffing.com",
    pipeline: "pr-freelance",
    industry: "Creative & Communications Contract Staffing",
    location: "National (remote and hybrid placements)",
    fundingStage: "Established Staffing Agency",
    fitScore: 45,
    intentScore: 30,
    vertical: "pr",
    subvertical: "comms",
    engagementModel: "contract",
    buyerType: "staffing",
    compensationText: "Varies — senior PR typically $65–$150/hr",
    remoteFlag: "remote",
    employmentTypeRaw: "W-2 contractor (placed by staffing agency)",
    urgencyScore: 40,
    source: "Scion Staffing / Web Search",
    sourceUrl: "https://scionstaffing.com/temporary-communications-staffing/",
    notes: "Pipeline infrastructure play. National PR/comms contractor staffing agency. Registering creates a passive channel for senior PR overflow placements. W-2 contractor model (not 1099). Register at: https://scionstaffing.com/search-jobs/",
    contacts: []
  }
];

async function main() {
  console.log(`Starting PR Freelance import — 2026-06-23 (${leads.length} leads)`);
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
