import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// 검색엔진에게 알려주는 사이트 페이지 목록 (/sitemap.xml)
// 새 페이지를 만들면 여기에도 한 줄 추가하세요.
const PAGES: { path: string; changeFrequency: "weekly" | "monthly" | "yearly"; priority: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/curriculum", changeFrequency: "monthly", priority: 0.9 },
  { path: "/curriculum/undergraduate/prep", changeFrequency: "monthly", priority: 0.7 },
  { path: "/curriculum/undergraduate/intensive", changeFrequency: "monthly", priority: 0.7 },
  { path: "/curriculum/undergraduate/regular", changeFrequency: "monthly", priority: 0.8 },
  { path: "/curriculum/transfer/regular", changeFrequency: "monthly", priority: 0.8 },
  { path: "/curriculum/graduate/regular", changeFrequency: "monthly", priority: 0.8 },
  { path: "/results", changeFrequency: "monthly", priority: 0.9 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
  { path: "/consultation", changeFrequency: "monthly", priority: 0.9 },
  { path: "/location", changeFrequency: "yearly", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return PAGES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
