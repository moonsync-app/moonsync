import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { HOME_PATH } from "@/lib/constants";
import { CustomJwtPayload } from "@/app/types/jwt";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sessionClaims } = auth();

  const customSessionClaims = sessionClaims as CustomJwtPayload | null;

  if (customSessionClaims?.metadata?.onboardingComplete === true) {
    redirect(HOME_PATH);
  }

  return <>{children}</>;
}
