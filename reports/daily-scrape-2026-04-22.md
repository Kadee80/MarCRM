# Daily Lead Scrape — 2026-04-22

**Run time:** 2026-04-22 (morning automated run)
**Total new leads:** 7
**Top pipeline:** ai-consulting (4 leads)
**Deduplicated against:** 67 companies already in CRM

## Summary

The 4/20–4/21 funding window produced a tight cluster of fresh AI + fintech Series A announcements that map cleanly onto the ai-consulting and pr-marketing pipelines. Order-to-cash AI emerged as the dominant sub-theme: Monk ($25M Series A on Apr 21 co-led by Footwork + Acrew) and Zenskar ($15M Series A on Apr 20 from Susquehanna + Bessemer + Shine + Rho) announced within 24 hours of each other, both building AI-native finance automation for B2B. Pair them as a cohort outreach.

Healthcare-AI also continues its hot streak with two more entries joining Joyful Health (Apr 16, already in CRM): Coral ($12.5M Series A from Lightspeed + Z47 for specialty clinic admin automation) and RIIG Technology/HOOTL ($6M+ Series A for dental-and-roofing AI claims, plus a Dubai JV + Canadian subsidiary announcement that makes for PR-friendly geographic color).

On the PR-marketing side, Seapoint's €7.5M seed is the headline brand-story target: ex-Stripe founders, angel roster of Claire Hughes Johnson / Des Traynor / Laurence Krieger (ex-Revolut COO) / Luke Mackey, and a public launch to all UK + Ireland founders — a natural launch-PR moment with a warm-intro path via Michael McFadgen at 13books.

Fund-formation delivered one high-signal target: Trimontium Capital, launched November 2025 by Vlado Spasov (ex-head of capital solutions at DWS Group, ex-Blackstone MD). Anchor US LP secured, team hiring from Blackstone alumni network — inaugural-fund formation is active.

Secure / regulated AI rounds out the list with Logicc's €2.5M seed out of Hamburg (lawyers, doctors, public institutions as customers; €1M+ ARR in 6 months post-launch).

## Top 5 Hottest Leads (by combined score)

| Rank | Company | Pipeline | Fit | Intent | Combined | Why |
|------|---------|----------|-----|--------|----------|-----|
| 1 | **Monk** | ai-consulting | 42 | 41 | 83 | $25M Series A Apr 21. AI-native AR automation. 40% DSO reduction proof point. CFO/Controller buyer. |
| 2 | **Zenskar** | ai-consulting | 41 | 41 | 82 | $15M Series A Apr 20. Agentic B2B revenue automation. Agents Marketplace GTM. 5x revenue growth. |
| 3 | **Seapoint** | pr-marketing | 41 | 40 | 81 | €7.5M seed Apr 21. Ex-Stripe founders + all-star angel roster (Claire Hughes Johnson, Des Traynor). Public UK/Ireland launch = natural PR moment. |
| 4 | **Trimontium Capital** | fund-formation | 41 | 38 | 79 | Vlado Spasov (ex-DWS capital solutions head, ex-Blackstone MD). Anchor LP secured. Team building. Inaugural-fund formation active. |
| 5 | **Coral** | ai-consulting | 38 | 38 | 76 | $12.5M Series A Apr 20 (Lightspeed + Z47). AI admin automation for specialty healthcare clinics. NYC. |

## All New Leads

### AI Consulting (4)

- **Monk** — Fit 42 / Intent 41 — $25M Series A (Apr 21). AI accounts receivable automation. Footwork + Acrew.
- **Zenskar** — Fit 41 / Intent 41 — $15M Series A (Apr 20). AI B2B billing / Agents Marketplace. Susquehanna + Bessemer + Shine + Rho.
- **Coral** — Fit 38 / Intent 38 — $12.5M Series A (Apr 20). AI admin automation for specialty clinics. Lightspeed + Z47.
- **Logicc** — Fit 35 / Intent 37 — €2.5M seed (Apr 20). Secure AI for EU regulated industries (legal, healthcare, public sector). Hamburg.

### PR & Marketing (2)

- **Seapoint** — Fit 41 / Intent 40 — €7.5M seed (Apr 21). AI financial ops for EU startups. Ex-Stripe founders + 13books Capital.
- **RIIG Technology (HOOTL)** — Fit 37 / Intent 36 — $6M+ Series A (Apr 21). AI healthcare claims + field service management. Dubai JV + Canadian subsidiary.

### Fund Formation (1)

- **Trimontium Capital** — Fit 41 / Intent 38 — Inaugural fund in formation. Ex-DWS / ex-Blackstone founder. US anchor LP secured. London.

## Trends & Signals Spotted

- **Order-to-cash AI is having a moment.** Two Series A's in one 24-hour window (Monk Apr 21, Zenskar Apr 20) for AI-native AR/billing is not a coincidence — finance teams have moved from "should we?" to "who?" on automation. Every mid-to-late-stage B2B software company now has a near-term order-to-cash AI evaluation on the roadmap. Katie should build a vertical playbook for this niche.
- **Healthcare AI cohort is tightening.** Joyful Health (Apr 16) → Coral (Apr 20) → RIIG/HOOTL (Apr 21) is three healthcare-AI raises in six days. All three hit different sub-segments (revenue cycle, specialty admin, claims verification). A "healthcare AI week" PR pitch angle is live.
- **Secure / sovereign AI for regulated Europe is emerging.** Logicc (Hamburg, €1M ARR in 6 months) is a leading indicator — EU AI Act + GDPR is forcing a parallel tech stack for regulated buyers. Expect more of these in Q2.
- **Fund-formation pipeline is quiet but strategic.** The high-quality fund-formation signals are rare but each one is worth significant effort. Trimontium mirrors last scrape's Shiprock pattern: pedigreed ex-Tier-1 PM launching inaugural vehicle with named anchor LP.
- **Non-VC investor mixes are notable.** RIIG's raise (Family Offices + publicly listed entity + HNWIs) is an unusual Series A structure — strategic operator capital rather than growth-VC pressure. This pattern can indicate founders who prioritize control over scaling velocity, which changes the PR + consulting value prop.

## Sources That Produced the Most Leads

| Source | Leads | Notes |
|--------|-------|-------|
| Fintech funding press (Fintech Global / BusinessWire / FinSMEs) | 4 | Zenskar, Seapoint, RIIG, Monk |
| AlleyWatch / Crain's NY / TechCrunch-adjacent | 2 | Monk, Coral |
| EU-Startups / Vestbee / Tech.eu | 2 | Logicc, Seapoint |
| With Intelligence / AlphaMaven / LinkedIn (fund-formation) | 1 | Trimontium |

Reddit sources did not produce direct leads this run — the subreddit discussions surfaced were general-trend conversations rather than specific-company signals. LinkedIn + Wellfound were not directly queryable via the available web tools and will need a manual or authenticated pass to yield first-party hiring signals.

## Next Steps (for Katie)

1. **Database import** (the sandbox cannot reach Neon): run locally from the MarCRM folder:
   ```
   node scripts/import-2026-04-22.cjs
   ```
   The script is idempotent — it dedupes by company name and skips existing records.
2. **Reports tab** works automatically once `daily-scrape-2026-04-22.json` is committed + deployed via Vercel.
3. **Recommended outreach sequencing:**
   - Monk + Zenskar → cohort pitch ("AI-consulting retainer for post-Series A order-to-cash rollouts").
   - Seapoint → PR launch sprint pitch (warm intro via 13books / Michael McFadgen).
   - Trimontium → warm intro via Blackstone alumni network (check LinkedIn 2nd-degrees).
   - Coral + Joyful Health + RIIG → healthcare-AI cohort newsletter or single-thread pitch.
