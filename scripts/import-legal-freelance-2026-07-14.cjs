/**
 * Import script: Legal Freelance Scrape 2026-07-14
 * Run: node scripts/import-legal-freelance-2026-07-14.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "Axiom — Private Equity / VC & Commercial Contracts Flexible Counsel (Remote)",
    website: "https://www.axiomlaw.com/industries/private-equity",
    pipeline: "legal-freelance",
    industry: "Alternative legal services provider (flexible/on-demand lawyers)",
    location: "Remote / national; project-based and interim engagements",
    fundingStage: "n/a",
    fitScore: 50,
    intentScore: 40,
    vertical: "legal",
    subvertical: "fund",
    engagementModel: "fractional",
    buyerType: "ALSP",
    compensationText: "Market day/hourly rates set per engagement (not published)",
    remoteFlag: "remote",
    employmentTypeRaw: "Flexible / on-demand engagement via Axiom network",
    urgencyScore: 70,
    source: "Web search (Axiom PE practice + commercial contracts opportunities, July 2026)",
    sourceUrl: "https://www.axiomlaw.com/industries/private-equity",
    notes: "Grade A (combined 90). Strongest new lead this run. Axiom places experienced lawyers into PE/VC and portfolio-company work on interim/project terms — exactly Katie's high-judgment corporate/fund positioning. ACTION: apply to the Axiom lawyer network; lead with fund formation + PE/portfolio corporate experience and remote availability. Also review commercial-contracts opportunities feed.",
    contacts: [
      { name: "Axiom Lawyer Network / Talent Intake", title: "Lawyer Onboarding", email: "", linkedin: "https://www.linkedin.com/company/axiom-law/" }
    ]
  },
  {
    name: "Priori Legal — Fractional GC / Fund Formation Talent Network (Remote)",
    website: "https://www.priorilegal.com/our-attorney-network/",
    pipeline: "legal-freelance",
    industry: "Vetted legal talent marketplace (freelance/fractional counsel)",
    location: "Remote / national",
    fundingStage: "n/a",
    fitScore: 40,
    intentScore: 40,
    vertical: "legal",
    subvertical: "GC",
    engagementModel: "fractional",
    buyerType: "ALSP",
    compensationText: "Rate set by attorney; Priori matches to corporate/BigLaw buyers",
    remoteFlag: "remote",
    employmentTypeRaw: "Freelance marketplace membership",
    urgencyScore: 65,
    source: "Web search (Priori talent marketplace / attorney network, July 2026)",
    sourceUrl: "https://www.priorilegal.com/our-attorney-network/",
    notes: "Grade A (combined 80). High-quality channel not previously captured. ACTION: apply to Priori's attorney network; profile emphasizing fund formation, private funds and fractional-GC availability. Complements Axiom (different buyer pool).",
    contacts: [
      { name: "Priori Talent Network", title: "Attorney Network Admissions", email: "", linkedin: "https://www.linkedin.com/company/priori-legal/" }
    ]
  },
  {
    name: "Epiq Counsel — Flexible Legal Talent Bench (Remote, post-Tenor expansion)",
    website: "https://www.epiqglobal.com/en-us/careers/flexible-legal-talent",
    pipeline: "legal-freelance",
    industry: "ALSP / flexible legal talent (corporate law department secondments)",
    location: "Remote / national secondments",
    fundingStage: "n/a",
    fitScore: 30,
    intentScore: 40,
    vertical: "legal",
    subvertical: "corporate",
    engagementModel: "contract",
    buyerType: "ALSP",
    compensationText: "Secondment / contract market rates (not published)",
    remoteFlag: "remote",
    employmentTypeRaw: "Flexible legal talent / secondment (contract)",
    urgencyScore: 75,
    source: "Web search + Law.com/GlobeNewswire (Epiq acquires Tenor Legal, 2026-07-09)",
    sourceUrl: "https://www.epiqglobal.com/en-us/careers/flexible-legal-talent",
    notes: "Grade B (combined 70). Timely: Epiq just expanded its flexible-talent bench via the Tenor Legal acquisition (Jul 9), so intake is warm. Corporate/commercial secondments rather than pure fund work — pitch Katie as corporate/commercial contract counsel with fund-adjacent depth. ACTION: register on the flexible legal talent careers page.",
    contacts: [
      { name: "Epiq Counsel Talent Team", title: "Flexible Legal Talent Recruiting", email: "", linkedin: "https://www.linkedin.com/company/epiq/" }
    ]
  },
  {
    name: "Outside GC (OGC) — Fractional General Counsel Firm, Bench Expansion (Remote)",
    website: "https://outsidegc.com/our-attorneys/",
    pipeline: "legal-freelance",
    industry: "Fractional / outside general counsel law firm (100+ attorneys)",
    location: "Remote / national",
    fundingStage: "n/a",
    fitScore: 30,
    intentScore: 40,
    vertical: "legal",
    subvertical: "GC",
    engagementModel: "fractional",
    buyerType: "law-firm",
    compensationText: "Relationship-based origination + hourly (market-credible)",
    remoteFlag: "remote",
    employmentTypeRaw: "Of-counsel / fractional GC partner model",
    urgencyScore: 65,
    source: "Web search (Outside GC / OGC attorneys + growth news, July 2026)",
    sourceUrl: "https://outsidegc.com/our-attorneys/",
    notes: "Grade B (combined 70). Best fit for an attorney who can bring/develop client relationships. Higher bar (origination-oriented) but strong platform. ACTION: reach out to OGC attorney recruiting; position as fractional corporate/fund counsel. Longer-horizon lead than the marketplaces.",
    contacts: [
      { name: "OGC Attorney Recruiting", title: "Attorney Recruiting / Growth", email: "", linkedin: "https://www.linkedin.com/company/outside-gc-llc" }
    ]
  },
  {
    name: "Roasa Law Group — Part-Time Contract Transactional Attorney (M&A, Remote)",
    website: "https://www.roasalaw.com/",
    pipeline: "legal-freelance",
    industry: "Boutique business-transactions law firm (overflow support)",
    location: "Fully remote (US)",
    fundingStage: "n/a",
    fitScore: 20,
    intentScore: 40,
    vertical: "legal",
    subvertical: "M&A",
    engagementModel: "part-time",
    buyerType: "law-firm",
    compensationText: "Part-time contract; rate not published",
    remoteFlag: "remote",
    employmentTypeRaw: "Part-time contract attorney (1099-style overflow)",
    urgencyScore: 60,
    source: "Web search (Roasa Law Group / Indeed, July 2026)",
    sourceUrl: "https://www.roasalaw.com/",
    notes: "Grade B (combined 60). Smaller/niche (veterinary + small-business clients) but a concrete, easy-apply overflow engagement with a direct contact. ACTION: email attorney@roasalaw.com with a short pitch highlighting purchase-agreement / asset-sale / operating-agreement experience.",
    contacts: [
      { name: "Roasa Law Group — Hiring", title: "Attorney Hiring", email: "attorney@roasalaw.com", linkedin: "" }
    ]
  },
  {
    name: "Legal.io — Corporate Securities Counsel (Contract, 6 Months, Remote)",
    website: "https://www.legal.io/jobs/5417195/Full-time/Corporate-Securities-Counsel-Contract-6-months/Remote",
    pipeline: "legal-freelance",
    industry: "Legal talent platform / contract placement",
    location: "Remote (US)",
    fundingStage: "n/a",
    fitScore: 20,
    intentScore: 40,
    vertical: "legal",
    subvertical: "securities",
    engagementModel: "contract",
    buyerType: "ALSP",
    compensationText: "6-month contract; rate not published",
    remoteFlag: "remote",
    employmentTypeRaw: "Contract (6 months)",
    urgencyScore: 70,
    source: "Web search (Legal.io jobs, July 2026)",
    sourceUrl: "https://www.legal.io/jobs/5417195/Full-time/Corporate-Securities-Counsel-Contract-6-months/Remote",
    notes: "Grade B (combined 60). Concrete defined-term contract with securities/corporate scope. ACTION: apply via Legal.io and register on the platform for future securities/funds contract briefs.",
    contacts: [
      { name: "Legal.io Talent", title: "Contract Placement", email: "", linkedin: "https://www.linkedin.com/company/legal-io/" }
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
        scrapeDate: new Date("2026-07-14")
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
