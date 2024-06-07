import StatsComponent from "@/app/home/stats";
import Header from "@/app/home/header";
import { Poppins } from "next/font/google";
import SpeedDial from "@/app/components/ui/speed-dial";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export default async function Page() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center gap-10 p-4 background-gradient ${poppins.className}`}
    >
      <div className="scale-125 transform">
        <SpeedDial />
      </div>
      <Header />
      <StatsComponent />
    </main>
  );
}
