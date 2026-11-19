/**
 * WebSub(옛 PubSubHubbub): RSS 가 바뀌었다고 허브에 알립니다. 구글이 이 허브를 듣습니다.
 *
 * 구글은 IndexNow 를 받지 않습니다. 구글 문서가 사이트맵 제출 방법으로 적어 둔 것 가운데
 * 사이트가 스스로 보낼 수 있는 것이 이 알림입니다(나머지는 서치 콘솔에서 손으로 넣습니다).
 * 허브는 알림을 받으면 피드를 직접 읽어 가므로, 알리기 전에 피드에 새 글이 실려 있어야 합니다.
 * 색인을 보장하지는 않고, 수집 로봇이 새 글을 더 빨리 알게 하는 신호입니다.
 *
 * 피드(/feed.xml)의 <atom:link rel="hub"> 가 같은 허브 주소를 가리킵니다. 둘은 같이 바꿉니다.
 */

const BASE = "https://www.aovo.kr";
export const WEBSUB_HUB = "https://pubsubhubbub.appspot.com/";
export const FEED_URL = `${BASE}/feed.xml`;

export interface WebSubResult {
  hub: string;
  /** HTTP 상태. 요청 자체가 실패하면 null */
  status: number | null;
  /** 204(접수). 허브에 따라 2xx 를 돌려주기도 해서 2xx 전체를 접수로 봅니다. */
  ok: boolean;
}

/** 운영 배포에서만 보냅니다. 미리보기 · 로컬에서 운영 피드를 알리지 않기 위해서입니다. */
const enabled = () => process.env.VERCEL_ENV === "production";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function readFeed(): Promise<string | null> {
  try {
    const res = await fetch(FEED_URL, { cache: "no-store", signal: AbortSignal.timeout(5000) });
    return res.ok ? await res.text() : null;
  } catch {
    return null;
  }
}

/**
 * 글을 저장한 직후에는 피드가 옛 내용을 한 번 더 내보냅니다(캐시가 뒤에서 새로 만들어지는 방식이라서).
 * 피드를 먼저 읽어 새로 만들게 하고, 내용이 바뀔 때까지 잠깐 기다립니다. 최대 3초쯤.
 * 바뀌지 않아도(본문과 상관없는 칸만 고친 경우 등) 그대로 넘어갑니다.
 */
export async function waitForFreshFeed(tries = 3, gapMs = 1000): Promise<boolean> {
  if (!enabled()) return false;
  const before = await readFeed();
  for (let i = 0; i < tries; i++) {
    await sleep(gapMs);
    const now = await readFeed();
    if (now !== null && now !== before) return true;
  }
  return false;
}

/** 허브에 «피드가 바뀌었다» 고 알립니다. 실패해도 던지지 않습니다. 운영이 아니면 null. */
export async function pingWebSub(): Promise<WebSubResult | null> {
  if (!enabled()) return null;
  try {
    const res = await fetch(WEBSUB_HUB, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ "hub.mode": "publish", "hub.url": FEED_URL }).toString(),
      signal: AbortSignal.timeout(5000),
      cache: "no-store",
    });
    const ok = res.status >= 200 && res.status < 300;
    if (!ok) console.error(`[websub] hub responded ${res.status}`);
    return { hub: WEBSUB_HUB, status: res.status, ok };
  } catch (err) {
    console.error("[websub] hub request failed", err);
    return { hub: WEBSUB_HUB, status: null, ok: false };
  }
}
