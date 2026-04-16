import axios from "axios";
import * as cheerio from "cheerio";

/**
 * Website Freshness Analyzer
 * Analyzes website age and design freshness
 * Signals outdated designs for outreach opportunities
 */

const BROWSER_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
};

// Indicators of outdated design/tech
const OUTDATED_INDICATORS = {
  "bootstrap 3": { framework: "Bootstrap 3", weight: 3, version: 3 },
  "bootstrap 2": { framework: "Bootstrap 2", weight: 5, version: 2 },
  "jquery": { framework: "jQuery", weight: 2, version: 1 },
  "underscore.js": { framework: "Underscore.js", weight: 3, version: 1 },
  "moment.js": { framework: "Moment.js", weight: 1, version: 1 },
  "flash": { framework: "Flash", weight: 4, version: 0 },
  "ie compatibility": { framework: "IE Compatibility Mode", weight: 5, version: 8 },
  "//code.jquery.com": { framework: "Inline jQuery CDN", weight: 2, version: 1 },
};

const MODERN_INDICATORS = {
  "bootstrap 5": { framework: "Bootstrap 5", weight: 0, version: 5 },
  "bootstrap 4": { framework: "Bootstrap 4", weight: 1, version: 4 },
  "tailwind": { framework: "Tailwind CSS", weight: 0, version: 3 },
  "react": { framework: "React", weight: 0, version: 16 },
  "vue": { framework: "Vue.js", weight: 0, version: 2 },
  "angular": { framework: "Angular", weight: 0, version: 12 },
  "next.js": { framework: "Next.js", weight: 0, version: 13 },
};

/**
 * Calculate website age based on copyright year in footer
 */
function extractCopyrightYear(html) {
  try {
    // Look for copyright patterns: ©2020, Copyright 2020, etc.
    const patterns = [
      /©\s*(\d{4})/i,
      /copyright\s*©?\s*(\d{4})/i,
      /&copy;\s*(\d{4})/i,
      /copyright\s+(\d{4})/i,
    ];

    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match && match[1]) {
        const year = parseInt(match[1]);
        if (year > 1990 && year <= new Date().getFullYear()) {
          return year;
        }
      }
    }

    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Parse Last-Modified header to determine update frequency
 */
function analyzeLastModified(lastModifiedHeader) {
  if (!lastModifiedHeader) return null;

  try {
    const modDate = new Date(lastModifiedHeader);
    const now = new Date();
    const daysSince = Math.floor((now - modDate) / (1000 * 60 * 60 * 24));

    return {
      lastModified: modDate.toISOString().split('T')[0],
      daysSince,
      isRecent: daysSince < 30,
    };
  } catch {
    return null;
  }
}

/**
 * Check for CSS/framework indicators of outdated design
 */
function analyzeDesignFramework(html) {
  const htmlLower = html.toLowerCase();
  const results = {
    outdatedIndicators: [],
    modernIndicators: [],
    outdatedScore: 0,
    modernScore: 0,
  };

  // Check for outdated frameworks/patterns
  for (const [pattern, info] of Object.entries(OUTDATED_INDICATORS)) {
    if (htmlLower.includes(pattern.toLowerCase())) {
      results.outdatedIndicators.push(info.framework);
      results.outdatedScore += info.weight;
    }
  }

  // Check for modern frameworks/patterns
  for (const [pattern, info] of Object.entries(MODERN_INDICATORS)) {
    if (htmlLower.includes(pattern.toLowerCase())) {
      results.modernIndicators.push(info.framework);
      results.modernScore += info.weight;
    }
  }

  return results;
}

/**
 * Check sitemap.xml last update date
 */
async function checkSitemapUpdate(baseUrl) {
  try {
    const sitemapUrl = `${baseUrl}/sitemap.xml`;
    const { data, headers } = await axios.get(sitemapUrl, {
      timeout: 5000,
      headers: BROWSER_HEADERS,
      validateStatus: (status) => status < 400,
    });

    // Look for lastmod in sitemap
    const lastmodMatch = data.match(/<lastmod>([^<]+)<\/lastmod>/);
    if (lastmodMatch && lastmodMatch[1]) {
      const lastmodDate = new Date(lastmodMatch[1]);
      const now = new Date();
      const daysSince = Math.floor((now - lastmodDate) / (1000 * 60 * 60 * 24));

      return {
        lastModified: lastmodDate.toISOString().split('T')[0],
        daysSince,
        isRecent: daysSince < 90,
      };
    }

    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Analyze overall design freshness score
 */
function calculateFreshnessScore(analysis) {
  let score = 10; // Start at 10 (fresh)

  // Penalize for outdated indicators
  const outdatedPenalty = analysis.designFramework.outdatedScore * 0.5;
  score -= outdatedPenalty;

  // Bonus for modern frameworks
  const modernBonus = Math.min(analysis.designFramework.modernScore * 0.2, 2);
  score += modernBonus;

  // Penalize if website hasn't been updated in 6+ months
  if (analysis.lastModified && analysis.lastModified.daysSince >= 180) {
    score -= 3;
  }

  // Penalize if copyright is old
  if (analysis.copyrightYear) {
    const yearsSince = new Date().getFullYear() - analysis.copyrightYear;
    if (yearsSince >= 2) {
      score -= Math.min(yearsSince * 0.5, 2);
    }
  }

  return Math.max(Math.min(score, 10), 0);
}

/**
 * Main website freshness analyzer function
 */
export async function analyzeWebsiteFreshness(url) {
  const normalizedUrl = url.startsWith("http") ? url : `https://${url}`;
  const domain = new URL(normalizedUrl).hostname.replace("www.", "");

  const result = {
    domain,
    url: normalizedUrl,
    timestamp: new Date().toISOString(),
    ageMonths: 0,
    isOutdated: false,
    freshnessScore: 5,
    copyrightYear: null,
    lastModified: null,
    sitemap: null,
    designFramework: {
      outdatedIndicators: [],
      modernIndicators: [],
      outdatedScore: 0,
      modernScore: 0,
    },
    analysis: {},
    success: false,
    error: null,
  };

  try {
    // Fetch main page
    const { data: html, headers } = await axios.get(normalizedUrl, {
      timeout: 10000,
      headers: BROWSER_HEADERS,
      maxRedirects: 5,
      validateStatus: (status) => status < 400,
    });

    // 1. Check Last-Modified header
    if (headers["last-modified"]) {
      result.lastModified = analyzeLastModified(headers["last-modified"]);
    }

    // 2. Extract copyright year
    result.copyrightYear = extractCopyrightYear(html);
    if (result.copyrightYear) {
      result.ageMonths = Math.round(
        (new Date().getFullYear() - result.copyrightYear) * 12
      );
    }

    // 3. Analyze design framework indicators
    result.designFramework = analyzeDesignFramework(html);

    // 4. Check sitemap.xml if available
    result.sitemap = await checkSitemapUpdate(normalizedUrl);

    // 5. Calculate overall freshness score
    result.freshnessScore = calculateFreshnessScore(result);

    // 6. Determine if outdated (design + age signals)
    const isDesignOutdated = result.designFramework.outdatedScore > 3;
    const isAgeOutdated = result.ageMonths >= 6;
    result.isOutdated = isDesignOutdated || isAgeOutdated;

    // 7. Build analysis summary
    result.analysis = {
      designStatus: result.designFramework.outdatedScore > 2 ? "Outdated" : "Modern",
      updateFrequency: result.lastModified?.isRecent ? "Recent (< 30 days)" : "Stale (30+ days)",
      copyrightAge: result.ageMonths ? `${result.ageMonths} months old` : "Unknown",
      freshness: result.freshnessScore >= 7 ? "High" : result.freshnessScore >= 4 ? "Medium" : "Low",
      signal: result.isOutdated ? "Positive opportunity (design refresh)" : "Current design",
    };

    result.success = true;

  } catch (error) {
    result.success = false;
    result.error = error.message;
    result.freshnessScore = 0; // Can't determine
  }

  return result;
}

/**
 * Batch analyze multiple websites
 */
export async function analyzeWebsiteFreshnessBatch(companies) {
  const results = [];

  for (const company of companies) {
    const result = await analyzeWebsiteFreshness(company.website);
    results.push(result);

    // Rate limiting: wait 1-2 seconds between requests
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
  }

  return results;
}

/**
 * Determine signal importance
 * Outdated website is POSITIVE for PR services (they need help)
 */
export function getWebsiteFreshnessSignal(analysis) {
  if (!analysis.success) return 0;

  let signal = 0;

  // +5 if outdated (good signal for PR/marketing services)
  if (analysis.isOutdated) {
    signal += 5;
  }

  // +2 if hasn't been updated in 6+ months
  if (analysis.lastModified && analysis.lastModified.daysSince >= 180) {
    signal += 2;
  }

  // +3 if using very outdated frameworks (Bootstrap 2/3, jQuery heavy)
  if (analysis.designFramework.outdatedScore > 4) {
    signal += 3;
  }

  return Math.min(signal, 8);
}
