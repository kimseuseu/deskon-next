export interface NavItem {
  label: string;
  labelEn: string;
  href: string;
  children?: NavItem[];
}

export const navigation: NavItem[] = [
  {
    label: "회사소개",
    labelEn: "About",
    href: "/about",
    children: [
      { label: "개요", labelEn: "Overview", href: "/about" },
      { label: "회사 연혁", labelEn: "History", href: "/about/history" },
      { label: "CI 소개", labelEn: "Brand CI", href: "/about/ci" },
      { label: "오시는 길", labelEn: "Location", href: "/about/location" },
      { label: "파트너 계약", labelEn: "Partners", href: "/about/partners" },
    ],
  },
  {
    label: "구독서비스",
    labelEn: "Subscription",
    href: "/subscribe",
    children: [
      { label: "체어", labelEn: "Chair", href: "/subscribe/chair" },
      { label: "롤테이너", labelEn: "Roll Tainer", href: "/subscribe/rolltainer" },
      { label: "파랫트", labelEn: "Pallet", href: "/subscribe#pallet" },
      { label: "인테이너", labelEn: "Intainer", href: "/subscribe#intainer" },
      { label: "이사바구니", labelEn: "Moving Box", href: "/subscribe#movingbox" },
      { label: "주방집기", labelEn: "Kitchen", href: "/subscribe#kitchen" },
      { label: "냉난방기", labelEn: "HVAC", href: "/subscribe#hvac" },
    ],
  },
  {
    label: "공유서비스",
    labelEn: "Sharing",
    href: "/sharing",
    children: [
      { label: "롤테이너", labelEn: "Roll Tainer", href: "/sharing#rolltainer" },
      { label: "카트", labelEn: "Cart", href: "/sharing#cart" },
      { label: "공항카트", labelEn: "Airport Cart", href: "/sharing#airport-cart" },
      { label: "계단카트", labelEn: "Stair Cart", href: "/sharing#stair-cart" },
      { label: "스테커", labelEn: "Stacker", href: "/sharing#stacker" },
      { label: "행사장장비", labelEn: "Event Equipment", href: "/sharing#event" },
    ],
  },
  {
    label: "렌탈서비스",
    labelEn: "Rental",
    href: "/rental",
    children: [
      { label: "사무가구/기기", labelEn: "Office Furniture", href: "/rental#furniture" },
      { label: "주방집기", labelEn: "Kitchen", href: "/rental#kitchen" },
      { label: "행사집기", labelEn: "Event", href: "/rental#event" },
      { label: "IT기기/로봇", labelEn: "IT/Robotics", href: "/rental#it" },
      { label: "의료장비", labelEn: "Medical", href: "/rental#medical" },
      { label: "이동식에어컨", labelEn: "Portable AC", href: "/rental#aircon" },
      { label: "산업용제습기", labelEn: "Dehumidifier", href: "/rental#dehumidifier" },
      { label: "물류장비", labelEn: "Logistics", href: "/rental#logistics" },
      { label: "계절집기", labelEn: "Seasonal", href: "/rental#seasonal" },
    ],
  },
  {
    label: "순환서비스",
    labelEn: "Renewal",
    href: "/recycle",
    children: [
      { label: "체어(세르타)", labelEn: "Chair (Serta)", href: "/recycle#chair" },
      { label: "물류장비", labelEn: "Logistics", href: "/recycle#logistics" },
      { label: "사무가구/기기", labelEn: "Office Furniture", href: "/recycle#furniture" },
      { label: "주방집기", labelEn: "Kitchen", href: "/recycle#kitchen" },
      { label: "이동식에어컨", labelEn: "Portable AC", href: "/recycle#aircon" },
      { label: "계절상품", labelEn: "Seasonal", href: "/recycle#seasonal" },
      { label: "산업용제습기", labelEn: "Dehumidifier", href: "/recycle#dehumidifier" },
      { label: "특수집기", labelEn: "Special", href: "/recycle#special" },
    ],
  },
  {
    label: "유통서비스",
    labelEn: "Buyback",
    href: "/buyback",
    children: [
      { label: "사무가구", labelEn: "Office Furniture", href: "/buyback#furniture" },
      { label: "물류장비", labelEn: "Logistics", href: "/buyback#logistics" },
      { label: "행사집기", labelEn: "Event", href: "/buyback#event" },
      { label: "업소용집기", labelEn: "Commercial", href: "/buyback#commercial" },
    ],
  },
];
