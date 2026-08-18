/**
 * Import script: Daily Scrape 2026-08-14
 * Run: node scripts/import-2026-08-14.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "LWD Advisors — Fractional Senior Legal Counsel (Corporate, Venture-Backed Startups; Remote ~15 hrs/wk)",
    website: "https://www.fractionaljobs.io/jobs/senior-legal-counsel-at-lwd-advisors",
    pipeline: "legal-freelance",
    industry: "Legal services / virtual in-house legal department for venture-backed startups",
    location: "Remote (Bay Area based)",
    fundingStage: "",
    fitScore: 20,
    intentScore: 50,
    fitDetails: {"fund": 0, "corporateContractsMAFinancingVentureSecurities": 10, "seniorityCounselGC": 10, "compStatedMarketCredible": 0},
    intentDetails: {"engagementModelFractionalInterimContract": 15, "remoteHybridFlex": 15, "postedWithin72h": 10, "easyApplyDirectContact": 10},
    vertical: "legal",
    subvertical: "corporate",
    engagementModel: "fractional",
    buyerType: "ALSP",
    compensationText: "",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional (~15 hrs/week)",
    urgencyScore: 70,
    signals: ["New posting on Fractional Jobs — fractional Corporate Attorney, ~15 hrs/week, remote (Bay Area based)", "LWD is a virtual in-house legal department serving a group of venture-backed startups", "Buyer needs experienced corporate counsel at fractional cost — classic fractional/embedded engagement"],
    source: "Fractional Jobs",
    sourceUrl: "https://www.fractionaljobs.io/jobs/senior-legal-counsel-at-lwd-advisors",
    notes: "Grade B (70). Strong engagement-model + remote signals; fit capped by no fund-specific work and no stated comp. Corporate/venture practice area is a good match for Mark's freelance corporate work. Founder Jeff Hyman (ex-Cooley; in-house Intel/Apple/Google).",
    contacts: [
      { name: "Jeff Hyman", title: "Founder (ex-Cooley; in-house at Intel, Apple, Pebble, Google)", email: "", linkedin: "" }
    ]
  },
  {
    name: "Hayden Industrial, LLC — Fractional General Counsel (Commercial Contracts; Remote ~1–2 days/wk)",
    website: "https://jobline.acc.com/job/fractional-general-counsel-remote--54004",
    pipeline: "legal-freelance",
    industry: "Industrial manufacturing (engineered heat exchanger systems)",
    location: "Remote",
    fundingStage: "",
    fitScore: 20,
    intentScore: 50,
    fitDetails: {"fund": 0, "corporateContractsMAFinancingVentureSecurities": 10, "seniorityCounselGC": 10, "compStatedMarketCredible": 0},
    intentDetails: {"engagementModelFractionalInterimContract": 15, "remoteHybridFlex": 15, "postedWithin72h": 10, "easyApplyDirectContact": 10},
    vertical: "legal",
    subvertical: "contracts",
    engagementModel: "fractional",
    buyerType: "operating-company",
    compensationText: "",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional (~1–2 days/week)",
    urgencyScore: 68,
    signals: ["~200 employees, ~$300M revenue, planning to roughly double headcount in the coming year", "Building operational and legal infrastructure to support growth — primary GC role", "Scope: reviewing/redlining/negotiating commercial contracts (engineered equipment supply, project delivery), plus insurance, employment, real estate, outside-counsel coordination"],
    source: "ACC Jobline",
    sourceUrl: "https://jobline.acc.com/job/fractional-general-counsel-remote--54004",
    notes: "Grade B (70). Mid-market operating company doing commercial-contracts-heavy fractional GC work — squarely in the freelance ICP. Fit capped by no fund work and no stated comp.",
    contacts: []
  },
  {
    name: "Dili — $15M Series A (AI Compliance for U.S. Infrastructure Projects)",
    website: "",
    pipeline: "pr-marketing",
    industry: "AI / RegTech (compliance automation for infrastructure construction)",
    location: "United States",
    fundingStage: "Series A — $15M (announced 2026-08-11)",
    fitScore: 44,
    intentScore: 35,
    fitDetails: {"industryMatchFSTech": 8, "stageSizeGrowth": 10, "clearB2BBuyerSalesMotion": 10, "proofAssets": 8, "budget5kTo25kMo": 8},
    intentDetails: {"triggerPresent": 15, "timelineToStart0To30d": 7, "decisionMakerEngaged": 5, "urgencyPain": 5, "responsiveness": 3},
    vertical: "",
    subvertical: "",
    engagementModel: "",
    buyerType: "",
    compensationText: "",
    remoteFlag: "",
    employmentTypeRaw: "",
    urgencyScore: 0,
    signals: ["$15M Series A led by Khosla Ventures (announced Aug 11, 2026)", "Backers: Allianz, Rebel Fund, Brick & Mortar Ventures' Darren Bechtel, Y Combinator's Garry Tan", "Targets federal compliance (Davis-Bacon prevailing wage, IRA clean-energy labor rules) for AI data-center / power infrastructure buildouts"],
    source: "The AI Insider",
    sourceUrl: "https://theaiinsider.tech/2026/08/11/ai-compliance-startup-dili-announces-15m-series-a-to-tackle-infrastructure-regulatory-burden/",
    notes: "Grade B (79, near-A). Fresh raise = classic PR-marketing trigger. Blue-chip backers give credibility for a retainer/advisory pitch. Post-raise comms build window is open now. Verify company website/CEO before outreach.",
    contacts: []
  },
  {
    name: "Pinegap — $8M Series A (Fintech)",
    website: "",
    pipeline: "pr-marketing",
    industry: "Fintech",
    location: "United States",
    fundingStage: "Series A — $8M (led by Stellaris Venture Partners)",
    fitScore: 42,
    intentScore: 34,
    fitDetails: {"industryMatchFSTech": 10, "stageSizeGrowth": 10, "clearB2BBuyerSalesMotion": 8, "proofAssets": 7, "budget5kTo25kMo": 7},
    intentDetails: {"triggerPresent": 15, "timelineToStart0To30d": 6, "decisionMakerEngaged": 5, "urgencyPain": 5, "responsiveness": 3},
    vertical: "",
    subvertical: "",
    engagementModel: "",
    buyerType: "",
    compensationText: "",
    remoteFlag: "",
    employmentTypeRaw: "",
    urgencyScore: 0,
    signals: ["$8M Series A led by Stellaris Venture Partners", "Participation from Inventus, Silicon Valley Quad, and DeVC", "Covered in FinTech Futures ICYMI funding round-up (mid-Aug 2026)"],
    source: "FinTech Futures",
    sourceUrl: "https://www.fintechfutures.com/venture-capital-funding/icymi-fintech-funding-round-up-multifi-pinegap-rivo-and-more",
    notes: "Grade B (76). Fintech Series A = on-ICP trigger for a PR retainer pitch. Smaller round than Dili, so budget/proof scored slightly lower. Confirm specific product line before outreach.",
    contacts: []
  }
];

async function main() {
  let inserted = 0, skipped = 0;
  for (const lead of leads) {
    const existing = await prisma.company.findFirst({ where: { name: lead.name } });
    if (existing) { console.log(`SKIP (exists): ${lead.name}`); skipped++; continue; }
    await prisma.company.create({
      data: {
        name: lead.name,
        website: lead.website,
        pipeline: lead.pipeline,
        industry: lead.industry,
        location: lead.location,
        fundingStage: lead.fundingStage,
        fitScore: lead.fitScore,
        intentScore: lead.intentScore,
        fitDetails: lead.fitDetails,
        intentDetails: lead.intentDetails,
        vertical: lead.vertical,
        subvertical: lead.subvertical,
        engagementModel: lead.engagementModel,
        buyerType: lead.buyerType,
        compensationText: lead.compensationText,
        remoteFlag: lead.remoteFlag,
        employmentTypeRaw: lead.employmentTypeRaw,
        urgencyScore: lead.urgencyScore,
        signals: lead.signals,
        source: lead.source,
        sourceUrl: lead.sourceUrl,
        notes: lead.notes,
        contacts: {
          create: (lead.contacts || []).map((c) => ({
            name: c.name,
            title: c.title,
            email: c.email,
            linkedin: c.linkedin,
          })),
        },
      },
    });
    console.log(`INSERT: ${lead.name}`);
    inserted++;
  }
  console.log(`\nDone. Inserted ${inserted}, skipped ${skipped}.`);
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
