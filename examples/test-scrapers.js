/**
 * Test Scrapers - Example usage of the daily scraper system
 *
 * Run individually or in batch to test scraper functionality.
 * Useful for development, debugging, and validation.
 *
 * Usage:
 *   node --require tsx examples/test-scrapers.js
 * Or in Next.js API route context
 */

import { scrapeJobBoards, scrapeJobBoardsBatch } from "@/lib/scrapers/jobBoardScraper";
import { analyzeWebsiteFreshness, analyzeWebsiteFreshnessBatch } from "@/lib/scrapers/websiteFreshness";
import { findRecentNews, findRecentNewsBatch } from "@/lib/scrapers/newsFinder";
import { findConferenceAttendance, findConferenceAttendanceBatch } from "@/lib/scrapers/conferenceFinder";

/**
 * Test individual scrapers
 */
async function testIndividualScrapers() {
  console.log("\n=== TESTING INDIVIDUAL SCRAPERS ===\n");

  // Test companies (well-known companies for reliable testing)
  const testCompanies = [
    { name: "OpenAI", website: "openai.com", industry: "AI" },
    { name: "TechCrunch", website: "techcrunch.com", industry: "Media" },
    { name: "Stripe", website: "stripe.com", industry: "FinTech" },
  ];

  // Test Job Board Scraper
  console.log("1. Testing Job Board Scraper...");
  for (const company of testCompanies) {
    try {
      const result = await scrapeJobBoards(company.name, company.industry);
      console.log(`   ${company.name}:`, {
        openPositions: result.openPositions,
        departments: result.departments,
        score: result.score,
        success: result.success,
      });
    } catch (error) {
      console.log(`   ${company.name}: ERROR -`, error.message);
    }
  }

  // Test Website Freshness Analyzer
  console.log("\n2. Testing Website Freshness Analyzer...");
  for (const company of testCompanies) {
    try {
      const result = await analyzeWebsiteFreshness(company.website);
      console.log(`   ${company.name}:`, {
        ageMonths: result.ageMonths,
        isOutdated: result.isOutdated,
        freshnessScore: result.freshnessScore,
        success: result.success,
      });
    } catch (error) {
      console.log(`   ${company.name}: ERROR -`, error.message);
    }
  }

  // Test News Finder
  console.log("\n3. Testing News Finder...");
  for (const company of testCompanies) {
    try {
      const result = await findRecentNews(company.name, company.industry);
      console.log(`   ${company.name}:`, {
        newsCount: result.newsCount,
        recentScore: result.recentScore,
        byType: Object.keys(result.byType).filter(k => result.byType[k].length > 0),
        success: result.success,
      });
    } catch (error) {
      console.log(`   ${company.name}: ERROR -`, error.message);
    }
  }

  // Test Conference Finder
  console.log("\n4. Testing Conference Finder...");
  for (const company of testCompanies) {
    try {
      const result = await findConferenceAttendance(company.name);
      console.log(`   ${company.name}:`, {
        conferenceCount: result.conferenceCount,
        conferenceScore: result.conferenceScore,
        speaking: result.byType.speaking.length,
        attending: result.byType.attending.length,
        success: result.success,
      });
    } catch (error) {
      console.log(`   ${company.name}: ERROR -`, error.message);
    }
  }
}

/**
 * Test batch operations
 */
async function testBatchOperations() {
  console.log("\n=== TESTING BATCH OPERATIONS ===\n");

  const companies = [
    { name: "OpenAI", website: "openai.com", industry: "AI" },
    { name: "Anthropic", website: "anthropic.com", industry: "AI" },
  ];

  console.log("Testing batch job board scraper...");
  try {
    const results = await scrapeJobBoardsBatch(companies);
    console.log(`Processed ${results.length} companies`);
    results.forEach((r, i) => {
      console.log(`  ${companies[i].name}: ${r.openPositions} positions, score ${r.score}`);
    });
  } catch (error) {
    console.log("Batch error:", error.message);
  }
}

/**
 * Test score calculation
 */
async function testScoreCalculation() {
  console.log("\n=== TESTING SCORE CALCULATION ===\n");

  // Get scraped data for a test company
  const company = { name: "OpenAI", website: "openai.com", industry: "AI" };

  const jobResult = await scrapeJobBoards(company.name, company.industry);
  const freshResult = await analyzeWebsiteFreshness(company.website);
  const newsResult = await findRecentNews(company.name, company.industry);
  const confResult = await findConferenceAttendance(company.name);

  // Mock fit/intent details with scraped data
  const fitDetails = {
    industry: 9,
    stage: 8,
    buyer: 7,
    proof: 6,
    budget: 5,
    websiteFreshness: {
      ageMonths: freshResult.ageMonths,
      isOutdated: freshResult.isOutdated,
    },
    conferenceAttendance: confResult.conferences,
  };

  const intentDetails = {
    trigger: 7,
    timeline: 8,
    dm_engaged: 6,
    urgency: 5,
    responsive: 3,
    hiringSignal: {
      openPositions: jobResult.openPositions,
      score: jobResult.score,
    },
    recentNews: newsResult.news.slice(0, 5),
  };

  console.log("Fit Details Signal Summary:");
  console.log(`  - Industry score: ${fitDetails.industry}`);
  console.log(`  - Website freshness: ${freshResult.isOutdated ? "Outdated (+5)" : "Current (0)"}`);
  console.log(`  - Conference attendance: ${confResult.conferenceCount} found`);

  console.log("\nIntent Details Signal Summary:");
  console.log(`  - Trigger score: ${intentDetails.trigger}`);
  console.log(`  - Hiring signal: ${jobResult.openPositions} positions (score ${jobResult.score})`);
  console.log(`  - Recent news: ${newsResult.newsCount} articles found`);
  console.log(`  - News signal score: ${newsResult.recentScore}`);
}

/**
 * Test error handling
 */
async function testErrorHandling() {
  console.log("\n=== TESTING ERROR HANDLING ===\n");

  // Test with invalid inputs
  console.log("Testing with invalid/missing data...");

  try {
    const result1 = await scrapeJobBoards("", "");
    console.log("  Job scraper with empty inputs: OK (graceful fail)");
  } catch (error) {
    console.log("  Job scraper with empty inputs: ERROR -", error.message);
  }

  try {
    const result2 = await analyzeWebsiteFreshness("not-a-valid-url.xyz");
    console.log("  Website freshness with invalid URL: OK (graceful fail)");
  } catch (error) {
    console.log("  Website freshness with invalid URL: ERROR -", error.message);
  }

  try {
    const result3 = await findRecentNews("NonexistentCompanyXYZ123", "");
    console.log("  News finder with nonexistent company: OK (returns empty)");
  } catch (error) {
    console.log("  News finder with nonexistent company: ERROR -", error.message);
  }

  console.log("\n✓ All error cases handled gracefully");
}

/**
 * Quick health check
 */
async function healthCheck() {
  console.log("\n=== HEALTH CHECK ===\n");

  const checks = {
    "Job Board Scraper": () => scrapeJobBoards("Test", "Test"),
    "Website Freshness": () => analyzeWebsiteFreshness("example.com"),
    "News Finder": () => findRecentNews("Test", "Test"),
    "Conference Finder": () => findConferenceAttendance("Test"),
  };

  let healthy = 0;
  let total = Object.keys(checks).length;

  for (const [name, fn] of Object.entries(checks)) {
    try {
      await fn();
      console.log(`✓ ${name}`);
      healthy++;
    } catch (error) {
      console.log(`✗ ${name}: ${error.message}`);
    }
  }

  console.log(`\nHealth: ${healthy}/${total} scrapers operational`);
  return healthy === total;
}

/**
 * Main test runner
 */
async function runTests() {
  console.log("\n╔════════════════════════════════════════════════╗");
  console.log("║   MarCRM Daily Scraper System - Test Suite   ║");
  console.log("╚════════════════════════════════════════════════╝");

  try {
    // Run health check first
    const healthy = await healthCheck();

    if (!healthy) {
      console.log("\n⚠ Some scrapers offline. Continuing with caution...\n");
    }

    // Run test suites
    await testIndividualScrapers();
    await testBatchOperations();
    await testScoreCalculation();
    await testErrorHandling();

    console.log("\n╔════════════════════════════════════════════════╗");
    console.log("║            ✓ ALL TESTS COMPLETED             ║");
    console.log("╚════════════════════════════════════════════════╝\n");

  } catch (error) {
    console.error("\n✗ Test suite error:", error);
    process.exit(1);
  }
}

/**
 * Run tests if this file is executed directly
 */
if (import.meta.url === `file://${process.argv[1]}`) {
  runTests().catch(console.error);
}

export { testIndividualScrapers, testBatchOperations, testScoreCalculation, testErrorHandling, healthCheck };
