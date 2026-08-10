/**
 * Import script: PR Freelance Scrape 2026-07-31
 * Run: node scripts/import-pr-freelance-2026-07-31.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "Chameleon Collective — Fractional Communications Manager",
    website: "https://chameleoncollective.com/skill/fractional-communications-manager/",
    pipeline: "pr-freelance",
    industry: "Fractional-talent collective that places senior communications operators into PE-backed portfolio companies, growth-stage B2B SaaS, fintech, healthcare and consumer brands through transitions and scaling moments. Runs day-to-day messaging and ongoing comms operating discipline.",
    location: "Remote (US)",
    fundingStage: "Collective / talent network",
    fitScore: 50,
    intentScore: 35,
    vertical: "pr",
    subvertical: "comms",
    engagementModel: "fractional",
    buyerType: "agency",
    compensationText: "Not stated (fractional retainer / project engagements)",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional / project engagement via collective",
    urgencyScore: 55,
    source: "Web search (Chameleon Collective), July 2026",
    sourceUrl: "https://chameleoncollective.com/skill/fractional-communications-manager/",
    notes: "Grade A (combined 85). Best-fit bench of the run: matches Mark's exact pitch — senior operator who plugs in fast, sets messaging AND executes, aimed squarely at PE-backed / fintech / B2B SaaS. ACTION: apply to the collective's fractional comms bench; lead with finance/B2B messaging wins and 'strategic + executional, no ramp time.'",
    contacts: [
      { name: null, title: "Talent / partnerships (join the collective)", email: null, linkedin: "https://chameleoncollective.com/skill/fractional-communications-manager/" }
    ]
  },
  {
    name: "A&C (Anderson & Company) — Fractional Communications Director (Retainer)",
    website: "https://www.dontwaffle.me/fractional-communications-director/",
    pipeline: "pr-freelance",
    industry: "Boutique that provides senior communications leadership on retainer for fintech, financial services and NGOs — 'a director at your table with our team behind them.' Builds/runs the comms function for clients that don't want a full-time hire.",
    location: "Remote",
    fundingStage: "Boutique consultancy",
    fitScore: 50,
    intentScore: 35,
    vertical: "pr",
    subvertical: "executive-comms",
    engagementModel: "fractional",
    buyerType: "agency",
    compensationText: "Retainer (rate not published)",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional / retainer director",
    urgencyScore: 50,
    source: "Web search (A&C / dontwaffle.me), July 2026",
    sourceUrl: "https://www.dontwaffle.me/fractional-communications-director/",
    notes: "Grade A (combined 85). Core-ICP fit — fintech/financial-services comms on retainer, exactly Mark's lane. Likely uses associate/bench operators to deliver. ACTION: warm outreach to join as a delivery director on financial-services accounts; emphasize investor/media narrative + earned media.",
    contacts: [
      { name: null, title: "Founder / partnerships", email: null, linkedin: "https://www.dontwaffle.me/fractional-communications-director/" }
    ]
  },
  {
    name: "Portfolio Marketing Communications — Fractional Comms Lead (Investment Management)",
    website: "http://www.portfoliomc.com/fractional-cmo/",
    pipeline: "pr-freelance",
    industry: "Fractional marketing-communications firm with 30+ clients concentrated in fintech and investment management — hedge funds, wealth management and asset management. Provides outsourced comms/CMO leadership to financial firms.",
    location: "Remote",
    fundingStage: "Boutique consultancy",
    fitScore: 45,
    intentScore: 35,
    vertical: "pr",
    subvertical: "investor-pr",
    engagementModel: "fractional",
    buyerType: "agency",
    compensationText: "Not stated (fractional engagement)",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional consultancy",
    urgencyScore: 45,
    source: "Web search (Portfolio Marketing Communications), July 2026",
    sourceUrl: "http://www.portfoliomc.com/fractional-cmo/",
    notes: "Grade A (combined 80). Deepest sector fit in the run — pure investment-management comms shop with an active client book. May need PR/earned-media specialists to support the CMO layer. ACTION: pitch a PR/earned-media partnership; Mark supplies media relations + thought leadership under their fractional CMO umbrella.",
    contacts: [
      { name: null, title: "Principal / partnerships", email: null, linkedin: "http://www.portfoliomc.com/fractional-cmo/" }
    ]
  },
  {
    name: "Wilson PR — White-Label PR Execution Partner (Agency Overflow)",
    website: "https://wilsonpublicrelations.com/services/white-label-public-relations/",
    pipeline: "pr-freelance",
    industry: "PR firm offering white-label public relations to marketing/SEO/digital agencies — overflow capacity, ongoing support and strategic partnership executed under the client agency's brand. Pitching, writing, media relations.",
    location: "Remote",
    fundingStage: "PR agency",
    fitScore: 40,
    intentScore: 40,
    vertical: "pr",
    subvertical: "agency-overflow",
    engagementModel: "contract",
    buyerType: "agency",
    compensationText: "Not stated (white-label / per-engagement)",
    remoteFlag: "remote",
    employmentTypeRaw: "White-label contract execution",
    urgencyScore: 60,
    source: "Web search (Wilson PR white-label), July 2026",
    sourceUrl: "https://wilsonpublicrelations.com/services/white-label-public-relations/",
    notes: "Grade A (combined 80). Textbook agency-overflow / white-label play — near-term billable execution while finance leads mature. ACTION: offer Mark as white-label senior execution capacity (pitching + media relations) for their overflow; sector-agnostic but fast to bill.",
    contacts: [
      { name: null, title: "Partnerships / agency support", email: null, linkedin: "https://wilsonpublicrelations.com/services/white-label-public-relations/" }
    ]
  },
  {
    name: "3Search Group — Contract & Freelance PR / Comms Recruitment Desk",
    website: "https://www.3searchgroup.com/communications-pr-recruitment/",
    pipeline: "pr-freelance",
    industry: "Marketing/comms recruitment firm with a dedicated permanent, contract and freelance PR & communications desk placing professionals into brands, agencies and financial/B2B clients for flexible support.",
    location: "Remote / UK-US",
    fundingStage: "Recruitment firm",
    fitScore: 40,
    intentScore: 35,
    vertical: "pr",
    subvertical: "agency-overflow",
    engagementModel: "contract",
    buyerType: "staffing",
    compensationText: "Varies by placement",
    remoteFlag: "remote",
    employmentTypeRaw: "Contract / freelance via recruiter",
    urgencyScore: 45,
    source: "Web search (3Search Group), July 2026",
    sourceUrl: "https://www.3searchgroup.com/communications-pr-recruitment/",
    notes: "Grade B (combined 75). Channel play — get Mark onto a recruiter's freelance PR bench so contract briefs flow inbound. ACTION: register with the contract/freelance desk; flag finance & B2B specialism and remote availability.",
    contacts: [
      { name: null, title: "PR/Comms contract recruiter", email: null, linkedin: "https://www.3searchgroup.com/communications-pr-recruitment/" }
    ]
  },
  {
    name: "LaVoie Strategic Communications Group — Biotech IR / Life Sciences (Overflow)",
    website: "https://lavoiegroup.com/",
    pipeline: "pr-freelance",
    industry: "Boutique agency specializing in biotech PR, investor relations and life-sciences communications — messaging around milestones and pre-IPO/financing events. Client-service model that can absorb senior freelance/overflow support.",
    location: "Remote / Boston",
    fundingStage: "Boutique agency",
    fitScore: 45,
    intentScore: 20,
    vertical: "pr",
    subvertical: "investor-pr",
    engagementModel: "consultant",
    buyerType: "agency",
    compensationText: "",
    remoteFlag: "remote",
    employmentTypeRaw: "Agency (overflow / contract potential)",
    urgencyScore: 30,
    source: "Web search (LaVoie Strategic Communications), July 2026",
    sourceUrl: "https://lavoiegroup.com/",
    notes: "Grade B (combined 65). Strong sector fit (IR / financial comms) but speculative intent — no live freelance posting, so this is warm agency-overflow outreach. ACTION: introduce Mark as senior freelance capacity for peak/IPO workloads; lower priority than the A-grade bench opportunities.",
    contacts: [
      { name: null, title: "Managing / partnerships", email: null, linkedin: "https://lavoiegroup.com/" }
    ]
  },
  {
    name: "Built In — Public Relations Expert (US-Based Freelancer)",
    website: "https://builtin.com/job/public-relations-expert-us-based-freelancer/6654385",
    pipeline: "pr-freelance",
    industry: "Tech-sector job board listing an explicit US-based freelance PR expert role — media relations and earned-media execution for a tech/startup employer. Direct, easy-apply freelance posting.",
    location: "Remote (US)",
    fundingStage: "Tech / startup",
    fitScore: 30,
    intentScore: 35,
    vertical: "pr",
    subvertical: "media-relations",
    engagementModel: "freelance",
    buyerType: "startup",
    compensationText: "Not stated (freelance)",
    remoteFlag: "remote",
    employmentTypeRaw: "Freelance (1099)",
    urgencyScore: 55,
    source: "Built In job board, July 2026",
    sourceUrl: "https://builtin.com/job/public-relations-expert-us-based-freelancer/6654385",
    notes: "Grade B (combined 65). Only true dated job posting in the run — explicit US-based freelance PR role, easy apply. Sector (tech) is outside core finance ICP but engagement model is clean freelance. ACTION: quick direct application; verify the posting is still live before pitching.",
    contacts: [
      { name: null, title: "Hiring (via Built In)", email: null, linkedin: "https://builtin.com/job/public-relations-expert-us-based-freelancer/6654385" }
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
        scrapeDate: new Date("2026-07-31")
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
