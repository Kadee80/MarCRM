/**
 * Test scrapers locally without hitting the API
 * Run: npm run test:scrapers
 */

import { scrapeJobBoards } from './jobBoardScraper.js';
import { analyzeWebsiteFreshness } from './websiteFreshness.js';
import { findRecentNews } from './newsFinder.js';
import { findConferenceAttendance } from './conferenceFinder.js';

// Test companies (use real examples)
const testCompanies = [
  {
    name: "OpenAI",
    website: "openai.com",
    industry: "AI",
    linkedinUrl: "https://linkedin.com/company/openai"
  },
  {
    name: "Stripe",
    website: "stripe.com",
    industry: "fintech",
    linkedinUrl: "https://linkedin.com/company/stripe"
  },
  {
    name: "Anthropic",
    website: "anthropic.com",
    industry: "AI",
    linkedinUrl: "https://linkedin.com/company/anthropic"
  }
];

async function runTests() {
  console.log('🧪 Starting Scraper Tests...\n');

  for (const company of testCompanies) {
    console.log(`\n📊 Testing: ${company.name}`);
    console.log('─'.repeat(50));

    try {
      // Test 1: Job Board Scraping
      console.log('\n1️⃣  Job Board Scraper...');
      try {
        const jobData = await scrapeJobBoards(company.name, company.industry);
        console.log(`   ✅ Found: ${jobData.openPositions} positions`);
        if (jobData.departments?.length > 0) {
          console.log(`   📢 Departments: ${jobData.departments.join(', ')}`);
        }
        console.log(`   📈 Hiring Signal Score: ${jobData.score}/10`);
      } catch (e) {
        console.log(`   ⚠️  Job board error (may be rate-limited): ${e.message}`);
      }

      // Test 2: Website Freshness
      console.log('\n2️⃣  Website Freshness Analyzer...');
      try {
        const freshness = await analyzeWebsiteFreshness(company.website);
        console.log(`   ✅ Website Age: ${freshness.ageInMonths} months`);
        console.log(`   🎨 Design Quality: ${freshness.freshnessScore}/10`);
        console.log(`   ${freshness.isOutdated ? '⚠️  OUTDATED - Refresh opportunity!' : '✅ Current design'}`);
      } catch (e) {
        console.log(`   ⚠️  Website analysis error: ${e.message}`);
      }

      // Test 3: Recent News
      console.log('\n3️⃣  News & Launch Finder...');
      try {
        const news = await findRecentNews(company.name, company.industry);
        if (news.length > 0) {
          console.log(`   ✅ Found ${news.length} recent news item(s):`);
          news.slice(0, 3).forEach(item => {
            console.log(`      📰 [${item.type.toUpperCase()}] ${item.title}`);
            console.log(`         Date: ${item.date}`);
          });
          console.log(`   🚀 Intent Signal: +${Math.min(8, news.length * 2)}`);
        } else {
          console.log(`   ℹ️  No recent news found (90-day window)`);
        }
      } catch (e) {
        console.log(`   ⚠️  News search error: ${e.message}`);
      }

      // Test 4: Conference Attendance
      console.log('\n4️⃣  Conference Finder...');
      try {
        const conferences = await findConferenceAttendance(company.name, company.linkedinUrl);
        if (conferences.length > 0) {
          console.log(`   ✅ Found ${conferences.length} conference involvement(s):`);
          conferences.slice(0, 2).forEach(conf => {
            console.log(`      🎤 ${conf.conference} (${conf.type})`);
            console.log(`         Date: ${conf.date}`);
          });
        } else {
          console.log(`   ℹ️  No conference attendance found`);
        }
      } catch (e) {
        console.log(`   ⚠️  Conference search error: ${e.message}`);
      }

    } catch (error) {
      console.error(`   ❌ Critical error: ${error.message}`);
    }
  }

  console.log('\n' + '═'.repeat(50));
  console.log('✅ Test run complete!');
  console.log('\nNotes:');
  console.log('- Some scrapers may be rate-limited (expected)');
  console.log('- Set NEWS_API_KEY env var for better news detection');
  console.log('- In production, run: POST /api/daily-scrape');
  console.log('═'.repeat(50) + '\n');
}

runTests().catch(console.error);
