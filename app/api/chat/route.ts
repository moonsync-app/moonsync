import { StreamingTextResponse } from 'ai';
import { ChatMessage, MessageContent } from 'llamaindex';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const maxDuration = 300; // set to 5 mins

const apiUrl = process.env.API_URL;

const convertMessageContent = (
  textMessage: string,
  imageUrl: string | undefined
): MessageContent => {
  if (!imageUrl) return textMessage;
  return [
    {
      type: 'text',
      text: textMessage,
    },
    {
      type: 'image_url',
      image_url: {
        url: imageUrl,
      },
    },
  ];
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, data }: { messages: ChatMessage[]; data: any } = body;
    const userMessage = messages.pop();
    if (!messages || !userMessage || userMessage.role !== 'user') {
      return NextResponse.json(
        {
          error:
            'messages are required in the request body and the last message must be from the user',
        },
        { status: 400 }
      );
    }

    // Convert message content from Vercel/AI format to LlamaIndex/OpenAI format
    const userMessageContent = convertMessageContent(
      userMessage.content,
      data?.imageUrl
    );

    // Make a GET request to the external API
    // const response = await fetch(
    //   `${apiUrl}?prompt=${encodeURIComponent(userMessageContent)}`,
    //   { method: 'GET' }
    // );

    // print out geolocation info
    const country = request.nextUrl.searchParams.get('country');
    const city = request.nextUrl.searchParams.get('city');
    const region = request.nextUrl.searchParams.get('region');

    console.log(`Country: ${country}, City: ${city}, Region: ${region}`);

    // Make a POST request to the external API
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-vercel-ip-city': city,
        'x-vercel-ip-country-region': region,
        'x-vercel-ip-country': country,
      },
      body: JSON.stringify({
        prompt: userMessageContent,
        messages: messages,
      }),
    });

    // Return the response body directly
    return new StreamingTextResponse(response.body);
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
