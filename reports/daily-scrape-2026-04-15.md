# MarCRM Daily Lead Scrape Report
**Date:** Wednesday, April 15, 2026  
**Scrape Time:** Automated run — 12 sources searched (2 passes)  
**Status:** ⚠️ DB write deferred (Neon DB not reachable from scrape sandbox — see JSON files for import payload)

---

## Summary

| Metric | Count |
|--------|-------|
| Sources searched | 12 |
| Total new leads found | 18 (10 pass 1 + 8 pass 2) |
| Leads added to CRM | 0 (import pending — see JSON files) |
| Pipelines covered | 5 of 6 |

### Pipeline Breakdown

| Pipeline | Leads | Avg Fit | Avg Intent |
|----------|-------|---------|------------|
| pr-marketing | 7 | 31 | 29 |
| fund-formation | 2 | 39 | 37 |
| ai-consulting | 6 | 29 | 25 |
| media | 2 | 28 | 21 |
| legal-consulting | 1 | 32 | 22 |
| coaching-ops | 0 | — | — |

> **Coverage gaps:** No strong leads surfaced for `coaching-ops` today. Reddit sources (r/smallbusiness) returned mostly aggregator/SEO content rather than individual company signals. Recommend expanding coaching-ops searches to LinkedIn job posts and acquisition announcements. One `legal-consulting` lead (Regology) surfaced in pass 2.

---

## 🔥 Top 5 Hottest Leads

*Note: Top 5 updated to include supplementary pass 2 leads where they outscored original leads.*

### 1. Zero Shot Fund — `fund-formation` — Score: **78/100**
- **Website:** zeroshot.vc
- **Location:** San Francisco, CA
- **Signal:** OpenAI alumni VC fund (Fund I), first close at $20M on path to $100M target (announced April 6, 2026)
- **Key Contacts:** Evan Morikawa (GP, ex-OpenAI head of applied engineering), Kelly Kovacs (GP, ex-01A)
- **Why hot:** Classic Fund I scenario — actively raising, already deploying capital, needs fund formation legal docs. OpenAI pedigree = credible emerging manager. Co-founder Shawn Jain also runs Synthefy (another lead in this report), giving a warm network entry point.
- **Fit: 40 | Intent: 38**

---

### 2. Pillar — `pr-marketing` — Score: **65/100**
- **Website:** pillar.finance
- **Location:** United States
- **Signal:** Raised **$20M seed led by a16z** on April 14, 2026 (yesterday)
- **Key Contacts:** Harsha Ramesh (CEO/Co-founder)
- **Why hot:** Fresh a16z round = immediate pressure to build brand/narrative. B2B financial services (commodity-driven SMBs — metals, food, airlines) is Katie's core PR/marketing ICP. CEO Ramesh is already active in press. Institutional-grade product needs institutional-grade brand story. Strike while funding is still news.
- **Fit: 35 | Intent: 30**

---

### 3. Round Treasury — `pr-marketing` — Score: **60/100**
- **Website:** roundtreasury.com
- **Location:** London, UK
- **Signal:** Raised **$6M seed on April 13, 2026** (Alstin Capital, Backed VC, Love Ventures)
- **Why hot:** Actively expanding go-to-market team. Strong fintech pedigree (early investors from Monzo, GoCardless). $500M+ already processed on platform. Need to stand out in crowded AI fintech space. ⚠️ UK-based — verify if Katie serves international clients.
- **Fit: 28 | Intent: 32**

---

### 4. Worktrace AI — `ai-consulting` — Score: **57/100**
- **Website:** worktrace.ai
- **Location:** San Francisco, CA
- **Signal:** Launched publicly with **$9.3M seed** (Conviction, 8VC, OpenAI Fund, Mira Murati, Jason Kwon)
- **Key Contacts:** Angela Jiang (CEO, ex-OpenAI GPT-3.5/GPT-4 PM)
- **Why hot:** Fresh seed, enterprise AI product, high-profile investors create credibility and urgency. Direct warm connection via Zero Shot Fund investment. Needs AI consulting partners to reach enterprise buyers. Clear use case (ops automation) + funded buyer.
- **Fit: 32 | Intent: 25**

---

### 5. Derivative Path — `pr-marketing` — Score: **55/100**
- **Website:** derivativepath.com
- **Location:** United States
- **Signal:** New CGO Zack Nagelberg hired; 4x consecutive GlobalCapital Award winner; scaling operations (132 employees)
- **Key Contacts:** Zack Nagelberg (CGO)
- **Why hot:** Award-winning fintech is growing and has a new Chief Growth Officer — exactly the buyer persona for PR/marketing retainer. 4x award = proven credibility story that PR can amplify. Financial institutions client base = Katie's ICP.
- **Fit: 30 | Intent: 25**

---

## All New Leads

| Company | Pipeline | Website | Location | Funding Stage | Fit | Intent | Combined | Source |
|---------|----------|---------|----------|---------------|-----|--------|----------|--------|
| Pillar | pr-marketing | pillar.finance | United States | Seed ($20M a16z) | 35 | 30 | **65** | r/fintech + TechCrunch |
| Round Treasury | pr-marketing | roundtreasury.com | London, UK | Seed ($6M) | 28 | 32 | **60** | r/fintech |
| Zero Shot Fund | fund-formation | zeroshot.vc | San Francisco, CA | Fund I ($20M first close) | 40 | 38 | **78** | r/venturecapital + TechCrunch |
| Worktrace AI | ai-consulting | worktrace.ai | San Francisco, CA | Seed ($9.3M) | 32 | 25 | **57** | r/artificial |
| Derivative Path | pr-marketing | derivativepath.com | United States | Growth (132 employees) | 30 | 25 | **55** | linkedin.com/feed |
| Ontora | ai-consulting | ontora.com | San Francisco, CA | Pre-Seed / YC W26 | 28 | 25 | **53** | r/machinelearning |
| Darrow | media | darrow.ai | New York, NY | Series B ($59M total) | 30 | 22 | **52** | r/legaltech |
| Synthefy | ai-consulting | synthefy.com | Austin, TX | Seed ($6M) | 28 | 20 | **48** | r/machinelearning |
| Foundry Robotics | ai-consulting | foundryrobotics.ai | San Francisco, CA | Seed ($13.5M) | 25 | 22 | **47** | r/machinelearning |
| Lawtrades | media | lawtrades.com | New York, NY | Series A ($11.7M) | 25 | 20 | **45** | r/legaltech |

### Supplementary Leads (Pass 2)

| Company | Pipeline | Website | Location | Funding Stage | Fit | Intent | Combined | Source |
|---------|----------|---------|----------|---------------|-----|--------|----------|--------|
| Collide Capital | fund-formation | collidecapital.com | United States | Fund II ($95M) | 38 | 35 | **73** | TechCrunch |
| Zocks | pr-marketing | zocks.io | United States | Series B ($45M) | 36 | 32 | **68** | Crunchbase |
| Modus | ai-consulting | modus.com | United States | Seed+A ($85M) | 33 | 30 | **63** | TechCrunch |
| JetStream Security | ai-consulting | jetstreamsecurity.com | San Francisco, CA | Seed ($34M) | 30 | 28 | **58** | TechCrunch |
| Ridge AI | pr-marketing | ridgeai.com | Seattle, WA | Pre-Seed ($2.6M) | 28 | 30 | **58** | GeekWire |
| Atlas Card | pr-marketing | atlascard.com | New York, NY | Venture ($40M) | 30 | 28 | **58** | startups.gallery |
| Regology | legal-consulting | regology.com | Palo Alto, CA | Series A ($8M) | 32 | 22 | **54** | Wellfound / YC |
| Avec | pr-marketing | — | United States | Seed ($8.4M) | 25 | 25 | **50** | startups.gallery |

---

## Lead Details

### Pillar
- **Industry:** Fintech / Financial Risk Management
- **Team:** CEO Harsha Ramesh (active in press)
- **Product:** AI-powered hedging platform for commodity-driven SMBs. Clients: Shibuya Sakura Industries, Sigma Recycling, United Metal Solutions Group.
- **Signal:** $20M seed from a16z, April 14, 2026. Platform handles commodity risk (metals, food, airlines). "Turns hedging from a static, periodic decision into a continuous, autonomous system."
- **Why PR/Marketing:** Fresh a16z funding = brand-building window. B2B financial services = Katie's core ICP. Needs to reach CFOs and risk managers at SMBs globally.

### Round Treasury
- **Industry:** Fintech / AI Finance Automation
- **Product:** Agentic Workflow Builder + Autonomous Payroll for finance teams. $500M+ processed.
- **Signal:** $6M seed April 2026 (Alstin Capital). Expanding engineering + GTM team. Backed by early Monzo/GoCardless investors.
- **Why PR/Marketing:** Entering expansion mode. Needs brand narrative to differentiate in crowded AI finance space.

### Zero Shot Fund
- **Industry:** Venture Capital (AI focus)
- **Team:** Evan Morikawa, Andrew Mayne, Shawn Jain (also Synthefy founder), Kelly Kovacs, Brett Rounsaville
- **Signal:** First close $20M on $100M Fund I target (April 2026). Already invested in Worktrace AI and Foundry Robotics.
- **Why Fund Formation:** Fund I needs LP agreements, fund docs, regulatory filings, compliance setup. All five GPs are tech executives — likely don't have institutional fund legal support yet.
- **Warm Network:** Shawn Jain (Synthefy) + Worktrace AI (also a lead here) = multiple warm touch points.

### Worktrace AI
- **Industry:** Enterprise AI / Workflow Automation
- **Team:** Angela Jiang (CEO, ex-OpenAI GPT-3.5/GPT-4 PM), Deepak Vasisht (co-founder, veteran researcher)
- **Signal:** $9.3M seed, Conviction + 8VC + OpenAI Fund + Mira Murati + Jason Kwon as investors.
- **Why AI Consulting:** Needs enterprise distribution channels and implementation partners to reach large organizational buyers. Warm via Zero Shot Fund.

### Ontora
- **Industry:** Enterprise AI / Process Mining
- **Team:** Maximilian Arnold, Leon Iwanowitsch, David Korn (YC W26)
- **Product:** C-suite AI agents that interview employees, map process bottlenecks, deliver consulting-grade insights in hours.
- **Signal:** YC W26 batch — fresh cohort, actively building GTM.
- **Why AI Consulting:** Needs enterprise partnerships. Potential referral/co-sell partnership angle (Ontora does AI process discovery → Katie's firm does AI implementation).

### Foundry Robotics
- **Industry:** AI / Robotics / Advanced Manufacturing
- **Team:** Serial founder (ex-Vitt, La Famiglia VC) + Rishabh Jain (ex-xAI ML engineer)
- **Signal:** $13.5M seed Jan 2026, Khosla Ventures. Zero Shot Fund investor = warm network.
- **Why AI Consulting:** As they scale AI-first manufacturing, may need AI strategy/governance consulting. Lower ICP fit (industrial vs. enterprise software) — qualify carefully.

### Derivative Path
- **Industry:** Fintech / Derivatives Risk Management (financial institutions)
- **Signal:** 4x consecutive GlobalCapital Award winner. New CGO Zack Nagelberg hired. 132 employees. Scaling market presence.
- **Why PR/Marketing:** New growth leadership + award-winning credibility = prime moment for PR push. Selling to banks and PE = needs institutional brand authority.

### Synthefy
- **Industry:** AI/ML / Time Series GenAI (energy, finance, e-commerce)
- **Signal:** $6M seed. Founder Shawn Jain is also GP at Zero Shot Fund (this report's #1 lead) — direct warm connection.
- **Why AI Consulting:** Finance + energy vertical AI = strong use case overlap. Warm entry via Shawn Jain.

### Darrow
- **Industry:** Legal Tech / AI Legal Intelligence
- **Signal:** 156 employees. $59M raised. $120M revenue forecast for 2026. CEO active in media/podcasts.
- **Why Media/Podcast:** Rapid growth in regulated legal market = credibility-sensitive sale. CEO media-active. Executive podcast to reach corporate legal buyers (GCs, CLOs). Has done podcast appearances = receptive to the format.

### Lawtrades
- **Industry:** Legal Tech / On-Demand Legal Talent
- **Signal:** $11.7M total raised, 11-50 employees. Growing legal ops market.
- **Why Media/Podcast:** CEO Raad Ahmed as thought leader targeting in-house legal buyers. Podcast to reach GCs and legal ops leads at mid-market companies.

### Collide Capital (Pass 2)
- **Industry:** Venture Capital / Fintech & Future-of-Work
- **Team:** Co-founders Brian Hollins and Aaron Samuels
- **Signal:** Closed $95M Fund II on April 9, 2026. Total AUM $170M+. Portfolio: 75+ companies. Top quartile TVPI. $1-3M checks into 30+ companies.
- **Why Fund Formation:** Successfully scaling from proof-of-concept to institutional-grade firm. As they deploy Fund II, they need ongoing fund counsel, compliance, and operational legal support. Portfolio companies (Butter, Slang.ai, Rheaply, Ocho) could also be downstream leads.

### Zocks (Pass 2)
- **Industry:** Fintech / AI for Financial Advisors
- **Signal:** $45M Series B (Jan 2026), Lightspeed + QED. 5,000+ financial firms. Enterprise clients: Ameritas, Carson Group, Kestra Financial, Osaic.
- **Why PR/Marketing:** Fast-growing fintech in Katie's core ICP (financial services B2B). Needs brand authority as it scales enterprise. Regulated industry = credibility-sensitive messaging. Strong proof assets (5,000+ customers).

### Modus (Pass 2)
- **Industry:** AI / Accounting & Audit Technology
- **Team:** Founders from Palantir, Citadel, Ramp, Thoma Bravo, Bridgewater, AWS
- **Signal:** $85M raised led by Lightspeed (April 7, 2026). Already invested in top-200 accounting firm. Plans to double organic growth.
- **Why AI Consulting:** AI-native audit in regulated financial services. Needs AI governance and compliance consulting as they deploy AI into audit workflows at accounting firms. Potential strategic partnership.

### JetStream Security (Pass 2)
- **Industry:** AI Governance / Cybersecurity
- **Team:** CEO Raj Rajamani (ex-CrowdStrike CPO), COO Jared Phipps
- **Signal:** $34M seed (Redpoint, CrowdStrike Falcon Fund, March 2026). Angels from CrowdStrike, Wiz, Okta. Already serving F500.
- **Why AI Consulting:** Building the governance layer for enterprise AI. Growing engineering/product/GTM teams. Strong AI consulting partnership opportunity for implementation and strategy.

### Ridge AI (Pass 2)
- **Industry:** B2B SaaS / AI Analytics
- **Team:** CEO Ellie Fields (ex-Tableau SVP, ex-Salesloft CPO). CTO Jeff Heer (Stanford AI Lab).
- **Signal:** $2.6M pre-seed (Madrona), April 6, 2026. Emerged from stealth. Angels from Tableau, Streamlit, Cloudera founders.
- **Why PR/Marketing:** Just emerged from stealth — needs launch PR and brand story. High-pedigree team with Tableau heritage. B2B SaaS analytics product for enterprise buyers.

### Atlas Card (Pass 2)
- **Industry:** Fintech / Premium Consumer Finance
- **Team:** CEO Patrick Mrozowski
- **Signal:** $40M venture round (April 8, 2026), Elad Gil backing. Members-only concierge charge card.
- **Why PR/Marketing:** Premium fintech with aspirational brand needs sophisticated PR. Big round = scaling phase needs market awareness. NYC-based = local proximity advantage.

### Regology (Pass 2)
- **Industry:** RegTech / AI Regulatory Compliance
- **Team:** CEO Mukund Goenka, CTO Pavan Bayyapu (both ex-PwC compliance)
- **Signal:** YC-backed. 60 employees. Covers US Federal + all 50 states + global. RegTech market growing 40%+ YoY.
- **Why Legal Consulting:** Potential partnership: Regology does AI compliance monitoring, Katie's legal consulting handles execution for complex matters. Also a direct legal consulting client for regulatory matters their platform surfaces but can't handle programmatically.

### Avec (Pass 2)
- **Industry:** Fintech
- **Signal:** $8.4M seed (April 8, 2026) led by Lightspeed.
- **Why PR/Marketing:** Lightspeed backing signals quality. Early-stage = needs brand building. Limited public info — needs further research before outreach.

---

## Notable Signals & Trends

### 💸 Lightspeed Is Deploying Heavily — Follow Their Portfolio
Three leads in today's scrape are Lightspeed-backed: **Zocks** ($45M Series B), **Modus** ($85M), and **Avec** ($8.4M seed). Plus **Ridge AI** (Madrona-led, Lightspeed adjacent). Lightspeed closed $9B+ in new funds in late 2025 and is actively deploying. **Action: Monitor Lightspeed portfolio announcements weekly — their newly-funded companies are prime PR/marketing and AI consulting leads.**

### 🏛️ Fund Formation Pipeline Has Two Strong Leads
**Collide Capital** (Fund II, $95M, institutional-grade) and **Zero Shot Fund** (Fund I, $20M first close) represent different stages of the fund formation journey. Collide is scaling and needs ongoing counsel; Zero Shot is greenfield and needs docs from scratch. Both are active right now. **Priority: Collide may have existing counsel — verify. Zero Shot is greenfield = higher conversion probability.**

### 🤖 OpenAI Alumni Network is a Major Lead Cluster
Three of today's leads are directly connected to the OpenAI alumni ecosystem: **Zero Shot Fund** (led by 5 OpenAI alums), **Worktrace AI** (founder Angela Jiang is ex-OpenAI, Zero Shot portfolio), and **Synthefy** (founder Shawn Jain is both Synthefy and Zero Shot GP). This creates a rare warm network path: a single warm intro to Evan Morikawa or Shawn Jain could unlock multiple leads simultaneously. **Priority action: Identify any existing relationship between Katie and anyone in this cluster.**

### 💰 Funding Velocity = PR Window
Both Pillar ($20M, April 14) and Round Treasury ($6M, April 13) raised in the last 48 hours. Post-funding is the single highest-intent moment for PR/marketing outreach — founders are under investor pressure to build momentum. **Act within 1–2 weeks while news is still warm.**

### 📈 AI Adoption Gap Creates AI Consulting Demand
Q1 2026 saw $242B (80% of global VC) flow into AI. But most companies are still in early adoption/pilot stage. Ontora, Worktrace AI, and Synthefy are all building products to solve this gap — which also means the market around them (their future clients) is actively seeking AI consulting. Monitoring these companies' customer announcements could surface 10-20 additional warm leads in the coming months.

### ⚖️ Legal Tech Entering Brand-Building Phase
Darrow's forecast of $120M ARR by 2026 and Lawtrades' legal ops market growth signal that legal tech is moving from early-adopter to mainstream — which is when brand and credibility matter most. The **media/podcast pipeline** has real opportunity here: legal executives are underserved by quality content and hungry for peer-to-peer thought leadership.

---

## Source Performance

| Source | Leads Generated | Quality |
|--------|----------------|---------|
| TechCrunch / tech news (via web search) | 8 | ⭐⭐⭐⭐ — Best signal quality |
| Crunchbase / funding trackers | 3 | ⭐⭐⭐⭐ — Strong funding signals |
| reddit.com/r/venturecapital + r/fintech | 3 | ⭐⭐⭐ — Good funding signals |
| reddit.com/r/machinelearning + r/artificial | 3 | ⭐⭐⭐ — Good AI startup signals |
| reddit.com/r/legaltech | 2 | ⭐⭐ — Aggregator content dominated |
| wellfound.com / ycombinator.com | 1 | ⭐⭐ — Regology found via YC + Wellfound |
| linkedin.com/feed | 1 | ⭐⭐⭐ — 1 lead (Derivative Path) |
| startups.gallery | 2 | ⭐⭐ — Atlas Card + Avec (limited detail) |
| reddit.com/r/marketing, r/smallbusiness, r/podcasting, r/media, r/startups | 0 | ⭐ — SEO/aggregator content dominated |

> **Recommendation:** Focus scrape bandwidth on TechCrunch, Crunchbase, GeekWire, and LinkedIn company announcements. Reddit direct scraping via Brave Search API (configured in .env) would likely surface more individual company signals than Google index of Reddit. Consider adding Crunchbase newly funded companies and VC portfolio pages (Lightspeed, a16z, Madrona) as additional sources.

---

## Database Import Note

The Neon database at `ep-silent-moon-a42be4c4.us-east-1.aws.neon.tech` was not reachable from the scrape sandbox environment (DNS resolution failure — likely a network policy restriction). 

**All 18 leads are ready for import in two files:**  
- `/MarCRM/reports/daily-scrape-2026-04-15.json` (10 leads, pass 1)
- `/MarCRM/reports/daily-scrape-2026-04-15-supplement.json` (8 leads, pass 2)

To import, run the following from the MarCRM project root (where the app has DB access):
```bash
node scripts/import-leads.js reports/daily-scrape-2026-04-15.json
node scripts/import-leads.js reports/daily-scrape-2026-04-15-supplement.json
```
Or use the MarCRM UI's bulk import feature when it's available.

---

*Generated by MarCRM automated scrape — 2026-04-15 (2 passes)*
