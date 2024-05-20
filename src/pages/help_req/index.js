import Head from "next/head";
import React, { useState, useEffect, useRef, useCallback } from "react";
import NavBar from "@/components/common/Sub/navBar";
import Link from "next/link";

const bg_img = { backgroundImage: "url('/imgs/help_req.svg')" };
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
      <form action="/help_req/req_waiting" className="flex flex-col items-center justify-center w-full h-[calc(100%-48px)] px-[20px] bg-[#232323]">
        <div className="flex flex-col items-center gap-y-[20px] w-full h-auto bg-[#fff] my-[20px] py-[28px] px-[24px] rounded-[4px] shadow-xl">
          <div className="w-[75%] h-auto aspect-[184/134] bg-center bg-cover" style={bg_img}></div>
          <p className="text-[#232323] text-[17px] font-[500] tracking-[-0.8px]">연락 받으실 휴대폰 번호를 입력해주세요.</p>
          <input type="number" required className="p-[16px] bg-[#fff] w-full rounded-[8px] border border-[#c8c8c8] !appearance-none !outline-none focus:border-primary hover:!border-primary" placeholder="-를 제외하고 입력해주세요." />
          <button type="submit" href="#" class="bg-primary flex items-center justify-center py-[15px] px-[15px] rounded-[48px] text-[#fff] w-full text-[18px] font-[700] tracking-[-0.8px] hover:opacity-70">
            도움 요청하기
          </button>
          <Link href="/" className="text-[#232323] text-[15px] font-[700] leading-[110%] tracking-[-0.2px] hover:opacity-70">
            홈화면으로 돌아가기
          </Link>
        </div>
      </form>
    </>
  );
}
