import { Check, Copy } from "lucide-react";

import type { Message } from "ai/react";
import Image from "next/image";
import { Button } from "@/app/components/ui/button";
import ChatAvatar from "@/app/components/ui/chat/chat-avatar";
import Markdown from "@/app/components/ui/chat/markdown";
import { useCopyToClipboard } from "@/app/components/ui/chat/use-copy-to-clipboard";

// This component will parse message data and render the appropriate UI.
function ChatMessageData({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="rounded-md max-w-[200px] shadow-md">
      <Image
        src={imageUrl}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        alt=""
      />
    </div>
  );
}

export default function ChatMessage(chatMessage: Message) {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });
  console.log("chatMessage", chatMessage);
  const imageUrl = localStorage.getItem(chatMessage.content);
  return (
    <div className="flex items-start gap-4 pr-5 pt-5">
      <ChatAvatar role={chatMessage.role} />
      <div className="group flex flex-1 justify-between gap-2">
        <div className="flex-1 space-y-4">
          <Markdown content={chatMessage.content} />
          {imageUrl && <ChatMessageData imageUrl={imageUrl} />}
        </div>
        <Button
          onClick={() => copyToClipboard(chatMessage.content)}
          size="icon"
          variant="ghost"
          className="h-8 w-8 opacity-0 group-hover:opacity-100"
        >
          {isCopied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
