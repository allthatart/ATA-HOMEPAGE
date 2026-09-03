import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { TrackBox } from "@/components/TrackBox";
import { SubjectAccordion } from "@/components/SubjectAccordion";
import {
  CURRICULUM_TRACKS,
  METHODOLOGY,
  SUBJECT_GROUPS,
} from "@/lib/curriculum-data";

const BOX_LABELS: Record<string, string> = {
  undergraduate: "신입학 준비",
  transfer: "편입학 준비",
  graduate: "대학원 준비",
};

export default function CurriculumPage() {
  return (
    <>
      {/* Hero — 파스텔 보라 배경 */}
      <section className="w-full bg-[linear-gradient(to_bottom,#FFEEE6_0%,#FFEEE6_100%,#363636_100%)] px-5 pt-14 pb-10 md:px-10 md:pt-24 md:pb-30">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold tracking-[0.2em] text-brand-accent-deep uppercase">
            Curriculum
          </p>
          <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-brand-ink md:text-6xl">
            올댓아트
            <br />
            커리큘럼 로드맵
          </h1>
          <p className="mt-6 leading-relaxed text-brand-ink/70">
            지금 내 위치에 맞는 다음 단계를 한눈에 확인할 수 있도록,
            올댓아트의 전체 교육과정을 소개합니다.
          </p>

          {/* 세 원이 합쳐진 노란 도형 (장식용) */}
          <div className="mx-auto mt-14 flex w-fit items-center justify-center">
            {CURRICULUM_TRACKS.map((track, i) => (
              <div
                key={track.slug}
                className={
                  i > 0
                    ? "relative -ml-9 size-36 md:-ml-12 md:size-44"
                    : "relative size-36 md:size-44"
                }
              >
                <div
                  className="absolute inset-0 rounded-full bg-amber-400"
                  style={{ mixBlendMode: "multiply" }}
                />
                <div className="relative flex h-full items-center justify-center px-4">
                  <span className="font-serif text-base font-bold text-brand-ink md:text-lg">
                    {track.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Intro → Diagram → Subjects → Method : 그리스 철학 배경 사진 위에 통합 */}
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center bg-brand-ink">
          <span className="text-sm text-white/15">
            고대 그리스 철학자 조각상 사진 자리
          </span>
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 px-5 py-12 md:px-10 md:py-20">
          {/* Intro */}
          <Reveal className="mx-auto max-w-4xl">
            <p className="leading-[2] text-white/100">
              올댓아트 프로그램은 학생 개개인의 독창성을 자극하고 개발시켜
              창의적인 시각적 작품을 창조하도록 설계되었습니다.
              아리스토텔레스의 수사학(Rhetoric)을 기반으로, 에토스(Ethos) ·
              파토스(Pathos) · 로고스(Logos) 융합 시스템으로 수업이
              진행됩니다.
            </p>
            <p className="mt-6 leading-[2] text-white/100">
              올댓아트는 현직에서 활동 중인 작가와 디자이너로 구성된 강사진과
              함께합니다. 일방적으로 지식을 전달하는 교육방식 대신, 새로운
              아이디어와 문화에 대한 자신감과 열린 마음을 심어주고,
              조각·페인팅·드로잉·디자인·패션·건축 등 다양한 분야의
              전통적·현대적 테크닉을 향상시킵니다.
            </p>
          </Reveal>

          {/* 교육 방법론 다이어그램 (투명 배경) */}
          <Reveal className="mx-auto mt-16 max-w-5xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/methodology.png"
              alt="에토스 파토스 로고스 융합시스템 다이어그램"
              className="w-full"
            />
          </Reveal>

          {/* Subjects */}
          <div className="mx-auto mt-20 max-w-5xl">
            <Reveal>
              <p className="text-sm font-semibold tracking-[0.2em] text-brand-accent uppercase">
                Subjects
              </p>
              <h2 className="mt-4 font-serif text-2xl font-bold text-white md:text-3xl">
                무엇을 배우는가
              </h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-white/70">
                올댓아트는 다양한 예술과 디자인 영역을 탐구하며, 학생의
                아이디어에 가장 적합한 매체와 표현 방식을 찾아갑니다. 과목을
                눌러보세요.
              </p>
            </Reveal>

            <Reveal delay={150} className="mt-10">
              <SubjectAccordion groups={SUBJECT_GROUPS} />
            </Reveal>
          </div>

          {/* Method */}
          <div className="mx-auto mt-20 max-w-5xl">
            <Reveal>
              <p className="text-sm font-semibold tracking-[0.2em] text-brand-accent uppercase">
                Method
              </p>
              <h2 className="mt-4 font-serif text-2xl font-bold text-white md:text-3xl">
                생각에서 전달까지
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {METHODOLOGY.map((m, i) => (
                <Reveal key={m.key} delay={i * 100} variant="pop">
                  <div className="h-full rounded-xl border border-white/15 p-6">
                    <p className="font-serif text-xl font-bold text-brand-accent">
                      {m.key}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {m.ko}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-white/70">
                      {m.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="w-full px-5 py-12 md:px-10 md:py-20">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="text-sm font-semibold tracking-[0.2em] text-brand-accent-deep uppercase">
              Programs
            </p>
            <h2 className="mt-4 font-serif text-2xl font-bold text-brand-ink md:text-3xl">
              과정을 선택하세요
            </h2>
          </Reveal>

          <div className="mt-10 space-y-6">
            {CURRICULUM_TRACKS.map((track, i) => (
              <Reveal key={track.slug} delay={i * 120}>
                <TrackBox track={track} label={BOX_LABELS[track.slug]} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
