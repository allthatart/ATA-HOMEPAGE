"use client";

import { useEffect, useState } from "react";

const SLIDES = [
  { seed: "allthatart-hero-1", alt: "학생 작업 공간" },
  { seed: "allthatart-hero-2", alt: "포트폴리오 크리틱 수업" },
  { seed: "allthatart-hero-3", alt: "학생 작품" },
  { seed: "allthatart-hero-4", alt: "회화 실습 수업" },
  { seed: "allthatart-hero-5", alt: "학원 내부 공간" },
];

const INTERVAL_MS = 4000;

export function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-brand-ink">
      <div className="aspect-[80/21] w-full">
        <div
          className="flex h-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {SLIDES.map((slide) => (
            <div key={slide.seed} className="h-full w-full shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://picsum.photos/seed/${slide.seed}/1920/840`}
                alt={slide.alt}
                className="h-full w-full object-cover grayscale"
              />
            </div>
          ))}
        </div>
      </div>

      {/* dot indicators */}
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.seed}
            aria-label={`${i + 1}번 슬라이드로 이동`}
            onClick={() => setIndex(i)}
            className={`size-2 rounded-full transition-all ${
              i === index ? "w-6 bg-brand-accent" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
