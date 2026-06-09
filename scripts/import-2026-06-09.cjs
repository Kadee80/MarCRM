#!/usr/bin/env node
/**
 * Import leads from Daily Scrape 2026-06-09 (Tuesday)
 *
 * Usage:  cd MarCRM && node scripts/import-2026-06-09.cjs
 *
 * 5 new leads (all pr-marketing, funding triggers announced 8 Jun 2026):
 *   1. A Security   (pr-marketing, combined 81, A)
 *   2. Edge Markets (pr-marketing, combined 76, B)
 *   3. PointFive    (pr-marketing, combined 73, B)
 *   4. Lexful       (pr-marketing, combined 68, B)
 *   5. Reset        (pr-marketing, combined 67, B)
 *
 * - Deduplicates by company name (skips if already in DB).
 * - Creates Company + Contact records and a ScrapeResult per lead.
 * - Freelance fields (vertical, subvertical, engagementModel, buyerType,
 *   compensationText, remoteFlag, employmentTypeRaw, urgencyScore) are
 *   empty/0 for these pr-marketing leads.
 *
 * NOTE: Websites for A Security and Reset are blank (unconfirmed);
 * PointFive and Lexful are best-effort. Verify before outreach.
 *
 * NOTE: Signal-refresh updates for Suno and Scotch are NOT applied here
 * (those companies already exist in the DB). See the .md/.json reports
 * for the deltas and update them manually if desired.
 *
 * NOTE: Neon DB is unreachable from the Cowork sandbox, so this script
 * must be run from Katie's local machine where DATABASE_URL points to
 * the Neon production instance.
 */

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const SOURCE_URL =
  "https://techstartups.com/2026/06/08/venture-capital-startup-funding-roundup-june-9-2026/";

const LEADS = [
  // ─── 1. A Security — pr-marketing (combined 81, A) ───
  {
    company: {
      name: "A Security",
      website: "",
      pipeline: "pr-marketing",
      industry:
        "AI-driven cybersecurity — autonomous pentesting / continuous attack-surface mapping; positioned as an 'AI-driven Splunk replacement' for security operations",
      size: "Series A (out of stealth); scaling engineering + enterprise pilots",
      location: "New York, New York, USA",
      fundingStage:
        "$37M Series A out of stealth, announced 2026-06-08, led by Lightspeed with Cyberstarts and angels (Wiz CEO Assaf Rapaport, Cyera CEO Yotam Segev). Founders ex-AWS and former AI head at Abnormal Security.",
      techStack: JSON.stringify([
        "Autonomous pentesting; maps 'exploit paths' before attackers weaponize them",
        "Continuous attack-surface mapping + real-time breach neutralization",
        "Lightspeed + Cyberstarts; Wiz/Cyera CEO angels",
        "Founders ex-AWS + ex-Abnormal Security",
      ]),
      fitScore: 45,
      intentScore: 36,
      fitDetails: JSON.stringify({
        industry_match_FS_Tech: 9,
        stage_size_growth: 10,
        clear_B2B_buyer_sales_motion: 10,
        proof_assets_customers_data: 8,
        budget_5k_25k_per_month: 8,
      }),
      intentDetails: JSON.stringify({
        trigger_launch_raise_rebrand_expansion: 15,
        timeline_to_start_0_30_days: 7,
        decision_maker_engaged: 5,
        urgency_pain_reputation_pipeline: 7,
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
        "Top lead today. Stealth emergence + $37M Series A = narrative-defining moment where positioning/earned-media advisory has maximum leverage. Crowded AI-security category (Wiz/Cyera/Abnormal alumni + investors) so category positioning matters and the launch window is competitive. Right-sized for a boutique retainer + launch sprint. Website unconfirmed — verify before outreach.",
      source: "Daily Scrape 2026-06-09 (Tech Startups VC roundup)",
      lastActivity: "$37M Series A out of stealth announced 2026-06-08",
    },
    contacts: [],
    scrape: {
      url: SOURCE_URL,
      source: "news_funding",
      matchedSignals: JSON.stringify([
        "series_a_37m_lightspeed_stealth_emergence_2026_06_08",
        "star_cap_table_wiz_cyera_cyberstarts",
        "founders_ex_aws_ex_abnormal_security",
        "narrative_defining_emergence_window_open",
      ]),
    },
  },

  // ─── 2. Edge Markets — pr-marketing (combined 76, B) ───
  {
    company: {
      name: "Edge Markets",
      website: "https://edgemarkets.io",
      pipeline: "pr-marketing",
      industry:
        "Fintech / crypto — institutional crypto futures platform + off-chain prediction-markets engine; trading and compliance tools for hedge funds and asset managers",
      size: "Series A",
      location: "New York, New York, USA",
      fundingStage:
        "$29.2M Series A, announced 2026-06-08, led by CoinFund with Indicator Ventures, Mantis VC, StepStone Group, Bullpen Capital.",
      techStack: JSON.stringify([
        "Institutional crypto-futures platform",
        "Off-chain prediction-markets engine (sports/elections)",
        "Compliance tooling for hedge funds + asset managers",
        "Competes with Anchorage Digital / Galaxy consortium exchanges",
      ]),
      fitScore: 44,
      intentScore: 32,
      fitDetails: JSON.stringify({
        industry_match_FS_Tech: 10,
        stage_size_growth: 9,
        clear_B2B_buyer_sales_motion: 9,
        proof_assets_customers_data: 8,
        budget_5k_25k_per_month: 8,
      }),
      intentDetails: JSON.stringify({
        trigger_launch_raise_rebrand_expansion: 14,
        timeline_to_start_0_30_days: 6,
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
      starred: false,
      notes:
        "Core FS/Tech fit — fintech selling regulated crypto/prediction-market infra to hedge funds and asset managers. Credibility-sensitive, compliance-heavy sale where earned media + institutional narrative de-risk the buyer. Differentiation story (regulated prediction markets) is press-friendly. Decision-maker access is the gating risk. Website confirmed from company newsroom URL.",
      source: "Daily Scrape 2026-06-09 (Tech Startups VC roundup)",
      lastActivity: "$29.2M Series A announced 2026-06-08",
    },
    contacts: [],
    scrape: {
      url: SOURCE_URL,
      source: "news_funding",
      matchedSignals: JSON.stringify([
        "series_a_29_2m_coinfund_2026_06_08",
        "institutional_crypto_futures_plus_prediction_markets",
        "sells_to_hedge_funds_asset_managers",
        "regulated_compliance_credibility_sensitive_sale",
      ]),
    },
  },

  // ─── 3. PointFive — pr-marketing (combined 73, B) ───
  {
    company: {
      name: "PointFive",
      website: "https://www.pointfive.com",
      pipeline: "pr-marketing",
      industry:
        "Enterprise AI / cloud-cost management — 'AI Efficiency OS' correlating cloud + GPU usage with financial data to flag waste and automate optimizations",
      size: "Series B; $96M total; 100+ employees (NY, Tel Aviv, London)",
      location: "New York, New York, USA",
      fundingStage:
        "$60M Series B, announced 2026-06-08, led by Accel with Index Ventures, Salesforce Ventures, Entree Capital, Vesey Ventures, Sheva Ventures. $96M total post-raise.",
      techStack: JSON.stringify([
        "AI Efficiency OS for cloud + GPU spend",
        "Correlates infra metrics with financial data; automates optimizations",
        "Customers incl. major banks, retailers, tech firms",
        "100+ employees across three offices",
      ]),
      fitScore: 42,
      intentScore: 31,
      fitDetails: JSON.stringify({
        industry_match_FS_Tech: 8,
        stage_size_growth: 8,
        clear_B2B_buyer_sales_motion: 10,
        proof_assets_customers_data: 10,
        budget_5k_25k_per_month: 6,
      }),
      intentDetails: JSON.stringify({
        trigger_launch_raise_rebrand_expansion: 14,
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
        "Strong proof assets (named bank/retailer/tech customers) and a clean enterprise-SaaS motion in a hot category. Scored down on budget+size: Series B, 100+ employees across three offices = likely already has comms capacity and could afford a larger agency, so the boutique-retainer fit is softer. Best pitched as specialist earned-media/category overflow around the raise. Website best-effort — verify.",
      source: "Daily Scrape 2026-06-09 (Tech Startups VC roundup)",
      lastActivity: "$60M Series B announced 2026-06-08",
    },
    contacts: [],
    scrape: {
      url: SOURCE_URL,
      source: "news_funding",
      matchedSignals: JSON.stringify([
        "series_b_60m_accel_2026_06_08",
        "total_raised_96m",
        "customers_major_banks_retailers_tech_firms",
        "100_plus_employees_three_offices",
      ]),
    },
  },

  // ─── 4. Lexful — pr-marketing (combined 68, B) ───
  {
    company: {
      name: "Lexful",
      website: "https://www.lexful.com",
      pipeline: "pr-marketing",
      industry:
        "Enterprise AI / knowledge management — AI-native documentation platform turning MSP/IT 'tribal knowledge' into a queryable knowledge OS",
      size: "Seed (oversubscribed)",
      location: "Miami, Florida, USA",
      fundingStage:
        "$7M seed (oversubscribed), announced 2026-06-08, led by Top Down Ventures and York IE.",
      techStack: JSON.stringify([
        "Ingests playbooks, credentials, diagrams, notes",
        "AI agents turn tribal knowledge into a queryable knowledge OS",
        "Target market: mid-sized MSPs / IT teams",
        "Oversubscribed seed; Top Down Ventures + York IE",
      ]),
      fitScore: 37,
      intentScore: 31,
      fitDetails: JSON.stringify({
        industry_match_FS_Tech: 8,
        stage_size_growth: 8,
        clear_B2B_buyer_sales_motion: 9,
        proof_assets_customers_data: 6,
        budget_5k_25k_per_month: 6,
      }),
      intentDetails: JSON.stringify({
        trigger_launch_raise_rebrand_expansion: 13,
        timeline_to_start_0_30_days: 6,
        decision_maker_engaged: 5,
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
        "Right-sized seed with a clear vertical B2B buyer (mid-sized MSPs) and a differentiated niche in a crowded AI space. Earlier stage = thinner proof assets and a seed-scale budget, but the funding moment + Miami-ecosystem angle support a launch sprint + thought-leadership build. Top Down Ventures has appeared as an investor in prior reports. Website best-effort — verify.",
      source: "Daily Scrape 2026-06-09 (Tech Startups VC roundup)",
      lastActivity: "$7M seed announced 2026-06-08",
    },
    contacts: [],
    scrape: {
      url: SOURCE_URL,
      source: "news_funding",
      matchedSignals: JSON.stringify([
        "seed_7m_top_down_ventures_york_ie_2026_06_08",
        "oversubscribed_round",
        "ai_knowledge_os_for_msps_it_teams",
        "early_stage_narrative_building_window",
      ]),
    },
  },

  // ─── 5. Reset — pr-marketing (combined 67, B) ───
  {
    company: {
      name: "Reset",
      website: "",
      pipeline: "pr-marketing",
      industry:
        "Fintech / earned-wage access — embedded on-demand pay platform letting credit-union and community-bank members access earned wages before payday",
      size: "Seed; ~$8M total",
      location: "Menlo Park, California, USA",
      fundingStage:
        "$6M seed (~$8M total), announced 2026-06-08, anchored by its own credit-union customers (Georgia's Own CU, InTouch CU, Chartway CU, VyStar CU, One Washington Financial, Curql Fund, Bankers Helping Bankers Fund).",
      techStack: JSON.stringify([
        "Embedded earned-wage-access platform",
        "Partners: credit unions + community banks",
        "Round anchored by its own customers (industry pull)",
        "Competes with DailyPay / Even",
      ]),
      fitScore: 38,
      intentScore: 29,
      fitDetails: JSON.stringify({
        industry_match_FS_Tech: 9,
        stage_size_growth: 7,
        clear_B2B_buyer_sales_motion: 9,
        proof_assets_customers_data: 8,
        budget_5k_25k_per_month: 5,
      }),
      intentDetails: JSON.stringify({
        trigger_launch_raise_rebrand_expansion: 13,
        timeline_to_start_0_30_days: 5,
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
        "Core fintech/FS fit with an unusually strong proof point: the round was anchored by its own credit-union customers (industry pull, not just VC conviction). Press-friendly story for community-banking/financial-wellness trades. Scored down on budget (seed-stage, competes with DailyPay/Even). Generic company name = website not confirmed (left blank); verify carefully before outreach.",
      source: "Daily Scrape 2026-06-09 (Tech Startups VC roundup)",
      lastActivity: "$6M seed announced 2026-06-08",
    },
    contacts: [],
    scrape: {
      url: SOURCE_URL,
      source: "news_funding",
      matchedSignals: JSON.stringify([
        "seed_6m_customer_anchored_2026_06_08",
        "credit_union_cooperatives_as_investors_and_customers",
        "embedded_earned_wage_access",
        "strong_market_pull_proof",
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
