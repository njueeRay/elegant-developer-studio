import { NextResponse } from "next/server";
import { getCommandIndexPayload } from "@/lib/command-index";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(getCommandIndexPayload(), {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
