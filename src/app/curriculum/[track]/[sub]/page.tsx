import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { BrushStroke } from "@/components/BrushStroke";
import { CURRICULUM_TRACKS, getSub } from "@/lib/curriculum-data";

export function generateStaticParams() {
  // 신입학(정규반/특강반/예비반)은 이제 별도 페이지 없이
  // 트랙 랜딩 페이지 안 드롭다운으로만 안내합니다.
  return CURRICULUM_TRACKS.filter((t) => t.slug !== "undergraduate").flatMap(
    (t) => t.subs.map((s) => ({ track: t.slug, sub: s.slug }))
  );
}

export default async function CurriculumSubDetailPage({
  params,
}: {
  params: Promise<{ track: string; sub: string }>;
}) {
  const { track: trackSlug, sub: subSlug } = await params;
  if (trackSlug === "undergraduate") notFound();
  const result = getSub(trackSlug, subSlug);
  if (!result) notFound();
  const { track, sub } = result;

  return (
    <>
      {/* Header */}
      <section className="w-full px-5 pt-16 pb-12 md:px-10">
        <div className="mx-auto max-w-3xl">
          <Link
            href={
              `/curriculum/${track.slug}`
            }
            className="inline-flex items-center gap-1 text-sm text-brand-ink/50 transition-colors hover:text-brand-accent-deep"
          >
            <ArrowLeft className="size-4" />
            {track.title}으로
          </Link>

          <p className="mt-6 text-sm font-semibold tracking-[0.2em] text-brand-accent-deep uppercase">
            {sub.tag}
          </p>
          <div className="relative mt-4 max-w-xl">
            <BrushStroke className="absolute -left-3 top-2 h-10 w-52 opacity-90" />
            <h1 className="relative font-serif text-4xl font-bold leading-tight text-brand-ink">
              {sub.name}
            </h1>
          </div>
          <p className="mt-6 text-lg leading-relaxed text-brand-ink/80">
            {sub.tagline}
          </p>
          {sub.intro && (
            <p className="mt-4 leading-relaxed text-brand-ink/70">
              {sub.intro}
            </p>
          )}
        </div>
      </section>

      {/* WHO IS IT FOR? */}
      {sub.who && (
        <section className="w-full bg-brand-canvas px-5 py-16 md:px-10">
          <Reveal className="mx-auto max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.2em] text-brand-accent-deep uppercase">
              Who is it for?
            </p>
            <h2 className="mt-3 font-serif text-xl font-bold text-brand-ink">
              이런 학생에게 추천합니다
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {sub.who.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 rounded-lg bg-brand-paper p-4 text-sm text-brand-ink/80"
                >
                  <Check className="mt-0.5 size-4 shrink-0 text-brand-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      )}

      {/* CURRICULUM (regular/transfer/graduate 형) */}
      {sub.curriculum && (
        <section className="w-full px-5 py-16 md:px-10">
          <Reveal className="mx-auto max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.2em] text-brand-accent-deep uppercase">
              Curriculum
            </p>
            <h2 className="mt-3 font-serif text-xl font-bold text-brand-ink">
              실제 수업으로 연결됩니다
            </h2>
            <div className="mt-6 divide-y divide-brand-line rounded-xl border border-brand-line">
              {sub.curriculum.map((item) => (
                <div
                  key={item.subject}
                  className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="font-serif text-sm font-bold tracking-wide text-brand-ink">
                    {item.subject}
                  </span>
                  <span className="text-sm text-brand-ink/60">
                    {item.desc}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      {/* SPECIAL TOPICS (특강반 형) */}
      {sub.topics && (
        <section className="w-full px-5 py-16 md:px-10">
          <Reveal className="mx-auto max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.2em] text-brand-accent-deep uppercase">
              Special Topics
            </p>
            <h2 className="mt-3 font-serif text-xl font-bold text-brand-ink">
              이번엔 어떤 프로젝트를 경험할까요
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {sub.topics.map((item, i) => (
                <Reveal key={item.subject} delay={i * 100} variant="pop">
                  <div className="h-full rounded-xl border border-brand-line p-6">
                    <p className="font-serif text-base font-bold tracking-wide text-brand-ink">
                      {item.subject}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-brand-ink/70">
                      {item.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      {/* 예비반: 탐색 과목 + 철학 */}
      {sub.exploreSubjects && (
        <section className="w-full px-5 py-16 md:px-10">
          <Reveal className="mx-auto max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.2em] text-brand-accent-deep uppercase">
              Explore
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {sub.exploreSubjects.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-brand-line px-4 py-2 text-sm text-brand-ink/80"
                >
                  {item}
                </span>
              ))}
            </div>
            {sub.philosophy && (
              <p className="mt-8 font-serif text-lg font-bold leading-relaxed text-brand-ink">
                {sub.philosophy}
              </p>
            )}
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
                진행 과정
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
                      <p className="font-semibold text-white">{step.title}</p>
                      <p className="mt-1 text-sm text-white/60">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* OUTCOME */}
      {sub.outcome && (
        <section className="w-full px-5 py-20 md:px-10">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold tracking-[0.2em] text-brand-accent-deep uppercase">
              Outcome
            </p>
            <p className="mt-4 font-serif text-2xl font-bold text-brand-ink md:text-3xl">
              {sub.outcome}
            </p>
            {sub.outcomeItems && (
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {sub.outcomeItems.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-brand-accent px-5 py-2 text-sm font-medium text-white"
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}
          </Reveal>
        </section>
      )}

      {/* 상담 CTA */}
      <section className="w-full bg-brand-canvas px-5 py-16 md:px-10">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="font-serif text-lg font-bold text-brand-ink">
            {sub.name}에 대해 더 궁금하신가요?
          </p>
          <Link
            href="/consultation"
            className="inline-flex items-center rounded-full bg-brand-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-accent-deep"
          >
            상담 예약하기 →
          </Link>
        </Reveal>
      </section>
    </>
  );
}
