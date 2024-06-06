import { NextRequest, NextResponse } from "next/server";
import { BIOMETRICS_API_URL } from "@/app/utils/constants";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const maxDuration = 300; // set to 5 mins

export async function POST(request: NextRequest) {
  try {
    console.log(`[api:biometrics] Request: ${JSON.stringify(request)}`);
    const body = await request.json();
    const value = body.key;
    // Make a POST request to the external API
    const response = await fetch(BIOMETRICS_API_URL, {
      method: "POST",
      // body: JSON.stringify({
      //   test: value
      // }),
    });

    // Return the response body directly
    return new NextResponse(response.body);
  } catch (error) {
    console.error("[api:biometrics]", error);
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
