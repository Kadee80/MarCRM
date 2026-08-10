/**
 * Import script: PR Freelance Scrape 2026-06-19
 * Run: node scripts/import-pr-freelance-2026-06-19.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "GSR Markets",
    website: "https://www.gsr.io",
    pipeline: "pr-freelance",
    industry: "Cryptocurrency / Digital Asset Market Making",
    location: "Remote (Global)",
    fundingStage: "Growth — established firm, $57M acquisition March 2026",
    fitScore: 45,
    intentScore: 50,
    vertical: "pr",
    subvertical: "comms",
    engagementModel: "contract",
    buyerType: "operating-company",
    compensationText: "$32k–$58k annualized (web3.career estimate)",
    remoteFlag: "remote",
    employmentTypeRaw: "Contract (maternity leave cover)",
    urgencyScore: 90,
    source: "web3.career",
    sourceUrl: "https://web3.career/contract-communications-manager-maternity-leave-cover-gsrmarkets/149666",
    notes: "GSR is a leading crypto market maker that recently acquired Autonomous and Architech for $57M (March 2026) to build a one-stop crypto capital markets and treasury platform. Contract role covering maternity leave — immediate backfill, defined term. Strong Grade A lead for Mark as a contract-ready senior comms operator. Apply via web3.career link.",
    contacts: []
  },
  {
    name: "Peregrine Communications",
    website: "https://www.peregrinecommunications.com",
    pipeline: "pr-freelance",
    industry: "Financial Services PR Agency (Hedge Funds, PE, VC, Asset Management)",
    location: "New York, NY (Chrysler Building) + London + LA",
    fundingStage: "Established private agency",
    fitScore: 50,
    intentScore: 30,
    vertical: "pr",
    subvertical: "investor-pr",
    engagementModel: "consultant",
    buyerType: "agency",
    compensationText: "",
    remoteFlag: "hybrid",
    employmentTypeRaw: "Affiliate consultant (network-based engagement)",
    urgencyScore: 60,
    source: "peregrinecommunications.com",
    sourceUrl: "https://www.peregrinecommunications.com/careers",
    notes: "Award-winning financial PR specialist, hedge funds, PE, VC, asset management, private credit. NYC (Chrysler Building) + London + LA. Explicitly uses 'affiliated communications consultants' for global capacity. 7+ open staff roles = active growth. Co-CEOs: Max Hilton and Josh Cole. EVP US: Mary Beth Kissane. Phone: +1 917 970 8842. Approach as affiliate consultant, NOT for staff role.",
    contacts: [
      {
        name: "Max Hilton",
        title: "Co-CEO",
        email: "",
        linkedin: ""
      },
      {
        name: "Mary Beth Kissane",
        title: "EVP, Head of Client Services, US",
        email: "",
        linkedin: ""
      }
    ]
  },
  {
    name: "Gregory Agency",
    website: "https://gregoryagency.com",
    pipeline: "pr-freelance",
    industry: "Financial Services / B2B PR Agency",
    location: "New York, NY + Ardmore PA + Boston + London",
    fundingStage: "Established (private, top-40 PR agency)",
    fitScore: 45,
    intentScore: 28,
    vertical: "pr",
    subvertical: "comms",
    engagementModel: "consultant",
    buyerType: "agency",
    compensationText: "",
    remoteFlag: "hybrid",
    employmentTypeRaw: "Overflow consultant (no posted role — proactive outreach)",
    urgencyScore: 55,
    source: "gregoryagency.com",
    sourceUrl: "https://gregoryagency.com/careers/",
    notes: "Formerly BackBay Communications (merged with Gregory FCA). Named PR Agency of the Year 2026 by PR Daily. Deep financial services practice: Monroe Capital, Prime Capital Financial, NewSquare Capital case studies. NYC office: 200 West 41st St, Floor 12. Post-award period = ideal window to pitch overflow consulting capacity. No freelance role posted — approach proactively.",
    contacts: []
  },
  {
    name: "Merkle Science",
    website: "https://merklescience.com",
    pipeline: "pr-freelance",
    industry: "Blockchain Compliance / Fintech (Cryptocurrency Intelligence)",
    location: "New York, NY (hybrid)",
    fundingStage: "Series B+ ($27M raised — SIG, DCG, GGV, Kenetic, Republic)",
    fitScore: 45,
    intentScore: 15,
    vertical: "pr",
    subvertical: "comms",
    engagementModel: "freelance",
    buyerType: "startup",
    compensationText: "",
    remoteFlag: "hybrid",
    employmentTypeRaw: "Full-time posting (pitch as fractional/contract)",
    urgencyScore: 40,
    source: "builtin.com",
    sourceUrl: "https://builtin.com/job/pr-content-manager/2358531",
    notes: "VC-backed blockchain compliance company serving financial institutions, law enforcement, and government agencies. Team from Bank of America, PayPal, Thomson Reuters. Role reposted 16 days — approach as fractional/contract option rather than competing for FTE. Apply: https://jobs.lever.co/merklescience/dee341bf-44e1-4fca-9733-a7b6e4250c0c/apply",
    contacts: []
  },
  {
    name: "SBC Performance",
    website: "https://sbc-performance.com",
    pipeline: "pr-freelance",
    industry: "AdTech / Digital Marketing Agency",
    location: "Remote (US market focus)",
    fundingStage: "Early stage (founded 2023, 18 employees)",
    fitScore: 30,
    intentScore: 25,
    vertical: "pr",
    subvertical: "comms",
    engagementModel: "contract",
    buyerType: "agency",
    compensationText: "",
    remoteFlag: "remote",
    employmentTypeRaw: "Specialist (employment type unspecified)",
    urgencyScore: 65,
    source: "builtin.com",
    sourceUrl: "https://builtin.com/job/senior-marcom-specialist-pr-specialist/9473542",
    notes: "Small Prague-based digital ad agency (TikTok/Google/Meta partnerships) seeking B2B PR/comms specialist for US market. Reposted 2 days ago — freshest active posting this week. Low sector fit (AdTech vs. financial services) but role is PR/comms-forward with media placements and thought leadership. Grade C. Apply: https://sbc-performance.breezy.hr/p/8142699970ed01-senior-marcom-specialist-pr-specialist",
    contacts: []
  }
];

async function main() {
  console.log(`\n🚀 Starting import: PR Freelance Scrape 2026-06-19`);
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
        // Extended PR freelance fields
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
        scrapeDate: new Date('2026-06-19'),
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
