import { XMLParser } from "fast-xml-parser";

export type BlogPost = {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  thumbnail?: string;
};

// TODO: 실제 운영 중인 네이버 블로그 아이디로 교체하세요.
// 블로그 주소가 blog.naver.com/allthatartseoul 라면 아이디는 'allthatartseoul' 입니다.
const NAVER_BLOG_ID = "allthatartseoul";
const RSS_URL = `https://rss.blog.naver.com/${NAVER_BLOG_ID}.xml`;

function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

function extractFirstImage(html: string): string | undefined {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match?.[1];
}

export async function getNaverBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(RSS_URL, {
      // 30분마다 새 글 반영 (ISR)
      next: { revalidate: 1800 },
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!res.ok) {
      throw new Error(`RSS 응답 실패: ${res.status}`);
    }

    const xml = await res.text();
    const parser = new XMLParser({ cdataPropName: "__cdata" });
    const data = parser.parse(xml);

    const rawItems = data?.rss?.channel?.item;
    const items = Array.isArray(rawItems) ? rawItems : rawItems ? [rawItems] : [];

    return items.map((item): BlogPost => {
      const rawDescription: string =
        item.description?.__cdata ?? item.description ?? "";

      const rawLink =
        item.link?.__cdata ??
        item.link ??
        item.guid?.__cdata ??
        item.guid ??
        "#";
      const link = String(rawLink).trim();

      return {
        title: String(item.title?.__cdata ?? item.title ?? "").trim(),
        link,
        pubDate: item.pubDate ?? "",
        description: stripHtmlTags(rawDescription).slice(0, 90),
        thumbnail: extractFirstImage(rawDescription),
      };
    });
  } catch (error) {
    // 네트워크 문제, 블로그 아이디 오류 등으로 실패해도 페이지 자체는 죽지 않도록 처리
    console.error("[naver-rss] RSS를 가져오지 못했습니다:", error);
    return [];
  }
}
