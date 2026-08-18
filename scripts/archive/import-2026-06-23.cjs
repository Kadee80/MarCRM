/**
 * MarCRM Import Script — 2026-06-23
 * Daily scrape: 4 new leads (pr-marketing)
 *
 * Run from project root:
 *   node scripts/import-2026-06-23.cjs
 *
 * Requires: DATABASE_URL in environment (Neon connection string)
 */

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const leads = [
  {
    name: 'Chronograph',
    website: 'chronograph.pe',
    pipeline: 'pr-marketing',
    industry: 'Fintech / Private Capital Software',
    location: 'New York, NY',
    funding_stage: 'Growth ($140M+ Sixth Street Growth, June 16 2026; $160M total)',
    fit_score: 45,
    intent_score: 48,
    grade: 'A',
    fit_details: JSON.stringify({
      industry_fintech_pe_software: 10,
      stage_enterprise_growth: 7,
      b2b_institutional_pe_lp_buyers: 10,
      proof_5_9T_monitored_8_of_10_largest_GPs: 10,
      budget_140M_PE_backed: 8,
      total: 45,
    }),
    intent_details: JSON.stringify({
      trigger_140M_round_plus_new_platform_launch_simultaneously: 15,
      timeline_immediate_post_announcement: 10,
      decision_maker_ceo_charlie_tafoya_named_public: 9,
      urgency_private_credit_narrative_race: 10,
      responsiveness_prnewswire_used: 4,
      total: 48,
    }),
    vertical: '',
    subvertical: '',
    engagement_model: '',
    buyer_type: '',
    compensation_text: '',
    remote_flag: '',
    employment_type_raw: '',
    urgency_score: 0,
    signals: JSON.stringify([
      '$140M+ growth equity from Sixth Street Growth announced June 16 2026',
      'Simultaneously launched new Private Credit Platform',
      'Trusted by 8/10 largest private capital GPs, 5/10 largest LPs',
      'Monitors $5.9T in client invested capital, 15,000 funds, 258,000 portfolio companies',
      'No dedicated PR agency visible; PRNewswire used for announcement',
    ]),
    contacts: JSON.stringify([
      { name: 'Charlie Tafoya', title: 'Co-Founder & CEO', email: '', linkedin: '' },
    ]),
    source: 'PRNewswire / Crunchbase / Fintech Global',
    source_url: 'https://www.prnewswire.com/news-releases/chronograph-announces-140m-growth-equity-investment-from-sixth-street-growth-launches-private-credit-platform-302800776.html',
    notes: 'Double trigger: $140M PE growth round + Private Credit Platform launched simultaneously. Private credit is fastest-growing private markets category. No PR agency visible. Pitch: own the private credit narrative before competitors do.',
    scrape_date: '2026-06-23',
  },
  {
    name: 'Ent.AI',
    website: 'ent.ai',
    pipeline: 'pr-marketing',
    industry: 'AI / Cybersecurity / Workspace Security',
    location: 'Santa Clara, CA',
    funding_stage: 'Seed ($100M, emerged from stealth June 13-18 2026)',
    fit_score: 43,
    intent_score: 46,
    grade: 'A',
    fit_details: JSON.stringify({
      industry_ai_cybersecurity: 9,
      stage_seed_enterprise_growing: 7,
      b2b_enterprise_security_buyers: 10,
      proof_ex_riskiq_ex_msft_security_copilot_tier1_investors: 9,
      budget_100M_seed: 8,
      total: 43,
    }),
    intent_details: JSON.stringify({
      trigger_emerged_from_stealth_100M_seed: 15,
      timeline_immediate_first_market_moment: 10,
      decision_maker_founders_accessible_post_launch: 8,
      urgency_no_prior_pr_window_closing: 9,
      responsiveness_reactive_coverage_only: 4,
      total: 46,
    }),
    vertical: '',
    subvertical: '',
    engagement_model: '',
    buyer_type: '',
    compensation_text: '',
    remote_flag: '',
    employment_type_raw: '',
    urgency_score: 0,
    signals: JSON.stringify([
      '$100M seed raised, emerged from stealth June 13-18 2026',
      'Led by Decibel Partners; Craft Ventures, Crosspoint, Felicis, IQT, Sequoia, Shield Capital also in',
      'Founded by former RiskIQ executives and Microsoft Security Copilot team members',
      'AI-powered workspace security: analyzes user + AI-agent behavior in real time',
      'Launched same week as NewCore — direct narrative competitor',
      'No dedicated PR presence at launch; reactive coverage only',
    ]),
    contacts: JSON.stringify([
      { name: '', title: 'Founder (ex-RiskIQ — confirm via Crunchbase/LinkedIn)', email: '', linkedin: '' },
    ]),
    source: 'Crunchbase News (week of June 13-18 2026)',
    source_url: 'https://news.crunchbase.com/venture/biggest-funding-rounds-cybersecurity-defense-startup-ai-odyssey-leads/',
    notes: 'NewCore launched same week with $66M on identical AI-agent security narrative. Ent.AI has $100M + stronger MSFT pedigree but zero PR program. Identify founders via Crunchbase before outreach.',
    scrape_date: '2026-06-23',
  },
  {
    name: 'Bland AI',
    website: 'bland.ai',
    pipeline: 'pr-marketing',
    industry: 'AI / Enterprise Voice Agents / Call Center Automation',
    location: 'San Francisco, CA',
    funding_stage: 'Series C ($50M, June 2026; $106M total raised)',
    fit_score: 42,
    intent_score: 41,
    grade: 'A',
    fit_details: JSON.stringify({
      industry_ai_enterprise_saas: 9,
      stage_series_c_growth: 8,
      b2b_enterprise_call_center_buyers: 10,
      proof_yc_max_levchin_enterprise_traction: 8,
      budget_50M_raise_106M_total: 7,
      total: 42,
    }),
    intent_details: JSON.stringify({
      trigger_series_c_raise_plus_ai_call_center_wave: 15,
      timeline_scaling_post_c_immediate: 8,
      decision_maker_sf_founders_growth_mode: 7,
      urgency_crowded_space_vapi_elevenlabs_retell: 8,
      responsiveness_multiple_outlets_covered: 3,
      total: 41,
    }),
    vertical: '',
    subvertical: '',
    engagement_model: '',
    buyer_type: '',
    compensation_text: '',
    remote_flag: '',
    employment_type_raw: '',
    urgency_score: 0,
    signals: JSON.stringify([
      '$50M Series C raised, led by Dell Technologies Capital',
      'Investors: YC, Scale Venture Partners, Max Levchin (Affirm), Archerman Capital, Tribeca Venture Partners',
      '$106M total raised to date',
      'AI voice agents automate inbound/outbound enterprise phone conversations',
      'Competing with Vapi, ElevenLabs Conversational AI, Retell AI — narrative race underway',
    ]),
    contacts: JSON.stringify([
      { name: '', title: 'Founder/CEO (confirm via Crunchbase/LinkedIn)', email: '', linkedin: '' },
    ]),
    source: 'Crunchbase News (week of June 13-18 2026)',
    source_url: 'https://news.crunchbase.com/venture/biggest-funding-rounds-cybersecurity-defense-startup-ai-odyssey-leads/',
    notes: 'Series C in competitive space = positioning-critical moment. First company to own the AI voice agents category narrative wins. YC + Levchin credibility is the proof point to lead with.',
    scrape_date: '2026-06-23',
  },
  {
    name: 'Interchecks',
    website: 'interchecks.com',
    pipeline: 'pr-marketing',
    industry: 'Fintech / Payments Infrastructure',
    location: 'Brooklyn, NY',
    funding_stage: 'Series C ($50M, June 2026; ~$79M total raised)',
    fit_score: 39,
    intent_score: 35,
    grade: 'B',
    fit_details: JSON.stringify({
      industry_fintech_payments_b2b: 9,
      stage_series_c: 7,
      b2b_payments_infrastructure_buyers: 10,
      proof_api_payment_volume_traction: 7,
      budget_50M_raise: 6,
      total: 39,
    }),
    intent_details: JSON.stringify({
      trigger_series_c_payments_expansion: 12,
      timeline_scaling_post_raise: 7,
      decision_maker_brooklyn_founders: 6,
      urgency_differentiation_in_crowded_fintech_payments: 7,
      responsiveness_crunchbase_covered: 3,
      total: 35,
    }),
    vertical: '',
    subvertical: '',
    engagement_model: '',
    buyer_type: '',
    compensation_text: '',
    remote_flag: '',
    employment_type_raw: '',
    urgency_score: 0,
    signals: JSON.stringify([
      '$50M Series C raised; Bettor Capital, Commerce Ventures, Decades Holdings, Thayer Street Partners',
      '~$79M total raised to date',
      'Single API for business deposits and payouts',
      'B2B payments infrastructure'
    ]),
    contacts: JSON.stringify([
      { name: '', title: 'Founder/CEO (confirm via Crunchbase)', email: '', linkedin: '' },
    ]),
    source: 'Crunchbase News (week of June 13-18 2026)',
    source_url: 'https://news.crunchbase.com/venture/biggest-funding-rounds-cybersecurity-defense-startup-ai-odyssey-leads/',
    notes: 'Lowest scorer of this batch (74 combined). Deprioritize relative to Chronograph, Ent.AI, Bland AI. Research founders before outreach.',
    scrape_date: '2026-06-23',
  },
];

async function importLeads() {
  const client = await pool.connect();
  let imported = 0;
  let skipped = 0;

  try {
    await client.query('BEGIN');

    for (const lead of leads) {
      // Check for existing company by name (case-insensitive)
      const existing = await client.query(
        'SELECT id FROM companies WHERE LOWER(name) = LOWER($1) LIMIT 1',
        [lead.name]
      );

      if (existing.rows.length > 0) {
        console.log(`SKIP (exists): ${lead.name}`);
        skipped++;
        continue;
      }

      await client.query(
        `INSERT INTO companies (
          name, website, pipeline, industry, location, funding_stage,
          fit_score, intent_score, grade, fit_details, intent_details,
          vertical, subvertical, engagement_model, buyer_type,
          compensation_text, remote_flag, employment_type_raw, urgency_score,
          signals, contacts, source, source_url, notes, scrape_date,
          created_at, updated_at
        ) VALUES (
          $1, $2, $3, $4, $5, $6,
          $7, $8, $9, $10, $11,
          $12, $13, $14, $15,
          $16, $17, $18, $19,
          $20, $21, $22, $23, $24, $25,
          NOW(), NOW()
        )`,
        [
          lead.name,
          lead.website,
          lead.pipeline,
          lead.industry,
          lead.location,
          lead.funding_stage,
          lead.fit_score,
          lead.intent_score,
          lead.grade,
          lead.fit_details,
          lead.intent_details,
          lead.vertical,
          lead.subvertical,
          lead.engagement_model,
          lead.buyer_type,
          lead.compensation_text,
          lead.remote_flag,
          lead.employment_type_raw,
          lead.urgency_score,
          lead.signals,
          lead.contacts,
          lead.source,
          lead.source_url,
          lead.notes,
          lead.scrape_date,
        ]
      );

      console.log(`IMPORTED: ${lead.name} → ${lead.pipeline} (${lead.grade}, ${lead.fit_score + lead.intent_score})`);
      imported++;
    }

    await client.query('COMMIT');
    console.log(`\nDone. Imported: ${imported}, Skipped: ${skipped}`);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Import failed, rolled back:', err.message);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

importLeads().catch((err) => {
  console.error(err);
  process.exit(1);
});
