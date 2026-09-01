type FlowStep = { en: string; ko: string; desc: string };

export function AdmissionFlowDiagram({
  steps,
  centerLabel,
}: {
  steps: FlowStep[]; // 정확히 4개 (2x2 배치)
  centerLabel: string;
}) {
  const [a, b, c, d] = steps;

  return (
    <div className="relative rounded-2xl bg-white/50 p-6 shadow-xl backdrop-blur-sm md:p-10">
      {/* 중앙 세로 연결선 + 화살표 */}
      <div className="pointer-events-none absolute left-1/2 top-[18%] hidden h-[64%] w-[3px] -translate-x-1/2 bg-brand-accent/25 md:block" />
      <div className="pointer-events-none absolute left-1/2 bottom-[15%] hidden -translate-x-1/2 md:block">
        <div className="h-0 w-0 border-x-[7px] border-t-[10px] border-x-transparent border-t-brand-accent/40" />
      </div>

      <div className="relative grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-x-10 md:gap-y-10">
        <FlowBox {...a} />
        <FlowBox {...b} />
        <FlowBox {...c} />
        <FlowBox {...d} />
      </div>

      {/* 중앙 원 */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 md:flex">
        <div className="flex size-32 shrink-0 items-center justify-center rounded-full bg-brand-accent text-center shadow-lg lg:size-36">
          <span className="whitespace-pre-line font-serif text-sm font-bold leading-snug text-white lg:text-base">
            {centerLabel}
          </span>
        </div>
      </div>
    </div>
  );
}

function FlowBox({ en, ko, desc }: FlowStep) {
  return (
    <div className="rounded-xl bg-brand-canvas p-5 md:p-6">
      <p className="font-serif text-lg font-bold text-brand-accent-deep md:text-xl">
        {en}
      </p>
      <p className="mt-0.5 text-sm font-semibold text-brand-ink">{ko}</p>
      <p className="mt-2 text-sm leading-relaxed text-brand-ink/70">{desc}</p>
    </div>
  );
}
