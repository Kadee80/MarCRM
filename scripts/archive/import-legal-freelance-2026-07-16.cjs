/**
 * Import script: Legal Freelance Scrape 2026-07-16
 * Run: node scripts/import-legal-freelance-2026-07-16.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 * All leads: pipeline = "legal-freelance".
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "Broughton Group — Private Funds Transactions Attorney (3-Month Contract, Hybrid NY)",
    website: "https://www.jobleads.com/us/job/private-funds-transactions-attorney-3-month-contract--new-york--ef1ac7919fd74317136ca7ea87637a4b0",
    pipeline: "legal-freelance",
    industry: "Legal staffing / contract-attorney placement (transactional); end client is a private funds / corporate transactions practice",
    location: "New York, NY (hybrid)",
    fundingStage: "n/a",
    fitScore: 40,
    intentScore: 35,
    vertical: "legal",
    subvertical: "fund",
    engagementModel: "contract",
    buyerType: "staffing",
    compensationText: "USD ~115,000 (annualized equivalent); 3-month contract engagement",
    remoteFlag: "hybrid",
    employmentTypeRaw: "3-Month Contract (full-time hours), transactional attorney",
    urgencyScore: 42,
    source: "Web search + direct fetch (JobLeads / Broughton Group, July 2026)",
    sourceUrl: "https://www.jobleads.com/us/job/private-funds-transactions-attorney-3-month-contract--new-york--ef1ac7919fd74317136ca7ea87637a4b0",
    notes: "Grade B (combined 75; urgency scored down for age). New company; clean defined 3-month private-funds transactional contract, hybrid NY. Included despite ~22-day age (outside strict 7-day window) as a distinct new channel + strong ICP match. ACTION: verify live (may be filled); pitch private-funds transactional drafting/negotiation for the full term. Track Broughton as recurring NY fund channel.",
    contacts: [
      { name: "Broughton Group — Legal Recruiting", title: "Legal Staffing / Recruiting", email: "", linkedin: "https://www.linkedin.com/company/broughton-group" }
    ]
  },
  {
    name: "Tower Legal Solutions — Private Funds Contract Attorney (Temporary, On-site NY)",
    website: "https://www.towerls.com/",
    pipeline: "legal-freelance",
    industry: "Legal staffing / contract-attorney placement firm; end client is a corporate fund practice (private investment funds)",
    location: "New York, NY (on-site)",
    fundingStage: "n/a",
    fitScore: 40,
    intentScore: 25,
    vertical: "legal",
    subvertical: "fund",
    engagementModel: "contract",
    buyerType: "staffing",
    compensationText: "$80–$120/hr depending on experience; temporary staff-attorney engagement",
    remoteFlag: "onsite",
    employmentTypeRaw: "Temporary / part-time Staff Attorney (W-2 via Tower Legal Solutions)",
    urgencyScore: 58,
    source: "Web search + direct fetch (JobLeads / Tower Legal Solutions, July 2026)",
    sourceUrl: "https://www.jobleads.com/us/job/private-funds-contract-attorney-temporary--new-york--ed8a159e69fa3c5b3d67db0e759e12bc9",
    notes: "Grade B (combined 65). Strong practice fit: private-fund side letters + feeder fund formation at $80-120/hr. Drawbacks: on-site NY (no remote) and staff-attorney (not counsel/GC) tier. Tower is a recurring channel in CRM but this on-site 'Temporary' role is distinct from the prior remote Tower posting. ACTION: apply if on-site NY works; else route to Tower bench for remote private-funds variants. Verify live.",
    contacts: [
      { name: "Tower Legal Solutions — Attorney Recruiting", title: "Legal Staffing / Recruiting", email: "info@towerls.com", linkedin: "https://www.linkedin.com/company/tower-legal-solutions" }
    ]
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
        scrapeDate: new Date("2026-07-16")
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
