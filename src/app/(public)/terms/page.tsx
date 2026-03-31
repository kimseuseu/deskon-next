import { Metadata } from "next";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "이용약관 | AOVO",
  description:
    "AOVO 산업용품 구독·렌탈·공유 서비스 이용약관입니다.",
};

export default function TermsPage() {
  return (
    <>
      {/* Hero */}
      <section data-hero-dark className="relative bg-gradient-to-br from-primary via-gray-900 to-primary pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase bg-accent/15 text-accent-light border border-accent/20 mb-6">
            Terms of Service
          </span>
          <h1 className="font-paperlogy text-4xl md:text-5xl font-bold text-white mb-4">
            이용약관
          </h1>
          <p className="text-gray-400 leading-relaxed">
            {COMPANY.legalName} (이하 &ldquo;회사&rdquo;)가 제공하는 AOVO
            서비스의 이용조건 및 절차에 관한 사항을 규정합니다.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-cream">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* 제1조 */}
          <h2 className="font-paperlogy text-2xl font-bold text-primary mb-6 mt-12 first:mt-0">
            제1조 (목적)
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            본 약관은 {COMPANY.legalName}(대표 {COMPANY.ceo}, 이하
            &ldquo;회사&rdquo;)가 운영하는 AOVO 서비스(이하
            &ldquo;서비스&rdquo;)의 이용과 관련하여 회사와 이용자 간의 권리,
            의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
          </p>

          {/* 제2조 */}
          <h2 className="font-paperlogy text-2xl font-bold text-primary mb-6 mt-12">
            제2조 (용어의 정의)
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-muted leading-relaxed mb-4">
            <li>
              &ldquo;서비스&rdquo;란 회사가 제공하는 산업용품 구독, 렌탈, 공유,
              순환(재활용), 유통 등 일체의 B2B 서비스를 말합니다.
            </li>
            <li>
              &ldquo;이용자&rdquo;란 본 약관에 따라 회사가 제공하는 서비스를
              이용하는 법인 또는 개인사업자를 말합니다.
            </li>
            <li>
              &ldquo;계약&rdquo;이란 서비스 이용을 위해 회사와 이용자 간에
              체결하는 이용계약을 말합니다.
            </li>
          </ol>

          {/* 제3조 */}
          <h2 className="font-paperlogy text-2xl font-bold text-primary mb-6 mt-12">
            제3조 (서비스 이용)
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            회사는 다음 각 호의 서비스를 제공하며, 서비스의 구체적인 내용은
            개별 계약에 따라 정합니다.
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted leading-relaxed mb-4">
            <li>
              구독서비스: 산업용 장비·비품을 월 단위 정기 구독 형태로 제공
            </li>
            <li>
              공유서비스: 카트, 스태커 등 물류장비의 공유 이용 서비스
            </li>
            <li>렌탈서비스: 사무가구, IT장비 등의 중장기 렌탈</li>
            <li>순환서비스: 중고 장비의 회수, 정비, 재판매</li>
            <li>유통서비스: 산업용품의 B2B 도매 유통</li>
          </ol>
          <p className="text-muted leading-relaxed mb-4">
            서비스 이용시간은 원칙적으로 연중무휴 24시간으로 하며, 회사의
            업무상 또는 기술상 이유로 서비스가 일시 중단될 수 있습니다. 이 경우
            회사는 사전에 공지합니다.
          </p>

          {/* 제4조 */}
          <h2 className="font-paperlogy text-2xl font-bold text-primary mb-6 mt-12">
            제4조 (계약의 성립 및 해지)
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-muted leading-relaxed mb-4">
            <li>
              이용계약은 이용자가 견적 요청 또는 서비스 신청 후, 회사가
              이를 승낙함으로써 성립합니다.
            </li>
            <li>
              회사는 다음 각 호에 해당하는 경우 이용 신청을 거절하거나
              사후에 계약을 해지할 수 있습니다.
              <ol className="list-decimal list-inside ml-6 mt-2 space-y-1">
                <li>허위 정보를 기재한 경우</li>
                <li>서비스 이용 요금을 납부하지 않은 경우</li>
                <li>타인의 명의를 도용한 경우</li>
                <li>법령 또는 본 약관을 위반한 경우</li>
              </ol>
            </li>
            <li>
              이용자가 계약을 해지하고자 할 경우, 회사에 서면(이메일 포함)으로
              통보하여야 하며, 개별 계약에서 정한 최소 이용기간 및 해지 절차를
              따릅니다.
            </li>
            <li>
              계약 해지 시 이용자는 제공받은 장비를 원상복구하여 반환하여야
              하며, 미반환 또는 훼손 시 별도 비용이 청구될 수 있습니다.
            </li>
          </ol>

          {/* 제5조 */}
          <h2 className="font-paperlogy text-2xl font-bold text-primary mb-6 mt-12">
            제5조 (요금 및 결제)
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-muted leading-relaxed mb-4">
            <li>
              서비스 이용 요금은 개별 계약 또는 회사가 별도로 고지하는
              요금표에 따릅니다.
            </li>
            <li>
              요금은 월 단위로 청구하며, 이용자는 청구일로부터 14일 이내에
              지정된 방법으로 결제하여야 합니다.
            </li>
            <li>
              요금 미납 시 회사는 서비스 제공을 중단할 수 있으며, 연체 시
              연 12%의 연체이자를 부과할 수 있습니다.
            </li>
            <li>
              회사는 경제 여건 변동 등의 사유로 요금을 변경할 수 있으며,
              변경 시 최소 30일 전에 이용자에게 통보합니다.
            </li>
          </ol>

          {/* 제6조 */}
          <h2 className="font-paperlogy text-2xl font-bold text-primary mb-6 mt-12">
            제6조 (장비 관리)
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-muted leading-relaxed mb-4">
            <li>
              회사가 제공하는 장비의 소유권은 회사에 있으며, 이용자는 선량한
              관리자의 주의의무로 장비를 관리하여야 합니다.
            </li>
            <li>
              이용자는 장비를 제3자에게 양도, 대여, 담보 제공할 수 없습니다.
            </li>
            <li>
              장비의 정상적인 사용으로 인한 마모는 회사가 부담하며, 이용자의
              고의 또는 과실로 인한 파손·분실은 이용자가 배상합니다.
            </li>
            <li>
              회사는 장비의 정기 점검 및 유지보수를 실시하며, 이용자는
              이에 협조하여야 합니다.
            </li>
          </ol>

          {/* 제7조 */}
          <h2 className="font-paperlogy text-2xl font-bold text-primary mb-6 mt-12">
            제7조 (손해배상)
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-muted leading-relaxed mb-4">
            <li>
              회사 또는 이용자가 본 약관의 의무를 위반하여 상대방에게 손해를
              끼친 경우, 해당 당사자는 상대방의 손해를 배상할 책임이 있습니다.
            </li>
            <li>
              회사의 손해배상 범위는 이용자가 납부한 서비스 이용료 총액을
              한도로 합니다.
            </li>
            <li>
              천재지변, 전쟁, 폭동 등 불가항력적 사유로 인한 손해에 대해서는
              책임을 지지 않습니다.
            </li>
          </ol>

          {/* 제8조 */}
          <h2 className="font-paperlogy text-2xl font-bold text-primary mb-6 mt-12">
            제8조 (면책조항)
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-muted leading-relaxed mb-4">
            <li>
              회사는 천재지변, 전시, 사변 등 불가항력으로 서비스를 제공할 수
              없는 경우 책임이 면제됩니다.
            </li>
            <li>
              회사는 이용자의 귀책사유로 인한 서비스 이용 장애에 대하여
              책임을 지지 않습니다.
            </li>
            <li>
              회사는 이용자가 서비스를 이용하여 기대하는 수익을 얻지 못한 것에
              대하여 책임을 지지 않습니다.
            </li>
            <li>
              회사는 이용자 상호 간 또는 이용자와 제3자 간에 서비스를 매개로
              발생한 분쟁에 대해 개입할 의무가 없으며 이로 인한 손해를 배상할
              책임이 없습니다.
            </li>
          </ol>

          {/* 제9조 */}
          <h2 className="font-paperlogy text-2xl font-bold text-primary mb-6 mt-12">
            제9조 (분쟁 해결)
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            본 약관과 관련한 분쟁은 대한민국 법률을 준거법으로 하며, 회사의
            본점 소재지를 관할하는 법원을 제1심 관할법원으로 합니다.
          </p>

          {/* 부칙 */}
          <h2 className="font-paperlogy text-2xl font-bold text-primary mb-6 mt-12">
            부칙
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            본 약관은 2024년 1월 1일부터 시행합니다.
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
