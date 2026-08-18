#!/usr/bin/env node
/**
 * Import leads from Daily Scrape 2026-06-12 (Friday)
 *
 * Usage:  cd MarCRM && node scripts/import-2026-06-12.cjs
 *
 * 5 new leads:
 *   1. Forage                                  (pr-marketing,   combined 77, B)
 *   2. THEKER                                  (pr-marketing,   combined 66, B — EU geo caveat)
 *   3. PagerDuty — Interim Dir. Comms          (pr-freelance,   combined 65, B — VERIFY posting)
 *   4. Digital Asset                           (pr-marketing,   combined 58, C)
 *   5. Stealth Startup — Fractional Legal Counsel (legal-freelance, combined 58, C)
 *
 * - Deduplicates by company name (skips if already in DB).
 * - Creates Company + Contact records and a ScrapeResult per lead.
 * - Freelance fields populated for pr-freelance / legal-freelance leads;
 *   empty/0 for pr-marketing leads.
 *
 * SIGNAL REFRESH (NOT applied by this script — these companies already exist
 * in the DB; update scores manually or via the pipeline UI):
 *   - Standard Bots (pr-marketing): D -> A. Raised $200M Series C on 2026-06-11.
 *     Combined 59 -> 80 (+21). Highest-leverage item this week — act now while
 *     the raise is news. Pitch a launch/awareness sprint tied to the Series C.
 *   - Capsa AI (82), Vinyl Equity (81), SyntheticFi (78): no new signal since
 *     added 06-11; funding already captured. Monitor.
 *
 * NOTE: Websites/contacts are best-effort.
 *   - PagerDuty interim-comms posting surfaced via the Go Fractional board but
 *     could NOT be independently verified — confirm it is live before outreach.
 *   - "Stealth Startup" is intentionally anonymized on the source board.
 *
 * NOTE: Neon DB is unreachable from the Cowork sandbox, so this script must be
 * run from Katie's local machine where DATABASE_URL points to Neon production.
 */

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const LEADS = [
  // ─── 1. Forage — pr-marketing (combined 77, B) ───
  {
    company: {
      name: "Forage",
      website: "https://www.joinforage.com",
      pipeline: "pr-marketing",
      industry:
        "Fintech / payments infrastructure — SNAP/EBT, WIC, HSA/FSA acceptance for retailers; new consumer EBT-balance + rewards app",
      size: "Series B; ~$62M total raised; scaling consumer app",
      location: "San Francisco, CA",
      fundingStage:
        "$40M Series B announced 2026-06-03/04, led by Mouro Capital with Nyca Partners, PayPal Ventures, Long Journey Ventures, Intuit Ventures, NextLadder Ventures, Pivotal Ventures, FJ Labs. Total disclosed ~$62M.",
      techStack: JSON.stringify([
        "Government-benefits payment rails (SNAP/EBT, WIC, HSA/FSA)",
        "Consumer app: 100k+ downloads since late 2025",
        "Public goal: 1M low-income families by end of 2026",
        "Founded 2022; led by CEO Ofek Lavian",
      ]),
      fitScore: 44,
      intentScore: 33,
      fitDetails: JSON.stringify({
        industry_match_FS_Tech: 10,
        stage_size_growth: 10,
        clear_B2B_buyer_sales_motion: 8,
        proof_assets_customers_data: 10,
        budget_5k_25k_per_month: 6,
      }),
      intentDetails: JSON.stringify({
        trigger_launch_raise_rebrand_expansion: 15,
        timeline_to_start_0_30_days: 5,
        decision_maker_engaged: 6,
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
      starred: true,
      notes:
        "Grade B (77). Strongest new pr-marketing lead today. Fintech infra + consumer-app launch + mission-driven narrative = earned-media friendly. CAVEAT: already running its own PR Newswire distribution — confirm whether they have incumbent comms before pitching retainer vs. project.",
      source: "Daily Scrape 2026-06-12 (fintech.global / PR Newswire / FinSMEs, 3-4 Jun 2026)",
      lastActivity: "$40M Series B announced 2026-06-03/04",
    },
    contacts: [
      { name: "Ofek Lavian", title: "Co-founder & CEO", email: "", linkedin: "" },
    ],
    scrape: {
      url: "https://fintech.global/2026/06/04/forage-targets-one-million-families-with-40m-funding-round/",
      source: "news_funding",
      matchedSignals: JSON.stringify([
        "series_b_40m_mouro_capital_2026_06_03",
        "consumer_app_launch_100k_downloads",
        "snap_ebt_payments_infrastructure",
        "mission_driven_earned_media_angle",
      ]),
    },
  },

  // ─── 2. THEKER — pr-marketing (combined 66, B — EU geo caveat) ───
  {
    company: {
      name: "THEKER",
      website: "https://www.theker.ai",
      pipeline: "pr-marketing",
      industry:
        "AI-native industrial robotics — reconfigurable generalist factory robots that adapt in real time",
      size: "Series A; largest European robotics Series A on record",
      location: "Barcelona, Spain",
      fundingStage:
        "EUR 73M (~$85M) Series A announced 2026-06-11, led by CRV with Samsung, LVMH, Cathay Innovation, 20VC, Henkel Ventures, Korelya, Bright Pixel Capital.",
      techStack: JSON.stringify([
        "AI-native generalist industrial robots",
        "Tier-one industrial operator deployments",
        "Marquee backers: CRV (first Spain deal), Samsung, LVMH",
        "Founders: Carla Gomez Cano, Jiaqiang Ye Zhu",
      ]),
      fitScore: 36,
      intentScore: 30,
      fitDetails: JSON.stringify({
        industry_match_FS_Tech: 8,
        stage_size_growth: 9,
        clear_B2B_buyer_sales_motion: 8,
        proof_assets_customers_data: 8,
        budget_5k_25k_per_month: 3,
      }),
      intentDetails: JSON.stringify({
        trigger_launch_raise_rebrand_expansion: 15,
        timeline_to_start_0_30_days: 5,
        decision_maker_engaged: 6,
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
        "Grade B (66). GEO CAVEAT: EU-based, lower practical fit for a US agency unless angle is US-market entry / US tech-press positioning. Strong trigger and marquee first-time backers (Samsung, LVMH) drive heavy press interest.",
      source: "Daily Scrape 2026-06-12 (EU-Startups / TechFundingNews / TheNextWeb, 11 Jun 2026)",
      lastActivity: "EUR 73M Series A announced 2026-06-11",
    },
    contacts: [
      { name: "Carla Gomez Cano", title: "Co-founder", email: "", linkedin: "" },
      { name: "Jiaqiang Ye Zhu", title: "Co-founder", email: "", linkedin: "" },
    ],
    scrape: {
      url: "https://www.eu-startups.com/2026/06/barcelona-based-theker-raises-e73-million-series-a-to-accelerate-ai-robotics-deployment/",
      source: "news_funding",
      matchedSignals: JSON.stringify([
        "series_a_73m_eur_crv_2026_06_11",
        "largest_european_robotics_series_a",
        "samsung_lvmh_first_spain_investments",
        "eu_geo_caveat_us_agency_fit",
      ]),
    },
  },

  // ─── 3. PagerDuty — Interim Director of Communications — pr-freelance (combined 65, B — VERIFY) ───
  {
    company: {
      name: "PagerDuty — Interim Director of Communications (6-month contract)",
      website: "https://www.pagerduty.com",
      pipeline: "pr-freelance",
      industry: "B2B SaaS — digital operations / incident management (NYSE: PD)",
      size: "Public company",
      location: "San Francisco Bay Area (hybrid)",
      fundingStage: "Public (NYSE: PD)",
      techStack: JSON.stringify([
        "Interim Director of Communications, 6-month contract",
        "Surfaced via Go Fractional job board",
        "Context: CEO transition (DiLullo in, Tejada to Exec Chair) eff. 2026-05-11",
      ]),
      fitScore: 35,
      intentScore: 30,
      fitDetails: JSON.stringify({
        pr_comms_clearly_stated: 20,
        sector_fit_finance_pe_b2b: 7,
        workstream_execcomms_thoughtleadership_earnedmedia_ir: 8,
        agency_overflow_whitelabel_immediate: 0,
      }),
      intentDetails: JSON.stringify({
        engagement_model_freelance_contract_retainer_fractional: 15,
        remote_flexible_parttime: 5,
        posted_within_72h: 0,
        urgency_immediate_overflow_backfill: 8,
        easy_apply_direct_contact: 2,
      }),
      vertical: "pr",
      subvertical: "comms",
      engagementModel: "interim",
      buyerType: "pre-ipo",
      compensationText: "",
      remoteFlag: "hybrid",
      employmentTypeRaw: "Interim / 6-month contract (Director of Communications)",
      urgencyScore: 55,
      starred: false,
      notes:
        "Grade B (65). VERIFY BEFORE OUTREACH — live posting could not be independently confirmed (direct search returned only SEC filings). CEO transition (eff. 2026-05-11) makes an interim-comms need plausible. Classic interim-comms-during-leadership-change pitch if real.",
      source: "Daily Scrape 2026-06-12 (Go Fractional job board, via search index)",
      lastActivity: "Interim comms posting surfaced; CEO transition eff. 2026-05-11",
    },
    contacts: [],
    scrape: {
      url: "https://www.gofractional.com/job/welcometothejungle-interim-director-communications-pagerduty",
      source: "job_board_freelance",
      matchedSignals: JSON.stringify([
        "interim_director_communications_6mo_contract",
        "ceo_transition_leadership_change_context",
        "UNVERIFIED_posting_confirm_before_outreach",
      ]),
    },
  },

  // ─── 4. Digital Asset — pr-marketing (combined 58, C) ───
  {
    company: {
      name: "Digital Asset",
      website: "https://www.digitalasset.com",
      pipeline: "pr-marketing",
      industry:
        "Blockchain / capital-markets infrastructure — Canton Network institutional blockchain",
      size: "Established (founded 2014); late-stage",
      location: "New York, NY",
      fundingStage:
        "$355M late-stage round announced 2026-06-11, 70+ investors participating.",
      techStack: JSON.stringify([
        "Canton Network institutional blockchain",
        "Late-stage, 70+ investor round",
        "Established 2014 — mature comms likely in place",
      ]),
      fitScore: 32,
      intentScore: 26,
      fitDetails: JSON.stringify({
        industry_match_FS_Tech: 10,
        stage_size_growth: 5,
        clear_B2B_buyer_sales_motion: 8,
        proof_assets_customers_data: 8,
        budget_5k_25k_per_month: 1,
      }),
      intentDetails: JSON.stringify({
        trigger_launch_raise_rebrand_expansion: 15,
        timeline_to_start_0_30_days: 4,
        decision_maker_engaged: 4,
        urgency_pain_reputation_pipeline: 2,
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
      starred: false,
      notes:
        "Grade C (58). Established/late-stage — almost certainly has mature in-house comms + incumbent agency. Low agency fit; logged for completeness, not a priority.",
      source: "Daily Scrape 2026-06-12 (Tech Startups VC roundup, 11 Jun 2026)",
      lastActivity: "$355M late-stage round announced 2026-06-11",
    },
    contacts: [],
    scrape: {
      url: "https://techstartups.com/2026/06/11/venture-capital-startup-funding-roundup-june-11-2026/",
      source: "news_funding",
      matchedSignals: JSON.stringify([
        "late_stage_355m_2026_06_11",
        "70plus_investors",
        "established_2014_low_agency_fit",
      ]),
    },
  },

  // ─── 5. Stealth Startup — Fractional Legal Counsel — legal-freelance (combined 58, C) ───
  {
    company: {
      name: "Stealth Startup — Fractional Legal Counsel (via Fractional Jobs)",
      website: "https://www.fractionaljobs.io/jobs/fractional-legal-counsel-stealth-startup",
      pipeline: "legal-freelance",
      industry: "Startup (stealth)",
      size: "Early stage (stealth)",
      location: "Remote (US)",
      fundingStage: "Early stage (stealth)",
      techStack: JSON.stringify([
        "Fractional legal counsel posting on Fractional Jobs board",
        "Corporate/commercial GC scope (not fund-specific)",
        "Remote + fractional engagement model",
      ]),
      fitScore: 20,
      intentScore: 38,
      fitDetails: JSON.stringify({
        fund_private_funds_formation: 0,
        corporate_commercial_ma_financing: 10,
        seniority_counsel_gc: 10,
        comp_stated_market_credible: 0,
      }),
      intentDetails: JSON.stringify({
        engagement_model_fractional_interim_contract_freelance: 15,
        remote_or_hybrid_flex: 13,
        posted_within_72h: 5,
        easy_apply_direct_contact: 5,
      }),
      vertical: "legal",
      subvertical: "GC",
      engagementModel: "fractional",
      buyerType: "startup",
      compensationText: "",
      remoteFlag: "remote",
      employmentTypeRaw: "Fractional Legal Counsel (part-time / project)",
      urgencyScore: 60,
      starred: false,
      notes:
        "Grade C (58). Corporate/commercial fractional GC fit — not fund-specific, which caps fit. Clean engagement-model match (fractional + remote). Stealth = limited detail on practice area and comp. Worth a direct application.",
      source: "Daily Scrape 2026-06-12 (Fractional Jobs board)",
      lastActivity: "Active fractional legal counsel posting",
    },
    contacts: [],
    scrape: {
      url: "https://www.fractionaljobs.io/jobs/fractional-legal-counsel-stealth-startup",
      source: "job_board_freelance",
      matchedSignals: JSON.stringify([
        "fractional_legal_counsel_remote",
        "corporate_commercial_gc_scope",
        "engagement_model_fractional_strong_intent",
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
