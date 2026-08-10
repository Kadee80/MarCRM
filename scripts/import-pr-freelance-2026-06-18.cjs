/**
 * Import script: PR Freelance Scrape 2026-06-18
 * Run: node scripts/import-pr-freelance-2026-06-18.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "HKA Marketing Communications",
    website: "https://hkamarketing.com",
    pipeline: "pr-freelance",
    industry: "B2B Technology / PR Agency",
    location: "Tustin, CA (Hybrid)",
    fundingStage: "Independent agency",
    fitScore: 50,
    intentScore: 35,
    vertical: "pr",
    subvertical: "media-relations",
    engagementModel: "freelance",
    buyerType: "agency",
    compensationText: "Not stated",
    remoteFlag: "hybrid",
    employmentTypeRaw: "Freelance",
    urgencyScore: 60,
    source: "Indeed",
    sourceUrl: "https://www.indeed.com/rc/clk?jk=f486a60027be05b7",
    notes: "Agency expanding into quantum tech PR. Freelance media pitching and content writing role. Hybrid Tustin CA. Strong B2B tech sector fit. Active posting June 2026.",
    contacts: []
  },
  {
    name: "Mission North",
    website: "https://www.missionnorth.com",
    pipeline: "pr-freelance",
    industry: "Integrated Communications Agency",
    location: "San Francisco, CA / New York, NY / Portland, OR (Remote)",
    fundingStage: "Independent agency",
    fitScore: 50,
    intentScore: 35,
    vertical: "pr",
    subvertical: "comms",
    engagementModel: "freelance",
    buyerType: "agency",
    compensationText: "Not stated",
    remoteFlag: "remote",
    employmentTypeRaw: "Freelance / Network",
    urgencyScore: 55,
    source: "Mission North direct",
    sourceUrl: "https://www.missionnorth.com/always-hiring",
    notes: "Always-hiring freelance talent network. Tech/B2B client roster. Strong long-term channel — apply to network, not just a job. Fully remote.",
    contacts: []
  },
  {
    name: "Development Counsellors International",
    website: "https://aboutdci.com",
    pipeline: "pr-freelance",
    industry: "Economic Development / Place Branding Agency",
    location: "Chicago, IL (~10 hrs/week)",
    fundingStage: "Independent agency (65+ years)",
    fitScore: 35,
    intentScore: 40,
    vertical: "pr",
    subvertical: "media-relations",
    engagementModel: "freelance",
    buyerType: "agency",
    compensationText: "$50–$75/hr",
    remoteFlag: "",
    employmentTypeRaw: "Freelance",
    urgencyScore: 70,
    source: "Indeed",
    sourceUrl: "https://www.indeed.com/rc/clk?jk=1f8b6261feb8be31",
    notes: "Freelance publicist ~10 hrs/wk, $50-75/hr. Chicago-based. 5+ years agency media relations required. Stackable income play. Apply quickly.",
    contacts: []
  },
  {
    name: "BPM-PR Firm",
    website: "https://www.bpm-prfirm.com",
    pipeline: "pr-freelance",
    industry: "Fashion / Lifestyle / Tech PR Agency",
    location: "Remote (NYC or LA base preferred)",
    fundingStage: "Independent boutique agency",
    fitScore: 35,
    intentScore: 40,
    vertical: "pr",
    subvertical: "comms",
    engagementModel: "contract",
    buyerType: "agency",
    compensationText: "~$65K/year equivalent for Senior Publicist tier",
    remoteFlag: "remote",
    employmentTypeRaw: "Contract (part-time, contract-to-perm)",
    urgencyScore: 65,
    source: "ZipRecruiter / BPM-PR Firm careers",
    sourceUrl: "https://www.bpm-prfirm.com/best-public-relations-career-opportunities/",
    notes: "Part-time contract-to-perm PR Director, fully remote. Direct email apply: jobs@bpm-prfirm.com subject PR DIRECTOR - PART-TIME CONTRACT. No ATS friction.",
    contacts: [
      {
        name: "",
        title: "Hiring",
        email: "jobs@bpm-prfirm.com",
        linkedin: ""
      }
    ]
  },
  {
    name: "Creative Circle",
    website: "https://www.creativecircle.com",
    pipeline: "pr-freelance",
    industry: "Creative / Marketing Staffing",
    location: "Remote (US)",
    fundingStage: "Established staffing firm (Everforth)",
    fitScore: 30,
    intentScore: 40,
    vertical: "pr",
    subvertical: "comms",
    engagementModel: "freelance",
    buyerType: "staffing",
    compensationText: "Not stated",
    remoteFlag: "remote",
    employmentTypeRaw: "Freelance / Part-Time",
    urgencyScore: 60,
    source: "LinkedIn",
    sourceUrl: "https://www.linkedin.com/jobs/view/pr-communications-consultant-part-time-remote-freelance-at-creative-circle-1067507814",
    notes: "Staffing firm placing PR/comms consultants as W-2 freelancers. Remote, part-time. Register in talent network beyond this posting. End client undisclosed.",
    contacts: []
  },
  {
    name: "BarkleyOKRP",
    website: "https://barkleyokrp.com",
    pipeline: "pr-freelance",
    industry: "Full-Service Advertising Agency (B Corp)",
    location: "Kansas City, MO / New York, NY",
    fundingStage: "Independent agency",
    fitScore: 35,
    intentScore: 30,
    vertical: "pr",
    subvertical: "media-relations",
    engagementModel: "freelance",
    buyerType: "agency",
    compensationText: "Not stated",
    remoteFlag: "",
    employmentTypeRaw: "Contract, Freelance",
    urgencyScore: 45,
    source: "Indeed / AgHires",
    sourceUrl: "https://aghires.com/career/388615/freelance-contract-director-public-relations-agriculture-client-in-missouri-kansas-city",
    notes: "Freelance/contract PR Director for agriculture client. Requires deep ag trade media background. Only pursue if ag sector credentials exist.",
    contacts: []
  },
  {
    name: "Interdependence Public Relations",
    website: "https://interdependence.com",
    pipeline: "pr-freelance",
    industry: "Integrated Communications / AI-augmented PR",
    location: "Remote (EST hours)",
    fundingStage: "Independent agency",
    fitScore: 30,
    intentScore: 30,
    vertical: "pr",
    subvertical: "media-relations",
    engagementModel: "freelance",
    buyerType: "agency",
    compensationText: "Not stated",
    remoteFlag: "remote",
    employmentTypeRaw: "Freelance / Part-Time / Full-Time",
    urgencyScore: 50,
    source: "RecruiterFlow / Interdependence",
    sourceUrl: "https://recruiterflow.com/interdependence/jobs/594",
    notes: "Specific posting requires Germany healthcare media contacts — not a fit. Apply to general talent network for tech/biotech/B2B practice lines instead. Remote EST.",
    contacts: []
  },
  {
    name: "GSD&M",
    website: "https://gsdm.com",
    pipeline: "pr-freelance",
    industry: "Advertising / Integrated Agency (Omnicom)",
    location: "Austin, TX (Downtown)",
    fundingStage: "Omnicom subsidiary",
    fitScore: 30,
    intentScore: 30,
    vertical: "pr",
    subvertical: "comms",
    engagementModel: "interim",
    buyerType: "operating-company",
    compensationText: "Not stated",
    remoteFlag: "onsite",
    employmentTypeRaw: "Temporary (Temp/Freelance)",
    urgencyScore: 55,
    source: "Indeed",
    sourceUrl: "https://www.indeed.com/rc/clk?jk=e1bbf9636354e4a5",
    notes: "Omnicom agency, Group Director Comms Strategy (TEMP) role. Austin TX onsite. Temp with potential FT conversion. High-profile agency credit. Pursue only if Austin-flexible.",
    contacts: []
  }
];

async function main() {
  console.log(`\n🚀 Starting import: PR Freelance Scrape 2026-06-18`);
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
        industry: lead.industry,
        location: lead.location,
        fundingStage: lead.fundingStage,
        pipeline: lead.pipeline,
        fitScore: lead.fitScore,
        intentScore: lead.intentScore,
        notes: lead.notes,
        // Extended PR freelance fields (stored as metadata if schema supports)
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
        scrapeDate: new Date('2026-06-18'),
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
