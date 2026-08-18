/**
 * Import script: PR Freelance Scrape 2026-07-14
 * Run: node scripts/import-pr-freelance-2026-07-14.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "Neolytix — Fractional Communications Director (Healthcare B2B, Earned Media)",
    website: "https://www.neolytix.com/",
    pipeline: "pr-freelance",
    industry: "Healthcare B2B / RCM & practice-management services",
    location: "Remote (US)",
    fundingStage: "n/a",
    fitScore: 37,
    intentScore: 45,
    vertical: "pr",
    subvertical: "media-relations",
    engagementModel: "fractional",
    buyerType: "operating-company",
    compensationText: "$1,500–$3,000/month base retainer + per-placement performance bonuses; 15–20 hrs/month; 1099",
    remoteFlag: "remote",
    employmentTypeRaw: "Part-time contract (1099), 3-month pilot with intent to extend",
    urgencyScore: 82,
    source: "Web search (Indeed — fractional communications, remote, July 2026)",
    sourceUrl: "https://www.indeed.com/q-fractional-communications-l-remote-jobs.html",
    notes: "Grade A (combined 82). Cleanest true-freelance posting this run: fractional comms director to stand up an earned-media program on a 1099 retainer. Healthcare B2B. ACTION: pitch senior fractional operator who builds fast; lead with earned-media placements + CEO-facing comfort. Verify live status before applying.",
    contacts: []
  },
  {
    name: "Freelance PR & Communications Manager — B2B SaaS (Global IT Integration Firm)",
    website: "https://www.jobleads.com/us/job/remote-us-pr-communications-lead-b2b-saas--united-states--e1a17fc71561786e886eecd8d3421d945",
    pipeline: "pr-freelance",
    industry: "Enterprise / B2B SaaS / IT integration",
    location: "Remote (US), global time-zone coordination",
    fundingStage: "n/a",
    fitScore: 40,
    intentScore: 40,
    vertical: "pr",
    subvertical: "agency-overflow",
    engagementModel: "freelance",
    buyerType: "operating-company",
    compensationText: "$40–$50/hour; 15–20 hrs/week",
    remoteFlag: "remote",
    employmentTypeRaw: "Freelance / contract (hourly)",
    urgencyScore: 68,
    source: "Web search (JobLeads — Remote US PR & Communications Lead, B2B SaaS, July 2026)",
    sourceUrl: "https://www.jobleads.com/us/job/remote-us-pr-communications-lead-b2b-saas--united-states--e1a17fc71561786e886eecd8d3421d945",
    notes: "Grade A (combined 80). True freelance hourly brief: client-side liaison managing a retained US PR agency + translating enterprise tech into media narratives. ACTION: pitch B2B-tech PR + agency-management; verify live status and named employer before applying.",
    contacts: []
  },
  {
    name: "The Work Crowd — Fintech PR Freelance Network (Vetted Bench)",
    website: "https://theworkcrowd.com/fintech-pr",
    pipeline: "pr-freelance",
    industry: "Freelance PR/comms talent network — fintech / financial services",
    location: "Remote / global",
    fundingStage: "n/a",
    fitScore: 45,
    intentScore: 32,
    vertical: "pr",
    subvertical: "agency-overflow",
    engagementModel: "freelance",
    buyerType: "agency",
    compensationText: "Per-brief / hourly by engagement (not published)",
    remoteFlag: "remote",
    employmentTypeRaw: "Freelance network membership",
    urgencyScore: 40,
    source: "Web search (The Work Crowd — Fintech PR, July 2026)",
    sourceUrl: "https://theworkcrowd.com/fintech-pr",
    notes: "Grade B (combined 77). New registerable fintech-specialist bench, sector-aligned. Evergreen (lower recency/urgency). ACTION: register as senior fintech PR/comms freelancer; emphasize financial-services media relations + IR-adjacent work.",
    contacts: []
  },
  {
    name: "The PR Net — Freelance PR & Media Relations Consultant (Listing #1745)",
    website: "https://www.theprnet.com/jobs/1745",
    pipeline: "pr-freelance",
    industry: "PR / communications (consumer + corporate roster on The PR Net)",
    location: "Remote / flexible (per listing)",
    fundingStage: "n/a",
    fitScore: 35,
    intentScore: 35,
    vertical: "pr",
    subvertical: "media-relations",
    engagementModel: "consultant",
    buyerType: "operating-company",
    compensationText: "Not published on listing",
    remoteFlag: "remote",
    employmentTypeRaw: "Freelance / consultant",
    urgencyScore: 55,
    source: "Web search (The PR Net — Jobs listing #1745, July 2026)",
    sourceUrl: "https://www.theprnet.com/jobs/1745",
    notes: "Grade B (combined 70). Direct freelance media-relations consultant brief on a PR-specialist board. ACTION: confirm sector/client/scope, then apply media-relations-led. Monitor The PR Net weekly.",
    contacts: []
  },
  {
    name: "KCSA Strategic Communications — Financial/IR PR Boutique (Overflow / White-Label Target)",
    website: "https://www.kcsa.com/investor-relations",
    pipeline: "pr-freelance",
    industry: "Investor relations & financial communications agency",
    location: "New York, NY (remote-friendly briefs)",
    fundingStage: "n/a",
    fitScore: 50,
    intentScore: 12,
    vertical: "pr",
    subvertical: "investor-pr",
    engagementModel: "freelance",
    buyerType: "ir-firm",
    compensationText: "Project / retainer by engagement (not published)",
    remoteFlag: "hybrid",
    employmentTypeRaw: "Prospective freelance / white-label overflow (no active posting)",
    urgencyScore: 20,
    source: "Web search (KCSA Strategic Communications — investor relations practice, July 2026)",
    sourceUrl: "https://www.kcsa.com/investor-relations",
    notes: "Grade B (combined 62; low intent, high fit). Not an active posting — finance/IR boutique overflow/relationship target squarely in ICP. ACTION: outreach offering senior freelance/white-label overflow on financial-media + IR narrative. Pipeline-building, not a hot apply.",
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
        scrapeDate: new Date("2026-07-14")
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
