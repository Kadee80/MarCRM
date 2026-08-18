#!/usr/bin/env node
/**
 * Import leads from daily scrape 2026-04-21
 *
 * Usage:  cd MarCRM && node scripts/import-2026-04-21.cjs
 *
 * - Deduplicates by company name (skips if already in DB)
 * - Creates Company + Contact records
 * - Logs a ScrapeResult for each lead
 */

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const LEADS = [
  // ─── AI Consulting ─────────────────────────────────────────────
  {
    company: {
      name: "Wonderful",
      website: "https://www.wonderful.ai",
      pipeline: "ai-consulting",
      industry: "AI Agents / Customer Service Automation / Enterprise AI",
      size: "~300 employees scaling to 900; operates in 30+ countries; serves telecom, finance, healthcare, manufacturing",
      location: "Israel (global)",
      fundingStage: "Series B ($150M, March 12, 2026) at $2B valuation — led by Insight Partners (total raised $284M in 13 months)",
      techStack: JSON.stringify(["multi-model LLMs", "local deployment", "agent orchestration", "multilingual NLP", "enterprise integration"]),
      fitScore: 44,
      intentScore: 45,
      fitDetails: JSON.stringify({ industry: 10, data_maturity: 9, use_case: 9, buyer_access: 7, budget: 9 }),
      intentDetails: JSON.stringify({ signal: 18, timeline: 10, pain: 8, sponsor: 5, responsive: 4 }),
      notes: "$150M Series B at $2B valuation on March 12, 2026 — only 4 months after $100M Series A. Tripling headcount from 300 to 900 to scale local deployment teams in 30+ countries. Classic enterprise AI consulting ICP: serves telecom, finance, healthcare, manufacturing. Insight Partners-led signals enterprise software sales DNA. Primary angle: partner on enterprise AI-agent deployments and localization for US market entry. Secondary: pr-marketing amplification of the hypergrowth narrative.",
      source: "Daily Scrape 2026-04-21",
      lastActivity: "Series B announced March 12, 2026",
    },
    contacts: [
      { name: "Arpit Mehta", title: "CEO & Co-founder", persona: "CEO / Founder", decisionMaker: true },
    ],
    scrape: {
      url: "https://www.wonderful.ai",
      source: "news_pr",
      matchedSignals: JSON.stringify(["fundraise", "hiring_ai", "enterprise_expansion"]),
    },
  },
  {
    company: {
      name: "Solidroad",
      website: "https://www.solidroad.com",
      pipeline: "ai-consulting",
      industry: "AI Quality Assurance / Customer Support Coaching / Contact Center Enablement",
      size: "~20 employees (Dublin + SF); customers include Ryanair, Crypto.com, Oura, PartnerHero, Tech Mahindra",
      location: "Dublin, Ireland / San Francisco, CA",
      fundingStage: "Series A ($25M, April 16, 2026) — led by Hedosophia with First Round Capital, Y Combinator, Sony Innovation Fund (total raised $31.5M)",
      techStack: JSON.stringify(["AI-native QA", "100% interaction coverage", "agent coaching/training loop", "LLM evaluation"]),
      fitScore: 40,
      intentScore: 42,
      fitDetails: JSON.stringify({ industry: 9, data_maturity: 8, use_case: 9, buyer_access: 7, budget: 7 }),
      intentDetails: JSON.stringify({ signal: 16, timeline: 9, pain: 8, sponsor: 5, responsive: 4 }),
      notes: "$25M Series A led by Hedosophia on April 16, 2026. YC alum, founders are ex-Intercom (Mark Hughes, Patrick Finlay). AI-native QA covering 100% of CS interactions + coaches agents. Credible customer list (Ryanair, Crypto.com, Oura). Small team (20) means they need external go-to-market and deployment partners. Perfect AI-consulting channel — deploys alongside Intercom/Zendesk AI agents where enterprises need QA/compliance.",
      source: "Daily Scrape 2026-04-21",
      lastActivity: "Series A announced April 16, 2026",
    },
    contacts: [
      { name: "Mark Hughes", title: "CEO & Co-founder (ex-Intercom)", persona: "CEO / Founder", decisionMaker: true },
      { name: "Patrick Finlay", title: "Co-founder (ex-Intercom)", persona: "CEO / Founder", decisionMaker: true },
    ],
    scrape: {
      url: "https://www.solidroad.com",
      source: "news_pr",
      matchedSignals: JSON.stringify(["fundraise", "hiring_ai", "enterprise_ga"]),
    },
  },
  {
    company: {
      name: "Parasail",
      website: "https://www.parasail.io",
      pipeline: "ai-consulting",
      industry: "AI Infrastructure / Inference Cloud / GPU Supercloud",
      size: "Growth stage; 500B+ tokens/day; 30% MoM revenue growth; customers include Elicit, mem0, Gravity, Kotoba, Venice",
      location: "United States",
      fundingStage: "Series A ($32M, April 15, 2026) — co-led by Touring Capital and Kindred Ventures, with Samsung NEXT, Flume, Banyan (total raised $42M)",
      techStack: JSON.stringify(["pay-per-token inference", "global GPU fabric", "multi-model routing", "endpoint optimization"]),
      fitScore: 38,
      intentScore: 40,
      fitDetails: JSON.stringify({ industry: 9, data_maturity: 9, use_case: 7, buyer_access: 6, budget: 7 }),
      intentDetails: JSON.stringify({ signal: 15, timeline: 9, pain: 7, sponsor: 5, responsive: 4 }),
      notes: "$32M Series A on April 15, 2026 co-led by Touring Capital + Kindred. AI Supercloud for deploying AI agents — pay-per-token with no long-term contracts. 500B tokens/day, 30% MoM revenue growth since April 2025 launch. Touring Capital overlap with Checkbox (Jan 2026) is notable — institutional signal alignment. Potential channel partner for AI-consulting more than a direct client. Secondary: post-raise PR amplification of 'tokenmaxxing' narrative.",
      source: "Daily Scrape 2026-04-21",
      lastActivity: "Series A announced April 15, 2026",
    },
    contacts: [
      { name: "Mike Henry", title: "CEO & Co-founder", persona: "CEO / Founder", decisionMaker: true },
    ],
    scrape: {
      url: "https://www.parasail.io",
      source: "news_pr",
      matchedSignals: JSON.stringify(["fundraise", "enterprise_gtm", "infra_launch"]),
    },
  },

  // ─── PR & Marketing ────────────────────────────────────────────
  {
    company: {
      name: "Joyful Health",
      website: "https://www.joyful.health",
      pipeline: "pr-marketing",
      industry: "HealthTech / AI Revenue Cycle Management / Financial Operations for Providers",
      size: "Growth stage; $1.4B+ processed; 95%+ recovery rate",
      location: "United States",
      fundingStage: "Series A ($17M, April 16, 2026) — led by CRV with XYZ VC, Designer Fund, Inflect Capital (Vituity), Go Global (total raised $22M)",
      techStack: JSON.stringify(["AI denial intelligence", "claim investigation", "automated recovery workflows", "revenue cycle AI"]),
      fitScore: 41,
      intentScore: 40,
      fitDetails: JSON.stringify({ industry: 9, stage: 9, buyer: 9, proof: 8, budget: 6 }),
      intentDetails: JSON.stringify({ trigger: 14, timeline: 9, dm_engaged: 7, urgency: 6, responsive: 4 }),
      notes: "$17M Series A led by CRV on April 16, 2026. AI-powered financial infrastructure for healthcare providers targeting $125B in lost healthcare revenue. CEO Eliana Berger + CTO Warren Green. 95%+ recovery rate and $1.4B+ processed is a strong, quantifiable PR story. Vituity (largest physician-owned partnership in US) backed via Inflect. Post-raise PR amplification: healthcare + fintech + AI triple-narrative fit.",
      source: "Daily Scrape 2026-04-21",
      lastActivity: "Series A announced April 16, 2026",
    },
    contacts: [
      { name: "Eliana Berger", title: "CEO", persona: "CEO / Founder", decisionMaker: true },
      { name: "Warren Green", title: "CTO", persona: "CIO / CTO", decisionMaker: false },
    ],
    scrape: {
      url: "https://www.joyful.health",
      source: "news_pr",
      matchedSignals: JSON.stringify(["fundraise", "launch", "pr_trigger"]),
    },
  },
  {
    company: {
      name: "ScreenPoint Medical",
      website: "https://screenpoint-medical.com",
      pipeline: "pr-marketing",
      industry: "MedTech / AI Breast Cancer Detection / Diagnostic Imaging",
      size: "Deployed in 30+ countries; 12M+ mammograms processed; long-term Siemens Healthineers partnership",
      location: "Nijmegen, Netherlands",
      fundingStage: "Growth round ($16M, April 17, 2026) — $14M from Insight Partners + Siemens Healthineers, $2M non-dilutive grants (total raised $49M)",
      techStack: JSON.stringify(["Transpara Breast AI", "deep learning imaging", "mammography workflow integration"]),
      fitScore: 38,
      intentScore: 38,
      fitDetails: JSON.stringify({ industry: 8, stage: 8, buyer: 8, proof: 9, budget: 5 }),
      intentDetails: JSON.stringify({ trigger: 13, timeline: 8, dm_engaged: 6, urgency: 6, responsive: 5 }),
      notes: "$16M round on April 17, 2026 from Insight Partners + Siemens Healthineers. Coincident with Lancet-published MASAI RCT showing 12% reduction in interval cancers via Transpara. Rare combination: fresh capital + fresh peer-reviewed clinical evidence = premium PR-amplification window. US market expansion is a named use-of-funds priority. European firm needing US-focused PR + media training on the clinical data story.",
      source: "Daily Scrape 2026-04-21",
      lastActivity: "Growth round announced April 17, 2026",
    },
    contacts: [
      { name: "Pieter Kroese", title: "CEO", persona: "CEO / Founder", decisionMaker: true },
    ],
    scrape: {
      url: "https://screenpoint-medical.com",
      source: "news_pr",
      matchedSignals: JSON.stringify(["fundraise", "clinical_milestone", "us_expansion"]),
    },
  },

  // ─── Media / Podcast ───────────────────────────────────────────
  {
    company: {
      name: "Nas.com",
      website: "https://www.nas.com",
      pipeline: "media",
      industry: "Creator Economy / AI Tools for Solopreneurs / Community & Courses Platform",
      size: "3.5M+ members in 150+ countries; 350K+ businesses hosted; 20K paying monthly; $1M→$8M ARR in 2025 (5x growth)",
      location: "Global (founder based in Singapore/US)",
      fundingStage: "Series A ($27M, April 16, 2026) — led by Khosla Ventures with 500 Global and angels (Shuo Wang, Stanley Tang, Scott Adelson, Tim Ferriss)",
      techStack: JSON.stringify(["AI creator tools", "community platform", "course hosting", "AI onboarding"]),
      fitScore: 40,
      intentScore: 40,
      fitDetails: JSON.stringify({ industry: 8, complexity: 8, credibility: 9, distribution: 10, budget: 5 }),
      intentDetails: JSON.stringify({ signal: 16, timeline: 9, exec: 9, responsive: 3, goal: 3 }),
      notes: "$27M Series A led by Khosla Ventures on April 16, 2026. Founded by Nuseir Yassin (Nas Daily: 70M followers, 30B video views, 64 countries). 5x revenue growth in 2025 ($1M→$8M ARR). Archetype media target: public-facing founder with massive organic distribution + fresh institutional capital + B2C-to-solopreneur narrative. Angles: branded podcast partnership for solopreneur audience, interview-format media where Nas is the draw, cross-promo with FINTECH.TV-style pay-to-play media. Less traditional PR client, more credibility-and-distribution partnership.",
      source: "Daily Scrape 2026-04-21",
      lastActivity: "Series A announced April 16, 2026",
    },
    contacts: [
      { name: "Nuseir Yassin", title: "Founder & CEO (creator of Nas Daily)", persona: "CEO / Founder", decisionMaker: true },
    ],
    scrape: {
      url: "https://www.nas.com",
      source: "news_pr",
      matchedSignals: JSON.stringify(["fundraise", "founder_visibility", "creator_economy"]),
    },
  },

  // ─── Fund Formation ────────────────────────────────────────────
  {
    company: {
      name: "Shiprock Capital Management",
      website: "https://www.shiprockcm.com",
      pipeline: "fund-formation",
      industry: "Hedge Fund / Distressed Credit / Emerging Markets Debt",
      size: "Boutique emerging manager; existing Global Distressed & Special Situations fund launched Jan 2023",
      location: "London, UK",
      fundingStage: "New debt-focused hedge fund planning 2026 launch — existing fund track record +32.4% (2023) / +34.5% (2024) / +6% YTD Nov 2025",
      techStack: JSON.stringify([]),
      fitScore: 40,
      intentScore: 38,
      fitDetails: JSON.stringify({ manager_type: 14, strategy: 9, ops_readiness: 8, jurisdiction: 4, budget: 5 }),
      intentDetails: JSON.stringify({ anchor: 13, launch_window: 9, providers: 5, urgency: 7, referral: 4 }),
      notes: "Emerging London hedge fund (launched 2023) readying new debt-focused strategy with new senior hire: Alex Williamson, ex-head of EM debt at Deutsche Bank. Strong existing track record de-risks the new-strategy raise. Archetype fund-formation target: emerging manager launching separate vehicle with new PM, needs LPA + fund docs + compliance + possibly new offshore vehicle for EM-focused strategy. Hired CRO Cura in January 2026 from Converium — team building actively. Channel: warm intro via prime broker or admin ideal; London alt market is referral-heavy.",
      source: "Daily Scrape 2026-04-21",
      lastActivity: "New strategy / new PM hire announced December 2025 – January 2026",
    },
    contacts: [
      { name: "Alex Williamson", title: "Head of Debt / PM — New Strategy (ex-Deutsche Bank EM debt head)", persona: "Founder / CIO / PM", decisionMaker: true },
    ],
    scrape: {
      url: "https://www.hedgeweek.com/shiprock-plans-new-hedge-fund-launch-as-it-hires-ex-deutsche-bank-debt-trader/",
      source: "news_pr",
      matchedSignals: JSON.stringify(["new_strategy_launch", "senior_hire", "emerging_manager"]),
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

    console.log(`Created: ${company.name} (${company.pipeline}) - Fit: ${company.fitScore}, Intent: ${company.intentScore}`);
    created++;
  }

  console.log(`\n-- Done --`);
  console.log(`Created: ${created}  |  Skipped: ${skipped}  |  Total: ${LEADS.length}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error("Error:", e.message);
    prisma.$disconnect();
    process.exit(1);
  });
