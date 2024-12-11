import "@/components/app/styles/globals.css";

import { Inter } from "next/font/google";
import { Sidebar } from "@/components/widgets/sidebar/ui";
import { type Metadata } from "next";

import { ReactQueryProvider } from "@/components/app/providers/react-query";
import { ClerkProvider } from "@clerk/nextjs";
import MobileNavigation from "@/components/widgets/mobile-nav/ui";

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ReactQueryProvider>
      <ClerkProvider>
        <html
          lang="en"
          className={`dark antialiased ${inter.style.fontFamily}`}
        >
          <body className="relative flex flex-row bg-[#040404] text-white">
            <Sidebar />
            <main className="flex-1">{children}</main>
            <MobileNavigation />
          </body>
        </html>
      </ClerkProvider>
    </ReactQueryProvider>
  );
}
