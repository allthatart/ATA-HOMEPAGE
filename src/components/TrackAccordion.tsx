"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { cn } from "@/lib/utils";
import type { CurriculumTrack } from "@/lib/curriculum-data";

export function TrackAccordion({ track }: { track: CurriculumTrack }) {
  const [expanded, setExpanded] = useState(false);
  const [activeSlug, setActiveSlug] = useState(track.subs[0].slug);

  const activeSub =
    track.subs.find((s) => s.slug === activeSlug) ?? track.subs[0];
  const isMulti = track.subs.length > 1;

  function selectSub(slug: string) {
    if (isMulti && slug === activeSlug) {
      setExpanded((v) => !v);
    } else {
      setActiveSlug(slug);
      setExpanded(true);
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-brand-line">
      {isMulti ? (
        <div className="flex flex-col divide-y divide-brand-line sm:flex-row sm:divide-x sm:divide-y-0">
          {track.subs.map((sub) => (
            <button
              key={sub.slug}
              onClick={() => selectSub(sub.slug)}
              className={cn(
                "flex-1 px-6 py-5 text-left transition-colors",
                activeSlug === sub.slug && expanded
                  ? "bg-brand-canvas"
                  : "hover:bg-brand-canvas/60"
              )}
            >
              <span className="font-serif text-lg font-bold text-brand-ink">
                {sub.name}
              </span>
            </button>
          ))}
        </div>
      ) : (
        <button
          onClick={() => selectSub(track.subs[0].slug)}
          className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-brand-canvas/60"
        >
          <span className="font-serif text-lg font-bold text-brand-ink">
            {track.subs[0].name}
          </span>
          <ChevronDown
            className={cn(
              "size-5 text-brand-ink/50 transition-transform duration-300",
              expanded && "rotate-180"
            )}
          />
        </button>
      )}

      {/* 드롭다운 콘텐츠 */}
      <div
        className={cn(
          "grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="space-y-6 border-t border-brand-line bg-brand-canvas/40 px-6 py-8">
            {activeSub.paragraphs.map((paragraph, i) => (
              <div key={i}>
                <p className="text-sm leading-relaxed text-brand-ink/75">
                  {paragraph}
                </p>
                {activeSub.images[i] && (
                  <PlaceholderImage
                    seed={activeSub.images[i].seed}
                    alt={activeSub.images[i].alt}
                    className="mt-4 aspect-[3/2]"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
