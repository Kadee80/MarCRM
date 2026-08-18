/**
 * MarCRM Daily Import — 2026-06-17
 * Imports new leads and signal refreshes from daily-scrape-2026-06-17.json
 *
 * Usage:
 *   node scripts/import-2026-06-17.cjs
 *
 * Requires: DATABASE_URL env var pointing to Neon Postgres instance
 * Deduplicates by company name (case-insensitive) before inserting.
 */

'use strict';

const { Client } = require('pg');
const path = require('path');

const SCRAPE_DATE = '2026-06-17';

// ─── New leads payload ───────────────────────────────────────────────────────

const NEW_LEADS = [
  {
    company: 'Chronograph',
    domain: 'chronograph.io',
    pipeline: 'pr-marketing',
    location: 'Brooklyn, NY',
    industry: 'Private Markets Data Infrastructure',
    subindustry: 'Fintech / AI Data Layer',
    funding_round: 'Growth Equity',
    funding_amount: '$140M+',
    funding_date: '2026-06-16',
    investors: JSON.stringify(['Sixth Street Growth', 'Summit Partners', 'Carlyle AlpInvest', 'Nasdaq Ventures', 'Sidekick Partners']),
    fit_score: 42,
    intent_score: 43,
    combined_score: 85,
    grade: 'A',
    pitch_angle: 'Trusted AI data layer narrative for institutional LP/allocator audiences; earn media in IQ, PE Hub, Institutional Investor, Pensions & Investments',
    trigger: 'Growth equity round June 16, 2026; positioning as trusted AI for private capital',
    outreach_target: 'CMO or VP Marketing (search LinkedIn / chronograph.io/about)',
    window_days_remaining: 21,
    source_url: 'https://chronograph.io',
    notes: 'Sixth Street Growth-led. Private-capital data platform at intersection of AI and LP/GP trust. Post-round press window is now — before a competitor claims the reliable AI for private markets narrative.',
    scraped_date: SCRAPE_DATE,
    status: 'new',
    // enhanced freelance fields (null for non-freelance leads)
    engagement_model: null,
    buyer_type: null,
    vertical: null,
    subvertical: null,
    remote_flag: null,
    employment_type_raw: null,
    urgency_score: null,
    compensation_text: null
  },
  {
    company: 'BHG Financial',
    domain: 'bhgfinancial.com',
    pipeline: 'pr-freelance',
    location: 'Remote-first (Fort Lauderdale FL, Davie FL, Syracuse NY)',
    industry: 'Fintech / B2B Financial Lending',
    subindustry: 'Medical & Small Business Lending',
    funding_round: null,
    funding_amount: null,
    funding_date: null,
    investors: JSON.stringify([]),
    fit_score: 48,
    intent_score: 37,
    combined_score: 85,
    grade: 'A',
    pitch_angle: 'Fractional Director of Communications for 3-6 months while FT search runs; can convert to retainer',
    trigger: 'Director of Communications job posting June 2026; requires 10+ years experience',
    outreach_target: 'VP/SVP Marketing or hiring manager via careersatbhg.com or LinkedIn',
    window_days_remaining: 14,
    source_url: 'https://careersatbhg.com',
    notes: 'PR/comms hiring post routed to pr-freelance per pipeline rule. Mark pitches as fractional/interim Director of Comms while FT search progresses. Fortune Best Workplaces in Fintech 6x honoree.',
    scraped_date: SCRAPE_DATE,
    status: 'new',
    // enhanced freelance fields
    engagement_model: 'hiring-for-FT-comms-role',
    buyer_type: 'in-house-marketing-team',
    vertical: 'fintech',
    subvertical: 'B2B-lending',
    remote_flag: true,
    employment_type_raw: 'Full-Time Director of Communications (pitched as fractional opportunity)',
    urgency_score: 8,
    compensation_text: null
  },
  {
    company: 'Bland',
    domain: 'bland.ai',
    pipeline: 'pr-marketing',
    location: 'San Francisco, CA',
    industry: 'Enterprise AI / Voice AI',
    subindustry: 'AI Infrastructure',
    funding_round: 'Series C',
    funding_amount: '$50M',
    funding_date: '2026-06-16',
    investors: JSON.stringify(['Dell Technologies Capital', 'HubSpot Ventures', 'Archerman', 'Tribeca', 'Emergence Capital', 'Scale Venture Partners', 'Y Combinator']),
    fit_score: 41,
    intent_score: 39,
    combined_score: 80,
    grade: 'B',
    pitch_angle: 'Earned media campaign for enterprise trust in regulated industries (FS/healthcare): voice AI with audit trails for compliance-sensitive environments',
    trigger: 'Series C June 16; entering regulated verticals (healthcare, financial services)',
    outreach_target: 'CMO or Head of Marketing (bland.ai/about)',
    window_days_remaining: 18,
    source_url: 'https://bland.ai',
    notes: 'HubSpot Ventures backing signals B2B distribution alignment. Regulated-sector expansion = PR trust imperative.',
    scraped_date: SCRAPE_DATE,
    status: 'new',
    engagement_model: null,
    buyer_type: null,
    vertical: null,
    subvertical: null,
    remote_flag: null,
    employment_type_raw: null,
    urgency_score: null,
    compensation_text: null
  },
  {
    company: 'EDGE Markets',
    domain: 'edge.markets',
    pipeline: 'pr-marketing',
    location: 'New York, NY',
    industry: 'Fintech / Prediction Markets',
    subindustry: 'CFTC-Regulated Payments Infrastructure',
    funding_round: 'Series A',
    funding_amount: '$29.2M',
    funding_date: '2026-06-08',
    investors: JSON.stringify(['CoinFund', 'Indicator Ventures', 'Mantis VC', 'StepStone Group', 'Bullpen Capital']),
    fit_score: 34,
    intent_score: 38,
    combined_score: 72,
    grade: 'B',
    pitch_angle: 'Define the prediction markets + regulated fintech narrative for mainstream FS media; establish regulatory credibility before competitors',
    trigger: 'Series A June 8; dual product launches EDGE Pro and EDGE Connect',
    outreach_target: 'Founder/CEO or Head of Marketing (small team, likely founder-led)',
    window_days_remaining: 9,
    source_url: 'https://edge.markets',
    notes: 'Very niche space. First-mover in CFTC-regulated prediction markets PR. Small team, probably no in-house comms.',
    scraped_date: SCRAPE_DATE,
    status: 'new',
    engagement_model: null,
    buyer_type: null,
    vertical: null,
    subvertical: null,
    remote_flag: null,
    employment_type_raw: null,
    urgency_score: null,
    compensation_text: null
  }
];

// ─── Signal refresh updates ───────────────────────────────────────────────────

const SIGNAL_REFRESHES = [
  {
    company: 'Jedify',
    pipeline: 'pr-marketing',
    combined_score: 82,
    grade: 'A',
    window_status: 'open-closing',
    signal_notes: 'TechCrunch coverage June 10 2026; Snowflake Ventures blog confirmed partnership live. Score upgraded from 77 to 82.',
    outreach_deadline: '2026-06-24'
  },
  {
    company: 'Forage',
    pipeline: 'pr-marketing',
    combined_score: 77,
    grade: 'B',
    window_status: 'open-narrowing',
    signal_notes: 'No new press June 12-17. $40M Series B (June 3, PayPal Ventures) remains active trigger. Score steady.',
    outreach_deadline: '2026-06-28'
  },
  {
    company: 'Arootah',
    pipeline: 'legal-freelance',
    combined_score: 85,
    grade: 'A',
    window_status: 'open-stable',
    signal_notes: 'No new June 2026 announcements. Stable at ~122 employees. Score unchanged.',
    outreach_deadline: null
  },
  {
    company: 'Capsa AI',
    pipeline: 'pr-marketing',
    combined_score: 82,
    grade: 'A',
    window_status: 'open-aging',
    signal_notes: 'No new June 2026 coverage found. 6 days post-capture. Score held pending outreach.',
    outreach_deadline: '2026-06-24'
  },
  {
    company: 'Vinyl Equity',
    pipeline: 'pr-marketing',
    combined_score: 81,
    grade: 'A',
    window_status: 'open-aging',
    signal_notes: 'Search returned API errors; no new June 2026 data confirmed. Score held.',
    outreach_deadline: '2026-06-24'
  }
];

// ─── DB helpers ───────────────────────────────────────────────────────────────

async function getExistingCompanies(client) {
  const res = await client.query(
    `SELECT LOWER(company) AS company_lower FROM leads`
  );
  return new Set(res.rows.map(r => r.company_lower));
}

async function insertLead(client, lead) {
  const sql = `
    INSERT INTO leads (
      company, domain, pipeline, location, industry, subindustry,
      funding_round, funding_amount, funding_date, investors,
      fit_score, intent_score, combined_score, grade,
      pitch_angle, trigger_signal, outreach_target, window_days_remaining,
      source_url, notes, scraped_date, status,
      engagement_model, buyer_type, vertical, subvertical,
      remote_flag, employment_type_raw, urgency_score, compensation_text,
      created_at, updated_at
    )
    VALUES (
      $1,$2,$3,$4,$5,$6,
      $7,$8,$9,$10,
      $11,$12,$13,$14,
      $15,$16,$17,$18,
      $19,$20,$21,$22,
      $23,$24,$25,$26,
      $27,$28,$29,$30,
      NOW(), NOW()
    )
    ON CONFLICT DO NOTHING
    RETURNING id
  `;
  const values = [
    lead.company, lead.domain, lead.pipeline, lead.location, lead.industry, lead.subindustry,
    lead.funding_round, lead.funding_amount, lead.funding_date, lead.investors,
    lead.fit_score, lead.intent_score, lead.combined_score, lead.grade,
    lead.pitch_angle, lead.trigger, lead.outreach_target, lead.window_days_remaining,
    lead.source_url, lead.notes, lead.scraped_date, lead.status,
    lead.engagement_model, lead.buyer_type, lead.vertical, lead.subvertical,
    lead.remote_flag, lead.employment_type_raw, lead.urgency_score, lead.compensation_text
  ];
  return client.query(sql, values);
}

async function updateSignalRefresh(client, refresh) {
  const sql = `
    UPDATE leads
    SET
      combined_score = $1,
      grade = $2,
      window_status = $3,
      signal_notes = COALESCE(signal_notes, '') || E'\n[' || $4 || '] ' || $5,
      outreach_deadline = CASE WHEN $6::date IS NOT NULL THEN $6::date ELSE outreach_deadline END,
      updated_at = NOW()
    WHERE LOWER(company) = LOWER($7)
      AND pipeline = $8
  `;
  const values = [
    refresh.combined_score,
    refresh.grade,
    refresh.window_status,
    SCRAPE_DATE,
    refresh.signal_notes,
    refresh.outreach_deadline,
    refresh.company,
    refresh.pipeline
  ];
  return client.query(sql, values);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error('ERROR: DATABASE_URL environment variable is not set.');
    console.error('Example: DATABASE_URL="postgresql://user:pass@host/db" node scripts/import-2026-06-17.cjs');
    process.exit(1);
  }

  const client = new Client({ connectionString: process.env.DATABASE_URL });

  try {
    await client.connect();
    console.log(`\nMarCRM Import — ${SCRAPE_DATE}`);
    console.log('─'.repeat(50));

    // Fetch existing companies for deduplication
    const existing = await getExistingCompanies(client);
    console.log(`Existing leads in DB: ${existing.size}`);

    // Insert new leads (skip duplicates)
    let inserted = 0;
    let skipped = 0;

    for (const lead of NEW_LEADS) {
      const key = lead.company.toLowerCase();
      if (existing.has(key)) {
        console.log(`  SKIP (duplicate): ${lead.company}`);
        skipped++;
      } else {
        const result = await insertLead(client, lead);
        if (result.rowCount > 0) {
          const newId = result.rows[0]?.id ?? '?';
          console.log(`  INSERT: ${lead.company} [${lead.pipeline}] score=${lead.combined_score} grade=${lead.grade} id=${newId}`);
          inserted++;
        } else {
          console.log(`  SKIP (conflict): ${lead.company}`);
          skipped++;
        }
      }
    }

    console.log(`\nNew leads: ${inserted} inserted, ${skipped} skipped`);

    // Apply signal refreshes
    console.log('\nSignal refreshes:');
    let refreshed = 0;
    let refreshMissed = 0;

    for (const refresh of SIGNAL_REFRESHES) {
      const result = await updateSignalRefresh(client, refresh);
      if (result.rowCount > 0) {
        const delta = refresh.combined_score;
        console.log(`  REFRESH: ${refresh.company} [${refresh.pipeline}] → score=${delta} grade=${refresh.grade} window=${refresh.window_status}`);
        refreshed++;
      } else {
        console.log(`  NOT FOUND: ${refresh.company} [${refresh.pipeline}] — not in DB yet, skipping refresh`);
        refreshMissed++;
      }
    }

    console.log(`\nSignal refreshes: ${refreshed} updated, ${refreshMissed} not found in DB`);
    console.log(`\nDone. Import complete for ${SCRAPE_DATE}.`);

  } catch (err) {
    console.error('Import error:', err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
