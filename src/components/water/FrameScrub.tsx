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
 * 프레임은 두 벌입니다. 넓은 화면(lg, 1024px 이상)은 `${base}/lg/`(2560×1440, 첫 장면은 1920×1080),
 * 좁은 화면은 `${base}/sm/`(1280×720)에서 받습니다. 어느 벌을 쓸지는 받기 시작할 때 한 번 정합니다.
 * 파일 이름은 `f_001.webp`부터 셋째 자리까지 0을 채운 번호입니다.
 *
 * 그리기는 한 프레임(rAF)에 한 번으로 모으고, 같은 장을 같은 크기로 다시 그리지 않습니다.
 * 받은 장은 미리 디코드해 두어(img.decode) 처음 그릴 때 멈칫하지 않게 합니다.
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
  const drawn = useRef("");
  const raf = useRef(0);
  const started = useRef(false);

  /* 실제로 그립니다. rAF 안에서만 불립니다. */
  const paint = () => {
    raf.current = 0;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const list = frames.current;
    let img: HTMLImageElement | null = null;
    let at = -1;
    /* 원하는 장이 없으면 앞뒤로 가장 가까운 장을 씁니다. */
    for (let d = 0; d < count && !img; d++) {
      const back = target.current - d;
      const fwd = target.current + d;
      if (list[back]) {
        img = list[back]!;
        at = back;
      } else if (list[fwd]) {
        img = list[fwd]!;
        at = fwd;
      }
    }
    if (!img) return;
    const { width: cw, height: ch } = canvas;
    const key = `${at}:${cw}x${ch}`;
    if (key === drawn.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    /* 화면이 16:9보다 길면 위아래가 잘립니다. 피사체 머리가 위에 있으므로
       위는 덜 자르고 아래를 더 자릅니다(위 40%, 아래 60%). */
    ctx.drawImage(img, (cw - w) / 2, (ch - h) * 0.4, w, h);
    drawn.current = key;
  };

  /* 다음 프레임에 한 번만 그리도록 예약합니다. 스크롤 이벤트가 몰려도 한 번입니다. */
  const schedule = () => {
    if (!raf.current) raf.current = requestAnimationFrame(paint);
  };

  /* 캔버스는 보이는 크기 × 화소 밀도(최대 1.5)로 잡습니다. 넓은 화면의 프레임이 2560px이라
     이 정도면 선명하고, 그 이상은 그리는 비용만 늘어납니다. */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const r = canvas.getBoundingClientRect();
      const w = Math.round(r.width * dpr);
      const h = Math.round(r.height * dpr);
      if (w === canvas.width && h === canvas.height) return;
      canvas.width = w;
      canvas.height = h;
      drawn.current = "";
      schedule();
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(canvas);
    return () => {
      ro.disconnect();
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = 0;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* 화면에 가까워지면(한 화면 반 앞) 받기 시작합니다. 첫 장은 혼자 먼저,
     나머지는 여섯 장씩 차례로. */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    /* 어느 벌을 받을지. 넓은 화면이면 큰 벌, 아니면 작은 벌. 중간에 바꾸지 않습니다. */
    const size = window.matchMedia("(min-width: 1024px)").matches ? "lg" : "sm";
    const load = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          frames.current[i] = img;
          /* 미리 디코드해 둡니다. 실패해도 그릴 때 디코드되므로 무시합니다. */
          img.decode?.().catch(() => {});
          if (Math.abs(i - target.current) < 2 || !frames.current.some((f, k) => f && k !== i)) schedule();
          resolve();
        };
        img.onerror = () => resolve();
        img.src = `${base}/${size}/f_${String(i + 1).padStart(3, "0")}.webp`;
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
      schedule();
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
    schedule();
  });

  return <canvas ref={canvasRef} aria-hidden className={`block h-full w-full ${className}`} />;
}
