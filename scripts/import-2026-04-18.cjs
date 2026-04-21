#!/usr/bin/env node
/**
 * Import leads from daily scrape 2026-04-18
 *
 * Usage:  cd MarCRM && node scripts/import-2026-04-18.cjs
 *
 * - Deduplicates by company name (skips if already in DB)
 * - Creates Company + Contact records
 * - Logs a ScrapeResult for each lead
 */

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const LEADS = [
  // ─── PR & Marketing ───────────────────────────────────────────
  {
    company: {
      name: "Shepherd",
      website: "https://www.shepherdinsurance.com",
      pipeline: "pr-marketing",
      industry: "InsurTech / AI-Native Commercial Insurance",
      size: "600+ customers, 1,500+ policies, $400B+ project value insured (7x revenue growth in 24 months)",
      location: "United States",
      fundingStage: "Series B ($42M, March 24, 2026) — total raised $67M",
      techStack: JSON.stringify(["AI/ML underwriting", "Procore", "Autodesk", "OpenSpace", "DroneDeploy", "Samsara"]),
      fitScore: 44,
      intentScore: 43,
      fitDetails: JSON.stringify({ industry: 9, stage: 9, buyer: 9, proof: 9, budget: 8 }),
      intentDetails: JSON.stringify({ trigger: 14, timeline: 9, dm_engaged: 7, urgency: 8, responsive: 5 }),
      notes: "Closed $42M Series B March 24, 2026 led by Intact Private Capital (carrier partner too), with Spark Capital and Costanoa. Positions insurance for AI infrastructure boom — data centers, hyperscalers, chipmakers. 7x revenue growth in 24 months. Classic post-raise B2B fintech PR amplification target with hot AI-adjacent narrative.",
      source: "Daily Scrape 2026-04-18",
      lastActivity: "Series B announced March 24, 2026",
    },
    contacts: [
      { name: "Justin Levine", title: "CEO & Co-founder", persona: "CEO / Founder", decisionMaker: true },
    ],
    scrape: {
      url: "https://www.shepherdinsurance.com",
      source: "news_pr",
      matchedSignals: JSON.stringify(["fundraise", "launch", "market_entry"]),
    },
  },

  // ─── AI Consulting ─────────────────────────────────────────────
  {
    company: {
      name: "InsightFinder",
      website: "https://insightfinder.com",
      pipeline: "ai-consulting",
      industry: "AI Observability / AIOps / Enterprise Reliability",
      size: "Sub-30 person team, revenue 3x YoY; customers include UBS, NBCUniversal, Lenovo, Dell, Google Cloud, Comcast",
      location: "Research Triangle, NC",
      fundingStage: "Series B ($15M, April 16, 2026) — total raised $35M, led by Yu Galaxy",
      techStack: JSON.stringify(["composite AI", "AIOps", "autonomous agents", "incident lifecycle ML"]),
      fitScore: 43,
      intentScore: 44,
      fitDetails: JSON.stringify({ industry: 10, data_maturity: 9, use_case: 9, buyer_access: 7, budget: 8 }),
      intentDetails: JSON.stringify({ signal: 18, timeline: 9, pain: 8, sponsor: 5, responsive: 4 }),
      notes: "$15M Series B from Yu Galaxy announced April 16, 2026 — freshest trigger on the board. Academic roots (NC State, 15 years of research). Tier-1 customers. CEO explicitly said the capital will fund 'first dedicated sales and marketing hires.' Textbook AI-consulting target — hiring now, needs positioning, no marketing DNA yet. Founder is a CS professor = likely coachable.",
      source: "Daily Scrape 2026-04-18",
      lastActivity: "Series B announced April 16, 2026",
    },
    contacts: [
      { name: "Gelin Gu", title: "CEO & Founder (NC State CS Professor; ex-IBM, ex-Google)", persona: "CEO / Founder", decisionMaker: true },
    ],
    scrape: {
      url: "https://insightfinder.com",
      source: "news_pr",
      matchedSignals: JSON.stringify(["fundraise", "hiring_ai", "initiative"]),
    },
  },
  {
    company: {
      name: "Gumloop",
      website: "https://www.gumloop.com",
      pipeline: "ai-consulting",
      industry: "AI Agent Platform / Enterprise Workflow Automation",
      size: "Growth stage; customers include Shopify, Ramp, Gusto, Samsara, Instacart, Opendoor",
      location: "San Francisco, CA",
      fundingStage: "Series B ($50M, March 12, 2026) — led by Benchmark",
      techStack: JSON.stringify(["no-code", "multi-model routing (OpenAI/Anthropic/Gemini)", "natural-language workflow builder"]),
      fitScore: 40,
      intentScore: 40,
      fitDetails: JSON.stringify({ industry: 9, data_maturity: 9, use_case: 8, buyer_access: 6, budget: 8 }),
      intentDetails: JSON.stringify({ signal: 14, timeline: 8, pain: 7, sponsor: 6, responsive: 5 }),
      notes: "$50M Series B led by Benchmark March 12, 2026 (Everett Randle's first investment at Benchmark). No-code AI agent platform. Founder Max Brodeur-Urbas building a dedicated sales force. Adjacent to AI-consulting ICP — could be a direct PR-marketing lead and/or a channel partner for our consulting practice.",
      source: "Daily Scrape 2026-04-18",
      lastActivity: "Series B announced March 12, 2026",
    },
    contacts: [
      { name: "Max Brodeur-Urbas", title: "Co-founder & CEO", persona: "CEO / Founder", decisionMaker: true },
    ],
    scrape: {
      url: "https://www.gumloop.com",
      source: "news_pr",
      matchedSignals: JSON.stringify(["fundraise", "hiring_sales", "market_entry"]),
    },
  },

  // ─── Legal Consulting ──────────────────────────────────────────
  {
    company: {
      name: "Checkbox",
      website: "https://www.checkbox.ai",
      pipeline: "legal-consulting",
      industry: "LegalTech / AI Legal Intake & Workflow Orchestration",
      size: "100+ enterprise customers (SAP, PepsiCo, Hitachi, multiple Fortune 500)",
      location: "Sydney, Australia / US (global)",
      fundingStage: "Series A ($23M, January 28, 2026) at $100M valuation",
      techStack: JSON.stringify(["AI workflow orchestration", "Slack/Teams/Email intake", "no-code builder", "agentic routing"]),
      fitScore: 40,
      intentScore: 36,
      fitDetails: JSON.stringify({ complexity: 12, ongoing: 11, org_size: 7, dm_access: 5, budget: 5 }),
      intentDetails: JSON.stringify({ active_problem: 14, timeline: 7, volume: 7, pressure: 4, responsive: 4 }),
      notes: "$23M Series A Jan 28, 2026 led by Touring Capital (Peak XV/Conductive/Tidal/Five V). Angel Jerry Ting (ex-Evisort CEO, now Workday VP). 'AI Legal Front Door' for in-house teams — 83% of routine legal/compliance requests at Hitachi are now automated. Selling into Fortune 500 in-house legal = strong adjacency for our legal-consulting practice (rollout advisory, change management, compliance).",
      source: "Daily Scrape 2026-04-18",
      lastActivity: "Series A announced January 28, 2026",
    },
    contacts: [
      { name: "Evan Wong", title: "CEO & Co-founder", persona: "CEO / Founder", decisionMaker: true },
      { name: "James Han", title: "Co-founder & COO", persona: "COO / Head of Ops", decisionMaker: true },
    ],
    scrape: {
      url: "https://www.checkbox.ai",
      source: "news_pr",
      matchedSignals: JSON.stringify(["fundraise", "enterprise_expansion", "compliance"]),
    },
  },
  {
    company: {
      name: "Felix",
      website: "https://www.felix.ai",
      pipeline: "legal-consulting",
      industry: "LegalTech / AI Hyperautomation for Professional Services",
      size: "Pre-launch / newly public (April 2026)",
      location: "Prague, Czech Republic",
      fundingStage: "Pre-seed ($1.7M, April 7, 2026) — led by XYZ Venture Capital",
      techStack: JSON.stringify(["NLP", "LLMs", "deterministic workflow outputs", "compliance audit trail"]),
      fitScore: 38,
      intentScore: 38,
      fitDetails: JSON.stringify({ complexity: 10, ongoing: 10, org_size: 6, dm_access: 8, budget: 4 }),
      intentDetails: JSON.stringify({ active_problem: 14, timeline: 9, pain: 7, sponsor: 4, responsive: 4 }),
      notes: "Launched April 7, 2026 with $1.7M pre-seed led by XYZ VC. CEO Tomas Scavnicky previously built Parrot (legal workflow automation; acquired by FileVine 2025). Angel participation from Amazon, Apple, Palantir, Flexport, Yelp, Midjourney leaders. Selling into legal/finance/insurance — touches three of our pipelines. Serial founder with successful exit = coachable, on a fast GTM clock, needs positioning.",
      source: "Daily Scrape 2026-04-18",
      lastActivity: "Pre-seed launch April 7, 2026",
    },
    contacts: [
      { name: "Tomas Scavnicky", title: "CEO & Co-founder (ex-Parrot; sold to FileVine 2025)", persona: "CEO / Founder", decisionMaker: true },
      { name: "Matej Vetrak", title: "Co-founder (ex-Parrot staff engineer)", persona: "CIO / CTO", decisionMaker: true },
    ],
    scrape: {
      url: "https://www.felix.ai",
      source: "news_pr",
      matchedSignals: JSON.stringify(["launch", "fundraise", "market_entry"]),
    },
  },

  // ─── Fund Formation ────────────────────────────────────────────
  {
    company: {
      name: "Aqualis Partners",
      website: "https://www.aqualispartners.com",
      pipeline: "fund-formation",
      industry: "Private Equity Secondaries (LP-led, GP-led, directs, preferreds)",
      size: "New firm — debut SPV in market $100M–$200M; Fund I targeting $400M–$750M later in 2026",
      location: "Darien, CT",
      fundingStage: "Launched Oct 2025; debut SPV raising now; Fund I H2 2026",
      techStack: JSON.stringify([]),
      fitScore: 46,
      intentScore: 42,
      fitDetails: JSON.stringify({ manager_type: 15, strategy: 10, ops_readiness: 10, jurisdiction: 5, budget: 6 }),
      intentDetails: JSON.stringify({ anchor: 13, launch_window: 10, providers: 8, urgency: 7, referral: 4 }),
      notes: "Founder Cari Lodge is a 25-year secondaries veteran (ex-CF Private Equity Head of Secondaries). Named one of PEN's 'Twenty Most Influential in Secondaries 2025.' New GP + debut SPV now + Fund I later this year = perfect fund-formation ICP with a long runway of legal/fund-structure work ahead (LPA, side letters, GP restructures, deal-by-deal work).",
      source: "Daily Scrape 2026-04-18",
      lastActivity: "Debut SPV raising Q2 2026; Fund I planned H2 2026",
    },
    contacts: [
      { name: "Cari Lodge", title: "Founder & Managing Partner (ex-CF Private Equity Head of Secondaries)", persona: "Founder / CIO / PM", decisionMaker: true },
    ],
    scrape: {
      url: "https://www.aqualispartners.com",
      source: "news_pr",
      matchedSignals: JSON.stringify(["spinout", "debut_fund", "launch_window"]),
    },
  },
  {
    company: {
      name: "Sycamore Tree Capital Partners",
      website: "https://www.sycamorelp.com",
      pipeline: "fund-formation",
      industry: "Private Credit / Credit Secondaries Platform",
      size: "~33 professionals; Dallas HQ + NY office; new platform launching",
      location: "Dallas, TX (+ New York, NY)",
      fundingStage: "Credit secondaries investment platform launched April 13, 2026",
      techStack: JSON.stringify([]),
      fitScore: 41,
      intentScore: 37,
      fitDetails: JSON.stringify({ manager_type: 11, strategy: 10, ops_readiness: 10, jurisdiction: 5, budget: 5 }),
      intentDetails: JSON.stringify({ anchor: 11, launch_window: 9, providers: 8, urgency: 5, referral: 4 }),
      notes: "Founded by Mark Okada (Highland Capital co-founder), Trey Parker, Jack Yang. Announced new credit secondaries investment platform April 13, 2026 led by Robert O'Connor (new partner/PM hire). New strategy inside existing firm = new LPA, new fund docs, new GP entity, new vehicle structures.",
      source: "Daily Scrape 2026-04-18",
      lastActivity: "Credit secondaries platform launched April 13, 2026",
    },
    contacts: [
      { name: "Mark Okada", title: "Co-founder & CEO (ex-Highland Capital co-founder)", persona: "Founder / CIO / PM", decisionMaker: true },
      { name: "Robert O'Connor", title: "Partner & Portfolio Manager, Credit Secondaries (new hire April 2026)", persona: "Founder / CIO / PM", decisionMaker: true },
    ],
    scrape: {
      url: "https://www.sycamorelp.com",
      source: "news_pr",
      matchedSignals: JSON.stringify(["platform_launch", "hire_pm", "new_strategy"]),
    },
  },
  {
    company: {
      name: "5c(c) Capital",
      website: "",
      pipeline: "fund-formation",
      industry: "Venture Capital (Prediction Markets specialist — first fund in the category)",
      size: "Debut fund targeting up to $35M",
      location: "US",
      fundingStage: "Fund I raising, announced March 23, 2026",
      techStack: JSON.stringify([]),
      fitScore: 42,
      intentScore: 38,
      fitDetails: JSON.stringify({ manager_type: 15, strategy: 9, ops_readiness: 7, jurisdiction: 4, budget: 7 }),
      intentDetails: JSON.stringify({ anchor: 13, launch_window: 9, providers: 5, urgency: 7, referral: 4 }),
      notes: "Debut VC fund from two early Kalshi employees (Noah Zingler-Sternig, Adhi Rajaprabhakaran). First prediction-markets-dedicated VC fund (named for CEA §5c(c)). Backers: Shayne Coplan (Polymarket), Tarek Mansour (Kalshi), Marc Andreessen, Micky Malka (Ribbit), Kyle Samani (ex-Multicoin). Operators going GP for the first time = heavy legal need (LPA, fund docs, CFTC/SEC nuances). Website still developing — outreach via LinkedIn/personal networks.",
      source: "Daily Scrape 2026-04-18",
      lastActivity: "Fund I announced March 23, 2026",
    },
    contacts: [
      { name: "Noah Zingler-Sternig", title: "Co-founder & GP (ex-Kalshi Head of Operations)", persona: "Founder / CIO / PM", decisionMaker: true },
      { name: "Adhi Rajaprabhakaran", title: "Co-founder & GP (ex-Kalshi-affiliated market maker trader)", persona: "Founder / CIO / PM", decisionMaker: true },
    ],
    scrape: {
      url: "https://fortune.com/2026/03/23/kalshi-polymarket-5cc-capital-prediction-market-fund-raise/",
      source: "news_pr",
      matchedSignals: JSON.stringify(["debut_fund", "anchor", "operator_turned_gp"]),
    },
  },
];

async function main() {
  let created = 0;
  let skipped = 0;

  for (const lead of LEADS) {
    // Deduplicate by name
    const existing = await prisma.company.findFirst({
      where: { name: lead.company.name },
    });

    if (existing) {
      console.log(`⏭  Skipped (already exists): ${lead.company.name}`);
      skipped++;
      continue;
    }

    // Create company with contacts
    const company = await prisma.company.create({
      data: {
        ...lead.company,
        contacts: {
          create: lead.contacts,
        },
      },
    });

    // Log scrape result
    await prisma.scrapeResult.create({
      data: {
        ...lead.scrape,
        pipeline: lead.company.pipeline,
        resultData: JSON.stringify(lead.company),
        imported: true,
      },
    });

    console.log(`✅ Created: ${company.name} (${company.pipeline}) — Fit: ${company.fitScore}, Intent: ${company.intentScore}`);
    created++;
  }

  console.log(`\n── Done ──`);
  console.log(`Created: ${created}  |  Skipped: ${skipped}  |  Total: ${LEADS.length}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error("❌ Error:", e.message);
    prisma.$disconnect();
    process.exit(1);
  });
