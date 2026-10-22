import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// 검색엔진이 사이트를 읽어도 되는 범위를 알려주는 파일 (/robots.txt)
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
