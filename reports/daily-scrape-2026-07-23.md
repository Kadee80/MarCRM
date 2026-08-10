# MarCRM Daily Scrape — 2026-07-23 (Thursday)

**Scrape time:** 07:10 EDT
**Total new leads:** 3 (all pr-marketing)
**Pipelines with new leads:** pr-marketing (3)
**Net-new freelance leads:** 0 (see Skipped section)

> **Note on method (autonomous run):** Strict 24–48h discovery yielded only one in-window fintech business event, so the window was widened to ~3 weeks for net-new named leads **not previously captured**. Older-but-uncaptured leads are flagged with an explicit recency note in scoring. Freelance job-board clusters surfaced mostly already-captured or low-fit postings — all deduped or suppressed. Deduped against daily / pr-freelance / legal-freelance reports back to 2026-07-15.

---

## Top leads (hottest first)

| Company | Pipeline | Fit | Intent | Combined | Grade | Trigger |
|---|---|---|---|---|---|---|
| Always.bank | pr-marketing | 38 | 26 | 64 | B | Full digital business-banking suite launch (week of Jul 20) |
| FV Bank | pr-marketing | 36 | 24 | 60 | B | Unified stablecoin/programmable-finance platform launch |
| Architect Labs | pr-marketing | 35 | 24 | 59 | C | $24M seed, out of stealth; AI custom-chip design |

> **Dropped as duplicate:** LeapXpert ($180M Riverwood round, combined 78) was initially picked up but is already in the CRM (captured 2026-07-02, signal-refreshed 2026-07-06). Reclassified to signal refresh below — not counted as net-new.

---

## New leads by pipeline

### pr-marketing (3)

**Always.bank — Grade B (64).** Branchless, "advisory-first" SMB business bank (accounts, invoice factoring, asset-based lending; powered by Linker Finance); launched full suite across the US the week of Jul 20. Fresh, in-window trigger with a genuinely differentiated brand story. Scored down on undisclosed budget and unknown comms ownership. Pitch launch amplification + earned media around the "advisory-first SMB banking" and Birmingham community-banking angles.

**FV Bank — Grade B (60, borderline C).** Digital bank that expanded into a unified stablecoin/payments/programmable-finance platform (Jun 18). Rides the same stablecoin narrative the agency already tracks via Augustus and Cyclops. Signal ~5wk old; budget/decision-maker unknown. Second-tier priority behind LeapXpert/Always.bank.

**Architect Labs — Grade C (59).** Out of stealth with a **$24M seed** (Kindred Ventures + NVIDIA/Google/OpenAI angels) for AI that designs and provably verifies custom silicon. Tech (not FS) sector, seed-stage, long sales cycles — proof assets and founder story are excellent but PR budget/urgency are soft. Low-priority nurture; revisit on a comms hire or Series A.

---

## Signal refresh — hot existing leads

**LeapXpert (pr-marketing, ~50 fit, first captured 2026-07-02).** Its **$180M** Riverwood growth round (announced ~Jun 30) resurfaced this cycle — confirming the funding halo is still generating press. Already in the CRM, so no net-new entry, but the outreach window is live: pitch a thought-leadership program owning the "AI governance of enterprise communications" narrative for regulated FS clients. Prioritize behind Augustus.

**Augustus (pr-marketing, was 80/A, Jul 22).** No *new* public signal since the $180M Series B (Jul 21) — but that's the point: the window is at **peak**, only ~2 days old, with full tier-1 pickup (Bloomberg, CoinDesk, The Block). **Recommended action: reach out NOW.** Pitch the international-expansion narrative (LatAm/SE Asia/MEA correspondent-banking disruption) + founder thought-leadership on stablecoin banking regulation. Score held at 80.

**Zy Media Group — Senior Comms/PR Strategy Advisor (pr-freelance, 79, Jul 22).** No new public signal; freelance/contract postings churn fast, so treat as a closing window — apply/pitch within the next few days before it fills. No score change.

**Singularity (pr-marketing, 66, Jul 22).** No new public signal in this cycle. Monitoring; no score change.

---

## Trends spotted

- **Stablecoin / programmable-finance banking is the dominant fintech PR-trigger cluster this week** — Augustus, Cyclops, FV Bank, and MoonPay/Glide all in the same lane. Worth a repeatable agency POV/thought-leadership asset that can be pitched across multiple leads in this vertical.
- **RegTech / communications-governance** is emerging as its own fundable category (LeapXpert's $180M) — a clean adjacency to the agency's FS ICP.
- Freelance job boards were quiet for *net-new* named employers — this cycle's postings were repeats or low-fit (doc review, litigation).

## Most productive sources

- Hipther "Fintech Pulse" weekly roundup (Jul 20) — best single source for fresh, named fintech business events.
- PR Newswire / BusinessWire / SiliconANGLE — funding and product-launch primary sources.
- Fundraise Insider / AI-funding trackers — useful but noisy on dates (see Hebbia below).

## Skipped leads (with reasons)

- **LeapXpert ($180M growth round)** — strong fit but a duplicate (already in CRM since 2026-07-02). Moved to signal refresh.
- **Hebbia ($130M Series B)** — surfaced in an AI-funding tracker as "July 2026," but primary sources (TechCrunch, Yahoo Finance) date this raise to **July 2024** at a $700M valuation. Stale/mis-dated — excluded.
- **Cyclops ($20M, stablecoin rails)** — strong fit but already captured in a prior report (dedup).
- **Augustus** — already captured Jul 22 (now in signal refresh instead).
- **Harvey AI ($200M Series C, $2.1B), Glean, Lovable, Together AI, Together** — late-stage, well-resourced with in-house comms; low intent.
- **MoonPay / Glide, Axos / Arc Technologies** — large/public acquirers with established comms; not retainer prospects.
- **Riverty Bank (Bertelsmann)** — non-US, large parent; out of ICP.
- **Alloy Labs (consortium expansion)** — an alliance/innovation body, not a clean retainer buyer.
- **Tau Ventures Fund III / Z_One (€55M)** — fund-formation-adjacent, but Tau is on its 4th vehicle (already has counsel) and Z_One is EU-jurisdiction; both low fit for fund-formation ICP.
- **Legal-freelance job boards** — returned already-captured leads (ACC #54004) or low-fit postings (Level Legal doc review $28/hr, Apricity/Lawyers-for-Justice litigation, Atlas Road Advisors — practice area unverified). Suppressed per rubric.
- **pr-freelance job boards** — GoFractional "Fractional Marketing Director" (marketing, not PR/comms remit — suppressed); generic unnamed Indeed "Fractional Communications" listings (already represented by prior report's unnamed earned-media pilot).

## Next steps for Katie

1. **Run the import locally** (Neon isn't reachable from the sandbox): `node scripts/import-2026-07-23.cjs` (add `--dry-run` first to preview). Then commit the three files locally.
2. **Act on Augustus TODAY** — it's the hottest lead on the board and the window is at peak.
3. **Always.bank is the best net-new prospect** — fresh, in-window launch with a differentiated brand story; worth a tailored launch-amplification pitch. (LeapXpert is also live but already in the CRM — see signal refresh.)
4. Consider a reusable **stablecoin/programmable-finance POV asset** to pitch across Augustus, FV Bank, and Cyclops.
