import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { AdmissionFlowDiagram } from "@/components/AdmissionFlowDiagram";
import { VerticalFlow } from "@/components/VerticalFlow";
import {
  CURRICULUM_TRACKS,
  getTrack,
  SUBJECT_INFOGRAPHIC,
} from "@/lib/curriculum-data";

export function generateStaticParams() {
  return CURRICULUM_TRACKS.map((t) => ({ track: t.slug }));
}

// 트랙별 히어로 배경 이미지 경로
const HERO_BG: Record<string, string> = {
  undergraduate: "/images/track-hero-texture.jpg",
  transfer: "/images/track-hero-texture2.jpg",
  graduate: "/images/track-hero-texture3.jpg",
};

export default async function CurriculumTrackLandingPage({
  params,
}: {
  params: Promise<{ track: string }>;
}) {
  const { track: trackSlug } = await params;
  const track = getTrack(trackSlug);
  if (!track || !track.flowSteps) notFound();

  const heroBg = HERO_BG[track.slug] ?? "/images/track-hero-texture.jpg";

  return (
    <>
      {/* HERO — 배경 위에 교육과정 전체를 설명하는 도식이 바로 얹힘 */}
      <section className="relative w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroBg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="relative z-10 px-5 py-14 md:px-10 md:py-32">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold tracking-[0.3em] text-brand-accent-deep uppercase">
              Curriculum · {track.heroTag}
            </p>
            <h1 className="mt-5 font-serif text-6xl font-black leading-none text-brand-ink md:text-8xl">
              {track.title}
            </h1>
            <p className="mt-6 leading-relaxed text-brand-ink/70 md:text-lg">
              {track.heroDesc}
            </p>
          </Reveal>

          <Reveal delay={200} className="mx-auto mt-16 max-w-3xl">
            <AdmissionFlowDiagram
              steps={track.flowSteps}
              centerLabel={track.flowCenterLabel ?? ""}
            />
          </Reveal>
        </div>
      </section>

      {/* CLASS */}
      <section className="w-full px-5 py-12 md:px-10 md:py-20">
        <div className="mx-auto max-w-5xl">
          <Reveal className="text-center">
            <p className="text-sm font-semibold tracking-[0.2em] text-brand-accent-deep uppercase">
              Class
            </p>
            <h2 className="mt-4 font-serif text-xl font-bold tracking-wide text-brand-ink">
              {track.programTitle}
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {track.classItems?.map((item, i) => (
              <Reveal key={item.title} delay={i * 130} variant="pop">
                <div className="flex h-full flex-col rounded-2xl border-2 border-brand-line p-7">
                  <p className="font-serif text-lg font-bold text-brand-accent-deep">
                    {item.title}
                  </p>
                  <p className="mt-3 font-semibold leading-snug text-brand-ink">
                    {item.headline}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-ink/70">
                    {item.desc}
                  </p>
                  <p className="mt-5 text-xs font-medium tracking-wide text-brand-accent-deep">
                    {item.keywords}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {track.classNote && (
            <Reveal delay={150} className="mt-10 text-center">
              <p className="mx-auto max-w-2xl leading-relaxed text-brand-ink/60">
                {track.classNote}
              </p>
            </Reveal>
          )}
        </div>
      </section>

      {/* SUBJECT */}
      <section className="w-full bg-brand-ink px-5 py-12 md:px-10 md:py-20">
        <div className="mx-auto max-w-4xl">
          <Reveal className="text-center">
            <p className="text-sm font-semibold tracking-[0.2em] text-brand-accent uppercase">
              Subject
            </p>
            <h2 className="mt-4 font-serif text-2xl font-bold text-white md:text-3xl">
              무엇을 배우는가
            </h2>
          </Reveal>

          <div className="mt-12 space-y-10">
            {SUBJECT_INFOGRAPHIC.map((group, gi) => (
              <Reveal key={group.category} delay={gi * 150}>
                <p className="text-center text-sm font-bold tracking-[0.2em] text-brand-accent">
                  {group.category}
                </p>
                <div className="mt-4 space-y-3">
                  {group.rows.map((row, ri) => (
                    <p
                      key={ri}
                      className="text-center text-sm text-white/80 md:text-base"
                    >
                      {row.join(" · ")}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WORKBOOK / PORTFOLIO */}
      <section className="w-full bg-brand-canvas px-5 py-14 md:px-10 md:py-24">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold tracking-[0.2em] text-brand-accent-deep uppercase">
            Workbook · Portfolio
          </p>
          <h2 className="mt-4 font-serif text-2xl font-bold text-brand-ink md:text-3xl">
            {track.workbookHeadline}
          </h2>
        </Reveal>

        {track.workbookSteps && (
          <Reveal delay={150} className="mt-14">
            <VerticalFlow steps={track.workbookSteps} />
          </Reveal>
        )}
      </section>

      {/* RESULT */}
      <section className="w-full px-5 py-14 md:px-10 md:py-24">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="whitespace-pre-line font-serif text-2xl font-bold leading-snug text-brand-ink md:text-3xl">
            {track.resultHeadline}
          </p>
          <p className="mt-6 leading-relaxed text-brand-ink/70">
            {track.resultDesc}
          </p>
        </Reveal>

        <Reveal delay={150} className="mx-auto mt-12 max-w-3xl">
          <div className="flex aspect-[16/10] w-full items-center justify-center rounded-xl bg-brand-canvas">
            <span className="text-sm text-brand-ink/30">
              포트폴리오 이미지 자리
            </span>
          </div>
        </Reveal>

        <div className="mt-12 text-center">
          <Link
            href="/consultation"
            className="inline-flex items-center rounded-full bg-brand-accent px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-deep"
          >
            상담 문의하기 →
          </Link>
        </div>
      </section>
    </>
  );
}
