import Head from "next/head";
import React, { useState, useEffect, useRef, useCallback } from "react";
import NavBar from "@/components/common/Sub/navBar";
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
          <p className="text-[#FFF] text-[24px] font-[700] tracking-[-0.7px] leading-[155%] break-keep text-center">요금 결제</p>
          <svg className="opacity-0 w-[35px]" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28.4375 11.9451V3.28125H22.9688V7.27686L17.5 2.1875L0 18.5938H4.375V32.8125H14.2188V21.875H20.7812V32.8125H30.625V18.5938H35L28.4375 11.9451Z" fill="white" />
          </svg>
        </div>
        <div className="flex flex-col justify-center items-center w-full h-full bg-[#fff] py-[20px]">
          <div className="flex flex-col items-center justify-center gap-[22px] w-full h-auto px-[40px]">
            <div className="w-full" href="#">
              <img className="w-[90%] mx-auto pointer-events-none mt-[20px]" src="/imgs/parking/parking_info.png" />
            </div>
            <div className="w-full grid grid-cols-2 gap-[8px]">
              <Link href="./kiosk_discount" class="bg-[#1959FF] flex items-center justify-center gap-x-[8px] py-[8px] px-[5px] rounded-[12px] text-[#fff] w-auto text-[17px] font-[700] tracking-[-0.8px] hover:opacity-70">
                <span>할인받기</span>
              </Link>
              <Link
                href="#"
                onClick={() => {
                  alert("영수증 할인을 적용해주세요.");
                }}
                class="bg-primary flex items-center justify-center gap-x-[8px] py-[8px] px-[5px] rounded-[12px] text-[#fff] w-auto text-[17px] font-[700] tracking-[-0.8px] hover:opacity-70"
              >
                <span>결제하기</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
