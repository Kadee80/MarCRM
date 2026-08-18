#!/usr/bin/env node
/**
 * Import leads from daily scrape 2026-04-24
 *
 * Usage:  cd MarCRM && node scripts/import-2026-04-24.cjs
 *
 * - Deduplicates by company name (skips if already in DB)
 * - Creates Company + Contact records
 * - Logs a ScrapeResult for each lead
 */

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const LEADS = [
  // ─── PR & Marketing ────────────────────────────────────────────
  {
    company: {
      name: "Orkes",
      website: "https://orkes.io",
      pipeline: "pr-marketing",
      industry: "Agentic AI / Workflow Orchestration / Enterprise Developer Platform",
      size: "Series B; tripled customer base since 2024 A; hundreds of thousands of developers in community",
      location: "Cupertino, CA / global",
      fundingStage: "Series B ($60M, April 23, 2026) — led by AVP, with new investor Prosperity7 Ventures, plus existing Nexus Venture Partners, Battery Ventures, Vertex Ventures US. Total raised ~$90M.",
      techStack: JSON.stringify(["agentic orchestration", "durable workflows", "Netflix Conductor lineage", "microservices orchestration", "human-in-the-loop", "API orchestration"]),
      fitScore: 45,
      intentScore: 40,
      fitDetails: JSON.stringify({ industry: 10, stage: 8, buyer: 9, proof: 10, budget: 8 }),
      intentDetails: JSON.stringify({ trigger: 14, timeline: 9, dm_engaged: 7, urgency: 6, responsive: 4 }),
      notes: "$60M Series B led by AVP on April 23, 2026. Built by original architects of Netflix's Conductor orchestration. Enterprise customer roster is the story: LinkedIn, Twilio, Quest Diagnostics, United Wholesale Mortgage, Naveo Commerce, Woodside Energy. Capital earmarked for agentic AI GTM. Primary angle: pr-marketing — AI-orchestration category narrative is contested (Temporal, LangGraph, Airflow, n8n) and Orkes has the strongest 'serious enterprise' proof. Secondary: media-podcast interview series for founder-led category-building. Skip ai-consulting — they ARE the vendor.",
      source: "Daily Scrape 2026-04-24",
      lastActivity: "Series B announced April 23, 2026",
    },
    contacts: [
      { name: "Orkes Leadership Team", title: "CEO / Founders (ex-Netflix Conductor architects)", persona: "CEO / Founder", decisionMaker: true },
    ],
    scrape: {
      url: "https://orkes.io",
      source: "news_pr",
      matchedSignals: JSON.stringify(["fundraise", "category_building", "enterprise_gtm", "agentic_launch"]),
    },
  },

  // ─── Media ─────────────────────────────────────────────────────
  {
    company: {
      name: "Rebel Audio",
      website: "https://www.rebelaudio.ai",
      pipeline: "media",
      industry: "AI Podcast Production / Creator Platform / Audio Media",
      size: "Early-stage; public launch May 30, 2026; oversubscribed seed in 30 days",
      location: "Tennessee, US",
      fundingStage: "Seed ($3.8M, oversubscribed) — investors include Julie Gauthier, Benjamin Lurie, Jonathan Schulman, Dr. Armin Tehrany, Dr. Richard Firshein, Launch Tennessee. Advisor: Mark Burnett.",
      techStack: JSON.stringify(["AI voice cloning", "AI translation", "host-read ad generation", "social podcasting", "integrated video hosting"]),
      fitScore: 40,
      intentScore: 44,
      fitDetails: JSON.stringify({ industry: 10, complexity: 8, credibility: 8, distribution: 8, budget: 6 }),
      intentDetails: JSON.stringify({ signal: 18, timeline: 9, exec: 9, responsive: 4, goal: 4 }),
      notes: "Stealth exit with $3.8M oversubscribed seed. Founder Jared Gutstadt is a 2x Emmy nominee with celebrity producer catalog (Dylan, Lil Wayne, The Weeknd, Jelly Roll). Mark Burnett onboard as first adviser — massive press hook. Public launch May 30, 2026 is the urgent trigger (36 days from scrape). Primary angle: media pipeline — credibility-sensitive consumer launch needing PR amplification for May 30. Secondary: pr-marketing for AI-ethics / opt-in-consent frame (differentiator vs. deepfake panic).",
      source: "Daily Scrape 2026-04-24",
      lastActivity: "Stealth exit; public launch May 30, 2026",
    },
    contacts: [
      { name: "Jared Gutstadt", title: "Founder & CEO (2x Emmy nominee)", persona: "CEO / Founder", decisionMaker: true },
      { name: "Mark Burnett", title: "Adviser", persona: "Advisor / Influencer", decisionMaker: false },
    ],
    scrape: {
      url: "https://www.rebelaudio.ai",
      source: "news_pr",
      matchedSignals: JSON.stringify(["stealth_exit", "celebrity_advisor", "launch_window", "creator_tooling"]),
    },
  },
  {
    company: {
      name: "Shade",
      website: "https://shade.inc",
      pipeline: "media",
      industry: "AI Media Asset Management / Enterprise Creative Cloud / Video Search",
      size: "Growth-stage; $300k MRR at funding; enterprise creative teams as customers",
      location: "San Francisco, CA",
      fundingStage: "Series A extension ($14M, April 23, 2026) — led by Khosla Ventures, Construct Capital, Bling Capital; plus existing General Catalyst, SignalFire, Contrary. Total raised $20M.",
      techStack: JSON.stringify(["natural-language video search", "AI scene detection", "intelligent cloud NAS", "media asset management", "embeddings search"]),
      fitScore: 41,
      intentScore: 42,
      fitDetails: JSON.stringify({ industry: 8, complexity: 9, credibility: 8, distribution: 8, budget: 8 }),
      intentDetails: JSON.stringify({ signal: 18, timeline: 8, exec: 8, responsive: 4, goal: 4 }),
      notes: "$14M Series A extension on April 23, 2026 led by Khosla + Construct + Bling. 'AI-powered cloud NAS' for creative teams — natural language search surfaces specific video moments with timestamps. $300k MRR is strong enterprise GTM proof. Primary angle: media — credibility-sensitive enterprise buyer (head of post-production, creative ops). Secondary: pr-marketing for 'media asset management is the next MLOps' narrative. Founders Fan + Dove are public-facing.",
      source: "Daily Scrape 2026-04-24",
      lastActivity: "Series A extension April 23, 2026",
    },
    contacts: [
      { name: "Brandon Fan", title: "CEO & Co-founder", persona: "CEO / Founder", decisionMaker: true },
      { name: "Emerson Dove", title: "CTO & Co-founder", persona: "CIO / CTO", decisionMaker: false },
    ],
    scrape: {
      url: "https://shade.inc",
      source: "news_pr",
      matchedSignals: JSON.stringify(["fundraise", "enterprise_gtm", "media_ai", "creative_tooling"]),
    },
  },

  // ─── AI Consulting ─────────────────────────────────────────────
  {
    company: {
      name: "Aaru",
      website: "https://www.aaru.com",
      pipeline: "ai-consulting",
      industry: "AI Synthetic Research / Simulated Agents / Consumer & Political Prediction",
      size: "Growth-stage; $88M total equity; enterprise customers include Accenture, EY, Interpublic Group",
      location: "United States",
      fundingStage: "Series A ($80M, April 23, 2026) — led by Redpoint Ventures at $1B headline valuation (multi-tier blended lower). Total raised $88M.",
      techStack: JSON.stringify(["simulated AI agents", "synthetic research", "consumer behavior prediction", "polling models", "agent-based simulation"]),
      fitScore: 42,
      intentScore: 39,
      fitDetails: JSON.stringify({ industry: 9, data_maturity: 9, use_case: 9, buyer_access: 7, budget: 8 }),
      intentDetails: JSON.stringify({ signal: 18, timeline: 8, pain: 6, sponsor: 4, responsive: 3 }),
      notes: "$80M Series A led by Redpoint on April 23, 2026 at $1B headline. AI synthetic-research platform — generates thousands of simulated agents from public + proprietary data. Correctly predicted NY Democratic primary. Enterprise partners already include Accenture, EY, Interpublic Group, political campaigns. Primary: ai-consulting — consulting firms are already buyers but need internal AI-strategy help on methodology, governance, audit to productize for client engagements. Buyer = Chief Research Officer, Chief Analytics Officer at brand-side. Secondary: pr-marketing on $1B synthetic-research milestone.",
      source: "Daily Scrape 2026-04-24",
      lastActivity: "Series A announced April 23, 2026",
    },
    contacts: [
      { name: "Aaru Founders", title: "CEO / Leadership (see aaru.com/team)", persona: "CEO / Founder", decisionMaker: true },
    ],
    scrape: {
      url: "https://www.aaru.com",
      source: "news_pr",
      matchedSignals: JSON.stringify(["fundraise", "unicorn_valuation", "consulting_partners", "enterprise_gtm"]),
    },
  },
  {
    company: {
      name: "Spectrum Security",
      website: "https://www.spectrum.security",
      pipeline: "ai-consulting",
      industry: "Cybersecurity / AI Detection Engineering / SIEM-EDR Automation",
      size: "Early-growth; live enterprise customers; stealth exit April 22, 2026",
      location: "United States",
      fundingStage: "Seed ($19M, April 22, 2026) — led by TechOperators, with WhiteRabbit Ventures, Skinos Ventures (new Shlomo Kramer + Yishay Yovel fund), Alumni Ventures, plus cybersecurity operator angels.",
      techStack: JSON.stringify(["AI detection authoring", "SIEM automation", "EDR automation", "data lake integration", "coverage health monitoring"]),
      fitScore: 41,
      intentScore: 41,
      fitDetails: JSON.stringify({ industry: 8, data_maturity: 9, use_case: 9, buyer_access: 7, budget: 8 }),
      intentDetails: JSON.stringify({ signal: 18, timeline: 9, pain: 7, sponsor: 4, responsive: 3 }),
      notes: "$19M seed led by TechOperators on April 22, 2026. Automates full detection lifecycle across SIEMs/data lakes/EDRs. Reported customer outcome: 121 days → under 30 min for detection authoring (99% reduction), 90% engineering-hours cut. Primary: ai-consulting — CISO buyer for AI-detection engineering deployments at mid-market+ FS/regulated enterprises who need governance + audit layer. Pair with Copperhelm as cybersec-AI cohort. Skinos Ventures involvement (Shlomo Kramer-backed) = strong Israeli security operator network + CISO access.",
      source: "Daily Scrape 2026-04-24",
      lastActivity: "Stealth exit + seed April 22, 2026",
    },
    contacts: [
      { name: "Spectrum Security Founders", title: "CEO / Leadership", persona: "CEO / Founder", decisionMaker: true },
    ],
    scrape: {
      url: "https://www.spectrum.security",
      source: "news_pr",
      matchedSignals: JSON.stringify(["stealth_exit", "fundraise", "detection_engineering", "ciso_buyer"]),
    },
  },
  {
    company: {
      name: "Copperhelm",
      website: "https://copperhelm.com",
      pipeline: "ai-consulting",
      industry: "Cybersecurity / Agentic Cloud Security / Cloud Risk Remediation",
      size: "Early-growth; Fortune 500 paying customer at launch; stealth exit April 23, 2026",
      location: "Israel / United States",
      fundingStage: "Seed ($7M, April 23, 2026) — led by TLV Partners, with toDay Ventures, ICON, SaaS Ventures Israel.",
      techStack: JSON.stringify(["agentic cloud security", "Context Lake", "AI investigation agents", "automated remediation", "cloud posture"]),
      fitScore: 39,
      intentScore: 39,
      fitDetails: JSON.stringify({ industry: 8, data_maturity: 9, use_case: 9, buyer_access: 7, budget: 6 }),
      intentDetails: JSON.stringify({ signal: 17, timeline: 8, pain: 7, sponsor: 4, responsive: 3 }),
      notes: "$7M seed April 23, 2026 led by TLV Partners. Founders Shimon Tolts (CEO, AWS Hero, ex-JFrog/Datree), Eyar Zilberman (CISO, GitHub Star), Roman Labunsky; team from Unity/McAfee/RSA. 'Context Lake' = real-time decision layer for cloud security; AI agents investigate + remediate. Reported outcome: one Fortune 500 customer took 6M raw findings → few hundred evidence-backed validated risks. Primary: ai-consulting — CISO/Head of Cloud Security buyer for agentic-remediation rollouts. Pair with Spectrum Security.",
      source: "Daily Scrape 2026-04-24",
      lastActivity: "Stealth exit + seed April 23, 2026",
    },
    contacts: [
      { name: "Shimon Tolts", title: "CEO & Co-founder (AWS Hero, ex-JFrog)", persona: "CEO / Founder", decisionMaker: true },
      { name: "Eyar Zilberman", title: "CISO & Co-founder (GitHub Star)", persona: "CISO / Security", decisionMaker: false },
      { name: "Roman Labunsky", title: "Co-founder", persona: "Founder", decisionMaker: false },
    ],
    scrape: {
      url: "https://copperhelm.com",
      source: "news_pr",
      matchedSignals: JSON.stringify(["stealth_exit", "fundraise", "agentic_security", "ciso_buyer"]),
    },
  },
];

async function main() {
  let created = 0;
  let skipped = 0;

  for (const lead of LEADS) {
    const existing = await prisma.company.findFirst({
      where: { name: lead.company.name },
    });

    if (existing) {
      console.log(`Skipped (already exists): ${lead.company.name}`);
      skipped++;
      continue;
    }

    const company = await prisma.company.create({
      data: {
        ...lead.company,
        contacts: {
          create: lead.contacts,
        },
      },
    });

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
