/**
 * Import script: PR Freelance Scrape 2026-08-10
 * Run: node scripts/import-pr-freelance-2026-08-10.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "Caliber Corporate Advisers — Financial/Fintech PR Agency (Overflow / White-Label Target)",
    website: "https://www.calibercorporate.com/careers/",
    pipeline: "pr-freelance",
    industry: "Strategic marketing & communications firm serving financial services, fintech, insurtech, real estate and proptech. Remote-first with US co-working access; Inc. Best Workplace and Fast Company Best Workplace for Innovators. Currently actively hiring (Senior Account Executive, PR, on Mediabistro) and building journalist networks for client media goals — signals of capacity pressure.",
    location: "Remote (US)",
    fundingStage: "Established boutique financial-comms agency (Inc.-recognized)",
    fitScore: 50,
    intentScore: 25,
    vertical: "pr",
    subvertical: "agency-overflow",
    engagementModel: "contract",
    buyerType: "agency",
    compensationText: "N/A — agency-overflow/white-label target (not a comp-bearing freelance posting)",
    remoteFlag: "remote",
    employmentTypeRaw: "Firm actively hiring full-time SAE (Mediabistro); approached as white-label/overflow target",
    urgencyScore: 55,
    source: "Web search — Caliber careers + Mediabistro SAE posting, Aug 2026",
    sourceUrl: "https://www.mediabistro.com/jobs/3540894180-caliber-corporate-advisers-is-hiring-senior-account-executive-public-relations",
    notes: "Grade B (combined 75) — strongest sector fit of the run. Agency-OVERFLOW/white-label TARGET, not an active freelance posting: signal is active PR hiring in Mark's exact sectors (fintech/financial services/insurtech/proptech). ACTION: BD outreach positioning Mark as senior freelance/white-label execution during capacity crunches; strong pitch-target, medium confidence on immediate need.",
    contacts: [
      { name: null, title: "BD / partnerships (via careers + firm site)", email: null, linkedin: "https://www.linkedin.com/company/caliber-corporate-advisers" }
    ]
  },
  {
    name: "JIH Public Relations — Freelance PR Consultant (Remote, Project-Based)",
    website: "https://theprnet.com/jobs/9049",
    pipeline: "pr-freelance",
    industry: "Boutique PR agency specializing in design, culture, fashion, tech and lifestyle. Hiring a remote, project-based Freelance PR Consultant for media outreach, pitch development, media-list maintenance, competitor audits and strategic research. 2025 PR Net Next Gen Awards honoree. Apply via press@jihpr.com.",
    location: "Remote (US-based required)",
    fundingStage: "Boutique independent PR agency",
    fitScore: 35,
    intentScore: 30,
    vertical: "pr",
    subvertical: "media-relations",
    engagementModel: "freelance",
    buyerType: "agency",
    compensationText: "Compensation based on experience (not disclosed)",
    remoteFlag: "remote",
    employmentTypeRaw: "Freelance — part-time, project-based",
    urgencyScore: 40,
    source: "The PR Net jobs board, Aug 2026",
    sourceUrl: "https://theprnet.com/jobs/9049",
    notes: "Grade B (combined 65). Only confirmed-fresh, specific freelance PR posting this cycle. CAVEAT: pitched to early-career (1-2 yrs) and in lifestyle/fashion/tech, not Mark's core finance/legal sectors — soft fit for a senior operator. ANGLE: pitch as senior freelance overflow/execution (media strategy + placements), not a junior hire. ACTION: quick low-cost outreach to press@jihpr.com; low priority vs. financial-comms targets.",
    contacts: [
      { name: null, title: "Apply via direct email", email: "press@jihpr.com", linkedin: "https://www.linkedin.com/company/the-pr-net/" }
    ]
  },
  {
    name: "Vested — Financial & Fintech PR Agency (White-Label / Overflow Target)",
    website: "https://fullyvested.com/",
    pipeline: "pr-freelance",
    industry: "Global financial PR & marketing agency (self-described 4th-largest financial-services agency); team spans former investment professionals and creatives. Capabilities: message development, media training, crisis comms, newsroom management, internal comms. Built reporter-source tool Qwoted. 2022 PR News Top Elite Agency.",
    location: "Remote / NYC-HQ",
    fundingStage: "Established financial-comms agency (founded 2015)",
    fitScore: 50,
    intentScore: 15,
    vertical: "pr",
    subvertical: "investor-pr",
    engagementModel: "contract",
    buyerType: "agency",
    compensationText: "N/A — agency-overflow/white-label target",
    remoteFlag: "remote",
    employmentTypeRaw: "Agency-overflow / white-label pitch target (no live freelance posting)",
    urgencyScore: 25,
    source: "Web search — Vested agency profile (Avenue Z / Bolt PR fintech-agency indexes), Aug 2026",
    sourceUrl: "https://avenuez.com/blog/best-fintech-pr-agencies-of-2025-2026/",
    notes: "Grade B by score (combined 65) but LOWER CONFIDENCE — strong sector-fit pitch target with NO active posting found, so intent is inferred not observed. Included because directly ICP-aligned (large financial/fintech PR agency with recurring overflow need). ACTION: warm BD/white-label outreach; verify current capacity before investing time. Deprioritize vs. Caliber and JIH.",
    contacts: [
      { name: null, title: "BD / partnerships (via firm site)", email: null, linkedin: "https://www.linkedin.com/company/fullyvested" }
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
        scrapeDate: new Date("2026-08-10")
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
