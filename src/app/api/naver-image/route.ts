import { NextRequest, NextResponse } from "next/server";

// 네이버 블로그 이미지는 외부 사이트에서 직접 불러오면 핫링크 방지로
// 차단되는 경우가 많습니다. 이 라우트가 서버에서 대신 이미지를 가져와
// 전달해주면(프록시), 우리 사이트에서 정상적으로 표시할 수 있습니다.
export async function GET(req: NextRequest) {
  const src = req.nextUrl.searchParams.get("url");

  if (!src) {
    return new NextResponse("Missing url", { status: 400 });
  }

  // 안전을 위해 네이버 이미지 도메인만 허용
  const allowedHosts = ["pstatic.net", "naver.net", "naver.com"];
  let hostname = "";
  try {
    hostname = new URL(src).hostname;
  } catch {
    return new NextResponse("Invalid url", { status: 400 });
  }
  const isAllowed = allowedHosts.some((host) => hostname.endsWith(host));
  if (!isAllowed) {
    return new NextResponse("Domain not allowed", { status: 403 });
  }

  try {
    const upstream = await fetch(src, {
      headers: {
        // 네이버는 자사 도메인에서 온 요청처럼 보일 때만 이미지를 내려줍니다.
        Referer: "https://blog.naver.com/",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      next: { revalidate: 86400 },
    });

    if (!upstream.ok) {
      return new NextResponse("Failed to fetch image", {
        status: upstream.status,
      });
    }

    const contentType = upstream.headers.get("content-type") ?? "image/jpeg";
    const buffer = await upstream.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    console.error("[naver-image-proxy] 이미지 가져오기 실패:", error);
    return new NextResponse("Error fetching image", { status: 500 });
  }
}
