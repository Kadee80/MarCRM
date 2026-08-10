/**
 * Import script: Daily Scrape 2026-07-31
 * Run: node scripts/import-2026-07-31.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const SCRAPE_DATE = new Date("2026-07-31");

// NOTE: Natural (daily 7/21), Indigo Technologies (legal-freelance 5/27), and
// NextGrad (legal-freelance 7/17) resurfaced today but were dropped as duplicates
// of prior reports. They remain active — see the markdown report's dedup section.
const leads = [
  {
    name: "Alpaca",
    website: "https://alpaca.markets/",
    pipeline: "pr-marketing",
    industry: "Fintech / brokerage infrastructure — API-first prime brokerage and agent-first brokerage platform.",
    location: "United States (San Mateo, CA)",
    fundingStage: "$135M raise (2026) to accelerate agent-first brokerage / API-first prime brokerage. Later-stage (founded 2015).",
    fitScore: 42,
    intentScore: 26,
    vertical: "",
    subvertical: "",
    engagementModel: "",
    buyerType: "",
    compensationText: "",
    remoteFlag: "",
    employmentTypeRaw: "",
    urgencyScore: 0,
    source: "WebSearch — FintechFutures 'Top five fintech funding rounds of July 2026'",
    sourceUrl: "https://www.fintechfutures.com/venture-capital-funding/july-2026-top-five-fintech-funding-rounds-of-the-month",
    notes: "Grade C (68). Excellent sector/B2B fit + repositioning trigger, but 10-yr-old, well-capitalized firm likely runs in-house comms + retained agency. ACTION: low priority; overflow/product-launch project or fractional narrative support only.",
    contacts: [
      { name: null, title: "CEO / Head of Marketing", email: null, linkedin: null }
    ]
  },
  {
    name: "Fractional General Counsel — LA Hybrid ($150-200/hr, unnamed, via Go Fractional)",
    website: "",
    pipeline: "legal-freelance",
    industry: "Scaling company hiring a fractional GC, 10-30 hrs/week, corporate/commercial remit.",
    location: "Los Angeles, CA (Hybrid)",
    fundingStage: "Private (unnamed in listing)",
    fitScore: 28,
    intentScore: 30,
    vertical: "legal",
    subvertical: "GC",
    engagementModel: "fractional",
    buyerType: "operating-company",
    compensationText: "$150-200/hr, 10-30 hrs/week",
    remoteFlag: "hybrid",
    employmentTypeRaw: "Fractional General Counsel (hourly, part-time)",
    urgencyScore: 55,
    source: "WebSearch — Go Fractional Los Angeles job board",
    sourceUrl: "https://www.gofractional.com/jobs/los-angeles",
    notes: "Grade C (58). Credible economics ($150-200/hr) + fractional model; weaker on named-employer clarity + recency (posted Jul 25, outside 72h). LA hybrid may need occasional onsite. ACTION: qualify employer + remote flexibility first.",
    contacts: [
      { name: null, title: "Hiring manager (via Go Fractional)", email: null, linkedin: null }
    ]
  },
  {
    name: "Culture of Thank You — Fractional Marketing & Communications Partner",
    website: "",
    pipeline: "pr-freelance",
    industry: "Mission-driven organization hiring a fractional digital marketing & communications partner (5-8 hrs/week).",
    location: "Remote (USA, Canada, or LATAM)",
    fundingStage: "Private / mission-driven org",
    fitScore: 24,
    intentScore: 40,
    vertical: "pr",
    subvertical: "comms",
    engagementModel: "fractional",
    buyerType: "operating-company",
    compensationText: "Fractional, 5-8 hrs/week (rate not listed)",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional digital marketing & communications partner (part-time)",
    urgencyScore: 52,
    source: "WebSearch — Fractional Jobs (fractionaljobs.io)",
    sourceUrl: "https://www.fractionaljobs.io/",
    notes: "Grade C (64). Clean fractional/remote comms engagement, but outside core FS/PE/B2B sector + only 5-8 hrs/wk. ACTION: low-effort direct pitch; filler, not a priority.",
    contacts: [
      { name: null, title: "Founder / Program lead (hiring)", email: null, linkedin: null }
    ]
  },
  {
    name: "Tau Ventures (Fund III)",
    website: "https://www.tauventures.com/",
    pipeline: "fund-formation",
    industry: "Emerging VC manager — seed-stage applied AI (digital health, enterprise, physical AI). Announced Fund III (4th vehicle since 2019).",
    location: "United States (Silicon Valley)",
    fundingStage: "Fund III — actively raising / announced 2026.",
    fitScore: 36,
    intentScore: 28,
    vertical: "",
    subvertical: "",
    engagementModel: "",
    buyerType: "",
    compensationText: "",
    remoteFlag: "",
    employmentTypeRaw: "",
    urgencyScore: 0,
    source: "WebSearch — VC Lab 'Emerging Venture Capital Funds to Invest In (2026)'",
    sourceUrl: "https://govclab.com/2026/07/23/emerging-venture-capital-funds-to-invest-in",
    notes: "Grade C (64). Actively raising a new vehicle, but a manager on its 4th fund since 2019 likely has established fund counsel — weak fit for emerging Fund-I/II ICP. ACTION: low priority; warm intro or fund-maintenance/side-letter overflow only.",
    contacts: [
      { name: null, title: "Managing Partner (Tau Ventures)", email: null, linkedin: null }
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
        scrapeDate: SCRAPE_DATE
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
