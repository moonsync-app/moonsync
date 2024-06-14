import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { CustomJwtPayload } from "@/app/types/jwt";

export default clerkMiddleware((auth, req: NextRequest) => {
  // redirect user to signin route automatically
  auth().protect();

  const { userId, sessionClaims } = auth();

  const customSessionClaims = sessionClaims as CustomJwtPayload | null;

  // For user visiting /onboarding, don't try and redirect
  if (userId && req.nextUrl.pathname === "/onboarding") {
    return NextResponse.next();
  }

  // Catch users who doesn't have `onboardingComplete: true` in PublicMetata
  // Redirect them to the /onboading out to complete onboarding
  if (userId && !customSessionClaims?.metadata?.onboardingComplete) {
    const onboardingUrl = new URL("/onboarding", req.url);
    return NextResponse.redirect(onboardingUrl);
  }
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!.+.[w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};
