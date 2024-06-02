import Head from "next/head";
import React, { useState, useEffect, useRef, useCallback } from "react";
import NavBar from "@/components/common/Sub/navBar";
import Timer from "/public/etcjs/parkingCountDown.js";
import Link from "next/link";

export default function Main() {
  const bg_img1 = { backgroundImage: "url('/imgs/cafe/coffee/1.png')" };
  const bg_img2 = { backgroundImage: "url('/imgs/cafe/coffee/2.png')" };
  const bg_img3 = { backgroundImage: "url('/imgs/cafe/coffee/3.png')" };
  const bg_img4 = { backgroundImage: "url('/imgs/cafe/coffee/4.png')" };
  const bg_img5 = { backgroundImage: "url('/imgs/cafe/coffee/5.png')" };
  const bg_img6 = { backgroundImage: "url('/imgs/cafe/coffee/6.png')" };

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
      <NavBar title="미션 : 288 우 3650 주차 정산" link="#"></NavBar>
      <div className="flex flex-col items-center justify-between w-full h-[calc(100%-48px)] bg-[#fff]">
        <div className="flex items-center justify-between w-full h-[55px] bg-primary px-[12px]">
          <Link
            href="./kiosk_main"
            onClick={() => {
              alert("처음화면으로 돌아갑니다.");
            }}
          >
            <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M28.4375 11.9451V3.28125H22.9688V7.27686L17.5 2.1875L0 18.5938H4.375V32.8125H14.2188V21.875H20.7812V32.8125H30.625V18.5938H35L28.4375 11.9451Z" fill="white" />
            </svg>
          </Link>
          <p className="text-[#FFF] text-[24px] font-[700] tracking-[-0.7px] leading-[155%] break-keep text-center">차량 검색 중</p>
          <svg className="opacity-0 w-[35px]" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28.4375 11.9451V3.28125H22.9688V7.27686L17.5 2.1875L0 18.5938H4.375V32.8125H14.2188V21.875H20.7812V32.8125H30.625V18.5938H35L28.4375 11.9451Z" fill="white" />
          </svg>
        </div>
        <div className="flex flex-col justify-center items-center w-full h-full bg-[#fff] py-[20px] px-[40px]">
          <div className="w-full h-auto border-[3px] rounded-[4px] border-primary py-[18px] px-[40px] animate">
            <img src="/imgs/loading.svg" className="w-[20%] max-w-[30px] mx-auto mb-[15px] animate-spin" />
            <p className="text-[#000] text-[20px] sm:text-[22px] font-[700] tracking-[-0.9px] leading-[155%] break-keep text-center">
              차량을 검색중입니다.
              <br />
              잠시만 기다려주십시오.
            </p>
            <p className="text-primary text-[35px] sm:text-[37px] font-[700] tracking-[-0.9px] leading-[155%] break-keep text-center mt-[16px] hidden "></p>
            <Timer />
          </div>
        </div>
      </div>
    </>
  );
}
