/**
 * Import script: Daily Scrape 2026-07-28
 * Run: node scripts/import-2026-07-28.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const SCRAPE_DATE = new Date("2026-07-28");

const leads = [
  {
    name: "Enigma",
    website: "https://www.enigma.co/",
    pipeline: "pr-marketing",
    industry: "Physical AI / robotics — robot-agnostic AI models + interfaces to make any robot intelligent and easy to control. Launched robots.online public interactive experience. Early partners in entertainment, retail, health.",
    location: "Tel Aviv, Israel & California, US",
    fundingStage: "Seed — $71M led by Index Ventures and Ribbit Capital (Conviction Partners + angels from OpenAI/Anthropic/DeepMind/xAI/Cognition/Wiz). Emerged from stealth Jul 27, 2026.",
    fitScore: 39,
    intentScore: 42,
    vertical: "",
    subvertical: "",
    engagementModel: "",
    buyerType: "",
    compensationText: "",
    remoteFlag: "",
    employmentTypeRaw: "",
    urgencyScore: 0,
    source: "WebSearch — Enigma stealth-emergence coverage (TechCrunch, Calcalist/Ctech, Unite.AI, The AI Insider, Yahoo Finance)",
    sourceUrl: "https://techcrunch.com/2026/07/27/enigma-raises-70m-to-make-controlling-a-robot-as-easy-as-adjusting-the-volume/",
    notes: "Grade A (81). Freshest lead — 24h old, peak launch window. Story-rich (interactive robots online, star-studded angels). Down on industry (robotics vs FS) + B2B motion maturity. CAVEAT: elite backers may mean a large retained firm; realistic angle is fractional/overflow or US-market narrative. ACTION: move fast — pitch a US earned-media + thought-leadership sprint on 'physical AI last mile'.",
    contacts: [
      { name: "Jonathan Jacobi", title: "Co-Founder", email: null, linkedin: null },
      { name: "Gal Niv", title: "Co-Founder", email: null, linkedin: null }
    ]
  },
  {
    name: "Prime Intellect",
    website: "https://www.primeintellect.ai/",
    pipeline: "pr-marketing",
    industry: "AI infrastructure — compute + tooling that lets enterprises build and run their own AI agents.",
    location: "San Francisco, CA, US",
    fundingStage: "Series A — $130M at a $1B valuation, announced Jul 8, 2026.",
    fitScore: 41,
    intentScore: 34,
    vertical: "",
    subvertical: "",
    engagementModel: "",
    buyerType: "",
    compensationText: "",
    remoteFlag: "",
    employmentTypeRaw: "",
    urgencyScore: 0,
    source: "WebSearch — Prime Intellect Series A coverage (TechCrunch)",
    sourceUrl: "https://techcrunch.com/2026/07/08/prime-intellect-raises-130m-series-a-to-help-enterprises-build-their-own-ai-agents/",
    notes: "Grade B (75). Strong B2B AI-infra fit, unicorn budget. Down on recency (~3 wks post-raise) + size (may have in-house comms / retained firm). ACTION: pitch thought-leadership/analyst relations; qualify comms staffing.",
    contacts: [
      { name: null, title: "CEO / Co-Founder", email: null, linkedin: null }
    ]
  },
  {
    name: "Silent Ventures (Fund II)",
    website: "",
    pipeline: "fund-formation",
    industry: "Emerging VC manager — pre-seed to Series A fund targeting aerospace, defense, national-security companies. Raising Fund II (Silent Ventures Fund II, LP).",
    location: "United States",
    fundingStage: "Fund II — new Form D filing (late Jun / early Jul 2026), first public raise signal.",
    fitScore: 40,
    intentScore: 36,
    vertical: "",
    subvertical: "",
    engagementModel: "",
    buyerType: "",
    compensationText: "",
    remoteFlag: "",
    employmentTypeRaw: "",
    urgencyScore: 0,
    source: "WebSearch — Dakota 'Top 10 New Form D Filings (June 29 - July 3)'",
    sourceUrl: "https://www.dakota.com/resources/blog/top-10-new-form-d-filings-june-29-july-3",
    notes: "Grade B (76). Emerging manager actively raising Fund II — classic fund-formation buyer. CAVEAT: Form D usually means counsel already engaged for THIS close; opportunity is more likely fund maintenance / next-vehicle / side-letter overflow. ACTION: verify current counsel; pitch fund-maintenance + LP-docs. Confirm exact entity/manager website.",
    contacts: [
      { name: null, title: "Managing Partner / GP (Silent Ventures)", email: null, linkedin: null }
    ]
  },
  {
    name: "Fractional General Counsel — Founding-Caliber Part-Time Exec (unnamed startup, via Indeed/ZipRecruiter)",
    website: "",
    pipeline: "legal-freelance",
    industry: "Early-stage startup hiring a part-time/1099 fractional GC to own commercial contracting, corporate & regulatory governance, legal risk management, and strategic legal support for growth.",
    location: "Remote, US",
    fundingStage: "Early-stage startup (unnamed in listing)",
    fitScore: 25,
    intentScore: 45,
    vertical: "legal",
    subvertical: "GC",
    engagementModel: "fractional",
    buyerType: "startup",
    compensationText: "1099 independent contractor, equity-plus-success-fee basis; no guaranteed base salary or fixed monthly retainer",
    remoteFlag: "remote",
    employmentTypeRaw: "Part-time executive, 1099 independent contractor, equity + success fee (no base/retainer)",
    urgencyScore: 70,
    source: "WebSearch — Indeed 'legal startup remote' + ZipRecruiter 'Fractional Legal Counsel' (Jul 25, 2026)",
    sourceUrl: "https://www.indeed.com/q-legal-startup-l-remote-jobs.html",
    notes: "Grade B (70). Textbook fractional/remote/1099 (high intent), but low fit: no fund/practice specialization AND comp is equity + success fee with NO base/retainer — below Mark's paid-judgment bar. FLAG: low-quality economics; qualify hard. ACTION: confirm employer + whether a cash retainer is negotiable; deprioritize vs. paid fund/corporate contract work.",
    contacts: [
      { name: null, title: "Founder / CEO (hiring)", email: null, linkedin: null }
    ]
  },
  {
    name: "Proterra Credit Partners LP",
    website: "",
    pipeline: "fund-formation",
    industry: "Private credit fund (managed by Proterra Investment Partners) providing debt financing to middle-market companies across the North American food & beverage value chain.",
    location: "United States",
    fundingStage: "New Form D filing (late Jun / early Jul 2026).",
    fitScore: 30,
    intentScore: 20,
    vertical: "",
    subvertical: "",
    engagementModel: "",
    buyerType: "",
    compensationText: "",
    remoteFlag: "",
    employmentTypeRaw: "",
    urgencyScore: 0,
    source: "WebSearch — Dakota 'Top 10 New Form D Filings (June 29 - July 3)'",
    sourceUrl: "https://www.dakota.com/resources/blog/top-10-new-form-d-filings-june-29-july-3",
    notes: "Grade C (50). Managed by an established firm (Proterra Investment Partners) — almost certainly has fund counsel; weak fit for the emerging-manager ICP. ACTION: low priority; pursue only on a warm referral.",
    contacts: [
      { name: null, title: "Fund Counsel / CFO (Proterra Investment Partners)", email: null, linkedin: null }
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
