/**
 * Import script: Legal Freelance Scrape 2026-08-05
 * Run: node scripts/import-legal-freelance-2026-08-05.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "Axiom Law",
    website: "https://www.axiomlaw.com",
    pipeline: "legal-freelance",
    industry: "Alternative legal services provider (ALSP) / flexible legal talent platform placing experienced funds and corporate counsel with clients on remote, hourly, project engagements — subscription documents, side letters, fund/SPV support, investor onboarding, and commercial contracts.",
    location: "Remote (US)",
    fundingStage: "",
    fitScore: 40,
    intentScore: 40,
    vertical: "legal",
    subvertical: "fund",
    engagementModel: "consultant",
    buyerType: "ALSP",
    compensationText: "Hourly / billable-hours model, rate set per engagement",
    remoteFlag: "remote",
    employmentTypeRaw: "Flexible / contract counsel (ALSP bench)",
    urgencyScore: 60,
    source: "Indeed (Axiom Law, top hiring company for remote investment fund counsel), Aug 2026",
    sourceUrl: "https://www.indeed.com/q-investment-fund-counsel-l-remote-jobs.html",
    notes: "Grade A (combined 80). Best structural fit of the run: a well-known ALSP that places senior fund + corporate counsel on remote, hourly, project terms — exactly Katie's operating model. Action: join the Axiom lawyer network so fund-formation and commercial-contracts engagements route to her. Apply via axiomlaw.com.",
    contacts: [
      { name: null, title: "Lawyer Network / Talent", email: null, linkedin: "https://www.linkedin.com/company/axiom-law/" }
    ]
  },
  {
    name: "Allocate",
    website: "https://allocate.co",
    pipeline: "legal-freelance",
    industry: "Private-markets investment / fund infrastructure platform hiring a Fund Formation Attorney (Senior and Associate levels), remote US — structuring investment vehicles, LPAs, PPMs, subscription documents, fund filings, regulatory compliance, and corporate governance.",
    location: "Remote (US)",
    fundingStage: "Venture-backed platform",
    fitScore: 50,
    intentScore: 25,
    vertical: "legal",
    subvertical: "fund",
    engagementModel: "",
    buyerType: "fund",
    compensationText: "$190,000–$220,000 (senior); associate level lower",
    remoteFlag: "remote",
    employmentTypeRaw: "Full-time in-house Fund Formation Attorney (Senior / Associate)",
    urgencyScore: 45,
    source: "The Ladders / Allocate Freshteam, Aug 2026",
    sourceUrl: "https://www.theladders.com/job/fund-formation-attorney-remote-in-u-s-allocate-virtual-travel_83653051",
    notes: "Grade B (combined 75). Highest fund-fit of the run, but the posted role is FULL-TIME in-house — off Katie's fractional/contract model. Retained as a buyer-relationship target: a platform with continuous fund-formation volume and clear overflow. Pitch overflow/contract fund-formation support (LPAs, subs, side letters) rather than the FT seat. Associate posting: https://allocate.freshteam.com/jobs/siS-YMRJZ3h5/junior-fund-formation-attorney-remote",
    contacts: [
      { name: null, title: "Legal Team / Recruiting", email: null, linkedin: "https://www.linkedin.com/company/allocate-co/" }
    ]
  },
  {
    name: "Larson Maddox",
    website: "https://www.larsonmaddox.com",
    pipeline: "legal-freelance",
    industry: "Legal & compliance executive search firm placing a Funds / Investment Management Attorney, fully remote — investment management and private fund matters. Recruiter-driven placement (contract vs. permanent to confirm).",
    location: "Remote (US)",
    fundingStage: "",
    fitScore: 40,
    intentScore: 25,
    vertical: "legal",
    subvertical: "fund",
    engagementModel: "contract",
    buyerType: "staffing",
    compensationText: "",
    remoteFlag: "remote",
    employmentTypeRaw: "Funds / Investment Management Attorney (fully remote), via search firm",
    urgencyScore: 45,
    source: "Larson Maddox, Aug 2026",
    sourceUrl: "https://www.larsonmaddox.com/en-us/job/fundsinvestment-management-attorney-fully-remote-pr591520_1778104040",
    notes: "Grade B (combined 65). Fund-focused, fully remote, via a specialist legal search firm that places contract/interim counsel. Confirm the engagement is contract/interim (not a permanent seat) before investing pitch effort. Worth being on Larson Maddox's roster for recurring funds work.",
    contacts: [
      { name: null, title: "Legal & Compliance Recruiter", email: null, linkedin: "https://www.linkedin.com/company/larson-maddox/" }
    ]
  },
  {
    name: "Indigo Technologies",
    website: "",
    pipeline: "legal-freelance",
    industry: "Early-stage insurance / healthcare technology company hiring a Fractional General Counsel (remote), reporting to the CEO — regulatory compliance (state-by-state insurance, healthcare, data privacy), contract negotiations, IP protection, and risk management; designing the legal function from the ground up.",
    location: "Remote (US)",
    fundingStage: "Early-stage",
    fitScore: 20,
    intentScore: 40,
    vertical: "legal",
    subvertical: "GC",
    engagementModel: "fractional",
    buyerType: "operating-company",
    compensationText: "",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional General Counsel (remote)",
    urgencyScore: 55,
    source: "Fractional Jobs (Indigo Technologies), Aug 2026",
    sourceUrl: "https://www.fractionaljobs.io/jobs/general-counsel-at-indigo-technologies",
    notes: "Grade B (combined 60). Clean remote fractional GC mandate designing the legal function for an insurance/health-tech startup. No fund angle, but strong corporate/compliance/IP scope. Pitch: senior GC who can stand up compliance and contracting without a full-time hire.",
    contacts: [
      { name: null, title: "CEO / Hiring (apply via posting)", email: null, linkedin: null }
    ]
  },
  {
    name: "Hayden Industrial LLC",
    website: "",
    pipeline: "legal-freelance",
    industry: "Industrial / engineered-equipment supply company hiring a Fractional General Counsel — reviewing, redlining, and negotiating commercial contracts (engineered equipment supply, industrial project delivery) plus broad operational legal support; roughly 1–2 days/week on a monthly retainer or fractional hourly basis.",
    location: "Remote (US)",
    fundingStage: "",
    fitScore: 20,
    intentScore: 40,
    vertical: "legal",
    subvertical: "contracts",
    engagementModel: "fractional",
    buyerType: "operating-company",
    compensationText: "Monthly retainer or fractional hourly (number not stated)",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional General Counsel, ~1–2 days/week (retainer or hourly)",
    urgencyScore: 55,
    source: "Indeed (Hayden Industrial LLC), Aug 2026",
    sourceUrl: "https://www.indeed.com/q-fractional-general-counsel-jobs.html",
    notes: "Grade B (combined 60). Textbook fractional commercial-contracts mandate: retainer, ~1–2 days/week, remote. No fund angle. Strong template for Katie's fractional commercial-contracts positioning — vendor/customer paper and negotiation without a full-time hire.",
    contacts: [
      { name: null, title: "Hiring (apply via posting)", email: null, linkedin: null }
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
        scrapeDate: new Date("2026-08-05")
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
