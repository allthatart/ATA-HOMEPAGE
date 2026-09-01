"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type SubjectItem = { name: string; desc: string };
type SubjectGroup = { category: string; items: SubjectItem[] };

export function SubjectAccordion({ groups }: { groups: SubjectGroup[] }) {
  const [selected, setSelected] = useState<SubjectItem | null>(
    groups[0]?.items[0] ?? null
  );

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
              <p className="mt-2 text-sm text-white/70">{selected.desc}</p>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex aspect-square items-center justify-center rounded-lg border border-dashed border-white/20 text-[11px] text-white/30"
                  >
                    관련 작품 사진
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
