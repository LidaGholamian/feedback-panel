// app/api/comments/route.ts
import { NextResponse } from "next/server";
import db from "@/lib/db";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await auth();

  if (!session || session.user?.role !== "user") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { content, fileUrl } = await req.json();

  if (!content) return NextResponse.json({ error: "Content required" }, { status: 400 });
  if (!fileUrl.match(/\.(jpg|jpeg|png|gif|pdf)$/i)) {
    return NextResponse.json({ error: "Only images or PDF allowed" }, { status: 400 });
  }

  if (!session || !session.user?.id) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
}

  const comment = await db.comment.create({
    data: {
      content,
      fileUrl,
      userId: session.user.id,
      status: "pending",
    },
  });

  return NextResponse.json(comment);
}
