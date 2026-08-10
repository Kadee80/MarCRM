/**
 * import-legal-freelance-2026-06-16.cjs
 * Imports legal-freelance leads from 2026-06-16 scrape into MarCRM Neon database.
 * Run from the MarCRM project root:
 *   node scripts/import-legal-freelance-2026-06-16.cjs
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const SCRAPE_DATE = '2026-06-16';
const SCRAPE_TYPE = 'legal-freelance';

const leads = [
  {
    name: 'Allocate — Fund Formation Attorney (Remote in U.S.)',
    website: 'https://allocate.co',
    pipeline: 'legal-freelance',
    industry: 'Legal Technology / Fund Administration',
    location: 'Remote (US)',
    fundingStage: 'Growth',
    fitScore: 50,
    intentScore: 50,
    vertical: 'legal',
    subvertical: 'fund',
    engagementModel: 'contract',
    buyerType: 'fund',
    compensationText: '$190,000 - $220,000 annualized',
    remoteFlag: 'remote',
    employmentTypeRaw: 'Full-time / direct hire (fund formation platform)',
    urgencyScore: 85,
    source: 'LinkedIn / The Ladders',
    sourceUrl: 'https://www.linkedin.com/jobs/view/fund-formation-attorney-remote-at-allocate-4307034119',
    notes: 'Highest-fit fund formation role in batch. Full ICP match: LPA/PPM/subscription docs, IA Act compliance, fully remote. Strong comp $190-220k. Apply via LinkedIn.',
    contacts: [],
    signals: [
      'Fund formation platform serving 4000+ investment managers',
      'LPA, PPM, subscription docs, IA Act compliance',
      'Strong comp $190-220k',
      'LinkedIn posting active Q2 2026',
    ],
  },
  {
    name: 'Ontra — US-Licensed Freelance Fund Formation Lawyer',
    website: 'https://ontra.ai',
    pipeline: 'legal-freelance',
    industry: 'Legal Technology / ALSP',
    location: 'Remote (US)',
    fundingStage: 'Late Stage / Established',
    fitScore: 50,
    intentScore: 40,
    vertical: 'legal',
    subvertical: 'fund',
    engagementModel: 'freelance',
    buyerType: 'ALSP',
    compensationText: 'Hourly / per-matter (Ontra-negotiated rates with clients; market-competitive)',
    remoteFlag: 'remote',
    employmentTypeRaw: '1099 independent contractor / freelance network member',
    urgencyScore: 70,
    source: 'Built In SF / Austin / Colorado',
    sourceUrl: 'https://www.builtinsf.com/job/legal/us-licensed-freelance-fund-formation-lawyer-remote/103064',
    notes: 'Ideal ALSP network for fund formation freelance. True 1099, no admin overhead. Ontra handles billing, BD, and client sourcing. Preferred: AmLaw 100 / top-tier fund group or in-house IA background.',
    contacts: [],
    signals: [
      '600+ investment firm clients',
      'True 1099 freelance — zero admin overhead',
      'LPAs, side letters, term sheets, operating agreements',
      'Ontra handles invoicing, billing, collections, and BD',
    ],
  },
  {
    name: 'Major, Lindsey & Africa — Interim Commercial Contracts Counsel (REMOTE)',
    website: 'https://www.mlaglobal.com',
    pipeline: 'legal-freelance',
    industry: 'Legal Staffing / Interim Placement',
    location: 'Remote',
    fundingStage: 'Established',
    fitScore: 30,
    intentScore: 50,
    vertical: 'legal',
    subvertical: 'contracts',
    engagementModel: 'interim',
    buyerType: 'staffing',
    compensationText: 'Market rate for senior commercial counsel (MLA interim rates est. $175-250/hr)',
    remoteFlag: 'remote',
    employmentTypeRaw: 'Interim contract, W-2 through MLA, 8+ months',
    urgencyScore: 80,
    source: 'MLA Careers Portal',
    sourceUrl: 'https://careers.mlaglobal.com/us/en/job/211106/Interim-Commercial-Contracts-Counsel-REMOTE',
    notes: 'MLA immediate need, 8+ months duration, overflow customer-facing commercial contracts. W-2 engagement. Getting into MLA interim talent pool opens recurring opportunities beyond this role.',
    contacts: [],
    signals: [
      'Immediate need per posting',
      '8+ month engagement (substantial duration)',
      'Overflow customer-facing commercial contracts',
      'Fully remote, direct apply path',
    ],
  },
  {
    name: 'Latitude Legal — Corporate Attorney, In-House and Remote (jobs/6510)',
    website: 'https://latitudelegal.com',
    pipeline: 'legal-freelance',
    industry: 'Legal Staffing / ALSP',
    location: 'Remote (Denver preferred for conversion option)',
    fundingStage: 'Established',
    fitScore: 30,
    intentScore: 50,
    vertical: 'legal',
    subvertical: 'M&A',
    engagementModel: 'contract',
    buyerType: 'operating-company',
    compensationText: '$175,000 - $225,000+ annualized (part-time, prorated)',
    remoteFlag: 'remote',
    employmentTypeRaw: 'Part-time contract engagement (may convert to full-time in-office in Denver)',
    urgencyScore: 75,
    source: 'Latitude Legal',
    sourceUrl: 'https://latitudelegal.com/jobs/6510',
    notes: 'Energy company seeking part-time M&A + commercial attorney. Strong comp. Latitude platform gives access to all open engagements upon registration. Denver conversion option (optional).',
    contacts: [],
    signals: [
      'Part-time, fully remote',
      'Strong comp $175-225k annualized',
      'M&A + commercial contracts focus',
      'Chambers-ranked platform (2026 NewLaw Guide)',
    ],
  },
  {
    name: 'Latitude Legal — Commercial Contracts Attorney (Remote Contract Engagement, jobs/5073)',
    website: 'https://latitudelegal.com',
    pipeline: 'legal-freelance',
    industry: 'Legal Staffing / ALSP',
    location: 'Remote',
    fundingStage: 'Established',
    fitScore: 30,
    intentScore: 45,
    vertical: 'legal',
    subvertical: 'contracts',
    engagementModel: 'contract',
    buyerType: 'operating-company',
    compensationText: '$160,000 - $200,000+ annualized',
    remoteFlag: 'remote',
    employmentTypeRaw: 'Contract engagement, remote',
    urgencyScore: 60,
    source: 'Latitude Legal',
    sourceUrl: 'https://latitudelegal.com/jobs/5073',
    notes: 'Evergreen commercial contracts platform role at Latitude. Broad paper types: vendor, procurement, IT, marketing, supply chain, consulting. Good ongoing pipeline entry point.',
    contacts: [],
    signals: [
      'Broad commercial paper (vendor, procurement, IT, marketing, supply chain)',
      'Comp $160-200k annualized',
      'Evergreen platform role — ongoing placement opportunities',
    ],
  },
  {
    name: 'aVenture — Venture Capital Fund Attorney',
    website: 'https://aventure.vc',
    pipeline: 'legal-freelance',
    industry: 'Fintech / VC Platform',
    location: 'Remote (Pacific time overlap required)',
    fundingStage: 'Early Stage',
    fitScore: 45,
    intentScore: 30,
    vertical: 'legal',
    subvertical: 'fund',
    engagementModel: 'consultant',
    buyerType: 'fund',
    compensationText: '$80,000 - $120,000 (stated; below market for senior fund attorney)',
    remoteFlag: 'remote',
    employmentTypeRaw: 'Direct hire (appears full-time or part-time)',
    urgencyScore: 55,
    source: 'Glassdoor',
    sourceUrl: 'https://www.glassdoor.com/job-listing/venture-capital-fund-attorney-aventure-JV_IC1139761_KO0,29_KE30,38.htm?jl=1008239968893',
    notes: 'Strong fund-practice fit (VC fund registration, compliance, structuring). Comp below market — needs negotiation. Pacific overlap requirement adds scheduling constraint. Early-stage platform with growth upside.',
    contacts: [],
    signals: [
      'VC fund focus — fund registration, compliance, structuring',
      'aVenture democratizes VC access to retail investors',
      'Glassdoor active listing',
    ],
  },
  {
    name: 'K&L Gates — Special Projects Lawyer, Emerging Growth & VC (Remote)',
    website: 'https://www.klgates.com',
    pipeline: 'legal-freelance',
    industry: 'Law Firm (AmLaw 100)',
    location: 'Remote (must be licensed in K&L Gates office state)',
    fundingStage: 'Established',
    fitScore: 30,
    intentScore: 35,
    vertical: 'legal',
    subvertical: 'corporate',
    engagementModel: 'contract',
    buyerType: 'law-firm',
    compensationText: 'Law firm contract rates (est. $120,000-$200,000 annualized)',
    remoteFlag: 'remote',
    employmentTypeRaw: 'Special projects attorney (law firm, project-based engagement)',
    urgencyScore: 65,
    source: 'everyopening.com',
    sourceUrl: 'https://www.everyopening.com/jobs/k-l-gates-emerging-growth-and-venture-capital-special-projects-lawyer-los-angeles-california-2026-03',
    notes: 'Posted May 18, 2026. AmLaw 100 VC/emerging growth special projects role. Project-based framing closer to contract work than associate track. Requires K&L Gates office state license. Good pathway to VC-adjacent work.',
    contacts: [],
    signals: [
      'Posted May 18, 2026 — within 30-day window',
      'Project-based framing (not traditional associate track)',
      'VC/emerging growth clients — adjacent to fund-side work',
      'AmLaw 100 firm — credibility and client quality',
    ],
  },
];

async function main() {
  console.log(`\n🔵 Legal Freelance Import — ${SCRAPE_DATE}`);
  console.log(`   Total leads to import: ${leads.length}\n`);

  let imported = 0;
  let skipped = 0;

  for (const lead of leads) {
    // Deduplicate by company/role name
    const existing = await prisma.company.findFirst({
      where: { name: lead.name },
    });

    if (existing) {
      console.log(`   ⚠️  SKIP (exists): ${lead.name}`);
      skipped++;
      continue;
    }

    // Create company record
    const company = await prisma.company.create({
      data: {
        name: lead.name,
        website: lead.website,
        industry: lead.industry,
        location: lead.location,
        fundingStage: lead.fundingStage,
        pipeline: lead.pipeline,
        notes: lead.notes,
      },
    });

    // Create contacts if present
    for (const contact of lead.contacts || []) {
      await prisma.contact.create({
        data: {
          name: contact.name,
          title: contact.title || null,
          email: contact.email || null,
          linkedin: contact.linkedin || null,
          companyId: company.id,
        },
      });
    }

    // Create scrape result record
    await prisma.scrapeResult.create({
      data: {
        scrapeDate: new Date(SCRAPE_DATE),
        scrapeType: SCRAPE_TYPE,
        companyId: company.id,
        pipeline: lead.pipeline,
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
        source: lead.source,
        sourceUrl: lead.sourceUrl,
        signals: JSON.stringify(lead.signals || []),
        fitDetails: JSON.stringify(lead.fitDetails || {}),
        intentDetails: JSON.stringify(lead.intentDetails || {}),
        notes: lead.notes,
      },
    });

    console.log(`   ✅ IMPORTED: ${lead.name}`);
    console.log(`      Fit: ${lead.fitScore} | Intent: ${lead.intentScore} | Combined: ${lead.fitScore + lead.intentScore} | Urgency: ${lead.urgencyScore}`);
    imported++;
  }

  console.log(`\n📊 Summary`);
  console.log(`   Imported : ${imported}`);
  console.log(`   Skipped  : ${skipped}`);
  console.log(`   Total    : ${leads.length}\n`);
}

main()
  .catch((e) => {
    console.error('Import failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
