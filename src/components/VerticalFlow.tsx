"use client";

import { cn } from "@/lib/utils";
import { useLang } from "@/lib/i18n";

type FlowNode = { title: string; desc: string; descEn?: string };

// 위에서 아래로 따뜻한 색(다홍 → 살구)이 이어지는 그라데이션
const COLORS = [
  "#C41F08",
  "#CE381B",
  "#D8502E",
  "#E26941",
  "#EB8154",
  "#F59A67",
  "#FFB27A",
];

export function VerticalFlow({ steps }: { steps: FlowNode[] }) {
  return (
    <div className="relative mx-auto max-w-3xl">
      {/* 중앙 세로선 */}
      <div className="absolute left-1/2 top-3 bottom-3 w-1 -translate-x-1/2 rounded-full bg-gradient-to-b from-[#C41F08] to-[#FFB27A]" />

      <div className="space-y-8 md:space-y-4">
        {steps.map((step, i) => {
          const isLeft = i % 2 === 0;
          const color = COLORS[i % COLORS.length];

          return (
            <div
              key={step.title}
              className="flex flex-col items-center gap-3 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-x-6"
            >
              {/* 데스크탑: 왼쪽 칸 */}
              <div className="hidden md:flex md:justify-end">
                {isLeft && <Bubble step={step} color={color} align="right" />}
              </div>

              {/* 번호 원 */}
              <div
                className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white shadow-md"
                style={{ backgroundColor: color }}
              >
                {i + 1}
              </div>

              {/* 데스크탑: 오른쪽 칸 */}
              <div className="hidden md:flex md:justify-start">
                {!isLeft && <Bubble step={step} color={color} align="left" />}
              </div>

              {/* 모바일: 원 바로 아래 */}
              <div className="md:hidden">
                <Bubble step={step} color={color} align="center" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Bubble({
  step,
  color,
  align,
}: {
  step: FlowNode;
  color: string;
  align: "left" | "right" | "center";
}) {
  const { lang } = useLang();
  return (
    <div
      className={cn(
        "relative max-w-xs rounded-xl border-3 bg-brand-canvas px-5 py-3.5",
        align === "center" && "text-center"
      )}
      style={{ borderColor: color }}
    >
      <p className="font-serif text-sm font-bold" style={{ color }}>
        {step.title}
      </p>
      <p className="mt-1 text-xs leading-relaxed text-brand-ink/70">
        {lang === "en" ? step.descEn ?? step.desc : step.desc}
      </p>
    </div>
  );
}
