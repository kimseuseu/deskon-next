import { waterScrubs } from "@/data/water-story";
import { WaterHero } from "./WaterHero";
import { ScrubScene } from "./ScrubScene";
import { WaterStats } from "./WaterStats";
import { FlowTimeline } from "./FlowTimeline";
import { DarkPassage } from "./DarkPassage";
import { FlowGroups } from "./FlowGroups";
import { ProjectShelf } from "./ProjectShelf";
import { TankJourney } from "./TankJourney";
import { FitCheck } from "./FitCheck";
import { WaterClosing } from "./WaterClosing";

/**
 * 급배수 스토리. 토스 메인의 문법으로 읽는 현장 기록이자 랜딩입니다.
 *
 * 흰 바탕이 기본이고 어두운 장면이 두 번 옵니다. 어두운 장면은 늘 스크롤로
 * 넘기는 영상(프레임 시퀀스)으로 시작합니다. 밝음과 어둠의 강약이 곧 리듬입니다.
 *
 *   밝음   1. 첫 장면     제목과 영상 액자. 액자가 자라 화면을 채운다.
 *          2. 스크럽 ①    물탱크에서 싱크대까지(영상 A). 끝에서 둥근 카드가 된다.
 *          3. 숫자        사진으로 남은 현장만 센다.
 *          4. 현장의 하루  파란 선이 내려가며 일곱 단계가 켜진다.
 *   어둠   5. 어두운 통로  알약이 자라 어둠이 되고, 그 자리에서 영상 B가 떠오른다.
 *                        제목 «물이 가는 길»이 자막 자리로 날아간다.
 *          6. 네 가지 흐름 알약이 든 제목과 빛이 다른 카드 넷.
 *   밝음   7. 현장 기록   타자기 제목, 격자 바탕, 어긋난 카드 줄.
 *          8. 물탱크 여정  액자 하나에 탱크 한 통 → 한 벌 → 컨트롤 박스가 차례로 선다.
 *          9. 상담 기준   둘 이상이면 조건부터.
 *   어둠  10. 스크럽 ③    걷어 가는 날(영상 C). 밤에서 시작해 해 뜨는 잔디로 끝난다.
 *   밝음  11. 맺음        상담.
 *
 * 헤더는 `data-page-white`를 보고 흰 유리로 섭니다(components/layout/Header.tsx).
 */
export function WaterPage() {
  return (
    <div data-page-white className="tw bg-white text-tx">
      <WaterHero />
      <ScrubScene {...waterScrubs.tank} n={5} tone="light" shrink />
      <WaterStats />
      <FlowTimeline />
      <DarkPassage />
      <FlowGroups />
      <ProjectShelf />
      <TankJourney />
      <FitCheck />
      <ScrubScene {...waterScrubs.sinks} n={4} tone="dark" />
      <WaterClosing />
    </div>
  );
}
