import { NextResponse } from "next/server";
import db from "@/lib/db";
import { auth } from "@/lib/auth";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();

  if (!session || session.user?.email !== "admin@dorehami.dev") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  await db.comment.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ message: "Comment deleted" });
}
