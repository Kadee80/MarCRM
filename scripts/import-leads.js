/**
 * Import leads from a daily scrape JSON file into the MarCRM database.
 * Usage: node scripts/import-leads.js reports/daily-scrape-YYYY-MM-DD.json
 */
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error('Usage: node scripts/import-leads.js <path-to-json>');
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(path.resolve(filePath), 'utf-8'));
  console.log(`Importing ${data.leads.length} leads from ${filePath}...`);

  const existing = await prisma.company.findMany({ select: { name: true } });
  const existingNames = new Set(existing.map(c => c.name.toLowerCase()));

  let inserted = 0;
  let skipped = 0;

  for (const lead of data.leads) {
    if (existingNames.has(lead.name.toLowerCase())) {
      console.log(`  SKIP (exists): ${lead.name}`);
      skipped++;
      continue;
    }

    const company = await prisma.company.create({
      data: {
        name: lead.name,
        website: lead.website || '',
        pipeline: lead.pipeline,
        industry: lead.industry || '',
        size: lead.size || '',
        location: lead.location || '',
        fundingStage: lead.fundingStage || '',
        stage: lead.stage || 'Targeted',
        fitScore: lead.fitScore || 0,
        intentScore: lead.intentScore || 0,
        fitDetails: JSON.stringify(lead.fitDetails || {}),
        intentDetails: JSON.stringify(lead.intentDetails || {}),
        techStack: JSON.stringify(lead.techStack || []),
        source: lead.source || 'Daily Scrape',
        notes: lead.notes || '',
        lastActivity: lead.lastActivity || '',
        starred: lead.starred || false,
        revenue: '',
        contacts: {
          create: (lead.contacts || []).map(c => ({
            name: c.name,
            title: c.title || '',
            email: c.email || '',
            phone: '',
            linkedin: c.linkedin || '',
            persona: c.persona || '',
            decisionMaker: c.decisionMaker || false,
          }))
        }
      }
    });
    console.log(`  INSERTED: ${lead.name} (id=${company.id}, score=${lead.fitScore + lead.intentScore})`);
    inserted++;
  }

  console.log(`\nDone: ${inserted} inserted, ${skipped} skipped`);
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
