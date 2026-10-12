// ===== 교육 방법론 (ETHOS · PATHOS · LOGOS) =====
export const METHODOLOGY = [
  {
    key: "THINK",
    ko: "생각하다",
    desc: "자신의 경험과 관심에서 출발해 주제를 발견합니다.",
    descEn: "Discover a subject starting from your own experience and interests.",
  },
  {
    key: "EXPLORE",
    ko: "탐구하다",
    desc: "다양한 재료와 매체를 실험하며 자신의 생각을 발전시킵니다.",
    descEn: "Develop your ideas by experimenting with various materials and media.",
  },
  {
    key: "CREATE",
    ko: "만들다",
    desc: "생각과 탐구를 자신만의 시각적 언어로 구현합니다.",
    descEn: "Translate your thinking and exploration into your own visual language.",
  },
  {
    key: "COMMUNICATE",
    ko: "전달하다",
    desc: "작품의 의도와 과정을 체계화하여 타인에게 전달합니다.",
    descEn: "Organize your work's intent and process to communicate it to others.",
  },
];

// ===== 과목 (Subjects) — 메인 커리큘럼 페이지의 클릭형 아코디언용 =====
export const SUBJECT_GROUPS = [
  {
    category: "ART",
    items: [
      { name: "DRAWING", desc: "관찰과 표현의 기초를 다지는 과목", descEn: "Building the fundamentals of observation and expression." },
      { name: "PAINTING", desc: "색채와 조형적 사고를 다루는 과목", descEn: "Working with color and formative thinking." },
      { name: "LIGHT & ART", desc: "빛을 활용한 공간과 매체 실험", descEn: "Experimenting with space and media using light." },
      { name: "ILLUSTRATION", desc: "이야기와 이미지를 시각적으로 구현", descEn: "Bringing stories and images to life visually." },
      { name: "SCULPTURE", desc: "입체적 사고와 공간에 대한 이해", descEn: "Three-dimensional thinking and spatial understanding." },
      { name: "INSTALLATION", desc: "공간과 오브제를 활용한 설치 작업", descEn: "Installation work using space and objects." },
      { name: "ANIMATION", desc: "움직임과 시간으로 이야기를 전달", descEn: "Telling stories through movement and time." },
      { name: "CROQUIS", desc: "빠른 관찰과 순간의 포착", descEn: "Quick observation and capturing the moment." },
    ],
  },
  {
    category: "DESIGN",
    items: [
      { name: "ARCHITECTURE", desc: "공간과 구조에 대한 탐구", descEn: "Exploring space and structure." },
      { name: "GRAPHIC", desc: "메시지를 시각언어로 전달하는 디자인", descEn: "Design that conveys a message through visual language." },
      { name: "PRODUCT", desc: "사물과 사용자 경험을 설계", descEn: "Designing objects and user experience." },
      { name: "TRANSPORTATION", desc: "이동수단의 형태와 기능을 디자인", descEn: "Designing the form and function of vehicles." },
      { name: "INTERIOR", desc: "공간의 기능과 감성을 설계", descEn: "Designing the function and feel of a space." },
      { name: "FASHION", desc: "패션과 신체에 대한 탐구", descEn: "Exploring fashion and the body." },
    ],
  },
  {
    category: "EC",
    items: [
      { name: "AP&IB ART", desc: "AP Art & Design, IB Visual Arts 과정을 이해하고 준비합니다", descEn: "Understanding and preparing for AP Art & Design and IB Visual Arts." },
      { name: "COMPETITION", desc: "공모전에 도전하며 작품을 세상에 선보입니다", descEn: "Taking on competitions to show your work to the world." },
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
export type ProcessStep = { step: string; title: string; titleEn?: string; desc: string; descEn?: string };
export type SubjectLink = { subject: string; desc: string; descEn?: string };

export type CurriculumSub = {
  slug: string;
  name: string; // 예: "정규반"
  nameEn?: string;
  tag: string; // 예: "New Admission"
  tagline: string; // 헤드라인
  taglineEn?: string;
  intro?: string; // 짧은 소개 (2~3줄)
  introEn?: string;

  // 정규반 / 편입학 / 대학원 형(WHO-GOAL-SUBJECT-PROCESS-OUTCOME)
  who?: string[];
  whoEn?: string[];
  curriculum?: SubjectLink[];
  process?: ProcessStep[];
  outcome?: string;
  outcomeEn?: string;
  outcomeItems?: string[];
  outcomeItemsEn?: string[];

  // 특강반 형
  topics?: SubjectLink[];

  // 예비반 형
  exploreSubjects?: string[];
  philosophy?: string;
  philosophyEn?: string;

  // 반 전용 소개 페이지 (있으면 신입학 공통 소개 대신 이 내용을 보여줌)
  flowSteps?: FlowStep[];
  flowCenterLabel?: string;
  flowCenterLabelEn?: string;
  activitiesTitle?: string;
  activitiesTitleEn?: string;
  activities?: ClassItem[];
};

export type ProgramItem = {
  title: string;
  desc: string;
  href?: string;
  who?: string; // 있으면 클릭 시 드롭다운으로 펼쳐 보여줌 (신입학 3개 반)
};

export type FlowStep = { en: string; ko: string; desc: string; descEn?: string };
export type ClassItem = {
  title: string;
  titleEn?: string;
  headline: string;
  headlineEn?: string;
  desc: string;
  descEn?: string;
  keywords: string;
  keywordsEn?: string;
  href?: string; // 있으면 카드 전체가 해당 세부 페이지로 연결됨
};

export type CurriculumTrack = {
  slug: string;
  tag: string;
  title: string;
  titleEn?: string;
  lead: string;
  leadEn?: string;
  subs: CurriculumSub[];

  // ===== 트랙 랜딩 페이지 콘텐츠 =====
  heroTag: string;
  heroTitle: string;
  heroDesc: string;
  heroDescEn?: string;
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
  flowCenterLabelEn?: string;
  classItems?: ClassItem[];
  classNote?: string;
  classNoteEn?: string;
  workbookHeadline?: string;
  workbookHeadlineEn?: string;
  workbookSteps?: { title: string; desc: string; descEn?: string }[];
  resultHeadline?: string;
  resultHeadlineEn?: string;
  resultDesc?: string;
  resultDescEn?: string;
  note?: string; // 편입학/대학원처럼 간결한 페이지의 마무리 한 줄
};

export const CURRICULUM_TRACKS: CurriculumTrack[] = [
  {
    slug: "undergraduate",
    tag: "Undergraduate",
    title: "신입학",
    titleEn: "New Admission",
    lead: "정규반, 특강반, 예비반 — 학생의 시작점에 맞춰 가장 알맞은 방식으로 포트폴리오를 준비합니다.",
    leadEn:
      "Regular, Intensive, and Prep tracks — preparing a portfolio in the way that best fits where each student is starting from.",
    heroTag: "New Admission",
    heroTitle: "자신만의 작품 세계를 만들어가는 첫 번째 과정",
    heroDesc:
      "미술과 디자인에 대한 다양한 경험을 바탕으로 자신의 관심과 생각을 발견하고, 이를 작품과 포트폴리오로 발전시킵니다.",
    heroDescEn:
      "Through varied experiences in art and design, students discover their own interests and ideas, then develop them into artwork and a portfolio.",
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
        descEn: "Discover a subject from your own interests and experience.",
      },
      {
        en: "EXPLORE",
        ko: "탐구하다",
        desc: "다양한 분야와 매체를 탐구합니다.",
        descEn: "Explore a range of fields and media.",
      },
      {
        en: "DEVELOP",
        ko: "발전하다",
        desc: "아이디어와 표현 방식을 발전시킵니다.",
        descEn: "Develop your ideas and modes of expression.",
      },
      {
        en: "CREATE",
        ko: "만들다",
        desc: "생각을 작품과 포트폴리오로 완성합니다.",
        descEn: "Turn your thinking into finished work and a portfolio.",
      },
    ],
    flowCenterLabel: "나만의\n작품 세계",
    flowCenterLabelEn: "A World\nof Your Own",
    classItems: [
      {
        title: "01. 정규반",
        titleEn: "01. Regular",
        headline: "대학 진학을 위한 포트폴리오를 체계적으로 준비합니다.",
        headlineEn:
          "Systematically prepares a portfolio for university admission.",
        desc: "학생의 주제와 관심 분야를 바탕으로 작품을 지속적으로 발전시키며, 포트폴리오 완성까지 장기적으로 진행합니다.",
        descEn:
          "Work is continually developed based on each student's subject and interests, running long-term through to a finished portfolio.",
        keywords: "주제 탐구 · 작품 제작 · 포트폴리오",
        keywordsEn: "Subject Exploration · Artwork · Portfolio",
        href: "/curriculum/undergraduate/regular",
      },
      {
        title: "02. 특강반",
        titleEn: "02. Intensive",
        headline: "새로운 분야와 표현 방식을 집중적으로 경험합니다.",
        headlineEn: "An intensive experience of new fields and expression.",
        desc: "짧은 기간, 집중적으로 다양한 프로젝트를 경험하며 새로운 표현 가능성을 발견하고 기존 작업을 확장합니다.",
        descEn:
          "Over a short period, students intensively experience varied projects, discovering new expressive possibilities and expanding on existing work.",
        keywords: "매체 실험 · 프로젝트 · 표현 확장",
        keywordsEn: "Media Experiments · Projects · Expanded Expression",
        href: "/curriculum/undergraduate/intensive",
      },
      {
        title: "03. 예비반",
        titleEn: "03. Prep",
        headline: "다양한 경험을 통해 자신의 가능성을 발견합니다.",
        headlineEn: "Discover your potential through varied experiences.",
        desc: "미술과 디자인의 여러 분야를 경험하며 자신의 관심과 적성을 탐색하고 앞으로의 전공 방향을 찾아갑니다.",
        descEn:
          "By experiencing various fields of art and design, students explore their interests and aptitude and find a future direction for their major.",
        keywords: "기초 경험 · 분야 탐색 · 진로 발견",
        keywordsEn: "Foundational Experience · Exploration · Direction",
        href: "/curriculum/undergraduate/prep",
      },
    ],
    classNote:
      "Drawing에서 시작해 Painting, Sculpture, Installation, Design까지. 학생의 아이디어에 가장 적합한 분야와 표현 방식을 찾아갑니다.",
    classNoteEn:
      "From Drawing to Painting, Sculpture, Installation, and Design — we find the field and mode of expression that best fits each student's ideas.",
    workbookHeadline: "생각의 과정까지 작품이 됩니다.",
    workbookHeadlineEn: "Even the process of thinking becomes the work.",
    workbookSteps: [
      { title: "IDEA", desc: "관심과 경험에서 떠오른 첫 생각", descEn: "The first idea sparked by interest and experience" },
      { title: "RESEARCH", desc: "자료와 사례를 조사하며 주제를 구체화", descEn: "Researching references and cases to sharpen the subject" },
      { title: "SKETCH", desc: "떠오른 이미지를 빠르게 스케치로 옮김", descEn: "Quickly sketching out the image that comes to mind" },
      { title: "EXPERIMENT", desc: "다양한 재료와 방식으로 표현을 실험", descEn: "Experimenting with expression using various materials and methods" },
      { title: "ARTWORK", desc: "실험을 바탕으로 완성작을 제작", descEn: "Producing a finished piece based on the experiments" },
      { title: "WORKBOOK", desc: "생각과 과정을 기록하고 체계화", descEn: "Recording and organizing the thinking and process" },
      { title: "PORTFOLIO", desc: "작업 전체를 하나의 포트폴리오로 완성", descEn: "Completing the whole body of work as one portfolio" },
    ],
    resultHeadline: "결과보다 중요한 것은,\n나만의 세계를 만들어가는 과정입니다.",
    resultHeadlineEn:
      "What matters more than the result\nis the process of building a world of your own.",
    resultDesc:
      "올댓아트는 학생의 생각과 가능성이 하나의 작품 세계로 발전할 수 있도록 함께합니다.",
    resultDescEn:
      "All That Art works alongside each student so their thinking and potential can grow into a world of their own work.",

    subs: [
      {
        slug: "regular",
        name: "신입학",
        nameEn: "New Admission",
        tag: "New Admission",
        philosophy:
          "미술과 디자인에 대한 다양한 경험을 바탕으로 자신의 관심과 생각을 발견하고, 이를 작품과 포트폴리오로 발전시킵니다.",
        philosophyEn:
          "Through varied experiences in art and design, students discover their own interests and ideas, then develop them into artwork and a portfolio.",
        activitiesTitle: "신입학 과정에서 하는 것들",
        activitiesTitleEn: "What You Do in New Admission",
        activities: [
          {
            title: "01. 주제 탐구",
            titleEn: "01. Subject Exploration",
            headline: "나의 관심과 경험에서 주제를 발견합니다.",
            headlineEn: "Discover a subject from your own interests and experience.",
            desc: "자료 조사와 스케치를 통해 관심사를 구체적인 작업 주제로 발전시킵니다.",
            descEn:
              "Through research and sketching, develop your interests into a concrete subject for your work.",
            keywords: "주제 발견 · 리서치 · 스케치",
            keywordsEn: "Subject · Research · Sketching",
          },
          {
            title: "02. 기초 표현 수업",
            titleEn: "02. Foundational Classes",
            headline: "관찰과 표현의 기초를 탄탄하게 다집니다.",
            headlineEn: "Build a solid foundation in observation and expression.",
            desc: "드로잉, 페인팅, 조소, 건축 등 기본 수업으로 표현 능력과 조형적 사고를 키웁니다.",
            descEn:
              "Grow your expressive skills and formative thinking through core classes in drawing, painting, sculpture, and architecture.",
            keywords: "DRAWING · PAINTING · SCULPTURE · ARCHITECTURE",
            keywordsEn: "DRAWING · PAINTING · SCULPTURE · ARCHITECTURE",
          },
          {
            title: "03. 작품 제작",
            titleEn: "03. Making Artwork",
            headline: "다양한 재료로 표현을 실험하고 작품을 완성합니다.",
            headlineEn: "Experiment with materials and complete your artwork.",
            desc: "실험을 바탕으로 아이디어를 발전시켜 완성도 있는 작품으로 만들어갑니다.",
            descEn:
              "Develop your ideas through experimentation and bring them to polished finished pieces.",
            keywords: "재료 실험 · 아이디어 발전 · 작품 제작",
            keywordsEn: "Experiments · Developing Ideas · Artwork",
          },
          {
            title: "04. Workbook 작성",
            titleEn: "04. Workbook",
            headline: "생각과 과정을 기록하고 체계화합니다.",
            headlineEn: "Record and organize your thinking and process.",
            desc: "아이디어에서 완성작까지의 과정을 Workbook에 담아 작업의 깊이를 보여줍니다.",
            descEn:
              "Capture everything from idea to finished piece in a workbook that shows the depth of your work.",
            keywords: "과정 기록 · 체계화 · Workbook",
            keywordsEn: "Process · Organization · Workbook",
          },
          {
            title: "05. 포트폴리오 완성",
            titleEn: "05. Completing the Portfolio",
            headline: "작업 전체를 하나의 포트폴리오로 완성합니다.",
            headlineEn: "Complete the whole body of work as one portfolio.",
            desc: "완성 작품과 Workbook을 정리해 지원에 맞는 하나의 포트폴리오로 구성합니다.",
            descEn:
              "Organize finished pieces and the workbook into a single portfolio suited to your applications.",
            keywords: "완성 작품 · 구성 · Portfolio",
            keywordsEn: "Finished Work · Composition · Portfolio",
          },
          {
            title: "06. 맞춤 지원 방향",
            titleEn: "06. Tailored Direction",
            headline: "희망 대학과 전공에 맞춰 방향을 잡습니다.",
            headlineEn: "Set a direction that fits your target schools and major.",
            desc: "학생의 현재 수준과 목표를 1:1로 진단하고, 지원 방향에 맞는 작업 계획을 세웁니다.",
            descEn:
              "Diagnose the student's level and goals 1:1 and plan the work to fit the application direction.",
            keywords: "1:1 진단 · 전공 방향 · 작업 계획",
            keywordsEn: "1:1 Diagnosis · Major Direction · Work Plan",
          },
        ],
        tagline: "자신만의 작품 세계를 구축하는 가장 기본적인 과정",
        taglineEn: "The foundational process of building a world of your own work",
        intro:
          "기초적인 표현 능력부터 개인의 관심과 주제를 발견하고, 이를 발전시켜 포트폴리오로 완성하는 정규 과정입니다.",
        introEn:
          "A regular program that starts from basic expressive skills, discovers your personal interests and subject, and develops them into a finished portfolio.",
        who: [
          "유학미술을 처음 시작하는 학생",
          "자신의 작업 방향을 찾고 싶은 학생",
          "특정 전공을 준비하고 있는 학생",
          "포트폴리오를 체계적으로 준비하고 싶은 학생",
        ],
        whoEn: [
          "Students just starting out in art study abroad",
          "Students looking to find their own direction of work",
          "Students preparing for a specific major",
          "Students who want to prepare a portfolio systematically",
        ],
        curriculum: [
          { subject: "DRAWING", desc: "관찰과 표현의 기초", descEn: "Fundamentals of observation and expression" },
          { subject: "PAINTING", desc: "색채와 조형적 사고", descEn: "Color and formative thinking" },
          { subject: "SCULPTURE", desc: "입체적 사고와 공간 이해", descEn: "Three-dimensional thinking and spatial understanding" },
          { subject: "ARCHITECTURE", desc: "공간과 구조에 대한 탐구", descEn: "Exploring space and structure" },
        ],
        process: [
          { step: "01", title: "Research", desc: "주제와 관심사 발견", descEn: "Discovering a subject and interests" },
          { step: "02", title: "Experiment", desc: "재료와 표현 방식 실험", descEn: "Experimenting with materials and modes of expression" },
          { step: "03", title: "Development", desc: "아이디어 발전", descEn: "Developing the idea" },
          { step: "04", title: "Production", desc: "작품 제작", descEn: "Producing the work" },
          { step: "05", title: "Portfolio", desc: "작업과정을 체계화", descEn: "Organizing the work process" },
        ],
        outcome: "학생의 생각이 하나의 포트폴리오가 됩니다.",
        outcomeEn: "A student's thinking becomes a single portfolio.",
        outcomeItems: ["완성 작품", "Workbook", "Portfolio"],
        outcomeItemsEn: ["Finished Work", "Workbook", "Portfolio"],
      },
      {
        slug: "intensive",
        name: "특강반",
        nameEn: "Intensive",
        tag: "Special Class",
        tagline: "짧은 시간, 집중적인 탐구",
        taglineEn: "A short, intensive exploration",
        philosophy: "새로운 분야와 표현 방식을 집중적으로 경험합니다.",
        philosophyEn: "An intensive experience of new fields and expression.",
        flowSteps: [
          {
            en: "FOCUS",
            ko: "집중하다",
            desc: "짧은 기간, 하나의 주제에 몰입합니다.",
            descEn: "Immerse yourself in one subject over a short period.",
          },
          {
            en: "EXPERIMENT",
            ko: "실험하다",
            desc: "새로운 매체와 재료를 과감하게 시도합니다.",
            descEn: "Boldly try new media and materials.",
          },
          {
            en: "PRODUCE",
            ko: "제작하다",
            desc: "아이디어를 한 점의 작품으로 완성합니다.",
            descEn: "Complete your idea as a finished piece.",
          },
          {
            en: "EXPAND",
            ko: "확장하다",
            desc: "기존 작업과 표현의 폭을 넓혀갑니다.",
            descEn: "Broaden your existing work and range of expression.",
          },
        ],
        flowCenterLabel: "집중\n프로젝트",
        flowCenterLabelEn: "Intensive\nProject",
        activitiesTitle: "특강반에서 해볼 수 있는 것들",
        activitiesTitleEn: "What You Can Do in Intensive",
        activities: [
          {
            title: "01. 방학 집중 프로젝트",
            titleEn: "01. Vacation Intensive Project",
            headline: "짧은 기간, 하나의 주제를 깊이 있게 완성합니다.",
            headlineEn: "Complete one subject in depth over a short period.",
            desc: "방학 시즌을 활용해 특정 주제를 정하고, 아이디어 구상부터 작품 완성까지 집중적으로 진행합니다.",
            descEn:
              "Using the vacation season, choose a subject and work intensively from concept to finished piece.",
            keywords: "주제 선정 · 집중 작업 · 작품 완성",
            keywordsEn: "Subject · Focused Work · Finished Piece",
          },
          {
            title: "02. 새로운 매체 실험",
            titleEn: "02. New Media Experiments",
            headline: "평소 해보지 못한 매체와 재료를 경험합니다.",
            headlineEn: "Experience media and materials you haven't tried before.",
            desc: "빛, 입체, 설치, 패션 등 다양한 매체를 직접 다뤄보며 나만의 표현 방식을 넓혀갑니다.",
            descEn:
              "Work hands-on with light, sculpture, installation, fashion, and more to widen your own mode of expression.",
            keywords: "Light & Art · 조소 · 설치 · 패션",
            keywordsEn: "Light & Art · Sculpture · Installation · Fashion",
          },
          {
            title: "03. 주제별 워크숍",
            titleEn: "03. Themed Workshops",
            headline: "한 가지 주제를 정해 함께 탐구하는 워크숍입니다.",
            headlineEn: "Workshops that explore one chosen theme together.",
            desc: "입체 조형 워크숍처럼 주제별로 구성된 수업에서 재료와 기법을 배우고 바로 작업에 적용해봅니다.",
            descEn:
              "In themed classes such as the sculpture workshop, learn materials and techniques and apply them to your work right away.",
            keywords: "워크숍 · 재료 · 기법",
            keywordsEn: "Workshop · Materials · Techniques",
          },
          {
            title: "04. 포트폴리오 보강",
            titleEn: "04. Portfolio Boost",
            headline: "부족한 분야의 작품을 채워 넣습니다.",
            headlineEn: "Fill in work for the areas you're missing.",
            desc: "기존 포트폴리오를 점검하고, 보완이 필요한 분야의 작품을 특강을 통해 추가로 만들어갑니다.",
            descEn:
              "Review your existing portfolio and create additional work in areas that need strengthening.",
            keywords: "포트폴리오 점검 · 작품 추가",
            keywordsEn: "Portfolio Review · New Work",
          },
          {
            title: "05. 1:1 피드백",
            titleEn: "05. 1:1 Feedback",
            headline: "작업 과정마다 선생님의 피드백을 받습니다.",
            headlineEn: "Get a teacher's feedback at every stage of your work.",
            desc: "짧은 기간에도 방향을 잃지 않도록, 작업 단계마다 선생님과 1:1로 점검하고 방향을 잡아갑니다.",
            descEn:
              "To stay on course even in a short time, check in 1:1 with your teacher at each stage of the work.",
            keywords: "1:1 지도 · 점검 · 방향 설정",
            keywordsEn: "1:1 Guidance · Check-ins · Direction",
          },
          {
            title: "06. 작품 완성과 정리",
            titleEn: "06. Finishing & Documenting",
            headline: "완성한 작품을 기록하고 정리합니다.",
            headlineEn: "Document and organize the work you finished.",
            desc: "완성한 작품과 작업 과정을 사진과 기록으로 정리해 이후 포트폴리오에 바로 쓸 수 있게 남깁니다.",
            descEn:
              "Document the finished work and process with photos and notes so it's ready to use in your portfolio later.",
            keywords: "작품 기록 · 과정 정리",
            keywordsEn: "Documentation · Process",
          },
        ],
        topics: [
          { subject: "LIGHT & ART", desc: "빛을 활용한 공간 실험", descEn: "Experimenting with space using light" },
          { subject: "SCULPTURE", desc: "입체 조형 워크숍", descEn: "Three-dimensional form workshop" },
          {
            subject: "INSTALLATION",
            desc: "공간과 오브제를 활용한 설치 작업",
            descEn: "Installation work using space and objects",
          },
          { subject: "FASHION", desc: "패션과 신체에 대한 탐구", descEn: "Exploring fashion and the body" },
        ],
      },
      {
        slug: "prep",
        name: "예비반",
        nameEn: "Prep",
        tag: "Discovery",
        tagline: "나의 가능성을 발견하는 시간",
        taglineEn: "A time to discover your own potential",
        exploreSubjects: [
          "DRAWING",
          "PAINTING",
          "SCULPTURE",
          "DESIGN",
          "ANIMATION",
        ],
        philosophy:
          "다양한 매체와 분야를 경험하며 자신의 관심과 가능성을 발견합니다.",
        philosophyEn:
          "Discover your interests and potential by experiencing a variety of media and fields.",
        flowSteps: [
          {
            en: "EXPERIENCE",
            ko: "경험하다",
            desc: "다양한 분야와 수업을 폭넓게 경험합니다.",
            descEn: "Experience a wide range of fields and classes.",
          },
          {
            en: "EXPLORE",
            ko: "탐색하다",
            desc: "내가 좋아하는 것과 잘하는 것을 찾아봅니다.",
            descEn: "Find what you love and what you're good at.",
          },
          {
            en: "CHALLENGE",
            ko: "도전하다",
            desc: "AP·IB 작품과 공모전에 도전해봅니다.",
            descEn: "Take on AP and IB work and competitions.",
          },
          {
            en: "DISCOVER",
            ko: "발견하다",
            desc: "나의 가능성과 전공 방향을 발견합니다.",
            descEn: "Discover your potential and direction for your major.",
          },
        ],
        flowCenterLabel: "나의\n가능성",
        flowCenterLabelEn: "Your\nPotential",
        activitiesTitle: "예비반에서 해볼 수 있는 것들",
        activitiesTitleEn: "What You Can Do in Prep",
        activities: [
          {
            title: "01. 다양한 체험 수업",
            titleEn: "01. Hands-on Classes",
            headline: "드로잉부터 디자인까지, 여러 분야를 직접 해봅니다.",
            headlineEn: "From drawing to design, try many fields hands-on.",
            desc: "드로잉, 페인팅, 조소, 디자인, 애니메이션 등 다양한 분야의 수업을 경험하며 나에게 맞는 표현 방식을 찾아갑니다.",
            descEn:
              "Experience classes in drawing, painting, sculpture, design, animation, and more to find the mode of expression that suits you.",
            keywords: "드로잉 · 페인팅 · 조소 · 디자인 · 애니메이션",
            keywordsEn: "Drawing · Painting · Sculpture · Design · Animation",
          },
          {
            title: "02. AP Art",
            titleEn: "02. AP Art",
            headline: "AP Art & Design 과정을 미리 경험합니다.",
            headlineEn: "Get an early experience of the AP Art & Design course.",
            desc: "AP Art & Design의 구성과 평가 방식을 이해하고, 작품 주제를 정해 단계적으로 작업을 쌓아갑니다.",
            descEn:
              "Understand how AP Art & Design is structured and assessed, then choose a subject and build your work step by step.",
            keywords: "AP Art · 주제 탐구 · 작품 구성",
            keywordsEn: "AP Art · Subject Inquiry · Body of Work",
          },
          {
            title: "03. IB Art",
            titleEn: "03. IB Art",
            headline: "IB Visual Arts 과정을 이해하고 준비합니다.",
            headlineEn: "Understand and prepare for the IB Visual Arts course.",
            desc: "IB Visual Arts의 Process Portfolio와 전시 구성을 이해하고, 자신의 관심사를 작업으로 연결해봅니다.",
            descEn:
              "Understand the IB Visual Arts Process Portfolio and exhibition, and connect your own interests to your work.",
            keywords: "IB Art · Process Portfolio · 전시 구성",
            keywordsEn: "IB Art · Process Portfolio · Exhibition",
          },
          {
            title: "04. 공모전 도전",
            titleEn: "04. Competitions",
            headline: "공모전을 통해 작품을 세상에 선보입니다.",
            headlineEn: "Show your work to the world through competitions.",
            desc: "국내외 청소년 미술·디자인 공모전에 도전하며 주제 설정부터 완성, 제출까지의 경험을 쌓습니다.",
            descEn:
              "Take on youth art and design competitions in Korea and abroad, gaining experience from choosing a subject to completing and submitting.",
            keywords: "공모전 · 주제 설정 · 작품 제출",
            keywordsEn: "Competitions · Subject Setting · Submission",
          },
          {
            title: "05. Workbook 기초",
            titleEn: "05. Workbook Basics",
            headline: "생각을 기록하는 습관을 만듭니다.",
            headlineEn: "Build the habit of recording your thinking.",
            desc: "아이디어, 리서치, 스케치를 Workbook에 정리하며 포트폴리오 준비의 기초를 다집니다.",
            descEn:
              "Organize ideas, research, and sketches in a workbook to lay the groundwork for portfolio preparation.",
            keywords: "아이디어 · 리서치 · 스케치",
            keywordsEn: "Ideas · Research · Sketches",
          },
          {
            title: "06. 진로·전공 탐색",
            titleEn: "06. Major & Career Exploration",
            headline: "나에게 맞는 전공과 대학을 알아봅니다.",
            headlineEn: "Learn about majors and universities that suit you.",
            desc: "상담과 작업 경험을 바탕으로 관심 전공과 대학 방향을 함께 탐색합니다.",
            descEn:
              "Based on consultations and your work experience, we explore your interests in majors and universities together.",
            keywords: "전공 탐색 · 대학 정보 · 진로 상담",
            keywordsEn: "Majors · University Info · Guidance",
          },
        ],
      },
    ],
  },
  {
    slug: "transfer",
    tag: "Transfer",
    title: "편입학",
    titleEn: "Transfer",
    lead: "이미 가지고 있는 작업을 새로운 방향으로 발전시키는 과정입니다.",
    leadEn: "A process that develops work you already have in a new direction.",
    heroTag: "Transfer",
    heroTitle: "지금까지의 작업을, 새로운 가능성으로",
    heroDesc:
      "기존의 작업과 경험을 분석하고 목표하는 전공에 맞춰 새로운 방향의 포트폴리오를 구축합니다.",
    heroDescEn:
      "We analyze your existing work and experience, then build a portfolio in a new direction tailored to your target major.",
    introTitle: "지금까지의 경험을 새로운 방향으로",
    introDesc:
      "편입학 과정은 학생이 이미 가지고 있는 작업 경험을 바탕으로 강점과 가능성을 발견하고, 새로운 방향의 포트폴리오를 만들어가는 과정입니다.",
    methodTriad: ["ANALYZE", "DEVELOP", "REDEFINE"],
    methodHeadline: "분석하고, 발전시키고, 다시 정의합니다.",
    methodDesc:
      "기존 작업을 객관적으로 분석하고 새로운 주제와 표현 방식을 탐구하며 포트폴리오를 발전시킵니다.",
    flowSteps: [
      {
        en: "ANALYZE",
        ko: "분석하다",
        desc: "기존 작업과 강점 분석",
        descEn: "Analyze your existing work and strengths.",
      },
      {
        en: "DIRECTION",
        ko: "설정하다",
        desc: "지원 전공과 작업 방향 설정",
        descEn: "Set a direction based on your target major.",
      },
      {
        en: "DEVELOP",
        ko: "발전하다",
        desc: "새로운 작업 및 포트폴리오 발전",
        descEn: "Develop new work and the portfolio.",
      },
      {
        en: "PORTFOLIO",
        ko: "구성하다",
        desc: "지원 목적에 맞는 최종 구성",
        descEn: "Compose a final portfolio suited to your goal.",
      },
    ],
    flowCenterLabel: "새로운\n가능성",
    flowCenterLabelEn: "New\nPossibilities",
    note: "지금까지의 경험을 다음 단계의 작품 세계로 발전시킵니다.",
    classItems: [
      {
        title: "01. Portfolio Analysis",
        headline: "기존 작업을 객관적으로 분석합니다.",
        headlineEn: "Objectively analyzes your existing work.",
        desc: "지금까지의 작업을 살펴보며 강점과 개선이 필요한 지점을 함께 진단합니다.",
        descEn:
          "We review your work so far and diagnose its strengths and areas that need improvement together.",
        keywords: "작업 분석 · 강점 진단 · 개선 방향",
        keywordsEn: "Work Analysis · Strength Diagnosis · Direction",
      },
      {
        title: "02. Direction",
        headline: "지원 전공과 목표에 맞는 방향을 설정합니다.",
        headlineEn: "Sets a direction that fits your target major and goals.",
        desc: "희망하는 학교와 전공의 특성을 파악하고, 그에 맞는 새로운 작업 방향을 함께 설계합니다.",
        descEn:
          "We identify the characteristics of your target school and major, and design a new direction for your work to match.",
        keywords: "전공 분석 · 방향 설정 · 목표 수립",
        keywordsEn: "Major Analysis · Direction · Goal Setting",
      },
      {
        title: "03. Portfolio Development",
        headline: "새로운 방향으로 작업을 발전시킵니다.",
        headlineEn: "Develops your work in the new direction.",
        desc: "설정한 방향을 바탕으로 작업을 심화하고, 완성도 높은 포트폴리오로 구성합니다.",
        descEn:
          "Based on the chosen direction, work is deepened and composed into a polished portfolio.",
        keywords: "심화 작업 · 완성도 · 포트폴리오",
        keywordsEn: "Deepened Work · Polish · Portfolio",
      },
    ],
    classNote:
      "기존 작업의 강점은 살리고, 부족한 지점은 새롭게 채워갑니다. 지원 전공에 맞는 방향으로 작업 전체를 다시 구성합니다.",
    classNoteEn:
      "We keep the strengths of your existing work and fill in what's missing, rebuilding the whole body of work in a direction suited to your target major.",
    workbookHeadline: "생각의 과정까지 작품이 됩니다.",
    workbookHeadlineEn: "Even the process of thinking becomes the work.",
    workbookSteps: [
      { title: "IDEA", desc: "관심과 경험에서 떠오른 첫 생각", descEn: "The first idea sparked by interest and experience" },
      { title: "RESEARCH", desc: "자료와 사례를 조사하며 주제를 구체화", descEn: "Researching references and cases to sharpen the subject" },
      { title: "SKETCH", desc: "떠오른 이미지를 빠르게 스케치로 옮김", descEn: "Quickly sketching out the image that comes to mind" },
      { title: "EXPERIMENT", desc: "다양한 재료와 방식으로 표현을 실험", descEn: "Experimenting with expression using various materials and methods" },
      { title: "ARTWORK", desc: "실험을 바탕으로 완성작을 제작", descEn: "Producing a finished piece based on the experiments" },
      { title: "WORKBOOK", desc: "생각과 과정을 기록하고 체계화", descEn: "Recording and organizing the thinking and process" },
      { title: "PORTFOLIO", desc: "작업 전체를 하나의 포트폴리오로 완성", descEn: "Completing the whole body of work as one portfolio" },
    ],
    resultHeadline: "지금까지의 경험을\n다음 단계의 작품 세계로 발전시킵니다.",
    resultHeadlineEn:
      "We develop the experience you've built\ninto your next world of work.",
    resultDesc:
      "올댓아트는 학생이 쌓아온 경험이 새로운 가능성으로 이어지도록 함께합니다.",
    resultDescEn:
      "All That Art works alongside each student so the experience they've built leads to new possibilities.",
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
        nameEn: "Transfer",
        tag: "Transfer",
        tagline: "이미 가지고 있는 작업을 새로운 방향으로 발전시키는 과정",
        taglineEn: "A process that develops work you already have in a new direction",
        philosophy:
          "기존의 작업과 경험을 분석하고 목표하는 전공에 맞춰 새로운 방향의 포트폴리오를 구축합니다.",
        philosophyEn:
          "We analyze your existing work and experience, then build a portfolio in a new direction tailored to your target major.",
        activitiesTitle: "편입학 과정에서 하는 것들",
        activitiesTitleEn: "What You Do in Transfer",
        activities: [
          {
            title: "01. 포트폴리오 분석",
            titleEn: "01. Portfolio Analysis",
            headline: "기존 작업을 객관적으로 분석합니다.",
            headlineEn: "Objectively analyze your existing work.",
            desc: "지금까지의 작업을 살펴보며 강점과 개선이 필요한 지점을 함께 진단합니다.",
            descEn:
              "We review your work so far and diagnose its strengths and areas that need improvement together.",
            keywords: "작업 분석 · 강점 진단 · 개선 방향",
            keywordsEn: "Work Analysis · Strengths · Improvements",
          },
          {
            title: "02. 지원 학교·전공 분석",
            titleEn: "02. School & Major Analysis",
            headline: "희망하는 학교와 전공의 특성을 파악합니다.",
            headlineEn: "Understand your target schools and majors.",
            desc: "지원하려는 학교와 전공이 요구하는 포트폴리오의 방향과 특징을 살펴봅니다.",
            descEn:
              "We look at the portfolio direction and traits your target schools and majors expect.",
            keywords: "전공 분석 · 학교 분석 · 요구 사항",
            keywordsEn: "Major · School · Requirements",
          },
          {
            title: "03. 작업 방향 설정",
            titleEn: "03. Setting Direction",
            headline: "목표에 맞는 새로운 작업 방향을 정합니다.",
            headlineEn: "Choose a new direction that fits your goal.",
            desc: "분석 결과를 바탕으로 강점은 살리고 보완할 점을 채울 작업 계획을 세웁니다.",
            descEn:
              "Based on the analysis, we keep your strengths and plan work to fill the gaps.",
            keywords: "방향 설정 · 목표 수립 · 작업 계획",
            keywordsEn: "Direction · Goals · Work Plan",
          },
          {
            title: "04. 심화 작업",
            titleEn: "04. Deepening the Work",
            headline: "새로운 방향으로 작업을 깊이 있게 발전시킵니다.",
            headlineEn: "Develop your work in depth in the new direction.",
            desc: "설정한 방향을 바탕으로 작업을 심화하고 완성도를 높여갑니다.",
            descEn:
              "Based on the chosen direction, deepen your work and raise its polish.",
            keywords: "심화 작업 · 완성도",
            keywordsEn: "Deepened Work · Polish",
          },
          {
            title: "05. Workbook 정리",
            titleEn: "05. Workbook",
            headline: "작업의 생각과 과정을 기록합니다.",
            headlineEn: "Record the thinking and process behind your work.",
            desc: "아이디어와 리서치, 실험 과정을 Workbook에 정리해 작업의 깊이를 보여줍니다.",
            descEn:
              "Organize ideas, research, and experiments in a workbook that shows the depth of your work.",
            keywords: "과정 기록 · 리서치 · Workbook",
            keywordsEn: "Process · Research · Workbook",
          },
          {
            title: "06. 포트폴리오 구성",
            titleEn: "06. Composing the Portfolio",
            headline: "지원 목적에 맞게 최종 포트폴리오를 구성합니다.",
            headlineEn: "Compose a final portfolio suited to your application.",
            desc: "완성된 작업을 정리해 지원 전공에 맞는 하나의 포트폴리오로 구성합니다.",
            descEn:
              "Organize your finished work into a single portfolio suited to your target major.",
            keywords: "최종 구성 · 포트폴리오",
            keywordsEn: "Final Composition · Portfolio",
          },
        ],
        process: [
          {
            step: "01",
            title: "Current Portfolio 분석",
            titleEn: "Current Portfolio Analysis",
            desc: "기존 작업의 방향과 완성도 진단",
            descEn: "Diagnosing the direction and polish of existing work",
          },
          {
            step: "02",
            title: "Strength & Weakness 분석",
            titleEn: "Strength & Weakness Analysis",
            desc: "강점과 보완점 도출",
            descEn: "Identifying strengths and areas to improve",
          },
          {
            step: "03",
            title: "Direction Setting",
            desc: "새로운 작업 방향 설정",
            descEn: "Setting a new direction for the work",
          },
          {
            step: "04",
            title: "Portfolio Development",
            desc: "심화 작업 및 포트폴리오 완성",
            descEn: "Deepening the work and completing the portfolio",
          },
        ],
      },
    ],
  },
  {
    slug: "graduate",
    tag: "Graduate",
    title: "대학원",
    titleEn: "Graduate",
    lead: "작품을 넘어 자신의 연구 주제를 구축하는 과정입니다.",
    leadEn: "A process of building your own research topic beyond the artwork itself.",
    heroTag: "Graduate",
    heroTitle: "질문을 연구로, 연구를 작품으로",
    heroDesc:
      "자신의 관심과 문제의식에서 출발하여 연구와 실험을 진행하고, 이를 자신만의 작품 세계로 발전시킵니다.",
    heroDescEn:
      "Starting from your own interests and questions, you carry out research and experimentation, developing it into a world of work that's your own.",
    introTitle: "질문에서 작품으로",
    introDesc:
      "대학원 과정은 단순한 작품 제작을 넘어 자신이 무엇을 탐구하고 표현하고자 하는지 깊이 있게 고민하며 이를 연구와 작품으로 발전시키는 과정입니다.",
    methodTriad: ["RESEARCH", "EXPERIMENT", "CREATE"],
    methodHeadline: "연구하고, 실험하고, 표현합니다.",
    methodDesc:
      "자신만의 질문을 발견하고 이론과 다양한 매체를 탐구하며 연구 결과를 작품과 포트폴리오로 발전시킵니다.",
    flowSteps: [
      {
        en: "QUESTION",
        ko: "질문하다",
        desc: "나만의 문제의식과 질문 발견",
        descEn: "Discover your own questions and problem awareness.",
      },
      {
        en: "RESEARCH",
        ko: "연구하다",
        desc: "이론과 자료를 통한 주제 탐구",
        descEn: "Explore your subject through theory and research.",
      },
      {
        en: "EXPERIMENT",
        ko: "실험하다",
        desc: "다양한 매체와 방법론 실험",
        descEn: "Experiment with various media and methodologies.",
      },
      {
        en: "CREATE",
        ko: "만들다",
        desc: "연구를 작품과 포트폴리오로 발전",
        descEn: "Develop your research into work and a portfolio.",
      },
    ],
    flowCenterLabel: "나만의\n연구와 작품",
    flowCenterLabelEn: "Your Own\nResearch & Work",
    note: "자신만의 질문을 발견하고, 그것을 작품으로 만들어갑니다.",
    classItems: [
      {
        title: "01. Research",
        headline: "개인의 관심과 문제의식을 연구 주제로 발전시킵니다.",
        headlineEn: "Develops personal interests and questions into a research topic.",
        desc: "자신이 무엇에 질문을 갖고 있는지 탐색하고, 이를 구체적인 연구 주제로 발전시킵니다.",
        descEn:
          "We explore what questions you hold and develop them into a concrete research topic.",
        keywords: "질문 발견 · 주제 설정 · 문제의식",
        keywordsEn: "Finding Questions · Topic Setting · Problem Awareness",
      },
      {
        title: "02. Experiment",
        headline: "다양한 매체와 방법론을 통해 연구를 실험합니다.",
        headlineEn: "Experiments with research through various media and methods.",
        desc: "이론과 자료 조사를 바탕으로, 다양한 매체와 표현 방식을 통해 연구를 시각적으로 실험합니다.",
        descEn:
          "Based on theory and research, we visually experiment with your research through various media and modes of expression.",
        keywords: "이론 탐구 · 매체 실험 · 방법론",
        keywordsEn: "Theory · Media Experiments · Methodology",
      },
      {
        title: "03. Production",
        headline: "연구 결과를 작품과 포트폴리오로 발전시킵니다.",
        headlineEn: "Develops research results into work and a portfolio.",
        desc: "실험 과정을 통해 얻은 결과를 완성도 높은 작품과 포트폴리오로 구현합니다.",
        descEn:
          "Results from the experimentation process are realized as polished work and a portfolio.",
        keywords: "작품 제작 · 연구 정리 · 포트폴리오",
        keywordsEn: "Artwork · Research Summary · Portfolio",
      },
    ],
    classNote:
      "이론적 탐구와 실험을 반복하며, 자신만의 연구가 곧 작품이 되는 과정을 만들어갑니다.",
    classNoteEn:
      "Through repeated theoretical exploration and experimentation, we build a process where your own research becomes the work itself.",
    workbookHeadline: "생각의 과정까지 작품이 됩니다.",
    workbookHeadlineEn: "Even the process of thinking becomes the work.",
    workbookSteps: [
      { title: "IDEA", desc: "관심과 경험에서 떠오른 첫 생각", descEn: "The first idea sparked by interest and experience" },
      { title: "RESEARCH", desc: "자료와 사례를 조사하며 주제를 구체화", descEn: "Researching references and cases to sharpen the subject" },
      { title: "SKETCH", desc: "떠오른 이미지를 빠르게 스케치로 옮김", descEn: "Quickly sketching out the image that comes to mind" },
      { title: "EXPERIMENT", desc: "다양한 재료와 방식으로 표현을 실험", descEn: "Experimenting with expression using various materials and methods" },
      { title: "ARTWORK", desc: "실험을 바탕으로 완성작을 제작", descEn: "Producing a finished piece based on the experiments" },
      { title: "WORKBOOK", desc: "생각과 과정을 기록하고 체계화", descEn: "Recording and organizing the thinking and process" },
      { title: "PORTFOLIO", desc: "작업 전체를 하나의 포트폴리오로 완성", descEn: "Completing the whole body of work as one portfolio" },
    ],
    resultHeadline: "자신만의 질문을 발견하고,\n그것을 작품으로 만들어갑니다.",
    resultHeadlineEn:
      "Discover your own questions,\nand turn them into your work.",
    resultDesc:
      "올댓아트는 학생의 연구와 사유가 하나의 작품 세계로 완성되도록 함께합니다.",
    resultDescEn:
      "All That Art works alongside each student so their research and thinking come together into a complete world of work.",
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
        nameEn: "Graduate",
        tag: "Graduate",
        tagline: "작품을 넘어 자신의 연구 주제를 구축합니다.",
        taglineEn: "Building your own research topic beyond the artwork itself.",
        philosophy:
          "자신의 관심과 문제의식에서 출발하여 연구와 실험을 진행하고, 이를 자신만의 작품 세계로 발전시킵니다.",
        philosophyEn:
          "Starting from your own interests and questions, you carry out research and experimentation, developing it into a world of work that's your own.",
        activitiesTitle: "대학원 과정에서 하는 것들",
        activitiesTitleEn: "What You Do in Graduate",
        activities: [
          {
            title: "01. 연구 주제 탐색",
            titleEn: "01. Finding a Research Topic",
            headline: "개인의 관심과 문제의식을 연구 주제로 발전시킵니다.",
            headlineEn: "Develop personal interests and questions into a research topic.",
            desc: "자신이 무엇에 질문을 갖고 있는지 탐색하고, 이를 구체적인 연구 주제로 발전시킵니다.",
            descEn:
              "We explore what questions you hold and develop them into a concrete research topic.",
            keywords: "질문 발견 · 주제 설정 · 문제의식",
            keywordsEn: "Questions · Topic · Problem Awareness",
          },
          {
            title: "02. 이론 연구",
            titleEn: "02. Theoretical Research",
            headline: "이론과 자료로 연구의 바탕을 세웁니다.",
            headlineEn: "Build the foundation of your research from theory and sources.",
            desc: "관련 이론과 작가, 사례를 조사해 연구의 체계를 만들어갑니다.",
            descEn:
              "Research related theory, artists, and cases to build the framework of your research.",
            keywords: "이론 탐구 · 자료 조사 · 사례 연구",
            keywordsEn: "Theory · Research · Case Studies",
          },
          {
            title: "03. 매체 실험",
            titleEn: "03. Media Experiments",
            headline: "다양한 매체와 방법론으로 연구를 실험합니다.",
            headlineEn: "Experiment with your research through various media and methods.",
            desc: "이론과 자료 조사를 바탕으로 다양한 매체와 표현 방식을 통해 연구를 시각적으로 실험합니다.",
            descEn:
              "Based on theory and research, visually experiment with your research through various media and modes of expression.",
            keywords: "매체 실험 · 방법론 · 시각화",
            keywordsEn: "Media · Methodology · Visualization",
          },
          {
            title: "04. 작품 제작",
            titleEn: "04. Making Artwork",
            headline: "연구 결과를 작품으로 발전시킵니다.",
            headlineEn: "Develop research results into artwork.",
            desc: "실험 과정에서 얻은 결과를 완성도 높은 작품으로 구현합니다.",
            descEn:
              "Realize the results of experimentation as polished artwork.",
            keywords: "작품 제작 · 연구 정리",
            keywordsEn: "Artwork · Research Summary",
          },
          {
            title: "05. 연구 노트 · Workbook",
            titleEn: "05. Research Notes & Workbook",
            headline: "연구와 사유의 과정을 기록합니다.",
            headlineEn: "Record the process of your research and thinking.",
            desc: "질문, 자료, 실험 과정을 기록하고 체계화해 연구의 흐름을 보여줍니다.",
            descEn:
              "Record and organize questions, sources, and experiments to show the flow of your research.",
            keywords: "과정 기록 · 체계화 · Workbook",
            keywordsEn: "Process · Organization · Workbook",
          },
          {
            title: "06. 발표와 포트폴리오",
            titleEn: "06. Presentation & Portfolio",
            headline: "연구와 작품을 하나로 통합해 전달합니다.",
            headlineEn: "Present your research and work as one integrated whole.",
            desc: "연구 결과와 작품을 하나의 포트폴리오로 구성하고 전달하는 방법을 준비합니다.",
            descEn:
              "Compose your research results and work into one portfolio and prepare how to present it.",
            keywords: "발표 · 통합 · 포트폴리오",
            keywordsEn: "Presentation · Integration · Portfolio",
          },
        ],
        process: [
          { step: "01", title: "Research", desc: "연구 주제 탐색", descEn: "Exploring the research topic" },
          { step: "02", title: "Theory", desc: "이론적 체계 구축", descEn: "Building a theoretical framework" },
          { step: "03", title: "Experiment", desc: "매체와 방법론 실험", descEn: "Experimenting with media and methodology" },
          { step: "04", title: "Production", desc: "작품 제작", descEn: "Producing the work" },
          {
            step: "05",
            title: "Presentation",
            desc: "연구와 작품의 통합적 전달",
            descEn: "Presenting the research and work as an integrated whole",
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
