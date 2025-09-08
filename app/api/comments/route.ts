import { NextResponse } from "next/server";
import db from "@/lib/db";
import { auth } from "@/lib/auth";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const session = await auth();

  if (!session || session.user?.email !== "user@dorehami.dev" || !session.user?.id) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
}

  const { content, fileUrl } = await req.json();

  if (!content) return NextResponse.json({ error: "Content required" }, { status: 400 });
  if (!fileUrl.match(/\.(jpg|jpeg|png|gif|pdf)$/i)) {
    return NextResponse.json({ error: "Only images or PDF allowed" }, { status: 400 });
  }

  const comment = await db.comment.create({
    data: {
      content,
      fileUrl,
      userId: session.user.id,
      status: "pending",
    },
  });

  const transporter = nodemailer.createTransport({
  host: "localhost",
  port: 1025,
  secure: false,
});

await transporter.sendMail({
  from: '"Dorehami" <no-reply@dorehami.dev>',
  to: session.user.email,
  subject: "Your comment has been submitted",
  text: "Your comment has been successfully submitted and is awaiting admin approval.",
});

  return NextResponse.json(comment);
}
