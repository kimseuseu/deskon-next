"use client";

import { useReducedMotion } from "framer-motion";
import { useSyncExternalStore } from "react";

/**
 * 휴대폰 화면. 이 폭 아래에서는 스크롤에 묶인 연출(장면 고정, 프레임 넘김,
 * 패럴랙스, 스크롤 등장)을 «동작 줄이기»처럼 멈춥니다. 손가락으로 내리는
 * 동안 화면이 붙잡히거나 글이 늦게 나타나면 조작이 불편하기 때문입니다.
 * globals.css의 같은 미디어쿼리와 짝을 이룹니다.
 *
 * 메뉴 · 모달 · 문의 단계처럼 누르면 반응하는 움직임은 휴대폰에서도 남깁니다.
 * 그런 곳은 이 훅 대신 framer-motion의 useReducedMotion을 씁니다.
 */
export const MOBILE_QUERY = "(max-width: 767px)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(MOBILE_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

const getSnapshot = () => window.matchMedia(MOBILE_QUERY).matches;
const getServerSnapshot = () => false;

/** 휴대폰 폭인지. 서버에서는 false로 시작합니다. */
export function useIsMobile(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * 스크롤 연출을 멈출지. 사용자가 «동작 줄이기»를 켰거나 휴대폰 화면이면 true.
 * 스크롤에 묶인 연출에만 씁니다. 조작 반응은 useReducedMotion.
 */
export function useMinimalMotion(): boolean {
  const reduce = useReducedMotion();
  const mobile = useIsMobile();
  return Boolean(reduce) || mobile;
}
