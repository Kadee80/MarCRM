#!/usr/bin/env node
/**
 * Import leads from Daily Scrape 2026-06-10 (Wednesday)
 *
 * Usage:  cd MarCRM && node scripts/import-2026-06-10.cjs
 *
 * 2 new leads (both pr-marketing, funding triggers announced 9 Jun 2026):
 *   1. Golden Analytics (pr-marketing, combined 73, B)
 *   2. Standard Bots    (pr-marketing, combined 59, C — flagged, too large)
 *
 * - Deduplicates by company name (skips if already in DB).
 * - Creates Company + Contact records and a ScrapeResult per lead.
 * - Freelance fields (vertical, subvertical, engagementModel, buyerType,
 *   compensationText, remoteFlag, employmentTypeRaw, urgencyScore) are
 *   empty/0 for these pr-marketing leads.
 *
 * NO new legal-freelance or pr-freelance leads today (job boards returned
 * aggregators + dups only). See the .md/.json reports for detail.
 *
 * SIGNAL REFRESH (NOT applied by this script — these companies already
 * exist in the DB; update manually if desired):
 *   - A Security: correct founders to ex-Check Point / Hunters / IDF Unit
 *     8200 (Israeli), NOT 'ex-AWS / ex-Abnormal'. Drop intent 36 -> ~30
 *     (heavy launch press => they already have PR). Move to watch.
 *   - Suno: litigation widening (musicians v. Warner/Universal filed
 *     2026-06-09; Sony summary-judgment hearing still July 2026). No action.
 *
 * NOTE: Websites are best-effort. Golden Analytics URL is unconfirmed
 * (goldenanalytics.ai; could be golden.com / trygolden.ai) — verify
 * before outreach. Standard Bots website confirmed.
 *
 * NOTE: Neon DB is unreachable from the Cowork sandbox, so this script
 * must be run from Katie's local machine where DATABASE_URL points to
 * the Neon production instance.
 */

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const SOURCE_URL =
  "https://techstartups.com/2026/06/09/venture-capital-startup-funding-roundup-june-9-2026-2/";

const LEADS = [
  // ─── 1. Golden Analytics — pr-marketing (combined 73, B) ───
  {
    company: {
      name: "Golden Analytics",
      website: "https://www.goldenanalytics.ai",
      pipeline: "pr-marketing",
      industry:
        "Enterprise AI / business intelligence — 'AI-native' analytics workspace with a spreadsheet-like interface that connects data sources (Snowflake, BigQuery) and uses generative AI to auto-surface visualizations, trends, and insights; positioned against Tableau / Power BI",
      size: "Seed (extension); $21M total seed; public beta",
      location: "Bellevue, Washington, USA",
      fundingStage:
        "$14M seed extension, announced 2026-06-09, led by Insight Partners with existing backers NEA and Madrona Ventures; $21M total seed. Coincides with public beta launch.",
      techStack: JSON.stringify([
        "AI-native analytics workspace, spreadsheet-like UI",
        "Connects Snowflake / BigQuery; generative-AI auto-insights",
        "~1,000 companies requested early access post-stealth",
        "Insight Partners (lead), NEA, Madrona Ventures",
      ]),
      fitScore: 40,
      intentScore: 33,
      fitDetails: JSON.stringify({
        industry_match_FS_Tech: 8,
        stage_size_growth: 8,
        clear_B2B_buyer_sales_motion: 9,
        proof_assets_customers_data: 8,
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
        "Best lead today. Public-beta launch + seed extension = category-defining moment where positioning / earned-media advisory has maximum leverage; ~1,000 early-access requests are a press-friendly proof point. Right-sized for a boutique retainer + launch sprint (vs. today's larger rounds that skew to in-house comms). Competing head-on with Tableau/Power BI means category narrative matters. Decision-maker access is the gating risk. Website best-effort (goldenanalytics.ai) — verify before outreach; could be golden.com / trygolden.ai.",
      source: "Daily Scrape 2026-06-10 (Tech Startups VC roundup, 9 Jun 2026)",
      lastActivity: "$14M seed extension + public beta launch announced 2026-06-09",
    },
    contacts: [],
    scrape: {
      url: SOURCE_URL,
      source: "news_funding",
      matchedSignals: JSON.stringify([
        "seed_extension_14m_insight_partners_2026_06_09",
        "public_beta_launch_same_day",
        "nearly_1000_companies_requested_early_access",
        "category_creation_vs_tableau_power_bi",
        "insight_nea_madrona_data_software_pedigree",
      ]),
    },
  },

  // ─── 2. Standard Bots — pr-marketing (combined 59, C — flagged) ───
  {
    company: {
      name: "Standard Bots",
      website: "https://standardbots.com",
      pipeline: "pr-marketing",
      industry:
        "Industrial robotics / factory automation — AI-native 'lights-out' manufacturing robots programmed by demonstration (no-code 'teach by showing'); positioned as a ~30%-cheaper, US-made alternative to Fanuc/ABB across assembly, welding, palletizing, inspection",
      size: "Series C; ~$220M total; $1.0B valuation; scaling NY manufacturing",
      location: "Glen Cove, New York, USA",
      fundingStage:
        "$200M Series C at a $1.0B valuation, announced 2026-06-09, led by RoboStrategy and General Catalyst with Amazon Alexa Fund, Samsung Next, BoxGroup, GiantLeap Capital; ~$220M total. Funds a 70,000-sq-ft Glen Cove, NY plant.",
      techStack: JSON.stringify([
        "AI-native robots; 'teach by demonstration' (no-code)",
        "~30% cheaper than Fanuc/ABB; US-made",
        "Defense interest: Lockheed, Army, NASA",
        "CEO testified to Congress on national robotics strategy",
      ]),
      fitScore: 32,
      intentScore: 27,
      fitDetails: JSON.stringify({
        industry_match_FS_Tech: 6,
        stage_size_growth: 5,
        clear_B2B_buyer_sales_motion: 8,
        proof_assets_customers_data: 9,
        budget_5k_25k_per_month: 4,
      }),
      intentDetails: JSON.stringify({
        trigger_launch_raise_rebrand_expansion: 12,
        timeline_to_start_0_30_days: 5,
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
        "Borderline C — included for visibility but flagged. Strong proof assets (Lockheed/Army/NASA interest, CEO congressional testimony, $1B valuation) and a clean US-onshoring / 'physical AI' narrative. BUT scored down hard on core fit: $200M Series C at $1B valuation = can afford a top-tier agency and very likely already has in-house comms + an incumbent firm (same reason $300M PhysicsX was skipped 06-09). Hardware/robotics is only loosely the agency's FS/Tech lane. Realistic angle, if any: specialist earned-media overflow / vertical-trade placement around the factory opening, not a core retainer. Website confirmed.",
      source: "Daily Scrape 2026-06-10 (Tech Startups VC roundup, 9 Jun 2026)",
      lastActivity: "$200M Series C at $1B valuation announced 2026-06-09",
    },
    contacts: [],
    scrape: {
      url: SOURCE_URL,
      source: "news_funding",
      matchedSignals: JSON.stringify([
        "series_c_200m_1b_valuation_2026_06_09",
        "robostrategy_general_catalyst_lead",
        "new_70k_sqft_glen_cove_ny_plant",
        "defense_interest_lockheed_army_nasa",
        "ceo_congressional_testimony_robotics_strategy",
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
