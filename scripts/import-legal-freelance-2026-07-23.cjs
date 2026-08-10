/**
 * Import script: Legal Freelance Scrape 2026-07-23
 * Run: node scripts/import-legal-freelance-2026-07-23.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 * All leads: pipeline = "legal-freelance".
 *
 * NOTE: 4 leads this run.
 *  - Robert Half Legal (Grade A, 80): fresh commercial-contracts contract engagement, $85.50–$99/hr, remote/hybrid.
 *  - Allocate (Grade B, 65): only true fund-formation lead; posted full-time, pitch as fractional/contract fund counsel.
 *  - Hayden Industrial LLC (Grade B, 60): textbook fractional GC, industrial contracts, remote.
 *  - Epiq Counsel (Grade B, 60): ALSP roster play (Tenor acquisition 7/9/2026); recurring engagement flow.
 * Dedup: skipped repeats of Fractionus/NextGrad/Go Fractional/aVenture (7/17), MLA/Axiom/Latitude (7/22),
 * WQA/Bowery (7/21), Tower/Broughton (7/16), Paragon/PsychPlus/Battlement (7/15). Excluded a Fractional Jobs
 * stealth-startup comp-&-benefits role as off-ICP.
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "Robert Half Legal — Commercial Contracts Attorney (Consumer Products, Remote/Hybrid)",
    website: "https://www.roberthalf.com",
    pipeline: "legal-freelance",
    industry: "Legal staffing and consulting firm placing contract, project, and interim attorneys with corporate legal departments and law firms nationwide",
    location: "Remote / hybrid (US); placed with a consumer-products company client",
    fundingStage: "Established legal staffing firm (contract placement into an operating-company client)",
    fitScore: 30,
    intentScore: 50,
    vertical: "legal",
    subvertical: "contracts",
    engagementModel: "contract",
    buyerType: "staffing",
    compensationText: "$85.50–$99.00 per hour",
    remoteFlag: "hybrid",
    employmentTypeRaw: "Contract / contract-to-hire, commercial contracts attorney, consumer-products client, remote/hybrid US",
    urgencyScore: 85,
    source: "Robert Half Legal — remote attorney listings (Commercial Contracts Attorney, consumer products)",
    sourceUrl: "https://www.roberthalf.com/us/en/jobs/all/remote-attorney",
    notes: "Grade A (combined 80) — top lead this run. Fresh commercial-contracts contract engagement with a consumer-products client via Robert Half at $85.50–$99/hr, remote/hybrid, start 7/13/2026. Near-perfect intent: contract model + remote + recent + direct recruiter path. Fit capped at 30 (no fund angle). Backup: a 3-month Van Nuys RH commercial-contracts assignment at $65–$80/hr (start 7/6), same channel. ACTION: contact the RH legal recruiter, pitch commercial-contracts + corporate-governance depth and immediate remote availability, and ask to join their contract-attorney bench for recurring flow.",
    contacts: [
      { name: "Robert Half Legal — Attorney Recruiting", title: "Legal talent recruiter (contract placements)", email: "", linkedin: "https://www.linkedin.com/company/robert-half-international" }
    ]
  },
  {
    name: "Allocate — Fund Formation Attorney (Remote, US)",
    website: "https://www.allocate.co",
    pipeline: "legal-freelance",
    industry: "Private-markets investment and fund-operations technology platform serving wealth advisors, family offices, and fund managers; runs fund formation/administration for venture and private funds",
    location: "Remote (US)",
    fundingStage: "Venture-backed private-markets platform (fund formation/admin function)",
    fitScore: 40,
    intentScore: 25,
    vertical: "legal",
    subvertical: "fund",
    engagementModel: "fractional",
    buyerType: "operating-company",
    compensationText: "",
    remoteFlag: "remote",
    employmentTypeRaw: "Full-time remote in-house Fund Formation Attorney (Senior variant also open); pitch target = fractional/contract fund counsel",
    urgencyScore: 50,
    source: "Allocate — Fund Formation Attorney (Remote in U.S.), via Ladders / LinkedIn",
    sourceUrl: "https://www.theladders.com/job/fund-formation-attorney-remote-in-u-s-allocate-virtual-travel_83653051",
    notes: "Grade B (combined 65) — the only true fund-formation lead in the window and the strongest ICP practice-area match. Allocate runs fund formation/admin for venture and private funds, so the work is squarely fund + corporate + securities. Intent capped at 25 because it's posted as a full-time in-house hire (no explicit fractional/contract signal) — but a fund-ops platform with fluctuating deal volume is a prime target to pitch fractional or overflow fund counsel. Senior variant also open. ACTION: apply and, in parallel, reach the hiring manager to offer fractional/project fund-formation support (LPAs, side letters, sub docs) as an alternative to a full-time hire.",
    contacts: [
      { name: "Allocate — Legal / Talent", title: "Recruiting (fund formation counsel)", email: "", linkedin: "https://www.linkedin.com/company/allocate-co" }
    ]
  },
  {
    name: "Hayden Industrial LLC — Fractional General Counsel (Remote)",
    website: "",
    pipeline: "legal-freelance",
    industry: "Industrial / engineered-equipment supplier delivering equipment and project-delivery contracts to industrial and infrastructure clients",
    location: "Remote",
    fundingStage: "Established operating company (no full-time in-house legal bench)",
    fitScore: 20,
    intentScore: 40,
    vertical: "legal",
    subvertical: "contracts",
    engagementModel: "fractional",
    buyerType: "operating-company",
    compensationText: "",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional General Counsel, remote, industrial/engineered-equipment company",
    urgencyScore: 55,
    source: "Association of Corporate Counsel (ACC) Jobline — Fractional General Counsel (Remote)",
    sourceUrl: "https://jobline.acc.com/job/fractional-general-counsel-remote--54004",
    notes: "Grade B (combined 60). Textbook fractional-GC ICP: an operating company with enough contract complexity (engineered-equipment supply, project delivery) to need judgment but not a full-time bench. Engagement model and remote flag both ideal; fit capped at 20 (commercial contracts + GC seniority, no fund angle). ACTION: apply via ACC Jobline positioning fractional-GC / outside-counsel experience on vendor/customer and project-delivery contracts, governance, and risk; propose a scoped weekly retainer.",
    contacts: [
      { name: "Hayden Industrial LLC — Hiring", title: "Fractional GC hiring contact", email: "", linkedin: "" }
    ]
  },
  {
    name: "Epiq Counsel — Commercial Contracts / Flexible Legal Talent (Remote)",
    website: "https://www.epiqglobal.com",
    pipeline: "legal-freelance",
    industry: "Flexible legal talent business (ALSP) placing contract and consulting attorneys into corporate legal departments; roster of 1,000+ legal professionals after the July 2026 Tenor Legal acquisition",
    location: "Remote (US; onsite/hybrid options by engagement)",
    fundingStage: "Established ALSP / flexible legal talent provider",
    fitScore: 20,
    intentScore: 40,
    vertical: "legal",
    subvertical: "contracts",
    engagementModel: "consultant",
    buyerType: "ALSP",
    compensationText: "Engagement-dependent; W-2 flexible-talent role with PTO, holidays, health, 401k",
    remoteFlag: "remote",
    employmentTypeRaw: "Flexible legal talent / consulting engagement (W-2), commercial contracts, remote-capable",
    urgencyScore: 55,
    source: "Epiq Counsel careers — flexible legal talent (Commercial Contracts)",
    sourceUrl: "https://www.epiqglobal.com/en-us/services/business-of-law-services/epiq-counsel/epiq-counsel-careers",
    notes: "Grade B (combined 60). A roster/marketplace play rather than a single role: Epiq Counsel matches flexible-talent attorneys to corporate engagements across practice areas including commercial contracts, remote or hybrid. Just acquired Tenor Legal (7/9/2026), so demand for contract counsel is expanding. Fit capped at 20 (commercial contracts + counsel seniority, no fund angle), but the value is recurring engagement flow. ACTION: register with Epiq Counsel's flexible-talent team for commercial-contracts + corporate/governance work; pair with the Latitude and Axiom rosters already in the CRM to build a diversified ALSP pipeline.",
    contacts: [
      { name: "Epiq Counsel — Flexible Legal Talent Recruiting", title: "Talent recruiter (contract/consulting attorneys)", email: "", linkedin: "https://www.linkedin.com/company/epiq" }
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
        scrapeDate: new Date("2026-07-23")
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
