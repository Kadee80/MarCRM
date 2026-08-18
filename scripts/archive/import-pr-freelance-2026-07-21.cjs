/**
 * Import script: PR Freelance Scrape 2026-07-21
 * Run: node scripts/import-pr-freelance-2026-07-21.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "Cast Influence — Senior PR Manager, Tech/SaaS/ESG (Fractional Contract)",
    website: "https://www.castinfluence.com",
    pipeline: "pr-freelance",
    industry: "PR and marketing agency — B2B SaaS, ESG/clean tech, fintech/blockchain, emerging tech and consumer practices",
    location: "Remote (remote-first; agency HQ Denver, CO)",
    fundingStage: "n/a — independent agency, founded 2017",
    fitScore: 50,
    intentScore: 30,
    vertical: "pr",
    subvertical: "agency-overflow",
    engagementModel: "fractional",
    buyerType: "agency",
    compensationText: "\"Negotiated\" — no rate band published",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional / contractor, with potential to convert to full-time",
    urgencyScore: 40,
    source: "Cast Influence careers page (Open Roles), surfaced via Indeed fractional-communications index, July 2026",
    sourceUrl: "https://www.castinfluence.com/career/senior-pr-manager-tech-saas-and-esg",
    notes: "Grade A (combined 80) — only lead clearing 55 this run and the strongest agency-overflow fit in several weeks. Brief matches Mark's product line item for item: PR strategy and execution across multiple clients, pitching storylines, press releases, op-eds, thought leadership, journalist/editor relationships, PR-to-KPI reporting. Buyer type converts fastest — an agency with existing clients, budget and a delivery team that needs senior judgement, not junior staffing. B2B SaaS is a named core sector; separate fintech/blockchain practice widens the finance surface area. CAVEATS: (1) comp is 'Negotiated' with no band — do rate discovery on the first call; (2) posting is undated and reads evergreen, so it may be bench-building rather than an active req — qualify before writing a tailored pitch; (3) 'potential to grow into a full-time role' signals budget but also headcount intent — frame as a retained partnership from the first conversation; (4) some duties skew tactical (media list management, Reddit AMAs, Telegram/Discord community work) — scope out or price separately. ACTION: apply via careers form AND email hello@castinfluence.com with 3 named B2B SaaS/fintech placements, a proposed monthly retainer covering 1-2 accounts, and an explicit statement that he works at the strategy and media-relations layer with their production team executing beneath him.",
    contacts: [
      {
        name: null,
        title: "Careers / general enquiries",
        email: "hello@castinfluence.com",
        linkedin: "https://www.linkedin.com/company/cast-influence/"
      }
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
        scrapeDate: new Date("2026-07-21")
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
