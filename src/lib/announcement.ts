// 팝업 공지 설정
//
// 사용법:
// 1. 팝업을 띄우고 싶을 때 → enabled: true 로 바꾸고, 내용을 원하는 대로 수정
// 2. 팝업을 끄고 싶을 때 → enabled: false 로 바꾸기
//
// 이미지로 된 팝업을 쓰고 싶다면:
// - 이미지를 public/images/popup.png (원하는 파일명) 로 넣고
// - 아래 image 값을 "/images/popup.png" 로 채우세요.
// - image 값이 채워져 있으면 title/message 텍스트 대신 그 이미지가 팝업 전체를 채웁니다.
//
// 저장 후 브라우저를 새로고침하면 바로 반영됩니다.
export const ANNOUNCEMENT = {
  enabled: true,

  // 이미지 팝업을 쓸 때 채우는 값. 비워두면 아래 title/message 텍스트 팝업이 뜹니다.
  image: "/images/rocktable.jpg",

  title: "...",
  message:
    "...",

  // 버튼(또는 이미지 클릭) 시 이동할 페이지. 필요 없으면 빈 문자열("")로 두세요.
  linkHref: "",
  linkLabel: "...",
};
