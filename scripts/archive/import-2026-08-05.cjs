/**
 * Import script: Daily Scrape 2026-08-05
 * Run: node scripts/import-2026-08-05.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 *
 * NOTE: Bunkerhill Health, aVenture, Tower Legal Solutions, and Go Fractional are already in the CRM
 * and are handled in the markdown report's signal-refresh section. They are intentionally NOT in this
 * insert list to avoid duplicates. Update their scores/notes via a scoring pass, not via this import.
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const SCRAPE_DATE = new Date("2026-08-05");

const leads = [
  {
    name: "Balance Theory",
    website: "",
    pipeline: "pr-marketing",
    industry: "Cybersecurity / AI-native platform for enterprise security investment decisions (CISO spend management).",
    location: "United States",
    fundingStage: "Series A — $19M (Aug 1, 2026). Led by SYN Ventures; DataTribe and TEDCO participating.",
    fitScore: 43,
    intentScore: 41,
    vertical: "",
    subvertical: "",
    engagementModel: "",
    buyerType: "",
    compensationText: "",
    remoteFlag: "",
    employmentTypeRaw: "",
    urgencyScore: 0,
    source: "Pulse 2.0 / BusinessWire",
    sourceUrl: "https://pulse2.com/balance-theory-raises-19-million-to-reinvent-how-enterprises-manage-cybersecurity-investments/",
    notes: "Grade A (84). Top new lead. Fresh Series A + explicit GTM-acceleration = open comms/narrative window. Cyber/AI is tech-adjacent to core FS/tech thesis. ACTION: post-Series A narrative + earned-media sprint; pitch CEO Greg Baker. CONFIRM domain + comms DM before outreach.",
    contacts: [
      { name: "Greg Baker", title: "Co-Founder & CEO", email: null, linkedin: null },
      { name: "Dan Burns", title: "Executive Chairman (founder of Accuvant, ex-CEO Optiv)", email: null, linkedin: null }
    ]
  },
  {
    name: "Radar",
    website: "",
    pipeline: "pr-marketing",
    industry: "Applied AI (enterprise). $170M Series B at ~$1B valuation.",
    location: "United States",
    fundingStage: "Series B — $170M at ~$1B valuation. Co-led by Gideon Strategic Partners and Nimble Partners.",
    fitScore: 33,
    intentScore: 36,
    vertical: "",
    subvertical: "",
    engagementModel: "",
    buyerType: "",
    compensationText: "",
    remoteFlag: "",
    employmentTypeRaw: "",
    urgencyScore: 0,
    source: "Crescendo AI (VC deals tracker)",
    sourceUrl: "https://www.crescendo.ai/news/latest-vc-investment-deals-in-ai-startups",
    notes: "Grade B (69). Strong funding trigger but likely beyond boutique-agency ICP ($1B valuation → in-house/large agency); fit scored down on size/budget. ACTION: opportunistic only. CONFIRM details (aggregator-sourced): exact entity, sector, HQ.",
    contacts: []
  },
  {
    name: "PsychPlus",
    website: "https://www.psychplus.com",
    pipeline: "legal-freelance",
    industry: "Mental-health / healthtech provider network. Hiring a fractional General Counsel.",
    location: "Remote (USA)",
    fundingStage: "",
    fitScore: 30,
    intentScore: 40,
    vertical: "legal",
    subvertical: "GC",
    engagementModel: "fractional",
    buyerType: "operating-company",
    compensationText: "$150 - $200 / hr",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional General Counsel, 10-20 hrs/wk",
    urgencyScore: 55,
    source: "Fractional Jobs",
    sourceUrl: "https://www.fractionaljobs.io/jobs/general-counsel-at-psychplus",
    notes: "Grade B (70). Not fund-focused (healthtech) so fit capped at 30, but excellent engagement/remote/comp intent. Posted ~Jul 13 — still live, not within 72h. ACTION: direct fractional-GC pitch on commercial/corporate/governance scope.",
    contacts: [
      { name: null, title: "Founder / hiring lead (via Fractional Jobs)", email: null, linkedin: null }
    ]
  },
  {
    name: "AltaML",
    website: "https://www.altaml.com",
    pipeline: "legal-freelance",
    industry: "Applied-AI / enterprise software services. Hiring a fractional Director of Legal.",
    location: "Hybrid (Calgary, Canada)",
    fundingStage: "",
    fitScore: 20,
    intentScore: 35,
    vertical: "legal",
    subvertical: "corporate",
    engagementModel: "fractional",
    buyerType: "operating-company",
    compensationText: "",
    remoteFlag: "hybrid",
    employmentTypeRaw: "Fractional Director of Legal, 16-24 hrs/wk",
    urgencyScore: 45,
    source: "Fractional Jobs",
    sourceUrl: "https://www.fractionaljobs.io/jobs/director-of-legal-at-altaml",
    notes: "Grade C (55). Canadian jurisdiction + hybrid-onsite lean lowers fit; comp not stated. Corporate/commercial engagement on-thesis. ACTION: light-touch fractional pitch; deprioritize vs PsychPlus.",
    contacts: [
      { name: null, title: "Legal / People lead (via Fractional Jobs)", email: null, linkedin: null }
    ]
  },
  {
    name: "Zy Media Group",
    website: "",
    pipeline: "pr-freelance",
    industry: "Media / marketing-services firm. Hiring a Senior Communications & PR Strategy Advisor (contract).",
    location: "Remote (Baltimore-based)",
    fundingStage: "",
    fitScore: 30,
    intentScore: 30,
    vertical: "pr",
    subvertical: "comms",
    engagementModel: "contract",
    buyerType: "agency",
    compensationText: "$60/hr+",
    remoteFlag: "remote",
    employmentTypeRaw: "Contract / advisory (Senior Communications & PR Strategy Advisor)",
    urgencyScore: 40,
    source: "Idealist",
    sourceUrl: "https://www.idealist.org/en/consultant-job/27da977c3d0d476289e4c50e09fa61ff-senior-communications-and-pr-strategy-advisor-zy-media-group-baltimore",
    notes: "Grade C/B (60). Clean PR/comms advisory + contract engagement, but sector isn't FS (media firm) so sector-fit is 0. Best angle: white-label/overflow execution for the agency. ACTION: contract PR-advisory pitch.",
    contacts: [
      { name: null, title: "Hiring contact (via Idealist)", email: null, linkedin: null }
    ]
  },
  {
    name: "Curiosity (Fund II)",
    website: "",
    pipeline: "fund-formation",
    industry: "Venture capital — emerging manager backing vertical applied AI at pre-seed/seed across Northern Europe.",
    location: "Amsterdam, Netherlands",
    fundingStage: "Fund II — €17M first close (target €30-40M)",
    fitScore: 38,
    intentScore: 22,
    vertical: "",
    subvertical: "",
    engagementModel: "",
    buyerType: "fund",
    compensationText: "",
    remoteFlag: "",
    employmentTypeRaw: "",
    urgencyScore: 25,
    source: "Fund Momentum / FI.co (emerging VC first closes)",
    sourceUrl: "https://fundmomentum.vc/blog/category/fund-announcements",
    notes: "Grade C (60), watchlist. EU jurisdiction + completed first close → counsel likely already retained, window closing. Kept for jurisdiction-fit tracking. ACTION: monitor for US/US-LP vehicle or Fund III; low priority now.",
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
        scrapeDate: SCRAPE_DATE
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
