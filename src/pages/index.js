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
      <NavBar title="홈화면" link="#"></NavBar>
      <div className="flex flex-col items-center justify-center w-full h-[calc(100%-48px)] overflow-y-auto px-[20px] bg-[#232323] py-[20px]">
        <div className="flex flex-col gap-y-[40px] items-center justify-center w-full">
          <Link href="/kiosk" className="duration-500 flex flex-row gap-x-[5px] items-center justify-between w-full border-[2px] border-primary rounded-[4px] hover:opacity-70 p-[25px] bg-[#fff]">
            <div className="flex flex-col gap-y-[18px]">
              <p className="text-[#232323] text-[24px] font-[700] tracking-[-0.6px] line-clamp-1">도전! 키오스크 활용</p>
              <div className="bg-primary flex items-center justify-center py-[8px] px-[15px] rounded-[48px] text-[#fff] text-[14px] font-[700] tracking-[-0.6px]">모의 키오스크 시작하기</div>
            </div>
            <svg width="40" height="44" viewBox="0 0 40 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_24_2849)">
                <path
                  d="M3.34512 16.2251C2.86771 16.2245 2.40946 16.4523 2.07022 16.8587C1.73099 17.2652 1.53826 17.8174 1.53404 18.395C1.53211 18.5952 1.55607 18.7946 1.60507 18.9858L6.19491 38.5689C6.40764 39.4836 6.86228 40.2888 7.4892 40.8611C8.11613 41.4334 8.8808 41.7414 9.66615 41.7378H30.3338C31.1206 41.7386 31.8864 41.43 32.5157 40.8584C33.145 40.2869 33.6037 39.4833 33.8228 38.5689L38.4126 18.9858L38.4659 18.395C38.4616 17.8174 38.2689 17.2652 37.9297 16.8587C37.5904 16.4523 37.1322 16.2245 36.6548 16.2251H3.34512ZM20.5078 33.4201C19.7699 33.4157 19.0496 33.1468 18.4379 32.6476C17.8261 32.1483 17.3503 31.4409 17.0705 30.6147C16.7907 29.7886 16.7193 28.8806 16.8656 28.0055C17.0118 27.1303 17.3689 26.3272 17.892 25.6974C18.4151 25.0676 19.0806 24.6395 19.8046 24.4669C20.5286 24.2943 21.2786 24.3851 21.96 24.7279C22.6413 25.0706 23.2236 25.6498 23.6331 26.3925C24.0427 27.1352 24.2613 28.008 24.2613 28.9009C24.2566 30.1016 23.8591 31.2512 23.1556 32.0982C22.4522 32.9451 21.5001 33.4204 20.5078 33.4201Z"
                  stroke="#232323"
                  stroke-width="3.2"
                  stroke-linejoin="round"
                />
                <path d="M11.4773 16.2251L20 2.4751L28.5227 16.2251" stroke="#232323" stroke-width="3.2" stroke-linejoin="round" />
              </g>
              <defs>
                <clipPath id="clip0_24_2849">
                  <rect width="40" height="44" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Link>
          <Link href="/help_req" className="duration-500 flex flex-row gap-x-[5px] items-center justify-between w-full border-[2px] border-primary rounded-[4px] hover:opacity-70 p-[25px] bg-[#fff]">
            <div className="flex flex-col gap-y-[18px]">
              <p className="text-[#232323] text-[24px] font-[700] tracking-[-0.6px] line-clamp-1">나 좀 도와주세요!</p>
              <div className="bg-primary flex items-center justify-center py-[8px] px-[15px] rounded-[48px] text-[#fff] text-[14px] font-[700] tracking-[-0.6px]">주변에 도움요청하기</div>
            </div>
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25 7.8125C21.6006 7.8125 18.2776 8.82053 15.4511 10.7091C12.6247 12.5977 10.4217 15.282 9.12083 18.4226C7.81995 21.5632 7.47958 25.0191 8.14276 28.3531C8.80594 31.6872 10.4429 34.7497 12.8466 37.1534C15.2503 39.5571 18.3128 41.1941 21.6469 41.8572C24.9809 42.5204 28.4368 42.1801 31.5774 40.8792C34.718 39.5783 37.4023 37.3753 39.2909 34.5489C41.1795 31.7224 42.1875 28.3994 42.1875 25C42.1875 20.4416 40.3767 16.0699 37.1534 12.8466C33.9301 9.62332 29.5584 7.8125 25 7.8125Z" stroke="#232323" stroke-width="4.16" stroke-miterlimit="10" />
              <path d="M19.5312 19.7546C19.5312 19.7546 19.6133 18.0457 21.4424 16.574C22.5273 15.7 23.8281 15.447 25 15.4295C26.0674 15.4158 27.0205 15.5925 27.5908 15.864C28.5674 16.3289 30.4688 17.4636 30.4688 19.8767C30.4688 22.4158 28.8086 23.5691 26.917 24.8377C25.0254 26.1062 24.5117 27.4832 24.5117 28.906" stroke="#232323" stroke-width="3.64" stroke-miterlimit="10" stroke-linecap="round" />
              <path d="M24.4141 35.9375C25.4927 35.9375 26.3672 35.0631 26.3672 33.9844C26.3672 32.9057 25.4927 32.0312 24.4141 32.0312C23.3354 32.0312 22.4609 32.9057 22.4609 33.9844C22.4609 35.0631 23.3354 35.9375 24.4141 35.9375Z" fill="#232323" />
            </svg>
          </Link>
          <Link href="/helper_map" className="duration-500 flex flex-row gap-x-[5px] items-center justify-between w-full border-[2px] border-primary rounded-[4px] hover:opacity-70 p-[25px] bg-[#fff]">
            <div className="flex flex-col gap-y-[18px]">
              <p className="text-[#232323] text-[24px] font-[700] tracking-[-0.6px] line-clamp-1">근처 디지털 안내사</p>
              <div className="bg-primary flex items-center justify-center py-[8px] px-[15px] rounded-[48px] text-[#fff] text-[14px] font-[700] tracking-[-0.6px]">내 근처 디지털 안내사 찾기</div>
            </div>
            <svg width="40" height="44" viewBox="0 0 40 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_24_2849)">
                <path
                  d="M3.34512 16.2251C2.86771 16.2245 2.40946 16.4523 2.07022 16.8587C1.73099 17.2652 1.53826 17.8174 1.53404 18.395C1.53211 18.5952 1.55607 18.7946 1.60507 18.9858L6.19491 38.5689C6.40764 39.4836 6.86228 40.2888 7.4892 40.8611C8.11613 41.4334 8.8808 41.7414 9.66615 41.7378H30.3338C31.1206 41.7386 31.8864 41.43 32.5157 40.8584C33.145 40.2869 33.6037 39.4833 33.8228 38.5689L38.4126 18.9858L38.4659 18.395C38.4616 17.8174 38.2689 17.2652 37.9297 16.8587C37.5904 16.4523 37.1322 16.2245 36.6548 16.2251H3.34512ZM20.5078 33.4201C19.7699 33.4157 19.0496 33.1468 18.4379 32.6476C17.8261 32.1483 17.3503 31.4409 17.0705 30.6147C16.7907 29.7886 16.7193 28.8806 16.8656 28.0055C17.0118 27.1303 17.3689 26.3272 17.892 25.6974C18.4151 25.0676 19.0806 24.6395 19.8046 24.4669C20.5286 24.2943 21.2786 24.3851 21.96 24.7279C22.6413 25.0706 23.2236 25.6498 23.6331 26.3925C24.0427 27.1352 24.2613 28.008 24.2613 28.9009C24.2566 30.1016 23.8591 31.2512 23.1556 32.0982C22.4522 32.9451 21.5001 33.4204 20.5078 33.4201Z"
                  stroke="#232323"
                  stroke-width="3.2"
                  stroke-linejoin="round"
                />
                <path d="M11.4773 16.2251L20 2.4751L28.5227 16.2251" stroke="#232323" stroke-width="3.2" stroke-linejoin="round" />
              </g>
              <defs>
                <clipPath id="clip0_24_2849">
                  <rect width="40" height="44" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}
