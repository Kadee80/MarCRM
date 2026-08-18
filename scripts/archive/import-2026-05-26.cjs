#!/usr/bin/env node
/**
 * Import leads from Daily Scrape 2026-05-26 (Tuesday)
 *
 * Usage:  cd MarCRM && node scripts/import-2026-05-26.cjs
 *
 * - 6 new leads:
 *     1. Greenboard           (pr-marketing,   combined 77, B)
 *     2. Allocate Sr Fund Atty (legal-freelance, combined 80, A)
 *     3. Spektr               (pr-marketing,   combined 68, B)
 *     4. Prairie Wealth + McEwen (pr-marketing, combined 66, B)
 *     5. Exaforce             (pr-marketing,   combined 65, B)
 *     6. Lansdowne Partners UK IP VC (fund-formation, combined 54, C — included as watchlist)
 * - Deduplicates by company name (skips if already in DB).
 * - Creates Company + Contact records and a ScrapeResult per lead.
 * - Enhanced freelance fields (vertical, subvertical, engagementModel,
 *   buyerType, compensationText, remoteFlag, employmentTypeRaw,
 *   urgencyScore) populated for legal-freelance lead; empty/0 for agency
 *   pipeline leads.
 *
 * NOTE: Neon DB is unreachable from the Cowork sandbox, so this script
 * must be run from Katie's local machine where DATABASE_URL points to
 * the Neon production instance.
 */

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const LEADS = [
  // ─── 1. Greenboard — pr-marketing (combined 77, B) ───
  {
    company: {
      name: "Greenboard",
      website: "https://www.greenboard.com",
      pipeline: "pr-marketing",
      industry:
        "Securities compliance / RegTech for financial institutions — AI-native platform consolidating communications archiving, marketing review, trade surveillance, employee compliance, vendor diligence, audit trails, and regulatory reporting",
      size: "Series A / growth-stage; serving 500+ financial institutions; ~$20M total raised (May 2026)",
      location: "United States",
      fundingStage:
        "Series A — $15.5M led by Base10 Partners, announced 2026-05-12 ($20M total round). Investors: Y Combinator, General Catalyst, Wayfinder Ventures, Commerce Ventures, Transpose Platform, Liquid2 Ventures, Kulveer Taggar + strategic industry investors. Founded 2023.",
      techStack: JSON.stringify([
        "AI-native securities compliance platform",
        "GreenboardGo conversational AI layer (launched alongside Series A)",
        "positioning: 'Rippling for financial compliance and operations'",
        "500+ financial institution customers",
        "founders: Dave Feldman (CEO), Ed Schembor",
      ]),
      fitScore: 42,
      intentScore: 35,
      fitDetails: JSON.stringify({
        industry_match_FS_Tech: 10,
        stage_size_growth: 8,
        clear_B2B_buyer_sales_motion: 10,
        proof_assets_customers_data: 10,
        budget_5k_25k_per_month: 4,
      }),
      intentDetails: JSON.stringify({
        trigger_launch_raise_rebrand_expansion: 15,
        timeline_to_start_0_30_days: 7,
        decision_maker_engaged: 5,
        urgency_pain_reputation_pipeline: 5,
        responsiveness: 3,
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
        "STRONGEST pr-marketing trigger of the day. Two-pronged news event (Series A + GreenboardGo product launch on the same day) is the textbook PR-need moment. 500-customer logo wall is strong proof. Likely no in-house head of comms yet — first-PR-hire angle is plausible. Recommended posture: outreach within 7 days while round is still fresh; pitch 90-day comms strategy sprint anchored on GreenboardGo product story + the 500-FI scale narrative. Caveat on budget: Base10 portfolios skew product-led; some restraint on PR spend is possible.",
      source:
        "Daily Scrape 2026-05-26 (Fortune; BusinessWire; FinTech Global; PRNewswire seed-round historical reference)",
      lastActivity:
        "Series A $15.5M Base10-led announced 2026-05-12 + simultaneous launch of GreenboardGo (conversational AI compliance layer)",
    },
    contacts: [
      {
        name: "Dave Feldman",
        title: "Co-Founder & CEO, Greenboard",
        persona: "Founder/CEO",
        decisionMaker: true,
      },
      {
        name: "Ed Schembor",
        title: "Co-Founder, Greenboard",
        persona: "Founder",
        decisionMaker: true,
      },
    ],
    scrape: {
      url: "https://fortune.com/2026/05/12/greenboard-raises-15-5-million-series-a-to-keep-compliance-from-slowing-down-business/",
      source: "news_funding",
      matchedSignals: JSON.stringify([
        "series_a_15_5m_base10_2026_05_12",
        "greenboardgo_product_launch_same_day",
        "500_financial_institution_customers",
        "rippling_for_compliance_narrative_pitchable",
        "fs_core_securities_compliance_category",
        "first_pr_hire_angle_plausible",
      ]),
    },
  },

  // ─── 2. Allocate — Sr Fund Formation Attorney (legal-freelance, combined 80, A) ───
  {
    company: {
      name: "Allocate — Senior Fund Formation Attorney (Remote US)",
      website: "https://www.allocate.co",
      pipeline: "legal-freelance",
      industry:
        "Wealth / Alternative investments platform — hiring senior fund formation attorney (remote US) for fund formation, onboarding, fund filings, regulatory compliance, and corporate governance for investment vehicles",
      size: "Venture-backed alternative-investments platform (employer profile)",
      location: "Remote (United States)",
      fundingStage:
        "n/a — this is an employer-side legal-freelance opportunity, not a funding-trigger lead",
      techStack: JSON.stringify([
        "fund formation legal capacity (senior counsel)",
        "fund filings + regulatory compliance + corporate governance",
        "investment-vehicle administration",
        "remote-US engagement",
      ]),
      fitScore: 40,
      intentScore: 40,
      fitDetails: JSON.stringify({
        fund_or_private_funds_or_formation: 20,
        corp_commercial_MA_financing_securities: 8,
        seniority_counsel_GC: 8,
        comp_market_credible: 4,
      }),
      intentDetails: JSON.stringify({
        engagement_model_fractional_interim_contract: 12,
        remote_hybrid_flex: 13,
        posted_within_72h: 7,
        easy_apply_direct_contact: 8,
      }),
      vertical: "legal",
      subvertical: "fund",
      engagementModel: "contract",
      buyerType: "operating-company",
      compensationText: "Not stated publicly in source listing",
      remoteFlag: "remote",
      employmentTypeRaw: "Full-time (remote)",
      urgencyScore: 60,
      starred: true,
      notes:
        "Highest combined score of the day (80, A). Allocate is a wealth/alts platform — they need fund formation legal capacity to support investment-vehicle work. Posting reads as W-2 senior hire but the role's scope is project-shaped, so Mark's fractional/interim-while-you-search pitch is reasonable. Could be either (a) interim-while-they-search or (b) contract-overflow play. Verify whether the role is still open before outreach (BeBee/Appcast feed may lag). Recommended posture: direct LinkedIn outreach to the hiring manager (likely GC or COO) framed as 'while you complete the senior search, I can carry the workstream'.",
      source:
        "Daily Scrape 2026-05-26 (BeBee/Appcast feed indexing the Indeed posting; ICP — fund/corporate engagement-model match)",
      lastActivity:
        "Active job posting surfaced via BeBee/Appcast feed in May 2026 for Senior Fund Formation Attorney (Remote, US)",
    },
    contacts: [],
    scrape: {
      url: "https://bebee.com/us/jobs/senior-fund-formation-attorney-remote-in-us-allocate-mo--appcast-13509_86437905",
      source: "job_board_freelance",
      matchedSignals: JSON.stringify([
        "fund_formation_attorney_remote_us_active_posting",
        "senior_counsel_seniority_match",
        "core_practice_fund_formation_filings_governance",
        "remote_engagement_geo_match",
        "interim_or_fractional_pitch_opening",
      ]),
    },
  },

  // ─── 3. Spektr — pr-marketing (combined 68, B) ───
  {
    company: {
      name: "Spektr",
      website: "https://www.spektr.com",
      pipeline: "pr-marketing",
      industry:
        "RegTech — AI agents for KYC/AML compliance workflows in financial services; document review, ownership mapping, risk analysis; sold to banks and Tier 1 financial institutions",
      size: "Series A / growth-stage; ~45 employees and growing; ~$26M total raised",
      location: "Copenhagen, Denmark (expanding to London + New York in 2026)",
      fundingStage:
        "Series A — $20M led by NEA, announced 2026-04-16. Existing backers Northzone, Seedcamp, PSV Tech also participated. Total raised ~$26M.",
      techStack: JSON.stringify([
        "configurable AI compliance workflows + AI agents",
        "document review, ownership mapping, risk analysis",
        "customers: Pleo, Santander Leasing, Monta, Phantom, Mercuryo, 'major' US marketplaces",
        "active US + UK market expansion in 2026",
      ]),
      fitScore: 40,
      intentScore: 28,
      fitDetails: JSON.stringify({
        industry_match_FS_Tech: 10,
        stage_size_growth: 8,
        clear_B2B_buyer_sales_motion: 10,
        proof_assets_customers_data: 8,
        budget_5k_25k_per_month: 4,
      }),
      intentDetails: JSON.stringify({
        trigger_launch_raise_rebrand_expansion: 10,
        timeline_to_start_0_30_days: 5,
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
        "Raise is ~6 weeks old, so the launch-comms window has narrowed. Pivot the pitch to US market entry — 'You're opening NY + London; you need a US press strategy that's not just translated EU content.' Strong logo set (Pleo, Santander Leasing) gives credibility. Watch for whether they hire a US-based comms head in next 30 days — if so, cross-route to pr-freelance pipeline.",
      source:
        "Daily Scrape 2026-05-26 (Crunchbase News; TechFundingNews; FinTech Global; tech.eu)",
      lastActivity:
        "Series A $20M NEA-led announced 2026-04-16; opening New York + London offices in 2026",
    },
    contacts: [],
    scrape: {
      url: "https://news.crunchbase.com/venture/fintech-compliance-founders-20m-seriesa-spektr/",
      source: "news_funding",
      matchedSignals: JSON.stringify([
        "series_a_20m_nea_2026_04_16",
        "us_market_entry_ny_london_office_expansion",
        "tier_one_bank_customer_logos",
        "kyc_aml_regtech_category",
        "watchlist_for_us_comms_hire",
      ]),
    },
  },

  // ─── 4. Prairie Wealth Advisors + McEwen Group — pr-marketing (combined 66, B) ───
  {
    company: {
      name: "Prairie Wealth Advisors (post-McEwen merger)",
      website: "https://prairiewealth.com",
      pipeline: "pr-marketing",
      industry:
        "Wealth management / Registered Investment Advisor (RIA) — affluent-families focus; combined Nebraska-based platform post-merger",
      size: "$1B+ AUM combined (post-merger); regional Nebraska RIA",
      location: "Nebraska, United States",
      fundingStage:
        "Strategic merger announced May 2026 — Prairie Wealth Advisors merged with The McEwen Group (5-person team, $400M AUM + $200M 401k assets, formerly RBC Wealth Management). Combined entity now $1B+ AUM.",
      techStack: JSON.stringify([
        "post-merger combined RIA — $1B+ AUM",
        "RBC Wealth Management breakaway story (McEwen Group)",
        "Q1 2026 record RIA M&A backdrop: 142 deals / $1.67T AUM",
      ]),
      fitScore: 38,
      intentScore: 28,
      fitDetails: JSON.stringify({
        industry_match_FS_Tech: 10,
        stage_size_growth: 8,
        clear_B2B_buyer_sales_motion: 8,
        proof_assets_customers_data: 8,
        budget_5k_25k_per_month: 4,
      }),
      intentDetails: JSON.stringify({
        trigger_launch_raise_rebrand_expansion: 13,
        timeline_to_start_0_30_days: 5,
        decision_maker_engaged: 5,
        urgency_pain_reputation_pipeline: 3,
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
        "Combined-entity rebrand + crossing the $1B AUM threshold is a textbook pr-marketing trigger. Two angles to pitch: (1) the post-merger positioning project, (2) the breakaway story for the McEwen team's relocation from RBC. Caveat: regional Nebraska RIA, so budget likely sits at the lower end of the $5-25k/mo band; this is closer to a project engagement than a long-term retainer.",
      source:
        "Daily Scrape 2026-05-26 (BriefGlance; The Pilot News; WealthManagement.com; Echelon Partners Q1 2026 RIA M&A data)",
      lastActivity:
        "Merger announcement May 2026 — combined entity crosses $1B AUM",
    },
    contacts: [],
    scrape: {
      url: "https://briefglance.com/articles/nebraska-ria-merger-creates-billion-dollar-wealth-management-firm",
      source: "news_ma",
      matchedSignals: JSON.stringify([
        "ria_merger_combined_1b_aum_may_2026",
        "rbc_wealth_breakaway_mcewen_group",
        "post_merger_rebrand_opportunity",
        "regional_nebraska_budget_caveat",
      ]),
    },
  },

  // ─── 5. Exaforce — pr-marketing (combined 65, B) ───
  {
    company: {
      name: "Exaforce",
      website: "https://www.exaforce.com",
      pipeline: "pr-marketing",
      industry:
        "Cybersecurity — agentic AI security operations (SOC); enterprise security automation via AI agents",
      size: "Series B / growth-stage; $200M cumulative funding",
      location: "United States",
      fundingStage:
        "Series B — $125M with HarbourVest, Peak XV, Mayfield, Khosla Ventures (May 2026); cumulative funding $200M",
      techStack: JSON.stringify([
        "agentic AI security operations (SOC)",
        "enterprise security automation",
        "top-tier syndicate (HarbourVest, Peak XV, Mayfield, Khosla)",
      ]),
      fitScore: 40,
      intentScore: 25,
      fitDetails: JSON.stringify({
        industry_match_FS_Tech: 10,
        stage_size_growth: 8,
        clear_B2B_buyer_sales_motion: 10,
        proof_assets_customers_data: 8,
        budget_5k_25k_per_month: 4,
      }),
      intentDetails: JSON.stringify({
        trigger_launch_raise_rebrand_expansion: 13,
        timeline_to_start_0_30_days: 4,
        decision_maker_engaged: 4,
        urgency_pain_reputation_pipeline: 2,
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
        "Could cross-route to ai-consulting if Mark wants to pitch AI workflow advisory rather than PR. Cybersecurity PR is competitive — Exaforce likely already has a retained agency. Watch for whether they hire a Head of Comms in next 30 days; if they post that role, convert to a pr-freelance fractional/interim pitch.",
      source:
        "Daily Scrape 2026-05-26 (FinTech Global weekly roundup, week of May 15, 2026)",
      lastActivity:
        "Series B $125M with HarbourVest/Peak XV/Mayfield/Khosla (May 2026); cumulative funding $200M",
    },
    contacts: [],
    scrape: {
      url: "https://fintech.global/2026/05/15/modest-week-in-fintech-with-677m-raised-in-14-deals/",
      source: "news_funding",
      matchedSignals: JSON.stringify([
        "series_b_125m_top_tier_syndicate_2026_05",
        "agentic_ai_security_ops_hot_category",
        "200m_cumulative_funding_pr_spend_threshold",
        "watchlist_for_head_of_comms_hire",
      ]),
    },
  },

  // ─── 6. Lansdowne Partners — UK University IP VC (fund-formation, combined 54, C — watchlist) ───
  {
    company: {
      name: "Lansdowne Partners — UK University IP VC Fund",
      website: "https://www.lansdownepartners.com",
      pipeline: "fund-formation",
      industry:
        "Venture capital / Deep tech — UK university IP commercialization; turning UK university research into global companies",
      size: "Emerging VC fund — first close €128.9M ($150M)",
      location: "London, United Kingdom",
      fundingStage:
        "First close €128.9M ($150M) — May 2026; targeting additional closes",
      techStack: JSON.stringify([
        "UK university IP commercialization VC",
        "novel mandate — bespoke side-letter and structuring work likely",
        "Lansdowne is a well-known platform expanding into venture",
      ]),
      fitScore: 32,
      intentScore: 22,
      fitDetails: JSON.stringify({
        manager_type_emerging_FundI_III: 12,
        strategy_match: 7,
        operational_readiness: 6,
        jurisdiction_complexity: 3,
        ability_to_pay: 4,
      }),
      intentDetails: JSON.stringify({
        seed_anchor_or_imminent_raise: 8,
        target_launch_window_defined: 5,
        providers_selected: 4,
        founder_urgency: 3,
        referral_source_strength: 2,
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
        "UK-based — lower priority for Mark's US-focused fund-formation practice, but worth tracking if they have US LPs (highly likely for a $150M close). Marginal score (combined 54, C). Included as a watchlist entry rather than an active pitch target; suppress unless Mark has a UK referral path.",
      source:
        "Daily Scrape 2026-05-26 (EU-Startups)",
      lastActivity:
        "First close €128.9M ($150M) announced May 2026; novel UK university IP mandate",
    },
    contacts: [],
    scrape: {
      url: "https://www.eu-startups.com/2026/05/lansdowne-partners-unveils-new-vc-fund-to-turn-uk-university-ip-into-global-companies-hits-e128-9-million-first-close/",
      source: "news_fund_launch",
      matchedSignals: JSON.stringify([
        "first_close_128_9m_eur_may_2026",
        "uk_university_ip_novel_mandate",
        "bespoke_side_letter_structuring_likely",
        "watchlist_uk_jurisdiction_lower_us_priority",
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
