"use client";

import { useReducedMotion } from "framer-motion";
import { useSyncExternalStore } from "react";

/**
 * 휴대폰 화면. 이 폭 아래에서는 «동작 줄이기»를 켠 것과 똑같이 움직임을
 * 최소로 줄입니다. globals.css의 같은 미디어쿼리와 짝을 이룹니다.
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
 * 움직임을 최소로 할지. 사용자가 «동작 줄이기»를 켰거나 휴대폰 화면이면
 * true. framer-motion의 useReducedMotion 대신 이 훅을 씁니다.
 */
export function useMinimalMotion(): boolean {
  const reduce = useReducedMotion();
  const mobile = useIsMobile();
  return Boolean(reduce) || mobile;
}
