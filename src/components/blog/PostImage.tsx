import Image from "next/image";

/** next.config.ts 의 images.remotePatterns 와 같은 목록. 여기 있는 호스트만 최적화를 거칩니다. */
const OPTIMIZED_HOSTS = new Set(["res.cloudinary.com", "www.aovo.kr"]);

function isOptimizable(src: string): boolean {
  if (src.startsWith("/")) return true;
  try {
    return OPTIMIZED_HOSTS.has(new URL(src).hostname);
  } catch {
    return false;
  }
}

/**
 * 블로그 대표 사진. 부모가 relative + 비율을 잡고, 이 컴포넌트는 그 안을 채웁니다(fill).
 * 관리자가 붙여 넣은 외부 주소는 최적화 없이 그대로 보여줍니다(허용 호스트 목록에 없으면 next/image 가 오류를 냅니다).
 */
export default function PostImage({
  src,
  alt,
  sizes,
  priority = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized={!isOptimizable(src)}
      className="object-cover"
    />
  );
}
