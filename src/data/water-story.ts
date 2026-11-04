/**
 * 급배수 스토리 (/water). 랜딩이자 포트폴리오입니다.
 *
 * 두 문장짜리 문단은 문장 끝에서 줄을 바꿉니다(\n). 화면은 그 줄바꿈을
 * 그대로 그립니다(whitespace-pre-line). 문장 중간에서 끊기는 줄은 없습니다.
 * 카피·단계·현장 기록은 전부 이 파일에서 파생됩니다. 수정은 여기서만.
 *
 * 사진은 전부 아오보 기사들이 작업 중에 찍은 것입니다(public/images/water).
 * 연출 사진은 없고, 숫자는 사진으로 남은 현장만 셉니다.
 */

export interface Photo {
  src: string;
  alt: string;
  /** 사진의 가로세로 비. 그리드에서 자리를 잡는 데 씁니다. */
  ratio: "landscape" | "portrait" | "square";
}

const img = (name: string, alt: string, ratio: Photo["ratio"] = "landscape"): Photo => ({
  src: `/images/water/${name}.webp`,
  alt,
  ratio,
});

export const waterHero = {
  label: "Water Works",
  title: ["물이 나와야", "행사가 시작됩니다."],
  lead: "급수 인입부터 배수, 오 · 폐수 처리까지.\n2019년부터 행사장의 물을 맡아 온 아오보 급배수설비입니다.",
  /** 스크롤이 시작되면 사진 한가운데에 서는 문장. 줄마다 따로 도착합니다. */
  thesis: ["물탱크를 내려놓는 것과", "물이 흐르게 하는 것은 다릅니다."],
  thesisNote: "그 차이를 현장 사진으로 보여드립니다.",
  video: "/videos/water-hero.mp4",
  poster: img("hero-poster", "행사장 천막 옆 1톤 물탱크와 급수 호스, 스테인리스 싱크대"),
};

export interface Stat {
  value: number;
  unit?: string;
  label: string;
  note: string;
  /** 연도처럼 세지 않고 그대로 적는 숫자 */
  plain?: boolean;
}

/** 숫자는 사진으로 남은 현장만 셉니다. */
export const waterStats: { title: string; lead: string; items: Stat[] } = {
  title: "현장에서 찍은 사진으로만 말합니다.",
  lead: "아래 기록은 전부 아오보 기사들이 작업 중에 찍은 것입니다.\n연출 사진은 없습니다.",
  items: [
    { value: 2019, label: "첫 현장 기록", note: "천막 옆 물탱크 한 통에서 시작했습니다", plain: true },
    { value: 10, unit: "곳", label: "사진이 남은 행사 현장", note: "축제, 요리대회, 골프 대회, 크리스마스 마켓" },
    { value: 5, unit: "통", label: "1톤 물탱크 동시 운용", note: "대량 급수 현장에 다섯 통까지 묶어 씁니다" },
    { value: 4, unit: "분야", label: "처리 범위", note: "급수 · 배수 · 오폐수 · 음식물" },
  ],
};

export interface Stage {
  key: string;
  /** 동사로 끝나는 제목. 순서가 곧 공정입니다. */
  title: string;
  body: string;
  photos: Photo[];
  /** 사진 그리드의 짜임. 단계마다 다르게 둡니다. */
  layout: "row3" | "bigLeft" | "quad" | "pair" | "bigTop";
}

/** 현장의 하루. 호스가 지나는 순서 그대로입니다. */
export const waterStages: { label: string; title: string[]; lead: string; stages: Stage[] } = {
  label: "How a site gets its water",
  title: ["물이 흐르기까지,", "현장의 하루."],
  lead: "급수차에서 싱크대까지, 싱크대에서 회수 탱크까지.\n한 현장에서 아오보가 하는 일을 순서대로 놓았습니다.",
  stages: [
    {
      key: "load",
      title: "싣고 갑니다",
      body: "1톤 물탱크와 펌프, 호스와 싱크대를 전날 상차합니다.\n지게차로 올리고 트럭으로 옮기는 것까지 저희 일입니다.",
      layout: "row3",
      photos: [
        img("move-lift", "지게차로 1톤 물탱크를 트럭에 올리는 작업자들", "portrait"),
        img("move-truck", "트럭 적재함에 실린 파란 1톤 물탱크", "portrait"),
        img("goyang-truck", "체육관 앞 트럭에 실어 온 물탱크", "portrait"),
      ],
    },
    {
      key: "intake",
      title: "물을 끌어옵니다",
      body: "수도계량기나 급수차에서 물탱크까지 호스를 깔고 밸브를 잇습니다.\n사람이 지나는 길에는 보호 덮개를 덮습니다.",
      layout: "bigLeft",
      photos: [
        img("goyang-cover", "주차장을 가로질러 급수차에서 파란 급수 호스를 끌어오는 모습", "landscape"),
        img("lpga-hose", "골프장 카트 길을 가로지르는 급수 호스와 보호 덮개", "landscape"),
        img("hose-grass", "잔디 위를 지나는 파란 급수 호스", "landscape"),
      ],
    },
    {
      key: "pipe",
      title: "관을 잇습니다",
      body: "탱크 아래에 펌프를 두고 밸브와 호스를 연결합니다.\n겨울 현장은 관을 보온재로 감쌉니다.",
      layout: "quad",
      photos: [
        img("siheung-valve", "물탱크 출구에 체결한 황동 밸브와 급수 호스", "portrait"),
        img("siheung-pump", "물탱크 받침 아래 설치한 가압 펌프", "portrait"),
        img("ottogi-insulation", "보온재로 감싼 급수 배관", "portrait"),
        img("gangneung-pump", "돌담 아래 펌프와 주황색 급수 호스", "square"),
      ],
    },
    {
      key: "sink",
      title: "싱크대를 놓습니다",
      body: "부스마다 급수와 배수를 연결한 싱크대를 둡니다.\n천막, 컨테이너, 목조 부스 어디든 같습니다.",
      layout: "pair",
      photos: [
        img("lotte-sink", "목조 부스 안에 급수와 배수를 연결한 스테인리스 싱크대", "landscape"),
        img("gongju-sink", "파란 컨테이너 부스 안에 설치한 싱크대", "portrait"),
        img("gangneung-sink", "검은 가벽 앞에 놓인 2조 싱크대", "landscape"),
        img("ottogi-cover", "노란 천막 아래 한 줄로 놓인 싱크대", "landscape"),
      ],
    },
    {
      key: "drain",
      title: "배수를 빼냅니다",
      body: "쓴 물은 배수 호스로 모아 집수정이나 회수 탱크로 보냅니다.\n오 · 폐수와 음식물은 처리까지 연계합니다.",
      layout: "row3",
      photos: [
        img("siheung-drain", "집수정 안으로 연결한 배수 배관", "portrait"),
        img("lotte-drain", "목조 부스 벽을 따라 올린 배수 배관과 물탱크", "portrait"),
        img("bbq-pump", "돌담 옆 배수 펌프와 호스", "landscape"),
      ],
    },
    {
      key: "run",
      title: "행사가 돌아갑니다",
      body: "물이 나오고 빠지는 동안 저희는 사용량을 재고 호스를 점검합니다.\n손님은 물이 어디서 오는지 몰라야 합니다.",
      layout: "bigTop",
      photos: [
        img("lpga-cover", "빨간 파라솔 아래 식음 부스가 열린 골프 대회 갤러리 플라자", "landscape"),
        img("siheung-crowd", "축제장 입구를 지나는 방문객들", "landscape"),
        img("bbq-crowd", "바비큐 페스티벌 부스 앞에서 식사하는 사람들", "portrait"),
      ],
    },
    {
      key: "strike",
      title: "걷어 갑니다",
      body: "행사가 끝나면 탱크의 물을 비우고 호스를 걷습니다.\n현장은 들어오기 전과 같아야 합니다.",
      layout: "row3",
      photos: [
        img("move-forklift", "빈 물탱크를 지게차로 옮기는 작업자", "portrait"),
        img("y2019-outside", "천막 밖에 세워 둔 물탱크와 걷어 낸 호스", "portrait"),
        img("hongdae-street", "행사 뒤 거리에 모아 둔 조리대", "portrait"),
      ],
    },
  ],
};

export interface Project {
  slug: string;
  year: string;
  name: string;
  place: string;
  scope: string[];
  note: string;
  cover: Photo;
  details: [Photo, Photo];
}

/** 현장 기록. 최근 현장이 먼저 옵니다. */
export const waterProjects: { label: string; title: string[]; lead: string; items: Project[] } = {
  label: "Field records",
  title: ["현장마다,", "물길이 달랐습니다."],
  lead: "같은 장비라도 현장마다 물이 오는 길이 다릅니다.\n사진이 남은 현장만 모아 어디서 끌어와 어디로 보냈는지 적었습니다.",
  items: [
    {
      slug: "seoul-bbq-2026",
      year: "2026",
      name: "서울 바비큐 페스티벌",
      place: "서울",
      scope: ["1톤 물탱크", "IBC 톤백 급수", "부스 싱크대", "배수 펌프"],
      note: "잔디 위 부스마다 급수와 배수를 깔고, 무대 뒤 IBC 탱크에서 물을 끌어왔습니다.",
      cover: img("bbq-cover", "잔디 행사장에 놓인 IBC 톤백 물탱크와 노란 파라솔"),
      details: [
        img("bbq-sinks", "천막 안에 설치한 냉장고와 싱크대"),
        img("bbq-tank", "천막 옆 파란 물탱크와 급수 호스"),
      ],
    },
    {
      slug: "gangneung-its-2026",
      year: "2026",
      name: "강릉 ITS 행사장 임시주방",
      place: "강릉",
      scope: ["야외 싱크대", "펌프 급수", "보호 덮개", "배수 연결"],
      note: "한옥 정원 행사장의 검은 가벽 뒤로 탱크와 펌프를 숨기고, 주방 천막까지 호스를 돌렸습니다.",
      cover: img("gangneung-cover", "검은 가벽 뒤 돌담 아래 물탱크와 펌프, 주황색 호스"),
      details: [
        img("gangneung-sink", "검은 가벽 앞 2조 싱크대"),
        img("gangneung-pump", "돌담 아래 펌프와 급수 호스", "square"),
      ],
    },
    {
      slug: "gongju-market-2026",
      year: "2026",
      name: "공주 전통시장 컨테이너 부스",
      place: "공주",
      scope: ["컨테이너 급배수", "싱크대 설치", "펌프 급수", "배관"],
      note: "주황색과 파란색 컨테이너 부스 하나하나에 급수관과 배수구를 넣고 싱크대를 앉혔습니다.",
      cover: img("gongju-cover", "도로변에 줄지어 선 주황색 컨테이너 부스"),
      details: [
        img("gongju-sink", "파란 컨테이너 안 싱크대", "portrait"),
        img("gongju-pipe", "컨테이너 바닥에 깐 급수 배관", "portrait"),
      ],
    },
    {
      slug: "hongdae-masterchef-2026",
      year: "2026",
      name: "서울 마스터셰프 요리대회",
      place: "홍대",
      scope: ["야간 설치", "물탱크 · 펌프", "조리대 급수"],
      note: "대회 전날 밤, 천막 안에 탱크와 펌프를 두고 조리대 줄까지 물을 연결했습니다.",
      cover: img("hongdae-cover", "야간에 줄지어 설치한 스테인리스 조리대", "portrait"),
      details: [
        img("hongdae-tent", "천막 안 물탱크와 사다리", "portrait"),
        img("hongdae-pump", "물탱크 아래 펌프와 호스", "portrait"),
      ],
    },
    {
      slug: "cheongna-lpga-2026",
      year: "2026",
      name: "청라 베어즈 골프장 LPGA 투어",
      place: "인천 청라",
      scope: ["1톤 물탱크 운용", "카트 길 호스", "식음 부스 급배수"],
      note: "갤러리 플라자의 식음 부스에 물탱크를 묶어 두고, 카트 길을 가로지르는 호스를 보호했습니다.",
      cover: img("lpga-cover", "빨간 파라솔이 늘어선 골프 대회 갤러리 플라자"),
      details: [
        img("lpga-tanks", "천막 아래 묶어 둔 1톤 물탱크들"),
        img("lpga-hose", "카트 길을 가로지르는 급수 호스"),
      ],
    },
    {
      slug: "siheung-festival-2025",
      year: "2025",
      name: "시흥갯골축제",
      place: "시흥",
      scope: ["물탱크 급수", "IBC 톤백", "배수 집수", "케이블 덮개"],
      note: "갯골생태공원 부스에 탱크를 세우고 밸브와 펌프를 잇고, 배수는 집수정으로 보냈습니다.",
      cover: img("siheung-cover", "무대 트러스 아래 놓인 IBC 톤백 물탱크"),
      details: [
        img("siheung-valve", "물탱크 출구의 황동 밸브", "portrait"),
        img("siheung-drain", "집수정으로 연결한 배수 배관", "portrait"),
      ],
    },
    {
      slug: "goyang-gym-2024",
      year: "2024",
      name: "고양체육관 행사",
      place: "고양",
      scope: ["급수차 연계", "물탱크 운반", "싱크대 설치"],
      note: "급수차에서 물탱크까지 주차장을 가로질러 호스를 깔고, 천막 안 싱크대에 물을 댔습니다.",
      cover: img("goyang-cover", "급수차에서 주차장을 가로질러 깐 파란 급수 호스", "portrait"),
      details: [
        img("goyang-sink", "검은 천막 안 싱크대와 정수기", "square"),
        img("goyang-tank", "체육관 벽 앞에 세운 물탱크", "portrait"),
      ],
    },
    {
      slug: "lotte-xmas-2023",
      year: "2023",
      name: "롯데타워 크리스마스 마켓",
      place: "서울 잠실",
      scope: ["목조 부스 싱크대", "물탱크 2통", "배수 배관", "겨울 운용"],
      note: "목조 부스마다 싱크대를 넣고 벽을 따라 배관을 올렸습니다.\n한겨울 야외에서 물이 얼지 않게 관리했습니다.",
      cover: img("lotte-cover", "롯데타워 앞 잔디에 1톤 물탱크 두 통을 세우고 펌프를 연결하는 작업자들"),
      details: [
        img("lotte-sink", "목조 부스 안 싱크대"),
        img("lotte-drain", "목조 부스 벽을 따라 올린 배관", "portrait"),
      ],
    },
    {
      slug: "ottogi-family-2023",
      year: "2023",
      name: "오뚜기 가족요리행사",
      place: "야외 행사장",
      scope: ["싱크대 열 설치", "보온 배관", "장거리 호스"],
      note: "숲길을 따라 호스를 끌어와 천막 아래 싱크대 줄에 물을 댔습니다.\n관은 보온재로 감쌌습니다.",
      cover: img("ottogi-cover", "노란 천막 아래 한 줄로 놓인 싱크대"),
      details: [
        img("ottogi-path", "숲길을 따라 깐 급수 호스", "portrait"),
        img("ottogi-insulation", "보온재로 감싼 배관", "portrait"),
      ],
    },
    {
      slug: "genesis-golf-2022",
      year: "2022",
      name: "잭니클라우스 제네시스 골프대회",
      place: "인천 송도",
      scope: ["물탱크 급수", "푸드존 싱크대", "스테인리스 작업대", "배수 연결"],
      note: "푸드존 천막마다 스테인리스 작업대와 싱크대를 앉히고, 천막 안쪽 파란 물탱크에서 물을 끌어왔습니다.\n녹색 인조잔디 위라 호스는 천막 뒤로만 돌렸습니다.",
      cover: img("golf-cover", "잭니클라우스 골프장 푸드존의 검은 천막과 스테인리스 작업대"),
      details: [
        img("golf-tanks", "천막 안 파란 물탱크 세 통과 싱크대, 냉장고"),
        img("golf-sink", "인조잔디 위 수전이 달린 스테인리스 싱크대", "portrait"),
      ],
    },
  ],
};

/** 렌탈과 시공의 차이. 왼쪽은 흐리게, 오른쪽은 또렷하게. */
export const waterCompare = {
  title: ["물탱크를 놓고 가는 일과,", "물이 돌게 하는 일."],
  lead: "물탱크 렌탈은 탱크를 내려놓으면 끝납니다.\n그런데 탱크만으로는 싱크대에서 한 방울도 나오지 않습니다.",
  left: {
    title: "물탱크 렌탈",
    rows: ["지정 장소에 탱크 하차", "호스 · 펌프 연결은 주최 측 몫", "배수 처리 업체를 따로 수배", "사용량 확인 없음", "회수는 빈 탱크만"],
  },
  right: {
    title: "아오보 급배수설비",
    rows: [
      "급수원에서 탱크, 싱크대까지 호스 · 펌프 연결",
      "실내 · 야외 설치와 보온 배관",
      "배수 집수와 오 · 폐수 · 음식물 처리 연계",
      "부스별 하루 사용량 관리",
      "행사 종료 후 철거와 회수까지",
    ],
  },
  closing: "연락할 곳이 한 곳이면, 물 문제의 책임도 한 곳입니다.",
};

/** 네 가지 흐름. 호스가 지나는 순서입니다. */
export const waterScope = {
  title: "네 가지 흐름을 한 팀이 맡습니다.",
  lead: "급수에서 시작해 배수와 처리대행까지.\n호스가 지나는 순서 그대로입니다.",
  /* 제목 안의 알약. 흐름 이름 넷이 글 사이에 알약으로 섭니다. */
  headline: { before: "급수부터", pills: ["배수", "오폐수", "음식물"], after: "까지, 한 팀이 맡습니다." },
  groups: [
    {
      name: "급수설비",
      short: "급수",
      items: ["수도계량기 인입", "급수차 연계", "1톤 물탱크 5통 운용", "급수호스 연결", "보온설비"],
      blurb: "수도가 멀어도 급수차와 물탱크로\n부스까지 물을 끌어옵니다",
    },
    {
      name: "배수설비",
      short: "배수",
      items: ["배수호스 연결", "싱크대 설치", "집수 · 배수 펌프", "배수 컨트롤 박스"],
      blurb: "싱크대마다 배수를 연결하고\n펌프로 집수정까지 보냅니다",
    },
    {
      name: "오 · 폐수 처리대행",
      short: "오폐수",
      items: ["회수 탱크 운용", "처리 업체 연계", "행사 종료까지 반복 회수"],
      blurb: "회수 탱크를 두고 행사 끝까지\n처리 업체와 연계해 비웁니다",
    },
    {
      name: "음식물 처리대행",
      short: "음식물",
      items: ["전용 수거통 비치", "현장 수거", "폐기물 처리 연계"],
      blurb: "전용 수거통을 비치하고\n현장 수거와 처리까지 맡습니다",
    },
  ],
};

/** 물탱크 여정. 현장 기록에서 등장한 탱크가 세 패널을 지나며 자리를 옮깁니다. */
export const waterJourney = {
  tank: img("tank-cutout", "파란 1톤 물탱크", "portrait"),
  set: img("set-cutout", "물탱크, 펌프, 호스, 싱크대가 한 벌로 연결된 모습"),
  /* 왼쪽 무대에 흐리게 깔리는 현장 사진. 토스의 흐린 대시보드 자리입니다. */
  backdrop: img("gangneung-sink", "검은 가벽 앞 2조 싱크대"),
};

/** 상담이 먼저인 현장. 둘 이상이면 품목보다 조건을 먼저 받습니다. */
export const waterFit = {
  title: "이런 현장이라면 상담부터 하세요.",
  lead: "두 가지 이상 해당하면 품목보다 현장 조건을 먼저 보내 주세요.\n물이 오는 길부터 같이 그립니다.",
  items: [
    "부스가 여러 곳이고 싱크대가 필요하다",
    "수도가 멀거나 급수차를 써야 한다",
    "잔디, 데크, 컨테이너처럼 바닥에 관을 묻을 수 없다",
    "오 · 폐수와 음식물 처리를 같이 맡기고 싶다",
    "행사가 이틀 이상 이어진다",
    "겨울이거나 야간 설치다",
  ],
};

/** 스크럽 장면 셋. 제작 영상 A·B·C(각 4초, 97장)입니다. 자막의 at은
    [들어오기 시작, 다 들어옴, 나가기 시작, 다 나감]이고 영상의 컷에 맞춰 두었습니다. */
export const waterScrubs = {
  /* A. 한 벌이 조립된다. 흰 배경에 탱크만 서 있다가 펌프, 호스, 싱크대가 차례로 붙는다. */
  tank: {
    seq: "tank",
    count: 97,
    label: "물탱크에서 싱크대까지",
    captions: [
      { at: [0.02, 0.1, 0.28, 0.36] as const, title: "물탱크 한 통에서 시작합니다.", body: "1톤 탱크를 세우고 펌프를 붙입니다.", align: "left" as const },
      { at: [0.42, 0.5, 0.62, 0.68] as const, title: "호스가 천막까지 갑니다.", body: "사람이 지나는 길은 덮개로 덮습니다.", align: "left" as const },
      { at: [0.72, 0.8, 0.96, 1.2] as const, title: "싱크대에서 물이 나옵니다.", body: "그때부터 부스는 주방이 됩니다.", align: "left" as const },
    ],
  },
  /* B. 물이 가는 길. 검은 배경, 탱크에서 펌프와 싱크대를 지나 회수 탱크까지 물이 흐른다.
     알약 전환과 한 장면(DarkPassage)이라, at은 알약을 포함한 장면 전체의 진행도입니다.
     첫 자막은 제목 «물이 가는 길»이 날아와 앞머리가 되므로 제목으로 시작해야 합니다. */
  kitchen: {
    seq: "kitchen",
    count: 97,
    label: "물이 가는 길",
    captions: [
      { at: [0.17, 0.23, 0.55, 0.61] as const, title: "물이 가는 길은 보이지 않아야 합니다.", body: "탱크와 펌프는 천막 뒤에 둡니다.", align: "right" as const },
      { at: [0.62, 0.68, 0.78, 0.84] as const, title: "펌프가 수압을 만듭니다.", body: "여러 싱크대에 수압을 고르게 보냅니다.", align: "left" as const },
      { at: [0.86, 0.92, 1.1, 1.2] as const, title: "쓴 물은 모아서 보냅니다.", body: "회수 탱크로.\n바닥에 흘리지 않습니다.", align: "left" as const },
    ],
  },
  /* C. 걷어 가는 날. 밤의 천막에서 시작해 새벽에 걷고, 해가 뜬 빈 잔디로 끝난다. */
  sinks: {
    seq: "sinks",
    count: 97,
    label: "걷어 가는 날",
    captions: [
      { at: [0.02, 0.12, 0.34, 0.42] as const, title: "행사가 끝나면 걷어 갑니다.", body: "탱크의 물을 비우고 호스를 걷습니다.", y: "top" as const },
      { at: [0.5, 0.6, 0.78, 0.84] as const, title: "탱크는 지게차로, 호스는 손으로.", y: "top" as const },
      { at: [0.86, 0.94, 1.1, 1.2] as const, title: "현장은 들어오기 전과 같아야 합니다.", y: "top" as const },
    ],
  },
};

/** 알약 전환. 두 낱말 사이의 검은 알약이 자라 어두운 장면이 됩니다. */
export const waterPill = {
  left: "물탱크를 놓는 일",
  right: "물이 돌게 하는 일",
  title: "물이 가는 길",
  lead: "탱크를 내려놓는 것과 물이 흐르게 하는 것은 다릅니다.\n그 차이가 어디에 있는지 보여드립니다.",
};

export const waterClosing = {
  label: "Contact",
  title: "현장의 물, 아오보에 맡기세요.",
  lead: "행사명과 장소, 기간, 부스 수만 알려주세요.\n급수 · 배수 설계부터 설치, 처리대행, 회수까지 바로 상담해드립니다.",
  hours: "평일 09:00 - 18:00",
  photo: img("lotte-tanks", "1톤 물탱크 두 통 옆에서 펌프를 연결하는 작업자들"),
};
