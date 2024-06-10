import { StreamingTextResponse } from "ai";
import { ChatMessage, MessageContent } from "llamaindex";
import { NextRequest, NextResponse } from "next/server";
import { CHAT_API_URL } from "@/lib/constants";
import { getGeolocation } from "./geolocation";
import { db } from "@/app/drizzle";
import { eq } from "drizzle-orm";
import { ChatTable, UserTable } from "@/app/drizzle/schema";

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

async function persistChatMessage(userId: string, message: ChatMessage) {
  const user = await db.query.UserTable.findFirst({
    where: eq(UserTable.clerkId, userId),
  });
  if (!user) {
    throw new Error(`User with clerkId ${userId} not found`);
  }

  const chatMessage = await db.insert(ChatTable).values({
    userId: user.id,
    chatJson: message,
  });

  if (!chatMessage) {
    throw new Error("Failed to persist chat message");
  }
}

export async function POST(request: NextRequest) {
  console.log(`[api:chat] Request: ${JSON.stringify(request)}`);

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

    // persist chatMessage for user
    await persistChatMessage(
      request.headers.get("x-user-id") as string,
      userMessage,
    );

    // Convert message content from Vercel/AI format to LlamaIndex/OpenAI format
    const userMessageContent = convertMessageContent(
      userMessage.content,
      data?.imageUrl,
    );

    const { country, city, region } = getGeolocation(request);

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
    console.error("[api:chat]", error);
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
