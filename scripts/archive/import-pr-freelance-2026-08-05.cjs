/**
 * Import script: PR Freelance Scrape 2026-08-05
 * Run: node scripts/import-pr-freelance-2026-08-05.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "Workday — Interim Head of Brand Marketing & PR (12-Month Contract)",
    website: "https://www.gofractional.com",
    pipeline: "pr-freelance",
    industry: "Enterprise B2B SaaS (HR / finance cloud platform) sourcing an interim Head of Brand Marketing & PR on a 12-month contract via the Go Fractional interim/fractional executive marketplace. Scope spans brand narrative, executive communications, media relations and PR leadership during a defined coverage window.",
    location: "Remote (US)",
    fundingStage: "Public / large-cap enterprise (client via Go Fractional)",
    fitScore: 45,
    intentScore: 40,
    vertical: "pr",
    subvertical: "executive-comms",
    engagementModel: "interim",
    buyerType: "operating-company",
    compensationText: "Not stated (12-month interim contract; rate per Go Fractional brief)",
    remoteFlag: "remote",
    employmentTypeRaw: "12-month interim contract (fractional/interim executive)",
    urgencyScore: 70,
    source: "Web search — Go Fractional jobs board, Aug 2026",
    sourceUrl: "https://www.gofractional.com/job/workday-head-of-brand-marketing-and-pr-12-month-contract",
    notes: "Grade A (combined 85) — hottest lead of the run. Senior interim brand+PR mandate at an enterprise B2B SaaS buyer via a proven channel (Go Fractional brokered PagerDuty interim comms). SOURCE CAVEAT: URL slug names Workday, parallel search attributed a near-identical brief to Capital One — verify the exact employer on the live listing before pitching. ACTION: apply via Go Fractional with an enterprise executive-comms + earned-media case study.",
    contacts: [
      { name: null, title: "Apply via Go Fractional listing", email: null, linkedin: "https://www.linkedin.com/company/gofractional" }
    ]
  },
  {
    name: "Interdependence — B2B Tech PR Agency (Overflow / Freelance Execution Partner)",
    website: "https://www.interdependence.com",
    pipeline: "pr-freelance",
    industry: "Fast-scaling, tech-powered PR, communications and integrated-marketing agency running B2B Technology, Consumer, Travel and Entertainment portfolios in an all-remote model. Repeatedly hiring senior PR Directors / Account Directors (B2B Tech and Consumer) — a signal of sustained capacity strain and a classic overflow / white-label freelance-execution relationship target.",
    location: "Remote (US)",
    fundingStage: "Agency (client-services, proprietary tech platform)",
    fitScore: 50,
    intentScore: 20,
    vertical: "pr",
    subvertical: "agency-overflow",
    engagementModel: "contract",
    buyerType: "agency",
    compensationText: "Full-time roles posted (~$100k+ Director tier per ZipRecruiter benchmarks); overflow/freelance rate to be negotiated",
    remoteFlag: "remote",
    employmentTypeRaw: "Full-time PR Director / Account Director roles posted; pitch as freelance overflow / white-label execution partner",
    urgencyScore: 55,
    source: "Web search — Built In & Greenhouse (Interdependence PR Director / Account Director postings), Aug 2026",
    sourceUrl: "https://builtin.com/job/public-relations-director-b2b-tech/9546529",
    notes: "Grade B (combined 70). EMPLOYMENT-TYPE DISTINCTION: posted roles are full-time W-2, so scored as a commercial-relationship target, not a direct apply. Value is Interdependence's evident capacity strain (multiple senior B2B-tech PR reqs open at an all-remote, tech-powered agency) = overflow/white-label demand. ACTION: send a freelance/overflow partnership enquiry offering senior B2B-tech media-relations + executive-comms capacity; do not apply to the FT roles. Greenhouse: https://job-boards.greenhouse.io/interdependence/jobs/5175879008",
    contacts: [
      { name: null, title: "Talent / Partnerships (via Built In & Greenhouse listings)", email: null, linkedin: "https://www.linkedin.com/company/interdependence" }
    ]
  },
  {
    name: "1000heads — Freelance Account Director (Social & Earned Media, Remote US)",
    website: "https://1000heads.com",
    pipeline: "pr-freelance",
    industry: "Global social-media and word-of-mouth agency hiring a freelance Account Director (8+ years agency experience, tech or related industry preferred) to manage client programs across social, influencer and earned-media environments. Remote anywhere in the continental US.",
    location: "Remote (Continental US)",
    fundingStage: "Agency (global social / earned-media)",
    fitScore: 35,
    intentScore: 35,
    vertical: "pr",
    subvertical: "media-relations",
    engagementModel: "freelance",
    buyerType: "agency",
    compensationText: "Not stated (freelance Account Director; agency day/project rate)",
    remoteFlag: "remote",
    employmentTypeRaw: "Freelance / contract Account Director (remote)",
    urgencyScore: 55,
    source: "Web search — Built In (1000heads Freelance Account Director), Aug 2026",
    sourceUrl: "https://builtin.com/job/freelance-account-director/10100441",
    notes: "Grade B (combined 70). Named freelance agency seat with a direct apply path. Sector isn't finance and emphasis leans social/influencer over hard media relations, so fit is capped — but genuine senior freelance execution work. ACTION: apply with social-plus-earned client program samples; frame as senior freelance account lead who can drive earned/media angles beyond social.",
    contacts: [
      { name: null, title: "Apply via Built In listing", email: null, linkedin: "https://www.linkedin.com/company/1000heads" }
    ]
  },
  {
    name: "E3n — Fractional Marketing & Communications Manager (Contract)",
    website: "https://www.gofractional.com",
    pipeline: "pr-freelance",
    industry: "Company hiring (via Go Fractional / JazzHR career page) a contract Fractional Marketing & Communications Manager to support integrated marketing and communications strategy — developing multi-channel content and managing campaigns on a fractional basis.",
    location: "Remote (US)",
    fundingStage: "Operating company (client via Go Fractional marketplace)",
    fitScore: 30,
    intentScore: 30,
    vertical: "pr",
    subvertical: "comms",
    engagementModel: "fractional",
    buyerType: "operating-company",
    compensationText: "Not stated (fractional/contract; rate per Go Fractional brief)",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional / contract Marketing & Communications Manager",
    urgencyScore: 45,
    source: "Web search — Go Fractional (E3n Fractional Marketing & Communications Manager), Aug 2026",
    sourceUrl: "https://www.gofractional.com/job/jazzhr-e3n-fractional-marketing-communications-manager-career-page",
    notes: "Grade C (combined 60) — lowest-priority but above threshold. Real fractional comms brief on a proven channel; blend leans marketing/content over senior earned-media strategy and sector isn't disclosed, so it undersells Mark's PR seniority. ACTION: pursue only if capacity is idle; apply positioning the earned-media/thought-leadership upside.",
    contacts: [
      { name: null, title: "Apply via Go Fractional listing", email: null, linkedin: "https://www.linkedin.com/company/gofractional" }
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
