import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware(auth => {
  auth().protect();
})

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"
  ],
};
