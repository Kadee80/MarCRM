/**
 * Import script: Daily Scrape 2026-07-23
 * Run:      node scripts/import-2026-07-23.cjs
 * Preview:  node scripts/import-2026-07-23.cjs --dry-run
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally - Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 *
 * 3 leads, all pr-marketing (business-event triggers): Always.bank, FV Bank, Architect Labs.
 * NOTE: LeapXpert ($180M Riverwood round) was dropped as a duplicate (already captured 2026-07-02).
 * No net-new legal-freelance or pr-freelance leads this cycle — job-board clusters resurfaced
 * already-captured leads (ACC #54004, Cast Influence, Axiom) or low-fit doc-review/litigation postings.
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const DRY_RUN = process.argv.includes('--dry-run');
const SCRAPE_DATE = new Date('2026-07-23');

const leads = [
  {
    "name": "Always.bank",
    "website": "https://www.always.bank/",
    "pipeline": "pr-marketing",
    "industry": "Digital business banking / SMB fintech \u2014 'advisory-first' branchless bank for small businesses offering accounts, high-yield savings/CDs, SBA loans, invoice factoring and asset-based lending; powered by Linker Finance",
    "location": "Birmingham, AL, US (HQ 'BasePoint')",
    "fundingStage": "Privately held; scaling \u2014 launched full digital business-banking suite across the US, week of Jul 20, 2026 (initial digital launch May 2026)",
    "fitScore": 38,
    "intentScore": 26,
    "fitDetails": {
      "industryMatchFSTech": 10,
      "stageSize": 8,
      "b2bBuyerSalesMotion": 8,
      "proofAssets": 7,
      "budget5k25kMo": 5
    },
    "intentDetails": {
      "triggerPresent": 12,
      "timelineToStart": 6,
      "decisionMakerEngaged": 4,
      "urgencyPain": 2,
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
      {
        "name": "",
        "title": "CEO / Founder",
        "email": "",
        "linkedin": ""
      },
      {
        "name": "",
        "title": "Head of Marketing / Growth",
        "email": "",
        "linkedin": ""
      }
    ],
    "signals": [
      "Launched full suite of digital business-banking services (accounts, invoice factoring, asset-based lending) across the US, week of Jul 20, 2026",
      "'Advisory-first' brand positioning with dedicated advisers \u2014 a story-friendly differentiator vs. incumbent SMB banks",
      "Opened physical HQ 'BasePoint' in Birmingham, AL \u2014 a regional/community-banking angle",
      "Partnership with Linker Finance powering the digital stack"
    ],
    "source": "WebSearch \u2014 Always.bank launch coverage (Fintech Futures, PR Newswire, Yahoo Finance, Hipther Fintech Pulse Jul 20 2026)",
    "sourceUrl": "https://www.fintechfutures.com/business-banking/always-bank-launches-full-digital-business-banking-suite",
    "notes": "Grade B (64). Fresh, in-window product-suite launch (week of Jul 20). Solid FS/fintech fit and a genuinely differentiated 'advisory-first' brand story worth amplifying. Scored down on budget (SMB-focused, funding undisclosed) and decision-maker access (unknown; likely founder-led marketing). ACTION: pitch a launch-amplification + earned-media program around the SMB 'advisory-first banking' narrative and the Birmingham/community-banking angle. Qualify budget and comms ownership early."
  },
  {
    "name": "FV Bank",
    "website": "https://www.fvbank.us/",
    "pipeline": "pr-marketing",
    "industry": "Digital bank / stablecoin & programmable-finance infrastructure \u2014 unified fintech platform for USD + stablecoin banking, payments and programmable finance for businesses",
    "location": "San Juan, Puerto Rico, US",
    "fundingStage": "Privately held; product expansion \u2014 launched unified fintech platform (stablecoins, payments, programmable finance), announced Jun 18, 2026",
    "fitScore": 36,
    "intentScore": 24,
    "fitDetails": {
      "industryMatchFSTech": 10,
      "stageSize": 7,
      "b2bBuyerSalesMotion": 8,
      "proofAssets": 6,
      "budget5k25kMo": 5
    },
    "intentDetails": {
      "triggerPresent": 10,
      "timelineToStart": 4,
      "decisionMakerEngaged": 4,
      "urgencyPain": 4,
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
      {
        "name": "",
        "title": "CEO",
        "email": "",
        "linkedin": ""
      },
      {
        "name": "",
        "title": "Head of Marketing / Communications",
        "email": "",
        "linkedin": ""
      }
    ],
    "signals": [
      "Expanded beyond digital banking \u2014 launched unified fintech platform for stablecoins, payments and programmable finance, Jun 18, 2026",
      "Riding the stablecoin/programmable-finance narrative wave alongside peers (Augustus, Cyclops) the agency is already tracking",
      "B2B digital-bank model serving fintechs and businesses"
    ],
    "source": "WebSearch \u2014 FV Bank platform launch (BusinessWire, Jun 18 2026)",
    "sourceUrl": "https://www.businesswire.com/news/home/20260618149734/en/FV-Bank-Expands-Beyond-Digital-Banking-Launches-Unified-Fintech-Platform-for-Stablecoins-Payments-and-Programmable-Finance",
    "notes": "Grade B (60, borderline C). Good sector fit (stablecoin/programmable-finance is a hot narrative the agency already covers via Augustus/Cyclops), but signal is ~5wk old (Jun 18) and outside the strict window \u2014 included as net-new, not previously captured. Scored down on recency and unknown budget/decision-maker. ACTION: only pursue if bandwidth allows after LeapXpert/Always.bank; pitch angle would be the programmable-finance/stablecoin-banking thought-leadership lane. Verify comms ownership and whether the launch push is already agency-supported."
  },
  {
    "name": "Architect Labs",
    "website": "https://www.architectlabs.ai/",
    "pipeline": "pr-marketing",
    "industry": "Deep tech / semiconductors \u2014 AI system that designs and provably verifies custom silicon end-to-end, from high-level spec to manufacturable output; aiming to democratize custom chip design",
    "location": "Palo Alto, CA, US",
    "fundingStage": "Seed \u2014 $24M led by Kindred Ventures (TQ Ventures, Race Capital, Together Fund + angels from NVIDIA/Google/OpenAI); emerged from stealth Jun 18, 2026",
    "fitScore": 35,
    "intentScore": 24,
    "fitDetails": {
      "industryMatchFSTech": 6,
      "stageSize": 7,
      "b2bBuyerSalesMotion": 8,
      "proofAssets": 8,
      "budget5k25kMo": 6
    },
    "intentDetails": {
      "triggerPresent": 10,
      "timelineToStart": 5,
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
      {
        "name": "Ebrahim Hussain",
        "title": "Co-founder (ex-Apple, ex-Tesla silicon)",
        "email": "",
        "linkedin": ""
      },
      {
        "name": "Aaditya Subedi",
        "title": "Co-founder (ex-Harvard AI researcher)",
        "email": "",
        "linkedin": ""
      }
    ],
    "signals": [
      "Emerged from stealth with $24M seed led by Kindred Ventures, Jun 18, 2026",
      "Marquee angel roster \u2014 executives from NVIDIA, Google, OpenAI (Srinivas Narayanan, Lukasz Kaiser, Aravind Srinivas, Kunle Olukotun)",
      "Strong founder story: Hussain (Apple/Tesla silicon, enrolled in college at 15), Subedi (Harvard AI code-verification researcher)",
      "Category-defining positioning: 'AI that designs and provably verifies custom chips'"
    ],
    "source": "WebSearch \u2014 Architect Labs $24M seed (BusinessWire, Yahoo Finance, HPCwire, Tech Startups, FinSMEs)",
    "sourceUrl": "https://www.businesswire.com/news/home/20260618895194/en/Architect-Labs-Raises-$24M-Seed-to-Democratize-Custom-Chip-Design",
    "notes": "Grade C (59). Tech (not FS) sector, so industry-match scored 6. Genuinely strong proof assets (tier-1 angels) and a magnetic founder story that PR can run with. But it's a seed-stage deep-tech company with long sales cycles and product-first priorities \u2014 retainer budget and PR urgency both soft, so intent low. Signal is ~5wk old (Jun 18). ACTION: low-priority nurture. If pursued, the pitch is founder-led thought leadership on AI-designed silicon + the democratization narrative; keep it light-touch until they show a comms hire or a Series A trigger."
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
