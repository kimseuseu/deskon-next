/** 지금 방문자에게 보이는 글인지: 발행 상태이고 발행 시각이 지났는지(예약 글은 아직 아님). */
export function isLive(row: { status: string; published_at: string | null }): boolean {
  return row.status === "published" && !!row.published_at && new Date(row.published_at).getTime() <= Date.now();
}
