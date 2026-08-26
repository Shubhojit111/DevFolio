import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const filePath = path.join(
      process.cwd(),
      "Assets",
      "resume",
      "Shubhojit_Deb_Resume_(1)-1785302079265.pdf"
    );
    const file = await fs.readFile(filePath);
    return new NextResponse(file, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Shubhojit_Deb_Resume.pdf"',
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err) {
    console.error("Resume route error:", err);
    return NextResponse.json(
      { ok: false, error: "Resume file not found." },
      { status: 404 }
    );
  }
}