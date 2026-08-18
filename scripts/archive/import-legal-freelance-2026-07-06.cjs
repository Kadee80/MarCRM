/**
 * Import script: Legal Freelance Scrape 2026-07-06
 * Run: node scripts/import-legal-freelance-2026-07-06.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres
 * Deduplicates by company name (skips existing companies).
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "aVenture — Venture Capital Fund Attorney (Remote)",
    website: "https://aventure.vc",
    pipeline: "legal-freelance",
    industry: "Fintech / VC investment platform (retail access to venture funds)",
    location: "Remote (worldwide; ~4 hrs/day overlap with US Pacific required)",
    fundingStage: "Venture-backed fintech platform; direct posting via Gusto",
    fitScore: 50,
    intentScore: 40,
    vertical: "legal",
    subvertical: "fund",
    engagementModel: "part-time",
    buyerType: "fund",
    compensationText: "$80K-$120K equivalent; fixed rate per month or hourly rate; full-time or part-time",
    remoteFlag: "remote",
    employmentTypeRaw: "Full-time or part-time; fixed monthly or hourly contract",
    urgencyScore: 55,
    source: "Gusto / Glassdoor (web search)",
    sourceUrl: "https://jobs.gusto.com/postings/aventure-investment-company-venture-capital-fund-attorney-6ade1aa1-d8c3-4622-b95d-f856899b023a",
    notes: "STRONGEST FIT this run (Grade A, 90). Fintech platform building VC fund products wants fractional/hourly counsel to own fund registration, service-provider contracts, registration statements, operating agreements. Part-time/hourly = Katie's model. Comp band lower ($80-120K equiv) — pitch a defined-scope monthly retainer. CAVEAT: posting reads evergreen; confirm live + urgency before tailored pitch.",
    contacts: [
      { name: null, title: "Hiring team", email: null, linkedin: null }
    ]
  },
  {
    name: "Larson Maddox — Funds / Investment Management Attorney (Fully Remote)",
    website: "https://www.larsonmaddox.com",
    pipeline: "legal-freelance",
    industry: "Legal & regulatory staffing / recruiting (placing into tier-1 investment firm)",
    location: "Remote (US)",
    fundingStage: "Staffing placement — end client is a tier-1 investment/asset-management firm",
    fitScore: 40,
    intentScore: 20,
    vertical: "legal",
    subvertical: "fund",
    engagementModel: "contract",
    buyerType: "staffing",
    compensationText: "Not published",
    remoteFlag: "remote",
    employmentTypeRaw: "Recruiter placement (permanent or contract; not specified)",
    urgencyScore: 40,
    source: "Larson Maddox (web search)",
    sourceUrl: "https://www.larsonmaddox.com/en-us/job/fundsinvestment-management-attorney-fully-remote-pr591520_1778104040",
    notes: "RELATIONSHIP/CHANNEL lead (Grade B, 60). Legal-staffing recruiter that repeatedly posts remote funds/investment-management + securities counsel roles. Build a standing relationship so Katie is on their interim/contract bench. This specific role may be permanent — confirm engagement model. PITCH: intro Katie for interim/fractional funds engagements; ask to join contract-counsel roster.",
    contacts: [
      { name: null, title: "Legal recruiter", email: null, linkedin: "https://www.linkedin.com/company/larson-maddox" }
    ]
  },
  {
    name: "Karra Law — Emerging Company / Venture Capital Attorney (Remote, Contract)",
    website: "https://www.careers-page.com/karralaw",
    pipeline: "legal-freelance",
    industry: "Boutique NYC corporate/tech law firm (startups & high-growth companies)",
    location: "Remote (US; NY-based firm)",
    fundingStage: "Boutique law firm — direct contract engagement",
    fitScore: 20,
    intentScore: 40,
    vertical: "legal",
    subvertical: "financing",
    engagementModel: "contract",
    buyerType: "law-firm",
    compensationText: "Not published",
    remoteFlag: "remote",
    employmentTypeRaw: "Contract (of-counsel / overflow attorney)",
    urgencyScore: 45,
    source: "Justia Legal Jobs / Karra Law careers (web search)",
    sourceUrl: "https://jobs.justia.jobs/job/0eb3193cafb86aee601b969333408a9f",
    notes: "Grade B (60). Law-firm overflow/of-counsel contract work on early-stage financings (SAFEs, notes, seed/Series A) — issuer/venture side, not fund-formation, so solid-but-imperfect ICP fit. Good recurring-work potential. Karra runs several rolling remote-contract postings; one intake likely covers all. PITCH: senior contract counsel for emerging-company financing overflow; emphasize SAFE/note/Series A speed.",
    contacts: [
      { name: null, title: "Hiring / Recruiting", email: null, linkedin: null }
    ]
  },
  {
    name: "Major, Lindsey & Africa — Interim Senior Counsel, Technology Transactions (100% Remote)",
    website: "https://www.mlaglobal.com",
    pipeline: "legal-freelance",
    industry: "Interim legal talent staffing (deal-based overflow for corporate legal depts & law firms)",
    location: "Remote (National, US; role nominally Peachtree Corners, GA)",
    fundingStage: "Interim staffing placement (3+ month assignment)",
    fitScore: 20,
    intentScore: 40,
    vertical: "legal",
    subvertical: "contracts",
    engagementModel: "interim",
    buyerType: "staffing",
    compensationText: "Not published (interim/assignment day-rate typical)",
    remoteFlag: "remote",
    employmentTypeRaw: "Interim / contract assignment, 3+ months",
    urgencyScore: 60,
    source: "Major, Lindsey & Africa careers (web search)",
    sourceUrl: "https://careers.mlaglobal.com/us/en/job/221927/Interim-Senior-Counsel-Technology-Transactions-100-Remote-National",
    notes: "Grade B (60). MLA Interim Legal Talent = premier bench for Katie's model. This brief is tech-transactions/commercial-contracts (adjacent to core funds/corporate). Highest value = getting onto MLA's interim roster. PITCH: apply to this brief AND ask to join MLA's interim funds/corporate bench; lead with commercial-contracts + governance breadth.",
    contacts: [
      { name: null, title: "Interim Legal Talent recruiter", email: null, linkedin: null }
    ]
  },
  {
    name: "The Mom Project (for Etsy) — Interim Securities Counsel (Remote, EST)",
    website: "https://themomproject.com",
    pipeline: "legal-freelance",
    industry: "Public-company (Etsy) securities/corporate counsel, sourced via flexible-talent marketplace",
    location: "Remote (US, EST hours; occasional Brooklyn, NY travel)",
    fundingStage: "Public company (Etsy) — contract engagement via marketplace",
    fitScore: 20,
    intentScore: 35,
    vertical: "legal",
    subvertical: "securities",
    engagementModel: "contract",
    buyerType: "operating-company",
    compensationText: "Not published",
    remoteFlag: "remote",
    employmentTypeRaw: "Contract / interim (marketplace placement)",
    urgencyScore: 40,
    source: "The Mom Project (web search)",
    sourceUrl: "https://themomproject.com/projects/interim-securities-counsel-remote-est-f85959128b",
    notes: "Grade C (55, at threshold). Etsy interim securities counsel via The Mom Project — SEC filings (10-K/10-Q/8-K, proxy, S-8, Section 16), NASDAQ/SEC compliance. Public-company disclosure work, not fund/PE core. Value = marketplace relationship (also 'Corporate & Securities Attorney' and 'Contracts Counsel' live). PITCH: pursue only if Katie wants public-company securities reps; else register for future corporate/fund-adjacent briefs.",
    contacts: [
      { name: null, title: "The Mom Project talent team", email: null, linkedin: null }
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
        scrapeDate: new Date("2026-07-06")
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
