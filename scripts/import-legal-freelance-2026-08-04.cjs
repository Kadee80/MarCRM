/**
 * Import script: Legal Freelance Scrape 2026-08-04
 * Run: node scripts/import-legal-freelance-2026-08-04.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "Tower Legal Solutions",
    website: "https://www.towerls.com",
    pipeline: "legal-freelance",
    industry: "Legal staffing firm / ALSP placing a temporary NY-barred Staff Attorney for corporate fund workflows — drafting/negotiating fund side letter agreements, drafting feeder fund formation documents, and reviewing documentation for compliance obligations across the fund lifecycle.",
    location: "New York, NY",
    fundingStage: "",
    fitScore: 50,
    intentScore: 25,
    vertical: "legal",
    subvertical: "fund",
    engagementModel: "contract",
    buyerType: "staffing",
    compensationText: "$80-120 per hour, depending on experience",
    remoteFlag: "onsite",
    employmentTypeRaw: "Part time / Temporary (Staff Attorney, NY bar)",
    urgencyScore: 70,
    source: "JobLeads (Tower Legal Solutions), Aug 2026",
    sourceUrl: "https://www.jobleads.com/us/job/private-funds-contract-attorney-temporary--new-york--ed8a159e69fa3c5b3d67db0e759e12bc9",
    notes: "Grade B (combined 75). Strongest fund-fit lead of the run — side letters + feeder fund formation. Primary posting on-site NY, but Tower has parallel REMOTE NY-barred private funds contract roles open (https://www.jobleads.com/us/job/remote-ny-licensed-contract-attorney-private-funds--united-states--e89ed9ccb423feafaa213bcc01a75d89c). Legal staffing firm worth being on the roster for recurring fund work. Distinguish temp W-2 staffing from Katie's independent/fractional model when pitching.",
    contacts: [
      { name: null, title: "Legal Recruiting / Attorney Placement", email: null, linkedin: "https://www.linkedin.com/company/tower-legal-solutions/" }
    ]
  },
  {
    name: "Fractionus",
    website: "",
    pipeline: "legal-freelance",
    industry: "Growth-stage EdTech / K-12 SaaS company (hiring via fractional talent platform) building the commercial legal layer for its K-12 sales motion. Remote Fractional General Counsel engagement with a path to full-time as the company scales.",
    location: "New York, NY (Remote)",
    fundingStage: "Growth-stage SaaS",
    fitScore: 30,
    intentScore: 40,
    vertical: "legal",
    subvertical: "GC",
    engagementModel: "fractional",
    buyerType: "operating-company",
    compensationText: "$250-350 per hour; potential for full-time as the company scales",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional / contract (remote)",
    urgencyScore: 65,
    source: "JobLeads (Fractionus), Aug 2026",
    sourceUrl: "https://www.jobleads.com/us/job/remote-fractional-general-counsel-edtech-k-12-contracts--new-york--effbaf6798ea3808bdf1e461350959a31",
    notes: "Grade B (combined 70). Top-of-market rate ($250-350/hr) for a remote fractional GC building commercial contracting for K-12 sales. No fund angle. Pitch: senior operator who can stand up contract playbooks and vendor/customer paper without a full-time hire, with option to grow the mandate.",
    contacts: [
      { name: null, title: "Hiring Manager (apply via posting)", email: null, linkedin: null }
    ]
  },
  {
    name: "OneRail",
    website: "https://www.onerail.com",
    pipeline: "legal-freelance",
    industry: "Growth-stage last-mile logistics / delivery orchestration SaaS (VC-backed) hiring a fractional/part-time commercial counsel through the Go Fractional marketplace. Remote commercial-contracts scope.",
    location: "Remote (US)",
    fundingStage: "Growth / VC-backed",
    fitScore: 30,
    intentScore: 40,
    vertical: "legal",
    subvertical: "contracts",
    engagementModel: "fractional",
    buyerType: "portfolio-company",
    compensationText: "$150-200 per hour",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional / part-time (commercial counsel)",
    urgencyScore: 55,
    source: "Go Fractional (OneRail), Aug 2026",
    sourceUrl: "https://www.gofractional.com/job/one-rail-australia-commercial-counsel-part-time",
    notes: "Grade B (combined 70). Live fractional commercial counsel role at a growth-stage logistics SaaS via Go Fractional. Remote, part-time, credible rate. Strong template engagement for Katie's fractional commercial-contracts positioning.",
    contacts: [
      { name: null, title: "Go Fractional / OneRail hiring", email: "hello@gofractional.com", linkedin: "https://www.linkedin.com/company/onerail/" }
    ]
  },
  {
    name: "aVenture",
    website: "https://aventure.vc",
    pipeline: "legal-freelance",
    industry: "Early-stage venture capital data / VC tech startup listing a remote Venture Capital Fund Attorney. Fund/investment focus; compensation and engagement model not stated in the index.",
    location: "Remote (San Francisco, CA)",
    fundingStage: "Early-stage startup",
    fitScore: 40,
    intentScore: 25,
    vertical: "legal",
    subvertical: "fund",
    engagementModel: "contract",
    buyerType: "fund",
    compensationText: "",
    remoteFlag: "remote",
    employmentTypeRaw: "Venture Capital Fund Attorney (remote)",
    urgencyScore: 45,
    source: "Glassdoor (aVenture), Aug 2026",
    sourceUrl: "https://www.glassdoor.com/job-listing/venture-capital-fund-attorney-aventure-JV_KO0,29_KE30,38.htm?jl=1008239968893",
    notes: "Grade B (combined 65) — WATCHLIST / VERIFY. Fund-focused and remote, but engagement model is unconfirmed; could be full-time in-house rather than contract/fractional (would be off-ICP). Confirm it's project/fractional before investing pitch effort.",
    contacts: [
      { name: null, title: "Hiring / Talent", email: null, linkedin: "https://www.linkedin.com/company/aventure-vc/" }
    ]
  },
  {
    name: "Go Fractional",
    website: "https://www.gofractional.com",
    pipeline: "legal-freelance",
    industry: "Fractional executive / legal talent marketplace. Legal board currently lists fractional/interim commercial counsel and GC roles (OneRail, Hyundai — Fractional Counsel Consumer Litigation, Motorola Solutions — Commercial Counsel, Trainline — Interim Head of Legal) at $50-260/hr.",
    location: "Remote (US)",
    fundingStage: "",
    fitScore: 20,
    intentScore: 40,
    vertical: "legal",
    subvertical: "GC",
    engagementModel: "fractional",
    buyerType: "ALSP",
    compensationText: "Recent legal roles listed $50-260/hr",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional talent marketplace",
    urgencyScore: 50,
    source: "Go Fractional, Aug 2026",
    sourceUrl: "https://www.gofractional.com/jobs/legal",
    notes: "Grade B (combined 60) — CHANNEL, not a single buyer. Marketplace placing fractional legal talent with multiple live GC/commercial counsel roles. Recommend Katie join the talent roster to get recurring fractional legal gigs routed to her rather than pitching a single role.",
    contacts: [
      { name: null, title: "Talent / Membership", email: "hello@gofractional.com", linkedin: "https://www.linkedin.com/company/gofractional" }
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
        scrapeDate: new Date("2026-08-04")
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
