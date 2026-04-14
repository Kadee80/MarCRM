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

// Brave Search API — reliable from any server IP, free 2000 queries/month
// Returns: array of results on success, null if no API key, throws on error
async function braveSearch(query, count = 15) {
  const apiKey = process.env.BRAVE_SEARCH_API_KEY;
  if (!apiKey) return null;

  const { data } = await axios.get("https://api.search.brave.com/res/v1/web/search", {
    params: { q: query, count },
    headers: { "X-Subscription-Token": apiKey, "Accept": "application/json" },
    timeout: 10000,
  });
  return (data.web?.results || []).map((r) => ({
    title: r.title || "",
    snippet: r.description || "",
    link: r.url || "",
  }));
}

// Extract company/product names from text using heuristics
function extractEntities(text) {
  const entities = new Set();

  // Pattern 1: Capitalized multi-word names (e.g., "Open AI", "Palo Alto Networks")
  const capMatches = text.match(/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,3}\b/g) || [];
  for (const m of capMatches) {
    if (m.length > 3 && !STOP_WORDS.has(m.toLowerCase())) {
      entities.add(m);
    }
  }

  // Pattern 2: CamelCase / product names (e.g., "ChatGPT", "HubSpot", "OpenAI")
  const camelMatches = text.match(/\b[A-Z][a-z]+[A-Z][A-Za-z]+\b/g) || [];
  for (const m of camelMatches) entities.add(m);

  // Pattern 3: domain-like mentions (e.g., "stripe.com", "notion.so")
  const domainMatches = text.match(/\b[a-z][a-z0-9-]+\.(com|io|ai|co|org|dev|app|so|xyz)\b/gi) || [];
  for (const m of domainMatches) {
    if (!m.includes("reddit.com") && !m.includes("imgur.com") && !m.includes("google.com")) {
      const name = m.split(".")[0];
      entities.add(name.charAt(0).toUpperCase() + name.slice(1));
    }
  }

  // Pattern 4: "company called X" or "tool called X" or "using X"
  const namedMatches = text.match(/(?:called|named|using|like|try|recommend|check out|look at)\s+([A-Z][A-Za-z0-9]+(?:\s+[A-Z][a-z]+)?)/g) || [];
  for (const m of namedMatches) {
    const name = m.replace(/^(?:called|named|using|like|try|recommend|check out|look at)\s+/i, "").trim();
    if (name.length > 2) entities.add(name);
  }

  // Filter out common false positives
  return [...entities].filter((e) =>
    e.length > 2 &&
    !STOP_WORDS.has(e.toLowerCase()) &&
    !/^\d+$/.test(e)
  ).slice(0, 20);
}

const STOP_WORDS = new Set([
  "the", "this", "that", "what", "which", "where", "when", "how", "who", "why",
  "have", "has", "had", "been", "being", "will", "would", "could", "should",
  "their", "there", "they", "them", "then", "than", "these", "those",
  "about", "after", "again", "also", "some", "such", "very", "just", "like",
  "with", "from", "into", "over", "much", "most", "more", "many", "each",
  "made", "make", "does", "done", "doing", "going", "here", "well",
  "still", "even", "really", "think", "know", "need", "want", "good",
  "best", "better", "great", "right", "sure", "yes", "not", "all",
  "any", "can", "may", "new", "now", "old", "see", "way", "use",
  "reddit", "post", "comment", "comments", "thread", "subreddit", "edit",
  "deleted", "removed", "update", "question", "answer", "anyone", "everyone",
  "people", "something", "nothing", "anything", "everything",
  // Common sentence starters that aren't company names
  "but", "and", "for", "are", "was", "were", "you", "your", "its",
  "one", "two", "first", "last", "next", "same", "other", "another",
  "however", "because", "since", "while", "before", "after", "between",
  "through", "during", "without", "actually", "probably", "already",
  "currently", "recently", "basically", "honestly", "personally",
  "instead", "especially", "definitely", "absolutely", "completely",
  "https", "http", "www", "com", "org", "net",
]);

// Reddit & social search — uses Brave Search API for reliable results
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

    // Use Brave Search API
    let searchResults;
    try {
      searchResults = await braveSearch(`site:reddit.com ${searchQuery}`);
    } catch (braveErr) {
      const status = braveErr.response?.status;
      const detail = braveErr.response?.data?.message || braveErr.message;
      results.success = false;
      results.error = status === 401 || status === 403
        ? `Brave Search API key is invalid or expired (${status}). Check your BRAVE_SEARCH_API_KEY in .env and Vercel env vars.`
        : status === 429
        ? "Brave Search rate limit hit. Free plan allows 1 query/second and 2000/month."
        : `Brave Search failed (${status || "network error"}): ${detail}`;
      return results;
    }

    if (searchResults === null) {
      results.success = false;
      results.error = "Reddit scraping requires a Brave Search API key (free, 2000 queries/month). Sign up at brave.com/search/api → Get the Free plan → Add BRAVE_SEARCH_API_KEY to your .env file and Vercel environment variables.";
      return results;
    }

    if (searchResults.length === 0) {
      results.success = false;
      results.error = `No Reddit discussions found for "${searchQuery}". Try a different subreddit or topic.`;
      return results;
    }

    // Combine all snippet text
    const allSnippetText = searchResults
      .map((r) => `${r.title} ${r.snippet}`)
      .join(" ");

    // Extract company/product names mentioned in Reddit discussions
    // Look for capitalized multi-word names, known patterns, and domain-like references
    const mentionedEntities = extractEntities(allSnippetText);

    // For each unique entity, search Brave for their website and scrape it
    const leads = [];
    const seenDomains = new Set();

    for (const entity of mentionedEntities.slice(0, 8)) {
      try {
        const companyResults = await braveSearch(`${entity} official website`, 3);
        if (!companyResults || companyResults.length === 0) continue;

        // Pick the most likely company website (skip reddit, wikipedia, etc.)
        const companyUrl = companyResults.find((r) =>
          !r.link.includes("reddit.com") &&
          !r.link.includes("wikipedia.org") &&
          !r.link.includes("linkedin.com/posts") &&
          !r.link.includes("twitter.com") &&
          !r.link.includes("youtube.com") &&
          !r.link.includes("crunchbase.com/person")
        );
        if (!companyUrl) continue;

        const domain = new URL(companyUrl.link).hostname.replace("www.", "");
        if (seenDomains.has(domain)) continue;
        seenDomains.add(domain);

        // Scrape the actual company website for lead data
        const leadData = await scrapeWebsite(companyUrl.link);
        if (leadData.success) {
          leads.push({
            name: entity,
            website: domain,
            title: leadData.title,
            description: leadData.description?.slice(0, 150),
            industry: leadData.industry,
            location: leadData.location,
            techStack: leadData.techStack || [],
            emails: leadData.emails || [],
            contacts: leadData.contacts || [],
            socialLinks: leadData.socialLinks || {},
            mentionedIn: searchResults
              .filter((r) => `${r.title} ${r.snippet}`.toLowerCase().includes(entity.toLowerCase()))
              .slice(0, 2)
              .map((r) => r.title),
          });
        }
      } catch {
        // Skip this entity, continue to next
      }
    }

    // Build results
    results.title = `Reddit → ${leads.length} leads from r/${searchQuery} (${searchResults.length} discussions scanned)`;
    results.description = leads.length > 0
      ? `Found: ${leads.slice(0, 5).map((l) => l.name).join(", ")}`
      : searchResults.slice(0, 3).map((r) => r.title).join(" | ");
    results.industry = "Reddit / Social Intelligence";
    results.socialLinks.reddit = url;
    results.rawText = allSnippetText.slice(0, 5000);
    results.leads = leads;

    // Aggregate all emails and contacts from leads
    const allEmails = leads.flatMap((l) => l.emails || []);
    results.emails = [...new Set(allEmails)].slice(0, 15);
    results.contacts = leads.flatMap((l) => (l.contacts || []).map((c) => ({
      ...c,
      title: `${c.title} (${l.name})`,
    }))).slice(0, 15);

    // Aggregate tech stack
    results.techStack = [...new Set(leads.flatMap((l) => l.techStack || []))];

    // Store discussions
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
    // Search for job listings using Brave Search API
    const jobQuery = `"${companyName}" hiring jobs linkedin.com OR indeed.com`;
    let braveResults;
    try {
      braveResults = await braveSearch(jobQuery, 10);
    } catch (braveErr) {
      const status = braveErr.response?.status;
      results.error = `Job search failed: Brave Search returned ${status || "error"} — ${braveErr.message}`;
      results.success = false;
      return results;
    }

    if (braveResults === null) {
      results.error = "Job search requires a Brave Search API key. Add BRAVE_SEARCH_API_KEY to .env (free at brave.com/search/api).";
      results.success = false;
      return results;
    }

    for (const r of braveResults) {
      if (r.title.toLowerCase().includes("hiring") || r.title.toLowerCase().includes("job") || r.snippet.toLowerCase().includes("hiring")) {
        results.jobs.push({ title: r.title, snippet: r.snippet, link: r.link });
      }
    }

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
