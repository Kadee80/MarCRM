/**
 * Import script: Legal Freelance Scrape 2026-08-06
 * Run: node scripts/import-legal-freelance-2026-08-06.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "AE Studio",
    website: "https://ae.studio",
    pipeline: "legal-freelance",
    industry: "AI / data-science and software product development studio hiring a Fractional General Counsel (hybrid, contract-to-hire) — commercial and client services agreements, IP and open-source matters, corporate governance, and broad operational legal support for a fast-growing consultancy that also spins up its own venture products.",
    location: "Los Angeles, CA (Hybrid)",
    fundingStage: "Bootstrapped / profitable studio",
    fitScore: 30,
    intentScore: 40,
    vertical: "legal",
    subvertical: "GC",
    engagementModel: "fractional",
    buyerType: "operating-company",
    compensationText: "$150-$200/hr, 10-30 hrs/week",
    remoteFlag: "hybrid",
    employmentTypeRaw: "Fractional General Counsel (Contract-to-Hire), 10-30 hrs/week",
    urgencyScore: 55,
    source: "Go Fractional (curated legal board), posted 2026-07-25",
    sourceUrl: "https://www.gofractional.com/job/greenhouse-job-application-for-general-counsel-at-ae-studio-greenhouse",
    notes: "Grade B (combined 70). Clean fractional GC mandate at a profitable AI/software studio; commercial contracts and IP scope fit Katie's corporate/contracts positioning. Contract-to-hire flexibility means she can start fractional and convert only if mutually desired. Pitch: senior GC who stands up contracting and governance without a full-time seat.",
    contacts: [
      { name: null, title: "Hiring / Legal (apply via Greenhouse)", email: null, linkedin: "https://www.linkedin.com/company/ae-studio/" }
    ]
  },
  {
    name: "Ascenda Loyalty",
    website: "https://www.ascenda.com",
    pipeline: "legal-freelance",
    industry: "Fintech / loyalty-rewards infrastructure company (bank and fintech clients) hiring a General Counsel on a flexible/fractional basis via Go Fractional, fully remote US — commercial and partner contracts, data privacy, cross-border governance, and risk for a scaling B2B platform.",
    location: "Remote (US)",
    fundingStage: "Venture-backed / growth-stage",
    fitScore: 30,
    intentScore: 40,
    vertical: "legal",
    subvertical: "GC",
    engagementModel: "contract",
    buyerType: "operating-company",
    compensationText: "$150-$200/hr, 30-40 hrs/week",
    remoteFlag: "remote",
    employmentTypeRaw: "General Counsel (flexible / contract via Go Fractional), 30-40 hrs/week",
    urgencyScore: 55,
    source: "Go Fractional (curated legal board), posted 2026-07-18",
    sourceUrl: "https://www.gofractional.com/job/gem-ascenda-careers-gem",
    notes: "Grade B (combined 70). Fully remote GC engagement at a growth-stage fintech; 30-40 hrs/week is near full load but posted through a fractional marketplace, so a contract/interim structure is on the table. Strong commercial-contracts and privacy fit. Confirm whether they want interim coverage vs. a converting seat before scoping.",
    contacts: [
      { name: null, title: "Recruiting / Legal (apply via Gem)", email: null, linkedin: "https://www.linkedin.com/company/ascenda/" }
    ]
  },
  {
    name: "FAR.AI",
    website: "https://far.ai",
    pipeline: "legal-freelance",
    industry: "AI safety research organization (nonprofit) hiring a Fractional General Counsel (hybrid, Berkeley) — research grants and collaboration agreements, nonprofit governance, IP, vendor and commercial contracts, and compliance for a fast-growing research entity.",
    location: "Berkeley, CA (Hybrid)",
    fundingStage: "Grant / donor funded nonprofit",
    fitScore: 30,
    intentScore: 40,
    vertical: "legal",
    subvertical: "GC",
    engagementModel: "fractional",
    buyerType: "operating-company",
    compensationText: "$155-$215/hr, 12-32 hrs/week",
    remoteFlag: "hybrid",
    employmentTypeRaw: "Fractional General Counsel, 12-32 hrs/week",
    urgencyScore: 50,
    source: "Go Fractional (curated legal board), posted 2026-07-17",
    sourceUrl: "https://www.gofractional.com/job/far-ai-general-counsel",
    notes: "Grade B (combined 70). Fractional GC for an AI-safety research org: governance, grants/collaboration agreements, IP, and commercial paper. No fund angle, but a high-judgment corporate/governance mandate at a credible hourly rate. Hybrid Berkeley may need occasional on-site — confirm remote flexibility.",
    contacts: [
      { name: null, title: "Hiring / Ops (apply via posting)", email: null, linkedin: "https://www.linkedin.com/company/far-ai/" }
    ]
  },
  {
    name: "Bush & Bush Law Group",
    website: "https://www.bushandbushlaw.com",
    pipeline: "legal-freelance",
    industry: "Rapidly growing multi-state law firm hiring a Fractional General Counsel (1099, remote) as a strategic advisor to executive leadership — supporting firm expansion, multi-state regulatory compliance, corporate governance, and operational/business-of-law legal matters.",
    location: "Remote (US)",
    fundingStage: "",
    fitScore: 30,
    intentScore: 40,
    vertical: "legal",
    subvertical: "GC",
    engagementModel: "fractional",
    buyerType: "law-firm",
    compensationText: "$150-$225/hr (Go Fractional listing); 1099 independent contractor",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional General Counsel, Independent Contractor (1099)",
    urgencyScore: 50,
    source: "Workable (Bush & Bush Law Group) / Go Fractional listing",
    sourceUrl: "https://apply.workable.com/bushand-bush-law-group/j/DB00CC0996/",
    notes: "Grade B (combined 70). Law-firm-as-buyer: a scaling multi-state firm needs GC-level judgment on its own governance, compliance, and expansion — distinct from client legal work. 1099 fractional structure matches Katie's model exactly. Pitch: business-of-law GC standing up compliance and entity/governance infrastructure as the firm grows.",
    contacts: [
      { name: null, title: "Executive Leadership / Hiring (apply via Workable)", email: null, linkedin: "https://www.linkedin.com/company/bush-bush-law-group/" }
    ]
  },
  {
    name: "LCX USA Inc.",
    website: "https://www.lcx.com",
    pipeline: "legal-freelance",
    industry: "Regulated digital-asset exchange / tokenization platform hiring a Fractional AML Compliance Officer (remote) — AML/KYC program ownership, securities and money-transmission compliance, regulatory filings, and risk oversight for a crypto/securities-adjacent operating company.",
    location: "Miami, FL (Remote)",
    fundingStage: "",
    fitScore: 25,
    intentScore: 40,
    vertical: "legal",
    subvertical: "compliance",
    engagementModel: "fractional",
    buyerType: "operating-company",
    compensationText: "$145-$195/hr, 10-30 hrs/week",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional AML Compliance Officer, 10-30 hrs/week",
    urgencyScore: 55,
    source: "Go Fractional (curated legal board), posted 2026-07-08",
    sourceUrl: "https://www.gofractional.com/job/lcx-fractional-aml-office-usa",
    notes: "Grade B- (combined 65). Adjacent to Katie's securities/compliance strength but the seat is a named AML Compliance Officer rather than corporate counsel, so it is a stretch on function. Include as a compliance-subvertical lead; pitch only if she wants regulated-markets compliance work. Fully remote, credible hourly rate, clear fractional structure.",
    contacts: [
      { name: null, title: "Hiring / Compliance (apply via posting)", email: null, linkedin: "https://www.linkedin.com/company/lcx/" }
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
        scrapeDate: new Date("2026-08-06")
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
