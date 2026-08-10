/**
 * Import script: Daily Scrape 2026-08-10
 * Run: node scripts/import-2026-08-10.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "Ambrook",
    website: "https://ambrook.com",
    pipeline: "pr-marketing",
    industry: "Financial Services / FinTech — AI-native accounting, payments & cash-management software for independent 'real economy' businesses (agriculture, trucking, construction, property management)",
    location: "New York, NY (serves businesses in all 50 US states)",
    fundingStage: "Series B ($30M; total raised $59M)",
    fitScore: 48,
    intentScore: 35,
    fitDetails: {"industryMatchFSTech": 10, "stageSizeGrowth": 10, "b2bBuyerSalesMotion": 10, "proofAssets": 10, "budget5k25k": 8},
    intentDetails: {"triggerPresent": 15, "timelineToStart": 6, "decisionMakerEngaged": 5, "urgencyPain": 6, "responsiveness": 3},
    vertical: "",
    subvertical: "",
    engagementModel: "",
    buyerType: "",
    compensationText: "",
    remoteFlag: "",
    employmentTypeRaw: "",
    urgencyScore: 0,
    signals: ["Closed $30M Series B led by Lachy Groom (2026-08-06); backers incl. Thomson Reuters Ventures, Thrive Capital, Field Ventures, Cameron Ventures", "Angel roster is a strong earned-media hook: Akshay Kothari (Notion), Tomer London (Gusto), Guillermo Rauch (Vercel)", "Customers grew ~2,500 (Jul 2025) to 8,000+ across every US state; expanding from farms into trucking, construction, real estate"],
    source: "FinTech Global funding roundup + Morning Ag Clips / TheSaaSNews (2026-08-06)",
    sourceUrl: "https://fintech.global/2026/08/06/ambrook-lands-30m-to-power-independent-businesses/",
    notes: "Grade A (83). Fresh Series B + marquee investor/angel narrative = PR-rich window. 'Real economy / QuickBooks-killer for farms' is a distinctive, media-friendly story. Pitch retainer around category-defining thought leadership + vertical expansion announcements (trucking/construction). Verify website (ambrook.com best-effort).",
    contacts: []
  },
  {
    name: "Faye",
    website: "https://www.withfaye.com",
    pipeline: "pr-marketing",
    industry: "Financial Services / InsurTech — AI-powered travel insurance with near-instant, automated claims",
    location: "Henrico County (Richmond), Virginia",
    fundingStage: "Series C ($50M; total raised ~$100M)",
    fitScore: 46,
    intentScore: 35,
    fitDetails: {"industryMatchFSTech": 10, "stageSizeGrowth": 10, "b2bBuyerSalesMotion": 8, "proofAssets": 10, "budget5k25k": 8},
    intentDetails: {"triggerPresent": 15, "timelineToStart": 6, "decisionMakerEngaged": 5, "urgencyPain": 6, "responsiveness": 3},
    vertical: "",
    subvertical: "",
    engagementModel: "",
    buyerType: "",
    compensationText: "",
    remoteFlag: "",
    employmentTypeRaw: "",
    urgencyScore: 0,
    signals: ["Closed $50M Series C led by Madrona (2026-08-05); doubles total funding to ~$100M since 2022 launch; BRM + existing Portage, F2, Viola, Lumir participated", "Capital earmarked for geographic expansion and airline/cruise/OTA distribution deals — steady partnership-announcement cadence ahead", "Award-winning app + fast-claims proof points; consumer + B2B distribution angle"],
    source: "FinTech Global + Skift / PhocusWire / Virginia Business (2026-08-05)",
    sourceUrl: "https://skift.com/2026/08/05/faye-raises-50-million-bets-on-ai-to-get-travel-insurance-claims-paid-in-minutes/",
    notes: "Grade A (81). Insurtech with a clear consumer-earned-media story AND upcoming B2B distribution deals (airline/cruise/OTA) that each carry a press moment. Slightly lower B2B score — core buyer is consumer — but distribution partnerships are retainer-friendly. Pitch launch/partnership comms + exec thought leadership on AI claims.",
    contacts: []
  },
  {
    name: "Naïve",
    website: "https://naive.dev",
    pipeline: "pr-marketing",
    industry: "AI infrastructure — unified API (company formation, payments, communications, compute) enabling AI agents to incorporate and operate real businesses",
    location: "Palo Alto, CA",
    fundingStage: "Series A ($28.5M)",
    fitScore: 45,
    intentScore: 35,
    fitDetails: {"industryMatchFSTech": 8, "stageSizeGrowth": 10, "b2bBuyerSalesMotion": 10, "proofAssets": 10, "budget5k25k": 7},
    intentDetails: {"triggerPresent": 15, "timelineToStart": 6, "decisionMakerEngaged": 5, "urgencyPain": 6, "responsiveness": 3},
    vertical: "",
    subvertical: "",
    engagementModel: "",
    buyerType: "",
    compensationText: "",
    remoteFlag: "",
    employmentTypeRaw: "",
    urgencyScore: 0,
    signals: ["Closed $28.5M Series A led by Nexus Venture Partners (2026-08-06); YC, Zetta, Liquid 2 + angels (Gokul Rajaram, Tim Zheng/Apollo, JD Sherman/ex-HubSpot, Robert Chatwani/Docusign)", "30,000+ developer customers within months; ARR up ~10x to low double-digit millions in six months to Aug 2026", "'Infrastructure for autonomous companies' is a high-narrative, category-creating story (TechCrunch coverage already landed)"],
    source: "TechCrunch / FinSMEs / Dealroom (2026-08-06)",
    sourceUrl: "https://techcrunch.com/2026/08/06/naive-raises-28-5m-to-automate-the-grunt-work-of-setting-up-and-running-a-company/",
    notes: "Grade A (80). Funding-EVENT trigger (business event, not a job posting) -> pr-marketing per Mark's rule. Slightly off-core-FS (AI infra) so industry sub-score reduced to 8. Founder-led YC story + heavyweight angels = credible spokespeople. Pitch category-narrative + earned-media around the autonomous-company thesis. Also a plausible ai-consulting cross-sell later. Verify website (naive.dev best-effort).",
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
