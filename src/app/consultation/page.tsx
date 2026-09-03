import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BrushStroke } from "@/components/BrushStroke";
import { Reveal } from "@/components/Reveal";

const STEPS = [
  {
    title: "예약 신청",
    desc: "아래 버튼으로 상담 신청서를 작성해 주세요.",
  },
  {
    title: "일정 조율",
    desc: "담당 선생님이 확인 후 유선으로 방문 일정을 안내드려요.",
  },
  {
    title: "방문 상담",
    desc: "학생의 포트폴리오와 목표를 듣고 맞춤 커리큘럼을 제안해 드려요.",
  },
];

export default function ConsultationPage() {
  return (
    <>
      <section className="w-full px-5 md:px-10 pt-20 pb-16">
          <div className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold tracking-[0.2em] text-brand-accent-deep uppercase">
          Consultation
        </p>
        <div className="relative mt-4 max-w-2xl">
          <BrushStroke className="absolute -left-3 top-2 h-12 w-64 opacity-90" />
          <h1 className="relative font-serif text-4xl font-bold leading-tight text-brand-ink md:text-5xl">
            상담은 무료입니다.
            <br />
            편하게 문의해주세요.
          </h1>
        </div>
        <p className="mt-8 max-w-2xl leading-relaxed text-brand-ink/70">
          희망 대학과 전공, 현재 포트폴리오 상태를 먼저 듣고, 세밀한
          진학계획과 함께 맞춤 커리큘럼을 안내해 드립니다.
        </p>
      
          </div>
      </section>

      <section className="w-full px-5 md:px-10 pb-24">
        <div className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-start">
          <div className="space-y-4">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 120} className="flex gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-accent font-serif text-sm font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-brand-ink">
                    {step.title}
                  </p>
                  <p className="mt-1 text-sm text-brand-ink/60">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={150}>
          <Card className="border-brand-line bg-brand-canvas">
            <CardContent className="text-center py-4">
              <p className="font-serif text-xl font-bold text-brand-ink">
                지금 바로 상담을 예약하세요
              </p>
              <p className="mt-2 text-sm text-brand-ink/60">
                신청서 작성은 1분이면 충분해요.
              </p>

              <Button size="lg" className="mt-6 w-full sm:w-auto" asChild>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSejiDVG6zN3pnQQqneWR4lefiQqF7Lgaakys9fI6rRG0mARnw/viewform"
                  target="_blank"
                  rel="noreferrer"
                >
                  상담 신청서 작성하기
                </a>
              </Button>

              <div className="mt-8 border-t border-brand-line pt-6 text-sm text-brand-ink/70">
                <p>전화 상담도 가능합니다</p>
                <p className="mt-1 font-semibold text-brand-ink">
                  02-3443-9894
                </p>
              </div>
            </CardContent>
          </Card>
          </Reveal>
        </div>
      </section>
    </>
  );
}
