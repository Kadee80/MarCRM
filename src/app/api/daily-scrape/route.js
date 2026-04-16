import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { scrapeJobBoards } from "@/lib/scrapers/jobBoardScraper";
import { analyzeWebsiteFreshness, getWebsiteFreshnessSignal } from "@/lib/scrapers/websiteFreshness";
import { findRecentNews, getNewsSignalScore } from "@/lib/scrapers/newsFinder";
import { findConferenceAttendance, getConferenceSignalScore } from "@/lib/scrapers/conferenceFinder";

/**
 * Daily Scrape Endpoint
 * POST /api/daily-scrape
 *
 * Runs automated scraping on companies in active pipelines:
 * 1. Job board scraper → hiring signals
 * 2. Website freshness → design/age signals
 * 3. News finder → launch/expansion signals
 * 4. Conference finder → conference signals
 *
 * Updates company fitScore/intentScore with new data
 */

/**
 * Recalculate fit score based on new signals
 */
function recalculateFitScore(fitDetails, weights = {}) {
  let score = 0;
  let maxScore = 0;

  // Original fit criteria (assume already scored)
  const originalScore = fitDetails.industry || 0;
  score += originalScore;
  maxScore += 10;

  // Website freshness signal (+5 if outdated)
  if (fitDetails.websiteFreshness?.isOutdated) {
    score += 5;
  }
  maxScore += 5;

  // Conference attendance (+8 if speaking, +5 if attending)
  if (fitDetails.conferenceAttendance && fitDetails.conferenceAttendance.length > 0) {
    const hasSpeaking = fitDetails.conferenceAttendance.some(c => c.type === "speaking");
    const hasAttending = fitDetails.conferenceAttendance.some(c => c.type === "attending");

    if (hasSpeaking) score += 8;
    else if (hasAttending) score += 5;
  }
  maxScore += 8;

  // Cap at reasonable total
  return Math.min(Math.round((score / (maxScore / 10)) * 10), 40);
}

/**
 * Recalculate intent score based on new signals
 */
function recalculateIntentScore(intentDetails, weights = {}) {
  let score = 0;
  let maxScore = 0;

  // Original intent criteria
  const originalScore = (intentDetails.trigger || 0) + (intentDetails.timeline || 0);
  score += originalScore;
  maxScore += 25;

  // Hiring signal (+10 if 5+ positions, +5 if velocity increasing)
  if (intentDetails.hiringSignal) {
    score += intentDetails.hiringSignal.score || 0;
  }
  maxScore += 10;

  // Recent news (+8 if product launch, +5 if funding/expansion)
  if (intentDetails.recentNews && intentDetails.recentNews.length > 0) {
    const hasLaunch = intentDetails.recentNews.some(n => n.type === "product_launch");
    const hasFunding = intentDetails.recentNews.some(n =>
      n.type === "funding" || n.type === "expansion" || n.type === "rebrand"
    );

    if (hasLaunch) score += 8;
    else if (hasFunding) score += 5;
  }
  maxScore += 8;

  return Math.min(Math.round((score / (maxScore / 10)) * 10), 45);
}

/**
 * Merge new scraper data with existing details
 */
function mergeScraperData(fitDetails, intentDetails, scraperResults) {
  const updated = {
    fitDetails: { ...fitDetails },
    intentDetails: { ...intentDetails },
  };

  // Add job board data to intent
  if (scraperResults.jobBoards?.success) {
    updated.intentDetails.hiringSignal = {
      openPositions: scraperResults.jobBoards.openPositions,
      departments: scraperResults.jobBoards.departments,
      jobTitles: scraperResults.jobBoards.jobTitles,
      score: scraperResults.jobBoards.score,
      timestamp: scraperResults.jobBoards.timestamp,
    };
  }

  // Add website freshness to fit
  if (scraperResults.websiteFreshness?.success) {
    updated.fitDetails.websiteFreshness = {
      ageMonths: scraperResults.websiteFreshness.ageMonths,
      isOutdated: scraperResults.websiteFreshness.isOutdated,
      freshnessScore: scraperResults.websiteFreshness.freshnessScore,
      designFramework: scraperResults.websiteFreshness.designFramework,
      analysis: scraperResults.websiteFreshness.analysis,
      timestamp: scraperResults.websiteFreshness.timestamp,
    };
  }

  // Add news to intent
  if (scraperResults.news?.success) {
    updated.intentDetails.recentNews = scraperResults.news.news.slice(0, 5);
    updated.intentDetails.newsScore = scraperResults.news.recentScore;
    updated.intentDetails.newsTimestamp = scraperResults.news.timestamp;
  }

  // Add conference to fit
  if (scraperResults.conferences?.success) {
    updated.fitDetails.conferenceAttendance = scraperResults.conferences.conferences;
    updated.fitDetails.conferenceScore = scraperResults.conferences.conferenceScore;
    updated.fitDetails.conferenceTimestamp = scraperResults.conferences.timestamp;
  }

  return updated;
}

/**
 * Main POST handler
 */
export async function POST(request) {
  const startTime = Date.now();
  const results = {
    success: true,
    updated: 0,
    processed: 0,
    failures: [],
    summary: {
      totalCompanies: 0,
      byPipeline: {},
      newHiringSignals: 0,
      newOutdatedWebsites: 0,
      newNewsFound: 0,
      newConferences: 0,
    },
    timestamp: new Date().toISOString(),
  };

  try {
    // Get all companies in active stages (Targeted, Contacted, Engaged, Qualified)
    const activeStages = ["Targeted", "Contacted", "Engaged", "Qualified"];
    const companies = await prisma.company.findMany({
      where: {
        stage: { in: activeStages },
      },
    });

    results.summary.totalCompanies = companies.length;

    console.log(`[DailyScrape] Starting scrape of ${companies.length} companies`);

    // Process each company
    for (const company of companies) {
      results.processed++;

      try {
        // Parse existing JSON details
        const fitDetails = JSON.parse(company.fitDetails || "{}");
        const intentDetails = JSON.parse(company.intentDetails || "{}");

        console.log(`[DailyScrape] Processing: ${company.name}`);

        // Run all scrapers in parallel
        const [jobResults, websiteResults, newsResults, conferenceResults] = await Promise.all([
          scrapeJobBoards(company.name, company.industry),
          analyzeWebsiteFreshness(company.website),
          findRecentNews(company.name, company.industry),
          findConferenceAttendance(company.name, ""),
        ]);

        // Merge new data with existing
        const scraperResults = {
          jobBoards: jobResults,
          websiteFreshness: websiteResults,
          news: newsResults,
          conferences: conferenceResults,
        };

        const merged = mergeScraperData(fitDetails, intentDetails, scraperResults);

        // Recalculate scores
        const newFitScore = recalculateFitScore(merged.fitDetails);
        const newIntentScore = recalculateIntentScore(merged.intentDetails);

        // Update company in database
        const updated = await prisma.company.update({
          where: { id: company.id },
          data: {
            fitScore: newFitScore,
            intentScore: newIntentScore,
            fitDetails: JSON.stringify(merged.fitDetails),
            intentDetails: JSON.stringify(merged.intentDetails),
            lastActivity: new Date().toISOString().split("T")[0],
          },
        });

        results.updated++;

        // Track what was found
        if (jobResults.openPositions >= 5) results.summary.newHiringSignals++;
        if (websiteResults.isOutdated) results.summary.newOutdatedWebsites++;
        if (newsResults.newsCount > 0) results.summary.newNewsFound++;
        if (conferenceResults.conferenceCount > 0) results.summary.newConferences++;

        // Track by pipeline
        if (!results.summary.byPipeline[company.pipeline]) {
          results.summary.byPipeline[company.pipeline] = { updated: 0, processed: 0 };
        }
        results.summary.byPipeline[company.pipeline].updated++;
        results.summary.byPipeline[company.pipeline].processed++;

        console.log(`[DailyScrape] ✓ Updated ${company.name}: fit=${newFitScore}, intent=${newIntentScore}`);

      } catch (error) {
        results.failures.push({
          companyId: company.id,
          companyName: company.name,
          error: error.message,
        });

        console.error(`[DailyScrape] ✗ Error processing ${company.name}:`, error.message);

        // Track pipeline failure
        if (!results.summary.byPipeline[company.pipeline]) {
          results.summary.byPipeline[company.pipeline] = { updated: 0, processed: 0 };
        }
        results.summary.byPipeline[company.pipeline].processed++;
      }
    }

    const duration = Math.round((Date.now() - startTime) / 1000);

    results.summary.duration = `${duration}s`;
    results.summary.message = `Processed ${results.processed} companies, updated ${results.updated}`;

    console.log(`[DailyScrape] Complete: ${results.summary.message}`);

    return NextResponse.json(results);

  } catch (error) {
    console.error("[DailyScrape] Fatal error:", error);
    results.success = false;
    results.error = error.message;
    return NextResponse.json(results, { status: 500 });
  }
}

/**
 * GET handler - returns last scrape results and status
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const companyId = searchParams.get("companyId");

  try {
    if (companyId) {
      // Get specific company's latest scrape data
      const company = await prisma.company.findUnique({
        where: { id: parseInt(companyId) },
      });

      if (!company) {
        return NextResponse.json({ error: "Company not found" }, { status: 404 });
      }

      const fitDetails = JSON.parse(company.fitDetails || "{}");
      const intentDetails = JSON.parse(company.intentDetails || "{}");

      return NextResponse.json({
        company: {
          id: company.id,
          name: company.name,
          fitScore: company.fitScore,
          intentScore: company.intentScore,
          lastActivity: company.lastActivity,
        },
        scrapedData: {
          fit: {
            websiteFreshness: fitDetails.websiteFreshness,
            conferenceAttendance: fitDetails.conferenceAttendance,
          },
          intent: {
            hiringSignal: intentDetails.hiringSignal,
            recentNews: intentDetails.recentNews,
          },
        },
      });
    }

    // Get overview stats
    const companies = await prisma.company.findMany({
      select: { id: true, name: true, fitScore: true, intentScore: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
      take: 20,
    });

    return NextResponse.json({
      status: "ok",
      lastUpdated: new Date().toISOString(),
      recentCompanies: companies,
    });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
