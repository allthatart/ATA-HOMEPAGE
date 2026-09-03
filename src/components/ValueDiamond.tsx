"use client";

import { useEffect, useRef, useState } from "react";

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
  desc,
  baseDelay = 0,
}: {
  title: string;
  desc: string;
  baseDelay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

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
        className="grid grid-cols-2 grid-rows-2 overflow-hidden shadow-2xl"
        style={{
          width: "clamp(130px, 30vw, 220px)",
          height: "clamp(130px, 30vw, 220px)",
          transform: "rotate(45deg)",
        }}
      >
        {PIECES.map((piece, i) => (
          <div
            key={i}
            className="bg-brand-accent transition-all ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transform: visible
                ? "translate(0px, 0px) rotate(0deg) scale(1)"
                : piece.initial,
              opacity: visible ? 1 : 0,
              transitionDuration: "750ms",
              transitionDelay: visible ? `${baseDelay + i * 90}ms` : "0ms",
            }}
          />
        ))}
      </div>

      {/* 조립이 끝난 뒤 페이드인되는 텍스트 라벨 */}
      <div
        className="absolute flex flex-col items-center justify-center text-center transition-all duration-500 ease-out"
        style={{
          width: "clamp(90px, 20vw, 170px)",
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1)" : "scale(0.85)",
          transitionDelay: visible ? `${baseDelay + 430}ms` : "0ms",
        }}
      >
        <h3 className="font-serif text-sm font-bold text-white md:text-lg">
          {title}
        </h3>
        <p className="mt-2 text-[10px] leading-snug text-white/90 md:text-xs">
          {desc}
        </p>
      </div>
    </div>
  );
}
