"use client";

import { useCallback, useEffect, useRef, useState, type DragEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { uploadImage, type UploadedImage } from "@/lib/cloudinary-upload";
import { BUSINESS_CARD_ACCEPT, BUSINESS_CARD_MAX_BYTES } from "@/data/inquiry";
import { EASE } from "./ui";

/**
 * 명함 첨부. 사진을 찍거나 파일을 고르거나 끌어다 놓습니다.
 * 고르는 즉시 미리보기가 서고, 뒤에서 Cloudinary(inquiries 폴더)로 올라가며 막대가 찹니다.
 * 다 올라가면 교체·삭제 버튼이 남습니다. 이미지 10MB 이하만 받습니다.
 */
export default function BusinessCardUpload({
  value,
  onChange,
  onUploadingChange,
}: {
  value: UploadedImage | null;
  onChange: (next: UploadedImage | null) => void;
  onUploadingChange?: (uploading: boolean) => void;
}) {
  const reduce = useReducedMotion();
  const [preview, setPreview] = useState<string | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);

  /* 올리는 중에는 로컬 미리보기, 끝나면 올라간 주소 */
  const shown = preview ?? value?.url ?? null;
  const uploading = progress !== null && progress < 1;

  useEffect(() => {
    onUploadingChange?.(uploading);
  }, [uploading, onUploadingChange]);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleFile = useCallback(
    async (file: File | undefined) => {
      if (!file) return;
      setError(null);
      if (!file.type.startsWith("image/")) {
        setError("이미지 파일만 올릴 수 있습니다. 사진을 찍거나 JPG, PNG를 골라 주세요.");
        return;
      }
      if (file.size > BUSINESS_CARD_MAX_BYTES) {
        setError(`10MB 이하의 사진만 올릴 수 있습니다. 지금 파일은 ${(file.size / 1024 / 1024).toFixed(1)}MB입니다.`);
        return;
      }
      const url = URL.createObjectURL(file);
      setPreview((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });
      setProgress(0);
      try {
        const uploaded = await uploadImage(file, "inquiries", (f) => setProgress(f));
        onChange(uploaded);
        setProgress(1);
      } catch (e) {
        setError(e instanceof Error ? e.message : "명함을 올리지 못했습니다. 다시 시도해 주세요.");
        setProgress(null);
        setPreview((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return null;
        });
      }
    },
    [onChange]
  );

  const remove = () => {
    setPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setProgress(null);
    setError(null);
    onChange(null);
    if (fileRef.current) fileRef.current.value = "";
    if (cameraRef.current) cameraRef.current.value = "";
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    void handleFile(e.dataTransfer.files?.[0]);
  };

  return (
    <div>
      <input
        ref={fileRef}
        type="file"
        accept={BUSINESS_CARD_ACCEPT}
        className="sr-only"
        onChange={(e) => {
          void handleFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="sr-only"
        onChange={(e) => {
          void handleFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />

      <AnimatePresence initial={false} mode="wait">
        {shown ? (
          <motion.div
            key="preview"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.14 } }}
            transition={{ duration: 0.24, ease: EASE }}
            className="rounded-[20px] bg-tg p-3"
          >
            <div className="relative aspect-[1.75] overflow-hidden rounded-[14px] bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element -- 방금 고른 파일의 로컬 미리보기 */}
              <img src={shown} alt="첨부한 명함 미리보기" className="h-full w-full object-cover" />
              {uploading && (
                <div className="absolute inset-0 grid place-items-center bg-white/55 backdrop-blur-[2px]">
                  <span className="rounded-full bg-tx px-3 py-1.5 text-[13px] font-semibold tabular-nums text-white">
                    올리는 중 {Math.round((progress ?? 0) * 100)}%
                  </span>
                </div>
              )}
            </div>
            {/* 진행 막대. 다 차면 사라집니다. */}
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-tg-2" aria-hidden>
              <motion.div
                className="h-full origin-left rounded-full bg-tb"
                initial={false}
                animate={{ scaleX: progress ?? 1, opacity: uploading ? 1 : 0 }}
                transition={{ scaleX: { duration: 0.2, ease: "linear" }, opacity: { duration: 0.3, delay: uploading ? 0 : 0.4 } }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between gap-3">
              <p className="text-[13px] font-medium text-tx-2" aria-live="polite">
                {uploading ? "사진을 올리고 있습니다." : value ? "명함이 첨부되었습니다." : "준비 중"}
              </p>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="rounded-full px-3.5 py-2 text-[13px] font-semibold text-tx transition-colors duration-200 hover:bg-white disabled:opacity-40"
                >
                  교체
                </button>
                <button
                  type="button"
                  onClick={remove}
                  disabled={uploading}
                  className="rounded-full px-3.5 py-2 text-[13px] font-semibold text-red-600 transition-colors duration-200 hover:bg-white disabled:opacity-40"
                >
                  삭제
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="drop"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.14 } }}
            transition={{ duration: 0.24, ease: EASE }}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            className={`rounded-[20px] border-2 border-dashed p-5 text-center transition-colors duration-200 sm:p-7 ${
              dragging ? "border-tb bg-tb-soft" : "border-tg-2 bg-tg"
            }`}
          >
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-white text-tb">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
                <rect x="3" y="5" width="18" height="14" rx="3" />
                <path strokeLinecap="round" d="M7 10h4M7 14h7" />
                <circle cx="16.5" cy="10.5" r="1.5" />
              </svg>
            </div>
            <p className="mt-4 text-[15px] font-semibold text-tx">
              {dragging ? "여기에 놓으면 올라갑니다" : "명함 사진을 올려 주세요"}
            </p>
            <p className="mt-1 text-[13px] font-medium text-tx-3">JPG, PNG, 10MB 이하. 끌어다 놓아도 됩니다.</p>
            <div className="mt-5 flex flex-col justify-center gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => cameraRef.current?.click()}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-tx px-5 py-3 text-[14px] font-semibold text-white transition-colors duration-200 hover:bg-tk-2 sm:hidden"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                  <path d="M4 8.5A2.5 2.5 0 0 1 6.5 6H8l1.2-2h5.6L16 6h1.5A2.5 2.5 0 0 1 20 8.5v8a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5z" />
                  <circle cx="12" cy="12.5" r="3.5" />
                </svg>
                사진 찍기
              </button>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-[14px] font-semibold text-tx transition-colors duration-200 hover:bg-tb-soft hover:text-tb"
              >
                파일 선택
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: EASE }}
            className="mt-2 text-[13px] font-medium text-red-600"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
