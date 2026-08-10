/**
 * Import script: PR Freelance Scrape 2026-07-02
 * Run: node scripts/import-pr-freelance-2026-07-02.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres
 * Deduplicates by company name (skips existing companies).
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "The PR Net — Freelance PR & Media Relations Consultant",
    website: "https://www.theprnet.com",
    pipeline: "pr-freelance",
    industry: "PR/communications freelance brief listed on The PR Net job board (client-facing media relations consultancy)",
    location: "Remote",
    fundingStage: "Freelance brief via The PR Net (industry job board)",
    fitScore: 35,
    intentScore: 30,
    vertical: "pr",
    subvertical: "media-relations",
    engagementModel: "freelance",
    buyerType: "agency",
    compensationText: "Not published (freelance project/retainer)",
    remoteFlag: "remote",
    employmentTypeRaw: "Freelance (contractor)",
    urgencyScore: 30,
    source: "The PR Net (web search)",
    sourceUrl: "https://www.theprnet.com/jobs/1745",
    notes: "STRONGEST new lead this week. Distinct posting from the earlier Hello Human PR Net listing (jobs/3034). True freelance PR + media relations remit, fully remote, direct apply path. Sector not finance-specific. ACTION: apply via The PR Net; position Mark as senior strategic + executional PR operator with an active media network; confirm whether the brief includes B2B/corporate/finance clients.",
    contacts: []
  },
  {
    name: "OpenText — Investor Relations Manager (12-Month Contract)",
    website: "https://www.opentext.com",
    pipeline: "pr-freelance",
    industry: "Enterprise information management / B2B software (public company)",
    location: "Canada (hybrid — Waterloo, ON)",
    fundingStage: "Public company (NASDAQ/TSX: OTEX)",
    fitScore: 45,
    intentScore: 20,
    vertical: "pr",
    subvertical: "investor-pr",
    engagementModel: "contract",
    buyerType: "operating-company",
    compensationText: "Not published",
    remoteFlag: "hybrid",
    employmentTypeRaw: "Contract (12-month, full-time hours)",
    urgencyScore: 40,
    source: "LinkedIn Jobs (web search, Google-indexed)",
    sourceUrl: "https://ca.linkedin.com/jobs/view/investor-relations-manager-12-month-contract-at-opentext-4348594155",
    notes: "Investor/media-narrative workstream at a public B2B software company on a 12-month contract. CAVEATS: full-hours temp contract (not advisory freelance) — employmentTypeRaw vs engagementModel diverge; Canada-based/hybrid may not fit remote-US. Verify still live before outreach.",
    contacts: []
  },
  {
    name: "Pinterest — Investor Relations Advisor (Contract)",
    website: "https://www.pinterest.com",
    pipeline: "pr-freelance",
    industry: "Consumer internet / adtech (public company)",
    location: "San Francisco, CA (onsite/hybrid)",
    fundingStage: "Public company (NYSE: PINS)",
    fitScore: 45,
    intentScore: 15,
    vertical: "pr",
    subvertical: "investor-pr",
    engagementModel: "contract",
    buyerType: "operating-company",
    compensationText: "Not published",
    remoteFlag: "onsite",
    employmentTypeRaw: "Contract (via staffing partner, W-2)",
    urgencyScore: 25,
    source: "LinkedIn Jobs (web search, Google-indexed)",
    sourceUrl: "https://www.linkedin.com/jobs/view/investor-relations-advisor-contract-at-pinterest-2847874701",
    notes: "LOWEST-confidence of the three. Investor-narrative contract role at a public consumer-internet company. CAVEATS: older LinkedIn job ID — very likely expired, verify first; SF onsite/hybrid + staffing-partner W-2, so neither remote nor true freelance. Deprioritize behind the other two.",
    contacts: []
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
        scrapeDate: new Date("2026-07-02")
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
