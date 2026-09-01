"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "소개" },
  { href: "/curriculum", label: "커리큘럼" },
  { href: "/results", label: "합격결과" },
  { href: "/blog", label: "콘텐츠" },
  { href: "/consultation", label: "상담예약" },
  { href: "/location", label: "오시는 길" },
];

export function SideMenu() {
  const [open, setOpen] = useState(false);

  // 메뉴 열려있을 때 배경 스크롤 막기
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // ESC로 닫기
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      {/* 화면 옆에 붙어있는 고정 탭 */}
      <button
        onClick={() => setOpen(true)}
        aria-label="메뉴 열기"
        className={cn(
          "fixed right-0 top-1/2 z-40 flex -translate-y-1/2 flex-col items-center gap-3 rounded-l-full bg-brand-ink px-2.5 py-7 text-white shadow-lg transition-all hover:-translate-x-1 hover:bg-brand-accent-deep",
          open && "pointer-events-none opacity-0"
        )}
      >
        <Menu className="size-4" />
        <span
          className="text-[11px] font-semibold tracking-[0.3em]"
          style={{ writingMode: "vertical-rl" }}
        >
          MENU
        </span>
      </button>

      {/* 오버레이 */}
      <div
        className={cn(
          "fixed inset-0 z-50 transition-opacity duration-300",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
      >
        <div
          className="absolute inset-0 bg-brand-ink/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />

        <div
          className={cn(
            "absolute right-0 top-0 flex h-full w-full max-w-[320px] flex-col bg-brand-paper shadow-2xl transition-transform duration-300 ease-out",
            open ? "translate-x-0" : "translate-x-full"
          )}
        >
          <button
            onClick={() => setOpen(false)}
            aria-label="메뉴 닫기"
            className="absolute right-6 top-6 text-brand-ink/50 transition-colors hover:text-brand-accent"
          >
            <X className="size-6" />
          </button>

          <nav className="flex h-full flex-col justify-center gap-1 px-10">
            {ITEMS.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "border-b border-brand-line py-4 font-serif text-2xl font-bold text-brand-ink transition-all duration-300 hover:text-brand-accent",
                  open
                    ? "translate-x-0 opacity-100"
                    : "translate-x-4 opacity-0"
                )}
                style={{ transitionDelay: open ? `${i * 40 + 100}ms` : "0ms" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <p className="px-10 pb-10 text-xs tracking-wide text-brand-ink/40">
            ALL THAT ART
          </p>
        </div>
      </div>
    </>
  );
}
