import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // 휴대폰 등 같은 와이파이의 다른 기기에서 로컬 개발 서버(localhost:3000)에
  // 접속해서 확인할 수 있도록 허용합니다. 배포된 사이트와는 무관합니다.
  allowedDevOrigins: ["172.30.1.98"],
};

export default nextConfig;
