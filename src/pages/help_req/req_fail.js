import Head from "next/head";
import React, { useState, useEffect, useRef, useCallback } from "react";
import NavBar from "@/components/common/Sub/navBar";
import Link from "next/link";

export default function Main() {
  return (
    <>
      <Head>
        <title>키도 - 키오스크 도우미</title>
        <meta name="description" content="키도 - 키오스크 도우미" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar title="도움 요청하기" link="/help_req/settings"></NavBar>
      <div className="flex flex-col items-center justify-center w-full h-[calc(100%-48px)] px-[20px] bg-[#232323]">
        <div className="flex flex-col items-center gap-y-[24px] w-full h-auto bg-[#fff] my-[30px] py-[32px] px-[24px] rounded-[4px] shadow-xl">
          <svg width="93" height="93" viewBox="0 0 93 93" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_203_2745)">
              <path d="M44.62 30.6658V47.0003M44.62 59.4253H44.6559M70.8381 78.5H18.402C11.4459 78.5 6.90465 71.2004 9.97869 64.9604L36.1967 11.7404C39.6388 4.75322 49.6012 4.7532 53.0433 11.7404L79.2614 64.9604C82.3354 71.2004 77.7942 78.5 70.8381 78.5Z" stroke="#FF2F01" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" shape-rendering="crispEdges" />
            </g>
            <defs>
              <filter id="filter0_d_203_2745" x="0.495667" y="0" width="92.2487" height="93" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dx="2" dy="4" />
                <feGaussianBlur stdDeviation="3.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_203_2745" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_203_2745" result="shape" />
              </filter>
            </defs>
          </svg>

          <p className="text-[#232323] text-[18px] font-[700] tracking-[-1.0px]">주변에 수락한 유저가 없습니다. 🥲</p>
          <Link href="/helper_map" class="bg-primary flex items-center justify-center py-[15px] px-[15px] rounded-[48px] text-[#fff] w-full text-[18px] font-[700] tracking-[-0.8px] hover:opacity-70">
            내 근처 디지털안내사 찾기
          </Link>
          <Link href="/help_req/re_req_waiting" className="text-[#232323] text-[15px] font-[700] leading-[110%] tracking-[-0.2px] hover:opacity-70">
            재요청 하기
          </Link>
        </div>
      </div>
    </>
  );
}
