/**
 * IndexNow: 글을 발행 · 수정 · 삭제한 순간 검색엔진에 그 주소를 알립니다.
 *
 * 네이버는 서치어드바이저에서 받고(searchadvisor.naver.com/indexnow),
 * api.indexnow.org 는 빙 · 얀덱스 등 나머지 참여 엔진에 나눠 줍니다.
 * 알린다고 색인이 보장되지는 않지만, 수집 로봇이 사이트맵을 다시 읽으러 올 때까지 기다리지 않게 됩니다.
 * 서치어드바이저의 «웹 페이지 수집» 을 글마다 손으로 넣던 일을 대신합니다.
 *
 * 열쇠는 public/<열쇠>.txt 로 공개해 두는 값입니다(사이트 주인임을 증명하는 용도라 비밀이 아닙니다).
 * 열쇠를 바꾸면 그 파일 이름과 내용도 같이 바꿉니다.
 */

const HOST = "www.aovo.kr";
const BASE = `https://${HOST}`;
export const INDEXNOW_KEY = "eca540d09ef3633ac20e0158fbbd01ff";

const ENDPOINTS = [
  { engine: "naver", url: "https://searchadvisor.naver.com/indexnow" },
  { engine: "indexnow", url: "https://api.indexnow.org/indexnow" },
] as const;

export interface IndexNowResult {
  engine: string;
  /** HTTP 상태. 요청 자체가 실패하면 null */
  status: number | null;
  /** 200(접수) 또는 202(접수, 열쇠 확인 대기) */
  ok: boolean;
}

/** 운영 배포에서만 보냅니다. 미리보기 · 로컬에서 운영 주소를 알리지 않기 위해서입니다. */
const enabled = () => process.env.VERCEL_ENV === "production";

const toUrl = (path: string) => (path.startsWith("http") ? path : `${BASE}${path.startsWith("/") ? path : `/${path}`}`);

/** 글 주소. 한글 슬러그도 그대로 보낼 수 있게 인코딩합니다. */
export const postPath = (slug: string) => `/blog/${encodeURIComponent(slug)}`;

/**
 * 주소 목록을 각 엔진에 보냅니다. 실패해도 던지지 않고 결과만 돌려줍니다.
 * 운영이 아니면 아무것도 보내지 않고 빈 배열을 돌려줍니다.
 */
export async function submitToIndexNow(paths: string[]): Promise<IndexNowResult[]> {
  const urlList = [...new Set(paths.map(toUrl))].filter((u) => u.startsWith(`${BASE}/`) || u === BASE);
  if (!enabled() || urlList.length === 0) return [];

  const body = JSON.stringify({
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `${BASE}/${INDEXNOW_KEY}.txt`,
    urlList,
  });

  return Promise.all(
    ENDPOINTS.map(async ({ engine, url }): Promise<IndexNowResult> => {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body,
          signal: AbortSignal.timeout(5000),
          cache: "no-store",
        });
        const ok = res.status === 200 || res.status === 202;
        if (!ok) console.error(`[indexnow] ${engine} responded ${res.status}`, urlList);
        return { engine, status: res.status, ok };
      } catch (err) {
        console.error(`[indexnow] ${engine} request failed`, err);
        return { engine, status: null, ok: false };
      }
    }),
  );
}
