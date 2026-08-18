/**
 * Import script: PR Freelance Scrape 2026-07-28
 * Run: node scripts/import-pr-freelance-2026-07-28.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "Neolytix — Fractional Communications Director (Healthcare B2B, Earned Media)",
    website: "https://www.neolytix.com",
    pipeline: "pr-freelance",
    industry: "Healthcare-services / RCM / health-IT company hiring an individual fractional communications director to build and run its earned media program. Strategy, pitching and media relationships; content produced in-house.",
    location: "Remote (US)",
    fundingStage: "Private / bootstrapped",
    fitScore: 50,
    intentScore: 40,
    vertical: "pr",
    subvertical: "media-relations",
    engagementModel: "fractional",
    buyerType: "operating-company",
    compensationText: "$1,500-$3,000/month base retainer + per-placement performance bonuses",
    remoteFlag: "remote",
    employmentTypeRaw: "Part-Time Contract (1099)",
    urgencyScore: 70,
    source: "ZipRecruiter / Indeed (fractional communications), July 2026",
    sourceUrl: "https://www.ziprecruiter.com/Jobs/Fractional-Communications",
    notes: "Grade A (combined 90). Strongest fit of the run: senior, executional, retainer-based, rewards earned placements. Individual practitioner (not agency), reports to CEO, 15-20 hrs/month. Requires healthcare-B2B track record (7+ yrs) with named placements in the last 18 months (Becker's, Modern Healthcare, Fierce Healthcare, MedCity News, HealthLeaders, Healthcare Dive). ACTION: tailor a one-pager around healthcare/B2B earned-media wins; pitch 'I own pitching + placements, you keep content in-house.'",
    contacts: [
      {
        name: null,
        title: "Hiring / CEO (direct report)",
        email: null,
        linkedin: "https://www.ziprecruiter.com/Jobs/Fractional-Communications"
      }
    ]
  },
  {
    name: "Four Pines Fund — Fractional Director of Communications (Contract)",
    website: "https://www.daybook.com/job/fractional-director-of-communications-contract-position-w2exwwvL8r4sE2FA2",
    pipeline: "pr-freelance",
    industry: "Mission-driven fund/foundation seeking a fractional Director of Communications to stand up its communications function during a critical growth period. Advocacy/policy campaign experience a plus.",
    location: "Remote",
    fundingStage: "Fund / foundation",
    fitScore: 40,
    intentScore: 40,
    vertical: "pr",
    subvertical: "comms",
    engagementModel: "fractional",
    buyerType: "fund",
    compensationText: "",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional contract",
    urgencyScore: 55,
    source: "Daybook, July 2026",
    sourceUrl: "https://www.daybook.com/job/fractional-director-of-communications-contract-position-w2exwwvL8r4sE2FA2",
    notes: "Grade A (combined 80). Greenfield build — no existing function — suits a senior operator who sets strategy AND executes. NOTE: subject area is suicide-care / mental-health philanthropy, a sensitive remit; confirm Mark's comfort before pursuing. ACTION: pitch as fractional comms lead who architects the function and runs media without a large team.",
    contacts: [
      {
        name: null,
        title: "Hiring contact (via Daybook)",
        email: null,
        linkedin: "https://www.daybook.com/job/fractional-director-of-communications-contract-position-w2exwwvL8r4sE2FA2"
      }
    ]
  },
  {
    name: "ZY Media Group — Senior Communications & PR Strategy Advisor (Contract)",
    website: "https://www.thepowerpause.com/flexjobs/senior-communications-and-pr-strategy-advisor-contract",
    pipeline: "pr-freelance",
    industry: "Strategic communications / media consulting firm engaging a senior contractor as a PR strategist on client accounts — press releases, op-eds, media advisories, briefings, campaign strategy. Advocacy/political sector.",
    location: "Remote (MD / DMV preferred)",
    fundingStage: "Agency",
    fitScore: 35,
    intentScore: 40,
    vertical: "pr",
    subvertical: "agency-overflow",
    engagementModel: "contract",
    buyerType: "agency",
    compensationText: "$60+/hour",
    remoteFlag: "remote",
    employmentTypeRaw: "Contract / Freelance",
    urgencyScore: 60,
    source: "The Power Pause / FlexJobs (ZY Media Group), July 2026",
    sourceUrl: "https://www.thepowerpause.com/flexjobs/senior-communications-and-pr-strategy-advisor-contract",
    notes: "Grade B (combined 75). Textbook agency-overflow / white-label execution: senior strategist embedded on client accounts, billing hourly. Sector is advocacy/political (outside core finance ICP) but rate is explicit and engagement is clearly freelance. ACTION: bank as near-term billable hourly work while finance leads mature.",
    contacts: [
      {
        name: null,
        title: "Hiring contact (ZY Media Group)",
        email: null,
        linkedin: "https://www.thepowerpause.com/flexjobs/senior-communications-and-pr-strategy-advisor-contract"
      }
    ]
  },
  {
    name: "Zimmons International Communications — IR / PE Communications Consultant (Opportunities)",
    website: "https://zimmonsic.com/opportunities",
    pipeline: "pr-freelance",
    industry: "Boutique investor-relations / financial-communications firm serving financial services and private equity; open 'opportunities' page for external consultants. Investor/media narrative remit.",
    location: "Remote / not stated",
    fundingStage: "IR / financial comms firm",
    fitScore: 50,
    intentScore: 25,
    vertical: "pr",
    subvertical: "investor-pr",
    engagementModel: "consultant",
    buyerType: "ir-firm",
    compensationText: "",
    remoteFlag: "",
    employmentTypeRaw: "Consultant / opportunities listing",
    urgencyScore: 35,
    source: "Zimmons International Communications, July 2026",
    sourceUrl: "https://zimmonsic.com/opportunities",
    notes: "Grade B (combined 75). Best core-ICP fit (PE / financial comms / IR) but lower intent — evergreen opportunities page rather than a dated urgent posting. ACTION: warm, direct outreach — position Mark's investor/media narrative and IR-adjacent PR; ask to join the consultant bench.",
    contacts: [
      {
        name: null,
        title: "Consultant / opportunities enquiries",
        email: null,
        linkedin: "https://zimmonsic.com/opportunities"
      }
    ]
  },
  {
    name: "Scion Staffing — Contract & Temporary PR / Communications Bench",
    website: "https://scionstaffing.com/temporary-communications-staffing/",
    pipeline: "pr-freelance",
    industry: "Staffing agency placing contract and temporary PR/communications professionals across sectors. Recurring interim placement demand.",
    location: "Remote / hybrid (varies by placement)",
    fundingStage: "Staffing agency",
    fitScore: 40,
    intentScore: 30,
    vertical: "pr",
    subvertical: "agency-overflow",
    engagementModel: "contract",
    buyerType: "staffing",
    compensationText: "",
    remoteFlag: "hybrid",
    employmentTypeRaw: "Temporary / Contract (W-2 staffing)",
    urgencyScore: 45,
    source: "Scion Staffing, July 2026",
    sourceUrl: "https://scionstaffing.com/temporary-communications-staffing/",
    notes: "Grade B (combined 70). Steady pipeline of interim PR gigs for backfill between direct clients. COMMERCIAL-MODEL CAVEAT: W-2 temp/contract staffing route (employmentTypeRaw), not true 1099 freelance (engagementModel = contract) — priced/structured differently from direct retainers. ACTION: register on the bench, flag senior interim comms/PR availability.",
    contacts: [
      {
        name: null,
        title: "Recruiter / bench registration",
        email: null,
        linkedin: "https://scionstaffing.com/temporary-communications-staffing/"
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
        scrapeDate: new Date("2026-07-28")
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
