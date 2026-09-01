"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProgramItemCard({
  index,
  title,
  desc,
  who,
}: {
  index: number;
  title: string;
  desc: string;
  who?: string;
}) {
  const [open, setOpen] = useState(false);

  // 편입학/대학원처럼 정보성 카드 (클릭 없음)
  if (!who) {
    return (
      <div className="flex h-full flex-col rounded-2xl border-2 border-brand-line p-8">
        <span className="font-serif text-sm font-bold text-brand-accent">
          0{index + 1}
        </span>
        <h3 className="mt-4 font-serif text-xl font-bold text-brand-ink">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-brand-ink/70">
          {desc}
        </p>
      </div>
    );
  }

  // 신입학 3개 반: 클릭하면 "어떤 학생을 위한 과정인지" 펼쳐 보여줌
  return (
    <button
      onClick={() => setOpen((v) => !v)}
      className="flex h-full w-full flex-col rounded-2xl border-2 border-brand-line p-8 text-left transition-colors hover:border-brand-accent"
    >
      <div className="flex items-start justify-between">
        <span className="font-serif text-sm font-bold text-brand-accent">
          0{index + 1}
        </span>
        <ChevronDown
          className={cn(
            "size-5 text-brand-ink/40 transition-transform duration-300",
            open && "rotate-180"
          )}
        />
      </div>
      <h3 className="mt-4 font-serif text-xl font-bold text-brand-ink">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-brand-ink/70">{desc}</p>

      <div
        className={cn(
          "grid transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
          open ? "grid-rows-[1fr] mt-4" : "grid-rows-[0fr] mt-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-brand-line pt-4 text-sm">
            <span className="font-semibold text-brand-ink">
              이런 학생에게 추천해요
            </span>
            <p className="mt-1 leading-relaxed text-brand-ink/60">{who}</p>
          </div>
        </div>
      </div>
    </button>
  );
}
