// 사진 설명(alt) 목록 — 검색 최적화(SEO)와 접근성을 위한 문구입니다.
//
// 사용법:
// - 왼쪽은 사진 파일 이름(public/images 기준), 오른쪽은 ["한국어 설명", "영어 설명"] 입니다.
// - 문구를 고치고 저장하면 사이트에 바로 반영됩니다.
// - 새 사진을 추가했다면 같은 형식으로 한 줄을 추가하세요.
//   (원본 사진 "-full" 파일은 따로 적지 않아도 같은 설명을 씁니다.)
// - 사진에 실제로 보이는 모습을 한 문장으로 적는 게 좋아요. "사진", "이미지" 같은 말은 빼세요.
//
// 목록에 없는 사진은 컴포넌트에 적힌 기본 문구를 씁니다.
const ALTS: Record<string, [string, string]> = {
  // ===== 홈 상단 슬라이더 =====
  "hero-1.jpg": ["붉은 조명이 켜진 해골 형상의 검은 세라믹 조형 작품", "Black skull-shaped sculpture lit with red light"],
  "hero-2.jpg": ["올댓아트 유학미술 학원 건물 외관과 간판", "Exterior and signage of the All That Art study-abroad art academy"],
  "hero-3.jpg": ["경사진 지형 위의 건물을 표현한 흰색 건축 모형", "White architectural model of a building on sloped terrain"],
  "hero-4.jpg": ["올댓아트 안내 데스크와 상담 공간", "Reception desk and consultation area at All That Art"],
  "hero-5.jpg": ["올댓아트에서 학생들이 함께 작업하는 수업 모습", "Students working together in a class at All That Art"],

  // ===== 공지 팝업 =====
  "popup1.jpg": ["2026 코리아 영아트페스티벌 대상 수상 학생 작품", "Grand Prize winning student work at the 2026 Korea Young Art Festival"],
  "popup2.jpg": ["2026 코리아 영아트페스티벌 특선 수상 학생 작품", "Special Selection student work at the 2026 Korea Young Art Festival"],
  "popup3.jpg": ["2026 제6회 IYAC 글로벌 청소년 미술 대회 동메달 수상 학생 작품", "Bronze Medal student work at the 6th IYAC Global Youth Art Competition 2026"],
  "popup4.jpg": ["2026 제6회 IYAC 글로벌 청소년 미술 대회 동메달 수상 학생 작품", "Bronze Medal student work at the 6th IYAC Global Youth Art Competition 2026"],
  "popup5.jpg": ["2026 제6회 IYAC 글로벌 청소년 미술 대회 은메달 수상 학생 작품", "Silver Medal student work at the 6th IYAC Global Youth Art Competition 2026"],

  // ===== 홈·소개: 올댓아트 학원 사진 =====
  "about-preview_01.jpg": ["나무 천장과 큰 창이 있는 올댓아트 작업실", "Studio with a wood ceiling and large windows at All That Art"],
  "about-preview_02.jpg": ["작업대와 재료가 가득한 올댓아트 실습 공간", "Workshop space filled with work tables and materials"],
  "about-preview_03.jpg": ["붉은 벽면이 인상적인 올댓아트 안내 데스크", "Reception desk with a red wall at All That Art"],
  "about-preview_04.jpg": ["소파와 화분이 놓인 올댓아트 상담 라운지", "Consultation lounge with a sofa and plants"],
  "about-preview_05.jpg": ["올댓아트 유학미술 건물 외벽의 간판과 전공 그래픽", "Building signage and subject graphics of All That Art"],
  "about-preview_06.jpg": ["밤에 불이 켜진 올댓아트 유학미술 간판", "All That Art signage lit up at night"],
  "about-preview_07.jpg": ["테이블과 안내 데스크가 있는 올댓아트 입구 공간", "Entrance area with a table and front desk"],
  "about-preview_08.jpg": ["벽면 가득 전시된 학생 서예·드로잉 작품", "Student calligraphy and drawing works displayed across a wall"],
  "about-preview_09.jpg": ["마네킹과 천으로 패션 작업을 하는 학생의 손", "Hands working on fashion draping with a mannequin"],
  "about-preview_10.jpg": ["큰 작업 테이블과 재봉틀이 있는 올댓아트 작업실", "Work room with large tables and sewing machines"],
  "about-preview_11.jpg": ["재료 선반과 판화 프레스가 있는 올댓아트 작업 공간", "Workspace with material shelves and a printing press"],
  "about-preview_12.jpg": ["촬영 조명과 작업대가 있는 올댓아트 대형 작업실", "Large studio with photo lighting and work tables"],
  "about-preview_13.jpg": ["조명과 배경지로 작품을 촬영하는 올댓아트 촬영 공간", "Photo corner shooting artwork with lights and a backdrop"],
  "about-preview_14.jpg": ["학생들이 모여 함께 작업하는 올댓아트 수업", "Students gathered to work together in an All That Art class"],
  "about-preview_15.jpg": ["삼각대와 카메라 앞에서 작업하는 학생 (흑백)", "Student working in front of a camera tripod (black and white)"],
  "about-preview_16.jpg": ["밤에 본 올댓아트 학원 입구", "Entrance of the All That Art academy at night"],

  // ===== 소개: 학생 작품 슬라이드 =====
  "student-artwork-01.jpg": ["운동화 끈을 펼쳐 구성한 광고 스타일 포스터 작품", "Advertising-style poster built from spread-out shoelaces"],
  "student-artwork-02.jpg": ["물방울이 맺힌 CD와 음악 플레이어를 담은 'VARIETY' 포스터 디자인", "'VARIETY' poster design featuring water-beaded discs and a music player"],
  "student-artwork-03.jpg": ["베네치아 운하와 곤돌라를 그린 풍경화", "Landscape painting of a Venetian canal with a gondola"],
  "student-artwork-04.jpg": ["빛과 그림자로 눈 모양을 만든 설치 작품", "Installation using light and shadow to form an eye"],
  "student-artwork-05.jpg": ["글씨를 새긴 모자를 쓴 인물 사진 — 패션 소품 작품", "Portrait of a model in a calligraphy-patterned hat — fashion accessory work"],
  "student-artwork-06.jpg": ["강렬한 색으로 얼굴을 표현한 혼합 매체 회화", "Mixed-media painting of a face in vivid colors"],
  "student-artwork-07.jpg": ["고대 흉상이 놓인 가죽 의자를 콜라주한 디지털 작품", "Digital collage of a leather chair holding an antique bust"],
  "student-artwork-08.jpg": ["동물 골격 드로잉과 메모를 결합한 워크북 작품", "Workbook page combining an animal skeleton drawing with notes"],
  "student-artwork-09.jpg": ["사다리를 오르는 사람과 풍선이 있는 알록달록한 건물 회화", "Colorful painting of a building with a climbing figure, a ladder, and a balloon"],
  "student-artwork-10.jpg": ["식탁과 의자가 있는 주방을 그린 연필 드로잉", "Pencil drawing of a kitchen with a dining table and chairs"],
  "student-artwork-11.jpg": ["높은 빌딩이 서 있는 도시 거리를 그린 색연필 드로잉", "Colored-pencil drawing of a city street with a tall building"],
  "student-artwork-12.jpg": ["붉은 가죽 조각을 이어 만든 입체 조형 작품", "Sculpture assembled from pieces of red leather"],
  "student-artwork-13.jpg": ["나무 벽으로 둘러싸인 사우나 내부를 그린 색연핅드로잉", "Painting of a wood-paneled sauna interior"],
  "student-artwork-14.jpg": ["화분과 식물이 가득한 정원을 그린 수채화와 펜드로잉", "Watercolor of a garden full of potted plants"],
  "student-artwork-15.jpg": ["여러 색과 선으로 얼굴을 해체해 표현한 추상 회화", "Abstract painting of a fragmented face in layered colors"],
  "student-artwork-16.jpg": ["천과 붉은 끈으로 다리를 묶은 모습을 연출한 사진 작품", "Photographic work staging legs bound with fabric and red cord"],
  "student-artwork-17.jpg": ["작은 조명과 오브제로 꾸민 어두운 무대 설치 작품", "Dimly lit stage installation of small objects and string lights"],
  "student-artwork-18.jpg": ["촛불과 바이올린을 그린 정물화", "Still life painting of a candle and a violin"],
  "student-artwork-19.jpg": ["인물 실루엣을 반짝이는 조각들로 채운 작품", "Human silhouette filled with glittering fragments"],
  "student-artwork-20.jpg": ["바다 속 물고기와 작은 배를 그린 수채 일러스트", "Watercolor illustration of fish beneath a small sailboat"],
  "student-artwork-21.jpg": ["전봇대와 전선이 있는 골목 풍경을 그린 연필 드로잉", "Pencil drawing of an alley with a utility pole and wires"],
  "student-artwork-22.jpg": ["눈을 감은 얼굴 위로 검은 물방울이 떨어지는 혼합 매체 작품", "Mixed-media work of a closed-eyed face with black droplets"],
  "student-artwork-23.jpg": ["거친 붓 자국으로 그린 인물 상반신 추상 회화", "Expressive abstract painting of a bust figure"],
  "student-artwork-24.jpg": ["산수화 위에 빛나는 캡슐 오브제를 놓은 설치 작품", "Installation of a glowing capsule over a mountain landscape drawing"],
  "student-artwork-25.jpg": ["창밖의 노을과 책상을 주황빛으로 그린 회화", "Orange-toned painting of a sunset seen through a window"],
  "student-artwork-26.jpg": ["신문 조각을 붙여 두 얼굴을 겹쳐 표현한 콜라주 회화", "Collage painting overlaying two faces with newspaper scraps"],
  "student-artwork-27.jpg": ["생선 모양 안에 음식을 그려 넣은 세 점 연작", "Three-part series of fish shapes filled with food"],
  "student-artwork-28.jpg": ["색실로 물방울 형상을 표현한 섬유 작품", "Fiber artwork of a droplet shape made with colored thread"],
  "student-artwork-29.jpg": ["나무껍질과 뿌리로 만든 코트 형태의 조형 작품", "Coat-shaped sculpture made of bark and roots"],
  "student-artwork-30.jpg": ["거울 조각 위에 놓인 무늬 장식 하이힐 한 켤레", "Pair of patterned high-heeled shoes on mirror fragments"],
  "student-artwork-31.jpg": ["청바지 패치워크와 손 드로잉을 결합한 청색 작품", "Blue patchwork denim piece combined with hand drawings"],
  "student-artwork-32.jpg": ["빛나는 구슬을 든 인물이 있는 작은 전시 공간 설치 작품", "Installation of a figure holding glowing orbs in a small display space"],
  "student-artwork-33.jpg": ["건축 드로잉과 콜라주로 구성한 주황색 도시 작품", "Orange city composition mixing architectural drawing and collage"],
  "student-artwork-34.jpg": ["청재킷 아래로 손 모양 조각이 매달린 설치 작품", "Installation of a denim jacket with hand casts hanging below"],
  "student-artwork-35.jpg": ["거울 조각으로 덮은 인물 흉상 조각", "Bust sculpture covered with mirror fragments"],
  "student-artwork-36.jpg": ["계단 위로 흘러내리는 천 작품과 인물을 연출한 사진", "Photo of fabric flowing down a staircase with a figure holding a light"],
  "student-artwork-37.jpg": ["장식 모자로 눈을 가린 인물 사진", "Portrait of a person with an ornate hat covering the eyes"],
  "student-artwork-38.jpg": ["장식 모자를 쓰고 앉은 인물 사진", "Portrait of a seated person in an ornate hat"],
  "student-artwork-39.jpg": ["쇼핑 카트에 캐릭터를 가득 담은 일러스트", "Illustration of a shopping cart packed with characters"],
  "student-artwork-40.jpg": ["여러 전구가 매달린 조명 설치 사진", "Photo of a lighting installation with hanging bulbs"],
  "student-artwork-41.jpg": ["빛나는 창문 모형에서 조명이 쏟아져 내리는 설치 작품", "Installation of glowing windows with lights cascading down"],
  "student-artwork-42.jpg": ["분홍 치마를 입은 인물의 뒷모습을 그린 인체 드로잉", "Figure drawing of a person in a pink skirt seen from behind"],
  "student-artwork-43.jpg": ["연필로 그린 인체 드로잉", "Pencil figure drawing"],
  "student-artwork-44.jpg": ["연필로 그린 인물 뒷모습 인체 드로잉", "Pencil figure drawing seen from behind"],

  // ===== 커리큘럼: 무엇을 배우는가 (과목별 사진) =====
  "subjects/drawing-1.jpg": ["야자수와 도로가 있는 거리 풍경을 그린 연필 드로잉", "Pencil drawing of a street with palm trees"],
  "subjects/drawing-2.jpg": ["파프리카와 과일을 세밀하게 그린 정물 펜드로잉", "Detailed still life drawing of peppers and fruit"],
  "subjects/drawing-3.jpg": ["골목과 자동차를 그린 색연필 드로잉", "Colored-pencil drawing of an alley and a car"],
  "subjects/painting-1.jpg": ["병에 꽂힌 노란 장미를 그린 정물화", "Still life painting of a yellow rose in a bottle"],
  "subjects/painting-2.jpg": ["창가 식당의 저녁 풍경을 그린 회화", "Painting of a window-side restaurant at dusk"],
  "subjects/painting-3.jpg": ["아치형 창문이 있는 건물 내부를 그린 회화", "Painting of a building interior with an arched window"],
  "subjects/light-art-1.jpg": ["푸른 조명 아래 원형 오브제를 세운 빛 설치 작품", "Blue light installation of standing circular objects"],
  "subjects/light-art-2.jpg": ["커튼 뒤의 인물을 빛으로 연출한 작품", "Light work staging a figure behind a curtain"],
  "subjects/light-art-3.jpg": ["실루엣이 비치는 종이 등을 매단 빛 설치 작품", "Hanging paper lanterns with projected silhouettes"],
  "subjects/illustration-1.jpg": ["물고기와 나비를 빽빽하게 그린 일러스트", "Dense illustration of fish and butterflies"],
  "subjects/illustration-2.jpg": ["문신이 있는 상체를 그린 수채 일러스트", "Watercolor illustration of a torso with a tattoo"],
  "subjects/illustration-3.jpg": ["'GLOOMY DAY' 스토리보드 일러스트", "'Gloomy Day' storyboard illustration"],
  "subjects/sculpture-1.jpg": ["도자 꽃잎으로 장식한 인물 두상 조각", "Ceramic flower-crowned head sculpture"],
  "subjects/sculpture-2.jpg": ["빛이 새어 나오는 검은 조각 작품", "Black sculpture with light shining through"],
  "subjects/sculpture-3.jpg": ["유리병 속에 담긴 기괴한 생물 조형 작품", "Creature sculpture preserved in a glass jar"],
  "subjects/installation-1.jpg": ["유리 공간에 매달린 오브제에 손을 뻗는 인물 설치 작품", "Installation of a figure reaching for a hanging object in a glass room"],
  "subjects/installation-2.jpg": ["글자와 나무 그림이 빛나는 조명 기둥 설치 작품", "Illuminated pillars with text and tree illustrations"],
  "subjects/installation-3.jpg": ["포스트잇으로 만든 화살표 설치 작품", "Arrow installation made of sticky notes"],
  "subjects/animation-1.jpg": ["버섯 모양 집이 있는 풍경 콘셉트 스케치", "Concept sketch of a landscape with a mushroom house"],
  "subjects/animation-2.jpg": ["숲속 캐릭터를 그린 애니메이션 컬러 일러스트", "Colorful animation illustration of forest characters"],
  "subjects/animation-3.jpg": ["로봇 소년 캐릭터 입체 조형", "Sculpted robot boy character"],
  "subjects/croquis-1.jpg": ["누워 있는 인체를 목탄으로 그린 크로키", "Charcoal croquis of a reclining figure"],
  "subjects/croquis-2.jpg": ["모자를 쓴 인물의 뒷모습을 그린 연필 크로키", "Pencil croquis of a figure in a hat seen from behind"],
  "subjects/croquis-3.jpg": ["붉은 색연필로 그린 앉은 인물 크로키", "Red-pencil croquis of a seated figure"],
  "subjects/architecture-1.jpg": ["철골 구조와 투명 튜브가 있는 건축 모형", "Architectural model with a steel frame and transparent tubes"],
  "subjects/architecture-2.jpg": ["주택 단지 건축 모형과 도면 패널", "Housing complex architectural model and drawing panel"],
  "subjects/architecture-3.jpg": ["도시 부지 위의 흰색 곡면 건축물 모형", "White curved building in an urban site model"],
  "subjects/graphic-1.jpg": ["영문 알파벳을 변형한 타이포그래피 작업", "Typography work reshaping the alphabet"],
  "subjects/graphic-2.jpg": ["로고 스케치와 브랜드 아이디어 보드", "Logo sketches and a brand idea board"],
  "subjects/graphic-3.jpg": ["열대우림 문제를 담은 인포그래픽 디자인", "Infographic design about rainforest destruction"],
  "subjects/product-1.jpg": ["원형 조명 안에 녹색 원들을 배치한 제품 디자인", "Product design of green discs inside a circular light"],
  "subjects/product-2.jpg": ["초록색 곡선 의자 모형", "Green curved chair model"],
  "subjects/product-3.jpg": ["빛 테두리가 번지는 원형 조명 시계제품디자인", "Circular light fixture with a glowing halo"],
  "subjects/transportation-1.jpg": ["자동차 스케치와 레퍼런스 보드", "Car sketches and reference board"],
  "subjects/transportation-2.jpg": ["주황색 컨버터블 자동차 렌더링", "Rendering of an orange convertible car"],
  "subjects/transportation-3.jpg": ["거울 조각을 붙인 자동차 모형", "Car model covered in mirror fragments"],
  "subjects/interior-1.jpg": ["층층이 쌓은 파란 종이 구조물 모형", "Stacked blue paper structure model"],
  "subjects/interior-2.jpg": ["신문지로 만든 아치와 입간판이 있는 공간 모형", "Spatial model with a newspaper arch and standing signs"],
  "subjects/interior-3.jpg": ["곡선 구조의 전시 공간 인테리어 모형", "Curved exhibition interior model"],
  "subjects/fashion-1.jpg": ["검은 새틴 꽃잎으로 장식한 드레스 디테일", "Dress detail decorated with black satin petals"],
  "subjects/fashion-2.jpg": ["고양이 형상을 구두와 결합한 패션 오브제", "Fashion object combining a cat figure with a shoe"],
  "subjects/fashion-3.jpg": ["푸른 무늬 의상을 그린 패션 디자인 일러스트", "Fashion design illustration of a blue patterned outfit"],
  "subjects/ap-ib-art-1.jpg": ["물 위에 떠 있는 문을 그린 수채 회화", "Watercolor painting of a door standing on water"],
  "subjects/ap-ib-art-2.jpg": ["체크무늬 바닥 위에 앉은 인물을 그린 연필 드로잉", "Pencil drawing of a seated figure on a checkered pattern"],
  "subjects/ap-ib-art-3.jpg": ["종이와 철사로 만든 얼굴 조형 작품", "Face sculpture made of paper and wire"],
  "subjects/competition-1.jpg": ["나무 줄기에 손이 얽혀 있는 입체 판화 작품", "Relief print and sculpture with hands emerging from a tree trunk"],
  "subjects/competition-2.jpg": ["국회의사당과 인물을 그린 사회 비평 드로잉", "Social commentary drawing of a capitol building and a figure"],
  "subjects/competition-3.jpg": ["2026 코리아 영아트페스티벌 대상 수상작", "Grand Prize work at the 2026 Korea Young Art Festival"],
};

// src 예: "/images/student-artwork-01.jpg", "/images/subjects/drawing-1-full.jpg"
// 목록에서 찾지 못하면 fallback을 그대로 돌려줍니다.
export function imageAlt(
  src: string,
  lang: "ko" | "en",
  fallback = ""
): string {
  const key = src
    .split("?")[0]
    .replace(/^\/?images\//, "")
    .replace(/-full(\.[a-z]+)$/i, "$1");
  const entry = ALTS[key];
  if (!entry) return fallback;
  return lang === "en" ? entry[1] : entry[0];
}
