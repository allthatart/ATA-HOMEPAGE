"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

// 다이아몬드를 이루는 4개의 조각. 각 조각은 흩어진 위치에서
// 날아와 하나의 사각형(회전하면 마름모)으로 조립됩니다.
const PIECES = [
  { initial: "translate(-70px, -70px) rotate(-20deg) scale(0.35)" },
  { initial: "translate(70px, -70px) rotate(20deg) scale(0.35)" },
  { initial: "translate(-70px, 70px) rotate(20deg) scale(0.35)" },
  { initial: "translate(70px, 70px) rotate(-20deg) scale(0.35)" },
];

export function ValueDiamond({
  title,
  titleEn,
  desc,
  descEn,
  baseDelay = 0,
  color = "var(--brand-accent)",
}: {
  title: string;
  titleEn?: string;
  desc: string;
  descEn?: string;
  baseDelay?: number;
  color?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { lang } = useLang();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative flex shrink-0 items-center justify-center"
      style={{
        width: "clamp(180px, 45vw, 320px)",
        height: "clamp(180px, 45vw, 320px)",
      }}
    >
      {/* 4개 조각이 모여 완성되는 사각형(전체를 45도 회전시켜 마름모로) */}
      <div
        className="grid grid-cols-2 grid-rows-2 overflow-hidden rounded-2xl border-[3px] border-white transition-[box-shadow] duration-1000 ease-out"
        style={{
          width: "clamp(130px, 30vw, 220px)",
          height: "clamp(130px, 30vw, 220px)",
          transform: "rotate(45deg)",
          boxShadow: visible ? `14px 18px 28px -8px ${color}99` : "none",
        }}
      >
        {PIECES.map((piece, i) => (
          <div
            key={i}
            className="transition-all ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              backgroundColor: color,
              transform: visible
                ? "translate(0px, 0px) rotate(0deg) scale(1)"
                : piece.initial,
              opacity: visible ? 1 : 0,
              transitionDuration: "1650ms",
              transitionDelay: visible ? `${baseDelay + i * 195}ms` : "0ms",
            }}
          />
        ))}
      </div>

      {/* 조립이 끝난 뒤 페이드인되는 텍스트 라벨 */}
      <div
        className="absolute flex flex-col items-center justify-center text-center transition-all duration-1000 ease-out"
        style={{
          width: "clamp(90px, 20vw, 170px)",
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1)" : "scale(0.85)",
          transitionDelay: visible ? `${baseDelay + 930}ms` : "0ms",
        }}
      >
        <h3 className="font-serif text-sm font-bold text-white md:text-lg">
          {lang === "en" ? titleEn ?? title : title}
        </h3>
        <p className="mt-2 text-[10px] leading-snug text-white/90 md:text-xs">
          {lang === "en" ? descEn ?? desc : desc}
        </p>
      </div>
    </div>
  );
}
