import type { CSSProperties } from "react";

/* 장면 안에서 요소가 움직이는 구간. 서버 컴포넌트에서도 부르므로
   클라이언트 모듈(Scene.tsx)과 따로 둡니다. */

/** --from → --to 사이에서 움직입니다. */
export const span = (from: number, to: number) =>
  ({ "--from": from, "--to": to }) as CSSProperties;

/** 들어왔다가(--from → --to) 나갑니다(--ofrom → --oto). */
export const through = (from: number, to: number, outFrom: number, outTo: number) =>
  ({ "--from": from, "--to": to, "--ofrom": outFrom, "--oto": outTo }) as CSSProperties;
