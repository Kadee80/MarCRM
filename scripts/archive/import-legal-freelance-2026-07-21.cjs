/**
 * Import script: Legal Freelance Scrape 2026-07-21
 * Run: node scripts/import-legal-freelance-2026-07-21.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 * All leads: pipeline = "legal-freelance".
 *
 * NOTE: 2 leads this run. Three additional candidates (GeneFab, Robert Half Remote
 * Part-Time Corporate & Securities, LearnTastic) were dropped as already present in
 * the CRM from earlier scrapes; the name-based guard below would have skipped them
 * anyway, but they were removed at report level to keep the report accurate.
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "Water Quality Association — Fractional General Counsel",
    website: "https://wqa.org",
    pipeline: "legal-freelance",
    industry: "Not-for-profit trade association for the residential, commercial, and industrial water treatment industry; represents manufacturers, suppliers, and dealers, and runs a product certification/testing program",
    location: "Chicago, IL (hybrid)",
    fundingStage: "Established trade association (non-profit, membership-funded)",
    fitScore: 30,
    intentScore: 50,
    vertical: "legal",
    subvertical: "GC",
    engagementModel: "fractional",
    buyerType: "operating-company",
    compensationText: "$14.6K–$18.8K per month, 24 hours/week",
    remoteFlag: "hybrid",
    employmentTypeRaw: "Fractional General Counsel, 24 hrs/week, hybrid Chicago",
    urgencyScore: 80,
    source: "Fractional Jobs (fractionaljobs.io), posted 2026-07-20",
    sourceUrl: "https://www.fractionaljobs.io/",
    notes: "Grade A (combined 80) — highest-scoring lead this run and the only one where engagement model, recency, and comp all check out simultaneously. WHAT IT IS: a membership trade association that also runs a product certification/testing program, hiring its own fractional GC at 24 hrs/week. WHY IT FITS: classic ICP shape — enough legal complexity (member governance, certification program contracts and licensing, vendor paper, board/committee governance, entity maintenance) to need judgment, not enough volume to justify a full-time GC. Katie's corporate governance and commercial contracts work maps directly. NO FUND ANGLE — the fit score of 30 is entirely corporate/governance/seniority/comp, zero on fund focus. CAVEATS: (1) Hybrid Chicago is the real constraint — confirm how many days on-site are actually required before investing time; if it is genuinely 2-3 days/week in the Chicago area this is a non-starter unless she is willing to travel. (2) 24 hrs/week is a large share of capacity — it would function as an anchor client, not a side engagement, so it is a portfolio decision. (3) Trade associations carry antitrust sensitivity around member conduct and standard-setting; if she has no antitrust exposure, say so plainly and propose outside antitrust counsel for those questions rather than overstating. (4) Source URL is the Fractional Jobs board index rather than a stable per-job permalink — the listing was surfaced via search and the direct job URL could not be isolated; find it on the board before applying. PITCH: lead with governance-plus-contracts as a package — board and committee support, certification program agreements, vendor and event contracts, entity housekeeping — and position the fractional structure as GC-level judgment at roughly half the loaded cost of a full-time hire. ACTION: verify the on-site requirement first, then apply via the Fractional Jobs listing.",
    contacts: [
      { name: "Water Quality Association — Staff Leadership", title: "Executive team (hiring contact not named in posting)", email: "", linkedin: "https://www.linkedin.com/company/water-quality-association" }
    ]
  },
  {
    name: "Bowery Legal (Interplay Venture Capital) — Investment Funds Attorney",
    website: "https://www.interplay.vc",
    pipeline: "legal-freelance",
    industry: "Boutique corporate/transactional and investment funds law firm affiliated with Interplay Venture Capital; attorneys trained at Latham, Gunderson Dettmer, Skadden, Mayer Brown, Greenberg Traurig, Baker McKenzie",
    location: "New York, NY (remote-eligible)",
    fundingStage: "Boutique law firm attached to an active VC platform",
    fitScore: 50,
    intentScore: 25,
    vertical: "legal",
    subvertical: "fund",
    engagementModel: "contract",
    buyerType: "law-firm",
    compensationText: "$200,000–$250,000 annually (full-time salaried)",
    remoteFlag: "remote",
    employmentTypeRaw: "Full-time, senior level, in-office or remote (New York, NY)",
    urgencyScore: 55,
    source: "Built In NYC job board (Interplay Venture Capital / Bowery Legal), reposted ~2026-07-11",
    sourceUrl: "https://www.builtinnyc.com/job/investment-funds-attorney/8041926",
    notes: "Grade B (combined 75) — highest FIT score of the run (50/50) and the lowest intent (25/50). READ THIS CAVEAT BEFORE ACTING: posted as a FULL-TIME SALARIED role at $200-250K. It does not satisfy the ICP's engagement-model test and is not an apply-as-freelance posting. It is in this report as a RELATIONSHIP TARGET, because the practice-area overlap is close to exact and two details suggest an opening for a flexible pitch: the role has been reposted (hard to fill at that comp for that skillset), and the scope explicitly includes training other Bowery attorneys on funds work and building playbooks and templates — a knowledge-transfer mandate, which is exactly the kind of work that delivers well on a fractional or project basis. WHY IT MATTERS: Bowery is a boutique attached to Interplay VC, so it has recurring fund-launch volume and the ICP profile of 'law firm needing overflow or specialist support for fund formation.' Given that public boards have not produced a qualifying freelance fund posting in four consecutive runs, a relationship with a funds boutique that has continuous launch volume is arguably worth more than any single posting. PITCH: do not apply to the posting as written. Approach the funds partner directly with a scoped alternative — overflow capacity on live fund formations during launch crunches, plus a defined engagement to build the LPA/PPM/side-letter/MFN template set and train the associates. Frame it as standing up the funds capability now rather than waiting for the right full-time hire, and note it can convert if volume justifies it. If they only want a full-time body, this becomes a network contact rather than a client. ACTION: identify the funds partner on LinkedIn and send a direct scoped-overflow note; do not route through the Ashby application.",
    contacts: [
      { name: "Bowery Legal — Hiring Team", title: "Investment Funds Practice", email: "", linkedin: "https://www.linkedin.com/company/interplay-vc" }
    ]
  }
];

async function main() {
  let created = 0;
  let skipped = 0;

  for (const lead of leads) {
    const existing = await prisma.company.findFirst({ where: { name: lead.name } });
    if (existing) {
      console.log(`SKIP (exists): ${lead.name}`);
      skipped++;
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
        scrapeDate: new Date("2026-07-21")
      }
    });

    console.log(`CREATED: ${lead.name} (fit ${lead.fitScore} / intent ${lead.intentScore})`);
    created++;
  }

  console.log(`\nDone. Created ${created}, skipped ${skipped}, total ${leads.length}.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
