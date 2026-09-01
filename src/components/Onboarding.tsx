"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Phase = "initial" | "expanded" | "exit" | "done";

const WORDS = [
  { first: "A", rest: "LL" },
  { first: "T", rest: "HAT" },
  { first: "A", rest: "RT" },
];

export function Onboarding() {
  const [phase, setPhase] = useState<Phase>("initial");

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setPhase("done");
      return;
    }

    document.body.style.overflow = "hidden";

    // 전체적으로 느리고 여유 있게 흘러가도록 타이밍을 늘렸습니다.
    const t1 = setTimeout(() => setPhase("expanded"), 500);
    const t2 = setTimeout(() => setPhase("exit"), 2000);
    const t3 = setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = "";
    }, 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;

  const expanded = phase === "expanded" || phase === "exit";

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center bg-brand-accent transition-opacity duration-1200",
        phase === "exit" ? "opacity-0 pointer-events-none" : "opacity-100"
      )}
      aria-hidden="true"
    >
      {/* ATA -> ALL THAT ART : 가볍고 은은한 무게감으로 천천히 펼쳐짐 */}
      <div
        className={cn(
          "flex items-baseline justify-center transition-[gap] ease-[cubic-bezier(0.19,1,0.22,1)]",
          expanded ? "gap-3 md:gap-6" : "gap-1"
        )}
        style={{ transitionDuration: "1400ms" }}
      >
        {WORDS.map((word, i) => (
          <span
            key={i}
            className="font-serif font-normal text-white whitespace-nowrap text-4xl tracking-wide md:text-6xl"
          >
            {word.first}
            <span
              className="inline-block overflow-hidden transition-all ease-[cubic-bezier(0.19,1,0.22,1)]"
              style={{
                maxWidth: expanded ? "240px" : "0px",
                opacity: expanded ? 1 : 0,
                transitionDuration: "1600ms",
                transitionDelay: `${i * 300}ms`,
              }}
            >
              {word.rest}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
