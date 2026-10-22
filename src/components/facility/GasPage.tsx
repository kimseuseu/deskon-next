import { gas, water } from "@/data/facility";
import { FilmHero } from "./FilmHero";
import { ReasonsReel } from "./ReasonsReel";
import { LineupPan } from "./LineupPan";
import { RentalShowcase } from "./RentalShowcase";
import { WorksCompact } from "./WorksCompact";
import { ClosingCta } from "./ClosingCta";

/**
 * 가스기기 임대. 스크롤로 재생되는 필름 한 편입니다.
 *
 *   1. 첫 장면   행사장에 설치된 기기 한 줄. 첫 문장이 떠나면 네 묶음이 도착한다.
 *   2. 이유      사지 않고 빌리는 네 가지 이유가 한 줄씩 가운데를 지난다.
 *   3. 라인업    가스기기 여섯 종이 가로로 지나간다.
 *   4. 광고      임대 기기를 네 펼침면으로 읽는다. 여기서 필름이 멈춘다.
 *   5. 시공      배관과 검사대행은 맨 아래 한 화면으로 접어 둔다.
 *   6. 맺음      견적 상담, 그리고 급배수설비공사로 가는 길.
 */
export function GasPage() {
  return (
    <>
      <FilmHero work={gas} />
      <ReasonsReel work={gas} />
      <LineupPan
        work={gas}
        label="Gas Rental"
        images={{
          간택기: { src: "/images/gas-rental/sj-gantaek-1500.webp", alt: "링구 12구의 1500 폭 스테인리스 간택기" },
          낮은렌지: { src: "/images/facility/gas-low-range.webp", alt: "짧은 다리와 대형 화구를 갖춘 스테인리스 낮은렌지" },
          탕렌지: { src: "/images/facility/gas-soup-range.webp", alt: "대형 스테인리스 국통을 올린 업소용 탕렌지" },
          중화버너: { src: "/images/facility/gas-wok-burner.webp", alt: "둥근 웍과 단일 화구를 갖춘 업소용 중화버너" },
          회전국솥: { src: "/images/facility/gas-tilting-kettle.webp", alt: "뚜껑을 열고 측면 회전 손잡이가 보이는 스테인리스 회전국솥" },
          인덕션렌지: { src: "/images/facility/gas-induction-range.webp", alt: "검은 유리 상판과 스테인리스 본체의 탁상용 인덕션렌지" },
        }}
      />
      <RentalShowcase />
      <WorksCompact />
      <ClosingCta work={gas} sibling={water} />
    </>
  );
}
