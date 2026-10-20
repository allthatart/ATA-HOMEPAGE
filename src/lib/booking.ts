// 상담 예약 웹 앱 주소 (구글 앱스 스크립트 "배포 → 웹 앱"의 URL, https://script.google.com/macros/s/.../exec)
// 비어 있으면 예약 화면 대신 예전 구글 폼 버튼이 보입니다.
export const BOOKING_API_URL: string =
  process.env.NEXT_PUBLIC_BOOKING_API ?? "";

// 구글 폼 (예약 화면을 쓸 수 없을 때의 대체 신청 방법)
export const FALLBACK_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeYilEmOtasNUfcoIv4vyV2i9SUO3zUrVIfbww5XxPI_HI8JA/viewform";
