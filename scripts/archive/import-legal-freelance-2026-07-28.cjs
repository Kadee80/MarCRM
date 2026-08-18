/**
 * Import script: Legal Freelance Scrape 2026-07-28
 * Run: node scripts/import-legal-freelance-2026-07-28.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 * All leads: pipeline = "legal-freelance".
 *
 * NOTE: 5 leads this run, all Grade B (combined 60–70). Fresh named single reqs were thin this week;
 * the fund-specific postings that surfaced (Allocate, aVenture, Broughton, Bowery) were all already
 * captured in prior scrapes. This week's new ICP-fit opportunities are all flexible-talent /
 * marketplace / outsourced-GC benches actively taking counsel intake:
 *  - Peerpoint (A&O Shearman) (70): best fund/corporate match; interim assignments; confirm US availability.
 *  - Lawtrades (60): US legal marketplace, freelance/contract, VC-backed clients.
 *  - Elevate/ElevateFlex (60): global ALSP, financial-services clients, commercial contracts.
 *  - Continuum Legal (60): fractional-GC firm bench, growth companies.
 *  - Uncommon Counsel (60): NYC outsourced-GC firm, commercial + M&A + governance.
 * Dedup: skipped repeats of Allocate/aVenture/Axiom/Latitude/Paragon/Epiq/Priori/Robert Half/MLA/
 * Outside GC/Fractionus-NextGrad/Go Fractional/Tower/Broughton/Bowery/Legal.io (captured 7/14–7/24).
 * Excluded: Safeguard Global "M&A Legal Counsel (Contract)" — verified REMOVED May 2025 (dead posting);
 * generic fractional-GC marketing pages without open intake (Acquisition Stars, AMBART, Faison, Krowne,
 * Next Era); Toptal hedge-fund consultants (finance, not legal).
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "Lawtrades — Corporate & Commercial Counsel Talent Network (Remote, Project/Fractional)",
    website: "https://www.lawtrades.com",
    pipeline: "legal-freelance",
    industry: "Tech-enabled legal talent marketplace placing vetted freelance, contract, and fractional attorneys (generalists to specialists) into legal departments from startups to Fortune 500; product counsel, commercial contracts, corporate/GC",
    location: "Remote (US); part-time, full-time, or project-based",
    fundingStage: "Established venture-backed legal marketplace / ALSP",
    fitScore: 20,
    intentScore: 40,
    vertical: "legal",
    subvertical: "contracts",
    engagementModel: "freelance",
    buyerType: "ALSP",
    compensationText: "Engagement-dependent market rate (not published per-role)",
    remoteFlag: "remote",
    employmentTypeRaw: "Freelance / contract / project-based attorney via legal talent marketplace, remote US, scalable hours",
    urgencyScore: 55,
    source: "Lawtrades — talent marketplace (indexed web search, July 2026)",
    sourceUrl: "https://www.lawtrades.com/",
    notes: "Grade B (combined 60). US marketplace channel for Katie's ALSP roster alongside Axiom/Latitude/Epiq/Priori. Recurring commercial-contracts / corporate-counsel engagement flow with VC-backed clients. Fit capped at 20 (no dedicated fund practice). ACTION: register with the talent network; position commercial-contracts + corporate governance + fractional-GC availability; flag fund/securities experience for VC-backed matches.",
    contacts: [
      { name: "Lawtrades — Talent Network", title: "Attorney onboarding / talent intake", email: "", linkedin: "https://www.linkedin.com/company/lawtrades" }
    ]
  },
  {
    name: "Peerpoint (A&O Shearman) — Flexible Corporate & Funds Counsel (Interim/Contract Assignments)",
    website: "https://www.peerpoint.com",
    pipeline: "legal-freelance",
    industry: "Flexible legal talent platform backed by A&O Shearman; places senior consultant lawyers into short-term to ~6-month assignments across corporate, funds, and commercial mandates globally",
    location: "Remote / hybrid (global network; US and cross-border assignments)",
    fundingStage: "Established Big-Law-backed flexible-lawyer platform",
    fitScore: 30,
    intentScore: 40,
    vertical: "legal",
    subvertical: "fund",
    engagementModel: "interim",
    buyerType: "ALSP",
    compensationText: "Fractional/interim day rates (published market band ~$900-$2,000+/day equivalent; assignment-dependent)",
    remoteFlag: "hybrid",
    employmentTypeRaw: "Consultant lawyer, interim/contract assignments (short-term to 6 months), corporate & funds, remote/hybrid",
    urgencyScore: 55,
    source: "Peerpoint (A&O Shearman) — flexible lawyer platform (indexed web search, July 2026)",
    sourceUrl: "https://www.peerpoint.com/",
    notes: "Grade B (combined 70) — highest this run and best fund-adjacent match; Peerpoint draws corporate & private-funds mandates from the A&O Shearman client base. CAVEAT: UK/global-weighted — confirm US assignment availability. ACTION: apply to the consultant network; lead with private-funds/fund-formation + corporate-counsel experience and interim/fractional availability; ask about US and cross-border funds mandates.",
    contacts: [
      { name: "Peerpoint — Consultant Network", title: "Legal talent / consultant intake", email: "", linkedin: "https://www.linkedin.com/company/peerpoint" }
    ]
  },
  {
    name: "Elevate (ElevateFlex) — Flexible Corporate & Commercial Contracts Counsel (Remote)",
    website: "https://elevate.law",
    pipeline: "legal-freelance",
    industry: "Global alternative legal services provider (ALSP); ElevateFlex places vetted legal talent into full- or part-time, onsite or remote engagements — corporate, commercial contracts, legal-ops support",
    location: "Remote (US and global; onsite/hybrid options by engagement)",
    fundingStage: "Established global ALSP",
    fitScore: 20,
    intentScore: 40,
    vertical: "legal",
    subvertical: "contracts",
    engagementModel: "contract",
    buyerType: "ALSP",
    compensationText: "Engagement-dependent market rate (not published per-role)",
    remoteFlag: "remote",
    employmentTypeRaw: "Flexible legal talent (ElevateFlex), full- or part-time contract, corporate & commercial contracts, remote/onsite options",
    urgencyScore: 52,
    source: "Elevate — ElevateFlex flexible legal resourcing (indexed web search, July 2026)",
    sourceUrl: "https://elevate.law/elevateflex/",
    notes: "Grade B (combined 60). Global ALSP bench to diversify the flexible-talent pipeline; financial-services client base can surface fund-adjacent corporate/commercial work. Fit capped at 20 (no dedicated fund line). ACTION: register with ElevateFlex for commercial-contracts + corporate engagements; note fund/securities background for financial-services matches.",
    contacts: [
      { name: "Elevate / ElevateFlex — Talent Team", title: "Flexible legal talent recruiter", email: "", linkedin: "https://www.linkedin.com/company/elevate-services" }
    ]
  },
  {
    name: "Continuum Legal — Fractional GC / Outside Counsel for Growing Companies (Remote)",
    website: "https://continuum.legal",
    pipeline: "legal-freelance",
    industry: "Fractional legal-support firm providing part-time GC and outside-counsel services to growing companies — commercial contracts, corporate, governance, day-to-day coverage",
    location: "Remote (US)",
    fundingStage: "Established fractional-GC / outsourced legal firm (bench expansion)",
    fitScore: 20,
    intentScore: 40,
    vertical: "legal",
    subvertical: "GC",
    engagementModel: "fractional",
    buyerType: "law-firm",
    compensationText: "Fractional retainer model (not published per-role)",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional / part-time general counsel & outside counsel, remote, growth-stage company clients",
    urgencyScore: 50,
    source: "Continuum Legal — fractional legal support (indexed web search, July 2026)",
    sourceUrl: "https://continuum.legal/",
    notes: "Grade B (combined 60). Textbook fractional-GC ICP: firm placing part-time GCs into growing companies with contract/governance complexity but no full-time bench. Fully remote. Fit capped at 20 (no fund line). ACTION: contact the firm to join the fractional-counsel bench; position fractional-GC / outside-counsel experience on commercial contracts, governance, corporate matters.",
    contacts: [
      { name: "Continuum Legal — Hiring / Bench", title: "Fractional counsel intake", email: "", linkedin: "https://www.linkedin.com/company/continuum-legal" }
    ]
  },
  {
    name: "Uncommon Counsel — NYC Outsourced GC for Startups & Growing Companies (Remote/Hybrid)",
    website: "https://uncommoncounsel.com",
    pipeline: "legal-freelance",
    industry: "Outsourced / fractional GC firm serving startups and growing companies — commercial contracting, corporate & regulatory governance, legal-risk management, M&A support on a flexible retainer basis",
    location: "New York City (remote/hybrid; NY-based clients)",
    fundingStage: "Established outsourced-GC firm (bench expansion)",
    fitScore: 20,
    intentScore: 40,
    vertical: "legal",
    subvertical: "GC",
    engagementModel: "fractional",
    buyerType: "law-firm",
    compensationText: "Fractional retainer model (not published per-role)",
    remoteFlag: "hybrid",
    employmentTypeRaw: "Fractional / outsourced general counsel, remote/hybrid NYC, startup & growth-company clients",
    urgencyScore: 55,
    source: "Uncommon Counsel — NYC outsourced general counsel (indexed web search, July 2026)",
    sourceUrl: "https://uncommoncounsel.com/new-york-outsourced-general-counsel/",
    notes: "Grade B (combined 60). NYC outsourced-GC firm covering commercial contracting, governance, and M&A for startups/growth companies; some clients venture-backed (fund-adjacent corporate work). Fit capped at 20 (no dedicated fund line). ACTION: contact the firm about joining the outsourced-GC bench; lead with commercial-contracting + M&A + governance depth and fractional availability; flag fund/securities background for VC-backed matches.",
    contacts: [
      { name: "Uncommon Counsel — Hiring", title: "Outsourced-GC bench intake", email: "", linkedin: "https://www.linkedin.com/company/uncommon-counsel" }
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
        scrapeDate: new Date("2026-07-28")
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
