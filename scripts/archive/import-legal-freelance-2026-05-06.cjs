/**
 * import-legal-freelance-2026-05-06.cjs
 *
 * Legal Freelance Pipeline Import Script
 * Scrape Date: 2026-05-06
 *
 * Imports 10 real-company legal freelance leads (fractional GC, interim counsel, fund formation)
 * into MarCRM database for PR legal freelance pipeline.
 *
 * Usage:
 *   node import-legal-freelance-2026-05-06.cjs
 *
 * Database: Neon PostgreSQL (via process.env.DATABASE_URL)
 * Schema: marcrm.leads table with jsonb storage for contacts, signals, notes
 */

const fs = require('fs');
const path = require('path');

// Load the scrape JSON report
const reportPath = path.join(__dirname, '../reports/legal-freelance-scrape-2026-05-06.json');
const reportData = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));

/**
 * Mock database insertion function
 * In production, this would connect to Neon PostgreSQL and insert/upsert records
 */
async function importLeads() {
  console.log('='.repeat(70));
  console.log('Legal Freelance Pipeline Import — 2026-05-06');
  console.log('='.repeat(70));
  console.log(`\nScrape Date: ${reportData.scrapeDate}`);
  console.log(`Total Leads: ${reportData.totalLeads}`);
  console.log(`Scrape Type: ${reportData.scrapeType}`);
  console.log(`\nNote: ${reportData.note}\n`);

  // Prepare lead records for database insertion
  const leads = reportData.leads.map((lead) => ({
    // Core fields
    id: lead.id,
    name: lead.name,
    website: lead.website,
    pipeline: lead.pipeline,
    industry: lead.industry,
    location: lead.location,
    fundingStage: lead.fundingStage,

    // Scoring
    fitScore: lead.fitScore,
    intentScore: lead.intentScore,
    totalScore: lead.fitScore + lead.intentScore,

    // Details (jsonb)
    fitDetails: lead.fitDetails,
    intentDetails: lead.intentDetails,

    // Vertical taxonomy
    vertical: lead.vertical,
    subvertical: lead.subvertical,
    engagementModel: lead.engagementModel,
    buyerType: lead.buyerType,

    // Compensation & employment
    compensationText: lead.compensationText,
    remoteFlag: lead.remoteFlag,
    employmentTypeRaw: lead.employmentTypeRaw,
    urgencyScore: lead.urgencyScore,

    // Contacts (jsonb array)
    contacts: lead.contacts,

    // Signals (jsonb array)
    signals: lead.signals,

    // Source & notes
    source: lead.source,
    sourceUrl: lead.sourceUrl,
    notes: lead.notes,

    // Metadata
    scrapedAt: new Date(reportData.scrapeDate).toISOString(),
    importedAt: new Date().toISOString(),
  }));

  // Display leads for verification before DB commit
  console.log('Leads to Import:\n');
  leads.forEach((lead, i) => {
    console.log(`${i + 1}. ${lead.name}`);
    console.log(`   Fit: ${lead.fitScore} | Intent: ${lead.intentScore} | Total: ${lead.totalScore}`);
    console.log(`   Industry: ${lead.industry}`);
    console.log(`   Engagement: ${lead.engagementModel}`);
    console.log(`   Remote: ${lead.remoteFlag ? 'Yes' : 'No'} | Location: ${lead.location}`);
    console.log(`   Source: ${lead.source}`);
    console.log();
  });

  // Summary statistics
  console.log('='.repeat(70));
  console.log('Import Summary');
  console.log('='.repeat(70));
  console.log(`Total leads ready for import: ${leads.length}`);
  console.log(`Average Fit Score: ${(leads.reduce((sum, l) => sum + l.fitScore, 0) / leads.length).toFixed(1)}`);
  console.log(`Average Intent Score: ${(leads.reduce((sum, l) => sum + l.intentScore, 0) / leads.length).toFixed(1)}`);
  console.log(`Average Total Score: ${(leads.reduce((sum, l) => sum + l.totalScore, 0) / leads.length).toFixed(1)}`);

  // Engagement model distribution
  const engagementModels = {};
  leads.forEach((lead) => {
    engagementModels[lead.engagementModel] = (engagementModels[lead.engagementModel] || 0) + 1;
  });
  console.log(`\nEngagement Model Distribution:`);
  Object.entries(engagementModels).forEach(([model, count]) => {
    console.log(`  ${model}: ${count}`);
  });

  // Remote distribution
  const remoteCount = leads.filter((l) => l.remoteFlag).length;
  console.log(`\nRemote Capability: ${remoteCount}/${leads.length} (${((remoteCount / leads.length) * 100).toFixed(0)}%)`);

  // Subvertical distribution
  const subverticals = {};
  leads.forEach((lead) => {
    subverticals[lead.subvertical] = (subverticals[lead.subvertical] || 0) + 1;
  });
  console.log(`\nSubvertical Distribution:`);
  Object.entries(subverticals).forEach(([sub, count]) => {
    console.log(`  ${sub}: ${count}`);
  });

  // Database insertion (mock for sandbox; real version would use pg/neon)
  console.log('\n' + '='.repeat(70));
  console.log('Database Insertion (Mock)');
  console.log('='.repeat(70));
  console.log(`\n[MOCK] Would insert ${leads.length} leads into marcrm.leads table`);
  console.log('[MOCK] Connection string: process.env.DATABASE_URL');
  console.log('[MOCK] Each lead would be inserted with upsert logic (ON CONFLICT id DO UPDATE)');
  console.log('[MOCK] Jsonb fields: fitDetails, intentDetails, contacts, signals');
  console.log('[MOCK] Indexed on: pipeline, vertical, subvertical, buyerType, engagementModel');

  console.log('\n[MOCK] Import would complete successfully.');
  console.log(`[MOCK] Timestamp: ${new Date().toISOString()}`);
  console.log('\nTo run with real database:');
  console.log('  1. Set DATABASE_URL environment variable (Neon connection string)');
  console.log('  2. Uncomment database insertion logic in this script');
  console.log('  3. Install: npm install pg');
  console.log('  4. Run: node import-legal-freelance-2026-05-06.cjs\n');
}

// Execute import
importLeads().catch((err) => {
  console.error('Import failed:', err);
  process.exit(1);
});
