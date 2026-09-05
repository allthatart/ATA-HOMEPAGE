import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BrushStroke } from "@/components/BrushStroke";
import { HeroSlider } from "@/components/HeroSlider";
import { Reveal } from "@/components/Reveal";
import { ContentThumbSlider, type SlideImage } from "@/components/ContentThumbSlider";
import { SocialFloatingButtons } from "@/components/SocialFloatingButtons";
import { getNaverBlogPosts } from "@/lib/naver-rss";

export const revalidate = 1800;

// RSS를 못 가져왔을 때(연동 전 등) 보여줄 예시 썸네일
const FALLBACK_THUMBS: SlideImage[] = Array.from({ length: 6 }, (_, i) => ({
  src: "",
  alt: `콘텐츠 썸네일 ${i + 1} 자리`,
}));

const CURRICULUM_PREVIEW = [
  {
    title: "신입학준비",
    desc: "정규반·특강반·예비반 — 희망 대학과 전공에 맞춘 체계적인 포트폴리오 제작.",
  },
  {
    title: "편입학준비",
    desc: "1:1 진단과 프로젝트식 과제로, 희망 대학·전공에 맞춘 심화 작품을 준비합니다.",
  },
  {
    title: "대학원준비",
    desc: "이론적 체계와 작품의 조화로운 구성으로 완성도 높은 포트폴리오를 제작합니다.",
  },
];

const STATS = [
  { value: "6,619", label: "건 · 총 132개 대학 합격승인" },
  { value: "79%", label: "장학생 합격 비율" },
  { value: "$78.3M+", label: "누적 장학금 획득 금액" },
  { value: "2006~", label: "올댓아트 유학미술 역사" },
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
            <p className="text-sm font-semibold tracking-[0.2em] text-brand-accent-deep uppercase">
              All That Art
            </p>

            <div className="relative mt-4 max-w-3xl">
              <BrushStroke className="absolute -left-3 top-3 h-14 w-72 opacity-90 md:h-20 md:w-96" />
              <h1 className="relative font-serif text-4xl font-semibold leading-[1.15] text-brand-ink md:text-6xl">
                사람과 사람이
                <br />
                만들어 가는, 유학미술.
              </h1>
            </div>

            <p className="mt-8 max-w-xl text-base leading-relaxed text-brand-ink/70 md:text-lg">
              올댓아트는 진정한 예술학교 설립을 꿈꾸는 전업 작가와 디자이너들이
              모여 설립한 아카데미입니다. 한 사람의 인생을 바꿀 수 있는 첫
              시작점이라는 믿음으로, 그 가치에 어울리는 교육환경을 준비합니다.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/consultation">무료 상담 예약하기</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/curriculum">커리큘럼 살펴보기</Link>
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
              <p className="mt-1 text-sm text-white/60">{stat.label}</p>
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
              실무 경력과 입시 경력을
              <br />
              두루 갖춘 강사진
            </h2>
            <p className="mt-6 leading-relaxed text-brand-ink/70">
              30여 명의 전·현직 작가와 전문가로 이루어진 강사진이 다학제적
              커리큘럼으로 수준 높은 입시 포트폴리오를 완성합니다. 해외 명문
              미술대학별·전공별 맞춤식 1:1 교육방식으로 학생 본인만의
              독창적인 스타일을 이끌어냅니다.
            </p>
            <Button asChild variant="link" className="mt-4 px-0">
              <Link href="/about">학원 소개 자세히 보기 →</Link>
            </Button>
          </Reveal>
          <Reveal delay={150} className="aspect-[40/21] rounded-lg bg-brand-canvas ring-1 ring-brand-line flex items-center justify-center text-sm text-brand-ink/30">
            학원 사진 / 작업 공간 이미지
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
              신입학부터 대학원까지
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {CURRICULUM_PREVIEW.map((item, i) => (
              <Reveal key={item.title} delay={i * 120}>
                <Card className="border-brand-line h-full">
                  <CardContent>
                    <h3 className="font-serif text-xl font-bold text-brand-ink">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-brand-ink/70">
                      {item.desc}
                    </p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-brand-ink">
        <Reveal className="flex w-full flex-col items-start justify-between gap-6 px-5 py-10 md:flex-row md:items-center md:px-10">
          <h2 className="font-serif text-2xl font-bold text-white md:text-3xl">
            지금, 첫 상담을 예약해보세요.
          </h2>
          <Button
            asChild
            size="lg"
            className="bg-brand-accent text-white hover:bg-brand-accent-deep"
          >
            <Link href="/consultation">상담예약 바로가기</Link>
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
            올댓아트에서 전하는 입시정보와 각종 활동 소식들을 확인해보세요!
          </h2>
        </Reveal>

        <div className="mt-10">
          <ContentThumbSlider images={contentThumbs} />
        </div>

        <div className="mt-8 px-5 md:px-10">
          <Button asChild variant="outline">
            <Link href="/blog">콘텐츠 더 보러가기 →</Link>
          </Button>
        </div>
      </section>

      <SocialFloatingButtons />
    </>
  );
}
