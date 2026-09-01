// ===== 교육 방법론 (ETHOS · PATHOS · LOGOS) =====
export const METHODOLOGY = [
  {
    key: "THINK",
    ko: "생각하다",
    desc: "자신의 경험과 관심에서 출발해 주제를 발견합니다.",
  },
  {
    key: "EXPLORE",
    ko: "탐구하다",
    desc: "다양한 재료와 매체를 실험하며 자신의 생각을 발전시킵니다.",
  },
  {
    key: "CREATE",
    ko: "만들다",
    desc: "생각과 탐구를 자신만의 시각적 언어로 구현합니다.",
  },
  {
    key: "COMMUNICATE",
    ko: "전달하다",
    desc: "작품의 의도와 과정을 체계화하여 타인에게 전달합니다.",
  },
];

// ===== 과목 (Subjects) — 메인 커리큘럼 페이지의 클릭형 아코디언용 =====
export const SUBJECT_GROUPS = [
  {
    category: "ART",
    items: [
      { name: "DRAWING", desc: "관찰과 표현의 기초를 다지는 과목" },
      { name: "PAINTING", desc: "색채와 조형적 사고를 다루는 과목" },
      { name: "LIGHT & ART", desc: "빛을 활용한 공간과 매체 실험" },
      { name: "ILLUSTRATION", desc: "이야기와 이미지를 시각적으로 구현" },
      { name: "SCULPTURE", desc: "입체적 사고와 공간에 대한 이해" },
      { name: "INSTALLATION", desc: "공간과 오브제를 활용한 설치 작업" },
      { name: "ANIMATION", desc: "움직임과 시간으로 이야기를 전달" },
      { name: "CROQUIS", desc: "빠른 관찰과 순간의 포착" },
    ],
  },
  {
    category: "DESIGN",
    items: [
      { name: "ARCHITECTURE", desc: "공간과 구조에 대한 탐구" },
      { name: "GRAPHIC", desc: "메시지를 시각언어로 전달하는 디자인" },
      { name: "PRODUCT", desc: "사물과 사용자 경험을 설계" },
      { name: "TRANSPORTATION", desc: "이동수단의 형태와 기능을 디자인" },
      { name: "INTERIOR", desc: "공간의 기능과 감성을 설계" },
      { name: "FASHION", desc: "패션과 신체에 대한 탐구" },
    ],
  },
];

// ===== 과목 (Subjects) — 신입학 상세 페이지의 정적 2줄 인포그래픽용 =====
export const SUBJECT_INFOGRAPHIC = [
  {
    category: "ART",
    rows: [
      ["DRAWING", "PAINTING", "LIGHT & ART", "CROQUIS"],
      ["ILLUSTRATION", "SCULPTURE", "ANIMATION", "INSTALLATION"],
    ],
  },
  {
    category: "DESIGN",
    rows: [
      ["ARCHITECTURE", "GRAPHIC", "PRODUCT"],
      ["TRANSPORTATION", "INTERIOR", "FASHION"],
    ],
  },
];

// ===== 프로그램 (Programs) =====
export type ProcessStep = { step: string; title: string; desc: string };
export type SubjectLink = { subject: string; desc: string };

export type CurriculumSub = {
  slug: string;
  name: string; // 예: "정규반"
  tag: string; // 예: "New Admission"
  tagline: string; // 헤드라인
  intro?: string; // 짧은 소개 (2~3줄)

  // 정규반 / 편입학 / 대학원 형(WHO-GOAL-SUBJECT-PROCESS-OUTCOME)
  who?: string[];
  curriculum?: SubjectLink[];
  process?: ProcessStep[];
  outcome?: string;
  outcomeItems?: string[];

  // 특강반 형
  topics?: SubjectLink[];

  // 예비반 형
  exploreSubjects?: string[];
  philosophy?: string;
};

export type ProgramItem = {
  title: string;
  desc: string;
  href?: string;
  who?: string; // 있으면 클릭 시 드롭다운으로 펼쳐 보여줌 (신입학 3개 반)
};

export type FlowStep = { en: string; ko: string; desc: string };
export type ClassItem = {
  title: string;
  headline: string;
  desc: string;
  keywords: string;
};

export type CurriculumTrack = {
  slug: string;
  tag: string;
  title: string;
  lead: string;
  subs: CurriculumSub[];

  // ===== 트랙 랜딩 페이지 콘텐츠 =====
  heroTag: string;
  heroTitle: string;
  heroDesc: string;
  introTitle: string;
  introDesc: string;
  methodTriad: string[];
  methodHeadline: string;
  methodDesc: string;
  programTitle: string;
  programItems: ProgramItem[];
  ctaHeadline: string;

  // 신입학처럼 풍부한 전용 상세 페이지가 있는 트랙만 채움 (옵셔널)
  flowSteps?: FlowStep[];
  flowCenterLabel?: string;
  classItems?: ClassItem[];
  classNote?: string;
  workbookHeadline?: string;
  workbookSteps?: { title: string; desc: string }[];
  resultHeadline?: string;
  resultDesc?: string;
  note?: string; // 편입학/대학원처럼 간결한 페이지의 마무리 한 줄
};

export const CURRICULUM_TRACKS: CurriculumTrack[] = [
  {
    slug: "undergraduate",
    tag: "Undergraduate",
    title: "신입학",
    lead: "정규반, 특강반, 예비반 — 학생의 시작점에 맞춰 가장 알맞은 방식으로 포트폴리오를 준비합니다.",
    heroTag: "New Admission",
    heroTitle: "자신만의 작품 세계를 만들어가는 첫 번째 과정",
    heroDesc:
      "미술과 디자인에 대한 다양한 경험을 바탕으로 자신의 관심과 생각을 발견하고, 이를 작품과 포트폴리오로 발전시킵니다.",
    introTitle: "자신의 가능성을 발견하고 발전시키는 과정",
    introDesc:
      "신입학 과정은 학생의 현재 수준과 목표에 따라 기초적인 표현부터 개인의 주제와 작품 세계를 발전시키는 과정까지 단계적으로 진행됩니다.",
    methodTriad: ["THINK", "EXPLORE", "CREATE"],
    methodHeadline: "생각하고, 탐구하고, 만들어갑니다.",
    methodDesc:
      "주제를 찾고, 다양한 재료와 표현 방식을 실험하며 자신만의 시각적 언어를 만들어갑니다.",
    programTitle: "NEW ADMISSION PROGRAM",
    programItems: [
      {
        title: "정규반",
        desc: "대학 진학을 위한 포트폴리오를 체계적으로 준비하는 과정",
        who: "유학미술을 처음 시작했거나, 지원 전공을 정하고 본격적으로 포트폴리오를 준비하고 싶은 학생에게 추천합니다.",
      },
      {
        title: "특강반",
        desc: "짧은 시간, 집중적으로 경험하며 작업의 가능성을 확장하는 과정",
        who: "방학 시즌을 활용해 특정 주제나 매체를 짧고 굵게 경험해보고 싶은 학생에게 추천합니다.",
      },
      {
        title: "예비반",
        desc: "다양한 작품을 폭넓게 경험하며 자신의 관심 분야와 가능성을 발견하는 과정",
        who: "다양한 경험과 공모전 활동을 통해 본격적인 입시를 준비하기 전 단계의 학생에게 추천합니다.",
      },
    ],
    ctaHeadline: "당신의 이야기가 작품이 되는 곳",

    // ===== 신입학 전용 상세 페이지 콘텐츠 =====
    flowSteps: [
      {
        en: "DISCOVER",
        ko: "발견하다",
        desc: "나의 관심과 경험에서 주제를 발견합니다.",
      },
      {
        en: "EXPLORE",
        ko: "탐구하다",
        desc: "다양한 분야와 매체를 탐구합니다.",
      },
      {
        en: "DEVELOP",
        ko: "발전하다",
        desc: "아이디어와 표현 방식을 발전시킵니다.",
      },
      {
        en: "CREATE",
        ko: "만들다",
        desc: "생각을 작품과 포트폴리오로 완성합니다.",
      },
    ],
    flowCenterLabel: "나만의\n작품 세계",
    classItems: [
      {
        title: "01. 정규반",
        headline: "대학 진학을 위한 포트폴리오를 체계적으로 준비합니다.",
        desc: "학생의 주제와 관심 분야를 바탕으로 작품을 지속적으로 발전시키며, 포트폴리오 완성까지 장기적으로 진행합니다.",
        keywords: "주제 탐구 · 작품 제작 · 포트폴리오",
      },
      {
        title: "02. 특강반",
        headline: "새로운 분야와 표현 방식을 집중적으로 경험합니다.",
        desc: "짧은 기간, 집중적으로 다양한 프로젝트를 경험하며 새로운 표현 가능성을 발견하고 기존 작업을 확장합니다.",
        keywords: "매체 실험 · 프로젝트 · 표현 확장",
      },
      {
        title: "03. 예비반",
        headline: "다양한 경험을 통해 자신의 가능성을 발견합니다.",
        desc: "미술과 디자인의 여러 분야를 경험하며 자신의 관심과 적성을 탐색하고 앞으로의 전공 방향을 찾아갑니다.",
        keywords: "기초 경험 · 분야 탐색 · 진로 발견",
      },
    ],
    classNote:
      "Drawing에서 시작해 Painting, Sculpture, Installation, Design까지. 학생의 아이디어에 가장 적합한 분야와 표현 방식을 찾아갑니다.",
    workbookHeadline: "생각의 과정까지 작품이 됩니다.",
    workbookSteps: [
      { title: "IDEA", desc: "관심과 경험에서 떠오른 첫 생각" },
      { title: "RESEARCH", desc: "자료와 사례를 조사하며 주제를 구체화" },
      { title: "SKETCH", desc: "떠오른 이미지를 빠르게 스케치로 옮김" },
      { title: "EXPERIMENT", desc: "다양한 재료와 방식으로 표현을 실험" },
      { title: "ARTWORK", desc: "실험을 바탕으로 완성작을 제작" },
      { title: "WORKBOOK", desc: "생각과 과정을 기록하고 체계화" },
      { title: "PORTFOLIO", desc: "작업 전체를 하나의 포트폴리오로 완성" },
    ],
    resultHeadline: "결과보다 중요한 것은,\n나만의 세계를 만들어가는 과정입니다.",
    resultDesc:
      "올댓아트는 학생의 생각과 가능성이 하나의 작품 세계로 발전할 수 있도록 함께합니다.",

    subs: [
      {
        slug: "regular",
        name: "정규반",
        tag: "New Admission",
        tagline: "자신만의 작품 세계를 구축하는 가장 기본적인 과정",
        intro:
          "기초적인 표현 능력부터 개인의 관심과 주제를 발견하고, 이를 발전시켜 포트폴리오로 완성하는 정규 과정입니다.",
        who: [
          "유학미술을 처음 시작하는 학생",
          "자신의 작업 방향을 찾고 싶은 학생",
          "특정 전공을 준비하고 있는 학생",
          "포트폴리오를 체계적으로 준비하고 싶은 학생",
        ],
        curriculum: [
          { subject: "DRAWING", desc: "관찰과 표현의 기초" },
          { subject: "PAINTING", desc: "색채와 조형적 사고" },
          { subject: "SCULPTURE", desc: "입체적 사고와 공간 이해" },
          { subject: "ARCHITECTURE", desc: "공간과 구조에 대한 탐구" },
        ],
        process: [
          { step: "01", title: "Research", desc: "주제와 관심사 발견" },
          { step: "02", title: "Experiment", desc: "재료와 표현 방식 실험" },
          { step: "03", title: "Development", desc: "아이디어 발전" },
          { step: "04", title: "Production", desc: "작품 제작" },
          { step: "05", title: "Portfolio", desc: "작업과정을 체계화" },
        ],
        outcome: "학생의 생각이 하나의 포트폴리오가 됩니다.",
        outcomeItems: ["완성 작품", "Workbook", "Portfolio"],
      },
      {
        slug: "intensive",
        name: "특강반",
        tag: "Special Class",
        tagline: "짧은 시간, 집중적인 탐구",
        topics: [
          { subject: "LIGHT & ART", desc: "빛을 활용한 공간 실험" },
          { subject: "SCULPTURE", desc: "입체 조형 워크숍" },
          {
            subject: "INSTALLATION",
            desc: "공간과 오브제를 활용한 설치 작업",
          },
          { subject: "FASHION", desc: "패션과 신체에 대한 탐구" },
        ],
      },
      {
        slug: "prep",
        name: "예비반",
        tag: "Discovery",
        tagline: "나의 가능성을 발견하는 시간",
        exploreSubjects: [
          "DRAWING",
          "PAINTING",
          "SCULPTURE",
          "DESIGN",
          "ANIMATION",
        ],
        philosophy:
          "다양한 매체와 분야를 경험하며 자신의 관심과 가능성을 발견합니다.",
      },
    ],
  },
  {
    slug: "transfer",
    tag: "Transfer",
    title: "편입학",
    lead: "이미 가지고 있는 작업을 새로운 방향으로 발전시키는 과정입니다.",
    heroTag: "Transfer",
    heroTitle: "지금까지의 작업을, 새로운 가능성으로",
    heroDesc:
      "기존의 작업과 경험을 분석하고 목표하는 전공에 맞춰 새로운 방향의 포트폴리오를 구축합니다.",
    introTitle: "지금까지의 경험을 새로운 방향으로",
    introDesc:
      "편입학 과정은 학생이 이미 가지고 있는 작업 경험을 바탕으로 강점과 가능성을 발견하고, 새로운 방향의 포트폴리오를 만들어가는 과정입니다.",
    methodTriad: ["ANALYZE", "DEVELOP", "REDEFINE"],
    methodHeadline: "분석하고, 발전시키고, 다시 정의합니다.",
    methodDesc:
      "기존 작업을 객관적으로 분석하고 새로운 주제와 표현 방식을 탐구하며 포트폴리오를 발전시킵니다.",
    flowSteps: [
      { en: "ANALYZE", ko: "분석하다", desc: "기존 작업과 강점 분석" },
      { en: "DIRECTION", ko: "설정하다", desc: "지원 전공과 작업 방향 설정" },
      { en: "DEVELOP", ko: "발전하다", desc: "새로운 작업 및 포트폴리오 발전" },
      { en: "PORTFOLIO", ko: "구성하다", desc: "지원 목적에 맞는 최종 구성" },
    ],
    flowCenterLabel: "새로운\n가능성",
    note: "지금까지의 경험을 다음 단계의 작품 세계로 발전시킵니다.",
    classItems: [
      {
        title: "01. Portfolio Analysis",
        headline: "기존 작업을 객관적으로 분석합니다.",
        desc: "지금까지의 작업을 살펴보며 강점과 개선이 필요한 지점을 함께 진단합니다.",
        keywords: "작업 분석 · 강점 진단 · 개선 방향",
      },
      {
        title: "02. Direction",
        headline: "지원 전공과 목표에 맞는 방향을 설정합니다.",
        desc: "희망하는 학교와 전공의 특성을 파악하고, 그에 맞는 새로운 작업 방향을 함께 설계합니다.",
        keywords: "전공 분석 · 방향 설정 · 목표 수립",
      },
      {
        title: "03. Portfolio Development",
        headline: "새로운 방향으로 작업을 발전시킵니다.",
        desc: "설정한 방향을 바탕으로 작업을 심화하고, 완성도 높은 포트폴리오로 구성합니다.",
        keywords: "심화 작업 · 완성도 · 포트폴리오",
      },
    ],
    classNote:
      "기존 작업의 강점은 살리고, 부족한 지점은 새롭게 채워갑니다. 지원 전공에 맞는 방향으로 작업 전체를 다시 구성합니다.",
    workbookHeadline: "생각의 과정까지 작품이 됩니다.",
    workbookSteps: [
      { title: "IDEA", desc: "관심과 경험에서 떠오른 첫 생각" },
      { title: "RESEARCH", desc: "자료와 사례를 조사하며 주제를 구체화" },
      { title: "SKETCH", desc: "떠오른 이미지를 빠르게 스케치로 옮김" },
      { title: "EXPERIMENT", desc: "다양한 재료와 방식으로 표현을 실험" },
      { title: "ARTWORK", desc: "실험을 바탕으로 완성작을 제작" },
      { title: "WORKBOOK", desc: "생각과 과정을 기록하고 체계화" },
      { title: "PORTFOLIO", desc: "작업 전체를 하나의 포트폴리오로 완성" },
    ],
    resultHeadline: "지금까지의 경험을\n다음 단계의 작품 세계로 발전시킵니다.",
    resultDesc:
      "올댓아트는 학생이 쌓아온 경험이 새로운 가능성으로 이어지도록 함께합니다.",
    programTitle: "TRANSFER PROGRAM",
    programItems: [
      {
        title: "Portfolio Analysis",
        desc: "기존 작업을 분석하고 강점과 개선 방향을 설정합니다.",
      },
      {
        title: "Direction",
        desc: "지원 전공과 목표에 맞춰 새로운 작업 방향을 구축합니다.",
      },
      {
        title: "Portfolio Development",
        desc: "작업을 발전시키고 완성도 높은 포트폴리오로 구성합니다.",
      },
    ],
    ctaHeadline: "지금까지의 경험을 다음 단계로",
    subs: [
      {
        slug: "regular",
        name: "편입학",
        tag: "Transfer",
        tagline: "이미 가지고 있는 작업을 새로운 방향으로 발전시키는 과정",
        process: [
          {
            step: "01",
            title: "Current Portfolio 분석",
            desc: "기존 작업의 방향과 완성도 진단",
          },
          {
            step: "02",
            title: "Strength & Weakness 분석",
            desc: "강점과 보완점 도출",
          },
          {
            step: "03",
            title: "Direction Setting",
            desc: "새로운 작업 방향 설정",
          },
          {
            step: "04",
            title: "Portfolio Development",
            desc: "심화 작업 및 포트폴리오 완성",
          },
        ],
      },
    ],
  },
  {
    slug: "graduate",
    tag: "Graduate",
    title: "대학원",
    lead: "작품을 넘어 자신의 연구 주제를 구축하는 과정입니다.",
    heroTag: "Graduate",
    heroTitle: "질문을 연구로, 연구를 작품으로",
    heroDesc:
      "자신의 관심과 문제의식에서 출발하여 연구와 실험을 진행하고, 이를 자신만의 작품 세계로 발전시킵니다.",
    introTitle: "질문에서 작품으로",
    introDesc:
      "대학원 과정은 단순한 작품 제작을 넘어 자신이 무엇을 탐구하고 표현하고자 하는지 깊이 있게 고민하며 이를 연구와 작품으로 발전시키는 과정입니다.",
    methodTriad: ["RESEARCH", "EXPERIMENT", "CREATE"],
    methodHeadline: "연구하고, 실험하고, 표현합니다.",
    methodDesc:
      "자신만의 질문을 발견하고 이론과 다양한 매체를 탐구하며 연구 결과를 작품과 포트폴리오로 발전시킵니다.",
    flowSteps: [
      { en: "QUESTION", ko: "질문하다", desc: "나만의 문제의식과 질문 발견" },
      { en: "RESEARCH", ko: "연구하다", desc: "이론과 자료를 통한 주제 탐구" },
      { en: "EXPERIMENT", ko: "실험하다", desc: "다양한 매체와 방법론 실험" },
      { en: "CREATE", ko: "만들다", desc: "연구를 작품과 포트폴리오로 발전" },
    ],
    flowCenterLabel: "나만의\n연구와 작품",
    note: "자신만의 질문을 발견하고, 그것을 작품으로 만들어갑니다.",
    classItems: [
      {
        title: "01. Research",
        headline: "개인의 관심과 문제의식을 연구 주제로 발전시킵니다.",
        desc: "자신이 무엇에 질문을 갖고 있는지 탐색하고, 이를 구체적인 연구 주제로 발전시킵니다.",
        keywords: "질문 발견 · 주제 설정 · 문제의식",
      },
      {
        title: "02. Experiment",
        headline: "다양한 매체와 방법론을 통해 연구를 실험합니다.",
        desc: "이론과 자료 조사를 바탕으로, 다양한 매체와 표현 방식을 통해 연구를 시각적으로 실험합니다.",
        keywords: "이론 탐구 · 매체 실험 · 방법론",
      },
      {
        title: "03. Production",
        headline: "연구 결과를 작품과 포트폴리오로 발전시킵니다.",
        desc: "실험 과정을 통해 얻은 결과를 완성도 높은 작품과 포트폴리오로 구현합니다.",
        keywords: "작품 제작 · 연구 정리 · 포트폴리오",
      },
    ],
    classNote:
      "이론적 탐구와 실험을 반복하며, 자신만의 연구가 곧 작품이 되는 과정을 만들어갑니다.",
    workbookHeadline: "생각의 과정까지 작품이 됩니다.",
    workbookSteps: [
      { title: "IDEA", desc: "관심과 경험에서 떠오른 첫 생각" },
      { title: "RESEARCH", desc: "자료와 사례를 조사하며 주제를 구체화" },
      { title: "SKETCH", desc: "떠오른 이미지를 빠르게 스케치로 옮김" },
      { title: "EXPERIMENT", desc: "다양한 재료와 방식으로 표현을 실험" },
      { title: "ARTWORK", desc: "실험을 바탕으로 완성작을 제작" },
      { title: "WORKBOOK", desc: "생각과 과정을 기록하고 체계화" },
      { title: "PORTFOLIO", desc: "작업 전체를 하나의 포트폴리오로 완성" },
    ],
    resultHeadline: "자신만의 질문을 발견하고,\n그것을 작품으로 만들어갑니다.",
    resultDesc:
      "올댓아트는 학생의 연구와 사유가 하나의 작품 세계로 완성되도록 함께합니다.",
    programTitle: "GRADUATE PROGRAM",
    programItems: [
      {
        title: "Research",
        desc: "개인의 관심과 문제의식을 연구 주제로 발전시킵니다.",
      },
      {
        title: "Experiment",
        desc: "다양한 매체와 방법론을 통해 연구를 시각적으로 실험합니다.",
      },
      {
        title: "Production",
        desc: "연구 결과를 작품과 포트폴리오로 발전시킵니다.",
      },
    ],
    ctaHeadline: "자신만의 질문을 작품으로",
    subs: [
      {
        slug: "regular",
        name: "대학원",
        tag: "Graduate",
        tagline: "작품을 넘어 자신의 연구 주제를 구축합니다.",
        process: [
          { step: "01", title: "Research", desc: "연구 주제 탐색" },
          { step: "02", title: "Theory", desc: "이론적 체계 구축" },
          { step: "03", title: "Experiment", desc: "매체와 방법론 실험" },
          { step: "04", title: "Production", desc: "작품 제작" },
          {
            step: "05",
            title: "Presentation",
            desc: "연구와 작품의 통합적 전달",
          },
        ],
      },
    ],
  },
];

export function getTrack(slug: string) {
  return CURRICULUM_TRACKS.find((t) => t.slug === slug);
}

export function getSub(trackSlug: string, subSlug: string) {
  const track = getTrack(trackSlug);
  const sub = track?.subs.find((s) => s.slug === subSlug);
  return track && sub ? { track, sub } : undefined;
}
