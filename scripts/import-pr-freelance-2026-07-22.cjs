/**
 * Import script: PR Freelance Scrape 2026-07-22
 * Run: node scripts/import-pr-freelance-2026-07-22.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally — Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const leads = [
  {
    name: "The Public Relations Collective — Senior Independent PR Alliance (Member Bench)",
    website: "https://thepublicrelationscollective.com",
    pipeline: "pr-freelance",
    industry: "Nationwide alliance of senior-level independent PR & communications professionals; strategic counsel, media relations, thought leadership and full-service comms via flexible engagement models to organizations and agencies",
    location: "Remote / nationwide (US)",
    fundingStage: "n/a — professional alliance/network, launched 2026-07-15",
    fitScore: 50,
    intentScore: 40,
    vertical: "pr",
    subvertical: "agency-overflow",
    engagementModel: "fractional",
    buyerType: "agency",
    compensationText: "Not published — per-engagement economics negotiated; clients work directly with senior members",
    remoteFlag: "remote",
    employmentTypeRaw: "Independent member of a professional alliance; project-based / fractional / full-service engagements",
    urgencyScore: 70,
    source: "Launch coverage (citybiz, Morningstar/AccessWire, Capitol Communicator) + alliance About/FAQ pages, July 2026",
    sourceUrl: "https://thepublicrelationscollective.com/about",
    notes: "Grade A (combined 90), standout this week. Launched 2026-07-15 as a nationwide alliance of 15+-year senior independent PR/comms pros delivering strategic counsel + execution to organizations AND agencies via project-based, fractional and full-service models — exactly Mark's senior operator positioning. Routes both direct-client and agency-overflow demand through one relationship. ACTION: apply for membership with senior one-pager (bio + 3-4 marquee earned-media results + named finance/B2B/IR/crisis specialisms); reference the 07-15 launch to join the founding cohort; ask how agency-overflow leads are distributed to members. CAVEATS: high vetting bar; per-engagement economics unpublished — clarify revenue split/lead-routing; intake process may still be forming.",
    contacts: [
      {
        name: null,
        title: "Membership / general enquiries",
        email: null,
        linkedin: "https://thepublicrelationscollective.com/about"
      }
    ]
  },
  {
    name: "TrizCom Public Relations — White-Label / Ad Agency Partnership Program",
    website: "https://www.trizcom.com",
    pipeline: "pr-freelance",
    industry: "Full-service boutique PR firm (Dallas, TX) offering white-label PR to ad/marketing agencies; practices span B2B, banking & financial, technology, healthcare, franchise, crisis, IR and thought leadership; founding member of The Public Relations Collective",
    location: "Remote-friendly (firm HQ Dallas, TX)",
    fundingStage: "n/a — independent agency, founded 2008 (woman-owned)",
    fitScore: 50,
    intentScore: 30,
    vertical: "pr",
    subvertical: "agency-overflow",
    engagementModel: "contract",
    buyerType: "agency",
    compensationText: "Not published — firm marks up subcontracted PR 30-40% to agency clients; freelancer rate negotiated directly",
    remoteFlag: "remote",
    employmentTypeRaw: "White-label subcontractor / behind-the-scenes account team member for the firm's ad-agency partners",
    urgencyScore: 45,
    source: "TrizCom PR White-Label / Ad Agency Partnership page + firm site, July 2026",
    sourceUrl: "https://www.trizcom.com/white-label-pr",
    notes: "Grade A- (combined 80). Established (2008) woman-owned Dallas PR firm with a formal white-label program that lets agencies resell full-service PR; execution delivered by senior pros who stay behind the scenes — the senior subcontractor slot Mark fills. Named Banking & Financial + B2B practices; IR/crisis/thought-leadership depth. Founding member of The Public Relations Collective (complementary entry point). ACTION: email founder Jo Trizila (jo@trizcom.com) for a white-label capacity conversation; lead with finance/B2B earned-media results. CAVEATS: client base skews consumer/franchise — position finance/B2B as the differentiator; no published rate (30-40% markup sets the ceiling); BD conversation, not a live req.",
    contacts: [
      {
        name: "Jo Trizila",
        title: "Founder & CEO, TrizCom PR",
        email: "jo@trizcom.com",
        linkedin: "https://www.linkedin.com/company/trizcom"
      }
    ]
  },
  {
    name: "10 to 1 Public Relations — White-Label / Overflow PR Program",
    website: "https://10to1pr.com",
    pipeline: "pr-freelance",
    industry: "Award-winning PR firm (Phoenix, AZ; IPREX network member) offering white-label PR for agencies on ongoing or overflow basis; client base spans B2B and service-side B2C incl. finance, technology, professional services, healthcare (clients incl. Intel)",
    location: "Remote-friendly (firm HQ Phoenix, AZ)",
    fundingStage: "n/a — independent agency",
    fitScore: 50,
    intentScore: 30,
    vertical: "pr",
    subvertical: "agency-overflow",
    engagementModel: "contract",
    buyerType: "agency",
    compensationText: "Not published — freelancer/subcontract rate negotiated directly",
    remoteFlag: "remote",
    employmentTypeRaw: "White-label / overflow subcontractor for the firm's agency partners",
    urgencyScore: 42,
    source: "10 to 1 Public Relations White-Label PR Services page, July 2026",
    sourceUrl: "https://10to1pr.com/white-label-pr-services/",
    notes: "Grade B (combined 80). Phoenix-based, multi-award-winning firm (IPREX member) explicitly offering white-label PR to agencies for 'ongoing or overflow work' as a strategy-led third-party. Client roster B2B + service-side B2C across Finance, Technology, Professional Services, Healthcare, Real Estate, Manufacturing (incl. Intel) — tighter finance/B2B fit than a consumer shop. ACTION: use site contact/white-label path to request a senior overflow capacity conversation; position media relations, thought leadership and corporate/financial comms. CAVEATS: BD conversation not a live req; no published rate; confirm they want senior strategic subcontractors vs. junior execution.",
    contacts: [
      {
        name: null,
        title: "New business / white-label enquiries",
        email: null,
        linkedin: "https://www.linkedin.com/company/10-to-1-public-relations"
      }
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
        scrapeDate: new Date("2026-07-22")
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
