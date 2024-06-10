import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { type JwtPayload } from "@clerk/types";
import { HOME_PATH } from "@/lib/constants";

interface CustomJwtPayload extends JwtPayload {
  metadata?: {
    onboardingComplete?: boolean;
  };
}

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
