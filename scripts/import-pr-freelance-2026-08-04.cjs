/**
 * Import script: PR Freelance Scrape 2026-08-04
 * Run: node scripts/import-pr-freelance-2026-08-04.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "Go Fractional — Investor Relations & Internal Communications Marketplace (Bench Membership)",
    website: "https://www.gofractional.com",
    pipeline: "pr-freelance",
    industry: "US fractional-executive marketplace matching pre-vetted senior operators to companies for fractional, interim, or full-time engagements. Runs dedicated Investor Relations Manager and Internal Communications Manager benches (1,400+ vetted comms/IR practitioners) and brokers interim comms roles (placed the PagerDuty Interim Director of Communications). Buyers are venture/PE-backed and pre-IPO companies needing comms/IR help fast.",
    location: "Remote (US)",
    fundingStage: "Marketplace / platform (clients are venture & PE-backed, pre-IPO)",
    fitScore: 45,
    intentScore: 30,
    vertical: "pr",
    subvertical: "investor-pr",
    engagementModel: "fractional",
    buyerType: "staffing",
    compensationText: "Varies by engagement (fractional/interim; rates set per brief)",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional / interim / project engagements via marketplace",
    urgencyScore: 55,
    source: "Web search — Go Fractional (IR & Internal Comms hire pages, jobs board), Aug 2026",
    sourceUrl: "https://www.gofractional.com/hire/investor-relations-manager",
    notes: "Grade B (combined 75) — hottest of the run as a recurring channel. Repeatable source of interim/fractional comms & IR briefs aimed at Mark's buyer set (PE/VC-backed, pre-IPO, IR-readiness); already brokered the PagerDuty interim comms role logged earlier. ACTION: get Mark listed on the IR + Internal Comms benches with an IR-readiness / earned-media positioning; treat as ongoing inbound pipe.",
    contacts: [
      { name: null, title: "Operator onboarding (join the bench via site)", email: null, linkedin: "https://www.linkedin.com/company/gofractional" }
    ]
  },
  {
    name: "VMA Group — Interim Communications & Investor Relations Specialist Network",
    website: "https://vmagroup.com",
    pipeline: "pr-freelance",
    industry: "International executive-search and interim recruiter specialising in communications, corporate affairs, and investor relations. Maintains a network of interim comms/IR specialists placed at short notice into corporates, financial services, and PE/VC-backed businesses across the US, UK, and EU.",
    location: "Remote / hybrid (US, UK, EU)",
    fundingStage: "Recruiter / interim network (clients span corporates and financial services)",
    fitScore: 45,
    intentScore: 25,
    vertical: "pr",
    subvertical: "comms",
    engagementModel: "interim",
    buyerType: "staffing",
    compensationText: "Day-rate / interim (set per client brief)",
    remoteFlag: "hybrid",
    employmentTypeRaw: "Interim / contract via specialist recruiter",
    urgencyScore: 45,
    source: "Web search — VMA Group (Investor Relations / interim comms specialisms), Aug 2026",
    sourceUrl: "https://vmagroup.com/communications/investor-relations/",
    notes: "Grade B (combined 70). Comms/IR-specialist recruiter with a genuine financial-services book — strong ongoing channel for interim corporate-comms and IR briefs fitting Mark's finance-heavy ICP. ACTION: register Mark with the interim/IR desk positioning senior earned-media + investor-narrative capability; nurture for repeat placements.",
    contacts: [
      { name: null, title: "Interim & IR desk (register as interim specialist)", email: null, linkedin: "https://www.linkedin.com/company/vma-group" }
    ]
  },
  {
    name: "The James Collective — Freelance PR & Media Relations Consultant",
    website: "https://www.theprnet.com",
    pipeline: "pr-freelance",
    industry: "PR / communications agency hiring an external freelance PR & media relations consultant to drive media coverage and influencer engagement across its client roster. Remote, part-time engagement (~10–20 hours/month) — classic agency-overflow execution support.",
    location: "Remote (US)",
    fundingStage: "Agency (client-services)",
    fitScore: 35,
    intentScore: 30,
    vertical: "pr",
    subvertical: "media-relations",
    engagementModel: "freelance",
    buyerType: "agency",
    compensationText: "Not stated (part-time, ~10–20 hrs/month)",
    remoteFlag: "remote",
    employmentTypeRaw: "Freelance / part-time consultant (remote)",
    urgencyScore: 50,
    source: "Web search — The PR Net jobs board (job 1745), Aug 2026",
    sourceUrl: "https://www.theprnet.com/jobs/1745",
    notes: "Grade B (combined 65). Clean agency-overflow freelance brief — media relations execution, remote, low-hours. Sector isn't finance-specific so fit is capped, but it's a real named posting with a direct apply path. ACTION: apply with earned-media placement samples; frame as fast plug-in overflow support.",
    contacts: [
      { name: null, title: "Hiring contact (apply via The PR Net)", email: null, linkedin: null }
    ]
  },
  {
    name: "No Strings Public Relations — White-Label PR Execution Partner (UK & US)",
    website: "https://www.nostringspublicrelations.com",
    pipeline: "pr-freelance",
    industry: "PR firm offering white-label PR delivery for SEO and marketing agencies across the UK and US — resells media mentions, digital PR campaigns, and press coverage under partner agencies' brands. Recruits external PR execution partners to fulfil overflow demand.",
    location: "Remote (UK & US)",
    fundingStage: "Agency (white-label)",
    fitScore: 35,
    intentScore: 25,
    vertical: "pr",
    subvertical: "agency-overflow",
    engagementModel: "freelance",
    buyerType: "agency",
    compensationText: "Project / per-campaign (white-label rates)",
    remoteFlag: "remote",
    employmentTypeRaw: "White-label freelance execution partner",
    urgencyScore: 40,
    source: "Web search — No Strings Public Relations (white-label PR page), Aug 2026",
    sourceUrl: "https://www.nostringspublicrelations.com/white-label-pr",
    notes: "Grade B (combined 60). White-label overflow partner in the vein of Wilson PR / 10to1 / TrizCom already in the pipeline — recurring behind-the-scenes execution through agencies without owning the client. UK & US footprint widens the channel. ACTION: send a white-label partnership enquiry offering senior media-relations execution capacity; ask about brief volume and rates.",
    contacts: [
      { name: null, title: "Partnerships (white-label enquiry via site)", email: null, linkedin: "https://www.linkedin.com/company/no-strings-pr" }
    ]
  },
  {
    name: "ALM Corp — White-Label Online PR Services Partner",
    website: "https://almcorp.com",
    pipeline: "pr-freelance",
    industry: "Marketing services firm offering white-label online PR under partner agencies' brands — strategy, outreach, content, media placement, monitoring, and reporting, all rebranded as the reselling agency's work. Uses external PR practitioners to deliver placements at volume.",
    location: "Remote",
    fundingStage: "Agency (white-label / marketing services)",
    fitScore: 30,
    intentScore: 25,
    vertical: "pr",
    subvertical: "agency-overflow",
    engagementModel: "freelance",
    buyerType: "agency",
    compensationText: "Project / per-placement (white-label rates)",
    remoteFlag: "remote",
    employmentTypeRaw: "White-label freelance PR delivery partner",
    urgencyScore: 35,
    source: "Web search — ALM Corp (white-label online PR services), Aug 2026",
    sourceUrl: "https://almcorp.com/white-label-services/white-label-social-media-marketing/white-label-online-pr-services/",
    notes: "Grade C (combined 55). Lowest-priority lead — genuine white-label overflow demand, but leans digital-PR/backlink volume rather than senior strategic earned media, so it undervalues Mark's level. ACTION: only pursue if capacity is idle; if so, pitch senior media-relations strategy as an upsell.",
    contacts: [
      { name: null, title: "Partnerships (white-label enquiry via site)", email: null, linkedin: null }
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
