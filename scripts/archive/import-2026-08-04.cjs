/**
 * Import script: Daily Scrape 2026-08-04
 * Run: node scripts/import-2026-08-04.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 *
 * NOTE: Alpaca is a signal REFRESH of an existing lead (imported 2026-07-31), not a new company.
 * It is intentionally NOT in this insert list to avoid a duplicate — its new funding trigger
 * ($135M raise led by Peak XV, Jul 16 2026) is captured in the markdown report's signal-refresh
 * section. Update Alpaca's score/notes manually or via a scoring pass, not via this import.
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const SCRAPE_DATE = new Date("2026-08-04");

const leads = [
  {
    name: "Frictionus",
    website: "",
    pipeline: "legal-freelance",
    industry: "EdTech SaaS (K-12). Building a commercial legal layer for its K-12 sales motion.",
    location: "Remote (US)",
    fundingStage: "Growth-stage",
    fitScore: 30,
    intentScore: 40,
    vertical: "legal",
    subvertical: "contracts",
    engagementModel: "fractional",
    buyerType: "startup",
    compensationText: "$250-$350/hr",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional / part-time, potential full-time as company scales",
    urgencyScore: 60,
    source: "JobLeads (indexed)",
    sourceUrl: "https://www.jobleads.com/us/job/remote-fractional-general-counsel-edtech-k-12-contracts--new-york--effbaf6798ea3808bdf1e461350959a31",
    notes: "Grade B (70). Strong engagement-model fit (fractional + remote + $250-350/hr). Core work is commercial/SaaS contracts, not funds — fit capped at 30. ACTION: direct fractional-GC pitch; strongest new freelance lead today.",
    contacts: [
      { name: null, title: "Founder / Head of Legal (hiring)", email: null, linkedin: null }
    ]
  },
  {
    name: "Latitude — Fractional Franchise Counsel",
    website: "https://www.hirelatitude.com",
    pipeline: "legal-freelance",
    industry: "Flexible legal staffing (Latitude) placing fractional counsel for a national health/wellness franchisor.",
    location: "Remote (Austin, TX based req)",
    fundingStage: "",
    fitScore: 20,
    intentScore: 40,
    vertical: "legal",
    subvertical: "contracts",
    engagementModel: "fractional",
    buyerType: "staffing",
    compensationText: "",
    remoteFlag: "remote",
    employmentTypeRaw: "Part-time, remote contract engagement",
    urgencyScore: 55,
    source: "Glassdoor / Latitude (indexed)",
    sourceUrl: "https://www.glassdoor.com/job-listing/fractional-franchise-counsel-remote-part-time-engagement-latitude-JV_IC1139761_KO0,56_KE57,65.htm",
    notes: "Grade B (60). Franchise/commercial contract work — adjacent to core corporate ICP, off the funds thesis; comp not stated. Good engagement-model intent. ACTION: Latitude is a repeatable staffing channel worth a standing relationship.",
    contacts: [
      { name: null, title: "Placement contact (via Latitude)", email: null, linkedin: null }
    ]
  },
  {
    name: "Fractional PR Consultant — Legal Sector (via The Work Crowd)",
    website: "https://theworkcrowd.com",
    pipeline: "pr-freelance",
    industry: "Legal / professional-services B2B PR. ~1 day/month fractional engagement.",
    location: "Remote (flexible)",
    fundingStage: "",
    fitScore: 35,
    intentScore: 30,
    vertical: "pr",
    subvertical: "media-relations",
    engagementModel: "fractional",
    buyerType: "agency",
    compensationText: "",
    remoteFlag: "remote",
    employmentTypeRaw: "Freelance, ~1 day/month, 6-month initial engagement",
    urgencyScore: 45,
    source: "The Work Crowd",
    sourceUrl: "https://theworkcrowd.com/jobs/freelance-legal-pr-consultant",
    notes: "Grade B (65). Small scope (1 day/month) but clean fractional fit + recurring marketplace channel. Legal-sector B2B counts toward sector fit. ACTION: direct freelance pitch.",
    contacts: [
      { name: null, title: "Client contact (via The Work Crowd)", email: null, linkedin: null }
    ]
  },
  {
    name: "21.co (Amun)",
    website: "https://21.co",
    pipeline: "pr-freelance",
    industry: "Crypto / fintech asset management. Hiring Head of Communications.",
    location: "Remote / hybrid",
    fundingStage: "",
    fitScore: 45,
    intentScore: 5,
    vertical: "pr",
    subvertical: "investor-pr",
    engagementModel: "interim",
    buyerType: "ir-firm",
    compensationText: "",
    remoteFlag: "hybrid",
    employmentTypeRaw: "Full-time — Head of Communications",
    urgencyScore: 30,
    source: "web3.career (indexed)",
    sourceUrl: "https://web3.career/head-of-communications-amun/48463",
    notes: "Grade C (50). FT req; freelance pitch speculative. Solid sector fit (crypto/fintech asset mgmt). ACTION: fractional/interim comms pitch while they search.",
    contacts: [
      { name: null, title: "Talent / Comms lead (hiring)", email: null, linkedin: null }
    ]
  },
  {
    name: "Bunkerhill Health",
    website: "https://www.bunkerhillhealth.com",
    pipeline: "pr-marketing",
    industry: "Health-tech / AI. Series B closed Jul 16, 2026.",
    location: "United States",
    fundingStage: "Series B — $25M (Jul 16, 2026), total raised $55M. Led by Khosla Ventures; Sequoia, Felicis, Optum Ventures, Y Combinator participating.",
    fitScore: 45,
    intentScore: 25,
    vertical: "",
    subvertical: "",
    engagementModel: "",
    buyerType: "",
    compensationText: "",
    remoteFlag: "",
    employmentTypeRaw: "",
    urgencyScore: 0,
    source: "Fierce Healthcare Fundraising Tracker '26",
    sourceUrl: "https://www.fiercehealthcare.com/health-tech/fierce-healthcare-fundraising-tracker-26",
    notes: "Grade B (70). Health-tech (adjacent to core FS/tech → industry match capped at +5). Credible backers, growth stage, can afford retainer. Trigger = fresh raise. ACTION: post-Series B narrative + earned-media sprint.",
    contacts: [
      { name: null, title: "CEO / Head of Marketing", email: null, linkedin: null }
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
        scrapeDate: SCRAPE_DATE
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
