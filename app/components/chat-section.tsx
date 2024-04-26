"use client";

import { useChat } from "ai/react";
import { useState, useMemo, useEffect, useRef } from "react";
import { insertDataIntoMessages } from "./transform";
import { ChatInput, ChatMessages } from "./ui/chat";
import { useRouter} from 'next/navigation'
import { useSearchParams } from 'next/navigation'

export default function ChatSection() {
  const searchParams = useSearchParams()
  const [firstSearch, setFirstSearch] = useState(false);
 
  const query = searchParams.get('query')
  console.log("query", query)

  const {
    messages,
    input,
    isLoading,
    handleSubmit,
    handleInputChange,
    reload,
    stop,
    data,
  } = useChat({
    api: process.env.NEXT_PUBLIC_CHAT_API,
    headers: {
      "Content-Type": "application/json", // using JSON because of vercel/ai 2.2.26
    },
    initialInput : query ? query : "",
  });

  const inputRef = useRef<HTMLButtonElement>(null)
  console.log('messages', messages)
  useEffect(() => {
    if(!firstSearch && query) {
      if(inputRef.current) {
        inputRef.current.click()
      }
      setFirstSearch(true)
    }
  }, [firstSearch, query])
  

  const transformedMessages = useMemo(() => {
    return insertDataIntoMessages(messages, data);
  }, [messages, data]);

  return (
    <div className="space-y-4 max-w-6xl w-full">
      <ChatMessages
        messages={transformedMessages}
        isLoading={isLoading}
        reload={reload}
        stop={stop}
      />
      <ChatInput
        input={input}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        isLoading={isLoading}
        multiModal={process.env.NEXT_PUBLIC_MODEL === "gpt-4-vision-preview"}
        currRef={inputRef}
      />
    </div>
  );
}
