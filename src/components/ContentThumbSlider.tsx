"use client";

import { useState } from "react";

export type SlideImage = {
  src: string;
  alt: string;
  href?: string;
};

export function ContentThumbSlider({ images }: { images: SlideImage[] }) {
  const [paused, setPaused] = useState(false);
  // 이어붙임(seamless loop)을 위해 배열을 두 번 반복합니다.
  const doubled = [...images, ...images];

  return (
    <div
      className="overflow-x-hidden py-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="marquee-track flex w-max gap-5"
        style={{
          animationDuration: "62.7s",
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {doubled.map((img, i) => {
          const thumb = (
            <div className="relative aspect-[4/3] w-72 shrink-0 overflow-hidden rounded-lg border-2 border-transparent bg-brand-canvas transition-all duration-300 hover:z-10 hover:scale-110 hover:border-[#FF4010] md:w-80">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover"
              />
            </div>
          );

          return img.href ? (
            <a
              key={i}
              href={img.href}
              target="_blank"
              rel="noreferrer"
              className="shrink-0"
            >
              {thumb}
            </a>
          ) : (
            <div key={i}>{thumb}</div>
          );
        })}
      </div>
    </div>
  );
}
