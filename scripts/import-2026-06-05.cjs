#!/usr/bin/env node
/**
 * Import leads from Daily Scrape 2026-06-05 (Friday)
 *
 * Usage:  cd MarCRM && node scripts/import-2026-06-05.cjs
 *
 * 2 new leads (both pr-marketing, both early-June 2026 funding triggers):
 *   1. Adaptive Innovations (pr-marketing, combined 70, B)
 *   2. Ilant Health         (pr-marketing, combined 68, B)
 *
 * - Deduplicates by company name (skips if already in DB).
 * - Creates Company + Contact records and a ScrapeResult per lead.
 * - Enhanced freelance fields (vertical, subvertical, engagementModel,
 *   buyerType, compensationText, remoteFlag, employmentTypeRaw,
 *   urgencyScore) are empty/0 — no freelance leads today (board sweeps
 *   returned only already-captured aggregators; no fabrication).
 *
 * NOTE: Websites for both leads are best-effort (search did not surface a
 * verified canonical URL). Verify before outreach.
 *
 * NOTE: Neon DB is unreachable from the Cowork sandbox, so this script
 * must be run from Katie's local machine where DATABASE_URL points to
 * the Neon production instance.
 */

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const LEADS = [
  // ─── 1. Adaptive Innovations — pr-marketing (combined 70, B) ───
  {
    company: {
      name: "Adaptive Innovations",
      website: "https://www.adaptive.co",
      pipeline: "pr-marketing",
      industry:
        "Healthcare AI — AI-native home health provider (full-stack: intake, eligibility, scheduling, charting, coding, QA, billing). Operating across major Texas metros.",
      size: "Series A; 200+ clinicians; 100k+ patient visits; all major TX metros",
      location: "Texas, USA (all major TX metros)",
      fundingStage:
        "$50M Series A in June 2026 ($60M total incl. seed). Investors: Felicis, Bain Capital Ventures, Optum Ventures, Sunflower Capital, Conviction, BoxGroup, SV Angel, Dorm Room Fund, Constellation. Founders: Alex Wendland, Logan Stinson.",
      techStack: JSON.stringify([
        "Single-agent native AI platform across the clinical loop",
        "AI back-office: intake, eligibility, scheduling, charting, coding, QA, billing",
        "200+ clinicians; 100k+ visits; 49-state-adjacent TX metro footprint",
        "80% documentation-time reduction; <5% rehospitalization vs 11% industry avg",
        "Felicis + Bain Capital Ventures + Optum Ventures syndicate",
      ]),
      fitScore: 37,
      intentScore: 33,
      fitDetails: JSON.stringify({
        industry_match_FS_Tech: 5,
        stage_size_growth: 9,
        clear_B2B_buyer_sales_motion: 5,
        proof_assets_customers_data: 10,
        budget_5k_25k_per_month: 8,
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
      starred: true,
      notes:
        "Top new lead today. Twin trigger: stealth emergence + $50M Series A = strong narrative-launch window. Exceptional quantified proof (100k+ visits, 80% doc-time reduction, <5% rehospitalization, 200+ clinicians). Industry fit partial (healthcare delivery, not core FS/tech) and full-stack provider rather than B2B SaaS softens the sales-motion score → B. Pitch a launch/narrative sprint. Website (adaptive.co) per company blog — verify before outreach.",
      source: "Daily Scrape 2026-06-05 (Home Health Care News / FinSMEs / D CEO / citybiz)",
      lastActivity: "$50M Series A announced June 2026",
    },
    contacts: [
      { name: "Alex Wendland", title: "Co-founder / CEO", email: "", linkedin: "" },
      { name: "Logan Stinson", title: "Co-founder", email: "", linkedin: "" },
    ],
    scrape: {
      url: "https://homehealthcarenews.com/2026/06/ai-powered-home-health-provider-adaptive-innovations-lands-50m-series-a/",
      source: "news_funding",
      matchedSignals: JSON.stringify([
        "series_a_50m_60m_total_june_2026",
        "emerged_from_stealth",
        "200_plus_clinicians_100k_plus_visits",
        "doc_time_reduced_80pct_rehospitalization_under_5pct",
        "felicis_bain_capital_ventures_optum_ventures_syndicate",
      ]),
    },
  },

  // ─── 2. Ilant Health — pr-marketing (combined 68, B) ───
  {
    company: {
      name: "Ilant Health",
      website: "https://www.ilanthealth.com",
      pipeline: "pr-marketing",
      industry:
        "Healthcare AI — value-based precision obesity care; AI matches behavioral therapy, medication, and surgery. Sold to employers and health plans.",
      size: "Series A; ~$22M total equity; employer + health-plan customers",
      location: "USA",
      fundingStage:
        "$15M Series A (~2026-06-02; in techstartups 2026-06-04 roundup); ~$22M total equity. Led by Cornucopian Capital (naturalX, Peakbridge, Semcap AI, Evidenced, Operator Partners, Celtic, LifeX, AlphaLab). Founders: Elina Onitskansky (ex-McKinsey, ex-Molina), Jessica Muse.",
      techStack: JSON.stringify([
        "AI-driven matching of behavioral therapy, medication, surgery",
        "Continuous outcome monitoring (clinical, behavioral, personal data)",
        "B2B sales motion to employers and health plans",
        "Avg 15% member weight loss + broader health indicators",
        "Cornucopian Capital-led syndicate",
      ]),
      fitScore: 36,
      intentScore: 32,
      fitDetails: JSON.stringify({
        industry_match_FS_Tech: 5,
        stage_size_growth: 8,
        clear_B2B_buyer_sales_motion: 8,
        proof_assets_customers_data: 8,
        budget_5k_25k_per_month: 7,
      }),
      intentDetails: JSON.stringify({
        trigger_launch_raise_rebrand_expansion: 13,
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
        "Clear B2B buyer (employers, health plans) and a timely earned-media angle: employers rethinking costly GLP-1 coverage. Credible founders (ex-McKinsey/Molina); avg 15% weight loss. Healthcare, not core FS/tech, so industry fit partial → B. Pitch a post-raise comms build + thought-leadership on the GLP-1 / value-based-care narrative. Website (ilanthealth.com) best-effort — verify before outreach.",
      source: "Daily Scrape 2026-06-05 (Endpoints / HIT Consultant / BusinessWire / Tech Startups)",
      lastActivity: "$15M Series A announced ~2026-06-02",
    },
    contacts: [
      { name: "Elina Onitskansky", title: "Co-founder / CEO", email: "", linkedin: "" },
      { name: "Jessica Muse", title: "Co-founder", email: "", linkedin: "" },
    ],
    scrape: {
      url: "https://techstartups.com/2026/06/04/ilant-health-raises-15m-to-use-ai-for-obesity-care-as-employers-rethink-costly-glp-1-coverage/",
      source: "news_funding",
      matchedSignals: JSON.stringify([
        "series_a_15m_2026_06_02",
        "cornucopian_capital_led_syndicate",
        "b2b_sells_to_employers_and_health_plans",
        "avg_15pct_weight_loss_member_outcomes",
        "glp1_cost_employer_narrative_timely",
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
