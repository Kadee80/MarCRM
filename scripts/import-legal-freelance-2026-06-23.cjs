/**
 * Import script — Legal Freelance Scrape 2026-06-23
 * Pipeline: legal-freelance
 * Run: node scripts/import-legal-freelance-2026-06-23.cjs
 *
 * Requires: DATABASE_URL env var pointing to Neon (set in .env or shell)
 * Deduplicates by company name — skips existing companies.
 */

'use strict';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const SCRAPE_DATE = '2026-06-23';
const PIPELINE = 'legal-freelance';

const leads = [
  {
    name: 'Ontra',
    website: 'https://www.ontra.ai',
    pipeline: PIPELINE,
    industry: 'Legal Technology / Alternative Asset Management',
    location: 'Remote (US)',
    fundingStage: 'Series B',
    fitScore: 50,
    intentScore: 40,
    vertical: 'legal',
    subvertical: 'fund',
    engagementModel: 'freelance',
    buyerType: 'ALSP',
    compensationText: 'Hourly, market-rate (negotiated per engagement)',
    remoteFlag: 'remote',
    employmentTypeRaw: 'Freelance / 1099 independent contractor',
    urgencyScore: 80,
    source: 'Built In SF / Ontra network',
    sourceUrl: 'https://www.builtinsf.com/job/legal/us-licensed-freelance-fund-formation-lawyer-remote/103064',
    notes: 'Highest-priority lead. Network model yields recurring engagements from top-tier AM clients. Apply via ontra.ai/legal-network. Posting also active on wellfound.com and builtinaustin.com.',
    signals: JSON.stringify([
      'Fund formation platform for 800+ AM clients',
      'Handles LPAs, side letters, subscription docs',
      'Admin (billing, invoicing, BD) fully handled by Ontra',
      'Multiple job board postings active across Built In network'
    ]),
    contacts: [
      {
        name: '',
        title: 'Legal Network Team',
        email: '',
        linkedin: 'https://www.linkedin.com/company/ontra-ai'
      }
    ]
  },
  {
    name: 'Major, Lindsey & Africa (Interim Fund Formation)',
    website: 'https://www.mlaglobal.com',
    pipeline: PIPELINE,
    industry: 'Legal Recruiting / Interim Legal Staffing',
    location: 'Remote (listed Miami, FL)',
    fundingStage: 'N/A',
    fitScore: 40,
    intentScore: 40,
    vertical: 'legal',
    subvertical: 'fund',
    engagementModel: 'interim',
    buyerType: 'staffing',
    compensationText: 'Not stated',
    remoteFlag: 'remote',
    employmentTypeRaw: 'Contract / interim placement via MLA',
    urgencyScore: 75,
    source: 'ZipRecruiter / LinkedIn',
    sourceUrl: 'https://www.ziprecruiter.com/c/Major-Lindsey-&-Africa/Job/Interim-Fund-Formation-Attorney/-in-Miami,FL?jid=e8159d3b819aaba5',
    notes: 'End client is a law firm. Part-time, 4+ months. Requires 10+ yr fund formation, 1933/1934/1940 Acts. Distinct from prior MLA leads (June 22 Corporate/Securities; June 18 Chicago Fund Formation). Also on LinkedIn job ID 4387969441.',
    signals: JSON.stringify([
      'Law firm client seeking part-time fund formation counsel',
      '4+ month engagement duration',
      'Requires Investment Advisers Act 1940 fluency',
      'Distinct from prior MLA roles captured in pipeline'
    ]),
    contacts: [
      {
        name: '',
        title: 'Interim Legal Talent Team',
        email: '',
        linkedin: 'https://www.linkedin.com/company/major-lindsey-africa'
      }
    ]
  },
  {
    name: 'aVenture',
    website: 'https://www.aventure.vc',
    pipeline: PIPELINE,
    industry: 'Fintech / Venture Capital',
    location: 'Remote (San Francisco, CA)',
    fundingStage: 'Early stage',
    fitScore: 50,
    intentScore: 30,
    vertical: 'legal',
    subvertical: 'fund',
    engagementModel: 'part-time',
    buyerType: 'fund',
    compensationText: '$80,000–$120,000/year (prorated for part-time)',
    remoteFlag: 'remote',
    employmentTypeRaw: 'Full-time or part-time; employment type not specified',
    urgencyScore: 55,
    source: 'Glassdoor / LinkedIn',
    sourceUrl: 'https://www.glassdoor.com/job-listing/venture-capital-fund-attorney-aventure-JV_KO0,29_KE30,38.htm?jl=1008239968893',
    notes: 'VC fund platform seeking fund formation counsel. Part-time option available. $80-120K range. Verify posting is still active — may require cold outreach to founders if stale. 4 hr/day Pacific overlap required.',
    signals: JSON.stringify([
      'Part-time option explicitly available',
      'Fund formation, subscription agreements, LP negotiations core scope',
      '$80-120K comp range stated',
      'Small team — founders accessible for direct outreach'
    ]),
    contacts: [
      {
        name: '',
        title: 'Founders / Legal Team',
        email: '',
        linkedin: 'https://www.linkedin.com/company/aventurefunds'
      }
    ]
  },
  {
    name: 'Paragon Legal',
    website: 'https://paragonlegal.com',
    pipeline: PIPELINE,
    industry: 'Legal Staffing / ALSP',
    location: 'Remote (San Francisco, CA HQ)',
    fundingStage: 'N/A',
    fitScore: 40,
    intentScore: 35,
    vertical: 'legal',
    subvertical: 'corporate',
    engagementModel: 'contract',
    buyerType: 'ALSP',
    compensationText: 'Not stated; negotiated per engagement',
    remoteFlag: 'remote',
    employmentTypeRaw: 'Contract / interim (1099 or W-2 depending on engagement)',
    urgencyScore: 60,
    source: 'Paragon Legal website',
    sourceUrl: 'https://paragonlegal.com/for-attorneys/opportunities/',
    notes: 'Platform/network entry, not a single job. Joining creates ongoing pipeline exposure to PE, fund formation, and corporate contract engagements. Contact info@paragonlegal.com or 415.738.7870. Chambers-ranked ALSP.',
    signals: JSON.stringify([
      'Chambers-ranked flexible legal firm',
      'Explicitly serves PE fund formation, investment structuring clients',
      'Corporate & securities attorney network actively maintained',
      'Remote-first placement model'
    ]),
    contacts: [
      {
        name: '',
        title: 'Attorney Relations Team',
        email: 'info@paragonlegal.com',
        linkedin: 'https://www.linkedin.com/company/paragon-legal'
      }
    ]
  },
  {
    name: 'Lawyers on Demand (LOD)',
    website: 'https://www.lodlaw.com',
    pipeline: PIPELINE,
    industry: 'Alternative Legal Services / Financial Institution',
    location: 'Remote / Hybrid (NYC preferred)',
    fundingStage: 'N/A (Consilio company)',
    fitScore: 30,
    intentScore: 30,
    vertical: 'legal',
    subvertical: 'securities',
    engagementModel: 'contract',
    buyerType: 'ALSP',
    compensationText: 'Starting at $125/hour',
    remoteFlag: 'hybrid',
    employmentTypeRaw: 'Contract / secondment via LOD',
    urgencyScore: 65,
    source: 'LOD / web search',
    sourceUrl: 'https://careers.lodlaw.com/',
    notes: 'Specific engagement: securities contracting (MSFTAs, ACAs) for global financial institution, posted June 12 2026. $125/hr starting. 12+ month engagement. Also worth joining LOD US attorney network for future secondments.',
    signals: JSON.stringify([
      '$125/hour starting rate',
      '12+ month engagement duration',
      'Global financial institution client',
      'SEC / FINRA regulatory compliance scope'
    ]),
    contacts: [
      {
        name: '',
        title: 'LOD US Talent Team',
        email: '',
        linkedin: 'https://www.linkedin.com/company/lodlaw'
      }
    ]
  }
];

async function main() {
  console.log(`\n🔵 Legal Freelance Import — ${SCRAPE_DATE}`);
  console.log(`   Leads to process: ${leads.length}\n`);

  let inserted = 0;
  let skipped = 0;

  for (const lead of leads) {
    // Deduplicate by company name
    const existing = await prisma.company.findFirst({
      where: { name: { equals: lead.name, mode: 'insensitive' } }
    });

    if (existing) {
      console.log(`   ⏭  Skipped (exists): ${lead.name}`);
      skipped++;
      continue;
    }

    // Create company
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
        notes: lead.notes,
        // Extended fields (adjust field names to match your Prisma schema)
        ...(prisma.company.fields?.vertical !== undefined && { vertical: lead.vertical }),
        ...(prisma.company.fields?.subvertical !== undefined && { subvertical: lead.subvertical }),
        ...(prisma.company.fields?.engagementModel !== undefined && { engagementModel: lead.engagementModel }),
        ...(prisma.company.fields?.buyerType !== undefined && { buyerType: lead.buyerType }),
        ...(prisma.company.fields?.compensationText !== undefined && { compensationText: lead.compensationText }),
        ...(prisma.company.fields?.remoteFlag !== undefined && { remoteFlag: lead.remoteFlag }),
        ...(prisma.company.fields?.employmentTypeRaw !== undefined && { employmentTypeRaw: lead.employmentTypeRaw }),
        ...(prisma.company.fields?.urgencyScore !== undefined && { urgencyScore: lead.urgencyScore }),
      }
    });

    // Create contacts
    for (const contact of lead.contacts) {
      if (contact.name || contact.title || contact.email || contact.linkedin) {
        await prisma.contact.create({
          data: {
            companyId: company.id,
            name: contact.name || '',
            title: contact.title || '',
            email: contact.email || '',
            linkedin: contact.linkedin || ''
          }
        });
      }
    }

    // Create scrape result
    await prisma.scrapeResult.create({
      data: {
        companyId: company.id,
        scrapeDate: new Date(SCRAPE_DATE),
        source: lead.source,
        sourceUrl: lead.sourceUrl,
        pipeline: lead.pipeline,
        fitScore: lead.fitScore,
        intentScore: lead.intentScore,
        signals: lead.signals,
        rawData: JSON.stringify({
          vertical: lead.vertical,
          subvertical: lead.subvertical,
          engagementModel: lead.engagementModel,
          buyerType: lead.buyerType,
          compensationText: lead.compensationText,
          remoteFlag: lead.remoteFlag,
          employmentTypeRaw: lead.employmentTypeRaw,
          urgencyScore: lead.urgencyScore
        })
      }
    });

    console.log(`   ✅ Inserted: ${lead.name} (fit=${lead.fitScore} intent=${lead.intentScore})`);
    inserted++;
  }

  console.log(`\n📊 Summary: ${inserted} inserted, ${skipped} skipped\n`);
}

main()
  .catch((e) => {
    console.error('Import error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
