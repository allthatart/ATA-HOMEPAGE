import { Reveal } from "@/components/Reveal";
import { AdmissionFlowDiagram } from "@/components/AdmissionFlowDiagram";
import { T } from "@/components/T";
import type { CurriculumSub } from "@/lib/curriculum-data";

// 트랙별 히어로 배경 이미지 경로
export const HERO_BG: Record<string, string> = {
  undergraduate: "/images/track-hero-texture.jpg",
  transfer: "/images/track-hero-texture2.jpg",
  graduate: "/images/track-hero-texture3.jpg",
  // 예비반(회색)·특강반(청록)은 버튼 색에 맞춘 배경을 씁니다.
  prep: "/images/track-hero-prep.jpg",
  intensive: "/images/track-hero-intensive.jpg",
};

// 반(예: 예비반) 전용 소개: 맨 위 제목/설명 + 4단계 도식 + "해볼 수 있는 것들" 카드
export function ClassLanding({
  sub,
  heroBg,
  heroBgClass = "object-center",
  heroDesc,
  heroDescEn,
}: {
  sub: CurriculumSub;
  heroBg: string;
  heroBgClass?: string;
  heroDesc: string;
  heroDescEn?: string;
}) {
  return (
    <>
      <section className="relative w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroBg}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover ${heroBgClass}`}
        />

        <div className="relative z-10 px-5 py-14 md:px-10 md:py-32">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold tracking-[0.3em] text-brand-accent-deep uppercase">
              Curriculum · {sub.tag}
            </p>
            <h1 className="mt-5 font-serif text-6xl font-black leading-none text-brand-ink md:text-8xl">
              <T ko={sub.name} en={sub.nameEn ?? sub.name} />
            </h1>
            <p className="mt-6 leading-relaxed text-brand-ink/70 md:text-lg">
              <T ko={heroDesc} en={heroDescEn ?? heroDesc} />
            </p>
          </Reveal>

          {sub.flowSteps && (
            <Reveal delay={200} className="mx-auto mt-16 max-w-3xl">
              <AdmissionFlowDiagram
                steps={sub.flowSteps}
                centerLabel={sub.flowCenterLabel ?? ""}
                centerLabelEn={sub.flowCenterLabelEn}
              />
            </Reveal>
          )}
        </div>
      </section>

      {sub.activities && (
        <section className="w-full px-5 py-12 md:px-10 md:py-20">
          <div className="mx-auto max-w-5xl">
            <Reveal className="text-center">
              <p className="text-sm font-semibold tracking-[0.2em] text-brand-accent-deep uppercase">
                Activities
              </p>
              <h2 className="mt-4 font-serif text-2xl font-bold text-brand-ink md:text-3xl">
                <T
                  ko={sub.activitiesTitle}
                  en={sub.activitiesTitleEn ?? sub.activitiesTitle}
                />
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {sub.activities.map((item, i) => (
                <Reveal key={item.title} delay={i * 100} variant="pop">
                  <div className="flex h-full flex-col rounded-2xl border-2 border-brand-line p-7">
                    <p className="font-serif text-lg font-bold text-brand-accent-deep">
                      <T ko={item.title} en={item.titleEn ?? item.title} />
                    </p>
                    <p className="mt-3 font-semibold leading-snug text-brand-ink">
                      <T ko={item.headline} en={item.headlineEn ?? item.headline} />
                    </p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-ink/70">
                      <T ko={item.desc} en={item.descEn ?? item.desc} />
                    </p>
                    <p className="mt-5 text-xs font-medium tracking-wide text-brand-accent-deep">
                      <T ko={item.keywords} en={item.keywordsEn ?? item.keywords} />
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
