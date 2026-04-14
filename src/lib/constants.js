// ─── Pipeline definitions ─────────────────────────────────────────────
export const PIPELINES = [
  { id: "pr-marketing", label: "PR & Marketing", short: "PR/Mkt", color: "indigo", description: "Financial Services + Technology B2B clients" },
  { id: "fund-formation", label: "Fund Formation Law", short: "Fund Law", color: "emerald", description: "Small & emerging fund managers (Funds I-III)" },
  { id: "legal-consulting", label: "Legal Consulting", short: "Legal", color: "sky", description: "Funds ecosystem + business law" },
  { id: "coaching-ops", label: "Coaching & Ops", short: "Coach/Ops", color: "amber", description: "Fractional ops + revenue growth coaching" },
  { id: "media", label: "Media / Podcast", short: "Media", color: "rose", description: "Pay-to-play video podcast & interview media" },
  { id: "ai-consulting", label: "AI & Tech Consulting", short: "AI/Tech", color: "violet", description: "AI strategy, pilots, production, governance" },
];

export const FUNNEL_STAGES = [
  "Targeted", "Contacted", "Engaged", "Qualified", "Discovery Complete",
  "Proposal Sent", "Negotiation", "Won", "Lost", "Nurture"
];

// ─── Fit + Intent scoring criteria per pipeline ──────────────────────
export const SCORING_CRITERIA = {
  "pr-marketing": {
    fit: [
      { id: "industry", label: "Industry match (FS/Tech you serve)", max: 10 },
      { id: "stage", label: "Stage/size (10-500 employees; growth)", max: 10 },
      { id: "buyer", label: "Clear buyer + sales motion (B2B, enterprise-ish)", max: 10 },
      { id: "proof", label: "Proof assets exist (customers, data, founders credible)", max: 10 },
      { id: "budget", label: "Budget range ($5k-$25k/mo)", max: 10 },
    ],
    intent: [
      { id: "trigger", label: "Trigger present (launch, raise, rebrand, expansion)", max: 15 },
      { id: "timeline", label: "Timeline to start (0-30 days)", max: 10 },
      { id: "dm_engaged", label: "Decision-maker engaged (CMO/CEO in calls)", max: 10 },
      { id: "urgency", label: "Urgency/pain level (reputation, pipeline stall)", max: 10 },
      { id: "responsive", label: "Fast responsiveness (reply speed + keeps meetings)", max: 5 },
    ],
  },
  "fund-formation": {
    fit: [
      { id: "manager_type", label: "Manager type (Funds I-III / emerging)", max: 15 },
      { id: "strategy", label: "Strategy you handle well (hedge/VC/PE/credit)", max: 10 },
      { id: "ops_readiness", label: "Operational readiness (admin/compliance in motion)", max: 10 },
      { id: "jurisdiction", label: "Jurisdiction complexity you can handle", max: 5 },
      { id: "budget", label: "Ability to pay (realistic legal budget)", max: 10 },
    ],
    intent: [
      { id: "anchor", label: "Seed/anchor interest or imminent raise", max: 15 },
      { id: "launch_window", label: "Target launch window defined", max: 10 },
      { id: "providers", label: "Providers selected (admin, audit, tax, compliance)", max: 10 },
      { id: "urgency", label: "Founder urgency (needs docs to raise now)", max: 10 },
      { id: "referral", label: "Referral source strength (admin/allocator intro)", max: 5 },
    ],
  },
  "legal-consulting": {
    fit: [
      { id: "complexity", label: "Complexity (contracts/regulatory-adjacent, not basic)", max: 15 },
      { id: "ongoing", label: "Ongoing need (not one-off emergency only)", max: 15 },
      { id: "org_size", label: "Organization size (5-200 employees or lean RIAs)", max: 10 },
      { id: "dm_access", label: "Decision-maker access (COO/CFO/CEO)", max: 5 },
      { id: "budget", label: "Budget for retainer/scoped work", max: 5 },
    ],
    intent: [
      { id: "active_problem", label: "Active problem now (deal stuck, dispute, diligence)", max: 20 },
      { id: "timeline", label: "Start timeline (0-30 days)", max: 10 },
      { id: "volume", label: "Volume signal (contract backlog, multiple matters)", max: 10 },
      { id: "pressure", label: "Internal pressure (audit/investor/client demands)", max: 5 },
      { id: "responsive", label: "Responsiveness", max: 5 },
    ],
  },
  "coaching-ops": {
    fit: [
      { id: "revenue", label: "Existing revenue + proven delivery", max: 15 },
      { id: "niche", label: "Clear niche/customer", max: 10 },
      { id: "margin", label: "Margin room to invest", max: 10 },
      { id: "dm_access", label: "Decision-maker access", max: 10 },
      { id: "coachable", label: "Sales motion is coachable", max: 5 },
    ],
    intent: [
      { id: "trigger", label: "Trigger event (new owner / hiring / launch)", max: 20 },
      { id: "timeline", label: "Timeline <60 days", max: 10 },
      { id: "pain", label: "Pain urgency", max: 10 },
      { id: "responsive", label: "Responsiveness", max: 5 },
      { id: "budget", label: "Budget readiness", max: 5 },
    ],
  },
  "media": {
    fit: [
      { id: "industry", label: "Industry match (FS/tech)", max: 10 },
      { id: "complexity", label: "Complexity high (needs translation edge)", max: 10 },
      { id: "credibility", label: "Credibility-sensitive sale (enterprise/regulated)", max: 10 },
      { id: "distribution", label: "Has distribution channels (site + socials)", max: 10 },
      { id: "budget", label: "Budget willingness", max: 10 },
    ],
    intent: [
      { id: "signal", label: "Signal present (funding/launch/hiring/visibility)", max: 20 },
      { id: "timeline", label: "Timeline <30 days", max: 10 },
      { id: "exec", label: "Exec available + willing", max: 10 },
      { id: "responsive", label: "Responsiveness", max: 5 },
      { id: "goal", label: "Clear goal (lead gen, trust, recruiting)", max: 5 },
    ],
  },
  "ai-consulting": {
    fit: [
      { id: "industry", label: "Industry fit / AI budget propensity", max: 10 },
      { id: "data_maturity", label: "Data maturity", max: 10 },
      { id: "use_case", label: "Clear use-case domain (support, ops, product, compliance)", max: 10 },
      { id: "buyer_access", label: "Buyer access (CIO/CTO/VP Eng/Head of Data)", max: 10 },
      { id: "budget", label: "Ability to pay (mid-market+ or funded)", max: 10 },
    ],
    intent: [
      { id: "signal", label: "Strong signal (hiring/adoption/initiative)", max: 20 },
      { id: "timeline", label: "Timeline <90 days", max: 10 },
      { id: "pain", label: "Pain language present", max: 10 },
      { id: "sponsor", label: "Internal sponsor identified", max: 5 },
      { id: "responsive", label: "Responsiveness / momentum", max: 5 },
    ],
  },
};

// ─── Signal categories for scraping per pipeline ────────────────────
export const SIGNAL_CATEGORIES = {
  "pr-marketing": [
    { id: "launch", label: "Product Launch / Feature Release", keywords: ["announces launch", "introduces platform", "new product"] },
    { id: "fundraise", label: "Fundraise / Post-Fundraise", keywords: ["raises seed", "Series A", "Series B", "funding round"] },
    { id: "market_entry", label: "New Market Entry", keywords: ["expands into enterprise", "new vertical", "new geography"] },
    { id: "rebrand", label: "Rebrand / Positioning Change", keywords: ["rebrand", "new brand identity", "repositioning"] },
    { id: "crisis", label: "Crisis / Reputation Risk", keywords: ["crisis", "compliance issue", "reputation"] },
    { id: "pipeline_stall", label: "Sales Pipeline Stall", keywords: ["need demand gen", "pipeline stall", "lead generation"] },
  ],
  "fund-formation": [
    { id: "spinout", label: "Spinning Out from Platform", keywords: ["spinning out", "launching own fund", "leaving to start"] },
    { id: "anchor", label: "Anchor/Seed Interest Secured", keywords: ["anchor investor", "seed capital", "committed capital"] },
    { id: "track_record", label: "Track Record Ready", keywords: ["track record", "ready to raise", "performance history"] },
    { id: "allocator_meeting", label: "Institutional Meeting Scheduled", keywords: ["allocator meeting", "institutional investor", "LP meeting"] },
    { id: "admin_onboard", label: "Administrator Onboarding", keywords: ["fund administrator", "admin selected", "onboarding"] },
  ],
  "legal-consulting": [
    { id: "growth", label: "Rapid Growth + Contract Volume", keywords: ["rapid growth", "scaling", "contract volume"] },
    { id: "new_product", label: "New Product/Service Launch", keywords: ["new product launch", "new service", "updated terms"] },
    { id: "dispute", label: "Vendor/Client Dispute", keywords: ["dispute", "negotiation", "litigation risk"] },
    { id: "audit", label: "Upcoming Audit / Diligence", keywords: ["audit", "due diligence", "investor scrutiny"] },
    { id: "institutional", label: "Transition to Institutional Ops", keywords: ["institutional", "governance", "formalize"] },
  ],
  "coaching-ops": [
    { id: "hiring_ops", label: "Hiring Ops Roles", keywords: ["Operations Manager", "Head of Operations", "COO", "Chief of Staff"] },
    { id: "funding", label: "Funding / Growth Announcement", keywords: ["raised seed", "Series A", "expanding", "new office"] },
    { id: "pain_language", label: "Founder Pain Language", keywords: ["drowning", "need systems", "dropping balls", "need a COO"] },
    { id: "new_leader", label: "New Leader Signal", keywords: ["joining as COO", "Head of Ops", "new leadership"] },
    { id: "hiring_sales", label: "Hiring Sales/Revenue Roles", keywords: ["Business Development", "Account Executive", "Sales Manager"] },
    { id: "acquisition", label: "Acquisition / New Owner", keywords: ["acquired", "new owner", "search fund", "SBA acquisition"] },
  ],
  "media": [
    { id: "funding_launch", label: "Funding / Launch / Expansion", keywords: ["announces launch", "raises", "expands into"] },
    { id: "hiring_comms", label: "Hiring Marketing/PR/Comms", keywords: ["Head of Content", "PR lead", "Product Marketing"] },
    { id: "exec_visibility", label: "Executive Visibility Behavior", keywords: ["I'll be speaking", "webinar", "podcast", "fireside chat"] },
    { id: "content_need", label: "'We Need Content' Language", keywords: ["tell our story", "help with content", "founder-led marketing"] },
  ],
  "ai-consulting": [
    { id: "hiring_ai", label: "Hiring AI/ML Roles", keywords: ["LLM", "GenAI", "Machine Learning", "MLOps", "AI governance"] },
    { id: "vendor_tooling", label: "Vendor / Tooling Adoption", keywords: ["Snowflake", "Databricks", "vector search", "AI rollout"] },
    { id: "initiative", label: "AI Initiative Announcement", keywords: ["AI transformation", "automation initiative", "AI center of excellence"] },
    { id: "pilot_pain", label: "Pilot-to-Production Pain", keywords: ["pilots didn't scale", "need governance", "model monitoring"] },
    { id: "regulated_ai", label: "Regulated AI Need", keywords: ["AI policy", "model risk management", "responsible AI"] },
  ],
};

export const BUYER_PERSONAS = {
  "pr-marketing": ["CEO / Founder", "CMO / VP Marketing", "Head of Growth", "Head of Comms / PR", "Product Marketing Lead", "Chief Compliance Officer (influencer)"],
  "fund-formation": ["Founder / CIO / PM", "COO / Head of Ops", "GC (if they have one)", "Anchor Investor (influencer)", "Fund Admin Referral", "Placement Agent"],
  "legal-consulting": ["COO / Head of Ops", "Founder / CEO", "General Counsel (part-time)", "CFO (risk/cost control)"],
  "coaching-ops": ["Founder / CEO", "COO / Head of Ops", "CFO", "EA / Chief of Staff", "GM / President", "Sales Manager (influencer)"],
  "media": ["CEO / Founder", "CMO / Head of Growth", "Head of Comms / PR", "CTO (tech)", "Product Marketing", "Compliance Lead (FS influencer)"],
  "ai-consulting": ["CIO / CTO", "Head of Data / AI", "VP Engineering", "VP Ops / COO", "Head of CX", "CISO (influencer)", "AI Product Manager"],
};
