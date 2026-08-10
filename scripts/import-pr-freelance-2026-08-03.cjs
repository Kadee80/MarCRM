/**
 * Import script: PR Freelance Scrape 2026-08-03
 * Run: node scripts/import-pr-freelance-2026-08-03.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "Torry Harris Integration Solutions — Freelance PR & Communications Manager (B2B Enterprise SaaS)",
    website: "https://www.torryharris.com",
    pipeline: "pr-freelance",
    industry: "B2B enterprise integration, API strategy and SaaS marketplace platform provider (founded 1998, HQ New Jersey; 20+ yrs delivering IT/API solutions to enterprises worldwide). Hiring a freelance PR & Communications Manager to run B2B tech earned media and messaging for its Enterprise SaaS marketplace platform.",
    location: "Remote (US)",
    fundingStage: "Established private company",
    fitScore: 45,
    intentScore: 30,
    vertical: "pr",
    subvertical: "media-relations",
    engagementModel: "freelance",
    buyerType: "operating-company",
    compensationText: "$40–$50/hour, 15–20 hours/week",
    remoteFlag: "remote",
    employmentTypeRaw: "Freelance / 1099 (100% remote); 5–8+ yrs B2B Tech PR, Enterprise SaaS",
    urgencyScore: 65,
    source: "Web search — JobLeads / LinkedIn (Torry Harris Integration Solutions), Aug 2026",
    sourceUrl: "https://www.jobleads.com/us/job/remote-us-pr-communications-lead-b2b-saas--united-states--e1a17fc71561786e886eecd8d3421d945",
    notes: "Grade B (combined 75). Cleanest fresh lead of the run. Direct B2B/Enterprise SaaS operating company hiring a true freelance PR manager, 100% remote, part-time — exactly Mark's plug-in-fast, strategic+executional model. Rate ($40–50/hr) is modest vs. Mark's senior level, so pitch scope-based value (media placements, launch narratives) rather than hours. ACTION: apply directly; lead with enterprise-tech/B2B media wins and a product-launch + thought-leadership sample plan.",
    contacts: [
      { name: null, title: "Recruiting / Talent (apply via posting)", email: null, linkedin: "https://www.linkedin.com/company/torry-harris-integration-solutions" }
    ]
  },
  {
    name: "Thumbtack — Senior Manager, Public Relations (Part-Time Contract)",
    website: "https://www.thumbtack.com",
    pipeline: "pr-freelance",
    industry: "Consumer home-services marketplace app connecting homeowners with 300k+ local service businesses. Role sits in the Brand & Comms org, working alongside a retained agency: corporate + consumer PR, product-launch and data storytelling, executive visibility / thought leadership, and narrative development for new C-suite hires.",
    location: "Remote (US)",
    fundingStage: "Late-stage / pre-IPO venture-backed tech",
    fitScore: 35,
    intentScore: 30,
    vertical: "pr",
    subvertical: "executive-comms",
    engagementModel: "contract",
    buyerType: "pre-ipo",
    compensationText: "$120–$130/hour; ~20 hours/week; not eligible for company benefits",
    remoteFlag: "remote",
    employmentTypeRaw: "Part-time contract / U.S. independent contractor (posting states Jan–Jul 2026 window; 7–10+ yrs PR)",
    urgencyScore: 30,
    source: "Web fetch — Greenhouse (Thumbtack), Aug 2026",
    sourceUrl: "https://job-boards.greenhouse.io/thumbtack/jobs/7449537",
    notes: "Grade B (combined 65) but CAVEAT: the posting's stated contract window is Jan–Jul 2026, which has elapsed as of 2026-08-03; the Greenhouse listing is still live. Excellent rate ($120–130/hr) and senior scope (agency management, exec thought leadership) make it worth a speculative note in case they extend or re-post. ACTION: send a short 'saw the SM PR contract — are you extending or re-opening?' outreach rather than a cold formal application; if re-opened, strong senior fit despite non-finance sector.",
    contacts: [
      { name: null, title: "Recruiting Ops (general HR/accommodations inbox — not the application path)", email: "recruitingops@thumbtack.com", linkedin: "https://www.linkedin.com/company/thumbtack" }
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
