import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "우리 동네 생활 정보 | 성남시 행사·축제·지원금 혜택",
  description: "공공데이터 기반 실시간 성남시 축제, 문화행사 및 놓치기 쉬운 지자체 지원금·혜택 정보를 한눈에 확인하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#F8FAFC] text-slate-800 selection:bg-blue-100 selection:text-blue-900">
        {children}
      </body>
    </html>
  );
}
