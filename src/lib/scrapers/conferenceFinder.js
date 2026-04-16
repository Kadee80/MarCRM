import axios from "axios";
import * as cheerio from "cheerio";

/**
 * Conference Finder
 * Detects Northeast conference attendance and speaking
 * Focuses on blockchain, AI, financial services industries
 */

const BROWSER_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
};

// Industry-specific major conferences
const INDUSTRY_CONFERENCES = {
  blockchain: {
    name: "Blockchain & Web3",
    conferences: [
      "Web3 Summit",
      "Consensus",
      "DevCon",
      "ETHDenver",
      "Solana Breakpoint",
      "Bitcoin Miami",
      "Paris Blockchain Week",
    ],
  },
  ai: {
    name: "AI & Machine Learning",
    conferences: [
      "NeurIPS",
      "AI Summit",
      "AI Expo",
      "O'Reilly AI",
      "ML Summit",
      "Generative AI Summit",
      "OpenAI DevDay",
    ],
  },
  fintech: {
    name: "Financial Services & FinTech",
    conferences: [
      "Money20/20",
      "FinTech Forum",
      "SxSW",
      "Finovate",
      "LendIt",
      "SXSW",
      "Financial Services Forum",
    ],
  },
  "financial-services": {
    name: "Financial Services",
    conferences: [
      "Money20/20",
      "FinTech Forum",
      "Financial Services Forum",
      "SXSW",
      "WealthBriefing",
    ],
  },
};

// Northeast US specific conferences (focus area)
const NORTHEAST_CONFERENCES = {
  "New York": [
    "Web Summit NYC",
    "SXSW",
    "TechCrunch Disrupt",
    "Money20/20 North America",
    "NY Tech Summit",
  ],
  "Boston": [
    "Boston Tech Summit",
    "New England Venture Summit",
    "Boston Innovation Summit",
  ],
  "Philadelphia": [
    "Philadelphia Tech Summit",
    "East Coast Tech",
  ],
  "Washington DC": [
    "DC Tech Summit",
    "Government Tech Summit",
  ],
};

/**
 * Search LinkedIn company page for conference mentions
 */
async function searchLinkedInForConferences(linkedInUrl, companyName) {
  try {
    // LinkedIn blocks automated scraping
    // This is a placeholder for the structure
    console.log(`[ConferenceFinder] Would search LinkedIn: ${linkedInUrl}`);

    // In production, would:
    // 1. Fetch company page
    // 2. Look for "recent posts" section
    // 3. Parse for keywords like "speaking at", "attending", "conference"

    return [];
  } catch (error) {
    console.error("[ConferenceFinder] LinkedIn search error:", error.message);
    return [];
  }
}

/**
 * Search Twitter/X for conference mentions
 */
async function searchTwitterForConferences(companyTwitterHandle, companyName) {
  try {
    console.log(`[ConferenceFinder] Would search Twitter: ${companyTwitterHandle}`);

    // Twitter API would search for:
    // - "speaking at" + conference names
    // - "attending" + conference names
    // - Industry conference hashtags

    return [];
  } catch (error) {
    console.error("[ConferenceFinder] Twitter search error:", error.message);
    return [];
  }
}

/**
 * Check company website for conference mentions/speaking page
 */
async function checkCompanyWebsite(website) {
  try {
    const urls = [
      `${website}/speaking`,
      `${website}/events`,
      `${website}/conference`,
      `${website}/news`,
    ];

    const results = [];

    for (const url of urls) {
      try {
        const { data } = await axios.get(url, {
          timeout: 5000,
          headers: BROWSER_HEADERS,
          validateStatus: (status) => status < 400,
        });

        // Parse for conference mentions
        const conferenceMatches = detectConferenceMentions(data);
        results.push(...conferenceMatches);
      } catch {
        // Page doesn't exist, continue
      }
    }

    return results;
  } catch (error) {
    console.error("[ConferenceFinder] Website search error:", error.message);
    return [];
  }
}

/**
 * Detect conference mentions in text
 */
function detectConferenceMentions(html) {
  const results = [];

  // Try to find conference announcements
  const htmlLower = html.toLowerCase();

  // Look for patterns like "speaking at", "attending", "conference"
  const patterns = [
    /speaking\s+at\s+([^\.]+)/gi,
    /attending\s+([^\.]+)/gi,
    /(conference|summit|expo|forum)\s+(\d{4}|\d{2,4})/gi,
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(html)) !== null) {
      results.push({
        mention: match[0],
        type: match[0].includes("speaking") ? "speaking" : "attending",
      });
    }
  }

  return results;
}

/**
 * Parse conference name and date
 */
function parseConferenceInfo(mention, text) {
  // Extract conference name and date from text
  const conferenceMatch = mention.match(/(?:speaking at|attending)\s+(.+?)(?:\s+\d{4}|\s+in\s+|$)/i);
  const dateMatch = mention.match(/(\d{1,2}\/\d{1,2}\/\d{4}|[A-Z][a-z]+\s+\d{1,2},?\s+\d{4}|[A-Z][a-z]+\s+\d{4})/);

  return {
    conference: conferenceMatch ? conferenceMatch[1].trim() : mention,
    date: dateMatch ? dateMatch[0] : null,
    type: mention.includes("speaking") ? "speaking" : "attending",
  };
}

/**
 * Classify conference by industry relevance
 */
function classifyConferenceRelevance(conferenceName, industry = "") {
  const confLower = conferenceName.toLowerCase();

  for (const [indKey, confData] of Object.entries(INDUSTRY_CONFERENCES)) {
    for (const conf of confData.conferences) {
      if (confLower.includes(conf.toLowerCase())) {
        return {
          industry: indKey,
          relevance: "high",
          weight: 8,
        };
      }
    }
  }

  // Check if Northeast focused
  for (const [region, confs] of Object.entries(NORTHEAST_CONFERENCES)) {
    for (const conf of confs) {
      if (confLower.includes(conf.toLowerCase())) {
        return {
          region,
          relevance: "northeast",
          weight: 7,
        };
      }
    }
  }

  return {
    relevance: "general",
    weight: 3,
  };
}

/**
 * Main conference finder function
 */
export async function findConferenceAttendance(companyName, linkedInUrl = "", twitterHandle = "", website = "") {
  const result = {
    companyName,
    timestamp: new Date().toISOString(),
    conferences: [],
    conferenceCount: 0,
    byType: {
      speaking: [],
      attending: [],
    },
    conferenceScore: 0,
    success: false,
    error: null,
    sources: [],
  };

  try {
    const conferences = [];

    // Search LinkedIn
    if (linkedInUrl) {
      const linkedInConfs = await searchLinkedInForConferences(linkedInUrl, companyName);
      conferences.push(...linkedInConfs);
      if (linkedInConfs.length > 0) result.sources.push("LinkedIn");
    }

    // Search Twitter
    if (twitterHandle) {
      const twitterConfs = await searchTwitterForConferences(twitterHandle, companyName);
      conferences.push(...twitterConfs);
      if (twitterConfs.length > 0) result.sources.push("Twitter");
    }

    // Check company website
    if (website) {
      const websiteConfs = await checkCompanyWebsite(website);
      conferences.push(...websiteConfs);
      if (websiteConfs.length > 0) result.sources.push("Company Website");
    }

    // Deduplicate and process conferences
    const uniqueConferences = [];
    const seenNames = new Set();

    for (const mention of conferences) {
      const confInfo = parseConferenceInfo(mention.mention, "");
      const confName = confInfo.conference.toLowerCase();

      if (!seenNames.has(confName)) {
        seenNames.add(confName);

        const relevance = classifyConferenceRelevance(confInfo.conference);
        const fullConf = {
          conference: confInfo.conference,
          date: confInfo.date,
          type: mention.type || confInfo.type,
          relevance: relevance.relevance,
          weight: relevance.weight,
        };

        uniqueConferences.push(fullConf);

        // Categorize by type
        if (fullConf.type === "speaking") {
          result.byType.speaking.push(fullConf);
        } else {
          result.byType.attending.push(fullConf);
        }
      }
    }

    result.conferences = uniqueConferences;
    result.conferenceCount = uniqueConferences.length;

    // Calculate conference score
    // +8 if speaking at industry conference
    // +5 if attending industry conference
    let score = 0;
    result.byType.speaking.forEach(conf => {
      score += conf.weight >= 7 ? 8 : 5;
    });
    result.byType.attending.forEach(conf => {
      score += conf.weight >= 7 ? 5 : 2;
    });

    result.conferenceScore = Math.min(score, 10);
    result.success = true;

  } catch (error) {
    result.success = false;
    result.error = error.message;
    result.conferenceScore = 0;
  }

  return result;
}

/**
 * Batch search for conference attendance on multiple companies
 */
export async function findConferenceAttendanceBatch(companies) {
  const results = [];

  for (const company of companies) {
    const result = await findConferenceAttendance(
      company.name,
      company.linkedinUrl || "",
      company.twitterHandle || "",
      company.website || ""
    );
    results.push(result);

    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
  }

  return results;
}

/**
 * Get signal value for conference (for scoring)
 */
export function getConferenceSignalScore(conferenceResult) {
  if (!conferenceResult.success) return 0;

  return conferenceResult.conferenceScore;
}

/**
 * Upcoming conferences in Northeast (reference data)
 */
export const UPCOMING_CONFERENCES = {
  2026: [
    { name: "Money20/20 North America", month: "May", location: "Las Vegas", industry: "fintech" },
    { name: "Web3 Summit", month: "June", location: "Colorado", industry: "blockchain" },
    { name: "AI Summit", month: "July", location: "San Francisco", industry: "ai" },
    { name: "SxSW", month: "March", location: "Austin", industry: "general" },
  ],
};

/**
 * Format conference data for storage
 */
export function formatConferenceForStorage(conferenceResult) {
  return {
    conferenceCount: conferenceResult.conferenceCount,
    conferenceScore: conferenceResult.conferenceScore,
    speaking: conferenceResult.byType.speaking,
    attending: conferenceResult.byType.attending,
    lastSearched: conferenceResult.timestamp,
  };
}
