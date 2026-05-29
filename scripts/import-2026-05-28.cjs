#!/usr/bin/env node
/**
 * Import leads from Daily Scrape 2026-05-28 (Thursday)
 *
 * Usage:  cd MarCRM && node scripts/import-2026-05-28.cjs
 *
 * - 9 new leads (all combined ≥ 60):
 *     1. Cognition AI              (pr-marketing,    combined 100, A)
 *     2. Jump                      (pr-marketing,    combined 100, A)
 *     3. Threadline Wealth         (pr-marketing,    combined 100, A)
 *     4. Awani Capital Management  (fund-formation,  combined 95,  A)
 *     5. Letter AI                 (pr-marketing,    combined 95,  A)
 *     6. RemotePass                (pr-marketing,    combined 85,  A/B)
 *     7. Trustyfy (Head of Comms)  (pr-freelance,    combined 75,  B)
 *     8. Sleep Doctor (Fractional GC) (legal-freelance, combined 65, B)
 *     9. Coinbase Base (Head of Comms) (pr-freelance, combined 60, B)
 *
 * - Deduplicates by company name (skips if already in DB).
 * - Creates Company + Contact records and a ScrapeResult per lead.
 * - Enhanced freelance fields (vertical, subvertical, engagementModel,
 *   buyerType, compensationText, remoteFlag, employmentTypeRaw,
 *   urgencyScore) populated for the freelance pipeline leads; empty/0
 *   for the agency-pipeline leads.
 *
 * NOTE: Neon DB is unreachable from the Cowork sandbox, so this script
 * must be run from Katie's local machine where DATABASE_URL points to
 * the Neon production instance.
 */

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const LEADS = [
  // ─── 1. Cognition AI — pr-marketing (combined 100, A) ───
  {
    company: {
      name: "Cognition AI",
      website: "https://cognition.ai",
      pipeline: "pr-marketing",
      industry:
        "Enterprise AI / autonomous software engineering — maker of Devin, the AI coding agent; competes with Cursor/Anysphere and developer-tools incumbents in the agentic-coding category",
      size: "Late-stage growth; $492M ARR run-rate; enterprise usage up 10x YTD 2026; valuation $26B post-money",
      location: "San Francisco, CA",
      fundingStage:
        "$1B+ late-stage round at $26B post-money on 2026-05-27. Co-led by Lux Capital, General Catalyst, and 8VC. Participants: Ribbit Capital, Atreides Management, Founders Fund. Valuation 2.5x from $10.2B (Sept 2025).",
      techStack: JSON.stringify([
        "Devin — autonomous AI software engineer",
        "enterprise customers: Goldman Sachs, Citi, Mercedes-Benz, US Army, US Navy",
        "$492M ARR run-rate; enterprise usage 10x YTD 2026",
        "founder: Scott Wu (co-founder & CEO)",
      ]),
      fitScore: 50,
      intentScore: 50,
      fitDetails: JSON.stringify({
        industry_match_FS_Tech: 10,
        stage_size_growth: 10,
        clear_B2B_buyer_sales_motion: 10,
        proof_assets_customers_data: 10,
        budget_5k_25k_per_month: 10,
      }),
      intentDetails: JSON.stringify({
        trigger_launch_raise_rebrand_expansion: 15,
        timeline_to_start_0_30_days: 10,
        decision_maker_engaged: 10,
        urgency_pain_reputation_pipeline: 10,
        responsiveness: 5,
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
        "Highest combined score of the day (100, A). $1B+ raise at $26B on 2026-05-27 with marquee enterprise logos. Likely already has PR, but post-raise scope often expands. Pitch: 90-day vertical-narrative sprint focused on financial-services and defense customer storytelling (Goldman, Citi, US Army/Navy). Decision-maker: Scott Wu, CEO. Outreach via warm intro through Founders Fund / Lux portfolio network.",
      source:
        "Daily Scrape 2026-05-28 (TechCrunch; Bloomberg; SiliconANGLE; The AI Insider)",
      lastActivity:
        "$1B+ raise at $26B valuation announced 2026-05-27 (Lux / General Catalyst / 8VC co-led)",
    },
    contacts: [
      {
        name: "Scott Wu",
        title: "Co-founder & CEO, Cognition AI",
        persona: "Founder/CEO",
        decisionMaker: true,
      },
    ],
    scrape: {
      url: "https://techcrunch.com/2026/05/27/ai-coding-startup-cognition-raises-1b-at-25b-pre-money-valuation/",
      source: "news_funding",
      matchedSignals: JSON.stringify([
        "raise_1b_at_26b_2026_05_27",
        "valuation_2_5x_in_8_months_10_2b_to_26b",
        "enterprise_usage_up_10x_ytd_2026",
        "marquee_logos_goldman_citi_mercedes_us_army_navy",
        "arr_492m_run_rate",
        "narrative_window_open_first_30_days",
      ]),
    },
  },

  // ─── 2. Jump — pr-marketing (combined 100, A) ───
  {
    company: {
      name: "Jump",
      website: "https://jumpapp.com",
      pipeline: "pr-marketing",
      industry:
        "AI for financial advisors — meeting-notes / automation layer used by RIAs and wirehouse breakaways; competes with Pulse360, Zocks in the advisor-AI category",
      size: "Series B / growth-stage; Insight Partners-backed",
      location: "Salt Lake City, UT",
      fundingStage:
        "$80M Series B led by Insight Partners, announced May 2026. Insight typically pushes portfolio comms maturity post-investment.",
      techStack: JSON.stringify([
        "AI meeting notes + automation for financial advisors",
        "RIA and breakaway advisor distribution",
        "co-founders: Tim Chaves (CEO), Parker Ence",
      ]),
      fitScore: 50,
      intentScore: 50,
      fitDetails: JSON.stringify({
        industry_match_FS_Tech: 10,
        stage_size_growth: 10,
        clear_B2B_buyer_sales_motion: 10,
        proof_assets_customers_data: 10,
        budget_5k_25k_per_month: 10,
      }),
      intentDetails: JSON.stringify({
        trigger_launch_raise_rebrand_expansion: 15,
        timeline_to_start_0_30_days: 10,
        decision_maker_engaged: 10,
        urgency_pain_reputation_pipeline: 10,
        responsiveness: 5,
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
        "TOP-priority lead. Direct ICP fit (advisor-tech) + Mark's existing wealth-management network = high warm-intro probability. $80M Series B from Insight Partners means budget capacity and a portfolio-comms package opportunity. Pitch: post-Series-B category positioning sprint + Insight Onboarding Comms hook. Move within 7 days.",
      source: "Daily Scrape 2026-05-28 (Fundraise Insider; The SaaS News)",
      lastActivity:
        "$80M Series B led by Insight Partners announced May 2026",
    },
    contacts: [
      {
        name: "Tim Chaves",
        title: "Co-founder & CEO, Jump",
        persona: "Founder/CEO",
        decisionMaker: true,
      },
      {
        name: "Parker Ence",
        title: "Co-founder, Jump",
        persona: "Founder",
        decisionMaker: false,
      },
    ],
    scrape: {
      url: "https://fundraiseinsider.com/blog/series-b-startups/",
      source: "news_funding",
      matchedSignals: JSON.stringify([
        "series_b_80m_insight_partners_may_2026",
        "direct_advisor_tech_icp_fit",
        "insight_partners_portfolio_comms_hook",
        "wealth_management_network_warm_intro_path",
      ]),
    },
  },

  // ─── 3. Threadline Wealth — pr-marketing (combined 100, A) ───
  {
    company: {
      name: "Threadline Wealth",
      website: "https://threadlinewealth.com",
      pipeline: "pr-marketing",
      industry:
        "Independent RIA — spinoff from Moss Adams Wealth Advisors; ~$6B AUM at launch; PE-backed (Cynosure Group)",
      size: "$6B AUM at launch; spinoff sized for institutional positioning",
      location: "Seattle, WA region (Moss Adams successor — confirm exact HQ)",
      fundingStage:
        "Launched as independent RIA May 2026 with Cynosure Group PE funding and ~$6B AUM. Press cycle imminent / underway. Greenfield brand, zero existing agency relationship.",
      techStack: JSON.stringify([
        "spinoff from Moss Adams Wealth Advisors",
        "Cynosure Group PE backing",
        "$6B AUM at launch",
        "brand-new entity — no incumbent PR agency relationship",
      ]),
      fitScore: 50,
      intentScore: 50,
      fitDetails: JSON.stringify({
        industry_match_FS_Tech: 10,
        stage_size_growth: 10,
        clear_B2B_buyer_sales_motion: 10,
        proof_assets_customers_data: 10,
        budget_5k_25k_per_month: 10,
      }),
      intentDetails: JSON.stringify({
        trigger_launch_raise_rebrand_expansion: 15,
        timeline_to_start_0_30_days: 10,
        decision_maker_engaged: 10,
        urgency_pain_reputation_pipeline: 10,
        responsiveness: 5,
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
        "TOP-priority. Greenfield brand with PE money behind it and zero existing agency relationship in the new entity. Pitch: 90-day launch comms sprint + ongoing retainer for advisor recruitment narratives. Move within 5 days while press cycle is hot. Identify managing partner via firm About page before outreach.",
      source: "Daily Scrape 2026-05-28 (InvestmentNews)",
      lastActivity:
        "RIA launched May 2026 from Moss Adams Wealth Advisors with ~$6B AUM and Cynosure Group PE backing",
    },
    contacts: [],
    scrape: {
      url: "https://www.investmentnews.com/ria-news/threadline-wealth-ria-launches-from-moss-adams-breakaway-with-nearly-6b-aum/265788",
      source: "news_launch",
      matchedSignals: JSON.stringify([
        "ria_launch_may_2026_6b_aum",
        "moss_adams_spinoff",
        "cynosure_group_pe_backing",
        "greenfield_brand_no_incumbent_agency",
      ]),
    },
  },

  // ─── 4. Awani Capital Management — fund-formation (combined 95, A) ───
  {
    company: {
      name: "Awani Capital Management",
      website: "https://awanicapital.com",
      pipeline: "fund-formation",
      industry:
        "Lower-middle-market PE fund — Fund I emerging manager; founded by Daphne Dufresne (ex-RLJ Equity Partners)",
      size: "Fund I targeting $500M; ~$250M at first close (summer 2025)",
      location: "US (NY/DC region — confirm)",
      fundingStage:
        "Fund I targeting $500M; first close summer 2025 at ~$250M (50% to target); actively raising through 2026 H2.",
      techStack: JSON.stringify([
        "first-time PE manager — Fund I",
        "founder: Daphne Dufresne (ex-RLJ Equity Partners pedigree)",
        "raising $500M total; ~$250M closed",
        "active LP-cycling + side-letter workstream through 2026 H2",
      ]),
      fitScore: 50,
      intentScore: 45,
      fitDetails: JSON.stringify({
        manager_type_funds_I_to_III: 15,
        strategy_hedge_vc_pe_credit: 10,
        operational_readiness: 10,
        jurisdiction_complexity: 5,
        ability_to_pay: 10,
      }),
      intentDetails: JSON.stringify({
        seed_anchor_or_imminent_raise: 15,
        target_launch_window_defined: 10,
        providers_selected: 5,
        founder_urgency: 10,
        referral_source_strength: 5,
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
        "Excellent fund-formation fit. Emerging PE manager mid-raise. Pitch: ongoing fund-counsel support for remaining closes + side-letter negotiation + portfolio entity work. Cross-sell pr-marketing for diversity / first-time-manager narrative as a separate engagement. Direct outreach to Daphne Dufresne.",
      source:
        "Daily Scrape 2026-05-28 (With Intelligence — Private Equity Emerging Managers to Watch in 2026)",
      lastActivity:
        "First close summer 2025 at ~$250M; raise continues through 2026",
    },
    contacts: [
      {
        name: "Daphne Dufresne",
        title: "Founder & Managing Partner, Awani Capital Management",
        persona: "Founder/Managing Partner",
        decisionMaker: true,
      },
    ],
    scrape: {
      url: "https://www.withintelligence.com/insights/private-equity-emerging-managers-to-watch-in-2026/",
      source: "industry_report",
      matchedSignals: JSON.stringify([
        "fund_i_actively_raising_500m_target",
        "first_close_250m_summer_2025",
        "emerging_manager_with_institutional_pedigree_rlj",
        "diversity_focused_pe_narrative_cross_sell_pr",
        "ongoing_side_letter_workstream_through_2026_h2",
      ]),
    },
  },

  // ─── 5. Letter AI — pr-marketing (combined 95, A) ───
  {
    company: {
      name: "Letter AI",
      website: "https://letter.ai",
      pipeline: "pr-marketing",
      industry:
        "AI-native revenue enablement platform — competes with Highspot, Showpad, and Gong's enablement layer in the sales-enablement category",
      size: "Series B / growth-stage; Battery Ventures-backed",
      location: "Chicago, IL",
      fundingStage:
        "$40M Series B led by Battery Ventures with Y Combinator, Lightbank, and others, announced May 2026.",
      techStack: JSON.stringify([
        "AI-native revenue enablement",
        "Battery Ventures lead + YC + Lightbank syndicate",
        "category-creation positioning opportunity",
      ]),
      fitScore: 45,
      intentScore: 50,
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
        urgency_pain_reputation_pipeline: 10,
        responsiveness: 5,
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
        "Strong fit. Battery portfolio companies often retain boutique PR for category-creation narratives. Pitch: post-Series-B category-positioning sprint targeting Sales Enablement category-defining coverage in CRO Office / Forbes / WSJ. Confirm founder/CEO via team page before outreach.",
      source: "Daily Scrape 2026-05-28 (Fundraise Insider; The SaaS News)",
      lastActivity:
        "$40M Series B led by Battery Ventures announced May 2026",
    },
    contacts: [],
    scrape: {
      url: "https://fundraiseinsider.com/blog/series-b-startups/",
      source: "news_funding",
      matchedSignals: JSON.stringify([
        "series_b_40m_battery_ventures_may_2026",
        "ai_native_revenue_enablement",
        "category_creation_narrative_gap",
        "yc_lightbank_syndicate",
      ]),
    },
  },

  // ─── 6. RemotePass — pr-marketing (combined 85, B) ───
  {
    company: {
      name: "RemotePass",
      website: "https://remotepass.com",
      pipeline: "pr-marketing",
      industry:
        "Global employment / payroll / spend platform — distributed-teams infrastructure; competes with Deel, Rippling, Remote.com",
      size: "Series B / growth-stage",
      location: "Dubai / global (US + Europe expansion)",
      fundingStage:
        "$17.4M Series B led by EBRD Venture Capital with 500 Global and existing backers on 2026-05-20. Use of funds: EU + US commercial expansion, AI roadmap.",
      techStack: JSON.stringify([
        "global employment + payroll + spend platform",
        "EBRD Venture Capital led; 500 Global participated",
        "use of funds: US + EU expansion + AI roadmap",
        "co-founder & CEO: Kamal Reggad",
      ]),
      fitScore: 40,
      intentScore: 45,
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
        responsiveness: 5,
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
        "B-tier — smaller raise and crowded category mean budget pressure. Pitch: US-launch comms sprint only (3 months), not a long-term retainer. Lower-priority than Threadline / Jump / Cognition for this week's outreach.",
      source: "Daily Scrape 2026-05-28 (FinTech Global)",
      lastActivity:
        "$17.4M Series B announced 2026-05-20 (EBRD Venture Capital lead)",
    },
    contacts: [
      {
        name: "Kamal Reggad",
        title: "Co-founder & CEO, RemotePass",
        persona: "Founder/CEO",
        decisionMaker: true,
      },
    ],
    scrape: {
      url: "https://fintech.global/2026/05/20/remotepass-raises-17-4m-series-b-led-by-ebrd/",
      source: "news_funding",
      matchedSignals: JSON.stringify([
        "series_b_17_4m_ebrd_2026_05_20",
        "us_eu_expansion_announced",
        "ai_roadmap_signal",
      ]),
    },
  },

  // ─── 7. Trustyfy — Head of Communications — pr-freelance (combined 75, B) ───
  {
    company: {
      name: "Trustyfy — Head of Communications (Fintech / DeFi)",
      website: "https://www.trustyfy.com",
      pipeline: "pr-freelance",
      industry:
        "Fintech / DeFi platform — building reputation function from scratch",
      size: "Private — stage not disclosed in posting",
      location: "Remote",
      fundingStage: "Private — stage not disclosed",
      techStack: JSON.stringify([
        "fintech / DeFi positioning",
        "first PR / comms hire — building the function from scratch",
        "FT posting — pitch fractional alternative before they commit",
      ]),
      fitScore: 50,
      intentScore: 25,
      fitDetails: JSON.stringify({
        pr_comms_clearly_stated: 20,
        sector_fit_finance_pe_vc_b2b: 15,
        workstream_exec_comms_thought_leadership: 10,
        agency_overflow_or_immediate_need: 5,
      }),
      intentDetails: JSON.stringify({
        engagement_model_freelance_fractional: 0,
        remote_flexible_part_time: 5,
        posted_within_72h: 5,
        urgency_signals_immediate_overflow: 10,
        easy_apply_or_direct_contact: 5,
      }),
      vertical: "pr",
      subvertical: "comms",
      engagementModel: "fractional",
      buyerType: "startup",
      compensationText: "",
      remoteFlag: "remote",
      employmentTypeRaw: "Full-time (per posting)",
      urgencyScore: 55,
      starred: true,
      notes:
        "Classic pr-freelance pitch profile per the ICP playbook (FIRST PR HIRE is #1 ranked intent signal). Mark's angle: 'Before you hire FT at $250k+ + recruiter fee, run a 90-day fractional engagement with me to define the function and the brief, then hire to the right shape.' Personal outbound email this week.",
      source: "Daily Scrape 2026-05-28 (Trustyfy careers page)",
      lastActivity: "Head of Communications role open per company careers page",
    },
    contacts: [],
    scrape: {
      url: "https://www.trustyfy.com/jobs/head-of-communications",
      source: "company_careers",
      matchedSignals: JSON.stringify([
        "first_pr_hire_language_shape_how_world_hears_our_story",
        "fintech_defi_sector_fit",
        "remote_role",
        "fractional_pitch_opportunity_before_ft_hire",
      ]),
    },
  },

  // ─── 8. Sleep Doctor — Fractional General Counsel — legal-freelance (combined 65, B) ───
  {
    company: {
      name: "Sleep Doctor — Fractional General Counsel (Remote / Telecommute)",
      website: "https://sleepdoctor.com",
      pipeline: "legal-freelance",
      industry: "Consumer health / sleep wellness brand (digital-first)",
      size: "Private consumer brand",
      location: "Remote / Telecommute",
      fundingStage: "Private",
      techStack: JSON.stringify([
        "explicit 'fractional GC' label",
        "remote / telecommute role",
        "consumer-health vertical (not fund/PE)",
      ]),
      fitScore: 20,
      intentScore: 45,
      fitDetails: JSON.stringify({
        fund_or_private_funds: 0,
        corporate_commercial_contracts_ma_financing: 10,
        seniority_counsel_or_gc_or_special_counsel: 10,
        comp_stated_and_market_credible: 0,
      }),
      intentDetails: JSON.stringify({
        engagement_model_fractional_interim_contract: 15,
        remote_or_hybrid_flex: 15,
        posted_within_72h: 5,
        easy_apply_or_direct_contact: 10,
      }),
      vertical: "legal",
      subvertical: "GC",
      engagementModel: "fractional",
      buyerType: "operating-company",
      compensationText: "",
      remoteFlag: "remote",
      employmentTypeRaw: "Fractional / Telecommute",
      urgencyScore: 65,
      starred: false,
      notes:
        "Low fit (consumer brand, not fund/PE/corporate-transactional). Score honest at 65 (B-tier). Apply only if pipeline is light — Mark's higher-leverage targets are fund-counsel and corporate/securities roles. Suppress if it consumes time vs. better fits this week.",
      source: "Daily Scrape 2026-05-28 (Indeed via search aggregation)",
      lastActivity: "Fractional GC role indexed on Indeed in May 2026",
    },
    contacts: [],
    scrape: {
      url: "https://www.indeed.com/q-general-counsel-l-remote-jobs.html",
      source: "job_board",
      matchedSignals: JSON.stringify([
        "explicit_fractional_gc_label",
        "remote_telecommute",
        "consumer_health_vertical_low_fit",
      ]),
    },
  },

  // ─── 9. Coinbase Base — Head of Communications — pr-freelance (combined 60, B) ───
  {
    company: {
      name: "Coinbase — Head of Communications, Base (L2 network)",
      website: "https://www.coinbase.com",
      pipeline: "pr-freelance",
      industry:
        "Crypto exchange / L2 blockchain — Base is Coinbase's Ethereum Layer-2 network with separate brand/narrative",
      size: "Public (NASDAQ: COIN)",
      location: "Remote / US",
      fundingStage: "Public",
      techStack: JSON.stringify([
        "Coinbase building dedicated comms lead for Base",
        "separating product brand from corporate brand",
        "Coinbase already has internal comms — fractional pitch is harder",
      ]),
      fitScore: 45,
      intentScore: 15,
      fitDetails: JSON.stringify({
        pr_comms_clearly_stated: 20,
        sector_fit_finance_pe_vc_b2b: 15,
        workstream_exec_comms_thought_leadership: 10,
        agency_overflow_or_immediate_need: 0,
      }),
      intentDetails: JSON.stringify({
        engagement_model_freelance_fractional: 0,
        remote_flexible_part_time: 5,
        posted_within_72h: 5,
        urgency_signals_immediate_overflow: 0,
        easy_apply_or_direct_contact: 5,
      }),
      vertical: "pr",
      subvertical: "comms",
      engagementModel: "fractional",
      buyerType: "operating-company",
      compensationText: "",
      remoteFlag: "remote",
      employmentTypeRaw: "Full-time",
      urgencyScore: 30,
      starred: false,
      notes:
        "B-tier. Mark's only real angle: 'I can be your interim Head of PR for Base while you search for the FT hire — 60-90 day bridge.' Coinbase rarely hires this way but worth tracking. Low priority vs. Trustyfy.",
      source:
        "Daily Scrape 2026-05-28 (Coinbase careers — confirm before outreach)",
      lastActivity: "Head of Communications, Base role surfaced in May 2026",
    },
    contacts: [],
    scrape: {
      url: "https://startup.jobs/vc-backed-fintech-startup-head-of-communications-tidebanking-95650",
      source: "job_board",
      matchedSignals: JSON.stringify([
        "coinbase_base_dedicated_comms_lead",
        "separate_product_brand_from_corporate",
        "interim_bridge_only_pitch",
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
