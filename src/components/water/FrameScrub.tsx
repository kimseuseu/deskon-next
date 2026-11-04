"use client";

import { useEffect, useRef } from "react";
import { useMotionValueEvent, useReducedMotion } from "framer-motion";
import { useSceneProgress } from "@/components/film/Scene";

/**
 * 스크롤로 넘기는 프레임 시퀀스. 토스 메인이 쓰는 방식 그대로입니다.
 *
 * 영상을 <video>로 두고 currentTime을 움직이면 아이폰에서 뚝뚝 끊깁니다.
 * 대신 프레임을 낱장 이미지로 두고, 장면의 진행도(0→1)에 맞는 장을 캔버스에
 * 그립니다. 장은 화면에 가까워지면 첫 장부터 차례로 받아 오고, 아직 안 온
 * 장이 필요하면 받아 둔 장 중 가장 가까운 것을 그립니다.
 *
 * 파일 이름은 `${base}/f_001.webp`부터 셋째 자리까지 0을 채운 번호입니다.
 * 움직임을 줄인 환경에서는 첫 장만 그립니다.
 */
export function FrameScrub({
  base,
  count,
  from = 0,
  to = 1,
  className = "",
}: {
  base: string;
  count: number;
  /** 장면 진행도에서 프레임이 넘어가는 구간. 앞뒤에 다른 연출이 있을 때 씁니다. */
  from?: number;
  to?: number;
  className?: string;
}) {
  const progress = useSceneProgress();
  const reduce = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frames = useRef<(HTMLImageElement | null)[]>([]);
  const target = useRef(0);
  const started = useRef(false);

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const list = frames.current;
    let img: HTMLImageElement | null = null;
    /* 원하는 장이 없으면 앞뒤로 가장 가까운 장을 씁니다. */
    for (let d = 0; d < count && !img; d++) {
      img = list[target.current - d] ?? list[target.current + d] ?? null;
    }
    if (!img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { width: cw, height: ch } = canvas;
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    /* 화면이 16:9보다 길면 위아래가 잘립니다. 피사체 머리가 위에 있으므로
       위는 덜 자르고 아래를 더 자릅니다(위 40%, 아래 60%). */
    ctx.drawImage(img, (cw - w) / 2, (ch - h) * 0.4, w, h);
  };

  /* 캔버스는 보이는 크기 × 화소 밀도(최대 1.5)로 잡습니다. 더 크게 잡아도
     프레임이 1280px이라 더 선명해지지 않습니다. */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.round(r.width * dpr);
      canvas.height = Math.round(r.height * dpr);
      draw();
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(canvas);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* 화면에 가까워지면(한 화면 반 앞) 받기 시작합니다. 첫 장은 혼자 먼저,
     나머지는 여섯 장씩 차례로. */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const load = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          frames.current[i] = img;
          if (Math.abs(i - target.current) < 2 || !frames.current.some((f, k) => f && k !== i)) draw();
          resolve();
        };
        img.onerror = () => resolve();
        img.src = `${base}/f_${String(i + 1).padStart(3, "0")}.webp`;
      });
    const start = async () => {
      if (started.current) return;
      started.current = true;
      await load(0);
      if (reduce) return;
      let next = 1;
      const worker = async () => {
        while (next < count) {
          const i = next++;
          await load(i);
        }
      };
      await Promise.all(Array.from({ length: 6 }, worker));
      draw();
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          start();
          io.disconnect();
        }
      },
      { rootMargin: "150% 0px 150% 0px" },
    );
    io.observe(canvas);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [base, count, reduce]);

  useMotionValueEvent(progress, "change", (p) => {
    if (reduce) return;
    const t = Math.min(1, Math.max(0, (p - from) / (to - from)));
    const i = Math.min(count - 1, Math.max(0, Math.round(t * (count - 1))));
    if (i === target.current) return;
    target.current = i;
    draw();
  });

  return <canvas ref={canvasRef} aria-hidden className={`block h-full w-full ${className}`} />;
}
