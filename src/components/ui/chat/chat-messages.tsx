"use client";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import ChatActions from "@/components/ui/chat/chat-actions";
import ChatMessage from "@/components/ui/chat/chat-message";
import { ChatHandler } from "@/components/ui/chat/chat.interface";

export default function ChatMessages(
  props: Pick<ChatHandler, "messages" | "isLoading" | "reload" | "stop">,
) {
  const scrollableChatContainerRef = useRef<HTMLDivElement>(null);
  const messageLength = props.messages.length;
  const lastMessage = props.messages[messageLength - 1];

  const scrollToBottom = () => {
    if (scrollableChatContainerRef.current) {
      scrollableChatContainerRef.current.scrollTop =
        scrollableChatContainerRef.current.scrollHeight;
    }
  };

  const isLastMessageFromAssistant =
    messageLength > 0 && lastMessage?.role !== "user";
  const showReload =
    props.reload && !props.isLoading && isLastMessageFromAssistant;
  const showStop = props.stop && props.isLoading;

  // `isPending` indicate
  // that stream response is not yet received from the server,
  // so we show a loading indicator to give a better UX.
  const isPending = props.isLoading && !isLastMessageFromAssistant;

  useEffect(() => {
    scrollToBottom();
  }, [messageLength, lastMessage]);

  const [messageIndex, setMessageIndex] = useState(0);
  const [showLastMessage, setShowLastMessage] = useState(false);

  const loadingMessages = [
    "Looking into your biometrics",
    "Oh btw, you look great today",
    "Querying the knowledge engines",
    "Compiling the answer for you",
  ];

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;

    if (isPending && !showLastMessage) {
      interval = setInterval(() => {
        setMessageIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          if (nextIndex === loadingMessages.length) {
            setShowLastMessage(true);
          }
          return nextIndex % loadingMessages.length;
        });
      }, 4500);
    }

    return () => {
      setMessageIndex(0);
      setShowLastMessage(false);
      clearInterval(interval);
    };
  }, [isPending, showLastMessage, loadingMessages.length]);

  return (
    <div className="w-full rounded-xl bg-white p-4 shadow-xl pb-0">
      <div
        className="flex h-[50vh] flex-col gap-5 divide-y overflow-y-auto pb-4"
        ref={scrollableChatContainerRef}
      >
        {props.messages.map((m) => (
          <ChatMessage key={m.id} {...m} />
        ))}
        {isPending && (
          <div className="flex flex-col justify-center items-center pt-10">
            <Loader2 className="h-4 w-4 animate-spin" />
            <div className="italic">
              {showLastMessage
                ? loadingMessages[loadingMessages.length - 1]
                : loadingMessages[messageIndex]}
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-end py-4">
        <ChatActions
          reload={props.reload}
          stop={props.stop}
          showReload={showReload}
          showStop={showStop}
        />
      </div>
    </div>
  );
}
