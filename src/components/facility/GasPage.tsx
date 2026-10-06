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
        images={{ 간택기: { src: "/images/subscribe/kitchen.webp", alt: "4구 업소용 가스 화구" } }}
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
