import { Metadata } from "next";
import { COMPANY } from "@/lib/constants";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description:
    "AOVO 서비스의 개인정보처리방침입니다. 수집하는 개인정보 항목, 수집 목적, 보유 기간 등을 안내합니다.",
};

const H2 = "mt-14 mb-4 text-[22px] font-bold leading-[1.3] tracking-[-0.02em] text-tx first:mt-0";
const P = "mb-4 text-[15px] leading-[1.8] text-tx-2";
const OL = "mb-4 list-decimal space-y-2 pl-5 text-[15px] leading-[1.8] text-tx-2";

export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <PageHero
        eyebrow="Privacy Policy"
        title="개인정보처리방침"
        description={`${COMPANY.legalName}(이하 "회사")는 이용자의 개인정보를 소중히 여기며, 관련 법령을 준수합니다.`}
      />

      {/* Content */}
      <section className="bg-white text-tx">
        <article className="mx-auto max-w-3xl px-6 py-24 lg:py-32">
          {/* 제1조 */}
          <h2 className={H2}>제1조 (수집하는 개인정보 항목)</h2>
          <p className={P}>
            회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다.
          </p>
          <ol className={OL}>
            <li>
              필수항목: 회사명(상호), 담당자명, 연락처(전화번호, 휴대전화번호),
              이메일 주소, 사업자등록번호
            </li>
            <li>
              선택항목: 사업장 주소, 업종, 부서명, 직위, 팩스번호
            </li>
            <li>
              자동 수집 항목: IP 주소, 쿠키, 방문 일시, 서비스 이용 기록,
              기기 정보(브라우저 종류, OS 등)
            </li>
          </ol>

          {/* 제2조 */}
          <h2 className={H2}>제2조 (개인정보의 수집 목적)</h2>
          <p className={P}>
            회사는 수집한 개인정보를 다음의 목적으로 이용합니다.
          </p>
          <ol className={OL}>
            <li>서비스 계약의 체결 및 이행(견적 제공, 장비 배송, 요금 정산 등)</li>
            <li>고객 상담 및 불만 처리, 고지사항 전달</li>
            <li>서비스 개선 및 신규 서비스 개발을 위한 통계 분석</li>
            <li>마케팅 및 광고 활용(이벤트 안내, 프로모션 정보 제공 등)</li>
            <li>법령 및 이용약관 위반 행위에 대한 제재</li>
          </ol>

          {/* 제3조 */}
          <h2 className={H2}>제3조 (개인정보의 보유 및 이용 기간)</h2>
          <p className={P}>
            회사는 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체
            없이 파기합니다. 단, 관련 법령에 의하여 보존할 필요가 있는 경우
            다음과 같이 보관합니다.
          </p>
          <ol className={OL}>
            <li>
              계약 또는 청약철회 등에 관한 기록: 5년 (전자상거래 등에서의
              소비자보호에 관한 법률)
            </li>
            <li>
              대금결제 및 재화 등의 공급에 관한 기록: 5년 (전자상거래 등에서의
              소비자보호에 관한 법률)
            </li>
            <li>
              소비자의 불만 또는 분쟁처리에 관한 기록: 3년 (전자상거래 등에서의
              소비자보호에 관한 법률)
            </li>
            <li>
              웹사이트 방문 기록: 3개월 (통신비밀보호법)
            </li>
          </ol>

          {/* 제4조 */}
          <h2 className={H2}>제4조 (개인정보의 제3자 제공)</h2>
          <p className={P}>
            회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만
            아래의 경우에는 예외로 합니다.
          </p>
          <ol className={OL}>
            <li>이용자가 사전에 동의한 경우</li>
            <li>
              법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와
              방법에 따라 수사기관의 요구가 있는 경우
            </li>
            <li>
              서비스 제공에 따른 요금 정산을 위하여 필요한 경우(배송 업체,
              결제 대행사 등)
            </li>
          </ol>

          {/* 제5조 */}
          <h2 className={H2}>제5조 (개인정보의 파기 절차 및 방법)</h2>
          <p className={P}>
            회사는 개인정보 보유 기간의 경과, 처리 목적 달성 등 개인정보가
            불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다.
          </p>
          <ol className={OL}>
            <li>
              파기 절차: 이용자가 입력한 정보는 목적 달성 후 별도의 DB에
              옮겨져(종이의 경우 별도 서류) 내부 방침 및 기타 관련 법령에 따라
              일정 기간 저장된 후 파기됩니다.
            </li>
            <li>
              파기 방법: 전자적 파일 형태의 정보는 기록을 재생할 수 없는
              기술적 방법을 사용하여 삭제하며, 종이에 출력된 개인정보는 분쇄기로
              분쇄하거나 소각합니다.
            </li>
          </ol>

          {/* 제6조 */}
          <h2 className={H2}>제6조 (이용자의 권리와 행사 방법)</h2>
          <p className={P}>
            이용자는 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수
            있습니다.
          </p>
          <ol className={OL}>
            <li>개인정보 열람 요구</li>
            <li>오류 등이 있을 경우 정정 요구</li>
            <li>삭제 요구</li>
            <li>처리 정지 요구</li>
          </ol>
          <p className={P}>
            위 권리 행사는 회사에 대해 서면, 전화, 이메일 등을 통하여 할 수
            있으며, 회사는 이에 대해 지체 없이 조치하겠습니다.
          </p>

          {/* 제7조 */}
          <h2 className={H2}>제7조 (개인정보의 안전성 확보 조치)</h2>
          <p className={P}>
            회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고
            있습니다.
          </p>
          <ol className={OL}>
            <li>관리적 조치: 내부관리계획 수립·시행, 개인정보 취급 직원의 최소화 및 교육</li>
            <li>기술적 조치: 개인정보 암호화, 해킹 등에 대비한 보안 프로그램 설치 및 갱신</li>
            <li>물리적 조치: 개인정보가 포함된 서류, 보조저장매체 등의 잠금장치가 있는 장소에 보관</li>
          </ol>

          {/* 제8조 */}
          <h2 className={H2}>제8조 (개인정보 보호 책임자)</h2>
          <p className={P}>
            회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 이용자의
            개인정보 관련 불만 처리 및 피해구제를 위하여 아래와 같이 개인정보
            보호 책임자를 지정하고 있습니다.
          </p>
          <div className="mb-4 rounded-[24px] bg-tg p-7">
            <ul className="space-y-1.5 text-[15px] leading-[1.8] text-tx-2">
              <li>개인정보 보호 책임자: {COMPANY.ceo} (대표)</li>
              <li>연락처: {COMPANY.phone}</li>
              <li>이메일: {COMPANY.email}</li>
            </ul>
          </div>

          {/* 제9조 */}
          <h2 className={H2}>제9조 (개인정보처리방침의 변경)</h2>
          <p className={P}>
            본 개인정보처리방침은 법령, 정책 또는 보안기술의 변경에 따라
            내용의 추가, 삭제 및 수정이 있을 수 있으며, 변경 시 웹사이트
            공지사항을 통하여 고지할 것입니다.
          </p>

          {/* 부칙 */}
          <h2 className={H2}>부칙</h2>
          <p className={P}>
            본 개인정보처리방침은 2024년 1월 1일부터 시행합니다.
          </p>

          {/* 연락처 */}
          <div className="mt-16 rounded-[24px] bg-tg p-7">
            <h3 className="text-[18px] font-bold text-tx">문의처</h3>
            <ul className="mt-4 space-y-1.5 text-[15px] leading-[1.8] text-tx-2">
              <li>상호: {COMPANY.legalName}</li>
              <li>대표: {COMPANY.ceo}</li>
              <li>주소: {COMPANY.address}</li>
              <li>전화: {COMPANY.phone}</li>
              <li>이메일: {COMPANY.email}</li>
            </ul>
          </div>
        </article>
      </section>
    </>
  );
}
