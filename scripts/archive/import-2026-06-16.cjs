#!/usr/bin/env node
/**
 * Import leads from Daily Scrape 2026-06-16
 *
 * Usage:  cd MarCRM && node scripts/import-2026-06-16.cjs
 *
 * - Pipelines: pr-marketing (1), legal-freelance (2)
 * - Deduplicates by company name (skips if already in DB)
 * - Creates Company + Contact records, logs a ScrapeResult for each lead
 * - Populates enhanced freelance fields for legal-freelance leads
 *
 * NOTE: Neon DB is unreachable from the Cowork sandbox, so this script
 * must be run from Katie's local machine where DATABASE_URL points to
 * the Neon production instance.
 */

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const LEADS = [
  // ─── 1. Sandstone — $30M Series A, AI for in-house legal — combined 78, B ───
  {
    company: {
      name: "Sandstone",
      website: "https://sandstone.com",
      pipeline: "pr-marketing",
      industry: "Legal AI / B2B SaaS / in-house legal workflow automation",
      size: "Series A (~$40M total raised)",
      location: "San Francisco, CA",
      fundingStage: "Series A ($30M, June 9 2026, Lightspeed + Sequoia)",
      techStack: JSON.stringify([
        "legal workflow automation",
        "intake triage AI",
        "Slack/email/Jira integrations",
        "in-house legal ops",
      ]),
      fitScore: 37,
      intentScore: 41,
      fitDetails: JSON.stringify({
        industryMatchFSTech_0to10: 8,
        stageSizeGrowth_0to10: 8,
        b2bBuyerSalesMotion_0to10: 8,
        proofAssets_0to10: 7,
        budget5kto25k_0to10: 6,
      }),
      intentDetails: JSON.stringify({
        triggerPresent_0to15: 15,
        timelineToStart_0to10: 8,
        decisionMakerEngaged_0to10: 7,
        urgencyPain_0to10: 8,
        responsiveness_0to5: 3,
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
        "Combined 78, Grade B. Raised $30M Series A June 9 2026 (Lightspeed led, Sequoia participating). " +
        "Targets in-house legal teams at SMBs with workflow triage, routing, and automation. " +
        "Post-funding PR sprint opportunity: differentiate from Harvey/Legora, build brand with in-house legal buyers. " +
        "Pitch: 90-day comms sprint post-Series A. COO Jarryd Strydom is key contact (quoted in TechCrunch).",
      source: "Daily Scrape 2026-06-16",
      lastActivity:
        "New lead — pitch 90-day post-Series A comms sprint focused on vertical AI for in-house legal narrative",
    },
    contacts: [
      {
        name: "Jarryd Strydom",
        title: "Co-founder & COO",
        email: "",
        linkedin: "",
      },
    ],
    scrape: {
      url: "https://techcrunch.com/2026/06/09/sandstone-raises-30m-to-bring-ai-to-in-house-legal-teams/",
      source: "TechCrunch",
      matchedSignals: JSON.stringify([
        "series_a_30m_june_2026",
        "lightspeed_led",
        "sequoia_participation",
        "post_funding_comms_opportunity",
        "smb_inhouse_legal_focus",
      ]),
    },
  },

  // ─── 2. Studio Leonelli Inc — Fractional Employment Counsel — combined 75, B ───
  {
    company: {
      name: "Studio Leonelli Inc",
      website: "https://studioleonelli.com",
      pipeline: "legal-freelance",
      industry: "Boutique legal practice / employment law",
      size: "Small law firm",
      location: "Remote (US)",
      fundingStage: "N/A",
      techStack: JSON.stringify([]),
      fitScore: 30,
      intentScore: 45,
      fitDetails: JSON.stringify({
        fundPrivateFundsFundFormation_0to20: 0,
        corporateCommercialContractsMandAFinancingVentureSecurities_0to10: 10,
        seniorityMatchCounselGCSpecialCounsel_0to10: 10,
        compStatedAndMarketCredible_0to10: 10,
      }),
      intentDetails: JSON.stringify({
        engagementModelFractionalInterimContractFreelanceConsultant_0to15: 15,
        remoteOrHybridFlex_0to15: 15,
        postedWithin72Hours_0to10: 5,
        easyApplyOrDirectEmailContactPath_0to10: 10,
      }),
      vertical: "legal",
      subvertical: "corporate",
      engagementModel: "fractional",
      buyerType: "law-firm",
      compensationText: "$110 - $150 an hour",
      remoteFlag: "remote",
      employmentTypeRaw: "Part-time, Contract",
      urgencyScore: 65,
      starred: false,
      notes:
        "Combined 75, Grade B. Boutique firm seeking fractional employment counsel. " +
        "Remote, $110-150/hr, 10-20 hrs/week. Focus: employment counseling for startups/scaleups across 50 states. " +
        "Strong engagement model fit; employment law vertical (not fund/M&A) lowers Fit score. " +
        "Ideal for candidate with employment law + startup advisory background. Easy apply via Indeed.",
      source: "Daily Scrape 2026-06-16",
      lastActivity:
        "New legal-freelance lead — active Indeed posting, $110-150/hr fractional employment counsel",
    },
    contacts: [],
    scrape: {
      url: "https://www.indeed.com/q-fractional-legal-counsel-jobs.html",
      source: "Indeed",
      matchedSignals: JSON.stringify([
        "fractional_employment_counsel",
        "remote_us",
        "10_20_hrs_per_week",
        "startup_scaleup_advisory_workstream",
        "110_150_per_hour",
        "easy_apply",
      ]),
    },
  },

  // ─── 3. GeneFab — Fractional Corporate Counsel CDMO — combined 60, C ───
  {
    company: {
      name: "GeneFab",
      website: "https://genefab.com",
      pipeline: "legal-freelance",
      industry: "Biotech / CDMO (contract development and manufacturing)",
      size: "SMB",
      location: "Alameda, CA (Hybrid)",
      fundingStage: "Unknown",
      techStack: JSON.stringify([]),
      fitScore: 30,
      intentScore: 30,
      fitDetails: JSON.stringify({
        fundPrivateFundsFundFormation_0to20: 0,
        corporateCommercialContractsMandAFinancingVentureSecurities_0to10: 10,
        seniorityMatchCounselGCSpecialCounsel_0to10: 10,
        compStatedAndMarketCredible_0to10: 10,
      }),
      intentDetails: JSON.stringify({
        engagementModelFractionalInterimContractFreelanceConsultant_0to15: 15,
        remoteOrHybridFlex_0to15: 5,
        postedWithin72Hours_0to10: 5,
        easyApplyOrDirectEmailContactPath_0to10: 5,
      }),
      vertical: "legal",
      subvertical: "contracts",
      engagementModel: "fractional",
      buyerType: "operating-company",
      compensationText: "$200 - $300 an hour",
      remoteFlag: "hybrid",
      employmentTypeRaw: "Part-time",
      urgencyScore: 45,
      starred: false,
      notes:
        "Combined 60, Grade C. Biotech/CDMO seeking fractional corporate counsel / senior contracts attorney. " +
        "$200-300/hr (exceptional comp) but hybrid Alameda CA. Commercial contracts + legal risk focus. " +
        "Lower priority due to hybrid constraint. Good fit for Bay Area-based legal talent.",
      source: "Daily Scrape 2026-06-16",
      lastActivity:
        "New legal-freelance lead — hybrid Alameda, $200-300/hr fractional corporate counsel / contracts",
    },
    contacts: [],
    scrape: {
      url: "https://www.indeed.com/q-fractional-legal-counsel-jobs.html",
      source: "Indeed",
      matchedSignals: JSON.stringify([
        "fractional_corporate_counsel",
        "senior_contracts_attorney",
        "cdmo_biotech",
        "200_300_per_hour",
        "hybrid_alameda_ca",
        "commercial_contracts_focus",
      ]),
    },
  },
];

async function main() {
  console.log(`\n🚀 Starting import for 2026-06-16 (${LEADS.length} leads)\n`);

  for (const lead of LEADS) {
    const { company, contacts, scrape } = lead;

    // ── Dedup check ──────────────────────────────────────────────────────────
    const existing = await prisma.company.findFirst({
      where: { name: company.name },
    });

    if (existing) {
      console.log(`⏭  Skipping "${company.name}" — already in DB (id: ${existing.id})`);
      continue;
    }

    // ── Create company ───────────────────────────────────────────────────────
    const created = await prisma.company.create({
      data: {
        name:             company.name,
        website:          company.website,
        pipeline:         company.pipeline,
        industry:         company.industry,
        size:             company.size,
        location:         company.location,
        fundingStage:     company.fundingStage,
        techStack:        company.techStack,
        fitScore:         company.fitScore,
        intentScore:      company.intentScore,
        fitDetails:       company.fitDetails,
        intentDetails:    company.intentDetails,
        vertical:         company.vertical,
        subvertical:      company.subvertical,
        engagementModel:  company.engagementModel,
        buyerType:        company.buyerType,
        compensationText: company.compensationText,
        remoteFlag:       company.remoteFlag,
        employmentTypeRaw:company.employmentTypeRaw,
        urgencyScore:     company.urgencyScore,
        starred:          company.starred,
        notes:            company.notes,
        source:           company.source,
        lastActivity:     company.lastActivity,
      },
    });

    console.log(`✅ Created company "${created.name}" (id: ${created.id}, pipeline: ${created.pipeline})`);

    // ── Create contacts ──────────────────────────────────────────────────────
    for (const c of contacts) {
      if (!c.name) continue;
      await prisma.contact.create({
        data: {
          companyId: created.id,
          name:      c.name,
          title:     c.title  || "",
          email:     c.email  || "",
          linkedin:  c.linkedin || "",
        },
      });
      console.log(`   👤 Contact: ${c.name} (${c.title})`);
    }

    // ── Log scrape result ────────────────────────────────────────────────────
    await prisma.scrapeResult.create({
      data: {
        companyId:      created.id,
        url:            scrape.url,
        source:         scrape.source,
        matchedSignals: scrape.matchedSignals,
        scrapedAt:      new Date("2026-06-16"),
      },
    });
    console.log(`   🔗 ScrapeResult logged (source: ${scrape.source})\n`);
  }

  console.log("✨ Import complete.\n");
}

main()
  .catch((e) => {
    console.error("❌ Import failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
