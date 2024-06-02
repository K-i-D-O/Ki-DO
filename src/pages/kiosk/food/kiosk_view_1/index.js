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
      <NavBar title="치즈버거 세트 주문하기!" link="#"></NavBar>
      <div className="flex flex-col items-center justify-center w-full h-[calc(100%-48px)] bg-[#fff]">
        <p className="text-[25px] font-[700] ">치즈버거 세트 주문하기!</p>
        <p className="text-[25px] font-[700] "> 키오스크 뷰 영역</p>
      </div>
    </>
  );
}
