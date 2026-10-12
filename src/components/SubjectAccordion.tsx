"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/i18n";
import { imageAlt } from "@/lib/image-alts";

type SubjectItem = { name: string; desc: string; descEn?: string };
type SubjectGroup = { category: string; items: SubjectItem[] };

// "LIGHT & ART" -> "light-art"  (public/images/subjects/light-art-1.jpg)
function subjectSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// fullSrc: 정사각 썸네일 대신 크게 볼 때 쓰는 원본(-full.jpg). 없으면 src로 대체됩니다.
type Photo = { src: string; fullSrc: string; alt: string };

function Lightbox({ photo, onClose }: { photo: Photo; onClose: () => void }) {
  const [imgSrc, setImgSrc] = useState(photo.fullSrc);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  // 부모의 transform 영향을 받지 않도록 body에 직접 렌더링합니다.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black/85 p-4 md:p-10"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="닫기"
        className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30 md:right-8 md:top-8"
      >
        <X className="size-6" />
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imgSrc}
        alt={photo.alt}
        onError={() => setImgSrc(photo.src)}
        onClick={(e) => e.stopPropagation()}
        className="max-h-full max-w-full cursor-default rounded-lg object-contain shadow-2xl"
      />
    </div>,
    document.body
  );
}

function SubjectPhoto({
  subject,
  index,
  onOpen,
}: {
  subject: string;
  index: number;
  onOpen: (photo: Photo) => void;
}) {
  const [failed, setFailed] = useState(false);
  const { lang } = useLang();

  if (failed) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-lg border border-dashed border-white/20 text-[11px] text-white/30">
        관련 작품 사진
      </div>
    );
  }

  const base = `/images/subjects/${subjectSlug(subject)}-${index}`;
  const src = `${base}.jpg`;
  const fullSrc = `${base}-full.jpg`;
  const alt = imageAlt(src, lang, `${subject} 관련 작품 ${index}`);

  return (
    <button
      type="button"
      onClick={() => onOpen({ src, fullSrc, alt })}
      aria-label={`${alt} 크게 보기`}
      className="cursor-zoom-in overflow-hidden rounded-lg"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setFailed(true)}
        className="aspect-square w-full object-cover transition-transform duration-300 hover:scale-105"
      />
    </button>
  );
}

export function SubjectAccordion({ groups }: { groups: SubjectGroup[] }) {
  const [selected, setSelected] = useState<SubjectItem | null>(
    groups[0]?.items[0] ?? null
  );
  const [lightbox, setLightbox] = useState<Photo | null>(null);
  const { lang } = useLang();

  function toggle(item: SubjectItem) {
    setSelected((prev) => (prev?.name === item.name ? null : item));
  }

  return (
    <div>
      <div className="grid gap-8 md:grid-cols-2">
        {groups.map((group) => (
          <div key={group.category}>
            <p className="text-sm font-bold tracking-[0.15em] text-brand-accent">
              {group.category}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <button
                  key={item.name}
                  onClick={() => toggle(item)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm transition-colors",
                    selected?.name === item.name
                      ? "border-brand-accent bg-brand-accent text-white"
                      : "border-white/20 text-white/85 hover:border-brand-accent hover:text-white"
                  )}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 선택된 과목 상세 (펼침) */}
      <div
        className={cn(
          "grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          selected ? "grid-rows-[1fr] mt-10" : "grid-rows-[0fr] mt-0"
        )}
      >
        <div className="overflow-hidden">
          {selected && (
            <div className="rounded-xl border border-white/15 bg-white/5 p-6 md:p-8">
              <p className="font-serif text-lg font-bold tracking-wide text-white">
                {selected.name}
              </p>
              <p className="mt-2 text-sm text-white/70">
                {lang === "en" ? selected.descEn ?? selected.desc : selected.desc}
              </p>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {[1, 2, 3].map((i) => (
                  <SubjectPhoto
                    key={`${selected.name}-${i}`}
                    subject={selected.name}
                    index={i}
                    onOpen={setLightbox}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {lightbox && (
        <Lightbox photo={lightbox} onClose={() => setLightbox(null)} />
      )}
    </div>
  );
}
