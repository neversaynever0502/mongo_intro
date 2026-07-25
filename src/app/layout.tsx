import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif_TC } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LuckyDraw from "@/components/LuckyDraw";
import NameProvider from "@/components/NameProvider";
import WelcomeGate from "@/components/WelcomeGate";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSerifTC = Noto_Serif_TC({
  variable: "--font-noto-serif-tc",
  weight: ["400", "500", "600", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "日光芒果 — 台南玉井・樹上熟成愛文芒果",
  description: "來自台南玉井的樹上熟成芒果，套袋限產、產季直送，把整季陽光濃縮成一顆濃郁的甜。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-Hant"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSerifTC.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <NameProvider>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
          <LuckyDraw />
          <WelcomeGate />
        </NameProvider>
      </body>
    </html>
  );
}
