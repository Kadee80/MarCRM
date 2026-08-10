/**
 * Import script: PR Freelance Scrape 2026-07-07
 * Run: node scripts/import-pr-freelance-2026-07-07.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres
 * Deduplicates by company name (skips existing companies).
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "Hanson Search — Fractional Communications Recruitment",
    website: "https://www.hansonsearch.com",
    pipeline: "pr-freelance",
    industry: "Executive search / corporate & financial communications",
    location: "Remote / US & UK",
    fundingStage: "n/a",
    fitScore: 45,
    intentScore: 40,
    vertical: "pr",
    subvertical: "comms",
    engagementModel: "fractional",
    buyerType: "staffing",
    compensationText: "Fractional retainer (rate by engagement; market $200-$500/hr for fractional comms leaders)",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional / interim placement",
    urgencyScore: 70,
    source: "Web search (fractional communications recruitment)",
    sourceUrl: "https://www.hansonsearch.com/fractional-communications-recruitment/",
    notes: "Grade A (combined 85). Places fractional CCOs / corporate affairs / media relations leaders; strong financial-services client base. ACTION: register as fractional bench talent. Pitch senior strategic+executional operator able to plug into corporate affairs / IR-adjacent narratives.",
    contacts: []
  },
  {
    name: "Wilson Public Relations — White-Label / Overflow PR Partner",
    website: "https://wilsonpublicrelations.com",
    pipeline: "pr-freelance",
    industry: "PR agency (white-label / overflow)",
    location: "Remote / US",
    fundingStage: "n/a",
    fitScore: 35,
    intentScore: 50,
    vertical: "pr",
    subvertical: "agency-overflow",
    engagementModel: "freelance",
    buyerType: "agency",
    compensationText: "Project / retainer, white-label execution (not published)",
    remoteFlag: "remote",
    employmentTypeRaw: "White-label / overflow contractor",
    urgencyScore: 65,
    source: "Web search (white-label PR overflow)",
    sourceUrl: "https://wilsonpublicrelations.com/services/white-label-public-relations/",
    notes: "Grade A (combined 85). Agency explicitly offers white-label / overflow execution routed through their brand. ACTION: send overflow-execution pitch (media relations + press-release writing). Recurring, low-friction project income.",
    contacts: []
  },
  {
    name: "Chameleon Collective — Fractional CCO Bench",
    website: "https://chameleoncollective.com",
    pipeline: "pr-freelance",
    industry: "Fractional executive collective / consultancy",
    location: "Remote / US",
    fundingStage: "n/a",
    fitScore: 35,
    intentScore: 40,
    vertical: "pr",
    subvertical: "executive-comms",
    engagementModel: "fractional",
    buyerType: "agency",
    compensationText: "Fractional CCO retainer ($5k-$20k/mo market range)",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional CCO",
    urgencyScore: 60,
    source: "Web search (fractional CCO)",
    sourceUrl: "https://chameleoncollective.com/skill/fractional-cco-chief-communications-officer/",
    notes: "Grade B (combined 75). Staffs fractional CCOs from a vetted bench. ACTION: apply to join bench for multi-month strategic+executional engagements.",
    contacts: []
  },
  {
    name: "Forthright Advising — Interim Communications Director",
    website: "https://www.forthrightadvising.com",
    pipeline: "pr-freelance",
    industry: "Boutique PR / communications firm",
    location: "Raleigh, NC / national (remote)",
    fundingStage: "n/a",
    fitScore: 35,
    intentScore: 40,
    vertical: "pr",
    subvertical: "comms",
    engagementModel: "interim",
    buyerType: "agency",
    compensationText: "Interim contract (not published)",
    remoteFlag: "remote",
    employmentTypeRaw: "Interim communications director",
    urgencyScore: 62,
    source: "Web search (interim communications director)",
    sourceUrl: "https://www.forthrightadvising.com/interim-communications-director",
    notes: "Grade B (combined 75). Boutique firm deploying interim comms directors to clients — short-notice, defined-scope engagements. ACTION: send interim-availability note.",
    contacts: []
  },
  {
    name: "MassMutual — Communications Consultant, Media Relations",
    website: "https://www.massmutual.com",
    pipeline: "pr-freelance",
    industry: "Insurance / asset management (financial services)",
    location: "Hybrid (US)",
    fundingStage: "public / mutual",
    fitScore: 45,
    intentScore: 15,
    vertical: "pr",
    subvertical: "media-relations",
    engagementModel: "consultant",
    buyerType: "operating-company",
    compensationText: "Not published (corporate band)",
    remoteFlag: "hybrid",
    employmentTypeRaw: "Communications Consultant (Media Relations) — employment type unconfirmed",
    urgencyScore: 40,
    source: "LinkedIn Jobs (indexed)",
    sourceUrl: "https://www.linkedin.com/jobs/view/communications-consultant-media-relations-at-massmutual-1704809106",
    notes: "Grade C (combined 60). Strong financial-sector + media relations fit. CAVEAT: 'Consultant' is likely an internal FTE job level — VERIFY contract-vs-FTE before outreach. Distinguish employmentTypeRaw (unconfirmed) from engagementModel.",
    contacts: []
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
        scrapeDate: new Date("2026-07-07")
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
