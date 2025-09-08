// app/api/comments/upload/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false, // چون از FormData استفاده می‌کنیم
  },
};

export async function POST(req: Request) {
  try {
    const data = await req.formData(); // native FormData
    const file = data.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file selected" }, { status: 400 });
    }

    // بررسی پسوند فایل
    const allowedExt = /\.(jpg|jpeg|png|gif|pdf)$/i;
    if (!file.name.match(allowedExt)) {
      return NextResponse.json({ error: "Only images or PDF allowed" }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const filePath = path.join(uploadDir, file.name);
    await fs.promises.writeFile(filePath, buffer);

    return NextResponse.json({ filePath: `/uploads/${file.name}` });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Upload failed" }, { status: 500 });
  }
}
