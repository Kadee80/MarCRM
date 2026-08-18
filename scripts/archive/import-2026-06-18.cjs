/**
 * MarCRM Import Script — 2026-06-18
 * 8 new leads: 3 pr-marketing, 1 pr-freelance, 3 legal-freelance, 1 fund-formation
 *
 * Run: node scripts/import-2026-06-18.cjs
 * Requires: DATABASE_URL env var pointing to Neon Postgres instance
 */

const { Client } = require('pg');

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('ERROR: DATABASE_URL environment variable is not set.');
  process.exit(1);
}

const newLeads = [
  {
    company: 'aVenture',
    website: 'aventure.com',
    pipeline: 'legal-freelance',
    industry: 'Fintech / Venture Capital Platform',
    location: 'San Francisco, CA (remote)',
    funding_stage: 'Startup',
    fit_score: 48,
    intent_score: 48,
    grade: 'A',
    fit_details: JSON.stringify({
      fund_private_funds: 20,
      corporate_securities: 10,
      seniority: 10,
      comp_stated: 8,
      total: 48
    }),
    intent_details: JSON.stringify({
      engagement_model_contract: 15,
      remote: 15,
      posted_within_72hrs: 10,
      easy_apply: 8,
      total: 48
    }),
    vertical: 'legal',
    subvertical: 'fund',
    engagement_model: 'contract',
    buyer_type: 'startup',
    compensation_text: '$80K–$120K (Glassdoor estimate); fixed monthly or hourly rate',
    remote_flag: 'remote',
    employment_type_raw: 'Full-time or Part-time',
    urgency_score: 85,
    source: 'Glassdoor / Gusto',
    source_url: 'https://jobs.gusto.com/postings/aventure-investment-company-venture-capital-fund-attorney-6ade1aa1-d8c3-4622-b95d-f856899b023a',
    notes: 'Near-perfect ICP: fund/VC platform needing contract attorney for fund registration and compliance. Remote globally with Pacific hours overlap. Fund + securities + contract + remote = all high-intent buckets hit. Easiest path to apply in this cycle.',
    contacts: JSON.stringify([
      { name: '', title: 'Hiring Manager', email: '', linkedin: '' }
    ]),
    signals: JSON.stringify([
      'Fintech startup making VC funds accessible to ordinary investors',
      'Seeking contract/PT fund attorney for fund registration + regulatory compliance',
      'Remote globally (min 4hrs US Pacific overlap)',
      'Easy apply via Gusto job posting'
    ]),
    scrape_date: '2026-06-18'
  },
  {
    company: 'NewCore',
    website: 'newcore.com',
    pipeline: 'pr-marketing',
    industry: 'AI / Cybersecurity / Identity Management',
    location: 'New York, NY',
    funding_stage: 'Seed ($66M)',
    fit_score: 42,
    intent_score: 48,
    grade: 'A',
    fit_details: JSON.stringify({
      industry_match: 8,
      stage_size: 9,
      b2b_sales_motion: 10,
      proof_assets: 8,
      budget: 7,
      total: 42
    }),
    intent_details: JSON.stringify({
      trigger_stealth_exit_funding: 15,
      timeline: 10,
      decision_maker: 10,
      urgency: 10,
      responsiveness: 3,
      total: 48
    }),
    vertical: '',
    subvertical: '',
    engagement_model: '',
    buyer_type: '',
    compensation_text: '',
    remote_flag: '',
    employment_type_raw: '',
    urgency_score: 0,
    source: 'TechCrunch + PRNewswire',
    source_url: 'https://techcrunch.com/2026/06/15/ai-agents-are-becoming-employees-newcore-emerges-with-66m-to-give-them-identities/',
    notes: 'First-ever PR opportunity for a well-funded AI security company. Founders are enterprise operators with no PR background (ex-Unit 8200, T-Mobile). Pitch: build the comms narrative from scratch post-stealth. Valuation $300M. CEO Zohar Alon, CCO Erez Yarkoni.',
    contacts: JSON.stringify([
      { name: 'Zohar Alon', title: 'CEO & Co-Founder', email: '', linkedin: '' },
      { name: 'Erez Yarkoni', title: 'Chief Commercial Officer', email: '', linkedin: '' }
    ]),
    signals: JSON.stringify([
      'Emerged from stealth June 15, 2026 with $66M seed at $300M valuation',
      'Backed by Cyberstarts (lead), Index Ventures, Evolution Equity Partners',
      'Zero prior public PR presence — first-ever market moment',
      'Ex-Unit 8200 founders; B2B enterprise AI security'
    ]),
    scrape_date: '2026-06-18'
  },
  {
    company: 'Respond.io',
    website: 'respond.io',
    pipeline: 'pr-marketing',
    industry: 'AI / B2B SaaS / Customer Messaging',
    location: 'Kuala Lumpur, Malaysia (expanding to US/EU)',
    funding_stage: 'Series B ($62.5M)',
    fit_score: 43,
    intent_score: 48,
    grade: 'A',
    fit_details: JSON.stringify({
      industry_match: 9,
      stage_size: 9,
      b2b_sales_motion: 10,
      proof_assets: 8,
      budget: 7,
      total: 43
    }),
    intent_details: JSON.stringify({
      trigger_funding_expansion: 15,
      timeline: 10,
      decision_maker: 9,
      urgency_us_expansion: 10,
      responsiveness: 4,
      total: 48
    }),
    vertical: '',
    subvertical: '',
    engagement_model: '',
    buyer_type: '',
    compensation_text: '',
    remote_flag: '',
    employment_type_raw: '',
    urgency_score: 0,
    source: 'TechCrunch + BusinessWire',
    source_url: 'https://techcrunch.com/2026/06/15/malaysias-respond-io-raises-62-5m-eyes-acquisitions-in-north-america-and-europe/',
    notes: 'Malaysian B2B AI messaging platform entering US/EU market with $62.5M Series B. 35M ARR, 169% YoY, 30% margin. No US PR footprint. Entering via hiring + acquisitions — announcement-rich next 12 months. CEO: Gerardo Salandra.',
    contacts: JSON.stringify([
      { name: 'Gerardo Salandra', title: 'CEO & Founder', email: '', linkedin: '' }
    ]),
    signals: JSON.stringify([
      '$62.5M Series B announced June 15-16, led by Camber Partners',
      '35M ARR, 169% YoY growth, 30% profit margin',
      'Explicitly entering North America and Europe cold via hiring + acquisitions',
      'No US PR/media presence currently'
    ]),
    scrape_date: '2026-06-18'
  },
  {
    company: 'Pramaana Labs',
    website: 'pramaana.ai',
    pipeline: 'pr-marketing',
    industry: 'AI / Formal Verification / Regulated Industries',
    location: 'India / US (dual)',
    funding_stage: 'Seed ($27M)',
    fit_score: 44,
    intent_score: 47,
    grade: 'A',
    fit_details: JSON.stringify({
      industry_match: 9,
      stage_size: 8,
      b2b_regulated_verticals: 10,
      proof_assets_khosla_accel: 9,
      budget: 8,
      total: 44
    }),
    intent_details: JSON.stringify({
      trigger_seed_announcement_yesterday: 15,
      timeline_immediate: 10,
      decision_maker_accessible: 8,
      urgency_fresh_24hrs: 10,
      responsiveness: 4,
      total: 47
    }),
    vertical: '',
    subvertical: '',
    engagement_model: '',
    buyer_type: '',
    compensation_text: '',
    remote_flag: '',
    employment_type_raw: '',
    urgency_score: 0,
    source: 'TechCrunch + SiliconANGLE',
    source_url: 'https://techcrunch.com/2026/06/17/pramaana-labs-raises-27-million-seed-round-from-khosla-ventures-to-bring-formal-verification-to-ai/',
    notes: '24-hour-fresh seed announcement. Khosla-led with Accel, BoldCap, Nexus, Premji Invest. Former IRS Commissioner Danny Werfel advising. Verticals: law, tax, healthcare, cybersecurity. Needs narrative translation from "formal verification" to business value. CEO: Ranjan Rajagopalan.',
    contacts: JSON.stringify([
      { name: 'Ranjan Rajagopalan', title: 'CEO & Co-Founder', email: '', linkedin: '' }
    ]),
    signals: JSON.stringify([
      '$27M seed announced June 17, 2026 — 24 hours old at scrape time',
      'Led by Khosla Ventures; Accel, BoldCap, Nexus, Premji Invest participating',
      'Former IRS Commissioner Danny Werfel advising on tax law',
      'B2B verticals: law, tax, healthcare, financial compliance, cybersecurity'
    ]),
    scrape_date: '2026-06-18'
  },
  {
    company: 'Forage',
    website: 'joinforage.com',
    pipeline: 'pr-freelance',
    industry: 'Fintech / Government Benefits / EBT-SNAP Payments',
    location: 'US (likely NY or SF)',
    funding_stage: 'Series B ($40M, June 3, 2026)',
    fit_score: 45,
    intent_score: 35,
    grade: 'A',
    fit_details: JSON.stringify({
      pr_comms_stated: 20,
      sector_fit_fintech: 15,
      workstream_exec_comms_thought_leadership: 10,
      total: 45
    }),
    intent_details: JSON.stringify({
      engagement_model: 0,
      post_funding_build: 10,
      recent_posting: 10,
      urgency_scaling: 10,
      easy_apply: 5,
      total: 35
    }),
    vertical: 'pr',
    subvertical: 'comms',
    engagement_model: 'fractional',
    buyer_type: 'startup',
    compensation_text: 'Not stated (FT hire posting; pitch as fractional)',
    remote_flag: '',
    employment_type_raw: 'Full-time (internal hire — pitch fractional)',
    urgency_score: 65,
    source: 'NYCA Partners job board',
    source_url: 'https://jobs.nyca.com/companies/forage-2-4a875c45-b1a8-43e3-9103-619620e48973/jobs/63381987-head-of-storytelling-and-communications',
    notes: 'Hiring Head of Storytelling & Communications. Series B $40M June 3. Scaling to 1M families. PR Intent Signal #2. Approach as individual fractional operator — posting explicitly excludes third-party recruiters. Forage also in pr-marketing pipeline (score 87 post-upgrade today).',
    contacts: JSON.stringify([
      { name: '', title: 'Head of People / Hiring Manager', email: '', linkedin: '' }
    ]),
    signals: JSON.stringify([
      "Hiring 'Head of Storytelling and Communications' — 8–12+ years, build PR strategy from scratch",
      '$40M Series B closed June 3 (Mouro Capital, PayPal Ventures, Intuit Ventures)',
      '100K+ app downloads, targeting 1M families by end of 2026',
      'PR Intent Signal #2: Head of PR scaling — pitch fractional while they search'
    ]),
    scrape_date: '2026-06-18'
  },
  {
    company: 'Innovative Driven',
    website: 'innovativedriven.com',
    pipeline: 'legal-freelance',
    industry: 'Legal Staffing / Financial Services',
    location: 'Remote',
    funding_stage: 'N/A',
    fit_score: 28,
    intent_score: 45,
    grade: 'B',
    fit_details: JSON.stringify({
      fund_private_funds: 0,
      financial_services_compliance: 8,
      seniority: 10,
      comp_stated: 10,
      total: 28
    }),
    intent_details: JSON.stringify({
      engagement_model_contract: 15,
      remote: 15,
      posted_within_72hrs: 10,
      easy_apply: 5,
      total: 45
    }),
    vertical: 'legal',
    subvertical: 'compliance',
    engagement_model: 'contract',
    buyer_type: 'staffing',
    compensation_text: '$40–$60/hr, 40 hrs/week',
    remote_flag: 'remote',
    employment_type_raw: 'Contract',
    urgency_score: 70,
    source: 'Indeed',
    source_url: 'https://www.indeed.com/q-private-funds-attorney-l-remote-jobs.html',
    notes: 'Contract attorney for undisclosed financial services client. Escheatment/unclaimed property compliance. Adjacent to core practice. $40-60/hr remote contract. B-tier opportunity worth applying to for pipeline volume.',
    contacts: JSON.stringify([
      { name: '', title: 'Recruiter', email: '', linkedin: '' }
    ]),
    signals: JSON.stringify([
      'Contract attorney, financial services client, escheatment compliance',
      '$40–$60/hr, 40 hrs/wk, fully remote, posted "New"'
    ]),
    scrape_date: '2026-06-18'
  },
  {
    company: 'Atlas Road Advisors',
    website: 'atlasroadadvisors.com',
    pipeline: 'legal-freelance',
    industry: 'Corporate / Transactional Advisory',
    location: 'Unknown (verify remote)',
    funding_stage: 'N/A',
    fit_score: 20,
    intent_score: 45,
    grade: 'B',
    fit_details: JSON.stringify({
      fund_private_funds: 0,
      corporate_vc_securities_ma: 10,
      seniority: 10,
      comp_stated: 0,
      total: 20
    }),
    intent_details: JSON.stringify({
      engagement_model_contract: 15,
      remote_unconfirmed: 10,
      posted_recently: 10,
      easy_apply_indeed: 10,
      total: 45
    }),
    vertical: 'legal',
    subvertical: 'corporate',
    engagement_model: 'contract',
    buyer_type: 'operating-company',
    compensation_text: 'Not stated',
    remote_flag: '',
    employment_type_raw: 'Contract (Part-time or Full-time)',
    urgency_score: 55,
    source: 'Indeed',
    source_url: 'https://www.indeed.com/q-remote-contract-attorney-jobs.html',
    notes: 'Contract attorney, 4+ yrs, VC financing/M&A/securities/corporate. PT or FT. No fund focus lowers fit but transactional scope aligns with practice. Verify remote availability before applying.',
    contacts: JSON.stringify([
      { name: '', title: 'Hiring Contact', email: '', linkedin: '' }
    ]),
    signals: JSON.stringify([
      'Contract attorney, 4+ years, VC financing, securities law, M&A, general corporate',
      'Part-time or full-time, posted on Indeed'
    ]),
    scrape_date: '2026-06-18'
  },
  {
    company: 'Altair Industries',
    website: 'altairindustries.com',
    pipeline: 'fund-formation',
    industry: 'Private Equity / Aerospace & Defense / Industrial',
    location: 'New York, NY',
    funding_stage: 'Fund I (seeking $550M)',
    fit_score: 48,
    intent_score: 25,
    grade: 'B',
    fit_details: JSON.stringify({
      manager_type_fund_i: 15,
      strategy_pe_control_equity: 10,
      operational_readiness: 8,
      jurisdiction: 5,
      ability_to_pay: 10,
      total: 48
    }),
    intent_details: JSON.stringify({
      seed_imminent_raise: 5,
      target_launch_window: 8,
      providers_likely_already_selected: 5,
      founder_urgency: 5,
      referral: 2,
      total: 25
    }),
    vertical: '',
    subvertical: '',
    engagement_model: '',
    buyer_type: '',
    compensation_text: '',
    remote_flag: '',
    employment_type_raw: '',
    urgency_score: 0,
    source: 'Buyouts Insider / withintelligence.com',
    source_url: 'https://www.withintelligence.com/insights/private-equity-emerging-managers-to-watch-in-2026/',
    notes: 'PE Fund I, $550M target, former Stellex Capital execs. Launched Oct 2025 — 8 months in market, likely has counsel. Add to Fund II watch list. Potential for LP document/side letter support as supplemental engagement.',
    contacts: JSON.stringify([
      { name: 'Michael Livanos', title: 'Co-Founder (ex-Stellex Capital)', email: '', linkedin: '' },
      { name: 'David Waxman', title: 'Co-Founder (ex-Stellex Capital)', email: '', linkedin: '' }
    ]),
    signals: JSON.stringify([
      'Fund I launched Oct 2025, targeting $550M control equity in aerospace/defense/industrial',
      'Spin-out from Stellex Capital Management',
      '8 months in market — likely has formation counsel'
    ]),
    scrape_date: '2026-06-18'
  }
];

async function importLeads() {
  const client = new Client({ connectionString: DATABASE_URL });

  try {
    await client.connect();
    console.log('Connected to Neon database.');

    let inserted = 0;
    let skipped = 0;

    for (const lead of newLeads) {
      // Deduplicate by company name
      const existsResult = await client.query(
        'SELECT id FROM companies WHERE LOWER(name) = LOWER($1)',
        [lead.company]
      );

      if (existsResult.rows.length > 0) {
        console.log(`SKIP (exists): ${lead.company}`);
        skipped++;
        continue;
      }

      await client.query(
        `INSERT INTO companies (
          name, website, pipeline, industry, location, funding_stage,
          fit_score, intent_score, grade,
          fit_details, intent_details,
          vertical, subvertical, engagement_model, buyer_type,
          compensation_text, remote_flag, employment_type_raw, urgency_score,
          source, source_url, notes,
          contacts, signals,
          scrape_date, created_at
        ) VALUES (
          $1, $2, $3, $4, $5, $6,
          $7, $8, $9,
          $10, $11,
          $12, $13, $14, $15,
          $16, $17, $18, $19,
          $20, $21, $22,
          $23, $24,
          $25, NOW()
        )`,
        [
          lead.company, lead.website, lead.pipeline, lead.industry,
          lead.location, lead.funding_stage,
          lead.fit_score, lead.intent_score, lead.grade,
          lead.fit_details, lead.intent_details,
          lead.vertical, lead.subvertical, lead.engagement_model, lead.buyer_type,
          lead.compensation_text, lead.remote_flag, lead.employment_type_raw, lead.urgency_score,
          lead.source, lead.source_url, lead.notes,
          lead.contacts, lead.signals,
          lead.scrape_date
        ]
      );

      console.log(`INSERT: ${lead.company} → ${lead.pipeline} (${lead.grade}, ${lead.fit_score + lead.intent_score})`);
      inserted++;
    }

    console.log(`\nDone. Inserted: ${inserted}, Skipped (duplicates): ${skipped}`);
  } catch (err) {
    console.error('Import error:', err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

importLeads();
