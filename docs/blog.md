# 블로그 (www.aovo.kr/blog) 운영 가이드

글은 Supabase 의 `deskon_posts` 테이블에 들어가고, 관리자 페이지(`/admin/posts`)에서 씁니다.
화면·사이트맵·RSS·검색용 메타데이터는 모두 이 사이트(Next.js)가 만듭니다. 별도 CMS 나 호스팅은 없습니다.

```
관리자 /admin/posts ──▶ Supabase deskon_posts
                               │  5분 캐시 + 저장 즉시 갱신
                               ▼
                   www.aovo.kr/blog ──▶ 방문자, 네이버, 구글
```

코드에서 맡는 파일

| 역할 | 파일 |
| --- | --- |
| 테이블 정의 (한 번 실행) | `supabase-posts.sql` |
| 데이터 읽기·캐시 | `src/lib/blog.ts` |
| 마크다운 → HTML, 슬러그 | `src/lib/markdown.ts` |
| 관리자 입력 검증 | `src/lib/post-input.ts` |
| 관리자 API | `src/app/api/admin/posts/` |
| 관리자 화면 (목록·편집기) | `src/app/(admin)/admin/posts/`, `src/components/admin/PostEditor.tsx` |
| 사진 업로드 (Cloudinary) | `src/lib/cloudinary-upload.ts` |
| 목록 (`/blog`, `?category=`, `?page=`) | `src/app/(public)/blog/page.tsx` |
| 글 상세 (`/blog/글주소`) | `src/app/(public)/blog/[slug]/page.tsx` |
| RSS (`/feed.xml`) | `src/app/feed.xml/route.ts` |
| 사이트맵에 글 추가 | `src/app/sitemap.ts` |
| 본문 모양 (`.post-body`) | `src/app/globals.css` 끝부분 |

---

## 1. 처음 한 번: 테이블 만들기

Supabase 대시보드 → SQL Editor → `supabase-posts.sql` 내용을 붙여 넣고 Run.
끝나면 같은 창에서 아래를 실행해 정책이 한 줄만 보이는지 확인합니다.

```sql
SELECT policyname, cmd FROM pg_policies WHERE tablename = 'deskon_posts';
```

Vercel 환경변수는 이미 쓰고 있는 세 개(`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`)면 됩니다. 새로 넣을 것은 없습니다.

## 2. 사진 업로드 준비 (Cloudinary)

편집기의 "사진 넣기"·"사진 올리기"는 브라우저에서 Cloudinary 로 바로 올립니다.
Cloudinary 콘솔 → Settings → Upload → Upload presets 에 이름이 `aovoIMAGE` 이고 Signing mode 가 **Unsigned** 인 프리셋이 있어야 합니다(`src/lib/constants.ts` 의 `cloudinary.preset`).
프리셋이 없거나 Signed 이면 업로드가 실패하며, 그때는 편집기의 "사진 주소 붙여 넣기" 칸에 https 주소를 직접 넣으면 됩니다.

## 3. 글 쓰기

`/admin/posts` → 새 글.

- **제목**: 검색어가 그대로 들어가게. 예) "행사장 급수 비용, 하루 5톤 기준으로 계산해 보면".
- **주소(슬러그)**: 제목을 치면 자동으로 만들어집니다. 영문-하이픈으로 고치는 것을 권합니다(`event-water-supply-cost`). 한글도 동작하지만 공유 주소가 길어집니다. 발행 후에는 바꾸지 않습니다(바꾸면 이미 수집된 주소가 404).
- **본문**: 마크다운. `## 소제목`, 빈 줄로 문단, `- 목록`, `> 인용`, 표, 유튜브 주소 한 줄 = 영상. "미리보기" 탭이 실제 글 화면과 같은 모양입니다. 1,500자 이상 권장.
- **요약**: 검색 결과 설명문이자 목록 카드의 두 줄. 180자 안팎, 검색어 포함.
- **대표 사진**: 목록 카드, 글 머리, 카카오·네이버 공유 썸네일(OG). 가로 1200px 이상, 16:10 안팎. "사진 설명"을 적으면 캡션과 대체 텍스트가 됩니다.
- **분류**: 제안 목록에서 고르거나 새로 적습니다. 글이 한 편이라도 있는 분류만 목록 위 칩에 나옵니다.
- **발행 시각**: 비우고 "발행"을 누르면 지금. 미래 시각을 넣으면 그때부터 보입니다(예약).
- **초안 저장 / 발행**: 초안은 사이트에 나오지 않습니다. 발행한 글은 저장 즉시 반영됩니다.

## 4. 네이버 노출

1. **서치어드바이저 등록**: searchadvisor.naver.com → 웹마스터 도구 → 사이트 등록 → `https://www.aovo.kr` → 소유확인 "HTML 태그" → `content="..."` 값을 `src/app/layout.tsx` 의 `NAVER_SITE_VERIFICATION` 에 넣고 배포 → 소유확인.
2. **요청 → 사이트맵 제출**: `https://www.aovo.kr/sitemap.xml` (발행 글이 자동으로 붙습니다).
3. **요청 → RSS 제출**: `https://www.aovo.kr/feed.xml`.
4. **새 글마다**: 요청 → 웹 페이지 수집에 글 주소를 넣습니다. 이걸 해야 며칠 안에 잡힙니다.
5. **검증 → 웹 페이지 최적화**: 글 주소 하나를 넣어 제목·설명·OG·canonical 이 "정상"인지 확인.

구글은 search.google.com/search-console 에 같은 사이트맵을 제출합니다(소유확인은 이미 되어 있습니다).

네이버 블로그에 요약본을 같이 올리는 방안은 보류 상태입니다(2026-11-06). 나중에 켜려면 Uplika 연동으로 요약과 www.aovo.kr 링크를 올리면 됩니다.

## 5. 자주 겪는 문제

| 증상 | 원인 | 조치 |
| --- | --- | --- |
| 관리자 글 목록에 "글 목록을 불러오지 못했습니다" | 테이블이 없음 | 1절 SQL 실행 |
| /blog 가 "데이터베이스 연결 정보가 아직 설정되지 않았습니다" | Supabase 환경변수 없음 | Vercel 환경변수 확인 후 재배포 |
| 사진 올리기 실패 | Cloudinary 프리셋 없음·Signed | 2절. 또는 주소 붙여 넣기 |
| 발행했는데 안 보임 | 발행 시각이 미래 | 편집기에서 시각을 비우고 다시 발행 |
| 같은 주소의 글이 이미 있다는 오류 | 슬러그 중복 | 주소 끝에 숫자나 단어 추가 |
| 글 주소가 `%EA%B8%89...` 처럼 길다 | 한글 슬러그 | 발행 전에 영문으로 |
