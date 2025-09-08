import { NextRequest, NextResponse } from "next/server";
import formidable, { File } from "formidable";
import path from "path";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {

  const uploadDir = path.join(process.cwd(), "public/uploads");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const form = formidable({ multiples: false, uploadDir, keepExtensions: true });

  return new Promise<NextResponse>((resolve, reject) => {

    form.parse(req as any, (err, fields, files) => {
      if (err) return reject(NextResponse.json({ error: err.message }, { status: 500 }));

      const fileField = files.file;
      let file: File;

      if (Array.isArray(fileField)) {
        file = fileField[0];
      } else if (fileField) {
        file = fileField as File;
      } else {
        return reject(NextResponse.json({ error: "No file uploaded" }, { status: 400 }));
      }

      const allowedExt = /\.(jpg|jpeg|png|gif|pdf)$/i;
      if (!file.originalFilename?.match(allowedExt)) {
        return reject(NextResponse.json({ error: "Only images or PDF allowed" }, { status: 400 }));
      }

      resolve(
        NextResponse.json({
          filePath: `/uploads/${path.basename(file.filepath)}`,
          fields,
        })
      );
    });
  });
}
