/**
 * Import script: PR Freelance Scrape 2026-06-24
 * Run: node scripts/import-pr-freelance-2026-06-24.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "Serotonin",
    website: "https://serotonin.co",
    pipeline: "pr-freelance",
    industry: "Marketing & Communications Agency — Digital Assets / Web3 / Fintech / VC",
    location: "Remote (Worldwide) — NYC HQ",
    fundingStage: "Independent Agency (founded 2020, ~90 staff, 300+ clients)",
    fitScore: 50,
    intentScore: 23,
    vertical: "pr",
    subvertical: "agency-overflow",
    engagementModel: "freelance",
    buyerType: "agency",
    compensationText: "Not stated — FT PR roles indexed ~$65k-$145k; freelance/overflow negotiated",
    remoteFlag: "remote",
    employmentTypeRaw: "Full-time (indexed roles); BD target for freelance/overflow",
    urgencyScore: 25,
    source: "Web Search (web3.career, remote3.co) + serotonin.co",
    sourceUrl: "https://www.remote3.co/remote-jobs/public-relations-manager-serotonin",
    notes: "BD/overflow target, not apply-now. High-fit financial/digital-asset comms agency expanding its PR team; boutique agencies use freelance overflow + white-label. Pitch as senior freelance PR operator for fintech/asset-mgmt book. Verify current freelance need before heavy investment.",
    contacts: [
      {
        name: "Serotonin PR Team",
        title: "Hiring / Partnerships",
        email: "",
        linkedin: "https://www.linkedin.com/company/serotonin-co"
      }
    ]
  },
  {
    name: "KCSA Strategic Communications",
    website: "https://www.kcsa.com",
    pipeline: "pr-freelance",
    industry: "Investor Relations & Financial PR Firm",
    location: "New York, NY (remote/hybrid project work feasible)",
    fundingStage: "Established Independent IR/PR Firm",
    fitScore: 50,
    intentScore: 18,
    vertical: "pr",
    subvertical: "investor-pr",
    engagementModel: "consultant",
    buyerType: "ir-firm",
    compensationText: "Not stated — senior financial-PR/IR contract rate negotiated per engagement",
    remoteFlag: "hybrid",
    employmentTypeRaw: "Not stated — BD target for white-label / overflow consulting",
    urgencyScore: 20,
    source: "Web Search (kcsa.com via IR firm rankings)",
    sourceUrl: "https://www.kcsa.com/investor-relations",
    notes: "BD/white-label target, not apply-now. NYC IR + financial-PR firm running IPO/APO comms for public & pre-IPO companies — top-of-ICP sector. Position as senior freelance financial-PR / IR-narrative overflow support. Confirm current need before heavy investment.",
    contacts: [
      {
        name: "KCSA Strategic Communications",
        title: "Partnerships / New Business",
        email: "",
        linkedin: "https://www.linkedin.com/company/kcsa-strategic-communications"
      }
    ]
  },
  {
    name: "Four Pines Fund",
    website: "https://www.daybook.com/job/fractional-director-of-communications-contract-position-w2exwwvL8r4sE2FA2",
    pipeline: "pr-freelance",
    industry: "Philanthropic / Nonprofit (mission-focused)",
    location: "Remote (US)",
    fundingStage: "Nonprofit / Foundation",
    fitScore: 30,
    intentScore: 35,
    vertical: "pr",
    subvertical: "comms",
    engagementModel: "fractional",
    buyerType: "operating-company",
    compensationText: "Not stated — fractional comms director; hourly/retainer negotiated",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional contract (W-2 or 1099 not specified)",
    urgencyScore: 40,
    source: "Web Search (Daybook.com)",
    sourceUrl: "https://www.daybook.com/job/fractional-director-of-communications-contract-position-w2exwwvL8r4sE2FA2",
    notes: "CAVEAT: low sector fit (nonprofit, not finance/B2B/IR). Included as genuine fractional Dir. of Communications CONTRACT role with strong engagement-model match (fractional, remote, senior, define-then-run). Posted ~May 18; contract-type stays open. Lead with senior comms leadership + strategic-plan build, NOT financial-PR credentials.",
    contacts: []
  }
];

async function main() {
  console.log(`Starting PR Freelance import — 2026-06-24 (${leads.length} leads)`);
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
