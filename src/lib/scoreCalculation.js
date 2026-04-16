/**
 * Score Calculation Utilities
 * Centralized scoring logic for fit and intent across pipelines
 */

/**
 * Calculate PR/Marketing Pipeline Fit Score
 * Max: 40 points
 */
export function calculatePRMarketingFitScore(fitDetails = {}) {
  let score = 0;

  // Original criteria (up to 40 points)
  if (fitDetails.industry !== undefined) score += fitDetails.industry || 0; // max 10
  if (fitDetails.stage !== undefined) score += fitDetails.stage || 0; // max 10
  if (fitDetails.buyer !== undefined) score += fitDetails.buyer || 0; // max 10
  if (fitDetails.proof !== undefined) score += fitDetails.proof || 0; // max 10
  if (fitDetails.budget !== undefined) score += fitDetails.budget || 0; // max 10

  // New scraped signals
  if (fitDetails.websiteFreshness) {
    // +5 if outdated (good signal for design/PR work)
    if (fitDetails.websiteFreshness.isOutdated) {
      score += 5;
    }
  }

  if (fitDetails.conferenceAttendance && Array.isArray(fitDetails.conferenceAttendance)) {
    // +8 if speaking at industry conference
    const hasSpeaking = fitDetails.conferenceAttendance.some(c => c.type === "speaking");
    if (hasSpeaking) {
      score += 8;
    }
    // +5 if attending Northeast industry conference
    const hasAttending = fitDetails.conferenceAttendance.some(c => c.type === "attending");
    if (hasAttending) {
      score += 5;
    }
  }

  return Math.min(Math.round(score), 100);
}

/**
 * Calculate PR/Marketing Pipeline Intent Score
 * Max: 50 points
 */
export function calculatePRMarketingIntentScore(intentDetails = {}) {
  let score = 0;

  // Original criteria (up to 50 points)
  if (intentDetails.trigger !== undefined) score += intentDetails.trigger || 0; // max 15
  if (intentDetails.timeline !== undefined) score += intentDetails.timeline || 0; // max 10
  if (intentDetails.dm_engaged !== undefined) score += intentDetails.dm_engaged || 0; // max 10
  if (intentDetails.urgency !== undefined) score += intentDetails.urgency || 0; // max 10
  if (intentDetails.responsive !== undefined) score += intentDetails.responsive || 0; // max 5

  // New scraped signals
  if (intentDetails.hiringSignal) {
    // +10 if 5+ open Communications/PR/Marketing positions
    if (intentDetails.hiringSignal.openPositions >= 5) {
      score += 10;
    }
    // +5 if hiring velocity increasing (week-over-week growth)
    if (intentDetails.hiringSignal.velocity > 1) {
      score += 5;
    }
  }

  if (Array.isArray(intentDetails.recentNews) && intentDetails.recentNews.length > 0) {
    // +8 if product launch in last 90 days
    const hasLaunch = intentDetails.recentNews.some(n => n.type === "product_launch");
    if (hasLaunch) {
      score += 8;
    }

    // +5 if funding, expansion, or rebrand in last 90 days
    const hasExpansion = intentDetails.recentNews.some(n =>
      n.type === "funding" || n.type === "expansion" || n.type === "rebrand"
    );
    if (hasExpansion && !hasLaunch) {
      score += 5;
    }
  }

  return Math.min(Math.round(score), 100);
}

/**
 * Get composite score (weighted average)
 * Used for overall ranking
 */
export function getCompositeScore(fitScore, intentScore, fitWeight = 0.4, intentWeight = 0.6) {
  // Intent weighted higher (more predictive of immediate opportunity)
  return Math.round(fitScore * fitWeight + intentScore * intentWeight);
}

/**
 * Get score interpretation
 */
export function interpretScore(score) {
  if (score >= 85) return "Excellent";
  if (score >= 70) return "Very Good";
  if (score >= 55) return "Good";
  if (score >= 40) return "Fair";
  if (score >= 25) return "Below Average";
  return "Poor";
}

/**
 * Get color coding for score (for UI)
 */
export function getScoreColor(score) {
  if (score >= 85) return "emerald"; // green
  if (score >= 70) return "cyan"; // light blue
  if (score >= 55) return "blue"; // blue
  if (score >= 40) return "amber"; // yellow
  if (score >= 25) return "orange"; // orange
  return "red"; // red
}

/**
 * Calculate pipeline-specific scores
 */
export function calculatePipelineScore(pipeline, fitDetails, intentDetails) {
  switch (pipeline) {
    case "pr-marketing":
      return {
        fitScore: calculatePRMarketingFitScore(fitDetails),
        intentScore: calculatePRMarketingIntentScore(intentDetails),
      };

    case "fund-formation":
      return calculateFundFormationScore(fitDetails, intentDetails);

    case "legal-consulting":
      return calculateLegalConsultingScore(fitDetails, intentDetails);

    case "coaching-ops":
      return calculateCoachingOpsScore(fitDetails, intentDetails);

    case "media":
      return calculateMediaScore(fitDetails, intentDetails);

    case "ai-consulting":
      return calculateAIConsultingScore(fitDetails, intentDetails);

    default:
      return { fitScore: 0, intentScore: 0 };
  }
}

/**
 * Fund Formation scoring
 */
function calculateFundFormationScore(fitDetails = {}, intentDetails = {}) {
  let fitScore = 0;
  let intentScore = 0;

  // Fit
  fitScore += fitDetails.manager_type || 0; // max 15
  fitScore += fitDetails.strategy || 0; // max 10
  fitScore += fitDetails.ops_readiness || 0; // max 10
  fitScore += fitDetails.jurisdiction || 0; // max 5
  fitScore += fitDetails.budget || 0; // max 10

  // Intent
  intentScore += intentDetails.anchor || 0; // max 15
  intentScore += intentDetails.launch_window || 0; // max 10
  intentScore += intentDetails.providers || 0; // max 10
  intentScore += intentDetails.urgency || 0; // max 10
  intentScore += intentDetails.referral || 0; // max 5

  return {
    fitScore: Math.min(fitScore, 50),
    intentScore: Math.min(intentScore, 50),
  };
}

/**
 * Legal Consulting scoring
 */
function calculateLegalConsultingScore(fitDetails = {}, intentDetails = {}) {
  let fitScore = 0;
  let intentScore = 0;

  // Fit
  fitScore += fitDetails.complexity || 0; // max 15
  fitScore += fitDetails.ongoing || 0; // max 15
  fitScore += fitDetails.org_size || 0; // max 10
  fitScore += fitDetails.dm_access || 0; // max 5
  fitScore += fitDetails.budget || 0; // max 5

  // Intent
  intentScore += intentDetails.active_problem || 0; // max 20
  intentScore += intentDetails.timeline || 0; // max 10
  intentScore += intentDetails.volume || 0; // max 10
  intentScore += intentDetails.pressure || 0; // max 5
  intentScore += intentDetails.responsive || 0; // max 5

  return {
    fitScore: Math.min(fitScore, 50),
    intentScore: Math.min(intentScore, 50),
  };
}

/**
 * Coaching & Ops scoring
 */
function calculateCoachingOpsScore(fitDetails = {}, intentDetails = {}) {
  let fitScore = 0;
  let intentScore = 0;

  // Fit
  fitScore += fitDetails.revenue || 0; // max 15
  fitScore += fitDetails.niche || 0; // max 10
  fitScore += fitDetails.margin || 0; // max 10
  fitScore += fitDetails.dm_access || 0; // max 10
  fitScore += fitDetails.coachable || 0; // max 5

  // Intent
  intentScore += intentDetails.trigger || 0; // max 20
  intentScore += intentDetails.timeline || 0; // max 10
  intentScore += intentDetails.pain || 0; // max 10
  intentScore += intentDetails.responsive || 0; // max 5
  intentScore += intentDetails.budget || 0; // max 5

  return {
    fitScore: Math.min(fitScore, 50),
    intentScore: Math.min(intentScore, 50),
  };
}

/**
 * Media scoring
 */
function calculateMediaScore(fitDetails = {}, intentDetails = {}) {
  let fitScore = 0;
  let intentScore = 0;

  // Fit
  fitScore += fitDetails.industry || 0; // max 10
  fitScore += fitDetails.complexity || 0; // max 10
  fitScore += fitDetails.credibility || 0; // max 10
  fitScore += fitDetails.distribution || 0; // max 10
  fitScore += fitDetails.budget || 0; // max 10

  // Intent
  intentScore += intentDetails.signal || 0; // max 20
  intentScore += intentDetails.timeline || 0; // max 10
  intentScore += intentDetails.exec || 0; // max 10
  intentScore += intentDetails.responsive || 0; // max 5
  intentScore += intentDetails.goal || 0; // max 5

  return {
    fitScore: Math.min(fitScore, 50),
    intentScore: Math.min(intentScore, 50),
  };
}

/**
 * AI Consulting scoring
 */
function calculateAIConsultingScore(fitDetails = {}, intentDetails = {}) {
  let fitScore = 0;
  let intentScore = 0;

  // Fit
  fitScore += fitDetails.industry || 0; // max 10
  fitScore += fitDetails.use_case || 0; // max 15
  fitScore += fitDetails.team || 0; // max 10
  fitScore += fitDetails.timeline || 0; // max 10
  fitScore += fitDetails.budget || 0; // max 5

  // Intent
  intentScore += intentDetails.urgency || 0; // max 15
  intentScore += intentDetails.problem || 0; // max 15
  intentScore += intentDetails.pilot_ready || 0; // max 10
  intentScore += intentDetails.responsive || 0; // max 5
  intentScore += intentDetails.budget_allocated || 0; // max 5

  return {
    fitScore: Math.min(fitScore, 50),
    intentScore: Math.min(intentScore, 50),
  };
}

/**
 * Format score details for display
 */
export function formatScoreBreakdown(pipeline, fitDetails, intentDetails) {
  const { fitScore, intentScore } = calculatePipelineScore(pipeline, fitDetails, intentDetails);
  const composite = getCompositeScore(fitScore, intentScore);

  return {
    fit: {
      score: fitScore,
      interpretation: interpretScore(fitScore),
      color: getScoreColor(fitScore),
    },
    intent: {
      score: intentScore,
      interpretation: interpretScore(intentScore),
      color: getScoreColor(intentScore),
    },
    composite: {
      score: composite,
      interpretation: interpretScore(composite),
      color: getScoreColor(composite),
    },
  };
}
