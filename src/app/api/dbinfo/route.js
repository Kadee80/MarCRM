import { NextResponse } from "next/server";
import prisma from "@/lib/db";

// TEMPORARY DEBUG ROUTE — GET /api/dbinfo
// Reports which database the *deployed* app is actually connected to,
// and how many companies it can see. Read-only. Delete after diagnosing.
// force-dynamic so Vercel can never serve a stale/cached build-time result.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const url = process.env.DATABASE_URL || "";
  const host = (url.match(/@([^/:?]+)/) || [])[1] || "(DATABASE_URL not set)";
  const database = (url.match(/\/([^/?]+)(\?|$)/) || [])[1] || "(unknown)";

  try {
    const [companyCount, contactCount] = await Promise.all([
      prisma.company.count(),
      prisma.contact.count().catch(() => null),
    ]);

    // Reproduce the EXACT /api/companies query IN THE DEPLOYED RUNTIME so we
    // capture the real 500 (which only happens on Vercel, not locally).
    let companiesProbe;
    try {
      const rows = await prisma.company.findMany({
        include: { contacts: true },
        orderBy: { updatedAt: "desc" },
        take: 3,
      });
      rows.map((c) => ({
        ...c,
        techStack: JSON.parse(c.techStack || "[]"),
        fitDetails: JSON.parse(c.fitDetails || "{}"),
        intentDetails: JSON.parse(c.intentDetails || "{}"),
      }));
      companiesProbe = { ok: true, sampled: rows.length };
    } catch (e) {
      companiesProbe = { ok: false, error: e.message, code: e.code || null };
    }

    return NextResponse.json(
      { ok: true, host, database, companyCount, contactCount, companiesProbe, checkedAt: new Date().toISOString() },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (e) {
    return NextResponse.json(
      { ok: false, host, database, error: e.message, checkedAt: new Date().toISOString() },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
