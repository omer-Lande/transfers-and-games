import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Tiki-Transfer | Football Web App",
  description: "Live Transfer Tracker, On This Day history, and Tiki-Taka-Toe Game",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-emerald-500/30`}>
        <Sidebar />
        <main className="flex-1 overflow-x-hidden w-full relative h-screen overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
