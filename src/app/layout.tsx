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
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${openSans.className} relative flex h-screen flex-col gap-2 overflow-x-hidden bg-slate-200/70 p-3 sm:gap-3`}
      >
        <header className="w-full">
          <Navbar />
        </header>
        {children}
      </body>
    </html>
  );
}
