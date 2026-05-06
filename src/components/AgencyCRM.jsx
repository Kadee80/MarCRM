"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Search, Plus, Building2, Users, Target, Globe, BarChart3, ChevronRight, X, Check,
  Loader2, Star, StarOff, ArrowUpDown, ExternalLink, Trash2, Mail, Phone,
  Briefcase, Database, ChevronDown, ChevronUp, Zap, MapPin,
  UserCheck, Link2, AlertCircle, Activity, ArrowLeft, Circle, CheckCircle2,
  Megaphone, Scale, BookOpen, Cpu, Video, FileText, Award, Landmark,
  MessageSquare, PhoneCall, Calendar, Save, Columns, Edit3, Flag
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════════════
   API HELPERS — all data goes through the server, persisted in the database
   ═══════════════════════════════════════════════════════════════════════════ */
const api = {
  async getCompanies(params = {}) {
    const qs = new URLSearchParams(params).toString();
    const res = await fetch(`/api/companies${qs ? `?${qs}` : ""}`);
    return res.json();
  },
  async createCompany(data) {
    const res = await fetch("/api/companies", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    return res.json();
  },
  async updateCompany(data) {
    const res = await fetch("/api/companies", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    return res.json();
  },
  async deleteCompany(id) {
    await fetch(`/api/companies?id=${id}`, { method: "DELETE" });
  },
  async getContacts() {
    const res = await fetch("/api/contacts");
    return res.json();
  },
  async createContact(data) {
    const res = await fetch("/api/contacts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    return res.json();
  },
  async scrape(data) {
    const res = await fetch("/api/scrape", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    const json = await res.json();
    if (!res.ok) return { success: false, error: json.error || "Scrape failed", ...json };
    return json;
  },
  async getScrapeHistory() {
    const res = await fetch("/api/scrape");
    return res.json();
  },
  async getReports() {
    const res = await fetch("/api/reports");
    return res.json();
  },
  async enrichContact(data) {
    const res = await fetch("/api/enrich", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    return res.json();
  },
  async getEnrichmentStats() {
    const res = await fetch("/api/enrich");
    return res.json();
  },
  async updateContact(data) {
    const res = await fetch("/api/contacts", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    return res.json();
  },
  async deleteContact(id) {
    await fetch(`/api/contacts?id=${id}`, { method: "DELETE" });
  },
  async getEngagements(params = {}) {
    const qs = new URLSearchParams(params).toString();
    const res = await fetch(`/api/engagements${qs ? `?${qs}` : ""}`);
    return res.json();
  },
  async createEngagement(data) {
    const res = await fetch("/api/engagements", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    return res.json();
  },
  async deleteEngagement(id) {
    await fetch(`/api/engagements?id=${id}`, { method: "DELETE" });
  },
  async getTodos(companyId) {
    const res = await fetch(`/api/todos?companyId=${companyId}`);
    return res.json();
  },
  async createTodo(data) {
    const res = await fetch("/api/todos", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    return res.json();
  },
  async updateTodo(data) {
    const res = await fetch("/api/todos", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    return res.json();
  },
  async deleteTodo(id) {
    await fetch(`/api/todos?id=${id}`, { method: "DELETE" });
  },
  async getMilestones(companyId) {
    const res = await fetch(`/api/milestones?companyId=${companyId}`);
    return res.json();
  },
  async createMilestone(data) {
    const res = await fetch("/api/milestones", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    return res.json();
  },
  async updateMilestone(data) {
    const res = await fetch("/api/milestones", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    return res.json();
  },
  async deleteMilestone(id) {
    await fetch(`/api/milestones?id=${id}`, { method: "DELETE" });
  },
};

/* ═══════════════════════════════════════════════════════════════════════════
   CONSTANTS & SEED DATA — tailored to Katie's 6 business lines
   ═══════════════════════════════════════════════════════════════════════════ */

const PIPELINES = [
  { id: "pr-marketing", label: "PR & Marketing", short: "PR/Mkt", icon: Megaphone, color: "indigo",
    description: "Financial Services + Technology B2B clients" },
  { id: "fund-formation", label: "Fund Formation Law", short: "Fund Law", icon: Landmark, color: "emerald",
    description: "Small & emerging fund managers (Funds I–III)" },
  { id: "legal-consulting", label: "Legal Consulting", short: "Legal", icon: Scale, color: "sky",
    description: "Funds ecosystem + business law" },
  { id: "coaching-ops", label: "Coaching & Ops", short: "Coach/Ops", icon: BookOpen, color: "amber",
    description: "Fractional ops + revenue growth coaching" },
  { id: "media", label: "Media / Podcast", short: "Media", icon: Video, color: "rose",
    description: "Pay-to-play video podcast & interview media" },
  { id: "ai-consulting", label: "AI & Tech Consulting", short: "AI/Tech", icon: Cpu, color: "violet",
    description: "AI strategy, pilots, production, governance" },
  { id: "legal-freelance", label: "Legal Freelance Work", short: "Legal Freelance", icon: Briefcase, color: "slate",
    description: "Contract / fractional / interim corporate & fund counsel roles for Katie" },
  { id: "pr-freelance", label: "PR Freelance Work", short: "PR Freelance", icon: MessageSquare, color: "teal",
    description: "Companies hiring PR/comms roles — fractional, freelance, or contract opportunities" },
];

const PIPELINE_MAP = Object.fromEntries(PIPELINES.map(p => [p.id, p]));

const FUNNEL_STAGES = [
  "Targeted", "Contacted", "Engaged", "Qualified", "Discovery Complete",
  "Proposal Sent", "Negotiation", "Won", "Lost", "Nurture"
];

const STAGE_COLORS = {
  Targeted: "bg-gray-100 text-gray-600",
  Contacted: "bg-blue-100 text-blue-700",
  Engaged: "bg-cyan-100 text-cyan-700",
  Qualified: "bg-purple-100 text-purple-700",
  "Discovery Complete": "bg-indigo-100 text-indigo-700",
  "Proposal Sent": "bg-amber-100 text-amber-700",
  Negotiation: "bg-orange-100 text-orange-700",
  Won: "bg-green-100 text-green-700",
  Lost: "bg-red-100 text-red-600",
  Nurture: "bg-teal-100 text-teal-700",
};

const PRIORITY_LABELS = { A: "Priority A — Work Now", B: "Priority B — Nurture + Light Pursuit", C: "Priority C — Content + Check-in", D: "Park / Refer Out" };
const PRIORITY_COLORS = { A: "bg-green-100 text-green-700 border-green-200", B: "bg-blue-100 text-blue-700 border-blue-200", C: "bg-amber-100 text-amber-700 border-amber-200", D: "bg-gray-100 text-gray-500 border-gray-200" };

function getPriority(score) {
  if (score >= 80) return "A";
  if (score >= 60) return "B";
  if (score >= 40) return "C";
  return "D";
}

/* ─── Fit + Intent criteria per pipeline ──────────────────────────────── */
const SCORING_CRITERIA = {
  "pr-marketing": {
    fit: [
      { id: "industry", label: "Industry match (FS/Tech you serve)", max: 10 },
      { id: "stage", label: "Stage/size (10–500 employees; growth)", max: 10 },
      { id: "buyer", label: "Clear buyer + sales motion (B2B, enterprise-ish)", max: 10 },
      { id: "proof", label: "Proof assets exist (customers, data, founders credible)", max: 10 },
      { id: "budget", label: "Budget range ($5k–$25k/mo)", max: 10 },
    ],
    intent: [
      { id: "trigger", label: "Trigger present (launch, raise, rebrand, expansion)", max: 15 },
      { id: "timeline", label: "Timeline to start (0–30 days)", max: 10 },
      { id: "dm_engaged", label: "Decision-maker engaged (CMO/CEO in calls)", max: 10 },
      { id: "urgency", label: "Urgency/pain level (reputation, pipeline stall)", max: 10 },
      { id: "responsive", label: "Fast responsiveness (reply speed + keeps meetings)", max: 5 },
    ],
  },
  "fund-formation": {
    fit: [
      { id: "manager_type", label: "Manager type (Funds I–III / emerging)", max: 15 },
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
      { id: "org_size", label: "Organization size (5–200 employees or lean RIAs)", max: 10 },
      { id: "dm_access", label: "Decision-maker access (COO/CFO/CEO)", max: 5 },
      { id: "budget", label: "Budget for retainer/scoped work", max: 5 },
    ],
    intent: [
      { id: "active_problem", label: "Active problem now (deal stuck, dispute, diligence)", max: 20 },
      { id: "timeline", label: "Start timeline (0–30 days)", max: 10 },
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
  "legal-freelance": {
    fit: [
      { id: "practice_area", label: "Practice area match (funds/private funds/fund formation)", max: 15 },
      { id: "corporate_match", label: "Corporate / commercial contracts / M&A / financing fit", max: 10 },
      { id: "seniority", label: "Seniority match (counsel / GC / special counsel level)", max: 10 },
      { id: "comp_credible", label: "Comp stated and looks market-credible", max: 10 },
      { id: "buyer_quality", label: "Buyer quality (fund / portfolio co / law firm / ALSP / staffing)", max: 5 },
    ],
    intent: [
      { id: "engagement_model", label: "Engagement model (contract / fractional / interim / freelance)", max: 15 },
      { id: "remote_flex", label: "Remote or hybrid-flex available", max: 10 },
      { id: "recency", label: "Posted within 72 hours", max: 10 },
      { id: "apply_path", label: "Easy apply / direct contact / fast recruiter path", max: 10 },
      { id: "urgency", label: "Urgency language (immediate need / overflow / starting now)", max: 5 },
    ],
  },
  "pr-freelance": {
    fit: [
      { id: "pr_remit", label: "PR / comms / media relations clearly stated (not social-only / event)", max: 15 },
      { id: "sector_fit", label: "Sector fit (finance, legal, PE/VC, B2B, asset mgmt)", max: 10 },
      { id: "workstream", label: "Workstream match (exec comms, thought leadership, earned media, IR)", max: 10 },
      { id: "buyer_quality", label: "Buyer quality (agency, IR firm, PE-backed co, pre-IPO, brand-build startup)", max: 10 },
      { id: "comp_credible", label: "Paid + market-credible (not unpaid / commission-only / intern)", max: 5 },
    ],
    intent: [
      { id: "engagement_model", label: "Engagement model (freelance / contract / retainer / fractional / interim)", max: 15 },
      { id: "remote_flex", label: "Remote / part-time / flexible", max: 10 },
      { id: "recency", label: "Posted within 72 hours", max: 10 },
      { id: "urgency", label: "Urgency / overflow / agency support / white-label / immediate need", max: 10 },
      { id: "apply_path", label: "Direct apply or direct contact path", max: 5 },
    ],
  },
};

/* ─── Signal categories for scraping, per pipeline ──────────────────── */
const SIGNAL_CATEGORIES = {
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
    { id: "hiring_sales", label: "Hiring Sales/Revenue Roles", keywords: ["Business Development", "Account Executive", "Sales Manager", "Revenue Operations"] },
    { id: "acquisition", label: "Acquisition / New Owner", keywords: ["acquired", "new owner", "search fund", "SBA acquisition"] },
  ],
  "media": [
    { id: "funding_launch", label: "Funding / Launch / Expansion", keywords: ["announces launch", "raises", "expands into"] },
    { id: "hiring_comms", label: "Hiring Marketing/PR/Comms", keywords: ["Head of Content", "PR lead", "Product Marketing", "thought leadership"] },
    { id: "exec_visibility", label: "Executive Visibility Behavior", keywords: ["I'll be speaking", "webinar", "podcast", "AMA", "fireside chat"] },
    { id: "content_need", label: "'We Need Content' Language", keywords: ["tell our story", "help with content", "founder-led marketing"] },
  ],
  "ai-consulting": [
    { id: "hiring_ai", label: "Hiring AI/ML Roles", keywords: ["LLM", "GenAI", "Machine Learning", "MLOps", "AI governance", "prompt engineering"] },
    { id: "vendor_tooling", label: "Vendor / Tooling Adoption", keywords: ["Snowflake", "Databricks", "vector search", "AI rollout"] },
    { id: "initiative", label: "AI Initiative Announcement", keywords: ["AI transformation", "automation initiative", "AI center of excellence"] },
    { id: "pilot_pain", label: "Pilot-to-Production Pain", keywords: ["pilots didn't scale", "need governance", "model monitoring"] },
    { id: "regulated_ai", label: "Regulated AI Need", keywords: ["AI policy", "model risk management", "responsible AI"] },
  ],
  "legal-freelance": [
    { id: "title_fund_counsel", label: "Fund / Private Funds Counsel Posting", keywords: ["fund formation counsel", "fund counsel", "private funds counsel", "investment funds attorney", "securities counsel"] },
    { id: "title_fractional_gc", label: "Fractional / Interim / Outside GC Posting", keywords: ["fractional general counsel", "interim general counsel", "outside general counsel", "fractional GC", "interim GC"] },
    { id: "title_contract_attorney", label: "Contract / Freelance Attorney Posting", keywords: ["contract attorney", "freelance attorney", "contract counsel", "project attorney", "part-time attorney", "legal consultant"] },
    { id: "title_corporate", label: "Corporate / Commercial Contracts Posting", keywords: ["commercial contracts attorney", "corporate counsel", "corporate attorney", "commercial counsel"] },
    { id: "engagement_qualifier", label: "Freelance / Contract Engagement Qualifier", keywords: ["fractional", "interim", "contract", "freelance", "retainer", "1099", "hourly", "project-based"] },
    { id: "workstream_signal", label: "Target Workstream in Description", keywords: ["side letters", "fund formation", "M&A diligence", "venture financings", "SAFEs", "cap table", "LP/GP", "outside general counsel", "commercial contracts"] },
    { id: "low_fit_filter", label: "Low-Fit Practice Areas (suppress)", keywords: ["litigation", "trusts and estates", "family law", "insurance defense", "criminal", "immigration", "court appearance"] },
  ],
  "pr-freelance": [
    { id: "title_pr_freelance", label: "Freelance PR / Publicist Posting", keywords: ["freelance public relations", "freelance publicist", "PR consultant", "contract publicist", "freelance PR"] },
    { id: "title_comms_consultant", label: "Communications / Media Relations Consultant", keywords: ["communications consultant", "media relations consultant", "earned media consultant", "contract communications manager"] },
    { id: "title_fractional_comms", label: "Fractional / Interim Communications Lead", keywords: ["fractional communications", "interim communications director", "fractional comms", "fractional CMO communications"] },
    { id: "title_overflow", label: "Agency Overflow / White-Label / Outsourced", keywords: ["agency overflow", "white-label PR", "outsourced communications", "agency freelancer", "project-based PR"] },
    { id: "engagement_qualifier", label: "Freelance / Contract Engagement Qualifier", keywords: ["freelance", "contract", "retainer", "hourly", "project-based", "outsourced", "fractional", "interim", "part-time"] },
    { id: "workstream_signal", label: "Target Workstream in Description", keywords: ["executive comms", "thought leadership", "media relations", "press release", "investor narrative", "product launch comms", "earned media"] },
    { id: "low_fit_filter", label: "Low-Fit Roles (suppress)", keywords: ["social media only", "event staffing", "influencer only", "unpaid", "commission only", "internship"] },
  ],
};

/* ─── Buyer personas per pipeline ──────────────────────────────────── */
const BUYER_PERSONAS = {
  "pr-marketing": ["CEO / Founder", "CMO / VP Marketing", "Head of Growth", "Head of Comms / PR", "Product Marketing Lead", "Chief Compliance Officer (influencer)"],
  "fund-formation": ["Founder / CIO / PM", "COO / Head of Ops", "GC (if they have one)", "Anchor Investor (influencer)", "Fund Admin Referral", "Placement Agent"],
  "legal-consulting": ["COO / Head of Ops", "Founder / CEO", "General Counsel (part-time)", "CFO (risk/cost control)"],
  "coaching-ops": ["Founder / CEO", "COO / Head of Ops", "CFO", "EA / Chief of Staff", "GM / President", "Sales Manager (influencer)"],
  "media": ["CEO / Founder", "CMO / Head of Growth", "Head of Comms / PR", "CTO (tech)", "Product Marketing", "Compliance Lead (FS influencer)"],
  "ai-consulting": ["CIO / CTO", "Head of Data / AI", "VP Engineering", "VP Ops / COO", "Head of CX", "CISO (influencer)", "AI Product Manager"],
  "legal-freelance": ["GC / Deputy GC (Fund or Portfolio Co)", "COO / CFO (Operating Co)", "Managing Partner / Director (Boutique Law Firm overflow)", "Recruiter (Legal Staffing / ALSP)", "Founder / Operating Partner (PE/VC fund)", "Head of Legal Ops"],
  "pr-freelance": ["Head of Comms / VP Marketing (Operating Co or Agency)", "IR / Investor Relations Lead", "CMO / Founder", "Recruiter (PR Agency / IR Firm)", "Operating Partner (PE/VC for portfolio comms)", "Account Director (Agency overflow)"],
};

/* ─── Scrape sources ────────────────────────────────────────────────── */
const SCRAPE_SOURCES = [
  { id: "linkedin", label: "LinkedIn", icon: Users, desc: "Company profiles, job posts, executive activity" },
  { id: "crunchbase", label: "Crunchbase", icon: Database, desc: "Funding rounds, company data, investor info" },
  { id: "website", label: "Company Website", icon: Globe, desc: "About, team, services, tech stack" },
  { id: "g2_clutch", label: "G2 / Clutch", icon: Star, desc: "Reviews, ratings, newly added, growth signals" },
  { id: "job_boards", label: "Job Boards", icon: Briefcase, desc: "Indeed, Wellfound, BuiltIn — hiring intent" },
  { id: "news_pr", label: "News / PR Wires", icon: FileText, desc: "Press releases, industry news, announcements" },
];

/* ─── Seed data removed — now loaded from the database via API ────── */
const _UNUSED_INITIAL_COMPANIES = [
  {
    id: 1, name: "Apex Fintech Solutions", website: "apexfintech.io", pipeline: "pr-marketing",
    industry: "Fintech (B2B)", size: "51-200", revenue: "$5M–$10M", location: "Austin, TX",
    fundingStage: "Series A", techStack: ["HubSpot", "Google Ads", "Segment"],
    stage: "Qualified", fitScore: 42, intentScore: 38, starred: true,
    notes: "Strong DTC fintech scaling fast. Currently spending $80K/mo on paid media. Needs credibility + earned media strategy.",
    lastActivity: "2026-04-10", source: "Clutch", contacts: [1, 2],
    fitDetails: { industry: 10, stage: 8, buyer: 8, proof: 8, budget: 8 },
    intentDetails: { trigger: 12, timeline: 8, dm_engaged: 8, urgency: 6, responsive: 4 },
  },
  {
    id: 2, name: "NovaBright Solar Fund LP", website: "novabrightfund.com", pipeline: "fund-formation",
    industry: "Clean Energy / PE", size: "1-10", revenue: "<$1M", location: "Denver, CO",
    fundingStage: "Pre-launch", techStack: [],
    stage: "Engaged", fitScore: 40, intentScore: 35, starred: false,
    notes: "First-time fund manager spinning out from larger platform. $75M target raise. Has anchor interest from family office.",
    lastActivity: "2026-04-08", source: "Referral (Admin)",
    contacts: [3],
    fitDetails: { manager_type: 15, strategy: 8, ops_readiness: 7, jurisdiction: 3, budget: 7 },
    intentDetails: { anchor: 12, launch_window: 8, providers: 5, urgency: 7, referral: 3 },
  },
  {
    id: 3, name: "UrbanBite Delivery", website: "urbanbite.io", pipeline: "coaching-ops",
    industry: "Food & Beverage / Tech-Enabled", size: "11-50", revenue: "$1M–$5M", location: "Chicago, IL",
    fundingStage: "Seed", techStack: ["React", "Stripe", "Notion", "Slack"],
    stage: "Discovery Complete", fitScore: 35, intentScore: 30, starred: false,
    notes: "Founder-led, referral-dependent. Making money but sales inconsistent. Need a real pipeline + ops system. Hired 2 sales reps with no process.",
    lastActivity: "2026-04-12", source: "LinkedIn",
    contacts: [4, 5],
    fitDetails: { revenue: 12, niche: 8, margin: 5, dm_access: 7, coachable: 3 },
    intentDetails: { trigger: 12, timeline: 6, pain: 7, responsive: 3, budget: 2 },
  },
  {
    id: 4, name: "Pinnacle Wellness Group", website: "pinnaclewellness.com", pipeline: "pr-marketing",
    industry: "Health & Wellness (DTC)", size: "51-200", revenue: "$5M–$10M", location: "Miami, FL",
    fundingStage: "Bootstrapped", techStack: ["Shopify", "Klaviyo", "Meta Ads", "Google Analytics"],
    stage: "Won", fitScore: 45, intentScore: 40, starred: true,
    notes: "Current client. Monthly retainer for social + paid + PR. Expanding to 3 new locations. Strong executive visibility opportunity.",
    lastActivity: "2026-04-13", source: "Referral",
    contacts: [6],
    fitDetails: { industry: 9, stage: 9, buyer: 9, proof: 9, budget: 9 },
    intentDetails: { trigger: 12, timeline: 9, dm_engaged: 8, urgency: 7, responsive: 4 },
  },
  {
    id: 5, name: "CloudMesh Technologies", website: "cloudmesh.dev", pipeline: "ai-consulting",
    industry: "SaaS / B2B", size: "201-500", revenue: "$10M–$50M", location: "San Francisco, CA",
    fundingStage: "Series C", techStack: ["Snowflake", "dbt", "HubSpot", "Drift"],
    stage: "Contacted", fitScore: 38, intentScore: 28, starred: false,
    notes: "B2B SaaS. Ran 2 AI pilots that didn't scale. Posting about need for 'AI governance' and 'model monitoring.' Hiring ML Engineer + AI PM.",
    lastActivity: "2026-04-06", source: "Job Board Scrape",
    contacts: [7, 8],
    fitDetails: { industry: 9, data_maturity: 7, use_case: 8, buyer_access: 7, budget: 7 },
    intentDetails: { signal: 12, timeline: 5, pain: 6, sponsor: 3, responsive: 2 },
  },
  {
    id: 6, name: "Meridian Capital Partners", website: "meridiancappartners.com", pipeline: "fund-formation",
    industry: "Hedge Fund", size: "1-10", revenue: "<$1M", location: "New York, NY",
    fundingStage: "Pre-launch", techStack: [],
    stage: "Proposal Sent", fitScore: 44, intentScore: 42, starred: true,
    notes: "Ex-Goldman PM launching Fund I. $150M target. Anchor from endowment. Needs PPM/LPA fast. Admin (Apex) referred them. Very responsive.",
    lastActivity: "2026-04-11", source: "Admin Referral",
    contacts: [9, 10],
    fitDetails: { manager_type: 15, strategy: 10, ops_readiness: 9, jurisdiction: 3, budget: 7 },
    intentDetails: { anchor: 15, launch_window: 10, providers: 8, urgency: 5, referral: 4 },
  },
  {
    id: 7, name: "SecureLayer AI", website: "securelayer.ai", pipeline: "media",
    industry: "Cybersecurity / AI", size: "51-200", revenue: "$5M–$10M", location: "Boston, MA",
    fundingStage: "Series B", techStack: ["Next.js", "Salesforce", "Mixpanel"],
    stage: "Engaged", fitScore: 40, intentScore: 32, starred: false,
    notes: "Complex product story. CEO wants visibility. Already guested on 2 podcasts. Need polished media assets for enterprise sales.",
    lastActivity: "2026-04-09", source: "LinkedIn",
    contacts: [11],
    fitDetails: { industry: 10, complexity: 9, credibility: 8, distribution: 7, budget: 6 },
    intentDetails: { signal: 14, timeline: 6, exec: 7, responsive: 3, goal: 2 },
  },
  {
    id: 8, name: "Greystone Wealth Advisors", website: "greystonewa.com", pipeline: "legal-consulting",
    industry: "RIA / Wealth Management", size: "11-50", revenue: "$5M–$10M", location: "Dallas, TX",
    fundingStage: "Bootstrapped", techStack: ["Salesforce", "Redtail"],
    stage: "Targeted", fitScore: 36, intentScore: 18, starred: false,
    notes: "Boutique RIA. Contract bottlenecks growing. Need ongoing counsel + governance framework. No GC on staff.",
    lastActivity: "2026-04-07", source: "Crunchbase",
    contacts: [12],
    fitDetails: { complexity: 12, ongoing: 10, org_size: 7, dm_access: 4, budget: 3 },
    intentDetails: { active_problem: 8, timeline: 4, volume: 3, pressure: 2, responsive: 1 },
  },
];

const _UNUSED_INITIAL_CONTACTS = [
  { id: 1, companyId: 1, name: "Sarah Chen", title: "VP of Marketing", email: "sarah@apexfintech.io", phone: "(512) 555-0142", linkedin: "linkedin.com/in/sarahchen", decisionMaker: true, persona: "CMO / VP Marketing" },
  { id: 2, companyId: 1, name: "James Park", title: "CEO", email: "james@apexfintech.io", phone: "(512) 555-0198", linkedin: "linkedin.com/in/jamespark", decisionMaker: true, persona: "CEO / Founder" },
  { id: 3, companyId: 2, name: "David Hartwell", title: "Founder / CIO", email: "david@novabrightfund.com", phone: "(303) 555-0267", linkedin: "linkedin.com/in/davidhartwell", decisionMaker: true, persona: "Founder / CIO / PM" },
  { id: 4, companyId: 3, name: "Derek Liu", title: "Founder & CEO", email: "derek@urbanbite.io", phone: "(312) 555-0333", linkedin: "linkedin.com/in/derekliu", decisionMaker: true, persona: "Founder / CEO" },
  { id: 5, companyId: 3, name: "Aisha Patel", title: "Growth Lead", email: "aisha@urbanbite.io", phone: "(312) 555-0334", linkedin: "linkedin.com/in/aishapatel", decisionMaker: false, persona: "Sales Manager (influencer)" },
  { id: 6, companyId: 4, name: "Marcus Johnson", title: "Director of Marketing", email: "marcus@pinnaclewellness.com", phone: "(305) 555-0421", linkedin: "linkedin.com/in/marcusjohnson", decisionMaker: true, persona: "CMO / VP Marketing" },
  { id: 7, companyId: 5, name: "Emily Watson", title: "Head of Data & AI", email: "emily@cloudmesh.dev", phone: "(415) 555-0567", linkedin: "linkedin.com/in/emilywatson", decisionMaker: true, persona: "Head of Data / AI" },
  { id: 8, companyId: 5, name: "Raj Mehta", title: "CTO", email: "raj@cloudmesh.dev", phone: "(415) 555-0568", linkedin: "linkedin.com/in/rajmehta", decisionMaker: true, persona: "CIO / CTO" },
  { id: 9, companyId: 6, name: "Thomas Mercer", title: "Founder / PM", email: "thomas@meridiancappartners.com", phone: "(212) 555-0891", linkedin: "linkedin.com/in/thomasmercer", decisionMaker: true, persona: "Founder / CIO / PM" },
  { id: 10, companyId: 6, name: "Lisa Nakamura", title: "COO", email: "lisa@meridiancappartners.com", phone: "(212) 555-0892", linkedin: "linkedin.com/in/lisanakamura", decisionMaker: true, persona: "COO / Head of Ops" },
  { id: 11, companyId: 7, name: "Ryan Foster", title: "CEO", email: "ryan@securelayer.ai", phone: "(617) 555-0344", linkedin: "linkedin.com/in/ryanfoster", decisionMaker: true, persona: "CEO / Founder" },
  { id: 12, companyId: 8, name: "Patricia Garza", title: "COO", email: "patricia@greystonewa.com", phone: "(214) 555-0711", linkedin: "linkedin.com/in/patriciagarza", decisionMaker: true, persona: "COO / Head of Ops" },
];

/* ═══════════════════════════════════════════════════════════════════════════
   UTILITY FUNCTIONS
   ═══════════════════════════════════════════════════════════════════════════ */

function totalScore(c) { return (c.fitScore || 0) + (c.intentScore || 0); }

function generateScrapedData(url, source, pipelineId) {
  const signals = SIGNAL_CATEGORIES[pipelineId] || [];
  const matchedSignals = signals.sort(() => 0.5 - Math.random()).slice(0, 1 + Math.floor(Math.random() * 2));
  const personas = BUYER_PERSONAS[pipelineId] || [];
  const names = ["Alex Morgan", "Jordan Lee", "Casey Rivera", "Taylor Kim", "Morgan Brooks", "Avery Quinn", "Sam Delgado", "Riley Chen"];
  const locs = ["New York, NY", "Los Angeles, CA", "Austin, TX", "Seattle, WA", "Boston, MA", "Chicago, IL", "Miami, FL", "Denver, CO", "San Francisco, CA", "Dallas, TX"];
  const industries = {
    "pr-marketing": ["Fintech", "Regtech", "SaaS", "Cybersecurity", "AI Infra", "Market Data"],
    "fund-formation": ["Hedge Fund", "VC", "PE", "Private Credit", "Real Assets"],
    "legal-consulting": ["RIA", "Fund Admin", "Fintech Vendor", "B2B Services", "Tech-Enabled Services"],
    "coaching-ops": ["Agency", "Consultancy", "Professional Services", "B2B SaaS", "Home Services"],
    "media": ["Fintech", "SaaS", "Cybersecurity", "AI Infra", "Wealth Platform"],
    "ai-consulting": ["Financial Services", "Healthcare", "Insurance", "Logistics", "SaaS"],
  };
  const sizes = ["1-10", "11-50", "51-200", "201-500"];
  const ind = industries[pipelineId] || ["Technology"];
  return {
    domain: url.replace(/^https?:\/\//, "").replace(/\/.*$/, ""),
    industry: ind[Math.floor(Math.random() * ind.length)],
    size: sizes[Math.floor(Math.random() * sizes.length)],
    location: locs[Math.floor(Math.random() * locs.length)],
    matchedSignals,
    contacts: Array.from({ length: 1 + Math.floor(Math.random() * 2) }, (_, i) => ({
      name: names[Math.floor(Math.random() * names.length)],
      title: personas[i] || personas[Math.floor(Math.random() * personas.length)],
      email: `contact${i + 1}@${url.replace(/^https?:\/\//, "").replace(/\/.*$/, "")}`,
      linkedin: `linkedin.com/in/${names[Math.floor(Math.random() * names.length)].toLowerCase().replace(" ", "")}`,
    })),
    source,
    scrapedAt: new Date().toISOString(),
  };
}

/* ═══════════════════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */

function Badge({ children, className = "" }) {
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium leading-tight ${className}`}>{children}</span>;
}

function ScoreBadge({ score, label }) {
  const color = score >= 80 ? "text-green-700 bg-green-50 border-green-200" : score >= 60 ? "text-amber-700 bg-amber-50 border-amber-200" : score >= 40 ? "text-orange-600 bg-orange-50 border-orange-200" : "text-red-600 bg-red-50 border-red-200";
  return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold border ${color}`}>{label && <span className="font-medium opacity-70">{label}</span>}{score}</span>;
}

function PipelineBadge({ pipelineId }) {
  const p = PIPELINE_MAP[pipelineId];
  if (!p) return null;
  const colorMap = { indigo: "bg-indigo-100 text-indigo-700", emerald: "bg-emerald-100 text-emerald-700", sky: "bg-sky-100 text-sky-700", amber: "bg-amber-100 text-amber-700", rose: "bg-rose-100 text-rose-700", violet: "bg-violet-100 text-violet-700", slate: "bg-slate-100 text-slate-700", teal: "bg-teal-100 text-teal-700" };
  return <Badge className={colorMap[p.color] || "bg-gray-100 text-gray-600"}>{p.short}</Badge>;
}

function Modal({ open, onClose, title, children, wide }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className={`bg-white rounded-2xl shadow-2xl ${wide ? "max-w-4xl" : "max-w-lg"} w-full mx-4 max-h-[90vh] flex flex-col`} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>
        <div className="px-6 py-4 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
}

function MultiSelect({ options, selected, onChange, label }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      {label && <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>}
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white hover:border-gray-300">
        <span className="truncate text-gray-700">{selected.length ? `${selected.length} selected` : "Select..."}</span>
        {open ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
      </button>
      {open && (
        <div className="absolute z-40 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {options.map(opt => (
            <label key={opt} className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-50 cursor-pointer text-sm">
              <input type="checkbox" checked={selected.includes(opt)} onChange={() => onChange(selected.includes(opt) ? selected.filter(s => s !== opt) : [...selected, opt])} className="rounded border-gray-300 text-indigo-600" />
              {opt}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub, color = "indigo" }) {
  const colors = { indigo: "bg-indigo-50 text-indigo-600", green: "bg-green-50 text-green-600", emerald: "bg-emerald-50 text-emerald-600", amber: "bg-amber-50 text-amber-600", rose: "bg-rose-50 text-rose-600", blue: "bg-blue-50 text-blue-600", violet: "bg-violet-50 text-violet-600", sky: "bg-sky-50 text-sky-600" };
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-start gap-3 shadow-sm">
      <div className={`w-10 h-10 rounded-xl ${colors[color]} flex items-center justify-center flex-shrink-0`}><Icon size={18} /></div>
      <div className="min-w-0">
        <p className="text-xs text-gray-500 font-medium">{label}</p>
        <p className="text-xl font-bold text-gray-900">{value}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

function ScoreSlider({ criterion, value, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <label className="text-xs text-gray-600 flex-1 min-w-0">{criterion.label}</label>
      <input type="range" min={0} max={criterion.max} value={value || 0} onChange={e => onChange(Number(e.target.value))} className="w-24 accent-indigo-600" />
      <span className="text-xs font-mono text-gray-800 w-8 text-right">{value || 0}/{criterion.max}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════════════════════════════ */

export default function AgencyCRM() {
  const [page, setPage] = useState("dashboard");
  const [companies, setCompanies] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [pipelineFilter, setPipelineFilter] = useState("all");
  const [stageFilter, setStageFilter] = useState("All");
  const [sortField, setSortField] = useState("totalScore");
  const [sortDir, setSortDir] = useState("desc");
  const [starredOnly, setStarredOnly] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  // Drill-down page state
  const [drilldownCompany, setDrilldownCompany] = useState(null);
  const [drilldownContact, setDrilldownContact] = useState(null);
  const [drilldownTodos, setDrilldownTodos] = useState([]);
  const [drilldownMilestones, setDrilldownMilestones] = useState([]);
  const [drilldownEngagements, setDrilldownEngagements] = useState([]);
  const [drilldownTab, setDrilldownTab] = useState("overview");
  const [newTodoText, setNewTodoText] = useState("");
  const [newMilestoneTitle, setNewMilestoneTitle] = useState("");
  const [editingNotes, setEditingNotes] = useState(false);
  const [notesText, setNotesText] = useState("");
  const [editingPersonalNotes, setEditingPersonalNotes] = useState(false);
  const [personalNotesText, setPersonalNotesText] = useState("");
  const [showAddCompany, setShowAddCompany] = useState(false);
  const [showAddContact, setShowAddContact] = useState(false);
  const [showScorecard, setShowScorecard] = useState(null);

  // Scraper state
  const [scrapeUrl, setScrapeUrl] = useState("");
  const [scrapeSource, setScrapeSource] = useState("website");
  const [scrapePipeline, setScrapePipeline] = useState("pr-marketing");
  const [scraping, setScraping] = useState(false);
  const [scrapeResults, setScrapeResults] = useState(null);
  const [scrapeHistory, setScrapeHistory] = useState([]);

  // Reports state
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  // Enrichment state
  const [enrichmentStats, setEnrichmentStats] = useState(null);
  const [enriching, setEnriching] = useState(null); // contactId being enriched

  // Contact list filter/sort state
  const [contactSearch, setContactSearch] = useState("");
  const [contactPipelineFilter, setContactPipelineFilter] = useState("all");
  const [contactDMFilter, setContactDMFilter] = useState(false);
  const [contactSortField, setContactSortField] = useState("name");
  const [contactSortDir, setContactSortDir] = useState("asc");

  // Contact sidebar state
  const [sidebarContact, setSidebarContact] = useState(null);
  const [sidebarEngagements, setSidebarEngagements] = useState([]);
  const [editingContact, setEditingContact] = useState(null); // editable copy of contact fields
  const [newEngagement, setNewEngagement] = useState({ type: "note", notes: "" });
  const [savingContact, setSavingContact] = useState(false);
  const [savingEngagement, setSavingEngagement] = useState(false);

  // New company form
  const [newCompany, setNewCompany] = useState({ name: "", website: "", pipeline: "pr-marketing", industry: "", size: "", revenue: "", location: "", fundingStage: "", stage: "Targeted", notes: "", techStack: [] });
  const [newContact, setNewContact] = useState({ name: "", title: "", email: "", phone: "", linkedin: "", decisionMaker: false, companyId: null, persona: "" });

  // ─── Load data from API on mount ───────────────────────────────────
  const refreshData = useCallback(async () => {
    try {
      const [companiesData, contactsData, historyData, reportsData] = await Promise.all([
        api.getCompanies(),
        api.getContacts(),
        api.getScrapeHistory(),
        api.getReports().catch(() => []),
      ]);
      setCompanies(companiesData);
      setContacts(contactsData);
      setScrapeHistory(historyData);
      setReports(reportsData);
      if (reportsData.length > 0 && !selectedReport) setSelectedReport(reportsData[0]);
      api.getEnrichmentStats().then(setEnrichmentStats).catch(() => {});
    } catch (err) {
      console.error("Failed to load data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refreshData(); }, [refreshData]);

  // ─── Computed ──────────────────────────────────────────────────────
  const filteredCompanies = useMemo(() => {
    let list = companies.filter(c => {
      if (pipelineFilter !== "all" && c.pipeline !== pipelineFilter) return false;
      if (stageFilter !== "All" && c.stage !== stageFilter) return false;
      if (starredOnly && !c.starred) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!c.name.toLowerCase().includes(q) && !(c.industry || "").toLowerCase().includes(q) && !(c.location || "").toLowerCase().includes(q)) return false;
      }
      return true;
    });
    list.sort((a, b) => {
      // Starred always float to top when not explicitly sorting by something else
      if (sortField === "totalScore" || sortField === "fitScore" || sortField === "intentScore") {
        if (a.starred && !b.starred) return -1;
        if (!a.starred && b.starred) return 1;
      }
      const mod = sortDir === "asc" ? 1 : -1;
      if (sortField === "totalScore") return (totalScore(a) - totalScore(b)) * mod;
      if (sortField === "fitScore") return (a.fitScore - b.fitScore) * mod;
      if (sortField === "intentScore") return (a.intentScore - b.intentScore) * mod;
      if (sortField === "name") return a.name.localeCompare(b.name) * mod;
      if (sortField === "industry") return (a.industry || "").localeCompare(b.industry || "") * mod;
      if (sortField === "location") return (a.location || "").localeCompare(b.location || "") * mod;
      if (sortField === "lastActivity") return ((a.lastActivity || "").localeCompare(b.lastActivity || "")) * mod;
      return 0;
    });
    return list;
  }, [companies, search, pipelineFilter, stageFilter, starredOnly, sortField, sortDir]);

  const pipelineStats = useMemo(() => {
    const stats = {};
    PIPELINES.forEach(p => {
      const pCompanies = companies.filter(c => c.pipeline === p.id);
      stats[p.id] = {
        total: pCompanies.length,
        priorityA: pCompanies.filter(c => totalScore(c) >= 80).length,
        won: pCompanies.filter(c => c.stage === "Won").length,
        avgScore: pCompanies.length ? Math.round(pCompanies.reduce((s, c) => s + totalScore(c), 0) / pCompanies.length) : 0,
      };
    });
    return stats;
  }, [companies]);

  const companyContacts = (companyId) => contacts.filter(c => c.companyId === companyId);

  const filteredContacts = useMemo(() => {
    let list = contacts.map(ct => {
      const company = companies.find(c => c.id === ct.companyId);
      return { ...ct, _company: company };
    }).filter(ct => {
      if (contactPipelineFilter !== "all" && ct._company?.pipeline !== contactPipelineFilter) return false;
      if (contactDMFilter && !ct.decisionMaker) return false;
      if (contactSearch) {
        const q = contactSearch.toLowerCase();
        if (
          !ct.name.toLowerCase().includes(q) &&
          !(ct.title || "").toLowerCase().includes(q) &&
          !(ct.email || "").toLowerCase().includes(q) &&
          !(ct._company?.name || "").toLowerCase().includes(q)
        ) return false;
      }
      return true;
    });
    list.sort((a, b) => {
      const mod = contactSortDir === "asc" ? 1 : -1;
      if (contactSortField === "name") return a.name.localeCompare(b.name) * mod;
      if (contactSortField === "company") return (a._company?.name || "").localeCompare(b._company?.name || "") * mod;
      if (contactSortField === "title") return (a.title || "").localeCompare(b.title || "") * mod;
      return 0;
    });
    return list;
  }, [contacts, companies, contactSearch, contactPipelineFilter, contactDMFilter, contactSortField, contactSortDir]);

  const handleContactSort = (field) => {
    if (contactSortField === field) setContactSortDir(d => d === "asc" ? "desc" : "asc");
    else { setContactSortField(field); setContactSortDir("asc"); }
  };

  const handleSort = (field) => {
    if (sortField === field) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("desc"); }
  };

  // ─── API-backed CRUD operations ──────────────────────────────────
  const toggleStar = async (id) => {
    const c = companies.find(co => co.id === id);
    if (!c) return;
    await api.updateCompany({ id, starred: !c.starred });
    setCompanies(prev => prev.map(co => co.id === id ? { ...co, starred: !co.starred } : co));
  };

  const addCompany = async () => {
    const created = await api.createCompany(newCompany);
    setCompanies(prev => [...prev, created]);
    setNewCompany({ name: "", website: "", pipeline: "pr-marketing", industry: "", size: "", revenue: "", location: "", fundingStage: "", stage: "Targeted", notes: "", techStack: [] });
    setShowAddCompany(false);
  };

  const addContact = async () => {
    const created = await api.createContact(newContact);
    setContacts(prev => [...prev, created]);
    if (newContact.companyId) refreshData(); // refresh to get updated relations
    setNewContact({ name: "", title: "", email: "", phone: "", linkedin: "", decisionMaker: false, companyId: null, persona: "" });
    setShowAddContact(false);
  };

  const updateCompanyScores = async (companyId, fitDetails, intentDetails) => {
    const fitScore = Object.values(fitDetails).reduce((a, b) => a + b, 0);
    const intentScore = Object.values(intentDetails).reduce((a, b) => a + b, 0);
    await api.updateCompany({ id: companyId, fitScore, intentScore, fitDetails, intentDetails });
    setCompanies(prev => prev.map(c => c.id === companyId ? { ...c, fitScore, intentScore, fitDetails, intentDetails } : c));
  };

  const updateCompanyStage = async (companyId, stage) => {
    await api.updateCompany({ id: companyId, stage });
    setCompanies(prev => prev.map(c => c.id === companyId ? { ...c, stage, lastActivity: new Date().toISOString().slice(0, 10) } : c));
  };

  const deleteCompany = async (id) => {
    await api.deleteCompany(id);
    setCompanies(prev => prev.filter(c => c.id !== id));
    setContacts(prev => prev.filter(c => c.companyId !== id));
    setSelectedCompany(null);
  };

  // ─── Contact enrichment (Hunter.io / RocketReach) ─────────────────
  const handleEnrich = async (contact, companyName, companyWebsite) => {
    if (enriching) return;
    setEnriching(contact.id);
    try {
      const nameParts = contact.name.trim().split(/\s+/);
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ") || nameParts[0];
      const result = await api.enrichContact({
        contactId: contact.id,
        firstName,
        lastName,
        domain: companyWebsite,
        company: companyName,
        linkedin: contact.linkedin || undefined,
      });
      if (result.email || result.phone) {
        // Update local state
        setContacts(prev => prev.map(c => c.id === contact.id ? {
          ...c,
          email: result.email || c.email,
          phone: result.phone || c.phone,
          linkedin: result.linkedin || c.linkedin,
        } : c));
        // Refresh enrichment stats
        api.getEnrichmentStats().then(setEnrichmentStats).catch(() => {});
      } else if (result.error) {
        console.log("Enrichment error:", result.error);
      }
    } catch (err) {
      console.error("Enrichment failed:", err);
    } finally {
      setEnriching(null);
    }
  };

  // ─── Company drill-down ────────────────────────────────────────────
  const openCompanyDrilldown = async (company) => {
    setDrilldownCompany(company);
    setDrilldownTab("overview");
    setNotesText(company.notes || "");
    setEditingNotes(false);
    setPersonalNotesText(company.personalNotes || "");
    setEditingPersonalNotes(false);
    setNewTodoText("");
    setNewMilestoneTitle("");
    try {
      const [todos, milestones, engs] = await Promise.all([
        api.getTodos(company.id),
        api.getMilestones(company.id),
        api.getEngagements({ companyId: String(company.id) }),
      ]);
      setDrilldownTodos(todos);
      setDrilldownMilestones(milestones);
      setDrilldownEngagements(engs);
    } catch {
      setDrilldownTodos([]);
      setDrilldownMilestones([]);
      setDrilldownEngagements([]);
    }
  };

  const closeCompanyDrilldown = () => {
    setDrilldownCompany(null);
    setDrilldownTodos([]);
    setDrilldownMilestones([]);
    setDrilldownEngagements([]);
  };

  const addTodo = async () => {
    if (!newTodoText.trim() || !drilldownCompany) return;
    const todo = await api.createTodo({ text: newTodoText, companyId: drilldownCompany.id });
    setDrilldownTodos(prev => [todo, ...prev]);
    setNewTodoText("");
  };

  const toggleTodo = async (todo) => {
    const updated = await api.updateTodo({ id: todo.id, completed: !todo.completed });
    setDrilldownTodos(prev => prev.map(t => t.id === todo.id ? updated : t));
  };

  const deleteTodo = async (id) => {
    await api.deleteTodo(id);
    setDrilldownTodos(prev => prev.filter(t => t.id !== id));
  };

  const addMilestone = async () => {
    if (!newMilestoneTitle.trim() || !drilldownCompany) return;
    const ms = await api.createMilestone({ title: newMilestoneTitle, companyId: drilldownCompany.id });
    setDrilldownMilestones(prev => [...prev, ms]);
    setNewMilestoneTitle("");
  };

  const cycleMilestoneStatus = async (ms) => {
    const next = ms.status === "planned" ? "in-progress" : ms.status === "in-progress" ? "done" : "planned";
    const updated = await api.updateMilestone({ id: ms.id, status: next });
    setDrilldownMilestones(prev => prev.map(m => m.id === ms.id ? updated : m));
  };

  const deleteMilestone = async (id) => {
    await api.deleteMilestone(id);
    setDrilldownMilestones(prev => prev.filter(m => m.id !== id));
  };

  const saveCompanyNotes = async () => {
    if (!drilldownCompany) return;
    await api.updateCompany({ id: drilldownCompany.id, notes: notesText });
    setDrilldownCompany(prev => ({ ...prev, notes: notesText }));
    setCompanies(prev => prev.map(c => c.id === drilldownCompany.id ? { ...c, notes: notesText } : c));
    setEditingNotes(false);
  };

  const savePersonalNotes = async () => {
    if (!drilldownCompany) return;
    await api.updateCompany({ id: drilldownCompany.id, personalNotes: personalNotesText });
    setDrilldownCompany(prev => ({ ...prev, personalNotes: personalNotesText }));
    setCompanies(prev => prev.map(c => c.id === drilldownCompany.id ? { ...c, personalNotes: personalNotesText } : c));
    setEditingPersonalNotes(false);
  };

  // ─── Contact drill-down (full page) ────────────────────────────────
  const openContactDrilldown = async (contact) => {
    const company = companies.find(c => c.id === contact.companyId);
    setDrilldownContact({ ...contact, _company: company });
    setEditingContact({ name: contact.name, title: contact.title, email: contact.email, phone: contact.phone, linkedin: contact.linkedin });
    setDrilldownTab("overview");
    try {
      const engs = await api.getEngagements({ contactId: String(contact.id) });
      setSidebarEngagements(engs);
    } catch { setSidebarEngagements([]); }
  };

  const closeContactDrilldown = () => {
    setDrilldownContact(null);
    setEditingContact(null);
    setSidebarEngagements([]);
    setNewEngagement({ type: "note", notes: "" });
  };

  // ─── Contact sidebar ──────────────────────────────────────────────
  const openContactSidebar = async (contact) => {
    setSidebarContact(contact);
    setEditingContact({ name: contact.name, title: contact.title, email: contact.email, phone: contact.phone, linkedin: contact.linkedin });
    try {
      const engs = await api.getEngagements({ contactId: String(contact.id) });
      setSidebarEngagements(engs);
    } catch { setSidebarEngagements([]); }
  };

  const closeContactSidebar = () => {
    setSidebarContact(null);
    setEditingContact(null);
    setSidebarEngagements([]);
    setNewEngagement({ type: "note", notes: "" });
  };

  const saveContactEdits = async () => {
    if (!sidebarContact || !editingContact) return;
    setSavingContact(true);
    try {
      const updated = await api.updateContact({ id: sidebarContact.id, ...editingContact });
      setContacts(prev => prev.map(c => c.id === sidebarContact.id ? { ...c, ...editingContact } : c));
      setSidebarContact(prev => ({ ...prev, ...editingContact }));
    } catch (err) { console.error("Failed to save contact:", err); }
    finally { setSavingContact(false); }
  };

  const addEngagement = async () => {
    if (!sidebarContact || !newEngagement.notes.trim()) return;
    setSavingEngagement(true);
    try {
      const eng = await api.createEngagement({
        type: newEngagement.type,
        notes: newEngagement.notes,
        contactId: sidebarContact.id,
        companyId: sidebarContact.companyId || null,
      });
      setSidebarEngagements(prev => [eng, ...prev]);
      setNewEngagement({ type: "note", notes: "" });
    } catch (err) { console.error("Failed to add engagement:", err); }
    finally { setSavingEngagement(false); }
  };

  // ─── Real scraping via API ─────────────────────────────────────────
  const handleScrape = async () => {
    if (!scrapeUrl.trim()) return;
    setScraping(true);
    setScrapeResults(null);
    try {
      const results = await api.scrape({ url: scrapeUrl, source: scrapeSource, pipeline: scrapePipeline });
      setScrapeResults(results);
      // Refresh scrape history (only if scrape was saved)
      if (results.success !== false) {
        const history = await api.getScrapeHistory();
        setScrapeHistory(history);
      }
    } catch (err) {
      console.error("Scrape failed:", err);
      setScrapeResults({ success: false, error: err.message || "Network error — could not reach the server." });
    } finally {
      setScraping(false);
    }
  };

  const importScrapedCompany = async () => {
    if (!scrapeResults) return;
    const domain = scrapeResults.domain || scrapeResults.url || scrapeUrl;
    const domainClean = domain.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
    const domainParts = domainClean.split(".");
    const companyName = domainParts[0].charAt(0).toUpperCase() + domainParts[0].slice(1);

    // Create company via API
    const company = await api.createCompany({
      name: companyName,
      website: domainClean,
      pipeline: scrapeResults.pipeline || scrapePipeline,
      industry: scrapeResults.industry || "",
      size: scrapeResults.size || "",
      location: scrapeResults.location || "",
      stage: "Targeted",
      techStack: scrapeResults.techStack || [],
      notes: `Scraped from ${scrapeResults.source || scrapeSource}. ${scrapeResults.description || ""}`,
      source: `Scrape (${scrapeResults.source || scrapeSource})`,
    });

    // Create contacts found by scraper
    const scrapedContacts = scrapeResults.contacts || [];
    for (const sc of scrapedContacts) {
      await api.createContact({
        name: sc.name,
        title: sc.title,
        email: sc.email || "",
        linkedin: sc.linkedin || "",
        companyId: company.id,
        decisionMaker: (sc.title || "").match(/CEO|CMO|CIO|CTO|VP|Founder/i) !== null,
        persona: sc.title,
      });
    }

    await refreshData();
    setScrapeResults(null);
    setScrapeUrl("");
  };

  /* ═══════════════════════════════════════════════════════════════════════
     PAGE RENDERERS
     ═══════════════════════════════════════════════════════════════════════ */

  // ─── DASHBOARD ─────────────────────────────────────────────────────
  const renderDashboard = () => {
    const totalCompanies = companies.length;
    const totalPriorityA = companies.filter(c => totalScore(c) >= 80).length;
    const totalWon = companies.filter(c => c.stage === "Won").length;
    const avgScore = totalCompanies ? Math.round(companies.reduce((s, c) => s + totalScore(c), 0) / totalCompanies) : 0;

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Cross-pipeline overview across all 6 business lines</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard icon={Building2} label="Total Leads" value={totalCompanies} sub={`${companies.filter(c => c.starred).length} starred`} color="indigo" />
          <StatCard icon={Zap} label="Priority A (80+)" value={totalPriorityA} sub="Work now" color="green" />
          <StatCard icon={Award} label="Won Clients" value={totalWon} sub="Active accounts" color="emerald" />
          <StatCard icon={Target} label="Avg Score" value={avgScore} sub="Fit + Intent" color="amber" />
        </div>

        {/* Lead-to-Close Tracker */}
        {totalCompanies > 0 && (() => {
          const wonCount = companies.filter(c => c.stage === "Won").length;
          const lostCount = companies.filter(c => c.stage === "Lost").length;
          const activeCount = totalCompanies - wonCount - lostCount;
          const closeRate = totalCompanies > 0 ? Math.round((wonCount / totalCompanies) * 100) : 0;
          const stages = [
            { label: "Targeted", count: companies.filter(c => c.stage === "Targeted").length, color: "bg-gray-400" },
            { label: "Contacted", count: companies.filter(c => c.stage === "Contacted").length, color: "bg-blue-400" },
            { label: "Engaged", count: companies.filter(c => c.stage === "Engaged").length, color: "bg-cyan-400" },
            { label: "Qualified", count: companies.filter(c => c.stage === "Qualified").length, color: "bg-purple-400" },
            { label: "Discovery", count: companies.filter(c => c.stage === "Discovery Complete").length, color: "bg-indigo-400" },
            { label: "Proposal", count: companies.filter(c => c.stage === "Proposal Sent").length, color: "bg-amber-400" },
            { label: "Negotiation", count: companies.filter(c => c.stage === "Negotiation").length, color: "bg-orange-400" },
            { label: "Won", count: wonCount, color: "bg-green-500" },
          ];
          return (
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-900">Lead → Close Tracker</h3>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span>{activeCount} active</span>
                  <span className="text-green-600 font-medium">{wonCount} won</span>
                  <span className="text-red-400">{lostCount} lost</span>
                </div>
              </div>

              {/* Big percentage + progress ring */}
              <div className="flex items-center gap-6 mb-5">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
                    <circle cx="18" cy="18" r="15.5" fill="none" stroke="#f3f4f6" strokeWidth="3" />
                    <circle cx="18" cy="18" r="15.5" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round"
                      strokeDasharray={`${closeRate * 0.975} 100`} />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-900">{closeRate}%</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700 mb-1">Close Rate</p>
                  <p className="text-xs text-gray-500">{wonCount} of {totalCompanies} total leads converted to Won</p>
                  {lostCount > 0 && <p className="text-xs text-gray-400 mt-0.5">Win rate vs. decided: {Math.round((wonCount / (wonCount + lostCount)) * 100) || 0}% ({wonCount}W / {lostCount}L)</p>}
                </div>
              </div>

              {/* Funnel flow bar */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-500 uppercase">Pipeline Flow</p>
                <div className="flex h-5 rounded-full overflow-hidden bg-gray-100">
                  {stages.filter(s => s.count > 0).map(s => (
                    <div key={s.label} className={`${s.color} relative group`} style={{ width: `${(s.count / totalCompanies) * 100}%` }} title={`${s.label}: ${s.count}`}>
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">{s.label}: {s.count}</div>
                    </div>
                  ))}
                  {lostCount > 0 && (
                    <div className="bg-red-300 relative group" style={{ width: `${(lostCount / totalCompanies) * 100}%` }} title={`Lost: ${lostCount}`}>
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Lost: {lostCount}</div>
                    </div>
                  )}
                </div>
                <div className="flex justify-between text-[10px] text-gray-400 px-1">
                  <span>Targeted</span>
                  <span>→ Won</span>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Pipeline Cards */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Pipelines</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {PIPELINES.map(p => {
              const stats = pipelineStats[p.id];
              const colorMap = { indigo: "border-indigo-200 bg-indigo-50/30", emerald: "border-emerald-200 bg-emerald-50/30", sky: "border-sky-200 bg-sky-50/30", amber: "border-amber-200 bg-amber-50/30", rose: "border-rose-200 bg-rose-50/30", violet: "border-violet-200 bg-violet-50/30", slate: "border-slate-200 bg-slate-50/30", teal: "border-teal-200 bg-teal-50/30" };
              const iconColorMap = { indigo: "text-indigo-600", emerald: "text-emerald-600", sky: "text-sky-600", amber: "text-amber-600", rose: "text-rose-600", violet: "text-violet-600", slate: "text-slate-600", teal: "text-teal-600" };
              return (
                <button key={p.id} onClick={() => { setPipelineFilter(p.id); setPage("companies"); }} className={`text-left p-4 rounded-xl border ${colorMap[p.color]} hover:shadow-md transition-shadow`}>
                  <div className="flex items-center gap-2 mb-2">
                    <p.icon size={18} className={iconColorMap[p.color]} />
                    <span className="text-sm font-semibold text-gray-900">{p.label}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">{p.description}</p>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-gray-600"><strong>{stats.total}</strong> leads</span>
                    <span className="text-green-600"><strong>{stats.priorityA}</strong> Priority A</span>
                    <span className="text-emerald-600"><strong>{stats.won}</strong> won</span>
                    <span className="text-gray-400">avg {stats.avgScore}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Top Leads */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Top Priority A Leads (Score 80+)</h3>
          {companies.filter(c => totalScore(c) >= 80).sort((a, b) => totalScore(b) - totalScore(a)).length === 0 ? (
            <p className="text-sm text-gray-400 italic py-4 text-center">No Priority A leads yet. Score your leads using the Lead Scorecard.</p>
          ) : (
            <div className="space-y-2">
              {companies.filter(c => totalScore(c) >= 80).sort((a, b) => totalScore(b) - totalScore(a)).slice(0, 8).map(c => (
                <div key={c.id} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 cursor-pointer" onClick={() => { openCompanyDrilldown(c); setPage("companies"); }}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">{c.name.charAt(0)}</div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{c.name}</p>
                      <p className="text-xs text-gray-500">{c.industry}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <PipelineBadge pipelineId={c.pipeline} />
                    <Badge className={STAGE_COLORS[c.stage]}>{c.stage}</Badge>
                    <ScoreBadge score={totalScore(c)} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Funnel by stage */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Funnel Overview (All Pipelines)</h3>
          <div className="flex items-end gap-1.5" style={{ height: 140 }}>
            {FUNNEL_STAGES.map(stage => {
              const count = companies.filter(c => c.stage === stage).length;
              const maxCount = Math.max(...FUNNEL_STAGES.map(s => companies.filter(c => c.stage === s).length), 1);
              const height = Math.max((count / maxCount) * 100, 6);
              const barColors = {
                Targeted: "bg-gray-300", Contacted: "bg-blue-400", Engaged: "bg-cyan-400", Qualified: "bg-purple-400",
                "Discovery Complete": "bg-indigo-400", "Proposal Sent": "bg-amber-400", Negotiation: "bg-orange-400",
                Won: "bg-green-400", Lost: "bg-red-300", Nurture: "bg-teal-300",
              };
              return (
                <div key={stage} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[11px] font-bold text-gray-700">{count}</span>
                  <div className={`w-full rounded-t-lg ${barColors[stage]}`} style={{ height: `${height}%` }} />
                  <span className="text-[9px] text-gray-500 font-medium text-center leading-tight">{stage}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        {scrapeHistory.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Recent Scraping Activity</h3>
            <div className="space-y-2">
              {scrapeHistory.slice(0, 5).map((h, i) => (
                <div key={i} className="flex items-center justify-between py-2 px-3 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-2">
                    <Globe size={14} className="text-gray-400" />
                    <span className="text-sm text-gray-700">{h.url}</span>
                    <PipelineBadge pipelineId={h.pipeline} />
                    <Badge className="bg-gray-200 text-gray-600">{h.source}</Badge>
                  </div>
                  <span className="text-xs text-gray-400">{h.createdAt ? new Date(h.createdAt).toLocaleDateString() : ""}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // ─── COMPANIES ─────────────────────────────────────────────────────
  const renderCompanies = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Companies</h1>
          <p className="text-sm text-gray-500 mt-1">{filteredCompanies.length} of {companies.length} across all pipelines</p>
        </div>
        <button onClick={() => setShowAddCompany(true)} className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 shadow-sm">
          <Plus size={16} /> Add Company
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[180px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search name, industry, location..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <select value={pipelineFilter} onChange={e => setPipelineFilter(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white">
          <option value="all">All Pipelines</option>
          {PIPELINES.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
        </select>
        <select value={stageFilter} onChange={e => setStageFilter(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white">
          <option value="All">All Stages</option>
          {FUNNEL_STAGES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <button onClick={() => setStarredOnly(v => !v)} className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${starredOnly ? "bg-amber-50 border-amber-300 text-amber-700" : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"}`}>
          <Star size={14} className={starredOnly ? "fill-amber-400 text-amber-400" : ""} /> Starred
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="w-8 px-3 py-3" />
                <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase cursor-pointer select-none" onClick={() => handleSort("name")}>
                  <span className="flex items-center gap-1">Company {sortField === "name" ? (sortDir === "asc" ? <ChevronUp size={11} /> : <ChevronDown size={11} />) : <ArrowUpDown size={11} className="text-gray-300" />}</span>
                </th>
                <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase">Pipeline</th>
                <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase">Stage</th>
                <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase cursor-pointer select-none" onClick={() => handleSort("location")}>
                  <span className="flex items-center gap-1">Location {sortField === "location" ? (sortDir === "asc" ? <ChevronUp size={11} /> : <ChevronDown size={11} />) : <ArrowUpDown size={11} className="text-gray-300" />}</span>
                </th>
                <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase cursor-pointer select-none" onClick={() => handleSort("fitScore")}>
                  <span className="flex items-center gap-1">Fit {sortField === "fitScore" ? (sortDir === "asc" ? <ChevronUp size={11} /> : <ChevronDown size={11} />) : <ArrowUpDown size={11} className="text-gray-300" />}</span>
                </th>
                <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase cursor-pointer select-none" onClick={() => handleSort("intentScore")}>
                  <span className="flex items-center gap-1">Intent {sortField === "intentScore" ? (sortDir === "asc" ? <ChevronUp size={11} /> : <ChevronDown size={11} />) : <ArrowUpDown size={11} className="text-gray-300" />}</span>
                </th>
                <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase cursor-pointer select-none" onClick={() => handleSort("totalScore")}>
                  <span className="flex items-center gap-1">Total {sortField === "totalScore" ? (sortDir === "asc" ? <ChevronUp size={11} /> : <ChevronDown size={11} />) : <ArrowUpDown size={11} className="text-gray-300" />}</span>
                </th>
                <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase">Priority</th>
                <th className="w-8 px-3 py-3" />
              </tr>
            </thead>
            <tbody>
              {filteredCompanies.map(c => {
                const score = totalScore(c);
                const pri = getPriority(score);
                return (
                  <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50/50 cursor-pointer" onClick={() => openCompanyDrilldown(c)}>
                    <td className="px-3 py-3" onClick={e => { e.stopPropagation(); toggleStar(c.id); }}>
                      {c.starred ? <Star size={15} className="text-amber-400 fill-amber-400" /> : <StarOff size={15} className="text-gray-300 hover:text-amber-300" />}
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center text-[11px] font-bold text-indigo-600 flex-shrink-0">{c.name.charAt(0)}</div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 leading-tight">{c.name}</p>
                          <p className="text-[11px] text-gray-400">{c.industry}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3"><PipelineBadge pipelineId={c.pipeline} /></td>
                    <td className="px-3 py-3"><Badge className={STAGE_COLORS[c.stage]}>{c.stage}</Badge></td>
                    <td className="px-3 py-3"><span className="text-xs text-gray-600">{c.location || "—"}</span></td>
                    <td className="px-3 py-3"><ScoreBadge score={c.fitScore} label="F" /></td>
                    <td className="px-3 py-3"><ScoreBadge score={c.intentScore} label="I" /></td>
                    <td className="px-3 py-3"><ScoreBadge score={score} /></td>
                    <td className="px-3 py-3"><Badge className={`border ${PRIORITY_COLORS[pri]}`}>{pri}</Badge></td>
                    <td className="px-3 py-3"><ChevronRight size={15} className="text-gray-300" /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredCompanies.length === 0 && (
            <div className="py-12 text-center">
              <Building2 size={24} className="mx-auto text-gray-300 mb-2" />
              <p className="text-sm text-gray-500">No companies found. Adjust filters or add new.</p>
            </div>
          )}
        </div>
      </div>

      {/* Company Detail Modal */}
      <Modal open={!!selectedCompany} onClose={() => setSelectedCompany(null)} title={selectedCompany?.name} wide>
        {selectedCompany && (() => {
          const c = selectedCompany;
          const score = totalScore(c);
          const pri = getPriority(score);
          const pipe = PIPELINE_MAP[c.pipeline];
          return (
            <div className="space-y-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-lg font-bold text-indigo-600">{c.name.charAt(0)}</div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <PipelineBadge pipelineId={c.pipeline} />
                      <Badge className={STAGE_COLORS[c.stage]}>{c.stage}</Badge>
                      <Badge className={`border ${PRIORITY_COLORS[pri]}`}>{PRIORITY_LABELS[pri]}</Badge>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <ScoreBadge score={c.fitScore} label="Fit" />
                      <span className="text-gray-300">+</span>
                      <ScoreBadge score={c.intentScore} label="Intent" />
                      <span className="text-gray-300">=</span>
                      <ScoreBadge score={score} label="Total" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setShowScorecard(c)} className="p-2 rounded-lg text-indigo-500 hover:bg-indigo-50 hover:text-indigo-700" title="Score Lead"><Target size={16} /></button>
                  <button onClick={() => deleteCompany(c.id)} className="p-2 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600"><Trash2 size={16} /></button>
                </div>
              </div>

              {/* Stage selector */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Move Stage</label>
                <div className="flex flex-wrap gap-1">
                  {FUNNEL_STAGES.map(s => (
                    <button key={s} onClick={() => { updateCompanyStage(c.id, s); setSelectedCompany(prev => ({ ...prev, stage: s })); }} className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${c.stage === s ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{s}</button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                <div className="bg-gray-50 rounded-lg p-3"><span className="text-xs text-gray-500 block">Industry</span><span className="font-medium text-gray-900">{c.industry}</span></div>
                <div className="bg-gray-50 rounded-lg p-3"><span className="text-xs text-gray-500 block">Size</span><span className="font-medium text-gray-900">{c.size || "—"}</span></div>
                <div className="bg-gray-50 rounded-lg p-3"><span className="text-xs text-gray-500 block">Revenue</span><span className="font-medium text-gray-900">{c.revenue || "—"}</span></div>
                <div className="bg-gray-50 rounded-lg p-3"><span className="text-xs text-gray-500 block">Location</span><span className="font-medium text-gray-900">{c.location || "—"}</span></div>
                <div className="bg-gray-50 rounded-lg p-3"><span className="text-xs text-gray-500 block">Funding</span><span className="font-medium text-gray-900">{c.fundingStage || "—"}</span></div>
                <div className="bg-gray-50 rounded-lg p-3"><span className="text-xs text-gray-500 block">Source</span><span className="font-medium text-gray-900">{c.source}</span></div>
              </div>

              {c.notes && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Notes</h4>
                  <p className="text-sm text-gray-700 bg-amber-50 rounded-lg p-3 border border-amber-100">{c.notes}</p>
                </div>
              )}

              {/* Contacts */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase">Contacts ({companyContacts(c.id).length})</h4>
                  <button onClick={() => { setNewContact(prev => ({ ...prev, companyId: c.id })); setShowAddContact(true); }} className="text-xs text-indigo-600 font-medium hover:text-indigo-700">+ Add</button>
                </div>
                {companyContacts(c.id).length === 0 ? (
                  <p className="text-sm text-gray-400 italic">No contacts yet</p>
                ) : (
                  <div className="space-y-2">
                    {companyContacts(c.id).map(ct => (
                      <div key={ct.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center text-xs font-bold text-indigo-700">{ct.name.split(" ").map(n => n[0]).join("")}</div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {ct.name}
                              {ct.decisionMaker && <Badge className="bg-amber-100 text-amber-700 ml-1">DM</Badge>}
                            </p>
                            <p className="text-xs text-gray-500">{ct.title}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          {ct.email && <a href={`mailto:${ct.email}`} className="hover:text-indigo-500"><Mail size={14} /></a>}
                          {ct.phone && <a href={`tel:${ct.phone}`} className="hover:text-indigo-500"><Phone size={14} /></a>}
                          {ct.linkedin && <a href={`https://${ct.linkedin}`} target="_blank" rel="noreferrer" className="hover:text-indigo-500"><Link2 size={14} /></a>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })()}
      </Modal>

      {/* Scorecard Modal */}
      <Modal open={!!showScorecard} onClose={() => setShowScorecard(null)} title={showScorecard ? `Lead Scorecard — ${showScorecard.name}` : ""} wide>
        {showScorecard && (() => {
          const c = showScorecard;
          const criteria = SCORING_CRITERIA[c.pipeline];
          if (!criteria) return <p className="text-sm text-gray-500">No scoring criteria for this pipeline.</p>;
          const fitD = { ...c.fitDetails };
          const intD = { ...c.intentDetails };
          return (
            <div className="space-y-6">
              <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-100">
                <p className="text-xs text-indigo-700">Score this lead after your first real conversation or when you have enough info from referral + LinkedIn. Thresholds: <strong>80+ = Priority A</strong>, 60–79 = B, 40–59 = C, &lt;40 = Park.</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Fit Score (0–50): "Are they my ICP?"</h4>
                <div className="space-y-3">
                  {criteria.fit.map(cr => (
                    <ScoreSlider key={cr.id} criterion={cr} value={fitD[cr.id] || 0} onChange={v => { fitD[cr.id] = v; updateCompanyScores(c.id, { ...fitD }, intD); setShowScorecard(prev => ({ ...prev, fitDetails: { ...fitD }, fitScore: Object.values(fitD).reduce((a, b) => a + b, 0) })); }} />
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">Fit subtotal: <strong>{Object.values(fitD).reduce((a, b) => a + b, 0)}/50</strong></p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Intent Score (0–50): "How close are they to buying?"</h4>
                <div className="space-y-3">
                  {criteria.intent.map(cr => (
                    <ScoreSlider key={cr.id} criterion={cr} value={intD[cr.id] || 0} onChange={v => { intD[cr.id] = v; updateCompanyScores(c.id, fitD, { ...intD }); setShowScorecard(prev => ({ ...prev, intentDetails: { ...intD }, intentScore: Object.values(intD).reduce((a, b) => a + b, 0) })); }} />
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">Intent subtotal: <strong>{Object.values(intD).reduce((a, b) => a + b, 0)}/50</strong></p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Score</p>
                  <p className="text-2xl font-bold text-gray-900">{Object.values(fitD).reduce((a, b) => a + b, 0) + Object.values(intD).reduce((a, b) => a + b, 0)}/100</p>
                </div>
                <Badge className={`border text-sm px-3 py-1 ${PRIORITY_COLORS[getPriority(Object.values(fitD).reduce((a, b) => a + b, 0) + Object.values(intD).reduce((a, b) => a + b, 0))]}`}>
                  {PRIORITY_LABELS[getPriority(Object.values(fitD).reduce((a, b) => a + b, 0) + Object.values(intD).reduce((a, b) => a + b, 0))]}
                </Badge>
              </div>
            </div>
          );
        })()}
      </Modal>

      {/* Add Company Modal */}
      <Modal open={showAddCompany} onClose={() => setShowAddCompany(false)} title="Add Company">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Pipeline *</label>
            <select value={newCompany.pipeline} onChange={e => setNewCompany(p => ({ ...p, pipeline: e.target.value }))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
              {PIPELINES.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Company Name *</label>
              <input type="text" value={newCompany.name} onChange={e => setNewCompany(p => ({ ...p, name: e.target.value }))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Website</label>
              <input type="text" value={newCompany.website} onChange={e => setNewCompany(p => ({ ...p, website: e.target.value }))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Industry</label>
              <input type="text" value={newCompany.industry} onChange={e => setNewCompany(p => ({ ...p, industry: e.target.value }))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Size</label>
              <input type="text" value={newCompany.size} onChange={e => setNewCompany(p => ({ ...p, size: e.target.value }))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" placeholder="e.g. 11-50" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Location</label>
              <input type="text" value={newCompany.location} onChange={e => setNewCompany(p => ({ ...p, location: e.target.value }))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Stage</label>
              <select value={newCompany.stage} onChange={e => setNewCompany(p => ({ ...p, stage: e.target.value }))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                {FUNNEL_STAGES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Notes</label>
            <textarea value={newCompany.notes} onChange={e => setNewCompany(p => ({ ...p, notes: e.target.value }))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm h-20 resize-none" />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setShowAddCompany(false)} className="px-4 py-2 text-sm text-gray-600">Cancel</button>
            <button onClick={addCompany} disabled={!newCompany.name} className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-40">Add Company</button>
          </div>
        </div>
      </Modal>

      {/* Add Contact Modal */}
      <Modal open={showAddContact} onClose={() => setShowAddContact(false)} title="Add Contact">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Full Name *</label>
              <input type="text" value={newContact.name} onChange={e => setNewContact(p => ({ ...p, name: e.target.value }))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
              <input type="text" value={newContact.title} onChange={e => setNewContact(p => ({ ...p, title: e.target.value }))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Company</label>
            <select value={newContact.companyId || ""} onChange={e => setNewContact(p => ({ ...p, companyId: e.target.value ? Number(e.target.value) : null }))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
              <option value="">No company</option>
              {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
              <input type="email" value={newContact.email} onChange={e => setNewContact(p => ({ ...p, email: e.target.value }))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Phone</label>
              <input type="text" value={newContact.phone} onChange={e => setNewContact(p => ({ ...p, phone: e.target.value }))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">LinkedIn</label>
            <input type="text" value={newContact.linkedin} onChange={e => setNewContact(p => ({ ...p, linkedin: e.target.value }))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={newContact.decisionMaker} onChange={e => setNewContact(p => ({ ...p, decisionMaker: e.target.checked }))} className="rounded border-gray-300 text-indigo-600" />
            Decision Maker
          </label>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setShowAddContact(false)} className="px-4 py-2 text-sm text-gray-600">Cancel</button>
            <button onClick={addContact} disabled={!newContact.name} className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-40">Add Contact</button>
          </div>
        </div>
      </Modal>
    </div>
  );

  // ─── CONTACTS ──────────────────────────────────────────────────────
  const renderContacts = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
          <p className="text-sm text-gray-500 mt-1">{filteredContacts.length} of {contacts.length} contacts across {companies.length} companies</p>
        </div>
        <button onClick={() => setShowAddContact(true)} className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 shadow-sm">
          <Plus size={16} /> Add Contact
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[180px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search name, title, email, company..." value={contactSearch} onChange={e => setContactSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <select value={contactPipelineFilter} onChange={e => setContactPipelineFilter(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white">
          <option value="all">All Pipelines</option>
          {PIPELINES.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
        </select>
        <button onClick={() => setContactDMFilter(v => !v)} className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${contactDMFilter ? "bg-amber-50 border-amber-300 text-amber-700" : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"}`}>
          <UserCheck size={14} /> Decision Makers
        </button>
      </div>

      {/* Enrichment Usage Banner */}
      {enrichmentStats && (
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Zap size={14} className="text-amber-500" />
              <span className="text-xs font-semibold text-gray-700">Contact Enrichment</span>
            </div>
            {enrichmentStats.hunter?.configured && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Hunter.io:</span>
                <span className={`text-xs font-bold ${enrichmentStats.hunter.remaining <= 5 ? "text-red-600" : enrichmentStats.hunter.remaining <= 15 ? "text-amber-600" : "text-green-600"}`}>
                  {enrichmentStats.hunter.remaining}/50 remaining
                </span>
                <span className="text-xs text-gray-400">({enrichmentStats.hunter.successful} found this month)</span>
              </div>
            )}
            {enrichmentStats.rocketreach?.configured && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">RocketReach:</span>
                <span className="text-xs font-bold text-green-600">{enrichmentStats.rocketreach.successful} found</span>
              </div>
            )}
            {!enrichmentStats.hunter?.configured && !enrichmentStats.rocketreach?.configured && (
              <span className="text-xs text-amber-600">No enrichment API configured. Add HUNTER_API_KEY to .env for free email lookups.</span>
            )}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase cursor-pointer select-none" onClick={() => handleContactSort("name")}>
                  <span className="flex items-center gap-1">Name {contactSortField === "name" ? (contactSortDir === "asc" ? <ChevronUp size={11} /> : <ChevronDown size={11} />) : <ArrowUpDown size={11} className="text-gray-300" />}</span>
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase cursor-pointer select-none" onClick={() => handleContactSort("title")}>
                  <span className="flex items-center gap-1">Title {contactSortField === "title" ? (contactSortDir === "asc" ? <ChevronUp size={11} /> : <ChevronDown size={11} />) : <ArrowUpDown size={11} className="text-gray-300" />}</span>
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase cursor-pointer select-none" onClick={() => handleContactSort("company")}>
                  <span className="flex items-center gap-1">Company {contactSortField === "company" ? (contactSortDir === "asc" ? <ChevronUp size={11} /> : <ChevronDown size={11} />) : <ArrowUpDown size={11} className="text-gray-300" />}</span>
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Pipeline</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Contact Info</th>
                <th className="w-10 px-3 py-3" />
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map(ct => {
                const company = ct._company;
                const hasContactInfo = ct.email || ct.phone;
                return (
                  <tr key={ct.id} className="border-b border-gray-50 hover:bg-gray-50/50 cursor-pointer" onClick={() => openContactDrilldown(ct)}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600 flex-shrink-0">{ct.name.split(" ").map(n => n[0]).join("")}</div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900">{ct.name}</span>
                          {ct.decisionMaker && <Badge className="bg-amber-100 text-amber-700">DM</Badge>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3"><span className="text-sm text-gray-600">{ct.title || "—"}</span></td>
                    <td className="px-4 py-3"><span className="text-sm text-gray-600">{company?.name || "—"}</span></td>
                    <td className="px-4 py-3">{company && <PipelineBadge pipelineId={company.pipeline} />}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        {ct.email && <span className="flex items-center gap-1"><Mail size={11} /> {ct.email}</span>}
                        {ct.phone && <span className="flex items-center gap-1"><Phone size={11} /> {ct.phone}</span>}
                        {ct.linkedin && <a href={ct.linkedin.startsWith("http") ? ct.linkedin : `https://${ct.linkedin}`} target="_blank" rel="noreferrer" className="text-indigo-500 hover:text-indigo-700" onClick={e => e.stopPropagation()}><Link2 size={13} /></a>}
                        {!hasContactInfo && company && (
                          <button
                            onClick={e => { e.stopPropagation(); handleEnrich(ct, company.name, company.website); }}
                            disabled={enriching === ct.id}
                            className="flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg hover:bg-amber-100 disabled:opacity-50 font-medium"
                          >
                            {enriching === ct.id ? <Loader2 size={11} className="animate-spin" /> : <Zap size={11} />}
                            {enriching === ct.id ? "Looking up..." : "Find Email"}
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-3"><ChevronRight size={15} className="text-gray-300" /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredContacts.length === 0 && (
            <div className="py-12 text-center">
              <Users size={24} className="mx-auto text-gray-300 mb-2" />
              <p className="text-sm text-gray-500">No contacts found. Adjust filters or add new.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // ─── SCRAPER ───────────────────────────────────────────────────────
  const renderScraper = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Signal Scraper</h1>
        <p className="text-sm text-gray-500 mt-1">Scrape intent signals across sources to enrich your pipeline</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-semibold text-gray-900">New Scrape</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-1">
            <label className="block text-xs font-medium text-gray-600 mb-1">Target Pipeline</label>
            <select value={scrapePipeline} onChange={e => setScrapePipeline(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white">
              {PIPELINES.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
            </select>
          </div>
          <div className="md:col-span-1">
            <label className="block text-xs font-medium text-gray-600 mb-1">Source</label>
            <select value={scrapeSource} onChange={e => setScrapeSource(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white">
              {SCRAPE_SOURCES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
          </div>
          <div className="md:col-span-1">
            <label className="block text-xs font-medium text-gray-600 mb-1">URL / Search Term</label>
            <div className="flex gap-2">
              <input type="text" value={scrapeUrl} onChange={e => setScrapeUrl(e.target.value)} placeholder="company.com or keyword..." className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm" onKeyDown={e => e.key === "Enter" && handleScrape()} />
              <button onClick={handleScrape} disabled={scraping || !scrapeUrl.trim()} className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-40">
                {scraping ? <Loader2 size={15} className="animate-spin" /> : <Globe size={15} />}
                {scraping ? "..." : "Go"}
              </button>
            </div>
          </div>
        </div>

        {/* Source cards */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {SCRAPE_SOURCES.map(s => (
            <button key={s.id} onClick={() => setScrapeSource(s.id)} className={`p-2.5 rounded-xl border text-center transition-colors ${scrapeSource === s.id ? "border-indigo-300 bg-indigo-50" : "border-gray-100 hover:border-gray-200"}`}>
              <s.icon size={16} className={`mx-auto ${scrapeSource === s.id ? "text-indigo-600" : "text-gray-400"}`} />
              <p className="text-[11px] font-medium text-gray-700 mt-1">{s.label}</p>
            </button>
          ))}
        </div>

        {/* Signal categories for selected pipeline */}
        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Signal Categories — {PIPELINE_MAP[scrapePipeline]?.label}</h4>
          <div className="flex flex-wrap gap-1.5">
            {(SIGNAL_CATEGORIES[scrapePipeline] || []).map(sig => (
              <div key={sig.id} className="bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5">
                <p className="text-xs font-medium text-gray-700">{sig.label}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{sig.keywords.slice(0, 3).join(", ")}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scrape Results */}
      {scrapeResults && (
        <div className="bg-white rounded-xl border border-green-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {scrapeResults.success === false ? (
                <AlertCircle size={18} className="text-red-500" />
              ) : (
                <Check size={18} className="text-green-500" />
              )}
              <h3 className="text-sm font-semibold text-gray-900">
                {scrapeResults.success === false ? "Scrape Failed" : `Results — ${scrapeResults.domain || scrapeResults.url || ""}`}
              </h3>
            </div>
            {scrapeResults.success !== false && (
              <button onClick={importScrapedCompany} className="flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700">
                <Plus size={14} /> Import to CRM
              </button>
            )}
          </div>

          {scrapeResults.success === false && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-700">{scrapeResults.error || "Unknown error occurred"}</p>
              {scrapeResults.note && <p className="text-xs text-red-500 mt-1">{scrapeResults.note}</p>}
            </div>
          )}

          {scrapeResults.success !== false && (
            <>
              {/* Title & Description */}
              {(scrapeResults.title || scrapeResults.description) && (
                <div className="bg-gray-50 rounded-lg p-3">
                  {scrapeResults.title && <p className="text-sm font-medium text-gray-900">{scrapeResults.title}</p>}
                  {scrapeResults.description && <p className="text-xs text-gray-600 mt-1">{scrapeResults.description.slice(0, 200)}</p>}
                </div>
              )}

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <span className="text-xs text-gray-500 block">Industry</span>
                  <span className="text-sm font-medium text-gray-900">{scrapeResults.industry || "—"}</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <span className="text-xs text-gray-500 block">Location</span>
                  <span className="text-sm font-medium text-gray-900">{scrapeResults.location || "—"}</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <span className="text-xs text-gray-500 block">Emails Found</span>
                  <span className="text-sm font-medium text-gray-900">{scrapeResults.emails?.length || 0}</span>
                </div>
              </div>

              {/* Tech Stack */}
              {scrapeResults.techStack?.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Tech Stack Detected</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {scrapeResults.techStack.map((tech) => (
                      <Badge key={tech} className="bg-blue-50 text-blue-700 border border-blue-200">{tech}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Links */}
              {scrapeResults.socialLinks && Object.keys(scrapeResults.socialLinks).length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Social Links</h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(scrapeResults.socialLinks).map(([platform, link]) => (
                      <a key={platform} href={link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-indigo-600 hover:bg-indigo-50">
                        <ExternalLink size={11} /> {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Signals */}
              {scrapeResults.matchedSignals?.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Matched Intent Signals</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {scrapeResults.matchedSignals.map(sig => (
                      <Badge key={sig.id} className="bg-green-50 text-green-700 border border-green-200">{sig.label}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Contacts */}
              {scrapeResults.contacts?.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Contacts Found ({scrapeResults.contacts.length})</h4>
                  <div className="space-y-2">
                    {scrapeResults.contacts.map((c, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{c.name}</p>
                          <p className="text-xs text-gray-500">{c.title}</p>
                        </div>
                        <span className="text-xs text-gray-400">{c.email}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Discovered Leads from Reddit */}
              {scrapeResults.leads?.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Leads Discovered ({scrapeResults.leads.length})</h4>
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {scrapeResults.leads.map((lead, i) => (
                      <div key={i} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <Building2 size={14} className="text-indigo-500" />
                            <span className="text-sm font-semibold text-gray-900">{lead.name}</span>
                          </div>
                          <a href={`https://${lead.website}`} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-600 hover:underline flex items-center gap-1">
                            {lead.website} <ExternalLink size={10} />
                          </a>
                        </div>
                        {lead.description && <p className="text-xs text-gray-600 mb-2">{lead.description}</p>}
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {lead.industry && <Badge className="bg-purple-50 text-purple-700 border border-purple-200">{lead.industry}</Badge>}
                          {lead.location && <Badge className="bg-gray-100 text-gray-600">{lead.location}</Badge>}
                          {lead.techStack?.slice(0, 4).map((t) => (
                            <Badge key={t} className="bg-blue-50 text-blue-600 border border-blue-200">{t}</Badge>
                          ))}
                        </div>
                        {lead.emails?.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {lead.emails.slice(0, 3).map((e) => (
                              <span key={e} className="text-xs text-gray-500 flex items-center gap-1"><Mail size={10} />{e}</span>
                            ))}
                          </div>
                        )}
                        {lead.mentionedIn?.length > 0 && (
                          <p className="text-[10px] text-gray-400 mt-1.5">Mentioned in: {lead.mentionedIn.join("; ").slice(0, 120)}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reddit/Social discussions found */}
              {scrapeResults.discussions?.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Source Discussions ({scrapeResults.discussions.length})</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {scrapeResults.discussions.map((d, i) => (
                      <a key={i} href={d.link} target="_blank" rel="noopener noreferrer" className="block p-3 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
                        <p className="text-sm font-medium text-indigo-700">{d.title}</p>
                        {d.snippet && <p className="text-xs text-gray-500 mt-1">{d.snippet}</p>}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Fallback note (e.g., LinkedIn/Crunchbase API not configured) */}
              {scrapeResults.note && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <p className="text-xs text-amber-700">{scrapeResults.note}</p>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Scrape History */}
      {scrapeHistory.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Scrape History</h3>
          <div className="space-y-2">
            {scrapeHistory.map((h, i) => (
              <div key={i} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-2">
                  <Globe size={13} className="text-gray-400" />
                  <span className="text-sm text-gray-700">{h.url}</span>
                  <PipelineBadge pipelineId={h.pipeline} />
                  <Badge className="bg-gray-100 text-gray-600">{h.source}</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">{h.createdAt ? new Date(h.createdAt).toLocaleDateString() : ""}</span>
                  <button onClick={() => setScrapeResults({ ...h.resultData, matchedSignals: h.matchedSignals })} className="text-xs text-indigo-600 font-medium">View</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // ─── SIGNALS (ICP Reference) ───────────────────────────────────────
  const renderSignals = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">ICP & Signals Reference</h1>
        <p className="text-sm text-gray-500 mt-1">Your scoring criteria and signal categories by pipeline</p>
      </div>

      {PIPELINES.map(pipe => {
        const criteria = SCORING_CRITERIA[pipe.id];
        const signals = SIGNAL_CATEGORIES[pipe.id] || [];
        const personas = BUYER_PERSONAS[pipe.id] || [];
        const colorMap = { indigo: "border-indigo-200", emerald: "border-emerald-200", sky: "border-sky-200", amber: "border-amber-200", rose: "border-rose-200", violet: "border-violet-200" };
        return (
          <div key={pipe.id} className={`bg-white rounded-xl border ${colorMap[pipe.color]} p-5 shadow-sm space-y-4`}>
            <div className="flex items-center gap-2">
              <pipe.icon size={18} className="text-gray-600" />
              <h3 className="text-sm font-semibold text-gray-900">{pipe.label}</h3>
              <span className="text-xs text-gray-400">— {pipe.description}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Fit criteria */}
              <div>
                <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Fit Criteria (0–50)</h4>
                <div className="space-y-1">
                  {criteria?.fit.map(cr => (
                    <div key={cr.id} className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">{cr.label}</span>
                      <span className="text-gray-400 font-mono">/{cr.max}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Intent criteria */}
              <div>
                <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Intent Criteria (0–50)</h4>
                <div className="space-y-1">
                  {criteria?.intent.map(cr => (
                    <div key={cr.id} className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">{cr.label}</span>
                      <span className="text-gray-400 font-mono">/{cr.max}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Signals + Personas */}
              <div>
                <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Buyer Personas</h4>
                <div className="flex flex-wrap gap-1 mb-3">
                  {personas.map(p => <Badge key={p} className="bg-gray-100 text-gray-600">{p}</Badge>)}
                </div>
                <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Scrape Signals</h4>
                <div className="space-y-1">
                  {signals.map(sig => (
                    <div key={sig.id} className="text-xs text-gray-600">
                      <span className="font-medium">{sig.label}:</span> <span className="text-gray-400">{sig.keywords.join(", ")}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Operating Rules */}
      <div className="bg-indigo-50 rounded-xl border border-indigo-100 p-5">
        <h3 className="text-sm font-semibold text-indigo-900 mb-3">Operating Rules</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-indigo-700">
          <div>
            <p className="font-semibold mb-1">Priority Thresholds</p>
            <p>80–100 = Priority A (work now, same-week follow-ups)</p>
            <p>60–79 = Priority B (1 follow-up + nurture sequence)</p>
            <p>40–59 = Priority C (content drip or referral handoff)</p>
            <p>&lt;40 = Park / refer out</p>
          </div>
          <div>
            <p className="font-semibold mb-1">Follow-up Cadence</p>
            <p>Day 0: outreach</p>
            <p>Day 2: bump</p>
            <p>Day 7: bump + value (resource, insight)</p>
            <p>Day 14: "close the loop"</p>
            <p>Then: Nurture (monthly touch)</p>
          </div>
        </div>
      </div>
    </div>
  );

  // ─── REPORTS ─────────────────────────────────────────────────────────

  // Group reports by week (Monday-based)
  const reportsByWeek = useMemo(() => {
    if (!reports.length) return [];
    const weeks = {};
    reports.forEach(r => {
      const d = new Date(r.date + "T12:00:00");
      const day = d.getDay();
      const mondayOffset = day === 0 ? -6 : 1 - day;
      const monday = new Date(d);
      monday.setDate(d.getDate() + mondayOffset);
      const weekKey = monday.toISOString().slice(0, 10);
      if (!weeks[weekKey]) weeks[weekKey] = { weekStart: weekKey, reports: [], totalLeads: 0, priorityAB: 0, pipelines: new Set() };
      weeks[weekKey].reports.push(r);
      weeks[weekKey].totalLeads += r.totalLeads || 0;
      (r.leads || []).forEach(l => {
        if ((l.fitScore + l.intentScore) >= 60) weeks[weekKey].priorityAB++;
        if (l.pipeline) weeks[weekKey].pipelines.add(l.pipeline);
      });
    });
    return Object.values(weeks)
      .map(w => ({ ...w, pipelines: w.pipelines.size }))
      .sort((a, b) => b.weekStart.localeCompare(a.weekStart));
  }, [reports]);

  const [expandedWeek, setExpandedWeek] = useState(null);

  // Auto-expand the most recent week
  const activeWeek = expandedWeek || (reportsByWeek.length > 0 ? reportsByWeek[0].weekStart : null);

  const renderReports = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Daily Lead Reports</h2>
          <p className="text-sm text-gray-500">Automated daily scrapes across your 8 pipelines — grouped by week</p>
        </div>
        <div className="text-xs text-gray-400">{reports.length} reports total</div>
      </div>

      {reports.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <FileText size={40} className="text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-500">No reports yet. The daily scrape runs at 7 AM weekdays and produces a report here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {reportsByWeek.map(week => {
            const isExpanded = activeWeek === week.weekStart;
            const weekEnd = new Date(week.weekStart + "T12:00:00");
            weekEnd.setDate(weekEnd.getDate() + 6);
            const weekLabel = `${new Date(week.weekStart + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${weekEnd.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;

            return (
              <div key={week.weekStart} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Week Header */}
                <button
                  onClick={() => setExpandedWeek(isExpanded ? "__none__" : week.weekStart)}
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {isExpanded ? <ChevronDown size={16} className="text-gray-400" /> : <ChevronRight size={16} className="text-gray-400" />}
                    <div className="text-left">
                      <h3 className="text-sm font-bold text-gray-900">{weekLabel}</h3>
                      <p className="text-[10px] text-gray-400">{week.reports.length} report{week.reports.length !== 1 ? "s" : ""} this week</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-sm font-bold text-indigo-600">{week.totalLeads}</span>
                      <span className="text-[10px] text-gray-400 ml-1">leads</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-green-600">{week.priorityAB}</span>
                      <span className="text-[10px] text-gray-400 ml-1">A/B</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-gray-600">{week.pipelines}</span>
                      <span className="text-[10px] text-gray-400 ml-1">pipelines</span>
                    </div>
                  </div>
                </button>

                {/* Expanded Week Content */}
                {isExpanded && (
                  <div className="border-t border-gray-100">
                    {/* Day selector within the week */}
                    <div className="flex gap-1.5 px-5 py-3 bg-gray-50 border-b border-gray-100 overflow-x-auto">
                      {week.reports.sort((a, b) => b.date.localeCompare(a.date)).map(r => (
                        <button
                          key={r.date}
                          onClick={() => setSelectedReport(r)}
                          className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${selectedReport?.date === r.date ? "bg-indigo-600 text-white" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"}`}
                        >
                          {new Date(r.date + "T12:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                          <span className="ml-1.5 opacity-70">{r.totalLeads} leads</span>
                        </button>
                      ))}
                    </div>

                    {/* Selected day's report */}
                    {selectedReport && week.reports.some(r => r.date === selectedReport.date) && (
                      <div className="p-5 space-y-4">
                        {/* Summary Stats */}
                        <div className="grid grid-cols-4 gap-3">
                          <div className="bg-gray-50 rounded-lg p-3 text-center">
                            <p className="text-xl font-bold text-indigo-600">{selectedReport.totalLeads}</p>
                            <p className="text-[10px] text-gray-500">Leads Found</p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3 text-center">
                            <p className="text-xl font-bold text-green-600">{selectedReport.leads.filter(l => (l.fitScore + l.intentScore) >= 60).length}</p>
                            <p className="text-[10px] text-gray-500">Priority A/B</p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3 text-center">
                            <p className="text-xl font-bold text-gray-900">{[...new Set(selectedReport.leads.map(l => l.pipeline))].length}</p>
                            <p className="text-[10px] text-gray-500">Pipelines</p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3 text-center">
                            <p className="text-xl font-bold text-amber-600">{Math.max(...selectedReport.leads.map(l => l.fitScore + l.intentScore), 0)}</p>
                            <p className="text-[10px] text-gray-500">Top Score</p>
                          </div>
                        </div>

                        {/* Lead Cards */}
                        <div className="space-y-3">
                          {[...selectedReport.leads]
                            .sort((a, b) => (b.fitScore + b.intentScore) - (a.fitScore + a.intentScore))
                            .map((lead, i) => {
                              const total = lead.fitScore + lead.intentScore;
                              const grade = total >= 70 ? "A" : total >= 55 ? "B" : total >= 40 ? "C" : "D";
                              const gradeColor = { A: "bg-green-100 text-green-700 border-green-200", B: "bg-indigo-100 text-indigo-700 border-indigo-200", C: "bg-amber-100 text-amber-700 border-amber-200", D: "bg-gray-100 text-gray-600 border-gray-200" }[grade];
                              return (
                                <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
                                  <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                      <span className="text-xs font-bold text-gray-400">#{i + 1}</span>
                                      <div>
                                        <div className="flex items-center gap-2">
                                          <h3 className="text-sm font-bold text-gray-900">{lead.name}</h3>
                                          {lead.starred && <Star size={14} className="text-amber-400 fill-amber-400" />}
                                        </div>
                                        <div className="flex items-center gap-2 mt-0.5">
                                          <span className="text-xs text-gray-500">{lead.website?.replace(/^https?:\/\//, "")}</span>
                                          {lead.location && <span className="text-xs text-gray-400">· {lead.location}</span>}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <PipelineBadge pipelineId={lead.pipeline} />
                                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${gradeColor}`}>{grade} · {total}</span>
                                    </div>
                                  </div>

                                  {/* Score Bar */}
                                  <div className="flex items-center gap-3 mb-3">
                                    <div className="flex-1">
                                      <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                                        <span>Fit: {lead.fitScore}/50</span>
                                        <span>Intent: {lead.intentScore}/50</span>
                                      </div>
                                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden flex">
                                        <div className="bg-indigo-500 h-full rounded-l-full" style={{ width: `${lead.fitScore}%` }} />
                                        <div className="bg-green-500 h-full rounded-r-full" style={{ width: `${lead.intentScore}%` }} />
                                      </div>
                                    </div>
                                  </div>

                                  {/* Details */}
                                  <p className="text-xs text-gray-600 mb-3 leading-relaxed">{lead.notes?.slice(0, 250)}{lead.notes?.length > 250 ? "..." : ""}</p>

                                  <div className="flex flex-wrap gap-2 mb-3">
                                    {lead.industry && <Badge className="bg-purple-50 text-purple-700 border border-purple-200">{lead.industry}</Badge>}
                                    {lead.fundingStage && <Badge className="bg-green-50 text-green-700 border border-green-200">{lead.fundingStage}</Badge>}
                                    {(lead.techStack || []).slice(0, 3).map(t => (
                                      <Badge key={t} className="bg-blue-50 text-blue-600 border border-blue-200">{t}</Badge>
                                    ))}
                                    {lead.source && <Badge className="bg-gray-50 text-gray-500 border border-gray-200">via {lead.source}</Badge>}
                                  </div>

                                  {/* Contacts */}
                                  {lead.contacts?.length > 0 && (
                                    <div className="border-t border-gray-100 pt-3">
                                      <p className="text-[10px] font-semibold text-gray-400 uppercase mb-2">Key Contacts</p>
                                      <div className="flex flex-wrap gap-3">
                                        {lead.contacts.map((c, ci) => (
                                          <div key={ci} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-1.5">
                                            <UserCheck size={12} className={c.decisionMaker ? "text-indigo-500" : "text-gray-400"} />
                                            <div>
                                              <p className="text-xs font-medium text-gray-800">{c.name}</p>
                                              <p className="text-[10px] text-gray-500">{c.title}</p>
                                            </div>
                                            {c.linkedin && (
                                              <a href={c.linkedin} target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:text-indigo-700"><ExternalLink size={10} /></a>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  // ─── PIPELINE BOARD ──────────────────────────────────────────────
  const BOARD_STAGES = ["Targeted", "Contacted", "Engaged", "Qualified", "Proposal Sent", "Won"];

  const renderPipelineBoard = () => {
    const boardPipeline = pipelineFilter !== "all" ? pipelineFilter : null;
    const boardCompanies = boardPipeline ? companies.filter(c => c.pipeline === boardPipeline) : companies;

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Pipeline Board</h1>
            <p className="text-sm text-gray-500 mt-1">Drag-free board — click stage badges to move leads through your pipeline</p>
          </div>
          <select value={pipelineFilter} onChange={e => setPipelineFilter(e.target.value)} className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm bg-white">
            <option value="all">All Pipelines</option>
            {PIPELINES.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
          </select>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-4">
          {BOARD_STAGES.map(stage => {
            const stageCompanies = boardCompanies.filter(c => c.stage === stage);
            return (
              <div key={stage} className="flex-shrink-0 w-64">
                <div className={`px-3 py-2 rounded-t-lg text-xs font-bold uppercase tracking-wide ${STAGE_COLORS[stage] || "bg-gray-100 text-gray-600"}`}>
                  {stage} <span className="ml-1 opacity-60">({stageCompanies.length})</span>
                </div>
                <div className="bg-gray-50 rounded-b-lg p-2 space-y-2 min-h-[200px] border border-gray-100">
                  {stageCompanies.map(company => {
                    const score = company.fitScore + company.intentScore;
                    const grade = score >= 80 ? "A" : score >= 60 ? "B" : score >= 40 ? "C" : "D";
                    const gradeColor = { A: "text-green-600", B: "text-blue-600", C: "text-amber-600", D: "text-gray-400" }[grade];
                    const pipe = PIPELINE_MAP[company.pipeline];
                    const cContacts = contacts.filter(ct => ct.companyId === company.id);
                    return (
                      <div key={company.id} className="bg-white rounded-lg border border-gray-100 p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => { openCompanyDrilldown(company); setPage("companies"); }}>
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="text-xs font-bold text-gray-900 leading-tight">{company.name}</h4>
                          <span className={`text-[10px] font-bold ${gradeColor}`}>{grade}·{score}</span>
                        </div>
                        {pipe && <span className={`inline-block text-[9px] font-medium px-1.5 py-0.5 rounded bg-${pipe.color}-50 text-${pipe.color}-600 mb-1.5`}>{pipe.short}</span>}
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-gray-400">{cContacts.length} contact{cContacts.length !== 1 ? "s" : ""}</span>
                          <select
                            value={company.stage}
                            onChange={(e) => { e.stopPropagation(); updateCompanyStage(company.id, e.target.value); }}
                            onClick={(e) => e.stopPropagation()}
                            className="text-[10px] border border-gray-200 rounded px-1 py-0.5 bg-white text-gray-600"
                          >
                            {FUNNEL_STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </div>
                        {cContacts.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-gray-50 space-y-1">
                            {cContacts.slice(0, 2).map(ct => (
                              <div key={ct.id} className="flex items-center gap-1.5 cursor-pointer hover:bg-gray-50 rounded px-1 py-0.5" onClick={(e) => { e.stopPropagation(); openContactSidebar(ct); }}>
                                <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-[8px] font-bold text-indigo-600">{ct.name.split(" ").map(n => n[0]).join("")}</div>
                                <span className="text-[10px] text-gray-600 truncate">{ct.name}</span>
                              </div>
                            ))}
                            {cContacts.length > 2 && <span className="text-[9px] text-gray-400 pl-1">+{cContacts.length - 2} more</span>}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {stageCompanies.length === 0 && <p className="text-[10px] text-gray-300 text-center pt-8">No leads</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ─── CONTACT SIDEBAR COMPONENT ─────────────────────────────────────
  const ENGAGEMENT_TYPES = [
    { id: "note", label: "Note", icon: MessageSquare },
    { id: "email", label: "Email", icon: Mail },
    { id: "call", label: "Call", icon: PhoneCall },
    { id: "meeting", label: "Meeting", icon: Calendar },
    { id: "linkedin", label: "LinkedIn", icon: Link2 },
    { id: "other", label: "Other", icon: Activity },
  ];

  const ENGAGEMENT_TYPE_MAP = Object.fromEntries(ENGAGEMENT_TYPES.map(t => [t.id, t]));

  const renderContactSidebar = () => {
    if (!sidebarContact) return null;
    const company = companies.find(c => c.id === sidebarContact.companyId);

    return (
      <div className="fixed inset-0 z-50 flex justify-end">
        <div className="absolute inset-0 bg-black/20" onClick={closeContactSidebar} />
        <div className="relative w-[420px] bg-white shadow-2xl flex flex-col h-full overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-bold text-indigo-600">
                {sidebarContact.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-900">{sidebarContact.name}</h2>
                {company && <p className="text-xs text-gray-500">{sidebarContact.title} at {company.name}</p>}
              </div>
            </div>
            <button onClick={closeContactSidebar} className="p-1 hover:bg-gray-200 rounded"><X size={18} className="text-gray-400" /></button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* Editable Contact Info */}
            <div className="px-5 py-4 border-b border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Contact Info</h3>
                <button onClick={saveContactEdits} disabled={savingContact} className="flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-800 disabled:opacity-50">
                  {savingContact ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />} Save
                </button>
              </div>
              {editingContact && (
                <div className="space-y-2">
                  {[
                    { key: "name", label: "Name", icon: Users },
                    { key: "title", label: "Title", icon: Briefcase },
                    { key: "email", label: "Email", icon: Mail },
                    { key: "phone", label: "Phone", icon: Phone },
                    { key: "linkedin", label: "LinkedIn", icon: Link2 },
                  ].map(field => (
                    <div key={field.key} className="flex items-center gap-2">
                      <field.icon size={13} className="text-gray-400 flex-shrink-0" />
                      <input
                        type="text"
                        value={editingContact[field.key] || ""}
                        onChange={e => setEditingContact(prev => ({ ...prev, [field.key]: e.target.value }))}
                        placeholder={field.label}
                        className="flex-1 text-sm px-2 py-1.5 border border-gray-200 rounded-md focus:border-indigo-300 focus:ring-1 focus:ring-indigo-200 outline-none"
                      />
                    </div>
                  ))}
                </div>
              )}
              {company && (
                <div className="mt-3 pt-3 border-t border-gray-50">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Building2 size={13} className="text-gray-400" />
                    <span>{company.name}</span>
                    <span className={`ml-auto px-2 py-0.5 rounded-full text-[10px] font-bold ${STAGE_COLORS[company.stage] || "bg-gray-100 text-gray-600"}`}>{company.stage}</span>
                  </div>
                  {company.pipeline && <PipelineBadge pipelineId={company.pipeline} className="mt-1" />}
                </div>
              )}
            </div>

            {/* Add Engagement */}
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Add Engagement</h3>
              <div className="flex gap-1.5 mb-2">
                {ENGAGEMENT_TYPES.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setNewEngagement(prev => ({ ...prev, type: t.id }))}
                    className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium border transition-colors ${newEngagement.type === t.id ? "bg-indigo-50 border-indigo-200 text-indigo-700" : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"}`}
                  >
                    <t.icon size={10} /> {t.label}
                  </button>
                ))}
              </div>
              <textarea
                value={newEngagement.notes}
                onChange={e => setNewEngagement(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="What happened? Add notes about this interaction..."
                className="w-full text-sm px-3 py-2 border border-gray-200 rounded-lg focus:border-indigo-300 focus:ring-1 focus:ring-indigo-200 outline-none resize-none"
                rows={3}
              />
              <button
                onClick={addEngagement}
                disabled={!newEngagement.notes.trim() || savingEngagement}
                className="mt-2 w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-indigo-600 text-white text-xs font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {savingEngagement ? <Loader2 size={12} className="animate-spin" /> : <Plus size={12} />}
                Add to Timeline
              </button>
            </div>

            {/* Engagement Timeline */}
            <div className="px-5 py-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Timeline ({sidebarEngagements.length})
              </h3>
              {sidebarEngagements.length === 0 && (
                <p className="text-xs text-gray-400 text-center py-6">No engagements yet. Add one above to start tracking interactions.</p>
              )}
              <div className="space-y-0">
                {sidebarEngagements.map((eng, idx) => {
                  const typeInfo = ENGAGEMENT_TYPE_MAP[eng.type] || ENGAGEMENT_TYPE_MAP.other;
                  const TypeIcon = typeInfo.icon;
                  const isLast = idx === sidebarEngagements.length - 1;
                  return (
                    <div key={eng.id} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                          <TypeIcon size={13} className="text-gray-500" />
                        </div>
                        {!isLast && <div className="w-px flex-1 bg-gray-200 my-1" />}
                      </div>
                      <div className={`flex-1 pb-4 ${isLast ? "" : ""}`}>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[10px] font-bold text-gray-500 uppercase">{typeInfo.label}</span>
                          <span className="text-[10px] text-gray-400">{new Date(eng.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                          <span className="text-[10px] text-gray-300">{new Date(eng.createdAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}</span>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">{eng.notes}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  /* ═══════════════════════════════════════════════════════════════════════
     NAVIGATION & LAYOUT
     ═══════════════════════════════════════════════════════════════════════ */

  // ─── COMPANY DRILL-DOWN PAGE ──────────────────────────────────────
  // ─── CONTACT DRILL-DOWN PAGE ──────────────────────────────────────
  const renderContactDrilldown = () => {
    if (!drilldownContact) return null;
    const ct = drilldownContact;
    const company = ct._company;

    return (
      <div className="space-y-6">
        {/* Back button + header */}
        <div>
          <button onClick={closeContactDrilldown} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 mb-3">
            <ArrowLeft size={16} /> Back to Contacts
          </button>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-xl font-bold text-indigo-600">{ct.name.split(" ").map(n => n[0]).join("")}</div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-gray-900">{ct.name}</h1>
                    {ct.decisionMaker && <Badge className="bg-amber-100 text-amber-700">DM</Badge>}
                  </div>
                  <p className="text-sm text-gray-500">{ct.title}</p>
                  {company && (
                    <button onClick={() => { closeContactDrilldown(); openCompanyDrilldown(company); }} className="text-sm text-indigo-600 hover:text-indigo-700 font-medium mt-0.5">
                      {company.name} →
                    </button>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                {ct.email && <a href={`mailto:${ct.email}`} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"><Mail size={14} /> {ct.email}</a>}
                {ct.phone && <a href={`tel:${ct.phone}`} className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg hover:bg-green-100"><Phone size={14} /> {ct.phone}</a>}
                {ct.linkedin && <a href={ct.linkedin.startsWith("http") ? ct.linkedin : `https://${ct.linkedin}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100"><Link2 size={14} /> LinkedIn</a>}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editable contact info */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Contact Details</h3>
            <div className="space-y-3">
              {["name", "title", "email", "phone", "linkedin"].map(field => (
                <div key={field}>
                  <label className="text-xs font-medium text-gray-500 uppercase block mb-1">{field}</label>
                  <input type="text" value={editingContact?.[field] || ""} onChange={e => setEditingContact(prev => ({ ...prev, [field]: e.target.value }))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
              ))}
              <button onClick={async () => {
                if (!editingContact) return;
                setSavingContact(true);
                try {
                  await api.updateContact({ id: ct.id, ...editingContact });
                  setContacts(prev => prev.map(c => c.id === ct.id ? { ...c, ...editingContact } : c));
                  setDrilldownContact(prev => ({ ...prev, ...editingContact }));
                } catch (err) { console.error("Failed to save:", err); }
                finally { setSavingContact(false); }
              }} disabled={savingContact} className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50">
                {savingContact ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save Changes
              </button>
            </div>
          </div>

          {/* Company context */}
          {company && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-900">Company</h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-sm font-bold text-indigo-600">{company.name.charAt(0)}</div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{company.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <PipelineBadge pipelineId={company.pipeline} />
                    <Badge className={STAGE_COLORS[company.stage]}>{company.stage}</Badge>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-gray-50 rounded-lg p-2"><span className="text-xs text-gray-500 block">Industry</span><span className="font-medium text-gray-900 text-xs">{company.industry || "—"}</span></div>
                <div className="bg-gray-50 rounded-lg p-2"><span className="text-xs text-gray-500 block">Location</span><span className="font-medium text-gray-900 text-xs">{company.location || "—"}</span></div>
                <div className="bg-gray-50 rounded-lg p-2"><span className="text-xs text-gray-500 block">Funding</span><span className="font-medium text-gray-900 text-xs">{company.fundingStage || "—"}</span></div>
                <div className="bg-gray-50 rounded-lg p-2">
                  <span className="text-xs text-gray-500 block">Score</span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <ScoreBadge score={company.fitScore} label="F" />
                    <ScoreBadge score={company.intentScore} label="I" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Engagement timeline */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4 lg:col-span-2">
            <h3 className="text-sm font-semibold text-gray-900">Engagement Timeline</h3>
            {/* Add engagement */}
            <div className="flex gap-2">
              <select value={newEngagement.type} onChange={e => setNewEngagement(prev => ({ ...prev, type: e.target.value }))} className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white">
                <option value="note">Note</option>
                <option value="email">Email</option>
                <option value="call">Call</option>
                <option value="meeting">Meeting</option>
                <option value="linkedin">LinkedIn</option>
                <option value="other">Other</option>
              </select>
              <input type="text" value={newEngagement.notes} onChange={e => setNewEngagement(prev => ({ ...prev, notes: e.target.value }))} placeholder="Add an engagement note..." className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" onKeyDown={e => {
                if (e.key === "Enter" && newEngagement.notes.trim()) {
                  setSavingEngagement(true);
                  api.createEngagement({
                    type: newEngagement.type,
                    notes: newEngagement.notes,
                    contactId: ct.id,
                    companyId: ct.companyId || null,
                  }).then(eng => {
                    setSidebarEngagements(prev => [eng, ...prev]);
                    setNewEngagement({ type: "note", notes: "" });
                  }).finally(() => setSavingEngagement(false));
                }
              }} />
              <button onClick={() => {
                if (!newEngagement.notes.trim()) return;
                setSavingEngagement(true);
                api.createEngagement({
                  type: newEngagement.type,
                  notes: newEngagement.notes,
                  contactId: ct.id,
                  companyId: ct.companyId || null,
                }).then(eng => {
                  setSidebarEngagements(prev => [eng, ...prev]);
                  setNewEngagement({ type: "note", notes: "" });
                }).finally(() => setSavingEngagement(false));
              }} disabled={!newEngagement.notes.trim() || savingEngagement} className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-40">
                {savingEngagement ? <Loader2 size={14} className="animate-spin" /> : <Plus size={16} />}
              </button>
            </div>

            {sidebarEngagements.length === 0 ? (
              <p className="text-sm text-gray-400 italic text-center py-4">No engagements yet. Add one above.</p>
            ) : (
              <div className="space-y-2">
                {sidebarEngagements.map(eng => (
                  <div key={eng.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg group">
                    <div className="mt-0.5">
                      {eng.type === "email" && <Mail size={14} className="text-blue-500" />}
                      {eng.type === "call" && <PhoneCall size={14} className="text-green-500" />}
                      {eng.type === "meeting" && <Calendar size={14} className="text-purple-500" />}
                      {eng.type === "note" && <MessageSquare size={14} className="text-gray-400" />}
                      {eng.type === "linkedin" && <Link2 size={14} className="text-blue-600" />}
                      {!["email","call","meeting","note","linkedin"].includes(eng.type) && <Activity size={14} className="text-gray-400" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">{eng.notes}</p>
                      <p className="text-[11px] text-gray-400 mt-1">{new Date(eng.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" })} — <span className="capitalize">{eng.type}</span></p>
                    </div>
                    <button onClick={() => { api.deleteEngagement(eng.id); setSidebarEngagements(prev => prev.filter(e => e.id !== eng.id)); }} className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100"><Trash2 size={14} /></button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const DRILLDOWN_TABS = [
    { id: "overview", label: "Overview" },
    { id: "todos", label: "To-Do" },
    { id: "notes", label: "Notes" },
    { id: "roadmap", label: "Roadmap" },
  ];

  const MILESTONE_STATUS = {
    "planned": { label: "Planned", color: "bg-gray-100 text-gray-600", icon: Circle },
    "in-progress": { label: "In Progress", color: "bg-blue-100 text-blue-700", icon: Loader2 },
    "done": { label: "Done", color: "bg-green-100 text-green-700", icon: CheckCircle2 },
  };

  const renderCompanyDrilldown = () => {
    if (!drilldownCompany) return null;
    const c = drilldownCompany;
    const score = totalScore(c);
    const pri = getPriority(score);
    const pipe = PIPELINE_MAP[c.pipeline];
    const cContacts = companyContacts(c.id);
    const pendingTodos = drilldownTodos.filter(t => !t.completed);
    const doneTodos = drilldownTodos.filter(t => t.completed);

    return (
      <div className="space-y-6">
        {/* Back button + header */}
        <div>
          <button onClick={closeCompanyDrilldown} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 mb-3">
            <ArrowLeft size={16} /> Back to Companies
          </button>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-indigo-100 flex items-center justify-center text-xl font-bold text-indigo-600">{c.name.charAt(0)}</div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-gray-900">{c.name}</h1>
                    <button onClick={() => { toggleStar(c.id); setDrilldownCompany(prev => ({ ...prev, starred: !prev.starred })); }}>
                      {c.starred ? <Star size={18} className="text-amber-400 fill-amber-400" /> : <StarOff size={18} className="text-gray-300 hover:text-amber-300" />}
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <PipelineBadge pipelineId={c.pipeline} />
                    <Badge className={STAGE_COLORS[c.stage]}>{c.stage}</Badge>
                    <Badge className={`border ${PRIORITY_COLORS[pri]}`}>{PRIORITY_LABELS[pri]}</Badge>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <ScoreBadge score={c.fitScore} label="Fit" />
                    <span className="text-gray-300">+</span>
                    <ScoreBadge score={c.intentScore} label="Intent" />
                    <span className="text-gray-300">=</span>
                    <ScoreBadge score={score} label="Total" />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {c.website && (
                  <a href={c.website.startsWith("http") ? c.website : `https://${c.website}`} target="_blank" rel="noreferrer" className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-indigo-600">
                    <ExternalLink size={16} />
                  </a>
                )}
                <button onClick={() => setShowScorecard(c)} className="p-2 rounded-lg text-indigo-500 hover:bg-indigo-50 hover:text-indigo-700" title="Score Lead"><Target size={16} /></button>
                <button onClick={() => { deleteCompany(c.id); closeCompanyDrilldown(); }} className="p-2 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600"><Trash2 size={16} /></button>
              </div>
            </div>

            {/* Stage selector */}
            <div className="mt-4">
              <div className="flex flex-wrap gap-1">
                {FUNNEL_STAGES.map(s => (
                  <button key={s} onClick={() => { updateCompanyStage(c.id, s); setDrilldownCompany(prev => ({ ...prev, stage: s })); }} className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${c.stage === s ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{s}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex gap-1 bg-white rounded-xl border border-gray-100 shadow-sm p-1">
          {DRILLDOWN_TABS.map(tab => (
            <button key={tab.id} onClick={() => setDrilldownTab(tab.id)} className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${drilldownTab === tab.id ? "bg-indigo-600 text-white" : "text-gray-500 hover:bg-gray-50"}`}>
              {tab.label}
              {tab.id === "todos" && pendingTodos.length > 0 && (
                <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${drilldownTab === "todos" ? "bg-indigo-500 text-white" : "bg-gray-200 text-gray-600"}`}>{pendingTodos.length}</span>
              )}
              {tab.id === "roadmap" && drilldownMilestones.length > 0 && (
                <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${drilldownTab === "roadmap" ? "bg-indigo-500 text-white" : "bg-gray-200 text-gray-600"}`}>{drilldownMilestones.filter(m => m.status !== "done").length}</span>
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {drilldownTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Company info */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-900">Company Details</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-gray-50 rounded-lg p-3"><span className="text-xs text-gray-500 block">Industry</span><span className="font-medium text-gray-900">{c.industry || "—"}</span></div>
                <div className="bg-gray-50 rounded-lg p-3"><span className="text-xs text-gray-500 block">Size</span><span className="font-medium text-gray-900">{c.size || "—"}</span></div>
                <div className="bg-gray-50 rounded-lg p-3"><span className="text-xs text-gray-500 block">Revenue</span><span className="font-medium text-gray-900">{c.revenue || "—"}</span></div>
                <div className="bg-gray-50 rounded-lg p-3"><span className="text-xs text-gray-500 block">Location</span><span className="font-medium text-gray-900">{c.location || "—"}</span></div>
                <div className="bg-gray-50 rounded-lg p-3"><span className="text-xs text-gray-500 block">Funding</span><span className="font-medium text-gray-900">{c.fundingStage || "—"}</span></div>
                <div className="bg-gray-50 rounded-lg p-3"><span className="text-xs text-gray-500 block">Source</span><span className="font-medium text-gray-900">{c.source}</span></div>
              </div>
            </div>

            {/* Personal / Relationship Notes */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900">Quick Notes</h3>
                {editingPersonalNotes ? (
                  <div className="flex items-center gap-2">
                    <button onClick={() => { setPersonalNotesText(c.personalNotes || ""); setEditingPersonalNotes(false); }} className="text-xs text-gray-500 hover:text-gray-700">Cancel</button>
                    <button onClick={savePersonalNotes} className="flex items-center gap-1 text-xs text-indigo-600 font-medium hover:text-indigo-700"><Save size={12} /> Save</button>
                  </div>
                ) : (
                  <button onClick={() => setEditingPersonalNotes(true)} className="flex items-center gap-1 text-xs text-indigo-600 font-medium hover:text-indigo-700"><Edit3 size={12} /> Edit</button>
                )}
              </div>
              {editingPersonalNotes ? (
                <textarea value={personalNotesText} onChange={e => setPersonalNotesText(e.target.value)} rows={3} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y" placeholder="Jets fan, lives in Jersey, prefers email..." />
              ) : (
                <div className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3 min-h-[48px] whitespace-pre-wrap">
                  {c.personalNotes || <span className="text-gray-400 italic">Add personal details, preferences, conversation starters...</span>}
                </div>
              )}
            </div>

            {/* Contacts */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900">Contacts ({cContacts.length})</h3>
                <button onClick={() => { setNewContact(prev => ({ ...prev, companyId: c.id })); setShowAddContact(true); }} className="text-xs text-indigo-600 font-medium hover:text-indigo-700">+ Add</button>
              </div>
              {cContacts.length === 0 ? (
                <p className="text-sm text-gray-400 italic">No contacts yet</p>
              ) : (
                <div className="space-y-2">
                  {cContacts.map(ct => (
                    <div key={ct.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100" onClick={() => openContactSidebar(ct)}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center text-xs font-bold text-indigo-700">{ct.name.split(" ").map(n => n[0]).join("")}</div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {ct.name}
                            {ct.decisionMaker && <Badge className="bg-amber-100 text-amber-700 ml-1">DM</Badge>}
                          </p>
                          <p className="text-xs text-gray-500">{ct.title}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        {ct.email && <a href={`mailto:${ct.email}`} onClick={e => e.stopPropagation()} className="hover:text-indigo-500"><Mail size={14} /></a>}
                        {ct.phone && <a href={`tel:${ct.phone}`} onClick={e => e.stopPropagation()} className="hover:text-indigo-500"><Phone size={14} /></a>}
                        {ct.linkedin && <a href={ct.linkedin.startsWith("http") ? ct.linkedin : `https://${ct.linkedin}`} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="hover:text-indigo-500"><Link2 size={14} /></a>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick to-do preview */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900">To-Do ({pendingTodos.length})</h3>
                <button onClick={() => setDrilldownTab("todos")} className="text-xs text-indigo-600 font-medium hover:text-indigo-700">View all</button>
              </div>
              {pendingTodos.length === 0 ? (
                <p className="text-sm text-gray-400 italic">No pending tasks</p>
              ) : (
                <div className="space-y-1.5">
                  {pendingTodos.slice(0, 3).map(t => (
                    <div key={t.id} className="flex items-center gap-2 text-sm text-gray-700">
                      <button onClick={() => toggleTodo(t)} className="text-gray-300 hover:text-green-500"><Circle size={16} /></button>
                      <span>{t.text}</span>
                    </div>
                  ))}
                  {pendingTodos.length > 3 && <p className="text-xs text-gray-400">+{pendingTodos.length - 3} more</p>}
                </div>
              )}
            </div>

            {/* Engagement timeline preview */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-3">
              <h3 className="text-sm font-semibold text-gray-900">Recent Activity</h3>
              {drilldownEngagements.length === 0 ? (
                <p className="text-sm text-gray-400 italic">No engagements yet</p>
              ) : (
                <div className="space-y-2">
                  {drilldownEngagements.slice(0, 4).map(eng => (
                    <div key={eng.id} className="flex items-start gap-2 text-sm">
                      <div className="mt-0.5">
                        {eng.type === "email" && <Mail size={13} className="text-blue-500" />}
                        {eng.type === "call" && <PhoneCall size={13} className="text-green-500" />}
                        {eng.type === "meeting" && <Calendar size={13} className="text-purple-500" />}
                        {eng.type === "note" && <MessageSquare size={13} className="text-gray-400" />}
                        {eng.type === "linkedin" && <Link2 size={13} className="text-blue-600" />}
                        {!["email","call","meeting","note","linkedin"].includes(eng.type) && <Activity size={13} className="text-gray-400" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-700 truncate">{eng.notes}</p>
                        <p className="text-[11px] text-gray-400">{new Date(eng.createdAt).toLocaleDateString()} — {eng.contact?.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {drilldownTab === "todos" && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">To-Do List</h3>
            {/* Add new todo */}
            <div className="flex gap-2">
              <input type="text" value={newTodoText} onChange={e => setNewTodoText(e.target.value)} placeholder="Add a task..." className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" onKeyDown={e => e.key === "Enter" && addTodo()} />
              <button onClick={addTodo} disabled={!newTodoText.trim()} className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-40"><Plus size={16} /></button>
            </div>

            {/* Pending */}
            {pendingTodos.length > 0 && (
              <div className="space-y-1">
                {pendingTodos.map(t => (
                  <div key={t.id} className="flex items-center justify-between group px-3 py-2 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <button onClick={() => toggleTodo(t)} className="text-gray-300 hover:text-green-500 transition-colors"><Circle size={18} /></button>
                      <span className="text-sm text-gray-800">{t.text}</span>
                    </div>
                    <button onClick={() => deleteTodo(t.id)} className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={14} /></button>
                  </div>
                ))}
              </div>
            )}

            {/* Done */}
            {doneTodos.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-400 uppercase mt-4 mb-1">Completed ({doneTodos.length})</p>
                {doneTodos.map(t => (
                  <div key={t.id} className="flex items-center justify-between group px-3 py-2 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <button onClick={() => toggleTodo(t)} className="text-green-500 hover:text-gray-400 transition-colors"><CheckCircle2 size={18} /></button>
                      <span className="text-sm text-gray-400 line-through">{t.text}</span>
                    </div>
                    <button onClick={() => deleteTodo(t.id)} className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={14} /></button>
                  </div>
                ))}
              </div>
            )}

            {pendingTodos.length === 0 && doneTodos.length === 0 && (
              <p className="text-sm text-gray-400 italic text-center py-6">No tasks yet. Add one above to get started.</p>
            )}
          </div>
        )}

        {drilldownTab === "notes" && (
          <div className="space-y-6">
            {/* General notes */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900">General Notes</h3>
                {editingNotes ? (
                  <div className="flex items-center gap-2">
                    <button onClick={() => { setNotesText(c.notes || ""); setEditingNotes(false); }} className="text-xs text-gray-500 hover:text-gray-700">Cancel</button>
                    <button onClick={saveCompanyNotes} className="flex items-center gap-1 text-xs text-indigo-600 font-medium hover:text-indigo-700"><Save size={12} /> Save</button>
                  </div>
                ) : (
                  <button onClick={() => setEditingNotes(true)} className="flex items-center gap-1 text-xs text-indigo-600 font-medium hover:text-indigo-700"><Edit3 size={12} /> Edit</button>
                )}
              </div>
              {editingNotes ? (
                <textarea value={notesText} onChange={e => setNotesText(e.target.value)} rows={8} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y" placeholder="Add general notes about this company..." />
              ) : (
                <div className="text-sm text-gray-700 bg-gray-50 rounded-lg p-4 min-h-[80px] whitespace-pre-wrap">
                  {c.notes || <span className="text-gray-400 italic">No notes yet. Click Edit to add some.</span>}
                </div>
              )}
            </div>

            {/* Engagement timeline */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-900">Engagement Timeline ({drilldownEngagements.length})</h3>
              {drilldownEngagements.length === 0 ? (
                <p className="text-sm text-gray-400 italic">No engagements yet. Add one from a contact's sidebar.</p>
              ) : (
                <div className="space-y-3">
                  {drilldownEngagements.map(eng => (
                    <div key={eng.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="mt-0.5">
                        {eng.type === "email" && <Mail size={14} className="text-blue-500" />}
                        {eng.type === "call" && <PhoneCall size={14} className="text-green-500" />}
                        {eng.type === "meeting" && <Calendar size={14} className="text-purple-500" />}
                        {eng.type === "note" && <MessageSquare size={14} className="text-gray-400" />}
                        {eng.type === "linkedin" && <Link2 size={14} className="text-blue-600" />}
                        {!["email","call","meeting","note","linkedin"].includes(eng.type) && <Activity size={14} className="text-gray-400" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-800">{eng.notes}</p>
                        <p className="text-[11px] text-gray-400 mt-1">{new Date(eng.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" })} — {eng.contact?.name} — <span className="capitalize">{eng.type}</span></p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {drilldownTab === "roadmap" && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Engagement Roadmap</h3>
            {/* Add new milestone */}
            <div className="flex gap-2">
              <input type="text" value={newMilestoneTitle} onChange={e => setNewMilestoneTitle(e.target.value)} placeholder="Add a milestone..." className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" onKeyDown={e => e.key === "Enter" && addMilestone()} />
              <button onClick={addMilestone} disabled={!newMilestoneTitle.trim()} className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-40"><Plus size={16} /></button>
            </div>

            {drilldownMilestones.length === 0 ? (
              <p className="text-sm text-gray-400 italic text-center py-6">No milestones yet. Add one above to start mapping out the engagement.</p>
            ) : (
              <div className="space-y-2">
                {drilldownMilestones.map((ms, idx) => {
                  const statusInfo = MILESTONE_STATUS[ms.status] || MILESTONE_STATUS["planned"];
                  const StatusIcon = statusInfo.icon;
                  return (
                    <div key={ms.id} className="flex items-center gap-3 group">
                      {/* Timeline connector */}
                      <div className="flex flex-col items-center">
                        <button onClick={() => cycleMilestoneStatus(ms)} className={`w-8 h-8 rounded-full flex items-center justify-center ${statusInfo.color} hover:ring-2 hover:ring-indigo-300 transition-all`} title={`Status: ${statusInfo.label} (click to cycle)`}>
                          <StatusIcon size={16} className={ms.status === "in-progress" ? "animate-spin" : ""} />
                        </button>
                        {idx < drilldownMilestones.length - 1 && <div className="w-0.5 h-6 bg-gray-200 mt-1" />}
                      </div>
                      <div className="flex-1 flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className={`text-sm font-medium ${ms.status === "done" ? "text-gray-400 line-through" : "text-gray-800"}`}>{ms.title}</p>
                          <p className="text-[11px] text-gray-400">{statusInfo.label}</p>
                        </div>
                        <button onClick={() => deleteMilestone(ms.id)} className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={14} /></button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const NAV = [
    { id: "dashboard", icon: BarChart3, label: "Dashboard" },
    { id: "pipeline", icon: Columns, label: "Pipeline" },
    { id: "companies", icon: Building2, label: "Companies" },
    { id: "contacts", icon: Users, label: "Contacts" },
    { id: "scraper", icon: Globe, label: "Scraper" },
    { id: "reports", icon: FileText, label: "Reports" },
    { id: "signals", icon: Target, label: "ICP & Signals" },
  ];

  const pages = {
    dashboard: renderDashboard,
    pipeline: renderPipelineBoard,
    companies: renderCompanies,
    contacts: renderContacts,
    scraper: renderScraper,
    reports: renderReports,
    signals: renderSignals,
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 size={32} className="animate-spin text-indigo-600 mx-auto mb-3" />
          <p className="text-sm text-gray-500">Loading MarCRM...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <div className="w-56 bg-white border-r border-gray-100 flex flex-col flex-shrink-0">
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center"><Zap size={16} className="text-white" /></div>
            <div>
              <h1 className="text-sm font-bold text-gray-900">MarCRM</h1>
              <p className="text-[10px] text-gray-400">6-Pipeline Agency CRM</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          {NAV.map(n => (
            <button key={n.id} onClick={() => setPage(n.id)} className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${page === n.id ? "bg-indigo-50 text-indigo-700" : "text-gray-600 hover:bg-gray-50"}`}>
              <n.icon size={18} className={page === n.id ? "text-indigo-600" : "text-gray-400"} />
              {n.label}
            </button>
          ))}
        </nav>

        {/* Pipeline quick filters */}
        <div className="px-3 pb-2">
          <p className="text-[10px] font-semibold text-gray-400 uppercase px-3 mb-1">Pipelines</p>
          {PIPELINES.map(p => {
            const count = companies.filter(c => c.pipeline === p.id).length;
            const iconColorMap = { indigo: "text-indigo-500", emerald: "text-emerald-500", sky: "text-sky-500", amber: "text-amber-500", rose: "text-rose-500", violet: "text-violet-500", slate: "text-slate-500", teal: "text-teal-500" };
            return (
              <button key={p.id} onClick={() => { setPipelineFilter(p.id); setPage("companies"); }} className="w-full flex items-center justify-between px-3 py-1.5 rounded-md text-xs text-gray-600 hover:bg-gray-50">
                <span className="flex items-center gap-1.5">
                  <p.icon size={13} className={iconColorMap[p.color]} />
                  {p.short}
                </span>
                <span className="text-[10px] text-gray-400">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="p-3 border-t border-gray-100">
          <div className="bg-gradient-to-r from-indigo-500 to-violet-500 rounded-xl p-3 text-white">
            <p className="text-[10px] font-semibold opacity-80">TOTAL PIPELINE</p>
            <p className="text-lg font-bold">{companies.length} leads</p>
            <p className="text-[10px] opacity-70">{companies.filter(c => totalScore(c) >= 80).length} Priority A &middot; {companies.filter(c => c.stage === "Won").length} Won</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className={`mx-auto p-6 ${page === "pipeline" || drilldownCompany || drilldownContact ? "max-w-full" : "max-w-5xl"}`}>
          {drilldownCompany ? renderCompanyDrilldown() : drilldownContact ? renderContactDrilldown() : pages[page]?.()}
        </div>
      </div>

      {/* Contact Detail Sidebar */}
      {renderContactSidebar()}
    </div>
  );
}