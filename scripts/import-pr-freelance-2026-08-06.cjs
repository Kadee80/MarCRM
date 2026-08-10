/**
 * Import script: PR Freelance Scrape 2026-08-06
 * Run: node scripts/import-pr-freelance-2026-08-06.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "Hexa — Head of Brand & Communication (Freelance / Fixed-Term Contract)",
    website: "https://www.welcometothejungle.com/en/companies/hexa/jobs/head-of-brand-and-communication-freelance-of-fixed-term-contract_paris",
    pipeline: "pr-freelance",
    industry: "Hexa (the eFounders startup studio) is hiring a freelance / fixed-term Head of Brand & Communication to act as lead PR person for portfolio startup announcements — seed fundraisings, product launches and milestone news — across fintech and other B2B/tech verticals. Engagement is ~2 months full-time from end of August 2026, followed by at least 4 months part-time.",
    location: "Paris (verify remote eligibility) — startup studio operates internationally",
    fundingStage: "Startup studio / venture builder (fintech-heavy portfolio)",
    fitScore: 50,
    intentScore: 45,
    vertical: "pr",
    subvertical: "thought-leadership",
    engagementModel: "freelance",
    buyerType: "startup",
    compensationText: "Not stated (freelance/FTC; ~2 months full-time then 4+ months part-time)",
    remoteFlag: "onsite",
    employmentTypeRaw: "Freelance or fixed-term contract — ~2 mo FT (from end Aug 2026) then 4+ mo part-time",
    urgencyScore: 85,
    source: "Web search — Welcome to the Jungle (Hexa), Aug 2026",
    sourceUrl: "https://www.welcometothejungle.com/en/companies/hexa/jobs/head-of-brand-and-communication-freelance-of-fixed-term-contract_paris",
    notes: "Grade A (combined 95) — hottest lead of the run and the only fresh, defined, near-term freelance PR mandate found. Textbook ICP: fintech/startup announcements, launch + fundraising narrative, freelance/FTC engagement, imminent start. KEY CAVEAT: role is Paris-based — confirm remote/US eligibility before Mark invests time. Detail could not be fully rendered (client-side page); verify FT/PT split and location on the live listing. ACTION: check remote eligibility first, then apply with a fintech launch + fundraise-announcement case study.",
    contacts: [
      { name: null, title: "Apply via Welcome to the Jungle (Hexa / eFounders)", email: null, linkedin: "https://www.linkedin.com/company/hexa-hq" }
    ]
  },
  {
    name: "Sapio Consulting — Financial PR & Special Situations Contract / Interim Talent Desk",
    website: "https://sapioconsulting.com",
    pipeline: "pr-freelance",
    industry: "Boutique executive-search and recruitment firm specialising in Financial PR, Investor Relations, M&A and special-situations communications. Places senior interim and contract communications talent into financial institutions, fintechs, asset managers and corporate-comms-heavy businesses — a direct-fit channel for Mark's finance-sector earned-media and IR-narrative experience.",
    location: "Remote / Hybrid (UK & US desks)",
    fundingStage: "Recruitment boutique (staffing / talent desk)",
    fitScore: 50,
    intentScore: 25,
    vertical: "pr",
    subvertical: "investor-pr",
    engagementModel: "contract",
    buyerType: "staffing",
    compensationText: "Not stated (interim/contract day or retainer rate set per brief)",
    remoteFlag: "hybrid",
    employmentTypeRaw: "Interim / contract financial PR & IR placements via recruiter",
    urgencyScore: 45,
    source: "Web search — Sapio Consulting Financial PR recruitment page, Aug 2026",
    sourceUrl: "https://sapioconsulting.com/recruitment/pr-communications/financial-pr/",
    notes: "Grade B (combined 75) — strongest sector fit of the run (finance/IR is Mark's sweet spot). Channel play: register as available interim/contract senior financial-comms talent so Sapio surfaces Mark against live buyer briefs. Companion to already-captured Hanson Search (7/23) and 3Search/VMA desks. ACTION: send availability + finance-sector earned-media & IR-narrative case studies.",
    contacts: [
      { name: null, title: "Register with the Financial PR / IR recruitment desk", email: null, linkedin: "https://www.linkedin.com/company/sapio-consulting" }
    ]
  },
  {
    name: "KM Strategies Group — Senior Consultant (Independent Contractor, Retainer)",
    website: "https://www.idealist.org/en/consultant-job/fd2ee51c088740bb9c5cc6d5168e6f27-senior-consultant-independent-contractor-remote-km-strategies-llc-new-york",
    pipeline: "pr-freelance",
    industry: "Communications-focused consulting firm (NYC, 477 Madison Ave) engaging senior independent contractors on monthly retainers to deliver editorial strategy, media relations, digital strategy and content across civic, human-rights, philanthropy and social-impact client engagements.",
    location: "Remote (US); NYC-associated",
    fundingStage: "Consulting firm (retainer contractor model)",
    fitScore: 30,
    intentScore: 30,
    vertical: "pr",
    subvertical: "content-strategy",
    engagementModel: "contract",
    buyerType: "agency",
    compensationText: "USD $4,850 / month retainer, ~140 hours/month, outcome-based (4-month engagement, extendable)",
    remoteFlag: "remote",
    employmentTypeRaw: "Independent contractor / freelance — monthly retainer",
    urgencyScore: 25,
    source: "Web search — Idealist (KM Strategies Group Senior Consultant), Aug 2026",
    sourceUrl: "https://www.idealist.org/en/consultant-job/fd2ee51c088740bb9c5cc6d5168e6f27-senior-consultant-independent-contractor-remote-km-strategies-llc-new-york",
    notes: "Grade B by score (combined 60) but RECENCY CAVEAT: the specific posting is stale (posted 2026-01-28; Mar-Jun 2026 engagement has ended). Included as a firm-to-register-with, not a live req — KMSG runs a clean IC retainer model ($4,850/mo, 140 hrs, outcome-based) that fits Mark's freelance economics. Sector (civic/social-impact) is off finance core. ACTION: proactively reach out for future senior-consultant retainers rather than applying to the closed listing.",
    contacts: [
      { name: null, title: "Register with KMSG for future senior-consultant retainers (via Idealist)", email: null, linkedin: "https://www.linkedin.com/company/km-strategies-group" }
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
        scrapeDate: new Date("2026-08-06")
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
