/**
 * Import script: PR Freelance Scrape 2026-08-13
 * Run: node scripts/import-pr-freelance-2026-08-13.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "The Work Crowd — Fintech PR & Investor Relations Freelancer Network (Bench Membership)",
    website: "https://theworkcrowd.com/fintech-pr",
    pipeline: "pr-freelance",
    industry: "UK/US freelance-talent marketplace placing vetted senior PR, communications and investor-relations freelancers/interims with fintech, financial-services and B2B clients. Dedicated fintech-PR and IR consultant desks; matches on-demand talent to client briefs on hourly, project and retainer bases.",
    location: "Remote (US & UK)",
    fundingStage: "Established freelance-talent marketplace",
    fitScore: 50,
    intentScore: 30,
    vertical: "pr",
    subvertical: "investor-pr",
    engagementModel: "freelance",
    buyerType: "staffing",
    compensationText: "Set per brief (hourly / project / retainer) — freelancer sets rate",
    remoteFlag: "remote",
    employmentTypeRaw: "Freelancer marketplace / bench membership",
    urgencyScore: 55,
    source: "Web search — The Work Crowd fintech-PR & IR consultant desks, Aug 2026",
    sourceUrl: "https://theworkcrowd.com/fintech-pr",
    notes: "Grade A (combined 80) — highest-leverage find this cycle. ENROLLMENT channel that routes senior freelance PR/IR talent to fintech/financial clients on Mark's exact terms (hourly/project/retainer). ACTION: register Mark on the fintech-PR and IR freelancer desks.",
    contacts: [
      { name: null, title: "Join as a freelancer (fintech-PR / IR desk)", email: null, linkedin: "https://www.linkedin.com/company/the-work-crowd/" }
    ]
  },
  {
    name: "Regulated Fintech / Crypto — PR Lead (Contract, Media Narrative & Crisis)",
    website: "https://www.remoterocketship.com/jobs/public-relations/",
    pipeline: "pr-freelance",
    industry: "Regulated fintech/crypto business hiring an external PR lead to own its media narrative, manage agency performance, drive executive positioning, and handle crisis communications and events. Senior standalone remit surfaced via Remote Rocketship's public-relations board.",
    location: "Remote",
    fundingStage: "Regulated fintech / crypto operating company",
    fitScore: 45,
    intentScore: 35,
    vertical: "pr",
    subvertical: "crisis",
    engagementModel: "contract",
    buyerType: "operating-company",
    compensationText: "Not disclosed on board listing",
    remoteFlag: "remote",
    employmentTypeRaw: "PR Lead — external/contract, remote",
    urgencyScore: 70,
    source: "Remote Rocketship public-relations board, Aug 2026",
    sourceUrl: "https://www.remoterocketship.com/jobs/public-relations/",
    notes: "Grade A (combined 80). Strong sector + workstream fit, highest urgency of the run (crisis/regulated media narrative). CAVEAT: verify engagement is contract/fractional vs. full-time hire before investing. ACTION: confirm scope, then pitch senior contract media-narrative + crisis lead.",
    contacts: [
      { name: null, title: "Apply via Remote Rocketship listing", email: null, linkedin: null }
    ]
  },
  {
    name: "Toptal — Freelance PR & IPO/Investor-Comms Talent Bench",
    website: "https://www.toptal.com/marketing/public-relations",
    pipeline: "pr-freelance",
    industry: "Elite freelance-talent network placing vetted PR specialists, IPO consultants and investor-relations professionals with clients (Thumbtack, Bridgestone, Motorola) on hourly, part-time or contract bases. Distinct PR, IPO-consultant and IR desks.",
    location: "Remote (US)",
    fundingStage: "Established elite freelance marketplace",
    fitScore: 45,
    intentScore: 30,
    vertical: "pr",
    subvertical: "investor-pr",
    engagementModel: "freelance",
    buyerType: "staffing",
    compensationText: "Set per engagement (hourly / part-time / contract)",
    remoteFlag: "remote",
    employmentTypeRaw: "Elite freelancer network / talent bench",
    urgencyScore: 45,
    source: "Web search — Toptal PR & IPO-consultant desks, Aug 2026",
    sourceUrl: "https://www.toptal.com/marketing/public-relations",
    notes: "Grade B (combined 75). Second enrollment channel alongside The Work Crowd; high screening bar but IPO/IR client quality fits Mark. ACTION: apply to PR + IPO/investor-relations desks; longer-lead-time but high-quality brief source.",
    contacts: [
      { name: null, title: "Apply to Toptal PR / IPO-consultant network", email: null, linkedin: "https://www.linkedin.com/company/toptal/" }
    ]
  },
  {
    name: "Trizcom PR — White-Label PR Execution Partner (Agency Overflow)",
    website: "https://www.trizcom.com/white-label-pr",
    pipeline: "pr-freelance",
    industry: "US PR agency offering white-label PR to ad/marketing agencies — media relations, campaign strategy, reputation management, stakeholder communications, thought-leadership content and crisis support delivered under the partner agency's brand.",
    location: "Remote (US)",
    fundingStage: "Established PR agency (white-label division)",
    fitScore: 35,
    intentScore: 30,
    vertical: "pr",
    subvertical: "agency-overflow",
    engagementModel: "contract",
    buyerType: "agency",
    compensationText: "N/A — white-label/overflow BD target (no comp-bearing posting)",
    remoteFlag: "remote",
    employmentTypeRaw: "White-label PR execution partner (agency overflow)",
    urgencyScore: 40,
    source: "Web search — Trizcom white-label PR services page, Aug 2026",
    sourceUrl: "https://www.trizcom.com/white-label-pr",
    notes: "Grade B (combined 65). Overflow/white-label BD TARGET, not a live posting — intent inferred from standing white-label offer. ACTION: BD outreach positioning Mark as senior overflow execution (media relations + crisis); verify current capacity.",
    contacts: [
      { name: null, title: "BD / white-label partnerships (via firm site)", email: null, linkedin: "https://www.linkedin.com/company/trizcom-public-relations/" }
    ]
  },
  {
    name: "10 to 1 Public Relations — White-Label PR Services Partner (Agency Overflow)",
    website: "https://10to1pr.com/what-we-do/white-label-pr-services/",
    pipeline: "pr-freelance",
    industry: "National (Phoenix-based) PR agency running a white-label PR services line for other agencies — earned media, media relations and campaign execution delivered under the partner's brand.",
    location: "Remote / US (Phoenix HQ)",
    fundingStage: "Established PR agency (white-label division)",
    fitScore: 35,
    intentScore: 25,
    vertical: "pr",
    subvertical: "agency-overflow",
    engagementModel: "contract",
    buyerType: "agency",
    compensationText: "N/A — white-label/overflow BD target",
    remoteFlag: "hybrid",
    employmentTypeRaw: "White-label PR execution partner (agency overflow)",
    urgencyScore: 35,
    source: "Web search — 10 to 1 PR white-label services page, Aug 2026",
    sourceUrl: "https://10to1pr.com/what-we-do/white-label-pr-services/",
    notes: "Grade B (combined 60). Second white-label BD target; similar play to Trizcom but distinct firm. Lower confidence on remote flexibility (Phoenix HQ). ACTION: light-touch BD outreach as senior overflow execution; deprioritize vs. Trizcom and enrollment channels.",
    contacts: [
      { name: null, title: "BD / white-label partnerships (via firm site)", email: null, linkedin: "https://www.linkedin.com/company/10-to-1-public-relations/" }
    ]
  },
  {
    name: "Forthright Advising — Interim Communications Director Network",
    website: "https://www.forthrightadvising.com/interim-communications-director",
    pipeline: "pr-freelance",
    industry: "Advisory firm placing interim/fractional communications directors into organizations with comms leadership gaps or surge needs — strategic comms, media relations and executive communications on an interim basis.",
    location: "Remote (US)",
    fundingStage: "Established comms advisory / interim-placement firm",
    fitScore: 30,
    intentScore: 30,
    vertical: "pr",
    subvertical: "executive-comms",
    engagementModel: "interim",
    buyerType: "staffing",
    compensationText: "Set per interim engagement",
    remoteFlag: "remote",
    employmentTypeRaw: "Interim communications director placement network",
    urgencyScore: 40,
    source: "Web search — Forthright Advising interim communications director page, Aug 2026",
    sourceUrl: "https://www.forthrightadvising.com/interim-communications-director",
    notes: "Grade B (combined 60). Interim-leadership enrollment channel — good fit for Mark's senior/strategic profile but sector-agnostic. ACTION: register on the interim-comms network for surge/gap engagements; secondary to finance-focused channels.",
    contacts: [
      { name: null, title: "Join interim-comms network (via firm site)", email: null, linkedin: null }
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
