"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/about", label: "소개" },
  { href: "/results", label: "합격결과" },
  { href: "/blog", label: "콘텐츠" },
  { href: "/location", label: "오시는 길" },
];

const CURRICULUM_SUB_ITEMS = [
  { href: "/curriculum/undergraduate", label: "신입학준비" },
  { href: "/curriculum/transfer", label: "편입학준비" },
  { href: "/curriculum/graduate", label: "대학원준비" },
];

export function Header() {
  // 페이지 안에 data-header-invert-zone 요소가 있으면(예: 소개 페이지 히어로),
  // 그 구간이 화면에 보이는 동안만 헤더 글자색을 흰색으로 반전합니다.
  const pathname = usePathname();
  // /about 진입 시 히어로가 처음부터 보이는 상태이므로, 깜빡임 없이
  // 곧바로 반전 상태로 시작합니다.
  const [inverted, setInverted] = useState(pathname === "/about");

  useEffect(() => {
    // 경로가 바뀔 때마다(메뉴 클릭으로 이동한 경우 포함) 다시 확인합니다.
    setInverted(pathname === "/about");

    const target = document.querySelector("[data-header-invert-zone]");
    if (!target) {
      setInverted(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setInverted(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        inverted
          ? "border-b border-transparent bg-white/15 backdrop-blur-md"
          : "border-b border-brand-line bg-brand-paper/90 backdrop-blur"
      )}
    >
      <div className="flex h-28 w-full items-center justify-between px-5 md:px-10">
        <Link
          href="/"
          className={cn(
            "group flex items-center gap-2 font-serif font-bold tracking-tight transition-colors duration-300",
            inverted ? "text-white" : "text-brand-ink"
          )}
          style={{ fontSize: "33px", letterSpacing: "-0.01em" }}
        >
          {/* 로고 이미지: public/images/logo.png 파일을 넣으면 자동으로 표시됩니다.
              이미지가 없으면 아래 텍스트 로고가 대신 보여요. */}
          <Image
            src="/images/logo.png"
            alt="ALL THAT ART 로고"
            width={44}
            height={44}
            className="h-11 w-auto"
            priority
          />
          <span className="relative inline-block whitespace-nowrap">
            <span className="relative z-0">ALL THAT ART</span>
            <span
              aria-hidden="true"
              className="absolute inset-0 z-10 whitespace-nowrap text-brand-accent [clip-path:circle(0%_at_50%_50%)] transition-[clip-path] duration-500 ease-out group-hover:[clip-path:circle(150%_at_50%_50%)]"
            >
              ALL THAT ART
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-12 md:flex">
          <Link
            href="/about"
            className={cn(
              "text-base font-medium transition-colors duration-300",
              inverted
                ? "text-white/90 hover:text-brand-accent"
                : "text-brand-ink/80 hover:text-brand-accent"
            )}
          >
            소개
          </Link>

          {/* 커리큘럼: 호버 시 서브메뉴(로컬 네비게이션) 노출 */}
          <div className="group relative">
            <Link
              href="/curriculum"
              className={cn(
                "flex items-center gap-1 py-10 text-base font-medium transition-colors duration-300",
                inverted
                  ? "text-white/90 hover:text-brand-accent"
                  : "text-brand-ink/80 hover:text-brand-accent"
              )}
            >
              커리큘럼
            </Link>

            <div className="invisible absolute left-1/2 top-full w-44 -translate-x-1/2 translate-y-[-8px] rounded-lg border border-brand-line bg-brand-paper py-2 opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              {CURRICULUM_SUB_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2.5 text-sm text-brand-ink/70 transition-colors hover:bg-brand-canvas hover:text-brand-accent-deep"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {NAV_ITEMS.filter((item) => item.href !== "/about").map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-base font-medium transition-colors duration-300",
                inverted
                  ? "text-white/90 hover:text-brand-accent"
                  : "text-brand-ink/80 hover:text-brand-accent"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Button
          asChild
          size="lg"
          className={cn(
            "transition-colors duration-300",
            inverted &&
              "border border-white bg-transparent text-white hover:bg-white hover:text-brand-ink"
          )}
        >
          <Link href="/consultation">상담예약</Link>
        </Button>
      </div>
    </header>
  );
}
