/**
 * Import script: Daily Scrape 2026-07-17
 * Run:      node scripts/import-2026-07-17.cjs
 * Preview:  node scripts/import-2026-07-17.cjs --dry-run
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const DRY_RUN = process.argv.includes('--dry-run');
const SCRAPE_DATE = new Date('2026-07-17');

const leads = [
  {
    name: "Oak",
    website: "https://www.oak.id/",
    pipeline: "pr-marketing",
    industry: "AI-native identity security — a unified identity operating system governing humans, machines and AI agents across the enterprise (agentic-era IAM)",
    location: "Tel Aviv, Israel & San Francisco, CA, US",
    fundingStage: "Seed ($60M, co-led by Accel, Greylock, CRV; Hetz Ventures, AlphaDrive Ventures + strategic angels; round closed late 2025, made public Jul 15, 2026 on product GA)",
    fitScore: 44,
    intentScore: 36,
    vertical: "",
    subvertical: "",
    engagementModel: "",
    buyerType: "",
    compensationText: "",
    remoteFlag: "",
    employmentTypeRaw: "",
    urgencyScore: 0,
    source: "TechStartups VC funding roundup Jul 15, 2026 + PR Newswire",
    sourceUrl: "https://www.prnewswire.com/news-releases/oak-raises-60m-in-seed-funding-to-build-the-ai-native-identity-operating-system-302826349.html",
    notes: "Grade A (80). Hottest net-new lead this cycle. Perfect launch trigger — out of stealth Jul 15 with $60M and product GA. Category-defining 'identity OS for the AI enterprise' story = ready-made thought-leadership + tier-1 security/enterprise-tech press program. Deep-pocketed seed can afford a retainer or launch sprint. CAVEAT: top-tier VC syndicate (Accel/Greylock/CRV) may already have PR — qualify before pitching. ACTION: pitch a category-creation narrative sprint ('own non-human identity') + analyst/press positioning tied to the stealth-emergence moment.",
    contacts: [
      { name: "", title: "Founder/CEO (serial founder w/ prior exits — sets category narrative)", email: "", linkedin: "" },
      { name: "", title: "Head of Marketing / Comms (likely unfilled at seed — opening for external positioning support)", email: "", linkedin: "" }
    ]
  },
  {
    name: "Cyclops",
    website: "https://www.cyclops.xyz/",
    pipeline: "pr-marketing",
    industry: "Fintech / stablecoin payments infrastructure — settlement, pay-ins and payouts purpose-built for merchants, processors and payments firms",
    location: "Miami, FL, US",
    fundingStage: "Series A ($20M, led by Nava Ventures; Castle Island Ventures, Coinbase Ventures, Circle, Lasagna Ventures, Global PayTech Ventures participating; announced Jul 15, 2026)",
    fitScore: 43,
    intentScore: 35,
    vertical: "",
    subvertical: "",
    engagementModel: "",
    buyerType: "",
    compensationText: "",
    remoteFlag: "",
    employmentTypeRaw: "",
    urgencyScore: 0,
    source: "TechStartups VC funding roundup Jul 15, 2026",
    sourceUrl: "https://techstartups.com/2026/07/15/venture-capital-startup-funding-roundup-july-15-2026-accel-crv-greylock-goldman-sachs-khosla-ventures-m13-and-nava-ventures/",
    notes: "Grade B (78). Pure-play FS/fintech fit — stablecoin payments infrastructure is squarely in the agency's ICP and rides a hot regulatory/news cycle. Series A stage = right size for a $5k-$25k/mo retainer; founders (ex-The Giving Block, ex-Shift4) are media-credible. ACTION: pitch an earned-media + thought-leadership program positioning Cyclops as the neutral B2B stablecoin-settlement layer for incumbents (Circle/Coinbase relationships give ready partnership hooks). Identify CEO/CMO decision-maker.",
    contacts: [
      { name: "", title: "Co-founder/CEO (ex-The Giving Block; ran crypto/stablecoin at Shift4)", email: "", linkedin: "" }
    ]
  },
  {
    name: "Beacon Security",
    website: "https://www.beaconsecurity.ai/",
    pipeline: "pr-marketing",
    industry: "Cybersecurity — 'context layer' / trusted data layer for agentic (AI-native) cyber defense; serves financial services, insurance and technology buyers",
    location: "New York, NY, US",
    fundingStage: "Seed ($13M, led by Notable Capital; Holly Ventures, AlphaDrive Ventures, SVCI, Jefferies Family Office + 60+ founders/CISOs; announced Jul 16, 2026)",
    fitScore: 43,
    intentScore: 35,
    vertical: "",
    subvertical: "",
    engagementModel: "",
    buyerType: "",
    compensationText: "",
    remoteFlag: "",
    employmentTypeRaw: "",
    urgencyScore: 0,
    source: "TechStartups VC funding roundup Jul 16, 2026 + TechStartups company post",
    sourceUrl: "https://techstartups.com/2026/07/16/beacon-security-raises-13m-seed-to-build-ai-powered-agentic-cybersecurity-platform/",
    notes: "Grade B (78). Strong FS-adjacent cyber lead: explicit financial-services/insurance customer base, a killer 300% H1 ARR growth stat, and a fresh $13M seed trigger. Seed budget is tighter (scored budget down) but a focused launch/thought-leadership sprint fits. ACTION: pitch a growth-story + agentic-security thought-leadership program leveraging the 300% ARR metric and the CISO angel network as reference sources; target CEO/founder as decision-maker.",
    contacts: [
      { name: "", title: "Co-founder/CEO", email: "", linkedin: "" }
    ]
  },
  {
    name: "Rime",
    website: "https://www.rime.ai/",
    pipeline: "pr-marketing",
    industry: "Voice AI — enterprise speech layer optimized for regulated, high-stakes workflows in healthcare and finance",
    location: "San Francisco, CA, US",
    fundingStage: "Series A ($24M, led by M13; Twilio Ventures, Corazon Capital, Unusual Ventures + existing investors; announced Jul 15, 2026)",
    fitScore: 40,
    intentScore: 32,
    vertical: "",
    subvertical: "",
    engagementModel: "",
    buyerType: "",
    compensationText: "",
    remoteFlag: "",
    employmentTypeRaw: "",
    urgencyScore: 0,
    source: "TechStartups VC funding roundup Jul 15, 2026",
    sourceUrl: "https://techstartups.com/2026/07/15/venture-capital-startup-funding-roundup-july-15-2026-accel-crv-greylock-goldman-sachs-khosla-ventures-m13-and-nava-ventures/",
    notes: "Grade B (72). Tech B2B with partial FS exposure (Upstart, regulated-finance use cases). Series A + strong logos (Mayo Clinic, Dialpad, Upstart, Asurion) = fundable proof. Crowded voice-AI category (ElevenLabs/Sierra) means the story needs sharp differentiation (regulated reliability). ACTION: pitch a differentiation-narrative program ('voice AI built for regulated finance & healthcare') anchored on the logos and the M13/Twilio raise.",
    contacts: [
      { name: "", title: "Founder/CEO", email: "", linkedin: "" }
    ]
  },
  {
    name: "Sable",
    website: "https://www.sable.ai/",
    pipeline: "pr-marketing",
    industry: "Enterprise AI — customer-facing 'AI employee' (Aidan) combining computer use, browser navigation, vision, voice and screen-share to run live product experiences (demos, onboarding, support)",
    location: "San Francisco, CA, US",
    fundingStage: "Venture round ($45M, led by Sequoia Capital & 8VC; BoxGroup, SV Angel, Valor Atreides AI Fund + angels; announced Jul 16, 2026)",
    fitScore: 39,
    intentScore: 32,
    vertical: "",
    subvertical: "",
    engagementModel: "",
    buyerType: "",
    compensationText: "",
    remoteFlag: "",
    employmentTypeRaw: "",
    urgencyScore: 0,
    source: "TechStartups VC funding roundup Jul 16, 2026",
    sourceUrl: "https://techstartups.com/2026/07/16/venture-capital-startup-funding-roundup-july-16-2026-8vc-accel-ark-invest-gv-khosla-ventures-mark-cuban-and-sequoia-capital/",
    notes: "Grade B (71). Tech B2B (not FS-specific), but exceptional early traction (live with Notion & Decagon <1yr from founding) and a differentiated 'customer-facing AI employee' story make it a strong earned-media candidate. CAVEAT: Sequoia/8VC companies frequently arrive with PR agencies already engaged — qualify hard before pitching. ACTION: if unrepped, pitch a category-definition + founder-profile program around the Notion/Decagon proof and the $45M raise.",
    contacts: [
      { name: "", title: "Founder/CEO", email: "", linkedin: "" }
    ]
  },
  {
    name: "Glacis Labs",
    website: "https://www.glacis.com/",
    pipeline: "pr-marketing",
    industry: "Crypto / digital-asset infrastructure — ZeroDelta multichain clearinghouse for institutional settlement and clearing across 40+ chains",
    location: "New York, NY, US",
    fundingStage: "Seed ($6.8M, led by Lightspeed Faction; Franklin Templeton, Coinbase Ventures, Again, Protein Capital, Techni Ventures; announced Jul 15, 2026)",
    fitScore: 38,
    intentScore: 32,
    vertical: "",
    subvertical: "",
    engagementModel: "",
    buyerType: "",
    compensationText: "",
    remoteFlag: "",
    employmentTypeRaw: "",
    urgencyScore: 0,
    source: "TechStartups VC funding roundup Jul 15, 2026",
    sourceUrl: "https://techstartups.com/2026/07/15/venture-capital-startup-funding-roundup-july-15-2026-accel-crv-greylock-goldman-sachs-khosla-ventures-m13-and-nava-ventures/",
    notes: "Grade B (70). Pure FS-infrastructure fit (institutional clearing/settlement) with a marquee validator (Franklin Templeton). Lowest budget of the batch — a $6.8M seed likely can't sustain a large retainer, so pitch a scoped launch/thought-leadership sprint. ACTION: position Glacis as the auditable institutional clearing layer for tokenized assets; leverage the Franklin Templeton relationship and the $1B+ settled / $1.5B run-rate metric as earned-media hooks.",
    contacts: [
      { name: "", title: "Founder/CEO", email: "", linkedin: "" }
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

    if (DRY_RUN) {
      console.log(`WOULD CREATE: ${lead.name} [${lead.pipeline}] fit=${lead.fitScore} intent=${lead.intentScore}`);
      created++;
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
  console.log(`\nDone${DRY_RUN ? ' (dry run)' : ''}. ${DRY_RUN ? 'Would create' : 'Created'} ${created}, skipped ${skipped}.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
