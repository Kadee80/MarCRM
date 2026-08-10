/**
 * MarCRM — Legal Freelance Import Script
 * Date: 2026-06-22
 * Leads: 5
 * Pipeline: legal-freelance
 *
 * Run with: node scripts/import-legal-freelance-2026-06-22.cjs
 * Requires: DATABASE_URL set in environment (Neon Postgres via Prisma)
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const leads = [
  {
    name: "Axiom Law — Investment Management Counsel (Remote)",
    website: "https://www.axiomlaw.com",
    pipeline: "legal-freelance",
    industry: "Legal / ALSP",
    location: "Remote (US)",
    fundingStage: "Established",
    fitScore: 50,
    intentScore: 40,
    vertical: "legal",
    subvertical: "fund",
    engagementModel: "contract",
    buyerType: "ALSP",
    compensationText: "$104,500-$325,000 per year (full-time equivalent)",
    remoteFlag: "remote",
    employmentTypeRaw: "On-demand attorney engagement through Axiom ALSP platform",
    urgencyScore: 75,
    source: "Axiom Law Careers",
    sourceUrl: "https://www.axiomlaw.com/careers/lawyers/available-positions/5959811002",
    notes: "Grade A (90). Investment management, private investment vehicles, unregistered funds, Investment Advisers Act of 1940. Remote, flexible on-demand model. 6+ years required. Strong fund-counsel ICP match.",
    contacts: [],
    signals: [
      "Private investment vehicles explicitly mentioned",
      "Unregistered funds in scope",
      "Investment Advisers Act of 1940 compliance",
      "Fully remote",
      "Axiom handles billing/BD — turnkey for fractional attorney"
    ]
  },
  {
    name: "Axiom Law — Structured Finance Attorney (Investment Fund Counsel)",
    website: "https://www.axiomlaw.com",
    pipeline: "legal-freelance",
    industry: "Legal / ALSP",
    location: "New York, NY",
    fundingStage: "Established",
    fitScore: 50,
    intentScore: 33,
    vertical: "legal",
    subvertical: "fund",
    engagementModel: "contract",
    buyerType: "ALSP",
    compensationText: "$104,500-$325,000 per year (full-time equivalent)",
    remoteFlag: "hybrid",
    employmentTypeRaw: "On-demand attorney engagement through Axiom ALSP platform",
    urgencyScore: 70,
    source: "Axiom Law Careers",
    sourceUrl: "https://www.axiomlaw.com/careers/lawyers/available-positions/6414613002",
    notes: "Grade A (83). Title 'Structured Finance' but actual scope is full investment fund formation counsel — LPA/GP/offering memos/SEC/AIFMD. 3+ years fund formation. Listed as NY but Axiom often permits remote/hybrid per client.",
    contacts: [],
    signals: [
      "Fund formation documents — LPA, offering memoranda, investment management agreements",
      "LP/GP structure experience required",
      "SEC registration and fund governance",
      "AIFMD/UCITS international compliance",
      "Private equity and hedge fund clients"
    ]
  },
  {
    name: "Axiom Law — Corporate Governance Attorney",
    website: "https://www.axiomlaw.com",
    pipeline: "legal-freelance",
    industry: "Legal / ALSP",
    location: "Remote (US)",
    fundingStage: "Established",
    fitScore: 30,
    intentScore: 40,
    vertical: "legal",
    subvertical: "corporate",
    engagementModel: "contract",
    buyerType: "ALSP",
    compensationText: "$104,500-$325,000 per year (full-time equivalent)",
    remoteFlag: "remote",
    employmentTypeRaw: "On-demand attorney engagement through Axiom ALSP platform",
    urgencyScore: 60,
    source: "Axiom Law Careers",
    sourceUrl: "https://www.axiomlaw.com/careers/lawyers/available-positions/5959882002",
    notes: "Grade B (70). Board advisory, SEC reporting/compliance, NYSE listing standards, fiduciary duties. Public company focus, not fund-side. Good for broadening corporate governance pipeline.",
    contacts: [],
    signals: [
      "Board of Directors advisory",
      "SEC reporting and compliance",
      "NYSE listing standards",
      "Fiduciary duty analysis",
      "Multiple concurrent clients via Axiom bench"
    ]
  },
  {
    name: "Major, Lindsey & Africa — Interim Counsel, Corporate and Securities",
    website: "https://www.mlaglobal.com",
    pipeline: "legal-freelance",
    industry: "Legal Staffing / Interim Placement",
    location: "Remote (National)",
    fundingStage: "Unknown — global technology solutions corporation client",
    fitScore: 30,
    intentScore: 40,
    vertical: "legal",
    subvertical: "corporate",
    engagementModel: "interim",
    buyerType: "staffing",
    compensationText: "$95-$110/hr",
    remoteFlag: "remote",
    employmentTypeRaw: "Interim W-2 contract placement through MLA Interim Legal Talent",
    urgencyScore: 65,
    source: "LinkedIn (MLA Interim Legal Talent)",
    sourceUrl: "https://www.linkedin.com/jobs/view/interim-counsel-corporate-and-securities-at-major-lindsey-africa-4321299601",
    notes: "Grade B (70). Corporate and securities at global tech company. $95-110/hr remote. Distinct from MLA Interim Commercial Contracts Counsel (REMOTE) from 2026-06-16. Strong hourly rate for interim engagement.",
    contacts: [],
    signals: [
      "$95-110/hr stated",
      "Global technology solutions corporation client",
      "Corporate and securities matters",
      "Remote national",
      "MLA Interim Legal Talent placement"
    ]
  },
  {
    name: "Interlink Cloud Advisors — Fractional General Counsel",
    website: "https://www.interlink.com",
    pipeline: "legal-freelance",
    industry: "Cloud Technology Consulting",
    location: "Remote (nationwide)",
    fundingStage: "Established — premier Microsoft Cloud consulting firm",
    fitScore: 15,
    intentScore: 40,
    vertical: "legal",
    subvertical: "GC",
    engagementModel: "fractional",
    buyerType: "operating-company",
    compensationText: "Not stated (negotiate retainer; est. $150-250/hr market rate)",
    remoteFlag: "remote",
    employmentTypeRaw: "Independent contractor / fractional engagement",
    urgencyScore: 50,
    source: "GoInhouse.com",
    sourceUrl: "https://www.goinhouse.com/jobs/438711760-fractional-general-counsel-at-interlink-cloud-advisors",
    notes: "Grade C (55). MSA/PSA/NDA/vendor agreements, SOC 2 compliance, reports to CEO. 3+ years. Low fund-fit but good fractional GC retainer opportunity. Est. 2-5 hrs/week.",
    contacts: [],
    signals: [
      "Fractional GC independent contractor",
      "Remote, low-hours commitment",
      "B2B cloud consulting — stable, recurring commercial contract volume",
      "Reports directly to CEO",
      "Growth to long-term strategic advisor"
    ]
  }
];

async function main() {
  console.log(`Starting import of ${leads.length} legal-freelance leads for 2026-06-22...`);

  let inserted = 0;
  let skipped = 0;

  for (const lead of leads) {
    // Deduplicate by company name (skip existing)
    const existing = await prisma.company.findFirst({
      where: { name: lead.name }
    });

    if (existing) {
      console.log(`  SKIP (exists): ${lead.name}`);
      skipped++;
      continue;
    }

    // Create Company record
    const company = await prisma.company.create({
      data: {
        name: lead.name,
        website: lead.website,
        industry: lead.industry,
        location: lead.location,
        fundingStage: lead.fundingStage,
        pipeline: lead.pipeline,
        notes: lead.notes,
      }
    });

    console.log(`  CREATED company: ${company.name} (id=${company.id})`);

    // Create Contact records
    for (const contact of lead.contacts) {
      await prisma.contact.create({
        data: {
          name: contact.name,
          title: contact.title || null,
          email: contact.email || null,
          linkedin: contact.linkedin || null,
          companyId: company.id,
        }
      });
      console.log(`    CREATED contact: ${contact.name}`);
    }

    // Create ScrapeResult record
    await prisma.scrapeResult.create({
      data: {
        companyId: company.id,
        scrapeDate: new Date('2026-06-22'),
        scrapeType: 'legal-freelance',
        pipeline: lead.pipeline,
        fitScore: lead.fitScore,
        intentScore: lead.intentScore,
        source: lead.source,
        sourceUrl: lead.sourceUrl,
        signals: JSON.stringify(lead.signals),
        // Extended fields stored in notes/signals JSON
        rawData: JSON.stringify({
          vertical: lead.vertical,
          subvertical: lead.subvertical,
          engagementModel: lead.engagementModel,
          buyerType: lead.buyerType,
          compensationText: lead.compensationText,
          remoteFlag: lead.remoteFlag,
          employmentTypeRaw: lead.employmentTypeRaw,
          urgencyScore: lead.urgencyScore,
        }),
      }
    });

    console.log(`    CREATED scrapeResult for ${company.name}`);
    inserted++;
  }

  console.log(`\nImport complete: ${inserted} inserted, ${skipped} skipped.`);
}

main()
  .catch((e) => {
    console.error('Import error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
