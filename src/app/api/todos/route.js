import { NextResponse } from "next/server";
import prisma from "@/lib/db";

// GET /api/todos?companyId=X
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const companyId = searchParams.get("companyId");

  const where = {};
  if (companyId) where.companyId = parseInt(companyId);

  const todos = await prisma.todo.findMany({
    where,
    orderBy: [{ completed: "asc" }, { createdAt: "desc" }],
  });

  return NextResponse.json(todos);
}

// POST /api/todos — create a new todo
export async function POST(request) {
  const body = await request.json();

  const todo = await prisma.todo.create({
    data: {
      text: body.text,
      companyId: body.companyId,
      completed: false,
    },
  });

  return NextResponse.json(todo);
}

// PUT /api/todos — update a todo (toggle completed, edit text)
export async function PUT(request) {
  const body = await request.json();
  const { id, ...data } = body;

  const todo = await prisma.todo.update({
    where: { id },
    data,
  });

  return NextResponse.json(todo);
}

// DELETE /api/todos?id=X
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = parseInt(searchParams.get("id"));
  await prisma.todo.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
