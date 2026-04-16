import axios from "axios";

/**
 * News Finder
 * Finds recent news, product launches, funding (last 90 days)
 * Uses NewsAPI and other sources
 */

const NEWS_SOURCES = {
  techcrunch: "TechCrunch",
  forbes: "Forbes",
  bloomberg: "Bloomberg",
  cnbc: "CNBC",
  "business-insider": "Business Insider",
  venturebeat: "VentureBeat",
  "the-next-web": "The Next Web",
  "product-hunt": "Product Hunt",
};

// NewsAPI endpoint - uses free tier (500/month)
const NEWS_API_KEY = process.env.NEWS_API_KEY || "";
const NEWS_API_BASE = "https://newsapi.org/v2";

const BROWSER_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
};

/**
 * Classify news by type based on keywords
 */
function classifyNewsType(title, description) {
  const text = `${title} ${description}`.toLowerCase();

  if (
    text.includes("launch") ||
    text.includes("launched") ||
    text.includes("releasing") ||
    text.includes("new product") ||
    text.includes("introduce")
  ) {
    return "product_launch";
  }

  if (
    text.includes("funding") ||
    text.includes("raised") ||
    text.includes("series") ||
    text.includes("seed") ||
    text.includes("investor") ||
    text.includes("investment")
  ) {
    return "funding";
  }

  if (
    text.includes("expansion") ||
    text.includes("expanding") ||
    text.includes("new market") ||
    text.includes("new office") ||
    text.includes("new location") ||
    text.includes("grew") ||
    text.includes("growth")
  ) {
    return "expansion";
  }

  if (
    text.includes("rebrand") ||
    text.includes("rebranding") ||
    text.includes("new name") ||
    text.includes("rebrand") ||
    text.includes("identity")
  ) {
    return "rebrand";
  }

  if (
    text.includes("acquisition") ||
    text.includes("acquired") ||
    text.includes("merger") ||
    text.includes("merged") ||
    text.includes("merged with")
  ) {
    return "acquisition";
  }

  if (
    text.includes("partnership") ||
    text.includes("partnered") ||
    text.includes("collaborate") ||
    text.includes("collaboration")
  ) {
    return "partnership";
  }

  return "general_news";
}

/**
 * Search NewsAPI for company mentions
 */
async function searchNewsAPI(companyName) {
  if (!NEWS_API_KEY) {
    console.log("[NewsFinder] NEWS_API_KEY not set, skipping NewsAPI search");
    return [];
  }

  try {
    const queries = [
      `"${companyName}" product launch`,
      `"${companyName}" funding`,
      `"${companyName}" expansion`,
    ];

    let allArticles = [];

    for (const query of queries) {
      try {
        const response = await axios.get(`${NEWS_API_BASE}/everything`, {
          params: {
            q: query,
            sortBy: "publishedAt",
            language: "en",
            pageSize: 10,
            apiKey: NEWS_API_KEY,
          },
          timeout: 5000,
          headers: BROWSER_HEADERS,
        });

        if (response.data.articles) {
          allArticles.push(...response.data.articles);
        }
      } catch (error) {
        console.error(`[NewsFinder] NewsAPI search failed for "${query}":`, error.message);
      }
    }

    // Deduplicate by title
    const uniqueArticles = [];
    const seenTitles = new Set();

    for (const article of allArticles) {
      if (!seenTitles.has(article.title)) {
        seenTitles.add(article.title);
        uniqueArticles.push(article);
      }
    }

    return uniqueArticles;
  } catch (error) {
    console.error("[NewsFinder] NewsAPI error:", error.message);
    return [];
  }
}

/**
 * Search LinkedIn company page for announcements
 * Note: This is a placeholder as LinkedIn blocks scrapers
 */
async function searchLinkedInCompany(linkedInUrl) {
  try {
    console.log(`[NewsFinder] Would search LinkedIn company: ${linkedInUrl}`);
    // In production, would use LinkedIn API or scraping with proper auth
    return [];
  } catch (error) {
    console.error("[NewsFinder] LinkedIn search error:", error.message);
    return [];
  }
}

/**
 * Search for press releases from company website
 */
async function searchCompanyPressReleases(website) {
  try {
    const pressUrls = [
      `${website}/press`,
      `${website}/press-releases`,
      `${website}/news`,
      `${website}/blog`,
    ];

    // Note: Full scraping would require proper HTML parsing
    // For now, we return placeholder structure

    return [];
  } catch (error) {
    console.error("[NewsFinder] Press release search error:", error.message);
    return [];
  }
}

/**
 * Filter articles from last N days
 */
function filterByRecency(articles, days = 90) {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  return articles.filter(article => {
    const publishDate = new Date(article.publishedAt || article.date);
    return publishDate >= cutoffDate;
  });
}

/**
 * Main news finder function
 */
export async function findRecentNews(companyName, industry = "", linkedInUrl = "") {
  const result = {
    companyName,
    industry,
    timestamp: new Date().toISOString(),
    news: [],
    newsCount: 0,
    byType: {},
    recentScore: 0,
    success: false,
    error: null,
    sources: [],
  };

  try {
    // Search multiple news sources
    const newsAPIArticles = await searchNewsAPI(companyName);
    const linkedInNews = await searchLinkedInCompany(linkedInUrl);
    const pressReleases = await searchCompanyPressReleases("");

    // Combine and filter by recency (last 90 days)
    const allNews = [
      ...newsAPIArticles,
      ...linkedInNews,
      ...pressReleases,
    ];

    const recentNews = filterByRecency(allNews, 90);

    // Transform articles to our format
    result.news = recentNews.map(article => {
      const type = classifyNewsType(
        article.title || "",
        article.description || article.summary || ""
      );

      return {
        date: article.publishedAt || article.date || new Date().toISOString(),
        type,
        title: article.title || "",
        description: article.description || article.summary || "",
        source: article.source?.name || "Unknown",
        url: article.url || "",
        image: article.urlToImage || article.image || "",
      };
    });

    // Categorize by type
    const byType = {};
    result.news.forEach(article => {
      if (!byType[article.type]) {
        byType[article.type] = [];
      }
      byType[article.type].push(article);
    });
    result.byType = byType;

    result.newsCount = result.news.length;
    result.success = true;

    // Calculate intent signal
    // +8 if product launch in 90 days
    // +5 if funding/expansion
    let score = 0;
    if (byType.product_launch && byType.product_launch.length > 0) {
      score += 8;
    }
    if ((byType.funding || byType.expansion || byType.rebrand) &&
        (byType.funding?.length || 0) + (byType.expansion?.length || 0) + (byType.rebrand?.length || 0) > 0) {
      score += 5;
    }
    if (byType.acquisition || byType.partnership) {
      score += 3;
    }

    result.recentScore = Math.min(score, 10);

    // Track sources used
    if (newsAPIArticles.length > 0) result.sources.push("NewsAPI");
    if (linkedInNews.length > 0) result.sources.push("LinkedIn");
    if (pressReleases.length > 0) result.sources.push("Company Site");

  } catch (error) {
    result.success = false;
    result.error = error.message;
    result.recentScore = 0;
  }

  return result;
}

/**
 * Batch search for news on multiple companies
 */
export async function findRecentNewsBatch(companies) {
  const results = [];

  for (const company of companies) {
    const result = await findRecentNews(
      company.name,
      company.industry,
      company.linkedinUrl || ""
    );
    results.push(result);

    // Rate limiting: wait 1-2 seconds between requests
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
  }

  return results;
}

/**
 * Get signal value for news (for scoring)
 */
export function getNewsSignalScore(newsResult) {
  if (!newsResult.success) return 0;

  return newsResult.recentScore;
}

/**
 * Format news for display/storage
 */
export function formatNewsForStorage(newsResult) {
  return {
    newsCount: newsResult.newsCount,
    recentScore: newsResult.recentScore,
    byType: newsResult.byType,
    lastSearched: newsResult.timestamp,
    topHeadlines: newsResult.news.slice(0, 5), // Store top 5
  };
}
