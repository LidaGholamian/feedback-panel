import { NextResponse } from "next/server";
import db from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET(req: Request) {
  const session = await auth();

  if (!session || session.user?.email !== "admin@dorehami.dev") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const url = new URL(req.url);
  const statusFilter = url.searchParams.get("status"); // approved / pending / rejected
  const sort = (url.searchParams.get("sort") || "desc") as "asc" | "desc"; // asc / desc

  const comments = await db.comment.findMany({
    where: statusFilter ? { status: statusFilter } : {},
    orderBy: { createdAt: sort },
    include: { user: { select: { id: true, name: true, email: true } } },
  });

  return NextResponse.json(comments);
}
