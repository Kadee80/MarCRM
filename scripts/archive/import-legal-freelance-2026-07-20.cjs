/**
 * Import script: Legal Freelance Scrape 2026-07-20
 * Run: node scripts/import-legal-freelance-2026-07-20.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 * All leads: pipeline = "legal-freelance".
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "Early-Stage Investment Firm (via Go Fractional) — Fractional Chief Compliance Officer",
    website: "https://www.gofractional.com/job/fractional-chief-compliance-officer-cmrb15e7",
    pipeline: "legal-freelance",
    industry: "Early-stage, fully remote investment firm / fund founded by technology entrepreneurs entering financial services; launching its first fund",
    location: "Remote (US)",
    fundingStage: "Emerging manager — first fund launching",
    fitScore: 50,
    intentScore: 40,
    vertical: "legal",
    subvertical: "compliance",
    engagementModel: "fractional",
    buyerType: "fund",
    compensationText: "$95-$155/hr, 5-20 hrs/week",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional / part-time engagement, 5-20 hrs/week, fully remote (US)",
    urgencyScore: 65,
    source: "Go Fractional job board (Finance category), posted 2026-07-13",
    sourceUrl: "https://www.gofractional.com/job/fractional-chief-compliance-officer-cmrb15e7",
    notes: "Grade A (combined 90) — strongest lead this run and best emerging-manager fit in ~2 weeks. Fund I launching, founders are tech entrepreneurs new to financial services, no internal legal/compliance bench, credible stated rate. CAVEAT: posted as a CCO role, not counsel; asks for Series 65 / CFA / CAMS-type certs and audit experience Katie may not hold. Scored 50 on fit because the underlying work (fund structure, SEC/FINRA registration, fund documentation, governance, policies) is squarely ICP — not because she matches the title. PITCH: do not apply as a compliance officer. Approach as fund counsel owning the legal/regulatory build for a Fund I launch (entity + fund structuring, registration mechanics, LPA/PPM/subscription review, governance and policy drafting), and either propose a scoped counsel engagement alongside a credentialed CCO or ask whether they'd split the mandate. Emerging managers often post one blended role because they don't yet know they need two. High-value relationship target regardless of outcome. ACTION: verify live, apply via Go Fractional with the scoped-counsel reframe.",
    contacts: [
      { name: "Go Fractional — Marketplace", title: "Talent Platform (route to the hiring fund)", email: "hello@gofractional.com", linkedin: "https://www.linkedin.com/company/gofractional" }
    ]
  },
  {
    name: "Media/PR Monitoring SaaS Company (via Go Fractional) — Interim Head of Legal (Fractional)",
    website: "https://www.gofractional.com/job/interim-head-of-legal-fractional-cmrb2mqa",
    pipeline: "legal-freelance",
    industry: "Global SaaS platform serving the media, PR, and journalism industries (media monitoring, journalist relationship management, story distribution); mid-size, roughly up to ~500 employees",
    location: "Remote (US)",
    fundingStage: "Mid-size / growth-stage SaaS; posting notes prior acquisition exposure is a plus",
    fitScore: 20,
    intentScore: 40,
    vertical: "legal",
    subvertical: "contracts",
    engagementModel: "interim",
    buyerType: "operating-company",
    compensationText: "$25/hr listed, 40 hrs/week — flagged as a probable data error; comparable roles on the same board list $130-$300/hr",
    remoteFlag: "remote",
    employmentTypeRaw: "Interim Head of Legal (Fractional), 40 hrs/week, fully remote (US)",
    urgencyScore: 75,
    source: "Go Fractional job board (Legal category), posted 2026-07-13",
    sourceUrl: "https://www.gofractional.com/job/interim-head-of-legal-fractional-cmrb2mqa",
    notes: "Grade B (combined 60). Clears 55 on engagement model, remote flex, and apply path rather than practice-area fit. VERIFY TWO THINGS FIRST: (1) $25/hr for a 40 hrs/week GC-level role is not market-credible — comparable interim Head of Legal roles on the same board list $130-$300/hr; scored zero on comp credibility. Confirm the real rate; if it truly is $25/hr, drop it. (2) 'Fractional' is a misnomer — 40 hrs/week is full-time interim coverage, not a part-time retainer, so it would crowd out other engagements (portfolio-strategy issue, not just calendar). FIT LIMITS: no fund angle; AI/data/content licensing and light employment counsel sit outside core corporate/fund strength. PITCH if rate checks out: high-volume enterprise commercial contracting and deal-desk throughput under quarter-end pressure, plus governance and vendor paper; be candid that AI/content licensing is adjacent not core. Best hook is the stated preference for prior acquisition exposure — M&A cleanup and post-acquisition contract harmonization is squarely her background. ACTION: message via Go Fractional to confirm rate and true hours before applying. CROSS-PIPELINE: client is a media/PR SaaS platform — flag to Mark as a possible pr-marketing vendor/partner target.",
    contacts: [
      { name: "Go Fractional — Marketplace", title: "Talent Platform (route to the hiring company)", email: "hello@gofractional.com", linkedin: "https://www.linkedin.com/company/gofractional" }
    ]
  }
];

async function main() {
  let created = 0;
  let skipped = 0;

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
