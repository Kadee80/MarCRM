/**
 * Import script: PR Freelance Scrape 2026-07-17
 * Run: node scripts/import-pr-freelance-2026-07-17.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "Selby Jennings — Interim / Contract IR & Communications (Finance Recruiter Bench)",
    website: "https://www.selbyjennings.com/en-us/financial-services-recruiter/investor-relations-recruitment",
    pipeline: "pr-freelance",
    industry: "Financial services recruitment — IR, corporate comms, capital markets",
    location: "Remote / US (national placements)",
    fundingStage: "n/a",
    fitScore: 50,
    intentScore: 20,
    vertical: "pr",
    subvertical: "investor-pr",
    engagementModel: "interim",
    buyerType: "staffing",
    compensationText: "Not published — set per placement (contract/interim IR & comms rates)",
    remoteFlag: "",
    employmentTypeRaw: "Contract / interim placements via specialist finance recruiter",
    urgencyScore: 30,
    source: "Web search (Selby Jennings IR recruitment desk, July 2026)",
    sourceUrl: "https://www.selbyjennings.com/en-us/financial-services-recruiter/investor-relations-recruitment",
    notes: "Grade B (combined 70). Highest fit-score lead this run and the only one squarely in Mark's finance/IR sweet spot. Lower intent because it's a recruiter relationship, not a dated brief. ACTION: register Mark with the IR/comms desk as a senior freelance/interim operator — finance media relations, executive/investor narrative, pre-IPO comms.",
    contacts: []
  },
  {
    name: "The James Collective — Freelance PR & Media Relations Consultant (Agency Overflow)",
    website: "https://www.theprnet.com/jobs/1745",
    pipeline: "pr-freelance",
    industry: "Boutique PR agency — food, beverage, travel & hospitality clients",
    location: "Remote (NYC-based preferred)",
    fundingStage: "n/a",
    fitScore: 35,
    intentScore: 30,
    vertical: "pr",
    subvertical: "agency-overflow",
    engagementModel: "freelance",
    buyerType: "agency",
    compensationText: "Part-time, ~10–20 hrs/month (rate not published)",
    remoteFlag: "remote",
    employmentTypeRaw: "Freelance consultant (part-time, ongoing)",
    urgencyScore: 45,
    source: "Web search (The PR Net jobs — Freelance PR & Media Relations Consultant, July 2026)",
    sourceUrl: "https://www.theprnet.com/jobs/1745",
    notes: "Grade B (combined 65). Textbook agency-overflow freelance execution brief — the model Mark wants — but sector (food/bev/travel) is off-ICP and leans on category-specific media contacts. ACTION: pitch only to broaden category exposure; lead with agency-overflow reliability + media-relations execution. Confirm listing is current.",
    contacts: []
  },
  {
    name: "Hello Human — Freelance PR Consultant (Independent Creative Collective / White-Label)",
    website: "https://theprnet.com/jobs/3034",
    pipeline: "pr-freelance",
    industry: "International PR collective for independent creative & design businesses",
    location: "Remote",
    fundingStage: "n/a",
    fitScore: 35,
    intentScore: 30,
    vertical: "pr",
    subvertical: "agency-overflow",
    engagementModel: "freelance",
    buyerType: "agency",
    compensationText: "Freelance / per-brief (rate not published)",
    remoteFlag: "remote",
    employmentTypeRaw: "Freelance consultant (project/brief basis)",
    urgencyScore: 40,
    source: "Web search (The PR Net jobs — Hello Human Freelance PR Consultant, July 2026)",
    sourceUrl: "https://theprnet.com/jobs/3034",
    notes: "Grade B (combined 65). White-label collective — Mark plugs in behind their brand on client briefs. Good engagement-model fit, off-ICP sector (creative/design). ACTION: register as senior freelance consultant emphasizing fast plug-in + strong media relations; useful overflow channel.",
    contacts: []
  },
  {
    name: "Go Fractional — Fractional Communications Director (Chicago / Remote)",
    website: "https://www.gofractional.com/jobs",
    pipeline: "pr-freelance",
    industry: "Fractional executive marketplace (client sector not specified)",
    location: "Remote (Chicago-based client)",
    fundingStage: "n/a",
    fitScore: 30,
    intentScore: 30,
    vertical: "pr",
    subvertical: "comms",
    engagementModel: "fractional",
    buyerType: "operating-company",
    compensationText: "$125–$200/hour; ~3–5 hrs/week",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional / contract (hourly, part-time)",
    urgencyScore: 55,
    source: "Web search (Go Fractional jobs — Fractional Communications Director, posted ~2026-07-10)",
    sourceUrl: "https://www.gofractional.com/jobs",
    notes: "Grade B (combined 60). Highest published rate this run ($125–200/hr) and a recent low-hours fractional brief — attractive economics. Sector undisclosed, so fit is capped. ACTION: apply via Go Fractional and register broadly. Verify listing still open and get client sector before pitching.",
    contacts: []
  },
  {
    name: "Forthright Advising — Interim / Fractional Communications Director (Bench / Overflow Partner)",
    website: "https://www.forthrightadvising.com/interim-communications-director",
    pipeline: "pr-freelance",
    industry: "Advisory firm providing interim & fractional communications leadership",
    location: "Remote / US",
    fundingStage: "n/a",
    fitScore: 35,
    intentScore: 20,
    vertical: "pr",
    subvertical: "executive-comms",
    engagementModel: "interim",
    buyerType: "agency",
    compensationText: "Not published — per-engagement interim/fractional rates",
    remoteFlag: "",
    employmentTypeRaw: "Interim / fractional engagements via advisory firm",
    urgencyScore: 30,
    source: "Web search (Forthright Advising — Interim Communications Director, July 2026)",
    sourceUrl: "https://www.forthrightadvising.com/interim-communications-director",
    notes: "Grade C (combined 55). Not a single job but a partner/overflow channel — Forthright places interim comms directors and could route work to Mark. Lower intent (no dated brief). ACTION: reach out to be added to their interim-comms bench; position a senior operator who can stand up a comms function fast.",
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
        scrapeDate: new Date("2026-07-17")
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
