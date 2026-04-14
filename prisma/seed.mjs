import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding MarCRM database...");

  // Clear existing data
  await prisma.contact.deleteMany();
  await prisma.company.deleteMany();
  await prisma.scrapeResult.deleteMany();

  // ─── Seed Companies ─────────────────────────────────────────────
  const companies = [
    {
      name: "Apex Fintech Solutions", website: "apexfintech.io", pipeline: "pr-marketing",
      industry: "Fintech (B2B)", size: "51-200", revenue: "$5M-$10M", location: "Austin, TX",
      fundingStage: "Series A", techStack: JSON.stringify(["HubSpot", "Google Ads", "Segment"]),
      stage: "Qualified", fitScore: 42, intentScore: 38, starred: true,
      notes: "Strong DTC fintech scaling fast. Currently spending $80K/mo on paid media. Needs credibility + earned media strategy.",
      lastActivity: "2026-04-10", source: "Clutch",
      fitDetails: JSON.stringify({ industry: 10, stage: 8, buyer: 8, proof: 8, budget: 8 }),
      intentDetails: JSON.stringify({ trigger: 12, timeline: 8, dm_engaged: 8, urgency: 6, responsive: 4 }),
    },
    {
      name: "NovaBright Solar Fund LP", website: "novabrightfund.com", pipeline: "fund-formation",
      industry: "Clean Energy / PE", size: "1-10", revenue: "<$1M", location: "Denver, CO",
      fundingStage: "Pre-launch", techStack: JSON.stringify([]),
      stage: "Engaged", fitScore: 40, intentScore: 35, starred: false,
      notes: "First-time fund manager spinning out from larger platform. $75M target raise. Has anchor interest from family office.",
      lastActivity: "2026-04-08", source: "Referral (Admin)",
      fitDetails: JSON.stringify({ manager_type: 15, strategy: 8, ops_readiness: 7, jurisdiction: 3, budget: 7 }),
      intentDetails: JSON.stringify({ anchor: 12, launch_window: 8, providers: 5, urgency: 7, referral: 3 }),
    },
    {
      name: "UrbanBite Delivery", website: "urbanbite.io", pipeline: "coaching-ops",
      industry: "Food & Beverage / Tech-Enabled", size: "11-50", revenue: "$1M-$5M", location: "Chicago, IL",
      fundingStage: "Seed", techStack: JSON.stringify(["React", "Stripe", "Notion", "Slack"]),
      stage: "Discovery Complete", fitScore: 35, intentScore: 30, starred: false,
      notes: "Founder-led, referral-dependent. Making money but sales inconsistent. Need a real pipeline + ops system.",
      lastActivity: "2026-04-12", source: "LinkedIn",
      fitDetails: JSON.stringify({ revenue: 12, niche: 8, margin: 5, dm_access: 7, coachable: 3 }),
      intentDetails: JSON.stringify({ trigger: 12, timeline: 6, pain: 7, responsive: 3, budget: 2 }),
    },
    {
      name: "Pinnacle Wellness Group", website: "pinnaclewellness.com", pipeline: "pr-marketing",
      industry: "Health & Wellness (DTC)", size: "51-200", revenue: "$5M-$10M", location: "Miami, FL",
      fundingStage: "Bootstrapped", techStack: JSON.stringify(["Shopify", "Klaviyo", "Meta Ads", "Google Analytics"]),
      stage: "Won", fitScore: 45, intentScore: 40, starred: true,
      notes: "Current client. Monthly retainer for social + paid + PR. Expanding to 3 new locations.",
      lastActivity: "2026-04-13", source: "Referral",
      fitDetails: JSON.stringify({ industry: 9, stage: 9, buyer: 9, proof: 9, budget: 9 }),
      intentDetails: JSON.stringify({ trigger: 12, timeline: 9, dm_engaged: 8, urgency: 7, responsive: 4 }),
    },
    {
      name: "CloudMesh Technologies", website: "cloudmesh.dev", pipeline: "ai-consulting",
      industry: "SaaS / B2B", size: "201-500", revenue: "$10M-$50M", location: "San Francisco, CA",
      fundingStage: "Series C", techStack: JSON.stringify(["Snowflake", "dbt", "HubSpot", "Drift"]),
      stage: "Contacted", fitScore: 38, intentScore: 28, starred: false,
      notes: "B2B SaaS. Ran 2 AI pilots that didn't scale. Posting about need for AI governance. Hiring ML Engineer + AI PM.",
      lastActivity: "2026-04-06", source: "Job Board Scrape",
      fitDetails: JSON.stringify({ industry: 9, data_maturity: 7, use_case: 8, buyer_access: 7, budget: 7 }),
      intentDetails: JSON.stringify({ signal: 12, timeline: 5, pain: 6, sponsor: 3, responsive: 2 }),
    },
    {
      name: "Meridian Capital Partners", website: "meridiancappartners.com", pipeline: "fund-formation",
      industry: "Hedge Fund", size: "1-10", revenue: "<$1M", location: "New York, NY",
      fundingStage: "Pre-launch", techStack: JSON.stringify([]),
      stage: "Proposal Sent", fitScore: 44, intentScore: 42, starred: true,
      notes: "Ex-Goldman PM launching Fund I. $150M target. Anchor from endowment. Needs PPM/LPA fast. Admin referred them.",
      lastActivity: "2026-04-11", source: "Admin Referral",
      fitDetails: JSON.stringify({ manager_type: 15, strategy: 10, ops_readiness: 9, jurisdiction: 3, budget: 7 }),
      intentDetails: JSON.stringify({ anchor: 15, launch_window: 10, providers: 8, urgency: 5, referral: 4 }),
    },
    {
      name: "SecureLayer AI", website: "securelayer.ai", pipeline: "media",
      industry: "Cybersecurity / AI", size: "51-200", revenue: "$5M-$10M", location: "Boston, MA",
      fundingStage: "Series B", techStack: JSON.stringify(["Next.js", "Salesforce", "Mixpanel"]),
      stage: "Engaged", fitScore: 40, intentScore: 32, starred: false,
      notes: "Complex product story. CEO wants visibility. Already guested on 2 podcasts. Need polished media assets for enterprise sales.",
      lastActivity: "2026-04-09", source: "LinkedIn",
      fitDetails: JSON.stringify({ industry: 10, complexity: 9, credibility: 8, distribution: 7, budget: 6 }),
      intentDetails: JSON.stringify({ signal: 14, timeline: 6, exec: 7, responsive: 3, goal: 2 }),
    },
    {
      name: "Greystone Wealth Advisors", website: "greystonewa.com", pipeline: "legal-consulting",
      industry: "RIA / Wealth Management", size: "11-50", revenue: "$5M-$10M", location: "Dallas, TX",
      fundingStage: "Bootstrapped", techStack: JSON.stringify(["Salesforce", "Redtail"]),
      stage: "Targeted", fitScore: 36, intentScore: 18, starred: false,
      notes: "Boutique RIA. Contract bottlenecks growing. Need ongoing counsel + governance framework. No GC on staff.",
      lastActivity: "2026-04-07", source: "Crunchbase",
      fitDetails: JSON.stringify({ complexity: 12, ongoing: 10, org_size: 7, dm_access: 4, budget: 3 }),
      intentDetails: JSON.stringify({ active_problem: 8, timeline: 4, volume: 3, pressure: 2, responsive: 1 }),
    },
  ];

  const createdCompanies = [];
  for (const c of companies) {
    const created = await prisma.company.create({ data: c });
    createdCompanies.push(created);
  }

  // ─── Seed Contacts ──────────────────────────────────────────────
  const contactsByCompany = {
    "Apex Fintech Solutions": [
      { name: "Sarah Chen", title: "VP of Marketing", email: "sarah@apexfintech.io", phone: "(512) 555-0142", linkedin: "linkedin.com/in/sarahchen", decisionMaker: true, persona: "CMO / VP Marketing" },
      { name: "James Park", title: "CEO", email: "james@apexfintech.io", phone: "(512) 555-0198", linkedin: "linkedin.com/in/jamespark", decisionMaker: true, persona: "CEO / Founder" },
    ],
    "NovaBright Solar Fund LP": [
      { name: "David Hartwell", title: "Founder / CIO", email: "david@novabrightfund.com", phone: "(303) 555-0267", linkedin: "linkedin.com/in/davidhartwell", decisionMaker: true, persona: "Founder / CIO / PM" },
    ],
    "UrbanBite Delivery": [
      { name: "Derek Liu", title: "Founder & CEO", email: "derek@urbanbite.io", phone: "(312) 555-0333", linkedin: "linkedin.com/in/derekliu", decisionMaker: true, persona: "Founder / CEO" },
      { name: "Aisha Patel", title: "Growth Lead", email: "aisha@urbanbite.io", phone: "(312) 555-0334", linkedin: "linkedin.com/in/aishapatel", decisionMaker: false, persona: "Sales Manager (influencer)" },
    ],
    "Pinnacle Wellness Group": [
      { name: "Marcus Johnson", title: "Director of Marketing", email: "marcus@pinnaclewellness.com", phone: "(305) 555-0421", linkedin: "linkedin.com/in/marcusjohnson", decisionMaker: true, persona: "CMO / VP Marketing" },
    ],
    "CloudMesh Technologies": [
      { name: "Emily Watson", title: "Head of Data & AI", email: "emily@cloudmesh.dev", phone: "(415) 555-0567", linkedin: "linkedin.com/in/emilywatson", decisionMaker: true, persona: "Head of Data / AI" },
      { name: "Raj Mehta", title: "CTO", email: "raj@cloudmesh.dev", phone: "(415) 555-0568", linkedin: "linkedin.com/in/rajmehta", decisionMaker: true, persona: "CIO / CTO" },
    ],
    "Meridian Capital Partners": [
      { name: "Thomas Mercer", title: "Founder / PM", email: "thomas@meridiancappartners.com", phone: "(212) 555-0891", linkedin: "linkedin.com/in/thomasmercer", decisionMaker: true, persona: "Founder / CIO / PM" },
      { name: "Lisa Nakamura", title: "COO", email: "lisa@meridiancappartners.com", phone: "(212) 555-0892", linkedin: "linkedin.com/in/lisanakamura", decisionMaker: true, persona: "COO / Head of Ops" },
    ],
    "SecureLayer AI": [
      { name: "Ryan Foster", title: "CEO", email: "ryan@securelayer.ai", phone: "(617) 555-0344", linkedin: "linkedin.com/in/ryanfoster", decisionMaker: true, persona: "CEO / Founder" },
    ],
    "Greystone Wealth Advisors": [
      { name: "Patricia Garza", title: "COO", email: "patricia@greystonewa.com", phone: "(214) 555-0711", linkedin: "linkedin.com/in/patriciagarza", decisionMaker: true, persona: "COO / Head of Ops" },
    ],
  };

  for (const company of createdCompanies) {
    const contacts = contactsByCompany[company.name] || [];
    for (const contact of contacts) {
      await prisma.contact.create({
        data: { ...contact, companyId: company.id },
      });
    }
  }

  console.log(`Seeded ${createdCompanies.length} companies and ${Object.values(contactsByCompany).flat().length} contacts.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
