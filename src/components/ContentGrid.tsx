"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CATEGORIES, type Category } from "@/lib/classify-post";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/i18n";

const FILTER_LABELS_EN: Record<string, string> = {
  전체: "All",
  대학정보: "University Info",
  전공: "Majors",
  "입시 팁": "Admissions Tips",
  "올댓아트 활동": "ATA Activities",
  기타: "Other",
};

export type ContentPost = {
  id: string;
  title: string;
  description: string;
  category: Category;
  thumbnail?: string;
  href?: string;
};

const PAGE_SIZE = 12;
const FILTERS = ["전체", ...CATEGORIES] as const;

export function ContentGrid({ posts }: { posts: ContentPost[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("전체");
  const [page, setPage] = useState(1);
  const { lang } = useLang();

  const filtered = useMemo(
    () =>
      filter === "전체" ? posts : posts.filter((p) => p.category === filter),
    [posts, filter]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  function handleFilter(next: (typeof FILTERS)[number]) {
    setFilter(next);
    setPage(1);
  }

  return (
    <div className="mx-auto w-full px-5 md:w-[70%] md:px-0">
      {/* 카테고리 필터 */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {FILTERS.map((f) => (
          <button key={f} onClick={() => handleFilter(f)}>
            <Badge
              variant={filter === f ? "default" : "outline"}
              className={cn(
                "cursor-pointer px-3 py-1 text-xs sm:px-4 sm:py-1.5 sm:text-sm",
                filter === f
                  ? "bg-brand-accent text-white"
                  : "border-brand-line text-brand-ink/60 hover:text-brand-accent-deep"
              )}
            >
              {lang === "en" ? FILTER_LABELS_EN[f] ?? f : f}
            </Badge>
          </button>
        ))}
      </div>

      {/* 카드 그리드 */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-6 lg:grid-cols-3">
        {paginated.map((post) => {
          const inner = (
            <>
              <div className="aspect-[4/3] overflow-hidden bg-brand-canvas">
                {post.thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[10px] text-brand-ink/30 sm:text-xs">
                    {lang === "en" ? "Thumbnail" : "썸네일 이미지"}
                  </div>
                )}
              </div>
              <div className="p-2.5 sm:p-5">
                <Badge
                  variant="outline"
                  className="border-brand-accent/40 px-2 py-0.5 text-[10px] text-brand-accent-deep sm:px-2.5 sm:text-xs"
                >
                  {lang === "en"
                    ? FILTER_LABELS_EN[post.category] ?? post.category
                    : post.category}
                </Badge>
                <h2 className="mt-2 font-serif text-xs font-bold leading-snug text-brand-ink transition-colors group-hover:text-brand-accent-deep sm:mt-3 sm:text-lg">
                  {post.title}
                </h2>
                <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-brand-ink/60 sm:mt-2 sm:text-sm">
                  {post.description}
                </p>
              </div>
            </>
          );

          return post.href ? (
            <a
              key={post.id}
              href={post.href}
              target="_blank"
              rel="noreferrer"
              className="group block overflow-hidden rounded-xl border border-brand-line transition-shadow hover:shadow-md"
            >
              {inner}
            </a>
          ) : (
            <article
              key={post.id}
              className="group overflow-hidden rounded-xl border border-brand-line"
            >
              {inner}
            </article>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-sm text-brand-ink/40">
          {lang === "en"
            ? "No content in this category yet."
            : "해당 카테고리의 콘텐츠가 아직 없어요."}
        </p>
      )}

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <Button
              key={n}
              size="icon"
              variant={n === currentPage ? "default" : "outline"}
              onClick={() => setPage(n)}
              className={cn(
                n === currentPage && "bg-brand-accent hover:bg-brand-accent-deep"
              )}
            >
              {n}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
