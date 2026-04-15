import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import axios from "axios";

// POST /api/enrich — look up email/phone for a contact
export async function POST(request) {
  const { contactId, firstName, lastName, domain, company, linkedin } = await request.json();

  if (!firstName || !lastName) {
    return NextResponse.json({ error: "First and last name are required" }, { status: 400 });
  }
  if (!domain && !company) {
    return NextResponse.json({ error: "Company domain or name is required" }, { status: 400 });
  }

  const hunterKey = process.env.HUNTER_API_KEY;
  const rocketKey = process.env.ROCKETREACH_API_KEY;

  if (!hunterKey && !rocketKey) {
    return NextResponse.json({
      error: "No enrichment API configured. Add HUNTER_API_KEY or ROCKETREACH_API_KEY to your .env file.",
      setup: {
        hunter: "Free — 50 lookups/month. Sign up at hunter.io → Settings → API",
        rocketreach: "Paid — if your PR team has an account, get the key from rocketreach.co/api",
      },
    }, { status: 400 });
  }

  let result = { email: null, phone: null, provider: null, confidence: null, sources: [] };

  // Try Hunter.io first (free tier)
  if (hunterKey) {
    try {
      const params = {
        api_key: hunterKey,
        first_name: firstName,
        last_name: lastName,
      };
      if (domain) params.domain = domain.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
      else if (company) params.company = company;

      const { data } = await axios.get("https://api.hunter.io/v2/email-finder", {
        params,
        timeout: 10000,
      });

      if (data.data?.email) {
        result.email = data.data.email;
        result.confidence = data.data.confidence;
        result.provider = "hunter";
        result.sources = (data.data.sources || []).map((s) => s.uri).slice(0, 3);

        // Also try domain search for phone numbers (Hunter doesn't return phones from email-finder)
        // Hunter's domain search can sometimes give us extra emails for the company
      }

      // Log the search
      await prisma.enrichmentLog.create({
        data: {
          contactId: contactId || null,
          contactName: `${firstName} ${lastName}`,
          provider: "hunter",
          query: `${firstName} ${lastName} @ ${domain || company}`,
          resultData: JSON.stringify(data.data || {}),
          success: !!data.data?.email,
        },
      });
    } catch (err) {
      console.log("Hunter.io error:", err.response?.data || err.message);
      // Log failed attempt
      await prisma.enrichmentLog.create({
        data: {
          contactId: contactId || null,
          contactName: `${firstName} ${lastName}`,
          provider: "hunter",
          query: `${firstName} ${lastName} @ ${domain || company}`,
          resultData: JSON.stringify({ error: err.message }),
          success: false,
        },
      }).catch(() => {});
    }
  }

  // Try RocketReach if Hunter didn't find an email, or for phone numbers
  if (rocketKey && (!result.email || !result.phone)) {
    try {
      const params = {
        name: `${firstName} ${lastName}`,
      };
      if (company) params.current_employer = company;
      if (linkedin) params.linkedin_url = linkedin;

      const { data } = await axios.get("https://api.rocketreach.co/api/v2/person/lookup", {
        params,
        headers: { "Api-Key": rocketKey },
        timeout: 15000,
      });

      if (data.emails?.length > 0 && !result.email) {
        // Pick the highest-graded email
        const best = data.emails.sort((a, b) => (a.grade || "F").localeCompare(b.grade || "F"))[0];
        result.email = best.email || best;
        result.confidence = best.grade ? `Grade ${best.grade}` : null;
        result.provider = "rocketreach";
      }

      if (data.phones?.length > 0) {
        result.phone = data.phones[0].number || data.phones[0];
        if (!result.provider) result.provider = "rocketreach";
      }

      result.linkedin = result.linkedin || data.linkedin_url || null;
      result.title = result.title || data.current_title || null;

      // Log the search
      await prisma.enrichmentLog.create({
        data: {
          contactId: contactId || null,
          contactName: `${firstName} ${lastName}`,
          provider: "rocketreach",
          query: `${firstName} ${lastName} @ ${company || domain}`,
          resultData: JSON.stringify({ emails: data.emails, phones: data.phones, title: data.current_title }),
          success: !!(data.emails?.length > 0 || data.phones?.length > 0),
        },
      });
    } catch (err) {
      console.log("RocketReach error:", err.response?.data || err.message);
      await prisma.enrichmentLog.create({
        data: {
          contactId: contactId || null,
          contactName: `${firstName} ${lastName}`,
          provider: "rocketreach",
          query: `${firstName} ${lastName} @ ${company || domain}`,
          resultData: JSON.stringify({ error: err.message }),
          success: false,
        },
      }).catch(() => {});
    }
  }

  // Update the contact in the database if we found info
  if (contactId && (result.email || result.phone)) {
    try {
      const updateData = {};
      if (result.email) updateData.email = result.email;
      if (result.phone) updateData.phone = result.phone;
      if (result.linkedin) updateData.linkedin = result.linkedin;

      await prisma.contact.update({
        where: { id: contactId },
        data: updateData,
      });
      result.updated = true;
    } catch {
      result.updated = false;
    }
  }

  return NextResponse.json(result);
}

// GET /api/enrich — usage stats for the current month
export async function GET() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const logs = await prisma.enrichmentLog.findMany({
    where: { createdAt: { gte: startOfMonth } },
    orderBy: { createdAt: "desc" },
  });

  const hunterSearches = logs.filter((l) => l.provider === "hunter").length;
  const hunterSuccesses = logs.filter((l) => l.provider === "hunter" && l.success).length;
  const rocketSearches = logs.filter((l) => l.provider === "rocketreach").length;
  const rocketSuccesses = logs.filter((l) => l.provider === "rocketreach" && l.success).length;

  return NextResponse.json({
    month: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`,
    hunter: {
      used: hunterSearches,
      successful: hunterSuccesses,
      limit: 50,
      remaining: Math.max(0, 50 - hunterSearches),
      configured: !!process.env.HUNTER_API_KEY,
    },
    rocketreach: {
      used: rocketSearches,
      successful: rocketSuccesses,
      configured: !!process.env.ROCKETREACH_API_KEY,
    },
    recentLookups: logs.slice(0, 20).map((l) => ({
      id: l.id,
      name: l.contactName,
      provider: l.provider,
      success: l.success,
      date: l.createdAt,
    })),
  });
}
