import { divisions } from "./divisions";
import { brands } from "./brands";

export interface NavItem {
  label: string;
  labelEn: string;
  href: string;
  desc?: string;
  children?: NavItem[];
}

export const navigation: NavItem[] = [
  {
    label: "사업분야",
    labelEn: "Divisions",
    href: "/#divisions",
    desc: "다섯 개의 전문 분야가 비즈니스 자산의 전 주기를 운영합니다",
    children: divisions.map((d) => ({
      label: d.nameFull,
      labelEn: d.nameEn,
      href: d.href,
      desc: d.tagline,
    })),
  },
  {
    label: "브랜드",
    labelEn: "Brands",
    href: "/#brands",
    desc: "사무실부터 데이터센터, 공장, 물류센터까지 — 현장마다 전문 브랜드가 있습니다",
    children: brands.map((b) => ({
      label: b.name,
      labelEn: b.nameKo,
      href: b.href,
      desc: b.domain,
    })),
  },
  {
    label: "그룹소개",
    labelEn: "About",
    href: "/about",
    desc: "AOVO 그룹이 걸어온 길과 만들어갈 미래",
    children: [
      { label: "개요", labelEn: "Overview", href: "/about" },
      { label: "회사 연혁", labelEn: "History", href: "/about/history" },
      { label: "CI 소개", labelEn: "Brand CI", href: "/about/ci" },
      { label: "오시는 길", labelEn: "Location", href: "/about/location" },
      { label: "파트너 계약", labelEn: "Partners", href: "/about/partners" },
    ],
  },
  {
    label: "고객지원",
    labelEn: "Support",
    href: "/support/contact",
    desc: "궁금한 점이 있다면 무엇이든 물어보세요",
    children: [
      { label: "공지사항", labelEn: "Notice", href: "/support/notice" },
      { label: "FAQ", labelEn: "FAQ", href: "/support/faq" },
      { label: "문의하기", labelEn: "Contact", href: "/support/contact" },
    ],
  },
];
