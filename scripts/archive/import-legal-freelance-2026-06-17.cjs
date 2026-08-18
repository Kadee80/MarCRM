// Legal Freelance Scrape Import — 2026-06-17
// Run: node scripts/import-legal-freelance-2026-06-17.cjs
// Requires: DIRECT_URL or DATABASE_URL env var pointing to Neon DB
// Deduplicates by company name (skips existing companies)

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const SCRAPE_DATE = '2026-06-17';
const PIPELINE = 'legal-freelance';

const leads = [
  {
    name: "Ropes & Gray — Funds Attorney, Asset Management Group",
    website: "https://www.ropesgray.com",
    pipeline: PIPELINE,
    industry: "Law Firm / Investment Management",
    location: "Remote (US)",
    fundingStage: "Established (Am Law 50)",
    fitScore: 50,
    intentScore: 40,
    vertical: "legal",
    subvertical: "fund",
    engagementModel: "contract",
    buyerType: "law-firm",
    compensationText: "Hourly basis for billable work (rate not stated). No benefits through the firm.",
    remoteFlag: "remote",
    employmentTypeRaw: "Contract (hourly, no benefits)",
    urgencyScore: 65,
    source: "ropesgrayrecruiting.com",
    sourceUrl: "https://www.ropesgrayrecruiting.com/en/life-at-ropes-and-gray/positions/funds-attorney-asset-management-group-remote",
    notes: "A-grade lead. 100% remote, hourly contract, dedicated fund team (20+ attorneys). Apply at lawcruit.micronapps.com/sup/lc_supp_app_frm.aspx?lawfirm=89&id=20. Explicitly open to non-fund backgrounds (tax, PE, securities). Bar admission required in any R&G office state.",
    contacts: [],
    signals: [
      "20+ dedicated funds attorneys on team",
      "Explicitly open to attorneys with non-fund backgrounds",
      "True freelance model — no firm benefits",
      "100% remote, hourly billable"
    ]
  },
  {
    name: "Major, Lindsey & Africa — Fund Formation Attorney (Chicago)",
    website: "https://www.mlaglobal.com",
    pipeline: PIPELINE,
    industry: "Legal Staffing / Interim Talent Placement",
    location: "Chicago, IL (remote status unconfirmed)",
    fundingStage: "Established (global legal search firm)",
    fitScore: 50,
    intentScore: 25,
    vertical: "legal",
    subvertical: "fund",
    engagementModel: "interim",
    buyerType: "staffing",
    compensationText: "Market-rate (MLA interim placements typically $150K–$250K annualized equivalent)",
    remoteFlag: "",
    employmentTypeRaw: "Interim placement (contract, W-2 via MLA or client direct)",
    urgencyScore: 55,
    source: "mlaglobal.com",
    sourceUrl: "https://careers.mlaglobal.com/us/en/job/220987/Fund-Formation-Attorney",
    notes: "Fund formation focus (Securities Act 1933, ICA 1940, IAA 1940). Different from Miami MLA posting (June 15). Chicago-based client — confirm remote availability. Getting on MLA interim fund formation roster has long-term strategic value.",
    contacts: [],
    signals: [
      "Fund formation focus",
      "MLA Interim Legal Talent group direct client relationship",
      "ICA 1940 and IAA 1940 experience required",
      "Different from Miami MLA posting already in CRM"
    ]
  },
  {
    name: "Latitude Legal — In-House Securities and Commercial Contract Attorney",
    website: "https://www.latitudelegal.com",
    pipeline: PIPELINE,
    industry: "Legal Staffing / Flexible Legal Talent",
    location: "Remote / Hybrid",
    fundingStage: "Growth (Late Stage)",
    fitScore: 30,
    intentScore: 40,
    vertical: "legal",
    subvertical: "securities",
    engagementModel: "contract",
    buyerType: "staffing",
    compensationText: "Not stated; Latitude annualized comps typically $150K–$200K; W-2 benefits at 20+ hrs/week",
    remoteFlag: "hybrid",
    employmentTypeRaw: "Part-time contract (W-2 employee of Latitude)",
    urgencyScore: 55,
    source: "latitudelegal.com",
    sourceUrl: "https://latitudelegal.com/jobs/6388",
    notes: "Part-time hybrid, W-2 via Latitude. Securities compliance (SEC regulations, disclosures, public filings) + commercial contracts. Payments industry experience preferred but not required. Net-new vs. prior scrapes (jobs/6388).",
    contacts: [],
    signals: [
      "Part-time structure — fractional model",
      "Dual-track: securities compliance + commercial contracts",
      "W-2 via Latitude with benefits at 20+ hrs/week",
      "Latitude expanding rapidly (Chambers NewLaw 2026)"
    ]
  },
  {
    name: "Axiom Law — Securities & Prime Brokerage Counsel",
    website: "https://www.axiomlaw.com",
    pipeline: PIPELINE,
    industry: "ALSP / Alternative Legal Services",
    location: "US – New York (remote flexibility unclear)",
    fundingStage: "Established (global ALSP leader)",
    fitScore: 30,
    intentScore: 30,
    vertical: "legal",
    subvertical: "securities",
    engagementModel: "contract",
    buyerType: "ALSP",
    compensationText: "$104,500–$325,000 estimated total comp (full-time equivalent basis); Axiom W-2 with benefits",
    remoteFlag: "",
    employmentTypeRaw: "Contract/secondment (W-2 employee of Axiom)",
    urgencyScore: 45,
    source: "axiomlaw.com",
    sourceUrl: "https://www.axiomlaw.com/careers/lawyers/available-positions/8036201002",
    notes: "Borderline ICP fit — prime brokerage/margin-heavy role. Strategic value: Axiom platform access (1,500+ legal dept clients) for future corporate, M&A, fund secondments. Apply as platform-entry play. 3+ years securities law required.",
    contacts: [],
    signals: [
      "Axiom platform: 1,500+ legal departments globally",
      "Comp band $104K–$325K",
      "Prime brokerage specific — FINRA 4210, Reg T, Reg U",
      "Platform access unlocks future fund/corporate engagements"
    ]
  }
];

async function importLeads() {
  console.log(`\n🏛️  Legal Freelance Import — ${SCRAPE_DATE}`);
  console.log(`   Pipeline: ${PIPELINE}`);
  console.log(`   Leads to process: ${leads.length}\n`);

  let created = 0;
  let skipped = 0;
  let errors = 0;

  for (const lead of leads) {
    try {
      // Check for existing company by name
      const existing = await prisma.company.findFirst({
        where: { name: lead.name }
      });

      if (existing) {
        console.log(`  ⏭️  SKIP  ${lead.name} (already in CRM)`);
        skipped++;
        continue;
      }

      // Create company
      const company = await prisma.company.create({
        data: {
          name: lead.name,
          website: lead.website,
          industry: lead.industry,
          location: lead.location,
          fundingStage: lead.fundingStage,
          pipeline: lead.pipeline,
          fitScore: lead.fitScore,
          intentScore: lead.intentScore,
          notes: lead.notes,
        }
      });

      // Create scrape result with extended fields
      await prisma.scrapeResult.create({
        data: {
          companyId: company.id,
          scrapeDate: new Date(SCRAPE_DATE),
          scrapeType: 'legal-freelance',
          pipeline: lead.pipeline,
          fitScore: lead.fitScore,
          intentScore: lead.intentScore,
          source: lead.source,
          sourceUrl: lead.sourceUrl,
          signals: lead.signals,
          rawData: {
            vertical: lead.vertical,
            subvertical: lead.subvertical,
            engagementModel: lead.engagementModel,
            buyerType: lead.buyerType,
            compensationText: lead.compensationText,
            remoteFlag: lead.remoteFlag,
            employmentTypeRaw: lead.employmentTypeRaw,
            urgencyScore: lead.urgencyScore,
          }
        }
      });

      // Create contacts if present
      for (const contact of lead.contacts) {
        await prisma.contact.create({
          data: {
            companyId: company.id,
            name: contact.name,
            title: contact.title,
            email: contact.email || null,
            linkedin: contact.linkedin || null,
          }
        });
      }

      console.log(`  ✅  ADDED  ${lead.name} (fit: ${lead.fitScore}, intent: ${lead.intentScore}, total: ${lead.fitScore + lead.intentScore})`);
      created++;

    } catch (err) {
      console.error(`  ❌  ERROR  ${lead.name}: ${err.message}`);
      errors++;
    }
  }

  console.log(`\n📊  Summary`);
  console.log(`   Created:  ${created}`);
  console.log(`   Skipped:  ${skipped}`);
  console.log(`   Errors:   ${errors}`);
  console.log(`   Total:    ${leads.length}\n`);

  await prisma.$disconnect();
}

importLeads().catch(async (err) => {
  console.error('Fatal error:', err);
  await prisma.$disconnect();
  process.exit(1);
});
