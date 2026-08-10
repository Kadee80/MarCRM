/**
 * Import script: Legal Freelance Scrape 2026-07-31
 * Run: node scripts/import-legal-freelance-2026-07-31.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 * All leads: pipeline = "legal-freelance".
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "Lawyers on Demand (LOD) — Commercial Contracts Attorney (6+ Month Remote Engagement, $70/hr)",
    website: "https://careers.lodlaw.com",
    pipeline: "legal-freelance",
    industry: "ALSP / flexible legal talent (Consilio company). Placing a contract commercial-contracts attorney on a long-term, fully remote engagement supporting a large law firm client.",
    location: "Remote (US)",
    fundingStage: "",
    fitScore: 30,
    intentScore: 40,
    vertical: "legal",
    subvertical: "contracts",
    engagementModel: "contract",
    buyerType: "ALSP",
    compensationText: "$70/hour+ (commensurate with experience)",
    remoteFlag: "remote",
    employmentTypeRaw: "Long-term contract, full-time (40 hrs/wk), 6+ months",
    urgencyScore: 70,
    source: "Lawyers on Demand (Consilio) careers, July 2026",
    sourceUrl: "https://careers.lodlaw.com/jobs/102220",
    notes: "Grade B (combined 70). Strongest of the run: explicit rate, fully remote, long duration, clear commercial-contracts remit. COMMERCIAL-MODEL CAVEAT: LOD staffs on ALSP terms (contractor via ALSP), not a direct 1099 retainer with the end client. Distinct fresh posting (#102220). ACTION: apply/register; position senior commercial-contracts + corporate governance depth.",
    contacts: [
      { name: null, title: "LOD recruiter / talent bench", email: null, linkedin: "https://careers.lodlaw.com/jobs/102220" }
    ]
  },
  {
    name: "SylloTips — Fractional General Counsel / Legal Officer (AI/SaaS, ~1–2 days/wk)",
    website: "https://jobs.techstars.com/companies/syllotips",
    pipeline: "legal-freelance",
    industry: "Early-stage enterprise AI / SaaS company (Rome-founded; Techstars-accelerated; Harvard Innovation Labs). Hiring a fractional GC to own corporate governance, commercial contracts, data privacy (GDPR / EU AI Act), employment, IP and fundraising, reporting to the CEO.",
    location: "Remote / Rome-based (international)",
    fundingStage: "Early-stage (Techstars / Harvard iLab)",
    fitScore: 20,
    intentScore: 40,
    vertical: "legal",
    subvertical: "GC",
    engagementModel: "fractional",
    buyerType: "operating-company",
    compensationText: "",
    remoteFlag: "hybrid",
    employmentTypeRaw: "Fractional, ~1–2 days/week",
    urgencyScore: 55,
    source: "Techstars Job Board (SylloTips), July 2026",
    sourceUrl: "https://jobs.techstars.com/companies/syllotips/jobs/61810743-privacy-cybersecurity-expert",
    notes: "Grade B (combined 60). New company. Genuine fractional GC engagement with startup-formation, commercial-contracts and fundraising scope. CAVEAT: Rome-based with GDPR / EU AI Act emphasis; US-license value limited and US-remote eligibility needs confirmation. ACTION: confirm US-remote eligibility before pitching; lead with corporate governance + fundraising + commercial-contracts wins.",
    contacts: [
      { name: null, title: "CEO (direct report)", email: null, linkedin: "https://jobs.techstars.com/companies/syllotips" }
    ]
  },
  {
    name: "Robert Half — General Counsel (Midtown NYC, Contract-to-Hire, $75–125/hr)",
    website: "https://www.roberthalf.com",
    pipeline: "legal-freelance",
    industry: "Legal staffing firm placing a General Counsel directly with a client in Midtown Manhattan on a contract-to-hire basis; start July 2026.",
    location: "New York, NY (Midtown) — hybrid/onsite",
    fundingStage: "",
    fitScore: 30,
    intentScore: 25,
    vertical: "legal",
    subvertical: "GC",
    engagementModel: "contract",
    buyerType: "staffing",
    compensationText: "$75–$125/hour (contract-to-hire)",
    remoteFlag: "hybrid",
    employmentTypeRaw: "Contract-to-hire, July 2026 start",
    urgencyScore: 60,
    source: "Robert Half Legal (New York GC listings), July 2026",
    sourceUrl: "https://www.roberthalf.com/us/en/jobs/new-york-ny/general-counsel",
    notes: "Grade C (combined 55). Legitimate GC-level contract engagement with a credible stated rate and immediate start. WEAKNESS: Midtown NYC (hybrid/onsite likely), weaker on remote-flex. Distinct fresh GC posting. ACTION: quick recruiter conversation if open to NYC hybrid; confirm remote/hybrid split and client industry (fund-adjacent would raise fit).",
    contacts: [
      { name: null, title: "Robert Half legal recruiter", email: null, linkedin: "https://www.roberthalf.com/us/en/jobs/new-york-ny/general-counsel" }
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
        scrapeDate: new Date("2026-07-31")
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
