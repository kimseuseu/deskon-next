import { Metadata } from "next";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "개인정보처리방침 | AOVO",
  description:
    "AOVO 서비스의 개인정보처리방침입니다. 수집하는 개인정보 항목, 수집 목적, 보유 기간 등을 안내합니다.",
};

export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary via-gray-900 to-primary py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase bg-accent/15 text-accent-light border border-accent/20 mb-6">
            Privacy Policy
          </span>
          <h1 className="font-paperlogy text-4xl md:text-5xl font-bold text-white mb-4">
            개인정보처리방침
          </h1>
          <p className="text-gray-400 leading-relaxed">
            {COMPANY.legalName}(이하 &ldquo;회사&rdquo;)는 이용자의 개인정보를
            소중히 여기며, 관련 법령을 준수합니다.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-cream">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* 제1조 */}
          <h2 className="font-paperlogy text-2xl font-bold text-primary mb-6 mt-12 first:mt-0">
            제1조 (수집하는 개인정보 항목)
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다.
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted leading-relaxed mb-4">
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
          <h2 className="font-paperlogy text-2xl font-bold text-primary mb-6 mt-12">
            제2조 (개인정보의 수집 목적)
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            회사는 수집한 개인정보를 다음의 목적으로 이용합니다.
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted leading-relaxed mb-4">
            <li>서비스 계약의 체결 및 이행(견적 제공, 장비 배송, 요금 정산 등)</li>
            <li>고객 상담 및 불만 처리, 고지사항 전달</li>
            <li>서비스 개선 및 신규 서비스 개발을 위한 통계 분석</li>
            <li>마케팅 및 광고 활용(이벤트 안내, 프로모션 정보 제공 등)</li>
            <li>법령 및 이용약관 위반 행위에 대한 제재</li>
          </ol>

          {/* 제3조 */}
          <h2 className="font-paperlogy text-2xl font-bold text-primary mb-6 mt-12">
            제3조 (개인정보의 보유 및 이용 기간)
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            회사는 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체
            없이 파기합니다. 단, 관련 법령에 의하여 보존할 필요가 있는 경우
            다음과 같이 보관합니다.
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted leading-relaxed mb-4">
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
          <h2 className="font-paperlogy text-2xl font-bold text-primary mb-6 mt-12">
            제4조 (개인정보의 제3자 제공)
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만
            아래의 경우에는 예외로 합니다.
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted leading-relaxed mb-4">
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
          <h2 className="font-paperlogy text-2xl font-bold text-primary mb-6 mt-12">
            제5조 (개인정보의 파기 절차 및 방법)
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            회사는 개인정보 보유 기간의 경과, 처리 목적 달성 등 개인정보가
            불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다.
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted leading-relaxed mb-4">
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
          <h2 className="font-paperlogy text-2xl font-bold text-primary mb-6 mt-12">
            제6조 (이용자의 권리와 행사 방법)
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            이용자는 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수
            있습니다.
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted leading-relaxed mb-4">
            <li>개인정보 열람 요구</li>
            <li>오류 등이 있을 경우 정정 요구</li>
            <li>삭제 요구</li>
            <li>처리 정지 요구</li>
          </ol>
          <p className="text-muted leading-relaxed mb-4">
            위 권리 행사는 회사에 대해 서면, 전화, 이메일 등을 통하여 할 수
            있으며, 회사는 이에 대해 지체 없이 조치하겠습니다.
          </p>

          {/* 제7조 */}
          <h2 className="font-paperlogy text-2xl font-bold text-primary mb-6 mt-12">
            제7조 (개인정보의 안전성 확보 조치)
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고
            있습니다.
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted leading-relaxed mb-4">
            <li>관리적 조치: 내부관리계획 수립·시행, 개인정보 취급 직원의 최소화 및 교육</li>
            <li>기술적 조치: 개인정보 암호화, 해킹 등에 대비한 보안 프로그램 설치 및 갱신</li>
            <li>물리적 조치: 개인정보가 포함된 서류, 보조저장매체 등의 잠금장치가 있는 장소에 보관</li>
          </ol>

          {/* 제8조 */}
          <h2 className="font-paperlogy text-2xl font-bold text-primary mb-6 mt-12">
            제8조 (개인정보 보호 책임자)
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 이용자의
            개인정보 관련 불만 처리 및 피해구제를 위하여 아래와 같이 개인정보
            보호 책임자를 지정하고 있습니다.
          </p>
          <div className="p-6 bg-surface rounded-2xl border border-border mb-4">
            <ul className="space-y-1 text-muted text-sm">
              <li>개인정보 보호 책임자: {COMPANY.ceo} (대표)</li>
              <li>연락처: {COMPANY.phone}</li>
              <li>이메일: {COMPANY.email}</li>
            </ul>
          </div>

          {/* 제9조 */}
          <h2 className="font-paperlogy text-2xl font-bold text-primary mb-6 mt-12">
            제9조 (개인정보처리방침의 변경)
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            본 개인정보처리방침은 법령, 정책 또는 보안기술의 변경에 따라
            내용의 추가, 삭제 및 수정이 있을 수 있으며, 변경 시 웹사이트
            공지사항을 통하여 고지할 것입니다.
          </p>

          {/* 부칙 */}
          <h2 className="font-paperlogy text-2xl font-bold text-primary mb-6 mt-12">
            부칙
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            본 개인정보처리방침은 2024년 1월 1일부터 시행합니다.
          </p>

          {/* 연락처 */}
          <div className="mt-16 p-6 bg-surface rounded-2xl border border-border">
            <h3 className="font-paperlogy text-lg font-bold text-primary mb-4">
              문의처
            </h3>
            <ul className="space-y-1 text-muted text-sm">
              <li>상호: {COMPANY.legalName}</li>
              <li>대표: {COMPANY.ceo}</li>
              <li>주소: {COMPANY.address}</li>
              <li>전화: {COMPANY.phone}</li>
              <li>이메일: {COMPANY.email}</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
