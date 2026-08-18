/**
 * Import script: PR Freelance Scrape 2026-06-22
 * Run: node scripts/import-pr-freelance-2026-06-22.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "Torry Harris Integration Solutions",
    website: "https://www.torryharris.com",
    pipeline: "pr-freelance",
    industry: "B2B Enterprise SaaS / IT Integration",
    location: "Remote (US-based required)",
    fundingStage: "Established / Global IT Firm",
    fitScore: 40,
    intentScore: 40,
    vertical: "pr",
    subvertical: "comms",
    engagementModel: "freelance",
    buyerType: "operating-company",
    compensationText: "$40–$50/hour, 15–20 hours per week, 6+ month duration",
    remoteFlag: "remote",
    employmentTypeRaw: "Freelance",
    urgencyScore: 75,
    source: "JobLeads",
    sourceUrl: "https://www.jobleads.com/us/job/remote-us-pr-communications-lead-b2b-saas--united-states--e1a17fc71561786e886eecd8d3421d945",
    notes: "Torry Harris Integration Solutions (THIS) is a global IT specialist in B2B SaaS/enterprise software. Freelance PR & Communications Manager role: daily liaison with US PR agency, technical narrative translation, 5-8+ years B2B SaaS PR required. $40-50/hr, 15-20 hrs/week, 6+ months, 100% remote. Posted April 2026 and still open — strong urgency signal. Apply via JobLeads or careers.torryharris.com. Top-priority lead this run.",
    contacts: []
  },
  {
    name: "LaunchSquad",
    website: "https://launchsquad.com",
    pipeline: "pr-freelance",
    industry: "B2B Technology PR Agency",
    location: "Remote (US)",
    fundingStage: "Independent Agency (est. 2000)",
    fitScore: 35,
    intentScore: 40,
    vertical: "pr",
    subvertical: "media-relations",
    engagementModel: "contract",
    buyerType: "agency",
    compensationText: "$3,000–$6,000/month",
    remoteFlag: "remote",
    employmentTypeRaw: "Contract (W-2 contractor)",
    urgencyScore: 60,
    source: "Remotive",
    sourceUrl: "https://remotive.com/remote/jobs/writing/writer-public-relations-communications-4473257",
    notes: "Award-winning B2B tech PR agency (est. 2000, SF/NY/Boston/Chicago). Contract-to-hire role: Writer, PR & Communications. W-2 contractor for 3-6 months with path to full-time. $3-6k/month. Earned media, press releases, bylines, thought leadership, executive LinkedIn content. B2B tech focus (AI, data, cybersecurity). Apply via Lever: https://jobs.lever.co/launchsquad/b853390a-1438-4eab-99b8-eb61956205b4 — bring 2-3 press releases + bylines to portfolio.",
    contacts: []
  },
  {
    name: "PR Volt",
    website: "https://lightspeedpr.com",
    pipeline: "pr-freelance",
    industry: "PR Tech / Startup PR Agency",
    location: "Remote (100%)",
    fundingStage: "Bootstrapped / Independent (est. 2017)",
    fitScore: 40,
    intentScore: 35,
    vertical: "pr",
    subvertical: "media-relations",
    engagementModel: "freelance",
    buyerType: "agency",
    compensationText: "Pay by deliverable, ~$40/hr average, 20-40 hrs/week",
    remoteFlag: "remote",
    employmentTypeRaw: "Independent Contractor",
    urgencyScore: 55,
    source: "Built In / Workable",
    sourceUrl: "https://builtin.com/job/public-relations-campaign-manager-100-remote/1898633",
    notes: "PR tech agency focused on making A-list PR accessible to startups. Campaign Manager role: independent contractor, pay by deliverable (~$40/hr), 20-40 hrs/week, 100% remote. Media list development, pitching, client campaign management. B2C/B2B tech (lifestyle, CPG, food/bev + B2B). Weaker sector fit but true 1099 freelance structure. Good bridge/income-diversification play. Apply via Workable: https://apply.workable.com/pr-volt/ — also listed on WeWorkRemotely and Remotive.",
    contacts: []
  },
  {
    name: "Caliber Corporate Advisers",
    website: "https://www.calibercorporate.com",
    pipeline: "pr-freelance",
    industry: "Financial Services & Fintech PR Agency",
    location: "Remote (US + Europe)",
    fundingStage: "Independent Agency",
    fitScore: 45,
    intentScore: 25,
    vertical: "pr",
    subvertical: "comms",
    engagementModel: "consultant",
    buyerType: "agency",
    compensationText: "$120,000–$150,000 base salary + commission + bonuses (full-time posted rate); freelance rate TBD",
    remoteFlag: "remote",
    employmentTypeRaw: "Full-time (posted); target for freelance/fractional pitch",
    urgencyScore: 45,
    source: "Mediabistro",
    sourceUrl: "https://www.mediabistro.com/jobs/1644721993-caliber-corporate-advisers-is-hiring-director-public-relations-in-new-york",
    notes: "BEST SECTOR FIT LEAD: Caliber exclusively serves financial services, fintech, insurtech, proptech. Director of PR role posted (full-time, $120-150k). Strategy: (1) Apply to Director role via Mediabistro/ZipRecruiter; (2) ALSO pitch directly to Caliber leadership for freelance/overflow capacity. Contact via calibercorporate.com/team/. Deep fintech/financial services media relationships required — 12+ years experience. Remote workplace model. ZipRecruiter: https://www.ziprecruiter.com/c/Caliber-Corporate-Advisers/Job/Director-(Public-Relations)/-in-New-York,NY?jid=6ee1a7ad34c71304",
    contacts: []
  },
  {
    name: "Lightspeed PR/Marketing",
    website: "https://lightspeedpr.com",
    pipeline: "pr-freelance",
    industry: "B2B/B2C Technology PR Agency",
    location: "Remote (100%, since 2013)",
    fundingStage: "Independent Agency (est. 2013)",
    fitScore: 40,
    intentScore: 30,
    vertical: "pr",
    subvertical: "media-relations",
    engagementModel: "contract",
    buyerType: "agency",
    compensationText: "Hourly rate commensurate with experience (not specified)",
    remoteFlag: "remote",
    employmentTypeRaw: "Contractor (hourly)",
    urgencyScore: 40,
    source: "LinkedIn",
    sourceUrl: "https://www.linkedin.com/jobs/view/public-relations-pr-freelancer-contractor-tech-pr-remote-at-lightspeed-pr-marketing-3164832752",
    notes: "Remote-native B2B/B2C tech PR agency since 2013. Actively builds freelance bench for client overflow. Client roster: Consumer Electronics, HealthTech, Medical Devices, Neurotech, AR/VR, Robotics, Smart Home. LinkedIn posting may be evergreen — reach out directly via lightspeedpr.com. Agency overflow model ideal for Mark's hourly/retainer flow. Not finance-focused but strong for PR execution volume and bench income.",
    contacts: []
  }
];

async function main() {
  console.log(`\n🚀 Starting import: PR Freelance Scrape 2026-06-22`);
  console.log(`   Leads to process: ${leads.length}\n`);

  let inserted = 0;
  let skipped = 0;

  for (const lead of leads) {
    // Deduplication: skip if company name already exists
    const existing = await prisma.company.findFirst({
      where: { name: lead.name }
    });

    if (existing) {
      console.log(`  ⏭  Skipping (exists): ${lead.name}`);
      skipped++;
      continue;
    }

    // Create company
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
        notes: lead.notes,
        // Extended PR freelance fields (conditionally applied based on schema)
        ...(prisma.company.fields?.vertical !== undefined ? {
          vertical: lead.vertical,
          subvertical: lead.subvertical,
          engagementModel: lead.engagementModel,
          buyerType: lead.buyerType,
          compensationText: lead.compensationText,
          remoteFlag: lead.remoteFlag,
          employmentTypeRaw: lead.employmentTypeRaw,
          urgencyScore: lead.urgencyScore,
        } : {})
      }
    });

    // Create contacts if any
    if (lead.contacts && lead.contacts.length > 0) {
      for (const contact of lead.contacts) {
        if (contact.email || contact.name) {
          await prisma.contact.create({
            data: {
              name: contact.name || '',
              title: contact.title || '',
              email: contact.email || '',
              linkedin: contact.linkedin || '',
              companyId: company.id
            }
          });
        }
      }
    }

    // Create scrape result
    await prisma.scrapeResult.create({
      data: {
        companyId: company.id,
        scrapeDate: new Date('2026-06-22'),
        scrapeType: 'pr-freelance',
        source: lead.source,
        sourceUrl: lead.sourceUrl,
        fitScore: lead.fitScore,
        intentScore: lead.intentScore,
        pipeline: lead.pipeline,
        rawData: JSON.stringify({
          vertical: lead.vertical,
          subvertical: lead.subvertical,
          engagementModel: lead.engagementModel,
          buyerType: lead.buyerType,
          compensationText: lead.compensationText,
          remoteFlag: lead.remoteFlag,
          employmentTypeRaw: lead.employmentTypeRaw,
          urgencyScore: lead.urgencyScore,
          notes: lead.notes
        })
      }
    });

    console.log(`  ✅ Inserted: ${lead.name} (fit:${lead.fitScore} intent:${lead.intentScore} total:${lead.fitScore + lead.intentScore})`);
    inserted++;
  }

  console.log(`\n📊 Import complete:`);
  console.log(`   Inserted: ${inserted}`);
  console.log(`   Skipped (duplicates): ${skipped}`);
  console.log(`   Total processed: ${leads.length}\n`);

  await prisma.$disconnect();
}

main().catch(async (err) => {
  console.error('Import failed:', err);
  await prisma.$disconnect();
  process.exit(1);
});
