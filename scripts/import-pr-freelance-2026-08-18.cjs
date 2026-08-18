/**
 * Import script: PR Freelance Scrape 2026-08-18
 * Run: node scripts/import-pr-freelance-2026-08-18.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "Touch Health — External Communications & Digital Strategy Consultant",
    website: "https://www.touchhealth.org",
    pipeline: "pr-freelance",
    industry: "Nonprofit global-health organization. Hiring a part-time external communications consultant for an August-to-September engagement to build a donor-facing external communications strategy and produce core collateral: storytelling content, e-newsletter program reset (editorial cadence, drafting, scheduling), social collateral, and content for A/B testing and new-audience acquisition. Explicitly asks for hands-on LinkedIn content management for organizational and executive presence.",
    location: "New York, NY (remote-friendly)",
    fundingStage: "Nonprofit / donor-funded",
    fitScore: 35,
    intentScore: 45,
    vertical: "pr",
    subvertical: "content-strategy",
    engagementModel: "consultant",
    buyerType: "operating-company",
    compensationText: "USD $7,500 total budget for the August-to-September engagement",
    remoteFlag: "remote",
    employmentTypeRaw: "Part-time consultant — August-to-September project engagement",
    urgencyScore: 80,
    source: "Idealist — External Communications & Digital Strategy Consultant, Touch Health Inc (posted 2026-08-16)",
    sourceUrl: "https://www.idealist.org/en/nonprofit-job/8cc2b685aa2f43b185ca50170de624f9-external-communications-digital-strategy-consultant-touch-health-inc-new-york",
    notes: "Grade A (combined 80) on the rubric, but the score is driven by intent (recency, part-time, clear budget, easy apply) not fit. Sector is nonprofit global health rather than Mark's finance/PE/B2B core; remit is donor content and owned channels rather than earned media; $7,500 for a two-month part-time engagement is below senior-operator rates. CAVEAT: Idealist pages are JS-rendered and returned an empty body on direct fetch — details corroborated from indexed search results, so verify scope and budget on the live listing. ACTION: fast, low-effort application given freshness and defined scope; pitch executive-visibility and narrative rather than competing on content-production price.",
    contacts: [
      { name: null, title: "Apply via Idealist listing", email: null, linkedin: null }
    ]
  },
  {
    name: "Reputation Management Consultants (RMC) — Crisis Communications Freelance (NY & LA)",
    website: "https://recruiterflow.com/reputationmanagementconsultants/jobs/1",
    pipeline: "pr-freelance",
    industry: "Global crisis management and reputation firm founded in 2006, serving Fortune 500 companies and their executives, government agencies, SMBs, nonprofits and individuals. Staff blends crisis experts, online reputation specialists, former newspaper editors and journalists. Recruiting experienced mid-level-and-above crisis communications professionals on a freelance basis for crisis preparedness and planning, crisis simulations, and live crisis response for high-profile clients. Two parallel openings: New York and Los Angeles.",
    location: "New York, NY and Los Angeles, CA",
    fundingStage: "Established private firm (founded 2006)",
    fitScore: 50,
    intentScore: 25,
    vertical: "pr",
    subvertical: "crisis",
    engagementModel: "freelance",
    buyerType: "agency",
    compensationText: "Not disclosed on listing",
    remoteFlag: "",
    employmentTypeRaw: "Crisis Communication — Freelance (separate NY and LA requisitions)",
    urgencyScore: 55,
    source: "Recruiterflow — Reputation Management Consultants, Crisis Communication Freelance (NY req #1, LA req #3)",
    sourceUrl: "https://recruiterflow.com/reputationmanagementconsultants/jobs/1",
    notes: "Grade B (combined 75) but the strongest strategic fit of the cycle — intent is suppressed only by missing metadata (no posting date, no remote flag, no rate), not weak demand. Senior crisis and issues work for Fortune 500 clients: C-suite counsel plus hands-on crisis plans, reactive statements, talking points, FAQs, working alongside in-house and outside legal counsel. Explicitly wants business/financial media and investigative-journalist experience — the intersection of Mark's PR and legal pipelines. LA req (jobs/3) timed out on fetch; NY req fully verified. ACTION: highest-priority application this cycle; lead with financial/business media relationships and litigation-adjacent comms. Roster relationship = recurring project revenue, not a one-off.",
    contacts: [
      { name: null, title: "Apply via Recruiterflow — NY req (jobs/1) and LA req (jobs/3)", email: null, linkedin: null }
    ]
  },
  {
    name: "Crackle PR — B2B SaaS PR Agency (White-Label / Overflow Target)",
    website: "https://www.cracklepr.com/saas-pr-agency",
    pipeline: "pr-freelance",
    industry: "Specialist PR firm focused exclusively on B2B SaaS companies — earned media, product launch communications, founder and executive thought leadership, and analyst-adjacent visibility for software businesses. Sector-pure agency of the type that routinely subcontracts senior media relations execution during campaign peaks and launch cycles.",
    location: "Remote (US)",
    fundingStage: "Established boutique PR agency",
    fitScore: 50,
    intentScore: 20,
    vertical: "pr",
    subvertical: "agency-overflow",
    engagementModel: "freelance",
    buyerType: "agency",
    compensationText: "N/A — business-development target, no comp-bearing posting",
    remoteFlag: "remote",
    employmentTypeRaw: "N/A — outbound white-label / overflow BD target",
    urgencyScore: 30,
    source: "Web search — Crackle PR B2B SaaS PR agency, Aug 2026",
    sourceUrl: "https://www.cracklepr.com/saas-pr-agency",
    notes: "Grade B (combined 70). BUSINESS-DEVELOPMENT TARGET, NOT A LIVE POSTING — flagged so it is not worked as an application. Intent scored honestly low (20) because nothing about hiring is stated; earns its place on fit alone. Sector-pure B2B SaaS matches the ICP more tightly than the generalist white-label shops already in the pipeline (Wilson PR, Trizcom, 10to1, SERPpro, Interdependence). ACTION: outbound BD note positioning Mark as senior overflow capacity for launch pushes and founder thought-leadership programs; batch with the other white-label outreach.",
    contacts: [
      { name: null, title: "BD / partnerships (via agency site)", email: null, linkedin: null }
    ]
  },
  {
    name: "Watson Creative — Freelance Public Relations Consultants",
    website: "https://builtin.com/job/freelance-public-relations-consultants/1776847",
    pipeline: "pr-freelance",
    industry: "Design-driven brand consulting firm headquartered in Portland, Oregon with offices in San Francisco and Bend. Recruiting freelance public relations contractors to collaborate with in-house strategists, account directors, project managers, designers, writers, developers and marketers on creative asset development and campaign activations.",
    location: "Portland, OR / San Francisco, CA / Bend, OR (remote contractor collaboration)",
    fundingStage: "Established private agency",
    fitScore: 35,
    intentScore: 30,
    vertical: "pr",
    subvertical: "agency-overflow",
    engagementModel: "freelance",
    buyerType: "agency",
    compensationText: "Not disclosed on listing",
    remoteFlag: "remote",
    employmentTypeRaw: "Freelance contractor — public relations consultant (rolling bench)",
    urgencyScore: 40,
    source: "Built In — Freelance Public Relations Consultants, Watson Creative",
    sourceUrl: "https://builtin.com/job/freelance-public-relations-consultants/1776847",
    notes: "Grade B (combined 65). CAVEAT: the Built In page returned an empty body on direct fetch and exposes no posting date, so recency scored 0 and the listing may fall outside the 7-day window. Sector is creative/brand rather than Mark's finance and B2B core, so this is bench-building rather than an ICP bullseye. ACTION: low-effort application to get on the roster; verify the listing is still live before spending time on a tailored pitch. Angle: Mark is the senior media-relations layer their creative work needs to land coverage.",
    contacts: [
      { name: null, title: "Apply via Built In listing", email: null, linkedin: "https://www.linkedin.com/company/watson-creative/" }
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
        scrapeDate: new Date("2026-08-18")
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
