// 방문 통계(애널리틱스) 설정.
// 아래 두 값은 비밀 키가 아니라 누구에게나 보이는 공개 ID 입니다.
// 비어 있으면(""), 해당 통계는 아예 켜지지 않습니다.
//
// - 구글 애널리틱스(GA4) 측정 ID: "G-" 로 시작 (예: G-ABCDE12345)
// - 네이버 애널리틱스 사이트 ID: wcs_add["wa"] = "..." 에 들어 있는 값
export const GA_MEASUREMENT_ID: string = "G-4B6233C0Z3";
export const NAVER_ANALYTICS_ID: string = "2c7b8824ea7a6a";

// 개발 중(localhost)에는 통계가 섞이지 않도록 실제 배포에서만 켭니다.
export const ANALYTICS_ENABLED = process.env.NODE_ENV === "production";

type Gtag = (...args: unknown[]) => void;
type Wcs = { trans?: (p: Record<string, unknown>) => void };

declare global {
  interface Window {
    gtag?: Gtag;
    wcs?: Wcs;
    wcs_do?: () => void;
  }
}

// 상담 예약이 접수되었을 때 "전환"으로 기록합니다. (통계가 꺼져 있으면 아무 일도 하지 않습니다)
export function trackBookingSubmitted() {
  try {
    window.gtag?.("event", "booking_submitted", { event_category: "consultation" });
    window.gtag?.("event", "generate_lead", { currency: "KRW" });
  } catch {}
  try {
    window.wcs?.trans?.({ type: "lead" });
  } catch {}
}
