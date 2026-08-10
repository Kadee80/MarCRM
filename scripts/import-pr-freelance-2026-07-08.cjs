/**
 * Import script: PR Freelance Scrape 2026-07-08
 * Run: node scripts/import-pr-freelance-2026-07-08.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "GrowTal — Fractional Communications & Marketing (Fintech / Wealth-Tech)",
    website: "https://www.growtal.com",
    pipeline: "pr-freelance",
    industry: "Fractional talent marketplace (financial services focus)",
    location: "Remote / US",
    fundingStage: "n/a",
    fitScore: 45,
    intentScore: 40,
    vertical: "pr",
    subvertical: "comms",
    engagementModel: "fractional",
    buyerType: "staffing",
    compensationText: "Fractional retainer, ~$150-$350/hr market range for fractional comms/marketing leaders",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional / retainer placement",
    urgencyScore: 72,
    source: "Web search (fractional financial-services marketing/comms marketplace)",
    sourceUrl: "https://www.growtal.com/top-fractional-cmo-companies-serving-financial-services/",
    notes: "Grade A (combined 85). Best sector fit this run — fintech/wealth-tech/asset-management client base directly matches Mark's ICP; <48h matching signals live demand. ACTION: register as fractional comms/earned-media bench talent; lead with financial-narrative + media relations positioning.",
    contacts: []
  },
  {
    name: "Select Advisors Institute — Fractional Comms/CMO for PE & Wealth Management",
    website: "https://www.selectadvisorsinstitute.com",
    pipeline: "pr-freelance",
    industry: "Financial-services marketing & communications advisory",
    location: "Remote / US",
    fundingStage: "n/a",
    fitScore: 45,
    intentScore: 30,
    vertical: "pr",
    subvertical: "investor-pr",
    engagementModel: "fractional",
    buyerType: "operating-company",
    compensationText: "Fractional advisory retainer (not published; market $8k-$25k/mo)",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional comms / CMO advisory",
    urgencyScore: 55,
    source: "Web search (fractional CMO private equity & wealth management)",
    sourceUrl: "https://www.selectadvisorsinstitute.com/our-perspective/fractional-cmo-private-equity-wealth-management",
    notes: "Grade B (combined 75). Strong PE/wealth-management sector fit; investor/advisor narrative + thought-leadership remit. ACTION: pitch as senior comms operator for investor narrative + earned-media execution on their client engagements.",
    contacts: []
  },
  {
    name: "Scion Staffing — Contract / Temporary PR & Communications",
    website: "https://scionstaffing.com",
    pipeline: "pr-freelance",
    industry: "PR & communications staffing agency",
    location: "Remote / US (national)",
    fundingStage: "n/a",
    fitScore: 35,
    intentScore: 40,
    vertical: "pr",
    subvertical: "comms",
    engagementModel: "contract",
    buyerType: "staffing",
    compensationText: "Contract / temp hourly (varies by placement)",
    remoteFlag: "remote",
    employmentTypeRaw: "Contract / temporary staffing placement",
    urgencyScore: 68,
    source: "Web search (contract / temporary PR & communications staffing)",
    sourceUrl: "https://scionstaffing.com/temporary-communications-staffing/",
    notes: "Grade B (combined 75). National contract/temp comms staffing channel. CAVEAT: distinguish employmentTypeRaw (temp W-2) from true freelance. ACTION: register as senior contract comms talent for project placements.",
    contacts: []
  },
  {
    name: "Capstone Hill Search — Communications & PR Recruitment",
    website: "https://www.capstonehillsearch.com",
    pipeline: "pr-freelance",
    industry: "Communications & PR executive recruitment",
    location: "Remote / US & UK",
    fundingStage: "n/a",
    fitScore: 45,
    intentScore: 30,
    vertical: "pr",
    subvertical: "comms",
    engagementModel: "interim",
    buyerType: "staffing",
    compensationText: "Interim / contract (rate by engagement)",
    remoteFlag: "remote",
    employmentTypeRaw: "Interim / contract placement",
    urgencyScore: 58,
    source: "Web search (communications & PR recruitment agency)",
    sourceUrl: "https://www.capstonehillsearch.com/",
    notes: "Grade B (combined 75). Comms/PR recruiter with financial-communications client base and interim/contract briefs. ACTION: register on interim/contract bench; flag financial-sector specialism.",
    contacts: []
  },
  {
    name: "Mediabistro — Freelance / Contract Senior Communications Roles",
    website: "https://www.mediabistro.com",
    pipeline: "pr-freelance",
    industry: "Media & communications job board",
    location: "Remote / US",
    fundingStage: "n/a",
    fitScore: 35,
    intentScore: 40,
    vertical: "pr",
    subvertical: "comms",
    engagementModel: "freelance",
    buyerType: "operating-company",
    compensationText: "Varies by posting (contract / freelance)",
    remoteFlag: "remote",
    employmentTypeRaw: "Freelance / contract (per posting)",
    urgencyScore: 62,
    source: "Web search / Mediabistro (marketing-communications, freelance filter)",
    sourceUrl: "https://www.mediabistro.com/jobs/openings/marketing-and-communications/freelance/",
    notes: "Grade B (combined 75). Best source this run for fresh, dated, named end-client contract comms postings. ACTION: monitor the freelance/contract marketing-communications filter weekly and apply directly; feed named clients into next scrape.",
    contacts: []
  },
  {
    name: "Fractional Jobs (fractionaljobs.io) — Fractional Marketing / Comms Board",
    website: "https://www.fractionaljobs.io",
    pipeline: "pr-freelance",
    industry: "Fractional work job board",
    location: "Remote / US",
    fundingStage: "n/a",
    fitScore: 30,
    intentScore: 30,
    vertical: "pr",
    subvertical: "comms",
    engagementModel: "fractional",
    buyerType: "operating-company",
    compensationText: "Fractional retainer (per posting)",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional (per posting)",
    urgencyScore: 50,
    source: "Web search (fractional job board)",
    sourceUrl: "https://www.fractionaljobs.io/",
    notes: "Grade B (combined 60). Lower-priority channel — mostly fractional marketing, lighter on pure PR/comms. ACTION: join talent pool and monitor for fractional comms/brand-narrative briefs.",
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
        scrapeDate: new Date("2026-07-08")
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
