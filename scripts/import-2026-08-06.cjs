/**
 * Import script: Daily Scrape 2026-08-06
 * Run: node scripts/import-2026-08-06.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 *
 * NOTE: Balance Theory, PsychPlus, and "Radar" already exist in the CRM and are handled in the
 * markdown report's signal-refresh section — they are intentionally NOT in this insert list.
 * (Caution: the CRM "Radar" is an applied-AI $170M Series B entity; a same-named geofencing "Radar"
 *  surfaced during refresh — likely a different company. Do not merge without verifying.)
 * Update existing-lead scores/notes via a scoring pass, not via this import.
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const SCRAPE_DATE = new Date("2026-08-06");

const leads = [
  {
    name: "Provable Markets",
    website: "https://provablemarkets.com",
    pipeline: "pr-marketing",
    industry: "Financial services / securities finance — SEC-registered broker-dealer behind the Aurora ATS.",
    location: "New York, NY",
    fundingStage: "Series B (size undisclosed) — led by Charles Schwab; DTCC joined as new investor; Dialectic Capital and Inkef continuing.",
    fitScore: 48,
    intentScore: 36,
    vertical: "",
    subvertical: "",
    engagementModel: "",
    buyerType: "",
    compensationText: "",
    remoteFlag: "",
    employmentTypeRaw: "",
    urgencyScore: 0,
    source: "FinTech Global weekly funding roundup (2026-07-31)",
    sourceUrl: "https://fintech.global/2026/07/31/fintech-investment-soars-to-2-03bn-in-powerful-week-for-the-sector/",
    notes: "Grade A (84). Top new lead. Schwab-led Series B + DTCC = credibility-rich, PR-ready event; Aurora ATS >$30T/mo, 4 record quarters. ACTION: pitch narrative/thought-leadership retainer on securities-finance modernization.",
    contacts: []
  },
  {
    name: "Freehand",
    website: "https://www.freehand.ai",
    pipeline: "pr-marketing",
    industry: "Applied AI / enterprise fintech — autonomous agents for enterprise spending and financial operations.",
    location: "San Francisco, CA",
    fundingStage: "$75M — co-led by Battery Ventures and NewRoad Capital Partners; PSP Growth (Penny Pritzker) and Nexus participating; Battery GP Dharmesh Thakker joining board.",
    fitScore: 46,
    intentScore: 37,
    vertical: "",
    subvertical: "",
    engagementModel: "",
    buyerType: "",
    compensationText: "",
    remoteFlag: "",
    employmentTypeRaw: "",
    urgencyScore: 0,
    source: "FinTech Global weekly funding roundup (2026-07-31)",
    sourceUrl: "https://fintech.global/2026/07/31/fintech-investment-soars-to-2-03bn-in-powerful-week-for-the-sector/",
    notes: "Grade A (83). WEBSITE UNVERIFIED (freehand.ai best-guess — confirm before outreach). Crowded agentic-AI category needs differentiation; pitch category-defining PR + exec comms.",
    contacts: []
  },
  {
    name: "American Growth Insurance (AGI)",
    website: "",
    pipeline: "pr-marketing",
    industry: "InsurTech / insurance brokerage — AI-native roll-up acquiring independent agencies.",
    location: "United States",
    fundingStage: "Launched with nearly $70M committed equity.",
    fitScore: 42,
    intentScore: 40,
    vertical: "",
    subvertical: "",
    engagementModel: "",
    buyerType: "",
    compensationText: "",
    remoteFlag: "",
    employmentTypeRaw: "",
    urgencyScore: 0,
    source: "FinTech Global weekly funding roundup (2026-07-31)",
    sourceUrl: "https://fintech.global/2026/07/31/fintech-investment-soars-to-2-03bn-in-powerful-week-for-the-sector/",
    notes: "Grade A (82). WEBSITE NOT FOUND — confirm entity/domain. Launch + acquisition roll-up = ongoing announcement cadence; pitch retainer with recurring-announcement plan.",
    contacts: []
  },
  {
    name: "CAIS",
    website: "https://www.caisgroup.com",
    pipeline: "pr-marketing",
    industry: "Financial services — alternative-investments platform for independent financial advisers.",
    location: "New York, NY",
    fundingStage: "Series D — $170M led by Vista Equity Partners; AllianceBernstein, Blue Owl, Carlyle, Fortress, Golub, Lord Abbett, RBC participating. >$2B valuation.",
    fitScore: 48,
    intentScore: 33,
    vertical: "",
    subvertical: "",
    engagementModel: "",
    buyerType: "",
    compensationText: "",
    remoteFlag: "",
    employmentTypeRaw: "",
    urgencyScore: 0,
    source: "FinTech Global weekly funding roundup (2026-07-31)",
    sourceUrl: "https://fintech.global/2026/07/31/fintech-investment-soars-to-2-03bn-in-powerful-week-for-the-sector/",
    notes: "Grade A (81). Strong fit but likely has in-house PR at >$2B valuation (intent capped). ACTION: advisory / thought-leadership / overflow-project pitch rather than full retainer.",
    contacts: []
  },
  {
    name: "LemonEdge",
    website: "https://www.lemonedge.com",
    pipeline: "pr-marketing",
    industry: "Fintech — fund-accounting platform built for private markets.",
    location: "London & New York",
    fundingStage: "Series A — $21M led by Blackstone Innovations Investments; BNY participating; Sidekick Partners continuing. >$30M cumulative.",
    fitScore: 45,
    intentScore: 36,
    vertical: "",
    subvertical: "",
    engagementModel: "",
    buyerType: "",
    compensationText: "",
    remoteFlag: "",
    employmentTypeRaw: "",
    urgencyScore: 0,
    source: "FinTech Global weekly funding roundup (2026-07-31)",
    sourceUrl: "https://fintech.global/2026/07/31/fintech-investment-soars-to-2-03bn-in-powerful-week-for-the-sector/",
    notes: "Grade A (81). Blackstone/BNY backing + explicit US & Europe expansion = ideal FS-fintech retainer setup. On-thesis private-markets buyer.",
    contacts: []
  },
  {
    name: "InvestiFi",
    website: "https://www.investifi.co",
    pipeline: "pr-marketing",
    industry: "Fintech — embedded-investing CUSO for credit unions and community banks.",
    location: "United States",
    fundingStage: "$20M — led by Vibe Credit Union; BankTech Ventures, ICCU, Navari, United Financial CU, Coastal CU, Mid Minnesota CU, Truity CU, Southpoint CU participating.",
    fitScore: 43,
    intentScore: 33,
    vertical: "",
    subvertical: "",
    engagementModel: "",
    buyerType: "",
    compensationText: "",
    remoteFlag: "",
    employmentTypeRaw: "",
    urgencyScore: 0,
    source: "FinTech Global weekly funding roundup (2026-07-31)",
    sourceUrl: "https://fintech.global/2026/07/31/fintech-investment-soars-to-2-03bn-in-powerful-week-for-the-sector/",
    notes: "Grade B (76). Solid fintech B2B, many CU customers-as-investors; smaller budget likely. ACTION: scoped launch/announcement engagement.",
    contacts: []
  },
  {
    name: "Encore AI",
    website: "",
    pipeline: "pr-marketing",
    industry: "Applied AI — agentic customer-interaction platform focused on revenue rather than deflection.",
    location: "United States",
    fundingStage: "Series A — $30M led by Team8, Planven and The Garage; several banks and insurers invested after being customers.",
    fitScore: 42,
    intentScore: 34,
    vertical: "",
    subvertical: "",
    engagementModel: "",
    buyerType: "",
    compensationText: "",
    remoteFlag: "",
    employmentTypeRaw: "",
    urgencyScore: 0,
    source: "FinTech Global weekly funding roundup (2026-07-31)",
    sourceUrl: "https://fintech.global/2026/07/31/fintech-investment-soars-to-2-03bn-in-powerful-week-for-the-sector/",
    notes: "Grade B (76). WEBSITE UNVERIFIED — confirm domain. FS-adjacent customer base (banks/insurers) is the angle for Mark.",
    contacts: []
  },
  {
    name: "Olomon",
    website: "https://www.olomon.com",
    pipeline: "pr-freelance",
    industry: "WealthTech — financial system of record for households and advisors.",
    location: "Tennessee",
    fundingStage: "Pre-seed — $2.6M (oversubscribed); wider market launch planned Q3 2026.",
    fitScore: 26,
    intentScore: 28,
    vertical: "pr",
    subvertical: "comms",
    engagementModel: "fractional",
    buyerType: "startup",
    compensationText: "",
    remoteFlag: "remote",
    employmentTypeRaw: "",
    urgencyScore: 45,
    source: "FinTech Global weekly funding roundup (2026-07-31)",
    sourceUrl: "https://fintech.global/2026/07/31/fintech-investment-soars-to-2-03bn-in-powerful-week-for-the-sector/",
    notes: "Grade C (54). OUTBOUND-PITCH lead, NOT a job posting — no active PR listing; scored on inferred pre-launch need. WEBSITE UNVERIFIED. Mark's angle: fractional comms advisory ahead of Q3 launch before a full-time hire.",
    contacts: []
  }
];

async function main() {
  let created = 0, skipped = 0;
  for (const lead of leads) {
    const existing = await prisma.company.findFirst({ where: { name: lead.name } });
    if (existing) {
      console.log(`SKIP (exists): ${lead.name}`);
      skipped++;
      continue;
    }

    const company = await prisma.company.create({
      data: {
        name: lead.name,
        website: lead.website,
        pipeline: lead.pipeline,
        industry: lead.industry,
        location: lead.location,
        fundingStage: lead.fundingStage,
        fitScore: lead.fitScore,
        intentScore: lead.intentScore,
        vertical: lead.vertical,
        subvertical: lead.subvertical,
        engagementModel: lead.engagementModel,
        buyerType: lead.buyerType,
        compensationText: lead.compensationText,
        remoteFlag: lead.remoteFlag,
        employmentTypeRaw: lead.employmentTypeRaw,
        urgencyScore: lead.urgencyScore,
        notes: lead.notes
      }
    });

    for (const c of lead.contacts) {
      await prisma.contact.create({
        data: {
          companyId: company.id,
          name: c.name || null,
          title: c.title || null,
          email: c.email || null,
          linkedin: c.linkedin || null
        }
      });
    }

    await prisma.scrapeResult.create({
      data: {
        companyId: company.id,
        pipeline: lead.pipeline,
        source: lead.source,
        sourceUrl: lead.sourceUrl,
        fitScore: lead.fitScore,
        intentScore: lead.intentScore,
        scrapeDate: SCRAPE_DATE
      }
    });

    console.log(`CREATED: ${lead.name}`);
    created++;
  }
  console.log(`\nDone. Created ${created}, skipped ${skipped}.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
