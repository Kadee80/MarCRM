/**
 * Import script: Daily Scrape 2026-07-14
 * Run:      node scripts/import-2026-07-14.cjs
 * Preview:  node scripts/import-2026-07-14.cjs --dry-run
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const DRY_RUN = process.argv.includes('--dry-run');
const SCRAPE_DATE = new Date('2026-07-14');

const leads = [
  {
    name: "EDX Markets",
    website: "https://edxmarkets.com/",
    pipeline: "pr-marketing",
    industry: "Institutional digital-asset trading venue + central clearinghouse (WealthTech / market infrastructure)",
    location: "New York, US",
    fundingStage: "Series C ($76M, led by SBI Holdings; announced Jul 7-8, 2026)",
    fitScore: 44,
    intentScore: 34,
    vertical: "",
    subvertical: "",
    engagementModel: "",
    buyerType: "",
    compensationText: "",
    remoteFlag: "",
    employmentTypeRaw: "",
    urgencyScore: 0,
    source: "fintech.global weekly funding roundup (Jul 10) + PR Newswire / CoinDesk",
    sourceUrl: "https://fintech.global/2026/07/10/slow-week-for-fintech-with-just-350m-raised-across-10-deals/",
    notes: "Grade B (78). Strong FS/market-infrastructure fit, US-based, tier-1 backers, active expansion + EDX Trust national-trust-bank narrative. Caveat: established, well-capitalized incumbent with disciplined comms (PR Newswire) — pitch a specialist digital-asset/FS angle or overflow, not a first-hire play. ACTION: identify comms/marketing lead; pitch a positioning sprint tied to the Series C + EDX Trust story.",
    contacts: [
      { name: "Tony Acuña-Rohter", title: "CEO, EDX Markets", email: "", linkedin: "" }
    ]
  },
  {
    name: "QIZ Security",
    website: "https://qizsecurity.com/",
    pipeline: "pr-marketing",
    industry: "Cybersecurity — cryptographic posture & Post-Quantum Cryptography (PQC) management (serving FS, telecom, healthcare, critical infra)",
    location: "New York, US",
    fundingStage: "Seed ($17M, led by Bessemer Venture Partners + Merlin Ventures; announced week of Jul 7, 2026)",
    fitScore: 42,
    intentScore: 35,
    vertical: "",
    subvertical: "",
    engagementModel: "",
    buyerType: "",
    compensationText: "",
    remoteFlag: "",
    employmentTypeRaw: "",
    urgencyScore: 0,
    source: "fintech.global weekly funding roundup (Jul 10)",
    sourceUrl: "https://fintech.global/2026/07/10/slow-week-for-fintech-with-just-350m-raised-across-10-deals/",
    notes: "Grade B (77). Best fresh net-new lead. Timely PQC/quantum-threat narrative, credible ex-Deloitte co-founder (Dr. Itan Barmes), marquee partner logos, US (NYC), seed-stage so brand/earned-media being built now — ideal window for a positioning + earned-media sprint. ACTION: pitch a PQC thought-leadership program (bylines, podcast circuit, tier-1 tech/FS press) anchored on Barmes; find marketing contact.",
    contacts: [
      { name: "Ben Volkow", title: "Co-founder & CEO", email: "", linkedin: "" },
      { name: "Dr. Itan Barmes", title: "Co-founder (ex-Deloitte Global Quantum Cyber Readiness lead)", email: "", linkedin: "" }
    ]
  },
  {
    name: "Super.com",
    website: "https://www.super.com/",
    pipeline: "pr-marketing",
    industry: "Consumer savings super app / PayTech (Super+ membership)",
    location: "US (consumer focus; NASCAR official savings partner)",
    fundingStage: "Series D ($65M, led by TPG; $1.2B valuation; announced week of Jul 7, 2026)",
    fitScore: 31,
    intentScore: 29,
    vertical: "",
    subvertical: "",
    engagementModel: "",
    buyerType: "",
    compensationText: "",
    remoteFlag: "",
    employmentTypeRaw: "",
    urgencyScore: 0,
    source: "fintech.global weekly funding roundup (Jul 10)",
    sourceUrl: "https://fintech.global/2026/07/10/slow-week-for-fintech-with-just-350m-raised-across-10-deals/",
    notes: "Grade C (60), lowest priority. Fresh unicorn milestone is a real trigger, but B2C consumer-app brand — out of the tight B2B FS/Tech ICP and a different PR discipline. Large, TPG-backed, likely already covered. Watch item; deprioritize unless a B2B/partnerships angle emerges.",
    contacts: []
  },
  {
    name: "ACC Jobline #54004 — Fractional General Counsel (Remote)",
    website: "https://jobline.acc.com/job/fractional-general-counsel-remote--54004",
    pipeline: "legal-freelance",
    industry: "In-house legal (fractional GC engagement; employer withheld on posting)",
    location: "Remote (US)",
    fundingStage: "n/a",
    fitScore: 20,
    intentScore: 40,
    vertical: "legal",
    subvertical: "GC",
    engagementModel: "fractional",
    buyerType: "operating-company",
    compensationText: "",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional General Counsel (Remote) — posting via ACC Jobline",
    urgencyScore: 65,
    source: "ACC Jobline (Association of Corporate Counsel)",
    sourceUrl: "https://jobline.acc.com/job/fractional-general-counsel-remote--54004",
    notes: "Grade C (60). Clean engagement-model/remote fit (fractional GC, fully remote) but thin detail — employer, practice area and comp withheld, so fit scored conservatively. ACTION: open posting to confirm sector/apply path; route to dedicated legal-freelance scrape for enrichment. Verify not a dup of prior ACC Jobline fractional-GC listings (#53153; Jul 9 industrial-manufacturing GC).",
    contacts: []
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

    if (DRY_RUN) {
      console.log(`WOULD CREATE: ${lead.name} [${lead.pipeline}] fit=${lead.fitScore} intent=${lead.intentScore}`);
      created++;
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
        scrapeDate: SCRAPE_DATE
      }
    });

    console.log(`CREATED: ${lead.name}`);
    created++;
  }
  console.log(`\nDone${DRY_RUN ? ' (dry run)' : ''}. ${DRY_RUN ? 'Would create' : 'Created'} ${created}, skipped ${skipped}.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
