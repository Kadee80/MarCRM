/**
 * Import script: Daily Scrape 2026-07-21
 * Run:      node scripts/import-2026-07-21.cjs
 * Preview:  node scripts/import-2026-07-21.cjs --dry-run
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally - Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 *
 * 8 leads: pr-marketing (7), pr-freelance (1)
 * NOTE: No net-new legal-freelance leads this cycle. Socket, Hayden Industrial LLC,
 * LearnTastic and Allocate all surfaced again but are full-history duplicates, and the
 * Go Fractional fractional-CCO listing duplicates the 2026-07-20 legal-freelance entry.
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const DRY_RUN = process.argv.includes('--dry-run');
const SCRAPE_DATE = new Date('2026-07-21');

const leads = [
  {
    "name": "Neo",
    "website": "https://www.neo.security/",
    "pipeline": "pr-marketing",
    "industry": "Cybersecurity \u2014 AI application security; visibility and permission control for AI-enabled and agentic enterprise software",
    "location": "Boston, MA, US",
    "fundingStage": "Combined seed + Series A ($100M, announced Jul 20, 2026). Investors: Andreessen Horowitz, Bessemer Venture Partners, Craft Ventures, Merlin Ventures. Total raised $100M.",
    "fitScore": 48,
    "intentScore": 45,
    "fitDetails": {
      "industryMatchFSTech": 10,
      "stageSize": 8,
      "b2bBuyerSalesMotion": 10,
      "proofAssets": 10,
      "budget5k25kMo": 10
    },
    "intentDetails": {
      "triggerPresent": 15,
      "timelineToStart": 10,
      "decisionMakerEngaged": 8,
      "urgencyPain": 9,
      "responsiveness": 3
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
        "name": "Nick Warner",
        "title": "Co-founder (ex-SentinelOne exec)",
        "email": "",
        "linkedin": ""
      },
      {
        "name": "Shlomi Salem",
        "title": "Co-founder (ex-SentinelOne exec)",
        "email": "",
        "linkedin": ""
      },
      {
        "name": "Eran Shirazi",
        "title": "Co-founder / Technologist",
        "email": "",
        "linkedin": ""
      }
    ],
    "signals": [
      "Emerged from stealth with $100M combined seed + Series A on Jul 20, 2026",
      "Founded by former SentinelOne executives Nick Warner and Shlomi Salem with technologist Eran Shirazi",
      "Backed by a16z, Bessemer, Craft Ventures, Merlin Ventures",
      "Already piloting with customers in finance, energy and transportation",
      "Positioning: traditional enterprise security tools are mismatched to AI-enabled and agentic software"
    ],
    "source": "TechStartups VC funding roundup, Jul 20 2026",
    "sourceUrl": "https://techstartups.com/2026/07/20/venture-capital-startup-funding-roundup-july-20-2026/",
    "notes": "Grade A (93) \u2014 hottest net-new lead this cycle. Stealth emergence + $100M is the single strongest PR trigger pattern: the company has no existing narrative, no category position, and a 30-60 day window where press is receptive. Founder pedigree (ex-SentinelOne, a category-defining cyber exit) is a ready-made earned-media hook, and named pilots in finance/energy/transportation give reporters concrete proof. Funding removes any budget objection. ACTION: pitch a category-definition program \u2014 own the 'securing agentic software' narrative before Empirical Security and the incumbents (CrowdStrike, Wiz) claim it. Lead with the founder story and the finance-sector pilots. CAVEAT: a16z portfolio companies frequently get placed with a16z-preferred agencies at announcement; qualify whether an agency is already engaged before investing in a full pitch."
  },
  {
    "name": "Empirical Security",
    "website": "https://www.empiricalsecurity.com/",
    "pipeline": "pr-marketing",
    "industry": "Cybersecurity \u2014 AI-assisted exposure management and exploit prediction; helps security teams prioritize actively exploited vulnerabilities",
    "location": "Chicago, IL, US",
    "fundingStage": "Series A ($25M led by Brightmind Partners; HPA and Costanoa Ventures participating. Announced Jul 20, 2026. Total raised $37M.)",
    "fitScore": 45,
    "intentScore": 43,
    "fitDetails": {
      "industryMatchFSTech": 10,
      "stageSize": 9,
      "b2bBuyerSalesMotion": 10,
      "proofAssets": 8,
      "budget5k25kMo": 8
    },
    "intentDetails": {
      "triggerPresent": 15,
      "timelineToStart": 8,
      "decisionMakerEngaged": 8,
      "urgencyPain": 9,
      "responsiveness": 3
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
        "title": "CEO / Co-founder",
        "email": "",
        "linkedin": ""
      },
      {
        "name": "",
        "title": "Head of Marketing \u2014 Series A stage, comms function likely 0-1 people",
        "email": "",
        "linkedin": ""
      }
    ],
    "signals": [
      "Raised $25M Series A led by Brightmind Partners, announced Jul 20, 2026",
      "Existing investors HPA and Costanoa Ventures followed on \u2014 continuity capital signal",
      "Total funding now $37M",
      "Narrow operational wedge: predicting which vulnerabilities will actually be exploited, rather than broad 'AI security' positioning"
    ],
    "source": "TechStartups VC funding roundup, Jul 20 2026 (citing Axios)",
    "sourceUrl": "https://techstartups.com/2026/07/20/venture-capital-startup-funding-roundup-july-20-2026/",
    "notes": "Grade A (88) \u2014 strong fit and a well-timed trigger. Chicago location is an advantage: less agency saturation than SF/NYC and a real shot at regional business-press coverage alongside trades. The differentiation problem is acute and explicitly named in the coverage \u2014 the cyber market is crowded and 'we do AI security' no longer earns attention, which is exactly the messaging problem an agency sells against. ACTION: pitch a positioning-and-messaging sprint first (cheap entry, high perceived value), then a retainer for sustained trade coverage in Dark Reading / SC Media / CyberScoop plus CISO thought leadership. Their narrow 'exploit pressure' wedge is a genuinely defensible story angle \u2014 build the pitch around sharpening it, not replacing it."
  },
  {
    "name": "Natural",
    "website": "",
    "pipeline": "pr-marketing",
    "industry": "Fintech \u2014 payments and permissioning infrastructure for AI agents (agentic commerce rails)",
    "location": "Not disclosed in public announcement (US)",
    "fundingStage": "Series A ($30M led by Kirsten Green at Forerunner. Announced Jul 20, 2026. Total raised $40M.)",
    "fitScore": 44,
    "intentScore": 42,
    "fitDetails": {
      "industryMatchFSTech": 10,
      "stageSize": 9,
      "b2bBuyerSalesMotion": 9,
      "proofAssets": 8,
      "budget5k25kMo": 8
    },
    "intentDetails": {
      "triggerPresent": 15,
      "timelineToStart": 8,
      "decisionMakerEngaged": 8,
      "urgencyPain": 8,
      "responsiveness": 3
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
        "title": "CEO / Co-founder",
        "email": "",
        "linkedin": ""
      }
    ],
    "signals": [
      "Raised $30M Series A led by Forerunner (Kirsten Green), announced Jul 20, 2026",
      "Total funding $40M",
      "Building payment rails that let AI agents transact \u2014 purchasing software, paying vendors, handling transactional workflows",
      "Forerunner is a consumer-brand-heavy investor moving into infrastructure \u2014 an unusual and press-worthy signal"
    ],
    "source": "TechStartups VC funding roundup, Jul 20 2026 (citing TechCrunch)",
    "sourceUrl": "https://techstartups.com/2026/07/20/venture-capital-startup-funding-roundup-july-20-2026/",
    "notes": "Grade A (86) \u2014 strong fintech ICP match with a crowded-narrative problem worth solving. Agentic commerce is heavily contested (Stripe, Visa, Mastercard and a dozen startups all claim the category), so the differentiation burden is high and the buying case for comms is easy to make. Kirsten Green leading is itself a story \u2014 a consumer-brand investor backing payments infrastructure signals category legitimacy and is a good reporter hook. ACTION: pitch a category-narrative and analyst-relations program; the near-term goal is being the named example in agentic-commerce coverage, not volume placements. CAVEAT: headquarters were not disclosed in the announcement \u2014 confirm location and whether a comms lead is already in seat before pitching."
  },
  {
    "name": "Infinity",
    "website": "",
    "pipeline": "pr-marketing",
    "industry": "AI infrastructure / semiconductors \u2014 software layer that makes any AI chip inference-ready",
    "location": "San Francisco, CA, US",
    "fundingStage": "Seed ($15M at $100M post-money valuation. Announced Jul 20, 2026. Investors include Touring Capital, Principal VC, and researchers from OpenAI and Anthropic.)",
    "fitScore": 40,
    "intentScore": 42,
    "fitDetails": {
      "industryMatchFSTech": 10,
      "stageSize": 8,
      "b2bBuyerSalesMotion": 8,
      "proofAssets": 8,
      "budget5k25kMo": 6
    },
    "intentDetails": {
      "triggerPresent": 15,
      "timelineToStart": 8,
      "decisionMakerEngaged": 8,
      "urgencyPain": 8,
      "responsiveness": 3
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
        "title": "CEO / Co-founder",
        "email": "",
        "linkedin": ""
      }
    ],
    "signals": [
      "Raised $15M seed at a $100M post-money valuation, announced Jul 20, 2026",
      "Angel/strategic participation from OpenAI and Anthropic researchers \u2014 strong credibility signal",
      "Selling 'time-to-utility' for AI silicon vendors competing with Nvidia's software ecosystem",
      "Sits in the second-order AI stack (adapters, orchestration) that investors are rotating toward"
    ],
    "source": "TechCrunch / TechStartups VC funding roundup, Jul 20 2026",
    "sourceUrl": "https://techcrunch.com/2026/07/20/inference-startup-infinity-raises-15m-from-touring-capital-openai-and-athropic-researchers/",
    "notes": "Grade A (82) \u2014 good story, smaller budget. Scored down on budget (6/10): a $15M seed supports a $5-8k/mo retainer at most, so pitch accordingly rather than leading with a full program. The credibility hook is unusually strong \u2014 OpenAI and Anthropic researchers backing an inference-layer company is a headline in itself, and the anti-Nvidia-lock-in angle is a story trade press actively wants. ACTION: pitch a lean launch-and-positioning package (3-month, fixed fee) with an option to expand at Series A. Target The Information, SemiAnalysis, and the AI-infrastructure newsletter tier rather than broad business press."
  },
  {
    "name": "Quorum",
    "website": "https://www.quorum.us/",
    "pipeline": "pr-marketing",
    "industry": "Govtech / enterprise software \u2014 AI-powered government affairs, legislative tracking, stakeholder management, advocacy and PAC operations",
    "location": "Washington, D.C., US",
    "fundingStage": "Strategic investment from Enlightenment Capital (amount undisclosed). Announced Jul 20, 2026.",
    "fitScore": 46,
    "intentScore": 35,
    "fitDetails": {
      "industryMatchFSTech": 8,
      "stageSize": 8,
      "b2bBuyerSalesMotion": 10,
      "proofAssets": 10,
      "budget5k25kMo": 10
    },
    "intentDetails": {
      "triggerPresent": 12,
      "timelineToStart": 8,
      "decisionMakerEngaged": 6,
      "urgencyPain": 6,
      "responsiveness": 3
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
        "title": "CMO / VP Marketing",
        "email": "",
        "linkedin": ""
      },
      {
        "name": "",
        "title": "CEO / Co-founder",
        "email": "",
        "linkedin": ""
      }
    ],
    "signals": [
      "Enlightenment Capital announced a strategic investment, Jul 20, 2026",
      "Used by more than 2,000 organizations including over half of the Fortune 100",
      "Capital explicitly earmarked for product roadmap and expanding agentic AI capabilities",
      "Positioned at the intersection of policy volatility and enterprise workflow"
    ],
    "source": "TechStartups VC funding roundup, Jul 20 2026 (citing Enlightenment Capital announcement)",
    "sourceUrl": "https://techstartups.com/2026/07/20/venture-capital-startup-funding-roundup-july-20-2026/",
    "notes": "Grade A (81) \u2014 excellent fit, softer intent. Perfect on proof assets and budget (half the Fortune 100 as customers, PE-backed), but scored down on intent: Quorum is a mature company that almost certainly has an in-house comms team, and PE strategic investments are deliberately low-key events rather than launch moments. That makes this a relationship play, not a fast close. ACTION: approach at the project level around the agentic-AI product expansion \u2014 a launch campaign or an analyst/thought-leadership program the internal team lacks bandwidth for. Do not pitch a full retainer cold. Undisclosed deal size also means the spend signal is unconfirmed."
  },
  {
    "name": "CuspAI",
    "website": "https://www.cuspai.com/",
    "pipeline": "pr-marketing",
    "industry": "AI for materials discovery \u2014 semiconductors, batteries, clean energy, advanced manufacturing",
    "location": "Cambridge, United Kingdom",
    "fundingStage": "Series B ($450M at a $2.6B valuation, led by Kleiner Perkins and NEA with Bezos Expeditions, the UK government, AMD Ventures, Lux Capital, Glade Brook Capital Partners, Invest-NL. Announced Jul 20, 2026. Total raised $650M+.)",
    "fitScore": 43,
    "intentScore": 33,
    "fitDetails": {
      "industryMatchFSTech": 9,
      "stageSize": 6,
      "b2bBuyerSalesMotion": 8,
      "proofAssets": 10,
      "budget5k25kMo": 10
    },
    "intentDetails": {
      "triggerPresent": 15,
      "timelineToStart": 7,
      "decisionMakerEngaged": 5,
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
        "title": "Head of Communications (likely already in seat)",
        "email": "",
        "linkedin": ""
      }
    ],
    "signals": [
      "Raised $450M Series B at a $2.6B valuation, announced Jul 20, 2026",
      "Total raised now exceeds $650M just two years after launch",
      "Backers include Bezos Expeditions, the UK government, AMD Ventures and Nvidia-adjacent partners",
      "Day's largest round globally \u2014 already saturated with tier-1 press coverage"
    ],
    "source": "TechStartups VC funding roundup, Jul 20 2026",
    "sourceUrl": "https://techstartups.com/2026/07/20/jeff-bezos-backs-2-6b-ai-startup-cuspai-as-nvidia-joins-quest-to-discover-the-next-generation-of-materials/",
    "notes": "Grade B (76) \u2014 included for completeness, but deprioritized. Budget and proof assets are perfect, and the trigger is the largest raise of the day. Intent scored low for concrete reasons: at $2.6B with UK government backing they near-certainly retain an established agency, the announcement was already covered everywhere (so the news hook is spent), and they are UK-based, which is outside the agency's core geography. ACTION: monitor only. Revisit if a US market-entry or a US-facing product launch is announced, which would create a genuine geographic gap an incumbent UK agency cannot fill."
  },
  {
    "name": "Wagmo",
    "website": "https://www.wagmo.io/",
    "pipeline": "pr-marketing",
    "industry": "Insurtech \u2014 pet healthcare benefits, expanding into credit union distribution channels",
    "location": "New York, NY, US",
    "fundingStage": "Strategic investment from Curql (amount undisclosed). Announced Jul 20, 2026 (Business Wire release Jul 14).",
    "fitScore": 36,
    "intentScore": 31,
    "fitDetails": {
      "industryMatchFSTech": 7,
      "stageSize": 8,
      "b2bBuyerSalesMotion": 8,
      "proofAssets": 7,
      "budget5k25kMo": 6
    },
    "intentDetails": {
      "triggerPresent": 10,
      "timelineToStart": 7,
      "decisionMakerEngaged": 6,
      "urgencyPain": 6,
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
        "title": "CMO / Head of Partnerships",
        "email": "",
        "linkedin": ""
      }
    ],
    "signals": [
      "Curql strategic investment announced to bring pet healthcare into the credit union channel",
      "Distribution-led deal \u2014 credit unions as trusted channel for member benefits",
      "New York-based pet healthcare company"
    ],
    "source": "TechStartups VC funding roundup, Jul 20 2026 (citing MorningStar / Business Wire)",
    "sourceUrl": "https://www.morningstar.com/news/business-wire/20260714206155/wagmo-and-curql-announce-strategic-investment-bringing-modern-pet-healthcare-to-the-credit-union-movement",
    "notes": "Grade B (67) \u2014 marginal, include but low priority. Insurtech is adjacent to the financial-services sweet spot, and the credit-union channel angle is a legitimate trade-press story (Credit Union Times, American Banker). Weaknesses: undisclosed deal size means the budget signal is unconfirmed, pet healthcare is outside the B2B/FS/tech core, and the announcement is a week old so the news window is largely closed. ACTION: low-priority outreach only if the higher-scoring leads stall. Best angle would be channel-partnership PR aimed at the credit union trade press, not consumer coverage."
  },
  {
    "name": "Fractional Communications Director \u2014 Earned Media Pilot (unnamed employer, via Indeed)",
    "website": "https://www.indeed.com/q-fractional-communications-l-remote-jobs.html",
    "pipeline": "pr-freelance",
    "industry": "Not disclosed in listing \u2014 CEO-facing earned media program build",
    "location": "Remote (US)",
    "fundingStage": "",
    "fitScore": 30,
    "intentScore": 35,
    "fitDetails": {
      "prCommsMediaRelationsStated": 20,
      "sectorFitFinancePEVCB2BFintech": 0,
      "workstreamExecCommsThoughtLeadershipEarnedMediaIR": 10,
      "agencyOverflowWhiteLabelImmediate": 0
    },
    "intentDetails": {
      "engagementModelFreelanceContractRetainerFractional": 15,
      "remoteFlexiblePartTime": 10,
      "postedWithin72h": 0,
      "urgencySignals": 5,
      "easyApplyOrDirectContact": 5
    },
    "vertical": "pr",
    "subvertical": "media-relations",
    "engagementModel": "fractional",
    "buyerType": "operating-company",
    "compensationText": "Estimated $85-$120/hour (platform range for comparable fractional communications listings)",
    "remoteFlag": "remote",
    "employmentTypeRaw": "Fractional / part-time \u2014 3-month pilot engagement, 15-20 hours per month",
    "urgencyScore": 55,
    "contacts": [
      {
        "name": "",
        "title": "CEO \u2014 listing states the role works directly with the CEO",
        "email": "",
        "linkedin": ""
      }
    ],
    "signals": [
      "3-month pilot engagement at 15-20 hours per month",
      "Scope is building and running an earned media program from scratch",
      "Reports directly to the CEO \u2014 decision-maker access built into the role",
      "Remote, fractional structure matches Mark's fractional pitch exactly"
    ],
    "source": "Indeed \u2014 fractional communications, remote (listing surfaced Jul 11, 2026)",
    "sourceUrl": "https://www.indeed.com/q-fractional-communications-l-remote-jobs.html",
    "notes": "Grade B (65) \u2014 structurally an ideal fractional engagement, but the employer is unnamed in the indexed listing. Scope (build an earned media program from zero), cadence (15-20 hrs/month), duration (3-month pilot) and CEO reporting line are precisely the shape Mark pitches \u2014 a pilot that converts to retainer. Scored 0 on sector fit and 0 on 72-hour recency because the employer is undisclosed and the listing surfaced Jul 11 (~10 days old), so treat the score as a floor, not a ceiling. ACTION: Katie should open the Indeed listing directly to retrieve the employer name and posting date; if the sector turns out to be finance/fintech/B2B this jumps to A-grade. Flagging as the single highest-value verification task from this cycle. CAVEAT: aggregator listings of this age are frequently already filled."
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
