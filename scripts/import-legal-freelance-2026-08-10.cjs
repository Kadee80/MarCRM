/**
 * Import script: Legal Freelance Scrape 2026-08-10
 * Run: node scripts/import-legal-freelance-2026-08-10.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 */

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const leads = [
  {
    "name": "Davis Wright Tremaine (DWTSurge) — Contract M&A Due Diligence Attorney (Remote)",
    "website": "https://www.legal.io/jobs/5731954/Contract/DWTSurge-Contract-M-A-Due-Diligence-Attorney-Remote/Remote",
    "pipeline": "legal-freelance",
    "industry": "DWTSurge is Davis Wright Tremaine's contract-attorney / alternative legal staffing program. Hiring a contract M&A due-diligence attorney to review and analyze contracts, corporate governance documents, financial documents, regulatory filings, real estate, IP, litigation and compliance records in support of M&A transactions.",
    "location": "Remote (must maintain West Coast business hours)",
    "fundingStage": "AmLaw firm ALSP / flexible-staffing program",
    "fitScore": 20,
    "intentScore": 40,
    "vertical": "legal",
    "subvertical": "M&A",
    "engagementModel": "contract",
    "buyerType": "law-firm",
    "compensationText": "Not stated",
    "remoteFlag": "remote",
    "employmentTypeRaw": "Contract M&A due-diligence attorney — 3-month engagement, remote (West Coast hours)",
    "urgencyScore": 55,
    "source": "Web search — Legal.io (Davis Wright Tremaine / DWTSurge), Aug 2026",
    "sourceUrl": "https://www.legal.io/jobs/5731954/Contract/DWTSurge-Contract-M-A-Due-Diligence-Attorney-Remote/Remote",
    "notes": "Grade B (combined 60). Best new lead of the run. Law-firm-overflow / ALSP channel — exactly the 'firms needing overflow or specialist support for corporate work' bucket in the ICP. M&A diligence is core corporate transactional work, and a bench relationship here can generate repeat contract flow beyond this single req. Constraint: West Coast hours. ACTION: apply to the DWTSurge bench with M&A / corporate-diligence experience.",
    "contacts": [
      {
        "name": null,
        "title": "Apply via Legal.io / DWTSurge program",
        "email": null,
        "linkedin": "https://www.linkedin.com/company/davis-wright-tremaine-llp"
      }
    ]
  },
  {
    "name": "Sustainable Wealth Group — Fractional Head of Legal & Compliance (Remote)",
    "website": "https://www.gofractional.com/job/sustainable-wealth-group-fractional-head-of-legal-compliance",
    "pipeline": "legal-freelance",
    "industry": "Wealth-management / advisory firm hiring a fractional Head of Legal & Compliance — investment-adviser regulatory compliance, corporate governance and legal risk for the advisory business. Routed through Go Fractional.",
    "location": "Remote",
    "fundingStage": "Wealth-management / advisory firm",
    "fitScore": 20,
    "intentScore": 40,
    "vertical": "legal",
    "subvertical": "compliance",
    "engagementModel": "fractional",
    "buyerType": "operating-company",
    "compensationText": "Not stated (Go Fractional legal roles typically ~$150–200/hr)",
    "remoteFlag": "remote",
    "employmentTypeRaw": "Fractional Head of Legal & Compliance — remote (Go Fractional)",
    "urgencyScore": 55,
    "source": "Web search — Go Fractional (Sustainable Wealth Group), Aug 2026",
    "sourceUrl": "https://www.gofractional.com/job/sustainable-wealth-group-fractional-head-of-legal-compliance",
    "notes": "Grade B (combined 60). Fund-adjacent compliance + governance role in the wealth/investment-advisory space — closest thing this week to the funds/regulatory bucket of the ICP. NEW end client via Go Fractional (the marketplace itself is a prior capture; this named client is not). ACTION: apply through Go Fractional; lead with investment-adviser / regulatory-compliance and governance experience; confirm whether scope touches private funds or only advisory compliance.",
    "contacts": [
      {
        "name": null,
        "title": "Apply via Go Fractional marketplace",
        "email": null,
        "linkedin": "https://www.linkedin.com/company/gofractional"
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
