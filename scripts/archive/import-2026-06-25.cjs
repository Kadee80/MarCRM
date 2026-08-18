/**
 * MarCRM Import Script — 2026-06-25
 * Daily scrape: 5 new leads (4 pr-marketing, 1 legal-freelance)
 *
 * Run from project root:
 *   node scripts/import-2026-06-25.cjs
 *
 * Requires: DATABASE_URL in environment (Neon connection string)
 * Deduplicates by company name (case-insensitive); skips existing.
 */

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const leads = [
  {
    name: 'Taktile',
    website: 'taktile.com',
    pipeline: 'pr-marketing',
    industry: 'Fintech / Enterprise AI / Agentic Decisioning for Banks & Insurers',
    location: 'New York, NY / Berlin, Germany',
    funding_stage: 'Series C ($110M, June 24 2026; ~$184M total)',
    fit_score: 44,
    intent_score: 38,
    grade: 'A',
    fit_details: JSON.stringify({
      industry_match_fs_fintech: 10,
      stage_size_series_c_scaling: 7,
      b2b_buyer_clear_sales_motion: 10,
      proof_assets_monzo_mercury_pleo_insurer_90M_savings: 10,
      budget_well_funded_184M_total: 7,
      total: 44,
    }),
    intent_details: JSON.stringify({
      trigger_110M_series_c_goldman_led_global_expansion: 15,
      timeline_immediate_post_raise: 8,
      decision_maker_founder_led_public: 5,
      urgency_competitive_ai_finance_category_narrative: 7,
      responsiveness_fortune_pymnts_businesswire_coverage: 3,
      total: 38,
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
      '$110M Series C announced June 24 2026, led by Goldman Sachs Alternatives; Tiger Global, Index Ventures, Y Combinator participating',
      'Brings total funding to $184M',
      'Agentic Decision Platform turns frontier AI models into agents for underwriting, claims, fraud, customer approval',
      'Customers include Monzo, Mercury, Pleo; one of the world\'s largest insurers projects $90M+ claims-processing savings',
      'Funds earmarked for global expansion and platform enhancement',
    ]),
    contacts: JSON.stringify([
      { name: 'Maik Taro Wehmeyer', title: 'Co-Founder & CEO', email: '', linkedin: '' },
      { name: 'Maximilian Eber', title: 'Co-Founder & CTO', email: '', linkedin: '' },
    ]),
    source: 'TechStartups Funding Roundup June 24 2026 / Fortune / Businesswire',
    source_url: 'https://techstartups.com/2026/06/24/venture-capital-startup-funding-roundup-june-24-2026/',
    notes: 'Strongest FS-fit of the batch. AI-for-high-stakes-finance positioning + just-closed Goldman round = real earned-media moment. May already retain comms (Series C); lead with advisory/retainer angle on the agentic-finance narrative. Founders public.',
    scrape_date: '2026-06-25',
  },
  {
    name: 'Runlayer',
    website: 'runlayer.com',
    pipeline: 'pr-marketing',
    industry: 'Enterprise AI / AI-Agent Governance & Control Layer (MCP)',
    location: 'United States',
    funding_stage: 'Series A ($30M, June 24 2026; ~$42M total)',
    fit_score: 44,
    intent_score: 38,
    grade: 'A',
    fit_details: JSON.stringify({
      industry_match_tech_enterprise_ai: 8,
      stage_size_series_a_growth_ideal: 10,
      b2b_buyer_clear_sales_motion: 10,
      proof_assets_instacart_gusto_lemonade_fortune500: 9,
      budget_series_a_30M: 7,
      total: 44,
    }),
    intent_details: JSON.stringify({
      trigger_30M_series_a_felicis_khosla: 15,
      timeline_immediate_post_raise: 7,
      decision_maker_founder_unknown: 5,
      urgency_hot_ai_governance_category_thought_leadership: 7,
      responsiveness_press_coverage: 4,
      total: 38,
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
      '$30M Series A announced June 24 2026, led by Felicis and Khosla Ventures; total funding ~$42M',
      'Control layer governing how employees and AI agents connect to tools, data and policies (visibility, data access, cost)',
      'Customers include Instacart, Gusto, Decagon, Opendoor, dbt Labs, AngelList, Lemonade and Fortune 500 firms',
      'Riding the AI-agent governance / MCP-security wave — strong thought-leadership runway',
    ]),
    contacts: JSON.stringify([]),
    source: 'TechStartups Funding Roundup June 24 2026 / TAMradar',
    source_url: 'https://www.tamradar.com/funding-rounds/runlayer-series-a-30m',
    notes: 'Ideal agency-size Series A with exceptional enterprise logos and a category (AI-agent governance) that rewards thought leadership. Strong fit for a 90-day comms/earned-media sprint. Find marketing/founder decision-maker.',
    scrape_date: '2026-06-25',
  },
  {
    name: 'JustAI',
    website: 'justai.com',
    pipeline: 'pr-marketing',
    industry: 'MarTech / AI-Native Marketing Personalization Platform',
    location: 'United States',
    funding_stage: 'Series A ($17M, June 24 2026)',
    fit_score: 42,
    intent_score: 36,
    grade: 'B',
    fit_details: JSON.stringify({
      industry_match_tech_martech: 8,
      stage_size_series_a_growth_ideal: 10,
      b2b_buyer_clear_sales_motion: 10,
      proof_assets_yc_credible_angels_600_decisions_mo: 8,
      budget_series_a_17M: 6,
      total: 42,
    }),
    intent_details: JSON.stringify({
      trigger_17M_series_a_base10: 15,
      timeline_immediate_post_raise: 7,
      decision_maker_founder_named: 5,
      urgency_competitive_martech_category: 6,
      responsiveness_press_coverage: 3,
      total: 36,
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
      '$17M+ Series A announced June 24 2026, led by Base10; Y Combinator, Peak XV Partners and strategic angels (HubSpot CTO, growth leaders from Anthropic & Chime, founders of Eppo and Vapi)',
      'AI-native marketing platform automating personalization via reinforcement-learning and agentic decisioning',
      '600+ marketing decisions delegated to AI monthly',
      'Founders Neha Mittal and Jeff Hara',
    ]),
    contacts: JSON.stringify([
      { name: 'Neha Mittal', title: 'Co-Founder & CEO', email: '', linkedin: '' },
      { name: 'Jeff Hara', title: 'Co-Founder', email: '', linkedin: '' },
    ]),
    source: 'TechStartups Funding Roundup June 24 2026 / VentureCapital.com',
    source_url: 'https://venturecapital.com/news/funding-events/justai-raises-17m-in-series-a-funding-to-scale-ainative-marketing-platform-v1',
    notes: 'Meta but valid — an AI marketing platform that itself needs a launch/raise narrative. Strong angel roster gives instant credibility. Ideal agency-size Series A. Pitch product-launch + category-creation comms.',
    scrape_date: '2026-06-25',
  },
  {
    name: 'Trace Finance',
    website: 'tracefinance.com',
    pipeline: 'pr-marketing',
    industry: 'Fintech / Stablecoin Banking & Cross-Border Payments Infrastructure',
    location: 'New York, NY',
    funding_stage: 'Series A ($32M, June 17 2026)',
    fit_score: 45,
    intent_score: 32,
    grade: 'B',
    fit_details: JSON.stringify({
      industry_match_fs_fintech: 10,
      stage_size_series_a_growth: 9,
      b2b_buyer_clear_sales_motion: 10,
      proof_assets_10B_volume_top_crypto_vcs: 9,
      budget_series_a_32M: 7,
      total: 45,
    }),
    intent_details: JSON.stringify({
      trigger_32M_series_a_but_8_days_old: 12,
      timeline_post_raise_window_aging: 6,
      decision_maker_founder_unknown: 5,
      urgency_competitive_stablecoin_infra: 6,
      responsiveness_businesswire_coverage: 3,
      total: 32,
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
      '$32M Series A (June 17 2026), led by CoinFund; Coinbase Ventures, Haun Ventures, Jump Crypto, Valor Capital, Paxos, HOF Capital participating',
      'Regulated banking + stablecoin settlement infra for cross-border payments; >$10B institutional cross-border volume processed',
      'Brazil proving ground, now expanding across LatAm, U.S. and APAC',
      'Selling compliance-heavy regulated settlement, not tokens',
    ]),
    contacts: JSON.stringify([]),
    source: 'TechStartups Funding Roundup June 17 2026 / Businesswire',
    source_url: 'https://techstartups.com/2026/06/17/venture-capital-startup-funding-roundup-june-17-2026/',
    notes: 'Strong FS fit but raise is ~8 days old (intent timing decayed — scored down). Still un-captured and worth surfacing: regulated stablecoin rails is a hot, credibility-sensitive narrative. Move quickly before the funding window closes.',
    scrape_date: '2026-06-25',
  },
  {
    name: 'Legalpeople',
    website: 'legalpeople.com',
    pipeline: 'legal-freelance',
    industry: 'Legal Staffing / ALSP — Interim & Contract Counsel Placement',
    location: 'Remote (US)',
    funding_stage: '',
    fit_score: 20,
    intent_score: 43,
    grade: 'B',
    fit_details: JSON.stringify({
      fund_private_funds_formation: 0,
      corporate_commercial_securities_ma: 10,
      seniority_interim_counsel_match: 10,
      comp_stated_market_credible: 0,
      total: 20,
    }),
    intent_details: JSON.stringify({
      engagement_model_interim_contract: 15,
      remote_or_hybrid_flex: 15,
      posted_within_72h_recent_listing: 5,
      easy_apply_direct_staffing_path: 8,
      total: 43,
    }),
    vertical: 'legal',
    subvertical: 'securities',
    engagement_model: 'interim',
    buyer_type: 'staffing',
    compensation_text: '',
    remote_flag: 'remote',
    employment_type_raw: 'Interim Corporate Securities Attorney (Remote) — contract placement via legal staffing firm',
    urgency_score: 60,
    signals: JSON.stringify([
      'Legalpeople (legal staffing/ALSP) hiring Interim Corporate Securities Attorney for a leading tech company, fully remote',
      'Engagement model: interim/contract placement; corporate & securities practice area',
      'Surfaced via Google-indexed LinkedIn result (not scraped directly)',
    ]),
    contacts: JSON.stringify([]),
    source: 'LinkedIn (via Google-indexed results) / Legalpeople',
    source_url: 'https://www.linkedin.com/jobs/view/interim-corporate-securities-attorney-leading-tech-company-remote-at-legalpeople-4298959513',
    notes: 'Low fit (corporate/securities, not funds-focused) but high intent — interim + remote + direct staffing path. Good fractional/interim fit for Mark. Distinguish employment type (contract placement) from commercial model (interim/fractional).',
    scrape_date: '2026-06-25',
  },
];

async function importLeads() {
  const client = await pool.connect();
  let imported = 0;
  let skipped = 0;
  try {
    await client.query('BEGIN');
    for (const lead of leads) {
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
