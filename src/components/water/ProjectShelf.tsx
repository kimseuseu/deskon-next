import { Scene } from "@/components/film/Scene";
import { span } from "@/components/film/cue";
import { waterProjects } from "@/data/water-story";
import { ShelfCards } from "./ShelfCards";
import { Typewriter } from "./Typewriter";

/**
 * 현장 기록. 토스 메인의 «상품 판매와 정산» 자리와 같은 문법입니다.
 *
 * 격자가 깔린 흰 무대에 제목이 한 글자씩 쳐집니다. 제목이 다 쳐지면 현장
 * 카드 아홉 장이 아래에서 올라와 높이를 어긋낸 채 한 줄로 서고, 스크롤이
 * 그 줄을 옆으로 밉니다.
 *
 *   0.06 → 0.30  제목이 쳐진다.
 *   0.30 → 0.40  설명이 올라온다. 카드 줄은 0.34를 넘는 순간 제 시간에 차례로 올라온다.
 *   0.46 → 1.00  카드 줄이 왼쪽으로 지나간다.
 *
 * 무대 위쪽은 헤더 높이만큼 비워 제목이 헤더 뒤로 들어가지 않게 합니다.
 * 카드 줄은 아래가 조금 잘려도 됩니다.
 *
 * 전화기에서는 붙지 않습니다. 카드는 손가락으로 넘깁니다.
 */
export function ProjectShelf() {
  const items = waterProjects.items;
  return (
    <Scene className="shelf bg-white" mobileMode="enter" aria-label="현장 기록">
      <div className="shelf-stage tw-grid relative flex flex-col justify-start overflow-hidden bg-white pt-24 text-tx lg:pt-[calc(var(--bar)+3.5rem)]">
        <div className="relative mx-auto w-full max-w-[1200px] px-6">
          <h2 className="text-center text-[clamp(2rem,4.6vw,3.8rem)] font-bold leading-[1.2] tracking-[-0.035em]">
            <Typewriter lines={waterProjects.title} from={0.06} to={0.3} />
          </h2>
          <p
            className="cue-in mx-auto mt-5 max-w-2xl text-center whitespace-pre-line text-[17px] font-medium leading-[1.7] text-tx-2"
            style={span(0.3, 0.4)}
          >
            {waterProjects.lead}
          </p>
          {/* 누르라는 안내. 카드와 같은 알약 모양이라 무엇을 누르는지 바로 통합니다. */}
          <p className="cue-in mt-5 flex justify-center" style={span(0.34, 0.42)}>
            <span className="inline-flex items-center gap-2 rounded-full bg-tb-soft px-4 py-2 text-[13px] font-semibold text-tb">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-tb" />
              카드를 누르면 현장을 크게 볼 수 있어요
            </span>
          </p>
        </div>

        {/* 카드 줄. 기준점을 넘으면 제 시간에 차례로 올라오고, 되돌아가면 사라집니다(ShelfCards). */}
        <div className="mt-10 lg:mt-14">
          <ShelfCards items={items} at={0.34} panFrom={0.46} />
        </div>
      </div>
    </Scene>
  );
}
