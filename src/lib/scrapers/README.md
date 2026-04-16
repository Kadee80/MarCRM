# Daily Scraper System

Comprehensive scraping and signal detection system for MarCRM PR/Marketing pipeline scoring.

## Overview

The daily scraper system automatically enriches company data with signals that improve pipeline scoring:

1. **Job Board Scraper** - Detects hiring signals (5+ Communications/PR/Marketing positions = growth)
2. **Website Freshness** - Identifies outdated websites (6+ months old or old design = opportunity)
3. **News Finder** - Finds recent product launches, funding, expansion news (90-day window)
4. **Conference Finder** - Detects speaking/attendance at industry conferences (Northeast focus)

## Files

### Core Scrapers
- `jobBoardScraper.js` - Job board hunting (Indeed, CareerBuilder)
- `websiteFreshness.js` - Website age & design analysis
- `newsFinder.js` - Recent news detection (NewsAPI)
- `conferenceFinder.js` - Conference attendance detection

### API Endpoint
- `/src/app/api/daily-scrape/route.js` - Main POST/GET handler

### Utilities
- `/src/lib/scoreCalculation.js` - Centralized score calculation logic

## Usage

### Manual Trigger (Development)

```bash
curl -X POST http://localhost:3000/api/daily-scrape
```

### Scheduled (Cron Job)

The system is designed to be called by a cron job. Example setup:

```bash
# Run daily at 2 AM local time
0 2 * * * curl -X POST https://your-app.com/api/daily-scrape
```

### Programmatic

```javascript
import { scrapeJobBoards } from "@/lib/scrapers/jobBoardScraper";
import { analyzeWebsiteFreshness } from "@/lib/scrapers/websiteFreshness";
import { findRecentNews } from "@/lib/scrapers/newsFinder";
import { findConferenceAttendance } from "@/lib/scrapers/conferenceFinder";

// Run individual scrapers
const jobSignals = await scrapeJobBoards("CompanyName", "industry");
const websiteFreshness = await analyzeWebsiteFreshness("company.com");
const news = await findRecentNews("CompanyName", "industry");
const conferences = await findConferenceAttendance("CompanyName");
```

## Scoring Impact

### Job Board Scraper
- **Intent Signal Score**: +10 if 5+ Communications/PR/Marketing positions
- **Intent Signal Score**: +5 if hiring velocity increasing (week-over-week)
- **Intent Signal Score**: +5 if Communications/PR department found
- **Intent Signal Score**: +3 if recent postings (last 7 days)

### Website Freshness
- **Fit Signal Score**: +5 if outdated (signals need for design/marketing refresh)
- Detects:
  - Bootstrap 3, jQuery, old frameworks = outdated
  - Copyright year 6+ months old = outdated
  - Last-Modified header 6+ months old = stale

### News Finder
- **Intent Signal Score**: +8 if product launch in 90 days
- **Intent Signal Score**: +5 if funding/expansion/rebrand news
- **Intent Signal Score**: +3 if acquisition/partnership news
- Searches:
  - NewsAPI (500 requests/month free tier)
  - Company LinkedIn page announcements
  - Company press releases

### Conference Finder
- **Fit Signal Score**: +8 if speaking at industry conference
- **Fit Signal Score**: +5 if attending industry conference
- Tracks:
  - Blockchain: Web3 Summit, Consensus, DevCon
  - AI: NeurIPS, AI Summit, AI Expo
  - FinTech: Money20/20, FinTech Forum, SxSW
  - Northeast focus preferred

## Data Storage

Data is stored in the existing `fitDetails` and `intentDetails` JSON fields:

### fitDetails additions
```javascript
{
  // ... existing criteria ...
  websiteFreshness: {
    ageMonths: 8,
    isOutdated: false,
    freshnessScore: 3,
    designFramework: { ... },
    analysis: { ... },
    timestamp: "2026-04-16T..."
  },
  conferenceAttendance: [
    {
      conference: "AI Summit NYC",
      date: "2026-05-15",
      type: "speaking",
      relevance: "high"
    }
  ],
  conferenceScore: 8
}
```

### intentDetails additions
```javascript
{
  // ... existing criteria ...
  hiringSignal: {
    openPositions: 12,
    departments: ["Communications", "Marketing"],
    jobTitles: ["Marketing Manager", "PR Specialist"],
    score: 10,
    timestamp: "2026-04-16T..."
  },
  recentNews: [
    {
      date: "2026-04-10",
      type: "product_launch",
      title: "Company launches AI platform",
      source: "TechCrunch",
      url: "..."
    }
  ],
  newsScore: 8,
  newsTimestamp: "2026-04-16T..."
}
```

## API Response Format

### POST /api/daily-scrape Response
```json
{
  "success": true,
  "updated": 45,
  "processed": 50,
  "failures": [
    {
      "companyId": 123,
      "companyName": "Failed Company",
      "error": "Network timeout"
    }
  ],
  "summary": {
    "totalCompanies": 50,
    "byPipeline": {
      "pr-marketing": { "updated": 40, "processed": 45 },
      "fund-formation": { "updated": 5, "processed": 5 }
    },
    "newHiringSignals": 15,
    "newOutdatedWebsites": 8,
    "newNewsFound": 22,
    "newConferences": 3,
    "duration": "45s",
    "message": "Processed 50 companies, updated 45"
  },
  "timestamp": "2026-04-16T02:15:30Z"
}
```

### GET /api/daily-scrape?companyId=123 Response
```json
{
  "company": {
    "id": 123,
    "name": "Example Corp",
    "fitScore": 32,
    "intentScore": 38,
    "lastActivity": "2026-04-16"
  },
  "scrapedData": {
    "fit": {
      "websiteFreshness": { ... },
      "conferenceAttendance": [ ... ]
    },
    "intent": {
      "hiringSignal": { ... },
      "recentNews": [ ... ]
    }
  }
}
```

## Configuration

### Environment Variables

```env
# News API (optional, for news detection)
NEWS_API_KEY=your_newsapi_key

# Database (existing)
DATABASE_URL=postgresql://...
```

## Error Handling

The scraper gracefully handles failures:

- **Individual scraper failures** don't stop the whole process
- **Network timeouts** are caught and logged
- **Rate limiting** includes exponential backoff
- **Blocked sites** gracefully fail without crashing
- All failures tracked in response array

## Performance Notes

- **Batch processing**: Companies processed sequentially with 1-2s delays
- **Timeout**: 10 seconds per website fetch
- **Cache**: Results stored in company record for quick retrieval
- **Future optimization**: Could batch with queue system for large volumes

## Integration Points

### Used by
- Daily scheduled task (cron job or background worker)
- Manual admin trigger
- Company detail page (GET with companyId)

### Updates
- Company `fitScore` and `intentScore`
- Company `fitDetails` and `intentDetails` JSON
- Company `lastActivity` timestamp

### Scoring
- Uses `src/lib/scoreCalculation.js` for final score calculation
- Integrates with existing pipeline criteria
- Maintains backward compatibility with manual scores

## Testing

Each scraper can be tested independently:

```javascript
// Test job board scraper
const jobSignals = await scrapeJobBoards("TechCorp", "technology");
console.log(jobSignals);
// { openPositions: 12, departments: [...], score: 10, ... }

// Test website freshness
const freshness = await analyzeWebsiteFreshness("techcorp.com");
console.log(freshness);
// { ageMonths: 8, isOutdated: false, freshnessScore: 3, ... }

// Test news finder
const news = await findRecentNews("TechCorp", "technology");
console.log(news);
// { news: [...], newsCount: 5, recentScore: 8, ... }

// Test conference finder
const conferences = await findConferenceAttendance("TechCorp");
console.log(conferences);
// { conferences: [...], conferenceCount: 2, conferenceScore: 8, ... }
```

## Future Enhancements

1. **Dedicated job board API** - Use Indeed API instead of scraping
2. **LinkedIn scraping** - Full LinkedIn company page analysis
3. **Twitter monitoring** - Real-time conference/news detection
4. **Queue system** - Bull/Redis for large batch processing
5. **Caching layer** - Redis for API rate limit management
6. **Custom signals** - Industry-specific news sources and conferences
7. **ML scoring** - Weight signals based on historical conversion data

## Limitations

- **Job boards** - Indeed/CareerBuilder block heavy scraping (use official APIs)
- **LinkedIn** - Scraping blocked, would need official API
- **NewsAPI** - Free tier limited to 500/month
- **Twitter** - Rate limiting without API credentials
- **Real-time** - Data updates only at scrape time

## Support

For issues or enhancements:
1. Check error logs in API response `failures` array
2. Review individual scraper return values
3. Verify environment variables (NEWS_API_KEY)
4. Check database connectivity
5. Monitor rate limiting on external APIs
