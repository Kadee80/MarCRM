#!/usr/bin/env node
/**
 * Import leads from daily scrape 2026-04-16
 *
 * Usage:  cd MarCRM && node scripts/import-2026-04-16.js
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
      name: "Spektr",
      website: "https://spektr.com",
      pipeline: "pr-marketing",
      industry: "Fintech / Compliance / RegTech",
      size: "~45 employees",
      location: "Copenhagen, Denmark",
      fundingStage: "Series A ($20M, April 2026)",
      techStack: JSON.stringify(["AI agents", "compliance automation"]),
      fitScore: 38,
      intentScore: 42,
      fitDetails: JSON.stringify({ industry: 9, stage: 8, buyer: 7, proof: 8, budget: 6 }),
      intentDetails: JSON.stringify({ trigger: 14, timeline: 8, dm_engaged: 8, urgency: 7, responsive: 5 }),
      notes: "Post-Series A, expanding globally. Founders previously exited HelloFlow to Trulioo for $50M+. Clients include Pleo, Santander Leasing, Mercuryo. Strong post-raise PR need.",
      source: "Daily Scrape 2026-04-16",
      lastActivity: "Series A announced April 2026",
    },
    contacts: [
      { name: "Mikkel Skarnager", title: "CEO & Co-founder", persona: "CEO / Founder", decisionMaker: true },
      { name: "Jan-Erik Wagner", title: "Co-founder", persona: "CEO / Founder", decisionMaker: false },
      { name: "Jeremy Joly", title: "Co-founder", persona: "CEO / Founder", decisionMaker: false },
      { name: "Ciprian Florescu", title: "Co-founder", persona: "CEO / Founder", decisionMaker: false },
    ],
    scrape: {
      url: "https://spektr.com",
      source: "news_pr",
      matchedSignals: JSON.stringify(["fundraise", "market_entry", "launch"]),
    },
  },
  {
    company: {
      name: "Complyance",
      website: "https://complyance.com",
      pipeline: "pr-marketing",
      industry: "GRC / Compliance / Enterprise SaaS",
      size: "Growth stage",
      location: "US",
      fundingStage: "Series A ($20M, February 2026)",
      techStack: JSON.stringify(["Agentic AI", "GRC automation"]),
      fitScore: 36,
      intentScore: 38,
      fitDetails: JSON.stringify({ industry: 8, stage: 7, buyer: 7, proof: 8, budget: 6 }),
      intentDetails: JSON.stringify({ trigger: 12, timeline: 8, dm_engaged: 7, urgency: 7, responsive: 4 }),
      notes: "GV-backed. Enterprise clients include CVS Health, Dropbox, MLB. Planning 30+ new AI agents in 2026 — major product launch cadence = PR opportunity.",
      source: "Daily Scrape 2026-04-16",
      lastActivity: "Series A announced February 2026",
    },
    contacts: [
      { name: "Richa Kaul", title: "Founder & CEO", persona: "CEO / Founder", decisionMaker: true },
    ],
    scrape: {
      url: "https://complyance.com",
      source: "news_pr",
      matchedSignals: JSON.stringify(["fundraise", "launch", "pipeline_stall"]),
    },
  },
  {
    company: {
      name: "FINTECH.TV",
      website: "https://fintech.tv",
      pipeline: "pr-marketing",
      industry: "Media / Financial Broadcasting",
      size: "Small-mid",
      location: "New York, NY (NYSE HQ)",
      fundingStage: "Growth",
      techStack: JSON.stringify(["streaming", "podcast network"]),
      fitScore: 28,
      intentScore: 30,
      fitDetails: JSON.stringify({ industry: 7, stage: 5, buyer: 5, proof: 6, budget: 5 }),
      intentDetails: JSON.stringify({ trigger: 10, timeline: 6, dm_engaged: 5, urgency: 5, responsive: 4 }),
      notes: "Launched podcast network April 15, 2026. Expanding into 24/7 streaming. 1.5M monthly viewers. Growing fintech media platform needs PR amplification.",
      source: "Daily Scrape 2026-04-16",
      lastActivity: "Podcast network launched April 15, 2026",
    },
    contacts: [
      { name: "Vincent Molinari", title: "Founder & CEO", persona: "CEO / Founder", decisionMaker: true },
      { name: "Troy McGuire", title: "Co-Founder & Head of Global Content & Operations", persona: "Head of Comms / PR", decisionMaker: true },
    ],
    scrape: {
      url: "https://fintech.tv",
      source: "news_pr",
      matchedSignals: JSON.stringify(["launch", "market_entry"]),
    },
  },

  // ─── Fund Formation ────────────────────────────────────────────
  {
    company: {
      name: "Sigla Capital",
      website: "",
      pipeline: "fund-formation",
      industry: "Private Equity",
      size: "Emerging manager",
      location: "London & Stockholm",
      fundingStage: "Fund I (targeting €200M close, 2026)",
      techStack: JSON.stringify([]),
      fitScore: 38,
      intentScore: 33,
      fitDetails: JSON.stringify({ manager_type: 14, strategy: 8, ops_readiness: 7, jurisdiction: 4, budget: 5 }),
      intentDetails: JSON.stringify({ anchor: 10, launch_window: 8, providers: 6, urgency: 6, referral: 3 }),
      notes: "Debut PE fund. Founded by ex-Five Arrows duo (Phil Lesjak, Karl Geisel) + ex-DIA Management head. Expecting to close Fund I at €200M target in 2026.",
      source: "Daily Scrape 2026-04-16",
      lastActivity: "Fund I close expected 2026",
    },
    contacts: [
      { name: "Phil Lesjak", title: "Co-founder (ex-Five Arrows)", persona: "Founder / CIO / PM", decisionMaker: true },
      { name: "Karl Geisel", title: "Co-founder (ex-Five Arrows)", persona: "Founder / CIO / PM", decisionMaker: true },
      { name: "Christian Harnischfeger", title: "Co-founder (ex-DIA Management)", persona: "COO / Head of Ops", decisionMaker: true },
    ],
    scrape: {
      url: "https://www.withintelligence.com/insights/private-equity-emerging-managers-to-watch-in-2026/",
      source: "news_pr",
      matchedSignals: JSON.stringify(["spinout", "track_record"]),
    },
  },
  {
    company: {
      name: "Awani Capital Management",
      website: "",
      pipeline: "fund-formation",
      industry: "Private Equity (middle market)",
      size: "Emerging manager",
      location: "New York, NY",
      fundingStage: "Fund I (targeting $500M, ~$250M at first close)",
      techStack: JSON.stringify([]),
      fitScore: 35,
      intentScore: 30,
      fitDetails: JSON.stringify({ manager_type: 12, strategy: 8, ops_readiness: 7, jurisdiction: 3, budget: 5 }),
      intentDetails: JSON.stringify({ anchor: 10, launch_window: 7, providers: 5, urgency: 5, referral: 3 }),
      notes: "Founded by Daphne Dufresne after departing $1.8B PE firm. Debut fund targeting $500M, passed halfway (~$250M raised by summer 2025 first close). Large target = complex fund docs.",
      source: "Daily Scrape 2026-04-16",
      lastActivity: "Active fundraise, first close ~$250M",
    },
    contacts: [
      { name: "Daphne Dufresne", title: "Founder", persona: "Founder / CIO / PM", decisionMaker: true },
    ],
    scrape: {
      url: "https://www.withintelligence.com/insights/private-equity-emerging-managers-to-watch-in-2026/",
      source: "news_pr",
      matchedSignals: JSON.stringify(["spinout", "anchor"]),
    },
  },

  // ─── Legal Consulting ──────────────────────────────────────────
  {
    company: {
      name: "Eudia",
      website: "https://eudia.com",
      pipeline: "legal-consulting",
      industry: "LegalTech / AI / Enterprise Legal Ops",
      size: "Growth stage",
      location: "US",
      fundingStage: "Series A ($105M, General Catalyst)",
      techStack: JSON.stringify(["AI", "NLP", "contract management"]),
      fitScore: 40,
      intentScore: 32,
      fitDetails: JSON.stringify({ complexity: 14, ongoing: 12, org_size: 7, dm_access: 4, budget: 3 }),
      intentDetails: JSON.stringify({ active_problem: 12, timeline: 6, volume: 6, pressure: 4, responsive: 4 }),
      notes: "Massive Series A ($30M upfront + $75M for acquisitions). M&A strategy = need legal consulting for acquisition structuring. CEO Omar Haroun ex-Relativity/Text IQ. COO has PE background.",
      source: "Daily Scrape 2026-04-16",
      lastActivity: "Series A announced, M&A pipeline active",
    },
    contacts: [
      { name: "Omar Haroun", title: "CEO (ex-Relativity, founded Text IQ)", persona: "Founder / CEO", decisionMaker: true },
      { name: "Ashish Agrawal", title: "CTO (ex-Amazon, Apple, Google)", persona: "CIO / CTO", decisionMaker: false },
      { name: "David Van Reyk", title: "COO (ex-CVC Capital Partners)", persona: "COO / Head of Ops", decisionMaker: true },
    ],
    scrape: {
      url: "https://eudia.com",
      source: "news_pr",
      matchedSignals: JSON.stringify(["growth", "institutional", "new_product"]),
    },
  },
  {
    company: {
      name: "Lawhive",
      website: "https://lawhive.co.uk",
      pipeline: "legal-consulting",
      industry: "LegalTech / Consumer Legal Services",
      size: "Growth stage",
      location: "London, UK (expanding to US)",
      fundingStage: "Series B (€50M, February 2026)",
      techStack: JSON.stringify(["AI", "Lawrence AI lawyer", "workflow automation"]),
      fitScore: 30,
      intentScore: 28,
      fitDetails: JSON.stringify({ complexity: 10, ongoing: 10, org_size: 5, dm_access: 3, budget: 2 }),
      intentDetails: JSON.stringify({ active_problem: 10, timeline: 6, volume: 5, pressure: 4, responsive: 3 }),
      notes: "Aggressively entering US market with €50M Series B. AI-native legal platform with 'Lawrence' AI lawyer. Will need US legal consulting for regulatory compliance, state licensing, corporate structure.",
      source: "Daily Scrape 2026-04-16",
      lastActivity: "Series B announced February 2026, US expansion",
    },
    contacts: [
      { name: "Pierre Proner", title: "CEO & Co-founder", persona: "Founder / CEO", decisionMaker: true },
      { name: "Jaime Van Oers", title: "CTO & Co-founder", persona: "CIO / CTO", decisionMaker: false },
      { name: "Flinn Dolman", title: "Co-founder", persona: "Founder / CEO", decisionMaker: false },
    ],
    scrape: {
      url: "https://lawhive.co.uk",
      source: "news_pr",
      matchedSignals: JSON.stringify(["growth", "new_product", "institutional"]),
    },
  },

  // ─── Coaching & Ops ────────────────────────────────────────────
  {
    company: {
      name: "Littlefish",
      website: "https://littlefish.co",
      pipeline: "coaching-ops",
      industry: "Fintech / Banking Infrastructure",
      size: "Small, scaling fast",
      location: "Johannesburg, South Africa",
      fundingStage: "Series A ($9.5M, March 2026)",
      techStack: JSON.stringify(["merchant OS", "banking integration"]),
      fitScore: 28,
      intentScore: 25,
      fitDetails: JSON.stringify({ revenue: 10, niche: 7, margin: 5, dm_access: 4, coachable: 2 }),
      intentDetails: JSON.stringify({ trigger: 10, timeline: 5, pain: 4, responsive: 3, budget: 3 }),
      notes: "30x MRR growth since seed. Expanding across Africa with tier 1 bank clients (Standard Bank, FNB, Absa). Likely needs operational structure and go-to-market coaching for multi-market expansion.",
      source: "Daily Scrape 2026-04-16",
      lastActivity: "Series A closed March 2026",
    },
    contacts: [
      { name: "Brandon Roberts", title: "CEO & Co-founder", persona: "Founder / CEO", decisionMaker: true },
      { name: "Neha Kumar", title: "Co-founder", persona: "Founder / CEO", decisionMaker: true },
    ],
    scrape: {
      url: "https://littlefish.co",
      source: "news_pr",
      matchedSignals: JSON.stringify(["funding", "hiring_ops"]),
    },
  },

  // ─── Media / Podcast ───────────────────────────────────────────
  {
    company: {
      name: "FINTECH.TV (Media)",
      website: "https://fintech.tv",
      pipeline: "media",
      industry: "Media / Financial Broadcasting / Podcast",
      size: "Small-mid",
      location: "New York, NY",
      fundingStage: "Growth",
      techStack: JSON.stringify(["streaming", "podcast network", "video"]),
      fitScore: 32,
      intentScore: 35,
      fitDetails: JSON.stringify({ industry: 8, complexity: 7, credibility: 6, distribution: 7, budget: 4 }),
      intentDetails: JSON.stringify({ signal: 14, timeline: 7, exec: 6, responsive: 4, goal: 4 }),
      notes: "Media pipeline angle: Launching podcast network from NYSE studio. Need production scaling, guest booking, audience growth. 1.5M monthly viewers = distribution built, now needs premium content.",
      source: "Daily Scrape 2026-04-16",
      lastActivity: "Podcast network launched April 15, 2026",
    },
    contacts: [
      { name: "Vincent Molinari", title: "Founder & CEO", persona: "CEO / Founder", decisionMaker: true },
      { name: "Troy McGuire", title: "Co-Founder & Head of Content", persona: "Head of Comms / PR", decisionMaker: true },
    ],
    scrape: {
      url: "https://fintech.tv",
      source: "news_pr",
      matchedSignals: JSON.stringify(["funding_launch", "exec_visibility", "content_need"]),
    },
  },

  // ─── AI & Tech Consulting ─────────────────────────────────────
  {
    company: {
      name: "Haast",
      website: "https://haast.co",
      pipeline: "ai-consulting",
      industry: "AI / Compliance / Enterprise Software",
      size: "Early growth",
      location: "New York, NY (+ SF, Sydney)",
      fundingStage: "Series A ($12M, April 9, 2026)",
      techStack: JSON.stringify(["LLMs", "compliance automation", "AI agents"]),
      fitScore: 35,
      intentScore: 40,
      fitDetails: JSON.stringify({ industry: 8, data_maturity: 7, use_case: 8, buyer_access: 7, budget: 5 }),
      intentDetails: JSON.stringify({ signal: 16, timeline: 8, pain: 8, sponsor: 4, responsive: 4 }),
      notes: "Raised $12M one week ago. AI compliance for marketing, legal, and compliance teams. Multi-city presence. CEO is ex-BCG. Legal + compliance background suggests need for AI governance consulting.",
      source: "Daily Scrape 2026-04-16",
      lastActivity: "Series A announced April 9, 2026",
    },
    contacts: [
      { name: "Kunal Vankadara", title: "CEO & Co-founder (ex-BCG)", persona: "CEO / Founder", decisionMaker: true },
      { name: "Jason Watling", title: "Co-founder (law + data strategy)", persona: "CIO / CTO", decisionMaker: true },
      { name: "Liam King", title: "Co-founder (ML/engineering)", persona: "Head of Data / AI", decisionMaker: false },
    ],
    scrape: {
      url: "https://haast.co",
      source: "news_pr",
      matchedSignals: JSON.stringify(["hiring_ai", "initiative", "regulated_ai"]),
    },
  },
  {
    company: {
      name: "Delve",
      website: "https://delve.co",
      pipeline: "ai-consulting",
      industry: "AI / Compliance / GRC",
      size: "~500+ customers, rapid growth",
      location: "US (MIT-founded)",
      fundingStage: "Series A ($32M at $300M valuation)",
      techStack: JSON.stringify(["AI agents", "compliance automation", "GRC"]),
      fitScore: 32,
      intentScore: 28,
      fitDetails: JSON.stringify({ industry: 7, data_maturity: 7, use_case: 7, buyer_access: 6, budget: 5 }),
      intentDetails: JSON.stringify({ signal: 10, timeline: 6, pain: 6, sponsor: 3, responsive: 3 }),
      notes: "Grew from 100 to 500+ customers rapidly. Young founders (21, MIT). Recent controversy re: report quality — may need AI consulting to improve governance and model quality. Growing pains at scale.",
      source: "Daily Scrape 2026-04-16",
      lastActivity: "500+ customers, controversy flagged",
    },
    contacts: [
      { name: "Karun Kaushik", title: "CEO & Co-founder", persona: "CEO / Founder", decisionMaker: true },
      { name: "Selin Kocalar", title: "COO & Co-founder", persona: "VP Ops / COO", decisionMaker: true },
    ],
    scrape: {
      url: "https://delve.co",
      source: "news_pr",
      matchedSignals: JSON.stringify(["pilot_pain", "regulated_ai"]),
    },
  },
  {
    company: {
      name: "Gizmo",
      website: "https://gizmo.ai",
      pipeline: "ai-consulting",
      industry: "EdTech / AI",
      size: "13M users",
      location: "US",
      fundingStage: "Series A ($22M, April 15, 2026)",
      techStack: JSON.stringify(["AI", "ML", "personalization"]),
      fitScore: 25,
      intentScore: 22,
      fitDetails: JSON.stringify({ industry: 5, data_maturity: 5, use_case: 6, buyer_access: 5, budget: 4 }),
      intentDetails: JSON.stringify({ signal: 8, timeline: 5, pain: 4, sponsor: 3, responsive: 2 }),
      notes: "Just raised. 13M users, scaling engineering and AI teams. US college market expansion. May need AI consulting for model optimization and personalization at scale.",
      source: "Daily Scrape 2026-04-16",
      lastActivity: "Series A announced April 15, 2026",
    },
    contacts: [],
    scrape: {
      url: "https://gizmo.ai",
      source: "news_pr",
      matchedSignals: JSON.stringify(["hiring_ai", "vendor_tooling"]),
    },
  },
  {
    company: {
      name: "Goldenpeak Capital",
      website: "",
      pipeline: "fund-formation",
      industry: "Private Equity",
      size: "Emerging manager",
      location: "UK",
      fundingStage: "Fund I (closed £375M, oversubscribed)",
      techStack: JSON.stringify([]),
      fitScore: 30,
      intentScore: 20,
      fitDetails: JSON.stringify({ manager_type: 12, strategy: 6, ops_readiness: 6, jurisdiction: 3, budget: 3 }),
      intentDetails: JSON.stringify({ anchor: 8, launch_window: 4, providers: 4, urgency: 2, referral: 2 }),
      notes: "Closed oversubscribed debut fund at £375M (target £350M) in 12 weeks. Now deploying and building ops infrastructure. May need ongoing legal/compliance or AI consulting for deal sourcing.",
      source: "Daily Scrape 2026-04-16",
      lastActivity: "Fund I closed, oversubscribed",
    },
    contacts: [],
    scrape: {
      url: "https://www.withintelligence.com/insights/private-equity-emerging-managers-to-watch-in-2026/",
      source: "news_pr",
      matchedSignals: JSON.stringify(["track_record", "admin_onboard"]),
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
