/**
 * Import script: Daily Scrape 2026-08-13
 * Run: node scripts/import-2026-08-13.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "UB Greensfelder — Contract Funds / Investment Management Attorney (Remote, Independent Contractor)",
    website: "https://www.ubglaw.com",
    pipeline: "legal-freelance",
    industry: "Legal services (law firm — hedge fund / PE / investment management practice)",
    location: "Remote (Central Time Zone or New York area)",
    fundingStage: "",
    fitScore: 46,
    intentScore: 38,
    fitDetails: {"fundPrivateFunds": 20, "corporateCommercialMA": 8, "seniorityCounselGC": 10, "compStatedCredible": 8},
    intentDetails: {"engagementModelFractionalContract": 15, "remoteHybridFlex": 15, "posted72h": 3, "easyApplyDirectContact": 5},
    vertical: "legal",
    subvertical: "fund",
    engagementModel: "contract",
    buyerType: "law-firm",
    compensationText: "~$275/hour",
    remoteFlag: "remote",
    employmentTypeRaw: "ongoing independent contractor",
    urgencyScore: 62,
    signals: ["Seeking experienced transactional attorney with strong hedge fund / PE / investment management background", "Supports sophisticated institutional clients on an ongoing independent-contractor basis", "Fully remote; candidate must reside in Central Time Zone or NY area", "~$275/hour", "Firm formed 2024 (Ulmer & Berne + Greensfelder merger); 275 attorneys, established PE/hedge-fund practice"],
    source: "Indeed / ZipRecruiter indexed posting + firm verification",
    sourceUrl: "https://www.ropesgrayrecruiting.com/en/life-at-ropes-and-gray/positions/funds-attorney-asset-management-group-remote",
    notes: "Grade A (84). Best-fit legal-freelance lead this run: clean fund/private-funds practice + explicit 1099 independent-contractor engagement + senior transactional seniority + stated market-credible comp. Genuine 1099 (not temp W-2). sourceUrl is best-effort landing for the funds-attorney contract cluster — verify the live UB Greensfelder posting before outreach.",
    contacts: []
  },
  {
    name: "Codat — Senior Legal Counsel (16-Month Fixed-Term Contract, Remote)",
    website: "https://www.codat.io",
    pipeline: "legal-freelance",
    industry: "FinTech (financial data / API infrastructure)",
    location: "Remote (US / UK / Canada client coverage)",
    fundingStage: "",
    fitScore: 24,
    intentScore: 36,
    fitDetails: {"fundPrivateFunds": 0, "corporateCommercialMA": 10, "seniorityCounselGC": 10, "compStatedCredible": 4},
    intentDetails: {"engagementModelFractionalContract": 15, "remoteHybridFlex": 15, "posted72h": 3, "easyApplyDirectContact": 3},
    vertical: "legal",
    subvertical: "contracts",
    engagementModel: "contract",
    buyerType: "operating-company",
    compensationText: "not stated (aggregator band ~$129-$140/hr for comparable remote roles)",
    remoteFlag: "remote",
    employmentTypeRaw: "16-month fixed-term contract",
    urgencyScore: 48,
    signals: ["Leads technology contract negotiations with UK/US/Canada financial-institution clients (redlines, deal velocity, GTM partner)", "Also builds out AI-enabled legal infrastructure", "Hands-on, commercially focused, fixed-term contract"],
    source: "Go Fractional / AshbyHQ indexed posting",
    sourceUrl: "https://www.gofractional.com/job/ashbyhq-senior-legal-counsel-codat-jobs",
    notes: "Grade B (60). Commercial-contracts fit, fintech buyer. EMPLOYMENT-TYPE FLAG: 16-month FIXED-TERM CONTRACT (interim W-2-style), not a true 1099/fractional retainer — engagementModel 'contract' but note the commercial arrangement is closer to interim than freelance. No fund practice, so fit capped mid-20s.",
    contacts: []
  },
  {
    name: "AE Studio — Fractional General Counsel (Hybrid LA, Contract-to-Hire)",
    website: "https://ae.studio",
    pipeline: "legal-freelance",
    industry: "Software / product development studio",
    location: "Los Angeles, CA (hybrid)",
    fundingStage: "",
    fitScore: 25,
    intentScore: 30,
    fitDetails: {"fundPrivateFunds": 0, "corporateCommercialMA": 5, "seniorityCounselGC": 10, "compStatedCredible": 10},
    intentDetails: {"engagementModelFractionalContract": 15, "remoteHybridFlex": 10, "posted72h": 0, "easyApplyDirectContact": 5},
    vertical: "legal",
    subvertical: "GC",
    engagementModel: "fractional",
    buyerType: "operating-company",
    compensationText: "$175-$260/hour, 10-30 hrs/week",
    remoteFlag: "hybrid",
    employmentTypeRaw: "contract-to-hire, fractional",
    urgencyScore: 38,
    signals: ["Fractional GC, 10-30 hrs/week, contract-to-hire", "$175-$260/hour, hybrid Los Angeles", "Posted ~2026-07-25"],
    source: "Indexed job posting (Glassdoor / ACC Jobline)",
    sourceUrl: "https://jobline.acc.com/job/fractional-general-counsel-remote--54004",
    notes: "Grade C (55). Genuine fractional GC with stated market comp, but generalist (no fund/corporate specialization confirmed), hybrid (not remote), ~3 weeks old so recency intent is zero. Bench filler; deprioritize vs UB Greensfelder.",
    contacts: []
  },
  {
    name: "Gravity — $30.5M Series A (Agent-to-Agent Advertising Platform)",
    website: "https://gravity.co",
    pipeline: "pr-marketing",
    industry: "AdTech / AI infrastructure (B2B)",
    location: "San Francisco, CA",
    fundingStage: "Series A ($30.5M; total ~$38.5M)",
    fitScore: 43,
    intentScore: 35,
    fitDetails: {"industryMatchFSTech": 6, "stageSizeGrowth": 10, "b2bBuyerSalesMotion": 10, "proofAssets": 9, "budget5k25k": 8},
    intentDetails: {"triggerPresent": 15, "timelineToStart": 8, "decisionMakerEngaged": 5, "urgencyPain": 5, "responsiveness": 2},
    vertical: "",
    subvertical: "",
    engagementModel: "",
    buyerType: "",
    compensationText: "",
    remoteFlag: "",
    employmentTypeRaw: "",
    urgencyScore: 0,
    signals: ["$30.5M Series A announced 2026-08-12, co-led by Lightspeed Venture Partners and Committed Capital", "Participation: Basis Set Ventures, Caffeinated Capital, GGF, Haystack, Logos Fund", "Full-stack ad platform (DSP + SSP + exchange); places text ads in ChatGPT, Codebuff, Runable; clients include Vercel and MongoDB", "New A2A programmatic protocol targeting machine-to-machine transactions"],
    source: "FinSMEs / Dealroom / TheNextWeb",
    sourceUrl: "https://www.finsmes.com/2026/08/gravity-raises-30-5m-in-series-a-funding.html",
    notes: "Grade B (78). Fresh 1-day-old funding trigger with a novel, media-friendly 'ads for AI agents' story + marquee clients (Vercel, MongoDB). Off-core FS so industry sub-score reduced to 6; routed pr-marketing (business event, not job posting). Pitch category thought-leadership + launch-comms retainer on the A2A protocol. Website gravity.co best-effort — verify (common name).",
    contacts: []
  },
  {
    name: "Sapiom — $35M Series A (AI Agent Infrastructure / Model Routing)",
    website: "https://sapiom.ai",
    pipeline: "pr-marketing",
    industry: "AI infrastructure / developer tooling (B2B)",
    location: "San Francisco, CA",
    fundingStage: "Series A ($35M)",
    fitScore: 40,
    intentScore: 33,
    fitDetails: {"industryMatchFSTech": 6, "stageSizeGrowth": 10, "b2bBuyerSalesMotion": 9, "proofAssets": 9, "budget5k25k": 6},
    intentDetails: {"triggerPresent": 15, "timelineToStart": 7, "decisionMakerEngaged": 4, "urgencyPain": 5, "responsiveness": 2},
    vertical: "",
    subvertical: "",
    engagementModel: "",
    buyerType: "",
    compensationText: "",
    remoteFlag: "",
    employmentTypeRaw: "",
    urgencyScore: 0,
    signals: ["$35M Series A announced 2026-08-12; Anthropic among backers", "Router sends each agent call to the cheapest capable model; cut Polsia's monthly token bill ~$1.2M -> ~$100k (10x)", "Positioned as the AI-agent production/infra layer ('power the next trillion AI agents')"],
    source: "FinSMEs / Yahoo / TheNextWeb",
    sourceUrl: "https://www.finsmes.com/2026/08/sapiom-raises-35m-in-series-a-funding.html",
    notes: "Grade B (73). Fresh Series A with a quantified, quotable proof point (10x cost savings) and strategic backer (Anthropic) = strong earned-media hook. Off-core FS (dev infra), industry sub-score reduced; routed pr-marketing on the funding trigger. Secondary to Gravity. Possible ai-consulting cross-sell later, though Sapiom is a vendor, not an AI-adopter buyer.",
    contacts: []
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
