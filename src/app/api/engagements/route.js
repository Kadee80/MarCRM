import { NextResponse } from "next/server";
import prisma from "@/lib/db";

// GET /api/engagements?contactId=X or ?companyId=X
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const contactId = searchParams.get("contactId");
  const companyId = searchParams.get("companyId");

  const where = {};
  if (contactId) where.contactId = parseInt(contactId);
  if (companyId) where.companyId = parseInt(companyId);

  const engagements = await prisma.engagement.findMany({
    where,
    include: { contact: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(engagements);
}

// POST /api/engagements — create a new engagement
export async function POST(request) {
  const body = await request.json();

  const engagement = await prisma.engagement.create({
    data: {
      type: body.type || "note",
      notes: body.notes || "",
      contactId: body.contactId,
      companyId: body.companyId || null,
    },
    include: { contact: true },
  });

  // Update the company's lastActivity timestamp
  if (body.companyId) {
    await prisma.company.update({
      where: { id: body.companyId },
      data: { lastActivity: new Date().toISOString().slice(0, 10) },
    }).catch(() => {});
  }

  return NextResponse.json(engagement);
}

// DELETE /api/engagements?id=X
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = parseInt(searchParams.get("id"));
  await prisma.engagement.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
