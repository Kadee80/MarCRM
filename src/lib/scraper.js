import axios from "axios";
import * as cheerio from "cheerio";

/**
 * Real web scraper — pulls live data from company websites.
 * Extracts: page title, meta description, team/about info, tech stack signals, contact emails.
 */

const TECH_SIGNATURES = {
  // CMS / Platforms
  "shopify": "Shopify", "squarespace": "Squarespace", "wordpress": "WordPress",
  "webflow": "Webflow", "wix": "Wix", "hubspot": "HubSpot",
  // Analytics / Tracking
  "google-analytics": "Google Analytics", "googletagmanager": "Google Tag Manager",
  "segment.com": "Segment", "mixpanel": "Mixpanel", "amplitude": "Amplitude",
  "hotjar": "Hotjar", "heap": "Heap",
  // Marketing / CRM
  "klaviyo": "Klaviyo", "mailchimp": "Mailchimp", "intercom": "Intercom",
  "drift": "Drift", "salesforce": "Salesforce", "pardot": "Pardot",
  "marketo": "Marketo", "activecampaign": "ActiveCampaign",
  // Ads
  "facebook pixel": "Meta Ads", "fbevents": "Meta Ads",
  "google ads": "Google Ads", "googleads": "Google Ads", "adwords": "Google Ads",
  "linkedin insight": "LinkedIn Ads",
  // Payment
  "stripe": "Stripe", "braintree": "Braintree",
  // Frameworks
  "react": "React", "next": "Next.js", "vue": "Vue.js", "angular": "Angular",
  // Data / AI
  "snowflake": "Snowflake", "databricks": "Databricks",
  "openai": "OpenAI", "langchain": "LangChain",
};

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

const BROWSER_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
  "Accept-Encoding": "gzip, deflate, br",
  "Cache-Control": "no-cache",
  "Pragma": "no-cache",
};

// Scrape a company website for useful ICP data
export async function scrapeWebsite(url) {
  const normalizedUrl = url.startsWith("http") ? url : `https://${url}`;
  const domain = new URL(normalizedUrl).hostname.replace("www.", "");

  const results = {
    domain,
    url: normalizedUrl,
    title: "",
    description: "",
    industry: "",
    size: "",
    location: "",
    techStack: [],
    emails: [],
    contacts: [],
    teamMembers: [],
    socialLinks: {},
    rawText: "",
    scrapedAt: new Date().toISOString(),
    source: "website",
    success: true,
    error: null,
  };

  try {
    // Special handling for sites that block scrapers
    if (domain.includes("reddit.com")) {
      return await scrapeReddit(normalizedUrl, results);
    }

    // Fetch main page with realistic browser headers
    const { data: html } = await axios.get(normalizedUrl, {
      timeout: 10000,
      headers: BROWSER_HEADERS,
      maxRedirects: 5,
    });

    const $ = cheerio.load(html);

    // Extract meta info
    results.title = $("title").text().trim() || $('meta[property="og:title"]').attr("content") || "";
    results.description =
      $('meta[name="description"]').attr("content") ||
      $('meta[property="og:description"]').attr("content") || "";

    // Detect tech stack from page source
    const htmlLower = html.toLowerCase();
    const detectedTech = new Set();
    for (const [sig, name] of Object.entries(TECH_SIGNATURES)) {
      if (htmlLower.includes(sig.toLowerCase())) {
        detectedTech.add(name);
      }
    }
    results.techStack = [...detectedTech];

    // Extract emails from page
    const textContent = $("body").text();
    const emails = textContent.match(EMAIL_REGEX) || [];
    results.emails = [...new Set(emails)].filter(
      (e) => !e.includes("example.com") && !e.includes("sentry") && !e.includes("webpack")
    ).slice(0, 10);

    // Extract social links
    $("a[href]").each((_, el) => {
      const href = $(el).attr("href") || "";
      if (href.includes("linkedin.com")) results.socialLinks.linkedin = href;
      if (href.includes("twitter.com") || href.includes("x.com")) results.socialLinks.twitter = href;
      if (href.includes("facebook.com")) results.socialLinks.facebook = href;
      if (href.includes("crunchbase.com")) results.socialLinks.crunchbase = href;
    });

    // Get readable text for analysis
    results.rawText = textContent.replace(/\s+/g, " ").trim().slice(0, 5000);

    // Try to scrape /about or /team pages for contacts
    for (const path of ["/about", "/team", "/about-us", "/our-team", "/leadership"]) {
      try {
        const { data: aboutHtml } = await axios.get(`${normalizedUrl}${path}`, {
          timeout: 5000,
          headers: BROWSER_HEADERS,
          validateStatus: (s) => s < 400,
        });
        const $about = cheerio.load(aboutHtml);
        const aboutText = $about("body").text();

        // Extract more emails from about/team pages
        const aboutEmails = aboutText.match(EMAIL_REGEX) || [];
        results.emails = [...new Set([...results.emails, ...aboutEmails])].slice(0, 10);

        results.rawText += " " + aboutText.replace(/\s+/g, " ").trim().slice(0, 3000);
        break; // stop after first successful about page
      } catch {
        // page doesn't exist, continue
      }
    }

    // Convert emails into contact entries for display
    results.contacts = results.emails.map((email) => {
      const localPart = email.split("@")[0];
      const nameParts = localPart.split(/[._-]/).filter(Boolean);
      const guessedName = nameParts.length >= 2
        ? nameParts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(" ")
        : localPart;
      return { name: guessedName, email, title: "Found via website scrape" };
    });

    // Try to infer industry from page text
    const INDUSTRY_KEYWORDS = {
      "Financial Services": ["financial", "investment", "banking", "fintech", "wealth management", "capital"],
      "Technology": ["software", "saas", "platform", "cloud", "developer", "engineering"],
      "Healthcare": ["health", "medical", "pharma", "biotech", "clinical", "patient"],
      "Legal": ["law firm", "legal", "attorney", "counsel"],
      "Real Estate": ["real estate", "property", "realty", "mortgage"],
      "E-Commerce": ["ecommerce", "e-commerce", "shop", "retail", "store"],
      "Media & Entertainment": ["media", "entertainment", "content", "publishing", "podcast"],
      "Education": ["education", "edtech", "learning", "university", "school"],
      "Venture Capital": ["venture", "fund", "portfolio", "lp", "gp", "limited partner"],
      "Consulting": ["consulting", "advisory", "strategy", "management consulting"],
      "Marketing & Advertising": ["marketing", "advertising", "agency", "branding", "digital marketing"],
    };
    const textLower = results.rawText.toLowerCase();
    for (const [industry, keywords] of Object.entries(INDUSTRY_KEYWORDS)) {
      if (keywords.some((kw) => textLower.includes(kw))) {
        results.industry = industry;
        break;
      }
    }

    // Try to detect location from common patterns
    const locationMatch = results.rawText.match(
      /(?:headquartered|located|based|offices?)\s+(?:in|at)\s+([A-Z][a-zA-Z\s]+,\s*[A-Z]{2})/
    ) || results.rawText.match(
      /([A-Z][a-zA-Z]+,\s*(?:NY|CA|TX|FL|IL|MA|WA|CO|GA|PA|OH|NC|VA|NJ|AZ|OR|CT|MD|MN|TN|WI|MO|IN|SC|DC))\b/
    );
    if (locationMatch) {
      results.location = locationMatch[1].trim();
    }
  } catch (err) {
    results.success = false;
    results.error = err.message || "Failed to fetch website";
  }

  return results;
}

// Reddit & social search — uses Google/Bing to find Reddit discussions about a company or topic
// This bypasses Reddit's API restrictions entirely
async function scrapeReddit(url, results) {
  try {
    // Figure out the search query from the URL
    let searchQuery = "";
    const subredditMatch = url.match(/reddit\.com\/r\/([^/?#]+)/);
    const postMatch = url.match(/reddit\.com\/r\/\w+\/comments\/\w+\/([^/?#]+)/);

    if (postMatch) {
      searchQuery = postMatch[1].replace(/_/g, " ");
    } else if (subredditMatch) {
      searchQuery = subredditMatch[1].replace(/_/g, " ");
    } else {
      searchQuery = url.replace(/https?:\/\/(www\.)?reddit\.com\/?/, "").replace(/[/_]/g, " ").trim();
    }

    if (!searchQuery) {
      results.success = false;
      results.error = "Could not parse a search query from the Reddit URL. Try entering a subreddit like reddit.com/r/artificial or a topic keyword.";
      return results;
    }

    // Search Google for Reddit content about this topic
    const googleQuery = `site:reddit.com ${searchQuery}`;
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(googleQuery)}&num=15`;

    let searchResults = [];

    try {
      const { data: html } = await axios.get(searchUrl, {
        timeout: 10000,
        headers: BROWSER_HEADERS,
      });
      const $ = cheerio.load(html);

      $(".g").each((_, el) => {
        const title = $(el).find("h3").text().trim();
        const snippet = $(el).find(".VwiC3b").text().trim();
        const link = $(el).find("a").attr("href") || "";
        if (title && link.includes("reddit.com")) {
          searchResults.push({ title, snippet, link });
        }
      });
    } catch {
      // Google blocked us too — try Bing as fallback
      try {
        const bingUrl = `https://www.bing.com/search?q=${encodeURIComponent(googleQuery)}&count=15`;
        const { data: html } = await axios.get(bingUrl, {
          timeout: 10000,
          headers: BROWSER_HEADERS,
        });
        const $ = cheerio.load(html);

        $(".b_algo").each((_, el) => {
          const title = $(el).find("h2").text().trim();
          const snippet = $(el).find(".b_caption p").text().trim();
          const link = $(el).find("a").attr("href") || "";
          if (title) {
            searchResults.push({ title, snippet, link });
          }
        });
      } catch (bingErr) {
        results.success = false;
        results.error = `Could not search for Reddit content: ${bingErr.message}`;
        return results;
      }
    }

    if (searchResults.length === 0) {
      results.success = false;
      results.error = `No Reddit discussions found for "${searchQuery}". Try a different subreddit or topic.`;
      return results;
    }

    // Build results from search snippets
    results.title = `Reddit discussions: ${searchQuery} (${searchResults.length} results)`;
    results.description = searchResults.slice(0, 3).map((r) => r.title).join(" | ");
    results.industry = "Reddit / Social Intelligence";
    results.socialLinks.reddit = url;

    // Combine all text for signal matching
    results.rawText = searchResults
      .map((r) => `${r.title} ${r.snippet}`)
      .join(" ")
      .slice(0, 5000);

    // Extract any emails mentioned in snippets
    const allText = results.rawText;
    const emails = allText.match(EMAIL_REGEX) || [];
    results.emails = [...new Set(emails)]
      .filter((e) => !e.includes("example.com") && !e.includes("reddit.com"))
      .slice(0, 10);

    results.contacts = results.emails.map((email) => {
      const localPart = email.split("@")[0];
      const nameParts = localPart.split(/[._-]/).filter(Boolean);
      const guessedName = nameParts.length >= 2
        ? nameParts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(" ")
        : localPart;
      return { name: guessedName, email, title: "Found via Reddit discussion" };
    });

    // Store individual discussion links as a bonus field
    results.discussions = searchResults.slice(0, 10).map((r) => ({
      title: r.title,
      snippet: r.snippet.slice(0, 200),
      link: r.link,
    }));

    results.success = true;
  } catch (err) {
    results.success = false;
    results.error = `Reddit search failed: ${err.message}`;
  }

  return results;
}

// Scrape job listings to detect hiring intent (uses public Indeed/LinkedIn search pages)
export async function scrapeJobSignals(companyName) {
  const results = {
    company: companyName,
    jobs: [],
    signals: [],
    source: "job_boards",
    scrapedAt: new Date().toISOString(),
    success: true,
    error: null,
  };

  try {
    // Search Google for recent job listings
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
      `"${companyName}" site:linkedin.com/jobs OR site:indeed.com hiring`
    )}&num=10`;

    const { data: html } = await axios.get(searchUrl, {
      timeout: 10000,
      headers: BROWSER_HEADERS,
    });

    const $ = cheerio.load(html);

    // Extract job-related snippets
    $(".g").each((_, el) => {
      const title = $(el).find("h3").text();
      const snippet = $(el).find(".VwiC3b").text();
      const link = $(el).find("a").attr("href");
      if (title && (title.toLowerCase().includes("hiring") || title.toLowerCase().includes("job") || snippet.toLowerCase().includes("hiring"))) {
        results.jobs.push({ title, snippet, link });
      }
    });

    // Detect intent signals from job titles
    const SIGNAL_KEYWORDS = {
      operations: ["operations manager", "head of operations", "coo", "chief of staff"],
      marketing: ["cmo", "vp marketing", "head of growth", "head of content", "pr lead"],
      sales: ["business development", "account executive", "sales manager", "revenue operations"],
      ai: ["machine learning", "ai engineer", "data scientist", "mlops", "llm", "genai"],
      fundraising: ["investor relations", "fundraising", "capital markets"],
    };

    const allText = results.jobs.map((j) => `${j.title} ${j.snippet}`).join(" ").toLowerCase();
    for (const [signal, keywords] of Object.entries(SIGNAL_KEYWORDS)) {
      if (keywords.some((kw) => allText.includes(kw))) {
        results.signals.push(signal);
      }
    }
  } catch (err) {
    results.success = false;
    results.error = err.message;
  }

  return results;
}

// Enrich with Proxycurl (LinkedIn data) if API key is available
export async function enrichWithLinkedIn(linkedinUrl) {
  const apiKey = process.env.PROXYCURL_API_KEY;
  if (!apiKey) {
    return { success: false, error: "No PROXYCURL_API_KEY set. Add it to .env for LinkedIn enrichment." };
  }

  try {
    const { data } = await axios.get("https://nubela.co/proxycurl/api/linkedin/company", {
      params: { url: linkedinUrl, use_cache: "if-present" },
      headers: { Authorization: `Bearer ${apiKey}` },
      timeout: 15000,
    });

    return {
      success: true,
      name: data.name,
      description: data.description,
      industry: data.industry,
      size: data.company_size_on_linkedin ? `${data.company_size_on_linkedin}` : "",
      location: data.hq?.city && data.hq?.state ? `${data.hq.city}, ${data.hq.state}` : "",
      website: data.website,
      founded: data.founded_year,
      specialities: data.specialities || [],
      followerCount: data.follower_count,
    };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

// Enrich with Crunchbase if API key is available
export async function enrichWithCrunchbase(companyName) {
  const apiKey = process.env.CRUNCHBASE_API_KEY;
  if (!apiKey) {
    return { success: false, error: "No CRUNCHBASE_API_KEY set. Add it to .env for funding/investor data." };
  }

  try {
    const { data } = await axios.get(
      `https://api.crunchbase.com/api/v4/autocompletes?query=${encodeURIComponent(companyName)}&collection_ids=organizations`,
      { headers: { "X-cb-user-key": apiKey }, timeout: 10000 }
    );

    const org = data.entities?.[0];
    if (!org) return { success: false, error: "Company not found on Crunchbase" };

    return {
      success: true,
      name: org.identifier.value,
      permalink: org.identifier.permalink,
      shortDescription: org.properties?.short_description,
      fundingTotal: org.properties?.funding_total?.value_usd,
      lastFundingType: org.properties?.last_funding_type,
    };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
