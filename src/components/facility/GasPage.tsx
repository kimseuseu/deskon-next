import { gas, water } from "@/data/facility";
import { FilmHero } from "./FilmHero";
import { ReasonsReel } from "./ReasonsReel";
import { LineupPan } from "./LineupPan";
import { PipeFilm } from "./PipeFilm";
import { GasInspection } from "./GasInspection";
import { ClosingCta } from "./ClosingCta";

/**
 * 가스설비공사. 스크롤로 재생되는 필름 한 편입니다.
 *
 *   1. 첫 장면   사진 한 장과 이름. 첫 문장이 떠나면 네 분야가 도착한다.
 *   2. 이유      네 가지가 한 줄씩 가운데를 지난다.
 *   3. 라인업    가스기기 여섯 종이 가로로 지나간다.
 *   4. 배관      관이 그어지고 설치 항목 일곱이 그 위에 선다.
 *   5. 검사대행  여기서 필름이 잠깐 멈춘다.
 *   6. 맺음      상담, 그리고 급배수설비공사로 가는 길.
 */
export function GasPage() {
  return (
    <>
      <FilmHero work={gas} />
      <ReasonsReel work={gas} />
      <LineupPan
        work={gas}
        label="Gas Equipment"
        images={{
          간택기: { src: "/images/subscribe/kitchen.webp", alt: "4구 업소용 가스 화구" },
          낮은렌지: { src: "/images/facility/gas-low-range.webp", alt: "짧은 다리와 대형 화구를 갖춘 스테인리스 낮은렌지" },
          탕렌지: { src: "/images/facility/gas-soup-range.webp", alt: "대형 스테인리스 국통을 올린 업소용 탕렌지" },
          중화버너: { src: "/images/facility/gas-wok-burner.webp", alt: "둥근 웍과 단일 화구를 갖춘 업소용 중화버너" },
          회전국솥: { src: "/images/facility/gas-tilting-kettle.webp", alt: "뚜껑을 열고 측면 회전 손잡이가 보이는 스테인리스 회전국솥" },
          인덕션렌지: { src: "/images/facility/gas-induction-range.webp", alt: "검은 유리 상판과 스테인리스 본체의 탁상용 인덕션렌지" },
        }}
      />
      <PipeFilm
        title={gas.install.title}
        lead={gas.install.lead}
        items={gas.install.items}
        caption={gas.caption}
      />
      <GasInspection />
      <ClosingCta work={gas} sibling={water} />
    </>
  );
}
