/**
 * Import script: Legal Freelance Scrape 2026-08-14
 * Run: node scripts/import-legal-freelance-2026-08-14.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "Ontra — US-Licensed Freelance Fund Formation Lawyer (Remote)",
    website: "https://ontra.ai",
    pipeline: "legal-freelance",
    industry: "Legal-tech platform serving leading private-markets clients (PE, VC, credit, asset managers) with high-volume fund and contract work. Engages US-licensed lawyers as independent freelancers who select engagements on their own schedule while Ontra handles invoicing, billing, collections and business development.",
    location: "Remote (US)",
    fundingStage: "Legal-tech platform / ALSP (private-markets focus)",
    fitScore: 50,
    intentScore: 40,
    vertical: "legal",
    subvertical: "fund",
    engagementModel: "freelance",
    buyerType: "ALSP",
    compensationText: "Hourly, paid per billable engagement (rate set via platform); no figure published on listing",
    remoteFlag: "remote",
    employmentTypeRaw: "Freelance / independent contractor (platform engagement)",
    urgencyScore: 62,
    source: "Web search — Built In listing for Ontra US-Licensed Freelance Fund Formation Lawyer, Aug 2026",
    sourceUrl: "https://www.builtinsf.com/job/legal/us-licensed-freelance-fund-formation-lawyer-remote/103064",
    notes: "Grade A (combined 90) — highest-fit find this cycle, cleanest match to Katie's fund-formation profile. Freelance model with billing handled; she picks engagements. ACTION: apply directly via Built In and get onto the fund-formation panel.",
    contacts: [
      { name: null, title: "Freelance Fund Formation Lawyer (US-Licensed)", email: null, linkedin: "https://www.linkedin.com/company/ontra/" }
    ]
  },
  {
    name: "Priori Legal — Corporate & Funds Outside-Counsel Marketplace (Talent Network)",
    website: "https://www.priorilegal.com",
    pipeline: "legal-freelance",
    industry: "Global vetted legal marketplace (8,000+ providers) connecting in-house legal teams (1 to 1000+) with outside counsel for project-based corporate, commercial and funds work, plus outside-counsel-management software. Enrollment channel routing matched projects on flexible terms.",
    location: "Remote (US, project-based)",
    fundingStage: "Established legal marketplace / ALSP",
    fitScore: 45,
    intentScore: 30,
    vertical: "legal",
    subvertical: "corporate",
    engagementModel: "freelance",
    buyerType: "ALSP",
    compensationText: "Per-project rate set by attorney via marketplace",
    remoteFlag: "remote",
    employmentTypeRaw: "Marketplace talent network (project engagements)",
    urgencyScore: 50,
    source: "Web search — Priori Legal attorney network / talent marketplace, Aug 2026",
    sourceUrl: "https://www.priorilegal.com/our-attorney-network/",
    notes: "Grade B (combined 75) — high-leverage enrollment channel not previously captured; routes recurring corporate/funds outside-counsel projects. ACTION: join the attorney network and flag fund-formation + corporate/commercial specialties.",
    contacts: [
      { name: null, title: "Join Priori's Attorney Network", email: null, linkedin: "https://www.linkedin.com/company/priori-legal/" }
    ]
  },
  {
    name: "Hire an Esquire — Freelance Corporate/Funds Attorney Network (Live Jobs Board)",
    website: "https://www.hireanesquire.com",
    pipeline: "legal-freelance",
    industry: "Ultra-vetted national marketplace of 15,000+ attorneys and paraprofessionals matching flexible and permanent legal talent to firms and legal departments, with predictive hiring analytics and a public live jobs board of project/contract/freelance postings.",
    location: "Remote (US, project/contract)",
    fundingStage: "Established flexible-legal-talent marketplace",
    fitScore: 35,
    intentScore: 35,
    vertical: "legal",
    subvertical: "corporate",
    engagementModel: "freelance",
    buyerType: "staffing",
    compensationText: "Set per posting (project/contract); rates vary",
    remoteFlag: "remote",
    employmentTypeRaw: "Freelance marketplace with live jobs board",
    urgencyScore: 55,
    source: "Web search — Hire an Esquire public freelance jobs board, Aug 2026",
    sourceUrl: "https://app.hireanesquire.com/public/jobs",
    notes: "Grade B (combined 70) — distinct from a passive bench: active public jobs board Katie can filter and apply to directly. ACTION: register, set corporate/funds/commercial filters, monitor the board weekly.",
    contacts: [
      { name: null, title: "Browse & apply — Freelance attorney jobs board", email: null, linkedin: "https://www.linkedin.com/company/hire-an-esquire/" }
    ]
  },
  {
    name: "Paragon Legal — In-House Counsel On-Demand (Corporate/Commercial, Talent Network)",
    website: "https://paragonlegal.com",
    pipeline: "legal-freelance",
    industry: "Flexible legal-talent firm placing experienced attorneys as embedded 'in-house counsel on demand' with companies whose in-house teams need overflow or project support. Alternative to outside firms and permanent hires — fractional/embedded engagement model.",
    location: "Remote / hybrid (US, engagement-based)",
    fundingStage: "Established flexible-legal-talent firm / ALSP",
    fitScore: 35,
    intentScore: 30,
    vertical: "legal",
    subvertical: "corporate",
    engagementModel: "fractional",
    buyerType: "ALSP",
    compensationText: "Engagement-based comp via Paragon; not published",
    remoteFlag: "hybrid",
    employmentTypeRaw: "Embedded in-house-on-demand placement",
    urgencyScore: 48,
    source: "Web search — Paragon Legal in-house counsel on demand, Aug 2026",
    sourceUrl: "https://paragonlegal.com/",
    notes: "Grade B (combined 65) — enrollment channel for embedded interim in-house work; not previously captured. Best fit for corporate/commercial overflow rather than fund formation. ACTION: apply to Paragon's roster; position for financial-services corporate clients.",
    contacts: [
      { name: null, title: "Work with Paragon — In-house counsel on demand", email: null, linkedin: "https://www.linkedin.com/company/paragon-legal/" }
    ]
  },
  {
    name: "The Mom Project — Interim Securities Counsel (Remote, EST)",
    website: "https://themomproject.com",
    pipeline: "legal-freelance",
    industry: "Flexible-talent marketplace placing an interim securities counsel on a remote (EST) contract engagement for a client needing interim securities-law coverage. Live, specific interim req rather than a passive bench listing.",
    location: "Remote (EST)",
    fundingStage: "Client engagement via talent marketplace",
    fitScore: 25,
    intentScore: 40,
    vertical: "legal",
    subvertical: "securities",
    engagementModel: "interim",
    buyerType: "staffing",
    compensationText: "Contract engagement via The Mom Project; rate not published",
    remoteFlag: "remote",
    employmentTypeRaw: "Interim contract engagement (marketplace-placed)",
    urgencyScore: 68,
    source: "Web search — LinkedIn-indexed The Mom Project interim securities counsel listing, Aug 2026",
    sourceUrl: "https://www.linkedin.com/jobs/view/interim-securities-counsel-remote-est-at-the-mom-project-4177329797",
    notes: "Grade B (combined 65) — live interim req with immediate-need signal. Lower fund fit but strong intent. ACTION: apply if securities remit is investment-management-adjacent; confirm scope before pitching fund-formation angle.",
    contacts: [
      { name: null, title: "Interim Securities Counsel (Remote, EST)", email: null, linkedin: "https://www.linkedin.com/company/the-mom-project/" }
    ]
  },
  {
    name: "Fractional Jobs — Fractional Legal Counsel, Stealth Venture-Backed Startup (Remote)",
    website: "https://www.fractionaljobs.io",
    pipeline: "legal-freelance",
    industry: "Curated fractional-roles board; live posting for a stealth, venture-backed startup building an employee-compensation product for small businesses, hiring a fractional legal counsel for commercial, product and corporate support on a part-time basis.",
    location: "Remote (US)",
    fundingStage: "Venture-backed startup (stealth)",
    fitScore: 25,
    intentScore: 40,
    vertical: "legal",
    subvertical: "GC",
    engagementModel: "fractional",
    buyerType: "portfolio-company",
    compensationText: "Fractional engagement; rate not published",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional engagement (board posting)",
    urgencyScore: 60,
    source: "Web search — Fractional Jobs listing for stealth venture-backed startup fractional legal counsel, Aug 2026",
    sourceUrl: "https://www.fractionaljobs.io/jobs/fractional-legal-counsel-stealth-startup",
    notes: "Grade B (combined 65) — clean fractional-GC entry point at a VC-backed operating company; commercial/corporate rather than fund work. ACTION: apply directly; good ongoing fractional relationship if product-legal scope fits.",
    contacts: [
      { name: null, title: "Fractional Legal Counsel — Stealth Startup", email: null, linkedin: "https://www.linkedin.com/company/fractional-jobs/" }
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
        scrapeDate: new Date("2026-08-14")
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
