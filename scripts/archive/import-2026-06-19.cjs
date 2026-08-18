#!/usr/bin/env node
/**
 * MarCRM Import Script — 2026-06-19
 * Run: node scripts/import-2026-06-19.cjs
 *
 * Inserts 2 new companies into the MarCRM Neon database.
 * Deduplicates by company name (skips if already exists).
 * Requires DATABASE_URL env variable (Neon connection string).
 *
 * Signal refreshes (score updates only — no new company inserts needed):
 *   - Pramaana Labs: 91 → 94
 *   - Jedify: 82 → 87
 *   - NewCore: 90 (stable)
 *   - Respond.io: 91 (stable)
 *   - Forage: 87 (stable)
 */

'use strict';

const { Client } = require('pg');

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('ERROR: DATABASE_URL environment variable is not set.');
  console.error('Usage: DATABASE_URL=<neon-connection-string> node scripts/import-2026-06-19.cjs');
  process.exit(1);
}

// ─── NEW LEADS ────────────────────────────────────────────────────────────────

const NEW_COMPANIES = [
  {
    name: 'Ploy',
    website: 'ploy.ai',
    pipeline: 'pr-marketing',
    industry: 'B2B SaaS / AI Marketing Platform',
    location: 'San Francisco, CA / New York, NY',
    funding_stage: 'Seed ($27M, June 17 2026)',
    fit_score: 38,
    intent_score: 48,
    total_score: 86,
    grade: 'A',
    vertical: '',
    subvertical: '',
    engagement_model: '',
    buyer_type: '',
    compensation_text: '',
    remote_flag: '',
    employment_type_raw: '',
    urgency_score: 0,
    source: 'PRNewswire / TechCrunch',
    source_url: 'https://www.prnewswire.com/news-releases/ploy-raises-27m-to-turn-your-companys-website-into-your-hardest-working-employee-302803231.html',
    notes: 'Founded by Bryant Chou (ex-Webflow CTO, 12 years). $27M seed led by First Round + YC. Launched from stealth June 17, YC S26 Demo Day standout. AI agents handle website design, copy, campaigns, CRM sync end-to-end. No PR firm found. Pitch: founder-led thought leadership + earned media for the AI-native marketing stack narrative.',
    signals: JSON.stringify([
      '$27M seed raised, launched from stealth June 17 2026',
      'Led by First Round Capital + Y Combinator',
      'YC S26 Demo Day standout named by TechCrunch VCs',
      'Founded by Bryant Chou, co-founder and CTO of Webflow',
      'AI agents handle website/copy/campaigns end to end',
      'No dedicated PR/comms function found — PRNewswire used for launch only'
    ]),
    contacts: JSON.stringify([
      { name: 'Bryant Chou', title: 'Co-founder (ex-Webflow CTO)', email: '', linkedin: 'https://www.linkedin.com/in/bryantchou/' }
    ]),
    scrape_date: '2026-06-19'
  },
  {
    name: 'Silmaril',
    website: 'silmaril.dev',
    pipeline: 'pr-marketing',
    industry: 'AI Security / Developer Infrastructure',
    location: 'San Francisco, CA',
    funding_stage: 'Seed (YC S26)',
    fit_score: 30,
    intent_score: 38,
    total_score: 68,
    grade: 'B',
    vertical: '',
    subvertical: '',
    engagement_model: '',
    buyer_type: '',
    compensation_text: '',
    remote_flag: '',
    employment_type_raw: '',
    urgency_score: 0,
    source: 'TechCrunch',
    source_url: 'https://techcrunch.com/2026/06/18/the-11-standout-startups-from-ycs-demo-day-according-to-vcs/',
    notes: 'YC S26 standout. Autonomous prompt injection defense for AI agents/applications. Multihead classifier evaluates user intent, context, execution states. Integrates with major agentic SDKs. Category is nascent — first-mover PR narrative available. Watch list: reach out when follow-on funding announced.',
    signals: JSON.stringify([
      'YC S26 standout — AI security for prompt injection defense',
      'Integrates with major agentic SDKs, minimal code implementation',
      'Named by VCs as notable in YC S26 (batch context $175M+ valuations)',
      'Category prompt injection defense is nascent — category-defining PR window'
    ]),
    contacts: JSON.stringify([
      { name: '', title: 'Founding Team', email: '', linkedin: '' }
    ]),
    scrape_date: '2026-06-19'
  }
];

// ─── SIGNAL REFRESH SCORE UPDATES ─────────────────────────────────────────────

const SCORE_UPDATES = [
  {
    name: 'Pramaana Labs',
    pipeline: 'pr-marketing',
    fit_score: 44,
    intent_score: 50,
    total_score: 94,
    grade: 'A',
    notes_append: '[2026-06-19] Score upgraded 91→94. Press expanding globally: Manila Times, AI Weekly, Crypto Briefing, Entrackr, KuCoin all pick up on June 19. Outreach urgency: NOW.'
  },
  {
    name: 'Jedify',
    pipeline: 'pr-marketing',
    fit_score: 42,
    intent_score: 45,
    total_score: 87,
    grade: 'A',
    notes_append: '[2026-06-19] Score upgraded 82→87. New signal: Snowflake Ventures strategic investment confirmed (June 12). Jedify embedded in Cortex AI, Semantic Views, CoWork. Outreach deadline June 24.'
  }
];

// ─── MAIN ─────────────────────────────────────────────────────────────────────

async function main() {
  const client = new Client({ connectionString: DATABASE_URL });
  await client.connect();
  console.log('Connected to Neon database.');

  let inserted = 0;
  let skipped = 0;

  // ── New company inserts ──
  for (const co of NEW_COMPANIES) {
    const existing = await client.query(
      'SELECT id FROM companies WHERE LOWER(name) = LOWER($1)',
      [co.name]
    );
    if (existing.rows.length > 0) {
      console.log(`SKIP (exists): ${co.name}`);
      skipped++;
      continue;
    }

    await client.query(
      `INSERT INTO companies (
        name, website, pipeline, industry, location, funding_stage,
        fit_score, intent_score, total_score, grade,
        vertical, subvertical, engagement_model, buyer_type,
        compensation_text, remote_flag, employment_type_raw, urgency_score,
        source, source_url, notes, signals, contacts, scrape_date, created_at
      ) VALUES (
        $1,$2,$3,$4,$5,$6,
        $7,$8,$9,$10,
        $11,$12,$13,$14,
        $15,$16,$17,$18,
        $19,$20,$21,$22,$23,$24, NOW()
      )`,
      [
        co.name, co.website, co.pipeline, co.industry, co.location, co.funding_stage,
        co.fit_score, co.intent_score, co.total_score, co.grade,
        co.vertical, co.subvertical, co.engagement_model, co.buyer_type,
        co.compensation_text, co.remote_flag, co.employment_type_raw, co.urgency_score,
        co.source, co.source_url, co.notes, co.signals, co.contacts, co.scrape_date
      ]
    );
    console.log(`INSERTED: ${co.name} → ${co.pipeline} (${co.grade}, ${co.total_score})`);
    inserted++;
  }

  // ── Score updates for signal refreshes ──
  for (const upd of SCORE_UPDATES) {
    const res = await client.query(
      `UPDATE companies
       SET fit_score = $1,
           intent_score = $2,
           total_score = $3,
           grade = $4,
           notes = COALESCE(notes, '') || E'\n' || $5,
           updated_at = NOW()
       WHERE LOWER(name) = LOWER($6)
         AND pipeline = $7
       RETURNING id`,
      [
        upd.fit_score, upd.intent_score, upd.total_score, upd.grade,
        upd.notes_append, upd.name, upd.pipeline
      ]
    );
    if (res.rows.length > 0) {
      console.log(`SCORE UPDATED: ${upd.name} → total_score=${upd.total_score} (${upd.grade})`);
    } else {
      console.log(`SCORE UPDATE SKIPPED (not found): ${upd.name} in ${upd.pipeline}`);
    }
  }

  await client.end();
  console.log(`\nDone. Inserted: ${inserted} | Skipped (already existed): ${skipped}`);
  console.log('Signal refreshes applied: Pramaana Labs (91→94), Jedify (82→87)');
}

main().catch(err => {
  console.error('Import failed:', err);
  process.exit(1);
});
