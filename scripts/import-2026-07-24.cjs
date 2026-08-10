/**
 * Import script: Daily Scrape 2026-07-24
 * Run: node scripts/import-2026-07-24.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "Cascade",
    website: "https://usecascade.ai/",
    pipeline: "pr-marketing",
    industry: "AEC construction-tech / vertical AI — 'Pursuit Hub' predicts upcoming architecture, engineering & construction projects before they go to tender by reading public signals (bond filings, permits, grants, capital plans) so AEC firms can pursue work months ahead of the RFP.",
    location: "New York, NY, US",
    fundingStage: "Seed — $3.5M led by Andreessen Horowitz Speedrun (a16z), announced Jul 21, 2026",
    fitScore: 39,
    intentScore: 37,
    vertical: "",
    subvertical: "",
    engagementModel: "",
    buyerType: "",
    compensationText: "",
    remoteFlag: "",
    employmentTypeRaw: "",
    urgencyScore: 0,
    source: "WebSearch — Cascade seed funding coverage (TechCrunch, GlobeNewswire, The Next Web, Tech.eu, citybiz)",
    sourceUrl: "https://techcrunch.com/2026/07/22/cascade-raises-3-5m-to-help-construction-firms-find-and-win-projects/",
    notes: "Grade B (76). Fresh, in-window seed + launch (Jul 21). Best boutique-fit of the week: seed-stage size means a $5-25k/mo retainer is realistic, founder-led so decision-maker is reachable, and the 'AI predicts construction projects before they exist' story plus marquee JFK/LaGuardia/data-center logos are earned-media-ready. Scored down on industry (AEC, not core FS/tech) and budget certainty. ACTION: pitch a launch-momentum + thought-leadership program. Qualify budget and comms owner early. Confirm website usecascade.ai.",
    contacts: [
      { name: "Hannia Zia", title: "Co-Founder & CEO (ex-Google)", email: null, linkedin: null },
      { name: "Joana Ferreira", title: "Co-Founder (ex-Google / UnlikelyAI)", email: null, linkedin: null }
    ]
  },
  {
    name: "Arrakis Technologies",
    website: "https://www.arrakis.tech/",
    pipeline: "pr-marketing",
    industry: "Industrial AI — an AI 'operating system' that deploys governed AI agents into mission-critical operational workflows for aerospace, energy, logistics, manufacturing, construction and telecoms.",
    location: "London, UK (and Paris)",
    fundingStage: "Series A — $30M led by Blossom Capital (Accel, GFC, MainObject, Rerail participating), on top of a $7.5M Accel seed; ~$38M total, $140M post-money. Emerged from stealth Jul 22, 2026.",
    fitScore: 39,
    intentScore: 34,
    vertical: "",
    subvertical: "",
    engagementModel: "",
    buyerType: "",
    compensationText: "",
    remoteFlag: "",
    employmentTypeRaw: "",
    urgencyScore: 0,
    source: "WebSearch — Arrakis stealth-emergence coverage (Fortune, TechCrunch, The Next Web, Accel, Tech.eu)",
    sourceUrl: "https://fortune.com/2026/07/22/arrakis-a-startup-betting-ais-biggest-payoff-is-in-industrial-sectors-not-office-work-emerges-from-stealth-with-38-million-in-venture-funding/",
    notes: "Grade B (73). Fresh stealth-emergence + Series A (Jul 22) with a story-rich founder/backer roster (Palantir/Revolut/Delivery Hero alumni; Datadog CEO + OpenAI exec angels). Strong enterprise B2B motion. Scored down on budget (well-funded AI startup likely engages a larger tech-PR firm) and decision-maker access (UK/Paris). ACTION: pitch a post-launch earned-media + thought-leadership sprint on the 'industrial AI last-mile' narrative; realistic as fractional/overflow support. CAVEAT: EU HQ — confirm US-market comms need and budget.",
    contacts: [
      { name: "Rafael Quintanilla", title: "Co-Founder & CEO (ex-Accel VP)", email: null, linkedin: null },
      { name: null, title: "Head of Marketing / Communications", email: null, linkedin: null }
    ]
  },
  {
    name: "aVenture — Venture Capital Fund Attorney (Remote Contract, fund formation)",
    website: "https://aventure.vc/",
    pipeline: "legal-freelance",
    industry: "Fintech platform giving ordinary investors access to venture capital funds. Hiring a fund/regulatory attorney to set up VC funds and handle compliance: entity formation, open/closed-end fund structuring across jurisdictions, subscription agreements, side letters, and contracts with fund administrators/custodians.",
    location: "San Francisco, CA, US (remote — worldwide; >=4 hrs US Pacific overlap/weekday)",
    fundingStage: "Privately held fintech; small global team",
    fitScore: 50,
    intentScore: 28,
    vertical: "legal",
    subvertical: "fund",
    engagementModel: "contract",
    buyerType: "fintech",
    compensationText: "$80K–$120K (employer-provided range)",
    remoteFlag: "remote",
    employmentTypeRaw: "Remote (worldwide, WFH); >=4 hrs US Pacific availability per weekday; $80K–$120K",
    urgencyScore: 40,
    source: "WebSearch — aVenture 'Venture Capital Fund Attorney' listing (Glassdoor, LinkedIn Jobs)",
    sourceUrl: "https://www.glassdoor.com/job-listing/venture-capital-fund-attorney-aventure-JV_KO0,29_KE30,38.htm?jl=1008239968893",
    notes: "Grade B (78). Perfect practice-area fit — fund formation + structuring + subscription agreements/side letters + stated market-credible comp — so Fit maxes at 50. Intent held back: engagement type ambiguous (comp quoted as salary range reads more like flexible-remote employee than clean 1099) and RECENCY UNVERIFIED (old-format LinkedIn ID; listing may be evergreen/re-indexed) so postedWithin72h = 0. ACTION: verify posting is live and whether contract/fractional vs. FTE before pitching; if contract, strong direct pitch. employmentTypeRaw kept distinct from engagementModel per taxonomy.",
    contacts: [
      { name: null, title: "Hiring / Legal (aVenture)", email: null, linkedin: "https://www.linkedin.com/jobs/view/venture-capital-fund-attorney-at-aventure-startup-investing-funds-3387960195" }
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
        scrapeDate: new Date("2026-07-24")
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
