/**
 * Import script: Legal Freelance Scrape 2026-07-22
 * Run: node scripts/import-legal-freelance-2026-07-22.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 * All leads: pipeline = "legal-freelance".
 *
 * NOTE: 3 leads this run, all from legal staffing / ALSP channels (MLA, Axiom, Latitude).
 * Fractional-board candidates were excluded: Battlement Systems and PsychPlus were already
 * captured on 7/15; Kindness for Capital, LWD Advisors, and a Stealth Startup comp-&-benefits
 * role were all stale/closed (added 2024–2025) and/or off-ICP.
 * Latitude Legal already exists in the CRM from 7/17 (a Commercial Contracts role); this is a
 * DIFFERENT posting (securities & governance) with a distinct company-name string, so the guard
 * below will insert it as its own row. Merge manually if you prefer one Latitude record.
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "Major, Lindsey & Africa — Interim Fund Formation Attorney (Miami)",
    website: "https://www.mlaglobal.com",
    pipeline: "legal-freelance",
    industry: "Legal recruiting and interim legal talent firm (Allegis Group); places interim, contract, and permanent legal talent with law firms, corporations, and investment funds",
    location: "Miami, FL (interim engagement; remote/hybrid not confirmed in posting)",
    fundingStage: "Established legal talent firm (interim placement into a fund/law-firm client)",
    fitScore: 50,
    intentScore: 25,
    vertical: "legal",
    subvertical: "fund",
    engagementModel: "interim",
    buyerType: "staffing",
    compensationText: "$100–$115 per hour (interim)",
    remoteFlag: "",
    employmentTypeRaw: "Interim / contract attorney placement, Miami, FL",
    urgencyScore: 70,
    source: "Major, Lindsey & Africa via ZipRecruiter (Interim Fund Formation Attorney, Miami FL)",
    sourceUrl: "https://www.ziprecruiter.com/c/Major-Lindsey-&-Africa/Job/Interim-Fund-Formation-Attorney/-in-Miami,FL?jid=e8159d3b819aaba5",
    notes: "Grade B (combined 75) — headline lead and the only true fund-formation opportunity in the 7-day window. MLA (interim arm of Allegis) placing an interim fund formation attorney with a fund/PE client, $100–115/hr. Near-exact ICP match: fund formation + interim + a placement firm with continuous interim fund/corporate flow. Intent capped at 25 because the role is Miami-based (remote not confirmed) and recency unverified on the aggregator. ACTION: contact the MLA interim recruiter, lead with fund-formation + corporate-governance depth and interim availability, confirm remote flexibility, and ask to join their interim fund/corporate bench for future remote mandates.",
    contacts: [
      { name: "Major, Lindsey & Africa — Interim Legal Talent Team", title: "Recruiter (interim placements)", email: "", linkedin: "https://www.linkedin.com/company/major-lindsey-&-africa" }
    ]
  },
  {
    name: "Axiom — Securities & Prime Brokerage Counsel (On-Demand, US)",
    website: "https://www.axiomlaw.com",
    pipeline: "legal-freelance",
    industry: "Alternative legal services provider (ALSP); 25+ years, 1,500+ legal departments, on-demand legal talent via secondments, projects, and specialized advice across 12 practice areas",
    location: "US — New York (Axiom engagements are typically remote-capable / flexible)",
    fundingStage: "Established global ALSP",
    fitScore: 30,
    intentScore: 35,
    vertical: "legal",
    subvertical: "securities",
    engagementModel: "consultant",
    buyerType: "ALSP",
    compensationText: "Est. total comp $104,500–$325,000/yr for Axiom attorney roles (engagement-dependent)",
    remoteFlag: "hybrid",
    employmentTypeRaw: "On-demand / secondment attorney, Financial Services team, US-NY",
    urgencyScore: 55,
    source: "Axiom Law careers — Securities & Prime Brokerage Counsel (available positions 8036201002)",
    sourceUrl: "https://www.axiomlaw.com/careers/lawyers/available-positions/8036201002",
    notes: "Grade B (combined 65). Securities & prime brokerage counsel in Axiom's Financial Services on-demand bench (margin lending, Reg T/U, FINRA 4210). Corporate-securities fit + flexible ALSP engagement model + funds-adjacent client base (asset managers/financial institutions). LIMIT: scope is prime brokerage/margin regulation, a niche — confirm it matches Katie's securities depth (corporate/capital-markets vs. trading/margin). Existing (not fresh) vacancy. ACTION: apply into Axiom's on-demand network positioning corporate + commercial contracts + funds-adjacent experience; be candid on margin/prime-brokerage depth.",
    contacts: [
      { name: "Axiom — Legal Talent / Financial Services", title: "Talent recruiting (on-demand attorneys)", email: "", linkedin: "https://www.linkedin.com/company/axiom_law" }
    ]
  },
  {
    name: "Latitude Legal — Corporate Attorney, Securities & Corporate Governance (Remote Contract)",
    website: "https://latitudelegal.com",
    pipeline: "legal-freelance",
    industry: "Flexible legal talent firm (ALSP) placing former in-house and Big Law attorneys into contract engagements with corporations and law firms nationwide; Chambers NewLaw-ranked",
    location: "Remote (anywhere in the US)",
    fundingStage: "Established ALSP / flexible legal talent firm",
    fitScore: 20,
    intentScore: 40,
    vertical: "legal",
    subvertical: "securities",
    engagementModel: "contract",
    buyerType: "ALSP",
    compensationText: "",
    remoteFlag: "remote",
    employmentTypeRaw: "Remote contract engagement, corporate securities & governance, US",
    urgencyScore: 60,
    source: "Latitude Legal open opportunities (job 5077)",
    sourceUrl: "https://latitudelegal.com/jobs/5077",
    notes: "Grade B (combined 60). Fully remote contract engagement for a corporate securities & corporate governance attorney via Latitude (ALSP). Clean corporate/securities/governance fit with strong intent (remote-from-anywhere + contract model); no fund angle caps fit at 20. DEDUP: Latitude already in CRM from 7/17 (Commercial Contracts role) — this is a distinct posting/name, inserts as its own row; merge manually if consolidating. ACTION: register on Latitude's flexible-talent roster for corporate/securities/governance + commercial contracts so multiple remote engagements flow, rather than a single cold application.",
    contacts: [
      { name: "Latitude Legal — Placement Team", title: "Recruiter (flexible/contract engagements)", email: "", linkedin: "https://www.linkedin.com/company/latitude-legal" }
    ]
  }
];

async function main() {
  let created = 0;
  let skipped = 0;

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
        scrapeDate: new Date("2026-07-22")
      }
    });

    console.log(`CREATED: ${lead.name} (fit ${lead.fitScore} / intent ${lead.intentScore})`);
    created++;
  }

  console.log(`\nDone. Created ${created}, skipped ${skipped}, total ${leads.length}.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
