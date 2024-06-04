import ChatSection from "@/app/components/chat-section";
import { Suspense } from "react";
import SpeedDial from "../components/ui/speed-dial";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Home() {
  return (
    <>
      <main
        className={`flex min-h-screen flex-col items-center gap-10 p-4 pt-20 lg:p-12 background-gradient ${poppins.className}`}
      >
        <SpeedDial />
        <Suspense>
          <ChatSection />
        </Suspense>
      </main>
    </>
  );
}
