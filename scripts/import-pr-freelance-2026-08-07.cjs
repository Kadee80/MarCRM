/**
 * Import script: PR Freelance Scrape 2026-08-07
 * Run: node scripts/import-pr-freelance-2026-08-07.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "CrowdPharm / Hot Iron Health — Freelance Investor Relations Consultant (Remote)",
    website: "https://builtin.com/job/freelance-investor-relations-consultant/3753137",
    pipeline: "pr-freelance",
    industry: "Hot Iron Health (via CrowdPharm's freelance marketplace) is hiring a remote freelance Investor Relations consultant to develop and execute IR strategy, communicate financial performance and business updates to investors and analysts, and support capital-raising activities in the healthcare industry.",
    location: "Remote (US)",
    fundingStage: "Growth-stage healthcare company (active capital raising)",
    fitScore: 40,
    intentScore: 30,
    vertical: "pr",
    subvertical: "investor-pr",
    engagementModel: "freelance",
    buyerType: "operating-company",
    compensationText: "Not stated (freelance/project basis)",
    remoteFlag: "remote",
    employmentTypeRaw: "Freelance Investor Relations consultant — remote",
    urgencyScore: 40,
    source: "Web search — Built In (CrowdPharm / Hot Iron Health), Aug 2026",
    sourceUrl: "https://builtin.com/job/freelance-investor-relations-consultant/3753137",
    notes: "Grade B (combined 70) — strongest lead of the run. IR/financial-comms fit is squarely in Mark's wheelhouse (investor narrative + capital-raise support). DEDUP CAVEAT: CrowdPharm the freelance NETWORK was captured 2026-06-03 as a general talent-bench lead; this is a DISTINCT, higher-value sub-req (a specific Hot Iron Health Investor Relations role via that marketplace) — treat as a separate opportunity, not a re-scrape of the network. Verify the listing is still live (may be a repost). ACTION: apply with IR-narrative and investor/media case studies; confirm freelance scope and cadence.",
    contacts: [
      { name: null, title: "Apply via Built In / CrowdPharm marketplace", email: null, linkedin: "https://www.linkedin.com/company/crowdpharm" }
    ]
  },
  {
    name: "SERPpro — White-Label PR Services for Agencies",
    website: "https://www.serppro.ai/white-label-pr",
    pipeline: "pr-freelance",
    industry: "White-label PR/digital-PR provider for agencies — secures media placements and coverage delivered under the partner agency's brand. More placement/earned-link oriented than full earned-media strategy, but a viable overflow execution channel.",
    location: "Remote",
    fundingStage: "Digital-PR services firm (white-label)",
    fitScore: 30,
    intentScore: 30,
    vertical: "pr",
    subvertical: "agency-overflow",
    engagementModel: "contract",
    buyerType: "agency",
    compensationText: "Not stated (white-label project basis)",
    remoteFlag: "remote",
    employmentTypeRaw: "White-label PR execution partner — project basis",
    urgencyScore: 40,
    source: "Web search — SERPpro white-label PR page, Aug 2026",
    sourceUrl: "https://www.serppro.ai/white-label-pr",
    notes: "Grade C (combined 60). Lower fit — placement/link-oriented rather than senior earned-media strategy, so a weaker match for Mark's strategic profile. Fresh name (companion to already-captured Wilson PR, No Strings, 10to1 white-label channels). ACTION: low priority; pursue only for supplemental placement-execution volume.",
    contacts: [
      { name: null, title: "Reach out re: white-label PR partnership", email: null, linkedin: null }
    ]
  },
  {
    name: "Funders' Committee for Civic Participation — Communications Consultant (Remote)",
    website: "https://www.idealist.org/en/nonprofit-job/accaeeca178440eeb4e3c3a96c5c5007-communications-consultant-funders-committee-for-civic-participation-new-york",
    pipeline: "pr-freelance",
    industry: "Nonprofit funder network (civic participation / democracy sector) hiring a communications consultant to lead comms strategy, messaging and content on a contract basis. NYC-associated, remote-friendly.",
    location: "Remote (US); NYC-associated",
    fundingStage: "Nonprofit / funder collaborative (consultant model)",
    fitScore: 25,
    intentScore: 30,
    vertical: "pr",
    subvertical: "content-strategy",
    engagementModel: "consultant",
    buyerType: "operating-company",
    compensationText: "Not stated (consultant/contract)",
    remoteFlag: "remote",
    employmentTypeRaw: "Communications consultant — contract, remote (nonprofit)",
    urgencyScore: 30,
    source: "Web search — Idealist (Funders' Committee for Civic Participation), Aug 2026",
    sourceUrl: "https://www.idealist.org/en/nonprofit-job/accaeeca178440eeb4e3c3a96c5c5007-communications-consultant-funders-committee-for-civic-participation-new-york",
    notes: "Grade C (combined 55, at threshold). Real, fresh, remote freelance comms-consultant req but OFF-SECTOR (civic/nonprofit) and content/messaging-weighted rather than earned-media strategy. Included as a genuinely-new lead in a run where most fresh names were prior captures. ACTION: low priority; verify posting is live and scope before pursuing.",
    contacts: [
      { name: null, title: "Apply via Idealist listing", email: null, linkedin: null }
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
        scrapeDate: new Date("2026-08-07")
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
