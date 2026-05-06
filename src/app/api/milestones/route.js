import { NextResponse } from "next/server";
import prisma from "@/lib/db";

// GET /api/milestones?companyId=X
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const companyId = searchParams.get("companyId");

  const where = {};
  if (companyId) where.companyId = parseInt(companyId);

  const milestones = await prisma.milestone.findMany({
    where,
    orderBy: { sortOrder: "asc" },
  });

  return NextResponse.json(milestones);
}

// POST /api/milestones — create a new milestone
export async function POST(request) {
  const body = await request.json();

  // Get the next sort order
  const maxOrder = await prisma.milestone.findFirst({
    where: { companyId: body.companyId },
    orderBy: { sortOrder: "desc" },
  });

  const milestone = await prisma.milestone.create({
    data: {
      title: body.title,
      status: body.status || "planned",
      notes: body.notes || "",
      companyId: body.companyId,
      sortOrder: (maxOrder?.sortOrder ?? -1) + 1,
    },
  });

  return NextResponse.json(milestone);
}

// PUT /api/milestones — update a milestone
export async function PUT(request) {
  const body = await request.json();
  const { id, ...data } = body;

  const milestone = await prisma.milestone.update({
    where: { id },
    data,
  });

  return NextResponse.json(milestone);
}

// DELETE /api/milestones?id=X
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = parseInt(searchParams.get("id"));
  await prisma.milestone.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
