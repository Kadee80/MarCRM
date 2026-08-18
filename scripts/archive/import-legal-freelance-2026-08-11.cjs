/**
 * Import script: Legal Freelance Scrape 2026-08-11
 * Run: node scripts/import-legal-freelance-2026-08-11.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Uses Prisma Client. Deduplicates by company name (skips existing companies).
 * All leads: pipeline = "legal-freelance".
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const SCRAPE_DATE = new Date("2026-08-11");

const leads = [
  {
    name: "Ropes & Gray (Asset Management Group) — Funds Attorney (Remote, Hourly Flex)",
    website: "https://www.ropesgrayrecruiting.com/en/life-at-ropes-and-gray/positions/funds-attorney-asset-management-group-remote",
    pipeline: "legal-freelance",
    industry: "AmLaw-elite firm's Asset Management Group runs a standing bench of 20+ funds attorneys (5-20 yrs) working 100% remotely, hourly billable, no benefits — a flexible/contract model inside a top private-funds practice. Work: specialized fund investment transactions for institutional investor clients (LP-side fund investments, PE/asset-management transactional work).",
    location: "Remote (US; bar admission in a Ropes office state, physical presence not required)",
    fundingStage: "Established AmLaw-elite firm (flexible funds-attorney program)",
    fitScore: 40,
    intentScore: 40,
    vertical: "legal",
    subvertical: "fund",
    engagementModel: "contract",
    buyerType: "law-firm",
    compensationText: "Hourly, compensated for billable work; no benefits provided (dollar rate not disclosed in posting)",
    remoteFlag: "remote",
    employmentTypeRaw: "Funds attorney — 100% remote, hourly billable, no benefits (flexible / non-partner-track contract engagement)",
    urgencyScore: 60,
    source: "Web search — Ropes & Gray Recruiting funds-attorney flex posting, Aug 2026",
    sourceUrl: "https://www.ropesgrayrecruiting.com/en/life-at-ropes-and-gray/positions/funds-attorney-asset-management-group-remote",
    notes: "Grade A (combined 80) — strongest, most on-ICP lead of the run. Recurring-need buyer (standing flexible funds bench). ACTION: apply via recruiting page, lead with LP/GP fund formation + maintenance + side letters; ask about flexible funds-attorney program intake. Highest priority.",
    contacts: [
      { name: null, title: "Ropes & Gray Recruiting — Asset Management Group (experienced lawyers/flex)", email: null, linkedin: "https://www.linkedin.com/company/ropes-&-gray-llp" }
    ]
  },
  {
    name: "Redox — Interim Head of Legal (Fractional, Remote, via Go Fractional)",
    website: "https://www.gofractional.com/jobs",
    pipeline: "legal-freelance",
    industry: "Growth-stage healthcare data-interoperability SaaS company. Interim/fractional Head of Legal engagement covering commercial contracting, corporate governance, and legal risk for an operating company without a deep in-house bench. Listed on Go Fractional at $129-140/hr, 30-40 hrs/wk, remote (continental US).",
    location: "Remote (must reside & work in continental US)",
    fundingStage: "Growth-stage health-tech SaaS (operating company)",
    fitScore: 30,
    intentScore: 40,
    vertical: "legal",
    subvertical: "GC",
    engagementModel: "interim",
    buyerType: "operating-company",
    compensationText: "$129-$140/hr, 30-40 hrs/week",
    remoteFlag: "remote",
    employmentTypeRaw: "Interim Head of Legal — fractional, 30-40 hrs/wk, remote (continental US)",
    urgencyScore: 70,
    source: "Web search — Go Fractional jobs board (Redox interim Head of Legal), posted 2026-08-07",
    sourceUrl: "https://www.gofractional.com/jobs",
    notes: "Grade B (combined 70). Live, comp-stated, easy-apply interim engagement — highest actionability of the run. Corporate/commercial fit (adjacency, not funds). ACTION: apply directly on Go Fractional; verify listing still live. Second priority.",
    contacts: [
      { name: null, title: "Apply via Go Fractional marketplace listing", email: null, linkedin: "https://www.linkedin.com/company/redox-inc-" }
    ]
  },
  {
    name: "Legal People Group — Interim Counsel+ / Fractional Legal Talent Bench (ALSP)",
    website: "https://legalpeoplegroup.com/interim-counsel/",
    pipeline: "legal-freelance",
    industry: "Flexible legal-staffing / ALSP placing experienced attorneys as secondees or interim contract counsel via an on-demand 'Interim Counsel+' program. Seeks attorneys with significant in-house/law-firm experience in corporate legal environments; lets clients scale legal departments on demand. Bench-membership / placement channel rather than a single posting.",
    location: "Remote-capable / flexible (on-demand secondee & interim model)",
    fundingStage: "Established flexible-legal-staffing firm / ALSP",
    fitScore: 20,
    intentScore: 40,
    vertical: "legal",
    subvertical: "corporate",
    engagementModel: "interim",
    buyerType: "ALSP",
    compensationText: "N/A — talent-bench/placement channel (rate set per engagement)",
    remoteFlag: "hybrid",
    employmentTypeRaw: "Interim Counsel+ program — on-demand secondee / interim contract counsel bench",
    urgencyScore: 45,
    source: "Web search — Legal People Group Interim Counsel+ program page, Aug 2026",
    sourceUrl: "https://legalpeoplegroup.com/interim-counsel/",
    notes: "Grade B (combined 60), lower confidence — channel/bench target with inferred (recurring) intent, not a specific observed opening. Value is leverage/repeat placements. ACTION: low-cost outreach to join the Interim Counsel+ bench; position fund/corporate/commercial depth. Nurture. Third priority.",
    contacts: [
      { name: null, title: "Interim Counsel+ intake (via firm site)", email: null, linkedin: "https://www.linkedin.com/company/legal-people-group" }
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
