/**
 * Import script: PR Freelance Scrape 2026-07-23
 * Run: node scripts/import-pr-freelance-2026-07-23.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "PagerDuty — Interim Director of Communications (6-month contract, via Go Fractional)",
    website: "https://www.gofractional.com",
    pipeline: "pr-freelance",
    industry: "Public B2B SaaS (digital operations / incident management). Interim Director of Communications leading PR/media relations, social media and internal communications during a leadership gap.",
    location: "San Francisco Bay Area (hybrid)",
    fundingStage: "Public company (NYSE: PD)",
    fitScore: 45,
    intentScore: 40,
    vertical: "pr",
    subvertical: "executive-comms",
    engagementModel: "interim",
    buyerType: "operating-company",
    compensationText: "Not published in listing — Go Fractional interim director engagements typically retainer/day-rate",
    remoteFlag: "hybrid",
    employmentTypeRaw: "6-month interim contract (via Go Fractional marketplace)",
    urgencyScore: 78,
    source: "Go Fractional job listing (indexed), July 2026",
    sourceUrl: "https://www.gofractional.com/job/welcometothejungle-interim-director-communications-pagerduty",
    notes: "Grade A (combined 85). The single most concrete named req this week: an interim Director of Communications at an established public B2B SaaS company covering PR, media relations, social and internal comms for ~6 months — a textbook senior interim slot for Mark. ACTION: apply through Go Fractional; lead with enterprise/B2B earned-media results and a 30-day interim plan (audit, active pressroom, exec visibility). CAVEATS: Bay Area hybrid — confirm remote tolerance; competitive marketplace; verify listing still live before pitching.",
    contacts: [
      {
        name: null,
        title: "Go Fractional talent matcher",
        email: null,
        linkedin: "https://www.gofractional.com/job/welcometothejungle-interim-director-communications-pagerduty"
      }
    ]
  },
  {
    name: "FinTalent — Freelance Investor Relations & Communications Marketplace",
    website: "https://fintalent.com",
    pipeline: "pr-freelance",
    industry: "Curated marketplace matching freelance investor-relations and corporate-communications consultants to finance/corp-dev clients (funds, corporates, PE/VC-backed and pre-IPO companies).",
    location: "Remote / global",
    fundingStage: "n/a — freelance marketplace",
    fitScore: 45,
    intentScore: 33,
    vertical: "pr",
    subvertical: "investor-pr",
    engagementModel: "freelance",
    buyerType: "staffing",
    compensationText: "Not published — per-engagement rates; finance IR/comms typically premium hourly/project",
    remoteFlag: "remote",
    employmentTypeRaw: "Freelance consultant in a curated finance-focused marketplace",
    urgencyScore: 45,
    source: "FinTalent freelance IR consultants page (indexed), July 2026",
    sourceUrl: "https://fintalent.com/consultants/corporate-development/investor-relations/",
    notes: "Grade B (combined 78). Finance-native marketplace routing freelance IR and corporate-comms work from funds, corporates and pre-IPO clients — squarely in Mark's investor-narrative/finance wheelhouse and a differentiated channel vs. the generalist benches already in the CRM (Toptal, The Work Crowd). ACTION: apply to the consultant pool positioning investor/media narrative + earned media for finance clients. CAVEATS: skews corp-dev/IR analytical rather than pure earned media — position the comms/narrative angle; evergreen intake, demand-driven so lower immediate intent.",
    contacts: [
      {
        name: null,
        title: "Consultant onboarding / talent enquiries",
        email: null,
        linkedin: "https://fintalent.com/consultants/corporate-development/investor-relations/"
      }
    ]
  },
  {
    name: "Mission North — Freelance Communications & PR Talent Network",
    website: "https://www.missionnorth.com",
    pipeline: "pr-freelance",
    industry: "Strategic communications agency for technology and innovation brands (B2B tech, enterprise, impact). Recruits vetted freelancers in communications, PR, digital and content for ongoing project and overflow work.",
    location: "Remote / US (agency HQ San Francisco)",
    fundingStage: "n/a — independent agency network",
    fitScore: 45,
    intentScore: 30,
    vertical: "pr",
    subvertical: "agency-overflow",
    engagementModel: "freelance",
    buyerType: "agency",
    compensationText: "Not published — project/rate negotiated per engagement",
    remoteFlag: "remote",
    employmentTypeRaw: "Freelancer / independent contractor within agency talent network",
    urgencyScore: 40,
    source: "Mission North careers/freelance-network page (indexed), July 2026",
    sourceUrl: "https://www.missionnorth.com/careers",
    notes: "Grade B (combined 75). Respected B2B/enterprise-tech comms agency that actively recruits freelancers for ongoing project and overflow execution — a strong senior-subcontractor entry point in Mark's sector. ACTION: apply to the freelancer network with a senior one-pager (B2B tech earned-media wins, exec comms, thought leadership); position for overflow at director level. CAVEATS: network intake is evergreen, not an acute req — lower immediate intent; confirm they route senior strategic work vs. junior execution.",
    contacts: [
      {
        name: null,
        title: "Freelance network / talent enquiries",
        email: null,
        linkedin: "https://www.linkedin.com/company/mission-north"
      }
    ]
  },
  {
    name: "Hanson Search — Freelance Senior Account Manager, PR (Interim, agency growth cover)",
    website: "https://www.hansonsearch.com",
    pipeline: "pr-freelance",
    industry: "Communications/PR recruiter placing an interim freelance Senior Account Manager into a boutique agency in growth mode to cover a busy period (agency overflow).",
    location: "London (interim; confirm remote tolerance)",
    fundingStage: "n/a — recruiter-brokered agency contract",
    fitScore: 40,
    intentScore: 35,
    vertical: "pr",
    subvertical: "agency-overflow",
    engagementModel: "interim",
    buyerType: "agency",
    compensationText: "Day rate (not published in summary) — recruiter-negotiated",
    remoteFlag: "onsite",
    employmentTypeRaw: "Freelance / interim day-rate contract, brokered by Hanson Search",
    urgencyScore: 68,
    source: "Hanson Search job listing, July 2026",
    sourceUrl: "https://www.hansonsearch.com/jobs/freelance-senior-account-manager-london/",
    notes: "Grade B (combined 75). Concrete freelance/interim SAM req covering an agency's busy period — real overflow demand with a named recruiter to build a relationship with. ACTION: register with Hanson Search's PR desk even if this specific role is UK/onsite; ask to be flagged for US/remote senior interim PR briefs. CAVEATS: London-based, remote not confirmed — likely a relationship play rather than this exact role for a US-based Mark; sector fit generic.",
    contacts: [
      {
        name: null,
        title: "Hanson Search consultant (PR desk)",
        email: null,
        linkedin: "https://www.hansonsearch.com/jobs/freelance-senior-account-manager-london/"
      }
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
        scrapeDate: new Date("2026-07-23")
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
