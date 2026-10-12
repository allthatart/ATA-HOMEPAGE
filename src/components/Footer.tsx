"use client";

import Link from "next/link";
import { gyeonGothic } from "@/fonts";
import { InstagramIcon, BlogIcon, YoutubeIcon } from "@/components/SocialFloatingButtons";
import { useLang } from "@/lib/i18n";

export function Footer() {
  const { lang } = useLang();
  return (
    <footer className="border-t border-brand-line bg-brand-canvas">
      <div className="w-full px-5 py-14 md:px-10">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p
              className={`${gyeonGothic.className} text-lg tracking-wide text-brand-ink`}
            >
              ALL THAT ART
            </p>
            <p className="mt-3 text-sm leading-relaxed text-brand-ink/60">
              {lang === "en"
                ? "Everything about art study abroad. Built person to person."
                : "유학미술의 모든것. 사람과 사람이 만들어 갑니다."}
            </p>
            <div className="mt-4 flex gap-6">
              <a
                href="https://blog.naver.com/allthatartseoul"
                target="_blank"
                rel="noreferrer"
                aria-label="네이버 블로그"
                className="flex size-9 items-center justify-center rounded-full bg-brand-ink text-white shadow-lg transition-colors hover:bg-brand-accent"
              >
                <BlogIcon />
              </a>
              <a
                href="https://www.instagram.com/allthatart_seoul/"
                target="_blank"
                rel="noreferrer"
                aria-label="인스타그램"
                className="flex size-9 items-center justify-center rounded-full bg-brand-ink text-white shadow-lg transition-colors hover:bg-brand-accent"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://www.youtube.com/channel/UC7ryDQMngDpL1OF-9P9Vojw"
                target="_blank"
                rel="noreferrer"
                aria-label="유튜브"
                className="flex size-9 items-center justify-center rounded-full bg-brand-ink text-white shadow-lg transition-colors hover:bg-brand-accent"
              >
                <YoutubeIcon />
              </a>
            </div>
          </div>

          <div className="text-sm text-brand-ink/70">
            <p className="font-medium text-brand-ink">
              {lang === "en" ? "Location" : "오시는 길"}
            </p>
            <p className="mt-3">
              {lang === "en"
                ? "25, Nonhyeon-ro 168-gil, Gangnam-gu, Seoul"
                : "서울시 강남구 논현로 168길 25"}
            </p>
            <p className="mt-1">B/D Allthatart</p>
            <p className="mt-3">Tel. 02-3443-9894</p>
            <p className="mt-1">Fax. 02-3443-6549</p>
          </div>

          <div className="text-sm text-brand-ink/70">
            <p className="font-medium text-brand-ink">
              {lang === "en" ? "Quick Links" : "바로가기"}
            </p>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/about" className="hover:text-brand-accent">
                  {lang === "en" ? "About" : "학원 소개"}
                </Link>
              </li>
              <li>
                <Link href="/curriculum" className="hover:text-brand-accent">
                  {lang === "en" ? "Curriculum" : "커리큘럼"}
                </Link>
              </li>
              <li>
                <Link href="/results" className="hover:text-brand-accent">
                  {lang === "en" ? "Results" : "합격결과"}
                </Link>
              </li>
              <li>
                <Link href="/consultation" className="hover:text-brand-accent">
                  {lang === "en" ? "Consultation" : "상담예약"}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-brand-line pt-6 text-xs text-brand-ink/40">
          © 2010 - {new Date().getFullYear()} All That Art. All Rights
          Reserved.
        </div>
      </div>
    </footer>
  );
}
