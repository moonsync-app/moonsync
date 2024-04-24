import { StreamingTextResponse } from 'ai';
import { ChatMessage, MessageContent } from 'llamaindex';
import { NextRequest, NextResponse } from 'next/server';
import { geolocation } from '@vercel/edge';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const maxDuration = 300; // set to 5 mins

const apiUrl = process.env.DASHBOARD_API_URL;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const value = body.key;
    // Make a POST request to the external API
    const response = await fetch(apiUrl, {
      method: 'POST',
      // body: JSON.stringify({
      //   test: value
      // }),
    });

    // Return the response body directly
    return new NextResponse(response.body);
  } catch (error) {
    console.error('[LlamaIndex]', error);
    return NextResponse.json(
      {
        error: (error as Error).message,
      },
      {
        status: 500,
      }
    );
  }
}
