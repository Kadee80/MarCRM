import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  const contacts = await prisma.contact.findMany({
    include: { company: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(contacts);
}

export async function POST(request) {
  const body = await request.json();
  const contact = await prisma.contact.create({
    data: {
      name: body.name,
      title: body.title || "",
      email: body.email || "",
      phone: body.phone || "",
      linkedin: body.linkedin || "",
      persona: body.persona || "",
      decisionMaker: body.decisionMaker || false,
      companyId: body.companyId || null,
    },
    include: { company: true },
  });
  return NextResponse.json(contact);
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = parseInt(searchParams.get("id"));
  await prisma.contact.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
