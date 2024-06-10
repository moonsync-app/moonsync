import { NextRequest, NextResponse } from "next/server";
import { DASHBOARD_API_URL } from "@/lib/constants";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const maxDuration = 300; // set to 5 mins

export async function POST(request: NextRequest) {
  try {
    console.log(`[api:dashboard] Request: ${JSON.stringify(request)}`);

    const response = await fetch(DASHBOARD_API_URL, {
      method: "POST",
    });

    // Return the response body directly
    return new NextResponse(response.body);
  } catch (error) {
    console.error("[api:dashboard]", error);
    return NextResponse.json(
      {
        error: (error as Error).message,
      },
      {
        status: 500,
      },
    );
  }
}
