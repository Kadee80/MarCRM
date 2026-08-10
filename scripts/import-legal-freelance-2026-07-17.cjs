/**
 * Import script: Legal Freelance Scrape 2026-07-17
 * Run: node scripts/import-legal-freelance-2026-07-17.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 * All leads: pipeline = "legal-freelance".
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "aVenture — Venture Capital Fund Attorney (Remote)",
    website: "https://aventure.vc/",
    pipeline: "legal-freelance",
    industry: "Venture capital data/analytics platform (fintech for private markets); hiring fund-side legal support",
    location: "Remote (US); company HQ San Francisco, CA",
    fundingStage: "Early-stage startup (VC-backed)",
    fitScore: 40,
    intentScore: 25,
    vertical: "legal",
    subvertical: "fund",
    engagementModel: "contract",
    buyerType: "fund",
    compensationText: "Not stated in indexed snippet",
    remoteFlag: "remote",
    employmentTypeRaw: "Venture Capital Fund Attorney (remote) — employment type not specified in indexed snippet",
    urgencyScore: 55,
    source: "Web search (Glassdoor — aVenture Venture Capital Fund Attorney, Remote, July 2026)",
    sourceUrl: "https://www.glassdoor.com/job-listing/venture-capital-fund-attorney-aventure-JV_KO0,29_KE30,38.htm?jl=1008239968893",
    notes: "Grade B (combined 65). Strongest fund-fit lead this run: a VC/private-markets platform hiring dedicated fund legal support. Engagement model is the open question — verify in-house vs contract/fractional and comp. If contract/fractional, pitch VC fund formation + LP/GP docs + venture financings. Confirm live before applying.",
    contacts: [
      { name: "aVenture — Recruiting", title: "Talent / Legal Hiring", email: "", linkedin: "https://www.linkedin.com/company/aventure-vc" }
    ]
  },
  {
    name: "Latitude Legal — Commercial Contracts Attorney (Remote Contract Engagement)",
    website: "https://latitudelegal.com/jobs/5073",
    pipeline: "legal-freelance",
    industry: "Flexible legal talent / ALSP placing experienced attorneys into contract engagements; end client is a corporate/commercial-contracts function",
    location: "Remote (US)",
    fundingStage: "n/a",
    fitScore: 30,
    intentScore: 40,
    vertical: "legal",
    subvertical: "contracts",
    engagementModel: "contract",
    buyerType: "ALSP",
    compensationText: "Market hourly contract rate (not published in snippet)",
    remoteFlag: "remote",
    employmentTypeRaw: "Remote contract engagement (flexible/hourly) via Latitude Legal",
    urgencyScore: 62,
    source: "Web search (Latitude Legal jobs — Commercial Contracts Attorney, Remote Contract Engagement, job 5073, July 2026)",
    sourceUrl: "https://latitudelegal.com/jobs/5073",
    notes: "Grade B (combined 70). Latitude is a recurring channel already in CRM, but this Commercial Contracts Attorney engagement is DISTINCT from prior Latitude fund/franchise roles; dedups by exact company+role name so it creates a separate row. Apply via Latitude board (job 5073); lead with commercial-contracts drafting/negotiation. Verify still live before applying.",
    contacts: [
      { name: "Latitude Legal — Attorney Placement", title: "Legal Talent / Recruiting", email: "", linkedin: "https://www.linkedin.com/company/latitude-legal" }
    ]
  },
  {
    name: "NextGrad — Fractional General Counsel (Remote, via Go Fractional)",
    website: "https://www.gofractional.com/job/nextgrad-fractional-general-counsel-7766",
    pipeline: "legal-freelance",
    industry: "Growth-stage company (edtech/careers) hiring outsourced legal leadership via a fractional-talent marketplace",
    location: "Remote",
    fundingStage: "Growth-stage / startup",
    fitScore: 20,
    intentScore: 40,
    vertical: "legal",
    subvertical: "GC",
    engagementModel: "fractional",
    buyerType: "operating-company",
    compensationText: "Not published in snippet (paid fractional engagement)",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional General Counsel engagement (via Go Fractional marketplace)",
    urgencyScore: 60,
    source: "Web search (Go Fractional — NextGrad Fractional General Counsel, remote, July 2026)",
    sourceUrl: "https://www.gofractional.com/job/nextgrad-fractional-general-counsel-7766",
    notes: "Grade B (combined 60). Textbook fractional-GC engagement: growth-stage operating company outsourcing legal leadership (contracts + governance + risk). Fit capped by no fund angle; engagement model + remote flex ideal. Apply via Go Fractional; add platform to recurring watchlist. Verify live before applying.",
    contacts: [
      { name: "Go Fractional — Marketplace", title: "Fractional Talent Platform", email: "", linkedin: "https://www.linkedin.com/company/gofractional" }
    ]
  },
  {
    name: "Fractionus — Fractional General Counsel, EdTech & K-12 Contracts (Remote)",
    website: "https://www.jobleads.com/us/job/remote-fractional-general-counsel-edtech-k-12-contracts--new-york--effbaf6798ea3808bdf1e461350959a31",
    pipeline: "legal-freelance",
    industry: "EdTech / K-12 SaaS; fractional GC engagement sourced via a fractional-talent firm (Fractionus)",
    location: "Remote (US); listing tagged New York",
    fundingStage: "Growth-stage / startup",
    fitScore: 20,
    intentScore: 40,
    vertical: "legal",
    subvertical: "GC",
    engagementModel: "fractional",
    buyerType: "operating-company",
    compensationText: "Not published in snippet (paid fractional engagement)",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional General Counsel engagement (remote), EdTech/K-12",
    urgencyScore: 58,
    source: "Web search (JobLeads — Remote Fractional General Counsel, EdTech & K-12 Contracts, July 2026)",
    sourceUrl: "https://www.jobleads.com/us/job/remote-fractional-general-counsel-edtech-k-12-contracts--new-york--effbaf6798ea3808bdf1e461350959a31",
    notes: "Grade B (combined 60). Second clean fractional-GC engagement, EdTech/K-12 (commercial contracts + student-data privacy). Fit capped by no fund angle. Lead with EdTech contracts + data-privacy experience. Verify live status and confirm the actual end-client employer before applying (JobLeads reposts can be stale).",
    contacts: [
      { name: "Fractionus — Recruiting", title: "Fractional Legal Talent", email: "", linkedin: "" }
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
        scrapeDate: new Date("2026-07-17")
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
