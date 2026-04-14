import { NextResponse } from "next/server";
import prisma from "@/lib/db";

// GET /api/companies — list all, with optional filters
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const pipeline = searchParams.get("pipeline");
  const stage = searchParams.get("stage");
  const search = searchParams.get("search");

  const where = {};
  if (pipeline && pipeline !== "all") where.pipeline = pipeline;
  if (stage && stage !== "All") where.stage = stage;
  if (search) {
    where.OR = [
      { name: { contains: search } },
      { industry: { contains: search } },
    ];
  }

  const companies = await prisma.company.findMany({
    where,
    include: { contacts: true },
    orderBy: { updatedAt: "desc" },
  });

  // Parse JSON string fields for the frontend
  const parsed = companies.map((c) => ({
    ...c,
    techStack: JSON.parse(c.techStack || "[]"),
    fitDetails: JSON.parse(c.fitDetails || "{}"),
    intentDetails: JSON.parse(c.intentDetails || "{}"),
  }));

  return NextResponse.json(parsed);
}

// POST /api/companies — create a new company
export async function POST(request) {
  const body = await request.json();

  const company = await prisma.company.create({
    data: {
      name: body.name,
      website: body.website || "",
      pipeline: body.pipeline || "pr-marketing",
      industry: body.industry || "",
      size: body.size || "",
      revenue: body.revenue || "",
      location: body.location || "",
      fundingStage: body.fundingStage || "",
      techStack: JSON.stringify(body.techStack || []),
      stage: body.stage || "Targeted",
      fitScore: body.fitScore || 0,
      intentScore: body.intentScore || 0,
      fitDetails: JSON.stringify(body.fitDetails || {}),
      intentDetails: JSON.stringify(body.intentDetails || {}),
      starred: body.starred || false,
      notes: body.notes || "",
      source: body.source || "Manual",
      lastActivity: new Date().toISOString().slice(0, 10),
    },
    include: { contacts: true },
  });

  return NextResponse.json({
    ...company,
    techStack: JSON.parse(company.techStack),
    fitDetails: JSON.parse(company.fitDetails),
    intentDetails: JSON.parse(company.intentDetails),
  });
}

// PUT /api/companies — update a company (pass id in body)
export async function PUT(request) {
  const body = await request.json();
  const { id, ...data } = body;

  // Stringify JSON fields if present
  if (data.techStack) data.techStack = JSON.stringify(data.techStack);
  if (data.fitDetails) data.fitDetails = JSON.stringify(data.fitDetails);
  if (data.intentDetails) data.intentDetails = JSON.stringify(data.intentDetails);

  const company = await prisma.company.update({
    where: { id },
    data: { ...data, lastActivity: new Date().toISOString().slice(0, 10) },
    include: { contacts: true },
  });

  return NextResponse.json({
    ...company,
    techStack: JSON.parse(company.techStack),
    fitDetails: JSON.parse(company.fitDetails),
    intentDetails: JSON.parse(company.intentDetails),
  });
}

// DELETE /api/companies?id=X
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = parseInt(searchParams.get("id"));
  await prisma.company.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
