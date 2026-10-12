"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { imageAlt } from "@/lib/image-alts";

const ARTWORK_COUNT = 44;

const ARTWORKS = Array.from({ length: ARTWORK_COUNT }, (_, i) => ({
  src: `/images/student-artwork-${String(i + 1).padStart(2, "0")}.jpg`,
  alt: `학생 작품 ${i + 1}`,
}));

// 띠 하나가 너무 길면 브라우저가 중간을 그리지 못해 빈 구간이 생기므로,
// 같은 띠를 두 개 나란히 놓고 각각 자기 길이만큼만 이동시켜 이어붙입니다.
function Track({ hidden }: { hidden?: boolean }) {
  const { lang } = useLang();
  return (
    <div
      className="student-marquee-track flex shrink-0"
      aria-hidden={hidden || undefined}
    >
      {ARTWORKS.map((art) => (
        <div
          key={art.src}
          className="mr-6 h-64 w-52 shrink-0 overflow-hidden rounded-lg shadow-md ring-1 ring-black/15 md:h-80 md:w-64"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={art.src}
            alt={hidden ? "" : imageAlt(art.src, lang, art.alt)}
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}

export function StudentArtworkMarquee() {
  // 터치 기기: 손가락이 화면에 닿아 있는 동안만 멈춥니다.
  const [touching, setTouching] = useState(false);
  const release = () => setTouching(false);

  return (
    <div
      className={`marquee-wrap flex overflow-hidden py-4 ${touching ? "is-touching" : ""}`}
      onPointerDown={(e) => {
        if (e.pointerType === "touch") setTouching(true);
      }}
      onPointerUp={release}
      onPointerCancel={release}
      onPointerLeave={release}
    >
      <Track />
      <Track hidden />
    </div>
  );
}
