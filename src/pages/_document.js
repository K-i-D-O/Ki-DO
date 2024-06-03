import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="ko">
      <Head />
      <body>
        <div id="portal" />
        <Script strategy="beforeInteractive" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=d4f6ddfa47f0df86e4a068edbc2d4582&libraries=services&autoload=false"></Script>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
