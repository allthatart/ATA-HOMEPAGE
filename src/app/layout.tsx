import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SideMenu } from "@/components/SideMenu";
import { StickyCTABar } from "@/components/StickyCTABar";
import { CustomCursor } from "@/components/CustomCursor";
import { Onboarding } from "@/components/Onboarding";
import { AnnouncementPopup } from "@/components/AnnouncementPopup";

export const metadata: Metadata = {
  title: "올댓아트 - 유학미술의 모든것",
  description: "압구정 유학미술 전문 학원 올댓아트. 신입학·편입학·대학원 포트폴리오 준비.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;700;900&family=Noto+Sans+KR:wght@400;500;600;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-brand-paper text-brand-ink font-sans">
        <Onboarding />
        <AnnouncementPopup />
        <Header />
        <StickyCTABar />
        <main className="flex-1">{children}</main>
        <Footer />
        <SideMenu />
        <CustomCursor />
      </body>
    </html>
  );
}
