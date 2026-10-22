import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SideMenu } from "@/components/SideMenu";
import { StickyCTABar } from "@/components/StickyCTABar";
import { Onboarding } from "@/components/Onboarding";
import { AnnouncementPopup } from "@/components/AnnouncementPopup";
import { LanguageProvider } from "@/lib/i18n";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "올댓아트 - 유학미술의 모든것",
    template: "%s | 올댓아트",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "ko_KR",
    title: "올댓아트 - 유학미술의 모든것",
    description: SITE_DESCRIPTION,
    images: [{ url: "/images/about-preview_01.jpg", width: 1200, height: 630, alt: "올댓아트 교실" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "올댓아트 - 유학미술의 모든것",
    description: SITE_DESCRIPTION,
    images: ["/images/about-preview_01.jpg"],
  },
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
        <LanguageProvider>
          <Onboarding />
          <AnnouncementPopup />
          <Header />
          <StickyCTABar />
          <main className="flex-1">{children}</main>
          <Footer />
          <SideMenu />
        </LanguageProvider>
      </body>
    </html>
  );
}
