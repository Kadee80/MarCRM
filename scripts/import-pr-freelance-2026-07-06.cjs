/**
 * Import script: PR Freelance Scrape 2026-07-06
 * Run: node scripts/import-pr-freelance-2026-07-06.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres
 * Deduplicates by company name (skips existing companies).
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "Four Pines Fund — Fractional Director of Communications (Contract)",
    website: "https://fourpines.org",
    pipeline: "pr-freelance",
    industry: "National philanthropy / grantmaking foundation (systems-change focus)",
    location: "Remote (US-based)",
    fundingStage: "Established 2023 philanthropy in growth phase — fractional/contract brief via Daybook job board",
    fitScore: 30,
    intentScore: 30,
    vertical: "pr",
    subvertical: "executive-comms",
    engagementModel: "fractional",
    buyerType: "operating-company",
    compensationText: "Not published (fractional / contract; ~4-5 month assessment-and-plan phase transitioning to ongoing execution)",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional, contract position",
    urgencyScore: 40,
    source: "Daybook (web search)",
    sourceUrl: "https://www.daybook.com/job/fractional-director-of-communications-contract-position-w2exwwvL8r4sE2FA2",
    notes: "Grade B (combined 60), strongest new lead this week. Senior fractional comms brief: assess -> build strategic plan (first 4-5 months) -> run execution/ongoing management; requires 7+ yrs building comms functions. Clean match to Mark's strategic+executional fractional-operator profile. SECTOR CAVEAT: national philanthropy (systems-change), NOT finance/PE/B2B, so 0 on sector fit — relationship/portfolio lead. Do NOT confuse with '4Pines Fund Services LLC' (fourpinesfs.com), a separate fund-admin firm; this is the philanthropy at fourpines.org. PITCH: senior fractional comms lead to stand up the function fast (assessment, messaging architecture, earned-media/visibility, exec/thought-leadership) on a scoped retainer. ACTION: apply via Daybook and/or reach via LinkedIn.",
    contacts: [
      { name: null, title: "Hiring contact via Daybook listing", email: null, linkedin: "https://www.linkedin.com/company/fourpines" }
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
        scrapeDate: new Date("2026-07-06")
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
