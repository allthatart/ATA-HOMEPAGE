import { ADMISSIONS_TOTAL, ADMISSIONS_UNIVERSITIES } from "@/lib/admissions";

// 사이트의 정식 주소. 검색엔진 안내(사이트맵, robots)와 공유 미리보기(OG)에서 씁니다.
// 도메인을 바꾸면 이 한 줄만 고치면 됩니다.
export const SITE_URL = "https://allthatart.co.kr";

// 구글 비즈니스 프로필·네이버 스마트플레이스의 업체명과 똑같이 맞춥니다.
export const SITE_NAME = "올댓아트 ALL THAT ART";

// 검색엔진에 알리는 업체 정보(구조화 데이터). 주소·전화번호는 구글/네이버 등록 정보와 같아야 합니다.
export const BUSINESS = {
  name: SITE_NAME,
  telephone: "+82-2-3443-9894",
  streetAddress: "논현로168길 25",
  locality: "강남구",
  region: "서울특별시",
  country: "KR",
  sameAs: [
    "https://www.instagram.com/allthatart_seoul/",
    "https://blog.naver.com/allthatartseoul",
    "https://www.youtube.com/channel/UC7ryDQMngDpL1OF-9P9Vojw",
  ],
};
// 검색 결과와 카카오톡·SNS 공유 미리보기에 나오는 제목·설명입니다. (대표 페이지 기준)
export const SITE_TITLE = "올댓아트 | 압구정 유학미술학원, 해외 미대 포트폴리오";

// 합격 건수는 합격결과 페이지의 데이터와 같은 값을 써서 항상 일치하게 합니다. (100건 단위로 내림)
const ADMISSIONS_FLOOR = Math.floor(ADMISSIONS_TOTAL / 100) * 100;
export const SITE_DESCRIPTION = `2009년 설립, 압구정 유학미술 전문 올댓아트. 해외 미술대학 신입학·편입학·대학원 포트폴리오 준비, ${ADMISSIONS_UNIVERSITIES}개 대학 ${ADMISSIONS_FLOOR.toLocaleString("ko-KR")}건 이상의 합격허가 실적. 무료 상담 예약.`;
