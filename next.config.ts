import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // 휴대폰 등 같은 와이파이의 다른 기기에서 로컬 개발 서버(localhost:3000)에
  // 접속해서 확인할 수 있도록 허용합니다. 배포된 사이트와는 무관합니다.
  allowedDevOrigins: ["172.30.1.98"],

  // 옛 홈페이지(워드프레스) 주소로 들어온 방문자와 검색 점수를 새 주소로 이어줍니다.
  // 구글 서치콘솔에 아직 남아 있는 옛 주소 중, 새 홈페이지에 짝이 있는 것만 연결합니다.
  async redirects() {
    return [
      { source: "/reservation", destination: "/consultation", permanent: true },
      { source: "/contact", destination: "/consultation", permanent: true },
      { source: "/faqs", destination: "/consultation", permanent: true },
      { source: "/college-acceptances", destination: "/results", permanent: true },
      { source: "/category/stories", destination: "/blog", permanent: true },
    ];
  },
};

export default nextConfig;
