import { NextRequest, NextResponse } from "next/server";
import formidable, { File } from "formidable";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const form = formidable({ multiples: false, uploadDir: "./public/uploads", keepExtensions: true });

  return new Promise<NextResponse>((resolve, reject) => {
    form.parse(req as unknown as any, (err, fields, files) => {
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

      resolve(
        NextResponse.json({
          filePath: `/uploads/${path.basename(file.filepath)}`,
          fields,
        })
      );
    });
  });
}
