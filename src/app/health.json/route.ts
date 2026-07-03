import { NextResponse } from "next/server";
import packageJson from "../../../package.json";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(
    {
      schemaVersion: 1,
      status: "ok",
      service: "elegant-developer-studio",
      siteUrl: "https://raynode.me",
      runtime: "nextjs-standalone",
      checkedAt: new Date().toISOString(),
      package: {
        name: packageJson.name,
        version: packageJson.version,
      },
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
