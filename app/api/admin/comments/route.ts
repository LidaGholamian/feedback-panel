import { NextResponse } from "next/server";
import db from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();

  if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const comments = await db.comment.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });

  return NextResponse.json(comments);
}
