import { Poppins } from "next/font/google";
import SpeedDial from "./components/ui/speed-dial";
import StatsComponent from "./home/stats";
import Header from "./home/header";
import { DonutChart } from "./components/ui/phase";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { createClient } from "./utils/supabase/server";
import { updateUser, createUserAndGenerateSession } from "./utils/auth"; // Import the updateUser function
import { clerkClient } from "@clerk/nextjs/server";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  console.log("PARAMS", searchParams);
  const { userId }: { userId: string | null } = auth();
  const supabase = createClient();
  let authUrl = null;

  //terra callback handler
  if (searchParams?.reference_id && userId) {
    await updateUser(supabase, userId, searchParams);
  } else if (userId) {
    authUrl = await createUserAndGenerateSession(supabase, userId);
  }

  const userData = userId ? await clerkClient.users.getUser(userId) : null;

  return (
    <main
      className={`flex min-h-screen flex-col items-center p-4 background-gradient ${poppins.className} pt-16`}
    >
      {authUrl && (
        <Link href={authUrl} className="cursor-pointer">
          <button className="text-lg"> Connect Biometrics </button>
        </Link>
      )}

      <SpeedDial />
      <Header userName={userData?.firstName} />
      {/* TODO make dynamic */}
      <DonutChart width={250} height={250} />
      <StatsComponent />
    </main>
  );
}
