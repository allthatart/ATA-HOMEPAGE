// 상담 예약 웹 앱 주소 (구글 앱스 스크립트 "배포 → 웹 앱"의 URL, https://script.google.com/macros/s/.../exec)
// 비어 있으면 예약 화면 대신 예전 구글 폼 버튼이 보입니다.
// 환경변수 NEXT_PUBLIC_BOOKING_API 가 있으면 그 값을 우선 사용합니다. (시험용 서버 연결 등)
// 이 주소는 누구에게나 보이는 공개 주소이고, 비밀 키가 아닙니다.
export const BOOKING_API_URL: string =
  process.env.NEXT_PUBLIC_BOOKING_API ??
  "https://script.google.com/macros/s/AKfycbw25J6ow3BS0JjLDSYfRzf0LqJ3fCpTyZ2Xm1qsifHCVhuZlgoK8pb5OpQZPy24KBWpuQ/exec";

// 구글 폼 (예약 화면을 쓸 수 없을 때의 대체 신청 방법)
export const FALLBACK_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeYilEmOtasNUfcoIv4vyV2i9SUO3zUrVIfbww5XxPI_HI8JA/viewform";
