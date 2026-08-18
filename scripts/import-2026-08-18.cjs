/**
 * Import script: Daily Scrape 2026-08-18
 * Run: node scripts/import-2026-08-18.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    "name": "Vals AI — $40M Series A (AI Model Evaluation for Finance)",
    "website": "https://www.vals.ai/",
    "pipeline": "pr-marketing",
    "industry": "AI evaluation / benchmarking infrastructure (financial services focus)",
    "location": "San Francisco, CA",
    "fundingStage": "Series A — $40M at $400M post-money (announced 2026-08-13)",
    "fitScore": 47,
    "intentScore": 40,
    "fitDetails": {
      "industryMatchFSTech": 10,
      "stageSizeGrowth": 10,
      "clearB2BBuyerSalesMotion": 9,
      "proofAssets": 10,
      "budget5kTo25kMo": 8
    },
    "intentDetails": {
      "triggerPresent": 15,
      "timelineToStart0To30d": 9,
      "decisionMakerEngaged": 8,
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
    "contacts": [],
    "signals": [
      "$40M Series A led by a16z at a $400M post-money valuation, announced Aug 13, 2026",
      "Existing backers 8VC, Pear VC, Bloomberg Beta re-upped; new investors HRT Ventures and Next Ladder joined",
      "Evaluations cited in model cards from OpenAI, Anthropic, Google, Meta and xAI — unusually strong third-party credibility asset",
      "Revenue up 8x versus all of 2025; customer base doubled and team tripled in the past six months",
      "Published finding that frontier models fail 52% of real finance-analyst tasks — a ready-made earned-media hook"
    ],
    "source": "Tech Funding News / Crypto Briefing / TechTimes",
    "sourceUrl": "https://techfundingnews.com/a16z-leads-40m-vals-ai-round-at-400m-valuation-to-test-ai-on-real-world-tasks/",
    "notes": "Grade A (87) — top lead of the day. Finance-sector AI with a defensible data story and blue-chip validation. The '52% failure rate' research is exactly the kind of proprietary-data narrative that earns tier-1 coverage; strong retainer or thought-leadership pitch. Post-raise comms window is open now. Counter-signal: a16z portfolio companies often get platform PR support, so lead with the research-narrative angle rather than generic announcement support."
  },
  {
    "name": "Workleap / ShareGate — Senior Public Relations Advisor (12-Month Contract, Remote Canada)",
    "website": "https://www.workleap.com/",
    "pipeline": "pr-freelance",
    "industry": "B2B SaaS / HR tech and IT productivity software",
    "location": "Remote (Canada)",
    "fundingStage": "PE-backed (private equity round 2023-06)",
    "fitScore": 43,
    "intentScore": 40,
    "fitDetails": {
      "prCommsMediaRelationsStated": 20,
      "sectorFitFinancePEVCB2BFintech": 13,
      "workstreamExecCommsThoughtLeadershipEarnedMediaIR": 10,
      "agencyOverflowWhiteLabelImmediate": 0
    },
    "intentDetails": {
      "engagementModelFreelanceContractRetainerFractional": 15,
      "remoteFlexPartTime": 10,
      "postedWithin72h": 0,
      "urgencySignals": 10,
      "easyApplyDirectContact": 5
    },
    "vertical": "pr",
    "subvertical": "media-relations",
    "engagementModel": "contract",
    "buyerType": "operating-company",
    "compensationText": "$100,000 – $125,000 / year (12-month contract)",
    "remoteFlag": "remote",
    "employmentTypeRaw": "Contract/Temporary — 12-month contract (maternity leave coverage)",
    "urgencyScore": 72,
    "contacts": [],
    "signals": [
      "12-month contract covering a maternity leave — fixed start date and a defined end, the cleanest form of interim comms need",
      "Scope is PR strategy, media relations, executive thought leadership, creator strategy and employer branding — full remit, not social-only",
      "PE-backed 201-500 employee B2B SaaS; ShareGate is the Workleap product line the role supports",
      "Posted ~Aug 13, 2026 (listed as '5 days ago' on Remote Rocketship as of Aug 18)",
      "Two near-identical listings exist (ShareGate-branded and Workleap-branded) — likely one role syndicated twice"
    ],
    "source": "Remote Rocketship",
    "sourceUrl": "https://www.remoterocketship.com/ca/company/workleap/jobs/senior-public-relations-advisor-12-month-contract-canada-remote/",
    "notes": "Grade A (83). Best pr-freelance lead of the day: an explicit interim comms leadership gap with budget attached. IMPORTANT CAVEAT — the Workleap-branded posting lists French as required; the ShareGate-branded duplicate does not. Verify which listing is authoritative before Mark invests time. Also note employmentTypeRaw is a W-2-style fixed-term contract, not a 1099 retainer, so the commercial model may need reframing in the pitch."
  },
  {
    "name": "Axle — $17.5M Series A (AI-Native Insurance Clearinghouse)",
    "website": "https://www.axle.insure/",
    "pipeline": "pr-marketing",
    "industry": "Insurtech / fintech infrastructure (insurance data and policy workflow automation)",
    "location": "United States",
    "fundingStage": "Series A — $17.5M led by Base10 Partners (announced 2026-08-13)",
    "fitScore": 44,
    "intentScore": 36,
    "fitDetails": {
      "industryMatchFSTech": 10,
      "stageSizeGrowth": 9,
      "clearB2BBuyerSalesMotion": 10,
      "proofAssets": 8,
      "budget5kTo25kMo": 7
    },
    "intentDetails": {
      "triggerPresent": 15,
      "timelineToStart0To30d": 8,
      "decisionMakerEngaged": 8,
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
    "contacts": [],
    "signals": [
      "$17.5M Series A led by Base10 Partners, announced Aug 13, 2026",
      "Positioning is 'connect insurance carriers to the real economy' / make insurance data programmable — a category-creation narrative that needs comms support",
      "Broad pickup across FinTech Global, Pulse 2.0, Tech Funding News, Financial IT, FinSMEs and citybiz",
      "Clear B2B motion selling into carriers, brokers and platforms"
    ],
    "source": "FinTech Global / Pulse 2.0",
    "sourceUrl": "https://fintech.global/2026/08/13/axle-raises-17-5m-to-make-insurance-programmable/",
    "notes": "Grade A (80). Squarely on-ICP: financial-services infrastructure, B2B sales motion, fresh raise. Urgency scored down to 3 because they distributed via PR Newswire, which suggests an existing agency or in-house comms retainer already in place — qualify that before pitching. Best angle is post-announcement sustain: category narrative and carrier-side thought leadership rather than launch support."
  },
  {
    "name": "Trajectory — $40M Series A (Continual-Learning AI Infrastructure)",
    "website": "",
    "pipeline": "pr-marketing",
    "industry": "AI infrastructure / continual learning research lab",
    "location": "San Francisco, CA",
    "fundingStage": "Series A — $40M at $300M post-money, led by Sequoia (announced 2026-08-11)",
    "fitScore": 41,
    "intentScore": 39,
    "fitDetails": {
      "industryMatchFSTech": 9,
      "stageSizeGrowth": 6,
      "clearB2BBuyerSalesMotion": 8,
      "proofAssets": 10,
      "budget5kTo25kMo": 8
    },
    "intentDetails": {
      "triggerPresent": 15,
      "timelineToStart0To30d": 8,
      "decisionMakerEngaged": 8,
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
        "name": "Ronak Malde",
        "title": "Co-founder & CEO (ex-Google DeepMind)",
        "email": "",
        "linkedin": ""
      },
      {
        "name": "Michael Elabd",
        "title": "Co-founder (ex-Google DeepMind)",
        "email": "",
        "linkedin": ""
      },
      {
        "name": "Arjun Karanam",
        "title": "Co-founder (ex-Apple)",
        "email": "",
        "linkedin": ""
      }
    ],
    "signals": [
      "$40M Series A led by Sequoia at $300M post-money, announced Aug 11, 2026, with NVIDIA and Bessemer participating",
      "Raised twice in two months — $15M seed at $115M post in June, then $40M at $300M in August",
      "Founded May 2026 by ex-DeepMind, Apple, OpenAI and Meta researchers — very strong founder-credibility asset",
      "Story broke via The Information (Stephanie Palazzolo) then syndicated through Techmeme, Dealroom, FinSMEs"
    ],
    "source": "FinSMEs / Techmeme (The Information)",
    "sourceUrl": "https://www.finsmes.com/2026/08/trajectory-raises-40m-in-series-a-funding-at-300m-post-money-valuation.html",
    "notes": "Grade A (80). Three-month-old company with a $300M valuation and no visible comms function — a genuine greenfield opportunity. Stage/size scored down to 6 because the team is tiny and may not yet have comms budget or bandwidth. Strongest pitch is founder-narrative and technical thought leadership; go direct to Ronak Malde."
  },
  {
    "name": "Visier — Fractional Corporate Counsel (Remote Canada, 10–20 hrs/wk)",
    "website": "https://www.visier.com",
    "pipeline": "legal-freelance",
    "industry": "B2B SaaS — people analytics and workforce intelligence",
    "location": "Remote (Canada only)",
    "fundingStage": "",
    "fitScore": 20,
    "intentScore": 50,
    "fitDetails": {
      "fund": 0,
      "corporateContractsMAFinancingVentureSecurities": 10,
      "seniorityCounselGC": 10,
      "compStatedMarketCredible": 0
    },
    "intentDetails": {
      "engagementModelFractionalInterimContract": 15,
      "remoteHybridFlex": 15,
      "postedWithin72h": 10,
      "easyApplyDirectContact": 10
    },
    "vertical": "legal",
    "subvertical": "corporate",
    "engagementModel": "fractional",
    "buyerType": "operating-company",
    "compensationText": "",
    "remoteFlag": "remote",
    "employmentTypeRaw": "Fractional — 10–20 hrs/week",
    "urgencyScore": 78,
    "contacts": [],
    "signals": [
      "Posted Aug 17, 2026 on Fractional Jobs — inside the 72-hour window",
      "Explicitly fractional at 10–20 hrs/week, fully remote",
      "Established late-stage SaaS company, not a seed-stage startup — implies real contract volume and ability to pay",
      "Corporate counsel remit maps to commercial contracts and governance work"
    ],
    "source": "Fractional Jobs",
    "sourceUrl": "https://www.fractionaljobs.io/jobs/corporate-counsel-at-visier",
    "notes": "Grade B (70) and the freshest legal-freelance lead today. Perfect intent profile — fractional, remote, brand new, easy apply. Fit capped at 20 because there is no fund work and no stated compensation. GATING ISSUE: listing says Remote (Canada only), so confirm whether a US-licensed attorney is eligible before Mark spends time on it."
  },
  {
    "name": "Norven — Fractional General Counsel / Head of Legal (Remote UK, 8–16 hrs/wk)",
    "website": "https://norven.ai/",
    "pipeline": "legal-freelance",
    "industry": "AI software",
    "location": "Remote (UK only)",
    "fundingStage": "",
    "fitScore": 20,
    "intentScore": 47,
    "fitDetails": {
      "fund": 0,
      "corporateContractsMAFinancingVentureSecurities": 10,
      "seniorityCounselGC": 10,
      "compStatedMarketCredible": 0
    },
    "intentDetails": {
      "engagementModelFractionalInterimContract": 15,
      "remoteHybridFlex": 12,
      "postedWithin72h": 10,
      "easyApplyDirectContact": 10
    },
    "vertical": "legal",
    "subvertical": "GC",
    "engagementModel": "fractional",
    "buyerType": "startup",
    "compensationText": "",
    "remoteFlag": "remote",
    "employmentTypeRaw": "Fractional — 8–16 hrs/week",
    "urgencyScore": 76,
    "contacts": [],
    "signals": [
      "Posted Aug 17, 2026 on Fractional Jobs — inside the 72-hour window",
      "First dedicated legal hire framed as fractional GC / Head of Legal at 8–16 hrs/week",
      "AI-sector startup — commercial contracts, IP and governance build-out from scratch"
    ],
    "source": "Fractional Jobs",
    "sourceUrl": "https://www.fractionaljobs.io/jobs/general-counsel-head-of-legal-at-norven",
    "notes": "Grade B (67). Textbook fractional-GC engagement model. Remote scored 12 rather than 15 because it is UK-only, which is likely a hard geographic gate for Mark. Worth logging as a pattern data point even if not actionable — AI startups buying fractional GC at 8–16 hrs/week is a repeating shape in this pipeline."
  },
  {
    "name": "Applied Intuition — Interim Employment Counsel (Sunnyvale Hybrid, $150–275/hr)",
    "website": "https://www.appliedintuition.com/",
    "pipeline": "legal-freelance",
    "industry": "Autonomous vehicle and defense software",
    "location": "Sunnyvale, CA (hybrid)",
    "fundingStage": "",
    "fitScore": 20,
    "intentScore": 47,
    "fitDetails": {
      "fund": 0,
      "corporateContractsMAFinancingVentureSecurities": 0,
      "seniorityCounselGC": 10,
      "compStatedMarketCredible": 10
    },
    "intentDetails": {
      "engagementModelFractionalInterimContract": 15,
      "remoteHybridFlex": 12,
      "postedWithin72h": 10,
      "easyApplyDirectContact": 10
    },
    "vertical": "legal",
    "subvertical": "compliance",
    "engagementModel": "interim",
    "buyerType": "operating-company",
    "compensationText": "$150–$275/hr, 30–40 hrs/week",
    "remoteFlag": "hybrid",
    "employmentTypeRaw": "Interim — 30–40 hrs/week, hybrid",
    "urgencyScore": 74,
    "contacts": [],
    "signals": [
      "Posted Aug 17, 2026 on Go Fractional — inside the 72-hour window",
      "Top-of-market rate band at $150–275/hr for a near-full-time interim engagement",
      "High-profile, well-capitalised buyer scaling headcount fast, which is what drives interim employment-counsel need"
    ],
    "source": "Go Fractional",
    "sourceUrl": "https://www.gofractional.com/job/welcometothejungle-applied-intuition-employment-counsel-welcome-to-the-jungle-login",
    "notes": "Grade B (67) on the rubric, but read the fit score carefully. Practice-area sub-score is 0 — this is employment counsel, not fund/corporate/commercial work, so it is off Mark's stated ICP even though the engagement model and rate are excellent. Included rather than suppressed because employment is not on the low-fit suppression list, but I would not prioritise it unless Mark wants to widen the practice-area aperture. Also 30–40 hrs/week hybrid in Sunnyvale is effectively a full-time onsite commitment."
  },
  {
    "name": "Keyloop — Interim Head of Legal (12-Month Fixed-Term Contract, Reading UK)",
    "website": "https://www.keyloop.com/",
    "pipeline": "legal-freelance",
    "industry": "Automotive retail software / dealer technology platform",
    "location": "Reading, United Kingdom (hybrid)",
    "fundingStage": "",
    "fitScore": 30,
    "intentScore": 33,
    "fitDetails": {
      "fund": 0,
      "corporateContractsMAFinancingVentureSecurities": 10,
      "seniorityCounselGC": 10,
      "compStatedMarketCredible": 10
    },
    "intentDetails": {
      "engagementModelFractionalInterimContract": 15,
      "remoteHybridFlex": 8,
      "postedWithin72h": 0,
      "easyApplyDirectContact": 10
    },
    "vertical": "legal",
    "subvertical": "corporate",
    "engagementModel": "interim",
    "buyerType": "operating-company",
    "compensationText": "$115–$245/hr (equivalent), 30–40 hrs/week",
    "remoteFlag": "hybrid",
    "employmentTypeRaw": "Fixed-term contract — 12 months, 30–40 hrs/week",
    "urgencyScore": 55,
    "contacts": [],
    "signals": [
      "Posted Aug 13, 2026 on Go Fractional as a 12-month fixed-term Head of Legal contract",
      "Stated rate band $115–$245/hr equivalent — market-credible for interim legal leadership",
      "Head-of-function scope implies departmental ownership, not overflow support"
    ],
    "source": "Go Fractional",
    "sourceUrl": "https://www.gofractional.com/job/lever-keyloop-head-of-legal-fixed-term-contract-for-12-months-lever",
    "notes": "Grade B (63). Solid fit — corporate remit, senior title, stated comp — but intent is dragged down by the UK hybrid location and the posting being five days old. Note the employment-type distinction: this is a fixed-term employment contract, effectively temp-employee, not a 1099 fractional retainer."
  },
  {
    "name": "Citrine Informatics — Fractional Contract Manager (1099, Fully Remote, $85–120/hr)",
    "website": "https://citrine.io/",
    "pipeline": "legal-freelance",
    "industry": "Materials informatics / AI R&D software",
    "location": "Fully remote (Eastern Time preferred)",
    "fundingStage": "",
    "fitScore": 20,
    "intentScore": 40,
    "fitDetails": {
      "fund": 0,
      "corporateContractsMAFinancingVentureSecurities": 10,
      "seniorityCounselGC": 0,
      "compStatedMarketCredible": 10
    },
    "intentDetails": {
      "engagementModelFractionalInterimContract": 15,
      "remoteHybridFlex": 15,
      "postedWithin72h": 0,
      "easyApplyDirectContact": 10
    },
    "vertical": "legal",
    "subvertical": "contracts",
    "engagementModel": "fractional",
    "buyerType": "operating-company",
    "compensationText": "$85–$120/hr, 10 hrs/week",
    "remoteFlag": "remote",
    "employmentTypeRaw": "1099 fractional contractor — 10 hrs/week",
    "urgencyScore": 52,
    "contacts": [],
    "signals": [
      "Explicitly labelled 1099 fractional — the cleanest commercial model in today's legal batch",
      "Fully remote, 10 hrs/week, $85–120/hr — low-commitment engagement that is easy to run alongside other work",
      "Commercial contracts remit at an enterprise-selling AI software company",
      "Cross-listed on both Go Fractional (Aug 9) and Fractional Jobs (Aug 10)"
    ],
    "source": "Go Fractional / Fractional Jobs",
    "sourceUrl": "https://www.gofractional.com/job/rippling-fractional-contract-manager-1099",
    "notes": "Grade B (60), lowest of today's batch. Seniority sub-score is 0 because the title is Contract Manager, not counsel — the rate band confirms this sits below counsel-level pricing. Include as a volume/bench opportunity rather than a judgment-work engagement. Nine days old, so the window is narrowing."
  }
];

async function main() {
  let inserted = 0, skipped = 0;
  for (const lead of leads) {
    const existing = await prisma.company.findFirst({ where: { name: lead.name } });
    if (existing) { console.log(`SKIP (exists): ${lead.name}`); skipped++; continue; }
    await prisma.company.create({
      data: {
        name: lead.name,
        website: lead.website,
        pipeline: lead.pipeline,
        industry: lead.industry,
        location: lead.location,
        fundingStage: lead.fundingStage,
        fitScore: lead.fitScore,
        intentScore: lead.intentScore,
        fitDetails: lead.fitDetails,
        intentDetails: lead.intentDetails,
        vertical: lead.vertical,
        subvertical: lead.subvertical,
        engagementModel: lead.engagementModel,
        buyerType: lead.buyerType,
        compensationText: lead.compensationText,
        remoteFlag: lead.remoteFlag,
        employmentTypeRaw: lead.employmentTypeRaw,
        urgencyScore: lead.urgencyScore,
        signals: lead.signals,
        source: lead.source,
        sourceUrl: lead.sourceUrl,
        notes: lead.notes,
        contacts: {
          create: (lead.contacts || []).map((c) => ({
            name: c.name,
            title: c.title,
            email: c.email,
            linkedin: c.linkedin,
          })),
        },
      },
    });
    console.log(`INSERT: ${lead.name}`);
    inserted++;
  }
  console.log(`\nDone. Inserted ${inserted}, skipped ${skipped}.`);
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
