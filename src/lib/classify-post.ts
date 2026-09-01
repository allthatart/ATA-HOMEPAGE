export const CATEGORIES = [
  "대학정보",
  "전공",
  "입시 팁",
  "올댓아트 활동",
  "기타",
] as const;

export type Category = (typeof CATEGORIES)[number];

// 제목에 포함된 키워드를 보고 카테고리를 자동으로 분류합니다.
// 배열 순서가 우선순위입니다 (위에서부터 먼저 매칭되는 걸 사용).
const RULES: { category: Category; keywords: string[] }[] = [
  {
    category: "입시 팁",
    keywords: ["입시", "포트폴리오", "합격", "노하우", "팁", "가이드", "준비", "전형"],
  },
  {
    category: "대학정보",
    keywords: ["대학교", "대학", "University", "칼리지", "College"],
  },
  {
    category: "전공",
    keywords: [
      "전공",
      "학과",
      "회화",
      "조소",
      "공예",
      "애니메이션",
      "시각디자인",
      "산업디자인",
    ],
  },
  {
    category: "올댓아트 활동",
    keywords: ["올댓아트", "특강", "전시", "행사", "수업", "워크숍"],
  },
];

export function classifyPost(title: string): Category {
  for (const rule of RULES) {
    if (rule.keywords.some((kw) => title.includes(kw))) {
      return rule.category;
    }
  }
  return "기타";
}
