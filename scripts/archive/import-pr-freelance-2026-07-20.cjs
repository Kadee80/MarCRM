/**
 * Import script: PR Freelance Scrape 2026-07-20
 * Run: node scripts/import-pr-freelance-2026-07-20.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "SJP Legal Talent (Chambers-ranked NewLaw provider, via The Work Crowd)",
    website: "https://theworkcrowd.com/jobs/freelance-legal-pr-consultant",
    pipeline: "pr-freelance",
    industry: "Flexible legal talent / NewLaw services to financial institutions and in-house legal teams",
    location: "Remote (UK; occasional London meetings)",
    fundingStage: "n/a",
    fitScore: 45,
    intentScore: 30,
    vertical: "pr",
    subvertical: "thought-leadership",
    engagementModel: "fractional",
    buyerType: "operating-company",
    compensationText: "£150–£1,500 (day-rate band as posted); ~1 day per month, 6 months initial",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional contract, longer than 6 months",
    urgencyScore: 45,
    source: "The Work Crowd jobs board (PR and comms), posted 2026-07-07",
    sourceUrl: "https://theworkcrowd.com/jobs/freelance-legal-pr-consultant",
    notes: "Grade B (combined 75) — best fit of the run. Legal-sector PR for a flexible-legal-talent business selling into financial institutions hits Mark's legal + finance ICP simultaneously. Named target media (The Lawyer, Legal Week, Legal Futures, Global Legal Post) is exactly the trade set a senior legal-PR operator owns. Explicit anti-agency buying signal: wants 'the contacts and judgement of an agency without the agency overhead'. Reports to MD — one-person decision chain. CAVEAT: UK market experience explicitly required. ACTION: apply with 2–3 named legal/B2B placements and a one-page 6-month plan (strategy -> Chambers ranking amplification -> founder commentary programme -> reactive desk).",
    contacts: []
  },
  {
    name: "Capital One — Interim Head of Brand Marketing and PR (12-month contract)",
    website: "https://www.gofractional.com/job/workday-head-of-brand-marketing-and-pr-12-month-contract",
    pipeline: "pr-freelance",
    industry: "Diversified financial services — credit cards, banking, lending",
    location: "McLean, Virginia, United States (remote)",
    fundingStage: "public (NYSE: COF)",
    fitScore: 45,
    intentScore: 30,
    vertical: "pr",
    subvertical: "comms",
    engagementModel: "interim",
    buyerType: "operating-company",
    compensationText: "$160–$220/hour, 30–40 hrs/week, 12-month duration",
    remoteFlag: "remote",
    employmentTypeRaw: "12-month contract (interim leadership), 30–40 hrs/week",
    urgencyScore: 25,
    source: "Go Fractional job board (external repost of Capital One req)",
    sourceUrl: "https://www.gofractional.com/job/workday-head-of-brand-marketing-and-pr-12-month-contract",
    notes: "Grade B (combined 75). Best economics in the vertical to date: $160–$220/hr x 12 months. Core ICP sector, PR explicitly in remit. Scored down hard on recency — posted ~3 months ago and Go Fractional carries an explicit disclaimer that it has no relationship with Capital One for this role. ACTION: verify the req on Capital One's own careers site BEFORE investing pitch time; if live, route via their contingent-labour channel, not the aggregator. NOTE: 30–40 hrs/week is near-full-time and competes with Mark's whole book.",
    contacts: []
  },
  {
    name: "Dysphagia Healthcare Business (via The Work Crowd)",
    website: "https://theworkcrowd.com/jobs/freelance-healthcare-pr-specialist-media-relations",
    pipeline: "pr-freelance",
    industry: "Healthcare / medtech — dysphagia (swallowing difficulties) patient and clinician market",
    location: "Remote (UK market experience required)",
    fundingStage: "n/a",
    fitScore: 30,
    intentScore: 40,
    vertical: "pr",
    subvertical: "media-relations",
    engagementModel: "freelance",
    buyerType: "operating-company",
    compensationText: "£150–£1,500 (day-rate band as posted); ~1–2 days/month, ~6 months initial",
    remoteFlag: "remote",
    employmentTypeRaw: "Freelance contract, longer than 6 months",
    urgencyScore: 70,
    source: "The Work Crowd jobs board (PR and comms), posted 2026-07-16",
    sourceUrl: "https://theworkcrowd.com/jobs/freelance-healthcare-pr-specialist-media-relations",
    notes: "Grade B (combined 70). Highest urgency of the run. Media database, campaigns and story pipeline are already built — buyer states 'we're not looking for someone to create our PR, we're looking for someone to pitch it'. Pure execution brief = shortest path to billable work. Not typical pharma messaging, so narrative-led rather than regulated medical comms. CAVEAT: off-ICP sector and they prefer existing healthcare-journalist relationships. ACTION: don't compete on healthcare credentials — offer a paid 1-day trial pitch sprint against their existing pipeline to make the test empirical.",
    contacts: []
  },
  {
    name: "Men's Grooming & Lifestyle Brand (via The Work Crowd)",
    website: "https://theworkcrowd.com/jobs/freelance-consumer-pr-specialist-mens-grooming-brand",
    pipeline: "pr-freelance",
    industry: "Consumer goods — men's grooming and lifestyle",
    location: "Remote (UK)",
    fundingStage: "n/a",
    fitScore: 30,
    intentScore: 30,
    vertical: "pr",
    subvertical: "media-relations",
    engagementModel: "freelance",
    buyerType: "operating-company",
    compensationText: "£1,000 fixed project fee",
    remoteFlag: "remote",
    employmentTypeRaw: "Freelance project",
    urgencyScore: 40,
    source: "The Work Crowd jobs board (PR and comms), posted 2026-07-15",
    sourceUrl: "https://theworkcrowd.com/jobs/freelance-consumer-pr-specialist-mens-grooming-brand",
    notes: "Grade B (combined 60) — weakest lead of the run, included only because it clears the 55 threshold. Consumer grooming PR is off-positioning for a senior B2B/financial comms operator; £1,000 fixed fee caps upside with no stated expansion path. Upside is a pre-approved budget and fast close. ACTION: skip unless Mark wants filler work between retainers or wants to keep his Work Crowd profile active.",
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
        scrapeDate: new Date("2026-07-20")
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
