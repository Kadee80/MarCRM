#!/usr/bin/env node
/**
 * Import leads from Daily Scrape 2026-06-01 (Monday)
 *
 * Usage:  cd MarCRM && node scripts/import-2026-06-01.cjs
 *
 * 10 new leads:
 *   1. Geordie AI                           (pr-marketing,    combined 89, A)
 *   2. CopilotKit                            (pr-marketing,    combined 84, A)
 *   3. Larson Maddox — Private Funds Counsel (legal-freelance, combined 78, B)
 *   4. Larson Maddox — Investment Mgmt Atty  (legal-freelance, combined 78, B)
 *   5. The Petersan Group — Private Credit   (legal-freelance, combined 73, B)
 *   6. Top Down Ventures (Founders Fund I)   (fund-formation,  combined 70, B)
 *   7. Wirestock                             (pr-marketing,    combined 70, B)
 *   8. Tide — Head of Comms & PR             (pr-freelance,    combined 65, B)
 *   9. JW Michaels — Registered Funds Atty   (legal-freelance, combined 60, C)
 *  10. Lyfecoin — Fractional GC              (legal-freelance, combined 50, C)
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
  // ─── 1. Geordie AI — pr-marketing (combined 89, A) ───
  {
    company: {
      name: "Geordie AI",
      website: "https://www.geordie.ai",
      pipeline: "pr-marketing",
      industry:
        "Enterprise AI security & governance — independent view of AI agent activity across vendors and deployment types; category-creation play in agent governance",
      size: "Series A; 37 employees scaling to ~50 in next 3 months; offices in London and New York",
      location: "London, UK + New York, NY",
      fundingStage:
        "$30M Series A on 2026-05-28 led by Balderton Capital, with new investment from Crosspoint Capital and follow-on from General Catalyst and Ten Eleven Ventures. Post-money ~$180M. Total raised $36.5M.",
      techStack: JSON.stringify([
        "AI agent security & governance platform",
        "Founders: Edward Comfort (ex-Darktrace COO Americas), Hanah Darley (ex-Darktrace Dir of Security & AI Strategy), Benji Weber (ex-Snyk Sr Dir Engineering)",
        "1,300% ARR growth in first five months of 2026",
        "Won 2026 RSAC Innovation Sandbox",
      ]),
      fitScore: 45,
      intentScore: 44,
      fitDetails: JSON.stringify({
        industry_match_FS_Tech: 10,
        stage_size_growth: 8,
        clear_B2B_buyer_sales_motion: 10,
        proof_assets_customers_data: 10,
        budget_5k_25k_per_month: 7,
      }),
      intentDetails: JSON.stringify({
        trigger_launch_raise_rebrand_expansion: 15,
        timeline_to_start_0_30_days: 8,
        decision_maker_engaged: 8,
        urgency_pain_reputation_pipeline: 8,
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
        "Top lead of the day. Series A just closed (5/28), RSAC sandbox winner, ex-Darktrace founders — articulate press-savvy team. Pitch: own the 'AI agent governance' category narrative + analyst relations to Gartner/RSA adjacency. Warm intro path: Balderton or General Catalyst portfolio operators. Move within 7 days while raise narrative is fresh.",
      source:
        "Daily Scrape 2026-06-01 (Fortune, TechCrunch, Balderton announcement, SecurityWeek)",
      lastActivity:
        "$30M Series A announced 2026-05-28 (Balderton-led)",
    },
    contacts: [
      {
        name: "Edward Comfort",
        title: "Co-founder & CEO, Geordie AI",
        persona: "Founder/CEO",
        decisionMaker: true,
      },
      {
        name: "Hanah Darley",
        title: "Co-founder, Geordie AI (ex-Darktrace Director of Security & AI Strategy)",
        persona: "Founder",
        decisionMaker: false,
      },
      {
        name: "Benji Weber",
        title: "Co-founder, Geordie AI (ex-Snyk Sr. Director of Engineering)",
        persona: "Founder",
        decisionMaker: false,
      },
    ],
    scrape: {
      url: "https://fortune.com/2026/05/28/geordie-security-governance-ai-agents/",
      source: "news_funding",
      matchedSignals: JSON.stringify([
        "series_a_30m_balderton_2026_05_28",
        "rsac_innovation_sandbox_winner_2026",
        "arr_growth_1300_percent_first_five_months",
        "ex_darktrace_ex_snyk_founder_pedigree",
        "category_creation_agent_governance",
      ]),
    },
  },

  // ─── 2. CopilotKit — pr-marketing (combined 84, A) ───
  {
    company: {
      name: "CopilotKit",
      website: "https://www.copilotkit.ai",
      pipeline: "pr-marketing",
      industry:
        "Developer tools / app-native AI agents — open-source framework for embedding copilots in SaaS apps; competes with Vercel AI SDK, LangChain in the dev-infra category",
      size: "Series A; growth-stage with marquee enterprise customers",
      location: "Seattle, WA",
      fundingStage:
        "$27M Series A on 2026-05-05 led by Glilot Capital with NFX and SignalFire.",
      techStack: JSON.stringify([
        "Open-source app-native AI agent framework",
        "Enterprise customers: Deutsche Telekom, Docusign, Cisco, S&P Global",
        "Glilot Capital lead + NFX + SignalFire syndicate",
      ]),
      fitScore: 48,
      intentScore: 36,
      fitDetails: JSON.stringify({
        industry_match_FS_Tech: 10,
        stage_size_growth: 9,
        clear_B2B_buyer_sales_motion: 10,
        proof_assets_customers_data: 10,
        budget_5k_25k_per_month: 9,
      }),
      intentDetails: JSON.stringify({
        trigger_launch_raise_rebrand_expansion: 12,
        timeline_to_start_0_30_days: 6,
        decision_maker_engaged: 8,
        urgency_pain_reputation_pipeline: 6,
        responsiveness: 4,
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
        "~4 weeks past funding press — window closing but enterprise logos (Deutsche Telekom, Docusign, Cisco, S&P Global) at Series A are exceptional. Pitch: case-study-driven thought leadership + analyst briefings to lock category narrative before Series B fundraise. Confirm CEO/founder via team page before outreach.",
      source: "Daily Scrape 2026-06-01 (TechCrunch)",
      lastActivity:
        "$27M Series A announced 2026-05-05 (Glilot Capital lead)",
    },
    contacts: [],
    scrape: {
      url: "https://techcrunch.com/2026/05/05/copilotkit-raises-27m-to-help-devs-deploy-app-native-ai-agents/",
      source: "news_funding",
      matchedSignals: JSON.stringify([
        "series_a_27m_glilot_2026_05_05",
        "enterprise_logos_dt_docusign_cisco_sp_global",
        "app_native_ai_agent_category",
        "narrative_window_4_weeks_closing",
      ]),
    },
  },

  // ─── 3. Larson Maddox — Private Funds Counsel — legal-freelance (combined 78, B) ───
  {
    company: {
      name: "Larson Maddox — Private Funds Counsel (Tier 1 Investment Firm, Remote)",
      website: "https://www.larsonmaddox.com",
      pipeline: "legal-freelance",
      industry:
        "Investment management — private funds; placement via Larson Maddox (Phaidon International Group)",
      size: "Tier 1 investment firm (client unnamed)",
      location: "US — Remote",
      fundingStage: "",
      techStack: JSON.stringify([
        "Tier 1 investment firm client (private funds team)",
        "Fully remote",
        "Larson Maddox = specialist legal/regulatory staffing firm",
        "Repeat-placement potential through recruiter relationship",
      ]),
      fitScore: 35,
      intentScore: 43,
      fitDetails: JSON.stringify({
        fund_or_private_funds: 20,
        corporate_commercial_contracts_ma_financing: 0,
        seniority_counsel_or_gc_or_special_counsel: 10,
        comp_stated_and_market_credible: 5,
      }),
      intentDetails: JSON.stringify({
        engagement_model_fractional_interim_contract: 15,
        remote_or_hybrid_flex: 15,
        posted_within_72h: 5,
        easy_apply_or_direct_contact: 8,
      }),
      vertical: "legal",
      subvertical: "fund",
      engagementModel: "contract",
      buyerType: "staffing",
      compensationText: "",
      remoteFlag: "remote",
      employmentTypeRaw: "Contract / temporary",
      urgencyScore: 70,
      starred: true,
      notes:
        "Apply directly via Larson Maddox recruiter — once Mark places, repeat placements likely. Tier 1 fund client unnamed but the role profile is exactly Mark's wheelhouse (private funds). Engage recruiter relationship in addition to applying.",
      source: "Daily Scrape 2026-06-01 (LinkedIn / Larson Maddox)",
      lastActivity: "Posting active on LinkedIn",
    },
    contacts: [
      {
        name: "Larson Maddox recruiting team",
        title: "Recruiter (Phaidon International Group)",
        persona: "Recruiter",
        decisionMaker: false,
      },
    ],
    scrape: {
      url: "https://www.linkedin.com/jobs/view/remote-private-funds-counsel-tier-1-investment-firm-at-larson-maddox-3269790477",
      source: "job_board",
      matchedSignals: JSON.stringify([
        "tier_1_investment_firm_client",
        "fully_remote",
        "private_funds_specialty",
        "contract_engagement_model",
        "staffing_firm_repeat_placement_potential",
      ]),
    },
  },

  // ─── 4. Larson Maddox — Investment Management Attorney — legal-freelance (combined 78, B) ───
  {
    company: {
      name: "Larson Maddox — Investment Management Attorney (Remote)",
      website: "https://www.larsonmaddox.com",
      pipeline: "legal-freelance",
      industry: "Investment management — placement via Larson Maddox",
      size: "Investment management client",
      location: "US — Remote",
      fundingStage: "",
      techStack: JSON.stringify([
        "Remote investment management attorney role",
        "Companion role to Larson Maddox Private Funds Counsel posting",
        "Same recruiter network",
      ]),
      fitScore: 35,
      intentScore: 43,
      fitDetails: JSON.stringify({
        fund_or_private_funds: 20,
        corporate_commercial_contracts_ma_financing: 0,
        seniority_counsel_or_gc_or_special_counsel: 10,
        comp_stated_and_market_credible: 5,
      }),
      intentDetails: JSON.stringify({
        engagement_model_fractional_interim_contract: 15,
        remote_or_hybrid_flex: 15,
        posted_within_72h: 5,
        easy_apply_or_direct_contact: 8,
      }),
      vertical: "legal",
      subvertical: "fund",
      engagementModel: "contract",
      buyerType: "staffing",
      compensationText: "",
      remoteFlag: "remote",
      employmentTypeRaw: "Contract",
      urgencyScore: 65,
      starred: true,
      notes:
        "Pair with the Private Funds Counsel role (#3) — same recruiter network. Even if Mark passes on this specific brief, the relationship has long-tail value because Larson Maddox is actively building a roster for investment-management clients.",
      source: "Daily Scrape 2026-06-01 (LinkedIn / Larson Maddox)",
      lastActivity: "Posting active on LinkedIn",
    },
    contacts: [],
    scrape: {
      url: "https://www.linkedin.com/jobs/view/remote-investment-management-attorney-at-larson-maddox-4293001418",
      source: "job_board",
      matchedSignals: JSON.stringify([
        "remote_investment_management_attorney",
        "larson_maddox_recruiter_roster",
        "contract_engagement_model",
      ]),
    },
  },

  // ─── 5. The Petersan Group — Private Credit Fund Formation Attorney — legal-freelance (combined 73, B) ───
  {
    company: {
      name: "The Petersan Group — Private Credit Fund Formation Attorney",
      website: "https://www.petersan.com",
      pipeline: "legal-freelance",
      industry:
        "Legal staffing — private credit fund formation; Petersan Group + Petersan Legal Staffing dual entity",
      size: "Private credit client (unnamed)",
      location: "US — Remote-friendly",
      fundingStage: "",
      techStack: JSON.stringify([
        "Private credit fund formation specialty",
        "Remote-friendly",
        "Petersan = legal staffing firm",
        "Private credit niche has strong allocator interest in 2026",
      ]),
      fitScore: 35,
      intentScore: 38,
      fitDetails: JSON.stringify({
        fund_or_private_funds: 20,
        corporate_commercial_contracts_ma_financing: 0,
        seniority_counsel_or_gc_or_special_counsel: 10,
        comp_stated_and_market_credible: 5,
      }),
      intentDetails: JSON.stringify({
        engagement_model_fractional_interim_contract: 15,
        remote_or_hybrid_flex: 10,
        posted_within_72h: 5,
        easy_apply_or_direct_contact: 8,
      }),
      vertical: "legal",
      subvertical: "fund",
      engagementModel: "contract",
      buyerType: "staffing",
      compensationText: "",
      remoteFlag: "remote",
      employmentTypeRaw: "Contract",
      urgencyScore: 60,
      starred: false,
      notes:
        "Private credit is high-demand niche per the 2026 fundraising data. Mark's fund formation experience is directly applicable. Engage the recruiter and signal availability for private credit-flavored briefs.",
      source: "Daily Scrape 2026-06-01 (LinkedIn / Petersan Group)",
      lastActivity: "Posting active on LinkedIn",
    },
    contacts: [],
    scrape: {
      url: "https://www.linkedin.com/jobs/view/private-credit-fund-formation-attorney-at-the-petersan-group-and-petersan-legal-staffing-4350785940",
      source: "job_board",
      matchedSignals: JSON.stringify([
        "private_credit_fund_formation",
        "petersan_dual_entity",
        "remote_friendly",
        "contract_engagement_model",
      ]),
    },
  },

  // ─── 6. Top Down Ventures (Founders Fund I) — fund-formation (combined 70, B) ───
  {
    company: {
      name: "Top Down Ventures (Founders Fund I)",
      website: "https://topdownventures.com",
      pipeline: "fund-formation",
      industry:
        "Venture capital — first institutional fund focused exclusively on MSP software & AI ecosystem",
      size: "Fund I final close $28M (oversubscribed from $25M target); 12 portfolio companies deployed since 2024",
      location: "Toronto, Canada (US LP base)",
      fundingStage:
        "Fund I final close US$28M in April 2026, oversubscribed (target was US$25M). First close October 2024.",
      techStack: JSON.stringify([
        "First institutional VC focused on MSP software/AI",
        "100+ LPs (founders, operators, family offices)",
        "12 portfolio companies deployed",
        "First exit: zofiQ acquired by ConnectWise, 5.3x return",
        "Fund II likely in 12-18 month planning window",
      ]),
      fitScore: 41,
      intentScore: 29,
      fitDetails: JSON.stringify({
        manager_type_funds_I_to_III: 15,
        strategy_hedge_vc_pe_credit: 8,
        operational_readiness: 9,
        jurisdiction_complexity: 3,
        ability_to_pay: 6,
      }),
      intentDetails: JSON.stringify({
        seed_anchor_or_imminent_raise: 10,
        target_launch_window_defined: 5,
        providers_selected: 6,
        founder_urgency: 5,
        referral_source_strength: 3,
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
        "Two angles: (1) portfolio support now — commercial contracts work for MSP portfolio companies. (2) Fund II planning over next 12-18 months. Lower immediate intent because Fund I just closed, but track for Fund II announcement.",
      source:
        "Daily Scrape 2026-06-01 (PR Newswire, Private Capital Journal, Channel Insider)",
      lastActivity:
        "Fund I final close $28M announced April/May 2026 (oversubscribed)",
    },
    contacts: [],
    scrape: {
      url: "https://www.prnewswire.com/news-releases/top-down-ventures-closes-us28m-founders-fund-i-exceeding-target-302767596.html",
      source: "news_fund_close",
      matchedSignals: JSON.stringify([
        "fund_i_final_close_28m_oversubscribed",
        "msp_software_ai_focus",
        "100_plus_lps_operator_base",
        "first_exit_zofiq_connectwise_5_3x",
        "fund_ii_planning_window_12_18mo",
      ]),
    },
  },

  // ─── 7. Wirestock — pr-marketing (combined 70, B) ───
  {
    company: {
      name: "Wirestock",
      website: "https://wirestock.io",
      pipeline: "pr-marketing",
      industry:
        "AI training data — creative multimodal data for AI labs; pivoted from photographer marketplace; competes with Scale AI, Surge in adjacent data-services category",
      size: "Pivoted growth-stage; $23M raise on 2026-05-14",
      location: "US (distributed)",
      fundingStage: "$23M raise on 2026-05-14",
      techStack: JSON.stringify([
        "Multimodal AI training data supplier",
        "Pivoted from photographer marketplace to AI labs data",
        "Differentiated narrative: ethical multimodal data sourcing",
      ]),
      fitScore: 38,
      intentScore: 32,
      fitDetails: JSON.stringify({
        industry_match_FS_Tech: 8,
        stage_size_growth: 8,
        clear_B2B_buyer_sales_motion: 9,
        proof_assets_customers_data: 7,
        budget_5k_25k_per_month: 6,
      }),
      intentDetails: JSON.stringify({
        trigger_launch_raise_rebrand_expansion: 10,
        timeline_to_start_0_30_days: 6,
        decision_maker_engaged: 7,
        urgency_pain_reputation_pipeline: 5,
        responsiveness: 4,
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
        "Niche AI infra play. Pivot story is the most pitchable angle ('photographer marketplace → ethical AI training data supplier'). Window on funding press is ~3 weeks — signal weakening. Reach out this week or de-prioritize.",
      source: "Daily Scrape 2026-06-01 (TechCrunch)",
      lastActivity: "$23M raise announced 2026-05-14",
    },
    contacts: [],
    scrape: {
      url: "https://techcrunch.com/2026/05/14/wirestock-raises-23m-to-supply-multi-modal-data-to-ai-labs/",
      source: "news_funding",
      matchedSignals: JSON.stringify([
        "raise_23m_2026_05_14",
        "pivot_photographer_marketplace_to_ai_data",
        "ethical_multimodal_data_narrative",
      ]),
    },
  },

  // ─── 8. Tide — Head of Communications & PR — pr-freelance (combined 65, B) ───
  {
    company: {
      name: "Tide — Head of Communications & PR (Fintech / Business Banking)",
      website: "https://www.tide.co",
      pipeline: "pr-freelance",
      industry:
        "Fintech / business banking — VC-backed fintech for SMB banking; expanding internationally with US ambitions",
      size: "VC-backed multi-stage growth fintech",
      location: "UK (some US presence)",
      fundingStage: "VC-backed (multi-stage growth)",
      techStack: JSON.stringify([
        "VC-backed fintech",
        "SMB business banking platform",
        "Hiring senior Head of Comms & PR — comms function ramping",
        "US expansion ambitions",
      ]),
      fitScore: 45,
      intentScore: 20,
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
        urgency_signals_immediate_overflow: 5,
        easy_apply_or_direct_contact: 5,
      }),
      vertical: "pr",
      subvertical: "comms",
      engagementModel: "fractional",
      buyerType: "pre-ipo",
      compensationText: "",
      remoteFlag: "hybrid",
      employmentTypeRaw: "Full-time",
      urgencyScore: 55,
      starred: false,
      notes:
        "First/senior PR hire pitch profile (Bucket #2 in the PR-freelance intent ranking). Pitch: 'Interim/fractional Head of Comms while you complete the search.' Tide is UK-based but has US ambitions — Mark's fintech client credibility is the hook. Lower intent score because FT (not freelance), but the 'while you search, retain me' angle is the play.",
      source: "Daily Scrape 2026-06-01 (Startup.jobs / Tide careers)",
      lastActivity: "Head of Communications & PR role open per startup.jobs",
    },
    contacts: [],
    scrape: {
      url: "https://startup.jobs/vc-backed-fintech-startup-head-of-communications-tidebanking-95650",
      source: "job_board",
      matchedSignals: JSON.stringify([
        "head_of_comms_pr_fintech",
        "vc_backed_growth_stage",
        "uk_with_us_expansion",
        "interim_bridge_pitch_opportunity",
      ]),
    },
  },

  // ─── 9. JW Michaels — Registered Funds Attorney — legal-freelance (combined 60, C) ───
  {
    company: {
      name: "JW Michaels — Registered Funds Attorney (ETF Provider, Remote)",
      website: "https://jwmichaels.com",
      pipeline: "legal-freelance",
      industry:
        "Registered investment companies / ETFs — placement via JW Michaels",
      size: "ETF provider client",
      location: "US — Remote",
      fundingStage: "",
      techStack: JSON.stringify([
        "ETF provider client (1940 Act work)",
        "Remote",
        "Posting ~2026-03-22 — older, may be filled",
      ]),
      fitScore: 30,
      intentScore: 30,
      fitDetails: JSON.stringify({
        fund_or_private_funds: 15,
        corporate_commercial_contracts_ma_financing: 0,
        seniority_counsel_or_gc_or_special_counsel: 10,
        comp_stated_and_market_credible: 5,
      }),
      intentDetails: JSON.stringify({
        engagement_model_fractional_interim_contract: 10,
        remote_or_hybrid_flex: 15,
        posted_within_72h: 0,
        easy_apply_or_direct_contact: 5,
      }),
      vertical: "legal",
      subvertical: "fund",
      engagementModel: "contract",
      buyerType: "staffing",
      compensationText: "",
      remoteFlag: "remote",
      employmentTypeRaw: "Contract / fee-based engagement",
      urgencyScore: 50,
      starred: false,
      notes:
        "1940 Act / registered funds work is more specialized than Mark's typical private fund work. Worth a conversation but lower priority. Posting is ~10 weeks old — may already be filled.",
      source: "Daily Scrape 2026-06-01 (LinkedIn / JW Michaels)",
      lastActivity: "Posting from 2026-03-22",
    },
    contacts: [],
    scrape: {
      url: "https://www.linkedin.com/jobs/view/registered-funds-attorney-cutting-edge-etf-provider-remote-at-jw-michaels-co-4388669017",
      source: "job_board",
      matchedSignals: JSON.stringify([
        "etf_provider_client",
        "registered_funds_1940_act",
        "remote",
        "older_posting_2026_03_22",
      ]),
    },
  },

  // ─── 10. Lyfecoin — Fractional General Counsel — legal-freelance (combined 50, C) ───
  {
    company: {
      name: "Lyfecoin — Fractional General Counsel (Remote)",
      website: "https://www.lyfecoin.com",
      pipeline: "legal-freelance",
      industry: "Crypto / Web3 startup",
      size: "Early-stage crypto startup",
      location: "Remote",
      fundingStage: "",
      techStack: JSON.stringify([
        "Crypto/Web3 startup",
        "Explicit fractional GC role",
        "Reports to CEO",
      ]),
      fitScore: 20,
      intentScore: 30,
      fitDetails: JSON.stringify({
        fund_or_private_funds: 0,
        corporate_commercial_contracts_ma_financing: 10,
        seniority_counsel_or_gc_or_special_counsel: 10,
        comp_stated_and_market_credible: 0,
      }),
      intentDetails: JSON.stringify({
        engagement_model_fractional_interim_contract: 15,
        remote_or_hybrid_flex: 10,
        posted_within_72h: 0,
        easy_apply_or_direct_contact: 5,
      }),
      vertical: "legal",
      subvertical: "GC",
      engagementModel: "fractional",
      buyerType: "startup",
      compensationText: "",
      remoteFlag: "remote",
      employmentTypeRaw: "Fractional",
      urgencyScore: 40,
      starred: false,
      notes:
        "Lower fit — not fund/corporate-transactional, and crypto-specific work needs domain depth Mark may not have. Include for completeness but de-prioritize vs. private funds / private credit briefs above.",
      source: "Daily Scrape 2026-06-01 (Legal.io)",
      lastActivity: "Posting active on Legal.io",
    },
    contacts: [],
    scrape: {
      url: "https://www.legal.io/jobs/5660179/Other/Fractional-General-Counsel/Remote",
      source: "job_board",
      matchedSignals: JSON.stringify([
        "fractional_gc_explicit",
        "crypto_web3_vertical_low_fit",
        "remote",
        "reports_to_ceo",
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
