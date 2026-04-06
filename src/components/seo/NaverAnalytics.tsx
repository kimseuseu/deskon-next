"use client";

import Script from "next/script";

const NAVER_WCS_ID = "1983ecee7e23ab0";

export default function NaverAnalytics() {
  return (
    <>
      <Script
        src="//wcs.pstatic.net/wcslog.js"
        strategy="afterInteractive"
      />
      <Script id="naver-wcs" strategy="afterInteractive">
        {`
          if(!wcs_add) var wcs_add = {};
          wcs_add["wa"] = "${NAVER_WCS_ID}";
          if(window.wcs) { wcs_do(); }
        `}
      </Script>
    </>
  );
}
