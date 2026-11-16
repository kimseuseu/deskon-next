This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 통합 관리자 허브 연동

사장님 컴퓨터의 "통합 관리자 허브"(admin-hub)가 이 사이트의 관리자 자료(견적·문의·상품·현장 노트 글·배너·공지·FAQ, 현장 노트 조회수)를 받아가는 주소입니다.

```
GET /api/hub/export
Authorization: Bearer <HUB_API_TOKEN>
```

- 소스: `src/app/api/hub/export/route.ts`. 읽기 전용이며 규격은 admin-hub 저장소의 `docs/연동-규격.md`(버전 1)입니다.
- 설정: 환경 변수 `HUB_API_TOKEN` 에 긴 무작위 문자열을 넣고(Vercel 프로젝트 설정과 `.env.local`), 다시 배포한 뒤 허브의 사이트 수정 화면 "연동 키" 칸에 같은 값을 넣습니다. 키가 없거나 다르면 401 로 거절합니다.
- 글 본문·비밀번호 해시는 보내지 않고, 개인정보는 관리자 목록에 이미 보이는 범위(이름·회사·연락처·요약)까지만 담습니다.
