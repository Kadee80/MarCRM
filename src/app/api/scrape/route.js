import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { scrapeWebsite, scrapeJobSignals, enrichWithLinkedIn, enrichWithCrunchbase } from "@/lib/scraper";
import { SIGNAL_CATEGORIES } from "@/lib/constants";

// POST /api/scrape — run a real scrape
export async function POST(request) {
  const { url, source, pipeline } = await request.json();

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  let results = {};
  let matchedSignals = [];

  try {
    switch (source) {
      case "website": {
        results = await scrapeWebsite(url);
        break;
      }
      case "job_boards": {
        results = await scrapeJobSignals(url);
        break;
      }
      case "linkedin": {
        // Try LinkedIn enrichment if API key exists, otherwise fall back to website scrape
        const linkedinResult = await enrichWithLinkedIn(
          url.includes("linkedin.com") ? url : `https://www.linkedin.com/company/${url}`
        );
        if (linkedinResult.success) {
          results = { ...linkedinResult, source: "linkedin" };
        } else {
          // Fall back to website scrape
          results = await scrapeWebsite(url);
          results.note = `LinkedIn API not configured. Scraped website instead. ${linkedinResult.error}`;
        }
        break;
      }
      case "crunchbase": {
        const cbResult = await enrichWithCrunchbase(url);
        if (cbResult.success) {
          results = { ...cbResult, source: "crunchbase" };
        } else {
          results = await scrapeWebsite(url);
          results.note = `Crunchbase API not configured. Scraped website instead. ${cbResult.error}`;
        }
        break;
      }
      default: {
        results = await scrapeWebsite(url);
      }
    }

    // Match scraped text against pipeline signal keywords
    const signals = SIGNAL_CATEGORIES[pipeline] || [];
    const textToSearch = JSON.stringify(results).toLowerCase();
    matchedSignals = signals.filter((sig) =>
      sig.keywords.some((kw) => textToSearch.includes(kw.toLowerCase()))
    );

    // Save to database
    const saved = await prisma.scrapeResult.create({
      data: {
        url,
        source: source || "website",
        pipeline: pipeline || "pr-marketing",
        resultData: JSON.stringify(results),
        matchedSignals: JSON.stringify(matchedSignals),
      },
    });

    return NextResponse.json({
      id: saved.id,
      ...results,
      matchedSignals,
      pipeline,
      scrapedAt: saved.createdAt,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err.message, success: false },
      { status: 500 }
    );
  }
}

// GET /api/scrape — fetch scrape history
export async function GET() {
  const history = await prisma.scrapeResult.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return NextResponse.json(
    history.map((h) => ({
      ...h,
      resultData: JSON.parse(h.resultData || "{}"),
      matchedSignals: JSON.parse(h.matchedSignals || "[]"),
    }))
  );
}
