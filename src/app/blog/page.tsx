import { BrushStroke } from "@/components/BrushStroke";
import { Reveal } from "@/components/Reveal";
import { ContentGrid, type ContentPost } from "@/components/ContentGrid";
import { getNaverBlogPosts } from "@/lib/naver-rss";
import { classifyPost } from "@/lib/classify-post";

// 이 페이지는 매 요청 시 최신 RSS를 다시 확인합니다 (30분 캐시).
export const revalidate = 1800;

// RSS를 가져오지 못했을 때(연동 전 시연 단계 등) 보여줄 예시 콘텐츠
// 제목에 분류 키워드를 하나씩 포함시켜, 5개 카테고리를 모두 보여줍니다.
const FALLBACK_TITLES: { title: string; excerpt: string }[] = [
  {
    title: "미국 대학교 순위와 입학 정보",
    excerpt: "미술 전공으로 지원 가능한 미국 주요 대학교 정보를 정리했어요.",
  },
  {
    title: "회화과 vs 시각디자인과, 나에게 맞는 전공은",
    excerpt: "전공별로 요구되는 포트폴리오 방향과 특징이 다릅니다.",
  },
  {
    title: "미대 입시, 이렇게 준비하세요",
    excerpt: "학년별 준비 시기와 대학별 평가 포인트를 정리했어요.",
  },
  {
    title: "올댓아트 여름 특강반 모집 안내",
    excerpt: "단기 집중 포트폴리오 준비가 필요한 학생을 위한 특강반입니다.",
  },
  {
    title: "선생님이 추천하는 미술 에세이 3권",
    excerpt: "그림을 보는 시야를 넓혀주는 책들을 추천합니다.",
  },
];

export default async function BlogPage() {
  const posts = await getNaverBlogPosts();
  const hasLivePosts = posts.length > 0;

  const contentPosts: ContentPost[] = hasLivePosts
    ? posts.map((post) => ({
        id: post.link,
        title: post.title,
        description: post.description,
        category: classifyPost(post.title),
        href: post.link,
        thumbnail: post.thumbnail
          ? `/api/naver-image?url=${encodeURIComponent(post.thumbnail)}`
          : undefined,
      }))
    : FALLBACK_TITLES.map((post) => ({
        id: post.title,
        title: post.title,
        description: post.excerpt,
        category: classifyPost(post.title),
      }));

  return (
    <>
      <section className="w-full px-5 pt-20 pb-16 md:px-10">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.2em] text-brand-accent-deep uppercase">
            Contents
          </p>
          <div className="relative mt-4 max-w-2xl">
            <BrushStroke className="absolute -left-3 top-2 h-12 w-64 opacity-90" />
            <h1 className="relative font-serif text-4xl font-bold leading-tight text-brand-ink md:text-5xl">
              올댓아트 콘텐츠
            </h1>
          </div>
          <p className="mt-8 max-w-2xl leading-relaxed text-brand-ink/70">
            입시정보, 유학정보, 합격후기까지 — 올댓아트가 전하는 이야기입니다.
          </p>

          {hasLivePosts ? (
            <p className="mt-2 text-xs text-brand-ink/40">
              네이버 블로그와 자동으로 연동되어 있어요. 블로그에 새 글을
              올리시면 이 페이지에도 자동으로 반영됩니다.
            </p>
          ) : (
            <p className="mt-2 text-xs text-brand-ink/40">
              * 지금은 예시 콘텐츠입니다. 네이버 블로그 RSS 연동이 설정되면
              자동으로 실제 글이 표시돼요.
            </p>
          )}
        </div>
      </section>

      <section className="w-full pb-24">
        <Reveal>
          <ContentGrid posts={contentPosts} />
        </Reveal>
      </section>
    </>
  );
}
