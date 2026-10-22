import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/Reveal";
import { AboutHero } from "@/components/AboutHero";
import { ValueDiamond } from "@/components/ValueDiamond";
import { StudentArtworkMarquee } from "@/components/StudentArtworkMarquee";
import { T } from "@/components/T";

export const metadata: Metadata = {
  title: "소개",
  description:
    "올댓아트의 교육 철학과 학원 소개. 2009년 설립된 미술유학 전문 교육기관, 학생 포트폴리오와 작품을 소개합니다.",
  alternates: { canonical: "/about" },
};

const HISTORY = [
  {
    year: "2006",
    desc: "비영리 단체 'Studio of TOTUS ARTS'로 시작",
    descEn: "Began as the nonprofit 'Studio of TOTUS ARTS'",
  },
  {
    year: "2009",
    desc: "'All That Art'로 이름 변경",
    descEn: "Renamed to 'All That Art'",
  },
  {
    year: "2010",
    desc: "'The Union League of All That Art' 법인 설립, 대한민국 미술유학분야 최단기간 최고성과",
    descEn:
      "Incorporated as 'The Union League of All That Art' — the fastest top results in Korea's art-study-abroad field",
  },
];

const ACHIEVEMENTS = [
  { value: "6,619건", label: "총 132개 대학 합격승인 건수", labelEn: "admissions to 132 universities" },
  { value: "79%", label: "장학생 합격 비율", labelEn: "scholarship acceptance rate" },
  { value: "$78,326,117", label: "누적 장학금 액수", labelEn: "in cumulative scholarships" },
];

// 색상은 Our Belief 섹션 마인드맵 도표의 입학허가/Workbook/포트폴리오 마름모와 동일합니다.
const VALUES = [
  {
    title: "관찰하는 눈",
    titleEn: "An Observant Eye",
    desc: "잘 그리는 법이 아니라, 잘 보는 법부터 가르칩니다.",
    descEn: "We teach how to see well, before how to draw well.",
    color: "#1DB4C6",
  },
  {
    title: "1:1 밀착 지도",
    titleEn: "1:1 Close Guidance",
    desc: "매 수업, 학생의 포트폴리오를 직접 진단하고 그 자리에서 첨삭합니다.",
    descEn:
      "Every class, we diagnose each student's portfolio directly and give feedback on the spot.",
    color: "#F36B21",
  },
  {
    title: "각자의 속도",
    titleEn: "Each Student's Pace",
    desc: "정해진 진도가 아닌, 학생의 이해와 실력에 맞춰 조정합니다.",
    descEn:
      "Not a fixed pace — adjusted to each student's understanding and skill.",
    color: "#BB1A20",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* 전체화면 배경 이미지 + 패럴랙스 히어로 */}
      <AboutHero />

      {/* Intro statement */}
      <section className="w-full px-5 pt-8 pb-12 md:px-64 md:pt-16">
        <div className="grid gap-12 md:grid-cols-[1.1fr_1fr] md:items-center">
          <Reveal className="max-w-xl">
            <p className="text-sm font-semibold tracking-[0.2em] text-brand-accent-deep uppercase">
              Our Belief
            </p>
            <p className="mt-6 font-serif text-2xl font-bold leading-[1.7] tracking-wide text-brand-ink md:text-4xl md:leading-[1.35]">
              <T
                ko="모든 학생은 자신만의 세계를 가지고 있습니다."
                en="Every student has a world of their own."
              />
            </p>
            <p className="mt-10 leading-[2] tracking-wide text-brand-ink/70">
              <T
                ko="모든 학생은 자신만의 생각과 경험, 감각을 가지고 있습니다. 우리는
              그것이 곧 자신만의 예술적 세계를 만들어가는 출발점이라고
              믿습니다."
                en="Every student has their own thoughts, experiences, and
              sensibility. We believe that is exactly the starting point
              for building their own artistic world."
              />
            </p>
            <p className="mt-6 leading-[2] tracking-wide text-brand-ink/70">
              <T
                ko="올댓아트는 정해진 스타일이나 하나의 정답을 가르치기보다, 학생
              스스로 자신의 관심과 내면을 탐구하고 그것을 자신만의 언어로
              표현할 수 있도록 돕습니다. 끊임없이 생각하고, 질문하고, 실험하는
              과정 속에서 자신만의 주제와 표현 방식을 발견하고 발전시킵니다."
                en="Rather than teaching a fixed style or a single correct
              answer, All That Art helps students explore their own
              interests and inner world, and express them in their own
              language. Through constant thinking, questioning, and
              experimenting, they discover and develop their own subjects
              and modes of expression."
              />
            </p>
            <p className="mt-6 leading-[2] tracking-wide text-brand-ink/70">
              <T
                ko="우리가 중요하게 생각하는 것은 완성된 한 장의 작품만이 아닙니다.
              그 작품이 만들어지기까지의 생각과 탐구, 시도와 과정 또한 학생의
              고유한 세계를 보여주는 중요한 작품이라고 믿습니다."
                en="What matters to us is not just the finished piece. We
              believe the thinking, exploration, and trial-and-error behind
              it are just as much a part of a student's own world."
              />
            </p>
          </Reveal>

          <Reveal delay={150}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio-process.png"
              alt="포트폴리오 프로세스 마인드맵"
              className="w-full rounded-lg"
            />
          </Reveal>
        </div>
      </section>

      {/* Values — 다홍색 마름모, 퍼즐처럼 조립 */}
      <section className="w-full bg-brand-canvas px-5 py-12 md:px-10 md:py-24">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-center text-sm font-semibold tracking-[0.2em] text-brand-accent-deep uppercase">
              What We Keep
            </p>
            <h2 className="mt-4 text-center font-serif text-2xl font-bold text-brand-ink md:text-4xl">
              <T ko="우리가 지키는 것" en="What We Keep" />
            </h2>
          </Reveal>

          <div className="mt-12 flex flex-col items-center justify-center gap-y-10 sm:flex-row sm:gap-x-8 sm:gap-y-0 md:mt-16 md:gap-x-12">
            {VALUES.map((v, i) => (
              <ValueDiamond
                key={v.title}
                title={v.title}
                titleEn={v.titleEn}
                desc={v.desc}
                descEn={v.descEn}
                color={v.color}
                baseDelay={i * 350}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Achievement */}
      <section className="w-full border-y border-brand-line px-5 py-12 md:px-10 md:py-20">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-sm font-semibold tracking-[0.2em] text-brand-accent-deep uppercase">
              Achievement
            </p>
            <h2 className="mt-4 font-serif text-2xl font-bold text-brand-ink md:text-3xl">
              <T ko="숫자가 증명하는 신뢰" en="Trust, Proven by the Numbers" />
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {ACHIEVEMENTS.map((a, i) => (
              <Reveal key={a.label} delay={i * 150} variant="pop">
                <Card className="h-full border-brand-line">
                  <CardContent className="py-4 text-center">
                    <p className="font-serif text-3xl font-bold text-brand-accent">
                      {a.value}
                    </p>
                    <p className="mt-2 text-sm text-brand-ink/60">
                      <T ko={a.label} en={a.labelEn} />
                    </p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* History — 블랙, 스크롤 순차 등장 */}
      <section className="bg-brand-ink py-14 md:py-24">
        <div className="w-full px-5 md:px-10">
          <div className="mx-auto max-w-3xl">
            <Reveal variant="pop">
              <p className="text-sm font-semibold tracking-[0.2em] text-brand-accent uppercase">
                Our History
              </p>
              <h2 className="mt-4 font-serif text-3xl font-bold text-white md:text-5xl">
                Trajectory
              </h2>
            </Reveal>
            <div className="mt-12 space-y-10 border-l-2 border-brand-accent/40 pl-8">
              {HISTORY.map((h, i) => (
                <Reveal key={h.year} delay={i * 180} variant="pop">
                  <p className="font-serif text-2xl font-bold text-brand-accent md:text-3xl">
                    {h.year}
                  </p>
                  <p className="mt-2 leading-relaxed text-white/70">
                    <T ko={h.desc} en={h.descEn} />
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Student artwork marquee */}
      <section className="w-full bg-brand-canvas py-12 md:py-20">
        <Reveal className="mb-10 px-5 md:px-10">
          <p className="text-sm font-semibold tracking-[0.2em] text-brand-accent-deep uppercase">
            Student Works
          </p>
          <h2 className="mt-4 font-serif text-2xl font-bold text-brand-ink md:text-3xl">
            <T ko="학생들의 포트폴리오" en="Student Portfolios" />
          </h2>
        </Reveal>
        <StudentArtworkMarquee />
      </section>
    </>
  );
}
