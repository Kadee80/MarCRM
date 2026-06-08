#!/usr/bin/env node
/**
 * Import leads from daily scrape 2026-04-15
 *
 * Usage:  cd MarCRM && node scripts/import-2026-04-15.cjs
 *
 * - Deduplicates by company name (skips if already in DB)
 * - Creates Company + Contact records
 * - Logs a ScrapeResult for each lead
 *
 * Backfill: this import script was generated after the fact from
 * reports/daily-scrape-2026-04-15.json (the original day was never scripted).
 */

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const LEADS = [
  {
    "company": {
      "name": "Zero Shot Fund",
      "website": "https://zeroshot.vc",
      "pipeline": "fund-formation",
      "industry": "Venture Capital",
      "size": "1-10",
      "location": "San Francisco, CA",
      "fundingStage": "Fund I",
      "stage": "Targeted",
      "techStack": "[\"AI-focused investments\",\"OpenAI alumni network\",\"SF-based\"]",
      "fitScore": 40,
      "intentScore": 38,
      "fitDetails": "{\"manager_type\":15,\"strategy\":10,\"ops_readiness\":8,\"jurisdiction\":4,\"budget\":3}",
      "intentDetails": "{\"anchor\":13,\"launch_window\":9,\"providers\":7,\"urgency\":9,\"referral\":0}",
      "starred": true,
      "notes": "OpenAI alumni VC fund, Fund I targeting $100M (first close $20M, April 2026). Co-founders: Evan Morikawa (ex-OpenAI head of applied engineering), Andrew Mayne (original OpenAI prompt engineer), Shawn Jain (ex-OpenAI researcher, also Synthefy founder), Kelly Kovacs (ex-01A), Brett Rounsaville (ex-Twitter/Disney). Actively raising. Already deploying (Worktrace AI, Foundry Robotics). Classic Fund I — needs legal counsel for fund formation docs. HOTTEST LEAD. Combined score 78/100.",
      "source": "Daily Scrape 2026-04-15",
      "lastActivity": "2026-04-15"
    },
    "contacts": [
      {
        "name": "Evan Morikawa",
        "title": "Co-founder & General Partner",
        "email": "",
        "linkedin": "",
        "persona": "Founder / CIO / PM",
        "decisionMaker": true
      },
      {
        "name": "Kelly Kovacs",
        "title": "Co-founder & General Partner",
        "email": "",
        "linkedin": "",
        "persona": "COO / Head of Ops",
        "decisionMaker": true
      }
    ],
    "scrape": {
      "url": "https://zeroshot.vc",
      "source": "reddit.com/r/venturecapital",
      "matchedSignals": "[]"
    }
  },
  {
    "company": {
      "name": "Pillar",
      "website": "https://pillar.finance",
      "pipeline": "pr-marketing",
      "industry": "Fintech / Financial Risk Management",
      "size": "10-50",
      "location": "United States",
      "fundingStage": "Seed",
      "stage": "Targeted",
      "techStack": "[\"AI/ML\",\"ERP integrations\",\"Real-time risk analytics\",\"WhatsApp data ingestion\"]",
      "fitScore": 35,
      "intentScore": 30,
      "fitDetails": "{\"industry\":8,\"stage\":9,\"buyer\":8,\"proof\":6,\"budget\":4}",
      "intentDetails": "{\"trigger\":14,\"timeline\":7,\"dm_engaged\":4,\"urgency\":5,\"responsive\":0}",
      "starred": true,
      "notes": "Raised $20M seed led by a16z on 2026-04-14. Platform helps commodity-driven SMBs (metals, food, airlines) manage financial risk with AI-powered hedging. CEO Harsha Ramesh active in press. Clients: Shibuya Sakura Industries, Sigma Recycling, United Metal Solutions. Fresh funding = brand-building window. Strike within 1-2 weeks.",
      "source": "Daily Scrape 2026-04-15",
      "lastActivity": "2026-04-15"
    },
    "contacts": [
      {
        "name": "Harsha Ramesh",
        "title": "Co-founder & CEO",
        "email": "",
        "linkedin": "",
        "persona": "CEO / Founder",
        "decisionMaker": true
      }
    ],
    "scrape": {
      "url": "https://pillar.finance",
      "source": "reddit.com/r/fintech",
      "matchedSignals": "[]"
    }
  },
  {
    "company": {
      "name": "Round Treasury",
      "website": "https://roundtreasury.com",
      "pipeline": "pr-marketing",
      "industry": "Fintech / AI Finance Automation",
      "size": "10-50",
      "location": "London, UK",
      "fundingStage": "Seed",
      "stage": "Targeted",
      "techStack": "[\"AI finance automation\",\"Agentic Workflow Builder\",\"Autonomous Payroll\",\"Bank integrations\"]",
      "fitScore": 28,
      "intentScore": 32,
      "fitDetails": "{\"industry\":7,\"stage\":8,\"buyer\":7,\"proof\":4,\"budget\":2}",
      "intentDetails": "{\"trigger\":14,\"timeline\":8,\"dm_engaged\":4,\"urgency\":4,\"responsive\":2}",
      "starred": false,
      "notes": "Raised $6M seed on 2026-04-13 (Alstin Capital, Backed VC, Love Ventures). AI-powered finance automation, $500M+ processed. Expanding GTM team. Early investors from Monzo, GoCardless. Fresh seed = building brand. UK-based — verify international scope.",
      "source": "Daily Scrape 2026-04-15",
      "lastActivity": "2026-04-15"
    },
    "contacts": [],
    "scrape": {
      "url": "https://roundtreasury.com",
      "source": "reddit.com/r/fintech",
      "matchedSignals": "[]"
    }
  },
  {
    "company": {
      "name": "Worktrace AI",
      "website": "https://worktrace.ai",
      "pipeline": "ai-consulting",
      "industry": "Enterprise AI / Workflow Automation",
      "size": "10-30",
      "location": "San Francisco, CA",
      "fundingStage": "Seed",
      "stage": "Targeted",
      "techStack": "[\"Workflow automation AI\",\"Enterprise process mapping\",\"Bengaluru engineering\"]",
      "fitScore": 32,
      "intentScore": 25,
      "fitDetails": "{\"industry\":8,\"data_maturity\":7,\"use_case\":10,\"buyer_access\":5,\"budget\":2}",
      "intentDetails": "{\"signal\":15,\"timeline\":5,\"pain\":5,\"sponsor\":0,\"responsive\":0}",
      "starred": false,
      "notes": "Ex-OpenAI PM Angela Jiang + Deepak Vasisht. $9.3M seed (Conviction, 8VC, OpenAI Fund, Mira Murati, Jason Kwon). Enterprise AI workflow discovery + automation. Zero Shot Fund investor = warm network connection via Zero Shot Fund lead (this report).",
      "source": "Daily Scrape 2026-04-15",
      "lastActivity": "2026-04-15"
    },
    "contacts": [
      {
        "name": "Angela Jiang",
        "title": "Co-founder & CEO",
        "email": "",
        "linkedin": "https://www.linkedin.com/in/jiangangela",
        "persona": "AI Product Manager",
        "decisionMaker": true
      }
    ],
    "scrape": {
      "url": "https://worktrace.ai",
      "source": "reddit.com/r/artificial",
      "matchedSignals": "[]"
    }
  },
  {
    "company": {
      "name": "Derivative Path",
      "website": "https://derivativepath.com",
      "pipeline": "pr-marketing",
      "industry": "Fintech / Derivatives Risk Management",
      "size": "100-200",
      "location": "United States",
      "fundingStage": "Growth",
      "stage": "Targeted",
      "techStack": "[\"Derivatives trading platform\",\"Risk management software\",\"Financial institutions tech\"]",
      "fitScore": 30,
      "intentScore": 25,
      "fitDetails": "{\"industry\":9,\"stage\":7,\"buyer\":8,\"proof\":6,\"budget\":0}",
      "intentDetails": "{\"trigger\":10,\"timeline\":5,\"dm_engaged\":5,\"urgency\":5,\"responsive\":0}",
      "starred": false,
      "notes": "132 employees. Derivatives and risk management for financial institutions. Won GlobalCapital Award 4 consecutive years (Americas). New CGO Zack Nagelberg hired to lead growth. Award winner + new growth leader = strong PR opportunity.",
      "source": "Daily Scrape 2026-04-15",
      "lastActivity": "2026-04-15"
    },
    "contacts": [
      {
        "name": "Zack Nagelberg",
        "title": "Chief Growth Officer",
        "email": "",
        "linkedin": "",
        "persona": "CMO / VP Marketing",
        "decisionMaker": true
      }
    ],
    "scrape": {
      "url": "https://derivativepath.com",
      "source": "linkedin.com/feed",
      "matchedSignals": "[]"
    }
  },
  {
    "company": {
      "name": "Ontora",
      "website": "https://ontora.com",
      "pipeline": "ai-consulting",
      "industry": "Enterprise AI / Process Mining",
      "size": "1-10",
      "location": "San Francisco, CA",
      "fundingStage": "Pre-Seed / YC W26",
      "stage": "Targeted",
      "techStack": "[\"AI agents\",\"Process mining\",\"CRM/email/doc integrations\",\"Stakeholder interview AI\"]",
      "fitScore": 28,
      "intentScore": 25,
      "fitDetails": "{\"industry\":6,\"data_maturity\":6,\"use_case\":9,\"buyer_access\":4,\"budget\":3}",
      "intentDetails": "{\"signal\":14,\"timeline\":6,\"pain\":5,\"sponsor\":0,\"responsive\":0}",
      "starred": false,
      "notes": "YC W26. C-suite AI agents that interview employees and map process bottlenecks. Founders: Maximilian Arnold, Leon Iwanowitsch, David Korn. Disrupting management consulting with AI. Needs GTM strategy. Potential referral/co-sell partnership.",
      "source": "Daily Scrape 2026-04-15",
      "lastActivity": "2026-04-15"
    },
    "contacts": [
      {
        "name": "Maximilian Arnold",
        "title": "Co-founder",
        "email": "",
        "linkedin": "",
        "persona": "CIO / CTO",
        "decisionMaker": true
      }
    ],
    "scrape": {
      "url": "https://ontora.com",
      "source": "reddit.com/r/machinelearning",
      "matchedSignals": "[]"
    }
  },
  {
    "company": {
      "name": "Darrow",
      "website": "https://darrow.ai",
      "pipeline": "media",
      "industry": "Legal Tech / AI Legal Intelligence",
      "size": "100-200",
      "location": "New York, NY",
      "fundingStage": "Series B",
      "stage": "Targeted",
      "techStack": "[\"AI legal intelligence\",\"Class action discovery\",\"Document parsing AI\",\"SEC/regulatory databases\"]",
      "fitScore": 30,
      "intentScore": 22,
      "fitDetails": "{\"industry\":7,\"complexity\":8,\"credibility\":9,\"distribution\":4,\"budget\":2}",
      "intentDetails": "{\"signal\":12,\"timeline\":5,\"exec\":5,\"responsive\":0,\"goal\":0}",
      "starred": false,
      "notes": "156 employees. $59M raised. $120M ARR forecast for 2026. CEO Evyatar Ben Artzi is media-active. Rapid growth in regulated legal market = brand credibility imperative. Strong candidate for executive video podcast. Has done podcast appearances (FinStrat Management). Credibility-sensitive B2B sale to corporate legal buyers.",
      "source": "Daily Scrape 2026-04-15",
      "lastActivity": "2026-04-15"
    },
    "contacts": [
      {
        "name": "Evyatar Ben Artzi",
        "title": "Co-founder & CEO",
        "email": "",
        "linkedin": "",
        "persona": "CEO / Founder",
        "decisionMaker": true
      },
      {
        "name": "Mathew Keshav Lewis",
        "title": "US GM & Chief Revenue Officer",
        "email": "",
        "linkedin": "",
        "persona": "CMO / Head of Growth",
        "decisionMaker": false
      }
    ],
    "scrape": {
      "url": "https://darrow.ai",
      "source": "reddit.com/r/legaltech",
      "matchedSignals": "[]"
    }
  },
  {
    "company": {
      "name": "Synthefy",
      "website": "https://synthefy.com",
      "pipeline": "ai-consulting",
      "industry": "AI/ML / Time Series GenAI",
      "size": "10-30",
      "location": "Austin, TX",
      "fundingStage": "Seed",
      "stage": "Targeted",
      "techStack": "[\"Multimodal time series GenAI\",\"Energy/finance/e-commerce data\",\"Generative AI\"]",
      "fitScore": 28,
      "intentScore": 20,
      "fitDetails": "{\"industry\":8,\"data_maturity\":8,\"use_case\":7,\"buyer_access\":3,\"budget\":2}",
      "intentDetails": "{\"signal\":10,\"timeline\":5,\"pain\":5,\"sponsor\":0,\"responsive\":0}",
      "starred": false,
      "notes": "Pioneer in multimodal time series GenAI. $6M seed (2024). Founders: Shawn Jain (also Zero Shot Fund GP), Sandeep Chinchali, Raimi Shah, Somi Agarwal. Finance + energy use cases. Warm connection via Shawn Jain/Zero Shot Fund — highest leverage warm intro in this batch.",
      "source": "Daily Scrape 2026-04-15",
      "lastActivity": "2026-04-15"
    },
    "contacts": [
      {
        "name": "Shawn Jain",
        "title": "Co-founder",
        "email": "",
        "linkedin": "https://www.linkedin.com/in/shawnjain08/",
        "persona": "Head of Data / AI",
        "decisionMaker": true
      }
    ],
    "scrape": {
      "url": "https://synthefy.com",
      "source": "reddit.com/r/machinelearning",
      "matchedSignals": "[]"
    }
  },
  {
    "company": {
      "name": "Foundry Robotics",
      "website": "https://foundryrobotics.ai",
      "pipeline": "ai-consulting",
      "industry": "AI / Robotics / Advanced Manufacturing",
      "size": "10-30",
      "location": "San Francisco, CA",
      "fundingStage": "Seed",
      "stage": "Targeted",
      "techStack": "[\"AI-enhanced robotics\",\"Manufacturing automation\",\"xAI lineage\"]",
      "fitScore": 25,
      "intentScore": 22,
      "fitDetails": "{\"industry\":5,\"data_maturity\":6,\"use_case\":7,\"buyer_access\":5,\"budget\":2}",
      "intentDetails": "{\"signal\":12,\"timeline\":5,\"pain\":5,\"sponsor\":0,\"responsive\":0}",
      "starred": false,
      "notes": "Raised $13.5M seed (Khosla Ventures, Jan 2026). AI-first robotics for American manufacturing. Co-founder Rishabh Jain is ex-xAI ML engineer. Zero Shot Fund investor = warm network. Lower ICP fit (industrial focus) — qualify before investing outreach time.",
      "source": "Daily Scrape 2026-04-15",
      "lastActivity": "2026-04-15"
    },
    "contacts": [
      {
        "name": "Rishabh Jain",
        "title": "Co-founder",
        "email": "",
        "linkedin": "",
        "persona": "CIO / CTO",
        "decisionMaker": true
      }
    ],
    "scrape": {
      "url": "https://foundryrobotics.ai",
      "source": "reddit.com/r/machinelearning",
      "matchedSignals": "[]"
    }
  },
  {
    "company": {
      "name": "Lawtrades",
      "website": "https://lawtrades.com",
      "pipeline": "media",
      "industry": "Legal Tech / On-Demand Legal Talent",
      "size": "11-50",
      "location": "New York, NY",
      "fundingStage": "Series A",
      "stage": "Targeted",
      "techStack": "[\"Legal talent marketplace\",\"Contract review\",\"Compliance tools\"]",
      "fitScore": 25,
      "intentScore": 20,
      "fitDetails": "{\"industry\":5,\"complexity\":7,\"credibility\":8,\"distribution\":3,\"budget\":2}",
      "intentDetails": "{\"signal\":10,\"timeline\":5,\"exec\":5,\"responsive\":0,\"goal\":0}",
      "starred": false,
      "notes": "On-demand legal talent network. $11.7M total raised. CEO Raad Ahmed is public face. 11-50 employees. Growing legal ops market ($29.8B → $65.5B by 2034). Potential executive podcast to reach in-house legal buyers.",
      "source": "Daily Scrape 2026-04-15",
      "lastActivity": "2026-04-15"
    },
    "contacts": [
      {
        "name": "Raad Ahmed",
        "title": "CEO & Co-founder",
        "email": "",
        "linkedin": "",
        "persona": "CEO / Founder",
        "decisionMaker": true
      }
    ],
    "scrape": {
      "url": "https://lawtrades.com",
      "source": "reddit.com/r/legaltech",
      "matchedSignals": "[]"
    }
  }
];

async function main() {
  let created = 0;
  let skipped = 0;

  for (const lead of LEADS) {
    const existing = await prisma.company.findFirst({
      where: { name: lead.company.name },
    });

    if (existing) {
      console.log(`\u23ed  Skipped (already exists): ${lead.company.name}`);
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

    console.log(`\u2705 Created: ${company.name} (${company.pipeline}) \u2014 Fit: ${company.fitScore}, Intent: ${company.intentScore}`);
    created++;
  }

  console.log(`\n\u2500\u2500 Done \u2500\u2500`);
  console.log(`Created: ${created}  |  Skipped: ${skipped}  |  Total: ${LEADS.length}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error("\u274c Error:", e.message);
    prisma.$disconnect();
    process.exit(1);
  });
