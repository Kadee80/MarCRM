/**
 * Import script: Legal Freelance Scrape 2026-07-15
 * Run: node scripts/import-legal-freelance-2026-07-15.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 * All leads: pipeline = "legal-freelance".
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "Paragon Legal — Private Funds Attorney (Contract, Remote/Hybrid)",
    website: "https://paragonlegal.com/",
    pipeline: "legal-freelance",
    industry: "ALSP (flexible/interim in-house counsel) — end client is a global investment management firm",
    location: "Remote; hybrid preference Nashville or Minneapolis",
    fundingStage: "n/a",
    fitScore: 50,
    intentScore: 40,
    vertical: "legal",
    subvertical: "fund",
    engagementModel: "contract",
    buyerType: "ALSP",
    compensationText: "$110–$120/hr; ~3-month project w/ potential extension; ~20+ hrs/week up to full-time",
    remoteFlag: "hybrid",
    employmentTypeRaw: "Contract (W-2 via Paragon Legal); project-based",
    urgencyScore: 78,
    source: "Web search + direct fetch (Paragon Legal opportunities, July 2026)",
    sourceUrl: "https://paragonlegal.com/jobs/private-funds-attorney/",
    notes: "Grade A (combined 90). Bullseye ICP: private fund formation (private credit/hedge/RE) for an investment mgmt firm; contract, remote, $110-120/hr. New channel. ACTION: apply directly; lead with LPA/PPM/side-letter drafting + offshore structuring; also join Paragon's general bench.",
    contacts: [
      { name: "Paragon Legal — Attorney Recruiting", title: "Recruiting / Sourcing Team", email: "info@paragonlegal.com", linkedin: "https://www.linkedin.com/company/paragon-legal" }
    ]
  },
  {
    name: "PsychPlus — Fractional General Counsel (Remote)",
    website: "https://www.psychplus.com",
    pipeline: "legal-freelance",
    industry: "Healthtech / digital-first mental health (physician group practice), growth-stage VC-backed",
    location: "Remote (USA only)",
    fundingStage: "Growth-stage VC",
    fitScore: 30,
    intentScore: 50,
    vertical: "legal",
    subvertical: "GC",
    engagementModel: "fractional",
    buyerType: "operating-company",
    compensationText: "$150–$200/hr; 10–20 hrs/week",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional / part-time contract (1099)",
    urgencyScore: 82,
    source: "Web search + direct fetch (FractionalJobs.io / LinkedIn, July 2026)",
    sourceUrl: "https://www.fractionaljobs.io/jobs/general-counsel-at-psychplus",
    notes: "Grade B / watch (raw model 80; downgraded on fit). Terms excellent ($150-200/hr, remote, fractional) but REQUIRES extensive healthcare / physician-group-practice experience (HIPAA, Stark, AKS, telehealth, corporate practice of medicine) — a stretch vs Katie's corporate/fund positioning. Pitch corporate-governance/commercial/financing half if pursuing; verify LinkedIn posting live.",
    contacts: [
      { name: "PsychPlus — Executive Leadership / Hiring", title: "Hiring Team", email: "", linkedin: "https://www.linkedin.com/jobs/view/4436806730/" }
    ]
  },
  {
    name: "Battlement Systems — Fractional Corporate Counsel (Remote, NJ Bar)",
    website: "https://www.linkedin.com/company/battlement-systems/",
    pipeline: "legal-freelance",
    industry: "Sovereign AI Infrastructure-as-a-Service (IaaS); pre-revenue, NJ-headquartered",
    location: "Remote (NJ Bar required)",
    fundingStage: "Pre-revenue / early",
    fitScore: 20,
    intentScore: 50,
    vertical: "legal",
    subvertical: "financing",
    engagementModel: "fractional",
    buyerType: "operating-company",
    compensationText: "Not stated",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional 1099 independent contractor (NJ ABC-test compliant)",
    urgencyScore: 80,
    source: "Web search + direct fetch (FractionalJobs.io / LinkedIn, July 2026)",
    sourceUrl: "https://www.fractionaljobs.io/jobs/corporate-counsel-at-battlement-systems",
    notes: "Grade B (combined 70). Corporate structuring + project-finance mandate for a fractional independent operator; good model fit. Constraints: requires active NJ Bar (out-of-state not considered) and comp not stated. If NJ-barred, clean defined-scope engagement — lead with entity structuring, debt-line readiness, partnership-tax frameworks. Verify posting live.",
    contacts: [
      { name: "Battlement Systems — Hiring / Founder", title: "Founder / Hiring", email: "", linkedin: "https://www.linkedin.com/jobs/view/4437071865/" }
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
        scrapeDate: new Date("2026-07-15")
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
