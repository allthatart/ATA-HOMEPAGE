"use client";

import { useEffect } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import {
  ANALYTICS_ENABLED,
  GA_MEASUREMENT_ID,
  NAVER_ANALYTICS_ID,
} from "@/lib/analytics";

// 구글·네이버 방문 통계. ID 가 비어 있거나 개발 중이면 아무것도 불러오지 않습니다.
export function Analytics() {
  const pathname = usePathname();

  // 페이지를 새로 불러오지 않고 이동할 때도 네이버에 방문을 알립니다. (구글은 자동)
  useEffect(() => {
    if (!ANALYTICS_ENABLED || !NAVER_ANALYTICS_ID) return;
    try {
      window.wcs_do?.();
    } catch {}
  }, [pathname]);

  if (!ANALYTICS_ENABLED) return null;

  return (
    <>
      {GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
          </Script>
        </>
      )}
      {NAVER_ANALYTICS_ID && (
        <>
          <Script src="https://wcs.pstatic.net/wcslog.js" strategy="afterInteractive" />
          <Script id="naver-analytics-init" strategy="afterInteractive">
            {`if(!window.wcs_add) window.wcs_add = {};
window.wcs_add["wa"] = "${NAVER_ANALYTICS_ID}";
(function check(n){ if(window.wcs && window.wcs_do){ window.wcs_do(); } else if(n < 50){ setTimeout(function(){ check(n+1); }, 200); } })(0);`}
          </Script>
        </>
      )}
    </>
  );
}
