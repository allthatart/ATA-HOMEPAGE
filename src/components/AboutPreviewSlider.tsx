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
const TRANSITION_MS = 700; // 아래 className의 duration-700 과 같은 값
const LAST = FILES.length; // 맨 뒤에 붙여둔 복제 사진의 위치

export function AboutPreviewSlider() {
  const [index, setIndex] = useState(0);
  const [instant, setInstant] = useState(false);
  const { lang } = useLang();

  useEffect(() => {
    const timer = setInterval(() => {
      // 복제 사진(LAST)을 넘어서 계속 커지지 않게 막습니다.
      // (다른 탭에 가 있는 동안에는 브라우저가 화면 전환을 멈춰서, 끝났다는 신호가 오지 않을 수 있습니다.
      //  그때 번호만 계속 커지면 사진 줄을 벗어나 빈 화면이 됩니다.)
      setIndex((i) => Math.min(i + 1, LAST));
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  // 복제 사진에 도착하면, "전환 끝" 신호를 기다리지 않고 타이머로도 첫 사진으로 되돌립니다.
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

  useEffect(() => {
    if (!instant) return;
    const raf = requestAnimationFrame(() => setInstant(false));
    return () => cancelAnimationFrame(raf);
  }, [instant]);

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName !== "transform") return;
    if (index === LAST) {
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
