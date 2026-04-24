# Daily Lead Scrape — 2026-04-24

**Scrape completed:** 2026-04-24
**Total new leads:** 6
**Top pipeline:** ai-consulting (3 leads)
**DB import:** `node scripts/import-2026-04-24.cjs` (Neon unreachable from sandbox)

---

## Pipeline Breakdown

| Pipeline | New Leads |
|---|---|
| ai-consulting | 3 |
| media | 2 |
| pr-marketing | 1 |
| fund-formation | 0 |
| legal-consulting | 0 |
| coaching-ops | 0 |

No fund-formation / legal / coaching signals surfaced that weren't already in the CRM. AI-infra and creative-media clusters dominated the 4/22-4/23 window.

---

## Top 5 Hottest Leads

### 1. Orkes — pr-marketing — Fit 45 / Intent 40 (combined 85)

$60M Series B (April 23, 2026) led by AVP with Prosperity7, Nexus, Battery, Vertex. Built by the original architects of Netflix's Conductor. Customer proof roster: LinkedIn, Twilio, Quest Diagnostics, United Wholesale Mortgage, Naveo Commerce, Woodside Energy. Agentic workflow orchestration platform — contested category (vs Temporal, LangGraph, Airflow, n8n) and Orkes has the strongest "serious enterprise" proof in the bunch. Primary angle is pr-marketing narrative support for the category-defining moment. Not an ai-consulting target — they ARE the infra vendor.

### 2. Rebel Audio — media — Fit 40 / Intent 44 (combined 84)

$3.8M oversubscribed seed. Founder Jared Gutstadt (2x Emmy nominee, celebrity producer catalog). Mark Burnett onboard as first adviser. **Public launch May 30, 2026 — 36 days out** — that's the urgent trigger. AI podcast creation platform: voice cloning (opt-in), AI translation, host-read ad generation. Perfect media-pipeline fit with a credibility-sensitive consumer launch window. Secondary angle: pr-marketing for the AI-ethics / opt-in-consent story line.

### 3. Shade — media — Fit 41 / Intent 42 (combined 83)

$14M Series A extension (April 23, 2026) led by Khosla + Construct + Bling. "AI-native cloud NAS" for creative teams — natural-language search surfaces specific video moments with timestamps. **$300k MRR at funding** is a strong enterprise-GTM proof point. Primary: media pipeline — credibility-sensitive enterprise buyer (head of post-production, creative ops). Secondary: pr-marketing for the "media asset management is the next MLOps" narrative. Founders Brandon Fan (CEO) and Emerson Dove (CTO) are public-facing.

### 4. Spectrum Security — ai-consulting — Fit 41 / Intent 41 (combined 82)

$19M seed (April 22, 2026) led by TechOperators with WhiteRabbit, Skinos (new Shlomo Kramer + Yishay Yovel fund), Alumni Ventures. AI-era detection automation across SIEMs, EDRs, and data lakes. **Reported outcome: 121 days → under 30 minutes for detection authoring (99% reduction), 90% engineering-hours cut.** Primary: ai-consulting — CISO buyer for AI-detection engineering deployments at mid-market+ FS/regulated enterprises who need governance + audit layer. Pair with Copperhelm as a cybersec-AI cohort story.

### 5. Aaru — ai-consulting — Fit 42 / Intent 39 (combined 81)

$80M Series A (April 23, 2026) led by Redpoint at **$1B headline valuation** (multi-tier blended lower). AI synthetic-research platform — simulated agents + proprietary data. Correctly predicted NY Democratic primary. Customer partners already include Accenture, EY, Interpublic Group, political campaigns. Primary angle: ai-consulting — consulting firms are already buyers but need internal AI-strategy help on methodology / governance / audit to productize for client engagements. Buyer = Chief Research Officer, Chief Analytics Officer at brand-side. Secondary: pr-marketing on the $1B synthetic-research milestone.

---

## All New Leads (with scores)

| Company | Pipeline | Fit | Intent | Combined | Source |
|---|---|---|---|---|---|
| Orkes | pr-marketing | 45 | 40 | 85 | Series B, AVP + existing |
| Rebel Audio | media | 40 | 44 | 84 | Seed + Mark Burnett adviser |
| Shade | media | 41 | 42 | 83 | Series A ext, Khosla |
| Spectrum Security | ai-consulting | 41 | 41 | 82 | Seed, TechOperators + Skinos |
| Aaru | ai-consulting | 42 | 39 | 81 | Series A, Redpoint ($1B) |
| Copperhelm | ai-consulting | 39 | 39 | 78 | Seed, TLV Partners |

---

## Notable Signals & Trends

**Agentic cybersecurity is the Tuesday-Wednesday theme.** Spectrum Security + Copperhelm both exit stealth within 24 hours, both pitch "AI agents replace manual detection/remediation." Twin-target framing works for ai-consulting outreach — offer deployment playbooks for CISOs evaluating either or both.

**Workflow orchestration is consolidating around agentic AI.** Orkes' $60M Series B is the clearest signal that Conductor-lineage infra is winning the "durable agents in production" narrative vs. LangGraph / Temporal / Airflow. Contested-category PR story is wide open.

**Synthetic research hit $1B headline (Aaru).** Consulting firms are already buyers. Expect a wave of "is synthetic research methodologically valid?" debates — Katie could mediate via PR commentary or ai-consulting thought-leadership.

**Creative-tech cohort maturing.** Shade + Rebel Audio together show "AI for creative teams" is moving past generators into asset management + production tooling. Good pr-marketing territory for a "creative ops is the new DevOps" framing.

**Pipeline gap flag for Mark:** zero fund-formation, legal-consulting, or coaching-ops signals this scrape — consistent with the past week's trend. Funding cycles over-index toward tech/cyber/AI in April. May be seasonal and worth revisiting source mix (add PE/allocator trade pubs, SBA signals, legalops LinkedIn activity).

---

## Sources That Produced the Most Leads

| Source | Leads Contributed |
|---|---|
| fintech.global | 3 |
| TechCrunch | 2 |
| AlleyWatch Daily Funding Report | 2 |
| PR Newswire | 2 |
| Variety / Podnews / PR Newswire | 1 (Rebel Audio) |
| Finsmes / TechStartups | 1 (Orkes) |

**Observation:** The 12 Reddit/LinkedIn/Wellfound source list produced essentially zero first-party signal today — all signal came from funding-announcement press pickup (fintech.global, TechCrunch, AlleyWatch, PR Newswire). Worth discussing with Mark whether the Reddit sources still earn their spot in the daily rotation, or whether they're better used for quarterly theme-detection rather than daily lead extraction.

---

## Dedupe

Checked against 193 existing names from prior scrapes (Monk, Zenskar, Coral, Seapoint, RIIG, Trimontium, Logicc, Collide Capital, Joyful Health, Orbital, Wealth.com, Summize, Dolomite, Ferghana, Eyre Street, and 178 others). No duplicates in today's batch.

## Next Steps

1. Run `node scripts/import-2026-04-24.cjs` from `/Users/Katie/Desktop/MarCRM` to push the 6 leads into Neon.
2. Star leads: Orkes, Rebel Audio, Shade, Aaru (already marked `starred: true` in JSON).
3. Rebel Audio's May 30 launch is the tightest window — prioritize outreach within the next 7 days if the media pipeline is being worked.
4. Flag pipeline gap (zero fund-formation / legal / coaching) to Mark if this trend continues through next week's scrapes.
