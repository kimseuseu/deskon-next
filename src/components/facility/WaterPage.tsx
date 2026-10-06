import { gas, water } from "@/data/facility";
import { FilmHero } from "./FilmHero";
import { ReasonsReel } from "./ReasonsReel";
import { LineupPan } from "./LineupPan";
import { PipeFilm } from "./PipeFilm";
import { WaterCycle } from "./WaterCycle";
import { WaterControlBox } from "./WaterControlBox";
import { ClosingCta } from "./ClosingCta";

/**
 * 급배수설비공사. 스크롤로 재생되는 필름 한 편입니다.
 *
 *   1. 첫 장면     사진 한 장과 이름. 첫 문장이 떠나면 네 분야가 도착한다.
 *   2. 이유        네 가지가 한 줄씩 가운데를 지난다.
 *   3. 라인업      급배수 서비스 여섯이 가로로 지나간다.
 *   4. 설치        호스가 그어지고 설치 항목 일곱이 그 위에 선다.
 *   5. 사이클      여섯 단계가 둥글게 켜진다.
 *   6. 컨트롤 박스 여기서 필름이 잠깐 멈춘다.
 *   7. 맺음        상담, 그리고 가스설비공사로 가는 길.
 */
export function WaterPage() {
  return (
    <>
      <FilmHero work={water} />
      <ReasonsReel work={water} />
      <LineupPan
        work={water}
        label="Water Service"
        images={{ "1톤 물탱크": { src: "/images/facility/water-tank.webp", alt: "행사장 천막 옆에 세운 1톤 물탱크와 급수 호스" } }}
      />
      <PipeFilm
        title={water.install.title}
        lead={water.install.lead}
        items={water.install.items}
        caption={water.caption}
      />
      <WaterCycle />
      <WaterControlBox />
      <ClosingCta work={water} sibling={gas} />
    </>
  );
}
