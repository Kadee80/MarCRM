/**
 * Import script: PR Freelance Scrape 2026-07-10
 * Run: node scripts/import-pr-freelance-2026-07-10.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "Comms Search & Selection — Interim & Contract Communications / IR Bench",
    website: "https://www.commssearch.com/hire-talent-and-leaders/contract-and-interim",
    pipeline: "pr-freelance",
    industry: "Communications & IR executive search / interim staffing",
    location: "Remote-capable; London (HQ) + Houston, US; transatlantic placements",
    fundingStage: "n/a",
    fitScore: 50,
    intentScore: 35,
    vertical: "pr",
    subvertical: "agency-overflow",
    engagementModel: "interim",
    buyerType: "staffing",
    compensationText: "Day-rate / interim daily rates (not published)",
    remoteFlag: "hybrid",
    employmentTypeRaw: "Interim / contract / freelance placements via recruiter bench",
    urgencyScore: 70,
    source: "Web fetch (commssearch.com — Contract & Interim practice page)",
    sourceUrl: "https://www.commssearch.com/hire-talent-and-leaders/contract-and-interim",
    notes: "Grade A (combined 85). Strongest new lead this run: comms/IR-specialist recruiter with a curated freelance/interim bench serving finance/asset-management clients (First Sentier, Hines, DRW, Chubb/BNY, Climate Investments). ACTION: register CV and email Max Forsyth to join the interim bench for US (Houston) + transatlantic financial-comms/IR briefs. Lead with US-market + finance-IR experience (firm is UK-centric).",
    contacts: [
      { name: "Max Forsyth", title: "Managing Director, Founder & Head of Executive Search", email: "max.forsyth@commssearch.com", linkedin: "https://www.linkedin.com/in/max-forsyth-comms-ir-exec-talent-search-recruitment-uk-us/" },
      { name: "Nandita Samant", title: "Head of Communications Practice", email: "nandita.samant@commssearch.com", linkedin: "https://www.linkedin.com/in/nandita-samant-289b9057/" }
    ]
  },
  {
    name: "Creative Circle — Contract / Freelance Communications & PR Placements",
    website: "https://candidateportal.creativecircle.com/search",
    pipeline: "pr-freelance",
    industry: "Creative & marketing staffing agency (contract/freelance)",
    location: "Remote + US metros (and Toronto); new roles posted daily",
    fundingStage: "n/a",
    fitScore: 30,
    intentScore: 40,
    vertical: "pr",
    subvertical: "comms",
    engagementModel: "contract",
    buyerType: "staffing",
    compensationText: "Contract comms/creative roles commonly $40-55/hr (avg ~$41.83/hr, Jun 2026)",
    remoteFlag: "remote",
    employmentTypeRaw: "Contract / temporary (W-2 staffing)",
    urgencyScore: 55,
    source: "Web search (Creative Circle candidate portal / FlexJobs / ZipRecruiter, July 2026)",
    sourceUrl: "https://candidateportal.creativecircle.com/search",
    notes: "Grade B (combined 70). New staffing channel not previously captured (distinct from Scion/Robert Half). W-2 contract (employmentTypeRaw) vs. true freelance (engagementModel). ACTION: register on candidate portal, filter Marketing & Communications + Freelance/Contract + Remote, set alerts.",
    contacts: []
  },
  {
    name: "Toptal — Freelance Fintech / Communications Consultant Marketplace",
    website: "https://www.toptal.com/management-consultants/fintech",
    pipeline: "pr-freelance",
    industry: "Vetted freelance talent marketplace (fintech / management consulting)",
    location: "Remote / global",
    fundingStage: "n/a",
    fitScore: 30,
    intentScore: 35,
    vertical: "pr",
    subvertical: "content-strategy",
    engagementModel: "freelance",
    buyerType: "staffing",
    compensationText: "Project/hourly by engagement; rates set by consultant",
    remoteFlag: "remote",
    employmentTypeRaw: "Freelance marketplace membership",
    urgencyScore: 45,
    source: "Web search (Toptal fintech consultants, July 2026)",
    sourceUrl: "https://www.toptal.com/management-consultants/fintech",
    notes: "Grade B/C (combined 65). Marginal on PR-remit (Toptal skews consulting/dev) but fintech client base + freelance model fit. ACTION: optional register as a fintech comms/positioning specialist. Lower priority than Comms Search & Selection.",
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
        scrapeDate: new Date("2026-07-10")
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
