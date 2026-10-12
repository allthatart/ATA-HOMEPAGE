import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SubjectAccordion } from "@/components/SubjectAccordion";
import { METHODOLOGY, SUBJECT_GROUPS } from "@/lib/curriculum-data";
import { jejuGothic } from "@/fonts";
import { T } from "@/components/T";

const QUICK_LINKS = [
  { href: "/curriculum/undergraduate/prep", ko: "예비반", en: "Prep", color: "#9EA0A2" },
  { href: "/curriculum/undergraduate/intensive", ko: "특강반", en: "Intensive", color: "#4BA7BD" },
  { href: "/curriculum/undergraduate/regular", ko: "신입학", en: "New Admission", color: "#F3CD44" },
  { href: "/curriculum/transfer/regular", ko: "편입학", en: "Transfer", color: "#DF7328" },
  { href: "/curriculum/graduate/regular", ko: "대학원", en: "Graduate", color: "#A52D26" },
];

export default function CurriculumPage() {
  return (
    <>
      {/* Hero — 파스텔 보라 배경 */}
      <section className="w-full bg-[linear-gradient(to_bottom,#FFEEE6_0%,#FFEEE6_100%,#363636_100%)] px-5 pt-14 pb-10 md:px-10 md:pt-24 md:pb-30">
        <Reveal className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.2em] text-brand-accent-deep uppercase">
            Curriculum
          </p>
          <h1
            className={`${jejuGothic.className} mt-4 text-4xl leading-[1.15] text-brand-ink md:text-6xl`}
          >
            <T
              ko={
                <>
                  올댓아트
                  <br />
                  커리큘럼 로드맵
                </>
              }
              en={
                <>
                  All That Art
                  <br />
                  Curriculum Roadmap
                </>
              }
            />
          </h1>
          <p className="mt-6 leading-relaxed text-brand-ink/70">
            <T
              ko="지금 내 위치에 맞는 다음 단계를 한눈에 확인할 수 있도록,
            올댓아트의 전체 교육과정을 소개합니다."
              en="A full overview of All That Art's curriculum, so you can see
            the next step that fits exactly where you are now."
            />
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4 md:gap-6">
            {QUICK_LINKS.map((q) => (
              <Link
                key={q.href}
                href={q.href}
                style={{ backgroundColor: q.color }}
                className="flex aspect-square w-[calc((100%-2rem)/3)] items-center justify-center rounded-2xl text-center leading-tight border-[3px] border-white text-base font-bold text-white shadow-[0_14px_22px_-8px_rgba(0,0,0,0.4)] transition-transform duration-300 hover:-translate-y-1 md:w-[calc((100%-6rem)/5)] md:text-lg"
              >
                <T ko={q.ko} en={q.en} />
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Intro → Diagram → Subjects → Method : 그리스 철학 배경 사진 위에 통합 */}
      <section className="relative w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/curriculum-hero.jpg"
          alt="고대 그리스 철학자 조각상"
          className="absolute inset-0 h-full w-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-black/75" />

        <div className="relative z-10 px-5 py-12 md:px-10 md:py-20">
          {/* Intro */}
          <Reveal className="mx-auto max-w-4xl">
            <p className="leading-[2] text-white/100">
              <T
                ko="올댓아트 프로그램은 학생 개개인의 독창성을 자극하고 개발시켜
              창의적인 시각적 작품을 창조하도록 설계되었습니다.
              아리스토텔레스의 수사학(Rhetoric)을 기반으로, 에토스(Ethos) ·
              파토스(Pathos) · 로고스(Logos) 융합 시스템으로 수업이
              진행됩니다."
                en="The All That Art program is designed to stimulate and
              develop each student's originality to create inventive visual
              work. Classes are built on Aristotle's Rhetoric, through a
              fusion system of Ethos, Pathos, and Logos."
              />
            </p>
            <p className="mt-6 leading-[2] text-white/100">
              <T
                ko="올댓아트는 현직에서 활동 중인 작가와 디자이너로 구성된 강사진과
              함께합니다. 일방적으로 지식을 전달하는 교육방식 대신, 새로운
              아이디어와 문화에 대한 자신감과 열린 마음을 심어주고,
              조각·페인팅·드로잉·디자인·패션·건축 등 다양한 분야의
              전통적·현대적 테크닉을 향상시킵니다."
                en="All That Art works with a faculty of active artists and
              designers. Rather than one-way instruction, we build
              confidence and openness toward new ideas and culture, and
              sharpen traditional and contemporary techniques across
              sculpture, painting, drawing, design, fashion, architecture,
              and more."
              />
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
                <T ko="무엇을 배우는가" en="What You'll Learn" />
              </h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-white/70">
                <T
                  ko="올댓아트는 다양한 예술과 디자인 영역을 탐구하며, 학생의
                아이디어에 가장 적합한 매체와 표현 방식을 찾아갑니다."
                  en="All That Art explores a wide range of art and design
                fields to find the medium and mode of expression that best
                fits each student's ideas."
                />
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
                <T ko="생각에서 전달까지" en="From Thought to Communication" />
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
                      <T ko={m.ko} en={null} />
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-white/70">
                      <T ko={m.desc} en={m.descEn} />
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
