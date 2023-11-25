import type { Metadata } from "next";
import "./globals.css";
import { openSans } from "./fonts";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Modern Engineers (India)",
  description: "Admin Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full overflow-x-hidden">
      <body
        className={`${openSans.className} relative flex h-full flex-col overflow-x-hidden bg-slate-200`}
      >
        <header>
          <Navbar />
        </header>
        <main className="mx-2 flex flex-grow pb-2 sm:mx-4 sm:pb-4">
          {children}
        </main>
      </body>
    </html>
  );
}
