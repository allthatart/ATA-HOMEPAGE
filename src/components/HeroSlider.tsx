"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { imageAlt } from "@/lib/image-alts";

const SLIDES = [
  { file: "hero-1.jpg", alt: "학생 작업 공간" },
  { file: "hero-2.jpg", alt: "포트폴리오 크리틱 수업" },
  { file: "hero-3.jpg", alt: "학생 작품" },
  { file: "hero-4.jpg", alt: "회화 실습 수업" },
  { file: "hero-5.jpg", alt: "학원 내부 공간" },
];

// 마지막 -> 처음으로 자연스럽게 넘어가도록, 맨 뒤에 첫 슬라이드를 하나 더 붙여둠
const TRACK_SLIDES = [...SLIDES, SLIDES[0]];

const INTERVAL_MS = 4000;
const TRANSITION_MS = 700; // 아래 className의 duration-700 과 같은 값
const LAST = SLIDES.length; // 맨 뒤에 붙여둔 복제 슬라이드의 위치

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [instant, setInstant] = useState(false);
  const { lang } = useLang();

  useEffect(() => {
    const timer = setInterval(() => {
      // 복제 슬라이드(LAST)를 넘어서 계속 커지지 않게 막습니다.
      // (다른 탭에 가 있는 동안에는 브라우저가 화면 전환을 멈춰서, 끝났다는 신호가 오지 않을 수 있습니다.
      //  그때 번호만 계속 커지면 사진 줄을 벗어나 빈 화면이 됩니다.)
      setIndex((i) => Math.min(i + 1, LAST));
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  // 복제 슬라이드에 도착하면, "전환 끝" 신호를 기다리지 않고 타이머로도 첫 슬라이드로 되돌립니다.
  useEffect(() => {
    if (index !== LAST) return;
    const t = setTimeout(() => {
      setInstant(true);
      setIndex(0);
    }, TRANSITION_MS + 100);
    return () => clearTimeout(t);
  }, [index]);

  // 다른 탭에 갔다가 돌아오면 위치를 바로잡습니다.
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState !== "visible") return;
      setInstant(true);
      setIndex((i) => (i >= LAST ? 0 : i));
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, []);

  // instant로 전환한 프레임이 화면에 그려지고 나면, 다음 전환을 위해 애니메이션을 다시 켠다
  useEffect(() => {
    if (!instant) return;
    const raf = requestAnimationFrame(() => setInstant(false));
    return () => cancelAnimationFrame(raf);
  }, [instant]);

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName !== "transform") return;
    if (index === LAST) {
      // 복제된 첫 슬라이드에 도착 -> 티 안 나게 진짜 첫 슬라이드로 순간 이동
      setInstant(true);
      setIndex(0);
    }
  };

  const goTo = (i: number) => {
    setInstant(false);
    setIndex(i);
  };

  return (
    <div className="relative w-full overflow-hidden bg-brand-ink">
      <div className="aspect-[80/21] w-full">
        <div
          className={`flex h-full ${instant ? "" : "transition-transform duration-700 ease-out"}`}
          style={{ transform: `translateX(-${index * 100}%)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {TRACK_SLIDES.map((slide, i) => (
            <div key={i} className="h-full w-full shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/images/${slide.file}`}
                alt={
                  i === SLIDES.length
                    ? ""
                    : imageAlt(`/images/${slide.file}`, lang, slide.alt)
                }
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* dot indicators */}
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.file}
            aria-label={`${i + 1}번 슬라이드로 이동`}
            onClick={() => goTo(i)}
            className={`size-2 rounded-full transition-all ${
              i === index % SLIDES.length ? "w-6 bg-brand-accent" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
