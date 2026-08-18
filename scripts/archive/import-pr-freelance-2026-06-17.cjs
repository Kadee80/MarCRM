// import-pr-freelance-2026-06-17.cjs
// PR Freelance scrape import — 2026-06-17
// Run with: node scripts/import-pr-freelance-2026-06-17.cjs

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const SCRAPE_DATE = '2026-06-17';
const SCRAPE_TYPE = 'pr-freelance';

const leads = [
  {
    name: 'Crackle PR',
    website: 'https://www.cracklepr.com',
    pipeline: 'pr-freelance',
    industry: 'PR Agency — B2B Tech / Fintech',
    location: 'Remote (Boston, NYC, SF, Austin, Portsmouth NH)',
    fundingStage: null,
    fitScore: 50,
    intentScore: 45,
    vertical: 'pr',
    subvertical: 'media-relations',
    engagementModel: 'freelance',
    buyerType: 'agency',
    compensationText: 'Not listed; senior strategist rates typical for B2B tech PR',
    remoteFlag: 'remote',
    employmentTypeRaw: 'Freelance / contractor (explicitly stated on careers page)',
    urgencyScore: 75,
    source: 'Crackle PR Careers Page',
    sourceUrl: 'https://www.cracklepr.com/careers',
    notes: 'Grade A (95). Always hiring senior B2B tech PR strategists. Email parry@cracklepr.com directly. All-senior agency model; clients include Creditsafe, ON24, Oracle, Schneider Electric, SoftBank.',
    contacts: [
      {
        name: 'Parry Headrick',
        title: 'Founder & Chief Evangelist',
        email: 'parry@cracklepr.com',
        linkedin: 'https://www.linkedin.com/company/crackle-pr',
      },
    ],
  },
  {
    name: 'Imprint',
    website: 'https://www.imprint.co',
    pipeline: 'pr-freelance',
    industry: 'Fintech / Payments',
    location: 'New York, NY (Hybrid / Fully Flexible)',
    fundingStage: 'Growth',
    fitScore: 50,
    intentScore: 30,
    vertical: 'pr',
    subvertical: 'executive-comms',
    engagementModel: 'fractional',
    buyerType: 'startup',
    compensationText: 'Competitive compensation and equity packages (full-time posting); fractional rate to be negotiated',
    remoteFlag: 'hybrid',
    employmentTypeRaw: 'Full-Time Employee (founding hire with benefits + equity)',
    urgencyScore: 80,
    source: 'Ashby HQ Job Board',
    sourceUrl: 'https://jobs.ashbyhq.com/imprint/c093b16c-cdbb-417d-9409-0948d12f38df',
    notes: 'Grade B (80). FTE posting but pitch fractional bridge. VC-backed (Kleiner, Thrive, Ribbit, Khosla). Building comms from scratch. Partners: Crate & Barrel, Rakuten, Booking.com, H-E-B, Shell.',
    contacts: [],
  },
  {
    name: 'Firebrand Communications',
    website: 'https://www.firebrand.marketing',
    pipeline: 'pr-freelance',
    industry: 'PR Agency — B2B AI / Tech',
    location: 'San Francisco, CA (Remote roles available)',
    fundingStage: null,
    fitScore: 45,
    intentScore: 25,
    vertical: 'pr',
    subvertical: 'media-relations',
    engagementModel: 'consultant',
    buyerType: 'agency',
    compensationText: 'Not listed',
    remoteFlag: 'remote',
    employmentTypeRaw: 'Open roles on Workable — type unconfirmed; agency overflow pitch recommended',
    urgencyScore: 40,
    source: 'Firebrand Communications Workable Careers Page',
    sourceUrl: 'https://apply.workable.com/firebrandcomms/',
    notes: 'Grade B (70). B2B AI/tech PR agency since 2016. Agency overflow / white-label partnership pitch. Check workable for contractor openings.',
    contacts: [],
  },
];

async function main() {
  console.log(`Starting PR Freelance import for ${SCRAPE_DATE}...`);
  let imported = 0;
  let skipped = 0;

  for (const lead of leads) {
    // Check for existing company (deduplicate by name)
    const existing = await prisma.company.findFirst({
      where: { name: lead.name },
    });

    if (existing) {
      console.log(`  SKIP (exists): ${lead.name}`);
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
        fitScore: lead.fitScore,
        intentScore: lead.intentScore,
        // Extended fields — stored as notes/metadata if schema supports, otherwise in scrapeResult
        notes: lead.notes,
      },
    });

    console.log(`  CREATED company: ${lead.name} (id: ${company.id})`);

    // Create contacts
    for (const contact of lead.contacts) {
      await prisma.contact.create({
        data: {
          companyId: company.id,
          name: contact.name,
          title: contact.title,
          email: contact.email,
          linkedin: contact.linkedin,
        },
      });
      console.log(`    CREATED contact: ${contact.name} (${contact.title})`);
    }

    // Create scrape result with extended fields
    await prisma.scrapeResult.create({
      data: {
        companyId: company.id,
        scrapeDate: new Date(SCRAPE_DATE),
        scrapeType: SCRAPE_TYPE,
        source: lead.source,
        sourceUrl: lead.sourceUrl,
        fitScore: lead.fitScore,
        intentScore: lead.intentScore,
        pipeline: lead.pipeline,
        // Extended pr-freelance fields
        vertical: lead.vertical,
        subvertical: lead.subvertical,
        engagementModel: lead.engagementModel,
        buyerType: lead.buyerType,
        compensationText: lead.compensationText,
        remoteFlag: lead.remoteFlag,
        employmentTypeRaw: lead.employmentTypeRaw,
        urgencyScore: lead.urgencyScore,
        rawData: JSON.stringify({
          vertical: lead.vertical,
          subvertical: lead.subvertical,
          engagementModel: lead.engagementModel,
          buyerType: lead.buyerType,
          compensationText: lead.compensationText,
          remoteFlag: lead.remoteFlag,
          employmentTypeRaw: lead.employmentTypeRaw,
          urgencyScore: lead.urgencyScore,
          notes: lead.notes,
        }),
      },
    });

    console.log(`    CREATED scrapeResult for: ${lead.name}`);
    imported++;
  }

  console.log(`\nImport complete: ${imported} inserted, ${skipped} skipped (already exist).`);
}

main()
  .catch((e) => {
    console.error('Import failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
