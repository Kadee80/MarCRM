/**
 * Import script: Daily Scrape 2026-07-22
 * Run:      node scripts/import-2026-07-22.cjs
 * Preview:  node scripts/import-2026-07-22.cjs --dry-run
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally - Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 *
 * 3 leads: pr-marketing (2), pr-freelance (1)
 * NOTE: No net-new legal-freelance leads this cycle. Fractionus (EdTech GC), Tower Legal,
 * Ropes & Gray funds attorney and ACC #54004 (Hayden Industrial) all resurfaced but are
 * full-history duplicates. Taktile ($110M Series C, FS AI) skipped — raise was Jun 24, stale.
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const DRY_RUN = process.argv.includes('--dry-run');
const SCRAPE_DATE = new Date('2026-07-22');

const leads = [
  {
    "name": "Augustus",
    "website": "https://www.augustus.com/",
    "pipeline": "pr-marketing",
    "industry": "Fintech / banking infrastructure — federally chartered 'Global Dollar Bank' giving international fintechs and banks API-first access to USD accounts, rails (SWIFT/ACH/SEPA) and stablecoin connectivity",
    "location": "New York, NY, US",
    "fundingStage": "Series B ($180M at a $1B valuation, led by Tiger Global with Hummingbird, QED, and founders of Nubank/Ramp/Circle/Deel. Announced Jul 21, 2026.)",
    "fitScore": 50,
    "intentScore": 30,
    "fitDetails": {
      "industryMatchFSTech": 10,
      "stageSize": 10,
      "b2bBuyerSalesMotion": 10,
      "proofAssets": 10,
      "budget5k25kMo": 10
    },
    "intentDetails": {
      "triggerPresent": 15,
      "timelineToStart": 6,
      "decisionMakerEngaged": 4,
      "urgencyPain": 3,
      "responsiveness": 2
    },
    "vertical": "",
    "subvertical": "",
    "engagementModel": "",
    "buyerType": "",
    "compensationText": "",
    "remoteFlag": "",
    "employmentTypeRaw": "",
    "urgencyScore": 0,
    "contacts": [
      { "name": "", "title": "CEO / Co-founder", "email": "", "linkedin": "" },
      { "name": "", "title": "Head of Communications / CMO (likely in seat given announcement scale)", "email": "", "linkedin": "" }
    ],
    "signals": [
      "Raised $180M Series B at a $1B valuation led by Tiger Global, announced Jul 21, 2026",
      "Secured conditional OCC approval for a US national bank charter in May 2026 — 8th such approval since 2010",
      "Kraken among named customers; already processing billions in volume",
      "Capital earmarked to expand core banking system 'Marble' and enter LatAm, SE Asia, Middle East and Africa",
      "Backed by founders of Nubank, Ramp, Circle and Deel — strong fintech-operator credibility"
    ],
    "source": "WebSearch — Augustus Series B coverage (Decrypt, The Block, PR Newswire, CoinDesk), Jul 21 2026",
    "sourceUrl": "https://www.prnewswire.com/news-releases/augustus-announces-180m-series-b-at-1b-valuation-to-give-international-fintechs-and-banks-access-to-the-us-dollar-302830300.html",
    "notes": "Grade A (80) — near-perfect fit. Fintech/banking-infra is dead-center of the pr-marketing ICP: clear B2B sales motion, marquee proof assets (OCC charter, Kraken, tier-1 backers), no budget objection after a $180M raise. Intent scored conservatively: the raise went out on PR Newswire with full tier-1 pickup, so they already have comms muscle for the announcement — this is an advisory/thought-leadership and market-entry play, not a launch-PR gap. ACTION: pitch a narrative program around international expansion (LatAm/SE Asia/MEA correspondent-banking disruption) plus founder/exec thought leadership on stablecoin banking regulation. Confirm in-house vs agency comms before a full pitch."
  },
  {
    "name": "Singularity",
    "website": "",
    "pipeline": "pr-marketing",
    "industry": "Defense technology — AI-driven air defense systems",
    "location": "US (not disclosed in stealth-emergence announcement)",
    "fundingStage": "Series A ($80M led by Khosla Ventures and Felicis at a reported $400M valuation. Emerged from stealth week of Jul 13-18, 2026.)",
    "fitScore": 35,
    "intentScore": 31,
    "fitDetails": {
      "industryMatchFSTech": 7,
      "stageSize": 8,
      "b2bBuyerSalesMotion": 6,
      "proofAssets": 6,
      "budget5k25kMo": 8
    },
    "intentDetails": {
      "triggerPresent": 13,
      "timelineToStart": 8,
      "decisionMakerEngaged": 3,
      "urgencyPain": 5,
      "responsiveness": 2
    },
    "vertical": "",
    "subvertical": "",
    "engagementModel": "",
    "buyerType": "",
    "compensationText": "",
    "remoteFlag": "",
    "employmentTypeRaw": "",
    "urgencyScore": 0,
    "contacts": [
      { "name": "", "title": "CEO / Co-founder", "email": "", "linkedin": "" }
    ],
    "signals": [
      "Emerged from stealth with $80M Series A led by Khosla Ventures and Felicis, reported $400M valuation (week of Jul 13-18, 2026)",
      "Developing AI air-defense technology — active defense-tech venture surge (>$5B into defense AI that week)",
      "Stealth emergence is a fresh-narrative moment with a receptive-press window",
      "Defense-tech comms carries credibility and classification constraints that favor experienced advisors"
    ],
    "source": "WebSearch — Crunchbase 'Week's 10 Biggest Funding Rounds' defense/AI roundup, Jul 2026",
    "sourceUrl": "https://news.crunchbase.com/venture/biggest-funding-rounds-ai-defense-fintech-robotics/",
    "notes": "Grade B (66) — strong trigger, moderate fit. Stealth emergence + $80M is a clean first-narrative moment and defense AI is white-hot. Scored down on fit: defense tech sits adjacent to the FS/tech core, sales motion is to primes/government, and stealth means few public proof assets. ACTION: pitch category-positioning + earned media to defense trade press (Defense News, Breaking Defense). CAVEAT: Khosla/Felicis announcements are often agency-placed at launch. VERIFY exact entity — 'Singularity' is a common name; confirm the specific Khosla/Felicis-backed air-defense company and its location before outreach."
  },
  {
    "name": "Zy Media Group — Senior Communications & PR Strategy Advisor (Remote Contract)",
    "website": "https://www.idealist.org/en/consultant-job/27da977c3d0d476289e4c50e09fa61ff-senior-communications-and-pr-strategy-advisor-zy-media-group-baltimore",
    "pipeline": "pr-freelance",
    "industry": "Media & communications group — senior PR/comms strategy advisory engagement",
    "location": "Remote (DMV / Baltimore, MD, US)",
    "fundingStage": "",
    "fitScore": 40,
    "intentScore": 39,
    "fitDetails": {
      "prCommsMediaRelationsStated": 20,
      "sectorFitFinancePEVCB2BFintech": 7,
      "workstreamExecCommsThoughtLeadershipEarnedMediaIR": 8,
      "agencyOverflowWhiteLabelImmediate": 5
    },
    "intentDetails": {
      "engagementModelFreelanceContractRetainerFractional": 15,
      "remoteFlexiblePartTime": 10,
      "postedWithin72h": 5,
      "urgencySignals": 4,
      "easyApplyOrDirectContact": 5
    },
    "vertical": "pr",
    "subvertical": "comms",
    "engagementModel": "consultant",
    "buyerType": "agency",
    "compensationText": "At least $60/hour (listing states remote consultant/contract, $60/hr+)",
    "remoteFlag": "remote",
    "employmentTypeRaw": "Remote consultant / contract — Senior Communications and PR Strategy Advisor",
    "urgencyScore": 55,
    "contacts": [
      { "name": "", "title": "Hiring lead / Principal, Zy Media Group", "email": "", "linkedin": "" }
    ],
    "signals": [
      "Senior Communications & PR Strategy Advisor posted as remote consultant/contract at $60/hr+",
      "Agency-side engagement — advisory + strategy execution, matching Mark's fractional/overflow pitch",
      "Remote and contract structure; low-friction apply via Idealist",
      "Two-bucket taxonomy hit: Bucket C (consultant/advisory) + Bucket B (external/outsourced)"
    ],
    "source": "WebSearch / Idealist — Zy Media Group consultant listing, Jul 2026",
    "sourceUrl": "https://www.idealist.org/en/consultant-job/27da977c3d0d476289e4c50e09fa61ff-senior-communications-and-pr-strategy-advisor-zy-media-group-baltimore",
    "notes": "Grade B (79) — clean freelance-PR fit. Explicit PR/comms strategy remit, contract/consultant engagement model, remote, direct-apply path — four of five intent criteria. Scored moderate on sector fit (client sector undisclosed) and workstream (strategy advisory vs a named earned-media build). ACTION: apply directly via Idealist; the $60/hr floor is below Mark's usual rate, so pitch as a strategy-advisory/retainer relationship. Verify client roster before committing — finance/B2B clients would raise this to A-grade."
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
