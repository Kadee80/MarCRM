/**
 * Import script: Legal Freelance Scrape 2026-08-13
 * Run: node scripts/import-legal-freelance-2026-08-13.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "Go Fractional — Interim Senior Legal Counsel (Remote, $129–140/hr, 30–40 hrs/wk)",
    website: "https://www.gofractional.com/jobs/legal",
    pipeline: "legal-freelance",
    industry: "Live interim engagement posted via Go Fractional's legal talent marketplace (posted Aug 7, 2026). Senior in-house-style legal counsel supporting a growth-stage company; remote, must reside/work in continental U.S.; 30–40 hrs/wk at $129–140/hr. Direct interim assignment, not a full-time hire.",
    location: "Remote (continental U.S.)",
    fundingStage: "Growth-stage (engagement via Go Fractional marketplace)",
    fitScore: 30,
    intentScore: 40,
    vertical: "legal",
    subvertical: "corporate",
    engagementModel: "interim",
    buyerType: "operating-company",
    compensationText: "$129–140/hr, 30–40 hrs/week",
    remoteFlag: "remote",
    employmentTypeRaw: "Interim / contract (hourly, via Go Fractional marketplace)",
    urgencyScore: 80,
    source: "Go Fractional legal jobs board, Aug 2026",
    sourceUrl: "https://www.gofractional.com/job/welcometothejungle-senior-legal-counsel-trustpilot-welcome-to-the-jungle-login",
    notes: "Grade B (combined 70), highest urgency of the run. Freshest comp-stated interim posting this cycle. ACTION: apply directly through Go Fractional; position Katie as high-judgment senior corporate counsel available immediately at the stated hourly band.",
    contacts: [
      { name: null, title: "Apply via Go Fractional marketplace", email: null, linkedin: "https://www.linkedin.com/company/gofractional" }
    ]
  },
  {
    name: "Socket — Fractional General Counsel (Remote, Web3/Crypto)",
    website: "https://socket.tech",
    pipeline: "legal-freelance",
    industry: "Socket is a Web3 interoperability/infrastructure company. Hiring a remote Fractional General Counsel to lead legal and regulatory strategy across product launches, tokenomics, partnerships and global compliance; drafts/reviews/negotiates key contracts. Requires JD + bar admission, 5+ yrs (law firm + in-house mix), blockchain/crypto/fintech regulatory expertise. Est. comp $101k–$159k.",
    location: "Remote (U.S.)",
    fundingStage: "VC-backed Web3 infrastructure startup",
    fitScore: 30,
    intentScore: 40,
    vertical: "legal",
    subvertical: "securities",
    engagementModel: "fractional",
    buyerType: "operating-company",
    compensationText: "$101k–$159k (estimated)",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional / part-time General Counsel",
    urgencyScore: 65,
    source: "Built In (mirrored on web3.career), Aug 2026",
    sourceUrl: "https://builtin.com/job/fractional-general-counsel/4025369",
    notes: "Grade B (combined 70). Strong for Katie if she can speak to crypto/tokenomics/securities-adjacent regulatory work; otherwise position around commercial-contract + governance execution. ACTION: apply via Built In; lead with securities/regulatory + contract judgment. Alt URL: https://web3.career/part-time-general-counsel-socket/95180",
    contacts: [
      { name: null, title: "Apply via Built In / web3.career", email: null, linkedin: "https://www.linkedin.com/company/socketdottech" }
    ]
  },
  {
    name: "Interlink Cloud Advisors — Fractional General Counsel (Remote)",
    website: "https://www.interlink.com",
    pipeline: "legal-freelance",
    industry: "Interlink Cloud Advisors is a Cincinnati-based Microsoft cloud systems integrator (Inc. Regionals 2026 Midwest). Hiring a remote Fractional General Counsel reporting to the CEO to build scalable legal infrastructure: legal strategy & risk, contract management (MSAs, PSAs, NDAs, vendor/subcontractor agreements), regulatory & compliance oversight incl. SOC 2, and cross-functional support. 3+ yrs experience.",
    location: "Remote (U.S.; telecommute)",
    fundingStage: "Established midmarket MSP (Inc. Regionals 2026)",
    fitScore: 25,
    intentScore: 40,
    vertical: "legal",
    subvertical: "GC",
    engagementModel: "fractional",
    buyerType: "operating-company",
    compensationText: "N/A — not stated in posting",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional General Counsel (telecommute)",
    urgencyScore: 60,
    source: "GoInhouse.com, Aug 2026",
    sourceUrl: "https://www.goinhouse.com/jobs/438711760-fractional-general-counsel-at-interlink-cloud-advisors",
    notes: "Grade B (combined 65). Clean commercial-contracts + governance fit for an operating company standing up its first legal function. ACTION: apply via GoInhouse; pitch as the operator who builds the contract/compliance backbone part-time.",
    contacts: [
      { name: null, title: "Apply via GoInhouse", email: null, linkedin: "https://www.linkedin.com/company/interlinkcloudadvisors" }
    ]
  },
  {
    name: "Fractional General Counsel — EdTech / K-12 Contracts (Remote, New York)",
    website: "https://www.jobleads.com",
    pipeline: "legal-freelance",
    industry: "Remote Fractional General Counsel role (New York-based employer) centered on EdTech and K-12 commercial contracts: reviewing, drafting and negotiating customer/vendor paper, plus corporate governance support for a growth-stage education-technology company. Indexed via JobLeads.",
    location: "Remote (New York employer)",
    fundingStage: "Growth-stage EdTech company",
    fitScore: 25,
    intentScore: 40,
    vertical: "legal",
    subvertical: "contracts",
    engagementModel: "fractional",
    buyerType: "operating-company",
    compensationText: "N/A — not stated in index",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional General Counsel",
    urgencyScore: 55,
    source: "JobLeads (indexed), Aug 2026",
    sourceUrl: "https://www.jobleads.com/us/job/remote-fractional-general-counsel-edtech-k-12-contracts--new-york--effbaf6798ea3808bdf1e461350959a31",
    notes: "Grade C/B (combined 65). Contracts-heavy fractional role; verify freshness and comp on the live listing before investing outreach time. ACTION: apply via JobLeads; lead with commercial-contracts + governance execution for a scaling EdTech.",
    contacts: [
      { name: null, title: "Apply via JobLeads listing", email: null, linkedin: null }
    ]
  },
  {
    name: "Major, Lindsey & Africa (Interim Legal Talent) — Interim Corporate Counsel Bench (Remote)",
    website: "https://www.mlaglobal.com/en/services/interim-legal-talent",
    pipeline: "legal-freelance",
    industry: "Major, Lindsey & Africa's Interim Legal Talent group places temporary/project-based counsel (corporate, funds, compliance) into in-house teams, frequently 100% remote and 3+ month engagements. Firm reports resilient hiring across alternative asset management — legal/compliance talent supporting fundraising and regulatory demands. Registering with the bench is the entry point, not a single req.",
    location: "Remote (national placements)",
    fundingStage: "Global legal recruiting / interim staffing firm (est. 1982)",
    fitScore: 25,
    intentScore: 35,
    vertical: "legal",
    subvertical: "corporate",
    engagementModel: "interim",
    buyerType: "staffing",
    compensationText: "Varies by placement (interim hourly/day-rate)",
    remoteFlag: "remote",
    employmentTypeRaw: "Interim legal talent (agency/ALSP placement)",
    urgencyScore: 60,
    source: "Major, Lindsey & Africa — In-House Counsel Recruiting / Interim Legal Talent, Aug 2026",
    sourceUrl: "https://www.mlaglobal.com/en/services/in-house-counsel-recruiting",
    notes: "Grade B (combined 60). Relationship/bench target, not a single posting — highest leverage over time. ACTION: register Katie with the Interim Legal Talent group, flag corporate + fund/alt-asset availability and remote preference; recurring interim placements (incl. fund/compliance) flow through this bench.",
    contacts: [
      { name: null, title: "Interim Legal Talent group (register via mlaglobal.com)", email: null, linkedin: "https://www.linkedin.com/company/major-lindsey-&-africa" }
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
        scrapeDate: new Date("2026-08-13")
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
