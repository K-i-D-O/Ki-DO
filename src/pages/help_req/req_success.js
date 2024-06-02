import Head from "next/head";
import React, { useState, useEffect, useRef, useCallback } from "react";
import NavBar from "@/components/common/Sub/navBar";
import Link from "next/link";

export default function Main() {
  return (
    <>
      <Head>
        <title>키도 - 키오스크 도우미</title> <link rel="icon" href="/imgs/favi-icon.png" />
        <link rel="shortcut icon" href="/imgs/favi-icon.png" />
        <link rel="apple-touch-icon-precomposed" href="/imgs/favi-icon.png" />
        <meta name="description" content="키도 - 키오스크 도우미" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar title="도움 요청하기" link="/help_req/settings"></NavBar>
      <div className="flex flex-col items-center justify-center w-full h-[calc(100%-48px)] px-[20px] bg-[#232323]">
        <div className="flex flex-col items-center gap-y-[24px] w-full h-auto bg-[#fff] my-[30px] py-[32px] px-[24px] rounded-[4px] shadow-xl">
          <svg width="88" height="88" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M84 40.3429V44.0229C83.9951 52.6486 81.202 61.0416 76.0373 67.9502C70.8726 74.8588 63.6131 79.9128 55.3414 82.3585C47.0697 84.8042 38.229 84.5105 30.1379 81.5212C22.0467 78.5319 15.1386 73.0073 10.4438 65.7711C5.74906 58.535 3.51916 49.9751 4.08671 41.3681C4.65425 32.7611 7.98883 24.5682 13.5931 18.0112C19.1974 11.4542 26.7711 6.88442 35.1847 4.98348C43.5984 3.08253 52.4011 3.95224 60.28 7.4629M29 35.6667L42.1311 48.7978C44.0838 50.7504 47.2496 50.7504 49.2022 48.7978L79 19" stroke="#FF2F01" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>

          <p className="text-[#232323] text-[18px] font-[700] tracking-[-1.0px] text-center">
            요청이 수락되었습니다!
            <br />
            전화가 올 때까지 잠시만 기다려주세요.
          </p>
          <Link href="/" class="bg-primary flex items-center justify-center py-[15px] px-[15px] rounded-[48px] text-[#fff] w-full text-[18px] font-[700] tracking-[-0.8px] hover:opacity-70">
            처음으로 돌아가기
          </Link>
          <Link href="/help_req/re_req_waiting" className="text-[#232323] text-[15px] font-[700] leading-[110%] tracking-[-0.2px] hover:opacity-70">
            재요청 하기
          </Link>
        </div>
      </div>
    </>
  );
}
