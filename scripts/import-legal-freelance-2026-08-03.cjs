/**
 * Import script: Legal Freelance Scrape 2026-08-03
 * Run: node scripts/import-legal-freelance-2026-08-03.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 * All leads: pipeline = "legal-freelance".
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "Kindness for Capital — Fractional VP / General Counsel (Remote, Part-Time → FT ramp)",
    website: "https://www.fractionaljobs.io/jobs/general-counsel-at-kindness-for-capital",
    pipeline: "legal-freelance",
    industry: "Impact/capital-oriented venture. Hiring a Fractional VP-General Counsel to join an existing GC and advise on corporate legal matters, regulatory compliance, contract review/negotiation, and legal risk management. Part-time engagement with an explicit ramp to full-time GC.",
    location: "Remote (US)",
    fundingStage: "Early / growth-stage venture",
    fitScore: 20,
    intentScore: 50,
    vertical: "legal",
    subvertical: "GC",
    engagementModel: "fractional",
    buyerType: "operating-company",
    compensationText: "Not stated (part-time fractional, ramp to full-time GC)",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional / part-time with ramp to full-time",
    urgencyScore: 65,
    source: "Fractional Jobs / LinkedIn (indexed), Jul 2026",
    sourceUrl: "https://www.fractionaljobs.io/jobs/general-counsel-at-kindness-for-capital",
    signals: ["fractional → full-time ramp (durable engagement)", "joins an existing GC (real legal function, not solo)", "corporate + regulatory + contracts remit", "fully remote", "easy intro-based apply"],
    notes: "Grade B (combined 70). Strong intent match: fractional + remote + easy apply, with a ramp-to-FT path that means recurring revenue. Fit capped because comp isn't stated and it's not fund-specific. PITCH ANGLE: high-judgment corporate/regulatory counsel who can own governance + commercial paper alongside the existing GC; lead with fund/PE-adjacent governance experience to stand out.",
    contacts: [
      { name: null, title: "Hiring team (request intro via Fractional Jobs)", email: null, linkedin: "https://www.linkedin.com/jobs/view/fractional-vp-general-counsel-at-kindness-for-capital-4293316505" }
    ]
  },
  {
    name: "ACC Jobline #54004 — Fractional General Counsel (Remote)",
    website: "https://jobline.acc.com/job/fractional-general-counsel-remote--54004",
    pipeline: "legal-freelance",
    industry: "In-house fractional GC role posted on the Association of Corporate Counsel Jobline (vetted in-house board). Ongoing part-time general counsel remit — corporate governance, commercial contracts, compliance, and risk for a company that wants senior legal leadership without a full-time hire.",
    location: "Remote (US)",
    fundingStage: "",
    fitScore: 20,
    intentScore: 50,
    vertical: "legal",
    subvertical: "GC",
    engagementModel: "fractional",
    buyerType: "operating-company",
    compensationText: "Not stated",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional / part-time general counsel",
    urgencyScore: 60,
    source: "ACC Jobline (Association of Corporate Counsel), Jul 2026",
    sourceUrl: "https://jobline.acc.com/job/fractional-general-counsel-remote--54004",
    signals: ["posted on ACC Jobline (in-house, vetted employers)", "explicit fractional GC engagement", "fully remote", "direct-apply path"],
    notes: "Grade B (combined 70). ACC Jobline consistently surfaces legitimate in-house fractional roles (prior #53153 came from here). PITCH ANGLE: position as an outside/fractional GC who can stand up governance and commercial-contract discipline day one; ask early about scope (funds vs. pure operating company) to confirm fit and rate.",
    contacts: [
      { name: null, title: "Hiring company via ACC Jobline", email: null, linkedin: "https://jobline.acc.com/job/fractional-general-counsel-remote--54004" }
    ]
  },
  {
    name: "HeartStamp — Fractional General Counsel (Generative AI, IP & Commercial)",
    website: "https://www.fractionaljobs.io/jobs/counsel-generative-ai-ip-at-heartstamp",
    pipeline: "legal-freelance",
    industry: "Generative-AI startup building consumer/creator products. Hiring a fractional General Counsel to own IP strategy, commercial contracts, corporate/governance basics, and risk as it scales — the classic 'complex enough to need judgment, too small for full-time' buyer.",
    location: "Remote (US)",
    fundingStage: "Early-stage startup",
    fitScore: 20,
    intentScore: 50,
    vertical: "legal",
    subvertical: "corporate",
    engagementModel: "fractional",
    buyerType: "portfolio-company",
    compensationText: "Not stated (fractional GC engagement)",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional / part-time general counsel",
    urgencyScore: 60,
    source: "Fractional Jobs (indexed), Jul 2026",
    sourceUrl: "https://www.fractionaljobs.io/jobs/counsel-generative-ai-ip-at-heartstamp",
    signals: ["fractional GC, fully remote", "IP + commercial + corporate remit", "early-stage scaling moment", "easy intro-based apply"],
    notes: "Grade B (combined 70). Slightly lower fit — IP-heavy vs. Katie's core fund/corporate lane — but strong on engagement model, remote, and easy apply. PITCH ANGLE: emphasize commercial-contract and corporate/governance depth; treat the IP work as a stretch, not the core sell. Good foot-in-the-door fractional relationship.",
    contacts: [
      { name: null, title: "Founder / hiring (request intro via Fractional Jobs)", email: null, linkedin: "https://www.fractionaljobs.io/jobs/counsel-generative-ai-ip-at-heartstamp" }
    ]
  },
  {
    name: "Frive — Fractional General Counsel (Part-Time, 10–20 hrs/wk, Remote)",
    website: "https://www.fractionaljobs.io/",
    pipeline: "legal-freelance",
    industry: "Growth-stage company (fractionaljobs.io listing, posted ~Jul 27, 2026) hiring a fractional GC at 10–20 hrs/week — corporate legal, commercial contracts, and compliance support without a full-time hire.",
    location: "Remote (US)",
    fundingStage: "Growth-stage startup",
    fitScore: 20,
    intentScore: 50,
    vertical: "legal",
    subvertical: "GC",
    engagementModel: "fractional",
    buyerType: "operating-company",
    compensationText: "Not stated (10–20 hrs/wk fractional)",
    remoteFlag: "remote",
    employmentTypeRaw: "Fractional / part-time (10–20 hrs/wk)",
    urgencyScore: 62,
    source: "Fractional Jobs board (indexed), posted ~Jul 27, 2026",
    sourceUrl: "https://www.fractionaljobs.io/",
    signals: ["defined 10–20 hrs/wk cadence (clean fractional scope)", "recent posting (~Jul 27)", "fully remote", "easy intro-based apply"],
    notes: "Grade B (combined 70). Clean, well-scoped part-time cadence — easy to run alongside other engagements. URL is the board root (specific slug not resolved via search); confirm the live posting on fractionaljobs.io before outreach. PITCH ANGLE: senior corporate/commercial counsel who slots into a 10–20 hr/wk rhythm with no ramp.",
    contacts: [
      { name: null, title: "Hiring company (request intro via Fractional Jobs)", email: null, linkedin: "https://www.fractionaljobs.io/" }
    ]
  },
  {
    name: "Next Era Legal — Embedded / Fractional GC Firm, Bench Expansion (ALSP)",
    website: "https://nexteralegal.com/fractional-general-counsel/",
    pipeline: "legal-freelance",
    industry: "ALSP scaling an embedded Fractional General Counsel model — places senior counsel into leadership teams of PE-backed platforms (e.g., a 14-brand PE-backed HVAC platform), franchise, and multi-state service operators. Actively expanding its bench of fractional GCs.",
    location: "Remote (US)",
    fundingStage: "ALSP / talent firm",
    fitScore: 20,
    intentScore: 40,
    vertical: "legal",
    subvertical: "GC",
    engagementModel: "fractional",
    buyerType: "ALSP",
    compensationText: "Not stated (ALSP bench / engagement rates)",
    remoteFlag: "remote",
    employmentTypeRaw: "Embedded fractional GC via ALSP bench",
    urgencyScore: 50,
    source: "Web search (Next Era Legal + PRNewswire), 2026",
    sourceUrl: "https://nexteralegal.com/fractional-general-counsel/",
    signals: ["actively scaling fractional GC bench", "places into PE-backed platform / multi-state operators", "embedded model = repeat, durable work", "remote"],
    notes: "Grade B (combined 60). Different play from a single job: this is a BENCH/NETWORK to join, giving Katie a channel of PE-backed portfolio-company GC work. ACTION: apply to the bench; lead with corporate/M&A + governance and comfort embedding in PE-backed operator leadership teams.",
    contacts: [
      { name: null, title: "Recruiting / bench (join via firm site)", email: null, linkedin: "https://nexteralegal.com/fractional-general-counsel/" }
    ]
  },
  {
    name: "Lyfecoin — Fractional General Counsel (Crypto / Securities, Remote)",
    website: "https://www.legal.io/jobs/5660179/Other/Fractional-General-Counsel/Remote",
    pipeline: "legal-freelance",
    industry: "Early-stage crypto/consumer app. Hiring a fractional GC for entity formation, IP, securities (trading in securities as required), contracts/hiring, internal operating docs, user terms, data policy, and general compliance — advisory + executional, part-time / as-needed.",
    location: "Remote (US)",
    fundingStage: "Early-stage startup (pre-revenue)",
    fitScore: 20,
    intentScore: 40,
    vertical: "legal",
    subvertical: "securities",
    engagementModel: "fractional",
    buyerType: "portfolio-company",
    compensationText: "Equity only; cash compensation deferred, no benefits (may evolve into a paid role) — NOT market-credible today",
    remoteFlag: "remote",
    employmentTypeRaw: "Part-time / project-based, equity-compensated",
    urgencyScore: 45,
    source: "Legal.io (listing #5660179), 2026",
    sourceUrl: "https://www.legal.io/jobs/5660179/Other/Fractional-General-Counsel/Remote",
    signals: ["securities + formation + compliance remit (on-ICP subvertical)", "fractional / as-needed, fully remote", "easy apply via Legal.io", "COMP RED FLAG: equity-only, cash deferred"],
    notes: "Grade B (combined 60) but LOWEST-PRIORITY of the run. On-ICP subvertical (securities) and clean fractional/remote model, but compensation is equity-only with deferred cash — fails the market-credible-comp test. ONLY worth a conversation if Katie wants crypto/securities reps or upside exposure; otherwise deprioritize vs. the paid fractional roles above.",
    contacts: [
      { name: null, title: "Founder / hiring via Legal.io", email: null, linkedin: "https://www.linkedin.com/jobs/view/fractional-general-counsel-at-lyfecoin-4240302578" }
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
        scrapeDate: new Date("2026-08-03")
      }
    });

    console.log(`CREATED: ${lead.name}`);
    created++;
  }
  console.log(`\nDone. Created ${created}, skipped ${skipped}.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
