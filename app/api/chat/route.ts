import { StreamingTextResponse } from 'ai';
import { ChatMessage, MessageContent } from 'llamaindex';
import { NextRequest, NextResponse } from 'next/server';
import fetch from 'node-fetch';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

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
    const response = await fetch(
      `${apiUrl}?prompt=${encodeURIComponent(userMessageContent)}`,
      { method: 'GET' }
    );

    // Parse the response as text
    const text = await response.text();

    // Convert the string to a ReadableStream
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(text);
        controller.close();
      }
    });

    // Return a StreamingTextResponse, which can be consumed by the Vercel/AI client
    return new StreamingTextResponse(stream);
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
