/**
 * import-legal-freelance-2026-05-06.cjs
 *
 * Import script for legal freelance scrape (2026-05-06)
 * Loads 6 legal freelance leads into Neon PostgreSQL
 *
 * USAGE: node import-legal-freelance-2026-05-06.cjs
 *
 * NOTES:
 * - This script must be run from local environment with Neon DB access
 * - Sandbox cannot reach Neon; run this on your dev machine
 * - Ensure DATABASE_URL env var is set or update .env.local
 * - Creates leads with pipeline='legal-freelance' for easy filtering
 */

const fs = require('fs');
const path = require('path');

// Load scrape data
const scrapePath = path.join(__dirname, '../reports/legal-freelance-scrape-2026-05-06.json');
const scrapeData = JSON.parse(fs.readFileSync(scrapePath, 'utf-8'));

// Pseudocode for DB insertion (requires actual DB client setup)
// Replace with actual Prisma client or pg client as per your setup

async function importLeads() {
  console.log(`\n=== Legal Freelance Lead Import ===`);
  console.log(`Scrape Date: ${scrapeData.scrapeDate}`);
  console.log(`Total Leads: ${scrapeData.totalLeads}`);
  console.log(`Pipeline: ${scrapeData.scrapeType}\n`);

  // Initialize DB client (example with Prisma)
  // const { PrismaClient } = require('@prisma/client');
  // const prisma = new PrismaClient();

  for (const lead of scrapeData.leads) {
    console.log(`\n[${lead.id}] ${lead.name}`);
    console.log(`  Fit Score: ${lead.fitScore} | Intent Score: ${lead.intentScore}`);
    console.log(`  Industry: ${lead.industry}`);
    console.log(`  Location: ${lead.location}`);
    console.log(`  Engagement: ${lead.engagementModel}`);
    console.log(`  Compensation: ${lead.compensationText}`);
    console.log(`  Remote: ${lead.remoteFlag ? 'Yes' : 'No'}`);
    console.log(`  URL: ${lead.sourceUrl}`);

    // Example Prisma insertion (commented for reference)
    /*
    try {
      const created = await prisma.lead.create({
        data: {
          name: lead.name,
          website: lead.website,
          pipeline: lead.pipeline,
          industry: lead.industry,
          location: lead.location,
          fundingStage: lead.fundingStage,
          fitScore: lead.fitScore,
          intentScore: lead.intentScore,
          totalScore: lead.fitScore + lead.intentScore,
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
          notes: lead.notes,
          fitDetails: lead.fitDetails.join(' | '),
          intentDetails: lead.intentDetails.join(' | '),
          signals: lead.signals.join(' | '),
          // Add contacts if your schema supports JSON/relationship
          contacts: {
            create: lead.contacts.map(c => ({
              name: c.name,
              title: c.title,
              email: c.email,
              linkedin: c.linkedin,
            })),
          },
        },
      });
      console.log(`  ✓ Created lead ID: ${created.id}`);
    } catch (err) {
      console.error(`  ✗ Error creating lead: ${err.message}`);
    }
    */

    // For now, just log the import data
    console.log(`  [READY TO INSERT]`);
  }

  console.log(`\n=== Import Summary ===`);
  console.log(`Total leads ready: ${scrapeData.totalLeads}`);
  console.log(`Pipeline: ${scrapeData.scrapeType}`);
  console.log(`Quality: All leads 55+ score`);
  console.log(`Priority A (80+): 2 leads`);
  console.log(`Priority B (60-79): 3 leads`);
  console.log(`Priority C (40-59): 1 lead`);
  console.log(`\nNext Steps:`);
  console.log(`1. Connect to Neon DB (ensure DATABASE_URL is set)`);
  console.log(`2. Uncomment Prisma client code above`);
  console.log(`3. Run: node import-legal-freelance-2026-05-06.cjs`);
  console.log(`4. Verify leads in MarCRM UI under legal-freelance pipeline`);

  // Uncomment to actually connect to DB:
  // await prisma.$disconnect();
}

// Run import
importLeads().catch(err => {
  console.error('Import failed:', err);
  process.exit(1);
});

/*
 * EXAMPLE PRISMA SCHEMA (reference)
 *
 * model Lead {
 *   id                String   @id @default(cuid())
 *   name              String
 *   website           String?
 *   pipeline          String   // "legal-freelance", "pr-freelance", etc.
 *   industry          String?
 *   location          String?
 *   fundingStage      String?
 *   fitScore          Int      // 0-50
 *   intentScore       Int      // 0-50
 *   totalScore        Int      @db.Integer // fitScore + intentScore
 *   vertical          String   // "legal", "pr", etc.
 *   subvertical       String?  // "fund-formation", "contracts", etc.
 *   engagementModel   String?  // "contract", "fractional", "freelance", etc.
 *   buyerType         String?  // "vc-platform", "marketplace", etc.
 *   compensationText  String?
 *   remoteFlag        Boolean  @default(false)
 *   employmentTypeRaw String?
 *   urgencyScore      Int      @default(5) // 1-10
 *   source            String?  // "Glassdoor", "ZipRecruiter", etc.
 *   sourceUrl         String?
 *   notes             String?  @db.Text
 *   fitDetails        String?  @db.Text
 *   intentDetails     String?  @db.Text
 *   signals           String?  @db.Text
 *   createdAt         DateTime @default(now())
 *   updatedAt         DateTime @updatedAt
 *   contacts          Contact[]
 * }
 *
 * model Contact {
 *   id        String   @id @default(cuid())
 *   leadId    String
 *   lead      Lead     @relation(fields: [leadId], references: [id])
 *   name      String?
 *   title     String?
 *   email     String?
 *   linkedin  String?
 *   createdAt DateTime @default(now())
 * }
 */
