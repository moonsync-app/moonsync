import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Moonsync",
  description: "How can I help you?",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={poppins.className}>
        <body>
          <main>
            {children}
            <Analytics />
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
