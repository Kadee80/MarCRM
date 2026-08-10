/**
 * Import script: PR Freelance Scrape 2026-06-30
 * Run: node scripts/import-pr-freelance-2026-06-30.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "The Work Crowd (Fintech & Financial PR network)",
    website: "https://theworkcrowd.com/fintech-pr",
    pipeline: "pr-freelance",
    industry: "Vetted freelance/interim network placing PR & comms experts into fintech, asset management and financial-services clients",
    location: "Remote (global; US/UK clients)",
    fundingStage: "Freelance talent marketplace / staffing network",
    fitScore: 50,
    intentScore: 30,
    vertical: "pr",
    subvertical: "media-relations",
    engagementModel: "freelance",
    buyerType: "staffing",
    compensationText: "Project / retainer / day-rate, set per client brief (not published)",
    remoteFlag: "remote",
    employmentTypeRaw: "Freelance / interim (marketplace)",
    urgencyScore: 35,
    source: "The Work Crowd (web search)",
    sourceUrl: "https://theworkcrowd.com/fintech-pr",
    notes: "CHANNEL, not a single posting — but the best-fit item this week for Mark's ICP. Vetted marketplace placing freelance/interim PR & comms operators into fintech, asset-management and financial-services clients on retainer/project/day-rate. Graded A on ICP value of registering. ACTION: build a freelancer profile positioning Mark as a senior financial-PR/IR-narrative operator (media relations + executive comms + investor narrative). Recurring white-label/overflow brief flow. Caveat: marketplace registration — no named hiring contact, no dated urgency.",
    contacts: []
  },
  {
    name: "VOW for Girls",
    website: "https://vowforgirls.org",
    pipeline: "pr-freelance",
    industry: "Nonprofit / global girls' rights and ending child marriage",
    location: "Remote (USA)",
    fundingStage: "Established nonprofit (foundation-backed)",
    fitScore: 35,
    intentScore: 35,
    vertical: "pr",
    subvertical: "executive-comms",
    engagementModel: "fractional",
    buyerType: "operating-company",
    compensationText: "Not published; comparable fractional comms roles on the board list $80-100/hr",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional / part-time (up to 3 days/week)",
    urgencyScore: 50,
    source: "Fractional Jobs (fractionaljobs.io)",
    sourceUrl: "https://www.fractionaljobs.io/jobs/marketing-communications-leader-at-vow",
    notes: "Clean fractional comms-leadership seat (up to 3 days/week, remote) with a named org and a defined transitional need. CAVEAT: nonprofit/social-impact — outside Mark's finance/PE/fintech core; role blends marketing with communications. Pursue for a steady part-time anchor retainer. Pitch: senior interim comms leader who stands up strategy and runs day-to-day media/executive comms through a leadership transition. Verify exact post date and comp before outreach.",
    contacts: []
  }
];

async function main() {
  console.log(`Starting PR Freelance import — 2026-06-30 (${leads.length} leads)`);
  let inserted = 0;
  let skipped = 0;

  for (const lead of leads) {
    const { contacts, sourceUrl, ...companyData } = lead;

    // Dedup by company name
    const existing = await prisma.company.findFirst({
      where: { name: companyData.name }
    });

    if (existing) {
      console.log(`  SKIP (exists): ${companyData.name}`);
      skipped++;
      continue;
    }

    // Insert company
    const company = await prisma.company.create({
      data: {
        ...companyData,
        fitDetails: JSON.stringify({
          pr_remit: true,
          sourceUrl: sourceUrl
        }),
        intentDetails: JSON.stringify({
          engagement_model: companyData.engagementModel,
          remote_flex: companyData.remoteFlag,
          apply_path: sourceUrl
        }),
        lastActivity: new Date().toISOString().split('T')[0]
      }
    });

    // Insert contacts
    for (const contact of (contacts || [])) {
      await prisma.contact.create({
        data: {
          name: contact.name,
          title: contact.title || '',
          email: contact.email || '',
          linkedin: contact.linkedin || '',
          companyId: company.id
        }
      });
    }

    // Insert ScrapeResult
    await prisma.scrapeResult.create({
      data: {
        url: sourceUrl,
        source: companyData.source,
        pipeline: 'pr-freelance',
        resultData: JSON.stringify({ ...companyData, sourceUrl }),
        matchedSignals: JSON.stringify([
          companyData.engagementModel,
          companyData.subvertical,
          companyData.buyerType,
          companyData.remoteFlag
        ].filter(Boolean)),
        imported: true
      }
    });

    console.log(`  INSERTED: ${companyData.name} (fit: ${companyData.fitScore}, intent: ${companyData.intentScore})`);
    inserted++;
  }

  console.log(`\nDone. Inserted: ${inserted}, Skipped: ${skipped}`);
}

main()
  .catch((e) => {
    console.error('Import error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
