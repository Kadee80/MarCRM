#!/usr/bin/env node
/**
 * Import leads from Daily Scrape 2026-06-08 (Monday)
 *
 * Usage:  cd MarCRM && node scripts/import-2026-06-08.cjs
 *
 * 6 new leads:
 *   1. Scotch    (pr-marketing,   combined 81, A)
 *   2. Suno      (pr-marketing,   combined 73, B)
 *   3. Sekai     (pr-marketing,   combined 72, B)
 *   4. Flourish  (pr-marketing,   combined 69, B)
 *   5. NewLimit  (pr-marketing,   combined 61, B)
 *   6. GeneFab   (legal-freelance, combined 56, C)
 *
 * - Deduplicates by company name (skips if already in DB).
 * - Creates Company + Contact records and a ScrapeResult per lead.
 * - Enhanced freelance fields (vertical, subvertical, engagementModel,
 *   buyerType, compensationText, remoteFlag, employmentTypeRaw,
 *   urgencyScore) are populated for GeneFab (legal-freelance); empty/0
 *   for the pr-marketing leads.
 *
 * NOTE: Websites for Scotch/Sekai/NewLimit are best-effort; Flourish has
 * no confirmed website yet (left blank). Verify before outreach.
 *
 * NOTE: Neon DB is unreachable from the Cowork sandbox, so this script
 * must be run from Katie's local machine where DATABASE_URL points to
 * the Neon production instance.
 */

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const LEADS = [
  // ─── 1. Scotch — pr-marketing (combined 81, A) ───
  {
    company: {
      name: "Scotch",
      website: "https://www.scotch.com",
      pipeline: "pr-marketing",
      industry:
        "Retail fintech / AI-native operating system for liquor retailers — POS hardware, custom software, payment processing, back-office + state-by-state regulatory compliance",
      size: "Series A; >500% YoY growth; surpassed $1B processed payment volume",
      location: "Denver, Colorado, USA",
      fundingStage:
        "$20M Series A on 2026-06-04 led by VMG Partners (First Round Capital, Lerer Hippeau, Toba Capital). Step-up from $10M seed (2024).",
      techStack: JSON.stringify([
        "AI-native OS for liquor stores",
        "POS hardware + custom software + payment processing",
        "Back-office suite for state-by-state regulatory compliance",
        ">500% YoY growth; $1B+ processed payment volume",
        "CTO Dan Chen = ex-Drizly chief architect (Drizly acq. by Uber $1B+)",
      ]),
      fitScore: 47,
      intentScore: 34,
      fitDetails: JSON.stringify({
        industry_match_FS_Tech: 9,
        stage_size_growth: 10,
        clear_B2B_buyer_sales_motion: 10,
        proof_assets_customers_data: 10,
        budget_5k_25k_per_month: 8,
      }),
      intentDetails: JSON.stringify({
        trigger_launch_raise_rebrand_expansion: 14,
        timeline_to_start_0_30_days: 7,
        decision_maker_engaged: 5,
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
        "Best-fit pr-marketing lead today. Right-sized Series A (not a mega-round), clean vertical-SaaS sales motion, real proof assets ($1B volume, 500% growth, ex-Drizly CTO). Twin trigger (raise + $1B milestone) = product/category-narrative + earned-media need. Vertical-SaaS-disrupts-legacy-industry angle is press-friendly. Website best-effort — verify before outreach.",
      source: "Daily Scrape 2026-06-08 (Crunchbase News exclusive)",
      lastActivity: "$20M Series A announced 2026-06-04",
    },
    contacts: [
      { name: "Jake Bolling", title: "Co-founder & CEO", email: "", linkedin: "" },
      { name: "Kevin Hodges", title: "Co-founder", email: "", linkedin: "" },
      { name: "Dan Chen", title: "CTO (ex-Drizly chief architect)", email: "", linkedin: "" },
    ],
    scrape: {
      url: "https://news.crunchbase.com/venture/scotch-raises-ai-funding-liquor-retail-tech/",
      source: "news_funding",
      matchedSignals: JSON.stringify([
        "series_a_20m_vmg_partners_2026_06_04",
        "500_pct_yoy_growth",
        "1b_payment_volume_milestone",
        "step_up_from_10m_seed_2024",
        "ex_drizly_cto_credibility",
      ]),
    },
  },

  // ─── 2. Suno — pr-marketing (combined 73, B) ───
  {
    company: {
      name: "Suno",
      website: "https://www.suno.com",
      pipeline: "pr-marketing",
      industry: "Generative AI for music creation (consumer + licensing)",
      size: "Series D; $5.4B valuation",
      location: "Cambridge, Massachusetts, USA",
      fundingStage:
        "$400M Series D on 2026-06-05 led by Bond at a $5.4B valuation.",
      techStack: JSON.stringify([
        "Generative AI music model",
        "Consumer creation app + licensing",
        "Active copyright litigation from multiple music labels",
      ]),
      fitScore: 36,
      intentScore: 37,
      fitDetails: JSON.stringify({
        industry_match_FS_Tech: 9,
        stage_size_growth: 5,
        clear_B2B_buyer_sales_motion: 6,
        proof_assets_customers_data: 10,
        budget_5k_25k_per_month: 6,
      }),
      intentDetails: JSON.stringify({
        trigger_launch_raise_rebrand_expansion: 15,
        timeline_to_start_0_30_days: 7,
        decision_maker_engaged: 4,
        urgency_pain_reputation_pipeline: 9,
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
        "Routed pr-marketing (business-event/crisis client need, NOT a job posting). Lower fit on size/budget (large, likely has in-house comms + incumbent agency), but the intent signal is the litigation: multiple music-label copyright suits = live reputation/narrative pain alongside a fresh raise. Pitch = crisis/narrative advisory or specialist overflow, not a generic retainer. Decision-maker access is the gating risk.",
      source: "Daily Scrape 2026-06-08 (Crunchbase News)",
      lastActivity: "$400M Series D announced 2026-06-05; active label litigation",
    },
    contacts: [],
    scrape: {
      url: "https://news.crunchbase.com/venture/biggest-funding-rounds-june-5-2026/",
      source: "news_funding",
      matchedSignals: JSON.stringify([
        "series_d_400m_bond_2026_06_05",
        "valuation_5_4b",
        "active_litigation_multiple_music_labels_copyright",
        "crisis_reputation_window_open",
      ]),
    },
  },

  // ─── 3. Sekai — pr-marketing (combined 72, B) ───
  {
    company: {
      name: "Sekai",
      website: "https://www.sekai.com",
      pipeline: "pr-marketing",
      industry:
        "Consumer AI — TikTok-style feed of user-generated, prompt-built mini-apps; AI coding agents turn plain language into playable apps",
      size: "Series A; 15M mini-apps created, 200k/day, 1hr+ daily engagement",
      location: "San Francisco, California, USA",
      fundingStage:
        "$20M Series A (announced ~2026-06-02/03) co-led by Khosla Ventures and Connect Ventures; a16z (Speedrun), Mayfield, A*, MVP Ventures, 359 Capital, Parable VC, 645 Capital. ~$26-30M total raised.",
      techStack: JSON.stringify([
        "AI coding agents: text prompt -> playable mini-app",
        "TikTok-style discovery feed of user-generated apps",
        "15M apps created; 200k new/day; 1hr+ daily use",
        "Khosla + a16z + Mayfield + A* syndicate",
      ]),
      fitScore: 41,
      intentScore: 31,
      fitDetails: JSON.stringify({
        industry_match_FS_Tech: 8,
        stage_size_growth: 10,
        clear_B2B_buyer_sales_motion: 6,
        proof_assets_customers_data: 9,
        budget_5k_25k_per_month: 8,
      }),
      intentDetails: JSON.stringify({
        trigger_launch_raise_rebrand_expansion: 13,
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
        "Right-sized Series A with strong traction metrics and tier-1 VCs (Khosla, a16z). Consumer-app sales motion is weaker for a B2B-style PR retainer, but the growth-story + funding trigger supports a product/earned-media launch sprint. Website best-effort — verify.",
      source: "Daily Scrape 2026-06-08 (Crunchbase / Cryptobriefing / company PR)",
      lastActivity: "$20M Series A announced ~2026-06-02",
    },
    contacts: [],
    scrape: {
      url: "https://cryptobriefing.com/sekai-raises-20m-series-a-ai-apps/",
      source: "news_funding",
      matchedSignals: JSON.stringify([
        "series_a_20m_khosla_connect_2026_06_02",
        "total_raised_26m_plus",
        "15m_mini_apps_created",
        "200k_new_apps_per_day",
        "1hr_plus_daily_engagement",
      ]),
    },
  },

  // ─── 4. Flourish — pr-marketing (combined 69, B) ───
  {
    company: {
      name: "Flourish",
      website: "",
      pipeline: "pr-marketing",
      industry:
        "Foundational AI — artificial intelligence models inspired by the human brain (frontier research lab)",
      size: "Newly emerged; $500M debut funding",
      location: "New York, New York, USA",
      fundingStage:
        "$500M initial funding announced 2026-06-05. Backers include Jeff Bezos, Lux Capital, and Google Ventures.",
      techStack: JSON.stringify([
        "Brain-inspired foundational AI models",
        "Frontier research lab, newly emerged",
        "Backers: Jeff Bezos, Lux Capital, Google Ventures",
      ]),
      fitScore: 36,
      intentScore: 33,
      fitDetails: JSON.stringify({
        industry_match_FS_Tech: 9,
        stage_size_growth: 7,
        clear_B2B_buyer_sales_motion: 4,
        proof_assets_customers_data: 9,
        budget_5k_25k_per_month: 7,
      }),
      intentDetails: JSON.stringify({
        trigger_launch_raise_rebrand_expansion: 14,
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
      starred: false,
      notes:
        "Newly-emerged frontier AI lab with a $500M debut and a marquee backer list (Bezos). No product yet = weak B2B sales motion, but the moment-of-emergence is exactly when narrative/positioning advisory has leverage. Realistically may staff an in-house comms lead fast; window is narrow. No verified website yet — confirm before any outreach.",
      source: "Daily Scrape 2026-06-08 (Crunchbase News)",
      lastActivity: "$500M debut funding announced 2026-06-05",
    },
    contacts: [
      { name: "Jeff Bezos", title: "Investor", email: "", linkedin: "" },
    ],
    scrape: {
      url: "https://news.crunchbase.com/venture/biggest-funding-rounds-june-5-2026/",
      source: "news_funding",
      matchedSignals: JSON.stringify([
        "initial_funding_500m_2026_06_05",
        "backers_bezos_lux_capital_google_ventures",
        "newly_emerged_frontier_ai_lab",
        "narrative_defining_moment",
      ]),
    },
  },

  // ─── 5. NewLimit — pr-marketing (combined 61, B) ───
  {
    company: {
      name: "NewLimit",
      website: "https://www.newlimit.com",
      pipeline: "pr-marketing",
      industry:
        "Longevity biotech — medicines to restore youthful cell function via epigenetic reprogramming",
      size: "Series C; research-stage",
      location: "South San Francisco, California, USA",
      fundingStage:
        "$435M Series C on 2026-06-05 led by Founders Fund. Co-founded by Coinbase CEO Brian Armstrong.",
      techStack: JSON.stringify([
        "Epigenetic reprogramming therapeutics",
        "Research-stage; no commercial product yet",
        "Co-founder: Brian Armstrong (Coinbase CEO)",
        "Lead investor: Founders Fund",
      ]),
      fitScore: 32,
      intentScore: 29,
      fitDetails: JSON.stringify({
        industry_match_FS_Tech: 6,
        stage_size_growth: 6,
        clear_B2B_buyer_sales_motion: 4,
        proof_assets_customers_data: 9,
        budget_5k_25k_per_month: 7,
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
        "Weakest fit of today's pr-marketing set — research-stage biotech, no commercial product/sales motion, core sector outside FS/Tech. Included because the Armstrong halo + Founders Fund raise make it a credibility-sensitive earned-media / thought-leadership story. Likely uses a specialist biotech/health IR-PR shop; treat as a stretch, low-priority touch.",
      source: "Daily Scrape 2026-06-08 (Crunchbase News)",
      lastActivity: "$435M Series C announced 2026-06-05",
    },
    contacts: [
      { name: "Brian Armstrong", title: "Co-founder (Coinbase CEO)", email: "", linkedin: "" },
    ],
    scrape: {
      url: "https://news.crunchbase.com/venture/biggest-funding-rounds-june-5-2026/",
      source: "news_funding",
      matchedSignals: JSON.stringify([
        "series_c_435m_founders_fund_2026_06_05",
        "cofounder_brian_armstrong_coinbase",
        "longevity_epigenetic_reprogramming",
        "credibility_sensitive_science_story",
      ]),
    },
  },

  // ─── 6. GeneFab — legal-freelance (combined 56, C) ───
  {
    company: {
      name: "GeneFab",
      website: "",
      pipeline: "legal-freelance",
      industry: "Biotech CDMO (contract development & manufacturing organization)",
      size: "",
      location: "San Francisco, California, USA",
      fundingStage: "",
      techStack: JSON.stringify([
        "Hiring: Fractional Corporate Counsel / Senior Contracts Attorney",
        "Workstream: commercial / manufacturing-supply contracts (CDMO)",
        "Source: GoInhouse direct-apply listing",
      ]),
      fitScore: 20,
      intentScore: 36,
      fitDetails: JSON.stringify({
        fund_private_funds_formation: 0,
        corporate_commercial_contracts_ma_financing_securities: 10,
        seniority_counsel_gc: 10,
        comp_stated_market_credible: 0,
      }),
      intentDetails: JSON.stringify({
        engagement_model_fractional_interim_contract_freelance_consultant: 15,
        remote_or_hybrid_flex: 8,
        posted_within_72h: 5,
        easy_apply_or_direct_contact: 8,
      }),
      vertical: "legal",
      subvertical: "contracts",
      engagementModel: "fractional",
      buyerType: "operating-company",
      compensationText: "",
      remoteFlag: "hybrid",
      employmentTypeRaw: "Fractional Corporate Counsel / Senior Contracts Attorney",
      urgencyScore: 55,
      starred: false,
      notes:
        "Legal-freelance (NOT legal-consulting): explicit fractional engagement + commercial-contracts workstream (CDMO supply/manufacturing agreements). No fund/private-funds work and comp not stated, so Fit is modest; Intent carries it on the fractional model + direct-apply path. Confirm posting recency and whether remote is allowed before pitching Mark as the fractional alternative to a full-time hire.",
      source: "Daily Scrape 2026-06-08 (GoInhouse.com)",
      lastActivity: "Fractional corporate counsel posting (recency TBD)",
    },
    contacts: [],
    scrape: {
      url: "https://www.goinhouse.com/jobs/538461158-fractional-corporate-counsel-senior-contracts-attorney-cdmo-at-genefab",
      source: "job_board",
      matchedSignals: JSON.stringify([
        "fractional_corporate_counsel_posting",
        "commercial_contracts_workstream_cdmo_supply_agreements",
        "senior_attorney_seniority",
        "goinhouse_direct_apply",
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
