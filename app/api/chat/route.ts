import { StreamingTextResponse } from "ai";
import { ChatMessage, MessageContent } from "llamaindex";
import { NextRequest, NextResponse } from "next/server";
import { geolocation } from "@vercel/edge";
import { CHAT_API_URL } from "../../utils/constants";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const maxDuration = 300; // set to 5 mins

const convertMessageContent = (
  textMessage: string,
  imageUrl: string | undefined,
): MessageContent => {
  if (!imageUrl) return textMessage;
  return [
    {
      type: "text",
      text: textMessage,
    },
    {
      type: "image_url",
      image_url: {
        url: imageUrl,
      },
    },
  ];
};

export async function POST(request: NextRequest) {
  console.log(`[llamaindex:chat] Request: ${JSON.stringify(request)}`);

  try {
    const body = await request.json();
    const { messages, data }: { messages: ChatMessage[]; data: any } = body;
    const userMessage = messages.pop();
    if (!messages || !userMessage || userMessage.role !== "user") {
      return NextResponse.json(
        {
          error:
            "messages are required in the request body and the last message must be from the user",
        },
        { status: 400 },
      );
    }

    // Convert message content from Vercel/AI format to LlamaIndex/OpenAI format
    const userMessageContent = convertMessageContent(
      userMessage.content,
      data?.imageUrl,
    );

    // Make a GET request to the external API
    // const response = await fetch(
    //   `${apiUrl}?prompt=${encodeURIComponent(userMessageContent)}`,
    //   { method: 'GET' }
    // );

    // print out geolocation info
    const {
      country = "US",
      city = "NYC",
      region = "NY",
    } = geolocation(request);
    console.log(`Country: ${country}, City: ${city}, Region: ${region}`);

    // Make a POST request to the external API
    const response = await fetch(CHAT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-vercel-ip-city": city,
        "x-vercel-ip-country-region": region,
        "x-vercel-ip-country": country,
      },
      body: JSON.stringify({
        prompt: userMessageContent,
        messages: messages,
      }),
    });

    // Return the response body directly
    if (response.body) {
      return new StreamingTextResponse(response.body);
    } else {
      throw new Error("Response body is null");
    }
  } catch (error) {
    console.error("[LlamaIndex]", error);
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
