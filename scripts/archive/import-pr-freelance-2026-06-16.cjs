// import-pr-freelance-2026-06-16.cjs
// PR Freelance scrape import — 2026-06-16
// Run: node scripts/import-pr-freelance-2026-06-16.cjs
// Requires: DATABASE_URL env var pointing to Neon (set in .env or shell)

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: 'FINN Partners',
    website: 'finnpartners.com',
    pipeline: 'pr-freelance',
    vertical: 'pr',
    industry: 'Financial Services PR (Agency)',
    location: 'New York, NY',
    fitScore: 45,
    intentScore: 20,
    totalScore: 65,
    grade: 'B',
    subvertical: 'media-relations,comms',
    engagementModel: 'consultant',
    buyerType: 'agency',
    compensationText: null,
    remoteFlag: 'hybrid',
    employmentTypeRaw: 'full-time',
    urgencyScore: 15,
    sourceUrl: 'https://www.finnpartners.com/job/public-relations-senior-account-executive-financial-services-pr/',
    notes: 'Growing FS PR team with 2 open roles (AE + Sr AE) in fintech, investing, crypto, insurance, banking, payments. Right play is proactive outreach re: overflow/project work — not direct FT application. One of the top independent PR firms in the U.S.',
    scrapedAt: new Date('2026-06-16'),
  },
  {
    name: 'Prosek Partners',
    website: 'prosek.com',
    pipeline: 'pr-freelance',
    vertical: 'pr',
    industry: 'Financial Services PR / Private Markets',
    location: 'New York, NY',
    fitScore: 45,
    intentScore: 15,
    totalScore: 60,
    grade: 'B',
    subvertical: 'investor-pr,executive-comms',
    engagementModel: 'consultant',
    buyerType: 'agency,ir-firm',
    compensationText: null,
    remoteFlag: 'onsite',
    employmentTypeRaw: 'full-time',
    urgencyScore: 10,
    sourceUrl: 'https://job-boards.greenhouse.io/prosek/jobs/7890274',
    notes: 'Top-5 U.S. financial services PR firm. Specializes in PE/VC, private markets, IR, financial comms, crisis. Open role: Communications Private Markets (NYC). Best-fit agency for Mark\'s sector. Target for fractional/white-label/overflow engagement — not FT application.',
    scrapedAt: new Date('2026-06-16'),
  },
];

async function main() {
  console.log(`Importing ${leads.length} PR freelance leads for 2026-06-16...`);

  for (const lead of leads) {
    const existing = await prisma.contact.findFirst({
      where: { website: lead.website },
    });

    if (existing) {
      console.log(`  SKIP (exists): ${lead.name} — ${lead.website}`);
      continue;
    }

    const created = await prisma.contact.create({
      data: {
        name: lead.name,
        website: lead.website,
        pipeline: lead.pipeline,
        vertical: lead.vertical,
        industry: lead.industry,
        location: lead.location,
        fitScore: lead.fitScore,
        intentScore: lead.intentScore,
        totalScore: lead.totalScore,
        grade: lead.grade,
        subvertical: lead.subvertical,
        engagementModel: lead.engagementModel,
        buyerType: lead.buyerType,
        compensationText: lead.compensationText,
        remoteFlag: lead.remoteFlag,
        employmentTypeRaw: lead.employmentTypeRaw,
        urgencyScore: lead.urgencyScore,
        sourceUrl: lead.sourceUrl,
        notes: lead.notes,
        scrapedAt: lead.scrapedAt,
      },
    });

    console.log(`  CREATED: ${created.name} (id: ${created.id}) — score ${lead.totalScore} [${lead.grade}]`);
  }

  console.log('Done.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
