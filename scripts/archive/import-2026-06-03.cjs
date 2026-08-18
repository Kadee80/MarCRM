#!/usr/bin/env node
/**
 * Import leads from Daily Scrape 2026-06-03 (Wednesday)
 *
 * Usage:  cd MarCRM && node scripts/import-2026-06-03.cjs
 *
 * 7 new leads:
 *   1. Pace                                                    (pr-marketing,    combined 88, B+)
 *   2. Mach Industries                                         (pr-marketing,    combined 85, B+)
 *   3. Impulse Space                                           (pr-marketing,    combined 84, B+)
 *   4. Allocate — Senior Fund Formation Attorney (Remote)     (legal-freelance, combined 78, B)
 *   5. Socket — Fractional General Counsel (Remote)           (legal-freelance, combined 76, C+)
 *   6. aVenture — Venture Capital Fund Attorney (Remote)      (legal-freelance, combined 75, C+)
 *   7. Contraline                                              (pr-marketing,    combined 72, C+)
 *
 * - Deduplicates by company name (skips if already in DB).
 * - Creates Company + Contact records and a ScrapeResult per lead.
 * - Enhanced freelance fields (vertical, subvertical, engagementModel,
 *   buyerType, compensationText, remoteFlag, employmentTypeRaw,
 *   urgencyScore) populated for freelance leads; empty/0 for agency-pipeline.
 *
 * NOTE: Neon DB is unreachable from the Cowork sandbox, so this script
 * must be run from Katie's local machine where DATABASE_URL points to
 * the Neon production instance.
 */

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const LEADS = [
  // ─── 1. Pace — pr-marketing (combined 88, B+) ───
  {
    company: {
      name: "Pace",
      website: "https://www.pace.ai",
      pipeline: "pr-marketing",
      industry:
        "AI agents for insurance operations — submissions, renewals, policy servicing, claims; insurtech infrastructure",
      size: "Series B; scaling; named Fortune-grade insurance customers",
      location: "US (HQ); global insurance deployments US/Europe",
      fundingStage:
        "$46M Series B on 2026-05-27 co-led by Thrive Capital and Sequoia Capital; Emergence Capital and Pruven Capital participating. Prior $10M Series A from Sequoia (Jan 2026).",
      techStack: JSON.stringify([
        "Agentic AI for insurance workflows",
        "250K+ insurance workflows completed autonomously",
        "Named customers: Prudential, Palomar, Convex, WTW",
        "Thrive + Sequoia + Emergence + Pruven syndicate",
        "International expansion to US/Europe/new markets in 2026",
      ]),
      fitScore: 47,
      intentScore: 41,
      fitDetails: JSON.stringify({
        industry_match_FS_Tech: 9,
        stage_size_growth: 10,
        clear_B2B_buyer_sales_motion: 10,
        proof_assets_customers_data: 10,
        budget_5k_25k_per_month: 8,
      }),
      intentDetails: JSON.stringify({
        trigger_launch_raise_rebrand_expansion: 15,
        timeline_to_start_0_30_days: 9,
        decision_maker_engaged: 8,
        urgency_pain_reputation_pipeline: 8,
        responsiveness: 1,
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
        "Top lead today. Strongest insurtech-AI fit since Reserv. Sequoia + Thrive warm-intro paths. Named blue-chip insurance customers (Prudential, Palomar, Convex, WTW) create immediate credibility for an exec-comms + thought-leadership sprint tied to Series B narrative.",
      source:
        "Daily Scrape 2026-06-03 (fintech.global, The Insurer, citybiz, Tech Startups)",
      lastActivity:
        "$46M Series B announced 2026-05-27; coverage re-indexed in fintech.global 2026-06-01",
    },
    contacts: [],
    scrape: {
      url: "https://fintech.global/2026/06/01/pace-lands-46m-funding-round-to-automate-insurance-workflows/",
      source: "news_funding",
      matchedSignals: JSON.stringify([
        "series_b_46m_thrive_sequoia_2026_05_27",
        "named_customers_prudential_palomar_convex_wtw",
        "250k_workflows_completed_autonomously",
        "international_expansion_us_europe_new_markets_2026",
        "agentic_ai_insurance_infra",
      ]),
    },
  },

  // ─── 2. Mach Industries — pr-marketing (combined 85, B+) ───
  {
    company: {
      name: "Mach Industries",
      website: "https://www.machindustries.com",
      pipeline: "pr-marketing",
      industry:
        "Defense tech — autonomous vehicles (Viper, Glide, Stratos, Dart, Pike) + Forge flexible manufacturing network",
      size: "Series C; 350 employees (up from ~12 three years ago); four new production facilities by year-end 2026",
      location: "US",
      fundingStage:
        "$300M Series C at $1.8B valuation on 2026-06-01/02; led by Infinite Capital and Ribbit Capital; Sequoia Capital, Bedrock Capital, Khosla Ventures participating. Valuation 4x YoY.",
      techStack: JSON.stringify([
        "Autonomous vehicles: Viper, Glide, Stratos, Dart, Pike",
        "Forge flexible manufacturing network",
        "Existing government contracts (Pentagon)",
        "Sequoia + Khosla + Bedrock + Ribbit + Infinite syndicate",
        "22-yr-old founder CEO Ethan Thornton",
      ]),
      fitScore: 44,
      intentScore: 41,
      fitDetails: JSON.stringify({
        industry_match_FS_Tech: 6,
        stage_size_growth: 10,
        clear_B2B_buyer_sales_motion: 9,
        proof_assets_customers_data: 10,
        budget_5k_25k_per_month: 9,
      }),
      intentDetails: JSON.stringify({
        trigger_launch_raise_rebrand_expansion: 15,
        timeline_to_start_0_30_days: 9,
        decision_maker_engaged: 7,
        urgency_pain_reputation_pipeline: 8,
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
        "Pentagon 'drone dominance' narrative is a textbook executive-comms moment. Use-of-proceeds names talent acquisition + product development + Forge expansion. Sequoia/Khosla/Ribbit warm-intro paths. 4x YoY valuation jump is press-friendly.",
      source:
        "Daily Scrape 2026-06-03 (TechCrunch, PR Newswire, Pulse 2.0, Inc.)",
      lastActivity:
        "$300M Series C announced 2026-06-01; coverage continues 2026-06-02",
    },
    contacts: [
      {
        name: "Ethan Thornton",
        title: "Founder & CEO, Mach Industries",
        persona: "Founder/CEO",
        decisionMaker: true,
      },
    ],
    scrape: {
      url: "https://techcrunch.com/2026/06/01/defense-tech-darling-mach-industries-hits-1-8b-valuation-a-4x-jump-in-a-year/",
      source: "news_funding",
      matchedSignals: JSON.stringify([
        "series_c_300m_at_1_8b_val_2026_06_01",
        "valuation_4x_yoy",
        "12_to_350_employees_in_3_years",
        "four_new_production_facilities_by_year_end",
        "pentagon_drone_dominance_narrative",
        "sequoia_khosla_bedrock_ribbit_infinite_syndicate",
      ]),
    },
  },

  // ─── 3. Impulse Space — pr-marketing (combined 84, B+) ───
  {
    company: {
      name: "Impulse Space",
      website: "https://www.impulsespace.com",
      pipeline: "pr-marketing",
      industry:
        "In-space mobility infrastructure — 'space tugs' for satellite orbit transfer; last-mile of space",
      size: "Series D; $1B+ total raised; scaling fleet and manufacturing",
      location: "US",
      fundingStage:
        "$500M Series D at $4.26B valuation on 2026-06-02; co-led by 137 Ventures and BANNER VC; Founders Fund, Lux Capital, Linse Capital participating. Total raised >$1B.",
      techStack: JSON.stringify([
        "Space tugs (ultra-mobile spacecraft for satellite orbit transfer)",
        "Tom Mueller (early SpaceX employee) CEO",
        "Founders Fund + Lux + 137 + BANNER + Linse syndicate",
        "Use of proceeds: hiring + manufacturing growth",
      ]),
      fitScore: 44,
      intentScore: 40,
      fitDetails: JSON.stringify({
        industry_match_FS_Tech: 6,
        stage_size_growth: 10,
        clear_B2B_buyer_sales_motion: 9,
        proof_assets_customers_data: 10,
        budget_5k_25k_per_month: 9,
      }),
      intentDetails: JSON.stringify({
        trigger_launch_raise_rebrand_expansion: 15,
        timeline_to_start_0_30_days: 8,
        decision_maker_engaged: 6,
        urgency_pain_reputation_pipeline: 8,
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
        "Founders Fund + Lux warm-intro paths. Tom Mueller's SpaceX heritage + 'last-mile of space' narrative is a media-rich exec-positioning angle. Space-economy infra borderline ICP but PR-grade story. Explicit hiring use-of-proceeds = window is open NOW.",
      source:
        "Daily Scrape 2026-06-03 (GlobeNewswire, SpaceNews, Capital Brief, Via Satellite)",
      lastActivity: "$500M Series D announced 2026-06-02",
    },
    contacts: [
      {
        name: "Tom Mueller",
        title: "Founder & CEO, Impulse Space (ex-SpaceX early employee)",
        persona: "Founder/CEO",
        decisionMaker: true,
      },
    ],
    scrape: {
      url: "https://www.globenewswire.com/news-release/2026/06/02/3305111/0/en/impulse-space-raises-500m-series-d-to-build-in-space-mobility-infrastructure-for-the-space-economy.html",
      source: "news_funding",
      matchedSignals: JSON.stringify([
        "series_d_500m_at_4_26b_val_2026_06_02",
        "total_raised_over_1b",
        "founders_fund_lux_137_banner_linse_syndicate",
        "use_of_proceeds_hiring_and_manufacturing_growth",
        "tom_mueller_spacex_heritage",
      ]),
    },
  },

  // ─── 4. Allocate — Senior Fund Formation Attorney (Remote) — legal-freelance (combined 78, B) ───
  {
    company: {
      name: "Allocate — Senior Fund Formation Attorney (Remote)",
      website: "https://www.allocate.co",
      pipeline: "legal-freelance",
      industry:
        "Fund/secondaries fintech — private-markets allocation platform; long-open senior counsel seat",
      size: "Series B-era fintech; senior counsel seat",
      location: "Remote (US)",
      fundingStage: "",
      techStack: JSON.stringify([
        "Senior fund formation, onboarding, fund filings",
        "Regulatory compliance, corporate governance",
        "Fully remote US",
        "Posting open through 2026-07-11",
      ]),
      fitScore: 43,
      intentScore: 35,
      fitDetails: JSON.stringify({
        fund_or_private_funds: 20,
        corporate_commercial_contracts_ma_financing: 8,
        seniority_counsel_or_gc_or_special_counsel: 10,
        comp_stated_and_market_credible: 5,
      }),
      intentDetails: JSON.stringify({
        engagement_model_fractional_interim_contract: 8,
        remote_or_hybrid_flex: 15,
        posted_within_72h: 5,
        easy_apply_or_direct_contact: 7,
      }),
      vertical: "legal",
      subvertical: "fund",
      engagementModel: "fractional",
      buyerType: "fund",
      compensationText: "Not stated in posting",
      remoteFlag: "remote",
      employmentTypeRaw: "Senior Fund Formation Attorney (W-2 senior; long-open)",
      urgencyScore: 55,
      starred: true,
      notes:
        "W-2 senior posting but the 6-week open window creates a textbook fractional/interim pitch — Mark can pitch a 90-day bridge while Allocate continues their permanent search. Pure fund-formation ICP fit.",
      source: "Daily Scrape 2026-06-03 (Indeed / BeBee / Allocate careers)",
      lastActivity: "Posting open through 2026-07-11",
    },
    contacts: [],
    scrape: {
      url: "https://bebee.com/us/jobs/senior-fund-formation-attorney-remote-in-us-allocate-mo--appcast-13509_86437905",
      source: "indeed",
      matchedSignals: JSON.stringify([
        "fund_formation_onboarding_filings_regulatory_compliance",
        "fully_remote_us",
        "long_open_posting_through_2026_07_11",
        "fractional_bridge_window",
        "senior_counsel_seniority",
      ]),
    },
  },

  // ─── 5. Socket — Fractional General Counsel (Remote) — legal-freelance (combined 76, C+) ───
  {
    company: {
      name: "Socket — Fractional General Counsel (Remote)",
      website: "https://socket.dev",
      pipeline: "legal-freelance",
      industry:
        "Tech security / supply-chain security — software-supply-chain platform for npm/Python; operating-company GC seat",
      size: "Tech security startup; operating company; explicit fractional GC role",
      location: "Remote (US)",
      fundingStage: "",
      techStack: JSON.stringify([
        "Explicitly fractional General Counsel",
        "Strategic legal counsel across regulatory + corporate matters",
        "100% remote US",
        "Active listing on Built In",
      ]),
      fitScore: 30,
      intentScore: 46,
      fitDetails: JSON.stringify({
        fund_or_private_funds: 5,
        corporate_commercial_contracts_ma_financing: 10,
        seniority_counsel_or_gc_or_special_counsel: 10,
        comp_stated_and_market_credible: 5,
      }),
      intentDetails: JSON.stringify({
        engagement_model_fractional_interim_contract: 15,
        remote_or_hybrid_flex: 15,
        posted_within_72h: 8,
        easy_apply_or_direct_contact: 8,
      }),
      vertical: "legal",
      subvertical: "GC",
      engagementModel: "fractional",
      buyerType: "operating-company",
      compensationText: "Not stated in posting",
      remoteFlag: "remote",
      employmentTypeRaw: "Fractional General Counsel",
      urgencyScore: 75,
      starred: true,
      notes:
        "Explicitly fractional + remote + active. Highest-intent engagement model in today's batch. Buyer is operating company rather than fund, which lowers fit-side score but the intent profile is strong enough to push past the floor easily.",
      source: "Daily Scrape 2026-06-03 (Built In)",
      lastActivity: "Active posting on Built In",
    },
    contacts: [],
    scrape: {
      url: "https://builtin.com/job/fractional-general-counsel/4025369",
      source: "built_in",
      matchedSignals: JSON.stringify([
        "explicit_fractional_gc_role",
        "fully_remote_us",
        "operating_company_buyer",
        "broad_legal_and_regulatory_scope",
        "active_built_in_listing",
      ]),
    },
  },

  // ─── 6. aVenture — Venture Capital Fund Attorney (Remote) — legal-freelance (combined 75, C+) ───
  {
    company: {
      name: "aVenture — Venture Capital Fund Attorney (Remote)",
      website: "https://www.aventure.vc",
      pipeline: "legal-freelance",
      industry:
        "Venture capital platform — VC fund administration/secondaries; long-open VC fund counsel seat",
      size: "VC platform; long-open VC fund counsel seat",
      location: "Remote (US; SF-headquartered)",
      fundingStage: "",
      techStack: JSON.stringify([
        "VC fund registration + regulatory compliance",
        "Investment adviser / securities work",
        "Fully remote US",
        "SF-headquartered platform",
      ]),
      fitScore: 41,
      intentScore: 34,
      fitDetails: JSON.stringify({
        fund_or_private_funds: 18,
        corporate_commercial_contracts_ma_financing: 8,
        seniority_counsel_or_gc_or_special_counsel: 10,
        comp_stated_and_market_credible: 5,
      }),
      intentDetails: JSON.stringify({
        engagement_model_fractional_interim_contract: 8,
        remote_or_hybrid_flex: 15,
        posted_within_72h: 5,
        easy_apply_or_direct_contact: 6,
      }),
      vertical: "legal",
      subvertical: "fund",
      engagementModel: "fractional",
      buyerType: "fund",
      compensationText: "Not stated in posting",
      remoteFlag: "remote",
      employmentTypeRaw: "Venture Capital Fund Attorney (W-2 senior; long-open)",
      urgencyScore: 50,
      starred: false,
      notes:
        "VC-funds ICP fit strong. Same fractional-bridge dynamic as Allocate — long-open senior W-2 posting that supports a 'I'll fill it fractionally while you search' pitch.",
      source: "Daily Scrape 2026-06-03 (Glassdoor / aVenture careers)",
      lastActivity: "Posting active",
    },
    contacts: [],
    scrape: {
      url: "https://www.glassdoor.com/job-listing/venture-capital-fund-attorney-aventure-JV_KO0,29_KE30,38.htm?jl=1008239968893",
      source: "glassdoor",
      matchedSignals: JSON.stringify([
        "vc_fund_registration_regulatory_compliance",
        "investment_adviser_securities_work",
        "fully_remote_us",
        "long_open_posting",
        "fractional_bridge_window",
      ]),
    },
  },

  // ─── 7. Contraline — pr-marketing (combined 72, C+) ───
  {
    company: {
      name: "Contraline",
      website: "https://www.contraline.com",
      pipeline: "pr-marketing",
      industry:
        "Clinical-stage biopharmaceutical — male contraception (NES/T Gel, hormonal reversible)",
      size: "Clinical-stage; Phase 3 anticipated 2027",
      location: "Charlottesville, VA",
      fundingStage:
        "$92.5M Series B on 2026-06-02 co-led by BVF Partners and RA Capital Management; GV (Google Ventures), Lumira Ventures, Invus participating.",
      techStack: JSON.stringify([
        "NES/T Gel — first-in-class male contraceptive (hormonal, reversible, daily)",
        "Phase 3 development anticipated 2027",
        "BVF + RA Capital + GV + Lumira + Invus syndicate",
        "Iris van Alderwerelt van Rosenburgh (BVF) joined board",
      ]),
      fitScore: 35,
      intentScore: 37,
      fitDetails: JSON.stringify({
        industry_match_FS_Tech: 3,
        stage_size_growth: 9,
        clear_B2B_buyer_sales_motion: 5,
        proof_assets_customers_data: 10,
        budget_5k_25k_per_month: 8,
      }),
      intentDetails: JSON.stringify({
        trigger_launch_raise_rebrand_expansion: 15,
        timeline_to_start_0_30_days: 7,
        decision_maker_engaged: 5,
        urgency_pain_reputation_pipeline: 8,
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
        "Biotech outside FS/tech ICP — track-only / second-touch. Strong PR narrative ('massive white space of men's health') if Mark wants to expand category beyond core ICP. Phase 3 milestone in 2027 creates a future-quarter retainer trigger.",
      source:
        "Daily Scrape 2026-06-03 (BioSpace / BusinessWire / Endpoints / Fierce Pharma)",
      lastActivity: "$92.5M Series B announced 2026-06-02",
    },
    contacts: [
      {
        name: "Iris van Alderwerelt van Rosenburgh, PhD",
        title: "BVF Partners — joined Contraline board 2026-06-02",
        persona: "Investor / Board",
        decisionMaker: false,
      },
    ],
    scrape: {
      url: "https://www.businesswire.com/news/home/20260602516189/en/Contraline-Announces-$92.5-Million-Series-B-Financing-to-Advance-NEST-Male-Contraceptive-into-Late-Stage-Development",
      source: "news_funding",
      matchedSignals: JSON.stringify([
        "series_b_92_5m_bvf_ra_capital_2026_06_02",
        "phase_3_anticipated_2027",
        "first_in_class_male_contraceptive_narrative",
        "new_board_addition_bvf",
        "gv_lumira_invus_syndicate",
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
