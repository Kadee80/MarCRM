/**
 * Import script: PR Freelance Scrape 2026-07-09
 * Run: node scripts/import-pr-freelance-2026-07-09.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "Nexscient — Manager of Investor Relations (Pre-IPO / NASDAQ Uplisting)",
    website: "https://www.glassdoor.com/Job/remote-investor-relations-jobs-SRCH_IL.0,6_IS11047_KO7,25.htm",
    pipeline: "pr-freelance",
    industry: "Pre-IPO growth company (capital markets / financial PR)",
    location: "Remote / US",
    fundingStage: "Pre-IPO (Reg D private placement, planned NASDAQ uplisting)",
    fitScore: 45,
    intentScore: 33,
    vertical: "pr",
    subvertical: "investor-pr",
    engagementModel: "contract",
    buyerType: "pre-ipo",
    compensationText: "Not stated; 3–5 yrs IR/financial-PR experience required",
    remoteFlag: "remote",
    employmentTypeRaw: "Manager, Investor Relations (remote) — FT vs. contract unclear",
    urgencyScore: 78,
    source: "Web search (Glassdoor / Indeed indexed, July 2026)",
    sourceUrl: "https://www.glassdoor.com/Job/remote-investor-relations-jobs-SRCH_IL.0,6_IS11047_KO7,25.htm",
    notes: "Grade B (combined 78). Best true end-client fit this run — pre-IPO financial-PR/IR narrative work (press releases, 8-K narrative, shareholder letters) mid-raise. ACTION: pitch as senior fractional IR/financial-comms operator to stand up the IR function; confirm contract/retainer vs. FTE.",
    contacts: []
  },
  {
    name: "Mission North — Freelance Communications Network (Bench)",
    website: "https://www.missionnorth.com",
    pipeline: "pr-freelance",
    industry: "Integrated strategic communications agency (benefit corp)",
    location: "Remote / US (NYC / SF hubs)",
    fundingStage: "n/a",
    fitScore: 35,
    intentScore: 35,
    vertical: "pr",
    subvertical: "agency-overflow",
    engagementModel: "freelance",
    buyerType: "agency",
    compensationText: "Project-based freelance; rate by engagement",
    remoteFlag: "remote",
    employmentTypeRaw: "Freelance / project-based network membership",
    urgencyScore: 55,
    source: "Web search (Built In NYC / Mission North careers)",
    sourceUrl: "https://www.builtinnyc.com/job/freelance-opportunities/7211354",
    notes: "Grade B (combined 70). Registerable agency bench for overflow/white-label execution; client base skews tech over finance. ACTION: apply and position as senior earned-media/exec-comms operator for overflow and launches.",
    contacts: []
  },
  {
    name: "GigX — Fractional Chief Communications Officer Marketplace",
    website: "https://gigx.com/experience/fractional-chief-communications-officer",
    pipeline: "pr-freelance",
    industry: "Fractional executive marketplace",
    location: "Remote / US",
    fundingStage: "n/a",
    fitScore: 35,
    intentScore: 30,
    vertical: "pr",
    subvertical: "executive-comms",
    engagementModel: "fractional",
    buyerType: "staffing",
    compensationText: "Fractional retainer / day-rate by engagement",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional CCO placement",
    urgencyScore: 50,
    source: "Web search (GigX fractional CCO)",
    sourceUrl: "https://gigx.com/experience/fractional-chief-communications-officer",
    notes: "Grade B (combined 65). Registerable fractional-CCO bench; sector-agnostic. ACTION: create a profile positioned for finance/PE-backed portfolio companies; complements GrowTal and Chameleon Collective benches already tracked.",
    contacts: []
  },
  {
    name: "Robert Half — Contract Investor Relations / Communications Placements",
    website: "https://www.roberthalf.com/us/en/jobs/all/investor-relations-specialist",
    pipeline: "pr-freelance",
    industry: "Professional staffing (finance & comms placements)",
    location: "Remote / US",
    fundingStage: "n/a",
    fitScore: 40,
    intentScore: 30,
    vertical: "pr",
    subvertical: "investor-pr",
    engagementModel: "contract",
    buyerType: "staffing",
    compensationText: "Contract IR specialist; $82k–$160k annualized range cited for contract IR roles",
    remoteFlag: "remote",
    employmentTypeRaw: "Contract / temporary (W-2 staffing)",
    urgencyScore: 48,
    source: "Web search (Robert Half / ZipRecruiter contract IR)",
    sourceUrl: "https://www.roberthalf.com/us/en/jobs/all/investor-relations-specialist",
    notes: "Grade B (combined 70). Channel lead: W-2 contract staffing (employmentTypeRaw) distinct from true freelance (engagementModel). ACTION: register for contract IR/financial-comms briefs as a fast-plug-in senior operator.",
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
        scrapeDate: new Date("2026-07-09")
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
