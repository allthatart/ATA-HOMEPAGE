"use client";

import { useEffect, useRef } from "react";

export function AboutHero() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;

    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        // 배경은 스크롤 속도의 0.35배로만 움직여서, 콘텐츠보다 느리게 올라가는
        // 패럴랙스 효과를 만듭니다.
        const offset = window.scrollY * 0.35;
        if (bgRef.current) {
          bgRef.current.style.transform = `translateY(${offset}px)`;
        }
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      data-header-invert-zone="true"
      className="relative -mt-16 h-screen w-full overflow-hidden bg-brand-ink md:-mt-28"
    >
      <div
        ref={bgRef}
        className="absolute inset-x-0 -top-[15%] flex h-[130%] w-full items-center justify-center bg-brand-ink will-change-transform"
      >
        <span className="text-sm text-white/20">
          학원 수업 공간 사진 자리
        </span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/50" />

      <div className="relative z-10 flex h-full w-full flex-col justify-end px-5 pb-20 md:px-10 md:pb-28">
        <div className="mx-auto w-full max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.25em] text-white/70 uppercase">
            About All That Art
          </p>
          <h1 className="mt-5 font-serif text-5xl font-black leading-[1.05] text-white md:text-7xl">
            예술은 자신만의 세계를
            <br />
            발견하는 것에서 시작됩니다.
          </h1>
        </div>
      </div>

      {/* 스크롤 유도 */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-xs tracking-[0.3em] text-white/50">
        SCROLL
      </div>
    </section>
  );
}
