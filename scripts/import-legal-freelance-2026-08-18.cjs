/**
 * Import script: Legal Freelance Scrape 2026-08-18
 * Run: node scripts/import-legal-freelance-2026-08-18.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from the scrape sandbox)
 * Deduplicates by company name (skips existing companies).
 *
 * NOTE: Tower Legal Solutions has a live private-funds contract req this cycle (see the markdown
 * report) but is intentionally NOT in this array — the company already exists in the CRM from a
 * prior run and would be skipped by the dedup check anyway.
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const SCRAPE_DATE = '2026-08-18';
const PIPELINE = 'legal-freelance';

const leads = [
  {
    name: "Scissero",
    website: "https://www.scissero.com",
    pipeline: PIPELINE,
    industry: "AI-enhanced legal services company and operating platform purpose-built for financial institutions — specifically private equity and capital markets. 152 people across US/EMEA/APAC, founded 2018, NY and London offices. Integrates expert legal talent with a proprietary AI platform to scale drafting, negotiation and management of transactional and fund-related documents for global investment firms, asset managers and corporates. Runs a Legal Managed Services team that places lawyers into client secondments. Announced a Mayer Brown partnership on Aug 11, 2026 for an integrated structured-products issuance solution.",
    location: "Remote (US) — New York, NY",
    fundingStage: "Venture-backed legal-tech / ALSP scale-up (founded 2018, 152 employees)",
    fitScore: 40,
    intentScore: 50,
    fitDetails: {
      practice_area: "+10 — live private equity, M&A and financing transactions; NDAs, engagement letters, ancillary transaction documentation, client playbooks and precedents",
      seniority: "+10 — Principal Legal Lead is Expert/Leader level, owning delivery and supervising Junior/Senior Legal Specialists",
      comp_credible: "+0 — no compensation range published on either listing",
      fund_focus: "+20 — built for PE and capital markets; explicitly scales 'transactional and fund-related documents'; preferred experience is PE, asset management, hedge fund or other alternative asset manager clients"
    },
    intentDetails: {
      engagement_model: "+15 — Legal Managed Services / secondment delivery model; parallel NY req is an explicit ~12-month client secondment to a global alternative asset manager",
      remote_flex: "+15 — Principal Legal Lead listed U.S. Remote (9am-6pm US hours)",
      recency: "+10 — reposted Aug 17, 2026 (within 72h), flagged 'Be an Early Applicant'; Mayer Brown partnership announced Aug 11",
      apply_path: "+10 — direct Teamtailor apply form, no recruiter gate"
    },
    vertical: "legal",
    subvertical: "fund",
    engagementModel: "contract",
    buyerType: "ALSP",
    compensationText: "Not published on either listing. Benefits: discretionary performance bonus, 7 days paid study leave, paid sick leave, annual leave plus public holidays.",
    remoteFlag: "remote",
    employmentTypeRaw: "Full-time (Legal / Legal Managed Services). Parallel NY req framed as a ~12-month on-site client secondment following onboarding.",
    urgencyScore: 88,
    signals: ["private equity", "fund-related documents", "alternative asset manager", "capital markets", "M&A", "financing transactions", "secondment", "legal managed services", "US remote", "reposted within 72h", "early applicant", "Mayer Brown partnership Aug 11 2026", "direct apply"],
    source: "Built In remote legal board (Principal Legal Lead, reposted Aug 17, 2026) cross-checked against Scissero's Teamtailor careers site and Aug 11, 2026 Mayer Brown partnership coverage",
    sourceUrl: "https://builtin.com/job/principal-legal-lead/10313789",
    notes: "Grade A (combined 90) — best find this cycle and the only new company hitting the fund/PE core of the ICP. Two live doors: (1) Principal Legal Lead, U.S. Remote, senior delivery + account ownership for global investment firms and asset managers; (2) Legal Specialist (New York — On Site Client Secondment), a planned ~12-month secondment into a leading global alternative asset manager (https://scissero.teamtailor.com/jobs/8126249-legal-specialist-new-york-on-site-client-secondment). Both posted full-time, but the business model is managed services and secondment — the commercial shape Katie sells. PITCH: senior overflow/secondment counsel carrying fund documentation (LPAs, side letters, subscription docs) above the NDA-playbook Specialist tier. Mayer Brown tie-up is a capacity-expansion signal. ACTION: apply on Teamtailor this week while the early-applicant flag is live.",
    contacts: [
      { name: "Mathias Strasser", title: "Founder & CEO", email: null, linkedin: "https://www.linkedin.com/company/scissero/" },
      { name: null, title: "Principal Legal Lead (U.S., Remote) — apply via Teamtailor", email: null, linkedin: "https://scissero.teamtailor.com/jobs/8033276-principal-legal-lead" }
    ]
  },
  {
    name: "Applied Intuition",
    website: "https://www.appliedintuition.com",
    pipeline: PIPELINE,
    industry: "Late-stage venture-backed autonomy and vehicle-software company serving automotive, defense and industrial customers. Sourcing a live interim counsel engagement through Go Fractional rather than adding headcount.",
    location: "Sunnyvale, CA (hybrid)",
    fundingStage: "Late-stage venture-backed technology company",
    fitScore: 20,
    intentScore: 50,
    fitDetails: {
      practice_area: "+0 — employment counsel remit; not corporate, commercial contracts, M&A, financing or securities",
      seniority: "+10 — counsel-level interim role, 30-40 hrs/week",
      comp_credible: "+10 — $150-$275/hr published, market-credible for interim counsel",
      fund_focus: "+0 — no fund, private funds or fund formation content"
    },
    intentDetails: {
      engagement_model: "+15 — explicitly interim, sourced through a fractional-talent marketplace",
      remote_flex: "+15 — hybrid arrangement",
      recency: "+10 — posted Aug 17, 2026, within 72 hours",
      apply_path: "+10 — direct apply through Go Fractional listing"
    },
    vertical: "legal",
    subvertical: "contracts",
    engagementModel: "interim",
    buyerType: "operating-company",
    compensationText: "$150-$275/hr, 30-40 hrs/week",
    remoteFlag: "hybrid",
    employmentTypeRaw: "Interim (hybrid, Sunnyvale CA), 30-40 hrs/week",
    urgencyScore: 78,
    signals: ["interim", "hybrid", "$150-275/hr", "30-40 hrs/week", "posted within 72h", "fractional marketplace", "direct apply"],
    source: "Go Fractional legal jobs board — Applied Intuition Interim Employment Counsel, posted Aug 17, 2026",
    sourceUrl: "https://www.gofractional.com/job/welcometothejungle-applied-intuition-employment-counsel-welcome-to-the-jungle-login",
    notes: "Grade B (combined 70) — honest caveat: fit is weak (20/50). Practice area is employment, not Katie's corporate/funds core, and Sunnyvale hybrid is a poor geographic match from New York. Clears threshold on intent alone: live, well-paid interim counsel engagement posted within 72h with a direct apply path. PITCH: not the posted role — the signal is that Applied Intuition buys senior legal capacity on an interim basis via a fractional marketplace rather than headcount, making them a warm target for a commercial-contracts or corporate-governance interim scope later. Do not prioritise over Scissero or the Tower Legal private-funds req.",
    contacts: [
      { name: null, title: "Interim Employment Counsel — apply via Go Fractional", email: null, linkedin: "https://www.linkedin.com/company/applied-intuition/" }
    ]
  },
  {
    name: "Emergence Software",
    website: "https://builtin.com/company/emergence-software",
    pipeline: PIPELINE,
    industry: "Holding company across professional services, software and financial services standing up a day-to-day legal function spanning its portfolio companies: contract intake and triage, template management, outside-counsel coordination, routine commercial contract negotiation, entity governance, and post-acquisition legal integration.",
    location: "Remote (United States)",
    fundingStage: "Holding company with acquired portfolio companies",
    fitScore: 30,
    intentScore: 35,
    fitDetails: {
      practice_area: "+10 — commercial contract negotiation, entity governance, post-acquisition legal integration, outside-counsel management",
      seniority: "+10 — Director of Legal owning the function end to end across portfolio companies",
      comp_credible: "+10 — $275K-$375K published, credible for the scope",
      fund_focus: "+0 — holdco with portfolio companies rather than a fund or fund-formation mandate"
    },
    intentDetails: {
      engagement_model: "+0 — posted as a permanent full-time hire, not freelance, contract or interim",
      remote_flex: "+15 — fully remote, United States",
      recency: "+10 — reposted within the last 24 hours as of Aug 18, 2026",
      apply_path: "+10 — direct Built In apply"
    },
    vertical: "legal",
    subvertical: "corporate",
    engagementModel: "fractional",
    buyerType: "portfolio-company",
    compensationText: "$275,000-$375,000 annually",
    remoteFlag: "remote",
    employmentTypeRaw: "Full-time, permanent (Director, Legal)",
    urgencyScore: 70,
    signals: ["portfolio companies", "post-acquisition legal integration", "entity governance", "commercial contracts", "outside counsel coordination", "remote US", "reposted within 24h", "no existing legal function"],
    source: "Built In remote legal board — Emergence Software Director of Legal, reposted Aug 17-18, 2026",
    sourceUrl: "https://builtin.com/job/director-legal/10303448",
    notes: "Grade B (combined 65) — a conversion play, not a direct application. Posted role is permanent FTE, which zeroes the engagement-model component; engagementModel recorded as 'fractional' because that is the shape Katie would pitch, with employmentTypeRaw preserving the FT framing. PITCH: textbook fractional-GC profile — holdco with portfolio companies, no existing legal bench, lumpy rather than continuous workload. Repost signals the FT search is not closing. Offer to stand up the same function fractionally in 60-90 days at a fraction of the $275-375K load, option to convert. Watch for a second repost in September.",
    contacts: [
      { name: null, title: "Director of Legal — apply via Built In", email: null, linkedin: "https://builtin.com/company/emergence-software" }
    ]
  }
];

async function main() {
  console.log(`\nLegal Freelance import — ${SCRAPE_DATE}`);
  console.log(`${leads.length} lead(s) in payload\n`);

  let created = 0;
  let skipped = 0;
  let contactsCreated = 0;

  for (const lead of leads) {
    const existing = await prisma.company.findFirst({
      where: { name: lead.name }
    });

    if (existing) {
      skipped++;
      console.log(`  SKIP   ${lead.name} — already in CRM (id ${existing.id})`);
      continue;
    }

    const company = await prisma.company.create({
      data: {
        name: lead.name,
        website: lead.website || '',
        pipeline: lead.pipeline,
        industry: lead.industry || '',
        location: lead.location || '',
        fundingStage: lead.fundingStage || '',
        stage: 'Targeted',
        fitScore: lead.fitScore ?? 0,
        intentScore: lead.intentScore ?? 0,
        fitDetails: JSON.stringify(lead.fitDetails || {}),
        intentDetails: JSON.stringify(lead.intentDetails || {}),
        notes: lead.notes || '',
        vertical: lead.vertical || '',
        subvertical: lead.subvertical || '',
        engagementModel: lead.engagementModel || '',
        buyerType: lead.buyerType || '',
        compensationText: lead.compensationText || '',
        remoteFlag: lead.remoteFlag || '',
        employmentTypeRaw: lead.employmentTypeRaw || '',
        urgencyScore: lead.urgencyScore ?? 0,
        source: lead.source || 'legal-freelance-scrape',
        lastActivity: SCRAPE_DATE
      }
    });
    created++;

    for (const c of lead.contacts || []) {
      await prisma.contact.create({
        data: {
          name: c.name || lead.name,
          title: c.title || '',
          email: c.email || '',
          linkedin: c.linkedin || '',
          persona: 'legal-freelance-buyer',
          companyId: company.id
        }
      });
      contactsCreated++;
    }

    await prisma.scrapeResult.create({
      data: {
        url: lead.sourceUrl || '',
        source: 'job_boards',
        pipeline: lead.pipeline,
        resultData: JSON.stringify(lead),
        matchedSignals: JSON.stringify(lead.signals || []),
        imported: true
      }
    });

    const combined = (lead.fitScore ?? 0) + (lead.intentScore ?? 0);
    console.log(`  ADDED  ${lead.name} — ${combined}/100 (${lead.subvertical}/${lead.engagementModel})`);
  }

  console.log(`\nDone. ${created} added, ${skipped} skipped, ${contactsCreated} contact(s) created.\n`);
}

main()
  .catch((e) => {
    console.error('Import failed:', e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
