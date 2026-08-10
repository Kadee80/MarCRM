/**
 * Import script: Daily Scrape 2026-07-20
 * Run:      node scripts/import-2026-07-20.cjs
 * Preview:  node scripts/import-2026-07-20.cjs --dry-run
 * Requires: DATABASE_URL env var pointing to Neon Postgres (run locally - Neon not reachable from sandbox)
 * Deduplicates by company name (skips existing companies).
 *
 * 6 leads: pr-marketing (3), fund-formation (3)
 * NOTE: LearnTastic and Pangea were scored then removed at verification as full-history duplicates
 * (already logged 2026-06-18 and 2026-06-03). No net-new legal-freelance or pr-freelance leads this cycle.
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const DRY_RUN = process.argv.includes('--dry-run');
const SCRAPE_DATE = new Date('2026-07-20');

const leads = [
  {
    "name": "Flex",
    "website": "https://flex.one/",
    "pipeline": "pr-marketing",
    "industry": "Fintech — AI-native private banking platform for high-net-worth business owners; banking, cards, private credit and cross-border settlement",
    "location": "Miami, FL, US (expanding to UK/London)",
    "fundingStage": "Series B1 ($70M at $1.2B valuation, led by Halo Fund — Ryan Smith & Ryan Sweeney; Portage Ventures, Wellington, Crosslink Capital, 53 Stations, Titanium Ventures, Spice, Florida Funders. Announced Jul 14, 2026. Total equity $180M + $300M debt)",
    "fitScore": 50,
    "intentScore": 39,
    "vertical": "",
    "subvertical": "",
    "engagementModel": "",
    "buyerType": "",
    "compensationText": "",
    "remoteFlag": "",
    "employmentTypeRaw": "",
    "urgencyScore": 0,
    "source": "GlobeNewswire / FF News / Fintech Global / The Next Web",
    "sourceUrl": "https://www.globenewswire.com/news-release/2026/07/14/3327097/0/en/halo-fund-leads-70m-investment-into-ai-native-private-banking-platform-flex-to-accelerate-the-launch-of-flex-global.html",
    "notes": "Grade A (89) — hottest net-new lead this cycle and the cleanest ICP match seen in weeks. Perfect 50/50 on Fit: pure fintech, right size (110-200), obvious B2B/HNW sales motion, exceptional proof assets ($10B TPV, $1.2B valuation, marquee investor names), and clearly funded for a $5k-25k/mo retainer. Multiple stacked triggers — raise + product launch (Flex Global) + geographic expansion (UK) + 2x headcount. ACTION: pitch a UK/international market-entry comms program timed to the Flex Global launch, plus an executive thought-leadership track for the CEO on AI-native private banking. The Ryan Smith / Halo Fund sports-and-entertainment angle (NBA/NHL/F1) is an unusually strong earned-media hook worth leading with. CAVEAT: a $1.2B fintech may already retain an agency — qualify before pitching, and if they do, position around UK/EMEA where an incumbent US agency is likely weak.\n\nSIGNALS: Raised $70M Series B1 on Jul 14, 2026 — valuation doubled to $1.2B just 7 months after a $60M Series B in Dec 2025 | Annualized revenue up 3x since December | Surpassed $10B in annualized total payment volume | Launching Flex Global — new cross-border banking product, UK market entry | Plans to scale private credit into 20+ countries | Doubling headcount from 110 to 200+ by end of 2026",
    "contacts": [
      {
        "name": "",
        "title": "CEO / Co-founder — leads the Flex Global narrative",
        "email": "",
        "linkedin": ""
      },
      {
        "name": "",
        "title": "Head of Marketing / Comms — team doubling 110 to 200 by EOY, comms function likely under-resourced",
        "email": "",
        "linkedin": ""
      }
    ]
  },
  {
    "name": "Senra Systems",
    "website": "https://www.senrasystems.com/",
    "pipeline": "pr-marketing",
    "industry": "Advanced manufacturing / aerospace & defense — software-driven wire harness manufacturing for the US aerospace and defense industrial base",
    "location": "Cypress, CA, US",
    "fundingStage": "Series B ($65M co-led by Lowercarbon Capital and Interlagos; General Catalyst, Sequoia Capital, Andreessen Horowitz, Founders Fund, Dylan Field, CIV, 8VC, The Friedkin Group, Jaws Estates Capital, Sozo Ventures, Alumni Ventures. Announced Jul 15, 2026. Total raised $112M+)",
    "fitScore": 44,
    "intentScore": 38,
    "vertical": "",
    "subvertical": "",
    "engagementModel": "",
    "buyerType": "",
    "compensationText": "",
    "remoteFlag": "",
    "employmentTypeRaw": "",
    "urgencyScore": 0,
    "source": "PR Newswire / TechCrunch / FinSMEs",
    "sourceUrl": "https://www.prnewswire.com/news-releases/senra-systems-announces-65-million-series-b-plans-for-third-manufacturing-facility-302825664.html",
    "notes": "Grade A (82). Industry match is the one soft spot — aerospace/defense manufacturing rather than financial services, so scored 6/10 on industry fit — but everything else is strong: elite investor roster (Sequoia, a16z, Founders Fund), clear B2B/government sales motion, and three stacked triggers (raise, third factory, senior exec hire). Defense-industrial reshoring is a live media narrative Mark can work. ACTION: pitch an exec-comms program built around Ken Venner's arrival plus a defense-industrial-base thought-leadership track tied to the factory-three announcement. CAVEAT: already got TechCrunch coverage on the raise, so the funding news cycle is spent — pitch the *next* moment (factory three opening), not this one.\n\nSIGNALS: Raised $65M Series B announced Jul 15, 2026, total funding now $112M+ | Announced plans for a third manufacturing facility | Factory 2 in Cypress recently opened, expanding production footprint 5x | Hired former SpaceX CIO Ken Venner as Chief Technology & Product Officer | The Friedkin Group International made a strategic investment | Covered by TechCrunch, PR Newswire, Pulse 2.0, citybiz",
    "contacts": [
      {
        "name": "Jordan Black",
        "title": "CEO",
        "email": "",
        "linkedin": ""
      },
      {
        "name": "Ken Venner",
        "title": "Chief Technology & Product Officer (former SpaceX CIO, newly hired — strong exec-comms and thought-leadership asset)",
        "email": "",
        "linkedin": ""
      }
    ]
  },
  {
    "name": "TerraFirma",
    "website": "https://www.terrafirma.com/",
    "pipeline": "pr-marketing",
    "industry": "Construction technology / robotics — AI-enabled pre-construction software, remote command-and-control, and retrofitted semi-autonomous heavy equipment (excavators, dozers, loaders, rollers, skid steers)",
    "location": "Austin, TX, US",
    "fundingStage": "Series A ($100M round, $115M total raise; led by Kleiner Perkins with Bain Capital Ventures, Glade Brook Capital Partners, BANNER VC, Saga Ventures, Trust Ventures, Definition, PEAK6, Magnetar Capital, Ravelin Capital; angels from SpaceX, Anduril, Base Power, Shinkei, Hadrian. Announced Jul 14, 2026)",
    "fitScore": 42,
    "intentScore": 37,
    "vertical": "",
    "subvertical": "",
    "engagementModel": "",
    "buyerType": "",
    "compensationText": "",
    "remoteFlag": "",
    "employmentTypeRaw": "",
    "urgencyScore": 0,
    "source": "BusinessWire / FinSMEs / citybiz / Technologies.org",
    "sourceUrl": "https://www.businesswire.com/news/home/20260714397606/en/TerraFirma-Raises-$115M-to-Accelerate-Construction-on-Earth-and-Beyond",
    "notes": "Grade B (79). Weakest industry fit of the three funding leads (construction robotics, not FS/tech — 5/10), but the founder story is exceptional media currency: two ex-SpaceX engineers who met at Princeton, now retrofitting excavators. Named customer logos (Starbucks, a sports arena, a power substation) are ready-made proof assets. ACTION: pitch a founder-narrative + vertical trade program (construction, energy, infrastructure trades) rather than general tech press, which they've already captured. Lower priority than Flex and Senra — work this one third.\n\nSIGNALS: Raised $115M Series A announced Jul 14, 2026, led by Kleiner Perkins | Founded 2024 by two former SpaceX engineers — high-credibility founder story | Expanding engineering, manufacturing, operations and construction teams | Named commercial projects: Starbucks site prep in North Austin, sports arena in Spicewood, power substation in New Braunfels | Working across housing, energy, transportation, manufacturing and education sectors",
    "contacts": [
      {
        "name": "Noah Schochet",
        "title": "Co-founder (ex-SpaceX — Starlink, Starshield, Starship)",
        "email": "",
        "linkedin": ""
      },
      {
        "name": "Noah McGuinness",
        "title": "Co-founder (ex-SpaceX)",
        "email": "",
        "linkedin": ""
      }
    ]
  },
  {
    "name": "East Wave Partners",
    "website": "",
    "pipeline": "fund-formation",
    "industry": "Private credit / specialty finance — short-duration lending across trade finance, media royalties, litigation finance, bridge lending and other specialty finance verticals",
    "location": "US (exact HQ not disclosed in available sources)",
    "fundingStage": "Emerging manager, debut fund — founded by former Bain Capital executive Josh Plavner",
    "fitScore": 43,
    "intentScore": 34,
    "vertical": "",
    "subvertical": "",
    "engagementModel": "",
    "buyerType": "",
    "compensationText": "",
    "remoteFlag": "",
    "employmentTypeRaw": "",
    "urgencyScore": 0,
    "source": "With Intelligence — Private credit: Emerging managers to watch in 2026; Dakota emerging manager coverage",
    "sourceUrl": "https://www.withintelligence.com/insights/private-credit-emerging-managers-to-watch-in-2026/",
    "notes": "Grade B (77). Best fund-formation fit this cycle. Debut fund from a credible Bain Capital pedigree = classic Fund I buyer with real ability to pay. The multi-vertical specialty finance strategy is the key hook: trade finance + media royalties + litigation finance in one platform means unusually complex fund documentation, side letters and jurisdictional structuring — exactly the work that justifies premium counsel. CAVEAT: provider selection status is unknown and a Bain alum likely has strong BigLaw relationships already; qualify on whether counsel is locked before investing pitch time. ACTION: research the entity structure via Form D filings, then approach on the specialty-finance structuring angle rather than generic fund formation.\n\nSIGNALS: New firm launch by a former Bain Capital executive | Named to With Intelligence 'Private credit: Emerging managers to watch in 2026' | Multi-vertical specialty finance strategy (trade finance, media royalties, litigation finance, bridge lending) implies complex, high-fee fund documentation work",
    "contacts": [
      {
        "name": "Josh Plavner",
        "title": "Founder (former Bain Capital executive)",
        "email": "",
        "linkedin": ""
      }
    ]
  },
  {
    "name": "Shorewind Capital",
    "website": "https://www.shorewindcapital.com/",
    "pipeline": "fund-formation",
    "industry": "Venture capital — Series A and B investments in early-stage technology companies across health, climate and advanced technologies",
    "location": "US",
    "fundingStage": "Fund II actively raising — Shorewind Capital Fund II LP, new Form D filing",
    "fitScore": 40,
    "intentScore": 36,
    "vertical": "",
    "subvertical": "",
    "engagementModel": "",
    "buyerType": "",
    "compensationText": "",
    "remoteFlag": "",
    "employmentTypeRaw": "",
    "urgencyScore": 0,
    "source": "Dakota — Top 10 New Form D Filings (June 29 - July 3, 2026)",
    "sourceUrl": "https://www.dakota.com/resources/blog/top-10-new-form-d-filings-june-29-july-3",
    "notes": "Grade B (76). Actively-raising signal is the strongest part of this lead — a fresh Form D means the fund is in market right now. Fund II is a genuine emerging-manager profile with proven ability to close a first fund. MAIN RISK: a manager on Fund II almost certainly used counsel for Fund I and will default to re-engaging them; the realistic opening is fund maintenance, side letters and portfolio-company work rather than the formation mandate itself. Note the Form D window (Jun 29-Jul 3) is slightly outside the 24-48h discovery window — included because fund raises run on multi-month timelines where a 2-3 week-old filing is still fresh. ACTION: approach on ongoing fund maintenance / LP side letter support, not formation.\n\nSIGNALS: New Form D filing for Shorewind Capital Fund II LP — the standard first public signal that a fund is actively raising | Fund II follows an existing Fund I (profiled on PitchBook), so the firm is past first-time-manager risk | Thesis spans health, climate and advanced technologies at Series A/B",
    "contacts": [
      {
        "name": "",
        "title": "Managing Partner / GP — identify via Form D filing signatory",
        "email": "",
        "linkedin": ""
      }
    ]
  },
  {
    "name": "1789 Capital",
    "website": "https://www.1789cap.com/",
    "pipeline": "fund-formation",
    "industry": "Venture capital — early-stage investments in media, entertainment and culture companies",
    "location": "US",
    "fundingStage": "Fund II actively raising — 1789 Capital Inception II LP, new Form D filing; managed by 1789 Capital Management",
    "fitScore": 39,
    "intentScore": 31,
    "vertical": "",
    "subvertical": "",
    "engagementModel": "",
    "buyerType": "",
    "compensationText": "",
    "remoteFlag": "",
    "employmentTypeRaw": "",
    "urgencyScore": 0,
    "source": "Dakota — Top 10 New Form D Filings (June 29 - July 3, 2026)",
    "sourceUrl": "https://www.dakota.com/resources/blog/top-10-new-form-d-filings-june-29-july-3",
    "notes": "Grade B (70). Weakest of the three fund-formation leads and included at the bottom of the range. Active Form D is a real signal, but 1789 Capital is an established, well-capitalized and politically-affiliated platform — it will have entrenched counsel and low switching intent, which is why founderUrgency and referralSourceStrength score low. Ability to pay is the highest of the three (9/10). ACTION: low-priority. Only worth working if Katie or Mark has a warm introduction; a cold approach here is unlikely to convert.\n\nSIGNALS: New Form D filing for 1789 Capital Inception II LP — actively raising | Second vintage of the Inception (early-stage) strategy | Media, entertainment and culture thesis",
    "contacts": [
      {
        "name": "",
        "title": "Managing Partner / GP — identify via Form D filing signatory",
        "email": "",
        "linkedin": ""
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
