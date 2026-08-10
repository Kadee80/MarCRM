/**
 * MarCRM Import Script — 2026-06-24
 * Daily scrape: 3 new leads (pr-marketing)
 *
 * Run from project root:
 *   node scripts/import-2026-06-24.cjs
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
    name: 'Allium',
    website: 'allium.so',
    pipeline: 'pr-marketing',
    industry: 'Fintech / Blockchain Data Infrastructure / Financial Data',
    location: 'New York, NY',
    funding_stage: 'Series B ($40M, June 23 2026; ~$61.5M total)',
    fit_score: 47,
    intent_score: 44,
    grade: 'A',
    fit_details: JSON.stringify({
      industry_match_fs_institutional_finance_data: 10,
      stage_size_series_b_growth: 9,
      b2b_buyer_sales_motion_institutional: 10,
      proof_assets_visa_stripe_coinbase_grayscale_fed: 10,
      budget_40M_series_b: 8,
      total: 47,
    }),
    intent_details: JSON.stringify({
      trigger_40M_series_b_june23: 15,
      timeline_immediate_post_raise: 9,
      decision_maker_ceo_ethan_chan_named: 8,
      urgency_credibility_sensitive_institutional_narrative: 8,
      responsiveness_fortune_pymnts_coverage: 4,
      total: 44,
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
      '$40M Series B announced June 23 2026, led by Amplify Partners; Kleiner Perkins, Theory Ventures, Pruven Capital',
      '~$61.5M total disclosed (Series A $16.5M July 2024)',
      'Standardizes blockchain data across 150+ chains and 10,000+ protocols into finance-ready datasets',
      'Customers/citations: Visa, Stripe, Coinbase, Uniswap, Grayscale, Phantom, BCG; cited by U.S. Federal Reserve',
      'Founders ex-Meta/Primer/Stanford; positioned as institutional system of record vs Dune/Nansen',
    ]),
    contacts: JSON.stringify([
      { name: 'Ethan Chan', title: 'Co-Founder & CEO', email: '', linkedin: '' },
      { name: 'Cheng Han Lee', title: 'Co-Founder & CTO', email: '', linkedin: '' },
    ]),
    source: 'TechStartups Funding Roundup June 23 2026 / Fortune / PYMNTS',
    source_url: 'https://techstartups.com/2026/06/23/venture-capital-startup-funding-roundup-june-23-2026/',
    notes: 'Best lead of the batch (91). Institutional-finance data infra with a Wall Street / Fed-grade customer roster but crypto-native origin — high-value credibility re-positioning. Fresh Series B (<72h). Pitch: own the trusted institutional onchain-finance data narrative. CEO Ethan Chan is public.',
    scrape_date: '2026-06-24',
  },
  {
    name: 'Attention',
    website: 'attention.com',
    pipeline: 'pr-marketing',
    industry: 'AI / Enterprise SaaS / Revenue Operations',
    location: 'New York, NY',
    funding_stage: 'Series B ($30M, June 23 2026; ~$47M total)',
    fit_score: 45,
    intent_score: 43,
    grade: 'A',
    fit_details: JSON.stringify({
      industry_match_tech_enterprise_saas: 9,
      stage_size_series_b_500_customers: 9,
      b2b_buyer_sales_motion_revenue_teams: 10,
      proof_assets_abridge_scale_preply_engine_bamboohr: 9,
      budget_30M_series_b: 8,
      total: 45,
    }),
    intent_details: JSON.stringify({
      trigger_30M_series_b_june23: 15,
      timeline_scaling_plus_new_action_engine_launch: 9,
      decision_maker_ceo_anis_bennaceur_named: 8,
      urgency_crowded_ai_sales_category: 8,
      responsiveness_already_pr_active_newswire_heavy: 3,
      total: 43,
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
      '$30M Series B announced June 23 2026, led by RTP Global; angels incl. Preply CEO Kirill Bigai, Pavilion CEO Sam Jacobs, execs at Engine/Abridge/Scale AI',
      '~$47M total disclosed (Series A $14M 2024)',
      '500+ customers (Abridge, Scale, Lovable, Preply, Engine, BambooHR); ARR 4x YoY; 20M+ agent actions/month',
      'Funds going to an autonomous action engine — clear product-launch narrative',
      'Positioning: AI that runs revenue teams, not just records them — differentiation vs Gong/Clari',
    ]),
    contacts: JSON.stringify([
      { name: 'Anis Bennaceur', title: 'Co-Founder & CEO', email: '', linkedin: '' },
      { name: 'Matthias Wickenburg', title: 'Co-Founder & CTO', email: '', linkedin: '' },
    ]),
    source: 'TechStartups Funding Roundup June 23 2026 / GlobeNewswire / citybiz',
    source_url: 'https://techstartups.com/2026/06/23/venture-capital-startup-funding-roundup-june-23-2026/',
    notes: 'Strong Tech/B2B fit (88). Caveat: already PR-active (heavy newswire usage) so may have existing comms — intent -2 on responsiveness. Fresh raise + upcoming product launch need a category-defining execution-vs-observation narrative. CEO Anis Bennaceur named.',
    scrape_date: '2026-06-24',
  },
  {
    name: 'Probook',
    website: '',
    pipeline: 'pr-marketing',
    industry: 'Vertical AI / Home-Services Software (HVAC, plumbing, electrical)',
    location: 'New York, NY',
    funding_stage: 'Series A ($34M Series A + $6M prior seed = $40M, June 23 2026)',
    fit_score: 34,
    intent_score: 34,
    grade: 'B',
    fit_details: JSON.stringify({
      industry_match_vertical_saas_not_fs: 5,
      stage_size_series_a_growth: 7,
      b2b_buyer_sales_motion_home_services: 8,
      proof_assets_a16z_sequoia_hundreds_of_locations: 7,
      budget_40M_raise: 7,
      total: 34,
    }),
    intent_details: JSON.stringify({
      trigger_series_a_june23: 14,
      timeline_scaling_post_raise: 7,
      decision_maker_founders_not_yet_public: 5,
      urgency_vertical_saas_less_narrative_sensitive: 5,
      responsiveness_a16z_memo_public: 3,
      total: 34,
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
      '$40M announced June 23 2026: $34M Series A led by Andreessen Horowitz + previously completed $6M seed led by Sequoia (Sequoia also joined the A)',
      'Builds the dispatch/scheduling decision engine for HVAC, plumbing and electrical businesses',
      'Already running across hundreds of locations nationwide',
      'a16z published an investment memo framing dispatch as a vertical control point',
    ]),
    contacts: JSON.stringify([
      { name: '', title: 'Founder/CEO (confirm via Crunchbase/LinkedIn)', email: '', linkedin: '' },
    ]),
    source: 'TechStartups Funding Roundup June 23 2026',
    source_url: 'https://techstartups.com/2026/06/23/venture-capital-startup-funding-roundup-june-23-2026/',
    notes: 'Lowest scorer (68), outside core FS/Tech ICP (home-services vertical). Deprioritized B candidate — strong investors (a16z, Sequoia) + fresh raise justify light-touch outreach. Confirm founder names and website before outreach.',
    scrape_date: '2026-06-24',
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
