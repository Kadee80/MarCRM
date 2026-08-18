#!/usr/bin/env node
/**
 * Import leads from Daily Scrape 2026-06-11 (Thursday)
 *
 * Usage:  cd MarCRM && node scripts/import-2026-06-11.cjs
 *
 * 4 new leads (all pr-marketing, funding triggers announced 9-10 Jun 2026):
 *   1. Capsa AI                 (pr-marketing, combined 82, A)
 *   2. Vinyl Equity             (pr-marketing, combined 81, A)
 *   3. SyntheticFi              (pr-marketing, combined 78, B)
 *   4. Titan (native AI banking)(pr-marketing, combined 68, B — name-ambiguity flag)
 *
 * - Deduplicates by company name (skips if already in DB).
 * - Creates Company + Contact records and a ScrapeResult per lead.
 * - Freelance fields (vertical, subvertical, engagementModel, buyerType,
 *   compensationText, remoteFlag, employmentTypeRaw, urgencyScore) are
 *   empty/0 for these pr-marketing leads.
 *
 * NO new legal-freelance or pr-freelance leads today (job boards returned
 * aggregator/marketplace pages only; LinkedIn not scraped per policy).
 * See the .md/.json reports for detail.
 *
 * SIGNAL REFRESH (NOT applied by this script — these companies already
 * exist in the DB; update manually if desired):
 *   - Ropes & Gray Funds Attorney (legal-freelance, 90): posting STILL LIVE
 *     on RG recruiting site (100% remote, hourly). #1 freelance lead — apply.
 *   - Mission North (pr-freelance, 80): expansion signals — new EVP Digital
 *     & Content (Tom Blim), new public-affairs practice (Emily Field),
 *     corporate-affairs on pace to grow 3X => more white-label/overflow need.
 *   - A Security (pr-marketing, 81): no company-specific news; hold.
 *
 * NOTE: Websites are best-effort. Titan website unconfirmed AND name collides
 * with an existing consumer wealth app — verify exact entity before outreach.
 *
 * NOTE: Neon DB is unreachable from the Cowork sandbox, so this script
 * must be run from Katie's local machine where DATABASE_URL points to
 * the Neon production instance.
 */

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const LEADS = [
  // ─── 1. Capsa AI — pr-marketing (combined 82, A) ───
  {
    company: {
      name: "Capsa AI",
      website: "https://www.capsa.ai",
      pipeline: "pr-marketing",
      industry:
        "Fintech / AI 'operating system' for private capital (PE/VC) — agentic AI across the full fund lifecycle: sourcing, due diligence, portfolio monitoring, back-office operations",
      size: "Series A; $20M total raised; expanding US presence",
      location: "London, UK & New York, NY",
      fundingStage:
        "$18M Series A, announced 2026-06-10, co-led by TX Ventures and Pivot Investment Partners; Bek Ventures participating; existing backers Antler, Outward VC, Cornerstone VC reinvested; angels incl. Paul Forster (Indeed co-founder). $20M total raised.",
      techStack: JSON.stringify([
        "Agentic AI embedded across fund lifecycle",
        "Buyers: PE/VC funds, fund administrators",
        "Proof: 100% renewal, >122% NDR, 14x YoY ARR growth",
        "Founded 2024; London + NY",
      ]),
      fitScore: 48,
      intentScore: 34,
      fitDetails: JSON.stringify({
        industry_match_FS_Tech: 10,
        stage_size_growth: 10,
        clear_B2B_buyer_sales_motion: 10,
        proof_assets_customers_data: 10,
        budget_5k_25k_per_month: 8,
      }),
      intentDetails: JSON.stringify({
        trigger_launch_raise_rebrand_expansion: 15,
        timeline_to_start_0_30_days: 7,
        decision_maker_engaged: 4,
        urgency_pain_reputation_pipeline: 6,
        responsiveness: 2,
      }),
      vertical: "",
      subvertical: "",
      engagementModel: "",
      buyerType: "",
      compensationText: "",
      remoteFlag: "",
      employmentTypeRaw: "",
      urgencyScore: 0,
      starred: true,
      notes:
        "Grade A (82). Best lead today. Fresh $18M Series A + US expansion = high-leverage moment for positioning + category thought leadership in the PE/VC-AI space. Excellent proof assets (100% renewal, 122% NDR, 14x ARR). Pitch a retainer for US-market narrative. DM not yet engaged (cold) — gating risk. Contacts: Danyal Oezduezenciler (CEO), Callum Downie (CTO).",
      source: "Daily Scrape 2026-06-11 (FinTech Global, 10 Jun 2026)",
      lastActivity: "$18M Series A announced 2026-06-10",
    },
    contacts: [
      { name: "Danyal Oezduezenciler", title: "Co-Founder & CEO", email: "", linkedin: "" },
      { name: "Callum Downie", title: "Co-Founder & CTO", email: "", linkedin: "" },
    ],
    scrape: {
      url: "https://fintech.global/2026/06/10/capsa-ai-raises-18m-series-a-for-private-capital-ai/",
      source: "news_funding",
      matchedSignals: JSON.stringify([
        "series_a_18m_tx_ventures_pivot_2026_06_10",
        "20m_total_raised",
        "proof_100pct_renewal_122pct_ndr_14x_arr",
        "us_expansion_post_raise",
        "pe_vc_ai_category_creation",
      ]),
    },
  },

  // ─── 2. Vinyl Equity — pr-marketing (combined 81, A) ───
  {
    company: {
      name: "Vinyl Equity",
      website: "https://www.vinylequity.com",
      pipeline: "pr-marketing",
      industry:
        "Fintech infrastructure for capital markets & corporate transactions — SEC-registered transfer agent modernizing shareholder recordkeeping, equity operations, paying agency, transaction workflows (KYC/KYB, tax filing, audit trails, fraud prevention)",
      size: "Series A; SEC-registered transfer agent; scaling integrations",
      location: "United States",
      fundingStage:
        "$20M Series A led by Jump Capital (announced 2026-06-09/10), with strategic participation from MUFG Innovation Partners; continued backing from Index Ventures, Spark Capital, Infinity Ventures, Cambrian FinTech.",
      techStack: JSON.stringify([
        "SEC-registered transfer agent; capital-markets infra",
        "API integrations with equity plan administrators",
        "Real-time reconciliation of vested/exercised shares",
        "Active press: PRNewswire, Morningstar, Finextra, Axios Pro",
      ]),
      fitScore: 47,
      intentScore: 34,
      fitDetails: JSON.stringify({
        industry_match_FS_Tech: 10,
        stage_size_growth: 10,
        clear_B2B_buyer_sales_motion: 10,
        proof_assets_customers_data: 9,
        budget_5k_25k_per_month: 8,
      }),
      intentDetails: JSON.stringify({
        trigger_launch_raise_rebrand_expansion: 15,
        timeline_to_start_0_30_days: 7,
        decision_maker_engaged: 4,
        urgency_pain_reputation_pipeline: 6,
        responsiveness: 2,
      }),
      vertical: "",
      subvertical: "",
      engagementModel: "",
      buyerType: "",
      compensationText: "",
      remoteFlag: "",
      employmentTypeRaw: "",
      urgencyScore: 0,
      starred: true,
      notes:
        "Grade A (81). Fresh $20M Series A + competitive 'transfer-agent' category heat (per Axios Pro). Pitch: own the 'modern transfer agent / capital-markets infra' narrative via positioning + earned media. Already doing PR (PRNewswire) => possible agency-of-record / overflow opportunity. Website best-effort — verify before outreach.",
      source: "Daily Scrape 2026-06-11 (FinTech Global / Axios Pro, 9-10 Jun 2026)",
      lastActivity: "$20M Series A announced 2026-06-09/10",
    },
    contacts: [],
    scrape: {
      url: "https://fintech.global/2026/06/10/vinyl-equity-raises-20m-series-a-led-by-jump-capital/",
      source: "news_funding",
      matchedSignals: JSON.stringify([
        "series_a_20m_jump_capital_2026_06_09",
        "mufg_innovation_partners_strategic",
        "sec_registered_transfer_agent",
        "transfer_agent_category_heat_axios",
        "active_press_prnewswire_morningstar_finextra",
      ]),
    },
  },

  // ─── 3. SyntheticFi — pr-marketing (combined 78, B) ───
  {
    company: {
      name: "SyntheticFi",
      website: "https://www.syntheticfi.com",
      pipeline: "pr-marketing",
      industry:
        "WealthTech — portfolio-backed financing tools for RIAs (box spreads, synthetic variable prepaid forwards); low-cost, tax-efficient liabilities planning embedded in advisor offerings",
      size: ">$2B regulatory AUM; 300+ advisory firms / 3,000+ advisors",
      location: "United States",
      fundingStage:
        ">$13M round (announced 2026-06-09/10) with backers incl. a Brown Advisory unit and Y Combinator; simultaneously surpassed $2B in regulatory AUM.",
      techStack: JSON.stringify([
        "Portfolio-backed financing for RIAs",
        "Box spreads, synthetic VPFs",
        "Network: 300+ firms, 3,000+ advisors",
        "Backers: Brown Advisory unit, Y Combinator",
      ]),
      fitScore: 46,
      intentScore: 32,
      fitDetails: JSON.stringify({
        industry_match_FS_Tech: 10,
        stage_size_growth: 9,
        clear_B2B_buyer_sales_motion: 10,
        proof_assets_customers_data: 10,
        budget_5k_25k_per_month: 7,
      }),
      intentDetails: JSON.stringify({
        trigger_launch_raise_rebrand_expansion: 15,
        timeline_to_start_0_30_days: 6,
        decision_maker_engaged: 4,
        urgency_pain_reputation_pipeline: 5,
        responsiveness: 2,
      }),
      vertical: "",
      subvertical: "",
      engagementModel: "",
      buyerType: "",
      compensationText: "",
      remoteFlag: "",
      employmentTypeRaw: "",
      urgencyScore: 0,
      starred: false,
      notes:
        "Grade B (78). Trigger = raise + $2B AUM milestone. Strong asset/wealth-management sector fit and proof (300+ firms, 3,000+ advisors). Credibility-sensitive, education-heavy category that rewards earned media + thought leadership. Pitch: advisor/RIA-press thought-leadership program to drive advisor acquisition.",
      source: "Daily Scrape 2026-06-11 (FinTech Global / BusinessWire / citybiz, 9-10 Jun 2026)",
      lastActivity: ">$13M raise + $2B RAUM milestone announced 2026-06-09/10",
    },
    contacts: [],
    scrape: {
      url: "https://fintech.global/2026/06/10/syntheticfi-raises-13m-and-hits-2bn-in-assets/",
      source: "news_funding",
      matchedSignals: JSON.stringify([
        "raise_13m_brown_advisory_yc_2026_06_09",
        "surpassed_2bn_regulatory_aum",
        "300_firms_3000_advisors_network",
        "ria_wealthtech_sector_fit",
      ]),
    },
  },

  // ─── 4. Titan (native AI for banking) — pr-marketing (combined 68, B — flagged) ───
  {
    company: {
      name: "Titan (native AI for banking)",
      website: "",
      pipeline: "pr-marketing",
      industry: "Fintech / AI for banking — native AI for banking workflows",
      size: "Seed; $3M raised",
      location: "United States (unconfirmed)",
      fundingStage:
        "$3M seed to bring native AI to banking, announced 2026-06-10.",
      techStack: JSON.stringify([
        "Native AI for banking",
        "Early-stage seed ($3M)",
        "Limited public proof assets",
      ]),
      fitScore: 37,
      intentScore: 31,
      fitDetails: JSON.stringify({
        industry_match_FS_Tech: 10,
        stage_size_growth: 8,
        clear_B2B_buyer_sales_motion: 9,
        proof_assets_customers_data: 5,
        budget_5k_25k_per_month: 5,
      }),
      intentDetails: JSON.stringify({
        trigger_launch_raise_rebrand_expansion: 15,
        timeline_to_start_0_30_days: 6,
        decision_maker_engaged: 3,
        urgency_pain_reputation_pipeline: 5,
        responsiveness: 2,
      }),
      vertical: "",
      subvertical: "",
      engagementModel: "",
      buyerType: "",
      compensationText: "",
      remoteFlag: "",
      employmentTypeRaw: "",
      urgencyScore: 0,
      starred: false,
      notes:
        "Grade B (68). NAME AMBIGUITY — 'Titan' collides with an existing consumer wealth app; VERIFY exact entity before any outreach. Small $3M seed = tighter budget and thinner proof. Watch-list, not a priority.",
      source: "Daily Scrape 2026-06-11 (FinTech Global, 10 Jun 2026)",
      lastActivity: "$3M seed announced 2026-06-10",
    },
    contacts: [],
    scrape: {
      url: "https://fintech.global/2026/06/10/titan-raises-3m-to-bring-native-ai-to-banking/",
      source: "news_funding",
      matchedSignals: JSON.stringify([
        "seed_3m_native_ai_banking_2026_06_10",
        "name_ambiguity_verify_entity",
      ]),
    },
  },
];

async function main() {
  let imported = 0;
  let skipped = 0;

  for (const lead of LEADS) {
    const existing = await prisma.company.findFirst({
      where: { name: lead.company.name },
    });
    if (existing) {
      console.log(`SKIP (exists): ${lead.company.name}`);
      skipped++;
      continue;
    }

    const company = await prisma.company.create({ data: lead.company });

    for (const c of lead.contacts) {
      await prisma.contact.create({ data: { ...c, companyId: company.id } });
    }

    await prisma.scrapeResult.create({
      data: {
        url: lead.scrape.url,
        source: lead.scrape.source,
        pipeline: lead.company.pipeline,
        resultData: JSON.stringify(lead.company),
        matchedSignals: lead.scrape.matchedSignals,
        imported: true,
      },
    });

    console.log(`IMPORTED: ${lead.company.name} (id=${company.id})`);
    imported++;
  }

  console.log(`\nDone. Imported: ${imported}, Skipped (duplicates): ${skipped}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
