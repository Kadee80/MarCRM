/**
 * Import script: PR Freelance Scrape 2026-08-14
 * Run: node scripts/import-pr-freelance-2026-08-14.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "PagerDuty — Interim Director of Communications (6-month contract)",
    website: "https://www.pagerduty.com",
    pipeline: "pr-freelance",
    industry: "Publicly traded B2B SaaS (digital operations / incident management). Hiring an Interim Director of Communications to lead PR/media relations, social media and internal communications for a 6-month contract, reporting to the Chief Communications Officer and managing an internal team of three plus five global agencies.",
    location: "San Francisco Bay Area (hybrid)",
    fundingStage: "Public company (NYSE: PD)",
    fitScore: 50,
    intentScore: 40,
    vertical: "pr",
    subvertical: "executive-comms",
    engagementModel: "interim",
    buyerType: "operating-company",
    compensationText: "Not disclosed on listing (6-month contract; senior interim director level)",
    remoteFlag: "hybrid",
    employmentTypeRaw: "Interim Director of Communications — 6-month contract (W-2 interim)",
    urgencyScore: 75,
    source: "Go Fractional — Interim Director of Communications (PagerDuty), Aug 2026",
    sourceUrl: "https://www.gofractional.com/job/welcometothejungle-interim-director-communications-pagerduty",
    notes: "Grade A (combined 90) — top find this cycle. Senior interim, public B2B SaaS, exec/media/internal remit and agency oversight. CAVEAT: hybrid SF Bay may require occasional on-site. ACTION: apply as senior interim comms director; lead with agency-management and media-relations track record.",
    contacts: [
      { name: null, title: "Apply via Go Fractional listing", email: null, linkedin: "https://www.linkedin.com/company/pagerduty/" }
    ]
  },
  {
    name: "Neolytix — Fractional Communications Director (earned media build)",
    website: "https://neolytix.com",
    pipeline: "pr-freelance",
    industry: "B2B healthcare management services organization (revenue cycle / practice management). Hiring a fractional communications director to build and run its earned media program, working directly with the CEO alongside the in-house marketing team. 3-month pilot at 15-20 hrs/month with expectation of a longer-term relationship.",
    location: "Remote (US)",
    fundingStage: "Established B2B services company",
    fitScore: 50,
    intentScore: 30,
    vertical: "pr",
    subvertical: "thought-leadership",
    engagementModel: "fractional",
    buyerType: "operating-company",
    compensationText: "3-month pilot, 15-20 hrs/month (fractional retainer, rate not disclosed)",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional Communications Director — 3-month pilot, part-time",
    urgencyScore: 50,
    source: "Web search — Neolytix fractional communications director, Aug 2026",
    sourceUrl: "https://www.indeed.com/q-fractional-communications-l-remote-jobs.html",
    notes: "Grade A (combined 80). Greenfield earned-media build with CEO access — ideal for Mark to shape strategy and own execution. Low hours/month suits a portfolio approach. ACTION: pitch as fractional earned-media lead; emphasize standing up a program from zero and CEO thought-leadership.",
    contacts: [
      { name: null, title: "Apply (fractional comms director)", email: null, linkedin: "https://www.linkedin.com/company/neolytix/" }
    ]
  },
  {
    name: "Wilson Public Relations — White-Label PR / Overflow Execution Partner",
    website: "https://wilsonpublicrelations.com/services/white-label-public-relations/",
    pipeline: "pr-freelance",
    industry: "PR firm offering white-label PR to other agencies — behind-the-scenes execution, client-facing team augmentation, or strategic partnership. Covers media relations, outreach and campaign execution delivered under the partner agency's brand for overflow capacity.",
    location: "Remote (US)",
    fundingStage: "Established PR agency (white-label division)",
    fitScore: 35,
    intentScore: 40,
    vertical: "pr",
    subvertical: "agency-overflow",
    engagementModel: "contract",
    buyerType: "agency",
    compensationText: "N/A — white-label/overflow BD target (no comp-bearing posting)",
    remoteFlag: "remote",
    employmentTypeRaw: "White-label PR execution partner (agency overflow)",
    urgencyScore: 55,
    source: "Web search — Wilson PR white-label services page, Aug 2026",
    sourceUrl: "https://wilsonpublicrelations.com/services/white-label-public-relations/",
    notes: "Grade B (combined 75). Overflow/white-label BD TARGET, not a live posting — intent inferred from a standing white-label offer. Distinct firm vs. prior white-label targets (Trizcom, 10to1). ACTION: BD outreach positioning Mark as senior overflow execution (media relations + strategic counsel).",
    contacts: [
      { name: null, title: "BD / white-label partnerships (via firm site)", email: null, linkedin: null }
    ]
  },
  {
    name: "The PR Net — Freelance PR & Media Relations Consultant (job #1745)",
    website: "https://www.theprnet.com/jobs/1745",
    pipeline: "pr-freelance",
    industry: "Freelance PR & media relations consultant role posted on The PR Net, a curated network/job board for PR, communications and marketing professionals. Consumer/brand and B2B clients source freelance media-relations execution here.",
    location: "Remote / flexible (US)",
    fundingStage: "Not disclosed (single-client freelance brief)",
    fitScore: 30,
    intentScore: 30,
    vertical: "pr",
    subvertical: "media-relations",
    engagementModel: "freelance",
    buyerType: "operating-company",
    compensationText: "Not disclosed on listing",
    remoteFlag: "remote",
    employmentTypeRaw: "Freelance PR & media relations consultant",
    urgencyScore: 45,
    source: "The PR Net jobs board — listing #1745, Aug 2026",
    sourceUrl: "https://www.theprnet.com/jobs/1745",
    notes: "Grade B (combined 60). Clean freelance media-relations brief on a high-signal PR board. CAVEAT: verify client sector and scope before investing. ACTION: apply; confirm remit and whether it fits Mark's senior rate.",
    contacts: [
      { name: null, title: "Apply via The PR Net listing", email: null, linkedin: null }
    ]
  },
  {
    name: "Daybook — Fractional Director of Communications (contract)",
    website: "https://www.daybook.com/job/fractional-director-of-communications-contract-position-w2exwwvL8r4sE2FA2",
    pipeline: "pr-freelance",
    industry: "Fractional Director of Communications contract role posted on Daybook (fractional/portfolio-work marketplace). Client seeks part-time senior comms leadership on a contract basis; strategic comms plus execution.",
    location: "Remote (US)",
    fundingStage: "Not disclosed",
    fitScore: 30,
    intentScore: 30,
    vertical: "pr",
    subvertical: "comms",
    engagementModel: "fractional",
    buyerType: "operating-company",
    compensationText: "Not disclosed on listing",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional Director of Communications — contract",
    urgencyScore: 45,
    source: "Daybook — Fractional Director of Communications (contract), Aug 2026",
    sourceUrl: "https://www.daybook.com/job/fractional-director-of-communications-contract-position-w2exwwvL8r4sE2FA2",
    notes: "Grade B (combined 60). Low-specificity listing but clean fractional/contract comms-leadership fit. ACTION: apply to surface client sector and scope; deprioritize vs. PagerDuty/Neolytix until qualified.",
    contacts: [
      { name: null, title: "Apply via Daybook listing", email: null, linkedin: null }
    ]
  },
  {
    name: "Flexing It — Consultant: Content Strategist/Writer (B2B SaaS, earned-media angle)",
    website: "https://www.flexingit.com/project/design-and-communications/flexing-it/86IsXqRt/",
    pipeline: "pr-freelance",
    industry: "Project-based consultant brief on Flexing It for a B2B SaaS content strategist/writer. Adjacent to Mark's remit where content strategy carries an earned-media / thought-leadership angle (bylines, executive narrative) rather than social-only content.",
    location: "Remote",
    fundingStage: "B2B SaaS client (not disclosed)",
    fitScore: 25,
    intentScore: 30,
    vertical: "pr",
    subvertical: "content-strategy",
    engagementModel: "contract",
    buyerType: "operating-company",
    compensationText: "Project-based (rate not disclosed)",
    remoteFlag: "remote",
    employmentTypeRaw: "Consultant — Content Strategist/Writer (project-based)",
    urgencyScore: 45,
    source: "Flexing It — Consultant Content Strategist/Writer (B2B SaaS), Aug 2026",
    sourceUrl: "https://www.flexingit.com/project/design-and-communications/flexing-it/86IsXqRt/",
    notes: "Grade C (combined 55, threshold). MARGINAL — content-led, not core media relations; qualifies only if the brief has a real earned-media/thought-leadership component. ACTION: only pursue if Mark wants content-strategy work; confirm earned-media angle first. Lowest priority this cycle.",
    contacts: [
      { name: null, title: "Apply via Flexing It project", email: null, linkedin: null }
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
