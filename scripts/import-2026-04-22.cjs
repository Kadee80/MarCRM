#!/usr/bin/env node
/**
 * Import leads from daily scrape 2026-04-22
 *
 * Usage:  cd MarCRM && node scripts/import-2026-04-22.cjs
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
      name: "Monk",
      website: "https://monk.com",
      pipeline: "ai-consulting",
      industry: "AI Accounts Receivable / B2B Finance Automation / Contract-to-Cash",
      size: "Growth-stage; total funding $29M post-raise; customer outcomes include 40% DSO reduction and 24% improvement in collections response rates",
      location: "United States",
      fundingStage: "Series A ($25M, April 21, 2026) — co-led by Footwork and Acrew Capital, with continued participation from BTV (total raised $29M)",
      techStack: JSON.stringify(["agentic AI", "contract-to-cash automation", "invoicing AI", "collections AI", "cash application"]),
      fitScore: 42,
      intentScore: 41,
      fitDetails: JSON.stringify({ industry: 9, data_maturity: 9, use_case: 9, buyer_access: 7, budget: 8 }),
      intentDetails: JSON.stringify({ signal: 18, timeline: 9, pain: 7, sponsor: 4, responsive: 3 }),
      notes: "$25M Series A co-led by Footwork + Acrew Capital on April 21, 2026 — 1 day ago. AI-native accounts receivable platform automating the full contract-to-cash lifecycle (invoicing, collections, cash application, dispute resolution). Reports 40% DSO reduction, 25+ hours/month time savings, 24% better collections response rates — strong quantified proof points. Capital earmarked for R&D and category-defining product work. Primary angle: AI-consulting partnership for enterprise finance AI deployments (CFO/Controller buyer). Pair with Zenskar as cohort targets — both Apr 20-21 Series A's in the order-to-cash AI space.",
      source: "Daily Scrape 2026-04-22",
      lastActivity: "Series A announced April 21, 2026",
    },
    contacts: [
      { name: "Monk Founding Team", title: "Leadership (see monk.com/team)", persona: "CEO / Founder", decisionMaker: true },
    ],
    scrape: {
      url: "https://monk.com",
      source: "news_pr",
      matchedSignals: JSON.stringify(["fundraise", "hiring_ai", "enterprise_gtm"]),
    },
  },
  {
    company: {
      name: "Zenskar",
      website: "https://www.zenskar.com",
      pipeline: "ai-consulting",
      industry: "AI Revenue Automation / B2B Billing / Order-to-Cash Agents",
      size: "Growth-stage; 5x revenue growth over past year; customers include Thriva, Pontera, Yembo, Vertice, Posh",
      location: "United States / India (global)",
      fundingStage: "Series A ($15M, April 20, 2026) — led by Susquehanna Venture Capital, Bessemer Venture Partners, Shine Capital, and Rho; participation from Rocketship, J-Ventures, Future Back Ventures by Bain & Company, Converge",
      techStack: JSON.stringify(["agentic AI", "Agents Marketplace", "billing automation", "revenue recognition", "order-to-cash"]),
      fitScore: 41,
      intentScore: 41,
      fitDetails: JSON.stringify({ industry: 9, data_maturity: 9, use_case: 9, buyer_access: 7, budget: 7 }),
      intentDetails: JSON.stringify({ signal: 17, timeline: 9, pain: 7, sponsor: 5, responsive: 3 }),
      notes: "$15M Series A on April 20, 2026 — 2 days ago. AI-native billing + revenue automation for complex B2B businesses. Named customer ROI: Thriva (days→hours), Yembo (collects 50% of revenue a month earlier), Vertice (closes books 70% faster). Capital earmarked for Agents Marketplace — a library of AI agents finance teams can chain/deploy without engineering. Strong AI-consulting angle: help customers architect agent workflows, governance, and chaining. Pair with Monk as cohort targets.",
      source: "Daily Scrape 2026-04-22",
      lastActivity: "Series A announced April 20, 2026",
    },
    contacts: [
      { name: "Apurv Bansal", title: "CEO & Co-founder", persona: "CEO / Founder", decisionMaker: true },
      { name: "Saurabh Agrawal", title: "CTO & Co-founder", persona: "CIO / CTO", decisionMaker: false },
    ],
    scrape: {
      url: "https://www.zenskar.com",
      source: "news_pr",
      matchedSignals: JSON.stringify(["fundraise", "hiring_ai", "agentic_launch"]),
    },
  },
  {
    company: {
      name: "Coral",
      website: "https://www.usecoral.com",
      pipeline: "ai-consulting",
      industry: "HealthTech / AI Administrative Automation / Specialty Clinic Workflow",
      size: "Early-growth; serves specialty clinics; integrates with EHRs, fax lines, and payer portals",
      location: "New York, NY",
      fundingStage: "Series A ($12.5M, April 20, 2026) — led by Lightspeed Venture Partners and Z47",
      techStack: JSON.stringify(["AI patient intake", "prior authorization automation", "fax processing AI", "EHR integration", "payer portal automation"]),
      fitScore: 38,
      intentScore: 38,
      fitDetails: JSON.stringify({ industry: 9, data_maturity: 8, use_case: 9, buyer_access: 6, budget: 6 }),
      intentDetails: JSON.stringify({ signal: 16, timeline: 8, pain: 7, sponsor: 4, responsive: 3 }),
      notes: "$12.5M Series A led by Lightspeed + Z47 on April 20, 2026. AI-native admin-workflow automation for specialty healthcare providers (patient intake, prior authorization, fax processing, payer/patient follow-up). Deep integration with EHRs, fax lines, and payer portals — sticky deployment surface. NYC-based. Complements Joyful Health (Apr 16 raise, already in CRM) as the healthcare-AI cohort story. Primary angle: AI-consulting partnership for specialty-practice rollouts and payer-integration engineering.",
      source: "Daily Scrape 2026-04-22",
      lastActivity: "Series A announced April 20, 2026",
    },
    contacts: [
      { name: "Coral Founding Team", title: "Leadership", persona: "CEO / Founder", decisionMaker: true },
    ],
    scrape: {
      url: "https://www.usecoral.com",
      source: "news_pr",
      matchedSignals: JSON.stringify(["fundraise", "healthcare_ai", "specialty_clinic"]),
    },
  },
  {
    company: {
      name: "Logicc",
      website: "https://www.logicc.de",
      pipeline: "ai-consulting",
      industry: "Secure Enterprise AI / Regulated Industries / Legal-Healthcare-Public Sector AI",
      size: "Early-growth; €1M+ ARR in first 6 months post-launch; Hamburg, Germany",
      location: "Hamburg, Germany",
      fundingStage: "Seed (€2.5M, April 20, 2026) — investor group backing Germany's secure AI market",
      techStack: JSON.stringify(["secure AI platform", "data residency", "regulated-industry AI", "on-prem / private cloud AI"]),
      fitScore: 35,
      intentScore: 37,
      fitDetails: JSON.stringify({ industry: 8, data_maturity: 8, use_case: 8, buyer_access: 6, budget: 5 }),
      intentDetails: JSON.stringify({ signal: 15, timeline: 8, pain: 7, sponsor: 4, responsive: 3 }),
      notes: "€2.5M seed on April 20, 2026 — Hamburg-based secure AI platform for lawyers, doctors, and public institutions (the three most data-sensitive EU buyer segments). €1M+ ARR in 6 months is strong for a seed-stage infra company. Primary angle: AI-consulting referral/partner arrangement — Logicc's platform + Katie's consulting bundle for EU-regulated buyers evaluating secure-AI deployments. Seed-tight budget so avoid fixed retainer; pitch referral/revenue share instead.",
      source: "Daily Scrape 2026-04-22",
      lastActivity: "Seed round announced April 20, 2026",
    },
    contacts: [
      { name: "Logicc Founders", title: "CEO / CTO", persona: "CEO / Founder", decisionMaker: true },
    ],
    scrape: {
      url: "https://www.logicc.de",
      source: "news_pr",
      matchedSignals: JSON.stringify(["fundraise", "regulated_ai", "eu_sovereign_ai"]),
    },
  },

  // ─── PR & Marketing ────────────────────────────────────────────
  {
    company: {
      name: "Seapoint",
      website: "https://www.seapoint.co",
      pipeline: "pr-marketing",
      industry: "FinTech / AI Financial Operations / Startup Back Office Automation",
      size: "Early-growth; Dublin + London; opening to all UK and Irish founders at launch",
      location: "Dublin, Ireland / London, UK",
      fundingStage: "Seed (€7.5M, April 21, 2026) — led by 13books Capital with 40+ angels including Claire Hughes Johnson (ex-COO Stripe), Des Traynor (co-founder Intercom), Laurence Krieger (ex-UK CEO Tide / ex-COO Revolut), Luke Mackey (CEO Kota). Total raised €10M.",
      techStack: JSON.stringify(["AI-native financial ops", "banking automation", "startup back office", "multi-entity finance"]),
      fitScore: 41,
      intentScore: 40,
      fitDetails: JSON.stringify({ industry: 9, stage: 9, buyer: 9, proof: 9, budget: 5 }),
      intentDetails: JSON.stringify({ trigger: 14, timeline: 9, dm_engaged: 7, urgency: 6, responsive: 4 }),
      notes: "€7.5M seed led by 13books Capital on April 21, 2026 — 1 day ago. Founded by ex-Stripe executives. The angel roster is a PR masterclass: Claire Hughes Johnson (ex-Stripe COO), Des Traynor (Intercom co-founder), Laurence Krieger (ex-Revolut COO / ex-Tide UK CEO), Luke Mackey (Kota CEO). Public launch to all UK/Ireland founders creates natural launch-PR moment. Primary angle: PR + brand positioning for launch narrative ('Stripe alumni tackle the startup back office'). Warm-intro path via Michael McFadgen (13books, board seat). Budget constrained at seed, so scope-controlled retainer or milestone-based engagement.",
      source: "Daily Scrape 2026-04-22",
      lastActivity: "Seed round + public launch April 21, 2026",
    },
    contacts: [
      { name: "Seapoint Founders (ex-Stripe)", title: "CEO / Co-founders", persona: "CEO / Founder", decisionMaker: true },
      { name: "Michael McFadgen", title: "Partner at 13books / Seapoint Board Member", persona: "Anchor Investor (influencer)", decisionMaker: false },
    ],
    scrape: {
      url: "https://www.seapoint.co",
      source: "news_pr",
      matchedSignals: JSON.stringify(["fundraise", "public_launch", "founder_visibility"]),
    },
  },
  {
    company: {
      name: "RIIG Technology (HOOTL)",
      website: "https://www.riigtech.com",
      pipeline: "pr-marketing",
      industry: "HealthTech / AI Insurance Claims Automation / Field Service Management",
      size: "Early-growth; dental solution live with OpenDental and Dentrix Cloud; roofing field-service suite in progress",
      location: "United States (with Dubai JV and Canadian subsidiary)",
      fundingStage: "Series A ($6M+, April 21, 2026) — Family Offices, a publicly listed entity, and HNWIs",
      techStack: JSON.stringify(["HOOTL AI automation", "healthcare claims verification", "field service management", "dental practice management integration"]),
      fitScore: 37,
      intentScore: 36,
      fitDetails: JSON.stringify({ industry: 8, stage: 8, buyer: 9, proof: 7, budget: 5 }),
      intentDetails: JSON.stringify({ trigger: 13, timeline: 8, dm_engaged: 6, urgency: 6, responsive: 3 }),
      notes: "$6M+ Series A on April 21, 2026 from Family Offices, a publicly listed entity, and HNWIs — non-VC investor mix signals strategic operator capital. Dual-vertical AI platform: healthcare insurance claims (dental live w/ OpenDental + Dentrix Cloud) + field service management (roofing, in progress). Dubai-government JV and Canadian subsidiary expansion = multiple geographic PR narratives. 'Humans Out of the Loop' branding is memorable. Primary angle: post-raise PR amplification across healthcare + roofing trade press. Budget-constrained, so structure as launch sprint or milestone retainer.",
      source: "Daily Scrape 2026-04-22",
      lastActivity: "Series A announced April 21, 2026",
    },
    contacts: [
      { name: "RIIG Leadership Team", title: "CEO / Founding Team (HOOTL brand)", persona: "CEO / Founder", decisionMaker: true },
    ],
    scrape: {
      url: "https://www.riigtech.com",
      source: "news_pr",
      matchedSignals: JSON.stringify(["fundraise", "international_expansion", "multi_vertical_launch"]),
    },
  },

  // ─── Fund Formation ────────────────────────────────────────────
  {
    company: {
      name: "Trimontium Capital",
      website: "https://www.trimontium.com",
      pipeline: "fund-formation",
      industry: "Alternative Asset Manager / Credit / Special Situations / Capital Solutions",
      size: "New manager; launched November 2025; building team from Blackstone alumni",
      location: "London, UK",
      fundingStage: "Inaugural fund in formation — anchor investment secured from a large US-based investment manager",
      techStack: JSON.stringify([]),
      fitScore: 41,
      intentScore: 38,
      fitDetails: JSON.stringify({ manager_type: 14, strategy: 9, ops_readiness: 8, jurisdiction: 4, budget: 6 }),
      intentDetails: JSON.stringify({ anchor: 13, launch_window: 9, providers: 5, urgency: 7, referral: 4 }),
      notes: "Launched November 2025 by Vlado Spasov — ex-head of capital solutions at DWS Group and ex-Managing Director at Blackstone's hedge fund business. London-based; US + Western Europe capital-solutions / special-situations trades. US-based anchor investment already secured — inaugural fund is in active formation. Team being built from Blackstone alumni = classic emerging-manager pattern with pedigreed founding team. Archetype fund-formation ICP: first-time institutional vehicle, UK regulatory structuring, credit strategy with potential offshore feeder for US LPs. Warm-intro path via Blackstone alumni network or via the US anchor LP. Competes w/ legal heavyweights, so lean on founder-friendliness + speed vs. marquee brand.",
      source: "Daily Scrape 2026-04-22",
      lastActivity: "Firm launch November 2025; fund formation ongoing through Q1-Q2 2026",
    },
    contacts: [
      { name: "Vlado Spasov", title: "Founder & CIO (ex-DWS Head of Capital Solutions, ex-Blackstone MD)", persona: "Founder / CIO / PM", decisionMaker: true },
    ],
    scrape: {
      url: "https://www.trimontium.com",
      source: "news_pr",
      matchedSignals: JSON.stringify(["spinout", "anchor", "emerging_manager"]),
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
