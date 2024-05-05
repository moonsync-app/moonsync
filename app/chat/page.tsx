import ChatSection from "@/app/components/chat-section";
import { Suspense } from "react";
import SpeedDial from "../components/ui/speed-dial";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center gap-10 p-4 pt-20 lg:p-12 background-gradient">
        <SpeedDial />
        {/* <Header /> */}
        <Suspense>
          <ChatSection />
        </Suspense>
        {/* <Footer /> */}
      </main>
    </>
  );
}
