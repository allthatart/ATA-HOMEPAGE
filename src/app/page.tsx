import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroSlider } from "@/components/HeroSlider";
import { AboutPreviewSlider } from "@/components/AboutPreviewSlider";
import { Reveal } from "@/components/Reveal";
import { ContentThumbSlider, type SlideImage } from "@/components/ContentThumbSlider";
import { SocialFloatingButtons } from "@/components/SocialFloatingButtons";
import { getNaverBlogPosts } from "@/lib/naver-rss";
import { gyeonGothic, jejuGothic, yoonGothic520 } from "@/fonts";
import { T } from "@/components/T";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export const revalidate = 1800;

// RSS를 못 가져왔을 때(연동 전 등) 보여줄 예시 썸네일
const FALLBACK_THUMBS: SlideImage[] = Array.from({ length: 6 }, (_, i) => ({
  src: "",
  alt: `콘텐츠 썸네일 ${i + 1} 자리`,
}));

const CURRICULUM_PREVIEW = [
  {
    href: "/curriculum/undergraduate/prep",
    title: "예비반",
    titleEn: "Prep",
    desc: "다양한 수업과 AP·IB, 공모전을 경험하며 나의 관심과 가능성을 발견합니다.",
    descEn:
      "Discover your interests and potential through varied classes, AP and IB work, and competitions.",
  },
  {
    href: "/curriculum/undergraduate/intensive",
    title: "특강반",
    titleEn: "Intensive",
    desc: "짧은 기간 새로운 분야와 매체를 집중적으로 경험하며 작업의 폭을 넓힙니다.",
    descEn:
      "Intensively experience new fields and media over a short period to broaden your work.",
  },
  {
    href: "/curriculum/undergraduate/regular",
    title: "신입학",
    titleEn: "New Admission",
    desc: "희망 대학과 전공에 맞춘 체계적인 포트폴리오를 제작합니다.",
    descEn:
      "Build a systematic portfolio tailored to your target university and major.",
  },
  {
    href: "/curriculum/transfer/regular",
    title: "편입학",
    titleEn: "Transfer",
    desc: "1:1 진단과 프로젝트식 과제로, 희망 대학·전공에 맞춘 심화 작품을 준비합니다.",
    descEn:
      "1:1 diagnosis and project-based assignments to prepare advanced work tailored to your target school and major.",
  },
  {
    href: "/curriculum/graduate/regular",
    title: "대학원",
    titleEn: "Graduate",
    desc: "이론적 체계와 작품의 조화로운 구성으로 완성도 높은 포트폴리오를 제작합니다.",
    descEn:
      "A well-rounded portfolio built on theoretical grounding and cohesive composition.",
  },
];

const STATS = [
  { value: "6,619", label: "건 · 총 132개 대학 합격승인", labelEn: "admissions · 132 universities" },
  { value: "79%", label: "장학생 합격 비율", labelEn: "scholarship acceptance rate" },
  { value: "$78.3M+", label: "누적 장학금 획득 금액", labelEn: "in scholarships awarded" },
  { value: "2006~", label: "올댓아트 유학미술 역사", labelEn: "All That Art's history" },
];

export default async function Home() {
  const posts = await getNaverBlogPosts();
  const liveThumbs: SlideImage[] = posts
    .filter((p) => p.thumbnail)
    .map((p) => ({
      src: `/api/naver-image?url=${encodeURIComponent(p.thumbnail!)}`,
      alt: p.title,
      href: p.link,
    }));
  const contentThumbs = liveThumbs.length > 0 ? liveThumbs : FALLBACK_THUMBS;

  return (
    <>
      {/* Image slider */}
      <HeroSlider />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative z-10 w-full px-5 pt-12 pb-14 md:px-10 md:pt-28 md:pb-32">
          <div className="mx-auto max-w-3xl">
            <p
              className={`${gyeonGothic.className} text-sm tracking-[0.2em] text-[#ff3319] uppercase`}
            >
              All That Art
            </p>

            <div className="relative mt-4 max-w-3xl">
              <h1
                className={`${jejuGothic.className} relative text-4xl leading-[1.15] text-brand-ink md:text-6xl`}
              >
                <T
                  ko={
                    <>
                      사람과 사람이
                      <br />
                      만들어 가는, 유학미술.
                    </>
                  }
                  en={
                    <>
                      Art education,
                      <br />
                      built person to person.
                    </>
                  }
                />
              </h1>
            </div>

            <p
              className={`${yoonGothic520.className} mt-8 max-w-xl text-base leading-relaxed text-brand-ink md:text-lg`}
            >
              <T
                ko={
                  <>
                    올댓아트는 진정한 예술학교 설립을 꿈꾸는 전업 작가와 디자이너들이 모여
                    <br />
                    설립한 아카데미입니다.
                    <br />
                    한 사람의 인생을 바꿀 수 있는 첫 시작점이라는 믿음으로,
                    <br />
                    그 가치에 어울리는 교육환경을 준비합니다.
                  </>
                }
                en={
                  <>
                    All That Art was founded by full-time artists and designers
                    who dream of building a true art school.
                    <br />
                    Believing this can be the first turning point in a
                    student&apos;s life, we prepare an environment worthy of
                    that value.
                  </>
                }
              />
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-[#ff3319] hover:bg-brand-accent-deep"
              >
                <Link href="/consultation">
                  <T ko="무료 상담 예약하기" en="Book a Free Consultation" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <Link href="/curriculum">
                  <T ko="커리큘럼 살펴보기" en="View Curriculum" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="border-y border-brand-line bg-brand-ink">
        <div className="w-full grid grid-cols-2 gap-8 px-5 py-12 md:grid-cols-4 md:px-10">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 100} variant="pop">
              <p className="font-serif text-3xl font-bold text-brand-accent md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-white/60">
                <T ko={stat.label} en={stat.labelEn} />
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* About preview */}
      <section className="w-full px-5 py-14 md:px-10 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <Reveal>
            <p className="text-sm font-semibold tracking-[0.2em] text-brand-accent-deep uppercase">
              About
            </p>
            <h2 className="mt-4 font-serif text-2xl font-bold text-brand-ink md:text-3xl">
              <T
                ko={
                  <>
                    실무 경력과 입시 경력을
                    <br />
                    두루 갖춘 강사진
                  </>
                }
                en={<>Faculty with both industry and admissions experience</>}
              />
            </h2>
            <p className="mt-6 leading-relaxed text-brand-ink/70">
              <T
                ko="30여 명의 전·현직 작가와 전문가로 이루어진 강사진이 다학제적
              커리큘럼으로 수준 높은 입시 포트폴리오를 완성합니다. 해외 명문
              미술대학별·전공별 맞춤식 1:1 교육방식으로 학생 본인만의
              독창적인 스타일을 이끌어냅니다."
                en="A faculty of about 30 current and former artists and
              specialists completes high-level admissions portfolios through
              an interdisciplinary curriculum. Our 1:1 teaching method,
              customized by school and major, draws out each student's own
              original style."
              />
            </p>
            <Button asChild size="lg" variant="outline" className="mt-4 rounded-full">
              <Link href="/about">
                <T ko="학원 소개 자세히 보기 →" en="More About Us →" />
              </Link>
            </Button>
          </Reveal>
          <Reveal delay={150}>
            <AboutPreviewSlider />
          </Reveal>
        </div>
      </section>

      {/* Curriculum preview */}
      <section className="bg-brand-canvas py-14 md:py-24">
        <div className="w-full px-5 md:px-10">
          <Reveal>
            <p className="text-sm font-semibold tracking-[0.2em] text-brand-accent-deep uppercase">
              Curriculum
            </p>
            <h2 className="mt-4 font-serif text-2xl font-bold text-brand-ink md:text-3xl">
              <T ko="신입학부터 대학원까지" en="From Freshman to Graduate School" />
            </h2>
          </Reveal>

          <div className="mt-12 flex flex-wrap justify-center gap-4 md:flex-nowrap md:gap-6">
            {CURRICULUM_PREVIEW.map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 120}
                className="w-[calc((100%-2rem)/3)] md:w-[calc((100%-6rem)/5)]"
              >
                <Link
                  href={item.href}
                  className="flex aspect-square flex-col items-center justify-center rounded-2xl border border-brand-line bg-card p-2 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-accent hover:shadow-md md:p-5"
                >
                  <h3 className="font-serif text-sm font-bold leading-tight text-brand-ink md:text-xl">
                    <T ko={item.title} en={item.titleEn} />
                  </h3>
                  <p className="mt-2 hidden text-xs leading-snug text-brand-ink/70 md:block">
                    <T ko={item.desc} en={item.descEn} />
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-brand-ink">
        <Reveal className="flex w-full flex-col items-start justify-between gap-6 px-5 py-10 md:flex-row md:items-center md:px-10">
          <h2 className="font-serif text-2xl font-bold text-white md:text-3xl">
            <T ko="지금, 첫 상담을 예약해보세요." en="Book your first consultation now." />
          </h2>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-[#ff3319] text-white hover:bg-brand-accent-deep"
          >
            <Link href="/consultation">
              <T ko="상담예약 바로가기" en="Go to Consultation" />
            </Link>
          </Button>
        </Reveal>
      </section>

      {/* Content preview slider */}
      <section className="w-full bg-brand-canvas py-12 md:py-20">
        <Reveal className="px-5 md:px-10">
          <p className="text-sm font-semibold tracking-[0.2em] text-brand-accent-deep uppercase">
            Contents
          </p>
          <h2 className="mt-4 max-w-2xl font-serif text-2xl font-bold text-brand-ink md:text-3xl">
            <T
              ko="올댓아트에서 전하는 입시정보와 각종 활동 소식들을 확인해보세요!"
              en="Check out admissions info and news from All That Art!"
            />
          </h2>
        </Reveal>

        <div className="mt-10">
          <ContentThumbSlider images={contentThumbs} />
        </div>

        <div className="mt-8 px-5 md:px-10">
          <Button asChild size="lg" variant="outline" className="rounded-full">
            <Link href="/blog">
              <T ko="콘텐츠 더 보러가기 →" en="More Content →" />
            </Link>
          </Button>
        </div>
      </section>

      <SocialFloatingButtons />
    </>
  );
}
