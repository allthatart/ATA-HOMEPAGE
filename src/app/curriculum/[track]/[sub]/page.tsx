import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { CURRICULUM_TRACKS, getSub } from "@/lib/curriculum-data";
import { T } from "@/components/T";
import { ClassLanding, HERO_BG } from "@/components/ClassLanding";

export function generateStaticParams() {
  return CURRICULUM_TRACKS.flatMap((t) =>
    t.subs.map((s) => ({ track: t.slug, sub: s.slug }))
  );
}

export default async function CurriculumSubDetailPage({
  params,
}: {
  params: Promise<{ track: string; sub: string }>;
}) {
  const { track: trackSlug, sub: subSlug } = await params;
  const result = getSub(trackSlug, subSlug);
  if (!result) notFound();
  const { track, sub } = result;

  // 신입학 ↔ 편입학 배경 이미지를 서로 바꿔 쓰고, 예비반·특강반은 각자 버튼 색 배경을 씁니다.
  const swapBg: Record<string, string> = { undergraduate: "transfer", transfer: "undergraduate" };
  const bgKey =
    sub.slug === "prep" || sub.slug === "intensive"
      ? sub.slug
      : sub.slug === "regular"
        ? swapBg[track.slug] ?? track.slug
        : track.slug;

  return (
    <>
      {sub.activities && (
        <ClassLanding
          sub={{
            ...sub,
            flowSteps: sub.flowSteps ?? track.flowSteps,
            flowCenterLabel: sub.flowCenterLabel ?? track.flowCenterLabel,
            flowCenterLabelEn: sub.flowCenterLabelEn ?? track.flowCenterLabelEn,
          }}
          heroBg={HERO_BG[bgKey] ?? "/images/track-hero-texture.jpg"}
          // 세로로 긴 모바일 화면에서도 색이 보이도록 예비반·특강반 배경은 오른쪽(색이 진한 쪽)을 보여줍니다.
          heroBgClass={
            sub.slug === "prep" || sub.slug === "intensive"
              ? "object-[70%_center] md:object-center"
              : "object-center"
          }
          heroDesc={sub.philosophy ?? sub.tagline}
          heroDescEn={sub.philosophyEn ?? sub.taglineEn}
        />
      )}

      {/* WHO IS IT FOR? */}
      {sub.who && (
        <section className="w-full bg-brand-canvas px-5 py-16 md:px-10">
          <Reveal className="mx-auto max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.2em] text-brand-accent-deep uppercase">
              Who is it for?
            </p>
            <h2 className="mt-3 font-serif text-xl font-bold text-brand-ink">
              <T ko="이런 학생에게 추천합니다" en="Recommended For" />
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {sub.who.map((item, i) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 rounded-lg bg-brand-paper p-4 text-sm text-brand-ink/80"
                >
                  <Check className="mt-0.5 size-4 shrink-0 text-brand-accent" />
                  <T ko={item} en={sub.whoEn?.[i] ?? item} />
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      )}

      {/* PROCESS */}
      {sub.process && (
        <section className="w-full bg-brand-ink px-5 py-20 md:px-10">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <p className="text-sm font-semibold tracking-[0.2em] text-brand-accent uppercase">
                Process
              </p>
              <h2 className="mt-3 font-serif text-xl font-bold text-white">
                <T ko="진행 과정" en="Process" />
              </h2>
            </Reveal>
            <div className="mt-8 space-y-0">
              {sub.process.map((step, i) => (
                <Reveal key={step.step} delay={i * 130}>
                  <div className="flex gap-5 border-l-2 border-brand-accent/40 py-4 pl-6">
                    <span className="font-serif text-lg font-bold text-brand-accent">
                      {step.step}
                    </span>
                    <div>
                      <p className="font-semibold text-white">
                        <T ko={step.title} en={step.titleEn ?? step.title} />
                      </p>
                      <p className="mt-1 text-sm text-white/60">
                        <T ko={step.desc} en={step.descEn ?? step.desc} />
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 상담 CTA */}
      <section className="w-full bg-brand-canvas px-5 py-16 md:px-10">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="font-serif text-lg font-bold text-brand-ink">
            <T
              ko={`${sub.name}에 대해 더 궁금하신가요?`}
              en={`Have more questions about ${sub.nameEn ?? sub.name}?`}
            />
          </p>
          <Link
            href="/consultation"
            className="inline-flex items-center rounded-full bg-brand-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-accent-deep"
          >
            <T ko="상담 예약하기 →" en="Book a Consultation →" />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
