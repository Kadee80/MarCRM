# Daily Scraper System - Integration Guide

## Quick Start

### 1. Verify Dependencies

All required dependencies are already in `package.json`:
- `axios` - HTTP requests
- `cheerio` - HTML parsing
- `prisma` - Database ORM

No additional npm install needed.

### 2. Set Environment Variables (Optional)

For enhanced news detection, add to `.env.local`:

```env
# NewsAPI.org free tier (optional, 500/month)
NEWS_API_KEY=your_newsapi_org_key
```

**Note**: System works without this key; news detection just returns fewer results.

### 3. Test Individual Scrapers

Run these in a Node environment or create test files:

```javascript
// test-scrapers.js
import { scrapeJobBoards } from "@/lib/scrapers/jobBoardScraper";
import { analyzeWebsiteFreshness } from "@/lib/scrapers/websiteFreshness";
import { findRecentNews } from "@/lib/scrapers/newsFinder";
import { findConferenceAttendance } from "@/lib/scrapers/conferenceFinder";

async function test() {
  console.log("Testing Job Board Scraper...");
  const jobs = await scrapeJobBoards("OpenAI", "AI");
  console.log("Jobs result:", jobs);

  console.log("\nTesting Website Freshness...");
  const fresh = await analyzeWebsiteFreshness("openai.com");
  console.log("Freshness result:", fresh);

  console.log("\nTesting News Finder...");
  const news = await findRecentNews("OpenAI", "AI");
  console.log("News result:", news);

  console.log("\nTesting Conference Finder...");
  const conf = await findConferenceAttendance("OpenAI");
  console.log("Conference result:", conf);
}

test().catch(console.error);
```

### 4. Trigger Daily Scrape

**Manually via API:**
```bash
curl -X POST http://localhost:3000/api/daily-scrape
```

**Check results:**
```bash
curl http://localhost:3000/api/daily-scrape?companyId=123
```

### 5. Schedule with Cron (Production)

Add to your deployment environment (Vercel, Railway, etc.):

```bash
# Run daily at 2 AM
0 2 * * * curl -X POST https://your-domain.com/api/daily-scrape
```

Or use a dedicated cron service (cron-job.org, EasyCron, etc.).

## Architecture

### Data Flow

```
Daily Scrape Endpoint (route.js)
  ├─> Fetch active companies from DB
  ├─> For each company, run parallel:
  │   ├─> Job Board Scraper
  │   ├─> Website Freshness Analyzer
  │   ├─> News Finder
  │   └─> Conference Finder
  ├─> Merge scraped data into fitDetails/intentDetails
  ├─> Recalculate fitScore/intentScore
  └─> Update company record in DB
```

### Score Update Logic

**PR/Marketing Pipeline - Fit Score:**
```
Fit Score = base_score + signals
├─ Base: industry + stage + buyer + proof + budget (0-50)
├─ +5 if websiteFreshness.isOutdated (design refresh opportunity)
├─ +8 if speaking at industry conference
└─ +5 if attending industry conference
```

**PR/Marketing Pipeline - Intent Score:**
```
Intent Score = base_score + signals
├─ Base: trigger + timeline + dm_engaged + urgency + responsive (0-50)
├─ +10 if 5+ open Communications/PR/Marketing positions
├─ +5 if hiring velocity increasing
├─ +8 if product launch in 90 days
└─ +5 if funding/expansion/rebrand news
```

## Database Schema (Already Exists)

```prisma
model Company {
  // ... existing fields ...
  fitDetails    String    @default("{}")  // JSON with new signal data
  intentDetails String    @default("{}")  // JSON with new signal data
  lastActivity  String    @default("")    // Updated on each scrape
}
```

Example stored data:

```json
// fitDetails
{
  "industry": 9,
  "stage": 8,
  "buyer": 7,
  "proof": 6,
  "budget": 5,
  "websiteFreshness": {
    "ageMonths": 8,
    "isOutdated": false,
    "freshnessScore": 3
  },
  "conferenceAttendance": [
    {
      "conference": "AI Summit",
      "date": "2026-05-15",
      "type": "speaking"
    }
  ]
}

// intentDetails
{
  "trigger": 7,
  "timeline": 8,
  "dm_engaged": 6,
  "urgency": 5,
  "responsive": 3,
  "hiringSignal": {
    "openPositions": 12,
    "departments": ["Communications", "Marketing"],
    "score": 10
  },
  "recentNews": [
    {
      "date": "2026-04-10",
      "type": "product_launch",
      "title": "Company launches AI platform"
    }
  ]
}
```

## Integration with Existing Code

### Companies API (`/api/companies`)

No changes needed. Existing endpoints automatically parse the updated JSON:

```javascript
// Automatically handled
const company = await GET /api/companies?search=openai
// Returns with fitDetails and intentDetails parsed
```

### Company Scoring Page

Update score display to show source of points:

```javascript
// Example component update
const fitBreakdown = {
  industry: fitDetails.industry || 0,
  websiteFreshness: fitDetails.websiteFreshness?.isOutdated ? 5 : 0,
  conferenceAttendance: fitDetails.conferenceAttendance?.length > 0 ? 8 : 0,
  // ... etc
};
```

### Company List View

Add visual indicators for newly detected signals:

```javascript
// Show "✓ Hiring" if hiringSignal score > 5
// Show "✓ Outdated Website" if websiteFreshness.isOutdated
// Show "✓ News Found" if recentNews.length > 0
// Show "✓ Speaking" if conferenceAttendance.type === "speaking"
```

## Monitoring & Logging

Check logs for scraper health:

```javascript
// Logs are printed to console during scrape
[DailyScrape] Starting scrape of 45 companies
[DailyScrape] Processing: OpenAI
[DailyScrape] ✓ Updated OpenAI: fit=32, intent=38
[DailyScrape] Processing: TechCorp
[DailyScrape] ✗ Error processing TechCorp: Network timeout
[DailyScrape] Complete: Processed 45 companies, updated 42
```

API returns detailed failure log:

```json
{
  "updated": 42,
  "processed": 45,
  "failures": [
    {
      "companyId": 123,
      "companyName": "TechCorp",
      "error": "Network timeout"
    }
  ]
}
```

## Performance Metrics

Expected performance:

| Metric | Value | Notes |
|--------|-------|-------|
| Companies per run | 50+ | Sequential with 1-2s delays |
| Time per company | ~8-12 seconds | 4 parallel scrapers, 2-3s each |
| Total runtime | ~10 minutes | For 50 companies |
| Error rate | <5% | Network-dependent |
| Database updates | 100% | Even if scrapers fail |

## Optimization Opportunities

### Near-term (Easy)

1. **Cache results** - Don't re-scrape if scraped within last 24 hours
2. **Parallel batching** - Process companies in parallel (5-10 at a time)
3. **Targeted scrape** - Only scrape companies in "Targeted"/"Contacted" stages

### Medium-term (Moderate)

1. **Queue system** - Use Bull/Redis for background jobs
2. **Job board API** - Use official Indeed API instead of scraping
3. **NewsAPI caching** - Cache search results for 24 hours

### Long-term (Complex)

1. **Real-time signals** - Monitor LinkedIn/Twitter feeds continuously
2. **ML weighting** - Learn which signals correlate with closures
3. **Custom signals** - Industry-specific news sources and keywords

## Troubleshooting

### Scraper returns empty/error

1. **Check network connectivity** - Verify axios can reach external sites
2. **Check rate limiting** - Some sites block rapid requests
3. **Check headers** - User-Agent might be blocked
4. **Check timeout** - 10 second limit might be too short

### News finder returns no results

1. **Check NEWS_API_KEY** - Must be set in `.env.local`
2. **Check query** - Company name might be too common
3. **Check date range** - Only searches last 90 days
4. **Check API limit** - Free tier has 500/month limit

### Conference finder returns no results

1. **Check LinkedIn URL** - Need full LinkedIn company URL
2. **Check data sources** - LinkedIn scraping is blocked
3. **Check Twitter** - No Twitter handle provided
4. **Check website** - Company might not have /speaking page

### Scores not updating

1. **Check database connection** - Verify Prisma can connect
2. **Check company records** - Ensure companies exist
3. **Check stage filter** - Only updates "Targeted" stage companies
4. **Check logs** - Look for error messages

## Success Criteria Checklist

- [x] Job board scraper finds companies with open Communications/PR positions
- [x] Website freshness analyzer correctly identifies old/outdated sites
- [x] News finder detects product launches, funding, expansions
- [x] Conference finder identifies speaking/attendance
- [x] Daily scrape endpoint runs without errors
- [x] Scores update correctly based on new signals
- [x] Can run daily via cron job or manual endpoint call
- [x] Handles errors gracefully without crashing
- [x] Data persisted in fitDetails/intentDetails JSON
- [x] Backward compatible with existing scoring

## Next Steps

1. **Deploy scrapers** to production environment
2. **Configure cron job** for automatic daily runs (2 AM)
3. **Monitor first week** of runs for errors and performance
4. **Adjust weights** based on actual conversion data
5. **Add UI indicators** for newly detected signals
6. **Document** custom signals in company notes

## Support Resources

- Scraper module docs: `/src/lib/scrapers/README.md`
- Score calculation: `/src/lib/scoreCalculation.js`
- API endpoint: `/src/app/api/daily-scrape/route.js`
- Database schema: `/prisma/schema.prisma`
