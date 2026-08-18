import { NextResponse } from "next/server";
import path from "path";
import { loadReports } from "@/lib/reports";

// GET /api/reports — list available reports (all types, newest first)
export async function GET() {
  const reports = loadReports(path.join(process.cwd(), "reports"));
  return NextResponse.json(reports);
}
