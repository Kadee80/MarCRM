#!/usr/bin/env node
/**
 * Import leads from daily scrape 2026-04-17
 *
 * Usage:  cd MarCRM && node scripts/import-2026-04-17.cjs
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
      name: "Wealth.com",
      website: "https://wealth.com",
      pipeline: "pr-marketing",
      industry: "WealthTech / FinTech / AI Estate Planning",
      size: "Growth stage (50,000+ advisors served)",
      location: "Phoenix, AZ",
      fundingStage: "Series B ($65M, April 16, 2026)",
      techStack: JSON.stringify(["AI", "LLMs", "Ester Intelligence", "advisor platform"]),
      fitScore: 46,
      intentScore: 44,
      fitDetails: JSON.stringify({ industry: 10, stage: 9, buyer: 9, proof: 10, budget: 8 }),
      intentDetails: JSON.stringify({ trigger: 15, timeline: 9, dm_engaged: 8, urgency: 8, responsive: 4 }),
      notes: "Raised $65M Series B yesterday (April 16, 2026) led by Titanium Ventures, with Charles Schwab, GV, Citi Ventures, Dynasty Financial, K Fund, Pruven Capital, Anthos. 3x annual revenue growth; 664% YoY growth in AI-powered workflows. Approvals from three largest US broker-dealers (50,000+ advisors) and three of top five domestic banks. Classic post-raise PR amplification opportunity.",
      source: "Daily Scrape 2026-04-17",
      lastActivity: "Series B announced April 16, 2026",
    },
    contacts: [
      { name: "Rafael Loureiro", title: "CEO & Co-founder (ex-Emailage CTO)", persona: "CEO / Founder", decisionMaker: true },
      { name: "Rei Carvalho", title: "Co-founder (ex-Emailage founder)", persona: "CEO / Founder", decisionMaker: true },
      { name: "Danny Lohrfink", title: "Co-founder & Chief Product Officer", persona: "CEO / Founder", decisionMaker: false },
      { name: "Tim White", title: "Co-founder & Chief Growth Officer", persona: "Head of Growth", decisionMaker: true },
      { name: "Anne Rhodes", title: "Chief Legal Officer", persona: "Head of Comms / PR", decisionMaker: false },
    ],
    scrape: {
      url: "https://wealth.com",
      source: "news_pr",
      matchedSignals: JSON.stringify(["fundraise", "launch", "market_entry"]),
    },
  },
  {
    company: {
      name: "Summize",
      website: "https://www.summize.com",
      pipeline: "pr-marketing",
      industry: "LegalTech / Contract Lifecycle Management",
      size: "~100+ employees (59% headcount growth in past year)",
      location: "Manchester, UK (+ Boston, San Diego)",
      fundingStage: "$50M growth round (January 2026) — Kennet + Federated Hermes",
      techStack: JSON.stringify(["AI", "agentic CLM", "Slack/Teams/Salesforce integrations"]),
      fitScore: 40,
      intentScore: 35,
      fitDetails: JSON.stringify({ industry: 8, stage: 8, buyer: 8, proof: 9, budget: 7 }),
      intentDetails: JSON.stringify({ trigger: 12, timeline: 7, dm_engaged: 6, urgency: 6, responsive: 4 }),
      notes: "Manchester-based CLM with 5 years of 100%+ ARR growth. 92% bookings growth July-Dec 2025; 97% YoY ARR. Customers include Revolut, Groq, AMC Networks, NBA/MLB/NFL teams. $50M growth round for global expansion. Launching agentic CLM.",
      source: "Daily Scrape 2026-04-17",
      lastActivity: "$50M growth round January 2026",
    },
    contacts: [
      { name: "Tom Dunlop", title: "CEO (public, thought-leadership active)", persona: "CEO / Founder", decisionMaker: true },
    ],
    scrape: {
      url: "https://www.summize.com",
      source: "news_pr",
      matchedSignals: JSON.stringify(["fundraise", "launch", "market_entry"]),
    },
  },
  {
    company: {
      name: "Tazapay",
      website: "https://tazapay.com",
      pipeline: "pr-marketing",
      industry: "FinTech / Cross-Border Payments / Emerging Markets",
      size: "1,000+ enterprise customers across 30 countries",
      location: "Singapore (global)",
      fundingStage: "Series B ($36M total, extension led by Circle Ventures, March 2026)",
      techStack: JSON.stringify(["cross-border payment rails", "licensing infrastructure"]),
      fitScore: 39,
      intentScore: 38,
      fitDetails: JSON.stringify({ industry: 9, stage: 8, buyer: 7, proof: 8, budget: 7 }),
      intentDetails: JSON.stringify({ trigger: 13, timeline: 8, dm_engaged: 6, urgency: 7, responsive: 4 }),
      notes: "Series B extension closed March 2026 led by Circle Ventures; CMT Digital and Coinbase Ventures joined. 3 consecutive years of revenue doubling. Expanding licensing across APAC, LatAm, MidEast, and Americas — multi-region rollout = PR story per region.",
      source: "Daily Scrape 2026-04-17",
      lastActivity: "Series B extension March 2026",
    },
    contacts: [
      { name: "Rahul Shinghal", title: "CEO & Co-founder", persona: "CEO / Founder", decisionMaker: true },
      { name: "Arul Kumaravel", title: "Co-founder & CTO (ex-Microsoft, Amazon, Grab)", persona: "CIO / CTO", decisionMaker: false },
      { name: "Saroj Mishra", title: "Co-founder & COO", persona: "COO / Head of Ops", decisionMaker: true },
    ],
    scrape: {
      url: "https://tazapay.com",
      source: "news_pr",
      matchedSignals: JSON.stringify(["fundraise", "market_entry"]),
    },
  },

  // ─── Fund Formation ────────────────────────────────────────────
  {
    company: {
      name: "Dolomite Capital",
      website: "https://dolomitecap.com",
      pipeline: "fund-formation",
      industry: "Private Credit / Hedge Fund Spinout",
      size: "Spinout with $1.3B AUM at launch",
      location: "London, UK (spin-out from NY-based Taconic)",
      fundingStage: "Launched Jan 2026; $1.1B assumed from prior vintages + $200M seed for new evergreen fund",
      techStack: JSON.stringify([]),
      fitScore: 45,
      intentScore: 39,
      fitDetails: JSON.stringify({ manager_type: 13, strategy: 10, ops_readiness: 9, jurisdiction: 5, budget: 8 }),
      intentDetails: JSON.stringify({ anchor: 12, launch_window: 9, providers: 8, urgency: 7, referral: 3 }),
      notes: "Taconic Capital Advisors' European credit team spun out as Dolomite Capital in January 2026. Led by Keith Magliana (MP & CIO, ran Taconic Euro credit since 2011). $1.1B taken over from prior vintages plus $200M seed from Stable Asset Management for new evergreen credit fund.",
      source: "Daily Scrape 2026-04-17",
      lastActivity: "Spinout January 2026, new evergreen fund raising",
    },
    contacts: [
      { name: "Keith Magliana", title: "Managing Partner & CIO (ex-Taconic, led Euro credit since 2011)", persona: "Founder / CIO / PM", decisionMaker: true },
      { name: "Frank Brosens", title: "Senior Advisor (Founder of Taconic)", persona: "Anchor Investor (influencer)", decisionMaker: false },
    ],
    scrape: {
      url: "https://dolomitecap.com",
      source: "news_pr",
      matchedSignals: JSON.stringify(["spinout", "anchor", "admin_onboard"]),
    },
  },
  {
    company: {
      name: "Eyre Street Capital",
      website: "https://eyrestreet.com",
      pipeline: "fund-formation",
      industry: "Private Credit / Sustainable Finance",
      size: "Spinout (Fund I closed at $421M; Fund II targeting $800M)",
      location: "New York, NY",
      fundingStage: "SSF II launched Oct 2025, targeting up to $800M",
      techStack: JSON.stringify([]),
      fitScore: 43,
      intentScore: 38,
      fitDetails: JSON.stringify({ manager_type: 14, strategy: 9, ops_readiness: 9, jurisdiction: 4, budget: 7 }),
      intentDetails: JSON.stringify({ anchor: 12, launch_window: 8, providers: 8, urgency: 6, referral: 4 }),
      notes: "Spin-out from Avenue Capital's impact lending platform (April 2025). Backed by Galway Sustainable Capital (with Macquarie Green Investment Group + Aware Super). SSF I was $421M; SSF II targets $800M.",
      source: "Daily Scrape 2026-04-17",
      lastActivity: "SSF II launched Oct 2025",
    },
    contacts: [
      { name: "Sean Coleman", title: "Co-founder & Portfolio Manager", persona: "Founder / CIO / PM", decisionMaker: true },
      { name: "Jamie Devine", title: "Co-founder & Head of Originations", persona: "Founder / CIO / PM", decisionMaker: true },
    ],
    scrape: {
      url: "https://eyrestreet.com",
      source: "news_pr",
      matchedSignals: JSON.stringify(["spinout", "anchor", "track_record"]),
    },
  },
  {
    company: {
      name: "Fedaia Partners",
      website: "https://www.fedaiafinance.com",
      pipeline: "fund-formation",
      industry: "Private Credit / Special Situations",
      size: "Team of 8, debut fund raise",
      location: "London, UK",
      fundingStage: "Debut commingled fund seeking €250M",
      techStack: JSON.stringify([]),
      fitScore: 43,
      intentScore: 37,
      fitDetails: JSON.stringify({ manager_type: 15, strategy: 9, ops_readiness: 8, jurisdiction: 4, budget: 7 }),
      intentDetails: JSON.stringify({ anchor: 10, launch_window: 9, providers: 7, urgency: 8, referral: 3 }),
      notes: "Founded 2020 by ex-Deutsche Bank Distressed Products duo Pietro Stella & Philipp Roever. Actively raising €250M debut fund for asset-based special situations in Europe. Team includes COO (Naumaan Amjed ex-Goldman/Fidera) and Head of IR (Zain Pirani ex-Ares). Fund I emerging manager = textbook fund formation ICP.",
      source: "Daily Scrape 2026-04-17",
      lastActivity: "Raising €250M debut fund",
    },
    contacts: [
      { name: "Pietro Stella", title: "Co-founder (ex-Deutsche Bank Distressed Products)", persona: "Founder / CIO / PM", decisionMaker: true },
      { name: "Philipp Roever", title: "Co-founder (ex-Deutsche Bank Distressed Products)", persona: "Founder / CIO / PM", decisionMaker: true },
      { name: "Naumaan Amjed", title: "COO (ex-Goldman Sachs, Fidera Group)", persona: "COO / Head of Ops", decisionMaker: true },
      { name: "Zain Pirani", title: "Head of Investor Relations (ex-Ares)", persona: "Placement Agent", decisionMaker: false },
    ],
    scrape: {
      url: "https://www.fedaiafinance.com",
      source: "news_pr",
      matchedSignals: JSON.stringify(["spinout", "track_record", "allocator_meeting"]),
    },
  },
  {
    company: {
      name: "Air Street Capital",
      website: "https://airstreet.com",
      pipeline: "fund-formation",
      industry: "Venture Capital (AI-first)",
      size: "Europe's largest solo GP firm",
      location: "London / San Francisco (solo GP)",
      fundingStage: "Fund III closed at $232M (March 23, 2026)",
      techStack: JSON.stringify([]),
      fitScore: 43,
      intentScore: 36,
      fitDetails: JSON.stringify({ manager_type: 13, strategy: 9, ops_readiness: 9, jurisdiction: 4, budget: 8 }),
      intentDetails: JSON.stringify({ anchor: 14, launch_window: 6, providers: 8, urgency: 5, referral: 3 }),
      notes: "Nathan Benaich's Air Street Capital closed $232M Fund III in March 2026 — Europe's largest solo GP firm. Portfolio includes Synthesia ($150M ARR), Black Forest Labs, Poolside. Fund III close = LP docs/side letters completed; likely ongoing legal retainer need.",
      source: "Daily Scrape 2026-04-17",
      lastActivity: "Fund III closed March 23, 2026",
    },
    contacts: [
      { name: "Nathan Benaich", title: "Founder & Solo GP", persona: "Founder / CIO / PM", decisionMaker: true },
    ],
    scrape: {
      url: "https://airstreet.com",
      source: "news_pr",
      matchedSignals: JSON.stringify(["track_record", "anchor", "admin_onboard"]),
    },
  },
  {
    company: {
      name: "Ferghana Investment Partners",
      website: "",
      pipeline: "fund-formation",
      industry: "Private Equity / Buyout",
      size: "Emerging manager (Fund I)",
      location: "US",
      fundingStage: "Fund I targeting $500M; backed by GP seeder New Catalyst Strategic Partners (Feb 2026)",
      techStack: JSON.stringify([]),
      fitScore: 39,
      intentScore: 35,
      fitDetails: JSON.stringify({ manager_type: 15, strategy: 8, ops_readiness: 6, jurisdiction: 4, budget: 6 }),
      intentDetails: JSON.stringify({ anchor: 11, launch_window: 8, providers: 5, urgency: 7, referral: 4 }),
      notes: "Debut fund targeting $500M with strategic backing from GP seeder New Catalyst Strategic Partners secured February 2026. Large target ($500M) for Fund I = meaningful legal complexity (LPA, side letters, co-invest vehicles).",
      source: "Daily Scrape 2026-04-17",
      lastActivity: "GP seed closed February 2026",
    },
    contacts: [],
    scrape: {
      url: "https://www.withintelligence.com/insights/private-equity-emerging-managers-to-watch-in-2026/",
      source: "news_pr",
      matchedSignals: JSON.stringify(["spinout", "anchor"]),
    },
  },

  // ─── Legal Consulting ──────────────────────────────────────────
  {
    company: {
      name: "Orbital",
      website: "https://www.orbital.tech",
      pipeline: "legal-consulting",
      industry: "LegalTech / AI / Real Estate Law",
      size: "5,000+ property professionals; 200K transactions/year",
      location: "London, UK (expanding to US)",
      fundingStage: "Series B ($60M / £44M, January 2026, led by Brighton Park Capital)",
      techStack: JSON.stringify(["AI", "NLP", "real estate document automation"]),
      fitScore: 40,
      intentScore: 37,
      fitDetails: JSON.stringify({ complexity: 13, ongoing: 12, org_size: 7, dm_access: 4, budget: 4 }),
      intentDetails: JSON.stringify({ active_problem: 14, timeline: 7, volume: 8, pressure: 4, responsive: 4 }),
      notes: "UK's market leader in real estate legal AI, aggressively expanding into US post-Series B. US expansion = heavy legal consulting need: entity formation, state-by-state real estate practice rules, UPL reviews, title company compliance.",
      source: "Daily Scrape 2026-04-17",
      lastActivity: "Series B announced January 2026, US expansion",
    },
    contacts: [
      { name: "Will Pearce", title: "CEO & Co-founder", persona: "Founder / CEO", decisionMaker: true },
      { name: "Ed Boulle", title: "Co-founder", persona: "Founder / CEO", decisionMaker: true },
      { name: "Andrew Thompson", title: "CTO", persona: "CIO / CTO", decisionMaker: false },
    ],
    scrape: {
      url: "https://www.orbital.tech",
      source: "news_pr",
      matchedSignals: JSON.stringify(["growth", "new_product", "institutional"]),
    },
  },

  // ─── Coaching & Ops ────────────────────────────────────────────
  {
    company: {
      name: "OpenArc Corporate Advisory",
      website: "https://openarc.com",
      pipeline: "coaching-ops",
      industry: "RIA / Wealth Management / Corporate Advisory",
      size: "$129B in client assets (recently launched RIA)",
      location: "Atlanta, GA (national)",
      fundingStage: "Dynasty Financial Partners minority investor; Charles Schwab custodian",
      techStack: JSON.stringify(["Dynasty platform", "Schwab custody"]),
      fitScore: 44,
      intentScore: 41,
      fitDetails: JSON.stringify({ revenue: 15, niche: 9, margin: 8, dm_access: 8, coachable: 4 }),
      intentDetails: JSON.stringify({ trigger: 18, timeline: 8, pain: 8, responsive: 3, budget: 4 }),
      notes: "$129B RIA breakaway from Merrill Lynch (launched Sept 2025). Ongoing Merrill lawsuit alleging 'pre-meditated corporate raid'. New national RIA = major ops buildout (compliance, technology, client onboarding, branding). Shirl Penney (Dynasty CEO) called it 'watershed moment' for RIAs.",
      source: "Daily Scrape 2026-04-17",
      lastActivity: "Launched Sept 2025; ongoing Merrill lawsuit",
    },
    contacts: [
      { name: "Erik Bjerke", title: "Senior Managing Partner (ex-Merrill Global Corporate & Institutional Advisory)", persona: "Founder / CEO", decisionMaker: true },
      { name: "Emily Fletcher", title: "Managing Partner", persona: "COO / Head of Ops", decisionMaker: true },
      { name: "James Kaufman", title: "Managing Partner", persona: "COO / Head of Ops", decisionMaker: true },
      { name: "Kevin Higginbotham", title: "Managing Partner", persona: "COO / Head of Ops", decisionMaker: true },
    ],
    scrape: {
      url: "https://openarc.com",
      source: "news_pr",
      matchedSignals: JSON.stringify(["acquisition", "hiring_ops", "new_leader"]),
    },
  },

  // ─── AI & Tech Consulting ─────────────────────────────────────
  {
    company: {
      name: "depthfirst",
      website: "https://depthfirst.com",
      pipeline: "ai-consulting",
      industry: "AI Security / Applied AI / Enterprise Infrastructure",
      size: "Early growth ($120M total raised across 90 days)",
      location: "US (founders from DeepMind / Databricks / Faire)",
      fundingStage: "Series B ($80M, March 31, 2026)",
      techStack: JSON.stringify(["LLMs", "autonomous agents", "security ML", "AI infrastructure"]),
      fitScore: 41,
      intentScore: 41,
      fitDetails: JSON.stringify({ industry: 9, data_maturity: 8, use_case: 9, buyer_access: 7, budget: 8 }),
      intentDetails: JSON.stringify({ signal: 17, timeline: 8, pain: 7, sponsor: 5, responsive: 4 }),
      notes: "Applied AI lab building autonomous security. $80M Series B led by Meritech just 90 days after emerging from stealth. Founders from DeepMind, Databricks (Qasim Mithani ex-Databricks), Faire. Rapidly scaling for regulated enterprises = governance, model risk, AI policy consulting needs.",
      source: "Daily Scrape 2026-04-17",
      lastActivity: "Series B announced March 31, 2026",
    },
    contacts: [
      { name: "Qasim Mithani", title: "Co-founder & CEO (ex-Databricks, ex-AWS)", persona: "CEO / Founder", decisionMaker: true },
      { name: "Andrea Michi", title: "CTO", persona: "CIO / CTO", decisionMaker: false },
    ],
    scrape: {
      url: "https://depthfirst.com",
      source: "news_pr",
      matchedSignals: JSON.stringify(["hiring_ai", "initiative", "regulated_ai"]),
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
