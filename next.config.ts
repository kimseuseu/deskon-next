import type { NextConfig } from "next";

// Security headers applied to every response.
// Note: a strict Content-Security-Policy is intentionally omitted because the
// site loads inline scripts for Meta Pixel / Naver Analytics; add a nonce-based
// CSP later if those are reworked.
const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  /* 블로그 사진은 Cloudinary(관리자 업로드)에서 옵니다. 그 밖의 주소는 PostImage 가 최적화 없이 그대로 보여줍니다. */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "www.aovo.kr" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
