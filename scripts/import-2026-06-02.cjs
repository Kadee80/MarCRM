#!/usr/bin/env node
/**
 * Import leads from Daily Scrape 2026-06-02 (Tuesday)
 *
 * Usage:  cd MarCRM && node scripts/import-2026-06-02.cjs
 *
 * 8 new leads:
 *   1. Catena Labs                                          (pr-marketing,    combined 85, B+)
 *   2. Ropes & Gray — Funds Attorney (Asset Mgmt, Remote)   (legal-freelance, combined 80, B)
 *   3. Atlas Road Advisors — Contract Attorney (Remote)     (legal-freelance, combined 75, C+)
 *   4. Waypoint Bio                                          (pr-marketing,    combined 73, C+)
 *   5. Maxwell (fka HDM Renewable Finance)                  (pr-marketing,    combined 63, C)
 *   6. Crypto.com — Director of PR & Communications         (pr-freelance,    combined 60, C)
 *   7. Hayden Industrial LLC — Fractional GC                (legal-freelance, combined 55, C)
 *   8. SpeedLabs                                             (pr-marketing,    combined 47, D+)
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
  // ─── 1. Catena Labs — pr-marketing (combined 85, B+) ───
  {
    company: {
      name: "Catena Labs",
      website: "https://www.catenalabs.com",
      pipeline: "pr-marketing",
      industry:
        "AI-native banking / stablecoin infra for AI agents — building financial rails so autonomous AI agents can transact",
      size: "Series A; small founding team; Boston-area HQ; remote-friendly",
      location: "Remote (Boston-area HQ)",
      fundingStage:
        "$30M Series A on 2026-05-20 led by Acrew Capital + a16z crypto; participation from Breyer Capital, General Catalyst, QED. Total raised across seed+A: $48M.",
      techStack: JSON.stringify([
        "Founders: Sean Neville (ex-Circle co-founder) and Matt Venables",
        "Combines stablecoins with on-chain identity for AI-agent banking",
        "Filed national trust bank charter application with OCC (NY)",
        "a16z crypto + Acrew + Breyer + GC + QED",
      ]),
      fitScore: 45,
      intentScore: 40,
      fitDetails: JSON.stringify({
        industry_match_FS_Tech: 10,
        stage_size_growth: 10,
        clear_B2B_buyer_sales_motion: 10,
        proof_assets_customers_data: 10,
        budget_5k_25k_per_month: 5,
      }),
      intentDetails: JSON.stringify({
        trigger_launch_raise_rebrand_expansion: 15,
        timeline_to_start_0_30_days: 8,
        decision_maker_engaged: 8,
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
      starred: true,
      notes:
        "Headline new lead. Series A 5/20 + trust-bank-charter filing creates a unique regulatory-narrative window. No public head-of-comms hire yet — first-mover pitch for a 90-day narrative + regulatory comms sprint tied to OCC charter timeline. Warm intro paths: Circle alumni, a16z crypto portfolio operators, Acrew portfolio.",
      source:
        "Daily Scrape 2026-06-02 (Fortune, The Block, Crypto Briefing, Bitcoin World)",
      lastActivity:
        "$30M Series A announced 2026-05-20 + OCC trust bank charter application",
    },
    contacts: [
      {
        name: "Sean Neville",
        title: "Co-founder & CEO, Catena Labs (ex-Circle co-founder)",
        persona: "Founder/CEO",
        decisionMaker: true,
      },
      {
        name: "Matt Venables",
        title: "Co-founder, Catena Labs",
        persona: "Founder",
        decisionMaker: false,
      },
    ],
    scrape: {
      url: "https://fortune.com/2026/05/20/catena-labs-series-a-sean-neville-ai-native-bank/",
      source: "news_funding",
      matchedSignals: JSON.stringify([
        "series_a_30m_a16zcrypto_acrew_2026_05_20",
        "circle_cofounder_neville",
        "occ_trust_bank_charter_filed",
        "ai_native_bank_stablecoin_agentic_finance",
        "no_public_head_of_comms_first_mover_window",
      ]),
    },
  },

  // ─── 2. Ropes & Gray — Funds Attorney (Asset Mgmt, Remote) — legal-freelance (combined 80, B) ───
  {
    company: {
      name: "Ropes & Gray — Funds Attorney (Asset Management Group, Remote)",
      website: "https://www.ropesgrayrecruiting.com",
      pipeline: "legal-freelance",
      industry:
        "AmLaw 100 — Asset Management practice; contract attorney bench for private funds work",
      size: "AmLaw 100 firm; contract bench seats",
      location: "100% remote",
      fundingStage: "",
      techStack: JSON.stringify([
        "Asset Management Group contract bench",
        "100% remote, hourly billable",
        "5-20 years experience window",
        "Open to retooling attorneys into asset management practice",
      ]),
      fitScore: 45,
      intentScore: 35,
      fitDetails: JSON.stringify({
        fund_or_private_funds: 20,
        corporate_commercial_contracts_ma_financing: 10,
        seniority_counsel_or_gc_or_special_counsel: 10,
        comp_stated_and_market_credible: 5,
      }),
      intentDetails: JSON.stringify({
        engagement_model_fractional_interim_contract: 15,
        remote_or_hybrid_flex: 15,
        posted_within_72h: 0,
        easy_apply_or_direct_contact: 5,
      }),
      vertical: "legal",
      subvertical: "fund",
      engagementModel: "contract",
      buyerType: "law-firm",
      compensationText: "Hourly, billable-based",
      remoteFlag: "remote",
      employmentTypeRaw: "Contract attorney, hourly",
      urgencyScore: 55,
      starred: true,
      notes:
        "Highest-prestige firm-side opening in the freelance batch. Apply directly via the Ropes & Gray Recruiting portal. Once on the bench, repeat-engagement potential is high. Matches Mark's funds wheelhouse exactly.",
      source: "Daily Scrape 2026-06-02 (Ropes & Gray Recruiting)",
      lastActivity: "Posting active on Ropes & Gray Recruiting site",
    },
    contacts: [],
    scrape: {
      url: "https://www.ropesgrayrecruiting.com/en/life-at-ropes-and-gray/positions/funds-attorney-asset-management-group-remote",
      source: "law_firm_direct",
      matchedSignals: JSON.stringify([
        "amlaw_100_ropes_gray",
        "asset_management_group",
        "100_percent_remote",
        "hourly_billable_contract",
        "5_to_20_years_exp_window",
      ]),
    },
  },

  // ─── 3. Atlas Road Advisors — Contract Attorney (Corporate Transactions, Remote) — legal-freelance (combined 75, C+) ───
  {
    company: {
      name: "Atlas Road Advisors — Contract Attorney (Corporate Transactions, Remote)",
      website: "https://www.atlasroad.com",
      pipeline: "legal-freelance",
      industry:
        "Boutique legal/business advisory — corporate transactions for early-stage to high-growth companies",
      size: "Boutique network",
      location: "Remote (FL + CO licensure required)",
      fundingStage: "",
      techStack: JSON.stringify([
        "Corporate transactions (equity/debt financings, VC, M&A, securities)",
        "Part-time / contract basis",
        "4+ years experience required",
        "Licensure: Florida required + Colorado required (or willing to obtain)",
      ]),
      fitScore: 35,
      intentScore: 40,
      fitDetails: JSON.stringify({
        fund_or_private_funds: 0,
        corporate_commercial_contracts_ma_financing: 10,
        seniority_counsel_or_gc_or_special_counsel: 10,
        comp_stated_and_market_credible: 10,
        boutique_overflow: 5,
      }),
      intentDetails: JSON.stringify({
        engagement_model_fractional_interim_contract: 15,
        remote_or_hybrid_flex: 15,
        posted_within_72h: 5,
        easy_apply_or_direct_contact: 5,
      }),
      vertical: "legal",
      subvertical: "corporate",
      engagementModel: "contract",
      buyerType: "law-firm",
      compensationText: "$3K - $6K (range as posted)",
      remoteFlag: "remote",
      employmentTypeRaw: "Contract / part-time",
      urgencyScore: 60,
      starred: false,
      notes:
        "Buyer is law-firm overflow rather than direct corporate client. Comp range is modest. Worth a touch for Mark to position as fractional overflow counsel for boutique networks.",
      source: "Daily Scrape 2026-06-02 (Atlas Road / Indeed)",
      lastActivity: "Posting active",
    },
    contacts: [],
    scrape: {
      url: "https://www.atlasroad.com/",
      source: "law_firm_direct",
      matchedSignals: JSON.stringify([
        "contract_attorney_corporate_transactions",
        "remote",
        "fl_co_licensure",
        "4_years_minimum_exp",
        "boutique_legal_business_network",
      ]),
    },
  },

  // ─── 4. Waypoint Bio — pr-marketing (combined 73, C+) ───
  {
    company: {
      name: "Waypoint Bio",
      website: "https://www.waypointbio.com",
      pipeline: "pr-marketing",
      industry:
        "AI-native biotech — spatial biology + computer vision + pooled screening to design in vivo CAR-T therapies for solid tumors",
      size: "Series A; clinical entry late 2026 (China)",
      location: "US (China clinical entry)",
      fundingStage:
        "$20M Series A on 2026-06-01 led by Amplify Partners; GC + Lux + Mitsui + Time BioVentures + Hummingbird participating; Elliot Hershberg (Amplify) joined board.",
      techStack: JSON.stringify([
        "AI / spatial biology / pooled screening platform",
        "Lead program: WAY-103 in vivo CAR-T, paired with proprietary next-gen lentiviral vector",
        "China clinical entry expected late 2026 (investigator-initiated trial)",
        "Amplify lead + GC + Lux + Mitsui + Time BioVentures + Hummingbird",
      ]),
      fitScore: 38,
      intentScore: 35,
      fitDetails: JSON.stringify({
        industry_match_FS_Tech: 5,
        stage_size_growth: 8,
        clear_B2B_buyer_sales_motion: 5,
        proof_assets_customers_data: 10,
        budget_5k_25k_per_month: 10,
      }),
      intentDetails: JSON.stringify({
        trigger_launch_raise_rebrand_expansion: 15,
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
        "Biotech is outside FS/tech sweet spot but the AI-cell-therapy x China clinical narrative is unusually PR-rich. Lower priority but worth a touchpoint; warm intro via Amplify portfolio operators or GC biotech team.",
      source: "Daily Scrape 2026-06-02 (BioSpace, TechStartups roundup, Endpoints)",
      lastActivity: "$20M Series A announced 2026-06-01",
    },
    contacts: [
      {
        name: "Elliot Hershberg",
        title: "Amplify Partners — joined Waypoint Bio board",
        persona: "Investor / Board",
        decisionMaker: false,
      },
    ],
    scrape: {
      url: "https://www.biospace.com/press-releases/waypoint-bio-raises-20m-series-a-led-by-amplify-partners-to-advance-ai-designed-cell-therapies-toward-the-clinic",
      source: "news_funding",
      matchedSignals: JSON.stringify([
        "series_a_20m_amplify_2026_06_01",
        "ai_native_biotech_spatial_biology",
        "in_vivo_car_t_solid_tumors",
        "china_clinical_entry_late_2026",
        "amplify_gc_lux_mitsui_time_hummingbird",
      ]),
    },
  },

  // ─── 5. Maxwell (fka HDM Renewable Finance) — pr-marketing (combined 63, C) ───
  {
    company: {
      name: "Maxwell (fka HDM Renewable Finance)",
      website: "",
      pipeline: "pr-marketing",
      industry:
        "Climate / energy infrastructure project finance — battery storage and solar project development",
      size: "Mid-stage; rebrand from HDM Renewable Finance",
      location: "San Diego, CA",
      fundingStage:
        "$750M project finance commitment from Fairtide Partners announced 2026-06-01; total Fairtide commitment for Maxwell-developed projects now exceeds $1B.",
      techStack: JSON.stringify([
        "Battery storage + solar project development pipeline",
        "Fairtide Partners cumulative commitment >$1B",
        "Rebrand: HDM Renewable Finance → Maxwell",
      ]),
      fitScore: 33,
      intentScore: 30,
      fitDetails: JSON.stringify({
        industry_match_FS_Tech: 5,
        stage_size_growth: 8,
        clear_B2B_buyer_sales_motion: 5,
        proof_assets_customers_data: 10,
        budget_5k_25k_per_month: 5,
      }),
      intentDetails: JSON.stringify({
        trigger_launch_raise_rebrand_expansion: 15,
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
        "Rebrand + $1B milestone = clear PR moment. Energy infra borderline ICP. Track for second touch.",
      source: "Daily Scrape 2026-06-02 (TechStartups roundup 2026-06-01)",
      lastActivity: "$750M Fairtide commitment + rebrand announced 2026-06-01",
    },
    contacts: [],
    scrape: {
      url: "https://techstartups.com/2026/06/01/venture-capital-startup-funding-roundup-june-1-2026/",
      source: "news_funding",
      matchedSignals: JSON.stringify([
        "rebrand_hdm_to_maxwell",
        "fairtide_750m_commitment",
        "total_fairtide_over_1b",
        "battery_storage_solar_project_finance",
      ]),
    },
  },

  // ─── 6. Crypto.com — Director of PR & Communications — pr-freelance (combined 60, C) ───
  {
    company: {
      name: "Crypto.com — Director of PR & Communications",
      website: "https://crypto.com",
      pipeline: "pr-freelance",
      industry: "Crypto exchange / fintech",
      size: "Late-stage private; global crypto exchange",
      location: "Remote / US",
      fundingStage: "Late-stage private",
      techStack: JSON.stringify([
        "Director-level PR/Comms role",
        "Posting opened 2026-03-28 — open ~60+ days, longer-than-expected search",
        "Crypto exchange / consumer fintech",
      ]),
      fitScore: 35,
      intentScore: 25,
      fitDetails: JSON.stringify({
        pr_comms_clearly_stated: 20,
        sector_fit_finance_pe_vc_fintech: 10,
        workstream_exec_comms_thought_leadership_earned_media_ir: 5,
        agency_overflow_white_label_immediate: 0,
      }),
      intentDetails: JSON.stringify({
        engagement_model_freelance_contract_retainer_fractional: 5,
        remote_flex_part_time: 10,
        posted_within_72h: 0,
        urgency_signals_immediate_overflow_backfill: 5,
        easy_apply_or_direct_contact: 5,
      }),
      vertical: "pr",
      subvertical: "media-relations",
      engagementModel: "part-time",
      buyerType: "operating-company",
      compensationText: "",
      remoteFlag: "remote",
      employmentTypeRaw: "Full-time hire (Director-level)",
      urgencyScore: 45,
      starred: true,
      notes:
        "Job-board PR hiring → pr-freelance per Mark's routing rule. Pitch: 'cover the seat while you finish the search' — fractional bridge. Search has been open 60+ days, which is the strongest single freelance signal. Direct approach via LinkedIn InMail to crypto.com TA team.",
      source: "Daily Scrape 2026-06-02 (LinkedIn)",
      lastActivity: "Posting active since 2026-03-28; still open as of 2026-06-02",
    },
    contacts: [],
    scrape: {
      url: "https://www.linkedin.com/jobs/view/director-of-pr-communications-at-crypto-com-4391218875",
      source: "job_board",
      matchedSignals: JSON.stringify([
        "director_pr_comms_open_60_plus_days",
        "long_open_seat_fractional_pitch_trigger",
        "crypto_fintech_sector",
        "remote",
      ]),
    },
  },

  // ─── 7. Hayden Industrial LLC — Fractional GC — legal-freelance (combined 55, C) ───
  {
    company: {
      name: "Hayden Industrial LLC — Fractional General Counsel (Remote)",
      website: "",
      pipeline: "legal-freelance",
      industry: "Industrial / engineered equipment supply",
      size: "Operating company",
      location: "Remote",
      fundingStage: "",
      techStack: JSON.stringify([
        "Commercial contracts (engineered equipment supply, industrial project delivery)",
        "Supply chain + vendor agreements",
        "Insurance, employment, real estate scope",
        "Coordination with outside counsel",
      ]),
      fitScore: 25,
      intentScore: 30,
      fitDetails: JSON.stringify({
        fund_or_private_funds: 0,
        corporate_commercial_contracts_ma_financing: 10,
        seniority_counsel_or_gc_or_special_counsel: 10,
        comp_stated_and_market_credible: 0,
        operating_company_scope: 5,
      }),
      intentDetails: JSON.stringify({
        engagement_model_fractional_interim_contract: 15,
        remote_or_hybrid_flex: 10,
        posted_within_72h: 0,
        easy_apply_or_direct_contact: 5,
      }),
      vertical: "legal",
      subvertical: "contracts",
      engagementModel: "fractional",
      buyerType: "operating-company",
      compensationText: "",
      remoteFlag: "remote",
      employmentTypeRaw: "Fractional General Counsel",
      urgencyScore: 40,
      starred: false,
      notes:
        "Industrial/equipment supply not core to fund-focused ICP. Posting from April 2026. Lower priority — included for completeness; suppress if Mark prefers funds-only freelance pipeline.",
      source: "Daily Scrape 2026-06-02 (Enderez Law / Acquisition Stars FGC roundup)",
      lastActivity: "Posting active since 2026-04-08",
    },
    contacts: [],
    scrape: {
      url: "https://acquisitionstars.com/services/fractional-general-counsel",
      source: "law_firm_direct",
      matchedSignals: JSON.stringify([
        "fractional_general_counsel",
        "remote",
        "industrial_equipment_supply",
        "broad_gc_scope",
      ]),
    },
  },

  // ─── 8. SpeedLabs — pr-marketing (combined 47, D+) ───
  {
    company: {
      name: "SpeedLabs",
      website: "",
      pipeline: "pr-marketing",
      industry: "Sports tech / gaming / consumer",
      size: "Seed; pre-launch / just-launched",
      location: "US",
      fundingStage:
        "$6.5M seed on 2026-06-01 led by Parlay Capital; Bullpen Capital, TA Ventures, EdgeEquity, and other sports/gaming/consumer-tech investors participating.",
      techStack: JSON.stringify([
        "Sports / gaming / consumer tech",
        "Parlay Capital lead",
        "Bullpen + TA Ventures + EdgeEquity syndicate",
      ]),
      fitScore: 25,
      intentScore: 22,
      fitDetails: JSON.stringify({
        industry_match_FS_Tech: 2,
        stage_size_growth: 8,
        clear_B2B_buyer_sales_motion: 5,
        proof_assets_customers_data: 5,
        budget_5k_25k_per_month: 5,
      }),
      intentDetails: JSON.stringify({
        trigger_launch_raise_rebrand_expansion: 12,
        timeline_to_start_0_30_days: 5,
        decision_maker_engaged: 3,
        urgency_pain_reputation_pipeline: 0,
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
        "Borderline: launch + credible investors fit launch-comms angle, but consumer/sports outside primary ICP. Track only.",
      source: "Daily Scrape 2026-06-02 (TechStartups roundup 2026-06-01)",
      lastActivity: "$6.5M seed announced 2026-06-01",
    },
    contacts: [],
    scrape: {
      url: "https://techstartups.com/2026/06/01/venture-capital-startup-funding-roundup-june-1-2026/",
      source: "news_funding",
      matchedSignals: JSON.stringify([
        "seed_6_5m_parlay_2026_06_01",
        "sports_gaming_consumer_tech",
        "credible_syndicate",
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
