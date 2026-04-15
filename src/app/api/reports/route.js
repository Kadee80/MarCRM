import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// GET /api/reports — list available reports
export async function GET() {
  const reportsDir = path.join(process.cwd(), "reports");

  // Create reports dir if it doesn't exist
  if (!fs.existsSync(reportsDir)) {
    return NextResponse.json([]);
  }

  const files = fs.readdirSync(reportsDir);
  const reports = files
    .filter((f) => f.endsWith(".json") && f.startsWith("daily-scrape-"))
    .map((f) => {
      const filePath = path.join(reportsDir, f);
      const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      return {
        filename: f,
        date: data.scrapeDate || f.replace("daily-scrape-", "").replace(".json", ""),
        totalLeads: data.totalLeads || data.leads?.length || 0,
        leads: data.leads || [],
        note: data.note || "",
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));

  return NextResponse.json(reports);
}
