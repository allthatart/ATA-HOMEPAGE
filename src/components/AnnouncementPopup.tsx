"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ANNOUNCEMENT } from "@/lib/announcement";
import { useLang } from "@/lib/i18n";
import { imageAlt } from "@/lib/image-alts";

// 이미지가 여러 장이면 랜덤으로 한 장을 고릅니다. 바로 전에 보여준 이미지는 피합니다.
function pickImage(images: string[]): string {
  if (images.length === 0) return "";
  if (images.length === 1) return images[0];

  let last = "";
  try {
    last = localStorage.getItem("announcement-last-image") ?? "";
  } catch {}

  const candidates = images.filter((src) => src !== last);
  const pool = candidates.length > 0 ? candidates : images;
  const picked = pool[Math.floor(Math.random() * pool.length)];

  try {
    localStorage.setItem("announcement-last-image", picked);
  } catch {}
  return picked;
}

export function AnnouncementPopup() {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");
  const { lang } = useLang();

  useEffect(() => {
    if (!ANNOUNCEMENT.enabled) return;

    // 한 번 닫으면 같은 세션(브라우저 탭) 안에서는 다시 안 뜹니다.
    const dismissed = sessionStorage.getItem("announcement-dismissed");
    if (dismissed) return;

    const timer = setTimeout(() => {
      setImage(pickImage(ANNOUNCEMENT.images));
      setOpen(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  function close() {
    setOpen(false);
    sessionStorage.setItem("announcement-dismissed", "1");
  }

  if (!ANNOUNCEMENT.enabled || !open) return null;

  const hasImage = image.length > 0;
  const imageAltText = imageAlt(image, lang, ANNOUNCEMENT.title);

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center px-5">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={close}
        aria-hidden="true"
      />

      {hasImage ? (
        // 이미지 팝업: 직접 디자인한 이미지 한 장이 팝업 전체를 채웁니다.
        <div className="relative w-full max-w-sm overflow-hidden rounded-xl shadow-2xl">
          <button
            onClick={close}
            aria-label="닫기"
            className="absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
          >
            <X className="size-4" />
          </button>

          {ANNOUNCEMENT.linkHref ? (
            <Link href={ANNOUNCEMENT.linkHref} onClick={close}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt={imageAltText}
                className="block w-full"
              />
            </Link>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt={imageAltText}
              className="block w-full"
            />
          )}
        </div>
      ) : (
        // 텍스트 팝업 (기존 방식)
        <div className="relative w-full max-w-sm rounded-xl bg-white p-8 text-center shadow-2xl">
          <button
            onClick={close}
            aria-label="닫기"
            className="absolute right-4 top-4 text-brand-ink/40 transition-colors hover:text-brand-accent"
          >
            <X className="size-5" />
          </button>

          <h2 className="font-serif text-2xl font-bold text-brand-ink">
            {ANNOUNCEMENT.title}
          </h2>
          <p className="mt-4 leading-relaxed text-brand-ink/70">
            {ANNOUNCEMENT.message}
          </p>

          {ANNOUNCEMENT.linkHref && (
            <Button
              asChild
              className="mt-6 bg-brand-accent hover:bg-brand-accent-deep"
            >
              <Link href={ANNOUNCEMENT.linkHref} onClick={close}>
                {ANNOUNCEMENT.linkLabel}
              </Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
