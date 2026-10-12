"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { imageAlt } from "@/lib/image-alts";

const FILES = Array.from(
  { length: 16 },
  (_, i) => `about-preview_${String(i + 1).padStart(2, "0")}.jpg`
);

// 마지막 -> 처음으로 자연스럽게 넘어가도록, 맨 뒤에 첫 사진을 하나 더 붙여둠
const TRACK_FILES = [...FILES, FILES[0]];

const INTERVAL_MS = 2500;

export function AboutPreviewSlider() {
  const [index, setIndex] = useState(0);
  const [instant, setInstant] = useState(false);
  const { lang } = useLang();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => i + 1);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!instant) return;
    const raf = requestAnimationFrame(() => setInstant(false));
    return () => cancelAnimationFrame(raf);
  }, [instant]);

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName !== "transform") return;
    if (index === FILES.length) {
      setInstant(true);
      setIndex(0);
    }
  };

  return (
    <div className="aspect-[40/21] w-full overflow-hidden rounded-lg ring-1 ring-brand-line">
      <div
        className={`flex h-full ${instant ? "" : "transition-transform duration-700 ease-out"}`}
        style={{ transform: `translateX(-${index * 100}%)` }}
        onTransitionEnd={handleTransitionEnd}
      >
        {TRACK_FILES.map((file, i) => (
          <div key={i} className="h-full w-full shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/images/${file}`}
              alt={
                i === FILES.length
                  ? ""
                  : imageAlt(`/images/${file}`, lang, "올댓아트 학원 사진 / 작업 공간")
              }
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
