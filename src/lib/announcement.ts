// 팝업 공지 설정
//
// 사용법:
// 1. 팝업을 띄우고 싶을 때 → enabled: true 로 바꾸고, 내용을 원하는 대로 수정
// 2. 팝업을 끄고 싶을 때 → enabled: false 로 바꾸기
//
// 이미지로 된 팝업을 쓰고 싶다면:
// - 이미지를 public/images 폴더에 넣고 (예: popup1.jpg, popup2.jpg)
// - 아래 images 목록에 "/images/popup1.jpg", "/images/popup2.jpg" 처럼 한 줄씩 추가하세요.
// - 이미지가 여러 장이면 방문할 때마다 그중 한 장이 랜덤으로 뜹니다
//   (바로 전에 본 이미지는 가능한 한 다시 나오지 않게 합니다).
// - 이미지가 한 장뿐이면 그 한 장만 뜨고, 목록을 비우면 아래 title/message 텍스트 팝업이 뜹니다.
//
// 저장 후 브라우저를 새로고침하면 바로 반영됩니다.
export const ANNOUNCEMENT = {
  enabled: true,

  // 팝업에 쓸 이미지 목록. 비워두면 아래 title/message 텍스트 팝업이 뜹니다.
  images: [
    "/images/popup1.jpg",
    "/images/popup2.jpg",
    "/images/popup3.jpg",
    "/images/popup4.jpg",
    "/images/popup5.jpg",
  ] as string[],

  title: "...",
  message:
    "...",

  // 버튼(또는 이미지 클릭) 시 이동할 페이지. 필요 없으면 빈 문자열("")로 두세요.
  linkHref: "",
  linkLabel: "...",
};
