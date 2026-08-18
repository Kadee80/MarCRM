#!/usr/bin/env node
/**
 * Import leads from Daily Scrape 2026-05-27 (Wednesday)
 *
 * Usage:  cd MarCRM && node scripts/import-2026-05-27.cjs
 *
 * - 5 new leads (all combined ≥ 70):
 *     1. OpenRouter                (pr-marketing,   combined 80, A)
 *     2. Stord                     (pr-marketing,   combined 85, A)
 *     3. Brooklyn Fi               (pr-marketing,   combined 85, A)
 *     4. Bluespring Wealth Partners (pr-marketing,  combined 70, B)
 *     5. Multiverse (Head of Comms US) (pr-freelance, combined 70, B)
 *
 * - Deduplicates by company name (skips if already in DB).
 * - Creates Company + Contact records and a ScrapeResult per lead.
 * - Enhanced freelance fields (vertical, subvertical, engagementModel,
 *   buyerType, compensationText, remoteFlag, employmentTypeRaw,
 *   urgencyScore) populated for the Multiverse pr-freelance lead; empty/0
 *   for the agency-pipeline leads.
 *
 * NOTE: Neon DB is unreachable from the Cowork sandbox, so this script
 * must be run from Katie's local machine where DATABASE_URL points to
 * the Neon production instance.
 */

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const LEADS = [
  // ─── 1. OpenRouter — pr-marketing (combined 80, A) ───
  {
    company: {
      name: "OpenRouter",
      website: "https://openrouter.ai",
      pipeline: "pr-marketing",
      industry:
        "AI infrastructure / model routing — exchange layer between applications and 400+ AI providers (Anthropic, Google, OpenAI, xAI, DeepSeek); manages and optimizes inference across providers; control plane for enterprise multi-model deployment",
      size: "Series B / growth-stage; 8M+ global users; 25T tokens/week (~100T/month); valuation $1.3B post-money",
      location: "San Francisco, CA",
      fundingStage:
        "Series B — $113M led by CapitalG (Alphabet's growth fund), announced 2026-05-26. Participants: NVentures (NVIDIA VC), ServiceNow Ventures, MongoDB Ventures, Snowflake Ventures, Databricks Ventures, alongside existing investors Andreessen Horowitz and Menlo Ventures. Valuation more than doubled to ~$1.3B inside a year.",
      techStack: JSON.stringify([
        "multi-model AI inference routing platform",
        "400+ models supported (Anthropic, Google, OpenAI, xAI, DeepSeek)",
        "25T tokens per week (5x growth in 6 months)",
        "8M+ global users including enterprise + AI-native startups",
        "use of funds: routing, governance, optimization for production AI",
        "CEO: Alex Atallah",
      ]),
      fitScore: 40,
      intentScore: 40,
      fitDetails: JSON.stringify({
        industry_match_FS_Tech: 10,
        stage_size_growth: 10,
        clear_B2B_buyer_sales_motion: 10,
        proof_assets_customers_data: 5,
        budget_5k_25k_per_month: 5,
      }),
      intentDetails: JSON.stringify({
        trigger_launch_raise_rebrand_expansion: 15,
        timeline_to_start_0_30_days: 10,
        decision_maker_engaged: 10,
        urgency_pain_reputation_pipeline: 5,
        responsiveness: 0,
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
        "Strongest agency-pipeline NEW lead of the day (combined 80, A). Two-day-old $113M Series B from CapitalG with a who's-who corporate-VC syndicate (NVIDIA, ServiceNow, MongoDB, Snowflake, Databricks). Launch-comms window is wide open. Caveat: OpenRouter is AI-infra not FS/tech, so industry fit is a small stretch. Pitch a 90-day post-raise comms sprint anchored on the multi-model 'control plane' narrative + the enterprise governance use-case story for the corporate VCs. Decision-maker: CEO Alex Atallah (quoted publicly in BusinessWire release).",
      source:
        "Daily Scrape 2026-05-27 (TechCrunch; Yahoo Finance/BusinessWire; finsmes; Menlo Ventures perspective post)",
      lastActivity:
        "Series B $113M CapitalG-led announced 2026-05-26; valuation now $1.3B",
    },
    contacts: [
      {
        name: "Alex Atallah",
        title: "Co-Founder & CEO, OpenRouter",
        persona: "Founder/CEO",
        decisionMaker: true,
      },
    ],
    scrape: {
      url: "https://techcrunch.com/2026/05/26/openrouter-more-than-doubles-valuation-to-1-3b-in-a-year/",
      source: "news_funding",
      matchedSignals: JSON.stringify([
        "series_b_113m_capitalg_led_2026_05_26",
        "valuation_doubled_to_1_3b_in_one_year",
        "25t_tokens_per_week_5x_growth_in_6_months",
        "corporate_vc_syndicate_nvidia_servicenow_mongo_snowflake_databricks",
        "ceo_alex_atallah_publicly_quoted",
        "narrative_window_open_first_30_days",
      ]),
    },
  },

  // ─── 2. Stord — pr-marketing (combined 85, A) ───
  {
    company: {
      name: "Stord",
      website: "https://www.stord.com",
      pipeline: "pr-marketing",
      industry:
        "Commerce infrastructure / AI-powered fulfillment — software + 100-facility fulfillment network, robotics, physical AI; positioned as physical-intelligence layer for brands competing outside Amazon's ecosystem",
      size: "Series F / mature growth-stage; ~$3B post-money valuation; $15B annual GMV; 8B data points/year",
      location: "Atlanta, GA (HQ); 100 facilities",
      fundingStage:
        "Series F — $250M at $3B valuation, announced 2026-05-26. Existing investors: Strike Capital, Kleiner Perkins, Founders Fund, Franklin Templeton, Baillie Gifford, G Squared, Bond, Lux. Up from $1.5B in May 2025 Series E ($200M). Total raised $775M+ since 2015.",
      techStack: JSON.stringify([
        "AI-native fulfillment software + 100-facility physical network",
        "Stord Labs (robotics + physical-AI environment in Atlanta)",
        "training models on live fulfillment data — $15B annual GMV, 8B data points/year",
        "software business tripled in 2025; new bookings doubled QoQ in Q1 2026",
        "challenger to Amazon's fulfillment ecosystem narrative",
        "founder: Sean Henry",
      ]),
      fitScore: 45,
      intentScore: 40,
      fitDetails: JSON.stringify({
        industry_match_FS_Tech: 10,
        stage_size_growth: 10,
        clear_B2B_buyer_sales_motion: 10,
        proof_assets_customers_data: 5,
        budget_5k_25k_per_month: 10,
      }),
      intentDetails: JSON.stringify({
        trigger_launch_raise_rebrand_expansion: 15,
        timeline_to_start_0_30_days: 10,
        decision_maker_engaged: 10,
        urgency_pain_reputation_pipeline: 5,
        responsiveness: 0,
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
        "Tied for highest combined score of the day (85, A). $250M Series F at $3B + Stord Labs sub-brand launched same day. Stord almost certainly already has a PR firm (Series F, 10+ years old, well-known investor base) — pitch surface is narrower than OpenRouter's. Recommended posture: research current PR firm FIRST to avoid stepping on a sitting agency; if Stord has no robotics-vertical specialist comms partner, pitch a Stord Labs-only retainer rather than a full-account play. Lower outreach urgency than OpenRouter or Brooklyn Fi for that reason.",
      source:
        "Daily Scrape 2026-05-27 (PRNewswire; TechCrunch; FreightWaves; PYMNTS; Tech Startups)",
      lastActivity:
        "Series F $250M at $3B valuation announced 2026-05-26 + Stord Labs initiative launched same day",
    },
    contacts: [],
    scrape: {
      url: "https://www.prnewswire.com/news-releases/stord-raises-250m-series-f-at-3b-to-advance-the-physical-intelligence-layer-for-commerce-302780681.html",
      source: "news_funding",
      matchedSignals: JSON.stringify([
        "series_f_250m_at_3b_valuation_2026_05_26",
        "valuation_doubled_from_1_5b_2025_to_3b_2026",
        "stord_labs_robotics_physical_ai_sub_brand_launched_same_day",
        "software_business_tripled_in_2025",
        "challenger_to_amazon_narrative",
        "research_incumbent_pr_firm_before_pitching",
      ]),
    },
  },

  // ─── 3. Brooklyn Fi — pr-marketing (combined 85, A) ───
  {
    company: {
      name: "Brooklyn Fi",
      website: "https://www.brooklynfi.com",
      pipeline: "pr-marketing",
      industry:
        "Wealth management / Registered Investment Advisor — category-defining advisory firm for clients with complex equity compensation (tech employees, founders, creatives navigating IPOs, acquisitions, tender offers, secondaries, business sales)",
      size: "Growing RIA (specific AUM not publicly disclosed); post-strategic-investment from AWP",
      location: "Brooklyn, NY",
      fundingStage:
        "Strategic minority investment from Accelerated Wealth Partners (AWP) announced 2026-05-21. Growth capital + access to AWP's organic-growth and M&A capabilities. Founders Ally Jane (AJ) Ayers and Shane Mason retain operational control.",
      techStack: JSON.stringify([
        "equity-compensation-focused RIA",
        "proprietary equity compensation planning technology",
        "distinctive brand in independent wealth management",
        "client base: tech employees, founders, creatives — IPO/secondary cycle overlap",
        "founders publicly active and brand-forward",
        "AWP strategic minority investor (May 2026)",
      ]),
      fitScore: 45,
      intentScore: 40,
      fitDetails: JSON.stringify({
        industry_match_FS_Tech: 10,
        stage_size_growth: 8,
        clear_B2B_buyer_sales_motion: 10,
        proof_assets_customers_data: 10,
        budget_5k_25k_per_month: 7,
      }),
      intentDetails: JSON.stringify({
        trigger_launch_raise_rebrand_expansion: 15,
        timeline_to_start_0_30_days: 10,
        decision_maker_engaged: 10,
        urgency_pain_reputation_pipeline: 5,
        responsiveness: 0,
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
        "Tied for highest combined score (85, A) and arguably the most pitchable lead. Brooklyn Fi has explicit brand-defining ambition (press language uses 'category defining' and 'definitive wealth manager for the equity compensation era'), founders who care about brand, fresh growth capital, and a hot niche (equity-comp planning for tech IPO/secondary cycles). Recommended posture: founder-to-founder outreach to AJ Ayers within 5 business days; pitch a category-leadership program (thought leadership, exec comms, earned media) rather than transactional product PR. Caveats: smaller firm so budget likely lower end of $5-25k/mo band; AWP relationship may bring a sister-firm PR partner — check AWP's portfolio before pitching.",
      source:
        "Daily Scrape 2026-05-27 (GlobeNewswire via Manila Times; Yahoo Finance Singapore; Eagle Tribune; AWP press release)",
      lastActivity:
        "Accelerated Wealth Partners strategic minority investment announced 2026-05-21",
    },
    contacts: [
      {
        name: "Ally Jane (AJ) Ayers",
        title: "Co-Founder, Brooklyn Fi",
        persona: "Founder",
        decisionMaker: true,
      },
      {
        name: "Shane Mason",
        title: "Co-Founder, Brooklyn Fi",
        persona: "Founder",
        decisionMaker: true,
      },
    ],
    scrape: {
      url: "https://www.manilatimes.net/2026/05/21/tmt-newswire/globenewswire/accelerated-wealth-partners-makes-strategic-minority-investment-in-brooklyn-fi-to-build-the-definitive-wealth-manager-for-the-equity-compensation-era/2349414",
      source: "news_strategic_investment",
      matchedSignals: JSON.stringify([
        "awp_strategic_minority_investment_2026_05_21",
        "explicit_category_definition_language_equity_compensation_era",
        "growth_capital_for_advisor_bench_and_proprietary_tech",
        "founders_retain_operational_control",
        "founder_to_founder_outreach_shape_for_marcrm",
        "check_awp_portfolio_for_sister_pr_firm",
      ]),
    },
  },

  // ─── 4. Bluespring Wealth Partners — pr-marketing (combined 70, B) ───
  {
    company: {
      name: "Bluespring Wealth Partners",
      website: "https://bluespringwealthpartners.com",
      pipeline: "pr-marketing",
      industry:
        "RIA aggregator / wealth-management roll-up platform — Kestra Financial subsidiary, majority-owned by Stone Point Capital (since 2024)",
      size: "Mature roll-up platform; $6B+ AUM acquired in 2025; 5 acquisitions in 2026 YTD",
      location: "Austin, TX (HQ); national M&A footprint",
      fundingStage:
        "Latest M&A: acquired Synthesis Wealth Planning (Morristown, NJ; $1.1B combined AUM with IFG Wealth Strategies), announced 2026-05-20. 5th 2026 acquisition. Stone Point Capital majority-owner since 2024.",
      techStack: JSON.stringify([
        "RIA aggregator / roll-up platform",
        "Kestra Financial subsidiary",
        "Stone Point Capital majority investor (2024)",
        "9 acquisitions in 2025 totaling $6B+ AUM",
        "5 acquisitions in 2026 YTD",
        "industry backdrop: 142 RIA M&A deals / $1.67T AUM in Q1 2026 alone",
      ]),
      fitScore: 35,
      intentScore: 35,
      fitDetails: JSON.stringify({
        industry_match_FS_Tech: 10,
        stage_size_growth: 10,
        clear_B2B_buyer_sales_motion: 5,
        proof_assets_customers_data: 5,
        budget_5k_25k_per_month: 5,
      }),
      intentDetails: JSON.stringify({
        trigger_launch_raise_rebrand_expansion: 15,
        timeline_to_start_0_30_days: 10,
        decision_maker_engaged: 5,
        urgency_pain_reputation_pipeline: 5,
        responsiveness: 0,
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
        "B grade (combined 70). Bluespring is the lead, not Synthesis — Bluespring drives the press cadence and has the budget. Almost certainly has an established PR firm given deal cadence (Kestra + Stone Point). Pitch angle is narrow: 'per-acquisition local-market integration story' as a project rate rather than a retainer. Research the existing PR firm via Kestra's press archive first. Lower priority than Brooklyn Fi or OpenRouter for outreach this week.",
      source:
        "Daily Scrape 2026-05-27 (InvestmentNews; WealthManagement.com; AltsWire; Connect Money; PRNewswire)",
      lastActivity:
        "Synthesis Wealth Planning ($1.1B AUM) acquisition announced 2026-05-20 — 5th 2026 deal",
    },
    contacts: [],
    scrape: {
      url: "https://www.investmentnews.com/ria-news/bluespring-wealth-snaps-up-11b-new-jersey-ria-in-fifth-deal-of-2026/266663",
      source: "news_ma",
      matchedSignals: JSON.stringify([
        "synthesis_wealth_planning_acquisition_2026_05_20",
        "fifth_2026_acquisition",
        "9_deals_2025_6b_aum",
        "stone_point_pe_majority_2024",
        "kestra_financial_parent",
        "ria_ma_record_q1_2026_142_deals",
      ]),
    },
  },

  // ─── 5. Multiverse — Head of Communications (US) — pr-freelance (combined 70, B) ───
  {
    company: {
      name: "Multiverse — Head of Communications (US, first US comms hire)",
      website: "https://www.multiverse.io",
      pipeline: "pr-freelance",
      industry:
        "EdTech / professional apprenticeships — apprenticeship-as-a-service platform partnering with employers to build AI and digital skills pipelines via apprentices",
      size: "Mature growth-stage EdTech; hiring surge ongoing per May 2026 ETIH EdTech News coverage",
      location: "New York, NY (Greater NYC Area) — first US comms hire",
      fundingStage:
        "n/a — this is an employer-side pr-freelance opportunity (job posting, not a funding trigger)",
      techStack: JSON.stringify([
        "first US communications hire — explicit in JD",
        "reports into UK-based Director of Comms and Public Affairs",
        "compensation: $130k-$160k base + bonus",
        "BuiltIn NYC and Ladders listings active",
        "Multiverse is scaling US workforce on AI-skills demand",
      ]),
      fitScore: 35,
      intentScore: 35,
      fitDetails: JSON.stringify({
        PR_comms_media_relations_clearly_stated: 20,
        sector_fit_finance_PE_VC_B2B_fintech_asset_management: 5,
        workstream_exec_comms_thought_leadership_earned_media_IR: 10,
        agency_overflow_white_label_immediate_need: 0,
      }),
      intentDetails: JSON.stringify({
        engagement_model_freelance_contract_retainer_fractional: 5,
        remote_flexible_part_time: 10,
        posted_within_72h: 5,
        urgency_signals_immediate_need_asap_overflow_backfill: 10,
        easy_apply_direct_email_contact_path: 5,
      }),
      vertical: "pr",
      subvertical: "comms",
      engagementModel: "fractional",
      buyerType: "operating-company",
      compensationText:
        "$130,000 - $160,000 base + bonus (per BuiltIn NYC + Ladders for the FT role; freelance pitch is fractional advisory before they close the FT search)",
      remoteFlag: "hybrid",
      employmentTypeRaw: "Full-time (Greater NYC Area, NY)",
      urgencyScore: 65,
      starred: false,
      notes:
        "Classic first-PR-hire pitch — ICP intent signal #1. Pitch posture: 'You're building from scratch — let me run the function for the first 90 days while you complete the FT search, and hand it off to whoever you hire.' Caveats: (a) role reports into a UK-based Director, so any freelance arrangement needs UK sign-off; (b) EdTech is not Mark's strongest vertical (no PE/VC/fintech overlap), so lead with 'pre-comms function' track record not FS-vertical track record. Lower combined fit than agency-pipeline leads but clean freelance-pitch shape.",
      source:
        "Daily Scrape 2026-05-27 (LinkedIn job posting; BuiltIn NYC; Ladders; Multiverse careers page; ETIH EdTech News on hiring surge)",
      lastActivity:
        "Head of Communications (US, first US comms hire) posting active on BuiltIn NYC + Ladders + LinkedIn",
    },
    contacts: [],
    scrape: {
      url: "https://www.builtinnyc.com/job/marketing/head-communications/206390",
      source: "job_board_freelance",
      matchedSignals: JSON.stringify([
        "first_us_communications_hire_explicit_in_jd",
        "icp_intent_signal_1_first_pr_hire",
        "reports_into_uk_director_of_comms_and_public_affairs",
        "compensation_130_160_base_plus_bonus",
        "ai_skills_demand_hiring_surge_etih_coverage",
        "edtech_b2b_partial_sector_fit",
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
