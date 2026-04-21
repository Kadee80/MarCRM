// Standalone runner replicating POST /api/daily-scrape
// This avoids needing the Next.js dev server.

import { PrismaClient } from "@prisma/client";
import { scrapeJobBoards } from "../src/lib/scrapers/jobBoardScraper.js";
import { analyzeWebsiteFreshness } from "../src/lib/scrapers/websiteFreshness.js";
import { findRecentNews } from "../src/lib/scrapers/newsFinder.js";
import { findConferenceAttendance } from "../src/lib/scrapers/conferenceFinder.js";

const prisma = new PrismaClient();

function recalculateFitScore(fitDetails) {
  let score = 0;
  let maxScore = 0;
  const originalScore = fitDetails.industry || 0;
  score += originalScore;
  maxScore += 10;
  if (fitDetails.websiteFreshness?.isOutdated) score += 5;
  maxScore += 5;
  if (fitDetails.conferenceAttendance && fitDetails.conferenceAttendance.length > 0) {
    const hasSpeaking = fitDetails.conferenceAttendance.some((c) => c.type === "speaking");
    const hasAttending = fitDetails.conferenceAttendance.some((c) => c.type === "attending");
    if (hasSpeaking) score += 8;
    else if (hasAttending) score += 5;
  }
  maxScore += 8;
  return Math.min(Math.round((score / (maxScore / 10)) * 10), 40);
}

function recalculateIntentScore(intentDetails) {
  let score = 0;
  let maxScore = 0;
  const originalScore = (intentDetails.trigger || 0) + (intentDetails.timeline || 0);
  score += originalScore;
  maxScore += 25;
  if (intentDetails.hiringSignal) score += intentDetails.hiringSignal.score || 0;
  maxScore += 10;
  if (intentDetails.recentNews && intentDetails.recentNews.length > 0) {
    const hasLaunch = intentDetails.recentNews.some((n) => n.type === "product_launch");
    const hasFunding = intentDetails.recentNews.some(
      (n) => n.type === "funding" || n.type === "expansion" || n.type === "rebrand"
    );
    if (hasLaunch) score += 8;
    else if (hasFunding) score += 5;
  }
  maxScore += 8;
  return Math.min(Math.round((score / (maxScore / 10)) * 10), 45);
}

function mergeScraperData(fitDetails, intentDetails, scraperResults) {
  const updated = { fitDetails: { ...fitDetails }, intentDetails: { ...intentDetails } };
  if (scraperResults.jobBoards?.success) {
    updated.intentDetails.hiringSignal = {
      openPositions: scraperResults.jobBoards.openPositions,
      departments: scraperResults.jobBoards.departments,
      jobTitles: scraperResults.jobBoards.jobTitles,
      score: scraperResults.jobBoards.score,
      timestamp: scraperResults.jobBoards.timestamp,
    };
  }
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
  if (scraperResults.news?.success) {
    updated.intentDetails.recentNews = scraperResults.news.news.slice(0, 5);
    updated.intentDetails.newsScore = scraperResults.news.recentScore;
    updated.intentDetails.newsTimestamp = scraperResults.news.timestamp;
  }
  if (scraperResults.conferences?.success) {
    updated.fitDetails.conferenceAttendance = scraperResults.conferences.conferences;
    updated.fitDetails.conferenceScore = scraperResults.conferences.conferenceScore;
    updated.fitDetails.conferenceTimestamp = scraperResults.conferences.timestamp;
  }
  return updated;
}

async function main() {
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
    topGrowthCompanies: [],
    outdatedWebsites: [],
    recentLaunches: [],
    timestamp: new Date().toISOString(),
  };

  const activeStages = ["Targeted", "Contacted", "Engaged", "Qualified"];
  const companies = await prisma.company.findMany({
    where: { stage: { in: activeStages } },
  });
  results.summary.totalCompanies = companies.length;

  console.log(`[DailyScrape] Starting scrape of ${companies.length} companies`);

  for (const company of companies) {
    results.processed++;
    try {
      const fitDetails = JSON.parse(company.fitDetails || "{}");
      const intentDetails = JSON.parse(company.intentDetails || "{}");

      const [jobResults, websiteResults, newsResults, conferenceResults] = await Promise.all([
        scrapeJobBoards(company.name, company.industry),
        analyzeWebsiteFreshness(company.website),
        findRecentNews(company.name, company.industry),
        findConferenceAttendance(company.name, ""),
      ]);

      const scraperResults = {
        jobBoards: jobResults,
        websiteFreshness: websiteResults,
        news: newsResults,
        conferences: conferenceResults,
      };

      const merged = mergeScraperData(fitDetails, intentDetails, scraperResults);
      const newFitScore = recalculateFitScore(merged.fitDetails);
      const newIntentScore = recalculateIntentScore(merged.intentDetails);

      await prisma.company.update({
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

      const openPos = jobResults?.openPositions || 0;
      const newsCount = newsResults?.newsCount || 0;
      const confCount = conferenceResults?.conferenceCount || 0;

      if (openPos >= 5) results.summary.newHiringSignals++;
      if (websiteResults?.isOutdated) {
        results.summary.newOutdatedWebsites++;
        results.outdatedWebsites.push({
          name: company.name,
          website: company.website,
          ageMonths: websiteResults.ageMonths,
          freshnessScore: websiteResults.freshnessScore,
        });
      }
      if (newsCount > 0) {
        results.summary.newNewsFound++;
        const launches = (newsResults.news || []).filter(
          (n) => n.type === "product_launch" || n.type === "funding" || n.type === "expansion"
        );
        for (const l of launches.slice(0, 2)) {
          results.recentLaunches.push({ company: company.name, type: l.type, title: l.title });
        }
      }
      if (confCount > 0) results.summary.newConferences++;

      // growth signal composite for ranking
      const growthScore =
        openPos * 2 +
        (newsResults?.recentScore || 0) +
        (conferenceResults?.conferenceScore || 0) +
        (websiteResults?.isOutdated ? 5 : 0);

      results.topGrowthCompanies.push({
        name: company.name,
        pipeline: company.pipeline,
        fitScore: newFitScore,
        intentScore: newIntentScore,
        openPositions: openPos,
        newsCount,
        confCount,
        outdated: !!websiteResults?.isOutdated,
        growthScore,
      });

      if (!results.summary.byPipeline[company.pipeline]) {
        results.summary.byPipeline[company.pipeline] = { updated: 0, processed: 0 };
      }
      results.summary.byPipeline[company.pipeline].updated++;
      results.summary.byPipeline[company.pipeline].processed++;

      console.log(
        `[DailyScrape] ✓ ${company.name}: fit=${newFitScore}, intent=${newIntentScore}, jobs=${openPos}, news=${newsCount}, conf=${confCount}`
      );
    } catch (error) {
      results.failures.push({
        companyId: company.id,
        companyName: company.name,
        error: error.message,
      });
      console.error(`[DailyScrape] ✗ ${company.name}: ${error.message}`);
      if (!results.summary.byPipeline[company.pipeline]) {
        results.summary.byPipeline[company.pipeline] = { updated: 0, processed: 0 };
      }
      results.summary.byPipeline[company.pipeline].processed++;
    }
  }

  results.topGrowthCompanies.sort((a, b) => b.growthScore - a.growthScore);
  results.topGrowthCompanies = results.topGrowthCompanies.slice(0, 10);

  const duration = Math.round((Date.now() - startTime) / 1000);
  results.summary.duration = `${duration}s`;
  results.summary.message = `Processed ${results.processed} companies, updated ${results.updated}`;

  console.log("\n=== RESULT SUMMARY ===");
  console.log(JSON.stringify(results, null, 2));

  await prisma.$disconnect();
  return results;
}

main().catch(async (e) => {
  console.error("Fatal error:", e);
  await prisma.$disconnect();
  process.exit(1);
});
