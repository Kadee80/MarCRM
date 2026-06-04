#!/usr/bin/env node
/**
 * Import leads from Daily Scrape 2026-06-04 (Thursday)
 *
 * Usage:  cd MarCRM && node scripts/import-2026-06-04.cjs
 *
 * 4 new leads (all pr-marketing, all June-3 funding triggers):
 *   1. Forage    (pr-marketing, combined 79, B)
 *   2. Arpio     (pr-marketing, combined 75, B)
 *   3. Lassie    (pr-marketing, combined 74, B)
 *   4. Terra AI  (pr-marketing, combined 67, B)
 *
 * - Deduplicates by company name (skips if already in DB).
 * - Creates Company + Contact records and a ScrapeResult per lead.
 * - Enhanced freelance fields (vertical, subvertical, engagementModel,
 *   buyerType, compensationText, remoteFlag, employmentTypeRaw,
 *   urgencyScore) are empty/0 — no freelance leads today.
 *
 * NOTE: Websites for Forage/Arpio/Lassie are best-effort (search did not
 * surface a verified canonical URL). Verify before outreach.
 *
 * NOTE: Neon DB is unreachable from the Cowork sandbox, so this script
 * must be run from Katie's local machine where DATABASE_URL points to
 * the Neon production instance.
 */

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const LEADS = [
  // ─── 1. Forage — pr-marketing (combined 79, B) ───
  {
    company: {
      name: "Forage",
      website: "https://www.joinforage.com",
      pipeline: "pr-marketing",
      industry:
        "Fintech infrastructure — SNAP/EBT/WIC/HSA/FSA benefits payments rails for retailers; consumer balance-check + grocery savings app",
      size: "Series B; live in 100k+ stores across all 50 states; ~$225M valuation",
      location: "San Francisco, California, USA",
      fundingStage:
        "$40M Series B on 2026-06-03 led by Mouro Capital (Nyca Partners, PayPal Ventures, Long Journey Ventures, Intuit Ventures, NextLadder Ventures, Pivotal Ventures, FJ Labs). ~$225M valuation per WSJ. At least $62M total raised.",
      techStack: JSON.stringify([
        "Benefits payments rails: SNAP, EBT, WIC, HSA/FSA",
        "Logos: Dollar General, Gopuff, Save A Lot, DoorDash, Uber Eats",
        "100k+ stores, all 50 states",
        "Consumer app: balance checks + grocery savings",
        "PayPal Ventures + Intuit Ventures + Nyca syndicate",
      ]),
      fitScore: 47,
      intentScore: 32,
      fitDetails: JSON.stringify({
        industry_match_FS_Tech: 10,
        stage_size_growth: 10,
        clear_B2B_buyer_sales_motion: 9,
        proof_assets_customers_data: 10,
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
      starred: true,
      notes:
        "Top new lead today. Strong FS-infrastructure fit. Twin trigger: Series B raise + consumer app launch = product-launch comms + investor/media narrative need. PayPal/Intuit Ventures = warm-intro paths. Mission-driven angle (40M Americans on benefits) is earned-media gold. Website best-effort — verify before outreach.",
      source: "Daily Scrape 2026-06-04 (Tech Startups VC Roundup / WSJ)",
      lastActivity: "$40M Series B announced 2026-06-03",
    },
    contacts: [],
    scrape: {
      url: "https://techstartups.com/2026/06/03/venture-capital-startup-funding-roundup-june-3-2026/",
      source: "news_funding",
      matchedSignals: JSON.stringify([
        "series_b_40m_mouro_paypal_ventures_2026_06_03",
        "valuation_225m_per_wsj",
        "logos_dollar_general_gopuff_doordash_uber_eats",
        "100k_plus_stores_all_50_states",
        "consumer_app_launch_balance_check_grocery_savings",
      ]),
    },
  },

  // ─── 2. Arpio — pr-marketing (combined 75, B) ───
  {
    company: {
      name: "Arpio",
      website: "https://www.arpio.io",
      pipeline: "pr-marketing",
      industry:
        "Cloud resilience / cybersecurity — automated disaster recovery for AI-native cloud (AWS, Azure; expanding to GCP)",
      size: "Series A; enterprise customers on AWS/Azure",
      location: "Durham, North Carolina, USA",
      fundingStage:
        "$15M Series A on 2026-06-03 co-led by S3 Ventures and Paladin Capital Group (Draper Associates, Uncorrelated, Valor Ventures, CreativeCo Capital, Lookout Ventures).",
      techStack: JSON.stringify([
        "Cloud-native disaster recovery + resilience automation",
        "AWS + Azure; expanding to Google Cloud",
        "Security + resilience 'one budget' thesis (Paladin)",
        "S3 Ventures + Paladin Capital syndicate",
      ]),
      fitScore: 42,
      intentScore: 33,
      fitDetails: JSON.stringify({
        industry_match_FS_Tech: 9,
        stage_size_growth: 10,
        clear_B2B_buyer_sales_motion: 9,
        proof_assets_customers_data: 8,
        budget_5k_25k_per_month: 6,
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
        "B2B cybersecurity/infra. Trigger: Series A raise + GCP expansion = category narrative + thought-leadership window ('resilience is core spend, not insurance'). Series A budget likely lower end of agency tier — pitch a focused 90-day launch sprint, not a full retainer. Website best-effort — verify.",
      source: "Daily Scrape 2026-06-04 (Tech Startups VC Roundup)",
      lastActivity: "$15M Series A announced 2026-06-03",
    },
    contacts: [],
    scrape: {
      url: "https://techstartups.com/2026/06/03/venture-capital-startup-funding-roundup-june-3-2026/",
      source: "news_funding",
      matchedSignals: JSON.stringify([
        "series_a_15m_s3_paladin_2026_06_03",
        "expansion_to_google_cloud_announced",
        "security_resilience_one_budget_thesis",
        "ransomware_cloud_outage_pain_narrative",
      ]),
    },
  },

  // ─── 3. Lassie — pr-marketing (combined 74, B) ───
  {
    company: {
      name: "Lassie",
      website: "https://www.lassie.io",
      pipeline: "pr-marketing",
      industry:
        "Vertical AI — autonomous back-office automation for SMBs, initial focus healthcare practices (insurance portals, reimbursements, reconciliation)",
      size: "Series A; 700+ practices across 49 states",
      location: "San Francisco, California, USA",
      fundingStage:
        "$35M Series A on 2026-06-03 led by Andreessen Horowitz (Night Capital, Rahul Vohra, Zach Perret, Taavet Hinrikus, Gokul Rajaram, Brian Balfour). $47M total raised.",
      techStack: JSON.stringify([
        "Autonomous agents for SMB back-office (healthcare admin first)",
        "Insurance portal entry, reimbursements, reconciliation",
        "700+ practices, 49 states; 250k+ labor hours/yr automated",
        "a16z-led; angel roster incl. Zach Perret, Taavet Hinrikus",
      ]),
      fitScore: 42,
      intentScore: 32,
      fitDetails: JSON.stringify({
        industry_match_FS_Tech: 8,
        stage_size_growth: 10,
        clear_B2B_buyer_sales_motion: 9,
        proof_assets_customers_data: 9,
        budget_5k_25k_per_month: 6,
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
        "a16z-backed vertical-AI 'agents that do the work' story. Excellent quantified proof (250k labor hours/yr, 700+ practices, 49 states) and on-trend 'execution layer' narrative. Healthcare-admin angle narrower than core FS/tech. Website best-effort — VERIFY it's the a16z healthcare-automation Lassie, not the EU pet-insurance Lassie.",
      source: "Daily Scrape 2026-06-04 (Tech Startups VC Roundup)",
      lastActivity: "$35M Series A announced 2026-06-03",
    },
    contacts: [],
    scrape: {
      url: "https://techstartups.com/2026/06/03/venture-capital-startup-funding-roundup-june-3-2026/",
      source: "news_funding",
      matchedSignals: JSON.stringify([
        "series_a_35m_a16z_2026_06_03",
        "700_plus_practices_49_states",
        "250k_labor_hours_annually_automated",
        "execution_layer_ai_narrative",
      ]),
    },
  },

  // ─── 4. Terra AI — pr-marketing (combined 67, B borderline) ───
  {
    company: {
      name: "Terra AI",
      website: "https://www.terraai.com",
      pipeline: "pr-marketing",
      industry:
        "Industrial AI — subsurface modeling for mineral/reservoir exploration (copper, gold, rare earth), carbon storage, enhanced geothermal",
      size: "Series A; traction across copper/gold/rare-earth/reservoir projects",
      location: "Palo Alto, California, USA",
      fundingStage:
        "$20M Series A on 2026-06-03 led by Khosla Ventures, with strategic investment from BHP Ventures.",
      techStack: JSON.stringify([
        "AI integration of exploration datasets; millions of geological models",
        "Drill targeting + project-economics evaluation",
        "Extending to carbon storage + enhanced geothermal",
        "Khosla Ventures + BHP Ventures (strategic) syndicate",
      ]),
      fitScore: 37,
      intentScore: 30,
      fitDetails: JSON.stringify({
        industry_match_FS_Tech: 5,
        stage_size_growth: 10,
        clear_B2B_buyer_sales_motion: 8,
        proof_assets_customers_data: 8,
        budget_5k_25k_per_month: 6,
      }),
      intentDetails: JSON.stringify({
        trigger_launch_raise_rebrand_expansion: 14,
        timeline_to_start_0_30_days: 6,
        decision_maker_engaged: 3,
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
        "Lowest priority of today's four. Industry fit weak (industrial/energy, not FS/tech core), but Khosla + BHP strategic backing and a clean critical-minerals/energy-transition narrative are credible thought-leadership hooks. Pursue only if higher-fit leads stall. Website best-effort — verify.",
      source: "Daily Scrape 2026-06-04 (Tech Startups VC Roundup)",
      lastActivity: "$20M Series A announced 2026-06-03",
    },
    contacts: [],
    scrape: {
      url: "https://techstartups.com/2026/06/03/venture-capital-startup-funding-roundup-june-3-2026/",
      source: "news_funding",
      matchedSignals: JSON.stringify([
        "series_a_20m_khosla_bhp_ventures_2026_06_03",
        "strategic_industrial_backer_bhp",
        "critical_minerals_energy_transition_narrative",
        "traction_copper_gold_rare_earth_reservoir",
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
