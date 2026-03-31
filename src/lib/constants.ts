export const COMPANY = {
  name: "AOVO",
  nameKo: "아오보",
  legalName: "mbc",
  ceo: "강귀원",
  bizNumber: "108-12-35112",
  phone: "010-9929-5363",
  fax: "02-844-3361",
  email: "mbc8447289@naver.com",
  address: "경기도 광명시 금오로 679(옥길동)",
  kakaoChannel: "http://pf.kakao.com/_qxkxnRX",
  metaPixelId: "1364619415439477",
  cloudinary: {
    cloudName: "daftq93ys",
    preset: "aovoIMAGE",
  },
} as const;

export const SERVICE_CATEGORIES = [
  {
    slug: "subscribe",
    nameKo: "구독서비스",
    nameEn: "Subscription",
    color: "from-blue-900 to-blue-600",
  },
  {
    slug: "sharing",
    nameKo: "공유서비스",
    nameEn: "Sharing",
    color: "from-emerald-900 to-emerald-600",
  },
  {
    slug: "rental",
    nameKo: "렌탈서비스",
    nameEn: "Rental",
    color: "from-violet-900 to-violet-600",
  },
  {
    slug: "recycle",
    nameKo: "순환서비스",
    nameEn: "Renewal",
    color: "from-amber-900 to-amber-600",
  },
  {
    slug: "buyback",
    nameKo: "매입서비스",
    nameEn: "Buyback",
    color: "from-slate-900 to-slate-600",
  },
] as const;
